import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';
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

const FT = 'https://frame-train.vercel.app';

export default function FrameTrainExport() {
  return (
    <TutorialPage category="FrameTrain" categoryColor="text-purple-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#059669,#7C3AED)' }}>
            <Download className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-widest">FrameTrain</div>
            <h1 className="text-3xl font-bold text-white">Modell exportieren & einbinden</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Nach dem Training kannst du dein Modell in verschiedenen Formaten exportieren und in eigene
          Anwendungen, lokale LLM-Server oder Python-Skripte integrieren. Du lernst alle Export-Formate
          und wie du das Modell danach praktisch nutzt.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">SafeTensors</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">GGUF</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">PyTorch</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">~15 Min</span>
        </div>
      </div>

      {/* Export-Formate im Vergleich */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Export-Formate im Vergleich
      </h2>
      <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Format</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Dateierweiterung</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Ideal für</th>
              <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Hinweis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['SafeTensors', '.safetensors', 'Python, HuggingFace, Production', '✅ Empfohlen — sicher, schnell'],
              ['GGUF', '.gguf', 'llama.cpp, Ollama, LM Studio', '✅ Für lokale LLM-Server'],
              ['PyTorch', '.pt / .bin', 'Maximale Kompatibilität', '⚠️ Nicht empfohlen (Sicherheitsrisiko bei .pt)'],
            ].map(([fmt, ext, use, note]) => (
              <tr key={fmt} className="border-b border-white/[0.04]">
                <td className="py-2 px-4 text-white font-semibold text-xs">{fmt}</td>
                <td className="py-2 px-4 text-blue-300 font-mono text-xs">{ext}</td>
                <td className="py-2 px-4 text-gray-400 text-xs">{use}</td>
                <td className="py-2 px-4 text-gray-500 text-xs">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export in FrameTrain */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Export-Workflow in FrameTrain
      </h2>
      <div className="space-y-4 mb-8">
        {[
          { n: '1', title: 'Training abschließen', desc: 'Warte bis der Training-Run abgeschlossen ist (Status: ✅ Fertig). Alternativ: klicke auf einen Checkpoint-Snapshot.' },
          { n: '2', title: 'Exportieren klicken', desc: 'Im Modell-Übersichts-Panel → „Exportieren". Wähle das Format und den Zielordner.' },
          { n: '3', title: 'LoRA mergen (optional)', desc: 'Für SafeTensors und GGUF kannst du die LoRA-Gewichte ins Basismodell einmergen — das Ergebnis ist ein standalone-Modell ohne Basismodell-Abhängigkeit.' },
          { n: '4', title: 'Export-Pfad', desc: <span>Das Modell liegt unter <code className="font-mono text-purple-300">~/FrameTrain/exports/[modellname]/</code> — bereit zur Integration.</span> },
        ].map((step) => (
          <div key={step.n} className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#059669,#7C3AED)' }}>
              {step.n}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="font-semibold text-white text-sm mb-1">{step.title}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Python Integration */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Python — Modell laden und nutzen
      </h2>

      <p className="text-gray-400 text-sm mb-2"><strong className="text-white">SafeTensors mit HuggingFace Transformers:</strong></p>
      <CodeBlock lang="python" code={`from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

MODEL_PATH = "~/FrameTrain/exports/mein-modell"

# Modell und Tokenizer laden
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model     = AutoModelForSequenceClassification.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float16,   # FP16 für Geschwindigkeit
)
model.eval()

# Inferenz
def predict(text: str) -> dict:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=-1)
    predicted_class = probs.argmax().item()
    return { "class": predicted_class, "confidence": probs[0][predicted_class].item() }

# Beispiel
result = predict("Das Produkt ist absolut fantastisch!")
print(result)  # { "class": 1, "confidence": 0.975 }`} />

      <p className="text-gray-400 text-sm mt-6 mb-2"><strong className="text-white">LoRA-Adapter laden (ohne Merge):</strong></p>
      <CodeBlock lang="python" code={`from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

BASE_MODEL  = "mistralai/Mistral-7B-v0.1"
LORA_PATH   = "~/FrameTrain/exports/mistral-finetuned"

# Basis laden + LoRA drauflegen
base = AutoModelForCausalLM.from_pretrained(BASE_MODEL, torch_dtype="auto")
model = PeftModel.from_pretrained(base, LORA_PATH)
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

# Text generieren
inputs  = tokenizer("Erkläre Gradient Descent:", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=200, temperature=0.7)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))`} />

      {/* Ollama / GGUF */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-2 border-b border-white/[0.08]">
        GGUF — Lokaler LLM-Server mit Ollama
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Das GGUF-Format läuft direkt in{' '}
        <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a>,{' '}
        <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LM Studio</a>{' '}
        oder <code className="font-mono text-blue-300">llama.cpp</code> — ohne Python-Umgebung.
      </p>
      <CodeBlock lang="bash" code={`# Ollama installieren (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Modell-Datei in Ollama importieren
ollama create mein-modell --from ~/FrameTrain/exports/mein-modell.gguf

# Starten
ollama run mein-modell
# >>> Erkläre LoRA Fine-Tuning kurz.`} />

      <CodeBlock lang="javascript" code={`// JavaScript — Ollama API nutzen
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'mein-modell',
    prompt: 'Erkläre LoRA Fine-Tuning kurz.',
    stream: false,
  }),
});

const data = await response.json();
console.log(data.response);`} />

      {/* FastAPI Server */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-2 border-b border-white/[0.08]">
        Eigene REST-API mit FastAPI
      </h2>
      <CodeBlock lang="python" code={`# inference_server.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

app = FastAPI(title="Mein Fine-Tuned Modell")

MODEL_PATH = "~/FrameTrain/exports/mein-modell"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model     = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH).eval()

class Request(BaseModel):
    text: str

@app.post("/predict")
def predict(req: Request):
    inputs = tokenizer(req.text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.softmax(logits, dim=-1)[0]
    return {
        "class":      probs.argmax().item(),
        "confidence": round(probs.max().item(), 4),
        "probabilities": probs.tolist(),
    }

# Starten: uvicorn inference_server:app --host 0.0.0.0 --port 8000`} />

      <InfoBox icon="🚀" color="green">
        <strong className="text-white">Tipp:</strong> Mit{' '}
        <code className="font-mono text-green-300">uvicorn inference_server:app --reload</code>{' '}
        starte den Server lokal. Das exportierte Modell kann so als Microservice in jede
        Anwendungsarchitektur integriert werden — On-Premise, ohne Cloud-Kosten.
      </InfoBox>

      {/* Versionierung */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-6 pb-2 border-b border-white/[0.08]">
        Smart Versioning in FrameTrain
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        FrameTrain speichert automatisch Checkpoints nach jeder Epoche unter:
      </p>
      <CodeBlock lang="bash" code={`~/FrameTrain/projects/mein-modell/
├── checkpoint-epoch-1/
│   ├── adapter_model.safetensors
│   └── training_metrics.json
├── checkpoint-epoch-2/
│   └── ...
├── checkpoint-best/        # Bester Val-Loss
│   └── adapter_model.safetensors
└── exports/
    └── mein-modell-final.safetensors`} />
      <p className="text-gray-400 text-sm leading-relaxed">
        Du kannst jeden Checkpoint einzeln exportieren — so kannst du verschiedene Versionen
        vergleichen oder zum besten Checkpoint zurückgehen.
      </p>

      {/* Nächste Schritte */}
      <div className="card bg-purple-500/5 border-purple-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/frametrain-quickstart" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> Quickstart — Erstes Modell trainieren
          </Link>
          <Link to="/developers/tutorials/frametrain-lora" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> LoRA Fine-Tuning — Deep Dive
          </Link>
          <a href={`${FT}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ExternalLink className="w-3 h-3 text-pink-400" />
            <span className="text-pink-400">frame-train.vercel.app</span> — App herunterladen
          </a>
        </div>
      </div>
    </TutorialPage>
  );
}
