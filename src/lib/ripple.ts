import { dpr as currentDpr } from '@/lib/motion';
import { onTheme } from '@/lib/theme';

export const RIPPLE = { pitch: 14, rings: 8, ringMs: 35, fadeMs: 1100, peak: 0.58, edge: 0.12, glyphPx: 12 };
// Cell offsets at exactly Manhattan distance d, flattened as [dc, dr, dc, dr, ...], so a ripple lights ring d in one pass.
const RINGS = Array.from({ length: RIPPLE.rings + 1 }, (_, d) => {
  const out: number[] = [];
  for (let dc = -d; dc <= d; dc++) {
    const rem = d - Math.abs(dc);
    out.push(dc, rem);
    if (rem) out.push(dc, -rem);
  }
  return out;
});

export type Glyph = '◆' | '◈' | '◇' | '·';
export const RIPPLE_GLYPHS: Glyph[] = ['◆', '◈', '◇', '·'];

// The diamond set is missing from JetBrains Mono and most system fonts, so it is drawn as paths.
// Sizes match the fallback glyphs measured at 12px: rhombus 7.25px across, 0.75px outline.
function rhombus(g: CanvasRenderingContext2D, a: number) {
  g.beginPath();
  g.moveTo(0, -a);
  g.lineTo(a, 0);
  g.lineTo(0, a);
  g.lineTo(-a, 0);
  g.closePath();
}

const VECTOR: Record<Glyph, (g: CanvasRenderingContext2D, k: number) => void> = {
  '◆': (g, k) => {
    rhombus(g, 3.625 * k);
    g.fill();
  },
  '◇': (g, k) => {
    g.lineWidth = 0.75 * k;
    rhombus(g, 3.25 * k);
    g.stroke();
  },
  '◈': (g, k) => {
    g.lineWidth = 0.75 * k;
    rhombus(g, 3.25 * k);
    g.stroke();
    rhombus(g, 1.95 * k);
    g.fill();
  },
  '·': (g, k) => {
    g.beginPath();
    g.arc(0, 0, 1.04 * k, 0, 2 * Math.PI);
    g.fill();
  },
};

/** One row of pre-rendered sprites, each `box` CSS px square, painted centred. */
export type Atlas = { canvas: HTMLCanvasElement; s: number; box: number; dpr: number };

export function atlas(glyphs: Glyph[], box: number, dpr: number, ink: string, px: number, backdrop?: string): Atlas {
  const s = Math.ceil(box * dpr);
  const canvas = document.createElement('canvas');
  canvas.width = s * glyphs.length;
  canvas.height = s;
  const g = canvas.getContext('2d')!;
  if (backdrop) {
    g.fillStyle = backdrop;
    g.fillRect(0, 0, canvas.width, canvas.height);
  }
  g.fillStyle = ink;
  g.strokeStyle = ink;
  glyphs.forEach((glyph, i) => {
    g.setTransform(dpr, 0, 0, dpr, i * s + s / 2, s / 2);
    VECTOR[glyph](g, px / 12);
  });
  return { canvas, s, box, dpr };
}

export function blit(ctx: CanvasRenderingContext2D, a: Atlas, i: number, x: number, y: number) {
  const dx = Math.round((x - a.box / 2) * a.dpr) / a.dpr;
  const dy = Math.round((y - a.box / 2) * a.dpr) / a.dpr;
  ctx.drawImage(a.canvas, i * a.s, 0, a.s, a.s, dx, dy, a.s / a.dpr, a.s / a.dpr);
}

