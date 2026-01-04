import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Heart,
  Globe,
  Award,
  Rocket,
  Mail,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const About = () => {
  // 📝 ANPASSBARE WERTE - Hier kannst du alles ändern
  const companyInfo = {
    name: 'FrameSphere',
    tagline: 'Building the Future of AI Orchestration',
    founded: '2025',
    location: 'Mainz, Deutschland',
    employees: '5-10',
    description: 'FrameSphere ist ein innovatives Technologie-Startup, das sich auf die Entwicklung von KI-gestützten SaaS-Lösungen spezialisiert hat. Unsere Mission ist es, modernste AI-Orchestrierungstools zu entwickeln, die Unternehmen und Entwicklern helfen, ihre Workflows zu automatisieren und intelligenter zu arbeiten.'
  };

  const mission = {
    title: 'Unsere Mission',
    text: 'Wir glauben daran, dass KI-Technologie für jeden zugänglich sein sollte. Deshalb entwickeln wir intuitive, leistungsstarke Tools, die komplexe AI-Workflows vereinfachen und Entwicklern ermöglichen, innovative Lösungen zu bauen - ohne dabei die Kontrolle zu verlieren.'
  };

  const vision = {
    title: 'Unsere Vision',
    text: 'Wir streben danach, die führende Plattform für AI-Orchestrierung zu werden und eine Welt zu schaffen, in der jedes Unternehmen - unabhängig von seiner Größe - von den Vorteilen künstlicher Intelligenz profitieren kann.'
  };

  const values = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Wir pushen kontinuierlich die Grenzen des Möglichen und suchen nach neuen Wegen, AI-Technologie zugänglicher zu machen.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community First',
      description: 'Unsere Community steht im Mittelpunkt. Wir hören zu, lernen und entwickeln Produkte basierend auf echtem Feedback.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Transparenz',
      description: 'Offene Kommunikation, klare Preise und ehrliches Feedback sind die Grundpfeiler unserer Unternehmenskultur.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Geschwindigkeit und Zuverlässigkeit sind keine optionalen Features - sie sind Standard in allem, was wir bauen.'
    }
  ];

  const team = [
    {
      name: 'Max Müller',
      role: 'CEO & Founder',
      bio: 'AI-Enthusiast mit 10+ Jahren Erfahrung in der Softwareentwicklung.',
      image: '👨‍💼', // Ersetze mit echtem Bild-URL
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Schmidt',
      role: 'CTO',
      bio: 'Machine Learning Expert und leidenschaftliche Entwicklerin.',
      image: '👩‍💻',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Thomas Weber',
      role: 'Head of Product',
      bio: 'UX/UI Designer mit Fokus auf Developer Experience.',
      image: '👨‍🎨',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Lisa Wagner',
      role: 'Head of Engineering',
      bio: 'Full-Stack Entwicklerin mit Passion für sauberen Code.',
      image: '👩‍🔬',
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];

  const milestones = [
    {
      year: '2025 Q4',
      title: 'Gründung von FrameSphere',
      description: 'Start mit der Vision, AI-Orchestrierung für alle zugänglich zu machen.'
    },
    {
      year: '2025 Q4',
      title: 'Launch von FrameSpell API',
      description: 'Unser erstes Produkt geht live mit 1000+ Beta-Usern.'
    },
    {
      year: '2026 Q1',
      title: 'CoreChain AI Release',
      description: 'Revolutionäre KI-Orchestrierung für komplexe Workflows.'
    },
    {
      year: '2026 Q1',
      title: 'CoreChain API Release',
      description: 'API Dienst für Revolutionäre KI-Orchestrierung für komplexe Workflows.'
    },
    {
      year: '2026 Q2',
      title: 'SphereNet Release',
      description: 'Digitale Plattform zur Erstellung von AI Agent Chains.'
    },
    {
      year: '2026 Q2',
      title: 'SphereHub Launch',
      description: 'Digitaler AI Buttler für zu Hause.'
    },
    {
      year: '2026 Q1',
      title: 'Series A Funding',
      description: '€2M Investment für weiteres Wachstum und Team-Expansion.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expansion in die USA und Asien geplant.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Aktive Nutzer' },
    { value: '50M+', label: 'API Calls/Monat' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Über <span className="gradient-text">{companyInfo.name}</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {companyInfo.tagline}
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            {companyInfo.description}
          </p>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="card">
              <div className="text-sm text-gray-400 mb-1">Gegründet</div>
              <div className="text-2xl font-bold text-white">{companyInfo.founded}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-400 mb-1">Standort</div>
              <div className="text-2xl font-bold text-white">{companyInfo.location}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-400 mb-1">Team-Größe</div>
              <div className="text-2xl font-bold text-white">{companyInfo.employees}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-400 mb-1">Produkte</div>
              <div className="text-2xl font-bold text-white">5+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{mission.title}</h2>
              <p className="text-gray-400 leading-relaxed">
                {mission.text}
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{vision.title}</h2>
              <p className="text-gray-400 leading-relaxed">
                {vision.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Unsere Werte</h2>
            <p className="text-xl text-gray-400">
              Was uns antreibt und leitet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">In Zahlen</h2>
            <p className="text-xl text-gray-400">
              Unser Wachstum spricht für sich
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Unsere Journey</h2>
            <p className="text-xl text-gray-400">
              Von der Idee zur führenden AI-Plattform
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="card flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Unser Team</h2>
            <p className="text-xl text-gray-400">
              Die Menschen hinter FrameSphere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-400 text-sm font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-primary-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-primary-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-primary-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Heart className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Werde Teil unserer Story
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Wir suchen talentierte Menschen, die mit uns die Zukunft der AI-Orchestrierung gestalten wollen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Kontakt aufnehmen</span>
              </Link>
              <Link to="/register" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Jetzt starten</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
