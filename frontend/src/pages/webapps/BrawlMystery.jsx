import React from 'react';
import { ExternalLink, CheckCircle, ArrowRight, Zap, Globe } from 'lucide-react';

/* ─── BrawlMystery SVG Icon ───────────────────────────────────────────────── */
const BrawlMysteryIcon = ({ size = 48 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size}>
    <rect width="100" height="100" fill="#8B5CF6" rx="16"/>
    <circle cx="50" cy="35" r="22" fill="#FCD34D" opacity="0.3"/>
    <polygon points="50,15 55,30 70,30 58,40 63,55 50,45 37,55 42,40 30,30 45,30" fill="#FCD34D"/>
    <path d="M 43 65 Q 43 58 50 58 Q 57 58 57 65 Q 57 72 50 76"
      fill="none" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="50" cy="84" r="3" fill="#FCD34D"/>
  </svg>
);

/* ─── Spielmodus-Karte ────────────────────────────────────────────────────── */
const ModeCard = ({ number, title, subtitle, desc, color }) => (
  <div className={`card border ${color}`}>
    <div className="flex items-start gap-4">
      <div className="text-4xl font-black text-purple-500/20 flex-shrink-0 leading-none">{number}</div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">{subtitle}</div>
        <h3 className="font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const BrawlMystery = () => {
  const modes = [
    {
      number: '01',
      subtitle: 'Modus · Klassisch',
      title: 'Werte-Vergleich',
      desc: 'Errate den Brawler anhand seiner Spielwerte: Seltenheit, Rolle, Reichweite, HP und Erscheinungsjahr. Nach jedem Tipp bekommst du Höher/Niedriger-Feedback.',
      color: 'border-purple-500/20 bg-purple-500/5',
    },
    {
      number: '02',
      subtitle: 'Modus · Visuell',
      title: 'Pixel-Entschlüsselung',
      desc: 'Ein stark verpixeltes Brawler-Bild wird mit jedem Versuch schärfer. Erkennst du den Charakter, bevor das Bild vollständig aufgedeckt ist?',
      color: 'border-violet-500/20 bg-violet-500/5',
    },
    {
      number: '03',
      subtitle: 'Modus · Kreativ',
      title: 'Emoji-Rätsel',
      desc: 'Drei Emojis beschreiben den Brawler — anfangs nur eines sichtbar. Mit jedem falschen Tipp wird ein weiteres Emoji enthüllt.',
      color: 'border-pink-500/20 bg-pink-500/5',
    },
    {
      number: '04',
      subtitle: 'Modus · Text',
      title: 'Beschreibungs-Challenge',
      desc: 'Die Charakterbeschreibung des Brawlers ist größtenteils verborgen. Mit jedem Tipp werden mehr Wörter enthüllt — lese die Hinweise klug.',
      color: 'border-indigo-500/20 bg-indigo-500/5',
    },
  ];

  const languages = [
    { flag: '🇩🇪', lang: 'Deutsch',  url: 'https://brawlmystery.pages.dev/de/' },
    { flag: '🇬🇧', lang: 'English',  url: 'https://brawlmystery.pages.dev/en/' },
    { flag: '🇫🇷', lang: 'Français', url: 'https://brawlmystery.pages.dev/fr/' },
    { flag: '🇪🇸', lang: 'Español',  url: 'https://brawlmystery.pages.dev/es/' },
    { flag: '🇮🇹', lang: 'Italiano', url: 'https://brawlmystery.pages.dev/it/' },
  ];

  const features = [
    { title: 'Täglich neue Challenge',     desc: 'Jeden Tag ein neuer geheimer Brawler — für alle Spieler weltweit synchronisiert.' },
    { title: '4 einzigartige Spielmodi',   desc: 'Klassisch, Pixel, Emoji, Beschreibung — jeder Modus testet andere Fähigkeiten.' },
    { title: 'Alle aktuellen Brawler',     desc: 'Die Datenbank wird regelmäßig aktualisiert und enthält alle Brawler aus dem aktuellen Meta.' },
    { title: 'Brawler-Bibliothek',         desc: 'Lerne alle Brawler kennen — Werte, Seltenheit, Rolle, Reichweite und mehr.' },
    { title: '5 Sprachen',                 desc: 'Vollständig lokalisiert in Deutsch, Englisch, Französisch, Spanisch und Italienisch.' },
    { title: 'Kein Account nötig',         desc: 'Direkt im Browser spielen — kostenlos, ohne Installation, ohne Anmeldung.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-purple-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Brawl Stars</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-violet-600/30 rounded-2xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
              <BrawlMysteryIcon size={96} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">BrawlMystery</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">4 Spielmodi</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">5 Sprachen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Täglich</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Das tägliche Brawl Stars Quiz — errate den geheimen Brawler in vier verschiedenen Modi. Für echte Fans.
          </p>

          <a href="https://brawlmystery.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
            <ExternalLink className="w-5 h-5" />
            <span>Jetzt spielen</span>
          </a>
        </div>

        {/* ── 4 Spielmodi ──────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">4 Spielmodi</h2>
          <p className="text-gray-500 text-center mb-10">Jeder Modus testet dein Wissen auf eine andere Art</p>
          <div className="grid md:grid-cols-2 gap-5">
            {modes.map((m, i) => (
              <ModeCard key={i} {...m} />
            ))}
          </div>
        </div>

        {/* ── So funktioniert's ────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-purple-500/10 to-violet-500/5 border-purple-500/25">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">So funktioniert BrawlMystery</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Modus wählen', desc: 'Wähle zwischen Klassisch, Pixel, Emoji oder Beschreibung — oder spiele alle vier täglich.' },
              { n: '2', title: 'Brawler raten', desc: 'Gib einen Brawler-Namen ein. Das Spiel zeigt dir nach jedem Versuch Hinweise, die dich näher ans Ziel bringen.' },
              { n: '3', title: 'Enthüllen!', desc: 'Wurde der Brawler gefunden? Teile dein Ergebnis oder vergleiche es mit anderen Spielern.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Features</h2>
          <p className="text-gray-500 text-center mb-10">Alles was ein Brawl Stars Fan braucht</p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 glass-effect rounded-xl p-4">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{f.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sprachen ─────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            In 5 Sprachen spielen
          </h2>
          <p className="text-gray-500 text-sm mb-6">Vollständig lokalisiert — Interface, Brawler-Namen und alle Hinweise</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {languages.map((l) => (
              <a key={l.lang} href={l.url} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 hover:border-purple-500/40 transition-all group">
                <div className="text-3xl mb-2">{l.flag}</div>
                <div className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">{l.lang}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-purple-500/10 to-violet-500/5 border-purple-500/30">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-purple-500/40 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
              <BrawlMysteryIcon size={64} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Bist du ein echter Brawl Stars Experte?</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">4 Modi, täglich neu, kostenlos und ohne Anmeldung. Beweise dein Wissen!</p>
          <a href="https://brawlmystery.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>BrawlMystery spielen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default BrawlMystery;