export function sizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) {
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

type Ripple = { col: number; row: number; t0: number; next: number };

/** The BFS trail: each pointer cell spawns a ripple that lights one Manhattan ring every ringMs, then every lit cell fades. */
export function makeRipples(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const P = RIPPLE.pitch;
  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let amp = new Float32Array(0);
  let life = new Float32Array(0);
  let listed = new Uint8Array(0);
  let active = new Int32Array(0);
  let nActive = 0;
  let dirty = false;
  let lastCell = -1;
  const ripples: Ripple[] = [];

  function lightRing(rp: Ripple, d: number) {
    const a = RIPPLE.peak - ((RIPPLE.peak - RIPPLE.edge) * d) / RIPPLE.rings;
    const ring = RINGS[d];
    for (let k = 0; k < ring.length; k += 2) {
      const col = rp.col + ring[k];
      const row = rp.row + ring[k + 1];
      if (col < 0 || row < 0 || col >= cols || row >= rows) continue;
      const i = row * cols + col;
      if (a < amp[i] * life[i]) continue;
      amp[i] = a;
      life[i] = 1;
      if (!listed[i]) {
        listed[i] = 1;
        active[nActive++] = i;
      }
    }
  }

  return {
    resize(dpr: number) {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      sizeCanvas(canvas, ctx, w, h, dpr);
      cols = Math.ceil(w / P);
      rows = Math.ceil(h / P);
      amp = new Float32Array(cols * rows);
      life = new Float32Array(cols * rows);
      listed = new Uint8Array(cols * rows);
      active = new Int32Array(cols * rows);
      nActive = 0;
      ripples.length = 0;
    },
    poke(x: number, y: number, t: number) {
      const col = Math.floor(x / P);
      const row = Math.floor(y / P);
      const cell = row * cols + col;
      if (cell === lastCell) return;
      lastCell = cell;
      ripples.push({ col, row, t0: t, next: 0 });
    },
    leave() {
      lastCell = -1;
    },
    invalidate() {
      dirty = true;
    },
    frame(t: number, dt: number, sprites: Atlas) {
      for (let k = ripples.length - 1; k >= 0; k--) {
        const rp = ripples[k];
        while (rp.next <= RIPPLE.rings && t >= rp.t0 + (rp.next * RIPPLE.ringMs) / 1000) lightRing(rp, rp.next++);
        if (rp.next > RIPPLE.rings) ripples.splice(k, 1);
      }
      const fade = (dt * 1000) / RIPPLE.fadeMs;
      let kept = 0;
      for (let k = 0; k < nActive; k++) {
        const i = active[k];
        const l = life[i] - fade;
        if (l > 0) {
          life[i] = l;
          active[kept++] = i;
        } else {
          life[i] = 0;
          listed[i] = 0;
        }
      }
      nActive = kept;

      if (!nActive && !dirty) return;
      ctx.clearRect(0, 0, w, h);
      dirty = nActive > 0;
      for (let k = 0; k < nActive; k++) {
        const i = active[k];
        const level = amp[i] / RIPPLE.peak;
        ctx.globalAlpha = amp[i] * life[i];
        blit(ctx, sprites, level > 0.75 ? 0 : level > 0.5 ? 1 : level > 0.25 ? 2 : 3, ((i % cols) + 0.5) * P, (((i / cols) | 0) + 0.5) * P);
      }
      ctx.globalAlpha = 1;
    },
  };
}

export type RippleScene = { frame(time: number, delta: number): void; destroy(): void };

/** A ripple trail on `canvas`, poked by the pointer over `host`; sprites follow the theme and DPR. */
export function createRipple(host: HTMLElement, canvas: HTMLCanvasElement): RippleScene {
  const layer = makeRipples(canvas);
  let dpr = currentDpr();
  let sprites = makeSprites();
  let clock = 0;

  function makeSprites() {
    const css = getComputedStyle(document.documentElement);
    // Filled cells knock the ink out under them; bare glyphs vanish over the portrait's dense ASCII.
    return atlas(RIPPLE_GLYPHS, RIPPLE.pitch, dpr, css.getPropertyValue('--fg').trim(), RIPPLE.glyphPx, css.getPropertyValue('--bg').trim());
  }

  function resize() {
    const nextDpr = currentDpr();
    if (nextDpr !== dpr) {
      dpr = nextDpr;
      sprites = makeSprites();
    }
    layer.resize(dpr);
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    // The host reveals with a transform, so the rect is read per event rather than cached.
    const r = canvas.getBoundingClientRect();
    layer.poke(e.clientX - r.left, e.clientY - r.top, clock);
  }

  const onLeave = () => layer.leave();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);
  const offTheme = onTheme(() => {
    sprites = makeSprites();
    layer.invalidate();
  });

  return {
    frame(time, delta) {
      clock = time / 1000;
      layer.frame(clock, delta / 1000, sprites);
    },
    destroy() {
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      offTheme();
    },
  };
}
