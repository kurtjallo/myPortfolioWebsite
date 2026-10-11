import { useLayoutEffect, useRef, useState, type Ref } from 'react';
import { STACK, STACK_HEADING, STACK_LEAD, type Layer } from '@/data';
import { useReducedMotion } from '@/lib/motion';
import { SkillIcon } from './SkillIcon';
import { PLATES, VIEW_H, VIEW_W, type Point } from './stack/plates';
import './Stack.css';

const STEPS = STACK.length;
const pad = (i: number) => String(i + 1).padStart(2, '0');
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** The index of the centred plate, or null while the intro shows and the plates are spread. */
type Active = number | null;
type PlateState = 'all' | 'active' | 'inactive';

// Griffin's layout table, in view-box units: spread in the intro, the active plate centred, the rest packed into decks.
function plateOffset(i: number, active: Active) {
  if (active === null) return 105 * (i - 1.5);
  if (i === active) return 0;
  const d = i - active;
  return Math.sign(d) * (320 + 60 * (Math.abs(d) - 1));
}

/** Plate offsets at deck position n (0 = intro, k = plate k - 1 centred), linear between whole steps. */
function deckOffsets(n: number) {
  const k = Math.min(Math.floor(n), STEPS - 1), a = n - k, from = k === 0 ? null : k - 1;
  return STACK.map((_, i) => plateOffset(i, from) + (plateOffset(i, k) - plateOffset(i, from)) * a);
}

// Plate slabs span view-box y 143 to 411; callout labels start near y 98.
const PLATE_Y = [143, 411], LABEL_Y = 98;
function deckBounds(offs: number[]): [top: number, bottom: number] {
  const near = offs.reduce((m, o, i) => (Math.abs(o) < Math.abs(offs[m]) ? i : m), 0);
  return [Math.min(LABEL_Y + offs[near], ...offs.map((o) => PLATE_Y[0] + o)), Math.max(...offs.map((o) => PLATE_Y[1] + o))];
}

/** The tallest the deck gets at any scroll position; the stage shrinks so this fits below the nav. */
const DECK_MAX = (() => {
  let max = 0;
  for (let n = 0; n <= STEPS; n += 0.02) {
    const [top, bottom] = deckBounds(deckOffsets(n));
    max = Math.max(max, bottom - top);
  }
  return max;
})();
const NAV_CLEAR = 84;
// Intro (0.4 viewports), one 0.7-viewport step per plate, plus the pinned viewport itself.
const PIN_VIEWPORTS = 0.7 * STEPS + 0.4 + 1;

function Callout({ anchor: [ax, ay], text, side }: { anchor: Point; text: string; side: 'l' | 'r' }) {
  const ly = side === 'l' ? 112 : 140;
  const lx = side === 'l' ? 40 : 446;
  const sx = side === 'l' ? lx + text.length * 7.9 + 10 : lx - 22;
  const d = `M${sx.toFixed(1)} ${ly - 4} L${ax.toFixed(1)} ${(ly - 4 + Math.abs(ax - sx) * 0.5).toFixed(1)} L${ax.toFixed(1)} ${ay.toFixed(1)}`;
  return (
    <g className="pl-co">
      <path pathLength={1} d={d} />
      <circle cx={lx - 12} cy={ly - 4.5} r={3.5} />
      <text x={lx} y={ly}>{text}</text>
    </g>
  );
}

function PlateSvg({ layer, state, className = 'sk-plate', ref }: {
  layer: Layer;
  state: PlateState;
  className?: string;
  ref?: Ref<SVGSVGElement>;
}) {
  const { markup, anchors } = PLATES[layer.id];
  return (
    <svg
      ref={ref}
      className={state === 'active' ? `${className} is-active` : className}
      data-state={state}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      aria-hidden="true"
    >
      <g dangerouslySetInnerHTML={{ __html: markup }} />
      <Callout anchor={anchors[0]} text={layer.callouts[0]} side="l" />
      <Callout anchor={anchors[1]} text={layer.callouts[1]} side="r" />
    </svg>
  );
}

function Intro() {
  const [line1, line2] = STACK_HEADING;
  return (
    <>
      <span className="eyebrow">Stack</span>
      <h2 className="h2">
        {line1}
        <br />
        <span className="mute">{line2}</span>
      </h2>
      <p className="lead sk-lead">{STACK_LEAD}</p>
    </>
  );
}

