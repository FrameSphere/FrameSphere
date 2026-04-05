import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, CheckCircle } from 'lucide-react';
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

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function InfoBox({ icon = '💡', color = 'blue', children }) {
  const colors = {
    blue: 'bg-blue-500/5 border-blue-500/15',
    green: 'bg-green-500/5 border-green-500/15',
    yellow: 'bg-amber-500/5 border-amber-500/15',
    red: 'bg-red-500/5 border-red-500/15',
  };
  return (
    <div className={`card text-sm text-gray-400 my-4 ${colors[color]}`}>
      {icon} {children}
    </div>
  );
}

const BASE = 'https://ratelimit-api.pages.dev';

export default function RateLimitQuickstart() {
  return (
    <TutorialPage category="RateLimit API" categoryColor="text-blue-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">RateLimit API</div>
            <h1 className="text-3xl font-bold text-white">Quickstart — 5 Minuten</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Die RateLimit API schützt deine Endpunkte vor Missbrauch, Bots und DDoS — gehostet auf
          Cloudflare Edge mit sub-Millisekunden-Latenz. Dieser Guide führt dich von der Registrierung
          bis zum ersten geschützten API-Call.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <a href={BASE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> ratelimit-api.pages.dev
          </a>
          <span className="text-gray-700">·</span>
          <Link to="/developers/tutorials/ratelimit-express" className="text-xs text-gray-400 hover:text-white transition-colors">
            Express Middleware →
          </Link>
          <span className="text-gray-700">·</span>
          <Link to="/developers/tutorials/ratelimit-api" className="text-xs text-gray-400 hover:text-white transition-colors">
            Vollständige API-Referenz →
          </Link>
        </div>
      </div>

      {/* Was du brauchst */}
      <div className="card bg-white/[0.02] border-white/[0.06] mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Was du brauchst</h2>
        <ul className="space-y-1.5 text-sm text-gray-300">
          {[
            'Einen Browser (keine Installation nötig)',
            'curl oder ein HTTP-Tool zum Testen (optional)',
            'Ca. 5 Minuten Zeit',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <Step n={1} title="Account registrieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Gehe zu{' '}
          <a href={`${BASE}/register`} target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:underline">ratelimit-api.pages.dev/register</a>{' '}
          und registriere dich mit E-Mail und Passwort. Nach der Registrierung wirst du automatisch
          zum Dashboard weitergeleitet.
        </p>
        <InfoBox icon="🔐" color="blue">
          Passwörter werden mit <strong className="text-white">bcrypt (10 Rounds)</strong> gehasht.
          Du erhältst nach dem Login ein JWT-Token mit <strong className="text-white">24 h Gültigkeit</strong>.
        </InfoBox>
      </Step>

      <Step n={2} title="API Key erstellen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Im Dashboard navigiere zu <strong className="text-white">API Keys → Neuen Key erstellen</strong>.
          Vergib einen beschreibenden Label (z.B. <code className="font-mono text-blue-300">production-api</code>).
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Der generierte Key hat das Format <code className="font-mono text-blue-300">rlapi_xxxxxxxx</code>.
          Kopiere ihn sofort — er wird nur einmal vollständig angezeigt.
        </p>
        <InfoBox icon="⚠️" color="yellow">
          Speichere deinen API Key als Umgebungsvariable, nie direkt im Code:
          <CodeBlock lang="bash" code={`# .env
RATELIMIT_API_KEY=rlapi_your_key_here`} />
        </InfoBox>
      </Step>

      <Step n={3} title="Rate Limit konfigurieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Klicke auf deinen API Key → <strong className="text-white">Einstellungen</strong>.
          Konfiguriere das Rate Limit:
        </p>
        <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Feld</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Wert</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Bedeutung</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Max Requests', '100', 'Erlaubte Anfragen im Zeitfenster'],
                ['Zeitfenster (s)', '3600', '1 Stunde in Sekunden'],
              ].map(([f, v, d]) => (
                <tr key={f} className="border-b border-white/[0.04]">
                  <td className="py-2 px-4 text-white font-mono text-xs">{f}</td>
                  <td className="py-2 px-4 text-blue-300 font-mono text-xs">{v}</td>
                  <td className="py-2 px-4 text-gray-400 text-xs">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfoBox icon="💡" color="blue">
          Typische Konfigurationen: <strong className="text-white">10 / 60 s</strong> für Login-Endpunkte,{' '}
          <strong className="text-white">1000 / 86400 s</strong> für Tages-Kontingente.
        </InfoBox>
      </Step>

      <Step n={4} title="Ersten /check-Request senden">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Der einzige Endpunkt den du zum Schutz deiner API brauchst ist{' '}
          <code className="font-mono text-blue-300">GET /check</code>. Sende ihn vor jeder
          kritischen Route:
        </p>
        <CodeBlock lang="bash" code={`curl -H "X-API-Key: rlapi_your_key_here" \\
  "${BASE}/check?endpoint=/api/users&method=GET"`} />
        <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-2">
          Erwartete Antwort (Request erlaubt):
        </p>
        <CodeBlock lang="json" code={`{
  "allowed": true,
  "remaining": 99,
  "resetAt": 1708012345,
  "blocked": false
}`} />
        <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-2">
          Wenn das Limit überschritten ist (HTTP 429):
        </p>
        <CodeBlock lang="json" code={`{
  "allowed": false,
  "remaining": 0,
  "resetAt": 1708012345,
  "blocked": true,
  "reason": "Rate limit exceeded"
}`} />
      </Step>

      <Step n={5} title="In deinen Code integrieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Wrap deine API-Logik mit dem Check. Minimalbeispiel in JavaScript:
        </p>
        <CodeBlock lang="javascript" code={`const API_KEY = process.env.RATELIMIT_API_KEY;

async function checkRateLimit(endpoint, method = 'GET') {
  const res = await fetch(
    \`${BASE}/check?endpoint=\${endpoint}&method=\${method}\`,
    { headers: { 'X-API-Key': API_KEY } }
  );
  return res.json(); // { allowed, remaining, resetAt, blocked }
}

// Deine Route
app.get('/api/data', async (req, res) => {
  const rl = await checkRateLimit('/api/data', 'GET');

  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: rl.resetAt - Math.floor(Date.now() / 1000),
    });
  }

  // ... deine Logik
  res.json({ data: [] });
});`} />
        <InfoBox icon="🛡️" color="green">
          <strong className="text-white">Fail-open Pattern:</strong> Fange Netzwerkfehler zum RateLimit-Service
          mit try/catch ab und lasse den Request im Fehlerfall durch — so blockiert ein temporärer
          Ausfall nicht deine eigene API.
        </InfoBox>
      </Step>

      {/* Response Felder */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Response-Felder im Detail
      </h2>
      <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Feld</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Typ</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Beschreibung</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['allowed', 'boolean', 'true = Request darf durch; false = blockiert'],
              ['remaining', 'number', 'Noch verfügbare Requests im aktuellen Zeitfenster'],
              ['resetAt', 'number', 'Unix-Timestamp: Wann füllt sich das Kontingent wieder auf?'],
              ['blocked', 'boolean', 'true wenn durch Filter-Regel (IP/User-Agent) blockiert'],
              ['reason', 'string?', 'Optionaler Grund bei blocked: true'],
            ].map(([f, t, d]) => (
              <tr key={f} className="border-b border-white/[0.04]">
                <td className="py-2 px-4 text-blue-300 font-mono text-xs">{f}</td>
                <td className="py-2 px-4 text-purple-300 font-mono text-xs">{t}</td>
                <td className="py-2 px-4 text-gray-400 text-xs">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rate Limit Headers */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Standard Rate-Limit-Headers setzen
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Leite die Werte aus dem Response als HTTP-Header weiter — das ist der Standard den Clients erwarten:
      </p>
      <CodeBlock lang="javascript" code={`res.setHeader('X-RateLimit-Limit',     100);
res.setHeader('X-RateLimit-Remaining', rl.remaining);
res.setHeader('X-RateLimit-Reset',     rl.resetAt);
res.setHeader('Retry-After',           rl.resetAt - Math.floor(Date.now() / 1000));`} />

      {/* Nächste Schritte */}
      <div className="card bg-violet-500/5 border-violet-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/ratelimit-express" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Express.js Middleware einrichten
          </Link>
          <Link to="/developers/tutorials/ratelimit-blacklist" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-red-400">→</span> IP-Blacklisting für Abuse-Prevention
          </Link>
          <Link to="/developers/tutorials/ratelimit-analytics" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Analytics-Dashboard auslesen
          </Link>
          <Link to="/developers/tutorials/ratelimit-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> Vollständige API-Referenz
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
