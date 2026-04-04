import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorialPage } from '../../components/TutorialPage';

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
    <TutorialPage category="KeyScope" categoryColor="text-yellow-400">
      <div className="mb-8">
        <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-2">KeyScope</div>
        <h1 className="text-3xl font-bold text-white mb-3">Profile trainieren</h1>
        <p className="text-gray-400 leading-relaxed">
          Trainierte Profile sind KeyScopes stärkstes Feature. Indem du das TF-IDF-Modell mit
          deinen eigenen Texten aus einer bestimmten Domäne trainierst, lernt KeyScope welche Wörter
          in deinem Kontext besonders relevant sind — und liefert dramatisch präzisere Keywords.
        </p>
      </div>

      <div className="card bg-violet-500/5 border-violet-500/15 mb-8">
        <h3 className="font-semibold text-white mb-3">🎯 Warum Profile?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <div className="text-white font-medium mb-1">Ohne Profil (Standard)</div>
            <p className="text-xs leading-relaxed">Generic TF-IDF — alle Wörter gleich gewichtet. Gute Basisresultate, aber branchenspezifische Fachbegriffe werden nicht bevorzugt.</p>
          </div>
          <div>
            <div className="text-white font-medium mb-1">Mit trainiertem Profil</div>
            <p className="text-xs leading-relaxed">Wörter aus deinem Corpus erhalten Multiplikatoren. Ein SEO-Blog-Profil hebt "Ranking", "SERP", "Crawling" stark hervor.</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-white/[0.08]">Schritt-für-Schritt</h2>

      <Step n={1} title="Profil erstellen">
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/profiles \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name":"SEO Blog Deutsch","description":"Trainiert auf SEO-Posts","language":"de"}'`} />
        <CodeBlock lang="json" code={`{ "ok": true, "profile": { "id": "prof_abc123", "name": "SEO Blog Deutsch", "language": "de" } }`} />
        <p className="text-gray-500 text-xs">Notiere die <code className="font-mono text-blue-300">id</code>.</p>
      </Step>

      <Step n={2} title="Trainings-Dokumente vorbereiten">
        <div className="card bg-amber-500/5 border-amber-500/15 text-sm text-gray-400 mb-4">
          📋 <strong className="text-white">Limits:</strong> Free max. 20 Dokumente, Pro max. 200. Max. 5.000 Zeichen/Dokument.
        </div>
        <CodeBlock lang="javascript" code={`const documents = blogPosts.map(post => ({
  title: post.title,
  content: post.content,  // HTML oder Plaintext
  lang: 'de',
}));`} />
      </Step>

      <Step n={3} title="Profil trainieren">
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/weights/train \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"profile_id":"prof_abc123","documents":[{"title":"On-Page SEO","content":"Meta-Tags...","lang":"de"},{"title":"Keyword-Recherche","content":"Die Recherche...","lang":"de"}]}'`} />
        <CodeBlock lang="json" code={`{\n  "ok": true,\n  "trained": 2,\n  "uniqueWords": 1243,\n  "topWords": [\n    { "word": "suchmaschinenoptimierung", "score": 1.0 },\n    { "word": "keyword", "score": 0.92 }\n  ]\n}`} />
      </Step>

      <Step n={4} title="Profil bei der Analyse verwenden">
        <CodeBlock lang="bash" code={`curl -X POST ${BASE}/analyze \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"title":"Backlinks 2025","content":"Linkbuilding ist...","lang":"de","profile_id":"prof_abc123"}'`} />
        <p className="text-gray-400 text-sm mt-2">
          Keywords aus dem trainierten Profil erhalten einen <strong className="text-white">Multiplikator bis 4x</strong>.
        </p>
      </Step>

      <div className="card bg-emerald-500/5 border-emerald-500/15 mb-8">
        <h3 className="font-semibold text-white mb-3">🌐 System-Profile (vortrainiert)</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            ['SEO & Content', 'Blog-Posts, Artikel, SEO-Texte'],
            ['E-Commerce', 'Produktbeschreibungen, Kategorieseiten'],
            ['Tech & Software', 'Dokumentationen, Release Notes'],
            ['Nachrichten', 'News-Artikel, Pressemitteilungen'],
          ].map(([name, desc]) => (
            <div key={name} className="flex gap-2 text-sm">
              <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <div><span className="text-white font-medium">{name}</span><span className="text-gray-500"> — {desc}</span></div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">Ignore-Listen</h2>
      <CodeBlock lang="bash" code={`# Global\ncurl -X POST ${BASE}/ignore \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"words":["gmbh","impressum","datenschutz"]}'`} />

      <div className="card mb-8">
        <h3 className="font-semibold text-white mb-4">💡 Best Practices</h3>
        <div className="space-y-2 text-sm text-gray-400">
          {[
            ['Qualität vor Quantität', '10 gute Texte schlagen 100 generische.'],
            ['Konsistente Sprache', 'Pro Profil eine Sprache trainieren.'],
            ['Regelmäßig neu trainieren', 'Bei neuen Inhalten erneut aufrufen.'],
            ['Ignore-Liste pflegen', 'Marken-Namen und Boilerplate ausschließen.'],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-3">
              <span className="text-violet-400 flex-shrink-0">→</span>
              <div><strong className="text-white">{t}:</strong> {d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-blue-500/5 border-blue-500/15">
        <h3 className="font-semibold text-white mb-2">Weiter</h3>
        <div className="space-y-1.5 text-sm">
          <Link to="/developers/tutorials/keyscope-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Vollständige API-Referenz
          </Link>
          <Link to="/developers/tutorials/keyscope-quickstart" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Zurück zum Quickstart
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
