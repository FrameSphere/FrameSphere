import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X, ArrowRight, Sparkles, Shield, Brain, Zap, Globe } from 'lucide-react';

const products = [
  { id: 'framespell', name: 'FrameSpell API', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'ratelimit', name: 'RateLimit API', icon: <Shield className="w-4 h-4" /> },
  { id: 'frametrain', name: 'FrameTrain', icon: <Brain className="w-4 h-4" /> },
  { id: 'webapps', name: 'Web Apps', icon: <Globe className="w-4 h-4" /> },
];

const PricingCard = ({ plan }) => (
  <div className={`card relative flex flex-col ${plan.highlighted ? 'border-primary-500' : ''}`}>
    {plan.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold">{plan.badge}</span>
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="flex items-baseline justify-center mb-1">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        {plan.period && <span className="text-gray-400 ml-1 text-sm">{plan.period}</span>}
      </div>
      {plan.subtitle && <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>}
    </div>
    <ul className="space-y-2.5 mb-6 flex-1">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start text-gray-300 text-sm">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />{f}
        </li>
      ))}
      {plan.notIncluded?.map((f, i) => (
        <li key={i} className="flex items-start text-gray-500 text-sm">
          <X className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0 mt-0.5" /><span className="line-through">{f}</span>
        </li>
      ))}
    </ul>
    {plan.note && <div className="text-xs text-gray-500 mb-4 p-2.5 glass-effect rounded-lg">{plan.note}</div>}
    <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}
      className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
      {plan.cta}
    </Link>
  </div>
);

