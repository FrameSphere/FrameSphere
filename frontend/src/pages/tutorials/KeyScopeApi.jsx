import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE = 'https://keyscope-worker.karol-paschek.workers.dev';

function CodeBlock({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08]">
        <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[11px] text-gray-500 hover:text-white transition-colors px-2 py-0.5 rounded border border-white/[0.08]"
        >
          {copied ? '✓' : 'Kopieren'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed bg-black/20">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ m }) {
  const c = { POST: 'bg-blue-500/15 text-blue-400 border-blue-500/25', GET: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', DELETE: 'bg-red-500/15 text-red-400 border-red-500/25', PUT: 'bg-amber-500/15 text-amber-400 border-amber-500/25' };
  return <span className={`text-[11px] font-bold px-2 py-1 rounded border font-mono ${c[m]}`}>{m}</span>;
}

function Endpoint({ method, path, desc, params, example, response }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.03] transition-colors text-left">
        <MethodBadge m={method} />
        <code className="text-white text-sm flex-1 font-mono">{BASE}{path}</code>
        <span className="text-gray-500 text-xs hidden md:block">{desc}</span>
        <span className="text-gray-600 text-xs flex-shrink-0">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="border-t border-white/[0.08] p-4 bg-dark-900/40 space-y-4">
          <p className="text-gray-400 text-sm">{desc}</p>
          {params && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Parameter</div>
              <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="text-left px-3 py-2 text-gray-500 font-medium">Name</th>
                      <th className="text-left px-3 py-2 text-gray-500 font-medium">Typ</th>
                      <th className="text-left px-3 py-2 text-gray-500 font-medium">Pflicht</th>
                      <th className="text-left px-3 py-2 text-gray-500 font-medium">Beschreibung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.map(([name, type, req, d], i) => (
                      <tr key={i} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-3 py-2 font-mono text-blue-300">{name}</td>
                        <td className="px-3 py-2 text-gray-500">{type}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${req ? 'bg-blue-500/15 text-blue-400' : 'bg-white/5 text-gray-500'}`}>
                            {req ? 'Pflicht' : 'optional'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-400">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {example && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Beispiel</div>
              <CodeBlock lang="bash" code={example} />
            </div>
          )}
          {response && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Response</div>
              <CodeBlock lang="json" code={response} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function KeyScopeApi() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-2">KeyScope API</div>
        <h1 className="text-3xl font-bold text-white mb-3">API-Referenz</h1>
        <p className="text-gray-400 leading-relaxed">
          Alle Endpunkte akzeptieren und liefern <code className="font-mono text-blue-300">application/json</code>.
          Authentifizierung erfolgt per <strong className="text-white">Bearer Token</strong> im Authorization-Header.
          API Key unter <code className="font-mono text-blue-300">Settings → API Keys</code> generieren.
        </p>
        <CodeBlock lang="http" code={`Authorization: Bearer YOUR_API_KEY\nContent-Type: application/json`} />
        <div className="text-xs text-gray-500">Base URL: <code className="font-mono text-blue-300">{BASE}</code></div>
      </div>

      {/* AUTH */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Auth</h2>
      <Endpoint method="POST" path="/auth/register" desc="Neuen Account erstellen. Gibt Session-Token zurück."
        params={[
          ['email', 'string', true, 'E-Mail-Adresse'],
          ['password', 'string', true, 'Mindestens 8 Zeichen'],
        ]}
        response={`{ "ok": true, "token": "sess_abc123", "user": { "id": "...", "email": "...", "plan": "free" } }`}
      />
      <Endpoint method="POST" path="/auth/login" desc="Einloggen und Session-Token erhalten."
        params={[
          ['email', 'string', true, 'Registrierte E-Mail'],
          ['password', 'string', true, 'Account-Passwort'],
        ]}
        response={`{ "ok": true, "token": "sess_abc123", "user": { "id": "...", "plan": "free" } }`}
      />
      <Endpoint method="GET" path="/auth/me" desc="Aktuell authentifizierten User abrufen." />
      <Endpoint method="POST" path="/auth/logout" desc="Aktive Session invalidieren." />

      {/* ANALYZE */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Analyse</h2>
      <Endpoint
        method="POST" path="/analyze"
        desc="Keywords, Longtail-Phrasen und Meta Description aus Text extrahieren. Rate-limitiert: 20/Tag (Free), 500/Tag (Pro)."
        params={[
          ['content', 'string', true, 'Text (min. 50 Zeichen)'],
          ['title', 'string', false, 'Seitentitel — erhält +6 Punkte je Wort im Scoring'],
          ['lang', 'string', false, 'Sprachcode: de | en | fr | es | it (Standard: de)'],
          ['profile_id', 'string', false, 'UUID eines trainierten Profils für Gewichts-Anwendung'],
          ['mode', 'string', false, 'algorithmic (Standard) | ai (nur Pro)'],
          ['keyword_count', 'integer', false, 'Anzahl Keywords (1–50, Standard: 10)'],
          ['longtail_count', 'integer', false, 'Anzahl Longtail-Phrasen (1–50, Standard: 10)'],
        ]}
        example={`curl -X POST ${BASE}/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @- <<EOF
{
  "title": "SEO Strategien 2025",
  "content": "Suchmaschinenoptimierung gewinnt im digitalen Marketing...",
  "lang": "de",
  "keyword_count": 15,
  "longtail_count": 10
}
EOF`}
        response={`{
  "ok": true,
  "mode": "algorithmic",
  "keywords": ["suchmaschinenoptimierung", "marketing", "ranking"],
  "longtailKeywords": ["seo strategie 2025", "digitales marketing ranking"],
  "metaDescription": "Suchmaschinenoptimierung gewinnt im digitalen Marketing...",
  "lang": "de",
  "profile_id": null
}`}
      />

      {/* PROFILES */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Profile</h2>
      <Endpoint method="GET" path="/profiles" desc="Alle Profile des authentifizierten Users abrufen."
        response={`[
  { "id": "uuid-123", "name": "SEO Blog DE", "language": "de", "description": "...", "created_at": "..." },
  { "id": "uuid-456", "name": "Tech Docs EN", "language": "en", "description": null, "created_at": "..." }
]`}
      />
      <Endpoint method="POST" path="/profiles" desc="Neues Keyword-Profil erstellen."
        params={[
          ['name', 'string', true, 'Anzeigename des Profils'],
          ['description', 'string', false, 'Optionale Beschreibung'],
          ['language', 'string', false, 'de | en | fr | es | it'],
        ]}
        example={`curl -X POST ${BASE}/profiles \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "SEO Blog DE", "language": "de" }'`}
        response={`{ "ok": true, "profile": { "id": "uuid-123", "name": "SEO Blog DE", ... } }`}
      />
      <Endpoint method="PUT" path="/profiles/:id" desc="Profil-Name, Beschreibung oder Config aktualisieren." />
      <Endpoint method="DELETE" path="/profiles/:id" desc="Profil und alle zugehörigen Gewichte & Trainingsdaten löschen." />

      {/* TRAINING */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Training / Gewichte</h2>
      <Endpoint
        method="POST" path="/weights/train"
        desc="Profil mit einem Text-Korpus trainieren. Berechnet TF-IDF-Gewichte aus deinen Dokumenten. Überschreibt bestehende Gewichte."
        params={[
          ['profile_id', 'string', true, 'UUID des zu trainierenden Profils'],
          ['documents', 'array', true, 'Array aus { title?, content, lang? } Objekten (max 20 Free / 200 Pro)'],
          ['lang', 'string', false, 'Fallback-Sprache falls nicht pro Dokument angegeben'],
        ]}
        example={`curl -X POST ${BASE}/weights/train \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "profile_id": "PROFILE_UUID",
    "documents": [
      { "title": "SEO Guide", "content": "Suchmaschinenoptimierung...", "lang": "de" },
      { "title": "Keyword Research", "content": "Keyword-Analyse beginnt mit...", "lang": "de" }
    ]
  }'`}
        response={`{
  "ok": true,
  "trained": 2,
  "uniqueWords": 847,
  "topWords": [
    { "word": "suchmaschinenoptimierung", "score": 1.0 },
    { "word": "keyword", "score": 0.84 }
  ]
}`}
      />
      <Endpoint method="GET" path="/weights/:profileId" desc="Aktuelle Wort-Gewichte eines Profils abrufen." />
      <Endpoint method="DELETE" path="/weights/:profileId" desc="Alle Gewichte eines Profils löschen (zurück auf untrainiert)." />

      {/* IGNORE */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Ignore-Listen</h2>
      <Endpoint method="GET" path="/ignore" desc="Ignore-Wörter abrufen. Optional: ?profile_id=UUID für profilspezifische Liste." />
      <Endpoint method="POST" path="/ignore" desc="Wörter zur Ignore-Liste hinzufügen."
        params={[
          ['words', 'string[]', true, 'Array der zu ignorierenden Wörter'],
          ['profile_id', 'string', false, 'Profilspezifisch — ohne Angabe global'],
        ]}
        example={`curl -X POST ${BASE}/ignore \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "words": ["gmbh", "impressum", "datenschutz"], "profile_id": "PROFILE_UUID" }'`}
      />
      <Endpoint method="DELETE" path="/ignore/:word" desc="Wort aus Ignore-Liste entfernen. Optional: ?profile_id=UUID" />

      {/* HISTORY */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Analyse-Verlauf</h2>
      <Endpoint method="GET" path="/history" desc="Paginierter Analyse-Verlauf des Users."
        params={[
          ['limit', 'integer', false, 'Seitengröße (Standard 20, max 100)'],
          ['offset', 'integer', false, 'Paginierungs-Offset (Standard 0)'],
        ]}
        response={`{
  "ok": true,
  "total": 142,
  "items": [
    {
      "id": "uuid-789",
      "input_title": "SEO Guide 2025",
      "language": "de",
      "mode": "algorithmic",
      "keywords": ["seo", "ranking", ...],
      "created_at": "2026-04-01T10:23:00Z"
    }
  ]
}`}
      />

      {/* API KEY */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">API Key Verwaltung</h2>
      <Endpoint method="GET" path="/apikey" desc="Aktuellen API Key (maskiert) abrufen." />
      <Endpoint method="POST" path="/apikey" desc="Neuen API Key generieren. Vorheriger Key wird sofort revoked." />
      <Endpoint method="DELETE" path="/apikey" desc="Aktuellen API Key widerrufen." />

      {/* ERRORS */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Fehlercodes</h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
              <th className="text-left px-4 py-2.5 text-gray-500 text-xs font-medium uppercase">Status</th>
              <th className="text-left px-4 py-2.5 text-gray-500 text-xs font-medium uppercase">Bedeutung</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['400', 'Bad Request — fehlende oder ungültige Parameter'],
              ['401', 'Unauthorized — kein oder ungültiger Token'],
              ['403', 'Forbidden — Feature erfordert Pro-Plan'],
              ['404', 'Not Found — Ressource existiert nicht'],
              ['409', 'Conflict — E-Mail bereits registriert'],
              ['429', 'Too Many Requests — Tageslimit überschritten'],
              ['500', 'Internal Server Error — Support kontaktieren'],
            ].map(([code, msg]) => (
              <tr key={code} className="border-b border-white/[0.04] last:border-0">
                <td className="px-4 py-2.5 font-mono text-red-400 text-xs">{code}</td>
                <td className="px-4 py-2.5 text-gray-400 text-xs">{msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
