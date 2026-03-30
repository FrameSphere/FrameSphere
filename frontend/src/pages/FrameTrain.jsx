import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, CheckCircle, ArrowRight, Lock, Download, Cpu, Database,
  Shield, ExternalLink, Zap, BarChart3, Package, Sparkles,
  ChevronDown, ChevronUp, BookOpen, Code, Globe, Star
} from 'lucide-react';

/* ─── Inline FrameTrain SVG Icon (exaktes Favicon) ───────────────────────── */
const FrameTrainIcon = ({ size = 40 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
    <defs>
      <linearGradient id="ft-g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#ft-g1)" />
    <text x="16" y="23" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900"
      fill="white" textAnchor="middle">F</text>
  </svg>
);

/* ─── FAQ data ────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Kann ich LLMs mit FrameTrain fine-tunen?',
    a: 'Ja. FrameTrain unterstützt das Fine-Tuning von LLMs via LoRA und QLoRA. Modelle wie Llama, Mistral oder Phi können direkt aus HuggingFace importiert und auf eigene Datensätze angepasst werden.',
  },
  {
    q: 'Welche GPUs werden unterstützt?',
    a: 'NVIDIA-GPUs ab GTX 10-Serie (CUDA) sowie Apple Silicon M1/M2/M3/M4 via Metal Performance Shaders (MPS). Auch rein CPU-basiertes Training ist möglich, aber deutlich langsamer.',
  },
  {
    q: 'Was ist der Unterschied zu Google Colab oder AWS SageMaker?',
    a: 'FrameTrain läuft vollständig lokal. Es entstehen keine Cloud-Kosten, deine Daten werden nicht hochgeladen und du bist nicht auf Internet angewiesen. 1,99€ einmalig statt monatlicher Cloud-Rechnungen.',
  },
  {
    q: 'Brauche ich Programmierkenntnisse?',
    a: 'Nein. FrameTrain ist als grafische Desktop-Anwendung konzipiert. Training konfigurierst du über eine intuitive UI — ohne Code. Fortgeschrittene können zusätzlich Konfigurationsdateien nutzen.',
  },
  {
    q: 'Unterstützt FrameTrain LoRA-Training?',
    a: 'Ja, LoRA (Low-Rank Adaptation) ist vollständig integriert. LoRA-Rank, Alpha und Target-Module sind direkt in der App konfigurierbar — ermöglicht Fine-Tuning auch auf GPUs mit wenig VRAM.',
  },
  {
    q: 'Warum kostet FrameTrain nur 1,99€?',
    a: 'FrameTrain befindet sich aktuell in der Early-Access-Phase. Der Preis ist bewusst niedrig gehalten, damit möglichst viele Entwickler und Forscher Zugang bekommen. Mit zukünftigen Feature-Updates wird der Preis steigen.',
  },
  {
    q: 'Läuft FrameTrain auf Apple M1/M2/M3/M4?',
    a: 'Ja. FrameTrain unterstützt Apple Silicon nativ über Metal Performance Shaders (MPS). Modelle werden auf der GPU des M-Chips beschleunigt, ohne CUDA zu benötigen.',
  },
  {
    q: 'Welche Modellformate werden unterstützt?',
    a: 'PyTorch-Modelle (.pt, .bin), SafeTensors sowie GGUF-Format. Modelle können direkt von HuggingFace Hub importiert oder lokal geladen werden.',
  },
  {
    q: 'Kann ich eigene Datensätze verwenden?',
    a: 'Ja. CSV, JSON und JSONL-Dateien werden unterstützt, ebenso Datensätze direkt vom HuggingFace Datasets Hub.',
  },
  {
    q: 'Unterstützt FrameTrain Mixed Precision und Gradient Checkpointing?',
    a: 'Ja. FP16 und BF16 Mixed Precision Training sind vollständig unterstützt, ebenso Gradient Checkpointing für speichereffizientes Training auf GPUs mit wenig VRAM.',
  },
];

/* ─── Training Coach Chapters ─────────────────────────────────────────────── */
const coachChapters = [
  { n: '01', emoji: '🧠', title: 'ML Grundlagen', desc: 'Transformer, Attention, was ist ein Modell?' },
  { n: '02', emoji: '📊', title: 'Training verstehen', desc: 'Loss, Epochen, Batch Size erklärt' },
  { n: '03', emoji: '📈', title: 'Trainingsverlauf lesen', desc: 'Loss-Kurven, Overfitting erkennen' },
  { n: '04', emoji: '🩺', title: 'Diagnose & Fixes', desc: 'Loss-Spikes, divergierendes Training beheben' },
  { n: '05', emoji: '⚙️', title: 'Hyperparameter', desc: 'Learning Rate, Warmup, Weight Decay' },
  { n: '06', emoji: '🔧', title: 'Fine-Tuning Methoden', desc: 'LoRA, QLoRA, Full Fine-Tuning im Vergleich' },
  { n: '07', emoji: '📦', title: 'Dataset-Mastery', desc: 'Daten aufbereiten, Formate, Best Practices' },
  { n: '08', emoji: '🚀', title: 'Fortgeschrittene Techniken', desc: 'Gradient Checkpointing, Mixed Precision, PEFT' },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const FrameTrain = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { icon: <Lock className="w-5 h-5" />, title: '100 % Lokal', desc: 'Alle Daten und Modelle bleiben auf deinem Rechner. Keine Cloud-Übertragung, kein Logging, keine Telemetrie.' },
    { icon: <Brain className="w-5 h-5" />, title: 'HuggingFace-Integration', desc: 'Direkter Zugriff auf tausende vortrainierte Modelle. Ein Klick — Modell importiert.' },
    { icon: <Code className="w-5 h-5" />, title: 'LoRA & QLoRA', desc: 'Konfiguriere Rank, Alpha und Target-Module direkt in der GUI. Fine-Tuning auch mit wenig VRAM.' },
    { icon: <Database className="w-5 h-5" />, title: 'Eigene Datensätze', desc: 'CSV, JSON, JSONL sowie HuggingFace Datasets — alle gängigen Formate werden unterstützt.' },
    { icon: <Download className="w-5 h-5" />, title: 'Modell-Export', desc: 'Exportiere trainierte Modelle als SafeTensors, GGUF oder PyTorch-Format für andere Projekte.' },
    { icon: <Cpu className="w-5 h-5" />, title: 'GPU-Beschleunigung', desc: 'NVIDIA CUDA (GTX 10+) und Apple Metal (M1/M2/M3/M4). Maximale Hardware-Nutzung.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Live Monitoring', desc: 'Training-Metriken in Echtzeit: Loss, Accuracy, Gradient-Normen und mehr.' },
    { icon: <Package className="w-5 h-5" />, title: 'Smart Versioning', desc: 'Automatische Versionierung aller Modell-Checkpoints mit kompletter Trainingshistorie.' },
    { icon: <Shield className="w-5 h-5" />, title: 'DSGVO-konform', desc: 'Privacy by Design. Keine Daten verlassen deinen Computer. Ideal für sensible Unternehmensdaten.' },
  ];

  const useCases = [
    {
      tag: 'NLP',
      title: 'Interne Chatbots & Assistenten',
      desc: 'Fine-Tune ein LLM (Llama, Mistral) auf interne Dokumentation, Handbücher und FAQs. Vertrauliche Daten verlassen niemals deinen Server.',
      keywords: ['LLM Fine-Tuning', 'LoRA', 'DSGVO'],
    },
    {
      tag: 'NLP',
      title: 'Dokumenten-Klassifikation',
      desc: 'Trainiere ein Klassifikationsmodell auf eigene Kategorien — ideal für Recht, Medizin, Versicherung, Buchhaltung.',
      keywords: ['Text Classification', 'PyTorch', 'Transformer'],
    },
    {
      tag: 'LLM',
      title: 'Domänenspezifisches Fine-Tuning',
      desc: 'Passe vortrainierte Sprachmodelle auf Fachsprache an: Medizin, Jura, Technik. Bessere Resultate als General-Purpose-Modelle.',
      keywords: ['Domain Adaptation', 'QLoRA', 'HuggingFace'],
    },
    {
      tag: 'Research',
      title: 'Forschungsprojekte',
      desc: 'Reproduzierbare ML-Experimente ohne Cloud-Abhängigkeit. Volle Kontrolle über Checkpoints und Metriken für Publikationen.',
      keywords: ['Reproducibility', 'Checkpointing', 'PEFT'],
    },
  ];

  const specs = [
    { label: 'Plattformen', val: 'macOS, Windows, Linux' },
    { label: 'GPU-Support', val: 'NVIDIA CUDA (GTX 10+), Apple Metal (M1/M2/M3/M4)' },
    { label: 'Modellformate', val: '.pt, .bin, SafeTensors, GGUF' },
    { label: 'Datensatz-Formate', val: 'CSV, JSON, JSONL, HuggingFace Datasets' },
    { label: 'Fine-Tuning-Methoden', val: 'LoRA, QLoRA, Full Fine-Tuning' },
    { label: 'Precision', val: 'FP32, FP16, BF16 (Mixed Precision)' },
    { label: 'Weitere Features', val: 'Gradient Checkpointing, Warmup, Weight Decay' },
    { label: 'Preis', val: '1,99€ einmalig — lebenslanger Zugang' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">

          {/* Kategorie-Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-purple-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Desktop-App</span>
          </div>

          {/* Icon mit Glow */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/30 rounded-3xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
              <FrameTrainIcon size={96} />
            </div>
          </div>

          {/* Titel */}
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            FrameTrain
          </h1>

          {/* Status + Tags */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">● Live</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> Early Access
            </span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">🍎 macOS</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">🪟 Windows</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">🐧 Linux</span>
          </div>

          {/* Beschreibung */}
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Desktop-App für lokales KI-Modell-Training & Fine-Tuning — HuggingFace, LoRA, GPU-Support, 100 % privat.
          </p>

          {/* Preis-Highlight */}
          <div className="inline-flex items-center gap-4 mb-10 px-6 py-3 glass-effect rounded-2xl border border-purple-500/30">
            <div className="text-left">
              <div className="text-2xl font-black text-white">1,99€</div>
              <div className="text-xs text-gray-400">Einmalige Zahlung</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left">
              <div className="text-sm text-purple-300 font-semibold">Keine Abos</div>
              <div className="text-xs text-gray-500">Alle Updates inklusive</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left">
              <div className="text-sm text-white font-semibold">100 % Lokal</div>
              <div className="text-xs text-gray-500">Keine Cloud</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://frame-train.vercel.app/register" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Jetzt starten — 1,99€</span>
            </a>
            <a href="https://frame-train.vercel.app/download" target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>App herunterladen</span>
            </a>
            <a href="https://frame-train.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* ── Was ist FrameTrain ────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Was ist FrameTrain?</h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>
              FrameTrain ist eine <strong className="text-white">Desktop-App für lokales Machine Learning Training</strong>, die es Data Scientists, ML Engineers und Forschern ermöglicht, KI-Modelle direkt auf der eigenen Hardware zu trainieren — ohne Cloud-Abhängigkeit.
            </p>
            <p>
              Mit nativer <strong className="text-white">HuggingFace-Integration</strong> hast du Zugriff auf tausende vortrainierte Modelle. Per <strong className="text-white">LoRA Fine-Tuning</strong> kannst du sie effizient auf eigene Datensätze anpassen — ob NLP, Computer Vision oder LLM Fine-Tuning. FrameTrain unterstützt gängige <strong className="text-white">PyTorch</strong>- und Transformers-basierte Workflows.
            </p>
            <p>
              Im Gegensatz zu Cloud-Lösungen wie AWS SageMaker, Google Colab oder Paperspace verlassen deine Daten niemals dein Gerät. DSGVO-konform by Design.
            </p>
          </div>
        </div>

        {/* ── Features Grid ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">So funktioniert es</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', icon: <Download className="w-7 h-7" />, title: 'Registrieren & Herunterladen', desc: 'Account erstellen, einmalig 1,99€ bezahlen, Desktop-App herunterladen und installieren.' },
              { n: '02', icon: <Database className="w-7 h-7" />, title: 'Modell & Daten importieren', desc: 'Wähle ein Modell von HuggingFace oder lokal — lade deinen Datensatz als CSV, JSON oder JSONL.' },
              { n: '03', icon: <Zap className="w-7 h-7" />, title: 'Trainieren & Exportieren', desc: 'Parameter konfigurieren, Training starten, Metriken live verfolgen, Modell exportieren.' },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="text-5xl font-black text-purple-500/20 mb-3">{step.n}</div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {step.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Warum lokal ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Warum lokal statt Cloud?</h2>
          <p className="text-gray-400 text-center mb-10">Die Vorteile von lokalem ML-Training gegenüber Cloud-Services</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '💰', title: 'Keine laufenden Kosten', desc: 'Cloud-GPU-Instanzen kosten €0,50–€10+/Stunde. FrameTrain: einmalig 1,99€, unbegrenzt trainieren.' },
              { icon: '🔒', title: 'Maximale Datensicherheit', desc: 'Sensible Daten verlassen niemals deinen Rechner. DSGVO-Konformität ohne Aufwand.' },
              { icon: '⚡', title: 'Volle GPU-Kontrolle', desc: 'Keine geteilten Ressourcen, kein Throttling. 100 % deiner GPU-Kapazität ohne künstliche Limits.' },
              { icon: '📡', title: 'Offline-Betrieb', desc: 'Kein Internet nötig. Trainiere in abgesicherten Netzwerken oder auf Reisen.' },
              { icon: '🔓', title: 'Kein Vendor Lock-in', desc: 'Keine Abhängigkeit von AWS, Google oder Microsoft. Deine Modelle, deine Infrastruktur.' },
              { icon: '🚀', title: 'Schnellere Iteration', desc: 'Kein Upload, kein Instanz-Start. Experimente starten in Sekunden.' },
            ].map((item, i) => (
              <div key={i} className="card">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use Cases ─────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Typische Anwendungsfälle</h2>
          <p className="text-gray-400 text-center mb-10">FrameTrain wird von Entwicklern, Forschern und Unternehmen weltweit eingesetzt</p>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <div key={i} className="card">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
                  {uc.tag}
                </span>
                <h3 className="font-bold text-white mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.keywords.map((kw) => (
                    <span key={kw} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500 font-mono">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KI Training Coach ─────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 border-violet-500/20">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/15 border border-violet-400/25 rounded-full text-violet-300 text-xs font-semibold mb-4">
                <Brain className="w-3.5 h-3.5" />
                Kostenlose Ressource
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                KI-Training Coach ✨
              </h2>
              <p className="text-gray-400 mb-5 leading-relaxed">
                Neu zu ML? Kämpfst du mit Overfitting, Loss-Spikes oder LoRA-Konfiguration? Der kostenlose Guide erklärt alles — von Grundlagen bis zu fortgeschrittenen Techniken.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mb-6">
                {[
                  '🧠 ML-Grundlagen & Transformer',
                  '📈 Loss-Kurven lesen & verstehen',
                  '🩺 Overfitting & Underfitting fixen',
                  '🔧 LoRA & QLoRA im Detail',
                  '⚙️ Hyperparameter-Coaching',
                  '📦 Dataset-Mastery',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://frame-train.vercel.app/docs/ai-training-guide" target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Zum Training Coach</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            {/* Chapter pills */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="space-y-2">
                {coachChapters.map((ch) => (
                  <a key={ch.n} href={`https://frame-train.vercel.app/docs/ai-training-guide`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 glass-effect rounded-xl hover:border-violet-400/30 hover:bg-violet-500/5 transition-all group">
                    <span className="text-gray-600 text-xs font-mono">{ch.n}</span>
                    <span className="text-base">{ch.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors truncate">{ch.title}</div>
                      <div className="text-gray-600 text-xs truncate">{ch.desc}</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Technische Spezifikationen ────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Technische Spezifikationen</h2>
          <div className="space-y-3">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-3 border-b border-white/5 last:border-0">
                <span className="text-gray-400 text-sm sm:w-48 flex-shrink-0">{spec.label}</span>
                <span className="text-white text-sm font-medium">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Preise ────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Preis</h2>
          <p className="text-gray-400 text-center mb-10">Einmalige Zahlung. Lebenslanger Zugang. Keine Abos.</p>
          <div className="max-w-md mx-auto">
            <div className="card border-purple-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-purple-500 to-pink-500 text-white text-xs font-semibold">
                Early Access
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">1,99€</div>
                <div className="text-gray-400 text-sm">Einmalige Zahlung • Alle Updates inklusive</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Voller Zugang zur Desktop-App',
                  'Unbegrenzte Modelle & Trainings',
                  'Alle zukünftigen Updates',
                  'GPU-Beschleunigung (CUDA + Metal)',
                  'HuggingFace-Integration',
                  'LoRA & QLoRA Fine-Tuning',
                  'Community Support',
                  'Lokale Datenverarbeitung — 100 % DSGVO',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="https://frame-train.vercel.app/register" target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full block text-center py-3">
                Jetzt für 1,99€ starten
              </a>
              <p className="text-xs text-gray-500 text-center mt-3">Preis steigt mit zukünftigen Feature-Updates. Early Access sichern.</p>
            </div>
          </div>
        </div>

        {/* ── Dokumentation ─────────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            Dokumentation & Guides
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚀', title: 'Quick Start', desc: 'Erstes Modell in 5 Minuten', href: 'https://frame-train.vercel.app/docs' },
              { icon: '🔧', title: 'LoRA Fine-Tuning', desc: 'Große Modelle mit wenig VRAM', href: 'https://frame-train.vercel.app/guides/lora-finetuning' },
              { icon: '📦', title: 'Datasets', desc: 'Formate und Best Practices', href: 'https://frame-train.vercel.app/docs' },
              { icon: '⚡', title: 'Performance', desc: 'Training für Geschwindigkeit optimieren', href: 'https://frame-train.vercel.app/docs' },
            ].map((doc, i) => (
              <a key={i} href={doc.href} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 hover:bg-white/10 hover:border-primary-500/50 transition-all group">
                <div className="text-2xl mb-2">{doc.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{doc.title}</div>
                <div className="text-gray-500 text-xs">{doc.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <button className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-white">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <div className="flex justify-center mb-4">
            <FrameTrainIcon size={56} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">KI-Modelle lokal trainieren</h2>
          <p className="text-gray-400 mb-2 max-w-md mx-auto">FrameTrain ist kostenlos herunterladbar. Einmalig 1,99€ — lebenslanger Zugang, alle Updates inklusive.</p>
          <p className="text-purple-300 font-semibold mb-6 text-sm">Verfügbar für macOS, Windows und Linux.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://frame-train.vercel.app/register" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Jetzt starten — 1,99€</span>
            </a>
            <a href="https://frame-train.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>frame-train.vercel.app</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FrameTrain;
