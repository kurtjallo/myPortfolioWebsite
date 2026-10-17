import { SITE } from '@/data';
import { useHeroScene } from './useHeroScene';
import './hero.css';


export function Hero() {
  const { root, ripple, band, reduced } = useHeroScene();

  return (
    <section id="home" ref={root} className="hero">
      <canvas ref={band} className="hero-field" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
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
    </section>
  );
}
