import { useEffect, useRef } from 'react';
import { SITE } from '@/data';
import { useFrameLoop, useReducedMotion } from '@/lib/motion';
import { onTheme } from '@/lib/theme';
import { createScene, type Scene } from './scene';
import './hero.css';

const ROWS = Array.from({ length: 8 }, (_, i) => 12.5 * (i + 1));
const COLS = Array.from({ length: 12 }, (_, i) => (100 / 12) * (i + 1));

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ripple = useRef<HTMLCanvasElement>(null);
  const band = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || !band.current) return;
    const s = createScene({ root: root.current, ripple: ripple.current, band: band.current });
    scene.current = s;
    const offTheme = onTheme(s.retheme);
    return () => {
      offTheme();
      s.destroy();
      scene.current = null;
    };
  }, [reduced]);

  useFrameLoop(root, (time, delta) => scene.current?.frame(time, delta));

  return (
    <section id="home" ref={root} className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid">
          {ROWS.map((top) => (
            <i key={`r${top}`} className="hero-grid-row" style={{ top: `${top}%` }} />
          ))}
          {COLS.map((left) => (
            <i key={`c${left}`} className="hero-grid-col" style={{ left: `${left}%` }} />
          ))}
        </div>
      </div>
      {!reduced && <canvas ref={ripple} className="hero-ripple" aria-hidden="true" />}
      <div className="container hero-inner">
        <div className="hero-main">
          <p className="eyebrow hero-eyebrow" data-reveal>
            {`${SITE.role} · ${SITE.location}`}
          </p>
          <h1 className="h1 hero-name" data-reveal>
            {SITE.name}
          </h1>
          <div className="hero-ctas" data-reveal>
            <a className="pill" href="#projects">
              View projects <span className="arrow">→</span>
            </a>
            <a className="pill outline" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </div>
      <canvas ref={band} className="hero-band" aria-hidden="true" />
    </section>
  );
}
