import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, CheckCircle, ArrowRight, Zap, Globe, Code, BarChart3,
  Lock, ExternalLink, Copy, Check, Terminal, AlertCircle, Key,
  ChevronDown, ChevronUp, BookOpen, Database, Layers, Server
} from 'lucide-react';

import { RateLimitIcon } from '../components/ProductIcons';

/* ─── Code examples ───────────────────────────────────────────────────────── */
const codeExamples = {
  'Check Request': `// RateLimit API – Check ob Request erlaubt ist
const API_KEY = 'rlapi_your_key_here';
const BASE_URL = 'https://ratelimit-api.pages.dev';

const response = await fetch(
  \`\${BASE_URL}/check?endpoint=/api/users&method=GET\`,
  {
    headers: { 'X-API-Key': API_KEY }
  }
);

const data = await response.json();

if (!data.allowed) {
  console.log('Rate limit exceeded!');
  console.log('Retry after:', data.resetAt);
} else {
  console.log('Allowed! Remaining:', data.remaining);
}

/*  Response:
{
  "allowed": true,
  "remaining": 95,
  "resetAt": 1708012345,
  "blocked": false
}  */`,

  'Node.js Middleware': `// RateLimit als Express Middleware
const express = require('express');
const app = express();

const RATELIMIT_URL = 'https://ratelimit-api.pages.dev';
const API_KEY = process.env.RATELIMIT_API_KEY;

async function rateLimitMiddleware(req, res, next) {
  try {
    const resp = await fetch(
      \`\${RATELIMIT_URL}/check?endpoint=\${req.path}&method=\${req.method}\`,
      { headers: { 'X-API-Key': API_KEY } }
    );
    const data = await resp.json();

    // Rate Limit Headers setzen
    res.setHeader('X-RateLimit-Remaining', data.remaining);
    res.setHeader('X-RateLimit-Reset', data.resetAt);

    if (!data.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: data.resetAt - Math.floor(Date.now() / 1000),
      });
    }
    next();
  } catch (err) {
    // Fail-open: bei Fehler weiter lassen
    next();
  }
}

app.use('/api/', rateLimitMiddleware);`,

  'Cloudflare Worker': `// RateLimit in Cloudflare Worker integrieren
const RATELIMIT_URL = 'https://ratelimit-api.pages.dev';
const API_KEY = 'rlapi_your_key_here';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  const rlResp = await fetch(
    \`\${RATELIMIT_URL}/check?endpoint=\${url.pathname}&method=\${request.method}\`,
    { headers: { 'X-API-Key': API_KEY } }
  );
  const rl = await rlResp.json();

  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded', resetAt: rl.resetAt }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rl.resetAt),
        },
      }
    );
  }

  // Eigene Logik hier…
  return new Response('OK', { status: 200 });
}`,

  'Python': `# RateLimit API – Python
import requests, os

BASE_URL = "https://ratelimit-api.pages.dev"
API_KEY  = os.environ["RATELIMIT_API_KEY"]

def check_rate_limit(endpoint: str, method: str = "GET") -> bool:
    resp = requests.get(
        f"{BASE_URL}/check",
        params={"endpoint": endpoint, "method": method},
        headers={"X-API-Key": API_KEY},
        timeout=2,
    )
    data = resp.json()
    return data.get("allowed", True)

# Usage
if check_rate_limit("/api/process", "POST"):
    # Anfrage verarbeiten
    print("Request allowed")
else:
    print("Rate limit exceeded – please retry later")`,
};

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Was ist Rate Limiting?',
    a: 'Rate Limiting begrenzt die Anzahl an Anfragen, die ein Client (IP, API Key, User) in einem definierten Zeitfenster stellen darf. Das schützt APIs vor Überlastung, Missbrauch und Bots.',
  },
  {
    q: 'Wie funktioniert der Token Bucket Algorithmus?',
    a: 'Ein Token Bucket füllt sich kontinuierlich mit Tokens auf. Jede Anfrage verbraucht einen Token. Ist der Bucket leer, wird die Anfrage blockiert. Der Vorteil: kurze Burst-Anfragen sind erlaubt, solange genug Tokens vorhanden sind.',
  },
  {
    q: 'Kann ich mehrere API Keys für verschiedene Projekte erstellen?',
    a: 'Ja. Im Dashboard kannst du beliebig viele API Keys erstellen, jeweils mit eigener Rate-Limit-Konfiguration, eigenem Label und eigenen Filter-Regeln.',
  },
  {
    q: 'Wie richte ich einen IP-Blacklist ein?',
    a: 'Im Dashboard unter „Filter-Regeln" → „Neu" → Typ „ip_blacklist", Wert z. B. „192.168.1.100", Aktion „block". Anfragen von dieser IP werden sofort abgelehnt.',
  },
  {
    q: 'Was passiert bei einem API-Fehler des Rate-Limit-Services?',
    a: 'Empfehlenswert ist ein Fail-open-Pattern: Bei Verbindungsfehlern wird der Request durchgelassen. So wird deine eigene API nicht durch einen temporären Ausfall blockiert.',
  },
  {
    q: 'Wo laufen die Cloudflare Workers?',
    a: 'Cloudflare Workers laufen an über 300 Edge-Standorten weltweit. Das bedeutet sub-Millisekunden-Latenz für deine Rate-Limit-Checks, unabhängig vom Standort deiner Nutzer.',
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const RateLimitAPI = () => {
  const [activeTab, setActiveTab] = useState('Check Request');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: 'Cloudflare Edge', desc: 'Läuft auf Cloudflare Workers — sub-Millisekunden-Latenz an 300+ PoPs weltweit.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Token Bucket Algorithmus', desc: 'Bewährtes Verfahren für faires Rate-Limiting mit Burst-Toleranz.' },
    { icon: <Lock className="w-5 h-5" />, title: 'IP-Blacklist & Whitelist', desc: 'Einzelne IPs blockieren oder dauerhaft freigeben — live im Dashboard konfigurierbar.' },
    { icon: <Server className="w-5 h-5" />, title: 'User-Agent-Filter', desc: 'Bekannte Bot-User-Agents automatisch blockieren oder selektiv erlauben.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Echtzeit-Analytics', desc: 'Live-Dashboard: Requests, Blockierungen, Top-IPs, Top-Endpoints, Zeitverlauf.' },
    { icon: <Database className="w-5 h-5" />, title: 'D1 Datenbank', desc: 'Alle Logs und Konfigurationen in Cloudflare D1 — keine externe Datenbank nötig.' },
    { icon: <Code className="w-5 h-5" />, title: 'Einfache Integration', desc: 'Wenige Zeilen Code — als Middleware in Express, Cloudflare Workers, Python u. v. m.' },
    { icon: <Key className="w-5 h-5" />, title: 'JWT-Authentifizierung', desc: 'Sicherer Zugang via JWT. Tokens haben 24 h Gültigkeit. Passwörter bcrypt-gehashed.' },
    { icon: <Layers className="w-5 h-5" />, title: 'Mehrere API Keys', desc: 'Erstelle Keys pro Projekt, Service oder Team — jeweils mit eigenen Limits und Regeln.' },
  ];

  const useCases = [
    {
      icon: '🤖',
      title: 'API-Missbrauch verhindern',
      desc: 'Verhindere, dass einzelne Clients deine API durch massenhafte Anfragen überlasten oder automatisierte Bots deine Ressourcen ausschöpfen.',
    },
    {
      icon: '💥',
      title: 'DDoS-Schutz',
      desc: 'Automatische Erkennung und Blockierung von DDoS-ähnlichen Anfragemengen — auf Cloudflare Edge, bevor sie dein Backend erreichen.',
    },
    {
      icon: '⚖️',
      title: 'Fair Use sicherstellen',
      desc: 'Garantiere, dass alle Nutzer gleichmäßig Zugriff auf deine API haben. Kein einzelner Client kann andere verdrängen.',
    },
    {
      icon: '💰',
      title: 'Kosten kontrollieren',
      desc: 'Verhindere unerwartete Cloud-Kosten durch fehlerhafte Clients, Retry-Loops oder Bot-Traffic, der dein Backend teuer macht.',
    },
    {
      icon: '🔐',
      title: 'Endpoint-spezifische Limits',
      desc: 'Setze unterschiedliche Rate Limits pro Endpoint: z.B. 1000/h für GET, aber nur 10/min für teure POST-Operationen.',
    },
    {
      icon: '🌍',
      title: 'Globale APIs absichern',
      desc: 'Cloudflare Workers laufen an 300+ Standorten — Rate-Limit-Checks erfolgen am nächstgelegenen Edge-Node, nicht in deinem Rechenzentrum.',
    },
  ];

  const configExamples = [
    { label: '100 Req / Stunde', maxReq: '100', window: '3600 s', use: 'REST APIs, allgemein' },
    { label: '1.000 Req / Tag', maxReq: '1000', window: '86400 s', use: 'Tages-Kontingente' },
    { label: '10 Req / Minute', maxReq: '10', window: '60 s', use: 'Login, Registrierung' },
    { label: '5 Req / Sekunde', maxReq: '5', window: '1 s', use: 'Burst-Schutz' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">

          {/* Kategorie-Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-blue-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Edge-Schutz API</span>
          </div>

          {/* Icon mit Glow */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/30 rounded-full blur-2xl" />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              <RateLimitIcon size={96} />
            </div>
          </div>

          {/* Titel */}
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            RateLimit API
          </h1>

          {/* Status + Tags */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">● Live</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Token Bucket</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Cloudflare Edge</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">IP-Filter</span>
          </div>

          {/* Beschreibung */}
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Schütze deine APIs vor Missbrauch, Bots und DDoS — mit Echtzeit-Analytics auf Cloudflare Edge.
          </p>

          {/* Stats-Strip */}
          <div className="inline-flex flex-wrap justify-center divide-x divide-white/10 glass-effect rounded-2xl mb-10 overflow-hidden">
            {[
              { val: '< 1 ms', label: 'Edge-Latenz' },
              { val: '300+', label: 'CF PoPs' },
              { val: 'D1', label: 'Datenbank' },
              { val: 'JWT', label: 'Auth' },
            ].map((s, i) => (
              <div key={i} className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://ratelimit-api.pages.dev/" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
            <Link to="/register" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span>Kostenlos starten</span>
            </Link>
          </div>
        </div>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── API Endpunkt ──────────────────────────────────────────────────── */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary-400" />
            API Endpunkt
          </h2>
          <div className="flex items-center gap-3 glass-effect rounded-lg px-4 py-3 font-mono text-sm mb-6">
            <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded font-bold text-xs">GET</span>
            <span className="text-gray-200 break-all">https://ratelimit-api.pages.dev/check?endpoint=…&method=…</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-400 mb-3 text-sm uppercase tracking-wider">Query Parameter</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span className="text-blue-300">endpoint</span>: <span className="text-yellow-300">"/api/users"</span> <span className="text-gray-500">// required</span></div>
                <div><span className="text-blue-300">method</span>: <span className="text-yellow-300">"GET"</span> <span className="text-gray-500">// GET|POST|PUT|DELETE</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 mb-3 text-sm uppercase tracking-wider">Request Header</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm">
                <div><span className="text-purple-400">X-API-Key</span>: <span className="text-green-300">rlapi_your_key_here</span></div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-400 mb-3 text-sm uppercase tracking-wider">Response — Erlaubt</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm">
                <span className="text-gray-500">{'{'}</span><br />
                &nbsp;&nbsp;<span className="text-blue-300">"allowed"</span>: <span className="text-green-400">true</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"remaining"</span>: <span className="text-yellow-300">95</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"resetAt"</span>: <span className="text-yellow-300">1708012345</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"blocked"</span>: <span className="text-red-400">false</span><br />
                <span className="text-gray-500">{'}'}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 mb-3 text-sm uppercase tracking-wider">Response — Blockiert (429)</h3>
              <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm">
                <span className="text-gray-500">{'{'}</span><br />
                &nbsp;&nbsp;<span className="text-blue-300">"allowed"</span>: <span className="text-red-400">false</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"remaining"</span>: <span className="text-yellow-300">0</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"resetAt"</span>: <span className="text-yellow-300">1708012345</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"blocked"</span>: <span className="text-red-400">true</span>,<br />
                &nbsp;&nbsp;<span className="text-blue-300">"reason"</span>: <span className="text-yellow-300">"Rate limit exceeded"</span><br />
                <span className="text-gray-500">{'}'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Code Examples ─────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-2xl font-bold text-white">Integrations-Beispiele</h2>
            <button onClick={copyCode} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors glass-effect px-3 py-1.5 rounded-lg">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
            </button>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {Object.keys(codeExamples).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-gray-400 hover:text-white glass-effect'
                }`}>
                {tab}
              </button>
            ))}
          </div>
          <pre className="bg-dark-900 rounded-lg p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed">
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>

        {/* ── Use Cases ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Wann brauchst du Rate-Limiting?</h2>
          <p className="text-gray-400 text-center mb-10">Typische Szenarien, in denen RateLimit API hilft</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc, i) => (
              <div key={i} className="card">
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h3 className="font-bold text-white mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Konfiguration ─────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Rate-Limit Konfigurationen</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Profil</th>
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Max Requests</th>
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Zeitfenster</th>
                  <th className="text-left py-2 text-gray-400 font-semibold">Typischer Einsatz</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {configExamples.map((c, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-6 font-medium text-white">{c.label}</td>
                    <td className="py-3 pr-6 font-mono">{c.maxReq}</td>
                    <td className="py-3 pr-6 font-mono">{c.window}</td>
                    <td className="py-3 text-gray-400">{c.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">Alle Werte frei konfigurierbar im Dashboard — pro API Key individuell einstellbar.</p>
        </div>

        {/* ── Filter Regeln ─────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-400" />
            Filter-Regeln
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                type: 'IP Blacklist',
                icon: '🚫',
                color: 'border-red-500/20 bg-red-500/5',
                badge: 'ip_blacklist',
                badgeColor: 'bg-red-500/20 text-red-300',
                desc: 'Blockiert alle Anfragen von einer bestimmten IP-Adresse permanent.',
                example: 'Wert: 192.168.1.100',
              },
              {
                type: 'IP Whitelist',
                icon: '✅',
                color: 'border-green-500/20 bg-green-500/5',
                badge: 'ip_whitelist',
                badgeColor: 'bg-green-500/20 text-green-300',
                desc: 'Gibt eine IP-Adresse dauerhaft frei — Rate Limits gelten dann nicht.',
                example: 'Wert: 10.0.0.5',
              },
              {
                type: 'User-Agent Filter',
                icon: '🤖',
                color: 'border-yellow-500/20 bg-yellow-500/5',
                badge: 'user_agent',
                badgeColor: 'bg-yellow-500/20 text-yellow-300',
                desc: 'Blockiert Anfragen mit bestimmten User-Agent-Strings (z. B. bekannte Bots).',
                example: 'Wert: "bot"',
              },
            ].map((rule, i) => (
              <div key={i} className={`rounded-xl p-5 border ${rule.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{rule.icon}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${rule.badgeColor}`}>{rule.badge}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{rule.type}</h3>
                <p className="text-gray-400 text-sm mb-3">{rule.desc}</p>
                <div className="glass-effect rounded px-3 py-1.5 text-xs font-mono text-gray-400">{rule.example}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Analytics ─────────────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            Echtzeit-Analytics Dashboard
          </h2>
          <p className="text-gray-400 mb-6 text-sm">Das integrierte Dashboard zeigt alle relevanten Metriken live — kein externes Tool nötig.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Gesamt Requests', desc: 'Alle Requests im gewählten Zeitraum (24h, 7d, 30d)' },
              { label: 'Blockierte Requests', desc: 'Anzahl blockierter Anfragen durch Rate Limits oder Filter' },
              { label: 'Unique IPs', desc: 'Eindeutige IP-Adressen im Zeitraum' },
              { label: 'Zeitverlauf-Chart', desc: 'Interaktives Diagramm: Requests über Zeit' },
              { label: 'Top Endpoints', desc: 'Meist aufgerufene Endpoints deiner API' },
              { label: 'Request Logs', desc: 'Detaillierte Logs der letzten Anfragen mit IP, Status, Timestamp' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Setup ─────────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Schnellstart — Setup in 5 Minuten</h2>
          <div className="space-y-4">
            {[
              { n: '1', title: 'Account erstellen', desc: 'Registriere dich auf ratelimit-api.pages.dev und verifiziere deine E-Mail.' },
              { n: '2', title: 'API Key generieren', desc: 'Im Dashboard → „API Keys" → „Neu erstellen". Den Key sofort kopieren und sicher speichern.' },
              { n: '3', title: 'Rate Limit konfigurieren', desc: 'Max Requests und Zeitfenster festlegen. Beispiel: 100 Requests / 3600 Sekunden.' },
              { n: '4', title: 'In deine API integrieren', desc: 'Vor jeder kritischen Route den /check-Endpunkt aufrufen. Bei allowed: false → 429 zurückgeben.' },
              { n: '5', title: 'Filter-Regeln optional', desc: 'IP-Blacklists, Whitelists oder User-Agent-Filter nach Bedarf hinzufügen.' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <span className="w-7 h-7 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{step.n}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{step.title}</div>
                  <div className="text-gray-400 text-sm">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Security ──────────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-400" />
            Sicherheit
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: 'bcrypt-Passwort-Hashing', d: 'Passwörter werden mit bcrypt (10 Rounds) gehashed — nie im Klartext gespeichert.' },
              { t: 'JWT HS256', d: 'Tokens mit 24-Stunden-Gültigkeit und HS256-Signatur. Sicher gegen Manipulation.' },
              { t: 'Prepared Statements', d: 'Alle D1-Datenbankabfragen via Prepared Statements — kein SQL-Injection-Risiko.' },
              { t: 'CORS-Konfiguration', d: 'CORS-Header anpassbar für Production — nur autorisierte Frontend-Domains.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">{item.t}</div>
                  <div className="text-gray-400 text-xs">{item.d}</div>
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
                <button className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
        <div className="card text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex justify-center mb-4">
            <RateLimitIcon size={56} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Jetzt ausprobieren</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Registriere dich, erstelle deinen ersten API Key und schütze deine API in wenigen Minuten.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://ratelimit-api.pages.dev/" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>ratelimit-api.pages.dev</span>
            </a>
            <Link to="/register" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span>Kostenlos registrieren</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RateLimitAPI;
