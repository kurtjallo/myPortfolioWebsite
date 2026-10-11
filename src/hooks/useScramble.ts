import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>_';

export type ScrambleOptions = {
  /** Wait before the first glyph resolves, in ms. */
  delay?: number;
  /** Time for the whole text to resolve, in ms. */
  dur?: number;
  /** Hold the node at its current width while it scrambles. */
  lockWidth?: boolean;
};

export type Scrambler = {
  run(node: HTMLElement, finalText: string, opts?: ScrambleOptions): void;
  stop(): void;
};

type Job = { text: string; dur: number; start: number; rolled: number; rand: string[]; ok: HTMLElement; x: HTMLElement };

/**
 * Resolves text left to right out of random glyphs. While a run is live it owns the node's children
 * (`.scramble-ok` then `.scramble-x`), then leaves `finalText` as plain text. Only pass nodes whose
 * React-rendered text is a single string that does not change while the run is live.
 */
export function useScramble(glyphs = GLYPHS): Scrambler {
  const [scrambler] = useState(() => createScrambler(glyphs));
  useEffect(() => scrambler.stop, [scrambler]);
  return scrambler;
}

function createScrambler(glyphs: string): Scrambler {
  const jobs = new Map<HTMLElement, Job>();
  let raf = 0;

  const roll = (text: string) =>
    [...text].map((c) => (/[A-Za-z0-9]/.test(c) ? glyphs[(Math.random() * glyphs.length) | 0] : c));

  const settle = (node: HTMLElement, text: string) => {
    node.textContent = text;
    node.style.width = '';
  };

  const tick = (now: number) => {
    raf = 0;
    for (const [node, job] of jobs) {
      const t = now - job.start;
      if (now - job.rolled > 45) {
        job.rand = roll(job.text);
        job.rolled = now;
      }
      if (t >= job.dur) {
        settle(node, job.text);
        jobs.delete(node);
        continue;
      }
      const n = t <= 0 ? 0 : Math.floor((t / job.dur) * job.text.length);
      job.ok.textContent = job.text.slice(0, n);
      job.x.textContent = job.rand.slice(n).join('');
    }
    if (jobs.size) raf = requestAnimationFrame(tick);
  };

  return {
    run(node, text, { delay = 0, dur = 600, lockWidth = false } = {}) {
      if (prefersReducedMotion()) {
        jobs.delete(node);
        settle(node, text);
        return;
      }
      if (lockWidth && !jobs.has(node)) node.style.width = `${node.getBoundingClientRect().width}px`;
      const ok = document.createElement('span');
      const x = document.createElement('span');
      ok.className = 'scramble-ok';
      x.className = 'scramble-x';
      const rand = roll(text);
      x.textContent = rand.join('');
      node.replaceChildren(ok, x);
      jobs.set(node, { text, dur, start: performance.now() + delay, rolled: 0, rand, ok, x });
      if (!raf) raf = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      jobs.forEach((job, node) => settle(node, job.text));
      jobs.clear();
    },
  };
}
