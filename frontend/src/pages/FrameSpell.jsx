import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, CheckCircle, ArrowRight, Code, Zap, Shield, Globe,
  ExternalLink, Copy, Check, Terminal, AlertCircle, BookOpen,
  BarChart3, Key, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';

import { FrameSpellIcon } from '../components/ProductIcons';

/* ─── Code tabs ───────────────────────────────────────────────────────────── */
const codeExamples = {
  JavaScript: `// FrameSpell API – JavaScript (fetch)
const response = await fetch(
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'fs_live_xxxxxxxxxxxxxxxxxxxx'
    },
    body: JSON.stringify({
      text: 'Helo Welt, das ist ein Tset.',
      language: 'de'
    })
  }
);

const data = await response.json();
console.log(data.corrected);
// → "Hallo Welt, das ist ein Test."`,

  Python: `# FrameSpell API – Python (requests)
import requests

url = "https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck"

response = requests.post(url, json={
    "text": "Helo Welt, das ist ein Tset.",
    "language": "de"
}, headers={
    "X-API-Key": "fs_live_xxxxxxxxxxxxxxxxxxxx",
    "Content-Type": "application/json"
})

data = response.json()
print(data["corrected"])
# → "Hallo Welt, das ist ein Test."`,

  cURL: `# FrameSpell API – cURL
curl -X POST \\
  https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck \\
  -H "X-API-Key: fs_live_xxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Helo Welt, das ist ein Tset.", "language": "de"}'

# Antwort:
# {
#   "corrected": "Hallo Welt, das ist ein Test.",
#   "language": "de",
#   "changed": true
# }`,

  'Node.js': `// FrameSpell API – Node.js Middleware (Express)
const express = require('express');
const app = express();

const FRAMESPELL_URL =
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck';

app.post('/correct', async (req, res) => {
  const { text, language = 'de' } = req.body;

  const spell = await fetch(FRAMESPELL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.FRAMESPELL_KEY
    },
    body: JSON.stringify({ text, language })
  });

  const result = await spell.json();
  res.json({ original: text, corrected: result.corrected });
});`,
};

