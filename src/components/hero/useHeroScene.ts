import { useEffect, useRef } from 'react';
import { useFrameLoop, useReducedMotion } from '@/lib/motion';
import { createScene, type Scene } from './scene';

/** Runs the hero scene on the canvases behind the returned refs. Render the ripple canvas only when `reduced` is false. */
export function useHeroScene() {
  const root = useRef<HTMLElement>(null);
  const ripple = useRef<HTMLCanvasElement>(null);
  const band = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || !band.current) return;
    const s = createScene({ root: root.current, ripple: ripple.current, band: band.current });
    scene.current = s;
    return () => {
      s.destroy();
      scene.current = null;
    };
  }, [reduced]);

  useFrameLoop(root, (time, delta) => scene.current?.frame(time, delta));

  return { root, ripple, band, reduced };
}