const Pricing = () => {
  const [selected, setSelected] = useState('framespell');

  const plans = {
    framespell: [
      { name: 'Kostenlos', price: '€0', period: '/Monat', highlighted: false, features: ['20 Anfragen/Minute', 'Deutsch-Modell', 'REST API Zugang', 'Community Support'], notIncluded: ['Prioritäts-Support', 'Alle Sprachen'], note: 'Nach 20 Req/Min: €0.009 pro Anfrage', cta: 'Kostenlos starten' },
      { name: 'Professional', price: '€29', period: '/Monat', badge: 'Empfohlen', highlighted: true, features: ['100 Anfragen/Minute', 'Alle Sprachen (DE, EN, ES, FR)', 'Erweiterte API-Features', 'Prioritäts-Support', 'Nutzungsstatistiken'], note: 'Nach 100 Req/Min: €0.005 pro Anfrage', cta: 'Professional wählen' },
      { name: 'Enterprise', price: 'Individuell', period: '', highlighted: false, features: ['Unbegrenzte Anfragen', 'Alle Sprachen', 'Custom Modelle', 'Dedizierter Support', 'SLA-Garantie', 'On-Premise Option'], cta: 'Kontakt aufnehmen' },
    ],
    ratelimit: [
      { name: 'Kostenlos', price: '€0', period: '/Monat', highlighted: false, features: ['50 Anfragen/Minute', 'Cloudflare Edge', 'IP-Filtering', 'Basic Analytics'], notIncluded: ['Erweiterte Analytics', 'Custom Rules'], cta: 'Kostenlos starten' },
      { name: 'Professional', price: '€19', period: '/Monat', badge: 'Beliebt', highlighted: true, features: ['500 Anfragen/Minute', 'Erweiterte Analytics', 'Custom Rate Rules', 'IP Whitelist/Blacklist', 'Echtzeit-Dashboard', 'Prioritäts-Support'], cta: 'Professional wählen' },
      { name: 'Enterprise', price: 'Individuell', period: '', highlighted: false, features: ['Unbegrenzte Anfragen', 'Custom Deployment', 'SLA-Garantie', 'Dedizierter Support'], cta: 'Kontakt aufnehmen' },
    ],
    frametrain: [
      {
        name: 'Free Download', price: 'Kostenlos', period: '', highlighted: false,
        subtitle: 'Einmaliger Download, keine Subscription',
        features: ['Lokales KI-Training', 'Eigene Trainingsdaten', 'Modell-Export', 'Basis-Modelle', 'macOS, Windows, Linux', 'Community Support'],
        cta: 'Jetzt herunterladen'
      },
      {
        name: 'Pro', price: '€49', period: '/Einmalig', badge: 'Lifetime', highlighted: true,
        features: ['Alles aus Free', 'Erweiterte Modell-Architekturen', 'GPU-Optimierung', 'Batch-Training', 'Prioritäts-Support', 'Lifetime Updates'],
        cta: 'Pro kaufen'
      },
      {
        name: 'Team', price: '€149', period: '/Einmalig',
        features: ['Alles aus Pro', 'Bis zu 5 Nutzer', 'Shared Model Library', 'Team-Dashboard', 'Dedizierter Support'],
        highlighted: false, cta: 'Team-Lizenz kaufen'
      },
    ],
    webapps: [
      {
        name: '100% Kostenlos', price: '€0', period: '', highlighted: true,
        subtitle: 'Alle 6 Web Apps — für immer gratis',
        features: [
          'Wordify — Täglich neues Worträtsel',
          'FlagGuess — Flaggen-Quiz mit 195+ Ländern',
          'BrawlMystery — Brawl Stars Quiz (4 Modi)',
          'SpinSelector — Online-Glücksrad',
          'Traitora — Adaptiver Persönlichkeitstest',
          'FileFlyr — 40+ Dateikonverter',
          'Keine Anmeldung erforderlich',
          'Kein Abo, keine versteckten Kosten',
        ],
        cta: 'Alle Web Apps ansehen',
      },
    ],
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4"><span className="gradient-text">Preise & Pläne</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transparente Preise für alle FrameSphere-Produkte. Kostenlos starten, fair skalieren.
          </p>
        </div>

        {/* Produkt-Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {products.map((p) => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${selected === p.id ? 'btn-primary' : 'btn-secondary'}`}>
              {p.icon}<span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className={`grid gap-6 mb-16 ${plans[selected].length === 1 ? 'max-w-md mx-auto' : 'md:grid-cols-3'}`}>
          {plans[selected].map((plan, i) => <PricingCard key={i} plan={plan} />)}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Häufige Fragen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Brauche ich eine Kreditkarte für den Start?', a: 'Nein. Alle kostenlosen Pläne und Web Apps sind ohne Kreditkarte und ohne Zahlungsdaten nutzbar.' },
              { q: 'Kann ich jederzeit upgraden oder kündigen?', a: 'Ja. Upgrades werden sofort aktiv, Kündigungen zum Ende des Abrechnungszeitraums.' },
              { q: 'Wie erhalte ich einen API Key?', a: 'Registriere dich kostenlos, gehe ins Dashboard und erstelle einen neuen API Key für das gewünschte Produkt.' },
              { q: 'Gibt es Rabatte für Jahresabonnements?', a: 'Ja, bei jährlicher Zahlung gibt es bis zu 20% Rabatt. Kontaktiere uns für Details.' },
              { q: 'Sind die Web Apps wirklich kostenlos?', a: 'Ja, alle 6 Web Apps (Wordify, FlagGuess, BrawlMystery, SpinSelector, Traitora, FileFlyr) sind und bleiben kostenlos.' },
              { q: 'Was passiert wenn ich mein Rate Limit überschreite?', a: 'Die API gibt einen 429-Fehlercode zurück. Auf dem kostenlosen Plan wird per-Request abgerechnet, danach.' },
            ].map((faq, i) => (
              <div key={i} className="card">
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Zap className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Noch Fragen zu den Preisen?</h2>
          <p className="text-gray-400 mb-6">Unser Team hilft dir, den richtigen Plan zu finden.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Kontakt aufnehmen</span><ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <span>Kostenlos starten</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
