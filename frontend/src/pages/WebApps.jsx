import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

/* ─── Inline SVG Icons ────────────────────────────────────────────────────── */
const WordifyIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <rect width="100" height="100" fill="#6aaa64" rx="14"/>
    <text x="50" y="72" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold" fill="white" textAnchor="middle">W</text>
  </svg>
);

const FlagGuessIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <rect x="10" y="10" width="80" height="50" fill="#3b82f6" rx="4"/>
    <rect x="10" y="30" width="80" height="20" fill="#ef4444"/>
    <rect x="10" y="50" width="80" height="10" fill="#22c55e"/>
    <rect x="8" y="10" width="4" height="80" fill="#1f2937" rx="2"/>
  </svg>
);

const BrawlMysteryIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <rect width="100" height="100" fill="#8B5CF6" rx="16"/>
    <circle cx="50" cy="35" r="22" fill="#FCD34D" opacity="0.3"/>
    <polygon points="50,15 55,30 70,30 58,40 63,55 50,45 37,55 42,40 30,30 45,30" fill="#FCD34D"/>
    <path d="M 43 65 Q 43 58 50 58 Q 57 58 57 65 Q 57 72 50 76" fill="none" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="50" cy="84" r="3" fill="#FCD34D"/>
  </svg>
);

const SpinSelectorIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#6366f1" strokeWidth="3"/>
    <g transform="translate(50, 50)">
      <path d="M 0,0 L 35,0 A 35,35 0 0,1 24.7,24.7 Z" fill="#ef4444" opacity="0.9"/>
      <path d="M 0,0 L 24.7,24.7 A 35,35 0 0,1 0,35 Z" fill="#3b82f6" opacity="0.9"/>
      <path d="M 0,0 L 0,35 A 35,35 0 0,1 -24.7,24.7 Z" fill="#22c55e" opacity="0.9"/>
      <path d="M 0,0 L -24.7,24.7 A 35,35 0 0,1 -35,0 Z" fill="#f59e0b" opacity="0.9"/>
      <path d="M 0,0 L -35,0 A 35,35 0 0,1 -24.7,-24.7 Z" fill="#8b5cf6" opacity="0.9"/>
      <path d="M 0,0 L -24.7,-24.7 A 35,35 0 0,1 0,-35 Z" fill="#ec4899" opacity="0.9"/>
      <path d="M 0,0 L 0,-35 A 35,35 0 0,1 24.7,-24.7 Z" fill="#06b6d4" opacity="0.9"/>
      <path d="M 0,0 L 24.7,-24.7 A 35,35 0 0,1 35,0 Z" fill="#f97316" opacity="0.9"/>
    </g>
    <circle cx="50" cy="50" r="12" fill="#6366f1"/>
    <circle cx="50" cy="50" r="8" fill="white"/>
    <path d="M 50,5 L 45,15 L 55,15 Z" fill="#ef4444"/>
  </svg>
);

const TraitoraIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <defs>
      <linearGradient id="wt-tr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="50%" stopColor="#ec4899"/>
        <stop offset="100%" stopColor="#10b981"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="#1e293b"/>
    <ellipse cx="50" cy="45" rx="28" ry="32" fill="url(#wt-tr-grad)" opacity="0.9"/>
    <g transform="translate(50, 45)">
      <path d="M -12,-8 Q -18,-8 -18,-2 Q -18,4 -12,8 Q -8,10 -4,8 Q 0,6 0,0" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 12,-8 Q 18,-8 18,-2 Q 18,4 12,8 Q 8,10 4,8 Q 0,6 0,0" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    <ellipse cx="50" cy="78" rx="32" ry="12" fill="url(#wt-tr-grad)" opacity="0.7"/>
    <circle cx="50" cy="50" r="45" fill="none" stroke="#6366f1" strokeWidth="2"/>
  </svg>
);

const FileFlyrIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <defs>
      <linearGradient id="wt-ff-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#wt-ff-bg)" rx="20"/>
    <g transform="translate(50, 50)">
      <rect x="-32" y="-20" width="20" height="28" fill="white" opacity="0.9" rx="2"/>
      <path d="M -7,-3 L 0,-3" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M -2,-6 L 2,-3 L -2,0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 7,3 L 0,3" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 2,6 L -2,3 L 2,0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="12" y="-20" width="20" height="28" fill="white" opacity="0.9" rx="2"/>
    </g>
    <path d="M 70,25 L 65,32 L 68,32 L 66,39 L 71,32 L 68,32 Z" fill="white" opacity="0.8"/>
  </svg>
);

/* ─── App Data ────────────────────────────────────────────────────────────── */
const webApps = [
  {
    id: 'wordify',
    name: 'Wordify',
    tagline: 'Tägliches Worträtsel',
    description: 'Errate das 5-Buchstaben-Wort in 6 Versuchen — täglich neu, in 5 Sprachen, ohne Anmeldung.',
    icon: WordifyIcon,
    accent: 'from-emerald-500 to-green-600',
    accentLight: 'bg-emerald-500/15',
    textColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/50',
    path: '/webapps/wordify',
    externalUrl: 'https://wordify.pages.dev/',
    tags: ['Wortspiel', '5 Sprachen', 'Täglich', 'Kostenlos'],
  },
  {
    id: 'flagguess',
    name: 'FlagGuess',
    tagline: 'Flaggen-Quiz',
    description: '195+ Länderflaggen erraten — 3 Schwierigkeitsstufen, Flaggen-Bibliothek, täglich neue Challenge.',
    icon: FlagGuessIcon,
    accent: 'from-blue-500 to-indigo-600',
    accentLight: 'bg-blue-500/15',
    textColor: 'text-blue-400',
    borderColor: 'hover:border-blue-500/50',
    path: '/webapps/flagguess',
    externalUrl: 'https://flaggues.pages.dev/',
    tags: ['Quiz', 'Geografie', '195+ Flaggen', 'Täglich'],
  },
  {
    id: 'brawlmystery',
    name: 'BrawlMystery',
    tagline: 'Brawl Stars Ratespiel',
    description: 'Errate den geheimen Brawler täglich in 4 Modi: Klassisch, Pixel, Emoji und Beschreibung.',
    icon: BrawlMysteryIcon,
    accent: 'from-purple-500 to-violet-700',
    accentLight: 'bg-purple-500/15',
    textColor: 'text-purple-400',
    borderColor: 'hover:border-purple-500/50',
    path: '/webapps/brawlmystery',
    externalUrl: 'https://brawlmystery.pages.dev/',
    tags: ['Brawl Stars', '4 Modi', '5 Sprachen', 'Täglich'],
  },
  {
    id: 'spinselector',
    name: 'SpinSelector',
    tagline: 'Online-Glücksrad',
    description: 'Namen ziehen, Teams erstellen, Wahrheit oder Pflicht — Optionen eingeben, Rad drehen, Zufall entscheidet.',
    icon: SpinSelectorIcon,
    accent: 'from-pink-500 to-purple-600',
    accentLight: 'bg-pink-500/15',
    textColor: 'text-pink-400',
    borderColor: 'hover:border-pink-500/50',
    path: '/webapps/spinselector',
    externalUrl: 'https://spinselector.pages.dev/',
    tags: ['Glücksrad', 'Zufallsentscheider', '4 Sprachen', 'Kostenlos'],
  },
  {
    id: 'traitora',
    name: 'Traitora',
    tagline: 'Adaptiver Persönlichkeitstest',
    description: 'Wissenschaftlicher IRT-Test — präziser als MBTI, 15–30 Fragen, 8 Traits, 4 Sprachen.',
    icon: TraitoraIcon,
    accent: 'from-violet-500 to-purple-700',
    accentLight: 'bg-violet-500/15',
    textColor: 'text-violet-400',
    borderColor: 'hover:border-violet-500/50',
    path: '/webapps/traitora',
    externalUrl: 'https://traitora.pages.dev/',
    tags: ['Persönlichkeitstest', 'IRT', '4 Sprachen', 'Kostenlos'],
  },
  {
    id: 'fileflyr',
    name: 'FileFlyr',
    tagline: '40+ Dateikonverter',
    description: 'Bilder, PDFs, Audio konvertieren — 100% im Browser, kein Upload, kein Tracking, kein Abo.',
    icon: FileFlyrIcon,
    accent: 'from-cyan-500 to-blue-600',
    accentLight: 'bg-cyan-500/15',
    textColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/50',
    path: '/webapps/fileflyr',
    externalUrl: 'https://fileflyr.pages.dev/',
    tags: ['Dateikonverter', '40+ Tools', '100% Privat', 'Kostenlos'],
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const WebApps = () => {
  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-primary-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Kostenlose Web-Apps</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Web Apps</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Spiele, Tools und Anwendungen — alle kostenlos, alle direkt im Browser, alle ohne Anmeldung. Powered by FrameSphere.
          </p>

          {/* Quick-Stats */}
          <div className="inline-flex flex-wrap justify-center divide-x divide-white/10 glass-effect rounded-2xl overflow-hidden">
            {[
              { val: '6', label: 'Apps' },
              { val: '100%', label: 'Kostenlos' },
              { val: '0', label: 'Anmeldungen' },
              { val: '5+', label: 'Sprachen' },
            ].map((s, i) => (
              <div key={i} className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── App Grid ─────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {webApps.map((app) => {
            const Icon = app.icon;
            return (
              <div key={app.id}
                className={`card flex flex-col group transition-all duration-300 hover:scale-[1.02] ${app.borderColor}`}>

                {/* Top row: Icon + external link */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 ${app.accentLight} rounded-xl flex items-center justify-center overflow-hidden`}>
                    <Icon size={48} />
                  </div>
                  <a href={app.externalUrl} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 text-gray-600 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    title="Live öffnen">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Name + Tagline */}
                <h3 className="text-xl font-bold text-white mb-1">{app.name}</h3>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${app.textColor}`}>{app.tagline}</p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{app.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {app.tags.map((tag, i) => (
                    <span key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <Link to={app.path}
                    className="flex-1 btn-secondary text-sm py-2.5 text-center inline-flex items-center justify-center gap-1.5">
                    <span>Mehr erfahren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a href={app.externalUrl} target="_blank" rel="noopener noreferrer"
                    className={`btn-primary px-4 py-2.5 text-sm inline-flex items-center gap-1.5 bg-gradient-to-r ${app.accent}`}>
                    <ExternalLink className="w-4 h-4" />
                    <span>Öffnen</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Separator / Kategorie-Hinweis ────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { emoji: '🎮', label: 'Tägliche Spiele',   desc: 'Wordify, FlagGuess, BrawlMystery — täglich neue Herausforderungen' },
            { emoji: '🛠️', label: 'Nützliche Tools',   desc: 'FileFlyr, SpinSelector — kostenlose Browser-Tools ohne Anmeldung' },
            { emoji: '🧪', label: 'Psychologie & Tests', desc: 'Traitora — wissenschaftlich fundierter adaptiver Persönlichkeitstest' },
          ].map((item, i) => (
            <div key={i} className="glass-effect rounded-xl p-5 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{item.emoji}</span>
              <div>
                <div className="font-bold text-white mb-1">{item.label}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30 text-center py-12">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-3">Weitere Apps in Entwicklung</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Das FrameSphere-Ökosystem wächst. Neben Web-Apps entstehen leistungsstarke
            AI-APIs und Developer-Tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>API-Produkte entdecken</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
              <span>Idee einreichen</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WebApps;
