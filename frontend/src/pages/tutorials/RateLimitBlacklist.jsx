import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
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
        style={{ background: 'linear-gradient(135deg,#EF4444,#8B5CF6)' }}>
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
  return <div className={`card text-sm text-gray-400 my-4 ${colors[color]}`}>{icon} {children}</div>;
}

function RuleCard({ type, badge, badgeColor, borderColor, icon, desc, example }) {
  return (
    <div className={`rounded-xl p-5 border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${badgeColor}`}>{badge}</span>
      </div>
      <h3 className="font-bold text-white mb-2">{type}</h3>
      <p className="text-gray-400 text-sm mb-3">{desc}</p>
      <div className="glass-effect rounded px-3 py-1.5 text-xs font-mono text-gray-400">{example}</div>
    </div>
  );
}

export default function RateLimitBlacklist() {
  return (
    <TutorialPage category="RateLimit API" categoryColor="text-blue-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#EF4444,#8B5CF6)' }}>
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">RateLimit API</div>
            <h1 className="text-3xl font-bold text-white">IP-Blacklisting & Abuse-Prevention</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Filter-Regeln erlauben es dir, bestimmte IPs, IP-Ranges oder Bot-User-Agents dauerhaft zu
          blockieren oder freizuschalten — unabhängig vom Rate-Limit-Kontingent. Du lernst alle drei
          Regeltypen und wie du sie sinnvoll kombinierst.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">ip_blacklist</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">ip_whitelist</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">user_agent</span>
        </div>
      </div>

      {/* Regeltypen Übersicht */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Die drei Regeltypen
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <RuleCard
          type="IP Blacklist"
          badge="ip_blacklist"
          badgeColor="bg-red-500/20 text-red-300"
          borderColor="border-red-500/20 bg-red-500/5"
          icon="🚫"
          desc="Blockiert alle Anfragen einer IP-Adresse permanent — unabhängig vom Kontingent."
          example="Wert: 203.0.113.42"
        />
        <RuleCard
          type="IP Whitelist"
          badge="ip_whitelist"
          badgeColor="bg-green-500/20 text-green-300"
          borderColor="border-green-500/20 bg-green-500/5"
          icon="✅"
          desc="Gibt eine IP dauerhaft frei — Rate-Limit-Prüfung wird übersprungen."
          example="Wert: 192.168.1.10"
        />
        <RuleCard
          type="User-Agent Filter"
          badge="user_agent"
          badgeColor="bg-yellow-500/20 text-yellow-300"
          borderColor="border-yellow-500/20 bg-yellow-500/5"
          icon="🤖"
          desc="Blockiert Anfragen mit bestimmtem User-Agent-String (Substring-Match)."
          example='Wert: "scrapy"'
        />
      </div>

      {/* Step by step */}
      <Step n={1} title="IP-Blacklist im Dashboard anlegen">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Navigiere im Dashboard zu deinem API Key → <strong className="text-white">Filter-Regeln → Neue Regel</strong>.
          Fülle die Felder aus:
        </p>
        <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Feld</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Wert</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Typ', 'ip_blacklist'],
                ['Wert', '203.0.113.42  (die zu blockierende IP)'],
                ['Aktion', 'block'],
                ['Aktiv', 'Ja (Toggle aktivieren)'],
              ].map(([f, v]) => (
                <tr key={f} className="border-b border-white/[0.04]">
                  <td className="py-2 px-4 text-gray-300 text-xs">{f}</td>
                  <td className="py-2 px-4 text-blue-300 font-mono text-xs">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Klicke <strong className="text-white">Speichern</strong>. Die Regel ist sofort aktiv —
          alle Requests von dieser IP erhalten ab jetzt <code className="font-mono text-red-300">allowed: false</code>{' '}
          mit <code className="font-mono text-red-300">blocked: true</code>.
        </p>
      </Step>

      <Step n={2} title="Blockierten Response verarbeiten">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Der <code className="font-mono text-blue-300">/check</code>-Endpunkt unterscheidet zwischen
          Rate-Limit-Überschreitung und Filter-Blockierung über das <code className="font-mono text-blue-300">blocked</code>-Feld:
        </p>
        <CodeBlock lang="json" code={`// Blockiert durch ip_blacklist oder user_agent
{
  "allowed": false,
  "remaining": 0,
  "resetAt": 0,
  "blocked": true,
  "reason": "IP is blacklisted"
}

// Vs. normales Rate-Limit
{
  "allowed": false,
  "remaining": 0,
  "resetAt": 1708012345,
  "blocked": false,
  "reason": "Rate limit exceeded"
}`} />
        <p className="text-gray-400 text-sm leading-relaxed mt-2">
          Im Code kannst du beide Fälle unterschiedlich behandeln:
        </p>
        <CodeBlock lang="javascript" code={`const rl = await checkRateLimit(req.path, req.method);

if (!rl.allowed) {
  if (rl.blocked) {
    // Permanent geblockt — kein Retry-After
    return res.status(403).json({ error: 'Access denied' });
  } else {
    // Rate limit — mit Retry-After
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: rl.resetAt - Math.floor(Date.now() / 1000),
    });
  }
}`} />
      </Step>

      <Step n={3} title="IP-Whitelist: interne Services freischalten">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Eigene Server, CI/CD-Pipelines oder Monitoring-Systeme sollten nie durch Rate Limits
          blockiert werden. Erstelle eine Whitelist-Regel:
        </p>
        <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Feld</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Wert</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Typ', 'ip_whitelist'],
                ['Wert', '10.0.0.5  (interne Server-IP)'],
                ['Aktion', 'allow'],
              ].map(([f, v]) => (
                <tr key={f} className="border-b border-white/[0.04]">
                  <td className="py-2 px-4 text-gray-300 text-xs">{f}</td>
                  <td className="py-2 px-4 text-green-300 font-mono text-xs">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfoBox icon="⚠️" color="yellow">
          Die Whitelist hat <strong className="text-white">Priorität</strong> vor Rate Limits — aber
          nicht vor IP-Blacklists. Prüfe die Regelreihenfolge im Dashboard sorgfältig.
        </InfoBox>
      </Step>

      <Step n={4} title="Bot-User-Agents blockieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          User-Agent-Filter blocken automatische Scraper und bekannte Bot-Bibliotheken.
          Der Wert wird als <strong className="text-white">Substring</strong> gegen den
          Request-User-Agent geprüft (case-insensitive):
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { val: 'scrapy', desc: 'Python Scrapy Framework' },
            { val: 'python-requests', desc: 'Python requests Library' },
            { val: 'curl', desc: 'curl-Direktzugriffe blockieren' },
            { val: 'bot', desc: 'Alle User-Agents mit "bot"' },
            { val: 'spider', desc: 'Web-Spider allgemein' },
            { val: 'headless', desc: 'Headless Browser (Puppeteer etc.)' },
          ].map((item) => (
            <div key={item.val} className="flex items-center gap-3 px-3 py-2 bg-yellow-500/5 border border-yellow-500/15 rounded-lg">
              <code className="font-mono text-yellow-300 text-xs">{item.val}</code>
              <span className="text-gray-500 text-xs">{item.desc}</span>
            </div>
          ))}
        </div>
        <InfoBox icon="💡" color="blue">
          Wähle Substring-Werte bewusst: <code className="font-mono text-blue-300">"bot"</code>{' '}
          blockiert z.B. auch <em>Googlebot</em> — was SEO-Crawler ausschließen würde.
          Für SEO-relevante Seiten stattdessen spezifische Bot-Namen blockieren.
        </InfoBox>
      </Step>

      <Step n={5} title="Client-IP korrekt weitergeben">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Damit IP-Filter funktionieren, muss die Client-IP im Request-Header korrekt gesetzt sein.
          Beim Aufruf aus einer Middleware musst du die ursprüngliche IP durchreichen:
        </p>
        <CodeBlock lang="javascript" code={`// In Express — Client-IP aus X-Forwarded-For lesen
const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim()
              || req.socket.remoteAddress
              || '0.0.0.0';

const response = await fetch(
  \`https://ratelimit-api.pages.dev/check?endpoint=\${req.path}&method=\${req.method}\`,
  {
    headers: {
      'X-API-Key': process.env.RATELIMIT_API_KEY,
      'CF-Connecting-IP': clientIp,  // Wichtig für IP-Filter!
    },
  }
);`} />
        <InfoBox icon="⚠️" color="yellow">
          Bei Deployments hinter einem Reverse-Proxy (nginx, Cloudflare) immer{' '}
          <code className="font-mono text-blue-300">X-Forwarded-For</code> statt{' '}
          <code className="font-mono text-blue-300">req.socket.remoteAddress</code> verwenden —
          sonst blockierst du nur die Proxy-IP.
        </InfoBox>
      </Step>

      {/* Abschnitt: Abuse-Automation */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Automatisches Abuse-Tracking
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Kombiniere das Rate Limit mit eigener Logik um wiederholte Überschreitungen automatisch zu
        blacklisten:
      </p>
      <CodeBlock lang="javascript" code={`// Einfacher Abuse-Tracker (in-memory, für Demo)
const violations = new Map(); // ip → count
const VIOLATION_THRESHOLD = 5;

async function rateLimitWithAutoBlacklist(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
  const rl  = await checkRateLimit(req.path, req.method, ip);

  if (!rl.allowed && !rl.blocked) {
    // Rate-Limit-Verletzung zählen
    const count = (violations.get(ip) || 0) + 1;
    violations.set(ip, count);

    if (count >= VIOLATION_THRESHOLD) {
      // Automatisch blacklisten via Dashboard-API (kommt in API-Referenz)
      console.warn(\`[Abuse] IP \${ip} hat \${count} Violations — manuell blacklisten!\`);
    }

    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  next();
}`} />

      {/* Next */}
      <div className="card bg-violet-500/5 border-violet-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/ratelimit-analytics" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Analytics-Dashboard auslesen — blockierte IPs analysieren
          </Link>
          <Link to="/developers/tutorials/ratelimit-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> Vollständige API-Referenz
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
