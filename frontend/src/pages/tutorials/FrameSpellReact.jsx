import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react';

/* ─── Reusable code block ─────────────────────────────────────────────────── */
function CodeBlock({ code, lang = '' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700 rounded-t-lg border-b border-white/5">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
        </button>
      </div>
      <pre className="bg-dark-900 rounded-b-lg p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed border border-white/5 border-t-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Callout({ type = 'info', children }) {
  const styles = {
    info:    'bg-primary-500/10 border-primary-500/40 text-primary-200',
    warn:    'bg-yellow-500/10 border-yellow-500/40 text-yellow-200',
    success: 'bg-green-500/10 border-green-500/40 text-green-200',
    danger:  'bg-red-500/10 border-red-500/40 text-red-200',
  };
  const icons = { info: '💡', warn: '⚠️', success: '✅', danger: '🚨' };
  return (
    <div className={`flex gap-3 p-4 rounded-lg border mb-6 text-sm leading-relaxed ${styles[type]}`}>
      <span className="flex-shrink-0">{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center text-sm font-bold">{n}</div>
      <div className="flex-1">
        <h3 className="font-bold text-white mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
const TutorialFrameSpellReact = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-3xl mx-auto">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/developers/tutorials" className="hover:text-primary-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Tutorials
        </Link>
        <span>/</span>
        <span className="text-gray-400">FrameSpell API</span>
        <span>/</span>
        <span className="text-white">Rechtschreibprüfung in React einbauen</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full font-semibold">FrameSpell API</span>
          <span className="text-xs px-2.5 py-1 bg-green-500/20 text-green-400 rounded-full">Einsteiger</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> 10 Min.</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Rechtschreibprüfung in React einbauen</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Schritt-für-Schritt: FrameSpell API in eine React-App integrieren — mit sicherer API-Key-Handhabung über eine Next.js/Vite-Backend-Route, State-Management und einem sauberen UI-Pattern.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>März 2026</span>
          <span>·</span>
          <span>React + Vite oder Next.js</span>
        </div>
      </div>

      {/* Was du lernst */}
      <div className="card mb-10 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/20">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-primary-400" /> Was du in diesem Tutorial lernst</h2>
        <ul className="space-y-2">
          {[
            'API-Key sicher serverseitig speichern und verwenden',
            'Backend-Route erstellen, die den Key kapselt',
            'React-Hook zum Abrufen der Korrektur',
            'Lade- und Fehlerzustände korrekt behandeln',
            'Einfaches UI: Textarea + Korrektur-Anzeige mit Diff',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Voraussetzungen */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-3">Voraussetzungen</h2>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• React-Grundkenntnisse (Hooks, State)</li>
          <li>• Node.js installiert</li>
          <li>• FrameSpell API Key (<a href="https://framespell.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">kostenlos registrieren</a>)</li>
          <li>• Next.js- oder Vite-Projekt</li>
        </ul>
      </div>

      {/* Schritte */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-8">Schritt-für-Schritt</h2>

        <Step n="1" title="Projekt erstellen und API Key sichern">
          <p className="text-gray-400 text-sm mb-4">Erstelle eine <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">.env.local</code> Datei im Projektstamm und füge deinen FrameSpell API Key ein. Diese Datei <strong className="text-white">niemals in Git commiten</strong>.</p>
          <CodeBlock lang=".env.local" code={`# .env.local – NIEMALS committen!
FRAMESPELL_API_KEY=fs_live_xxxxxxxxxxxxxxxxxxxxxxxx`} />
          <Callout type="warn">
            Der API Key muss <strong>serverseitig</strong> bleiben. Verwende ihn nie direkt in Client-seitigem React-Code — er würde im Browser-Bundle sichtbar.
          </Callout>
        </Step>

        <Step n="2" title="Backend-Route erstellen (Next.js App Router)">
          <p className="text-gray-400 text-sm mb-4">Die Backend-Route kapselt den API Key und leitet Anfragen an FrameSpell weiter. Erstelle die Datei unter <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">app/api/spellcheck/route.ts</code>:</p>
          <CodeBlock lang="app/api/spellcheck/route.ts" code={`// app/api/spellcheck/route.ts
import { NextRequest, NextResponse } from 'next/server';

const FRAMESPELL_URL =
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck';

export async function POST(req: NextRequest) {
  const { text, language = 'de' } = await req.json();

  if (!text || text.trim().length === 0) {
    return NextResponse.json(
      { error: 'text darf nicht leer sein' },
      { status: 400 }
    );
  }

  const resp = await fetch(FRAMESPELL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.FRAMESPELL_API_KEY!,
    },
    body: JSON.stringify({ text, language }),
  });

  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}`} />
          <p className="text-gray-500 text-xs mb-4">Für <strong className="text-gray-300">Vite + Express</strong> statt Next.js:</p>
          <CodeBlock lang="server/routes/spellcheck.js" code={`// server/routes/spellcheck.js (Express)
import express from 'express';
const router = express.Router();

router.post('/spellcheck', async (req, res) => {
  const { text, language = 'de' } = req.body;

  const resp = await fetch(
    'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.FRAMESPELL_API_KEY,
      },
      body: JSON.stringify({ text, language }),
    }
  );

  const data = await resp.json();
  res.status(resp.status).json(data);
});

export default router;`} />
        </Step>

        <Step n="3" title="Custom React Hook erstellen">
          <p className="text-gray-400 text-sm mb-4">Ein sauberer Hook kapselt die gesamte Logik — State, Debounce, Fehlerbehandlung:</p>
          <CodeBlock lang="hooks/useSpellcheck.ts" code={`// hooks/useSpellcheck.ts
import { useState, useCallback, useRef } from 'react';

interface SpellcheckResult {
  corrected: string;
  original:  string;
  changed:   boolean;
}

export function useSpellcheck() {
  const [result, setResult]   = useState<SpellcheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const debounceRef           = useRef<NodeJS.Timeout | null>(null);

  const check = useCallback((text: string, debounceMs = 600) => {
    // Debounce: warte bis Nutzer aufgehört hat zu tippen
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!text.trim() || text.length < 5) {
        setResult(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const resp = await fetch('/api/spellcheck', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`);

        const data = await resp.json();

        if (data.success) {
          setResult({
            corrected: data.data.corrected,
            original:  text,
            changed:   data.data.corrected !== text,
          });
        } else {
          throw new Error(data.error || 'Unbekannter Fehler');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, debounceMs);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, check, reset };
}`} />
        </Step>

        <Step n="4" title="React-Komponente bauen">
          <p className="text-gray-400 text-sm mb-4">Jetzt die eigentliche UI-Komponente. Sie zeigt Original, Korrektur und einen simplen Diff:</p>
          <CodeBlock lang="components/SpellcheckEditor.tsx" code={`// components/SpellcheckEditor.tsx
'use client';
import { useState } from 'react';
import { useSpellcheck } from '@/hooks/useSpellcheck';

export function SpellcheckEditor() {
  const [text, setText] = useState('');
  const { result, loading, error, check, reset } = useSpellcheck();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    check(e.target.value);       // Debounce intern im Hook
  };

  const applyCorrection = () => {
    if (result?.corrected) {
      setText(result.corrected);
      reset();
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold">Rechtschreibprüfung</h2>

      {/* Eingabe */}
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Text hier eingeben…"
          rows={6}
          className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700
                     text-white resize-y focus:outline-none focus:border-indigo-500"
        />
        {loading && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 flex items-center gap-1">
            <div className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full animate-spin" />
            Prüfe…
          </div>
        )}
      </div>

      {/* Fehlermeldung */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
          ⚠ {error}
        </div>
      )}

      {/* Korrektur-Ergebnis */}
      {result && !loading && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl space-y-3">
          {result.changed ? (
            <>
              <p className="text-green-300 text-sm font-semibold">
                ✓ Korrekturen gefunden
              </p>
              <div className="text-sm text-gray-300 bg-black/30 p-3 rounded-lg font-mono">
                {result.corrected}
              </div>
              <button
                onClick={applyCorrection}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white
                           text-sm rounded-lg font-semibold transition-colors"
              >
                Korrektur übernehmen
              </button>
            </>
          ) : (
            <p className="text-green-400 text-sm">✓ Keine Fehler gefunden</p>
          )}
        </div>
      )}
    </div>
  );
}`} />
        </Step>

        <Step n="5" title="Komponente einbinden">
          <p className="text-gray-400 text-sm mb-4">Importiere und verwende die Komponente auf deiner Seite:</p>
          <CodeBlock lang="app/page.tsx" code={`// app/page.tsx
import { SpellcheckEditor } from '@/components/SpellcheckEditor';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 py-20">
      <SpellcheckEditor />
    </main>
  );
}`} />
          <Callout type="success">
            Fertig! Die Komponente prüft automatisch 600ms nach dem letzten Tastendruck. Der API Key bleibt serverseitig in der Route-Handler.
          </Callout>
        </Step>
      </div>

      {/* Response Format */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-4">API Response Format</h2>
        <p className="text-gray-400 text-sm mb-4">Das ist das vollständige JSON, das die FrameSpell API zurückgibt:</p>
        <CodeBlock lang="JSON Response" code={`{
  "success": true,
  "data": {
    "corrected":       "Das ist ein Beispieltext mit Fehlern.",
    "original":        "Das ist ein Beispeil text mit felern.",
    "processing_time": 143.7,    // Millisekunden
    "tokens_used":     8         // Verbrauchte Tokens
  }
}

