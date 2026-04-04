import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, CheckCircle, X,
  ChevronDown, ChevronUp, Globe, CheckSquare,
  Bell, FileText, Layers, LifeBuoy, BarChart2,
  DollarSign, Search, Users, Star, Zap, Lock,
} from 'lucide-react';
import { SiteControlIcon } from '../components/ProductIcons';

/* ─── Parallax hook ──────────────────────────────────────────────────────── */
function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handle = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [speed]);
  return offset;
}

/* ─── Animated counter ──────────────────────────────────────────────────── */
function AnimCount({ end, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = end / 40;
      const t = setInterval(() => {
        start += step;
        if (start >= end) { setVal(end); clearInterval(t); }
        else setVal(Math.floor(start));
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Dashboard Mock ────────────────────────────────────────────────────── */
const DashboardMock = () => (
  <div className="card border-white/10 overflow-hidden shadow-2xl">
    {/* Browser bar */}
    <div className="flex items-center gap-2 px-4 py-3 bg-dark-700 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <div className="flex-1 max-w-xs mx-auto bg-dark-900/80 rounded px-3 py-1 text-xs text-gray-500 font-mono text-center">
        app.sitecontrol.app/dashboard
      </div>
    </div>

    {/* Dashboard layout */}
    <div className="grid grid-cols-[180px_1fr] gap-0 min-h-[340px] text-xs">
      {/* Sidebar */}
      <div className="bg-dark-800/60 border-r border-white/5 p-3 space-y-1">
        <div className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-3 px-2">Navigation</div>
        {[
          { icon: BarChart2, label: 'Dashboard', active: true },
          { icon: Globe,       label: 'Websites' },
          { icon: CheckSquare, label: 'Todos' },
          { icon: FileText,    label: 'Blog',      pro: true },
          { icon: Layers,      label: 'Changelog', pro: true },
          { icon: LifeBuoy,    label: 'Support',   pro: true },
          { icon: Search,      label: 'Analytics' },
        ].map(item => (
          <div key={item.label} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors
            ${item.active ? 'bg-indigo-500/15 border border-indigo-500/25' : 'hover:bg-white/5'}`}>
            <item.icon size={12} className={item.active ? 'text-indigo-400' : 'text-gray-500'} />
            <span className={`flex-1 ${item.active ? 'text-indigo-300 font-semibold' : 'text-gray-500'}`}>{item.label}</span>
            {item.pro && <span className="text-[9px] font-bold px-1 rounded bg-violet-500/15 text-violet-400 border border-violet-500/25">PRO</span>}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="p-4 space-y-3">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Websites',      val: '8',    color: '#22c55e' },
            { label: 'Offene Todos',  val: '12',   color: '#f59e0b' },
            { label: 'Tickets',       val: '3',    color: '#60a5fa' },
            { label: 'Revenue 30T',   val: '€142', color: '#22c55e' },
          ].map(k => (
            <div key={k.label} className="bg-dark-800/60 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{k.label}</div>
              <div className="text-base font-black" style={{ color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Sites list */}
        <div className="bg-dark-800/40 border border-white/5 rounded-lg p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 font-bold">Website Status</div>
          <div className="space-y-1.5">
            {[
              { name: 'Blog.de',    url: 'blog.de',   ok: true,  color: '#5b6af6' },
              { name: 'Shop GmbH',  url: 'shop.de',   ok: true,  color: '#22c55e' },
              { name: 'Portfolio',  url: 'max.dev',   ok: false, color: '#f59e0b' },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-2 text-[11px]">
                <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: s.color + '22', border: `1px solid ${s.color}44` }}>🌐</div>
                <span className="text-gray-300 font-medium flex-1">{s.name}</span>
                <span className="text-gray-600 font-mono">{s.url}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: s.ok ? '#22c55e' : '#f59e0b' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-dark-800/40 border border-white/5 rounded-lg p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 font-bold">Aktivitäten</div>
          <div className="space-y-1">
            {[
              { icon: '✍️', text: 'Blog-Post "SEO Guide 2025" veröffentlicht', time: '2m' },
              { icon: '🎫', text: 'Neues Support-Ticket #47 von Max M.', time: '18m' },
              { icon: '📋', text: 'Changelog v2.3.1 erstellt', time: '1h' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <span>{a.icon}</span>
                <span className="text-gray-400 flex-1 truncate">{a.text}</span>
                <span className="text-gray-600">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
const SiteControlPage = () => {
  const parallax = useParallax(0.12);

  const features = [
    { icon: <Globe className="w-5 h-5" />,       color: 'bg-indigo-500/20 text-indigo-400',  title: 'Sites im Blick',       free: true,  desc: 'Alle deine Websites auf einen Blick. Status, Fehler, offene Tickets — sofort sichtbar.' },
    { icon: <CheckSquare className="w-5 h-5" />, color: 'bg-indigo-500/20 text-indigo-400',  title: 'Todo-Management',      free: true,  desc: 'Priorisierte Aufgaben pro Website. Fälligkeiten, Wichtigkeits-Flags und Prioritätsstufen.' },
    { icon: <Bell className="w-5 h-5" />,        color: 'bg-indigo-500/20 text-indigo-400',  title: 'Benachrichtigungen',   free: true,  desc: 'Aktivitäts-Feed aller Websites. Fehler, neue Tickets und Updates auf einen Blick.' },
    { icon: <FileText className="w-5 h-5" />,    color: 'bg-violet-500/20 text-violet-400',  title: 'Blog-Verwaltung',      free: false, desc: 'Schreibe, plane und veröffentliche Blog-Posts für alle deine Seiten — mehrsprachig.' },
    { icon: <Layers className="w-5 h-5" />,      color: 'bg-violet-500/20 text-violet-400',  title: 'Changelog-System',     free: false, desc: 'Versionierte Einträge mit Feature, Fix und Breaking-Change-Tags. Automatisch publizierbar.' },
    { icon: <LifeBuoy className="w-5 h-5" />,    color: 'bg-violet-500/20 text-violet-400',  title: 'Support-Tickets',      free: false, desc: 'Kundennachrichten empfangen, beantworten und verwalten — direkt im Dashboard.' },
    { icon: <BarChart2 className="w-5 h-5" />,   color: 'bg-violet-500/20 text-violet-400',  title: 'Analytics',            free: false, desc: 'Pageviews, Geräte-Split, Referrer und Fehler-Logs. Kein externes Tool nötig.' },
    { icon: <DollarSign className="w-5 h-5" />,  color: 'bg-violet-500/20 text-violet-400',  title: 'AdSense-Widget',       free: false, desc: 'Deine Einnahmen der letzten 30 Tage direkt im Dashboard. Mit Sparkline-Chart.' },
    { icon: <Search className="w-5 h-5" />,      color: 'bg-violet-500/20 text-violet-400',  title: 'Search Console',       free: false, desc: 'Klicks, Impressionen, Top-Keywords und Ø-Position aus Google Search Console.' },
  ];

  const testimonials = [
    { name: 'Markus B.', role: 'Indie Developer', color: '#5b6af6', text: 'Ich verwalte 8 Websites. Früher hatte ich 8 Tabs mit verschiedenen Tools offen — jetzt alles in SiteControl.' },
    { name: 'Julia K.', role: 'Freelance Webdesignerin', color: '#22c55e', text: 'Das Blog-System spart mir täglich 30 Minuten. Alle Posts für alle Kunden-Seiten an einem Ort.' },
    { name: 'Thomas R.', role: 'SaaS Gründer', color: '#a78bfa', text: 'Support-Tickets und Changelog in einer App — endlich kein Hin-und-her zwischen verschiedenen Tools.' },
  ];

  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: 'für immer',
      highlight: false,
      features: ['Bis zu 3 Websites', 'Dashboard & KPI-Überblick', 'Todo-Management', 'Benachrichtigungen', 'Basic Analytics', '1 Benutzer'],
      missing: ['Blog-Verwaltung', 'Changelog-System', 'Support-Tickets', 'AdSense & GSC-Widgets', 'Teammitglieder'],
      cta: 'Kostenlos starten',
    },
    {
      name: 'Pro',
      price: '€19',
      period: 'pro Monat',
      badge: '⭐ Empfohlen',
      highlight: true,
      features: ['Unbegrenzte Websites', 'Alles aus Free', 'Blog-Verwaltung (mehrsprachig)', 'Changelog-System', 'Support-Ticket-System', 'Vollständige Analytics', 'AdSense & GSC-Widgets', 'Bis zu 5 Teammitglieder', 'Prioritäts-Support'],
      missing: [],
      cta: '14 Tage kostenlos testen',
      note: 'Keine Kreditkarte für Free nötig',
    },
  ];

  const useCases = [
    { icon: '🧑‍💻', title: 'Indie Developer & Freelancer', desc: 'Verwalte alle deine Kundenprojekte, Blog-Posts und Changelogs von einem Dashboard — kein Tool-Chaos mehr.' },
    { icon: '🏢', title: 'Agenturen', desc: 'Zentrales Management für alle Kunden-Websites. Blog, Changelog und Support-Tickets für jeden Client separat.' },
    { icon: '🚀', title: 'SaaS-Gründer', desc: 'Blog + Changelog + Support in einem Tool. Kommuniziere Updates, verwalte Tickets, verfolge Analytics.' },
    { icon: '📝', title: 'Content Creator', desc: 'Plane und veröffentliche mehrsprachige Inhalte über alle deine Websites, ohne zwischen CMS-Instanzen zu wechseln.' },
  ];

  const faqs = [
    { q: 'Was ist der Unterschied zwischen Free und Pro?', a: 'Im Free Plan kannst du bis zu 3 Websites verwalten, mit Todos, Benachrichtigungen und Basic Analytics. Pro schaltet Blog-Verwaltung, Changelog, Support-Tickets, AdSense- und GSC-Widgets sowie bis zu 5 Teammitglieder frei.' },
    { q: 'Wie funktioniert die Blog-Verwaltung?', a: 'Du kannst Blog-Posts direkt in SiteControl schreiben, planen und veröffentlichen. Mehrsprachig — ein Post kann in verschiedenen Sprachen angelegt werden. Die Inhalte werden über deine Website ausgespielt.' },
    { q: 'Kann ich Analytics von meinen externen Websites erfassen?', a: 'Ja. Du integrierst einen kleinen Tracking-Snippet auf deiner Website, der Pageviews, Geräte, Referrer und Fehler an SiteControl sendet. Kein externes Tool wie Google Analytics nötig.' },
    { q: 'Was ist der 14-Tage-Trial?', a: 'Beim Pro-Signup kannst du 14 Tage kostenlos testen — ohne Kreditkarte. Nach dem Trial wechselst du automatisch auf Free, falls du nicht upgradest.' },
    { q: 'Kann ich jederzeit kündigen?', a: 'Ja. Monthly Billing, keine Mindestlaufzeit. Nach der Kündigung bleibst du bis Ende des Abrechnungszeitraums auf Pro, danach auf Free.' },
    { q: 'Unterstützt SiteControl mehrere Benutzer?', a: 'Im Pro-Plan kannst du bis zu 5 Teammitglieder einladen, die gemeinsam an den Sites arbeiten.' },
  ];

  return (
    <div className="min-h-screen overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 px-4 overflow-hidden">
        {/* Parallax BG */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${parallax}px)` }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, rgba(91,106,246,0.6) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #a78bfa 0%, transparent 70%)' }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <SiteControlIcon size={48} />
                <div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">SiteControl</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">Live</span>
                    <span className="text-xs text-gray-500">Next.js + Supabase</span>
                  </div>
                </div>
              </div>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Jetzt verfügbar — 14 Tage Pro kostenlos testen
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                Alle deine Websites.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Ein Dashboard.
                </span>
              </h1>

              <p className="text-lg text-gray-400 mb-4 leading-relaxed max-w-xl">
                Blog-Posts, Changelogs, Support-Tickets, Todos und Analytics für alle deine Websites —
                in einer zentralen App verwaltet. Kein Tool-Chaos, kein Tab-Chaos.
              </p>
              <p className="text-sm text-gray-500 mb-10 max-w-xl">
                Keine Kreditkarte nötig · Free Plan für immer kostenlos · 14 Tage Pro Trial
              </p>

              {/* Animated stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { end: 9, suffix: ' Features', label: 'Pro-Features' },
                  { end: 3,  suffix: ' Sites',   label: 'Free-Plan' },
                  { end: 5,  suffix: ' User',    label: 'Pro Team' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white">
                      <AnimCount end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://sitecontrol.pages.dev/signup" target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #5b6af6, #4346eb)', boxShadow: '0 8px 24px rgba(91,106,246,0.35)' }}>
                  <ExternalLink className="w-4 h-4" />
                  <span>Kostenlos starten</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://sitecontrol.pages.dev/" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>App öffnen</span>
                </a>
              </div>
            </div>

            {/* Right: Dashboard Mock */}
            <div style={{ transform: `translateY(${-parallax * 0.08}px)`, transition: 'transform 0.1s linear' }}>
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 block">Features</span>
            <h2 className="text-4xl font-bold text-white mb-4">Alles was du brauchst</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Von der einfachen Todo-Liste bis zum vollständigen Blog-CMS — SiteControl wächst mit deinen Anforderungen.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group relative">
                {!f.free && (
                  <div className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/15 border border-violet-500/25 text-violet-400">PRO</div>
                )}
                {f.free && (
                  <div className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/15 border border-green-500/25 text-green-400">FREE</div>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          USE CASES — Parallax Streifen
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(135deg, #5b6af6 25%, transparent 25%), linear-gradient(225deg, #a78bfa 25%, transparent 25%)',
              backgroundSize: '80px 80px',
              transform: `translateX(${parallax * 0.15}px)`,
            }} />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-3 block">Für wen ist SiteControl?</span>
            <h2 className="text-4xl font-bold text-white">Wer profitiert am meisten</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <div key={i} className="card hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-300 flex gap-4">
                <div className="text-3xl flex-shrink-0">{uc.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-2">{uc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Was Nutzer sagen</h2>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card hover:scale-[1.02] transition-all duration-300"
                style={{ transform: `translateY(${parallax * (i % 2 === 0 ? -0.02 : 0.02)}px)` }}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: t.color + '22', border: `2px solid ${t.color}`, color: t.color }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PREISE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${-parallax * 0.08}px)` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #5b6af6 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 block">Preise</span>
            <h2 className="text-4xl font-bold text-white mb-4">Einfach & transparent</h2>
            <p className="text-gray-400">Starte kostenlos. Upgrade wenn du bereit bist.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {plans.map((plan, i) => (
              <div key={i} className={`card relative flex flex-col transition-all duration-300 hover:scale-[1.02] ${plan.highlight ? 'shadow-xl' : ''}`}
                style={plan.highlight ? { borderColor: 'rgba(91,106,246,0.5)', boxShadow: '0 20px 60px rgba(91,106,246,0.15)' } : {}}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-white px-4 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #5b6af6, #a78bfa)' }}>{plan.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  {plan.note && <p className="text-xs text-gray-500 mt-1">{plan.note}</p>}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                  {plan.missing.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                      <X className="w-4 h-4 flex-shrink-0 text-gray-700" /> <span className="line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                <a href={`https://sitecontrol.pages.dev/signup${plan.highlight ? '?plan=pro' : ''}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block text-center py-3 rounded-lg font-bold text-sm transition-all"
                  style={plan.highlight
                    ? { background: 'linear-gradient(135deg, #5b6af6, #4346eb)', color: '#fff', boxShadow: '0 6px 20px rgba(91,106,246,0.35)' }
                    : undefined}
                  {...(!plan.highlight ? { className: 'btn-secondary block text-center py-3 rounded-lg font-bold text-sm' } : {})}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Feature matrix */}
          <div className="card overflow-hidden">
            <h3 className="font-bold text-white mb-6">Feature-Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-semibold">Free</th>
                    <th className="text-center py-3 px-4 text-indigo-300 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    ['Websites',           '3',         'Unbegrenzt'],
                    ['Dashboard & KPIs',   '✓',         '✓'],
                    ['Todo-Management',    '✓',         '✓'],
                    ['Benachrichtigungen', '✓',         '✓'],
                    ['Basic Analytics',   '✓',         '✓'],
                    ['Blog-Verwaltung',    '—',         '✓ Mehrsprachig'],
                    ['Changelog-System',  '—',         '✓'],
                    ['Support-Tickets',   '—',         '✓'],
                    ['AdSense-Widget',    '—',         '✓'],
                    ['GSC-Integration',   '—',         '✓'],
                    ['Teammitglieder',    '1',         'Bis 5'],
                    ['Support',           'Community', 'Priorität'],
                  ].map(([feat, free, pro], i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-3 pr-6 text-gray-400">{feat}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{free}</td>
                      <td className="py-3 px-4 text-center text-indigo-400 font-medium">{pro}</td>
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
            style={{ background: 'linear-gradient(135deg, rgba(91,106,246,0.12), rgba(167,139,250,0.08))' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ transform: `translateY(${-parallax * 0.05}px)` }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full opacity-20"
                style={{ background: 'radial-gradient(ellipse, #5b6af6 0%, transparent 70%)' }} />
            </div>
            <div className="relative">
              <SiteControlIcon size={56} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Bereit loszulegen?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Erstelle deinen Account in 30 Sekunden. Keine Kreditkarte, kein Risiko.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://sitecontrol.pages.dev/signup" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-bold text-sm transition-all"
                  style={{ background: 'linear-gradient(135deg, #5b6af6, #4346eb)', boxShadow: '0 8px 24px rgba(91,106,246,0.35)' }}>
                  <ExternalLink className="w-4 h-4" />
                  Jetzt kostenlos starten
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://sitecontrol.pages.dev/" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  App öffnen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SiteControlPage;
