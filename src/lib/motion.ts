import { useEffect, useRef, useSyncExternalStore, type RefObject } from 'react';

const REDUCE = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  return matchMedia(REDUCE).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    (fn) => {
      const mq = matchMedia(REDUCE);
      mq.addEventListener('change', fn);
      return () => mq.removeEventListener('change', fn);
    },
    prefersReducedMotion,
    () => false,
  );
}

/** Device pixel ratio for canvases, capped at 2. */
export function dpr() {
  return Math.min(window.devicePixelRatio || 1, 2);
}

/**
 * Run `tick(timeMs, deltaMs)` every animation frame, but only while `ref` is on screen,
 * the tab is visible, and the user allows motion. Time only advances while running.
 */
export function useFrameLoop(ref: RefObject<Element | null>, tick: (time: number, delta: number) => void) {
  const tickRef = useRef(tick);
  tickRef.current = tick;
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    let onScreen = false;
    let last = 0;
    let clock = 0;

    const frame = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;
      clock += delta;
      tickRef.current(clock, delta);
      raf = requestAnimationFrame(frame);
    };
    const update = () => {
      const run = onScreen && !document.hidden;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    // Entries for one target batch up when the callback is delayed; the last one is the current state.
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', update);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      cancelAnimationFrame(raf);
    };
  }, [ref, reduced]);
}
