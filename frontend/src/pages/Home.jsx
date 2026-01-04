import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Brain, 
  Network, 
  Code, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Rocket
} from 'lucide-react';

const Home = () => {
  const products = [
    {
      name: 'FrameSpell API',
      description: 'Fortschrittliche Rechtschreibprüfung mit KI-Power',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      link: '/products/framespell'
    },
    {
      name: 'CoreChain AI',
      description: 'KI-Orchestrierung für komplexe Workflows',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      link: '/products/corechain'
    },
    {
      name: 'CoreChain API',
      description: 'Entwickler-API für AI-Orchestrierung',
      icon: <Code className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      link: '/products/corechain-api'
    },
    {
      name: 'SphereHub',
      description: 'Lokale AI-Modelle & Smart Home Integration',
      icon: <Network className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      link: '/products/spherehub'
    },
    {
      name: 'SphereNet',
      description: 'Öffentliches Netzwerk von KI-Modellen',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      link: '/products/spherenet'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Blitzschnell',
      description: 'Optimierte APIs mit minimaler Latenz'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sicher',
      description: 'Enterprise-Grade Security & DSGVO-konform'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Intelligent',
      description: 'State-of-the-Art AI-Modelle'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Entwicklerfreundlich',
      description: 'Umfassende Dokumentation & SDKs'
    }
  ];

  const stats = [
    { value: '1M+', label: 'API Calls/Monat' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50ms', label: 'Durchschn. Latenz' },
    { value: '1000+', label: 'Entwickler' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="glass-effect px-4 py-2 rounded-full text-sm text-primary-400 border border-primary-500/30">
                🚀 Jetzt neu: SphereHub 2.0
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Build with AI.</span>
              <br />
              <span className="text-white">Chain, connect, innovate.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              FrameSphere ist die führende Plattform für AI-Orchestrierung. 
              Verbinde KI-Modelle zu intelligenten Workflows und bringe deine Anwendungen auf das nächste Level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Kostenlos starten</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/developers" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Dokumentation</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="card">
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

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Unsere Produkte
            </h2>
            <p className="text-xl text-gray-400">
              Leistungsstarke Tools für jede Anforderung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                to={product.link}
                className="card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4 group-hover:animate-glow`}>
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {product.description}
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

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Warum FrameSphere?
            </h2>
            <p className="text-xl text-gray-400">
              Die beste Plattform für AI-Entwicklung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Rocket className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit durchzustarten?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Starte noch heute und nutze die Kraft von AI für deine Projekte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Kostenlos registrieren</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Kontakt aufnehmen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
