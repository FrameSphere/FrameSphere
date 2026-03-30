import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Globe, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

/* ─── FlagGuess SVG Icon ──────────────────────────────────────────────────── */
import { FlagGuessIcon } from '../../components/ProductIcons';

/* ─── Difficulty Badge ────────────────────────────────────────────────────── */
const DiffBadge = ({ label, color, attempts, desc }) => (
  <div className={`card border ${color} flex flex-col gap-2`}>
    <div className="flex items-center justify-between">
      <span className="font-bold text-white">{label}</span>
      <span className="text-xs font-mono text-gray-400">{attempts} Versuche</span>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FlagGuess = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const difficulties = [
    {
      label: '🟢 Einfach',
      color: 'border-green-500/20 bg-green-500/5',
      attempts: '8',
      desc: 'Top 20 bekannteste Flaggen der Welt — ideal für Einsteiger und Schüler.',
    },
    {
      label: '🟡 Mittel',
      color: 'border-yellow-500/20 bg-yellow-500/5',
      attempts: '5',
      desc: 'Alle 195 Länder sind möglich — solides Geografie-Wissen gefragt.',
    },
    {
      label: '🔴 Schwer',
      color: 'border-red-500/20 bg-red-500/5',
      attempts: '3',
      desc: 'Exotische Inselstaaten, verwechslungsähnliche Flaggen — nur für echte Experten.',
    },
  ];

  const continents = [
    { flag: '🇪🇺', name: 'Europa',    count: '44 Länder' },
    { flag: '🌏', name: 'Asien',      count: '48 Länder' },
    { flag: '🌍', name: 'Afrika',     count: '54 Länder' },
    { flag: '🌎', name: 'Amerikas',   count: '35 Länder' },
    { flag: '🌊', name: 'Ozeanien',   count: '14 Länder' },
    { flag: '🌐', name: 'Alle',       count: '195+ Länder' },
  ];

  const features = [
    { title: 'Täglich neue Challenge',         desc: 'Jeden Tag eine neue Flagge — für alle Spieler weltweit synchronisiert.' },
    { title: '195+ Länderflaggen',             desc: 'Von Albanien bis Zimbabwe — alle anerkannten Staaten und Territorien.' },
    { title: '3 Schwierigkeitsstufen',         desc: 'Einfach (8 Versuche), Mittel (5), Schwer (3) — für jeden das richtige Level.' },
    { title: 'Flaggen-Bibliothek',             desc: 'Lerne alle Flaggen kennen — browse und merke dir neue Länder.' },
    { title: 'Timer & Statistiken',            desc: 'Stoppe deine Zeit und verfolge deinen Fortschritt langfristig.' },
    { title: 'Dark & Light Mode',              desc: 'Wähle zwischen hellem und dunklem Design — automatisch oder manuell.' },
    { title: 'Deutsch & Englisch',             desc: 'Vollständig lokalisiert in zwei Sprachen, weitere in Planung.' },
    { title: 'Kein Account nötig',             desc: 'Direkt spielen — kostenlos, ohne Anmeldung, auf allen Geräten.' },
  ];

  const faqs = [
    { q: 'Wie viele Versuche habe ich?',
      a: 'Das hängt vom gewählten Schwierigkeitsgrad ab: Einfach = 8 Versuche, Mittel = 5 Versuche, Schwer = 3 Versuche.' },
    { q: 'Werden alle 195 Länder abgefragt?',
      a: 'Im Modus "Mittel" und "Schwer" ja. Im Modus "Einfach" sind es die 20 bekanntesten Länder weltweit.' },
    { q: 'Kann ich die Flaggen-Bibliothek nutzen, um zu lernen?',
      a: 'Ja. Die Bibliothek zeigt alle Flaggen mit dem zugehörigen Ländernamen — ideal zum Lernen vor dem Spielen.' },
    { q: 'Gibt es ein tägliches Wort wie bei Wordle?',
      a: 'Ja. Täglich gibt es eine neue Flagge, die für alle Spieler gleich ist. Du kannst aber auch eigene Spiele starten.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-blue-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Geografie-Quiz</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-500/30 rounded-2xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-xl flex items-center justify-center overflow-hidden bg-dark-900 border border-white/10">
              <FlagGuessIcon size={80} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">FlagGuess</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">195+ Flaggen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">3 Schwierigkeitsstufen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Täglich</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Sieh dir eine Flagge an und errate das Land — täglich eine neue Herausforderung, 195+ Länder, 3 Schwierigkeitsstufen.
          </p>

          <a href="https://flaggues.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
            <ExternalLink className="w-5 h-5" />
            <span>Jetzt spielen</span>
          </a>
        </div>

        {/* ── Schwierigkeitsgrade ───────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">3 Schwierigkeitsstufen</h2>
          <p className="text-gray-500 text-center mb-10">Für Einsteiger und Experten — wähle dein Level</p>
          <div className="grid md:grid-cols-3 gap-5">
            {difficulties.map((d, i) => (
              <DiffBadge key={i} {...d} />
            ))}
          </div>
        </div>

        {/* ── So funktioniert's ────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">In 3 Schritten zum Geografie-Experten</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Flagge anschauen',  desc: 'Eine Flagge wird angezeigt. Nimm dir Zeit — jedes Detail kann ein Hinweis sein: Farben, Symbole, Muster.' },
              { n: '2', title: 'Land eingeben',      desc: 'Gib den Namen des Landes ein. Das Autocomplete hilft dir bei der Schreibweise.' },
              { n: '3', title: 'Lösung entdecken',   desc: 'Falsch? Kein Problem — jeder falsche Tipp zählt als Versuch. Wie wenige brauchst du?' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Flaggen nach Kontinent ────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-400" />
            Flaggen nach Kontinent
          </h2>
          <p className="text-gray-500 text-sm mb-6">195+ Länder aus allen Kontinenten — von bekannt bis exotisch</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {continents.map((c, i) => (
              <a key={i} href="https://flaggues.pages.dev/" target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 hover:bg-white/10 hover:border-blue-500/40 transition-all flex items-center gap-3 group">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">{c.name}</div>
                  <div className="text-gray-500 text-xs">{c.count}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Alle Features</h2>
          <p className="text-gray-500 text-center mb-10">Alles was du für das perfekte Flaggen-Quiz brauchst</p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 glass-effect rounded-xl p-4">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{f.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tipps ────────────────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border-blue-500/25">
          <h2 className="text-2xl font-bold text-white mb-2">Tipps für bessere Ergebnisse</h2>
          <p className="text-gray-500 text-sm mb-8">So erkennst du Flaggen schneller</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { tip: 'Farben als erstes',          desc: 'Die meisten Flaggen haben markante Farbkombinationen. Beginne mit dem Kontinent, zu dem die Farben passen.' },
              { tip: 'Symbole beachten',            desc: 'Sterne, Halbmonde, Wappen, Adler — jedes Symbol verrät etwas über Herkunft und Kultur des Landes.' },
              { tip: 'Streifenmuster',              desc: 'Horizontale, vertikale oder diagonale Streifen grenzen viele Länder ein. Lerne typische Muster je Kontinent.' },
              { tip: 'Bibliothek nutzen',           desc: 'Lerne neue Flaggen in der Bibliothek, bevor du spielst — besonders für den Schwer-Modus sehr hilfreich.' },
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{t.tip}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Häufige Fragen</h2>
          <p className="text-gray-500 text-center mb-10">Alles zu FlagGuess auf einen Blick</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <button className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-white">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border-blue-500/25">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-xl" />
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-dark-900 border border-white/10 flex items-center justify-center">
              <FlagGuessIcon size={56} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Werde zum Flaggen-Experten</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">Täglich eine neue Flagge, 195+ Länder, 3 Schwierigkeitsstufen. Kostenlos, ohne Anmeldung.</p>
          <a href="https://flaggues.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>FlagGuess spielen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default FlagGuess;
