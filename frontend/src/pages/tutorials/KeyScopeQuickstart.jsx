import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ExternalLink } from 'lucide-react';

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
        style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function InfoBox({ icon = '💡', children }) {
  return (
    <div className="card bg-blue-500/5 border-blue-500/15 text-sm text-gray-400 my-4">
      {icon} {children}
    </div>
  );
}

const BASE = 'https://keyscope-worker.karol-paschek.workers.dev';

export default function KeyScopeQuickstart() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest">KeyScope</div>
            <h1 className="text-3xl font-bold text-white">Quickstart — 5 Minuten</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          KeyScope extrahiert Keywords, Longtail-Phrasen und Meta-Descriptions aus beliebigen Texten —
          via Web-Oberfläche oder REST API. Dieser Guide zeigt beide Wege.
        </p>
        <div className="flex gap-3 mt-4">
          <a href="https://keyscope.pages.dev" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> keyscope.pages.dev
          </a>
          <span className="text-gray-700">·</span>
          <Link to="/developers/tutorials/keyscope-api" className="text-xs text-gray-400 hover:text-white transition-colors">
            Vollständige API-Referenz →
          </Link>
        </div>
      </div>

      {/* ── Option A: UI ── */}
      <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-white/[0.08]">
        Option A — Web-Oberfläche
      </h2>

      <Step n={1} title="Account erstellen">
        <p className="text-gray-400 text-sm leading-relaxed">
          Gehe zu{' '}
          <a href="https://keyscope.pages.dev/register" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:underline">keyscope.pages.dev/register</a>{' '}
          und registriere dich mit deiner E-Mail. Der Free-Plan erlaubt{' '}
          <strong className="text-white">20 Analysen pro Tag</strong> und ist dauerhaft kostenlos.
        </p>
      </Step>

      <Step n={2} title="Analyzer öffnen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Klicke im Sidebar auf <strong className="text-white">Analyzer</strong>. Füge deinen Text
          (min. 50 Zeichen) in das Content-Feld ein. Optional: Seitentitel angeben —
          Wörter im Titel erhalten einen <strong className="text-white">+6-Punkt Bonus</strong> im Scoring.
        </p>
        <InfoBox>
          💡 <strong className="text-white">Tipp:</strong> Das Titelfeld simuliert den HTML{' '}
          <code className="font-mono text-blue-300">&lt;title&gt;</code>-Tag deiner Seite.
          Je mehr Übereinstimmung zwischen Titel und Content, desto präzisere Keywords.
        </InfoBox>
      </Step>

      <Step n={3} title="Sprache & Profil wählen">
        <p className="text-gray-400 text-sm leading-relaxed">
          KeyScope unterstützt <strong className="text-white">DE, EN, FR, ES, IT</strong> mit
          nativen Stopword-Listen. Wähle ein Analyse-Profil aus dem Dropdown — das Standard-Profil
          funktioniert sofort. Eigene trainierte Profile liefern domänenspezifisch bessere Ergebnisse
          (→{' '}
          <Link to="/developers/tutorials/keyscope-profiles" className="text-blue-400 hover:underline">
            Profil-Training Guide
          </Link>).
        </p>
      </Step>

      <Step n={4} title="Analysieren & Ergebnisse nutzen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Klicke <strong className="text-white">Analysieren</strong>. Das Ergebnis enthält:
        </p>
        <ul className="space-y-1.5 text-sm text-gray-400 mb-3">
          {[
            ['Keywords', 'Gerankte Einzelwörter nach TF-IDF-Score', '#60a5fa'],
            ['Longtail-Phrasen', 'Bigrams & Trigrams aus den Top-Tokens', '#a78bfa'],
            ['Meta Description', 'Automatisch generierte, keyword-reiche Beschreibung', '#f472b6'],
          ].map(([title, desc, color]) => (
            <li key={title} className="flex items-start gap-2">
              <span style={{ color }} className="mt-0.5">→</span>
              <span><strong className="text-white">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs">Klicke auf einen Keyword-Chip um ihn in die Zwischenablage zu kopieren.</p>
      </Step>

      {/* ── Option B: API ── */}
      <h2 className="text-xl font-semibold text-white mb-6 mt-10 pb-2 border-b border-white/[0.08]">
        Option B — REST API
      </h2>

      <Step n={1} title="API Key generieren">
        <p className="text-gray-400 text-sm leading-relaxed">
          Gehe zu{' '}
          <a href="https://keyscope.pages.dev/app/settings" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:underline">Settings → API Keys</a>{' '}
          und klicke <em>Generate API Key</em>. Kopiere ihn sofort — er wird nur einmal angezeigt.
        </p>
        <InfoBox>
          🔐 Speichere den Key als Umgebungsvariable (<code className="font-mono text-blue-300">KEYSCOPE_API_KEY</code>),
          nie direkt im Quellcode.
        </InfoBox>
      </Step>

      <Step n={2} title="Erste Anfrage senden">
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Die besten SEO-Strategien für 2025",
    "content": "Suchmaschinenoptimierung ist wichtiger denn je. Gute Rankings erfordern...",
    "lang": "de",
    "keyword_count": 10,
    "longtail_count": 8
  }'`} />
        <InfoBox>
          💡 Enthält dein Content einfache Anführungszeichen, nutze statt <code className="font-mono text-blue-300">-d '{`{...}`}'</code>
          besser <code className="font-mono text-blue-300">-d @payload.json</code> um Shell-Quoting-Fehler zu vermeiden.
        </InfoBox>
      </Step>

      <Step n={3} title="Response verarbeiten">
        <CodeBlock lang="json" code={`{
  "ok": true,
  "mode": "algorithmic",
  "keywords": [
    "suchmaschinenoptimierung",
    "ranking",
    "strategie",
    "optimierung",
    "seo"
  ],
  "longtailKeywords": [
    "seo strategie 2025",
    "gute rankings seo",
    "suchmaschinen optimierung tipps"
  ],
  "metaDescription": "Suchmaschinenoptimierung ist wichtiger denn je. Gute Rankings erfordern...",
  "lang": "de",
  "profile_id": null
}`} />
      </Step>

      <Step n={4} title="In JavaScript integrieren">
        <CodeBlock lang="javascript" code={`async function analyzeKeywords(title, content, lang = 'de') {
  const response = await fetch(
    'https://keyscope-worker.karol-paschek.workers.dev/analyze',
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.KEYSCOPE_API_KEY}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        lang,
        keyword_count: 15,
        longtail_count: 10,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'KeyScope API error');
  }

  const { keywords, longtailKeywords, metaDescription } = await response.json();
  return { keywords, longtailKeywords, metaDescription };
}

// Verwendung
const result = await analyzeKeywords(
  'SEO Guide 2025',
  'Suchmaschinenoptimierung ist ein wichtiger Bestandteil...'
);
console.log(result.keywords);       // ['suchmaschinenoptimierung', ...]
console.log(result.metaDescription); // 'Suchmaschinenoptimierung ist...'`} />
      </Step>

      {/* Rate Limits */}
      <div className="card bg-amber-500/5 border-amber-500/15 mb-8">
        <h3 className="font-semibold text-white mb-3">⚡ Rate Limits</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 pr-6 text-gray-400 font-medium text-xs uppercase">Plan</th>
                <th className="text-left py-2 pr-6 text-gray-400 font-medium text-xs uppercase">Analysen/Tag</th>
                <th className="text-left py-2 text-gray-400 font-medium text-xs uppercase">AI-Modus</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.04]">
                <td className="py-2 pr-6 text-gray-300">Free</td>
                <td className="py-2 pr-6 text-green-400 font-mono">20</td>
                <td className="py-2 text-gray-500">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 text-gray-300">Pro</td>
                <td className="py-2 pr-6 text-blue-400 font-mono">500</td>
                <td className="py-2 text-purple-400">✓ inklusive</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Bei überschrittenem Limit gibt die API <code className="font-mono text-red-400">429 Too Many Requests</code> zurück.
          Überprüfe dein Kontingent unter{' '}
          <a href="https://keyscope.pages.dev/app/settings" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:underline">Settings → Usage</a>.
        </p>
      </div>

      {/* Next Steps */}
      <div className="card bg-violet-500/5 border-violet-500/15">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          {[
            ['/developers/tutorials/keyscope-api', '📖', 'Vollständige API-Referenz — alle Endpunkte, Parameter & Fehlercodes'],
            ['/developers/tutorials/keyscope-profiles', '🎯', 'Profile trainieren — TF-IDF auf deinen eigenen Texten lernen'],
          ].map(([path, icon, label]) => (
            <Link key={path} to={path} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
