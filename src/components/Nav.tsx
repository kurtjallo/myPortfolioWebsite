import { useEffect, useRef, useState } from 'react';
import { SECTIONS, SITE } from '@/data';
import { openCommandMenu, SHORTCUT } from '@/lib/commandMenu';
import { switchTheme, useTheme } from '@/lib/theme';
import { Logo } from '@/components/Logo';
import './Nav.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLElement>(null);
  const next = useTheme() === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const ac = new AbortController();
    const { signal } = ac;
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (sheet.current?.contains(document.activeElement)) toggle.current?.focus();
      setMenuOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!sheet.current?.contains(t) && !toggle.current?.contains(t)) close();
    };
    window.addEventListener('keydown', onKey, { signal });
    window.addEventListener('pointerdown', onDown, { signal });
    window.addEventListener('scroll', close, { passive: true, signal });
    matchMedia('(min-width: 900px)').addEventListener('change', close, { signal });
    return () => ac.abort();
  }, [menuOpen]);

  return (
    <>
      <header className={scrolled ? 'nav nav-scrolled' : 'nav'}>
        <a className="nav-brand" href="#home">
          <Logo />
          <span className="nav-name">{SITE.name}</span>
        </a>
        <nav className="nav-links">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button
            type="button"
            ref={toggle}
            className="nav-icon nav-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-sheet"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <button
            type="button"
            className="nav-icon nav-cmdk"
            aria-label="Open command menu"
            aria-keyshortcuts="Meta+K Control+K"
            onClick={openCommandMenu}
          >
            {SHORTCUT}
          </button>
          <button
            type="button"
            className="nav-icon"
            aria-label={`Switch to ${next} theme`}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              switchTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          </button>
          <a className="pill nav-cta" href="#contact">
            Get in touch <span className="arrow">→</span>
          </a>
        </div>
      </header>
      <nav ref={sheet} id="nav-sheet" className="nav-sheet" aria-label="Sections" hidden={!menuOpen}>
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={() => setMenuOpen(false)}>
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );
}
