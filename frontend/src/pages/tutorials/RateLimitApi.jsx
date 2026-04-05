import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink } from 'lucide-react';
import { TutorialPage } from '../../components/TutorialPage';

function CodeBlock({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08]">
        <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[11px] text-gray-500 hover:text-white transition-colors px-2 py-0.5 rounded border border-white/[0.08] hover:border-white/20"
        >
          {copied ? '✓ Kopiert' : 'Kopieren'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed bg-black/20">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }) {
  const colors = {
    GET: 'bg-green-500/20 text-green-300 border-green-500/30',
    POST: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    DELETE: 'bg-red-500/20 text-red-300 border-red-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  };
  return (
    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${colors[method] || colors.GET}`}>
      {method}
    </span>
  );
}

function Endpoint({ method, path, auth, desc, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card mb-4">
      <button className="w-full text-left" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3 flex-wrap">
          <MethodBadge method={method} />
          <code className="font-mono text-sm text-white">{path}</code>
          {auth && (
            <span className="text-xs px-2 py-0.5 bg-purple-500/15 text-purple-300 rounded border border-purple-500/20">
              🔐 Auth
            </span>
          )}
          <span className="text-gray-500 text-xs ml-auto">{open ? '▲ zuklappen' : '▼ Details'}</span>
        </div>
        <p className="text-gray-500 text-xs mt-1.5">{desc}</p>
      </button>
      {open && <div className="mt-4 pt-4 border-t border-white/[0.06]">{children}</div>}
    </div>
  );
}

const BASE = 'https://ratelimit-api.pages.dev';

export default function RateLimitApi() {
  return (
    <TutorialPage category="RateLimit API" categoryColor="text-blue-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">RateLimit API</div>
            <h1 className="text-3xl font-bold text-white">Vollständige API-Referenz</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Alle Endpunkte der RateLimit API dokumentiert — Authentication, API Keys, Rate-Limit-Check,
          Filter-Regeln und Analytics. Klicke auf einen Endpunkt für Details, Parameter und Beispiele.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <code className="text-xs text-gray-400 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Base URL: {BASE}
          </code>
          <a href={BASE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> Live
          </a>
        </div>
      </div>

      {/* Authentication */}
      <h2 className="text-xl font-semibold text-white mb-3 pb-2 border-b border-white/[0.08]">
        Authentifizierung
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Die API nutzt zwei Auth-Methoden — <strong className="text-white">JWT</strong> für das Dashboard
        und <strong className="text-white">X-API-Key</strong> für den Rate-Limit-Check in deiner Anwendung.
      </p>
      <div className="bg-black/20 rounded-xl border border-white/[0.08] p-4 font-mono text-sm mb-6 space-y-2">
        <div>
          <span className="text-purple-400">Authorization</span>:{' '}
          <span className="text-green-300">Bearer &lt;jwt_token&gt;</span>
          <span className="text-gray-600 ml-3">// Dashboard-Endpunkte</span>
        </div>
        <div>
          <span className="text-purple-400">X-API-Key</span>:{' '}
          <span className="text-green-300">rlapi_your_key_here</span>
          <span className="text-gray-600 ml-3">// Rate-Limit-Check</span>
        </div>
      </div>

      {/* Auth Endpoints */}
      <h2 className="text-xl font-semibold text-white mb-3 pb-2 border-b border-white/[0.08]">Auth</h2>

      <Endpoint method="POST" path="/auth/register" auth={false} desc="Registriert einen neuen Benutzer. Gibt JWT-Token und User-Objekt zurück.">
        <p className="text-xs text-gray-400 mb-2">Request Body:</p>
        <CodeBlock lang="json" code={`{ "email": "user@example.com", "password": "securePassword123" }`} />
        <p className="text-xs text-gray-400 mb-2">Response 201:</p>
        <CodeBlock lang="json" code={`{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "abc123", "email": "user@example.com" }
}`} />
        <div className="text-xs text-gray-500">Fehler: 400 Validierung · 409 Email bereits registriert</div>
      </Endpoint>

      <Endpoint method="POST" path="/auth/login" auth={false} desc="Meldet Benutzer an. JWT-Token mit 24 h Gültigkeit (HS256).">
        <p className="text-xs text-gray-400 mb-2">Request Body:</p>
        <CodeBlock lang="json" code={`{ "email": "user@example.com", "password": "securePassword123" }`} />
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "abc123", "email": "user@example.com" }
}`} />
        <div className="text-xs text-gray-500">Fehler: 400 Validierung · 401 Falsche Credentials</div>
      </Endpoint>

      {/* Rate Limit Check */}
      <h2 className="text-xl font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Rate-Limit-Check
      </h2>

      <Endpoint method="GET" path="/check" auth={false} desc="Prüft ob ein Request erlaubt ist. Der Kernendpunkt der API — wird vor jeder abzusichernden Route aufgerufen.">
        <p className="text-xs text-gray-400 mb-2">Query-Parameter:</p>
        <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
          <div><span className="text-blue-300">endpoint</span>: <span className="text-yellow-300">"/api/users"</span> <span className="text-gray-600">required</span></div>
          <div><span className="text-blue-300">method</span>: <span className="text-yellow-300">"GET"</span> <span className="text-gray-600">GET|POST|PUT|DELETE</span></div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Request Header:</p>
        <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
          <div><span className="text-purple-400">X-API-Key</span>: <span className="text-green-300">rlapi_your_key_here</span> <span className="text-gray-600">required</span></div>
          <div><span className="text-purple-400">CF-Connecting-IP</span>: <span className="text-green-300">1.2.3.4</span> <span className="text-gray-600">optional — Client-IP für IP-Filter</span></div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Response — allowed:</p>
        <CodeBlock lang="json" code={`{ "allowed": true, "remaining": 95, "resetAt": 1708012345, "blocked": false }`} />
        <p className="text-xs text-gray-400 mb-2">Response — blocked (HTTP 429):</p>
        <CodeBlock lang="json" code={`{
  "allowed": false,
  "remaining": 0,
  "resetAt": 1708012345,
  "blocked": true,
  "reason": "Rate limit exceeded"
}`} />
        <div className="text-xs text-gray-500">Fehler: 401 Ungültiger API Key · 400 Parameter fehlen</div>
      </Endpoint>

      {/* API Keys */}
      <h2 className="text-xl font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        API Key Management
      </h2>

      <Endpoint method="GET" path="/api-keys" auth desc="Listet alle API Keys des eingeloggten Benutzers.">
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{
  "keys": [
    {
      "id": "key_abc123",
      "label": "production-api",
      "key": "rlapi_****abcd",
      "maxRequests": 100,
      "windowSeconds": 3600,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}`} />
      </Endpoint>

      <Endpoint method="POST" path="/api-keys" auth desc="Erstellt einen neuen API Key mit Rate-Limit-Konfiguration.">
        <p className="text-xs text-gray-400 mb-2">Request Body:</p>
        <CodeBlock lang="json" code={`{
  "label": "production-api",
  "maxRequests": 100,
  "windowSeconds": 3600
}`} />
        <p className="text-xs text-gray-400 mb-2">Response 201:</p>
        <CodeBlock lang="json" code={`{
  "id": "key_abc123",
  "label": "production-api",
  "key": "rlapi_1234567890abcdef",
  "maxRequests": 100,
  "windowSeconds": 3600
}`} />
        <div className="text-xs text-gray-500 mt-2">⚠️ Der vollständige Key wird nur bei Erstellung einmalig zurückgegeben.</div>
      </Endpoint>

      <Endpoint method="DELETE" path="/api-keys/:id" auth desc="Löscht einen API Key. Alle damit gemachten Requests werden sofort blockiert.">
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{ "success": true, "message": "API Key gelöscht" }`} />
        <div className="text-xs text-gray-500">Fehler: 404 Key nicht gefunden · 403 Kein Zugriff</div>
      </Endpoint>

      {/* Filter Rules */}
      <h2 className="text-xl font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Filter-Regeln
      </h2>

      <Endpoint method="GET" path="/api-keys/:id/rules" auth desc="Listet alle Filter-Regeln eines API Keys.">
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{
  "rules": [
    {
      "id": "rule_xyz",
      "type": "ip_blacklist",
      "value": "203.0.113.42",
      "action": "block",
      "isActive": true
    }
  ]
}`} />
      </Endpoint>

      <Endpoint method="POST" path="/api-keys/:id/rules" auth desc="Erstellt eine neue Filter-Regel (ip_blacklist, ip_whitelist oder user_agent).">
        <p className="text-xs text-gray-400 mb-2">Request Body:</p>
        <CodeBlock lang="json" code={`{
  "type": "ip_blacklist",
  "value": "203.0.113.42",
  "action": "block"
}

// Typ-Optionen:
// "ip_blacklist"  →  IP dauerhaft blockieren
// "ip_whitelist"  →  IP dauerhaft freischalten
// "user_agent"    →  User-Agent-Substring blockieren`} />
        <p className="text-xs text-gray-400 mb-2">Response 201:</p>
        <CodeBlock lang="json" code={`{ "id": "rule_xyz", "type": "ip_blacklist", "value": "203.0.113.42", "action": "block", "isActive": true }`} />
      </Endpoint>

      <Endpoint method="DELETE" path="/api-keys/:id/rules/:ruleId" auth desc="Löscht eine Filter-Regel. Ab sofort werden Requests von dieser IP/diesem User-Agent wieder normal geprüft.">
        <CodeBlock lang="json" code={`{ "success": true }`} />
      </Endpoint>

      {/* Analytics */}
      <h2 className="text-xl font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Analytics
      </h2>

      <Endpoint method="GET" path="/analytics" auth desc="Liefert aggregierte Request-Statistiken für den gewählten Zeitraum.">
        <p className="text-xs text-gray-400 mb-2">Query-Parameter:</p>
        <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
          <div><span className="text-blue-300">keyId</span>: <span className="text-yellow-300">"key_abc123"</span> <span className="text-gray-600">optional</span></div>
          <div><span className="text-blue-300">period</span>: <span className="text-yellow-300">"24h" | "7d" | "30d"</span> <span className="text-gray-600">default: 24h</span></div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{
  "totalRequests":   1250,
  "blockedRequests": 87,
  "uniqueIps":       342,
  "blockRate":       "6.96%",
  "topEndpoints": [
    { "endpoint": "/api/users", "count": 430 },
    { "endpoint": "/api/posts", "count": 280 }
  ],
  "topIps": [
    { "ip": "1.2.3.4", "count": 95 },
    { "ip": "5.6.7.8", "count": 72 }
  ],
  "timeline": [
    { "hour": "2024-01-15T10:00:00Z", "requests": 45, "blocked": 3 }
  ]
}`} />
      </Endpoint>

      <Endpoint method="GET" path="/logs" auth desc="Gibt detaillierte Request-Logs zurück. Unterstützt Pagination.">
        <p className="text-xs text-gray-400 mb-2">Query-Parameter:</p>
        <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
          <div><span className="text-blue-300">page</span>: <span className="text-yellow-300">1</span></div>
          <div><span className="text-blue-300">limit</span>: <span className="text-yellow-300">50</span> <span className="text-gray-600">max: 200</span></div>
          <div><span className="text-blue-300">status</span>: <span className="text-yellow-300">"allowed" | "blocked"</span></div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Response 200:</p>
        <CodeBlock lang="json" code={`{
  "logs": [
    {
      "id": "log_123",
      "timestamp": "2024-01-15T10:30:00Z",
      "ip": "1.2.3.4",
      "endpoint": "/api/users",
      "method": "GET",
      "allowed": true,
      "remaining": 94,
      "reason": null
    }
  ],
  "pagination": { "page": 1, "limit": 50, "total": 1250, "pages": 25 }
}`} />
      </Endpoint>

      {/* Error Codes */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-2 border-b border-white/[0.08]">
        HTTP Status Codes
      </h2>
      <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Code</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Bedeutung</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['200', 'OK — Request erfolgreich'],
              ['201', 'Created — Ressource erstellt (API Key, Regel)'],
              ['400', 'Bad Request — Fehlende oder ungültige Parameter'],
              ['401', 'Unauthorized — JWT fehlt/ungültig oder API Key ungültig'],
              ['403', 'Forbidden — Kein Zugriff auf diese Ressource'],
              ['404', 'Not Found — Ressource existiert nicht'],
              ['409', 'Conflict — Ressource existiert bereits'],
              ['429', 'Too Many Requests — Rate Limit oder Filter greift'],
              ['500', 'Internal Server Error — Serverinterner Fehler'],
            ].map(([code, desc]) => (
              <tr key={code} className="border-b border-white/[0.04]">
                <td className={`py-2 px-4 font-mono font-bold text-xs ${
                  code.startsWith('2') ? 'text-green-400' :
                  code.startsWith('4') ? 'text-yellow-400' : 'text-red-400'
                }`}>{code}</td>
                <td className="py-2 px-4 text-gray-400 text-xs">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rate Limit der API selbst */}
      <div className="card bg-blue-500/5 border-blue-500/15 mb-6">
        <h3 className="font-semibold text-white mb-2 text-sm">Rate Limit der API selbst</h3>
        <p className="text-gray-400 text-xs mb-2">
          Die RateLimit API ist selbst durch Rate Limits abgesichert:
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            ['/auth/*', '5 req/min'],
            ['/check', '500 req/min'],
            ['/api-keys', '20 req/min'],
            ['/analytics', '60 req/min'],
          ].map(([ep, limit]) => (
            <div key={ep} className="flex gap-3">
              <span className="text-blue-300">{ep}</span>
              <span className="text-gray-500">{limit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next */}
      <div className="card bg-violet-500/5 border-violet-500/15">
        <h3 className="font-semibold text-white mb-3">Tutorials</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/ratelimit-quickstart" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Quickstart — 5 Minuten
          </Link>
          <Link to="/developers/tutorials/ratelimit-express" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Express.js Middleware
          </Link>
          <Link to="/developers/tutorials/ratelimit-blacklist" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-red-400">→</span> IP-Blacklisting
          </Link>
          <Link to="/developers/tutorials/ratelimit-analytics" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-yellow-400">→</span> Analytics auslesen
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
