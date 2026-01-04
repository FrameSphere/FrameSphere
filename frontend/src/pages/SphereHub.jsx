import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  CheckCircle,
  Zap,
  Shield,
  Wifi,
  Cpu,
  HardDrive,
  ArrowRight,
  Smartphone,
  Lock,
  Cloud,
  Activity,
  Battery,
  Gauge,
  Package,
  Truck
} from 'lucide-react';

const SphereHub = () => {
  const [selectedModel, setSelectedModel] = useState('pro');

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Lokale KI-Ausführung',
      description: 'Führe KI-Modelle und Chains komplett lokal aus. Keine Cloud nötig, maximale Privacy und keine Latenz. Deine Daten bleiben zu Hause.'
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: 'Smart Home Integration',
      description: 'Verbinde alle deine Smart-Home-Geräte: Philips Hue, Nest, HomeKit, Alexa, Google Home und mehr. Zentrale Steuerung für alles.'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Voice & Touch Control',
      description: 'Steuere SphereHub per Sprache oder über das intuitive Touch-Display. Auch per App von überall aus der Welt steuerbar.'
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'Offline-Funktionalität',
      description: 'Funktioniert auch ohne Internet. Alle KI-Funktionen laufen lokal auf dem Device. Internet nur für Updates und Cloud-Sync nötig.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Privacy-First Design',
      description: 'Keine Daten verlassen dein Haus ohne deine Erlaubnis. Ende-zu-Ende Verschlüsselung und Open-Source Software für vollste Transparenz.'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Custom Chain Builder',
      description: 'Erstelle eigene Automatisierungs-Chains ohne Code. "Wenn X passiert, dann tue Y" - so einfach ist es. Unbegrenzte Möglichkeiten.'
    }
  ];

  const models = [
    {
      id: 'basis',
      name: 'Basismodell',
      price: '€199',
      delivery: '9 Tage Lieferzeit',
      chip: 'Google Coral USB Accelerator',
      specs: [
        { icon: <Cpu className="w-5 h-5" />, label: 'Google Coral USB Accelerator Chip' },
        { icon: <HardDrive className="w-5 h-5" />, label: '1 TB Speicher' },
        { icon: <Activity className="w-5 h-5" />, label: '16GB RAM' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Bis zu 15 Geräte verbinden' },
        { icon: <Shield className="w-5 h-5" />, label: '1 Jahr Garantie' }
      ],
      features: [
        'Basis KI-Modelle vorinstalliert',
        'Smart Home Hub',
        'Mobile App',
        'Community Support',
        'Software Updates'
      ],
      color: 'from-orange-500 to-orange-600',
      note: 'Perfekt für Einsteiger'
    },
    {
      id: 'pro',
      name: 'Promodell',
      price: '€299',
      delivery: '7 Tage Lieferzeit',
      badge: 'Empfohlen',
      chip: 'Jetson Xavier NX',
      specs: [
        { icon: <Cpu className="w-5 h-5" />, label: 'Jetson Xavier NX Chip' },
        { icon: <HardDrive className="w-5 h-5" />, label: '2 TB Speicher' },
        { icon: <Activity className="w-5 h-5" />, label: '32GB RAM' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Bis zu 20 Geräte verbinden' },
        { icon: <Shield className="w-5 h-5" />, label: '1 Jahr Garantie' }
      ],
      features: [
        'Alle Features vom Basismodell',
        'Erweiterte KI-Modelle',
        'Voice Control',
        'Priority Support',
        'Custom Chain Builder',
        'Advanced Analytics'
      ],
      color: 'from-orange-500 to-red-500',
      note: 'Beste Wahl für die meisten Nutzer'
    },
    {
      id: 'enterprise',
      name: 'Firmenserver',
      price: 'Individuell',
      delivery: 'Custom zusammenbaubar',
      chip: 'Nach Bedarf',
      specs: [
        { icon: <Cpu className="w-5 h-5" />, label: 'Leistungsfähige Custom Chips' },
        { icon: <HardDrive className="w-5 h-5" />, label: 'Bis zu 20 TB Speicher' },
        { icon: <Activity className="w-5 h-5" />, label: 'Bis zu 128GB RAM' },
        { icon: <Wifi className="w-5 h-5" />, label: 'Unbegrenzt Geräte' },
        { icon: <Shield className="w-5 h-5" />, label: 'Enterprise SLA' }
      ],
      features: [
        'Alle Features',
        'Dedizierter Support',
        'On-Site Installation',
        'Custom Hardware',
        'Multi-Location Support',
        'White-Label Option'
      ],
      color: 'from-red-500 to-red-600',
      note: 'Für große Unternehmen und Campuses'
    }
  ];

  const useCases = [
    {
      title: 'Smart Home Automation',
      description: 'Steuere Licht, Heizung, Jalousien und mehr. Erstelle intelligente Szenen basierend auf Zeit, Wetter oder deinen Gewohnheiten.',
      icon: <Home className="w-8 h-8" />,
      example: '"Guten Morgen Modus: Licht an, Kaffee starten, News vorlesen"'
    },
    {
      title: 'Persönlicher Assistent',
      description: 'Dein digitaler Butler hilft bei Kalendern, Erinnerungen, Einkaufslisten und beantwortet Fragen - alles ohne Cloud.',
      icon: <Smartphone className="w-8 h-8" />,
      example: '"Erinnere mich morgen um 9 Uhr an Meeting mit Team"'
    },
    {
      title: 'Home Security',
      description: 'Überwache dein Zuhause mit KI-gestützter Kamera-Analyse. Erkenne Personen, Tiere und ungewöhnliche Aktivitäten.',
      icon: <Shield className="w-8 h-8" />,
      example: 'Benachrichtigung wenn unbekannte Person im Garten erkannt wird'
    },
    {
      title: 'Energy Management',
      description: 'Optimiere deinen Energieverbrauch automatisch. Lerne Nutzungsmuster und reduziere Kosten ohne Komfortverlust.',
      icon: <Battery className="w-8 h-8" />,
      example: 'Spare bis zu 30% Energie durch intelligente Gerätesteuerung'
    }
  ];

  const techSpecs = [
    {
      category: 'Prozessor',
      basis: 'Google Coral USB Accelerator',
      pro: 'NVIDIA Jetson Xavier NX',
      enterprise: 'Custom High-End CPU/GPU'
    },
    {
      category: 'RAM',
      basis: '16GB',
      pro: '32GB',
      enterprise: 'Bis zu 128GB'
    },
    {
      category: 'Speicher',
      basis: '1TB SSD',
      pro: '2TB NVMe SSD',
      enterprise: 'Bis zu 20TB'
    },
    {
      category: 'Konnektivität',
      basis: 'WiFi 5, Bluetooth 5.0',
      pro: 'WiFi 6, Bluetooth 5.2',
      enterprise: 'WiFi 6E, 10GbE, Custom'
    },
    {
      category: 'Ports',
      basis: '4x USB 3.0, 2x USB-C',
      pro: '6x USB 3.0, 2x USB-C, HDMI',
      enterprise: 'Custom nach Bedarf'
    },
    {
      category: 'Geräte-Limit',
      basis: 'Bis zu 15',
      pro: 'Bis zu 20',
      enterprise: 'Unbegrenzt'
    }
  ];

  const stats = [
    { value: '10.000+', label: 'Aktive Geräte' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Offline-Fähig' },
    { value: '50+', label: 'Integrationen' }
  ];

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Produkte
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">SphereHub</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center animate-glow">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                  Beta
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6">
                <span className="gradient-text">SphereHub</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-4">
                Dein digitaler Butler für Zuhause
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Physisches Smart-Home-Device mit lokaler KI. Verbindet alle deine Geräte, 
                führt KI-Modelle aus und fungiert als intelligenter Butler - komplett privat und offline-fähig.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#models" className="btn-primary inline-flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Modell wählen</span>
                </a>
                <a href="#specs" className="btn-secondary inline-flex items-center space-x-2">
                  <Gauge className="w-5 h-5" />
                  <span>Tech Specs</span>
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
              Dein Smart Home, neu gedacht
            </h2>
            <p className="text-xl text-gray-400">
              Lokale KI-Power trifft auf einfache Bedienung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 mb-4">
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

      {/* Models */}
      <section id="models" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Wähle dein Modell
            </h2>
            <p className="text-xl text-gray-400">
              Vom Einsteiger bis Enterprise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className={`card relative cursor-pointer transition-all ${
                  selectedModel === model.id ? 'border-orange-500 scale-105' : ''
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                {model.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`bg-gradient-to-r ${model.color} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                      {model.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{model.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{model.price}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-orange-400 mb-4">
                    <Truck className="w-4 h-4 mr-1" />
                    {model.delivery}
                  </div>
                  <p className="text-sm text-gray-400 italic">{model.note}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Hardware Specs:</h4>
                  <div className="space-y-2">
                    {model.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 text-sm">
                        <div className="text-orange-400 mr-2">{spec.icon}</div>
                        <span>{spec.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    selectedModel === model.id
                      ? `bg-gradient-to-r ${model.color} text-white`
                      : 'glass-effect hover:bg-white/10 text-white'
                  }`}
                >
                  {model.price === 'Individuell' ? 'Kontakt aufnehmen' : 'Jetzt bestellen'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs Comparison */}
      <section id="specs" className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technische Daten
            </h2>
            <p className="text-xl text-gray-400">
              Detaillierter Vergleich aller Modelle
            </p>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Spezifikation</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Basismodell</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Promodell</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Firmenserver</th>
                </tr>
              </thead>
              <tbody>
                {techSpecs.map((spec, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-400">{spec.category}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{spec.basis}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{spec.pro}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{spec.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Unendliche Möglichkeiten
            </h2>
            <p className="text-xl text-gray-400">
              Was kannst du mit SphereHub machen?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="card">
                <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {useCase.description}
                </p>
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-sm text-orange-400 italic">
                    {useCase.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
            <Home className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für dein Smart Home?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Bestelle jetzt und verwandle dein Zuhause in ein intelligentes Ökosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#models" className="btn-primary inline-flex items-center justify-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Jetzt bestellen</span>
              </a>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Beratung anfragen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SphereHub;
