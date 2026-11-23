import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { products, webApps, devLinks, companyLinks } from '../data/catalog';

// ⌘K / Ctrl+K — eine Suche statt verschachtelter Menüs.
// Hick's Law: Die Entscheidungszeit wächst mit der Zahl sichtbarer Optionen;
// eine Tipp-Suche reduziert die Auswahl auf wenige Treffer.

export const openPalette = () => window.dispatchEvent(new Event('fs:open-palette'));

const ALL = [
  ...products.map((p) => ({
    group: 'Produkte',
    label: p.name,
    hint: p.tagline,
    path: p.path,
    badge: p.status === 'live' ? p.kind : 'in Entwicklung',
  })),
  ...webApps.map((a) => ({ group: 'Web-Apps', label: a.name, hint: a.tagline, path: a.path, badge: a.category })),
  ...devLinks.map((l) => ({ group: 'Entwickler', label: l.name, hint: '', path: l.path })),
  ...companyLinks.map((l) => ({ group: 'FrameSphere', label: l.name, hint: '', path: l.path })),
  { group: 'FrameSphere', label: 'Registrieren', hint: 'Kostenloses Konto', path: '/register' },
  { group: 'FrameSphere', label: 'Login', hint: '', path: '/login' },
];

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('fs:open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('fs:open-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return ALL;
    return ALL.filter((r) => norm(`${r.label} ${r.hint} ${r.group}`).includes(n));
  }, [q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (r) => {
    if (!r) return;
    setOpen(false);
    navigate(r.path);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          <div className="absolute inset-0 bg-ink/80" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Suche"
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-dark-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            initial={{ y: 8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <Search className="h-4 w-4 text-bone-500" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Produkt, App oder Seite suchen …"
                className="h-14 flex-1 bg-transparent text-[15px] text-bone-100 placeholder:text-bone-600 outline-none"
                aria-controls="palette-list"
                aria-activedescendant={`palette-${active}`}
              />
              <span className="kbd">esc</span>
            </div>

            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-bone-500">Nichts gefunden für „{q}“.</li>
              )}
              {results.map((r, i) => {
                const header = r.group !== lastGroup ? r.group : null;
                lastGroup = r.group;
                return (
                  <React.Fragment key={`${r.group}-${r.label}`}>
                    {header && <li className="eyebrow px-3 pb-1.5 pt-3">{header}</li>}
                    <li
                      id={`palette-${i}`}
                      data-idx={i}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(r)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${
                        i === active ? 'bg-white/[0.06]' : ''
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          i === active ? 'bg-signal-500' : 'bg-bone-700'
                        }`}
                      />
                      <span className="text-sm font-medium text-bone-100">{r.label}</span>
                      {r.hint && <span className="truncate text-sm text-bone-500">{r.hint}</span>}
                      <span className="ml-auto flex items-center gap-2">
                        {r.badge && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-bone-500">{r.badge}</span>
                        )}
                        {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-bone-400" />}
                      </span>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-white/[0.08] px-4 py-2.5 font-mono text-[11px] text-bone-500">
              <span className="flex items-center gap-1.5"><span className="kbd">↑</span><span className="kbd">↓</span> wählen</span>
              <span className="flex items-center gap-1.5"><span className="kbd">↵</span> öffnen</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
