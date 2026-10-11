import { useEffect, useRef, useState } from 'react';
import { CONTACT, LINKS, SITE } from '@/data';
import { useReducedMotion } from '@/lib/motion';
import { Logo } from '@/components/Logo';
import './ContactBand.css';

/** Marquee speed in dot-grid cells per second. */
const SPEED = 7;

export function ContactBand() {
  const section = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offscreen, setOffscreen] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(section.current!);
    return () => io.disconnect();
  }, []);

  // One loop is half the track. Everything is sized in grid cells, so the track resizes when the
  // pixel font swaps in or the cell size changes, and the duration is recomputed from it.
  useEffect(() => {
    if (reduced) return;
    const f = field.current!;
    const t = track.current!;
    const ro = new ResizeObserver(() => {
      const cell = f.clientWidth / parseFloat(getComputedStyle(f).getPropertyValue('--cols'));
      setDuration(t.getBoundingClientRect().width / 2 / (cell * SPEED));
    });
    ro.observe(t);
    return () => ro.disconnect();
  }, [reduced]);

  const running = !reduced && duration !== null;

  return (
    <section id="contact" ref={section} className={offscreen ? 'section cb cb-off' : 'section cb'}>
      <div className="container cb-eyebrow">
        <span className="eyebrow" data-reveal>
          Contact
        </span>
      </div>
      <h2 className="sr-only">{CONTACT.marquee}</h2>
      <div className="cb-band" data-reveal>
        <div className="cb-field" ref={field}>
          <div className="cb-scroller">
            <div
              ref={track}
              className={running ? 'cb-track cb-run' : 'cb-track'}
              style={running ? { animationDuration: `${duration.toFixed(2)}s` } : undefined}
            >
              <p className="cb-text" aria-hidden="true">
                {CONTACT.marquee}
              </p>
              <p className="cb-text" aria-hidden="true">
                {CONTACT.marquee}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cb-close" data-reveal>
          <p className="cb-body">{CONTACT.body}</p>
          <div className="cb-reach">
            <p className="label cb-status">
              <span className="dot-live" />
              {CONTACT.status}
            </p>
            <div className="cb-ctas">
              <a className="pill" href={LINKS.email.href}>
                Email me <span className="arrow">→</span>
              </a>
              <a className="pill outline" href={LINKS.linkedin.href} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="pill outline" href={LINKS.github.href} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
          <p className="label cb-sign">
            <Logo size={20} />
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="cb-more">
            <a className="label" href={LINKS.events.href} target="_blank" rel="noopener noreferrer">
              {LINKS.events.label} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
