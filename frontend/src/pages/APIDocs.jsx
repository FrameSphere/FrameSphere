import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

const Endpoint = ({ method, path, desc, request, response }) => {
  const [open, setOpen] = useState(false);
  const colors = { POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30', GET: 'bg-green-500/20 text-green-400 border-green-500/30', DELETE: 'bg-red-500/20 text-red-400 border-red-500/30' };
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 transition-colors text-left">
        <span className={`text-xs px-2.5 py-1 rounded border font-mono font-bold flex-shrink-0 ${colors[method]}`}>{method}</span>
        <code className="text-white text-sm flex-1">{path}</code>
        <span className="text-gray-500 text-sm hidden md:block flex-1">{desc}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-white/10 p-4 bg-dark-900/50">
          {request && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Request Body</div>
              <pre className="bg-dark-900 rounded-lg p-3 text-xs font-mono text-gray-300 overflow-x-auto">{request}</pre>
            </div>
          )}
          {response && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Response</div>
              <pre className="bg-dark-900 rounded-lg p-3 text-xs font-mono text-gray-300 overflow-x-auto">{response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const APIDocs = () => {
  const [section, setSection] = useState('framespell');

  const sections = [
    { id: 'framespell', name: 'FrameSpell API' },
    { id: 'ratelimit', name: 'RateLimit API' },
    { id: 'auth', name: 'Auth & Account' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Referenz</span>
          <h1 className="text-5xl font-bold text-white mb-4">API Dokumentation</h1>
          <p className="text-xl text-gray-400">Vollständige Referenz aller FrameSphere Endpunkte.</p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setSection(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${section === s.id ? 'btn-primary' : 'btn-secondary'}`}>
              {s.name}
            </button>
          ))}
        </div>

        {/* Base URL */}
        <div className="card mb-8 bg-dark-800/50">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Base URL</div>
          <code className="text-primary-400 font-mono">
            {section === 'framespell' ? 'https://api.framespell.dev' : section === 'ratelimit' ? 'https://ratelimit-api.pages.dev/api' : 'https://framesphere-backend.vercel.app/api'}
          </code>
        </div>

        {section === 'framespell' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">FrameSpell Endpunkte</h2>
            <Endpoint method="POST" path="/check" desc="Text prüfen und korrigieren"
              request={`{\n  "text": "Helo Welt, das ist ein Tset.",\n  "language": "de"  // de | en | es | fr\n}`}
              response={`{\n  "corrected": "Hallo Welt, das ist ein Test.",\n  "original": "Helo Welt, das ist ein Tset.",\n  "errors": [\n    { "word": "Helo", "correction": "Hallo", "position": 0, "type": "spelling" }\n  ],\n  "language": "de",\n  "processing_time_ms": 183\n}`} />
            <Endpoint method="POST" path="/check/batch" desc="Mehrere Texte gleichzeitig prüfen"
              request={`{\n  "texts": ["Helo Welt", "Das ist ein Tset"],\n  "language": "de"\n}`}
              response={`{\n  "results": [\n    { "corrected": "Hallo Welt", "errors": [...] },\n    { "corrected": "Das ist ein Test", "errors": [...] }\n  ]\n}`} />
            <Endpoint method="GET" path="/languages" desc="Verfügbare Sprachen abrufen"
              response={`{\n  "languages": [\n    { "code": "de", "name": "Deutsch", "status": "active" },\n    { "code": "en", "name": "English", "status": "active" },\n    { "code": "es", "name": "Español", "status": "active" },\n    { "code": "fr", "name": "Français", "status": "active" }\n  ]\n}`} />
            <Endpoint method="GET" path="/usage" desc="API-Nutzung und Rate-Limit-Status"
              response={`{\n  "requests_today": 142,\n  "requests_this_month": 3821,\n  "rate_limit": 20,\n  "rate_limit_remaining": 18,\n  "plan": "free"\n}`} />
          </div>
        )}

        {section === 'ratelimit' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">RateLimit API Endpunkte</h2>
            <Endpoint method="POST" path="/check" desc="Rate-Limit eines Clients prüfen"
              request={`{\n  "client_id": "user_123",\n  "endpoint": "/api/my-endpoint",\n  "limit": 10,\n  "window": 60\n}`}
              response={`{\n  "allowed": true,\n  "remaining": 7,\n  "limit": 10,\n  "reset_at": "2026-03-29T14:05:00Z",\n  "client_id": "user_123"\n}`} />
            <Endpoint method="POST" path="/reset" desc="Counter zurücksetzen"
              request={`{\n  "client_id": "user_123",\n  "endpoint": "/api/my-endpoint"\n}`}
              response={`{\n  "success": true,\n  "message": "Counter reset for user_123"\n}`} />
            <Endpoint method="POST" path="/blacklist" desc="Client-ID oder IP sperren"
              request={`{\n  "client_id": "user_123",\n  "reason": "Abuse detected",\n  "duration": 3600  // Sekunden\n}`}
              response={`{\n  "success": true,\n  "blacklisted_until": "2026-03-29T15:00:00Z"\n}`} />
            <Endpoint method="GET" path="/stats" desc="Nutzungsstatistiken abrufen"
              response={`{\n  "total_requests": 48291,\n  "blocked_requests": 1204,\n  "block_rate": "2.49%",\n  "top_clients": [...]\n}`} />
          </div>
        )}

        {section === 'auth' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Auth Endpunkte</h2>
            <Endpoint method="POST" path="/auth/register" desc="Neuen Account erstellen"
              request={`{\n  "name": "Max Mustermann",\n  "email": "max@example.com",\n  "password": "sicheres_passwort"\n}`}
              response={`{\n  "token": "eyJhbGc...",\n  "user": { "id": "usr_123", "name": "Max Mustermann", "email": "max@example.com" }\n}`} />
            <Endpoint method="POST" path="/auth/login" desc="Einloggen und Token erhalten"
              request={`{\n  "email": "max@example.com",\n  "password": "sicheres_passwort"\n}`}
              response={`{\n  "token": "eyJhbGc...",\n  "user": { "id": "usr_123", "name": "Max Mustermann" }\n}`} />
            <Endpoint method="GET" path="/auth/me" desc="Eigene User-Daten abrufen"
              response={`{\n  "user": {\n    "id": "usr_123",\n    "name": "Max Mustermann",\n    "email": "max@example.com",\n    "plan": "free",\n    "created_at": "2026-01-15T10:00:00Z"\n  }\n}`} />
          </div>
        )}

        <div className="mt-10 card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <BookOpen className="w-10 h-10 text-primary-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Direkt loslegen?</h2>
          <p className="text-gray-400 mb-5 text-sm">API Key erstellen und die erste Anfrage senden.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/developers/quickstart" className="btn-primary text-sm inline-flex items-center space-x-2">
              <span>Quickstart Guide</span><ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/register" className="btn-secondary text-sm">API Key holen</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocs;
