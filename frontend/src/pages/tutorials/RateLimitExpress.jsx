import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, ExternalLink } from 'lucide-react';
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

export default function RateLimitExpress() {
  return (
    <TutorialPage category="RateLimit API" categoryColor="text-blue-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}>
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">RateLimit API</div>
            <h1 className="text-3xl font-bold text-white">Rate-Limiting in Express.js</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Richte die RateLimit API als Express.js Middleware ein — wenige Zeilen Code,
          sofort produktionsreif. Du lernst den Basisaufbau, endpoint-spezifische Limits,
          Fail-open-Pattern und robuste Fehlerbehandlung.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">Node.js 18+</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">Express 4+</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">~10 Min</span>
        </div>
      </div>

      {/* Voraussetzungen */}
      <div className="card bg-white/[0.02] border-white/[0.06] mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Voraussetzungen</h2>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Node.js 18+ und npm installiert</li>
          <li>• Ein RateLimit API Key (→ <Link to="/developers/tutorials/ratelimit-quickstart" className="text-blue-400 hover:underline">Quickstart</Link>)</li>
          <li>• Bestehendes Express.js Projekt (oder neues anlegen)</li>
        </ul>
      </div>

      <Step n={1} title="Projekt einrichten">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Falls noch kein Projekt vorhanden, lege eines an:
        </p>
        <CodeBlock lang="bash" code={`mkdir meine-api && cd meine-api
npm init -y
npm install express dotenv`} />
        <p className="text-gray-400 text-sm leading-relaxed mt-2">
          Erstelle eine <code className="font-mono text-blue-300">.env</code> Datei:
        </p>
        <CodeBlock lang="bash" code={`RATELIMIT_API_KEY=rlapi_your_key_here
PORT=3000`} />
      </Step>

      <Step n={2} title="Middleware-Funktion schreiben">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Erstelle <code className="font-mono text-blue-300">middleware/rateLimit.js</code>:
        </p>
        <CodeBlock lang="javascript" code={`// middleware/rateLimit.js
const RATELIMIT_URL = 'https://ratelimit-api.pages.dev';

/**
 * RateLimit Middleware für Express.js
 * @param {object} options
 * @param {number} [options.timeout=3000]  - Request-Timeout in ms
 * @param {boolean} [options.failOpen=true] - Bei Fehler: Request durchlassen?
 */
function createRateLimitMiddleware({ timeout = 3000, failOpen = true } = {}) {
  return async function rateLimitMiddleware(req, res, next) {
    const apiKey = process.env.RATELIMIT_API_KEY;

    if (!apiKey) {
      console.warn('[RateLimit] RATELIMIT_API_KEY nicht gesetzt');
      return failOpen ? next() : res.status(503).json({ error: 'Rate limit service not configured' });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        \`\${RATELIMIT_URL}/check?endpoint=\${encodeURIComponent(req.path)}&method=\${req.method}\`,
        {
          headers: {
            'X-API-Key': apiKey,
            'CF-Connecting-IP': req.ip || req.headers['x-forwarded-for'] || '',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timer);

      const data = await response.json();

      // Standard Rate-Limit-Header setzen
      res.setHeader('X-RateLimit-Limit',     100);
      res.setHeader('X-RateLimit-Remaining', data.remaining ?? 0);
      res.setHeader('X-RateLimit-Reset',     data.resetAt ?? 0);

      if (!data.allowed) {
        const retryAfter = Math.max(0, (data.resetAt ?? 0) - Math.floor(Date.now() / 1000));
        res.setHeader('Retry-After', retryAfter);
        return res.status(429).json({
          error: 'Rate limit exceeded',
          message: data.reason ?? 'Too many requests',
          retryAfter,
        });
      }

      next();
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        console.warn('[RateLimit] Timeout nach', timeout, 'ms');
      } else {
        console.error('[RateLimit] Fehler:', err.message);
      }
      // Fail-open: Bei Fehler Request durchlassen
      if (failOpen) return next();
      res.status(503).json({ error: 'Rate limit service unavailable' });
    }
  };
}

module.exports = { createRateLimitMiddleware };`} />
      </Step>

      <Step n={3} title="Middleware global einbinden">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Binde die Middleware in <code className="font-mono text-blue-300">server.js</code> ein:
        </p>
        <CodeBlock lang="javascript" code={`// server.js
require('dotenv').config();
const express = require('express');
const { createRateLimitMiddleware } = require('./middleware/rateLimit');

const app = express();
app.use(express.json());

// ── Global auf alle /api/ Routen anwenden ──────────────────────────
const rateLimit = createRateLimitMiddleware({ timeout: 3000, failOpen: true });
app.use('/api/', rateLimit);

// Deine Routen
app.get('/api/users', (req, res) => {
  res.json({ users: [{ id: 1, name: 'Max' }] });
});

app.post('/api/data', (req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server läuft auf Port', process.env.PORT || 3000);
});`} />
      </Step>

      <Step n={4} title="Endpoint-spezifische Limits (optional)">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Für teure Endpunkte (Login, Registrierung, Zahlungen) kannst du strengere Limits
          über separate API Keys konfigurieren und selektiv anwenden:
        </p>
        <CodeBlock lang="javascript" code={`// Zwei separate Middlewares — jeweils mit eigenem API Key konfiguriert
const standardLimit = createRateLimitMiddleware({ timeout: 3000 });
const strictLimit   = createRateLimitMiddleware({ timeout: 3000 });

// Standard: auf öffentliche Read-Routen
app.get('/api/posts', standardLimit, (req, res) => { /* ... */ });

// Streng: Login / sensitive Operationen
app.post('/auth/login',    strictLimit, (req, res) => { /* ... */ });
app.post('/auth/register', strictLimit, (req, res) => { /* ... */ });
app.post('/api/payment',   strictLimit, (req, res) => { /* ... */ });`} />
        <InfoBox icon="💡" color="blue">
          Erstelle im RateLimit-Dashboard mehrere API Keys mit unterschiedlichen Konfigurationen —
          z.B. <strong className="text-white">Key A: 1000 req/h</strong> für allgemeine Routen und{' '}
          <strong className="text-white">Key B: 10 req/min</strong> für Login/Register.
        </InfoBox>
      </Step>

      <Step n={5} title="Testen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Server starten und testen:
        </p>
        <CodeBlock lang="bash" code={`node server.js
# Server läuft auf Port 3000

# Normaler Request
curl http://localhost:3000/api/users
# → { "users": [...] }
# → Header: X-RateLimit-Remaining: 99

# Rate-Limit-Overflow simulieren (z.B. 200 schnelle Requests)
for i in {1..105}; do
  curl -s http://localhost:3000/api/users | jq .error
done
# → Irgendwann: "Rate limit exceeded"`} />
      </Step>

      {/* Vollständiges Beispiel */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Next.js API Route (App Router)
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Für Next.js 13+ App Router kannst du die Logik direkt in einer Route Handler Funktion nutzen:
      </p>
      <CodeBlock lang="javascript" code={`// app/api/users/route.js  (Next.js App Router)
import { NextResponse } from 'next/server';

const RATELIMIT_URL = 'https://ratelimit-api.pages.dev';

async function checkRateLimit(path, method, clientIp) {
  try {
    const res = await fetch(
      \`\${RATELIMIT_URL}/check?endpoint=\${encodeURIComponent(path)}&method=\${method}\`,
      {
        headers: {
          'X-API-Key': process.env.RATELIMIT_API_KEY,
          'CF-Connecting-IP': clientIp ?? '',
        },
        next: { revalidate: 0 }, // kein Caching!
      }
    );
    return res.json();
  } catch {
    return { allowed: true }; // Fail-open
  }
}

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rl = await checkRateLimit('/api/users', 'GET', ip);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rl.resetAt),
          'Retry-After': String(rl.resetAt - Math.floor(Date.now() / 1000)),
        },
      }
    );
  }

  return NextResponse.json({ users: [] }, {
    headers: { 'X-RateLimit-Remaining': String(rl.remaining) },
  });
}`} />

      {/* Fehlerbehandlung */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Best Practices
      </h2>
      <div className="space-y-3">
        {[
          {
            icon: '🛡️',
            title: 'Fail-open Pattern',
            desc: 'Bei Netzwerkfehlern zum RateLimit-Service den Request durchlassen (failOpen: true). So blockiert ein Ausfall des Drittservices nicht deine eigene API.',
          },
          {
            icon: '⏱️',
            title: 'Timeout setzen',
            desc: 'Immer einen Timeout (2–5 s) für den /check-Request setzen. Cloudflare Edge ist schnell (<1 ms), aber Netzwerkproblemen kannst du trotzdem begegnen.',
          },
          {
            icon: '🔑',
            title: 'API Key als Env-Variable',
            desc: 'Niemals den Key hardcoden. Nutze process.env.RATELIMIT_API_KEY und .env-Dateien die du aus dem Repository ausschließt (.gitignore).',
          },
          {
            icon: '📊',
            title: 'Header weiterleiten',
            desc: 'Setze X-RateLimit-Remaining und X-RateLimit-Reset in deinen Responses. Clients (z.B. SDKs) erwarten diese Header und können sich darauf einstellen.',
          },
        ].map((item, i) => (
          <div key={i} className="card flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Next */}
      <div className="card bg-violet-500/5 border-violet-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/ratelimit-blacklist" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-red-400">→</span> IP-Blacklisting & Abuse-Prevention
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
