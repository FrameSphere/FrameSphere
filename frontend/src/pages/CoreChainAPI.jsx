import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  CheckCircle,
  Copy,
  Check,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Terminal,
  Book,
  Webhook,
  Key,
  TrendingUp,
  Clock
} from 'lucide-react';

const CoreChainAPI = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeExample = `// CoreChain API - Developer Integration
import { CoreChainClient } from '@framesphere/corechain-api';

const client = new CoreChainClient({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Simple orchestration request
const result = await client.orchestrate({
  task: "Analyze customer feedback and generate report",
  context: {
    source: "reviews_database",
    format: "pdf"
  }
});

console.log(result.taskId);
console.log(result.steps); // Auto-generated subtasks
console.log(result.status); // 'processing' | 'completed'

// Get real-time updates via WebSocket
client.on('task_update', (update) => {
  console.log(\`Step \${update.step}: \${update.status}\`);
});`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const features = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'RESTful & GraphQL APIs',
      description: 'Vollständige REST API und GraphQL Endpoint für flexible Integrationen. Wähle die API-Technologie, die am besten zu deinem Stack passt.'
    },
    {
      icon: <Webhook className="w-6 h-6" />,
      title: 'WebSocket Support',
      description: 'Real-time Updates für lange laufende Tasks. Erhalte Live-Updates über den Fortschritt deiner Orchestrierungen.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Multi-Language SDKs',
      description: 'Native SDKs für JavaScript, Python, PHP, Ruby, Go, Java und mehr. Type-safe und mit vollständiger IDE-Unterstützung.'
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Umfassende Dokumentation',
      description: 'Detaillierte API-Referenz, Tutorials, Code-Beispiele und interaktiver API-Explorer für schnellen Einstieg.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'API Key Rotation, IP Whitelisting, OAuth 2.0, und Ende-zu-Ende Verschlüsselung für maximale Sicherheit.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Rate Limiting & Quotas',
      description: 'Flexible Rate Limits pro API Key. Automatisches Throttling und detaillierte Usage Metriken im Dashboard.'
    }
  ];

  const endpoints = [
    {
      method: 'POST',
      endpoint: '/v1/orchestrate',
      description: 'Start eine neue Orchestrierung',
      color: 'text-green-400'
    },
    {
      method: 'GET',
      endpoint: '/v1/tasks/:id',
      description: 'Task Status & Ergebnisse abrufen',
      color: 'text-blue-400'
    },
    {
      method: 'GET',
      endpoint: '/v1/agents',
      description: 'Verfügbare Agenten auflisten',
      color: 'text-blue-400'
    },
    {
      method: 'POST',
      endpoint: '/v1/webhooks',
      description: 'Webhook für Updates registrieren',
      color: 'text-green-400'
    },
    {
      method: 'GET',
      endpoint: '/v1/usage',
      description: 'API Usage & Statistiken',
      color: 'text-blue-400'
    }
  ];

  const sdks = [
    { name: 'JavaScript/Node.js', icon: '📦', command: 'npm install @framesphere/corechain-api' },
    { name: 'Python', icon: '🐍', command: 'pip install corechain-api' },
    { name: 'PHP', icon: '🐘', command: 'composer require framesphere/corechain-api' },
    { name: 'Ruby', icon: '💎', command: 'gem install corechain-api' },
    { name: 'Go', icon: '🔷', command: 'go get github.com/framesphere/corechain-api' },
    { name: 'Java', icon: '☕', command: 'Maven/Gradle dependency' }
  ];

  const useCases = [
    {
      title: 'Custom AI Workflows',
      description: 'Baue eigene KI-gestützte Features direkt in deine Anwendung. Von Chatbots bis Business Intelligence.',
      example: 'E-Commerce: "Analysiere Verkaufsdaten + Erstelle Marketingkampagne"'
    },
    {
      title: 'Enterprise Integrationen',
      description: 'Verbinde CoreChain mit deinen internen Systemen. CRM, ERP, Datenbanken - alles orchestrierbar.',
      example: 'CRM: "Neue Leads analysieren + Scoring + Auto-Assignment"'
    },
    {
      title: 'Automatisierungs-Plattformen',
      description: 'Integriere in Zapier, Make.com oder baue eigene Automatisierungs-Workflows mit intelligenter KI.',
      example: 'Support: "Ticket klassifizieren + Lösung suchen + Antwort generieren"'
    },
    {
      title: 'SaaS-Produkte',
      description: 'Gib deinen Kunden Zugriff auf KI-Orchestrierung. White-Label Ready und einfach zu integrieren.',
      example: 'Analytics Tool: "Daten sammeln + Analysieren + Report erstellen"'
    }
  ];

  const pricingPlans = [
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

  const stats = [
    { value: '99.9%', label: 'API Uptime' },
    { value: '<100ms', label: 'Response Time' },
    { value: '6', label: 'SDK Sprachen' },
    { value: '50+', label: 'API Endpoints' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Produkte
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">CoreChain API</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center animate-glow">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                  Live
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">CoreChain API</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-4">
                Entwickler-Power für KI-Orchestrierung
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Vollständiger API-Zugriff auf CoreChain AI. Baue intelligente KI-Workflows 
                direkt in deine Anwendungen. Production-ready und developer-friendly.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
                  <span>API Key erstellen</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#docs" className="btn-secondary inline-flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>Dokumentation</span>
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

      {/* Features */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Developer-First Features
            </h2>
            <p className="text-xl text-gray-400">
              Alles was du für erfolgreiche Integration brauchst
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-4">
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

      {/* API Endpoints */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              API Endpoints
            </h2>
            <p className="text-xl text-gray-400">
              RESTful API mit intuitiven Endpoints
            </p>
          </div>

          <div className="card">
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="glass-effect rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className={`${endpoint.color} font-mono font-bold text-sm w-16`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-300 font-mono text-sm">
                      {endpoint.endpoint}
                    </code>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {endpoint.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Schnelle Integration
            </h2>
            <p className="text-xl text-gray-400">
              In wenigen Minuten produktiv
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">corechain-api-example.js</span>
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

      {/* SDKs */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              SDKs für jede Sprache
            </h2>
            <p className="text-xl text-gray-400">
              Native Unterstützung für deine bevorzugte Programmiersprache
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk, index) => (
              <div key={index} className="card hover:scale-105 transition-all">
                <div className="text-4xl mb-3">{sdk.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {sdk.name}
                </h3>
                <code className="text-sm text-gray-400 bg-dark-900 px-3 py-2 rounded block">
                  {sdk.command}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Perfekt für jedes Projekt
            </h2>
            <p className="text-xl text-gray-400">
              Von Startups bis Enterprise
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
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-sm text-green-400 italic">
                    {useCase.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Transparente API-Preise
            </h2>
            <p className="text-xl text-gray-400">
              Pay-as-you-grow Pricing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card ${plan.highlighted ? 'border-green-500 relative' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                      <CheckCircle className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
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
          <div className="card text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <Code className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit zum Entwickeln?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Erstelle deinen kostenlosen API Key und starte in Minuten
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <Key className="w-5 h-5" />
                <span>API Key erstellen</span>
              </Link>
              <a href="#docs" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Dokumentation lesen</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreChainAPI;
