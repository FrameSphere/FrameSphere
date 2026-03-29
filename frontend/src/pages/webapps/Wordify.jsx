import React from 'react';
import { ExternalLink, CheckCircle, Globe, ArrowRight, Zap, Trophy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Wordify SVG Icon ────────────────────────────────────────────────────── */
const WordifyIcon = ({ size = 48 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <rect width="100" height="100" fill="#6aaa64" rx="16"/>
    <text x="50" y="72" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold"
      fill="white" textAnchor="middle">W</text>
  </svg>
);

/* ─── Wordify Tile ────────────────────────────────────────────────────────── */
const Tile = ({ letter, state }) => {
  const colors = {
    correct: 'bg-emerald-500 border-emerald-500 text-white',
    present: 'bg-yellow-500 border-yellow-500 text-white',
    absent:  'bg-gray-600 border-gray-600 text-white',
    empty:   'border-white/20 text-white',
  };
  return (
    <div className={`w-11 h-11 border-2 flex items-center justify-center font-bold text-lg rounded ${colors[state]}`}>
      {letter}
    </div>
  );
};

const Wordify = () => {
  const languages = [
    { flag: '🇩🇪', lang: 'Deutsch',   url: 'https://wordify.pages.dev/de/' },
    { flag: '🇬🇧', lang: 'English',   url: 'https://wordify.pages.dev/en/' },
    { flag: '🇪🇸', lang: 'Español',   url: 'https://wordify.pages.dev/es/' },
    { flag: '🇫🇷', lang: 'Français',  url: 'https://wordify.pages.dev/fr/' },
    { flag: '🇮🇹', lang: 'Italiano',  url: 'https://wordify.pages.dev/it/' },
  ];

  const features = [
    { icon: <Zap className="w-5 h-5" />,       title: 'Täglich neu',           desc: 'Jeden Tag ein neues Wort — für alle Spieler gleichzeitig, weltweit synchronisiert.' },
    { icon: <Globe className="w-5 h-5" />,      title: '5 Sprachen',            desc: 'Deutsch, Englisch, Spanisch, Französisch, Italienisch — in jeder Sprache ein eigenes Rätsel.' },
    { icon: <Trophy className="w-5 h-5" />,     title: 'Streak & Statistiken',  desc: 'Verfolge deine Gewinnserie, Gewinnrate und besten Serien langfristig.' },
    { icon: <RefreshCw className="w-5 h-5" />,  title: 'Freies Spielen',        desc: 'Bis zu 5 Spiele pro 12 Stunden im freien Modus — kein Warten bis Mitternacht.' },
    { icon: <CheckCircle className="w-5 h-5" />, title: 'Kein Account nötig',   desc: 'Einfach öffnen und losspielen. Kein Login, kein Tracking, keine Installation.' },
    { icon: <Globe className="w-5 h-5" />,      title: 'Alle Geräte',           desc: 'Vollständig responsive — Smartphone, Tablet, Desktop. Überall spielbar.' },
  ];

  const tips = [
    { tip: 'Mit häufigen Buchstaben starten', desc: 'STERN, RATEN oder NOTEN — diese Wörter decken die häufigsten deutschen Buchstaben E, N, R, S, T ab.' },
    { tip: 'Keine Buchstaben wiederholen', desc: 'Jeder Versuch ist wertvoll. Teste immer neue Buchstaben, statt bereits ausgeschlossene nochmal zu prüfen.' },
    { tip: 'Vokale früh einbauen', desc: 'Deutsche Wörter haben mindestens einen Vokal. A, E, I, O, U früh testen spart Versuche.' },
    { tip: 'Gelb ist Information', desc: 'Ein gelber Buchstabe ist im Wort enthalten — probiere ihn an anderen Positionen aus.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-emerald-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Wortspiel</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
              <WordifyIcon size={96} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">Wordify</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">🇩🇪 🇬🇧 🇪🇸 🇫🇷 🇮🇹 5 Sprachen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Täglich</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Ohne Anmeldung</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Das tägliche 5-Buchstaben Worträtsel — wie Wordle, aber in 5 Sprachen. 6 Versuche, täglich ein neues Wort, komplett kostenlos.
          </p>

          <a href="https://wordify.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
            <ExternalLink className="w-5 h-5" />
            <span>Jetzt spielen</span>
          </a>
        </div>

        {/* ── Spielfeld-Preview ─────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">So sieht Wordify aus</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Farbige Kacheln zeigen dir nach jedem Versuch, wie nah du am Ziel bist</p>
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="flex gap-2">
              <Tile letter="S" state="absent" />
              <Tile letter="T" state="present" />
              <Tile letter="E" state="absent" />
              <Tile letter="R" state="present" />
              <Tile letter="N" state="absent" />
            </div>
            <div className="flex gap-2">
              <Tile letter="R" state="correct" />
              <Tile letter="A" state="absent" />
              <Tile letter="T" state="correct" />
              <Tile letter="E" state="absent" />
              <Tile letter="N" state="correct" />
            </div>
            <div className="flex gap-2">
              <Tile letter="R" state="correct" />
              <Tile letter="I" state="correct" />
              <Tile letter="T" state="correct" />
              <Tile letter="T" state="correct" />
              <Tile letter="N" state="correct" />
            </div>
            <div className="flex gap-2">
              {['', '', '', '', ''].map((_, i) => <Tile key={i} letter="" state="empty" />)}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-emerald-500 rounded" />
              <span className="text-gray-300">Richtige Position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-500 rounded" />
              <span className="text-gray-300">Im Wort, falsche Position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-600 rounded" />
              <span className="text-gray-300">Nicht im Wort</span>
            </div>
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Was macht Wordify besonders?</h2>
          <p className="text-gray-500 text-center mb-10">Einfach spielen — täglich eine neue Herausforderung</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-3">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── So funktionierts ─────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Spielregeln in 30 Sekunden</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Wort eingeben', desc: 'Tippe ein beliebiges 5-Buchstaben-Wort als ersten Versuch — es muss gültig sein.' },
              { n: '2', title: 'Farben lesen', desc: 'Grün = richtig, Gelb = falsche Position, Grau = kommt nicht vor.' },
              { n: '3', title: 'Eingrenzen', desc: 'Nutze das Feedback, um dein nächstes Wort gezielt zu wählen.' },
              { n: '4', title: '6 Versuche', desc: 'Du hast 6 Versuche. Schaffst du es in weniger?' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sprachen ─────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            In 5 Sprachen spielen
          </h2>
          <p className="text-gray-500 text-sm mb-6">Jede Sprache hat ihren eigenen Wortschatz und ein eigenes tägliches Wort</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {languages.map((l) => (
              <a key={l.lang} href={l.url} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 hover:border-emerald-500/40 transition-all group">
                <div className="text-3xl mb-2">{l.flag}</div>
                <div className="text-white text-sm font-medium group-hover:text-emerald-400 transition-colors">{l.lang}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Tipps ────────────────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-emerald-500/10 to-green-600/5 border-emerald-500/25">
          <h2 className="text-2xl font-bold text-white mb-2">Tipps für eine bessere Trefferquote</h2>
          <p className="text-gray-500 text-sm mb-8">Mit der richtigen Strategie lässt sich die Erfolgsquote deutlich steigern</p>
          <div className="grid md:grid-cols-2 gap-5">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{t.tip}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-emerald-500/10 to-green-600/5 border-emerald-500/30">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
              <WordifyIcon size={64} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Bereit für die heutige Herausforderung?</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">Jeden Tag ein neues Wort. Kostenlos, ohne Anmeldung, in 5 Sprachen.</p>
          <a href="https://wordify.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>Wordify jetzt spielen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Wordify;
