import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Zap, Package, Activity, ArrowRight, CheckCircle, Terminal, Globe, Shield, Sparkles, Brain } from 'lucide-react';

const DeveloperHub = () => {
  const sections = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quickstart',
      desc: 'In unter 10 Minuten zur ersten API-Integration. API Key holen, Beispielcode kopieren, fertig.',
      path: '/developers/quickstart',
      color: 'from-yellow-500 to-orange-500',
      cta: 'Quickstart starten',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'API Dokumentation',
      desc: 'Vollständige Referenz aller Endpunkte, Parameter, Response-Formate und Fehlercodes.',
      path: '/developers/docs',
      color: 'from-blue-500 to-indigo-500',
      cta: 'Docs öffnen',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'SDKs & Libraries',
      desc: 'Offizielle SDKs für JavaScript, Python, PHP und mehr. Schneller integrieren, weniger Boilerplate.',
      path: '/developers/sdks',
      color: 'from-green-500 to-emerald-500',
      cta: 'SDKs ansehen',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Tutorials',
      desc: 'Schritt-für-Schritt Guides für die häufigsten Anwendungsfälle — mit vollständigen Code-Beispielen.',
      path: '/developers/tutorials',
      color: 'from-purple-500 to-pink-500',
      cta: 'Tutorials ansehen',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'API Status',
      desc: 'Live-Status aller FrameSphere APIs und Dienste. Ausfallzeiten, Wartungen und Incident-Reports.',
      path: '/developers/status',
      color: 'from-teal-500 to-cyan-500',
      cta: 'Status prüfen',
    },
  ];

  const apis = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      name: 'FrameSpell API',
      baseUrl: 'api.framespell.dev',
      color: 'text-blue-400',
      endpoints: [
        { method: 'POST', path: '/check', desc: 'Text prüfen und korrigieren' },
        { method: 'POST', path: '/check/batch', desc: 'Mehrere Texte gleichzeitig' },
        { method: 'GET', path: '/languages', desc: 'Verfügbare Sprachen abrufen' },
        { method: 'GET', path: '/usage', desc: 'API-Nutzung & Limits abfragen' },
      ],
    },
    {
      icon: <Shield className="w-5 h-5" />,
      name: 'RateLimit API',
      baseUrl: 'ratelimit-api.pages.dev/api',
      color: 'text-green-400',
      endpoints: [
        { method: 'POST', path: '/check', desc: 'Rate-Limit eines Clients prüfen' },
        { method: 'POST', path: '/reset', desc: 'Counter eines Clients zurücksetzen' },
        { method: 'GET', path: '/stats', desc: 'Statistiken & Analytics abrufen' },
        { method: 'POST', path: '/blacklist', desc: 'IP zur Blacklist hinzufügen' },
      ],
    },
  ];

  const methodColors = {
    GET: 'bg-green-500/20 text-green-400 border-green-500/30',
    POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Developer Hub</span>
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Alles für Entwickler</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Dokumentation, SDKs, Quickstart-Guides und API-Referenz — alles an einem Ort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/developers/quickstart" className="btn-primary inline-flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Quickstart</span>
            </Link>
            <Link to="/developers/docs" className="btn-secondary inline-flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>API Docs</span>
            </Link>
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((s, i) => (
            <Link key={i} to={s.path} className="card group hover:scale-[1.03] transition-all duration-300 flex flex-col">
              <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-white mb-4`}>{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>
              <div className="flex items-center text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                <span>{s.cta}</span>
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* API Übersicht */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">API-Endpunkte Übersicht</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {apis.map((api, i) => (
              <div key={i} className="card">
                <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-white/10">
                  <span className={api.color}>{api.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{api.name}</h3>
                    <code className="text-xs text-gray-500">{api.baseUrl}</code>
                  </div>
                </div>
                <div className="space-y-3">
                  {api.endpoints.map((ep, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <span className={`text-xs px-2 py-0.5 rounded border font-mono flex-shrink-0 ${methodColors[ep.method]}`}>{ep.method}</span>
                      <code className="text-xs text-gray-300 flex-shrink-0">{ep.path}</code>
                      <span className="text-xs text-gray-500 truncate">{ep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth Info */}
        <div className="card mb-16 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">Authentifizierung</h2>
          <p className="text-gray-400 mb-6">
            Alle FrameSphere APIs nutzen API-Key-Authentifizierung via HTTP Header. Erstelle deinen Key im Dashboard.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-300 font-semibold mb-2">Request Header</div>
              <pre className="bg-dark-900 rounded-lg p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`X-API-Key: fs_dein_api_key

// oder alternativ
Authorization: Bearer fs_dein_api_key`}
              </pre>
            </div>
            <div>
              <div className="text-sm text-gray-300 font-semibold mb-2">Fehler-Response</div>
              <pre className="bg-dark-900 rounded-lg p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`{
  "error": "Unauthorized",
  "message": "Invalid API Key",
  "code": 401
}`}
              </pre>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Link to="/register" className="btn-primary text-sm inline-flex items-center space-x-2">
              <span>API Key erstellen</span><ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/developers/docs" className="btn-secondary text-sm">Vollständige Docs</Link>
          </div>
        </div>

        {/* Rate Limits Info */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400">Produkt</th>
                  <th className="text-center py-3 px-4 text-gray-400">Kostenlos</th>
                  <th className="text-center py-3 px-4 text-gray-400">Professional</th>
                  <th className="text-center py-3 px-4 text-gray-400">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['FrameSpell API', '20 Req/Min', '100 Req/Min', 'Unbegrenzt'],
                  ['RateLimit API', '50 Req/Min', '500 Req/Min', 'Unbegrenzt'],
                  ['FrameTrain', 'Lokal (kein Limit)', '—', '—'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                    <td className="py-3 px-4 text-white font-medium">{row[0]}</td>
                    <td className="py-3 px-4 text-center text-green-400">{row[1]}</td>
                    <td className="py-3 px-4 text-center text-primary-400">{row[2]}</td>
                    <td className="py-3 px-4 text-center text-purple-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Terminal className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Bereit zum Entwickeln?</h2>
          <p className="text-gray-400 mb-6">Erstelle deinen kostenlosen API Key und leg direkt los.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
              <span>Kostenlosen API Key holen</span><ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/developers/quickstart" className="btn-secondary inline-flex items-center space-x-2">
              <Zap className="w-5 h-5" /><span>Quickstart Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperHub;
