import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Home, Network, Zap, ArrowRight, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import {
  FrameSpellIcon, RateLimitIcon, FrameTrainIcon,
  KeyScopeIcon, SiteControlIcon,
} from '../components/ProductIcons';

const Products = () => {

  const liveProducts = [
    {
      id: 'framespell',
      name: 'FrameSpell API',
      tagline: 'KI-Rechtschreibprüfung für Entwickler',
      description: 'Leistungsstarke KI-Rechtschreibprüfung API auf Basis des MT5-Modells. Echtzeit-Korrektur mit REST API, JSON Response. Unterstützt Deutsch, Englisch, Spanisch und Französisch.',
      Icon: FrameSpellIcon,
      externalUrl: 'https://framespell.pages.dev/',
      link: '/products/framespell',
      features: ['MT5 Machine Learning Modell', 'REST API & JSON Response', '99.2% Genauigkeit', 'Unter 1000ms Antwortzeit', 'DE, EN, ES, FR', '20 kostenlose Anfragen/Min'],
      useCases: ['CMS & Blog-Systeme', 'E-Mail Clients', 'Chat-Anwendungen', 'Text-Editoren'],
      pricing: 'Kostenlos bis 20 Req/Min · Pro ab €29/Mo',
    },
    {
      id: 'ratelimit',
      name: 'RateLimit API',
      tagline: 'API-Schutz auf Cloudflare Edge',
      description: 'Schütze deine APIs vor Missbrauch, DDoS und Überlastung. Token Bucket Algorithmus, IP-Filter und Echtzeit-Analytics auf dem Cloudflare Workers Edge Network.',
      Icon: RateLimitIcon,
      externalUrl: 'https://ratelimit-api.pages.dev/',
      link: '/products/ratelimit-api',
      features: ['Cloudflare Workers Edge', 'Token Bucket Algorithmus', 'IP-Blacklisting & Filter', 'Echtzeit-Analytics Dashboard', 'Sub-Millisekunden Latenz', 'Einfache Integration'],
      useCases: ['API-Schutz & DDoS Prevention', 'Traffic-Management', 'SaaS-Produkte', 'Microservices'],
      pricing: 'Kostenlos · Pro ab €19/Mo',
    },
    {
      id: 'frametrain',
      name: 'FrameTrain',
      tagline: 'KI-Modelle lokal trainieren',
      description: 'Desktop-Applikation zum Trainieren, Verbessern und Verwalten eigener KI-Modelle — vollständig lokal auf deinem Rechner. Keine Cloud, keine Datenübertragung, 100% Datenkontrolle.',
      Icon: FrameTrainIcon,
      externalUrl: 'https://frame-train.vercel.app/',
      link: '/products/frametrain',
      features: ['100% lokale Ausführung', 'HuggingFace-Integration', 'LoRA & QLoRA Fine-Tuning', 'GPU-Beschleunigung (CUDA + Metal)', 'DSGVO-konform by Design', 'macOS, Windows & Linux'],
      useCases: ['ML-Entwickler & Forscher', 'Datenschutzkritische Projekte', 'LLM Fine-Tuning', 'Offline-Training'],
      pricing: '€1,99 einmalig · Early Access',
    },
    {
      id: 'keyscope',
      name: 'KeyScope',
      tagline: 'SEO Keyword-Extraction as a Service',
      description: 'TF-IDF-Algorithmus oder AI-Modell — KeyScope analysiert Texte und gibt gerankte Keywords, Longtail-Phrases und Meta Descriptions zurück. Via UI oder REST API, 5 Sprachen.',
      Icon: KeyScopeIcon,
      externalUrl: 'https://keyscope.pages.dev/',
      link: '/products/keyword-engine',
      features: ['TF-IDF + AI (HuggingFace) Modi', 'Longtail-Phrase-Generierung', 'Custom Profile & Training', 'REST API mit Bearer-Auth', '5 Sprachen (DE, EN, FR, ES, IT)', 'Meta Description Generator'],
      useCases: ['SEO & Content-Teams', 'CMS-Pipelines', 'Blogger & Agenturen', 'Developer-Workflows'],
      pricing: 'Kostenlos (20/Tag) · Pro ab €9/Mo',
    },
    {
      id: 'sitecontrol',
      name: 'SiteControl',
      tagline: 'Alle deine Websites. Ein Dashboard.',
      description: 'Blog-Posts, Changelogs, Support-Tickets, Todos und Analytics für alle deine Websites — zentral verwaltet. Next.js + Supabase, kostenlos bis 3 Sites, Pro für unbegrenzte Websites.',
      Icon: SiteControlIcon,
      externalUrl: 'https://app.sitecontrol.app/',
      link: '/products/website-manager',
      features: ['Multi-Site Dashboard & KPIs', 'Blog-CMS (mehrsprachig)', 'Changelog-System', 'Support-Ticket-Management', 'Analytics ohne externes Tool', 'AdSense & Google Search Console'],
      useCases: ['Indie Developer & Freelancer', 'Web-Agenturen', 'SaaS-Gründer', 'Content Creator'],
      pricing: 'Kostenlos bis 3 Sites · Pro €19/Mo',
    },
  ];

  const comingProducts = [
    {
      id: 'corechain-api',
      name: 'CoreChain API',
      tagline: 'KI-Orchestrierung für komplexe Workflows',
      description: 'Verbinde und orchestriere mehrere KI-Modelle zu intelligenten Workflows. Automatische Task-Zerlegung, Multi-Agent-Koordination und Ergebnis-Synthese.',
      icon: <Code className="w-10 h-10 text-white" />,
      color: 'from-cyan-500 to-blue-500',
      link: '/products/corechain-api',
      features: ['Multi-Model Orchestrierung', 'Automatische Task-Zerlegung', 'RESTful & WebSocket API', 'SDK für alle Sprachen'],
    },
    {
      id: 'spherehub',
      name: 'SphereHub',
      tagline: 'Lokaler AI-Butler für dein Zuhause',
      description: 'Physisches und virtuelles Home-Device, das smarte KI-Modelle lokal ausführt und all deine Smart-Home-Geräte verbindet.',
      icon: <Home className="w-10 h-10 text-white" />,
      color: 'from-red-500 to-pink-500',
      link: '/products/spherehub',
      features: ['Lokale KI-Ausführung', 'Smart Home Integration', 'Offline-Funktionalität', 'Privacy-First Design'],
    },
    {
      id: 'spherenet',
      name: 'SphereNet',
      tagline: 'Öffentliches KI-Modell-Netzwerk',
      description: 'Zugriff auf ein riesiges Netzwerk öffentlicher KI-Modelle und Chains. Nutze spezialisierte Modelle für jeden Zweck über einfache API Keys.',
      icon: <Network className="w-10 h-10 text-white" />,
      color: 'from-indigo-500 to-blue-500',
      link: '/products/spherenet',
      features: ['1000+ KI-Modelle', 'Community Chains', 'Model Marketplace', 'API Key Management'],
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Das FrameSphere Ökosystem</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Alle Produkte</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Von KI-APIs bis zu Web-Dashboards — jedes Produkt löst ein konkretes Problem. Kostenlos starten, fair skalieren.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">5 Live-Produkte</span>
            </div>
            <div className="text-gray-600">·</div>
            <span className="text-gray-400 text-sm">6 Web Apps</span>
            <div className="text-gray-600">·</div>
            <span className="text-gray-400 text-sm">3 in Entwicklung</span>
          </div>
        </div>

        {/* ── LIVE PRODUKTE ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <h2 className="text-2xl font-bold text-white">Live — Jetzt nutzbar</h2>
          </div>

          <div className="space-y-6">
            {liveProducts.map((product) => (
              <div key={product.id} className="card hover:scale-[1.005] transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-8">

                  {/* Col 1: Icon + Name + Desc + CTAs */}
                  <div className="md:col-span-1">
                    <div className="mb-4">
                      <product.Icon size={64} />
                    </div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{product.name}</h3>
                      <span className="px-2 py-0.5 rounded text-xs border bg-green-500/20 text-green-400 border-green-500/30">Live</span>
                    </div>
                    <p className="text-primary-400 font-semibold text-sm mb-3">{product.tagline}</p>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">{product.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Link to={product.link} className="btn-primary text-sm inline-flex items-center space-x-1.5 py-2">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      {product.externalUrl && (
                        <a href={product.externalUrl} target="_blank" rel="noopener noreferrer"
                          className="btn-secondary px-3 py-2 inline-flex items-center" title="Live öffnen">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Col 2: Features */}
                  <div className="md:col-span-1">
                    <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start text-gray-400 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: Use Cases + Pricing */}
                  <div className="md:col-span-1">
                    <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Use Cases</h4>
                    <ul className="space-y-2 mb-5">
                      {product.useCases.map((uc, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start">
                          <ArrowRight className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                    <div className="glass-effect rounded-lg p-3 border border-primary-500/20">
                      <div className="text-xs text-gray-500 mb-1">Preise</div>
                      <div className="text-primary-400 font-semibold text-sm">{product.pricing}</div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMING SOON ───────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">In Entwicklung — Bald verfügbar</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {comingProducts.map((product) => (
              <Link key={product.id} to={product.link}
                className="card group hover:scale-[1.03] transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {product.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-700/50 text-gray-400 rounded border border-gray-600/30">Bald</span>
                </div>
                <p className="text-primary-400 text-xs font-semibold mb-2">{product.tagline}</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{product.description}</p>
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start text-gray-500 text-xs">
                      <Zap className="w-3.5 h-3.5 text-primary-600 mr-1.5 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Zap className="w-14 h-14 text-primary-400 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Alle Produkte. Ein Account.</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Registriere dich einmal und verwalte alle FrameSphere-Produkte über ein zentrales Dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Kostenlos starten</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <span>Preisübersicht</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;
