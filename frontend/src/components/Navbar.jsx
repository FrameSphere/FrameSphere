import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, LogIn, UserPlus, ChevronDown,
  Sparkles, Shield, Brain, Network, Home, Code,
  Search, Globe, Gamepad2, FileText, RotateCcw, Flag, User
} from 'lucide-react';

/* ─── FrameSphere Logo Icon ─────────────────────────────────────────────────── */
// Exakt gleicher Hintergrund wie das bisherige Navbar-Icon:
// bg-gradient-to-br from-primary-500(#0ea5e9) to-purple-600(#9333ea)
// – Zap ersetzt durch "FS" mit etwas letter-spacing für luftiges, nicht gequetschtes Bild
const FrameSphereLogoIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
    width="36" height="36" fill="none" className={className}>
    <defs>
      <linearGradient id="fslogo-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="7" fill="url(#fslogo-g)" />
    <text x="16" y="22"
      fontFamily="Arial Black, Arial, sans-serif"
      fontSize="13" fontWeight="800"
      fill="white" textAnchor="middle"
      letterSpacing="1">FS</text>
  </svg>
);

import { useAuth } from '../context/AuthContext';

const apiProducts = [
  { name: 'FrameSpell API', desc: 'KI-Rechtschreibprüfung', path: '/products/framespell', icon: <Sparkles className="w-4 h-4" />, color: 'text-blue-400', status: 'Live' },
  { name: 'RateLimit API', desc: 'API-Schutz & Throttling', path: '/products/ratelimit-api', icon: <Shield className="w-4 h-4" />, color: 'text-green-400', status: 'Live' },
  { name: 'FrameTrain', desc: 'KI-Modelle lokal trainieren', path: '/products/frametrain', icon: <Brain className="w-4 h-4" />, color: 'text-purple-400', status: 'Live' },
  { name: 'CoreChain API', desc: 'KI-Orchestrierung', path: '/products/corechain-api', icon: <Code className="w-4 h-4" />, color: 'text-cyan-400', status: 'Bald' },
  { name: 'Keyword Engine', desc: 'SEO Keyword-Analyse', path: '/products/keyword-engine', icon: <Search className="w-4 h-4" />, color: 'text-yellow-400', status: 'Bald' },
  { name: 'Website Manager', desc: 'Webseiten verwalten', path: '/products/website-manager', icon: <Globe className="w-4 h-4" />, color: 'text-orange-400', status: 'Bald' },
  { name: 'SphereHub', desc: 'Lokaler AI-Butler', path: '/products/spherehub', icon: <Home className="w-4 h-4" />, color: 'text-red-400', status: 'Bald' },
  { name: 'SphereNet', desc: 'KI-Modell-Netzwerk', path: '/products/spherenet', icon: <Network className="w-4 h-4" />, color: 'text-indigo-400', status: 'Bald' },
];

const webApps = [
  { name: 'Wordify', desc: 'Tägliches 5-Buchstaben Worträtsel', path: '/webapps/wordify', icon: <Gamepad2 className="w-4 h-4" />, color: 'text-emerald-400' },
  { name: 'FlagGuess', desc: 'Tägliches Flaggen-Quiz', path: '/webapps/flagguess', icon: <Flag className="w-4 h-4" />, color: 'text-blue-400' },
  { name: 'BrawlMystery', desc: 'Brawl Stars Ratespiel', path: '/webapps/brawlmystery', icon: <Gamepad2 className="w-4 h-4" />, color: 'text-orange-400' },
  { name: 'SpinSelector', desc: 'Online-Glücksrad & Zufallsentscheider', path: '/webapps/spinselector', icon: <RotateCcw className="w-4 h-4" />, color: 'text-pink-400' },
  { name: 'Traitora', desc: 'Adaptiver Persönlichkeitstest', path: '/webapps/traitora', icon: <User className="w-4 h-4" />, color: 'text-violet-400' },
  { name: 'FileFlyr', desc: '40+ Dateikonverter, 100% privat', path: '/webapps/fileflyr', icon: <FileText className="w-4 h-4" />, color: 'text-cyan-400' },
];

const StatusBadge = ({ status }) => {
  if (status === 'Live') return <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/20 flex-shrink-0">Live</span>;
  if (status === 'Bald') return <span className="text-xs px-1.5 py-0.5 bg-gray-700 text-gray-400 rounded flex-shrink-0">Bald</span>;
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'products' | 'webapps'
  const location = useLocation();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Preise', path: '/pricing' },
    { name: 'Entwickler', path: '/developers' },
    { name: 'Über uns', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;
  const isProductsActive = location.pathname.startsWith('/products');
  const isWebAppsActive = location.pathname.startsWith('/webapps');

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleDropdown = (name) => setActiveDropdown(prev => prev === name ? null : name);

  const dropdownBase = "absolute top-full mt-2 z-[200] rounded-xl shadow-2xl border border-white/10 overflow-hidden";
  const dropdownBg = "bg-dark-800"; // solid, kein glass

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <FrameSphereLogoIcon />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">FrameSphere</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>

            {/* Produkte Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isProductsActive || activeDropdown === 'products'
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Produkte</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className={`${dropdownBase} ${dropdownBg} left-0 w-72`}>
                  <div className="p-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 font-semibold">APIs & Tools</div>
                    {apiProducts.map((p) => (
                      <Link key={p.path} to={p.path} onClick={() => setActiveDropdown(null)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
                        <span className={`${p.color} flex-shrink-0`}>{p.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">{p.desc}</div>
                        </div>
                        <StatusBadge status={p.status} />
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <Link to="/products" onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-center px-3 py-2 text-xs text-primary-400 hover:text-primary-300 transition-colors">
                        Alle Produkte ansehen →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Web Apps Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('webapps')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isWebAppsActive || activeDropdown === 'webapps'
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Web Apps</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'webapps' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'webapps' && (
                <div className={`${dropdownBase} ${dropdownBg} left-0 w-68 w-64`}>
                  <div className="p-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 font-semibold">Spiele & Tools</div>
                    {webApps.map((p) => (
                      <Link key={p.path} to={p.path} onClick={() => setActiveDropdown(null)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className={`${p.color} flex-shrink-0`}>{p.icon}</span>
                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">{p.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <Link to="/webapps" onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-center px-3 py-2 text-xs text-primary-400 hover:text-primary-300 transition-colors">
                        Alle Web Apps →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isActive(link.path) ? 'bg-primary-500/20 text-primary-400' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                <button onClick={logout} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <LogIn className="w-4 h-4" /><span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center space-x-1.5 btn-primary py-2 px-4 text-sm">
                  <UserPlus className="w-4 h-4" /><span>Registrieren</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-800 border-t border-white/10">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Produkte</div>
            {apiProducts.map((p) => (
              <Link key={p.path} to={p.path} onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <span className={p.color}>{p.icon}</span>
                <span className="text-sm">{p.name}</span>
                <StatusBadge status={p.status} />
              </Link>
            ))}
            <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 mt-3">Web Apps</div>
            {webApps.map((p) => (
              <Link key={p.path} to={p.path} onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <span className={p.color}>{p.icon}</span>
                <span className="text-sm">{p.name}</span>
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5">
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Dashboard</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-center">Registrieren</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
