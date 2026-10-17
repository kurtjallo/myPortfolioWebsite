import { useEffect, useRef, type CSSProperties } from 'react';
import { ABOUT, SITE } from '@/data';
import { useFrameLoop, useReducedMotion } from '@/lib/motion';
import { createRipple, type RippleScene } from '@/lib/ripple';
import './About.css';

const [lead, muted] = ABOUT.heading;
const place = `${SITE.location}, ON`;

export function About() {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ripple = useRef<RippleScene | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!frame.current || !canvas.current) return;
    const r = createRipple(frame.current, canvas.current);
    ripple.current = r;
    return () => {
      r.destroy();
      ripple.current = null;
    };
  }, [reduced]);

  useFrameLoop(frame, (time, delta) => ripple.current?.frame(time, delta));

  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-copy" data-reveal style={{ '--slide': '-32px', '--rise': '0px' } as CSSProperties}>
          <span className="eyebrow">About</span>
          <h2 className="h2">
            {lead}
            <br />
            <span className="mute">{muted}</span>
          </h2>
          <p className="lead about-lead">{ABOUT.intro}</p>
          <div className="about-do">
            <p className="label">What I do</p>
            <ol>
              {ABOUT.whatIDo.map((item, i) => (
                <li key={item}>
                  <span className="index">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="about-community">
            <p className="label">Community</p>
            <p className="body">
              <span className="about-fg">{ABOUT.community.lead}</span> {ABOUT.community.rest}
            </p>
          </div>
        </div>
        <figure
          className="about-frame"
          data-reveal
          style={{ '--slide': '32px', '--rise': '0px', '--d': '200ms', '--ar': (ABOUT.portrait.cols * 0.6) / ABOUT.portrait.rows } as CSSProperties}
        >
          <div
            ref={frame}
            className="about-frame-img about-ascii"
            role="img"
            aria-label={`Portrait of ${SITE.name}, drawn in ASCII characters`}
            style={{ '--cols': ABOUT.portrait.cols } as CSSProperties}
          >
            <pre className="about-ascii-light" aria-hidden="true">{ABOUT.portrait.light}</pre>
            <pre className="about-ascii-dark" aria-hidden="true">{ABOUT.portrait.dark}</pre>
            {!reduced && <canvas ref={canvas} className="about-ripple" aria-hidden="true" />}
          </div>
          <figcaption className="about-frame-cap">
            <span className="label">{SITE.name}</span>
            <span className="label">{place}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
