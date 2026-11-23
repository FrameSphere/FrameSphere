import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Minus, ArrowRight, ArrowUpRight } from 'lucide-react';

// Preise stammen aus den Konfigurationen der Projekte (Stand Nov 2026):
// FrameTrain website/messages, RateLimit frontend/src/lib/plans.ts,
// FrameSpell js/pricing-config.js, KeyScope Pricing.jsx, SiteControl app/page.tsx.
// Nur FrameTrain und die Web-Apps sind live; alles andere ist "geplant".

const tabs = [
  { id: 'frametrain', name: 'FrameTrain', live: true },
  { id: 'webapps', name: 'Web-Apps', live: true },
  { id: 'framespell', name: 'FrameSpell', live: false },
  { id: 'ratelimit', name: 'RateLimit', live: false },
  { id: 'keyscope', name: 'KeyScope', live: false },
  { id: 'sitecontrol', name: 'SiteControl', live: false },
];

const plans = {
  frametrain: [
    {
      name: 'Monatlich',
      price: '€4,99',
      period: '/ Monat',
      features: [
        'Desktop-App für macOS, Windows, Linux',
        'LoRA, QLoRA und Full Fine-Tuning',
        '21 Trainings-Plugins (Text, Bild, Audio, Video …)',
        'Dataset-Builder mit 7 Projekttypen',
        'MCP-Server mit 101 Werkzeugen',
        'Alle Updates inklusive',
      ],
      cta: { label: 'Auf frame-train.com starten', href: 'https://frame-train.com/' },
    },
    {
      name: 'Jährlich',
      price: '€39,99',
      period: '/ Jahr',
      sub: '= €3,33 pro Monat, 33 % günstiger',
      highlight: true,
      badge: 'Early Access',
      features: ['Alles aus Monatlich', 'Ein Jahr Ruhe vor der Abrechnung'],
      cta: { label: 'Auf frame-train.com starten', href: 'https://frame-train.com/' },
    },
  ],
  webapps: [
    {
      name: 'Kostenlos',
      price: '€0',
      period: 'für immer',
      sub: 'Ohne Konto, ohne Anmeldung',
      highlight: true,
      features: [
        'Wordify: Worträtsel in 5 Sprachen',
        'FlagGuess: 199 Flaggen, 3 Stufen',
        'BrawlMystery: 98 Brawler, 4 Modi',
        'SpinSelector: Glücksrad in 4 Sprachen',
        'Traitora: adaptiver Persönlichkeitstest',
        'FileFlyr: 38 Konverter, kein Upload',
      ],
      cta: { label: 'Alle Web-Apps', to: '/webapps' },
    },
  ],
  framespell: [
    {
      name: 'Kostenlos',
      price: '€0',
      period: '/ Monat',
      features: ['20 Anfragen pro Minute', '100 Start-Credits', 'Deutsch', 'REST-API mit API-Key'],
      missing: ['Prioritäts-Support'],
      note: 'Optional Prepaid-Credits: €0,99 für 100 Anfragen',
    },
    {
      name: 'Professional',
      price: '€29',
      period: '/ Monat',
      sub: 'oder €290 im Jahr',
      highlight: true,
      features: ['100 Anfragen pro Minute', '500 Bonus-Credits', 'Prioritäts-Support', '30 Tage Geld-zurück'],
    },
    {
      name: 'Enterprise',
      price: 'Auf Anfrage',
      features: ['Unbegrenzte Anfragen', 'SLA', 'Persönlicher Ansprechpartner'],
    },
  ],
  ratelimit: [
    {
      name: 'Free',
      price: '€0',
      period: '/ Monat',
      features: ['10.000 Requests pro Monat', '3 API-Keys', '5 Configs pro Key', '10 Filter pro Config', 'Analytics der letzten 24 h'],
      missing: ['Alerts', 'CSV-Export'],
    },
    {
      name: 'Pro',
      price: '€4,99',
      period: '/ Monat',
      highlight: true,
      features: [
        '500.000 Requests pro Monat',
        '25 API-Keys',
        'Configs und Filter unbegrenzt',
        'Analytics der letzten 30 Tage',
        'Webhook-Alerts (5 pro Key)',
        'CSV-Export und Sandbox',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Auf Anfrage',
      features: ['Unbegrenzte Requests', 'Analytics der letzten 90 Tage', 'Eigene Regeln', 'SLA'],
    },
  ],
  keyscope: [
    {
      name: 'Free',
      price: '€0',
      period: '/ Monat',
      features: ['20 Analysen pro Tag', '3 Themenprofile', 'Training mit bis zu 20 Dokumenten', '5 Sprachen', '11 Templates', 'REST-API'],
    },
    {
      name: 'Pro',
      price: '€9',
      period: '/ Monat',
      sub: 'oder €7,49 pro Monat bei Jahreszahlung',
      highlight: true,
      features: ['500 Analysen pro Tag', '50 Themenprofile', 'Training mit bis zu 200 Dokumenten', 'Vollständiger Verlauf', 'Prioritäts-Support'],
    },
  ],
  sitecontrol: [
    {
      name: 'Free',
      price: '€0',
      period: 'für immer',
      features: ['Bis zu 3 Websites', 'Dashboard', 'Todos', 'Benachrichtigungen', 'Basic Analytics'],
      missing: ['Blog, Changelog, Support-Tickets'],
    },
    {
      name: 'Pro',
      price: '€19',
      period: '/ Monat',
      sub: '14 Tage kostenlos testen',
      highlight: true,
      features: ['Unbegrenzte Websites', 'Blog-Verwaltung', 'Changelog', 'Support-Tickets', 'Volle Analytics'],
    },
  ],
};

const faqs = [
  {
    q: 'Was kann ich heute kaufen?',
    a: 'FrameTrain. Die sechs Web-Apps sind kostenlos und brauchen kein Konto. FrameSpell, RateLimit, KeyScope und SiteControl sind in Entwicklung; ihre Preise hier sind geplant und können sich bis zum Start ändern.',
  },
  {
    q: 'Bleibt der FrameTrain-Preis so?',
    a: 'Der Early-Access-Preis steigt nach den ersten 100 Nutzern auf €9,99 im Monat. Wer vorher startet, behält seinen Preis.',
  },
  {
    q: 'Kann ich FrameTrain kündigen?',
    a: 'Jederzeit, zum Ende des laufenden Zeitraums. Bezahlt wird über Stripe: Karte, SEPA, Apple Pay oder Google Pay.',
  },
  {
    q: 'Gibt es eine kostenlose Testphase?',
    a: 'Für FrameTrain nicht. Für die geplanten Produkte sind Free-Pläne vorgesehen, SiteControl Pro soll zusätzlich 14 Tage testbar sein.',
  },
];

function PlanCard({ plan, live }) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-7 ${
        plan.highlight ? 'border-signal-500/60 bg-dark-800' : 'border-white/[0.08] bg-dark-800/50'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-signal-500 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
          {plan.badge}
        </span>
      )}
      <div className="eyebrow">{plan.name}</div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="tabular font-display text-5xl font-extrabold tracking-[-0.04em] text-bone-50">{plan.price}</span>
        {plan.period && <span className="text-[14px] text-bone-500">{plan.period}</span>}
      </div>
      <div className="mt-1 min-h-[20px] text-[13px] text-bone-500">{plan.sub}</div>

      <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] text-bone-200">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-500" />
            {f}
          </li>
        ))}
        {plan.missing?.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] text-bone-600">
            <Minus className="mt-0.5 h-4 w-4 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {plan.note && <p className="mt-6 text-[13px] text-bone-500">{plan.note}</p>}

      <div className="mt-7">
        {live && plan.cta?.href && (
          <a href={plan.cta.href} target="_blank" rel="noopener noreferrer" className={`w-full ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
            {plan.cta.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {live && plan.cta?.to && (
          <Link to={plan.cta.to} className={`w-full ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
            {plan.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        {!live && (
          <div className="flex min-h-[44px] items-center justify-center rounded-lg border border-dashed border-white/15 font-mono text-[11px] uppercase tracking-wider text-bone-500">
            Noch nicht buchbar
          </div>
        )}
      </div>
    </div>
  );
}

const Pricing = () => {
  const [selected, setSelected] = useState('frametrain');
  const tab = tabs.find((t) => t.id === selected);
  const list = plans[selected];

  return (
    <div className="min-h-screen px-5 pb-10 pt-32 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="eyebrow mb-6">Preise</div>
        <h1 className="max-w-4xl font-extrabold" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)' }}>
          Was es kostet.
          <br />
          <span className="text-bone-500">Und was </span>
          <span className="text-signal-500">schon geht.</span>
        </h1>
        <p className="measure mt-8 text-lg leading-relaxed text-bone-400">
          FrameTrain kannst du heute kaufen, die Web-Apps sind gratis. Für alles andere zeigen wir die Preise, die wir
          zum Start planen.
        </p>

        {/* Tabs */}
        <div role="tablist" className="mt-14 flex flex-wrap gap-x-1 gap-y-2 border-b border-white/[0.08]">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected === t.id}
              onClick={() => setSelected(t.id)}
              className={`relative flex h-12 items-center gap-2 px-4 text-[14px] transition-colors ${
                selected === t.id ? 'text-bone-50' : 'text-bone-500 hover:text-bone-200'
              }`}
            >
              {t.name}
              <span
                className={`font-mono text-[9px] uppercase tracking-wider ${t.live ? 'text-signal-500' : 'text-bone-600'}`}
              >
                {t.live ? 'live' : 'geplant'}
              </span>
              {selected === t.id && (
                <motion.span layoutId="pricing-tab" className="absolute inset-x-3 -bottom-px h-px bg-signal-500" />
              )}
            </button>
          ))}
        </div>

        {!tab.live && (
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[14px] text-bone-300">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bone-500" />
            <span>
              {tab.name} ist in Entwicklung. Die Preise unten sind geplant und noch nicht buchbar.{' '}
              <Link to="/contact" className="border-b border-white/20 text-bone-100 hover:border-signal-500 hover:text-signal-500">
                Zum Start benachrichtigen lassen
              </Link>
            </span>
          </div>
        )}

        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={`mt-10 grid gap-5 ${
            list.length === 1 ? 'max-w-md' : list.length === 2 ? 'md:grid-cols-2 lg:max-w-4xl' : 'md:grid-cols-3'
          }`}
        >
          {list.map((p) => (
            <PlanCard key={p.name} plan={p} live={tab.live} />
          ))}
        </motion.div>

        {selected === 'frametrain' && (
          <p className="mt-6 text-[13px] text-bone-500">
            Early-Access-Preis: Nach den ersten 100 Nutzern steigt er auf €9,99 im Monat. Wer vorher startet, behält seinen Preis.
          </p>
        )}

        {/* FAQ */}
        <section className="mt-28">
          <div className="eyebrow mb-6">Fragen</div>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((f) => (
              <div key={f.q} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <h3 className="text-xl font-bold">{f.q}</h3>
                <p className="measure text-[15px] leading-relaxed text-bone-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-extrabold" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1 }}>
            Noch eine Frage zum Preis?
          </h2>
          <Link to="/contact" className="btn-secondary">
            Schreib uns <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
