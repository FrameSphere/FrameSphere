import React from 'react';
import { ExternalLink, CheckCircle, ArrowRight, Zap } from 'lucide-react';

/* ─── SpinSelector SVG Icon ───────────────────────────────────────────────── */
import { SpinSelectorIcon } from '../../components/ProductIcons';

/* ─── Use Case Card ───────────────────────────────────────────────────────── */
const UseCaseCard = ({ emoji, title, desc, examples }) => (
  <div className="card">
    <div className="text-3xl mb-3">{emoji}</div>
    <h3 className="font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-3">{desc}</p>
    {examples && (
      <div className="flex flex-wrap gap-1.5">
        {examples.map((e, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5">{e}</span>
        ))}
      </div>
    )}
  </div>
);

const SpinSelector = () => {
  const useCases = [
    {
      emoji: '👥',
      title: 'Namen ziehen',
      desc: 'Wer muss zuerst präsentieren? Wer bekommt den Preis? Alle Namen ins Rad, drehen, fertig.',
      examples: ['Klassenarbeit', 'Gewinnspiel', 'Aufgabenverteilung'],
    },
    {
      emoji: '⚽',
      title: 'Teams erstellen',
      desc: 'Spieler zufällig auf Teams aufteilen — fair, schnell, ohne endlose Diskussion.',
      examples: ['Sport', 'Gruppenarbeit', 'Spiele'],
    },
    {
      emoji: '😈',
      title: 'Wahrheit oder Pflicht',
      desc: 'Das klassische Partyspiel neu gedreht — wer dran ist, entscheidet das Rad.',
      examples: ['Party', 'Spieleabend', 'Eisbrecher'],
    },
    {
      emoji: '🍕',
      title: 'Entscheidungen treffen',
      desc: 'Pizza, Sushi oder Pasta? Optionen eingeben, drehen, Entscheidung gefallen — kein Grübeln mehr.',
      examples: ['Essen wählen', 'Film aussuchen', 'Aktivität planen'],
    },
    {
      emoji: '🔢',
      title: 'Zufallszahlen',
      desc: 'Eine zufällige Zahl aus einem definierten Bereich — für Spiele, Lotterien oder Entscheidungen.',
      examples: ['Lottozahlen', 'Spielstart', 'Reihenfolge'],
    },
    {
      emoji: '🎯',
      title: 'Alle anderen Entscheidungen',
      desc: 'Jede Art von Entscheidung, die du lieber dem Zufall überlässt. Optionen eingeben, Rad drehen.',
      examples: ['Urlaub', 'Hobby', 'Belohnung'],
    },
  ];

  const features = [
    { title: 'Bis zu 20 Optionen',          desc: 'Füge bis zu 20 eigene Einträge ins Rad ein — Texte, Namen, Zahlen.' },
    { title: 'Flüssige Dreh-Animation',      desc: 'Realistisch animiertes Glücksrad mit Drehgeräusch und sanftem Auslaufen.' },
    { title: 'Alle Daten lokal',             desc: 'Deine Optionen werden nur in deinem Browser gespeichert — kein Server, keine Daten.' },
    { title: '4 Sprachen',                   desc: 'Vollständig lokalisiert in Deutsch, Englisch, Französisch und Spanisch.' },
    { title: 'Alle Geräte',                  desc: 'Vollständig responsive — Smartphone, Tablet und Desktop funktionieren gleich gut.' },
    { title: 'Keine Anmeldung',              desc: 'Direkt loslegen — keine Registrierung, kein Account, komplett kostenlos.' },
  ];

  const languages = [
    { flag: '🇩🇪', lang: 'Deutsch',  url: 'https://spinselector.pages.dev/de/' },
    { flag: '🇬🇧', lang: 'English',  url: 'https://spinselector.pages.dev/en/' },
    { flag: '🇫🇷', lang: 'Français', url: 'https://spinselector.pages.dev/fr/' },
    { flag: '🇪🇸', lang: 'Español',  url: 'https://spinselector.pages.dev/es/' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-pink-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Zufallsgenerator</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-purple-500/30 rounded-full blur-2xl" />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              <SpinSelectorIcon size={96} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">SpinSelector</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Glücksrad</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">4 Sprachen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Bis 20 Optionen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Das Online-Glücksrad für alle Zufallsentscheidungen — Namen ziehen, Teams erstellen, Wahrheit oder Pflicht und mehr.
          </p>

          <a href="https://spinselector.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
            <ExternalLink className="w-5 h-5" />
            <span>Rad drehen</span>
          </a>
        </div>

        {/* ── So funktionierts ─────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">In 3 Schritten zur Entscheidung</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Optionen eingeben', desc: 'Tippe deine Optionen ins Rad — Namen, Zahlen oder Texte. Bis zu 20 Einträge möglich.' },
              { n: '2', title: 'Rad drehen',         desc: 'Klick auf "Drehen" und lass die Animation ablaufen. Das Rad entscheidet fair und zufällig.' },
              { n: '3', title: 'Ergebnis annehmen',  desc: 'Das ausgewählte Feld wird angezeigt. Nicht einverstanden? Einfach nochmal drehen!' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use Cases ────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Wofür eignet sich SpinSelector?</h2>
          <p className="text-gray-500 text-center mb-10">Überall dort, wo der Zufall entscheiden soll</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc, i) => (
              <UseCaseCard key={i} {...uc} />
            ))}
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Features</h2>
          <p className="text-gray-500 text-center mb-10">Einfach, fair, sofort einsatzbereit</p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 glass-effect rounded-xl p-4">
                <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
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
          <h2 className="text-2xl font-bold text-white mb-2">In 4 Sprachen verfügbar</h2>
          <p className="text-gray-500 text-sm mb-6">Interface, Beschriftungen und SEO-Seiten vollständig lokalisiert</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languages.map((l) => (
              <a key={l.lang} href={l.url} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 hover:border-pink-500/40 transition-all group">
                <div className="text-3xl mb-2">{l.flag}</div>
                <div className="text-white text-sm font-medium group-hover:text-pink-400 transition-colors">{l.lang}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Datenschutz Hinweis ───────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-pink-500/10 to-purple-500/5 border-pink-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">100% lokal — Keine Daten verlassen deinen Browser</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Alle Optionen, die du ins Rad eingibst, werden ausschließlich in deinem Browser-Speicher (localStorage) gespeichert.
                Es werden keinerlei Daten an Server übertragen. SpinSelector benötigt keine Registrierung und sammelt keine Nutzerdaten.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-pink-500/10 to-purple-500/5 border-pink-500/25">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-purple-500/30 rounded-full blur-xl" />
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <SpinSelectorIcon size={64} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Lass den Zufall entscheiden</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            Optionen eingeben, Rad drehen, fertig. Kostenlos, ohne Anmeldung, auf allen Geräten.
          </p>
          <a href="https://spinselector.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>SpinSelector öffnen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default SpinSelector;
