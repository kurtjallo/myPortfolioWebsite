import type { CSSProperties } from 'react';
import { GITHUB_URL, MORE_PROJECTS, PROJECTS, PROJECTS_HEADING, SITE, type Project } from '@/data';
import { pad } from '@/lib/pad';
import { SectionHeading } from './SectionHeading';
import './Projects.css';

const vars = (v: Record<string, string>) => v as CSSProperties;

function ProjectRows({ projects, start = 0 }: { projects: Project[]; start?: number }) {
  return (
    <div className="pj-rows">
      {projects.map((p, i) => (
        <article key={p.name} className="pj-row" data-reveal style={vars({ '--rise': '32px', '--d': `${i * 100}ms` })}>
          <span className="index pj-idx">{pad(start + i)}</span>
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
  );
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="pj-head">
          <span className="eyebrow" data-reveal>Projects</span>
          <SectionHeading heading={PROJECTS_HEADING} data-reveal style={vars({ '--d': '80ms' })} />
        </div>
        <ProjectRows projects={PROJECTS} />
        <details className="pj-others">
          <summary className="pj-toggle" data-reveal style={vars({ '--d': '200ms' })}>
            <span>More projects</span>
            <span>
              {MORE_PROJECTS.length} more <span className="pj-plus" aria-hidden="true">+</span>
            </span>
          </summary>
          <ProjectRows projects={MORE_PROJECTS} start={PROJECTS.length} />
        </details>
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
