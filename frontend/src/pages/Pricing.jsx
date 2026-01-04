import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  X,
  Zap,
  ArrowRight,
  Sparkles,
  Brain,
  Code,
  Home,
  Network,
  Gift,
  TrendingUp,
  Users,
  Star,
  Crown,
  Shield,
  Tv,
  Clock,
  Info
} from 'lucide-react';

const Pricing = () => {
  const [selectedProduct, setSelectedProduct] = useState('framespell');

  const products = [
    { id: 'framespell', name: 'FrameSpell API', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'corechain-ai', name: 'CoreChain AI', icon: <Brain className="w-5 h-5" /> },
    { id: 'corechain-api', name: 'CoreChain API', icon: <Code className="w-5 h-5" /> },
    { id: 'spherehub', name: 'SphereHub', icon: <Home className="w-5 h-5" /> },
    { id: 'spherenet', name: 'SphereNet', icon: <Network className="w-5 h-5" /> }
  ];

  // FrameSpell Pricing
  const framespellPlans = [
    {
      name: 'Kostenlos',
      price: '€0',
      period: '/Monat',
      features: [
        '20 Anfragen pro Minute',
        'Deutsch-Modell',
        'Basis-API-Zugang',
        'Community-Support'
      ],
      notIncluded: ['Prioritäts-Support'],
      note: 'Nach 20 Anfragen/Minute: €0.009 pro Anfrage',
      cta: 'Kostenlos starten',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '€29',
      period: '/Monat',
      badge: 'Empfohlen',
      features: [
        '100 Anfragen pro Minute',
        'Alle Sprachen (wenn verfügbar)',
        'Erweiterte API-Features',
        'Prioritäts-Support',
        'Nutzungsstatistiken'
      ],
      note: 'Nach 100 Anfragen/Minute: €0.005 pro Anfrage',
      cta: 'Professional wählen',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Individuell',
      period: '',
      features: [
        'Unbegrenzte Anfragen',
        'Alle Sprachen',
        'Custom Modelle',
        'Dedizierter Support',
        'SLA-Garantie',
        'On-Premise Option'
      ],
      cta: 'Kontakt aufnehmen',
      highlighted: false
    }
  ];

  // CoreChain AI Pricing (Token-based)
  const corechainTokens = [
    { amount: '500 Tokens', price: '€2.99' },
    { amount: '1.200 Tokens', price: '€5.99' },
    { amount: '2.500 Tokens', price: '€9.99' },
    { amount: '5.000 Tokens', price: '€19.99' }
  ];

  const corechainTrials = [
    {
      name: 'Premium-Funktionen',
      trial: '7 Tage kostenlos',
      description: 'Erweiterte KI-Funktionen, unbegrenzte Chats und Priorität beim Support.',
      price: '€9.99/Monat',
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: 'Erweiterte Analysen',
      trial: '14 Tage kostenlos',
      description: 'Umfassende Nutzerstatistiken, Export-Funktionen und Nutzungstrends.',
      price: '€14.99/Monat',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      name: 'Team-Zusammenarbeit',
      trial: '30 Tage kostenlos',
      description: 'Gemeinsame Workspaces, Rechteverwaltung und Team-Kommunikation.',
      price: '€19.99/Monat',
      icon: <Users className="w-6 h-6" />
    }
  ];

  // CoreChain API Pricing
  const corechainAPIPlans = [
    {
      name: 'Kostenlos',
      price: '€0',
      period: '/Monat',
      features: [
        '18 Anfragen pro Minute',
        'Basis-API-Zugang',
        'Community-Support'
      ],
      notIncluded: ['Prioritäts-Support'],
      note: 'Nach 20 Anfragen/Minute: €0.008 pro Anfrage',
      cta: 'Kostenlos starten',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '€29',
      period: '/Monat',
      badge: 'Empfohlen',
      features: [
        '80 Anfragen pro Minute',
        'Erweiterte API-Features',
        'Prioritäts-Support',
        'Nutzungsstatistiken'
      ],
      note: 'Nach 100 Anfragen/Minute: €0.0045 pro Anfrage',
      cta: 'Professional wählen',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Individuell',
      period: '',
      features: [
        'Unbegrenzte Anfragen',
        'Dedizierter Support',
        'SLA-Garantie',
        'On-Premise Option'
      ],
      cta: 'Kontakt aufnehmen',
      highlighted: false
    }
  ];

  // SphereHub Pricing (Hardware)
  const spherehubModels = [
    {
      name: 'Basismodell',
      price: '€199',
      period: '/Einmalig',
      delivery: 'innerhalb von 9 Tagen geliefert',
      features: [
        'Google Coral USB Accelerator Chip',
        '1 TB Speicher',
        '16GB RAM',
        'Bis zu 15 Geräte verbinden',
        '1 Jahr Garantie'
      ],
      note: 'Optionale Käufe',
      cta: 'Bestellen',
      highlighted: false
    },
    {
      name: 'Promodell',
      price: '€299',
      period: '/Einmalig',
      badge: 'Empfohlen',
      delivery: 'innerhalb von 7 Tagen geliefert',
      features: [
        'Jetson Xavier NX Chip',
        '2 TB Speicher',
        '32GB RAM',
        'Bis zu 20 Geräte verbinden',
        '1 Jahr Garantie'
      ],
      note: 'Optionale Käufe',
      cta: 'Bestellen',
      highlighted: true
    },
    {
      name: 'Firmenserver',
      price: 'Individuell',
      period: '',
      delivery: 'Custom zusammenbaubar',
      features: [
        'Leistungsfähige Custom Chips',
        'Dedizierter Support',
        'SLA-Garantie',
        'Auf Kunden zugeschnitten'
      ],
      cta: 'Kontakt aufnehmen',
      highlighted: false
    }
  ];

  // SphereNet Pricing (Account Types)
  const spherenetPlans = [
    {
      name: 'Benutzer Account',
      subtitle: 'Standard',
      price: '€0',
      period: 'Account einrichten',
      features: [
        'Mind. €5 Startguthaben bei Nutzung bestimmter Modelle',
        'KI Modelle nach Nutzungsbedingungen nutzen',
        'Bis zu 10 API Keys/Chains erstellen',
        'Kosten je nach Nutzung'
      ],
      cta: 'Account erstellen',
      highlighted: false
    },
    {
      name: 'Benutzer Account',
      subtitle: 'Pro',
      price: '€20',
      period: 'Einmalig zum Upgraden',
      badge: 'Beliebt',
      features: [
        'Mind. €5 Startguthaben bei Nutzung',
        'KI Modelle nutzen',
        'Unbegrenzt API Keys/Chains erstellen',
        'Kosten je nach Nutzung'
      ],
      cta: 'Upgraden',
      highlighted: true
    },
    {
      name: 'Creator Account',
      subtitle: 'Premium',
      price: '€49.99',
      period: '/Einmalig',
      features: [
        'Mind. €5 Startguthaben',
        'KI Modelle nutzen',
        'Unbegrenzt API Keys',
        'Unbegrenzt KI Modelle hochladen',
        'Preise frei festlegen',
        'Zugriff auf KI Empfehlung'
      ],
      cta: 'Premium werden',
      highlighted: false
    }
  ];

  const renderPricingPlans = () => {
    switch (selectedProduct) {
      case 'framespell':
        return (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {framespellPlans.map((plan, index) => (
                <PricingCard key={index} plan={plan} />
              ))}
            </div>
          </div>
        );

      case 'corechain-ai':
        return (
          <div className="space-y-12">
            {/* Token System Info */}
            <div className="card bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                💎 Erhalte Tokens für Premium-Features
              </h3>
              <p className="text-gray-400 mb-6">
                CoreChain AI nutzt ein flexibles Token-System. Verdiene kostenlose Tokens oder kaufe sie direkt!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Daily Bonus */}
                <div className="glass-effect rounded-lg p-6">
                  <Gift className="w-10 h-10 text-green-400 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Täglicher Bonus</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Erhalte 100 kostenlose Tokens täglich beim Einloggen und 5 Minuten Aktivität!
                  </p>
                  <div className="text-green-400 font-semibold">+100 Tokens/Tag</div>
                </div>

                {/* Watch Ads */}
                <div className="glass-effect rounded-lg p-6">
                  <Tv className="w-10 h-10 text-blue-400 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Werbung ansehen</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Schaue Werbung an und erhalte 75 Tokens pro Video. Limit: 10 Videos alle 3 Stunden.
                  </p>
                  <div className="text-blue-400 font-semibold">Werbungen heute: 0/10</div>
                </div>

                {/* Buy Tokens */}
                <div className="glass-effect rounded-lg p-6">
                  <Sparkles className="w-10 h-10 text-yellow-400 mb-3" />
                  <h4 className="text-lg font-bold text-white mb-2">Tokens kaufen</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Kaufe Tokens direkt mit echtem Geld für sofortigen Zugang.
                  </p>
                  <div className="text-yellow-400 font-semibold">Ab €2.99</div>
                </div>
              </div>
            </div>

            {/* Token Packages */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                💎 Tokens kaufen
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {corechainTokens.map((pkg, index) => (
                  <div key={index} className="card text-center hover:scale-105 transition-all">
                    <div className="text-3xl mb-2">💎</div>
                    <div className="text-xl font-bold text-white mb-2">{pkg.amount}</div>
                    <div className="text-2xl font-bold text-primary-400 mb-4">{pkg.price}</div>
                    <button className="w-full btn-primary">
                      Kaufen
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trials */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                🎁 Entdecke unsere Trials
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {corechainTrials.map((trial, index) => (
                  <div key={index} className="card">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                      {trial.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{trial.name}</h4>
                    <div className="text-green-400 font-semibold mb-3">{trial.trial}</div>
                    <p className="text-sm text-gray-400 mb-4">{trial.description}</p>
                    <div className="text-gray-400 text-sm mb-4">Danach: <span className="text-white font-semibold">{trial.price}</span></div>
                    <button className="w-full btn-secondary">
                      Trial starten
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'corechain-api':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {corechainAPIPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        );

      case 'spherehub':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full mb-4">
                <Home className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400">Hardware Produkte - Einmalige Zahlung</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {spherehubModels.map((model, index) => (
                <HardwareCard key={index} model={model} />
              ))}
            </div>
          </div>
        );

      case 'spherenet':
        return (
          <div>
            <div className="card bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-indigo-500/30 mb-8">
              <Info className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Über SphereNet Accounts
              </h3>
              <p className="text-gray-400">
                SphereNet bietet flexible Account-Typen für Nutzer und Content-Creator. 
                Nutze KI-Modelle oder stelle eigene zur Verfügung!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {spherenetPlans.map((plan, index) => (
                <AccountCard key={index} plan={plan} />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Preise & Pläne</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transparente Preise für alle FrameSphere Produkte. Wähle den Plan, der zu dir passt.
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedProduct === product.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'glass-effect hover:bg-white/10 text-gray-300'
              }`}
            >
              {product.icon}
              <span>{product.name}</span>
            </button>
          ))}
        </div>

        {/* Pricing Content */}
        {renderPricingPlans()}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Häufig gestellte Fragen
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FAQItem
              question="Kann ich meinen Plan jederzeit ändern?"
              answer="Ja! Du kannst jederzeit upgraden oder downgraden. Änderungen werden sofort wirksam."
            />
            <FAQItem
              question="Gibt es eine kostenlose Testphase?"
              answer="Ja, alle Produkte haben einen kostenlosen Plan oder Trial-Periode zum Testen."
            />
            <FAQItem
              question="Wie funktioniert die Abrechnung?"
              answer="Wir berechnen monatlich oder je nach Produkt bei Nutzung. Keine versteckten Kosten."
            />
            <FAQItem
              question="Gibt es Rabatte für Jahresabos?"
              answer="Ja! Bei jährlicher Zahlung gibt es bis zu 20% Rabatt. Kontaktiere uns für Details."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Noch Fragen?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Unser Team hilft dir gerne bei der Auswahl des richtigen Plans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Kontakt aufnehmen</span>
              <ArrowRight className="w-5 h-5" />
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

// Pricing Card Component
const PricingCard = ({ plan }) => (
  <div className={`card relative ${plan.highlighted ? 'border-primary-500' : ''}`}>
    {plan.badge && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {plan.badge}
        </span>
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
      </div>
    </div>

    <ul className="space-y-3 mb-6">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-gray-300">
          <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
      {plan.notIncluded?.map((feature, idx) => (
        <li key={idx} className="flex items-start text-gray-500">
          <X className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm line-through">{feature}</span>
        </li>
      ))}
    </ul>

    {plan.note && (
      <div className="text-xs text-gray-400 mb-4 p-3 glass-effect rounded">
        {plan.note}
      </div>
    )}

    <Link
      to="/register"
      className={`w-full block text-center py-3 rounded-lg font-semibold transition-all ${
        plan.highlighted
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
          : 'glass-effect hover:bg-white/10 text-white'
      }`}
    >
      {plan.cta}
    </Link>
  </div>
);

// Hardware Card Component
const HardwareCard = ({ model }) => (
  <div className={`card relative ${model.highlighted ? 'border-orange-500' : ''}`}>
    {model.badge && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {model.badge}
        </span>
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-white mb-2">{model.name}</h3>
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-4xl font-bold text-white">{model.price}</span>
        {model.period && <span className="text-gray-400 ml-1">{model.period}</span>}
      </div>
      {model.delivery && (
        <div className="text-sm text-orange-400">{model.delivery}</div>
      )}
    </div>

    <ul className="space-y-3 mb-6">
      {model.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-gray-300">
          <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    {model.note && (
      <div className="text-xs text-gray-400 mb-4 text-center">
        {model.note}
      </div>
    )}

    <button
      className={`w-full py-3 rounded-lg font-semibold transition-all ${
        model.highlighted
          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
          : 'glass-effect hover:bg-white/10 text-white'
      }`}
    >
      {model.cta}
    </button>
  </div>
);

// Account Card Component
const AccountCard = ({ plan }) => (
  <div className={`card relative ${plan.highlighted ? 'border-indigo-500' : ''}`}>
    {plan.badge && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {plan.badge}
        </span>
      </div>
    )}
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
      <div className="text-sm text-indigo-400 mb-3">{plan.subtitle}</div>
      <div className="flex items-baseline justify-center mb-2">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
      </div>
      {plan.period && <div className="text-sm text-gray-400">{plan.period}</div>}
    </div>

    <ul className="space-y-3 mb-6">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-gray-300">
          <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>

    <Link
      to="/register"
      className={`w-full block text-center py-3 rounded-lg font-semibold transition-all ${
        plan.highlighted
          ? 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white'
          : 'glass-effect hover:bg-white/10 text-white'
      }`}
    >
      {plan.cta}
    </Link>
  </div>
);

// FAQ Item Component
const FAQItem = ({ question, answer }) => (
  <div className="card">
    <h4 className="text-lg font-bold text-white mb-2">{question}</h4>
    <p className="text-gray-400">{answer}</p>
  </div>
);

export default Pricing;
