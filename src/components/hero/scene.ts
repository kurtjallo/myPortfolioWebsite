import { atlas, blit, createRipple, sizeCanvas, trackCanvas, type Atlas, type Glyph } from '@/lib/ripple';

// Griffin's AsciiPattern field (full hero), drawn with Kurt's diamond set. Cells are 12x14, sampled at (col+.5)*.13.
const BAND = { cw: 12, ch: 14, scale: 0.13, spacing: 0.08, speed: 0.9, alpha: [0.06, 0.13, 0.29, 0.58].map((a) => a * 0.6) };
const OCTAVES = [[1, 1], [2.2, 0.7], [4.5, 0.4]] as const;

const BAND_GLYPHS: Glyph[] = ['·', '◇', '◈', '◆'];

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

export type SceneEls = {
  root: HTMLElement;
  ripple: HTMLCanvasElement | null;
  band: HTMLCanvasElement;
};

export type Scene = {
  frame(time: number, delta: number): void;
  destroy(): void;
};

/** Owns the hero canvases: the code band, and the ripple trail over it when motion is allowed. Both run on the frame loop's clock. */
export function createScene({ root, ripple, band }: SceneEls): Scene {
  const layer = makeBand(band);
  const trail = ripple && createRipple(root, ripple, { backdrop: false });
  const view = trackCanvas(band, layer, (dpr, fg) => atlas(BAND_GLYPHS, BAND.ch, dpr, fg, 12), drawBand);
  let clock = 0;
  let frameNo = 0;

  function drawBand() {
    layer.draw(clock * BAND.speed, view.sprites());
  }

  return {
    frame(time, delta) {
      clock = time / 1000;
      trail?.frame(time, delta);
      if (++frameNo % 2 === 0) drawBand();
    },
    destroy() {
      view.destroy();
      trail?.destroy();
    },
  };
}
