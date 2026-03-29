import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Copy, Check, ArrowRight, CheckCircle } from 'lucide-react';

const CodeBlock = ({ code, lang = 'js' }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative">
      <pre className="bg-dark-900 border border-white/5 rounded-xl p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
      <button onClick={copy} className="absolute top-3 right-3 p-1.5 glass-effect rounded-lg text-gray-400 hover:text-white transition-colors">
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

const Quickstart = () => {
  const [activeProduct, setActiveProduct] = useState('framespell');

  const examples = {
    framespell: {
      name: 'FrameSpell API',
      color: 'text-blue-400',
      steps: [
        {
          title: 'API Key erstellen',
          desc: 'Registriere dich kostenlos und erstelle im Dashboard einen API Key für FrameSpell.',
          code: `// Kein Code nötig — API Key im Dashboard erstellen
// https://frame-sphere.vercel.app/dashboard`,
        },
        {
          title: 'Ersten Request senden',
          desc: 'Sende einen POST Request mit dem zu prüfenden Text.',
          code: `const response = await fetch('https://api.framespell.dev/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'fs_dein_api_key'
  },
  body: JSON.stringify({
    text: 'Helo Welt, das ist ein Tset.',
    language: 'de'  // de, en, es, fr
  })
});

const data = await response.json();
console.log(data.corrected);
// → "Hallo Welt, das ist ein Test."`,
        },
        {
          title: 'Response verarbeiten',
          desc: 'Das Response-Objekt enthält den korrigierten Text und alle gefundenen Fehler.',
          code: `// Vollständiges Response-Objekt:
{
  "corrected": "Hallo Welt, das ist ein Test.",
  "original": "Helo Welt, das ist ein Tset.",
  "errors": [
    {
      "word": "Helo",
      "correction": "Hallo",
      "position": 0,
      "type": "spelling"
    },
    {
      "word": "Tset",
      "correction": "Test",
      "position": 26,
      "type": "spelling"
    }
  ],
  "language": "de",
  "processing_time_ms": 183
}`,
        },
      ],
    },
    ratelimit: {
      name: 'RateLimit API',
      color: 'text-green-400',
      steps: [
        {
          title: 'API Key erstellen',
          desc: 'Erstelle im FrameSphere Dashboard einen API Key für die RateLimit API.',
          code: `// API Key im Dashboard erstellen
// https://frame-sphere.vercel.app/dashboard`,
        },
        {
          title: 'Rate-Limit prüfen',
          desc: 'Prüfe vor jeder API-Anfrage, ob der Client noch im Limit ist.',
          code: `const response = await fetch('https://ratelimit-api.pages.dev/api/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'rl_dein_api_key'
  },
  body: JSON.stringify({
    client_id: 'user_123',  // IP oder User-ID
    endpoint: '/api/my-endpoint',
    limit: 10,       // Max Anfragen
    window: 60       // Zeitfenster in Sekunden
  })
});

const { allowed, remaining, reset_at } = await response.json();

if (!allowed) {
  return res.status(429).json({ error: 'Rate limit exceeded' });
}`,
        },
        {
          title: 'In Middleware einbauen',
          desc: 'Integriere die Rate-Limit-Prüfung als Middleware in deine Express/Fastify-App.',
          code: `// Express.js Middleware Beispiel
async function rateLimitMiddleware(req, res, next) {
  const clientId = req.ip || req.headers['x-forwarded-for'];

  const { allowed, remaining } = await checkRateLimit(clientId);

  res.setHeader('X-RateLimit-Remaining', remaining);

  if (!allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Try again later.'
    });
  }

  next();
}

app.use('/api/', rateLimitMiddleware);`,
        },
      ],
    },
  };

  const active = examples[activeProduct];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Developer Guide</span>
          <h1 className="text-5xl font-bold text-white mb-4">Quickstart</h1>
          <p className="text-xl text-gray-400">In unter 10 Minuten zur ersten API-Integration.</p>
        </div>

        {/* Produkt Auswahl */}
        <div className="flex gap-3 justify-center mb-10">
          {Object.entries(examples).map(([key, val]) => (
            <button key={key} onClick={() => setActiveProduct(key)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeProduct === key ? 'btn-primary' : 'btn-secondary'}`}>
              {val.name}
            </button>
          ))}
        </div>

        {/* Prerequisites */}
        <div className="card mb-8 bg-dark-800/50">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />Voraussetzungen
          </h2>
          <div className="flex flex-wrap gap-3">
            {['FrameSphere Account (kostenlos)', 'API Key aus dem Dashboard', 'JavaScript / Node.js Grundkenntnisse'].map((p, i) => (
              <span key={i} className="text-xs px-3 py-1.5 glass-effect rounded-lg text-gray-300">{p}</span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {active.steps.map((step, i) => (
            <div key={i}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-400 mb-4 ml-11">{step.desc}</p>
              <CodeBlock code={step.code} />
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <h2 className="text-xl font-bold text-white mb-4">Nächste Schritte</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'API Docs', desc: 'Alle Endpunkte & Parameter', path: '/developers/docs' },
              { title: 'SDKs', desc: 'Fertige Libraries für deine Sprache', path: '/developers/sdks' },
              { title: 'Tutorials', desc: 'Vollständige Anwendungsbeispiele', path: '/developers/tutorials' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors group">
                <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">{item.title}</h3>
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
