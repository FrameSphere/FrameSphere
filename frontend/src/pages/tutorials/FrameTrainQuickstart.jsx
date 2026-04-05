import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Download, ExternalLink, CheckCircle } from 'lucide-react';
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

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        {children}
      </div>
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

function PlatformCard({ icon, name, file, cmd }) {
  return (
    <div className="card flex-1">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-bold text-white text-sm mb-1">{name}</div>
      <code className="text-xs text-blue-300 font-mono">{file}</code>
      {cmd && (
        <div className="mt-2 text-xs text-gray-500 font-mono">{cmd}</div>
      )}
    </div>
  );
}

const FT = 'https://frame-train.vercel.app';

export default function FrameTrainQuickstart() {
  return (
    <TutorialPage category="FrameTrain" categoryColor="text-purple-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-widest">FrameTrain</div>
            <h1 className="text-3xl font-bold text-white">Quickstart — Erstes Modell trainieren</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Von der Installation bis zum ersten fertig trainierten Modell — in diesem Guide lernst du,
          wie du FrameTrain installierst, ein HuggingFace-Modell importierst, deinen Datensatz
          lädst und dein erstes LoRA Fine-Tuning startest.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">macOS / Windows / Linux</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">~30 Min</span>
          <a href={FT} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> frame-train.vercel.app
          </a>
        </div>
      </div>

      {/* Systemanforderungen */}
      <div className="card bg-white/[0.02] border-white/[0.06] mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Systemanforderungen</h2>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {[
            { label: 'RAM', val: '8 GB (16 GB empfohlen)' },
            { label: 'Speicher', val: '2 GB freier Speicher' },
            { label: 'GPU (optional)', val: 'NVIDIA CUDA oder Apple Metal' },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-gray-500 text-xs">{label}</div>
              <div className="text-white text-sm font-medium">{val}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-3">
          Kein Internet-Zugang nötig nach dem Download. Alle Modelle und Daten bleiben lokal.
        </div>
      </div>

      <Step n={1} title="Account erstellen & bezahlen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Gehe zu{' '}
          <a href={`${FT}/register`} target="_blank" rel="noopener noreferrer"
            className="text-purple-400 hover:underline">frame-train.vercel.app/register</a>{' '}
          und erstelle einen Account. Zahle einmalig <strong className="text-white">1,99€</strong> via Stripe.
          Nach der Zahlung erhältst du deinen API-Key der den Download freischaltet.
        </p>
        <InfoBox icon="💡" color="purple">
          <strong className="text-white">Early Access:</strong> 1,99€ sind der günstigste Einstiegspreis.
          Mit zukünftigen Feature-Updates steigt der Preis. Lebenslanger Zugang inklusive aller Updates.
        </InfoBox>
      </Step>

      <Step n={2} title="App herunterladen & installieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Gehe zu{' '}
          <a href={`${FT}/download`} target="_blank" rel="noopener noreferrer"
            className="text-purple-400 hover:underline">frame-train.vercel.app/download</a>{' '}
          und lade die Datei für dein Betriebssystem herunter:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <PlatformCard icon="🍎" name="macOS" file="FrameTrain-universal.dmg" cmd="Ziehe in Applications" />
          <PlatformCard icon="🪟" name="Windows" file="FrameTrain-Setup.msi" cmd="Doppelklick → Installieren" />
          <PlatformCard icon="🐧" name="Linux" file="FrameTrain.AppImage" cmd="chmod +x → Doppelklick" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          <strong className="text-white">macOS:</strong> Beim ersten Start zeigt Gatekeeper „beschädigt" —
          das ist normal. Quarantäne im Terminal entfernen:
        </p>
        <CodeBlock lang="bash" code={`sudo xattr -cr "/Applications/FrameTrain 2.app"
# Gib dein macOS-Passwort ein (wird nicht angezeigt)`} />
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          <strong className="text-white">Windows:</strong> SmartScreen zeigt Warnung → „Weitere Informationen" →
          „Trotzdem ausführen". Alternativ: Rechtsklick auf Datei → Eigenschaften → „Zulassen" aktivieren.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          <strong className="text-white">Linux:</strong> FUSE erforderlich:
        </p>
        <CodeBlock lang="bash" code={`# Ubuntu 22.04+
sudo apt install libfuse2t64

# Ubuntu 20.04
sudo apt install libfuse2

# AppImage ausführbar machen
chmod +x FrameTrain.2_*.AppImage
./FrameTrain.2_*.AppImage`} />
      </Step>

      <Step n={3} title="API Key eingeben">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Beim ersten Start fordert FrameTrain deinen API Key. Du findest ihn im Web-Dashboard unter{' '}
          <a href={`${FT}/dashboard`} target="_blank" rel="noopener noreferrer"
            className="text-purple-400 hover:underline">frame-train.vercel.app/dashboard</a>.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Der Key hat das Format <code className="font-mono text-purple-300">ft_xxxxxxxxxxxxxxxx</code>.
          Paste ihn in das Eingabefeld und klicke <strong className="text-white">Verifizieren</strong>.
          Die App verbindet sich einmalig zur Verifizierung und arbeitet danach vollständig offline.
        </p>
      </Step>

      <Step n={4} title="Modell importieren (HuggingFace)">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Klicke auf <strong className="text-white">Neues Projekt → Modell importieren</strong>.
          Du hast zwei Optionen:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="card bg-purple-500/5 border-purple-500/15">
            <div className="font-semibold text-white text-sm mb-1">🤗 HuggingFace Hub</div>
            <div className="text-gray-400 text-xs leading-relaxed">
              Gib den Modell-Slug ein, z.B.{' '}
              <code className="font-mono text-purple-300">microsoft/phi-2</code> oder{' '}
              <code className="font-mono text-purple-300">mistralai/Mistral-7B-v0.1</code>.
              FrameTrain lädt das Modell herunter.
            </div>
          </div>
          <div className="card bg-blue-500/5 border-blue-500/15">
            <div className="font-semibold text-white text-sm mb-1">📁 Lokal</div>
            <div className="text-gray-400 text-xs leading-relaxed">
              Wähle einen lokalen Ordner mit einem PyTorch-Modell
              (<code className="font-mono text-blue-300">.bin</code>,{' '}
              <code className="font-mono text-blue-300">.safetensors</code>).
            </div>
          </div>
        </div>
        <InfoBox icon="💡" color="blue">
          Für den Quickstart empfehlen wir kleine Modelle:
          <strong className="text-white"> GPT-2</strong> (117 M Parameter, schnell) oder{' '}
          <strong className="text-white">microsoft/phi-2</strong> (2,7 B, gut für Text-Tasks).
          Große Modelle wie Llama-7B benötigen 16+ GB RAM.
        </InfoBox>
      </Step>

      <Step n={5} title="Datensatz laden">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Klicke auf <strong className="text-white">Datensatz</strong>. Unterstützte Formate:
        </p>
        <div className="grid sm:grid-cols-3 gap-2 mb-3">
          {[
            { fmt: 'CSV', example: 'text,label\n"Hallo Welt",0' },
            { fmt: 'JSON', example: '[{"text": "...", "label": 0}]' },
            { fmt: 'JSONL', example: '{"text": "...", "label": 0}\n{"text": "..."}' },
          ].map((item) => (
            <div key={item.fmt} className="card bg-black/20 text-center">
              <code className="text-purple-300 font-mono font-bold text-sm">.{item.fmt.toLowerCase()}</code>
              <pre className="text-gray-600 text-xs mt-2 text-left overflow-x-auto">{item.example}</pre>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Alternativ: Klicke auf <strong className="text-white">HuggingFace Datasets</strong> und gib
          z.B. <code className="font-mono text-purple-300">imdb</code> oder{' '}
          <code className="font-mono text-purple-300">squad</code> ein.
        </p>
      </Step>

      <Step n={6} title="Training konfigurieren & starten">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Passe die Training-Parameter an. Empfohlene Einstellungen für den Start:
        </p>
        <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Parameter</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Quickstart</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Erklärung</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Methode', 'LoRA', 'Effizient auch mit wenig VRAM'],
                ['LoRA Rank', '8', 'Niedrig = schneller, Hoch = besser'],
                ['Epochen', '3', 'Durchläufe über den Datensatz'],
                ['Batch Size', '4', 'Kleiner = weniger RAM'],
                ['Learning Rate', '2e-4', 'Gut für LoRA Fine-Tuning'],
                ['Precision', 'FP16', 'Halbiert Speicherbedarf'],
              ].map(([p, v, e]) => (
                <tr key={p} className="border-b border-white/[0.04]">
                  <td className="py-2 px-4 text-gray-300 text-xs font-mono">{p}</td>
                  <td className="py-2 px-4 text-purple-300 text-xs font-mono">{v}</td>
                  <td className="py-2 px-4 text-gray-500 text-xs">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Klicke <strong className="text-white">Training starten</strong>. Das Live-Dashboard zeigt
          Loss, Accuracy und Trainingsgeschwindigkeit in Echtzeit.
        </p>
        <InfoBox icon="⏱️" color="purple">
          Trainingszeit hängt stark von Modellgröße und Hardware ab. GPT-2 auf einer RTX 3070:
          ca. <strong className="text-white">5–10 Minuten</strong> für 3 Epochen mit 1.000 Samples.
        </InfoBox>
      </Step>

      <Step n={7} title="Modell exportieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Nach dem Training: Klicke <strong className="text-white">Exportieren</strong>. Wähle das Format:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          {[
            { fmt: 'SafeTensors', desc: 'Empfohlen — sicher und schnell ladbar', icon: '🔒' },
            { fmt: 'GGUF', desc: 'Für llama.cpp und lokale LLM-Server', icon: '🦙' },
            { fmt: 'PyTorch (.bin)', desc: 'Maximale Kompatibilität', icon: '🔥' },
          ].map((item) => (
            <div key={item.fmt} className="card flex-1">
              <span className="text-xl">{item.icon}</span>
              <div className="font-semibold text-white text-sm mt-2">{item.fmt}</div>
              <div className="text-gray-500 text-xs">{item.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Das exportierte Modell liegt unter <code className="font-mono text-purple-300">~/FrameTrain/exports/</code> und
          kann direkt in andere Projekte integriert werden.
        </p>
      </Step>

      {/* Loss-Kurven verstehen */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Loss-Kurve verstehen
      </h2>
      <div className="space-y-3 mb-8">
        {[
          { icon: '✅', t: 'Training-Loss sinkt, Val-Loss sinkt', d: 'Perfekt — das Modell lernt und generalisiert.' },
          { icon: '⚠️', t: 'Training-Loss sinkt, Val-Loss steigt', d: 'Overfitting — reduziere Epochen oder erhöhe Regularisierung.' },
          { icon: '❌', t: 'Training-Loss bleibt hoch', d: 'Learning Rate zu niedrig oder zu hohe Batch Size für verfügbaren VRAM.' },
          { icon: '⚡', t: 'Loss-Spikes (plötzliche Ausreißer)', d: 'Learning Rate zu hoch — halbiere sie. Oder korrupte Samples im Datensatz.' },
        ].map((item, i) => (
          <div key={i} className="card flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm">{item.t}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Nächste Schritte */}
      <div className="card bg-purple-500/5 border-purple-500/15">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/frametrain-lora" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> LoRA Fine-Tuning vertieft: Rank, Alpha, Target Modules
          </Link>
          <Link to="/developers/tutorials/frametrain-dataset" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-blue-400">→</span> Datensätze aufbereiten — Formate und Best Practices
          </Link>
          <Link to="/developers/tutorials/frametrain-export" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-green-400">→</span> Modell exportieren und in App integrieren
          </Link>
          <a href={`${FT}/docs/ai-training-guide`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-pink-400">→</span> KI Training Coach — ML-Grundlagen kostenlos
          </a>
        </div>
      </div>
    </TutorialPage>
  );
}
