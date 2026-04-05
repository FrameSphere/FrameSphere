import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ExternalLink } from 'lucide-react';
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

function InfoBox({ icon = '💡', color = 'purple', children }) {
  const colors = {
    purple: 'bg-purple-500/5 border-purple-500/15',
    green: 'bg-green-500/5 border-green-500/15',
    yellow: 'bg-amber-500/5 border-amber-500/15',
    blue: 'bg-blue-500/5 border-blue-500/15',
  };
  return <div className={`card text-sm text-gray-400 my-4 ${colors[color]}`}>{icon} {children}</div>;
}

const FT = 'https://frame-train.vercel.app';

export default function FrameTrainLoRA() {
  return (
    <TutorialPage category="FrameTrain" categoryColor="text-purple-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-widest">FrameTrain</div>
            <h1 className="text-3xl font-bold text-white">LoRA Fine-Tuning — Deep Dive</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          LoRA (Low-Rank Adaptation) ist die effizienteste Methode um große Sprachmodelle anzupassen —
          mit einem Bruchteil des ursprünglichen VRAM-Bedarfs. Du lernst wie LoRA funktioniert, welche
          Parameter wichtig sind und wie du QLoRA für noch größere Modelle nutzt.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">LoRA</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">QLoRA</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">~20 Min</span>
        </div>
      </div>

      {/* Was ist LoRA */}
      <div className="card bg-purple-500/5 border-purple-500/15 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Was ist LoRA?</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Beim Standard-Fine-Tuning werden <em>alle</em> Gewichte eines Modells aktualisiert — bei einem
          7B-Modell sind das ~14 GB Gradienten allein. LoRA trainiert stattdessen nur zwei kleine
          Matrizen <strong className="text-white">A</strong> und <strong className="text-white">B</strong>,
          die die Gewichtsänderung approximieren:
        </p>
        <div className="bg-black/20 rounded-lg p-4 font-mono text-sm text-center mb-3">
          <span className="text-gray-400">ΔW ≈ </span>
          <span className="text-purple-300">A</span>
          <span className="text-gray-400"> × </span>
          <span className="text-pink-300">B</span>
          <span className="text-gray-600 ml-3">// A: (d × r), B: (r × d), r = Rank</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          {[
            { label: 'VRAM-Ersparnis', val: '~80–95 %', color: 'text-green-400' },
            { label: 'Qualitätsverlust', val: '~2–5 %', color: 'text-yellow-400' },
            { label: 'Trainingszeit', val: '3–10× schneller', color: 'text-blue-400' },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center">
              <div className={`font-bold text-sm ${color}`}>{val}</div>
              <div className="text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LoRA Parameter */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Die wichtigsten LoRA-Parameter
      </h2>

      <div className="space-y-4 mb-8">
        {/* Rank */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-purple-300 text-sm font-bold">r (Rank)</code>
            <span className="text-xs text-gray-600">Empfehlung: 4–64</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            Der Rank bestimmt die Größe der LoRA-Matrizen. Höherer Rank = mehr Parameter = bessere
            Anpassung, aber mehr VRAM und längeres Training.
          </p>
          <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-1.5 px-3 text-gray-500">Rank</th>
                  <th className="text-left py-1.5 px-3 text-gray-500">Use Case</th>
                  <th className="text-left py-1.5 px-3 text-gray-500">VRAM-Overhead</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['r = 4', 'Schnelle Experimente, wenig VRAM', 'Sehr gering'],
                  ['r = 8', 'Standard — guter Kompromiss', 'Gering'],
                  ['r = 16', 'Bessere Qualität, mittlere Aufgaben', 'Mittel'],
                  ['r = 32–64', 'Maximale Qualität, viel VRAM nötig', 'Hoch'],
                ].map(([r, u, v]) => (
                  <tr key={r} className="border-b border-white/[0.04]">
                    <td className="py-1.5 px-3 text-purple-300 font-mono">{r}</td>
                    <td className="py-1.5 px-3 text-gray-300">{u}</td>
                    <td className="py-1.5 px-3 text-gray-500">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alpha */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-pink-300 text-sm font-bold">alpha (LoRA Alpha)</code>
            <span className="text-xs text-gray-600">Empfehlung: alpha = 2× rank</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Alpha skaliert die LoRA-Gewichte beim Forward Pass:{' '}
            <code className="font-mono text-sm">Weff = W + (alpha/r) × A × B</code>.
            Ein höheres Alpha verstärkt den Einfluss der LoRA-Adapter auf das Modell.
            Faustregel: <strong className="text-white">alpha = 2× rank</strong> ist ein guter Startpunkt.
          </p>
        </div>

        {/* Target Modules */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-blue-300 text-sm font-bold">target_modules</code>
            <span className="text-xs text-gray-600">Welche Layer angepasst werden</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            LoRA patcht nur ausgewählte Weight-Matrizen im Transformer. Mehr Modules = bessere
            Qualität, mehr VRAM. Standardwerte je Modellarchitektur:
          </p>
          <div className="space-y-2 text-xs font-mono">
            {[
              { model: 'LLaMA / Mistral', modules: '["q_proj", "v_proj"]' },
              { model: 'LLaMA (alle Attention)', modules: '["q_proj", "k_proj", "v_proj", "o_proj"]' },
              { model: 'GPT-2', modules: '["c_attn", "c_proj"]' },
              { model: 'Alle MLP + Attention', modules: '["q_proj", "v_proj", "up_proj", "down_proj"]' },
            ].map((item) => (
              <div key={item.model} className="flex flex-col sm:flex-row gap-2">
                <span className="text-gray-500 sm:w-48 flex-shrink-0">{item.model}</span>
                <code className="text-blue-300">{item.modules}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Dropout */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <code className="font-mono text-yellow-300 text-sm font-bold">lora_dropout</code>
            <span className="text-xs text-gray-600">Empfehlung: 0.05 – 0.1</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dropout-Rate für die LoRA-Layer. Hilft gegen Overfitting bei kleinen Datensätzen.
            Bei &gt;10.000 Samples kann auf 0 gesetzt werden.
          </p>
        </div>
      </div>

      {/* QLoRA */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        QLoRA — Quantisiertes Fine-Tuning
      </h2>
      <div className="card bg-violet-500/5 border-violet-500/15 mb-4">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          QLoRA kombiniert LoRA mit 4-Bit-Quantisierung des Basismodells (NF4 oder FP4).
          Dadurch schrumpft der VRAM-Bedarf nochmals drastisch:
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-center text-xs mb-3">
          {[
            { label: 'Full Fine-Tune 7B', val: '~56 GB', color: 'text-red-400' },
            { label: 'LoRA 7B (FP16)', val: '~14 GB', color: 'text-yellow-400' },
            { label: 'QLoRA 7B (4-bit)', val: '~5 GB', color: 'text-green-400' },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <div className={`font-bold ${color}`}>{val}</div>
              <div className="text-gray-500">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          In FrameTrain: Setze <strong className="text-white">Quantisierung → 4-bit (NF4)</strong>{' '}
          und aktiviere <strong className="text-white">double_quant</strong>. Die LoRA-Adapter selbst
          werden weiterhin in FP16 trainiert.
        </p>
      </div>

      {/* Config-Beispiel */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Empfohlene Konfigurationen
      </h2>

      <p className="text-gray-400 text-sm mb-2"><strong className="text-white">Szenario A: 8 GB VRAM (RTX 3070), LLaMA-7B Fine-Tuning</strong></p>
      <CodeBlock lang="yaml" code={`# FrameTrain Konfiguration
method:       QLoRA
base_model:   meta-llama/Llama-2-7b-hf
quantization: 4bit (NF4)
double_quant: true

lora_r:       8
lora_alpha:   16
target_modules: ["q_proj", "v_proj"]
lora_dropout: 0.05

epochs:       3
batch_size:   2
grad_accumulation: 4   # Effektive Batch Size: 8
learning_rate: 2e-4
warmup_ratio:  0.03
lr_scheduler:  cosine

precision: BF16
gradient_checkpointing: true`} />

      <p className="text-gray-400 text-sm mt-6 mb-2"><strong className="text-white">Szenario B: Apple M2 Pro, GPT-2 Fine-Tuning (schnell)</strong></p>
      <CodeBlock lang="yaml" code={`method:       LoRA
base_model:   gpt2
quantization: none

lora_r:       16
lora_alpha:   32
target_modules: ["c_attn", "c_proj"]
lora_dropout: 0.1

epochs:       5
batch_size:   8
learning_rate: 1e-4
warmup_ratio:  0.05
lr_scheduler:  linear

precision: FP32   # MPS unterstützt noch kein BF16
gradient_checkpointing: false`} />

      {/* Tipps */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Troubleshooting & Tipps
      </h2>
      <div className="space-y-3 mb-8">
        {[
          {
            problem: 'CUDA out of memory',
            solution: 'Batch Size halbieren, gradient_checkpointing aktivieren, QLoRA nutzen oder target_modules reduzieren.',
          },
          {
            problem: 'Loss bleibt hoch / Modell lernt nichts',
            solution: 'Learning Rate erhöhen (probiere 1e-3), Alpha erhöhen, mehr Daten oder mehr Epochen.',
          },
          {
            problem: 'Loss-Spike nach Epochen',
            solution: 'Learning Rate Schedule prüfen — cosine oder linear mit warmup stabilisiert das Training.',
          },
          {
            problem: 'Modell "vergisst" Original-Fähigkeiten',
            solution: 'Das nennt sich Catastrophic Forgetting. Reduziere lora_alpha, nutze kleineren Datensatz oder mische original Daten hinzu.',
          },
          {
            problem: 'MPS-Fehler auf macOS',
            solution: 'Stelle Precision auf FP32 (BF16 wird von MPS noch nicht vollständig unterstützt). Alternativ: CPU-Training aktivieren.',
          },
        ].map((item, i) => (
          <div key={i} className="card">
            <div className="font-semibold text-white text-sm mb-1">❌ {item.problem}</div>
            <div className="text-gray-400 text-sm">✅ {item.solution}</div>
          </div>
        ))}
      </div>

      {/* Nächste Schritte */}
      <div className="card bg-purple-500/5 border-purple-500/15">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/frametrain-dataset" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Datensätze richtig aufbereiten
          </Link>
          <Link to="/developers/tutorials/frametrain-export" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Modell exportieren und einbinden
          </Link>
          <a href={`${FT}/docs/ai-training-guide`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ExternalLink className="w-3 h-3 text-pink-400" />
            <span className="text-pink-400">KI Training Coach</span> — Kapitel 6: LoRA & QLoRA im Detail
          </a>
        </div>
      </div>
    </TutorialPage>
  );
}
