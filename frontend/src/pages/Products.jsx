import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Code,
  Home,
  Network,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Cpu,
  Database,
  Cloud,
  Terminal,
  Layers,
  Settings
} from 'lucide-react';

const Products = () => {
  const mainProducts = [
    {
      id: 'framespell',
      name: 'FrameSpell API',
      tagline: 'Intelligente Rechtschreibprüfung',
      description: 'KI-gestützte Rechtschreib- und Grammatikprüfung für perfekte Texte. Erkennt Kontextfehler, Stilprobleme und bietet intelligente Vorschläge.',
      icon: <Sparkles className="w-12 h-12" />,
      color: 'from-blue-500 to-cyan-500',
      status: 'Live',
      features: [
        'Kontextbasierte Korrektur',
        'Mehrsprachige Unterstützung',
        'Stil- und Tonanalyse',
        'API & SDK Integration',
        'Echtzeit-Vorschläge',
        'Custom Dictionary Support'
      ],
      useCases: [
        'Content Management Systeme',
        'E-Mail Clients',
        'Textverarbeitungs-Software',
        'Chat-Anwendungen'
      ],
      pricing: {
        free: '€0/Monat - 20 Anfragen/Min',
        professional: '€29/Monat - 100 Anfragen/Min',
        enterprise: 'Individuell'
      },
      link: '/products/framespell'
    },
    {
      id: 'corechain-ai',
      name: 'CoreChain AI',
      tagline: 'KI-Orchestrierung der nächsten Generation',
      description: 'Revolutionäres KI-Orchestrierungstool, das komplexe Benutzeranfragen automatisch in Subtasks zerlegt und intelligent an spezialisierte KI-Agenten verteilt. Am Ende erhältst du ein perfektes, zusammengefasstes Ergebnis.',
      icon: <Brain className="w-12 h-12" />,
      color: 'from-purple-500 to-pink-500',
      status: 'Live',
      features: [
        'Automatische Task-Zerlegung',
        'Multi-Agent Orchestrierung',
        'Intelligentes Routing',
        'Ergebnis-Synthese',
        'Kontext-Management',
        'Fehlerbehandlung & Retry-Logik'
      ],
      useCases: [
        'Komplexe Datenanalysen',
        'Content-Generierung',
        'Research & Summarization',
        'Multi-Step Workflows'
      ],
      pricing: {
        tokens: 'Token-System ab €2.99',
        trial: 'Premium Trial: €9.99/Monat',
        team: 'Team-Zusammenarbeit: €19.99/Monat'
      },
      link: '/products/corechain-ai'
    },
    {
      id: 'corechain-api',
      name: 'CoreChain API',
      tagline: 'Entwickler-Power für KI-Orchestrierung',
      description: 'Vollständiger API-Zugriff auf CoreChain AI für Entwickler. Integriere intelligente KI-Orchestrierung direkt in deine Anwendungen. Skalierbar, zuverlässig, entwicklerfreundlich.',
      icon: <Code className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-500',
      status: 'Live',
      features: [
        'RESTful & GraphQL APIs',
        'WebSocket Support',
        'SDK für alle Sprachen',
        'Umfangreiche Dokumentation',
        'Webhook Integration',
        'Rate Limiting & Quotas'
      ],
      useCases: [
        'Custom AI Workflows',
        'Enterprise Integrationen',
        'Automatisierungs-Plattformen',
        'SaaS-Produkte'
      ],
      pricing: {
        free: '€0/Monat - 18 Anfragen/Min',
        professional: '€29/Monat - 80 Anfragen/Min',
        enterprise: 'Individuell'
      },
      link: '/products/corechain-api'
    },
    {
      id: 'spherehub',
      name: 'SphereHub',
      tagline: 'Dein digitaler Butler für Zuhause',
      description: 'Physisches und virtuelles Home-Device, das smarte KI-Modelle und Chains lokal ausführt. Verbindet all deine Smart-Home-Geräte und fungiert als intelligenter Butler für deinen Alltag - komplett privat und offline-fähig.',
      icon: <Home className="w-12 h-12" />,
      color: 'from-orange-500 to-red-500',
      status: 'Beta',
      features: [
        'Lokale KI-Ausführung',
        'Smart Home Integration',
        'Voice & Touch Control',
        'Offline-Funktionalität',
        'Privacy-First Design',
        'Custom Chain Builder'
      ],
      useCases: [
        'Smart Home Automation',
        'Persönlicher Assistent',
        'Home Security',
        'Energy Management',
        'Family Hub'
      ],
      pricing: {
        basis: '€199 - Basismodell',
        pro: '€299 - Promodell',
        enterprise: 'Individuell - Firmenserver'
      },
      link: '/products/spherehub'
    },
    {
      id: 'spherenet',
      name: 'SphereNet',
      tagline: 'Das globale KI-Netzwerk',
      description: 'Zugriff auf ein riesiges Netzwerk von öffentlichen KI-Modellen und Chains. Nutze spezialisierte KI-Modelle für jeden Zweck - von Bildgenerierung bis Datenanalyse. Einfacher Zugang via API Keys.',
      icon: <Network className="w-12 h-12" />,
      color: 'from-indigo-500 to-blue-500',
      status: 'Coming Soon',
      features: [
        '1000+ KI-Modelle',
        'Community Chains',
        'Model Marketplace',
        'API Key Management',
        'Usage Analytics',
        'Custom Model Hosting'
      ],
      useCases: [
        'AI Model Discovery',
        'Prototyping',
        'Production AI Apps',
        'Research & Development'
      ],
      pricing: {
        standard: '€0 - Bis zu 10 API Keys',
        pro: '€20 - Unbegrenzt Keys',
        creator: '€49.99 - Eigene Modelle hochladen'
      },
      link: '/products/spherenet'
    }
  ];

  const additionalProjects = [
    {
      icon: <Terminal className="w-8 h-8" />,
      name: 'FrameCLI',
      description: 'Command-Line Interface für alle FrameSphere Dienste',
      status: 'In Development'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      name: 'ChainBuilder Studio',
      description: 'Visueller Editor für KI-Workflow-Chains',
      status: 'In Development'
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: 'SphereDB',
      description: 'Vector Database für KI-Embeddings',
      status: 'Coming Soon'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      name: 'SphereCloud',
      description: 'Managed Cloud-Hosting für KI-Workloads',
      status: 'Planning'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      name: 'Model Forge',
      description: 'Fine-Tuning Platform für Custom AI Models',
      status: 'Planning'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      name: 'SphereConnect',
      description: 'Integration Hub für Third-Party Services',
      status: 'Planning'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Beta':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Coming Soon':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'In Development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Planning':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="glass-effect px-4 py-2 rounded-full text-sm text-primary-400 border border-primary-500/30">
              🚀 5 Live Products + 6 In Development
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Unsere Produkte</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entdecke die komplette FrameSphere Produktpalette - von intelligenten APIs bis zu physischen AI-Devices
          </p>
        </div>

        {/* Main Products */}
        <div className="space-y-12 mb-20">
          {mainProducts.map((product, index) => (
            <div
              key={product.id}
              className="card hover:scale-[1.02] transition-all duration-300"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Icon & Basic Info */}
                <div className="md:col-span-1">
                  <div className={`w-20 h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center mb-4 animate-glow`}>
                    {product.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold text-white">
                      {product.name}
                    </h2>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-primary-400 font-semibold mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    {product.description}
                  </p>
                  <Link
                    to={product.link}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <span>Mehr erfahren</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Middle: Features */}
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-400 text-sm">
                        <Zap className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Use Cases & Pricing */}
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Use Cases
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {product.useCases.map((useCase, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <span className="text-primary-500 mr-2">→</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>

                  <div className="glass-effect rounded-lg p-4 border border-primary-500/30">
                    <h4 className="text-sm font-semibold text-white mb-3">Pricing</h4>
                    {Object.entries(product.pricing).map(([tier, price]) => (
                      <div key={tier} className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-400 capitalize">{tier}:</span>
                        <span className="text-primary-400 font-semibold">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Weitere Projekte in Entwicklung
            </h2>
            <p className="text-gray-400">
              Diese Produkte befinden sich in verschiedenen Entwicklungsphasen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalProjects.map((project, index) => (
              <div key={index} className="card group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit für die KI-Revolution?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Wähle das perfekte Produkt für deine Anforderungen oder kontaktiere uns für eine individuelle Lösung
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Jetzt starten</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <span>Kontakt aufnehmen</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