/* ─── FAQ data ────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Was ist eine Rechtschreibprüfung API?',
    a: 'Eine REST-Schnittstelle, über die Entwickler Texte automatisch auf Rechtschreibfehler prüfen und korrigieren lassen können. FrameSpell nutzt ein MT5-KI-Modell und gibt korrigierte Texte als JSON zurück.',
  },
  {
    q: 'Ist die API kostenlos?',
    a: 'Ja. Der kostenlose Plan erlaubt 20 Anfragen pro Minute – ohne Kreditkarte. Für höhere Volumen gibt es Professional (€29/Monat) und Enterprise (€290/Monat).',
  },
  {
    q: 'Welche Programmiersprachen werden unterstützt?',
    a: 'FrameSpell ist eine REST API und funktioniert mit jeder Sprache: JavaScript, TypeScript, Python, Node.js, PHP, Ruby, Java, Go, cURL und mehr.',
  },
  {
    q: 'Wie schnell antwortet die API?',
    a: 'Typischerweise unter 1000 ms. FrameSpell läuft auf Cloudflare Workers für niedrige Latenz weltweit.',
  },
  {
    q: 'Wie erhalte ich meinen API Key?',
    a: 'Nach der Registrierung auf framespell.pages.dev kannst du im Dashboard unter „API Keys" einen neuen Key generieren. Der Key wird nur einmal angezeigt – sofort kopieren und sicher speichern.',
  },
  {
    q: 'Was passiert, wenn ich das Limit überschreite?',
    a: 'Der Server antwortet mit HTTP 429 (Too Many Requests). Im kostenlosen Plan kostet jede weitere Anfrage €0,009. Im Professional-Plan sind Überschreitungen inklusive bis zu 100 Req/min.',
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const FrameSpell = () => {
  const [activeTab, setActiveTab] = useState('JavaScript');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <Sparkles className="w-5 h-5" />, title: 'MT5 KI-Modell', desc: 'State-of-the-Art Seq2Seq-Modell für präzise Rechtschreibkorrekturen – auch bei Kontextfehlern.' },
    { icon: <Zap className="w-5 h-5" />, title: '< 1.000 ms Antwortzeit', desc: 'Echtzeit-fähig. Cloudflare Workers sorgen für niedrige Latenz in ganz Europa.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Mehrsprachig', desc: 'Deutsch, Englisch, Spanisch, Französisch – erweiterbar auf weitere Sprachen.' },
    { icon: <Shield className="w-5 h-5" />, title: '99,2 % Genauigkeit', desc: 'Hochpräzise Korrekturen, evaluiert auf deutschen Benchmarks.' },
    { icon: <Code className="w-5 h-5" />, title: 'REST API / JSON', desc: 'Standardisierte HTTP-Schnittstelle – integrierbar in jedes Backend oder Framework.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Nutzungs-Dashboard', desc: 'Verfolge deine API-Aufrufe, Fehlerquoten und Limits live im Dashboard.' },
    { icon: <Key className="w-5 h-5" />, title: 'API Key Auth', desc: 'Sicherer Zugriff via X-API-Key Header. Keys im Dashboard generierbar.' },
    { icon: <RefreshCw className="w-5 h-5" />, title: 'Rate Limiting', desc: 'Transparent kommunizierte Limits – HTTP 429 mit Retry-After Header.' },
    { icon: <CheckCircle className="w-5 h-5" />, title: 'Kostenlos starten', desc: '20 Anfragen/Minute gratis – keine Kreditkarte nötig.' },
  ];

  const plans = [
    {
      name: 'Kostenlos',
      price: '€0',
      period: '/Monat',
      highlight: false,
      features: [
        '20 Anfragen / Minute',
        'Deutsch-Modell',
        'REST API Zugang',
        'JSON Response',
        'Community Support',
      ],
      note: 'Danach: €0,009 / Anfrage',
      cta: 'Kostenlos starten',
      link: '/register',
    },
    {
      name: 'Professional',
      price: '€29',
      period: '/Monat',
      highlight: true,
      badge: 'Empfohlen',
      features: [
        '100 Anfragen / Minute',
        'Alle Sprachen (DE, EN, ES, FR)',
        'Erweiterte API-Features',
        'Nutzungsstatistiken',
        'Prioritäts-Support',
        'inkl. MwSt.',
      ],
      note: 'Keine Zusatzkosten bei Überschreitung',
      cta: 'Jetzt upgraden',
      link: '/register',
    },
    {
      name: 'Enterprise',
      price: '€290',
      period: '/Monat',
      highlight: false,
      features: [
        'Unbegrenzte Anfragen',
        'Alle Sprachen',
        'Custom Modelle',
        'On-Premise Option',
        'SLA-Garantie',
        'Dedizierter Support',
        'inkl. MwSt.',
      ],
      cta: 'Kontakt aufnehmen',
      link: '/contact',
    },
  ];

  const statusCodes = [
    { code: '200', color: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'OK', desc: 'Anfrage erfolgreich, korrigierter Text im Body.' },
    { code: '400', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Bad Request', desc: 'Fehlender oder leerer text-Parameter.' },
    { code: '401', color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'Unauthorized', desc: 'Fehlender oder ungültiger X-API-Key Header.' },
    { code: '429', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', label: 'Too Many Requests', desc: 'Rate Limit überschritten. Retry-After Header beachten.' },
    { code: '500', color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'Server Error', desc: 'Interner Fehler. Bitte erneut versuchen.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">

          {/* Kategorie-Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-primary-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>REST API</span>
          </div>

          {/* Icon mit Glow */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/30 rounded-3xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
              <FrameSpellIcon size={96} />
            </div>
          </div>

          {/* Titel */}
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            FrameSpell API
          </h1>

          {/* Status + Tags */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">● Live</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">MT5 KI-Modell</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">REST / JSON</span>
          </div>

          {/* Beschreibung */}
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            KI-gestützte Rechtschreibprüfung für Entwickler — einfach integrierbar, kostenlos starten.
          </p>

          {/* Stats-Strip */}
          <div className="inline-flex flex-wrap justify-center divide-x divide-white/10 glass-effect rounded-2xl mb-10 overflow-hidden">
            {[
              { val: '99,2 %', label: 'Genauigkeit' },
              { val: '< 1 s', label: 'Antwortzeit' },
              { val: '4', label: 'Sprachen' },
              { val: '20 / min', label: 'Kostenlos' },
            ].map((s, i) => (
              <div key={i} className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://framespell.pages.dev/" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
            <Link to="/register" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <Key className="w-5 h-5" />
              <span>API Key holen</span>
            </Link>
            <a href="https://framespell.pages.dev/docs.html" target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Dokumentation</span>
            </a>
          </div>
        </div>

        {/* ── Features Grid ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── API Endpoint ──────────────────────────────────────────────────── */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary-400" />
            API Endpunkt
          </h2>
          <div className="flex items-center gap-3 glass-effect rounded-lg px-4 py-3 font-mono text-sm mb-6">
            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-bold text-xs">POST</span>
            <span className="text-gray-200 break-all">https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider text-gray-400">Request Headers</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span className="text-purple-400">X-API-Key</span>: <span className="text-green-300">fs_live_xxxx…</span></div>
                <div><span className="text-purple-400">Content-Type</span>: <span className="text-green-300">application/json</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider text-gray-400">Request Body</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span className="text-blue-300">"text"</span>: <span className="text-yellow-300">"Helo Welt…"</span> <span className="text-gray-500">// required</span></div>
                <div><span className="text-blue-300">"language"</span>: <span className="text-yellow-300">"de"</span> <span className="text-gray-500">// de|en|es|fr</span></div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider text-gray-400">Response (200 OK)</h3>
            <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm">
              <span className="text-gray-500">{'{'}</span><br />
              &nbsp;&nbsp;<span className="text-blue-300">"corrected"</span>: <span className="text-yellow-300">"Hallo Welt, das ist ein Test."</span>,<br />
              &nbsp;&nbsp;<span className="text-blue-300">"language"</span>: <span className="text-yellow-300">"de"</span>,<br />
              &nbsp;&nbsp;<span className="text-blue-300">"changed"</span>: <span className="text-green-300">true</span><br />
              <span className="text-gray-500">{'}'}</span>
            </div>
          </div>
        </div>

        {/* ── Code Examples ─────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-2xl font-bold text-white">Code Beispiele</h2>
            <button onClick={copyCode} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors glass-effect px-3 py-1.5 rounded-lg">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {Object.keys(codeExamples).map((lang) => (
              <button key={lang} onClick={() => setActiveTab(lang)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === lang
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40'
                    : 'text-gray-400 hover:text-white glass-effect'
                }`}>
                {lang}
              </button>
            ))}
          </div>
          <pre className="bg-dark-900 rounded-lg p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>

        {/* ── Authentifizierung ──────────────────────────────────────────────── */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Key className="w-6 h-6 text-yellow-400" />
            Authentifizierung
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            Jeder API-Request benötigt einen gültigen API Key im HTTP-Header <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">X-API-Key</code>.
            Keys werden im Dashboard generiert und sind der Form <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">fs_live_…</code>.
          </p>
          <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-200/80 text-sm">API Keys niemals im Frontend-JavaScript oder in Git-Repositories speichern. Immer Umgebungsvariablen verwenden.</p>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { n: '1', t: 'Auf framespell.pages.dev registrieren und anmelden' },
              { n: '2', t: 'Im Dashboard zu „API Keys" navigieren' },
              { n: '3', t: 'Auf „Neu generieren" klicken – Key sofort kopieren (wird nur einmal angezeigt)' },
              { n: '4', t: 'Key im X-API-Key Header senden' },
            ].map((step) => (
              <div key={step.n} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 bg-primary-500/20 text-primary-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{step.n}</span>
                <span className="text-gray-300">{step.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Status Codes ──────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            HTTP Status Codes
          </h2>
          <div className="space-y-3">
            {statusCodes.map((s) => (
              <div key={s.code} className={`flex items-center gap-4 p-3 rounded-lg border ${s.color}`}>
                <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${s.color}`}>{s.code}</span>
                <span className="font-semibold text-white text-sm w-28 flex-shrink-0">{s.label}</span>
                <span className="text-gray-400 text-sm">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rate Limits ───────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Plan</th>
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Limit</th>
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Zeitfenster</th>
                  <th className="text-left py-2 text-gray-400 font-semibold">Überschreitung</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-6">Kostenlos</td>
                  <td className="py-2 pr-6 font-mono">20</td>
                  <td className="py-2 pr-6">pro Minute</td>
                  <td className="py-2">€0,009 / Anfrage</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 pr-6">Professional</td>
                  <td className="py-2 pr-6 font-mono">100</td>
                  <td className="py-2 pr-6">pro Minute</td>
                  <td className="py-2">Inklusive</td>
                </tr>
                <tr>
                  <td className="py-2 pr-6">Enterprise</td>
                  <td className="py-2 pr-6 font-mono">∞</td>
                  <td className="py-2 pr-6">Unbegrenzt</td>
                  <td className="py-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">Bei Überschreitung antwortet der Server mit HTTP 429 und einem <code className="text-indigo-300">Retry-After</code> Header.</p>
        </div>

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Preise</h2>
          <p className="text-gray-400 text-center mb-10">Flexibel skalierbar – starte kostenlos, upgrade wenn du wächst</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`card relative ${plan.highlight ? 'border-primary-500' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold">{plan.badge}</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.note && <div className="text-xs text-gray-500 mb-4 p-2.5 glass-effect rounded">{plan.note}</div>}
                <Link to={plan.link}
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-all text-sm ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sprachen ──────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Unterstützte Sprachen</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'de', name: 'Deutsch', flag: '🇩🇪', status: 'Vollständig' },
              { code: 'en', name: 'Englisch', flag: '🇬🇧', status: 'Professional+' },
              { code: 'es', name: 'Spanisch', flag: '🇪🇸', status: 'Professional+' },
              { code: 'fr', name: 'Französisch', flag: '🇫🇷', status: 'Professional+' },
            ].map((lang) => (
              <div key={lang.code} className="glass-effect rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <button
                  className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
          <div className="flex justify-center mb-4">
            <FrameSpellIcon size={56} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Jetzt live ausprobieren</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Teste FrameSpell direkt auf der offiziellen Seite — kein Account nötig. Demo, Dokumentation und Changelog inklusive.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://framespell.pages.dev/" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>framespell.pages.dev</span>
            </a>
            <a href="https://framespell.pages.dev/docs.html" target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>API Dokumentation</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FrameSpell;
