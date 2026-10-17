import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { EXPERIENCE_HEADING, ROLES, type Role } from '@/data';
import { GLYPHS, useScramble } from '@/hooks/useScramble';
import { prefersReducedMotion } from '@/lib/motion';
import { SectionHeading } from './SectionHeading';
import './Experience.css';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const STEP_KEYS: Partial<Record<string, number>> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

const period = (r: Role) => `${r.start} - ${r.end ?? 'Present'}`;
const fileName = (r: Role) => `${r.company.split(/[\s(]/)[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.yml`;

/** The card body: `key: value` fields, a blank line, then the one-liner as a `#` comment. */
const cardLines = (r: Role): ([string, string] | null)[] => [
  ['company:', r.company],
  ['role:', r.role],
  ['type:', r.type],
  ['period:', period(r)],
  ['location:', r.location],
  null,
  ['#', r.oneLiner],
];

export function Experience() {
  // `run` counts animated reveals of the card; 0 means it has never animated.
  const [sel, setSel] = useState({ index: 0, run: 0 });
  const names = useScramble(`${GLYPHS}/`);
  const panel = useScramble();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const companies = useRef<(HTMLSpanElement | null)[]>([]);
  const card = useRef<HTMLDivElement>(null);
  const code = useRef<HTMLDivElement>(null);
  const hovered = useRef<number | null>(null);
  const hoverTimer = useRef(0);
  const indexRef = useRef(sel.index);
  indexRef.current = sel.index;

  const scrambleName = (i: number) => {
    const node = companies.current[i];
    if (node) names.run(node, ROLES[i].company, { dur: 600, lockWidth: true });
  };

  const select = (i: number) =>
    setSel((s) => (s.index === i ? s : { index: i, run: prefersReducedMotion() ? s.run : s.run + 1 }));

  useLayoutEffect(() => {
    panel.stop();
    if (!sel.run || !code.current) return;
    code.current.querySelectorAll('.exp-ln').forEach((line, n) => {
      line.querySelectorAll<HTMLElement>('.exp-k, .exp-v').forEach((node) => {
        const text = node.textContent ?? '';
        panel.run(node, text, { delay: n * 80, dur: Math.max(260, Math.min(700, text.length * 6)) });
      });
    });
  }, [sel, panel]);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || prefersReducedMotion()) return;
        io.disconnect();
        setSel((s) => ({ ...s, run: s.run + 1 }));
        scrambleName(indexRef.current);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(hoverTimer.current);
    };
  }, []);

  const role = ROLES[sel.index];
  const lines = cardLines(role);
  const ongoing = role.end === null;

  return (
    <section id="experience" className="section exp" data-nav="panel">
      <div className="container">
        <div className="exp-head">
          <span className="eyebrow" data-reveal>
            Experience
          </span>
          <SectionHeading heading={EXPERIENCE_HEADING} data-reveal style={{ '--d': '80ms' } as CSSProperties} />
        </div>
        <div className="exp-grid">
          <div
            className="exp-list"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Roles"
            onMouseLeave={() => {
              hovered.current = null;
              clearTimeout(hoverTimer.current);
            }}
          >
            {ROLES.map((r, i) => (
              <button
                key={r.company}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                type="button"
                className="exp-step"
                role="tab"
                id={`exp-step-${i}`}
                aria-controls="exp-card"
                aria-selected={i === sel.index}
                tabIndex={i === sel.index ? 0 : -1}
                aria-label={`${r.company}, ${r.role}, ${period(r)}`}
                data-reveal
                style={{ '--i': i, '--rise': '24px', '--d': `${i * 80}ms` } as CSSProperties}
                onMouseEnter={() => {
                  if (!matchMedia('(hover: hover)').matches) return;
                  hovered.current = i;
                  scrambleName(i);
                  clearTimeout(hoverTimer.current);
                  hoverTimer.current = window.setTimeout(() => select(i), 90);
                }}
                onFocus={(e) => {
                  if (hovered.current !== i && e.currentTarget.matches(':focus-visible')) scrambleName(i);
                }}
                onClick={() => {
                  if (hovered.current !== i) scrambleName(i);
                  select(i);
                }}
                onKeyDown={(e) => {
                  const delta = STEP_KEYS[e.key];
                  if (!delta) return;
                  e.preventDefault();
                  const next = (i + delta + ROLES.length) % ROLES.length;
                  tabs.current[next]?.focus();
                  select(next);
                }}
              >
                <span className="exp-step-num" aria-hidden="true">
                  {NUMERALS[i]}
                </span>
                <span className="exp-step-body" aria-hidden="true">
                  <span
                    className="exp-step-co"
                    ref={(node) => {
                      companies.current[i] = node;
                    }}
                  >
                    {r.company}
                  </span>
                  <span className="exp-step-meta mono">{`${r.role} · ${period(r)}`}</span>
                  <span className="exp-step-bar" />
                </span>
              </button>
            ))}
          </div>
          <div
            ref={card}
            id="exp-card"
            className={`exp-card${ongoing ? '' : ' exp-past'}`}
            role="tabpanel"
            aria-labelledby={`exp-step-${sel.index}`}
            data-reveal
            style={{ '--rise': '32px', '--d': '200ms' } as CSSProperties}
          >
            <div className="exp-card-top">
              <span className="exp-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="exp-file mono">{fileName(role)}</span>
            </div>
            <div key={`${sel.index}.${sel.run}`} ref={code} className={`exp-code mono${sel.run ? ' exp-play' : ''}`}>
              {lines.map((line, n) => (
                <div
                  key={n}
                  className={`exp-ln${n === lines.length - 1 ? ' exp-note' : ''}`}
                  style={{ '--ld': `${n * 80}ms` } as CSSProperties}
                >
                  <span className="exp-no">{n + 1}</span>
                  <span className="exp-tx">
                    {line && (
                      <>
                        <span className="exp-k">{line[0]}</span> <span className="exp-v">{line[1]}</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="exp-card-foot mono">
              <span className="exp-dot" />
              <span>{ongoing ? 'Current role' : 'Past role'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
