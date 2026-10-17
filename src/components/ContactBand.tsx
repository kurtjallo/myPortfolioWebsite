import { useEffect, useRef, useState } from 'react';
import { CONTACT, LINKS, SITE } from '@/data';
import { useReducedMotion } from '@/lib/motion';
import { copyEmail } from '@/lib/email';
import { localTime } from '@/lib/localTime';
import { useScramble } from '@/hooks/useScramble';
import { Logo } from '@/components/Logo';
import './ContactBand.css';

/** Marquee speed in dot-grid cells per second. */
const SPEED = 7;

const IDLE = 'Email me';
const COPIED = 'Email copied';

const check = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
    <path d="M2.5 12.5l6 6L21.5 5.5" />
  </svg>
);

function CopyEmail() {
  const label = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);
  const scramble = useScramble();
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const text = copied ? COPIED : IDLE;
    if (label.current!.textContent !== text) scramble.run(label.current!, text);
  }, [copied, scramble]);

  const copy = async () => {
    if (!(await copyEmail())) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button type="button" className="pill cb-email" title={SITE.email} onClick={copy}>
        <span ref={label}>{IDLE}</span>
        {copied ? check : <span className="arrow" aria-hidden="true">→</span>}
      </button>
      <p className="label cb-addr">{SITE.email}</p>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </>
  );
}

function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  // Re-aimed at the wall-clock minute on every tick; a fixed 60s interval slips after sleep or throttling.
  useEffect(() => {
    let timer = 0;
    const tick = () => {
      timer = window.setTimeout(() => {
        setNow(new Date());
        tick();
      }, 60_000 - (Date.now() % 60_000));
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return <p className="label cb-time">{localTime(now, SITE.timeZone)}</p>;
}

export function ContactBand() {
  const section = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offscreen, setOffscreen] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver((es) => setOffscreen(!es[es.length - 1].isIntersecting));
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
            <div>
              <p className="label cb-status">
                <span className="dot-live" />
                {CONTACT.status}
              </p>
              <LocalTime />
            </div>
            <div className="cb-ctas">
              <CopyEmail />
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
