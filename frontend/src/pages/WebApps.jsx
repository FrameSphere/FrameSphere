import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

/* ─── Inline SVG Icons ────────────────────────────────────────────────────── */
import {
  WordifyIcon, FlagGuessIcon, BrawlMysteryIcon,
  SpinSelectorIcon, TraitoraIcon, FileFlyrIcon
} from '../components/ProductIcons';

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
