import { useSyncExternalStore } from 'react';

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

export function onTheme(fn: (theme: Theme) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(onTheme, getTheme, () => 'light');
}
