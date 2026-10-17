import type { LayerId } from '@/data';
import { pad } from '@/lib/pad';

// Griffin's slab geometry: a true-iso slab (half-diagonals 218.357 x 126.068, 16 thick) centred at y 269.
// Top-face art is authored on a flat 252x252 page: x runs up the upper-left edge, y down the lower-left edge.

export type Point = [x: number, y: number];

/** SVG markup for one plate (pl-* classes, styled by the Stack) and the two callout anchors on it, in view-box units. */
export type Plate = { markup: string; anchors: [Point, Point] };

export const VIEW_W = 624;
export const VIEW_H = 538;

const HW = 218.357, HH = 126.068, CX = 311.921, CY = 269.066, TH = 16;
const S = Math.hypot(HW, HH);
const K = HW / S, J = HH / S;
const n = (v: number) => +v.toFixed(2);
const at = (x: number, y: number, z = 0): Point => [n(CX - HW + K * (x + y)), n(CY + J * (y - x) - z)];
const path = (...runs: Point[][]) => runs.map((r) => 'M' + r.map(([x, y]) => `${x} ${y}`).join('L')).join('');
const VE = 'vector-effect="non-scaling-stroke"';
const MONO = 'font-family="JetBrains Mono, ui-monospace, Menlo, monospace"';

const box = (x0: number, y0: number, x1: number, y1: number, z0: number, h: number) => {
  const z1 = z0 + h;
  const top = [at(x0, y0, z1), at(x1, y0, z1), at(x1, y1, z1), at(x0, y1, z1)];
  const left = [at(x0, y0, z1), at(x0, y1, z1), at(x0, y1, z0), at(x0, y0, z0)];
  const front = [at(x0, y1, z1), at(x1, y1, z1), at(x1, y1, z0), at(x0, y1, z0)];
  const edge = [
    [...top, top[0]],
    [at(x0, y0, z1), at(x0, y0, z0), at(x0, y1, z0), at(x1, y1, z0), at(x1, y1, z1)],
    [at(x0, y1, z1), at(x0, y1, z0)],
  ];
  return `<path class="pl-face pl-side" d="${path(left)}Z"/><path class="pl-face pl-side" d="${path(front)}Z"/>` +
    `<path class="pl-face" d="${path(top)}Z"/><path class="pl-stroke pl-frame" ${VE} d="${path(...edge)}"/>`;
};
const slab = () => box(0, 0, S, S, -TH, TH);

const onPage = (z: number, inner: string) =>
  `<g transform="matrix(${n(K * 1e3) / 1e3} ${-J} ${n(K * 1e3) / 1e3} ${J} ${n(CX - HW)} ${n(CY - z)})">${inner}</g>`;
const detail = (z: number, inner: string) => onPage(z, `<g class="pl-detail">${inner}</g>`);

type RectOpts = { rx?: number; op?: number };
const rect = (x: number, y: number, w: number, h: number, o: RectOpts = {}) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${o.rx ? ` rx="${o.rx}"` : ''}${o.op != null ? ` fill-opacity="${o.op}"` : ''}/>`;
const frame = (x: number, y: number, w: number, h: number, rx = 0) =>
  `<rect class="pl-stroke pl-frame" ${VE} x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${rx}"` : ''}/>`;
const rule = (x0: number, y0: number, x1: number, y1: number) =>
  `<path class="pl-stroke pl-frame" ${VE} d="M${n(x0)} ${n(y0)}L${n(x1)} ${n(y1)}"/>`;
const text = (x: number, y: number, s: string, size: number, o: { op?: number; ls?: number } = {}) =>
  `<text x="${n(x)}" y="${n(y)}" font-size="${size}" ${MONO}${o.op != null ? ` fill-opacity="${o.op}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;
const dot = (x: number, y: number, r: number, op?: number) =>
  `<circle cx="${n(x)}" cy="${n(y)}" r="${r}"${op != null ? ` fill-opacity="${op}"` : ''}/>`;

