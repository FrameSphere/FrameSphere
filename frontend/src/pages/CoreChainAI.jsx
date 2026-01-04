import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  CheckCircle,
  Code,
  Zap,
  ArrowRight,
  Copy,
  Check,
  GitBranch,
  Layers,
  Target,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

const CoreChainAI = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeExample = `// CoreChain AI - Task Orchestration
import CoreChain from 'corechain-ai';

const chain = new CoreChain({
  apiKey: 'your_api_key'
});

// Komplexe Anfrage
const userRequest = "Analyse die Sales-Daten Q4 2024, erstelle einen Report und sende ihn per E-Mail";

// CoreChain zerlegt automatisch in Subtasks
const result = await chain.process(userRequest);

console.log(result.steps);
// 1. Datenanalyse (Analytics Agent)
// 2. Report-Generierung (Content Agent)
// 3. E-Mail-Versand (Communication Agent)

console.log(result.finalOutput);
// Perfekt formatierter Report + Bestätigung`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const features = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Automatische Task-Zerlegung',
      description: 'CoreChain analysiert deine Anfrage und zerlegt sie intelligent in optimale Subtasks. Kein manuelles Workflow-Design nötig.'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Multi-Agent Orchestrierung',
      description: 'Verteilt Subtasks an spezialisierte KI-Agenten. Jeder Agent ist Experte in seinem Bereich für beste Ergebnisse.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Intelligentes Routing',
      description: 'Wählt automatisch den besten Agenten für jede Aufgabe basierend auf Kontext, Historie und Performance-Daten.'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Ergebnis-Synthese',
      description: 'Kombiniert alle Teil-Ergebnisse zu einer kohärenten, perfekt formatierten Antwort für den Endnutzer.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Kontext-Management',
      description: 'Behält den Kontext über alle Schritte hinweg. Agenten können auf Ergebnisse vorheriger Schritte zugreifen.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fehlerbehandlung',
      description: 'Automatische Retry-Logik, Fallback-Strategien und detailliertes Error-Logging für maximale Zuverlässigkeit.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Anfrage-Analyse',
      description: 'User sendet komplexe Anfrage an CoreChain',
      icon: <Target className="w-8 h-8" />
    },
    {
      step: '2',
      title: 'Task-Zerlegung',
      description: 'KI zerlegt Anfrage in optimale Subtasks',
      icon: <GitBranch className="w-8 h-8" />
    },
    {
      step: '3',
      title: 'Agent-Routing',
      description: 'Jeder Subtask wird an spezialisierten Agenten weitergeleitet',
      icon: <Layers className="w-8 h-8" />
    },
    {
      step: '4',
      title: 'Ergebnis-Synthese',
      description: 'Alle Ergebnisse werden zusammengefügt',
      icon: <Brain className="w-8 h-8" />
    }
  ];

  const useCases = [
    {
      title: 'Business Intelligence',
      description: 'Analysiere Daten, erstelle Reports, generiere Insights - alles in einem Workflow.',
      example: '"Analysiere Umsatz Q4, vergleiche mit Q3, erstelle PowerPoint"',
      result: 'Datenanalyse + Visualisierung + Report-Generation'
    },
    {
      title: 'Content Pipeline',
      description: 'Von Recherche bis Veröffentlichung - automatisiere deinen Content-Workflow.',
      example: '"Recherchiere Trend XY, schreibe Artikel, erstelle Social Media Posts"',
      result: 'Research + Writing + Social Media + SEO'
    },
    {
      title: 'Customer Support',
      description: 'Multi-Step Support-Anfragen automatisch und intelligent lösen.',
      example: '"Kunde hat Problem X, analysiere Logs, erstelle Lösung, sende Antwort"',
      result: 'Log-Analyse + Problem-Solving + Communication'
    },
    {
      title: 'Research & Development',
      description: 'Komplexe Forschungsaufgaben in koordinierte Schritte aufteilen.',
      example: '"Recherchiere zu Thema Y, fasse zusammen, erstelle Präsentation"',
      result: 'Research + Summarization + Presentation'
    }
  ];

  const pricingPlans = [
    {
      name: 'Token-System',
      price: 'Flexibel',
      period: '',
      description: 'Pay as you go',
      features: [
        'Täglich 100 kostenlose Tokens',
        'Werbung ansehen: 75 Tokens/Video',
        'Token-Pakete ab €2.99',
        '500 Tokens = €2.99',
        '5.000 Tokens = €19.99'
      ],
      cta: 'Tokens kaufen',
      highlighted: false
    },
    {
      name: 'Premium Trial',
      price: '€9.99',
      period: '/Monat',
      badge: 'Beliebt',
      description: '7 Tage kostenlos testen',
      features: [
        'Erweiterte KI-Funktionen',
        'Unbegrenzte Chats',
        'Priorität beim Support',
        'Keine Token-Limits',
        'Erweiterte Features'
      ],
      cta: 'Trial starten',
      highlighted: true
    },
    {
      name: 'Team-Zusammenarbeit',
      price: '€19.99',
      period: '/Monat',
      description: '30 Tage kostenlos testen',
      features: [
        'Gemeinsame Workspaces',
        'Rechteverwaltung',
        'Team-Kommunikation',
        'Alle Premium Features',
        'Priority Support'
      ],
      cta: 'Team Trial starten',
      highlighted: false
    }
  ];

  const stats = [
    { value: '95%', label: 'Task Success Rate' },
    { value: '<2s', label: 'Durchschn. Processing' },
    { value: '50+', label: 'KI-Agenten' },
    { value: '10M+', label: 'Tasks/Monat' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Produkte
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">CoreChain AI</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-glow">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                  Live
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">CoreChain AI</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-4">
                KI-Orchestrierung der nächsten Generation
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Verwandle komplexe Anfragen in perfekte Ergebnisse. CoreChain zerlegt, orchestriert 
                und optimiert automatisch - du bekommst die beste Lösung, ohne Workflow-Design.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
                  <span>Kostenlos starten</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#how-it-works" className="btn-secondary inline-flex items-center space-x-2">
                  <span>Wie es funktioniert</span>
                </a>
              </div>
            </div>

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

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Wie CoreChain funktioniert
            </h2>
            <p className="text-xl text-gray-400">
              Von der Anfrage zum perfekten Ergebnis in 4 Schritten
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-purple-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-400">
              Alles was du für komplexe KI-Workflows brauchst
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
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

      {/* Code Example */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Einfache Integration
            </h2>
            <p className="text-xl text-gray-400">
              Starte in wenigen Minuten
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">corechain-example.js</span>
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

      {/* Use Cases */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Unbegrenzte Möglichkeiten
            </h2>
            <p className="text-xl text-gray-400">
              Von einfach bis komplex - CoreChain orchestriert alles
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
                <div className="glass-effect rounded-lg p-4 mb-4">
                  <p className="text-sm text-purple-400 italic">
                    Beispiel: {useCase.example}
                  </p>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold">{useCase.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Flexible Preisgestaltung
            </h2>
            <p className="text-xl text-gray-400">
              Vom Hobby-Projekt bis Enterprise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card ${plan.highlighted ? 'border-purple-500 relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Am beliebtesten
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
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                      : 'glass-effect hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für intelligente Orchestrierung?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Starte noch heute und erlebe die Zukunft der KI-Workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Jetzt kostenlos starten</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Demo anfragen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreChainAI;
