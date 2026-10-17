import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { LINKS, SECTIONS, SITE } from '@/data';
import { onOpenCommandMenu } from '@/lib/commandMenu';
import { copyEmail } from '@/lib/email';
import { setTheme, useTheme } from '@/lib/theme';
import './CommandMenu.css';

const GROUPS = ['Go to', 'Actions', 'Links'] as const;
const STEP_KEYS: Partial<Record<string, number>> = { ArrowDown: 1, ArrowUp: -1 };

type Command = { id: string; group: (typeof GROUPS)[number]; label: string; keywords?: string; hint?: string } & (
  | { run: () => void }
  /** Runs with the menu open; if it resolves true, the row shows `done` briefly before the menu closes. */
  | { run: () => Promise<boolean>; done: string }
);

const optionId = (c: Command) => `cmdk-${c.id}`;

export function CommandMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const doneTimer = useRef(0);
  const backdropPress = useRef(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [doneId, setDoneId] = useState<string | null>(null);
  const next = useTheme() === 'dark' ? 'light' : 'dark';

  const commands = useMemo<Command[]>(
    () => [
      ...SECTIONS.map(
        (s): Command => ({ id: s.id, group: 'Go to', label: s.label, run: () => document.getElementById(s.id)?.scrollIntoView() }),
      ),
      { id: 'copy-email', group: 'Actions', label: 'Copy email', keywords: SITE.email, hint: SITE.email, done: 'Copied', run: copyEmail },
      { id: 'theme', group: 'Actions', label: `Switch to ${next} theme`, keywords: 'dark light mode appearance', run: () => setTheme(next) },
      ...(['github', 'linkedin', 'events'] as const).map(
        (k): Command => ({
          id: k,
          group: 'Links',
          label: LINKS[k].label,
          keywords: LINKS[k].href,
          hint: '↗',
          run: () => window.open(LINKS[k].href, '_blank', 'noopener'),
        }),
      ),
    ],
    [next],
  );

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hit = (c: Command) => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q);
    return GROUPS.flatMap((g) => commands.filter((c) => c.group === g && hit(c)));
  }, [commands, query]);

  useEffect(() => {
    const d = dialog.current!;
    // Reset here, not on the close event: that event is queued and can land after a quick reopen.
    const open = () => {
      if (d.open) return;
      clearTimeout(doneTimer.current);
      setQuery('');
      setActive(0);
      setDoneId(null);
      d.showModal();
      input.current!.focus();
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.key !== 'k' && e.key !== 'K') || !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      if (d.open) d.close();
      else open();
    };
    window.addEventListener('keydown', onKey);
    const off = onOpenCommandMenu(open);
    return () => {
      window.removeEventListener('keydown', onKey);
      off();
    };
  }, []);

  useEffect(() => {
    const c = items[active];
    if (c) document.getElementById(optionId(c))?.scrollIntoView({ block: 'nearest' });
  }, [items, active]);

  // Close before running so focus restores first and can't fight a scroll the command starts.
  const run = async (c: Command) => {
    const d = dialog.current!;
    if (!('done' in c)) {
      d.close();
      return c.run();
    }
    if (!(await c.run()) || !d.open) return d.close();
    setDoneId(c.id);
    doneTimer.current = window.setTimeout(() => d.close(), 800);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const step = STEP_KEYS[e.key];
    if (step && items.length) {
      e.preventDefault();
      setActive((active + step + items.length) % items.length);
    } else if (e.key === 'Enter' && items[active]) {
      e.preventDefault();
      run(items[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="cmdk"
      aria-label="Command menu"
      onMouseDown={(e) => (backdropPress.current = e.target === e.currentTarget)}
      onClick={(e) => backdropPress.current && e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="cmdk-panel" onMouseDown={(e) => e.target !== input.current && e.preventDefault()}>
        <input
          ref={input}
          className="cmdk-input"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={items[active] && optionId(items[active])}
          aria-autocomplete="list"
          aria-label="Search commands"
          placeholder="Type a command or search…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
        <div id="cmdk-list" className="cmdk-list" role="listbox" aria-label="Commands">
          {GROUPS.map((g, n) => {
            const rows = items.filter((c) => c.group === g);
            if (!rows.length) return null;
            return (
              <div key={g} role="presentation">
                <div id={`cmdk-group-${n}`} className="label cmdk-group" aria-hidden="true">
                  {g}
                </div>
                <div role="group" aria-labelledby={`cmdk-group-${n}`}>
                  {rows.map((c) => {
                    const i = items.indexOf(c);
                    return (
                      <div
                        key={c.id}
                        id={optionId(c)}
                        className="cmdk-item"
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(c)}
                      >
                        {'done' in c && doneId === c.id ? c.done : c.label}
                        {c.hint && <span className="cmdk-hint">{c.hint}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {!items.length && <p className="cmdk-empty">No results</p>}
        <div className="cmdk-foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Select
          </span>
          <span>
            <kbd>Esc</kbd> Close
          </span>
        </div>
      </div>
    </dialog>
  );
}
