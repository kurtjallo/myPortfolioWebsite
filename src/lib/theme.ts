import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { prefersReducedMotion } from '@/lib/motion';

export type Theme = 'light' | 'dark';

const KEY = 'theme';
const listeners = new Set<(theme: Theme) => void>();

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// The attribute is set before listeners run, so canvases re-reading CSS variables see the new colours.
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  listeners.forEach((fn) => fn(theme));
}

/** Reveals `next` as a diamond growing from `from` (default: the viewport centre) until it just covers the viewport. */
export function switchTheme(next: Theme, from = { x: innerWidth / 2, y: innerHeight / 2 }) {
  if (!document.startViewTransition || prefersReducedMotion()) return setTheme(next);
  const { x, y } = from;
  const R = Math.max(x, innerWidth - x) + Math.max(y, innerHeight - y);
  const hole = (r: number) =>
    `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px, ${x}px ${y - r}px)`;
  const root = document.documentElement;
  const noTransitions = document.createElement('style');
  noTransitions.textContent = '*, *::before, *::after { transition: none !important; }';
  // flushSync so React-rendered labels commit inside the update, before the reveal starts.
  const t = document.startViewTransition(() => {
    document.head.append(noTransitions);
    flushSync(() => setTheme(next));
    // Captured elements aren't hit-testable, so only the old view is captured and the live page stays clickable beneath it.
    root.style.viewTransitionName = 'none';
  });
  t.finished.finally(() => {
    noTransitions.remove();
    root.style.removeProperty('view-transition-name');
  });
  // A newer switch skips this one and rejects `ready`, which Safari reports as unhandled.
  t.ready.then(
    () => {
      noTransitions.remove();
      root.animate(
        { clipPath: [hole(0), hole(R)] },
        { duration: 650, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-old(root)' },
      );
    },
    () => {},
  );
}

export function onTheme(fn: (theme: Theme) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(onTheme, getTheme, () => 'light');
}
