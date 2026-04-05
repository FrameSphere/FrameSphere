import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Rocket, Heart, Mail, Github, Globe,
  Zap, Shield, Brain, Sparkles, ArrowRight,
  MapPin, Coffee, Wrench, Package
} from 'lucide-react';

const About = () => {
  const products = [
    {
      emoji: '🔵',
      name: 'FrameSpell API',
      desc: 'KI-gestützte Rechtschreibprüfung für Deutsch, Englisch und mehr — als REST API.',
      color: 'border-blue-500/20 bg-blue-500/5',
      tag: 'text-blue-400',
    },
    {
      emoji: '🔴',
      name: 'RateLimit API',
      desc: 'Rate-Limiting auf Cloudflare Edge — IP-Filter, Analytics, Token Bucket.',
      color: 'border-red-500/20 bg-red-500/5',
      tag: 'text-red-400',
    },
    {
      emoji: '🟣',
      name: 'FrameTrain',
      desc: 'Desktop-App für lokales KI-Training — HuggingFace, LoRA, DSGVO-konform.',
      color: 'border-purple-500/20 bg-purple-500/5',
      tag: 'text-purple-400',
    },
    {
      emoji: '🟡',
      name: 'KeyScope',
      desc: 'TF-IDF Keyword-Analyse SaaS — Keywords, Longtails, Meta-Descriptions.',
      color: 'border-yellow-500/20 bg-yellow-500/5',
      tag: 'text-yellow-400',
    },
    {
      emoji: '🟢',
      name: 'SiteControl',
      desc: 'Website-Management Dashboard — Todos, Blog, Analytics, Changelog.',
      color: 'border-green-500/20 bg-green-500/5',
      tag: 'text-green-400',
    },
    {
      emoji: '⚪',
      name: 'SphereNet & SphereHub',
      desc: 'AI Agent Chains und digitaler Assistent — in aktiver Entwicklung.',
      color: 'border-white/10 bg-white/[0.02]',
      tag: 'text-gray-400',
    },
  ];

  const techStack = [
    { label: 'Frontend', items: 'React · Vite · Next.js · Tailwind CSS' },
    { label: 'Backend', items: 'Cloudflare Workers · Node.js · Python' },
    { label: 'Datenbank', items: 'Cloudflare D1 · Supabase · SQLite' },
    { label: 'Infrastructure', items: 'Cloudflare Pages · Vercel · GitHub Actions' },
    { label: 'ML / AI', items: 'PyTorch · HuggingFace · LoRA · GGUF' },
    { label: 'Tools', items: 'Tauri · Stripe · JWT · bcrypt' },
  ];

  const values = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'Direkt & ohne Bullshit',
      desc: 'Keine aufgeblähten Marketing-Texte. Was ich baue, zeige ich so wie es ist — mit echten Features, echten Preisen, echten Einschränkungen.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Privacy by Design',
      desc: 'Meine Tools — besonders FrameTrain — sind so gebaut, dass deine Daten auf deinem Gerät bleiben. Keine unnötige Telemetrie, keine Cloud-Pflicht.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Gebaut auf dem Edge',
      desc: 'Cloudflare Workers, D1 und Pages sind mein Standard-Stack. Sub-Millisekunden-Latenz, globale Verteilung, keine Server die ich um 3 Uhr nachts neu starten muss.',
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Faire Preise',
      desc: 'Ich weiß was es heißt, selbst Entwickler zu sein und Tools zu nutzen. Kein VC-Druck bedeutet keine überzogenen Preise. 1,99€ für FrameTrain — das meine ich ernst.',
    },
  ];

  const webApps = [
    { name: 'Wordify', desc: 'Wortspiel-App' },
    { name: 'BrawlMystery', desc: 'Brawl Stars Guide' },
    { name: 'SpinSelector / Glücksrad', desc: 'Party-Tool mit Imposter-Modus' },
    { name: 'Traitora', desc: 'Persönlichkeitstest' },
    { name: 'FileFlyr', desc: 'Datei-Konverter' },
    { name: 'FlagGuess', desc: 'Flaggen-Quiz' },
  ];

  const timeline = [
    {
      period: 'Frühjahr 2025',
      title: 'FrameSphere entsteht',
      desc: 'Die Idee: ein zentrales Portal für alle meine Projekte, APIs und Tools. Gebaut mit React, Vite und Cloudflare.',
    },
    {
      period: 'Sommer 2025',
      title: 'FrameSpell API live',
      desc: 'Mein erstes produktives API-Produkt — KI-Rechtschreibprüfung als REST Service auf Cloudflare Workers.',
    },
    {
      period: 'Herbst 2025',
      title: 'KeyScope & RateLimit API',
      desc: 'TF-IDF Keyword-Analyse als vollständiges SaaS (KeyScope) und ein Rate-Limiting-Service auf Cloudflare Edge.',
    },
    {
      period: 'Winter 2025',
      title: 'FrameTrain Early Access',
      desc: 'Desktop-App für lokales KI-Training — Tauri, PyTorch, HuggingFace. Einmalig 1,99€, kein Abo, komplett lokal.',
    },
    {
      period: 'Frühjahr 2026',
      title: 'SiteControl & Manager',
      desc: 'Internes Dashboard-Tool wird zu SiteControl kommerzialisiert. Alle Projekte über ein zentrales HQ verwaltet.',
    },
    {
      period: 'Laufend',
      title: 'SphereNet & SphereHub',
      desc: 'AI Agent Chains und intelligenter Desktop-Assistent — in aktiver Entwicklung.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20 pt-10">
          {/* Avatar / Emoji */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-purple-500/30 rounded-full blur-2xl" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-5xl">
              👨‍💻
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Hi, ich bin <span className="gradient-text">Karol</span>
          </h1>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>Mainz, Deutschland</span>
          </div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Ich bin ein <strong className="text-white">Solo-Entwickler</strong> und baue FrameSphere —
            ein wachsendes Portfolio aus APIs, SaaS-Tools, Desktop-Apps und Web-Projekten.
            Kein Team, kein VC, kein Investor. Nur ich, mein Mac und Cloudflare.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-xl text-sm text-gray-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-xl text-sm text-gray-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> Kontakt
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-xl text-sm text-primary-400 hover:text-primary-300 transition-colors">
              <Package className="w-4 h-4" /> Alle Produkte
            </Link>
          </div>
        </div>

        {/* ── Was ist FrameSphere ───────────────────────────────────────────── */}
        <div className="card mb-8 bg-gradient-to-br from-primary-500/10 to-purple-500/5 border-primary-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Was ist FrameSphere?</h2>
          <div className="text-gray-300 space-y-3 leading-relaxed text-sm">
            <p>
              FrameSphere ist mein persönliches Produktportfolio — eine Sammlung aus APIs, SaaS-Produkten,
              Desktop-Apps und Web-Tools, die ich nebenberuflich und vollständig solo entwickle und betreibe.
              Der Name steht für das, was alle Projekte verbindet: eine gemeinsame Plattform (Sphere) und
              ein konsistentes Fundament (Frame) aus Code, Design und Infrastruktur.
            </p>
            <p>
              Ich baue Dinge, die ich selbst brauche oder interessant finde — und stelle sie dann als
              Produkte zur Verfügung. Manche kosten etwas, manche sind kostenlos. Alle sind so gebaut,
              dass sie ohne riesige Infrastruktur, ohne Team und ohne monatliche Cloud-Rechnungen laufen.
            </p>
          </div>
        </div>

        {/* ── Produkte ─────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Aktuelle Produkte</h2>
          <p className="text-gray-500 text-sm mb-6">APIs, SaaS-Tools und Desktop-Apps — alle solo entwickelt.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p, i) => (
              <div key={i} className={`rounded-xl p-4 border ${p.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className={`font-bold text-sm ${p.tag}`}>{p.name}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Web-Apps ─────────────────────────────────────────────────────── */}
        <div className="card mb-12">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-400" /> Web-Apps
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Neben den API-Produkten betreibe ich mehrere eigenständige Web-Apps:
          </p>
          <div className="flex flex-wrap gap-2">
            {webApps.map((app, i) => (
              <div key={i} className="px-3 py-1.5 glass-effect rounded-lg text-sm">
                <span className="text-white font-medium">{app.name}</span>
                <span className="text-gray-600 ml-1.5 text-xs">{app.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ───────────────────────────────────────────────────── */}
        <div className="card mb-12">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" /> Tech Stack
          </h2>
          <p className="text-gray-500 text-sm mb-4">Was ich täglich nutze:</p>
          <div className="space-y-2">
            {techStack.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2 border-b border-white/[0.05] last:border-0">
                <span className="text-gray-500 text-xs sm:w-28 flex-shrink-0 uppercase tracking-wider">{item.label}</span>
                <span className="text-gray-300 text-sm font-mono">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Meine Werte ──────────────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Wie ich baue</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="card">
                <div className="w-9 h-9 bg-primary-500/15 rounded-lg flex items-center justify-center text-primary-400 mb-3">
                  {v.icon}
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Timeline</h2>
          <div className="relative">
            {/* Linie */}
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/[0.06]" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 pl-2">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 mt-1.5 relative z-10" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 font-mono mb-0.5">{item.period}</div>
                    <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
                    <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Honest Stats ─────────────────────────────────────────────────── */}
        <div className="card mb-12 bg-gradient-to-br from-white/[0.02] to-transparent">
          <h2 className="text-xl font-bold text-white mb-1">Ein paar ehrliche Zahlen</h2>
          <p className="text-gray-600 text-xs mb-5">Keine aufgeplusterten Marketing-Statistiken.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: '1', label: 'Person im Team' },
              { val: '10+', label: 'aktive Projekte' },
              { val: '6+', label: 'Produkte live' },
              { val: '100%', label: 'Cloudflare Edge' },
            ].map(({ val, label }, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black gradient-text">{val}</div>
                <div className="text-gray-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Solo Dev Philosophie ─────────────────────────────────────────── */}
        <div className="card mb-12 border-white/[0.06]">
          <div className="flex items-start gap-3 mb-4">
            <Coffee className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <h2 className="text-xl font-bold text-white">Warum Solo?</h2>
          </div>
          <div className="text-gray-400 text-sm leading-relaxed space-y-3">
            <p>
              Solo zu entwickeln bedeutet: keine Abstimmungsrunden, keine Kompromisse bei
              Technologie-Entscheidungen und keine Abhängigkeit von Investoren, die quarterly growth
              einfordern. Ich kann morgens aufwachen und entscheiden, ein komplett neues Feature zu
              bauen — und es noch am Abend deployen.
            </p>
            <p>
              Das hat natürlich Grenzen. Support-Zeiten sind nicht 24/7, neue Features dauern länger,
              und manchmal liegt ein Bug ein paar Tage länger als mir lieb ist. Das ist der ehrliche
              Trade-off, und ich kommuniziere ihn offen.
            </p>
            <p>
              Was ich dafür biete: Produkte die ich selbst nutze und deshalb wirklich verstehe,
              faire Preise ohne Investor-Renditedruck, und direkten Kontakt — ich bin immer
              erreichbar.
            </p>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/20">
          <Brain className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Frag mich einfach</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Ideen, Feature-Requests, Bug-Reports, Kooperationen — oder einfach nur eine Frage
            zu einem der Produkte. Ich antworte persönlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Kontakt aufnehmen</span>
            </Link>
            <Link to="/products" className="btn-secondary inline-flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4" />
              <span>Alle Produkte ansehen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