// Fehlerfall:
{
  "success":     false,
  "error":       "Rate limit exceeded",
  "retry_after": 12             // Sekunden warten
}`} />
      </div>

      {/* Troubleshooting */}
      <div className="card mb-10">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-400" /> Häufige Probleme
        </h2>
        <div className="space-y-4">
          {[
            { problem: '401 Unauthorized', solution: 'API Key fehlt oder ist ungültig. Prüfe die Umgebungsvariable FRAMESPELL_API_KEY.' },
            { problem: '429 Too Many Requests', solution: 'Rate Limit überschritten (20 Req/min im Free Plan). Debounce erhöhen oder auf Pro upgraden.' },
            { problem: 'fetch failed im Browser', solution: 'Du rufst die API direkt vom Browser auf — das ist aus Sicherheitsgründen falsch. Verwende eine Backend-Route (Schritt 2).' },
            { problem: 'CORS-Fehler', solution: 'Selbes Problem: API Key gehört serverseitig. Route erstellen und vom Browser nur deine eigene /api/spellcheck aufrufen.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-yellow-400 text-xs font-mono mt-0.5 flex-shrink-0">●</span>
              <div>
                <div className="text-white text-sm font-semibold"><code className="font-mono">{item.problem}</code></div>
                <div className="text-gray-400 text-sm">{item.solution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/developers/tutorials" className="btn-secondary text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Alle Tutorials
        </Link>
        <Link to="/developers/tutorials/framespell-live-korrektur" className="btn-primary text-sm flex items-center gap-2">
          Nächstes Tutorial: Live-Korrektur <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default TutorialFrameSpellReact;
