import { useHeroScene } from './hero/useHeroScene';
import './hero/hero.css';
import './NotFound.css';

export function NotFound() {
  const { root, ripple, band, reduced } = useHeroScene();

  return (
    <main ref={root} className="hero nf">
      <canvas ref={band} className="hero-field" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      {!reduced && <canvas ref={ripple} className="hero-ripple" aria-hidden="true" />}
      <div className="nf-inner">
        <h1 className="nf-code">404</h1>
        <p className="body">This page doesn't exist.</p>
        <p className="label nf-path">{location.pathname}</p>
        <a className="pill" href="/">
          Back to the site <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </main>
  );
}
