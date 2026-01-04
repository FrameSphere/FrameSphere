import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Book,
  Zap,
  Key,
  FileText,
  Terminal,
  CheckCircle,
  ArrowRight,
  Download,
  Activity,
  Shield,
  Sparkles,
  Brain,
  Network,
  Copy,
  ExternalLink
} from 'lucide-react';

const DeveloperHub = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const quickstartCode = `# Installiere das FrameSphere SDK
pip install framesphere

# Importiere und initialisiere
from framesphere import FrameSpell

# Setze deinen API Key
client = FrameSpell(api_key="dein_api_key")

# Erste Anfrage
response = client.check_spelling(
    text="Helo Welt, wie geths dir?"
)

print(response.corrected_text)
# Output: "Hallo Welt, wie geht es dir?"`;

  const products = [
    {
      id: 'framespell',
      name: 'FrameSpell API',
      description: 'KI-gestützte Rechtschreibprüfung',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      endpoint: 'https://api.framesphere.dev/v1/framespell',
      docs: '/developers/docs/framespell',
      features: ['Kontextbasierte Korrektur', 'Mehrsprachig', 'Stilanalyse']
    },
    {
      id: 'corechain-api',
      name: 'CoreChain API',
      description: 'AI-Orchestrierung via API',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      endpoint: 'https://api.framesphere.dev/v1/corechain',
      docs: '/developers/docs/corechain',
      features: ['Multi-Agent System', 'Task Routing', 'Ergebnis-Synthese']
    },
    {
      id: 'spherenet',
      name: 'SphereNet',
      description: 'Zugriff auf KI-Modell-Netzwerk',
      icon: <Network className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      endpoint: 'https://api.framesphere.dev/v1/spherenet',
      docs: '/developers/docs/spherenet',
      features: ['1000+ Modelle', 'Custom Chains', 'Multimodal']
    }
  ];

  const quickLinks = [
    {
      title: 'Quickstart Guide',
      description: 'In 5 Minuten zur ersten API-Anfrage',
      icon: <Zap className="w-6 h-6" />,
      link: '/developers/quickstart',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'API Dokumentation',
      description: 'Vollständige Referenz aller Endpoints',
      icon: <Book className="w-6 h-6" />,
      link: '/developers/docs',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'SDKs & Libraries',
      description: 'Offizielle SDKs für alle Sprachen',
      icon: <Code className="w-6 h-6" />,
      link: '/developers/sdks',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'API Keys',
      description: 'Verwalte deine API-Zugriffsschlüssel',
      icon: <Key className="w-6 h-6" />,
      link: '/dashboard',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Tutorials',
      description: 'Schritt-für-Schritt Anleitungen',
      icon: <FileText className="w-6 h-6" />,
      link: '/developers/tutorials',
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Status & Uptime',
      description: 'Aktuelle API-Verfügbarkeit',
      icon: <Activity className="w-6 h-6" />,
      link: '/developers/status',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const languages = [
    { name: 'Python', icon: '🐍', docs: '#python' },
    { name: 'JavaScript', icon: '📜', docs: '#javascript' },
    { name: 'Java', icon: '☕', docs: '#java' },
    { name: 'Go', icon: '🔷', docs: '#go' },
    { name: 'PHP', icon: '🐘', docs: '#php' },
    { name: 'C#', icon: '#️⃣', docs: '#csharp' },
    { name: 'R', icon: '📊', docs: '#r' },
    { name: 'cURL', icon: '🌐', docs: '#curl' }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full mb-6">
              <Terminal className="w-5 h-5 text-primary-400" />
              <span className="text-primary-400 font-semibold">Developer Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build with <span className="gradient-text">FrameSphere</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Leistungsstarke APIs für KI-Orchestrierung, Textkorrektur und mehr. 
              Integriere in Minuten, skaliere ohne Limits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Kostenlos starten</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/developers/docs" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Zur Dokumentation</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">&lt;50ms</div>
              <div className="text-sm text-gray-400">Avg. Latency</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">8</div>
              <div className="text-sm text-gray-400">SDKs</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Code */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Start in 30 Sekunden
            </h2>
            <p className="text-xl text-gray-400">
              Von der Installation bis zur ersten API-Anfrage
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">quickstart.py</span>
              </div>
              <button
                onClick={() => copyCode(quickstartCode)}
                className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
              >
                {copiedCode === quickstartCode ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
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
              <code className="text-sm text-gray-300 font-mono whitespace-pre">
                {quickstartCode}
              </code>
            </pre>
          </div>

          <div className="text-center mt-6">
            <Link to="/developers/quickstart" className="text-primary-400 hover:text-primary-300 inline-flex items-center space-x-2">
              <span>Vollständigen Quickstart Guide ansehen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Products/APIs */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Unsere APIs
            </h2>
            <p className="text-xl text-gray-400">
              Wähle die passende API für dein Projekt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card group hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Endpoint:</div>
                  <code className="text-xs text-primary-400 font-mono">
                    {product.endpoint}
                  </code>
                </div>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={product.docs}
                  className="btn-secondary w-full inline-flex items-center justify-center space-x-2"
                >
                  <Book className="w-4 h-4" />
                  <span>Dokumentation</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ressourcen für Entwickler
            </h2>
            <p className="text-xl text-gray-400">
              Alles was du brauchst, um durchzustarten
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {link.description}
                </p>
                <div className="flex items-center text-primary-400 group-hover:text-primary-300">
                  <span className="text-sm font-semibold">Mehr erfahren</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Language SDKs */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              SDKs & Code-Beispiele
            </h2>
            <p className="text-xl text-gray-400">
              Offizielle SDKs für deine Lieblings-Programmiersprache
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {languages.map((lang, index) => (
              <Link
                key={index}
                to={`/developers/sdks${lang.docs}`}
                className="card text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{lang.icon}</div>
                <div className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {lang.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/developers/sdks" className="btn-primary inline-flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Alle SDKs ansehen</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Deine Daten sind sicher. Wir nehmen Sicherheit ernst.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">DSGVO-konform</h3>
              <p className="text-sm text-gray-400">100% europäische Server</p>
            </div>
            <div className="card">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Verschlüsselt</h3>
              <p className="text-sm text-gray-400">End-to-End TLS 1.3</p>
            </div>
            <div className="card">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-gray-400">Zertifiziert & geprüft</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Code className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit zum Entwickeln?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Erstelle deinen Account und erhalte sofort Zugriff auf alle APIs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Kostenlos registrieren</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Preise ansehen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperHub;
