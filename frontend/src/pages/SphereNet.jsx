import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  CheckCircle,
  X,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Database,
  TrendingUp,
  Users,
  Key,
  Upload,
  Download,
  DollarSign,
  Star,
  Crown,
  Award
} from 'lucide-react';

const SphereNet = () => {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: '1000+ KI-Modelle',
      description: 'Zugriff auf ein riesiges Netzwerk von öffentlichen und privaten KI-Modellen. Von Text bis Bild, von Audio bis Video.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Chains',
      description: 'Nutze fertige AI-Chains der Community oder teile deine eigenen. Gemeinsam sind wir stärker.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Model Marketplace',
      description: 'Verdiene Geld mit deinen eigenen KI-Modellen. Setze Preise, verwalte Lizenzen und erhalte automatische Auszahlungen.'
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: 'API Key Management',
      description: 'Erstelle unbegrenzt API Keys (abhängig vom Plan). Verwalte Permissions und überwache Usage in Echtzeit.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Usage Analytics',
      description: 'Detaillierte Statistiken über Model-Nutzung, Kosten, Performance und mehr. Optimiere deine AI-Workflows.'
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Custom Model Hosting',
      description: 'Hoste deine eigenen Modelle auf unserer Infrastruktur. Automatisches Scaling und weltweite Verfügbarkeit.'
    }
  ];

  const accountTypes = [
    {
      name: 'Benutzer Account',
      subtitle: 'Standard',
      price: '€0',
      description: 'Kostenlos KI-Modelle nutzen',
      icon: <Users className="w-12 h-12" />,
      features: [
        'Account kostenlos einrichten',
        'Mind. €5 Startguthaben bei Nutzung',
        'KI Modelle nach Nutzungsbedingungen nutzen',
        'Bis zu 10 API Keys/Chains erstellen',
        'Pay-per-use Abrechnung',
        'Community Support'
      ],
      limits: [
        'Keine eigenen Modelle hochladen',
        'Begrenzte API Keys'
      ],
      cta: 'Kostenlos registrieren',
      highlighted: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Benutzer Account',
      subtitle: 'Pro',
      price: '€20',
      period: 'Einmalig zum Upgraden',
      badge: 'Beliebt',
      description: 'Für Power-User',
      icon: <Star className="w-12 h-12" />,
      features: [
        'Alle Standard Features',
        'Mind. €5 Startguthaben bei Nutzung',
        'Unbegrenzt API Keys/Chains erstellen',
        'Priority API Access',
        'Erweiterte Analytics',
        'E-Mail Support'
      ],
      limits: [
        'Keine eigenen Modelle hochladen'
      ],
      cta: 'Jetzt upgraden',
      highlighted: true,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'Creator Account',
      subtitle: 'Premium',
      price: '€49.99',
      period: 'Einmalig',
      description: 'Für Content Creator',
      icon: <Crown className="w-12 h-12" />,
      features: [
        'Alle Pro Features',
        'Mind. €5 Startguthaben',
        'Unbegrenzt API Keys erstellen',
        'Unbegrenzt KI Modelle hochladen',
        'Preise frei festlegen',
        'Zugriff auf KI Empfehlung',
        'Revenue Share: 70/30',
        'Priority Support',
        'Verified Creator Badge'
      ],
      limits: [],
      cta: 'Premium werden',
      highlighted: false,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const modelCategories = [
    {
      name: 'Text Generation',
      count: '250+',
      icon: '📝',
      examples: ['GPT-ähnliche Modelle', 'Zusammenfassungen', 'Übersetzungen']
    },
    {
      name: 'Image Generation',
      count: '180+',
      icon: '🎨',
      examples: ['Stable Diffusion', 'DALL-E Style', 'Image-to-Image']
    },
    {
      name: 'Audio Processing',
      count: '120+',
      icon: '🎵',
      examples: ['Speech-to-Text', 'Music Generation', 'Voice Cloning']
    },
    {
      name: 'Video Analysis',
      count: '80+',
      icon: '🎬',
      examples: ['Object Detection', 'Scene Analysis', 'Tracking']
    },
    {
      name: 'Data Analysis',
      count: '150+',
      icon: '📊',
      examples: ['Prediction', 'Classification', 'Clustering']
    },
    {
      name: 'Specialized',
      count: '220+',
      icon: '⚡',
      examples: ['Code Generation', 'Chemistry', 'Biology', 'Custom']
    }
  ];

  const pricingExample = [
    {
      model: 'GPT-4 Turbo',
      provider: 'OpenAI',
      inputCost: '€0.01 / 1K tokens',
      outputCost: '€0.03 / 1K tokens'
    },
    {
      model: 'Stable Diffusion XL',
      provider: 'Stability AI',
      inputCost: '€0.02 / Bild',
      outputCost: '-'
    },
    {
      model: 'Whisper Large',
      provider: 'OpenAI',
      inputCost: '€0.006 / Minute',
      outputCost: '-'
    }
  ];

  const creatorBenefits = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Modelle hochladen',
      description: 'Lade deine trainierten Modelle hoch. Wir übernehmen Hosting, Scaling und Distribution.'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Geld verdienen',
      description: 'Setze deine eigenen Preise. 70% Revenue Share für Creator. Automatische Auszahlungen monatlich.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Analytics Dashboard',
      description: 'Sehe genau wer deine Modelle nutzt, wie viel du verdienst und optimiere deine Strategie.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Verified Badge',
      description: 'Erhalte ein Verified Creator Badge. Mehr Vertrauen = mehr Nutzer = mehr Revenue.'
    }
  ];

  const stats = [
    { value: '1000+', label: 'KI-Modelle' },
    { value: '50K+', label: 'Aktive Nutzer' },
    { value: '10M+', label: 'API Calls/Monat' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Produkte
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">SphereNet</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center animate-glow">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-sm">
                  Coming Soon
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">SphereNet</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-4">
                Das globale KI-Netzwerk
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Zugriff auf über 1000 KI-Modelle und Chains. Nutze spezialisierte AI für jeden Zweck 
                oder werde Creator und verdiene mit deinen eigenen Modellen.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
                  <span>Früher Zugang sichern</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#models" className="btn-secondary inline-flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Modelle erkunden</span>
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
              Die größte KI-Model Library
            </h2>
            <p className="text-xl text-gray-400">
              Alles was du brauchst, an einem Ort
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
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

      {/* Model Categories */}
      <section id="models" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Model-Kategorien
            </h2>
            <p className="text-xl text-gray-400">
              Über 1000 Modelle in 6 Hauptkategorien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelCategories.map((category, index) => (
              <div key={index} className="card hover:scale-105 transition-all">
                <div className="text-5xl mb-4">{category.icon}</div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <span className="text-indigo-400 font-semibold">
                    {category.count}
                  </span>
                </div>
                <ul className="space-y-1">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="text-sm text-gray-400">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Example */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Transparente Preise
            </h2>
            <p className="text-xl text-gray-400">
              Pay-per-use - nur was du nutzt
            </p>
          </div>

          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Model</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Provider</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-semibold">Input Kosten</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-semibold">Output Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingExample.map((item, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 px-4 text-white font-semibold">{item.model}</td>
                      <td className="py-4 px-4 text-gray-400">{item.provider}</td>
                      <td className="py-4 px-4 text-right text-indigo-400">{item.inputCost}</td>
                      <td className="py-4 px-4 text-right text-indigo-400">{item.outputCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 glass-effect rounded-lg">
              <p className="text-sm text-gray-400">
                💡 <strong>Hinweis:</strong> Preise variieren je nach Model. Mind. €5 Startguthaben erforderlich bei Nutzung kostenpflichtiger Modelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Wähle deinen Account-Typ
            </h2>
            <p className="text-xl text-gray-400">
              Vom Nutzer bis Creator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {accountTypes.map((account, index) => (
              <div
                key={index}
                className={`card relative ${account.highlighted ? 'border-indigo-500' : ''}`}
              >
                {account.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`bg-gradient-to-r ${account.color} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                      {account.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${account.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                    {account.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {account.name}
                  </h3>
                  <div className="text-sm text-indigo-400 mb-3">
                    {account.subtitle}
                  </div>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{account.price}</span>
                  </div>
                  {account.period && (
                    <div className="text-sm text-gray-400 mb-2">{account.period}</div>
                  )}
                  <p className="text-sm text-gray-400 italic">{account.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {account.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {account.limits.map((limit, idx) => (
                    <li key={idx} className="flex items-start text-gray-500">
                      <X className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm line-through">{limit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-all ${
                    account.highlighted
                      ? `bg-gradient-to-r ${account.color} hover:opacity-90 text-white`
                      : 'glass-effect hover:bg-white/10 text-white'
                  }`}
                >
                  {account.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Benefits */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Crown className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Werde Creator
            </h2>
            <p className="text-xl text-gray-400">
              Verdiene Geld mit deinen KI-Modellen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {creatorBenefits.map((benefit, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="card text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              70/30 Revenue Share
            </h3>
            <p className="text-xl text-gray-400 mb-6">
              Du behältst 70% aller Einnahmen. Automatische Auszahlung monatlich ab €50.
            </p>
            <Link to="/register" className="btn-primary inline-block">
              Creator Account erstellen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-indigo-500/30">
            <Network className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für das KI-Netzwerk?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Sichere dir frühen Zugang zu SphereNet und sei einer der Ersten
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Früher Zugang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Mehr erfahren</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SphereNet;
