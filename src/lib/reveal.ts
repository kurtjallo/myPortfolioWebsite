import { useEffect, type RefObject } from 'react';

/**
 * Sets `data-shown` on every `[data-reveal]` inside `root` once it scrolls into view (styles in tokens.css),
 * including ones added after mount.
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
    const watch = (n: Element) => {
      if (n.matches('[data-reveal]')) io.observe(n);
      n.querySelectorAll('[data-reveal]').forEach((r) => io.observe(r));
    };
    watch(el);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) for (const n of m.addedNodes) if (n instanceof Element) watch(n);
    });
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [root]);
}
