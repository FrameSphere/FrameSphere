import React, { useState } from 'react';
import { ExternalLink, CheckCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

/* ─── Traitora SVG Icon ───────────────────────────────────────────────────── */
import { TraitoraIcon } from '../../components/ProductIcons';

/* ─── Trait Bar ───────────────────────────────────────────────────────────── */
const TraitBar = ({ name, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{name}</span>
      <span className="text-gray-500 text-xs">{value}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const Traitora = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const traits = [
    { name: 'Analytisches Denken',  desc: 'Logik & systematisches Vorgehen',      bar: 72, color: 'bg-indigo-500' },
    { name: 'Soziale Orientierung', desc: 'Teamgeist & soziale Bindungen',         bar: 65, color: 'bg-violet-500' },
    { name: 'Unabhängigkeit',       desc: 'Autonomie & Eigenbestimmung',           bar: 81, color: 'bg-purple-500' },
    { name: 'Emotionale Stabilität',desc: 'Stressresistenz & Ausgeglichenheit',    bar: 58, color: 'bg-pink-500' },
    { name: 'Kreativität',          desc: 'Innovation & unkonventionelles Denken', bar: 90, color: 'bg-rose-500' },
    { name: 'Empathie',             desc: 'Mitgefühl & emotionales Verständnis',   bar: 76, color: 'bg-amber-500' },
    { name: 'Ehrgeiz',              desc: 'Antrieb & Leistungsorientierung',       bar: 84, color: 'bg-emerald-500' },
    { name: 'Risikobereitschaft',   desc: 'Bereitschaft, Chancen zu nutzen',       bar: 62, color: 'bg-cyan-500'   },
  ];

  const languages = [
    { flag: '🇩🇪', lang: 'Deutsch',   url: 'https://traitora.pages.dev/de/' },
    { flag: '🇬🇧', lang: 'English',   url: 'https://traitora.pages.dev/en/' },
    { flag: '🇫🇷', lang: 'Français',  url: 'https://traitora.pages.dev/fr/' },
    { flag: '🇪🇸', lang: 'Español',   url: 'https://traitora.pages.dev/es/' },
  ];

  const resources = [
    { title: 'Wie es funktioniert',     desc: 'Schritt-für-Schritt Erklärung des adaptiven Algorithmus', url: 'https://traitora.pages.dev/de/wie-es-funktioniert.html' },
    { title: 'IRT erklärt',             desc: 'Item Response Theory verständlich und einfach erklärt',   url: 'https://traitora.pages.dev/de/irt-erklaert.html' },
    { title: 'Tests im Vergleich',      desc: 'Traitora vs. MBTI, Big Five & klassische Online-Tests',   url: 'https://traitora.pages.dev/de/persoenlichkeitstest-vergleich.html' },
    { title: 'Traits erklärt',          desc: 'Was bedeuten deine Persönlichkeits-Traits konkret?',      url: 'https://traitora.pages.dev/de/traits-erklaert.html' },
    { title: 'Persönlichkeitstypen',    desc: 'Stärken, Schwächen & Potenziale deines Typs',             url: 'https://traitora.pages.dev/de/persoenlichkeitstypen.html' },
    { title: 'FAQ',                     desc: 'Häufige Fragen zu Traitora & dem Testverfahren',           url: 'https://traitora.pages.dev/de/faq.html' },
  ];

  const faqs = [
    { q: 'Was ist ein adaptiver Persönlichkeitstest?',
      a: 'Ein adaptiver Test passt sich in Echtzeit an deine Antworten an. Das System analysiert jede Antwort sofort und wählt die nächste Frage so, dass sie den größten Informationsgewinn liefert. Weniger Fragen, mehr Präzision.' },
    { q: 'Was ist Item Response Theory (IRT)?',
      a: 'IRT ist ein psychometrisches Modell, das beschreibt, wie die Antwort einer Person auf eine Frage mit ihrem zugrunde liegenden Merkmal (Trait) zusammenhängt. Jede Frage hat drei Eigenschaften: Schwierigkeit, Trennschärfe und Pseudozufallsparameter. Traitora nutzt IRT, um nach jeder Antwort dein Profil neu zu berechnen.' },
    { q: 'Was unterscheidet Traitora von MBTI?',
      a: 'MBTI stellt jedem dieselben ~90 Fragen in fester Reihenfolge. Traitora nutzt 15–30 adaptive Fragen und liefert ein ebenso genaues oder genaueres Ergebnis. Zusätzlich ist Traitora komplett kostenlos und misst 8 kontinuierliche Traits statt 4 binäre Typen.' },
    { q: 'Wie lange dauert der Test?',
      a: 'Typischerweise 5–10 Minuten. Der Test endet automatisch, wenn der Algorithmus ausreichend präzise Informationen gesammelt hat — oft schon nach 15–20 Fragen.' },
    { q: 'Werden meine Antworten gespeichert?',
      a: 'Nein. Traitora speichert keine personenbezogenen Daten. Der Test läuft vollständig im Browser, eine Anmeldung ist nicht nötig.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-violet-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Psychologie</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-pink-500/30 rounded-full blur-2xl" />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              <TraitoraIcon size={96} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">Traitora</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Adaptiv · IRT</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">4 Sprachen</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">8 Traits</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed">
            Wissenschaftlicher adaptiver Persönlichkeitstest — präziser als MBTI, effizienter als Big Five, kostenlos und ohne Anmeldung.
          </p>

          {/* Kennzahlen */}
          <div className="inline-flex flex-wrap justify-center divide-x divide-white/10 glass-effect rounded-2xl mb-10 overflow-hidden">
            {[
              { val: '15–30', label: 'Fragen' },
              { val: '5–10', label: 'Minuten' },
              { val: '8', label: 'Traits' },
              { val: '4', label: 'Sprachen' },
            ].map((s, i) => (
              <div key={i} className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://traitora.pages.dev/" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
              <ExternalLink className="w-5 h-5" />
              <span>Test starten</span>
            </a>
          </div>
        </div>

        {/* ── Wie es funktioniert ──────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/25">
          <h2 className="text-2xl font-bold text-white mb-2">Wie funktioniert der adaptive Test?</h2>
          <p className="text-gray-500 text-sm mb-8">Der Algorithmus wählt jede Frage gezielt — basierend auf deinen bisherigen Antworten</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Screening',       desc: 'Breite Einstiegsfragen liefern erste Orientierung zu allen 8 Traits.' },
              { n: '2', title: 'Adaption',         desc: 'Der IRT-Algorithmus wählt die jeweils informativste nächste Frage aus.' },
              { n: '3', title: 'Schärfung',        desc: 'Die Profil-Schärfe zeigt in Echtzeit, wie präzise dein Ergebnis bereits ist.' },
              { n: '4', title: 'Auswertung',       desc: 'Der Test endet automatisch, wenn ausreichende Genauigkeit erreicht ist.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Traits mit Beispiel-Profil ────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">8 Persönlichkeits-Traits</h2>
          <p className="text-gray-500 text-sm mb-8">Beispiel-Profil — deine persönlichen Werte werden nach dem Test angezeigt</p>
          <div className="grid md:grid-cols-2 gap-6">
            {traits.map((t, i) => (
              <div key={i}>
                <TraitBar name={t.name} value={t.bar} color={t.color} />
                <p className="text-gray-600 text-xs mt-1 pl-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vergleich ────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Traitora vs. klassische Tests</h2>
          <p className="text-gray-500 text-sm mb-6">Weniger Fragen, mehr Präzision, komplett kostenlos</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Merkmal</th>
                  <th className="text-center py-3 px-4 text-violet-400 font-bold">Traitora</th>
                  <th className="text-center py-3 px-4 text-gray-500">MBTI</th>
                  <th className="text-center py-3 px-4 text-gray-500">Big Five</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fragen',      '15–30 (adaptiv)',    '~90',          '~50'],
                  ['Dauer',       '5–10 Min',           '20–30 Min',    '10–15 Min'],
                  ['Adaptiv',     '✅ Ja',               '❌ Nein',       '❌ Nein'],
                  ['Methode',     'IRT (psychometrisch)', 'Typen-Modell', 'Faktor-Analyse'],
                  ['Kostenlos',   '✅ Ja',               'Teilweise',    'Teilweise'],
                  ['Anmeldung',   '✅ Nein',             'Oft',          'Oft'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-400">{row[0]}</td>
                    <td className="py-3 px-4 text-center text-white font-semibold">{row[1]}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row[2]}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Sprachen ─────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            In 4 Sprachen verfügbar
          </h2>
          <p className="text-gray-500 text-sm mb-6">Vollständig lokalisiert — Test, Auswertung und Erklärungen</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languages.map((l) => (
              <a key={l.lang} href={l.url} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 hover:border-violet-500/40 transition-all group">
                <div className="text-3xl mb-2">{l.flag}</div>
                <div className="text-white text-sm font-medium group-hover:text-violet-400 transition-colors">{l.lang}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Häufige Fragen</h2>
          <p className="text-gray-500 text-center mb-10">Alles, was du über Traitora und das Testverfahren wissen solltest</p>
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

        {/* ── Weitere Ressourcen ────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Mehr entdecken</h2>
          <p className="text-gray-500 text-center mb-10">Vertiefe dein Wissen über adaptive Tests und Persönlichkeitspsychologie</p>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                className="card flex items-start gap-4 hover:border-violet-500/50 transition-all group">
                <div className="w-8 h-8 bg-violet-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">{r.title}</div>
                  <div className="text-gray-500 text-sm">{r.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/25">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-pink-500/30 rounded-full blur-xl" />
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <TraitoraIcon size={64} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Entdecke deine Persönlichkeit</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">5–10 Minuten, 15–30 adaptive Fragen, präzises Persönlichkeitsprofil. Kostenlos, ohne Anmeldung.</p>
          <a href="https://traitora.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>Jetzt testen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Traitora;
