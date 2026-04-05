import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, ExternalLink } from 'lucide-react';
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

function InfoBox({ icon = '💡', color = 'blue', children }) {
  const colors = {
    purple: 'bg-purple-500/5 border-purple-500/15',
    green: 'bg-green-500/5 border-green-500/15',
    yellow: 'bg-amber-500/5 border-amber-500/15',
    blue: 'bg-blue-500/5 border-blue-500/15',
  };
  return <div className={`card text-sm text-gray-400 my-4 ${colors[color]}`}>{icon} {children}</div>;
}

export default function FrameTrainDataset() {
  return (
    <TutorialPage category="FrameTrain" categoryColor="text-purple-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-widest">FrameTrain</div>
            <h1 className="text-3xl font-bold text-white">Datensätze aufbereiten</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Ein gut aufbereiteter Datensatz ist wichtiger als Hyperparameter-Tuning.
          Du lernst alle unterstützten Formate, wie du Daten bereinigst und für verschiedene
          Training-Typen (Klassifikation, LLM Fine-Tuning, Instruction Tuning) vorbereitetest.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">CSV</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">JSON</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">JSONL</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">HuggingFace Datasets</span>
        </div>
      </div>

      {/* Formate */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Unterstützte Formate
      </h2>

      <div className="space-y-4 mb-8">
        <div className="card">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <code className="font-mono text-blue-300">.csv</code>
            <span className="text-xs text-gray-600">Einfachstes Format</span>
          </h3>
          <p className="text-gray-400 text-sm mb-2">Erste Zeile = Header. Pflichtfelder: <code className="font-mono text-blue-300">text</code> + optional <code className="font-mono text-blue-300">label</code>.</p>
          <CodeBlock lang="csv" code={`text,label
"Der Kundenservice war ausgezeichnet!",1
"Das Produkt war enttäuschend.",0
"Schnelle Lieferung, gerne wieder.",1
"Qualität entspricht nicht der Beschreibung.",0`} />
        </div>

        <div className="card">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <code className="font-mono text-purple-300">.json</code>
            <span className="text-xs text-gray-600">Array von Objekten</span>
          </h3>
          <CodeBlock lang="json" code={`[
  { "text": "Der Kundenservice war ausgezeichnet!", "label": 1 },
  { "text": "Das Produkt war enttäuschend.", "label": 0 },
  { "text": "Schnelle Lieferung, gerne wieder.", "label": 1 }
]`} />
        </div>

        <div className="card">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <code className="font-mono text-pink-300">.jsonl</code>
            <span className="text-xs text-gray-600">Empfohlen für große Datensätze</span>
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            JSON Lines — jede Zeile ist ein separates JSON-Objekt. Ideal für Datensätze &gt;10.000 Samples
            da speichereffizient (streaming-fähig).
          </p>
          <CodeBlock lang="jsonl" code={`{"text": "Der Kundenservice war ausgezeichnet!", "label": 1}
{"text": "Das Produkt war enttäuschend.", "label": 0}
{"text": "Schnelle Lieferung, gerne wieder.", "label": 1}`} />
        </div>
      </div>

      {/* Instruction Tuning */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Format für Instruction Fine-Tuning (LLMs)
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Beim LLM-Fine-Tuning (z.B. Llama, Mistral) wird das Modell auf Anweisung-Antwort-Paare trainiert.
        FrameTrain unterstützt zwei Instruction-Formate:
      </p>

      <p className="text-gray-400 text-sm mb-2"><strong className="text-white">Alpaca-Format (einfach)</strong></p>
      <CodeBlock lang="jsonl" code={`{"instruction": "Fasse diesen Text auf Deutsch zusammen.", "input": "Machine learning is a subset of AI...", "output": "Machine Learning ist ein Teilbereich der KI..."}
{"instruction": "Übersetze ins Englische.", "input": "Künstliche Intelligenz", "output": "Artificial intelligence"}`} />

      <p className="text-gray-400 text-sm mb-2"><strong className="text-white">ShareGPT-Format (Chat)</strong></p>
      <CodeBlock lang="json" code={`[
  {
    "conversations": [
      { "from": "human", "value": "Was ist Machine Learning?" },
      { "from": "gpt", "value": "Machine Learning ist ein Teilbereich der KI, bei dem Algorithmen..." }
    ]
  },
  {
    "conversations": [
      { "from": "human", "value": "Erkläre Gradient Descent." },
      { "from": "gpt", "value": "Gradient Descent ist ein Optimierungsalgorithmus..." }
    ]
  }
]`} />
      <InfoBox icon="💡" color="blue">
        FrameTrain erkennt das Format automatisch. Wähle im Datensatz-Dialog{' '}
        <strong className="text-white">„Auto-detect"</strong> und FrameTrain zeigt eine
        Vorschau der ersten 10 Samples.
      </InfoBox>

      {/* Datensatz-Größe */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-2 border-b border-white/[0.08]">
        Wie viele Daten brauche ich?
      </h2>
      <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Task</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Minimum</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Gut</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Optimal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Binäre Klassifikation', '500', '2.000–5.000', '10.000+'],
              ['Multi-Klassen (5–10 Klassen)', '1.000', '5.000–10.000', '20.000+'],
              ['LLM Instruction Tuning', '200', '1.000–5.000', '10.000+'],
              ['Domain-Adaptation', '500', '2.000–10.000', '50.000+'],
            ].map(([t, min, gut, opt]) => (
              <tr key={t} className="border-b border-white/[0.04]">
                <td className="py-2 px-4 text-gray-300 text-xs">{t}</td>
                <td className="py-2 px-4 text-red-400 text-xs font-mono">{min}</td>
                <td className="py-2 px-4 text-yellow-400 text-xs font-mono">{gut}</td>
                <td className="py-2 px-4 text-green-400 text-xs font-mono">{opt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daten bereinigen */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Daten bereinigen — Checkliste
      </h2>
      <div className="space-y-3 mb-8">
        {[
          { icon: '🗑️', title: 'Duplikate entfernen', desc: 'Identische oder sehr ähnliche Samples reduzieren Overfitting und verfälschen Metriken.' },
          { icon: '📏', title: 'Textlänge normalisieren', desc: 'Extrem kurze Texts (<10 Zeichen) und extrem lange (>2.048 Tokens für LLMs) filtern oder kürzen.' },
          { icon: '🏷️', title: 'Label-Balance prüfen', desc: 'Unausgeglichene Klassen (z.B. 90% positiv / 10% negativ) führen zu schlechter Genauigkeit für die Minderheitsklasse.' },
          { icon: '🌍', title: 'Sprache einheitlich halten', desc: 'Mischt der Datensatz mehrere Sprachen, kann das zu schlechter Performance führen. Im Zweifelsfall: ein Modell pro Sprache.' },
          { icon: '🔡', title: 'Encoding prüfen', desc: 'UTF-8 ist Standard. Windows-Dateien können CP1252 sein — FrameTrain erkennt dies automatisch und fragt nach.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 card">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm">{item.title}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Python Helper */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Python: Datensatz vorbereiten
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Kleines Hilfsskript um CSV-Daten zu bereinigen und in JSONL zu konvertieren:
      </p>
      <CodeBlock lang="python" code={`import csv, json, re
from collections import Counter

def clean_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r'\\s+', ' ', text)         # Mehrfach-Whitespace
    text = re.sub(r'[\\x00-\\x1f]', '', text)  # Steuerzeichen
    return text

def prepare_dataset(input_csv: str, output_jsonl: str, min_length=10):
    samples = []
    seen = set()

    with open(input_csv, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            text = clean_text(row.get('text', ''))
            label = row.get('label', '').strip()

            # Filter
            if len(text) < min_length: continue
            if text in seen: continue  # Duplikat
            seen.add(text)

            samples.append({'text': text, 'label': int(label)})

    # Klassen-Balance anzeigen
    labels = Counter(s['label'] for s in samples)
    print(f"Total: {len(samples)} Samples")
    print(f"Labels: {dict(labels)}")

    # JSONL schreiben
    with open(output_jsonl, 'w', encoding='utf-8') as f:
        for s in samples:
            f.write(json.dumps(s, ensure_ascii=False) + '\\n')

    print(f"Gespeichert: {output_jsonl}")

# Anwendung
prepare_dataset('rohdaten.csv', 'datensatz.jsonl', min_length=20)`} />

      {/* HuggingFace */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-2 border-b border-white/[0.08]">
        HuggingFace Datasets Hub
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        FrameTrain kann Datensätze direkt vom{' '}
        <a href="https://huggingface.co/datasets" target="_blank" rel="noopener noreferrer"
          className="text-blue-400 hover:underline">HuggingFace Hub</a>{' '}
        laden. Beliebte Datensätze für erste Experimente:
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {[
          { slug: 'imdb', desc: 'Sentiment-Analyse, englisch, 50.000 Filmkritiken' },
          { slug: 'yelp_polarity', desc: 'Sentiment (pos/neg), englisch, 560.000 Reviews' },
          { slug: 'ag_news', desc: 'News-Klassifikation, 4 Klassen, 120.000 Artikel' },
          { slug: 'squad', desc: 'Question Answering, englisch' },
          { slug: 'tatsu-lab/alpaca', desc: 'Instruction-Tuning, 52.000 Alpaca-Paare' },
          { slug: 'HuggingFaceH4/ultrachat_200k', desc: 'Chat Fine-Tuning, 200.000 Dialoge' },
        ].map((item) => (
          <div key={item.slug} className="card bg-blue-500/5 border-blue-500/15">
            <code className="text-blue-300 font-mono text-xs">{item.slug}</code>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <InfoBox icon="⚠️" color="yellow">
        Beim Laden vom HuggingFace Hub ist eine <strong className="text-white">Internetverbindung</strong> nötig.
        Nach dem ersten Download werden Datensätze lokal gecacht —
        danach läuft alles offline.
      </InfoBox>

      {/* Nächste Schritte */}
      <div className="card bg-purple-500/5 border-purple-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/frametrain-lora" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> LoRA Fine-Tuning konfigurieren
          </Link>
          <Link to="/developers/tutorials/frametrain-export" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Trainiertes Modell exportieren
          </Link>
          <Link to="/developers/tutorials/frametrain-quickstart" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Zurück zum Quickstart
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
