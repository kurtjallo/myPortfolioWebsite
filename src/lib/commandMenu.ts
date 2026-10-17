export const SHORTCUT = /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

const listeners = new Set<() => void>();

/** The dialog's own `open` state is the source of truth, so callers only signal intent. */
export function openCommandMenu() {
  listeners.forEach((fn) => fn());
}

export function onOpenCommandMenu(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
