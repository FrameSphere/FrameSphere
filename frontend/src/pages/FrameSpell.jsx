import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle,
  Code,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

const FrameSpell = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeExample = `// FrameSpell API - Quick Start
import FrameSpell from 'framespell';

const checker = new FrameSpell({
  apiKey: 'your_api_key',
  language: 'de'
});

const text = "Das ist ein Beispel Text mit Fehlern.";
const result = await checker.check(text);

console.log(result.corrections);
// Output: [{
//   word: "Beispel",
//   suggestion: "Beispiel",
//   position: 12,
//   confidence: 0.98
// }]`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Kontextbasierte Korrektur',
      description: 'Versteht den Kontext deines Textes und schlägt die passendsten Korrekturen vor. Unterscheidet zwischen Homonyme und versteht Satzstrukturen.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Mehrsprachig',
      description: 'Unterstützt über 20 Sprachen inklusive Deutsch, Englisch, Französisch, Spanisch und mehr. Automatische Spracherkennung inklusive.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Stil-Analyse',
      description: 'Analysiert Schreibstil, Ton und Lesbarkeit. Gibt Verbesserungsvorschläge für professionellere oder zugänglichere Texte.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Echtzeit-Vorschläge',
      description: 'Schnelle Antwortzeiten unter 100ms. Perfekt für Live-Editors und Chat-Anwendungen mit Millionen von Nutzern.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Datenschutz',
      description: 'Alle Texte werden verschlüsselt übertragen und nicht gespeichert. DSGVO-konform und privacy-first Design.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Developer-Friendly',
      description: 'SDKs für JavaScript, Python, PHP, Ruby und mehr. Umfangreiche Dokumentation und Code-Beispiele für schnelle Integration.'
    }
  ];

  const useCases = [
    {
      title: 'Content Management Systeme',
      description: 'Integriere FrameSpell in WordPress, Drupal oder dein eigenes CMS. Biete deinen Autoren professionelle Rechtschreibprüfung direkt im Editor.',
      stats: '50+ CMS Plugins verfügbar'
    },
    {
      title: 'E-Mail Clients',
      description: 'Verhindere peinliche Tippfehler in E-Mails. Echtzeit-Korrektur während des Schreibens mit Vorschlägen inline.',
      stats: '99.2% Fehlererkennungsrate'
    },
    {
      title: 'Chat & Messaging Apps',
      description: 'Verbessere die Kommunikation in Echtzeit. Subtile Hinweise ohne die Nutzer zu unterbrechen.',
      stats: '<50ms Latenz'
    },
    {
      title: 'E-Learning Plattformen',
      description: 'Hilf Schülern beim Schreibenlernen mit konstruktivem Feedback und Erklärungen zu Fehlern.',
      stats: '1M+ Studenten nutzen es'
    }
  ];

  const pricingPlans = [
    {
      name: 'Kostenlos',
      price: '€0',
      period: '/Monat',
      description: 'Perfekt zum Testen',
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
      description: 'Für professionelle Nutzung',
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
      description: 'Für Unternehmen',
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

  const stats = [
    { value: '99.2%', label: 'Genauigkeit' },
    { value: '<50ms', label: 'Durchschn. Latenz' },
    { value: '20+', label: 'Sprachen' },
    { value: '1M+', label: 'Tägl. Anfragen' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Produkte
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">FrameSpell API</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-glow">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                  Live
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">FrameSpell API</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-4">
                Intelligente Rechtschreibprüfung mit KI-Power
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Biete deinen Nutzern professionelle Rechtschreib- und Grammatikprüfung. 
                Kontextbasiert, mehrsprachig und blitzschnell. Perfekt für jede Anwendung.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
                  <span>Kostenlos starten</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#demo" className="btn-secondary inline-flex items-center space-x-2">
                  <span>Live Demo</span>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="card text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Leistungsstarke Features
            </h2>
            <p className="text-xl text-gray-400">
              Alles was du für perfekte Texte brauchst
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              In Minuten integriert
            </h2>
            <p className="text-xl text-gray-400">
              Starte mit nur wenigen Zeilen Code
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">framespell-example.js</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Kopieren</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-dark-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm text-gray-300 font-mono">
                {codeExample}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Perfekt für jede Anwendung
            </h2>
            <p className="text-xl text-gray-400">
              Tausende Unternehmen vertrauen auf FrameSpell
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {useCase.description}
                </p>
                <div className="flex items-center text-primary-400">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold">{useCase.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Einfache, transparente Preise
            </h2>
            <p className="text-xl text-gray-400">
              Wähle den Plan, der zu dir passt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card ${plan.highlighted ? 'border-primary-500 relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Beliebteste Wahl
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
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
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
                      : 'glass-effect hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              Brauchst du mehr? Enterprise-Lösungen ab €499/Monat
            </p>
            <Link to="/contact" className="text-primary-400 hover:text-primary-300 font-semibold">
              Kontaktiere uns für Custom Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für perfekte Texte?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Starte noch heute kostenlos - keine Kreditkarte erforderlich
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Jetzt kostenlos starten</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/developers/docs" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Dokumentation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrameSpell;