function LayerText({ layer, i }: { layer: Layer; i: number }) {
  return (
    <>
      <span className="sk-kicker">
        <span className="index">{pad(i)}</span>
        {layer.name}
      </span>
      <h3 className="sk-title">{layer.title}</h3>
      <p className="sk-line">{layer.line}</p>
      <ul className="sk-skills">
        {layer.skills.map((skill) => (
          <li key={skill.name}>
            <SkillIcon skill={skill} />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Stack() {
  return useReducedMotion() ? <StackStatic /> : <StackPinned />;
}

function StackStatic() {
  return (
    <section id="skills" className="section sk-static">
      <div className="container">
        <div className="sk-static-head">
          <Intro />
        </div>
        {STACK.map((layer, i) => (
          <div key={layer.id} className="sk-static-row">
            <div className="sk-static-text">
              <LayerText layer={layer} i={i} />
            </div>
            <div className="sk-static-art">
              <PlateSvg layer={layer} state="active" className="sk-plate sk-plate-static" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackPinned() {
  const [active, setActive] = useState<Active>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const plateRefs = useRef<SVGSVGElement[]>([]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current, sticky = stickyRef.current, visual = visualRef.current;
    const stage = stageRef.current, fillEl = fillRef.current;
    const plates = plateRefs.current;
    if (!wrap || !sticky || !visual || !stage || !fillEl) return;

    let vh = 0, vw = 0, scale = 1, raf = 0, near = false;
    let lastStep = -1, lastFill = -1, lastCam = '';
    const lastTy = plates.map(() => NaN);
    const fit = { s: 1, k: 1, top: 0, bot: 0, mid: 0 };

    const size = () => {
      vh = innerHeight;
      vw = innerWidth;
      wrap.style.height = `${(PIN_VIEWPORTS * vh).toFixed(0)}px`;
      sticky.style.height = `${vh}px`;
    };
    const rescale = () => {
      scale = stage.clientWidth / VIEW_W;
      fit.top = Math.max(0, NAV_CLEAR - visual.offsetTop) + 12;
      fit.bot = visual.clientHeight - 16;
      fit.mid = visual.clientHeight / 2;
      fit.s = Math.min(scale, (fit.bot - fit.top) / DECK_MAX);
      fit.k = fit.s / scale;
      lastTy.fill(NaN);
      lastCam = '';
    };

    const frame = () => {
      raf = 0;
      const t = -wrap.getBoundingClientRect().top;
      const l = (t - 0.4 * vh) / (0.7 * vh);
      const step = t < 0.4 * vh ? 0 : Math.min(1 + Math.floor(l), STEPS);
      const s = clamp(l - Math.floor(l), 0, 1);
      const offs = deckOffsets(clamp(l + 0.5, 0, STEPS));
      plates.forEach((p, i) => {
        const ty = Math.round(offs[i] * scale * 10) / 10;
        if (ty !== lastTy[i]) {
          lastTy[i] = ty;
          p.style.transform = `translate3d(0, ${ty}px, 0)`;
        }
      });
      // Centre the deck, nudged only as far as needed to keep it between the nav and the bottom edge.
      const [top, bot] = deckBounds(offs);
      const lo = fit.top - fit.mid - (top - VIEW_H / 2) * fit.s;
      const hi = fit.bot - fit.mid - (bot - VIEW_H / 2) * fit.s;
      const shift = lo > hi ? (lo + hi) / 2 : Math.min(Math.max(0, lo), hi);
      const cam = `translate(-50%, -50%) translate3d(0, ${shift.toFixed(1)}px, 0) scale(${fit.k.toFixed(4)})`;
      if (cam !== lastCam) {
        lastCam = cam;
        stage.style.transform = cam;
      }
      if (step !== lastStep) {
        lastStep = step;
        setActive(step === 0 ? null : step - 1);
      }
      const idx = step - 1;
      const fill = step === 0 ? 0 : Math.round(Math.min(1, (idx + (idx < STEPS - 1 ? s : 0)) / (STEPS - 1)) * 1000) / 1000;
      if (fill !== lastFill) {
        lastFill = fill;
        fillEl.style.transform = `scaleY(${fill})`;
      }
    };
    const schedule = () => {
      if (near && !raf) raf = requestAnimationFrame(frame);
    };
    // Touch browsers resize the viewport as the URL bar slides; only a width change re-measures the pin there.
    const coarse = matchMedia('(pointer: coarse)').matches;
    const onResize = () => {
      if (innerWidth !== vw || !coarse) size();
      schedule();
    };

    const io = new IntersectionObserver(([e]) => {
      near = e.isIntersecting;
      schedule();
    }, { rootMargin: '50% 0px' });
    const ro = new ResizeObserver(() => {
      rescale();
      schedule();
    });

    size();
    rescale();
    frame();
    io.observe(wrap);
    ro.observe(stage);
    ro.observe(visual);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="skills" className="sk-sec">
      <div className="sr-only">
        <Intro />
        {STACK.map((layer, i) => (
          <LayerText key={layer.id} layer={layer} i={i} />
        ))}
      </div>
      <div ref={wrapRef} className="sk-wrap">
        <div ref={stickyRef} className="sk-sticky">
          <div className="sk-layout">
            <div className="sk-content" aria-hidden="true">
              <div className="sk-intro" data-on={active === null}>
                <Intro />
              </div>
              <div className="sk-steps" data-on={active !== null}>
                <div className="sk-nav">
                  <span className="sk-track">
                    <span ref={fillRef} className="sk-fill" />
                  </span>
                  <ol className="sk-list">
                    {STACK.map((layer, i) => (
                      <li key={layer.id} aria-current={i === active ? 'step' : undefined}>
                        <span className="sk-dot" />
                        <span className="index">{pad(i)}</span>
                        <span>{layer.name}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="sk-panels">
                  {STACK.map((layer, i) => (
                    <div key={layer.id} className="sk-panel" data-on={i === active}>
                      <LayerText layer={layer} i={i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div ref={visualRef} className="sk-visual">
              {/* Reverse DOM order so the top plate (Frontend) paints over the ones below it. */}
              <div ref={stageRef} className="sk-stage">
                {STACK.map((_, j) => {
                  const i = STEPS - 1 - j;
                  return (
                    <PlateSvg
                      key={STACK[i].id}
                      layer={STACK[i]}
                      state={active === null ? 'all' : i === active ? 'active' : 'inactive'}
                      ref={(el) => {
                        if (el) plateRefs.current[i] = el;
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
