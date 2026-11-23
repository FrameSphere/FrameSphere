import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Search, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { openPalette } from './CommandPalette';
import { liveProducts, devProducts, soonProducts, webApps } from '../data/catalog';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Entwickler', path: '/developers' },
  { name: 'Preise', path: '/pricing' },
  { name: 'Über uns', path: '/about' },
];

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

function Panel({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute left-0 top-full z-[200] mt-3 overflow-hidden rounded-xl border border-white/10 bg-dark-800 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    setDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setDropdown(null);
    const onKey = (e) => e.key === 'Escape' && setDropdown(null);
    const onScroll = () => setScrolled(window.scrollY > 8);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggle = (name) => setDropdown((d) => (d === name ? null : name));
  const section = location.pathname.split('/')[1];

  const trigger = (name, label, activeSection) => (
    <button
      onClick={() => toggle(name)}
      aria-expanded={dropdown === name}
      className={`flex h-9 items-center gap-1 rounded-md px-3 text-[14px] transition-colors duration-150 ${
        dropdown === name || section === activeSection ? 'text-bone-100' : 'text-bone-400 hover:text-bone-100'
      }`}
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdown === name ? 'rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/[0.08] bg-ink/90 backdrop-blur-md' : 'border-transparent bg-ink/0'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" aria-label="FrameSphere Startseite" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex" ref={ref}>
          <div className="relative">
            {trigger('products', 'Produkte', 'products')}
            <AnimatePresence>
              {dropdown === 'products' && (
                <Panel className="w-[560px]">
                  <div className="grid grid-cols-[1.4fr_1fr]">
                    <div className="p-3">
                      <div className="eyebrow px-3 pb-2 pt-1">Live</div>
                      {liveProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={p.path}
                          className="group flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.04]"
                        >
                          <span>
                            <span className="block text-[14px] font-medium text-bone-100">{p.name}</span>
                            <span className="block text-[13px] text-bone-500">{p.tagline}</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-bone-600 group-hover:text-signal-500">
                            {p.kind}
                          </span>
                        </Link>
                      ))}
                      <div className="eyebrow px-3 pb-2 pt-4">In Entwicklung</div>
                      {devProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={p.path}
                          className="group flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.04]"
                        >
                          <span>
                            <span className="block text-[14px] text-bone-300">{p.name}</span>
                            <span className="block text-[13px] text-bone-600">{p.tagline}</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-bone-700">{p.kind}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-l border-white/[0.07] bg-white/[0.015] p-3">
                      <div className="eyebrow px-3 pb-2 pt-1">Früher Stand</div>
                      {soonProducts.map((p) => (
                        <Link key={p.id} to={p.path} className="block rounded-lg px-3 py-2.5 hover:bg-white/[0.04]">
                          <span className="block text-[14px] text-bone-300">{p.name}</span>
                          <span className="block text-[13px] text-bone-600">{p.tagline}</span>
                        </Link>
                      ))}
                      <Link
                        to="/products"
                        className="mt-2 flex items-center gap-1 px-3 py-2 text-[13px] text-bone-300 hover:text-signal-500"
                      >
                        Alle Produkte <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Panel>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            {trigger('webapps', 'Web-Apps', 'webapps')}
            <AnimatePresence>
              {dropdown === 'webapps' && (
                <Panel className="w-[340px] p-3">
                  <div className="eyebrow px-3 pb-2 pt-1">Gratis im Browser</div>
                  {webApps.map((a) => (
                    <Link
                      key={a.id}
                      to={a.path}
                      className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.04]"
                    >
                      <span className="text-[14px] text-bone-100">{a.name}</span>
                      <span className="truncate text-[12px] text-bone-500">{a.metric}</span>
                    </Link>
                  ))}
                  <Link
                    to="/webapps"
                    className="mt-1 flex items-center gap-1 px-3 py-2 text-[13px] text-bone-300 hover:text-signal-500"
                  >
                    Alle Web-Apps <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Panel>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `flex h-9 items-center rounded-md px-3 text-[14px] transition-colors duration-150 ${
                  isActive ? 'text-bone-100' : 'text-bone-400 hover:text-bone-100'
                }`
              }
            >
              {l.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-md border border-white/10 pl-3 pr-1.5 text-[13px] text-bone-500 transition-colors hover:border-white/20 hover:text-bone-300"
            aria-label="Suche öffnen"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Suchen</span>
            <span className="kbd">{isMac ? '⌘K' : 'Ctrl K'}</span>
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="h-9 px-3 text-[14px] leading-9 text-bone-300 hover:text-bone-100">
                Dashboard
              </Link>
              <button onClick={logout} className="h-9 px-3 text-[14px] text-bone-500 hover:text-bone-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="h-9 px-3 text-[14px] leading-9 text-bone-300 hover:text-bone-100">
                Login
              </Link>
              <Link to="/register" className="btn-primary !min-h-0 h-9 !px-4 !py-0 text-[14px]">
                Konto erstellen
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <button onClick={openPalette} className="grid h-11 w-11 place-items-center text-bone-300" aria-label="Suche öffnen">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center text-bone-100"
            aria-label="Menü"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/[0.08] bg-ink px-5 pb-8 pt-4 md:hidden">
          <div className="eyebrow mb-2">Produkte</div>
          {[...liveProducts, ...devProducts].map((p) => (
            <Link key={p.id} to={p.path} className="flex items-baseline justify-between py-3 text-[17px] text-bone-100">
              {p.name}
              <span className={`font-mono text-[10px] uppercase tracking-wider ${p.status === 'live' ? 'text-signal-500' : 'text-bone-600'}`}>
                {p.status === 'live' ? 'live' : 'in Entwicklung'}
              </span>
            </Link>
          ))}
          <div className="eyebrow mb-2 mt-6">Web-Apps</div>
          <div className="grid grid-cols-2">
            {webApps.map((a) => (
              <Link key={a.id} to={a.path} className="py-2.5 text-[15px] text-bone-300">
                {a.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 border-t border-white/[0.08] pt-4">
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path} className="block py-2.5 text-[15px] text-bone-300">
                {l.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
                <button onClick={logout} className="btn-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/register" className="btn-primary">Konto erstellen</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
