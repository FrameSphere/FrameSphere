import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, CheckCircle, Copy, Check,
  ChevronDown, ChevronUp, Zap, Code, Search, Database,
  BarChart3, Star, Globe, Layers,
} from 'lucide-react';
import { KeyScopeIcon } from '../components/ProductIcons';

/* ─── Parallax hook ──────────────────────────────────────────────────────── */
function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handle = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [speed]);
  return offset;
}

/* ─── Animated keyword chip ─────────────────────────────────────────────── */
function KwChip({ word, delay = 0, type = 'kw' }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const base = 'inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-500 ';
  const styles = type === 'kw'
    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    : 'bg-violet-500/20 text-violet-300 border border-violet-500/30';
  return (
    <span className={base + styles + (visible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-2')}>
      {word}
    </span>
  );
}

/* ─── Code block ─────────────────────────────────────────────────────────── */
function CodeBlock({ code, lang = '' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mb-4">
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

/* ─── FAQ item ────────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card cursor-pointer" onClick={() => setOpen(o => !o)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-white text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </div>
      {open && <p className="text-gray-400 text-sm mt-3 leading-relaxed border-t border-white/5 pt-3">{a}</p>}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
const KeyScopePage = () => {
  const parallax = useParallax(0.15);
  const heroRef = useRef(null);

  const features = [
    { icon: <Search className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400', title: 'TF-IDF Algorithm', desc: 'Branchenerprobter statistischer Algorithmus — kalibrierbar mit deinen eigenen Trainingsdokumenten für domänenspezifische Gewichtungen.' },
    { icon: <Zap className="w-5 h-5" />, color: 'bg-violet-500/20 text-violet-400', title: 'AI-Powered Mode', desc: 'Pro-Feature: Semantic Keyword Extraction via feinabgestimmtem HuggingFace-Modell. Geht über reine Frequenzanalyse hinaus.' },
    { icon: <Layers className="w-5 h-5" />, color: 'bg-fuchsia-500/20 text-fuchsia-400', title: 'Longtail Phrases', desc: 'Gewichtetes Bigram & Trigram-System. Jede Longtail-Phrase wird nach semantischer Relevanz gescored — nicht nur nach Häufigkeit.' },
    { icon: <Database className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400', title: 'Custom Profiles', desc: 'Erstelle separate Analyse-Profile für verschiedene Projekte, Nischen oder Sprachen — mit je eigenen trainierten Gewichtungen.' },
    { icon: <BarChart3 className="w-5 h-5" />, color: 'bg-violet-500/20 text-violet-400', title: 'Ignore Listen', desc: 'Blockiere Wörter, die du nie in deinem Output haben willst. Manuell hinzufügen oder aus fertigen Nischen-Templates importieren.' },
    { icon: <Code className="w-5 h-5" />, color: 'bg-fuchsia-500/20 text-fuchsia-400', title: 'REST API', desc: 'Text senden, Keywords zurückbekommen. Bearer-Token-Auth, alle Sprachen, alle Profiles — in jeden Workflow integrierbar.' },
    { icon: <Globe className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400', title: '5 Sprachen', desc: 'Vollständige Unterstützung für Deutsch, Englisch, Französisch, Spanisch und Italienisch in beiden Analyse-Modi.' },
    { icon: <Star className="w-5 h-5" />, color: 'bg-violet-500/20 text-violet-400', title: 'Analyse-Verlauf', desc: 'Pro: Alle vergangenen Analysen gespeichert, durchsuchbar, vergleichbar. Perfekt um Keyword-Trends über Zeit zu verfolgen.' },
    { icon: <CheckCircle className="w-5 h-5" />, color: 'bg-fuchsia-500/20 text-fuchsia-400', title: 'Meta Descriptions', desc: 'Aus jedem Analyse-Call wird automatisch eine SEO-optimierte Meta Description generiert — direkt verwendbar.' },
  ];

  const steps = [
    { n: '01', title: 'Profil erstellen', desc: 'Wähle ein Template oder starte von Scratch. Sprache und Nische festlegen.' },
    { n: '02', title: 'Algorithmus trainieren', desc: 'Lade deine besten Texte hoch. Der Motor berechnet Wortgewichtungen aus deinem Content.' },
    { n: '03', title: 'Text analysieren', desc: 'Text einfügen oder API aufrufen. Sofort Keywords + Longtails zurückbekommen.' },
    { n: '04', title: 'In CMS integrieren', desc: 'REST API direkt in WordPress, Strapi, Contentful o.ä. einbinden — vollautomatisch.' },
  ];

  const apiExample = `curl -X POST https://keyscope-worker.karol-paschek.workers.dev/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "SEO Best Practices 2025",
    "content": "...",
    "lang": "de",
    "profile_id": "prof_abc123",
    "keyword_count": 15,
    "longtail_count": 10
  }'`;

  const apiResponse = `{
  "keywords": [
    "seo strategie", "keyword recherche",
    "backlinks", "on-page optimierung", ...
  ],
  "longtailKeywords": [
    "seo strategie für einsteiger",
    "keyword recherche 2025",
    "on-page optimierung checklist", ...
  ],
  "metaDescription": "Entdecke die besten SEO-Strategien..."
}`;

  const jsExample = `// JavaScript – KeyScope API Integration
const response = await fetch(
  'https://keyscope-worker.karol-paschek.workers.dev/analyze',
  {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.KEYSCOPE_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Mein Artikel',
      content: articleText,
      lang: 'de',
      keyword_count: 15,
      longtail_count: 10,
    }),
  }
);

const { keywords, longtailKeywords, metaDescription } = await response.json();`;

  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: '/Monat',
      highlight: false,
      features: ['20 Analysen / Tag', 'Bis zu 10 Keywords + 10 Longtails', '3 Keyword-Profile', '5 Sprachen (DE, EN, FR, ES, IT)', 'Pre-built Templates', 'REST API Zugang', 'Training bis 20 Dokumente'],
      missing: ['AI Model Mode', 'Vollständiger Verlauf', 'Prioritäts-Support'],
      cta: 'Kostenlos starten',
    },
    {
      name: 'Pro',
      price: '€9',
      period: '/Monat',
      badge: 'Beliebt',
      highlight: true,
      features: ['500 Analysen / Tag', 'Bis zu 50 Keywords + 50 Longtails', '50 Profile', '5 Sprachen', 'Pre-built Templates', 'REST API Zugang', 'Training bis 200 Dokumente', 'AI Model Mode (HuggingFace)', 'Vollständiger Verlauf', 'Prioritäts-Support'],
      missing: [],
      cta: 'Pro starten',
      note: 'Bei jährlicher Zahlung: €7,49/Monat (20% Rabatt)',
    },
  ];

  const faqs = [
    { q: 'Was zählt als eine Analyse?', a: 'Jeder Aufruf des /analyze Endpunkts — egal ob über die UI oder die API — zählt als eine Analyse. Das Ergebnis enthält Keywords, Longtail-Phrasen und eine Meta Description.' },
    { q: 'Was ist Profil-Training?', a: 'Du lädst ein Corpus aus Beispieltexten deiner Nische hoch (z.B. 20 Blog-Posts). KeyScope führt TF-IDF auf ihnen durch, um zu lernen welche Wörter in deiner Domain selten und wertvoll sind. Diese Gewichtungen werden auf alle nachfolgenden Analysen mit diesem Profil angewendet.' },
    { q: 'Was ist der AI-Modus?', a: 'Anstelle des algorithmischen TF-IDF-Modells wird dein Text an ein feinabgestimmtes HuggingFace-Modell gesendet, das Keywords und Longtails zurückgibt. Das ist ein Pro-Only-Feature. Ergebnisse können sich in Stil und Abdeckung vom Algorithmus unterscheiden.' },
    { q: 'Welche Sprachen werden unterstützt?', a: 'Deutsch, Englisch, Französisch, Spanisch und Italienisch — in beiden Modi (Algorithmus und AI).' },
    { q: 'Kann ich jederzeit upgraden oder downgraden?', a: 'Ja. Planänderungen werden sofort wirksam. Beim Downgrade bleiben deine Daten erhalten, der Zugang zu Pro-Features wird aber eingestellt.' },
    { q: 'Rollen nicht genutzte Analysen über?', a: 'Nein. Tägliche Limits werden um Mitternacht UTC zurückgesetzt.' },
  ];

  /* ─ Keywords für Live-Demo ──── */
  const demoKeywords = ['brawl stars','brawlers','multiplayer','game modes','gem grab','seasonal','abilities','showdown'];
  const demoLongtails = ['mobile multiplayer game','unique brawler abilities','seasonal game updates'];

  return (
    <div className="min-h-screen overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — mit Parallax-Background
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-32 px-4 overflow-hidden">

        {/* Parallax glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${parallax}px)` }}>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #D946EF 0%, transparent 70%)' }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <KeyScopeIcon size={48} />
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">KeyScope</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">Live</span>
                    <span className="text-xs text-gray-500">keyscope.pages.dev</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                Die Keywords
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  die wirklich ranken.
                </span>
              </h1>

              <p className="text-lg text-gray-400 mb-4 leading-relaxed max-w-xl">
                KeyScope analysiert deinen Content mit einem custom-tuned TF-IDF-Algorithmus <em>oder</em> AI-Modell —
                und gibt gerankte Keywords, Longtail-Phrases und Meta Descriptions zurück. Via UI oder API.
              </p>
              <p className="text-sm text-gray-500 mb-10 max-w-xl">
                Trainiere den Algorithmus mit deinen eigenen Texten. 5 Sprachen. REST API inklusive. Kostenlos starten.
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-10">
                {[
                  { val: '20/Tag', label: 'Kostenlos' },
                  { val: '5', label: 'Sprachen' },
                  { val: '500/Tag', label: 'Pro Plan' },
                  { val: 'TF-IDF + AI', label: 'Zwei Modi' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold text-white">{s.val}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://keyscope.pages.dev/" target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Kostenlos starten</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://keyscope.pages.dev/docs/quickstart" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>API Docs</span>
                </a>
              </div>
            </div>

            {/* Right: Live Demo Widget */}
            <div className="card border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-gray-600 ml-2 font-mono">keyscope • live analyse</span>
              </div>

              <p className="text-xs text-gray-500 font-mono mb-2">Input Text →</p>
              <p className="text-sm text-gray-400 italic mb-5 leading-relaxed border-l-2 border-blue-500/30 pl-3">
                "Brawl Stars is one of the most popular mobile multiplayer games,
                featuring over 70 unique brawlers with different abilities, game modes
                like Gem Grab and Showdown, and regular seasonal updates..."
              </p>

              <p className="text-xs text-gray-500 font-mono mb-2">Keywords →</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {demoKeywords.map((kw, i) => (
                  <KwChip key={kw} word={kw} delay={i * 80} type="kw" />
                ))}
              </div>

              <p className="text-xs text-gray-500 font-mono mb-2">Longtail Phrases →</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {demoLongtails.map((lt, i) => (
                  <KwChip key={lt} word={lt} delay={700 + i * 100} type="lt" />
                ))}
              </div>

              <p className="text-xs text-gray-500 font-mono mb-2">Meta Description →</p>
              <div className="text-xs text-gray-300 bg-dark-900/60 rounded-lg p-3 border border-white/5 leading-relaxed">
                "Entdecke Brawl Stars — das beliebte mobile Multiplayer-Spiel mit über 70 einzigartigen Brawlern,
                diversen Spielmodi und regelmäßigen Season-Updates."
                <span className="text-gray-600 ml-2">156 Zeichen ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 block">Features</span>
            <h2 className="text-4xl font-bold text-white mb-4">Alles für bessere SEO-Keywords</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Gebaut auf jahrelanger realer Keyword-Analyse — jetzt als produktreifes Tool, das du anpassen und automatisieren kannst.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS — Parallax Streifen
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Animated gradient band */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(135deg, #2563EB 25%, transparent 25%), linear-gradient(225deg, #7C3AED 25%, transparent 25%)',
              backgroundSize: '80px 80px',
              transform: `translateX(${parallax * 0.2}px)`,
            }} />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-3 block">Workflow</span>
            <h2 className="text-4xl font-bold text-white">Von Text zu Keywords in Sekunden</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-500/20 via-violet-500/30 to-fuchsia-500/20" />
            {steps.map((s, i) => (
              <div key={i} className="text-center relative group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold mx-auto mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #1e2a4a, #2a1e4a)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-black text-lg">{s.n}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          API SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-3 block">API</span>
              <h2 className="text-4xl font-bold text-white mb-5">Für Entwickler gebaut</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Sende beliebigen Text an die REST API und erhalte strukturierte Keyword-Daten zurück.
                Trainiertes Profil angeben, Anzahl setzen, in jeden Stack integrieren — headless CMS,
                custom Scripts, automatisierte Content-Pipelines.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'REST API mit Bearer Token Auth',
                  'Profil-spezifische trainierte Gewichtungen',
                  'Algorithmus + AI-Modus via API',
                  'Rate Limits: 20/Tag kostenlos · 500/Tag Pro',
                  '5 Sprachen: DE, EN, FR, ES, IT',
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <div className="glass-effect rounded-xl p-4 border border-blue-500/20">
                <div className="text-xs text-gray-500 mb-1 font-mono">API Endpunkt</div>
                <code className="text-blue-300 text-sm font-mono break-all">
                  POST https://keyscope-worker.karol-paschek.workers.dev/analyze
                </code>
              </div>
            </div>

            <div className="space-y-3">
              <CodeBlock lang="cURL" code={apiExample} />
              <CodeBlock lang="JSON Response" code={apiResponse} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          JS INTEGRATION BEISPIEL
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">JavaScript Integration</h3>
          <CodeBlock lang="JavaScript / Node.js" code={jsExample} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PREISE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Subtle parallax glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${-parallax * 0.1}px)` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 block">Preise</span>
            <h2 className="text-4xl font-bold text-white mb-4">Einfach & transparent</h2>
            <p className="text-gray-400">Starte kostenlos. Upgrade wenn du bereit bist.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`card relative flex flex-col transition-all duration-300 hover:scale-[1.02] ${plan.highlight ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-1 rounded-full text-xs font-semibold">{plan.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  {plan.note && <p className="text-xs text-emerald-400 mt-1">{plan.note}</p>}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                  {plan.missing.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 text-sm line-through">
                      <div className="w-4 h-4 flex-shrink-0 opacity-40">✗</div> {f}
                    </li>
                  ))}
                </ul>

                <a href="https://keyscope.pages.dev/register" target="_blank" rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-lg font-bold text-sm transition-all ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Vergleichstabelle */}
          <div className="mt-12 card overflow-hidden">
            <h3 className="font-bold text-white mb-6">Planvergleich</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-semibold">Free</th>
                    <th className="text-center py-3 px-4 text-blue-300 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    ['Analysen / Tag', '20', '500'],
                    ['Keywords pro Ergebnis', 'bis 10', 'bis 50'],
                    ['Longtail-Phrases', 'bis 10', 'bis 50'],
                    ['Profile', '3', '50'],
                    ['Sprachen', '5', '5'],
                    ['REST API', '✓', '✓'],
                    ['Templates', '✓', '✓'],
                    ['Profil-Training', 'bis 20 Docs', 'bis 200 Docs'],
                    ['AI Model Modus', '—', '✓'],
                    ['Analyse-Verlauf', 'begrenzt', 'vollständig'],
                    ['Support', 'Community', 'Priorität'],
                  ].map(([feat, free, pro], i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-3 pr-6 text-gray-400">{feat}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{free}</td>
                      <td className="py-3 px-4 text-center text-blue-400 font-medium">{pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.08))' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ transform: `translateY(${-parallax * 0.05}px)` }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20"
                style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }} />
            </div>
            <div className="relative">
              <KeyScopeIcon size={56} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Bessere Keywords. <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Heute.</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Keine Kreditkarte. 20 kostenlose Analysen pro Tag — für immer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://keyscope.pages.dev/register" target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Kostenlosen Account erstellen</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://keyscope.pages.dev/docs" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>API Dokumentation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default KeyScopePage;
