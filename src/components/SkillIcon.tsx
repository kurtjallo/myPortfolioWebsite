import type { CSSProperties } from 'react';
import type { Skill } from '@/data';
import './SkillIcon.css';

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * A skill's simple-icons logo in ink, or a monogram tile when it has none.
 * A parent's hover rule can set `color: var(--brand)` to show the brand colour.
 */
export function SkillIcon({ skill: { name, icon } }: { skill: Skill }) {
  if (!icon) {
    return (
      <span className="si-ico si-mono" aria-hidden="true">
        {name.length <= 3 ? name : name.slice(0, 2)}
      </span>
    );
  }
  // Near-white brands vanish on the light page and near-black ones on the dark page; those fall back to ink.
  const l = luminance(icon.hex);
  const hex = `#${icon.hex}`;
  const brand = { '--brand-l': l > 0.8 ? 'var(--fg)' : hex, '--brand-d': l < 0.25 ? 'var(--fg)' : hex } as CSSProperties;
  return (
    <svg className="si-ico" viewBox="0 0 24 24" style={brand} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
