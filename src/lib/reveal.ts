import { useEffect, type RefObject } from 'react';

/**
 * Sets `data-shown` on every `[data-reveal]` inside `root` once it scrolls into view (styles in tokens.css).
 * An attribute, not a class: React rewrites `className` on re-render and would erase a class added here.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', '');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    el.querySelectorAll('[data-reveal]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root]);
}
