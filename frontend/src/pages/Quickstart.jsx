import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Copy, Check, ArrowRight, CheckCircle } from 'lucide-react';

const CodeBlock = ({ code, lang = 'js' }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700 rounded-t-lg border border-white/5 border-b-0">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button onClick={copy} className="p-1.5 rounded text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="bg-dark-900 border border-white/5 rounded-b-lg p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const PRODUCTS = {
  framespell: {
    name: 'FrameSpell API',
    badge: 'text-blue-400',
    badgeBg: 'bg-blue-500/15 border-blue-500/25',
    steps: [
      {
        title: 'API Key erstellen',
        desc: 'Registriere dich kostenlos und erstelle im Dashboard einen API Key.',
        code: `// API Key im Dashboard erstellen:\n// https://frame-sphere.vercel.app/dashboard\n// → Produkte → FrameSpell → API Key generieren`,
      },
      {
        title: 'Ersten Request senden',
        desc: 'Sende einen POST Request mit dem zu prüfenden Text.',
        code: `const response = await fetch(
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'fs_dein_api_key'
    },
    body: JSON.stringify({
      text: 'Helo Welt, das ist ein Tset.',
      language: 'de'  // de | en | es | fr
    })
  }
);

const data = await response.json();
console.log(data.data.corrected);
// → "Hallo Welt, das ist ein Test."`,
      },
      {
        title: 'Response verarbeiten',
        desc: 'Das Response-Objekt enthält den korrigierten Text und alle gefundenen Fehler.',
        code: `{
  "success": true,
  "data": {
    "corrected": "Hallo Welt, das ist ein Test.",
    "original":  "Helo Welt, das ist ein Tset.",
    "processing_time": 143.7,
    "tokens_used": 8
  }
}`,
      },
    ],
  },
  ratelimit: {
    name: 'RateLimit API',
    badge: 'text-green-400',
    badgeBg: 'bg-green-500/15 border-green-500/25',
    steps: [
      {
        title: 'API Key & Konfiguration',
        desc: 'Erstelle im Dashboard einen API Key und richte eine Rate-Limit-Konfiguration ein.',
        code: `// 1. Einloggen unter https://ratelimit-api.pages.dev
// 2. API Key erstellen
// 3. Konfiguration anlegen (max_requests, window_seconds)`,
      },
      {
        title: 'Rate-Limit prüfen',
        desc: 'Sende bei jeder eingehenden Anfrage einen Check-Request.',
        code: `// Cloudflare Worker / Node.js
const resp = await fetch(
  'https://ratelimit-api.karol-paschek.workers.dev/check?api_key=DEIN_API_KEY&identifier=USER_IP',
  { method: 'GET' }
);

const { allowed, remaining, reset_at } = await resp.json();

if (!allowed) {
  return new Response('Too Many Requests', { status: 429 });
}`,
      },
      {
        title: 'Als Express-Middleware einbauen',
        desc: 'Wiederverwendbare Middleware für alle deine API-Endpunkte.',
        code: `// middleware/rateLimit.js
export async function rateLimitMiddleware(req, res, next) {
  const identifier = req.ip || req.headers['x-forwarded-for'];

  const resp = await fetch(
    \`https://ratelimit-api.karol-paschek.workers.dev/check\` +
    \`?api_key=\${process.env.RATELIMIT_API_KEY}&identifier=\${identifier}\`
  );
  const { allowed, remaining } = await resp.json();

  res.setHeader('X-RateLimit-Remaining', remaining);
  if (!allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  next();
}

// In app.js:
app.use('/api/', rateLimitMiddleware);`,
      },
    ],
  },
  keyscope: {
    name: 'KeyScope',
    badge: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/15 border-yellow-500/25',
    steps: [
      {
        title: 'Account & API Key',
        desc: 'Registriere dich bei KeyScope und generiere deinen API Key.',
        code: `// 1. Account unter https://keyscope.pages.dev/register
// 2. Settings → API Keys → Generate API Key
// 3. Key als Umgebungsvariable speichern:
//    KEYSCOPE_API_KEY=ks_live_xxxxxxxxxxxxx`,
      },
      {
        title: 'Keywords extrahieren',
        desc: 'Sende Text an den /analyze Endpunkt und erhalte Keywords, Longtails und eine Meta Description.',
        code: `const response = await fetch(
  'https://keyscope-worker.karol-paschek.workers.dev/analyze',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.KEYSCOPE_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title:   'SEO-Strategien für 2025',
      content: 'Suchmaschinenoptimierung ist wichtiger denn je...',
      lang:    'de',         // de | en | fr | es | it
      keyword_count:  10,
      longtail_count: 8
    })
  }
);

const data = await response.json();`,
      },
      {
        title: 'Response verarbeiten',
        desc: 'Keywords, Longtail-Phrasen und die generierte Meta Description direkt nutzen.',
        code: `{
  "ok": true,
  "mode": "algorithmic",
  "keywords": [
    "suchmaschinenoptimierung",
    "seo",
    "ranking",
    "strategie"
  ],
  "longtailKeywords": [
    "seo strategie 2025",
    "suchmaschinen ranking verbessern"
  ],
  "metaDescription": "Suchmaschinenoptimierung ist wichtiger denn je...",
  "lang": "de"
}`,
      },
    ],
  },
  sitecontrol: {
    name: 'SiteControl',
    badge: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/15 border-indigo-500/25',
    steps: [
      {
        title: 'Account erstellen & Website hinzufügen',
        desc: 'Melde dich an und füge deine erste Website hinzu. Free Plan: bis zu 3 Websites.',
        code: `// 1. Registrieren: https://app.sitecontrol.app/signup
// 2. Im Dashboard: Websites → Neue Website
// 3. Name und URL eingeben, Farbe wählen

// Oder via API (nach Login mit Supabase Auth):
const { data } = await supabase.auth.getSession();
const token = data.session.access_token;

const res = await fetch('https://site-control-nine.vercel.app/api/sites', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Mein Blog',
    url:  'https://meinblog.de'
  })
});`,
      },
      {
        title: 'Analytics-Snippet einbinden',
        desc: 'Binde das Tracking-Script in deine Website ein um Pageviews zu erfassen.',
        code: `<!-- In <head> deiner Website einfügen -->
<script>
  (function(w, d) {
    var s = d.createElement('script');
    s.src   = 'https://site-control-nine.vercel.app/api/public/tracker.js';
    s.async = true;
    s.dataset.siteId = 'DEINE_SITE_ID';  // im Dashboard → Website → Einstellungen
    d.head.appendChild(s);
  })(window, document);
</script>

<!-- Kein Cookie, DSGVO-konform.
     Erfasst: Pfad, Referrer, Gerät, Land. -->`,
      },
      {
        title: 'Todos und Blog verwalten',
        desc: 'Todos erstellen im Free Plan, Blog und Changelog mit Pro.',
        code: `// Todo erstellen (Free):
await fetch('https://site-control-nine.vercel.app/api/todos', {
  method: 'POST',
  headers: { 'Authorization': \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    site_id: 'SITE_UUID',
    title:    'SEO-Audit durchführen',
    priority: 2,
    important: true
  })
});

// Blog-Post erstellen (Pro):
await fetch('https://site-control-nine.vercel.app/api/blog', {
  method: 'POST',
  headers: { 'Authorization': \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    site_id: 'SITE_UUID',
    title:   '10 SEO-Tipps für 2025',
    content: '<p>...</p>',
    lang:    'de',
    status:  'published'
  })
});`,
      },
    ],
  },
};

