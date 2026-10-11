import { dpr as currentDpr } from '@/lib/motion';

const RIPPLE = { pitch: 14, rings: 8, ringMs: 35, fadeMs: 1100, peak: 0.58, edge: 0.12, glyphPx: 12 };
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

// Griffin's AsciiPattern band, drawn with Kurt's diamond set. Cells are 12x14, sampled at (col+.5)*.13.
const BAND = { cw: 12, ch: 14, scale: 0.13, spacing: 0.08, speed: 0.9, alpha: [0.06, 0.13, 0.29, 0.58].map((a) => a * 0.6) };
const OCTAVES = [[1, 1], [2.2, 0.7], [4.5, 0.4]] as const;

type Glyph = '◆' | '◈' | '◇' | '·';
const RIPPLE_GLYPHS: Glyph[] = ['◆', '◈', '◇', '·'];
const BAND_GLYPHS: Glyph[] = ['·', '◇', '◈', '◆'];

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
type Atlas = { canvas: HTMLCanvasElement; s: number; box: number; dpr: number };

function atlas(glyphs: Glyph[], box: number, dpr: number, ink: string, px: number): Atlas {
  const s = Math.ceil(box * dpr);
  const canvas = document.createElement('canvas');
  canvas.width = s * glyphs.length;
  canvas.height = s;
  const g = canvas.getContext('2d')!;
  g.fillStyle = ink;
  g.strokeStyle = ink;
  glyphs.forEach((glyph, i) => {
    g.setTransform(dpr, 0, 0, dpr, i * s + s / 2, s / 2);
    VECTOR[glyph](g, px / 12);
  });
  return { canvas, s, box, dpr };
}

function blit(ctx: CanvasRenderingContext2D, a: Atlas, i: number, x: number, y: number) {
  const dx = Math.round((x - a.box / 2) * a.dpr) / a.dpr;
  const dy = Math.round((y - a.box / 2) * a.dpr) / a.dpr;
  ctx.drawImage(a.canvas, i * a.s, 0, a.s, a.s, dx, dy, a.s / a.dpr, a.s / a.dpr);
}

function sizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) {
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Every term of Griffin's height field is a column factor times a row factor (sin(P+Q) expanded),
// so a redraw needs 7 trig values per column and per row instead of ~30 per cell.
function colTerms(tab: Float64Array, n: number, j: number, X: number, T: number) {
  tab[j] = Math.sin(0.8 * X + 0.3 * T);
  tab[n + j] = Math.sin(1.6 * X + 0.15 * T);
  tab[2 * n + j] = Math.cos(1.6 * X + 0.15 * T);
  tab[3 * n + j] = Math.sin(0.3 * X - 0.4 * T);
  tab[4 * n + j] = Math.sin(0.5 * X + 0.35 * T);
  tab[5 * n + j] = Math.cos(0.5 * X + 0.35 * T);
  tab[6 * n + j] = Math.sin(2.5 * X + 0.1 * T);
}

function rowTerms(tab: Float64Array, n: number, r: number, Y: number, T: number) {
  tab[r] = Math.cos(0.6 * Y + 0.2 * T);
  tab[n + r] = Math.sin(1.2 * Y);
  tab[2 * n + r] = Math.cos(1.2 * Y);
  tab[3 * n + r] = Math.cos(0.4 * Y + 0.25 * T);
  tab[4 * n + r] = Math.sin(0.5 * Y);
  tab[5 * n + r] = Math.cos(0.5 * Y);
  tab[6 * n + r] = Math.cos(2.8 * Y - 0.12 * T);
}

function base(ct: Float64Array, nc: number, j: number, rt: Float64Array, nr: number, r: number) {
  return (
    0.5 * ct[j] * rt[r] +
    0.25 * (ct[nc + j] * rt[2 * nr + r] + ct[2 * nc + j] * rt[nr + r]) +
    0.6 * ct[3 * nc + j] * rt[3 * nr + r] +
    0.3 * (ct[4 * nc + j] * rt[5 * nr + r] + ct[5 * nc + j] * rt[4 * nr + r]) +
    0.15 * ct[6 * nc + j] * rt[6 * nr + r]
  );
}

// ct/rt hold octaves 0..2, then octave 0 shifted by +0.01 and -0.01 for the slope boost.
function bandField(cols: number, rows: number, t: number, ct: Float64Array[], rt: Float64Array[], out: Int8Array) {
  const k = BAND.scale;
  OCTAVES.forEach(([s, ts], o) => {
    for (let j = 0; j < cols; j++) colTerms(ct[o], cols, j, s * (j + 0.5) * k, ts * t);
    for (let r = 0; r < rows; r++) rowTerms(rt[o], rows, r, s * (r + 0.5) * k, ts * t);
  });
  for (let j = 0; j < cols; j++) {
    colTerms(ct[3], cols, j, (j + 0.5) * k + 0.01, t);
    colTerms(ct[4], cols, j, (j + 0.5) * k - 0.01, t);
  }
  for (let r = 0; r < rows; r++) {
    rowTerms(rt[3], rows, r, (r + 0.5) * k + 0.01, t);
    rowTerms(rt[4], rows, r, (r + 0.5) * k - 0.01, t);
  }
  for (let r = 0; r < rows; r++) {
    for (let j = 0; j < cols; j++) {
      let h = base(ct[0], cols, j, rt[0], rows, r) + 0.4 * base(ct[1], cols, j, rt[1], rows, r) + 0.15 * base(ct[2], cols, j, rt[2], rows, r);
      h = Math.max(0, Math.min(1, (h + 1.8) / 3.6));
      const f = (h % BAND.spacing) / BAND.spacing;
      const line = f < 0.12 || f > 0.88;
      let c = line ? Math.round(200 * h + 55) : Math.round(140 * h);
      if (line) {
        const gx = base(ct[3], cols, j, rt[0], rows, r) - base(ct[4], cols, j, rt[0], rows, r);
        const gy = base(ct[0], cols, j, rt[3], rows, r) - base(ct[0], cols, j, rt[4], rows, r);
        const d = 12 * Math.sqrt(gx * gx + gy * gy);
        if (d > 0.5) c = Math.min(255, c + Math.round(40 * d));
      }
      out[r * cols + j] = c >= 160 ? 3 : c >= 100 ? 2 : c >= 50 ? 1 : c >= 15 ? 0 : -1;
    }
  }
}

function makeBand(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let ct: Float64Array[] = [];
  let rt: Float64Array[] = [];
  let levels = new Int8Array(0);
  return {
    resize(dpr: number) {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      sizeCanvas(canvas, ctx, w, h, dpr);
      cols = Math.ceil(w / BAND.cw) + 1;
      rows = Math.ceil(h / BAND.ch) + 1;
      ct = Array.from({ length: 5 }, () => new Float64Array(7 * cols));
      rt = Array.from({ length: 5 }, () => new Float64Array(7 * rows));
      levels = new Int8Array(cols * rows);
    },
    draw(t: number, sprites: Atlas) {
      if (!cols) return;
      bandField(cols, rows, t, ct, rt, levels);
      ctx.clearRect(0, 0, w, h);
      for (let lv = 0; lv < 4; lv++) {
        ctx.globalAlpha = BAND.alpha[lv];
        for (let i = 0; i < levels.length; i++) {
          if (levels[i] === lv) blit(ctx, sprites, lv, (i % cols) * BAND.cw + BAND.cw / 2, ((i / cols) | 0) * BAND.ch + BAND.ch / 2);
        }
      }
      ctx.globalAlpha = 1;
    },
  };
}

type Ripple = { col: number; row: number; t0: number; next: number };

/** The BFS trail: each pointer cell spawns a ripple that lights one Manhattan ring every ringMs, then every lit cell fades. */
function makeRipples(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const P = RIPPLE.pitch;
  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let amp = new Float32Array(0);
  let life = new Float32Array(0);
  let listed = new Uint8Array(0);
  let blocked = new Uint8Array(0);
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
      if (blocked[i] || a < amp[i] * life[i]) continue;
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
      blocked = new Uint8Array(cols * rows);
      active = new Int32Array(cols * rows);
      nActive = 0;
      ripples.length = 0;
    },
    clip(bandTop: number) {
      for (let i = 0; i < blocked.length; i++) {
        blocked[i] = (((i / cols) | 0) + 1) * P > bandTop ? 1 : 0;
        if (blocked[i]) life[i] = 0;
      }
    },
    poke(x: number, y: number, t: number) {
      const col = Math.floor(x / P);
      const row = Math.floor(y / P);
      const cell = row * cols + col;
      if (cell === lastCell) return;
      lastCell = cell;
      if (!blocked[cell]) ripples.push({ col, row, t0: t, next: 0 });
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

export type SceneEls = {
  root: HTMLElement;
  ripple: HTMLCanvasElement | null;
  band: HTMLCanvasElement;
};

export type Scene = {
  frame(time: number, delta: number): void;
  retheme(): void;
  destroy(): void;
};

/** Owns the hero canvases: the ripple trail and the code band share one clock, pointer, DPR and set of sprites. */
export function createScene({ root, ripple, band }: SceneEls): Scene {
  const bandLayer = makeBand(band);
  const rippleLayer = ripple && makeRipples(ripple);

  let dpr = currentDpr();
  let sprites = makeSprites();
  let clock = 0;
  let frameNo = 0;

  function makeSprites() {
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim();
    return {
      ripple: atlas(RIPPLE_GLYPHS, RIPPLE.pitch, dpr, ink, RIPPLE.glyphPx),
      band: atlas(BAND_GLYPHS, BAND.ch, dpr, ink, 12),
    };
  }

  function drawBand() {
    bandLayer.draw(clock * BAND.speed, sprites.band);
  }

  function resize() {
    const nextDpr = currentDpr();
    if (nextDpr !== dpr) {
      dpr = nextDpr;
      sprites = makeSprites();
    }
    bandLayer.resize(dpr);
    if (rippleLayer) {
      rippleLayer.resize(dpr);
      rippleLayer.clip(band.getBoundingClientRect().top - root.getBoundingClientRect().top);
    }
    drawBand();
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    const hb = root.getBoundingClientRect();
    const x = e.clientX - hb.left;
    const y = e.clientY - hb.top;
    if (x >= 0 && y >= 0 && x < hb.width && y < hb.height) rippleLayer?.poke(x, y, clock);
    else rippleLayer?.leave();
  }

  function onOut(e: MouseEvent) {
    if (!e.relatedTarget) rippleLayer?.leave();
  }

  const ro = new ResizeObserver(resize);
  if (ripple) ro.observe(ripple);
  ro.observe(band);
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('mouseout', onOut);

  return {
    frame(time, delta) {
      clock = time / 1000;
      rippleLayer?.frame(clock, delta / 1000, sprites.ripple);
      if (++frameNo % 2 === 0) drawBand();
    },
    retheme() {
      sprites = makeSprites();
      drawBand();
      rippleLayer?.invalidate();
    },
    destroy() {
      ro.disconnect();
      removeEventListener('pointermove', onMove);
      removeEventListener('mouseout', onOut);
    },
  };
}