// Page lines x + y = c render as screen-vertical strokes.
const hatch = (x0: number, y0: number, x1: number, y1: number, step: number, op = 0.55) => {
  let d = '';
  for (let c = x0 + y0 + step / 2; c < x1 + y1; c += step) {
    const a = Math.max(x0, c - y1), b = Math.min(x1, c - y0);
    if (b > a) d += `M${n(a)} ${n(c - a)}L${n(b)} ${n(c - b)}`;
  }
  return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="${op}" ${VE}/>`;
};

const frontend = () => {
  const cards = [0, 1, 2].map((i) => 22 + i * 72.4);
  return slab() +
    detail(0,
      [24, 33, 42].map((x) => dot(x, 23, 2.8)).join('') +
      rect(58, 18, 124, 10, { rx: 5, op: 0.28 }) +
      rect(22, 44, 9, 9) +
      [150, 176, 202].map((x) => rect(x, 46.5, 20, 4.5, { rx: 2.2, op: 0.7 })).join('') +
      rect(22, 66, 94, 11, { rx: 1.5 }) +
      rect(22, 82, 70, 11, { rx: 1.5 }) +
      rect(22, 100, 88, 4.5, { rx: 2, op: 0.55 }) +
      rect(22, 108.5, 64, 4.5, { rx: 2, op: 0.55 }) +
      rect(22, 120, 40, 12, { rx: 6 }) +
      rect(130, 62, 100, 70, { op: 0.1 }) +
      hatch(130, 62, 230, 132, 9) +
      cards.map((x) => rect(x, 148, 64, 42, { op: 0.22 }) + rect(x + 8, 198, 40, 5, { rx: 2.5 }) + rect(x + 8, 208, 26, 4.5, { rx: 2.2, op: 0.55 })).join('')) +
    onPage(0,
      frame(12, 12, 228, 228) +
      rule(12, 34, 240, 34) +
      frame(130, 62, 100, 70) +
      cards.map((x) => frame(x, 148, 64, 82) + rule(x, 190, x + 64, 190)).join(''));
};

const ROW0 = 64, ROW = 17;
type CodeRow = { i: number; t: string } | { i: number; w: number[] };
const CODE: CodeRow[] = [
  { t: 'def detect(img):', i: 0 },
  { i: 1, w: [44, 16, 72] },
  { i: 1, w: [26, 104] },
  { i: 2, w: [60, 42] },
  { i: 2, w: [30, 22, 70] },
  { i: 1, w: [84] },
  { i: 1, w: [20, 50, 34] },
  { t: 'return verdict', i: 1 },
];
const backend = () => {
  const x0 = 40, tab = 16;
  const code = CODE.map((r, k) => {
    const y = ROW0 + k * ROW, x = x0 + r.i * tab;
    const num = text(16, y + 3, pad(k), 7, { op: 0.5 });
    if ('t' in r) return num + text(x, y + 4, r.t, 11.5);
    let cx = x;
    return num + r.w.map((w) => {
      const b = rect(cx, y - 4, w, 8, { rx: 4 });
      cx += w + 6;
      return b;
    }).join('');
  }).join('');
  return slab() +
    detail(0,
      text(18, 33, 'POST /verify', 16, { ls: 0.4 }) +
      text(194, 31.5, '200 OK', 8.5, { op: 0.8 }) +
      code +
      rect(12, 206, 228, 34, { op: 0.12 }) +
      text(22, 227, '&gt; 200 OK · 38ms', 10, { op: 0.9 })) +
    onPage(0,
      frame(186, 21, 50, 15, 7.5) +
      rule(12, 44, 240, 44) +
      rule(32, 50, 32, 196) +
      frame(12, 206, 228, 34));
};

const PKG = [48, 204], PZ = 7, DIE = [92, 160], DZ = 4;
const MARK: Point = [184, 68];
const data = () => {
  const pins: string[] = [];
  for (let k = 0; k < 11; k++) {
    const p = 61 + k * 13 - 3;
    pins.push(rect(22, p, PKG[0] - 22, 6), rect(PKG[1], p, 230 - PKG[1], 6), rect(p, 22, 6, PKG[0] - 22), rect(p, PKG[1], 6, 230 - PKG[1]));
  }
  const cores: string[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) cores.push(rect(DIE[0] + 8 + i * 18.7, DIE[0] + 8 + j * 18.7, 14, 14, { op: i === 1 && j === 1 ? 0.55 : 0.2 }));
  }
  const [mx, my] = MARK, mo = 13, mi = 7.5;
  return slab() +
    detail(0, pins.join('')) +
    onPage(0, frame(10, 10, S - 20, S - 20)) +
    box(PKG[0], PKG[0], PKG[1], PKG[1], 0, PZ) +
    detail(PZ, text(60, 72, 'KURT·AI', 12.5, { ls: 0.6 }) + text(60, 84, 'FULL·STACK', 7.5, { op: 0.6, ls: 0.4 })) +
    onPage(PZ, rule(PKG[0], PKG[0] + 14, PKG[0] + 14, PKG[0]) + frame(mx - mo, my - mo, mo * 2, mo * 2)) +
    onPage(PZ, `<rect class="pl-mark" x="${mx - mi}" y="${my - mi}" width="${mi * 2}" height="${mi * 2}"/>`) +
    box(DIE[0], DIE[0], DIE[1], DIE[1], PZ, DZ) +
    detail(PZ + DZ, cores.join(''));
};

const BARS = '3121413211231412213124113212411321231412'.split('').map(Number);
const cloud = () => {
  const slots = [66, 98, 130, 162];
  let bx = 22;
  const bars: string[] = [];
  BARS.forEach((w, k) => {
    if (bx + w > 232) return;
    if (k % 2 === 0) bars.push(rect(bx, 206, w * 1.6, 28));
    bx += w * 1.6 + 1.6;
  });
  return slab() +
    detail(0,
      text(22, 32, 'CLOUD·DEVOPS', 12, { ls: 0.5 }) +
      text(22, 45, 'us-east-1', 8, { op: 0.6 }) +
      slots.map((y, k) =>
        Array.from({ length: 9 }, (_, i) => rect(24 + i * 6.5, y + 6, 3, 14, { rx: 1.2, op: 0.6 })).join('') +
        rect(96, y + 10.5, 70 - k * 9, 5, { rx: 2.5, op: 0.3 }) +
        dot(212, y + 13, 3) + dot(224, y + 13, 3, k === 2 ? 0.25 : 1)).join('') +
      bars.join('')) +
    onPage(0,
      frame(14, 16, 106, 36) +
      slots.map((y) => frame(14, y, 224, 26, 2)).join('') +
      frame(14, 200, 224, 40));
};

export const PLATES: Record<LayerId, Plate> = {
  frontend: { markup: `<g>${frontend()}</g>`, anchors: [at(64, 71.5), at(214, 104)] },
  backend: { markup: `<g>${backend()}</g>`, anchors: [at(47, 44), at(178, ROW0 + 2 * ROW)] },
  data: { markup: `<g>${data()}</g>`, anchors: [at(110, 35), at(...MARK, PZ)] },
  cloud: { markup: `<g>${cloud()}</g>`, anchors: [at(70, 79), at(224, 79)] },
};
