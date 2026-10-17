import type { CSSProperties } from 'react';
import { GITHUB_URL, PROJECTS, PROJECTS_HEADING, SITE } from '@/data';
import './Projects.css';

const vars = (v: Record<string, string>) => v as CSSProperties;
const pad = (i: number) => String(i + 1).padStart(2, '0');

export function Projects() {
  const [line1, line2] = PROJECTS_HEADING;
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="pj-head">
          <span className="eyebrow" data-reveal>Projects</span>
          <h2 className="h2" data-reveal style={vars({ '--d': '80ms' })}>
            {line1}
            <br />
            <span className="mute">{line2}</span>
          </h2>
        </div>
        <div className="pj-rows">
          {PROJECTS.map((p, i) => (
            <article key={p.name} className="pj-row" data-reveal style={vars({ '--rise': '32px', '--d': `${i * 100}ms` })}>
              <span className="index pj-idx">{pad(i)}</span>
              <div className="pj-main">
                <h3 className="pj-title">{p.name}</h3>
                <span className="label pj-event">{p.event}</span>
                <p className="pj-desc">{p.description}</p>
              </div>
              <ul className="pj-stack">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
              <span className="pj-arrow" aria-hidden="true">↗</span>
              <a
                className="pj-cover"
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.link === GITHUB_URL ? `${SITE.name}'s GitHub profile (opens in new tab)` : `${p.name} on GitHub (opens in new tab)`}
              />
            </article>
          ))}
        </div>
        <a className="pj-more" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" data-reveal style={vars({ '--d': '200ms' })}>
          <span>Hackathon builds and open source</span>
          <span>
            More on GitHub <span className="pj-nudge">↗</span>
          </span>
        </a>
      </div>
    </section>
  );
}
