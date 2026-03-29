import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Clock, Zap, CheckCircle } from 'lucide-react';

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
  const styles = { info: 'bg-primary-500/10 border-primary-500/40 text-primary-200', warn: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-200', success: 'bg-green-500/10 border-green-500/40 text-green-200' };
  const icons = { info: '💡', warn: '⚠️', success: '✅' };
  return <div className={`flex gap-3 p-4 rounded-lg border mb-6 text-sm leading-relaxed ${styles[type]}`}><span className="flex-shrink-0">{icons[type]}</span><div>{children}</div></div>;
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center text-sm font-bold">{n}</div>
      <div className="flex-1"><h3 className="font-bold text-white mb-3">{title}</h3>{children}</div>
    </div>
  );
}

const TutorialBatch = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-3xl mx-auto">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/developers/tutorials" className="hover:text-primary-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Tutorials
        </Link>
        <span>/</span>
        <span className="text-white">Batch-Verarbeitung großer Texte</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full font-semibold">FrameSpell API</span>
          <span className="text-xs px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Fortgeschritten</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> 15 Min.</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Batch-Verarbeitung großer Texte</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Hunderte Dokumente, tausende Produktbeschreibungen oder ganze Datenbanken automatisch korrigieren — mit Concurrency-Kontrolle, Retry-Logik, Caching und Fortschrittsanzeige.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>März 2026</span><span>·</span><span>Node.js / Python</span>
        </div>
      </div>

      <div className="card mb-10 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/20">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-primary-400" /> Was du lernst</h2>
        <ul className="space-y-2">
          {['Concurrency-Limit: Maximal 5 parallele Requests (Rate Limit einhalten)', 'Exponential Backoff: Automatisch bei 429 warten und erneut versuchen', 'In-Memory-Cache: Identische Texte nur einmal prüfen', 'Progress-Tracking: Wie viele Dokumente sind schon fertig?', 'CSV/JSON-Batch: Produktdaten-Pipeline in Python & Node.js'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {item}</li>
          ))}
        </ul>
      </div>

      {/* Rate Limit Info */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-3">Rate Limits im Blick behalten</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Plan</th>
              <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Limit</th>
              <th className="text-left py-2 text-gray-400 font-semibold">Max Concurrency empfohlen</th>
            </tr></thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5"><td className="py-2 pr-6">Kostenlos</td><td className="py-2 pr-6 font-mono">20 Req/min</td><td className="py-2">2–3 parallel</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-6">Professional</td><td className="py-2 pr-6 font-mono">100 Req/min</td><td className="py-2">5–10 parallel</td></tr>
              <tr><td className="py-2 pr-6">Enterprise</td><td className="py-2 pr-6 font-mono">Unbegrenzt</td><td className="py-2">20+ parallel</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-8">Schritt-für-Schritt</h2>

        <Step n="1" title="Basis-Funktion mit Retry-Logik (Node.js)">
          <p className="text-gray-400 text-sm mb-4">Die Kern-Funktion: Ein API-Call mit automatischem Exponential Backoff bei Rate Limit Fehlern:</p>
          <CodeBlock lang="lib/framespell.ts" code={`// lib/framespell.ts
const API_URL = 'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck';
const API_KEY = process.env.FRAMESPELL_API_KEY!;

export async function spellcheck(
  text: string,
  language = 'de',
  maxRetries = 4
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({ text, language }),
    });

    // ✅ Erfolg
    if (resp.ok) {
      const json = await resp.json();
      if (json.success) return json.data.corrected;
      throw new Error(json.error);
    }

    // ⏳ Rate Limit: warten und nochmal versuchen
    if (resp.status === 429) {
      const json = await resp.json().catch(() => ({}));
      const retryAfter = (json.retry_after ?? 5) + attempt * 2; // Exponential Backoff
      console.warn(\`[FrameSpell] Rate limited – warte \${retryAfter}s (Versuch \${attempt + 1})\`);
      await sleep(retryAfter * 1000);
      continue;
    }

    // ❌ Anderer Fehler – sofort abbrechen
    throw new Error(\`HTTP \${resp.status}: \${resp.statusText}\`);
  }

  throw new Error('Max retries exceeded');
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));`} />
        </Step>

        <Step n="2" title="Concurrency-kontrollierter Batch-Runner">
          <p className="text-gray-400 text-sm mb-4">Der Kern: Texte in Chunks aufteilen und nur N parallel senden. Mit Fortschrittsanzeige:</p>
          <CodeBlock lang="lib/batchSpellcheck.ts" code={`// lib/batchSpellcheck.ts
import { spellcheck } from './framespell';

interface BatchItem {
  id:        string | number;
  text:      string;
  corrected?: string;
  error?:    string;
}

interface BatchOptions {
  concurrency?: number;          // Parallel-Anfragen (default: 5)
  language?:    string;          // Sprache (default: 'de')
  onProgress?:  (done: number, total: number) => void;
}

export async function batchSpellcheck(
  items: BatchItem[],
  options: BatchOptions = {}
): Promise<BatchItem[]> {
  const {
    concurrency = 5,
    language    = 'de',
    onProgress,
  } = options;

  const results: BatchItem[] = new Array(items.length);
  let completed = 0;

  // Verarbeite in Chunks
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);

    const chunkResults = await Promise.allSettled(
      chunk.map(async (item, localIdx) => {
        const globalIdx = i + localIdx;
        try {
          const corrected       = await spellcheck(item.text, language);
          results[globalIdx]    = { ...item, corrected };
        } catch (err: any) {
          results[globalIdx]    = { ...item, corrected: item.text, error: err.message };
        }
        completed++;
        onProgress?.(completed, items.length);
      })
    );

    // Kurze Pause zwischen Chunks (Rate Limit-freundlich)
    if (i + concurrency < items.length) {
      await sleep(200);
    }
  }

  return results;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));`} />

          <Callout type="info">
            <strong>Promise.allSettled vs. Promise.all:</strong> <code>allSettled</code> verhindert, dass ein einzelner Fehler den gesamten Batch abbricht. Jedes Item wird einzeln als Erfolg oder Fehler markiert.
          </Callout>
        </Step>

        <Step n="3" title="In-Memory-Cache für Duplikate">
          <p className="text-gray-400 text-sm mb-4">In Produktdatenbanken sind viele Beschreibungen identisch. Cache verhindert doppelte API-Calls:</p>
          <CodeBlock lang="lib/cachedSpellcheck.ts" code={`// lib/cachedSpellcheck.ts
import { spellcheck } from './framespell';

const cache = new Map<string, string>();   // text → corrected
let cacheHits   = 0;
let cacheMisses = 0;

export async function cachedSpellcheck(text: string, lang = 'de'): Promise<string> {
  const key = \`\${lang}:\${text}\`;

  if (cache.has(key)) {
    cacheHits++;
    return cache.get(key)!;
  }

  cacheMisses++;
  const corrected = await spellcheck(text, lang);
  cache.set(key, corrected);
  return corrected;
}

export function getCacheStats() {
  return {
    size:     cache.size,
    hits:     cacheHits,
    misses:   cacheMisses,
    hitRate:  cacheHits / (cacheHits + cacheMisses) || 0,
  };
}

// Für langlebige Prozesse: Cache-Größe begrenzen (LRU-ähnlich)
export function clearOldEntries(maxSize = 1000) {
  if (cache.size <= maxSize) return;
  const toDelete = cache.size - maxSize;
  const keys     = cache.keys();
  for (let i = 0; i < toDelete; i++) {
    cache.delete(keys.next().value);
  }
}`} />
        </Step>

        <Step n="4" title="Komplette Datei-Pipeline (Node.js)">
          <p className="text-gray-400 text-sm mb-4">Ein vollständiges Script, das eine JSON-Datei mit Produkten einliest, korrigiert und das Ergebnis speichert:</p>
          <CodeBlock lang="scripts/correct-products.ts" code={`#!/usr/bin/env npx ts-node
// scripts/correct-products.ts
import fs                          from 'fs/promises';
import { batchSpellcheck }         from '../lib/batchSpellcheck';
import { getCacheStats }           from '../lib/cachedSpellcheck';

interface Product {
  id:          number;
  name:        string;
  description: string;
}

async function main() {
  console.log('⚙️  FrameSpell Batch-Korrektur gestartet\\n');

  // Produktdaten laden
  const raw      = await fs.readFile('./data/products.json', 'utf-8');
  const products: Product[] = JSON.parse(raw);

  console.log(\`📦 \${products.length} Produkte geladen\\n\`);

  // Items vorbereiten
  const items = products.map(p => ({
    id:   p.id,
    text: \`\${p.name}. \${p.description}\`,
  }));

  // Batch-Korrektur mit Fortschrittsanzeige
  const results = await batchSpellcheck(items, {
    concurrency: 5,
    onProgress: (done, total) => {
      const pct = Math.round((done / total) * 100);
      process.stdout.write(\`\\r⏳ Fortschritt: \${done}/\${total} (\${pct}%)\`);
    },
  });

  console.log('\\n');

  // Ergebnisse zurück auf Produkte mappen
  const correctedProducts = products.map((p, i) => ({
    ...p,
    description_corrected: results[i].corrected,
    had_errors: results[i].corrected !== items[i].text,
    error:      results[i].error ?? null,
  }));

  // Speichern
  await fs.writeFile(
    './data/products-corrected.json',
    JSON.stringify(correctedProducts, null, 2),
    'utf-8'
  );

  // Statistiken
  const errorCount  = correctedProducts.filter(p => p.had_errors).length;
  const cacheStats  = getCacheStats();

  console.log(\`✅ Fertig!
  → \${products.length} Produkte verarbeitet
  → \${errorCount} mit Korrekturen
  → Cache-Hit-Rate: \${(cacheStats.hitRate * 100).toFixed(1)}%
  → Ausgabe: data/products-corrected.json\`);
}

main().catch(console.error);`} />
        </Step>

        <Step n="5" title="Python-Pipeline mit ThreadPoolExecutor">
          <p className="text-gray-400 text-sm mb-4">Für Python-Projekte: Parallele Batch-Verarbeitung mit <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">concurrent.futures</code>:</p>
          <CodeBlock lang="scripts/batch_correct.py" code={`#!/usr/bin/env python3
"""FrameSpell Batch-Korrektur – Python"""
import os, json, time, csv
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

API_URL = "https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck"
API_KEY = os.environ["FRAMESPELL_API_KEY"]
MAX_WORKERS = 5   # Nicht mehr als Rate-Limit erlaubt

def correct_text(text: str, language: str = "de", retries: int = 3) -> str:
    """Korrigiert einen Text – mit Retry bei Rate Limit (429)."""
    for attempt in range(retries):
        try:
            resp = requests.post(
                API_URL,
                json={"text": text, "language": language},
                headers={"X-API-Key": API_KEY},
                timeout=10,
            )
            if resp.status_code == 429:
                wait = resp.json().get("retry_after", 5) + attempt * 2
                print(f"  Rate limited – warte {wait}s")
                time.sleep(wait)
                continue

            resp.raise_for_status()
            data = resp.json()
            return data["data"]["corrected"] if data["success"] else text

        except requests.RequestException as e:
            print(f"  Fehler: {e}")
            if attempt == retries - 1:
                return text   # Original zurückgeben bei Fehler

    return text


def batch_correct_csv(input_path: str, output_path: str, text_column: str = "description"):
    """Liest CSV, korrigiert eine Spalte, schreibt korrigierte CSV."""
    with open(input_path, newline="", encoding="utf-8") as f:
        reader   = csv.DictReader(f)
        rows     = list(reader)
        fieldnames = reader.fieldnames or []

    fieldnames.append(f"{text_column}_corrected")
    total     = len(rows)
    completed = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        future_to_row = {
            pool.submit(correct_text, row[text_column]): (i, row)
            for i, row in enumerate(rows)
            if row.get(text_column)
        }

        for future in as_completed(future_to_row):
            idx, row = future_to_row[future]
            rows[idx][f"{text_column}_corrected"] = future.result()
            completed += 1
            print(f"\\r⏳ {completed}/{total}", end="", flush=True)

    print(f"\\n✅ Korrektur abgeschlossen: {total} Zeilen")

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"   Ausgabe: {output_path}")


if __name__ == "__main__":
    batch_correct_csv(
        input_path="products.csv",
        output_path="products_corrected.csv",
        text_column="description",
    )`} />
          <Callout type="success">
            <strong>Fertig!</strong> Das Script verarbeitet beliebig große CSVs parallel — Rate Limits werden automatisch eingehalten. Passe <code>MAX_WORKERS</code> deinem Plan an.
          </Callout>
        </Step>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/developers/tutorials/framespell-live-korrektur" className="btn-secondary text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Tutorial 2: Live-Korrektur
        </Link>
        <Link to="/developers/tutorials/framespell-cms" className="btn-primary text-sm flex items-center gap-2">
          Nächstes Tutorial: CMS-Integration <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default TutorialBatch;
