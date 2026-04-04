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
          className="text-[11px] text-gray-500 hover:text-white px-2 py-0.5 rounded border border-white/[0.08]"
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

export default function KeyScopeProfiles() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-2">KeyScope</div>
        <h1 className="text-3xl font-bold text-white mb-3">Profile trainieren</h1>
        <p className="text-gray-400 leading-relaxed">
          Trainierte Profile sind KeyScopes stärkstes Feature. Indem du das TF-IDF-Modell mit
          deinen eigenen Texten aus einer bestimmten Domäne trainierst, lernt KeyScope welche Wörter
          in deinem Kontext besonders relevant sind — und liefert dramatisch präzisere Keywords.
        </p>
      </div>

      {/* Why profiles? */}
      <div className="card bg-violet-500/5 border-violet-500/15 mb-8">
        <h3 className="font-semibold text-white mb-3">🎯 Warum Profile?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <div className="text-white font-medium mb-1">Ohne Profil (Standard)</div>
            <p className="text-xs leading-relaxed">
              Generic TF-IDF — alle Wörter gleich gewichtet. Gute Basisresultate,
              aber branchenspezifische Fachbegriffe werden nicht bevorzugt.
            </p>
          </div>
          <div>
            <div className="text-white font-medium mb-1">Mit trainiertem Profil</div>
            <p className="text-xs leading-relaxed">
              Wörter aus deinem Corpus erhalten Multiplikatoren. Ein SEO-Blog-Profil
              hebt "Ranking", "SERP", "Crawling" stark hervor — weil sie in deinen
              Trainings-Texten häufig und charakteristisch sind.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-white/[0.08]">
        Schritt-für-Schritt: Profil erstellen und trainieren
      </h2>

      <Step n={1} title="Profil erstellen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Erstelle zunächst ein leeres Profil mit einem sprechenden Namen:
        </p>
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/profiles \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "SEO Blog Deutsch",
    "description": "Trainiert auf ca. 50 Blog-Posts aus dem SEO-Bereich",
    "language": "de"
  }'`} />
        <CodeBlock lang="json" code={`{
  "ok": true,
  "profile": {
    "id": "prof_abc123",
    "name": "SEO Blog Deutsch",
    "language": "de"
  }
}`} />
        <p className="text-gray-500 text-xs">Notiere die <code className="font-mono text-blue-300">id</code> — du brauchst sie für die nächsten Schritte.</p>
      </Step>

      <Step n={2} title="Trainings-Dokumente vorbereiten">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Sammle 10–100 repräsentative Texte aus deiner Domäne. Je mehr und vielfältiger, desto besser.
          Ideal sind Artikel, Blog-Posts oder Produkttexte, die die Themen repräsentieren, die du später analysieren willst.
        </p>
        <div className="card bg-amber-500/5 border-amber-500/15 text-sm text-gray-400">
          📋 <strong className="text-white">Limits:</strong> Free-Plan max. 20 Dokumente pro Training, Pro max. 200.
          Jedes Dokument kann bis zu 5.000 Zeichen haben.
        </div>
        <CodeBlock lang="javascript" code={`// Beispiel: Blog-Posts aus einem CMS holen
const documents = blogPosts.map(post => ({
  title: post.title,
  content: post.content,   // HTML oder Plaintext — beides funktioniert
  lang: 'de',
}));

// Oder direkt als Array:
const documents = [
  {
    title: "On-Page SEO Grundlagen",
    content: "Meta-Tags, Title-Optimierung und interne Verlinkung sind...",
    lang: "de",
  },
  {
    title: "Keyword-Recherche für Anfänger",
    content: "Die Keyword-Recherche ist der erste Schritt jeder SEO-Strategie...",
    lang: "de",
  },
  // ... weitere Dokumente
];`} />
      </Step>

      <Step n={3} title="Profil trainieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Sende deine Dokumente an den <code className="font-mono text-blue-300">/weights/train</code> Endpunkt.
          Das Training dauert je nach Korpusgröße unter einer Sekunde bis wenige Sekunden.
        </p>
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/weights/train \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "profile_id": "prof_abc123",
    "documents": [
      { "title": "On-Page SEO Grundlagen", "content": "Meta-Tags...", "lang": "de" },
      { "title": "Keyword-Recherche für Anfänger", "content": "Die Keyword-Recherche...", "lang": "de" }
    ]
  }'`} />
        <CodeBlock lang="json" code={`{
  "ok": true,
  "trained": 2,
  "uniqueWords": 1243,
  "topWords": [
    { "word": "suchmaschinenoptimierung", "score": 1.0,  "df": 2, "cf": 8 },
    { "word": "keyword",                  "score": 0.92, "df": 2, "cf": 12 },
    { "word": "ranking",                  "score": 0.87, "df": 1, "cf": 4 },
    { "word": "meta",                     "score": 0.76, "df": 2, "cf": 6 }
  ]
}`} />
        <div className="text-xs text-gray-500 mt-2">
          <code className="font-mono text-blue-300">df</code> = Dokument-Häufigkeit (in wie vielen Docs),{' '}
          <code className="font-mono text-blue-300">cf</code> = Korpus-Häufigkeit (Gesamtnennungen)
        </div>
      </Step>

      <Step n={4} title="Profil bei der Analyse verwenden">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Gib die <code className="font-mono text-blue-300">profile_id</code> beim Analyze-Aufruf mit.
          Das trainierte Profil wird automatisch angewendet.
        </p>
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Backlinks aufbauen 2025",
    "content": "Linkbuilding ist ein wichtiger Bestandteil des Off-Page-SEO...",
    "lang": "de",
    "profile_id": "prof_abc123"
  }'`} />
        <p className="text-gray-400 text-sm">
          Keywords, die im trainierten Profil hoch gewichtet sind (z.B. "seo", "ranking", "linkbuilding"),
          erhalten in der Analyse einen <strong className="text-white">Score-Multiplikator von bis zu 4x</strong> gegenüber
          nicht trainierten Wörtern.
        </p>
      </Step>

      {/* System Profiles */}
      <div className="card bg-emerald-500/5 border-emerald-500/15 mb-8">
        <h3 className="font-semibold text-white mb-3">🌐 System-Profile</h3>
        <p className="text-sm text-gray-400 mb-3">
          KeyScope enthält vortrainierte System-Profile für die häufigsten Anwendungsfälle —
          nutzbar ohne eigenes Training. Sie haben die Kennung <code className="font-mono text-blue-300">__system__</code>
          als User-ID und tauchen automatisch im Profil-Dropdown auf:
        </p>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            ['SEO & Content', 'Optimiert für Blog-Posts, Artikel, SEO-Texte'],
            ['E-Commerce', 'Produktbeschreibungen, Kategorieseiten'],
            ['Tech & Software', 'Dokumentationen, Release Notes, Tech-Blogs'],
            ['Nachrichten', 'News-Artikel, Pressemitteilungen'],
          ].map(([name, desc]) => (
            <div key={name} className="flex gap-2 text-sm">
              <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="text-white font-medium">{name}</span>
                <span className="text-gray-500"> — {desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ignore Lists */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Ignore-Listen: Unerwünschte Keywords ausschließen
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Manche Wörter aus deinen Texten sind technisch relevant (z.B. "GmbH", "Impressum", "Cookie"),
        sollen aber nicht als Keywords auftauchen. Die Ignore-Liste filtert sie heraus.
      </p>
      <CodeBlock lang="bash" code={`# Global ignorieren (alle Profile)
curl -X POST ${BASE}/ignore \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "words": ["gmbh", "impressum", "datenschutz", "cookies", "agb"] }'

# Nur für ein bestimmtes Profil
curl -X POST ${BASE}/ignore \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "words": ["januar", "februar", "2024"], "profile_id": "prof_abc123" }'`} />

      {/* Best Practices */}
      <div className="card mb-8">
        <h3 className="font-semibold text-white mb-4">💡 Best Practices</h3>
        <div className="space-y-3 text-sm text-gray-400">
          {[
            ['Qualität vor Quantität', '10 sehr gute, thematisch passende Texte schlagen 100 generische Artikel.'],
            ['Konsistente Sprache', 'Trainiere pro Profil mit einer Sprache. Gemischte Sprachen verwässern die Gewichte.'],
            ['Regelmäßig neu trainieren', 'Aktualisiere das Profil wenn du neue Inhalte hast — rufe /weights/train erneut auf.'],
            ['Ignore-Liste pflegen', 'Füge Marken-Namen, Boilerplate-Texte und Stopwords deiner Domäne zur Ignore-Liste hinzu.'],
            ['Profile thematisch trennen', 'Erstelle separate Profile für verschiedene Themen (z.B. "Tech-Blog", "Produktseiten").'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">→</span>
              <div><strong className="text-white">{title}:</strong> {desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next */}
      <div className="card bg-blue-500/5 border-blue-500/15">
        <h3 className="font-semibold text-white mb-2">Weiter</h3>
        <div className="space-y-1.5 text-sm">
          <Link to="/developers/tutorials/keyscope-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Vollständige API-Referenz mit allen Endpunkten
          </Link>
          <Link to="/developers/tutorials/keyscope-quickstart" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Zurück zum Quickstart
          </Link>
        </div>
      </div>
    </div>
  );
}