const Quickstart = () => {
  const [activeProduct, setActiveProduct] = useState('framespell');
  const active = PRODUCTS[activeProduct];

  const productOrder = ['framespell', 'ratelimit', 'keyscope', 'sitecontrol'];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Developer Guide</span>
          <h1 className="text-5xl font-bold text-white mb-4">Quickstart</h1>
          <p className="text-xl text-gray-400">In unter 10 Minuten zur ersten API-Integration — für alle 4 Produkte.</p>
        </div>

        {/* Product tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {productOrder.map(key => {
            const p = PRODUCTS[key];
            const isActive = activeProduct === key;
            return (
              <button key={key} onClick={() => setActiveProduct(key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
                  isActive
                    ? `${p.badgeBg} ${p.badge}`
                    : 'btn-secondary'
                }`}>
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Active product badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${active.badgeBg} ${active.badge}`}>
            {active.name}
          </span>
          <span className="text-gray-500 text-sm">Quickstart Guide</span>
        </div>

        {/* Prerequisites */}
        <div className="card mb-8 bg-dark-800/50">
          <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" /> Voraussetzungen
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'FrameSphere Account (kostenlos)',
              activeProduct === 'sitecontrol' ? 'Supabase Auth Token' : 'API Key aus dem Dashboard',
              'JavaScript / Node.js Kenntnisse',
            ].map((p, i) => (
              <span key={i} className="text-xs px-3 py-1.5 glass-effect rounded-lg text-gray-300 border border-white/5">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {active.steps.map((step, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-400 mb-4 ml-11 text-sm leading-relaxed">{step.desc}</p>
              <CodeBlock code={step.code} lang={
                step.code.startsWith('{') || step.code.startsWith('[') ? 'json' :
                step.code.startsWith('<!--') ? 'html' :
                step.code.includes('await fetch') ? 'javascript' :
                'javascript'
              } />
            </div>
          ))}
        </div>

        {/* Quick links per product */}
        <div className="card mb-8 bg-dark-800/40">
          <h3 className="font-semibold text-white mb-4 text-sm">
            Weiter mit <span className={active.badge}>{active.name}</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {activeProduct === 'framespell' && <>
              <Link to="/developers/tutorials/framespell-in-react" className="btn-secondary text-xs px-3 py-1.5">React Integration →</Link>
              <Link to="/developers/tutorials/framespell-batch" className="btn-secondary text-xs px-3 py-1.5">Batch-Verarbeitung →</Link>
            </>}
            {activeProduct === 'ratelimit' && <>
              <Link to="/products/ratelimit-api" className="btn-secondary text-xs px-3 py-1.5">Produkt-Seite →</Link>
              <a href="https://ratelimit-api.pages.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs px-3 py-1.5">Dashboard öffnen →</a>
            </>}
            {activeProduct === 'keyscope' && <>
              <Link to="/developers/tutorials/keyscope-api" className="btn-secondary text-xs px-3 py-1.5">API-Referenz →</Link>
              <Link to="/developers/tutorials/keyscope-profiles" className="btn-secondary text-xs px-3 py-1.5">Profile trainieren →</Link>
            </>}
            {activeProduct === 'sitecontrol' && <>
              <Link to="/developers/tutorials/sitecontrol-tracking" className="btn-secondary text-xs px-3 py-1.5">Analytics einbinden →</Link>
              <Link to="/developers/tutorials/sitecontrol-api" className="btn-secondary text-xs px-3 py-1.5">API-Referenz →</Link>
            </>}
          </div>
        </div>

        {/* Next Steps */}
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <h2 className="text-xl font-bold text-white mb-4">Mehr Ressourcen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'API Docs',   desc: 'Alle Endpunkte & Parameter',          path: '/developers/docs' },
              { title: 'Tutorials',  desc: 'Vollständige Anwendungsbeispiele',     path: '/developers/tutorials' },
              { title: 'API Status', desc: 'Live-Status aller FrameSphere-Dienste',path: '/developers/status' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors group border border-white/5">
                <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  {item.title} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quickstart;
