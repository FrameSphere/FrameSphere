import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

const Endpoint = ({ method, path, desc, request, response }) => {
  const [open, setOpen] = useState(false);
  const colors = {
    POST:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
    GET:    'bg-green-500/20 text-green-400 border-green-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
    PATCH:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
    PUT:    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 transition-colors text-left">
        <span className={`text-xs px-2.5 py-1 rounded border font-mono font-bold flex-shrink-0 ${colors[method]}`}>{method}</span>
        <code className="text-white text-sm flex-1 font-mono">{path}</code>
        <span className="text-gray-500 text-sm hidden md:block">{desc}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-white/10 p-4 bg-dark-900/50 space-y-4">
          <p className="text-gray-400 text-sm">{desc}</p>
          {request && (
            <div>
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
    { id: 'ratelimit',  name: 'RateLimit API'  },
    { id: 'keyscope',   name: 'KeyScope'        },
    { id: 'sitecontrol',name: 'SiteControl'     },
    { id: 'auth',       name: 'Auth & Account'  },
  ];

  const baseUrls = {
    framespell:  'https://api.framespell.dev',
    ratelimit:   'https://ratelimit-api.karol-paschek.workers.dev',
    keyscope:    'https://keyscope-worker.karol-paschek.workers.dev',
    sitecontrol: 'https://site-control-nine.vercel.app/api',
    auth:        'https://framesphere-backend.vercel.app/api',
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Referenz</span>
          <h1 className="text-5xl font-bold text-white mb-4">API Dokumentation</h1>
          <p className="text-xl text-gray-400">Vollständige Referenz aller FrameSphere Endpunkte.</p>
        </div>

        {/* Tabs */}
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
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base URL</div>
              <code className="text-primary-400 font-mono text-sm">{baseUrls[section]}</code>
            </div>
            {(section === 'keyscope' || section === 'sitecontrol') && (
              <Link
                to={section === 'keyscope' ? '/developers/tutorials/keyscope-api' : '/developers/tutorials/sitecontrol-api'}
                className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
              >
                Ausführliche Referenz →
              </Link>
            )}
          </div>
        </div>

        {/* ── FrameSpell ── */}
        {section === 'framespell' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">FrameSpell Endpunkte</h2>
            <Endpoint method="POST" path="/check" desc="Text prüfen und korrigieren"
              request={`{ "text": "Helo Welt!", "language": "de" }  // de | en | es | fr`}
              response={`{
  "corrected": "Hallo Welt!",
  "errors": [{ "word": "Helo", "correction": "Hallo", "position": 0 }],
  "processing_time_ms": 183
}`} />
            <Endpoint method="POST" path="/check/batch" desc="Mehrere Texte gleichzeitig prüfen"
              request={`{ "texts": ["Helo Welt", "Das ist ein Tset"], "language": "de" }`}
              response={`{ "results": [{ "corrected": "Hallo Welt" }, { "corrected": "Das ist ein Test" }] }`} />
            <Endpoint method="GET" path="/languages" desc="Verfügbare Sprachen abrufen"
              response={`{ "languages": [{ "code": "de", "name": "Deutsch" }, { "code": "en", "name": "English" }] }`} />
            <Endpoint method="GET" path="/usage" desc="API-Nutzung und Rate-Limit-Status"
              response={`{ "requests_today": 142, "rate_limit": 20, "rate_limit_remaining": 18, "plan": "free" }`} />
          </div>
        )}

        {/* ── RateLimit ── */}
        {section === 'ratelimit' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">RateLimit API Endpunkte</h2>
            <Endpoint method="GET" path="/check" desc="Rate-Limit prüfen (Query-Params: api_key, identifier)"
              response={`{ "allowed": true, "remaining": 7, "limit": 100, "reset_at": "2026-04-04T15:00:00Z" }`} />
            <Endpoint method="POST" path="/api/keys" desc="Neuen API Key erstellen"
              request={`{ "keyName": "Production API" }`}
              response={`{ "apiKey": { "id": 1, "key_name": "Production API", "api_key": "rlapi_abc123..." } }`} />
            <Endpoint method="GET" path="/api/keys" desc="Alle API Keys des Users abrufen" />
            <Endpoint method="POST" path="/api/configs" desc="Rate-Limit-Konfiguration erstellen"
              request={`{ "apiKeyId": 1, "name": "Standard Limit", "maxRequests": 100, "windowSeconds": 3600 }`} />
            <Endpoint method="GET" path="/api/analytics/:apiKeyId" desc="Analytics & Traffic-Daten für einen API Key"
              response={`{ "total": 4821, "blocked": 142, "uniqueIps": 38, "chart": [...] }`} />
            <Endpoint method="POST" path="/api/filters" desc="IP-Filter-Regel hinzufügen"
              request={`{ "configId": 1, "ruleType": "ip_blacklist", "ruleValue": "1.2.3.4", "action": "block" }`} />
          </div>
        )}

        {/* ── KeyScope ── */}
        {section === 'keyscope' && (
          <div>
            <div className="card bg-yellow-500/5 border-yellow-500/15 mb-6 text-sm text-gray-400">
              🔍 <strong className="text-white">KeyScope</strong> — Auth via Bearer Token (API Key aus Settings).
              Rate Limit: 20 Analysen/Tag (Free), 500/Tag (Pro).
              <Link to="/developers/tutorials/keyscope-api" className="ml-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                Vollständige Referenz →
              </Link>
            </div>
            <Endpoint method="POST" path="/analyze" desc="Keywords, Longtails & Meta Description extrahieren"
              request={`{
  "title": "SEO Tipps 2025",
  "content": "Suchmaschinenoptimierung ist wichtiger denn je...",
  "lang": "de",
  "profile_id": "prof_uuid",  // optional
  "mode": "algorithmic",       // oder "ai" (Pro only)
  "keyword_count": 10,
  "longtail_count": 8
}`}
              response={`{
  "ok": true,
  "mode": "algorithmic",
  "keywords": ["suchmaschinenoptimierung", "seo", "ranking"],
  "longtailKeywords": ["seo tipps 2025", "suchmaschinen ranking verbessern"],
  "metaDescription": "Suchmaschinenoptimierung ist wichtiger denn je...",
  "lang": "de"
}`} />
            <Endpoint method="GET"    path="/profiles"          desc="Alle Analyse-Profile des Users" />
            <Endpoint method="POST"   path="/profiles"          desc="Neues Profil erstellen"
              request={`{ "name": "SEO Blog DE", "language": "de" }`} />
            <Endpoint method="POST"   path="/weights/train"     desc="Profil mit eigenem Text-Korpus trainieren"
              request={`{
  "profile_id": "prof_uuid",
  "documents": [
    { "title": "SEO Guide", "content": "...", "lang": "de" }
  ]
}`} />
            <Endpoint method="GET"    path="/history"           desc="Paginierter Analyse-Verlauf (?limit=20&offset=0)" />
            <Endpoint method="POST"   path="/ignore"            desc="Wörter zur Ignore-Liste hinzufügen"
              request={`{ "words": ["gmbh", "impressum"], "profile_id": "prof_uuid" }`} />
            <Endpoint method="POST"   path="/apikey"            desc="API Key generieren (rotiert automatisch)" />
            <Endpoint method="GET"    path="/auth/me"           desc="User-Daten & aktueller Plan" />
          </div>
        )}

        {/* ── SiteControl ── */}
        {section === 'sitecontrol' && (
          <div>
            <div className="card bg-indigo-500/5 border-indigo-500/15 mb-6 text-sm text-gray-400">
              🌐 <strong className="text-white">SiteControl</strong> — Auth via Supabase JWT
              (<code className="font-mono text-blue-300">supabase.auth.getSession()</code>).
              Pro-Endpunkte erfordern aktives Pro-Abo.
              <Link to="/developers/tutorials/sitecontrol-api" className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                Vollständige Referenz →
              </Link>
            </div>
            <Endpoint method="GET"   path="/sites"      desc="Alle Websites des Users abrufen" />
            <Endpoint method="POST"  path="/sites"      desc="Neue Website hinzufügen (Free: max. 3)"
              request={`{ "name": "Mein Blog", "url": "https://meinblog.de", "color": "#5b6af6" }`}
              response={`{ "id": "uuid-site-1", "name": "Mein Blog", "slug": "mein-blog-3k2abc", "status": "active" }`} />
            <Endpoint method="PATCH" path="/sites"      desc="Website-Daten aktualisieren (name, url, color, status, notes)"
              request={`{ "id": "uuid-site-1", "status": "paused" }`} />
            <Endpoint method="DELETE" path="/sites?id=UUID" desc="Website löschen (inkl. aller Todos, Posts, Changelogs)" />
            <Endpoint method="GET"   path="/todos"      desc="Todos abrufen (?site_id=UUID optional)" />
            <Endpoint method="POST"  path="/todos"      desc="Todo erstellen"
              request={`{ "site_id": "uuid-site-1", "title": "SEO-Audit", "priority": 2, "important": true }`} />
            <Endpoint method="PATCH" path="/todos"      desc="Todo aktualisieren (done, title, priority)"
              request={`{ "id": "uuid-todo-1", "done": true }`} />
            <Endpoint method="POST"  path="/blog"       desc="[Pro] Blog-Post erstellen"
              request={`{ "site_id": "uuid", "title": "...", "content": "...", "lang": "de", "status": "published" }`} />
            <Endpoint method="POST"  path="/changelog"  desc="[Pro] Changelog-Eintrag erstellen"
              request={`{ "site_id": "uuid", "version": "v2.1.0", "title": "Neues Feature", "type": "feature" }`} />
            <Endpoint method="POST"  path="/support"    desc="[Pro] Support-Ticket erstellen (z.B. vom Kontaktformular)"
              request={`{ "subject": "Frage", "message": "...", "name": "Max", "email": "max@..." }`} />
            <Endpoint method="POST"  path="/track"      desc="Analytics-Event senden (kein Auth nötig)"
              request={`{ "site_id": "uuid-site-1", "event_type": "pageview", "path": "/blog/artikel" }`} />
          </div>
        )}

        {/* ── Auth ── */}
        {section === 'auth' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Auth Endpunkte (FrameSphere Account)</h2>
            <Endpoint method="POST" path="/auth/register" desc="Neuen Account erstellen"
              request={`{ "name": "Max Mustermann", "email": "max@example.com", "password": "sicher123" }`}
              response={`{ "token": "eyJ...", "user": { "id": "usr_123", "name": "Max Mustermann" } }`} />
            <Endpoint method="POST" path="/auth/login" desc="Einloggen und Token erhalten"
              request={`{ "email": "max@example.com", "password": "sicher123" }`}
              response={`{ "token": "eyJ...", "user": { "id": "usr_123", "plan": "free" } }`} />
            <Endpoint method="GET" path="/auth/me" desc="Eigene User-Daten abrufen"
              response={`{ "user": { "id": "usr_123", "name": "Max", "email": "...", "plan": "free" } }`} />
          </div>
        )}

        <div className="mt-10 card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <BookOpen className="w-10 h-10 text-primary-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Direkt loslegen?</h2>
          <p className="text-gray-400 mb-5 text-sm">API Key erstellen und die erste Anfrage senden.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/developers/quickstart" className="btn-primary text-sm inline-flex items-center space-x-2">
              <span>Quickstart Guide</span><ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/developers/tutorials" className="btn-secondary text-sm">Alle Tutorials</Link>
            <Link to="/register" className="btn-secondary text-sm">API Key holen</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocs;
