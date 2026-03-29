import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Brain, Shield, Sparkles, ArrowRight, CheckCircle,
  Search, Globe, Code, ExternalLink, TrendingUp, Users,
  Rocket, FileText, RotateCcw, Flag, Gamepad2, User, Lock
} from 'lucide-react';

const Home = () => {

  const liveProducts = [
    {
      name: 'FrameSpell API',
      description: 'KI-Rechtschreibprüfung per REST API. MT5-Modell, 99.2% Genauigkeit, unter 1 Sekunde Antwortzeit. Deutsch, Englisch, Spanisch, Französisch.',
      icon: <Sparkles className="w-7 h-7 text-white" />,
      color: 'from-blue-500 to-cyan-500',
      link: '/products/framespell',
      externalLink: 'https://framespell.pages.dev/',
      stat: '99.2% Genauigkeit',
    },
    {
      name: 'RateLimit API',
      description: 'Schütze deine APIs vor Missbrauch und DDoS. Token Bucket Algorithmus, IP-Filterung und Echtzeit-Analytics auf Cloudflare Edge — sub-ms Latenz weltweit.',
      icon: <Shield className="w-7 h-7 text-white" />,
      color: 'from-green-500 to-emerald-500',
      link: '/products/ratelimit-api',
      externalLink: 'https://ratelimit-api.pages.dev/',
      stat: 'Cloudflare Edge-Speed',
    },
    {
      name: 'FrameTrain',
      description: 'Desktop-App zum lokalen Trainieren und Verbessern eigener KI-Modelle. 100% offline, keine Cloud-Abhängigkeit, volle Datenkontrolle. Für macOS, Windows & Linux.',
      icon: <Brain className="w-7 h-7 text-white" />,
      color: 'from-purple-500 to-pink-500',
      link: '/products/frametrain',
      externalLink: 'https://frame-train.vercel.app/',
      stat: '100% lokal & privat',
    },
  ];

  const webApps = [
    { name: 'Wordify', desc: 'Tägliches 5-Buchstaben Worträtsel in 5 Sprachen', emoji: '🔤', path: '/webapps/wordify', url: 'https://wordify.pages.dev/', color: 'text-emerald-400' },
    { name: 'FlagGuess', desc: 'Flaggen-Quiz mit 195+ Ländern & 3 Schwierigkeitsstufen', emoji: '🏳️', path: '/webapps/flagguess', url: 'https://flaggues.pages.dev/', color: 'text-blue-400' },
    { name: 'BrawlMystery', desc: 'Brawl Stars Ratespiel mit 4 Spielmodi täglich', emoji: '⚔️', path: '/webapps/brawlmystery', url: 'https://brawlmystery.pages.dev/', color: 'text-orange-400' },
    { name: 'SpinSelector', desc: 'Online-Glücksrad für Zufallsentscheidungen aller Art', emoji: '🎡', path: '/webapps/spinselector', url: 'https://spinselector.pages.dev/', color: 'text-pink-400' },
    { name: 'Traitora', desc: 'Adaptiver Persönlichkeitstest auf Basis von IRT', emoji: '🧠', path: '/webapps/traitora', url: 'https://traitora.pages.dev/', color: 'text-violet-400' },
    { name: 'FileFlyr', desc: '40+ Dateikonverter — 100% privat, kein Upload', emoji: '📁', path: '/webapps/fileflyr', url: 'https://fileflyr.pages.dev/', color: 'text-cyan-400' },
  ];

  const comingProducts = [
    { name: 'CoreChain API', desc: 'KI-Orchestrierung für komplexe Workflows', icon: <Code className="w-4 h-4" />, color: 'text-cyan-400' },
    { name: 'Keyword Engine', desc: 'SEO Keyword-Analyse & Ranking-Tracking', icon: <Search className="w-4 h-4" />, color: 'text-yellow-400' },
    { name: 'Website Manager', desc: 'Multi-Site Dashboard & Monitoring', icon: <Globe className="w-4 h-4" />, color: 'text-orange-400' },
    { name: 'SphereNet', desc: 'Öffentliches KI-Modell-Netzwerk', icon: <Zap className="w-4 h-4" />, color: 'text-indigo-400' },
  ];

  const whyUs = [
    { icon: <Lock className="w-5 h-5" />, title: 'Datenschutz by Design', desc: 'DSGVO-konform, EU-Server, und wo möglich 100% lokale Verarbeitung ohne Cloud.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Sofort einsatzbereit', desc: 'API Key holen und loslegen — kein komplexes Onboarding, keine langen Wartezeiten.' },
    { icon: <Code className="w-5 h-5" />, title: 'Entwicklerfreundlich', desc: 'REST APIs, JSON Responses, klare Dokumentation und SDKs für alle Sprachen.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Fair skalieren', desc: 'Kostenlose Einstiegspläne für alle Produkte. Zahle nur, was du wirklich nutzt.' },
    { icon: <Users className="w-5 h-5" />, title: 'Ein Account, alles', desc: 'Registriere dich einmal und verwalte alle FrameSphere-Produkte zentral.' },
    { icon: <Brain className="w-5 h-5" />, title: 'Echte Produkte', desc: 'Keine Demo-Projekte — alle Produkte sind produktionsreif und aktiv genutzt.' },
  ];

  const stats = [
    { value: '3', label: 'Live APIs' },
    { value: '6', label: 'Web Apps' },
    { value: '99.9%', label: 'Uptime' },
    { value: 'Kostenlos', label: 'starten' },
  ];

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-6">
            <span className="glass-effect px-4 py-2 rounded-full text-sm text-primary-400 border border-primary-500/30">
              🚀 3 Live-Produkte · 6 Web-Apps · mehr in Entwicklung
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">AI Tools & APIs</span>
            <br />
            <span className="text-white">für Entwickler & alle.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-3">
            FrameSphere bündelt leistungsstarke KI-APIs, Entwickler-Tools und kostenlose Web-Apps
            unter einem Dach — von der Rechtschreibprüfung über Rate-Limiting bis zum Flaggen-Quiz.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Alle Produkte: kostenlos starten, fair skalieren, sofort einsatzbereit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Kostenlos registrieren</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/products" className="btn-secondary inline-flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Alle Produkte</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="card py-4">
                <div className="text-2xl font-bold gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE APIs ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">Live & nutzbar</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">API-Produkte</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Drei produktionsreife APIs — jede mit kostenlosem Startplan, sofort integrierbar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {liveProducts.map((p, i) => (
              <div key={i} className="card flex flex-col group hover:scale-[1.03] transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3 flex-1">{p.description}</p>
                <div className="text-xs text-primary-400 font-medium mb-5">✓ {p.stat}</div>
                <div className="flex gap-2 mt-auto">
                  <Link to={p.link} className="flex-1 btn-primary text-sm py-2.5 inline-flex items-center justify-center space-x-1">
                    <span>Details</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a href={p.externalLink} target="_blank" rel="noopener noreferrer"
                    className="btn-secondary px-3 py-2.5 inline-flex items-center" title="Live öffnen">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEB APPS ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Kostenlos & im Browser</span>
            <h2 className="text-4xl font-bold text-white mb-4">Web Apps</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Spiele, Tools, Tests — alle kostenlos, alle ohne Anmeldung, direkt im Browser nutzbar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {webApps.map((app, i) => (
              <div key={i} className="card flex items-start space-x-4 group hover:scale-[1.02] transition-all duration-300">
                <div className="text-3xl flex-shrink-0">{app.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-bold text-white`}>{app.name}</h3>
                    <a href={app.url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors flex-shrink-0 ml-2">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-gray-400 text-xs mb-3 leading-relaxed">{app.desc}</p>
                  <Link to={app.path} className={`text-xs font-semibold ${app.color} hover:opacity-80 transition-opacity flex items-center space-x-1`}>
                    <span>Mehr erfahren</span><ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/webapps" className="btn-secondary inline-flex items-center space-x-2">
              <span>Alle Web Apps ansehen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WAS IST FRAMESPHERE ───────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Was ist FrameSphere?</span>
              <h2 className="text-4xl font-bold text-white mb-6">
                Mehr als eine API-Plattform.
              </h2>
              <p className="text-gray-400 mb-5 leading-relaxed">
                FrameSphere ist ein wachsendes Produktportfolio aus KI-APIs, Desktop-Apps und Web-Anwendungen.
                Die APIs richten sich an Entwickler, die KI-Features in ihre Produkte integrieren wollen —
                ohne eigene ML-Infrastruktur aufbauen zu müssen.
              </p>
              <p className="text-gray-400 mb-5 leading-relaxed">
                Parallel dazu entstehen kostenlose Web-Apps, die direkt nutzbar sind:
                Wortspiele, Quizze, Persönlichkeitstests, Dateikonverter — alles unter dem FrameSphere-Dach.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Das verbindende Prinzip: <span className="text-white font-medium">echte Produkte, faire Preise, echter Mehrwert.</span>{' '}
                Kein Lock-in, keine versteckten Kosten, keine leeren Versprechen.
              </p>
              <div className="space-y-3">
                {[
                  'Kostenlose Einstiegspläne für alle API-Produkte',
                  'Alle Web-Apps 100% kostenlos & ohne Anmeldung',
                  'DSGVO-konform, Datenschutz by Design',
                  'Ein Account für alle Produkte',
                  'Aktive Entwicklung — regelmäßig neue Produkte',
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Sidebar */}
            <div className="card">
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">🔧 Als nächstes kommt</div>
              <div className="space-y-3 mb-6">
                {comingProducts.map((p, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <span className={p.color}>{p.icon}</span>
                    <div>
                      <div className="text-white text-sm font-medium">{p.name}</div>
                      <div className="text-gray-500 text-xs">{p.desc}</div>
                    </div>
                    <span className="ml-auto text-xs px-2 py-0.5 bg-gray-700/50 text-gray-400 rounded flex-shrink-0">Bald</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-sm text-gray-400 mb-3">Bereits live:</div>
                <div className="flex flex-wrap gap-2">
                  {['FrameSpell API', 'RateLimit API', 'FrameTrain', 'Wordify', 'FlagGuess', 'BrawlMystery', 'SpinSelector', 'Traitora', 'FileFlyr'].map((name) => (
                    <span key={name} className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WARUM FRAMESPHERE ─────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Warum FrameSphere?</span>
            <h2 className="text-4xl font-bold text-white mb-4">Was uns ausmacht</h2>
            <p className="text-xl text-gray-400">Kein Hype, keine leeren Versprechen — nur funktionierende Produkte.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR DEVS SECTION ──────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Für Entwickler</span>
              <h2 className="text-4xl font-bold text-white mb-6">
                In Minuten integriert.
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Alle FrameSphere-APIs sind als REST APIs dokumentiert, mit JSON Responses und konsistenter
                Fehlerbehandlung. Hole dir einen API Key, lese die Docs und du hast deine erste
                Integration in weniger als 10 Minuten fertig.
              </p>
              <div className="flex gap-4">
                <Link to="/developers/quickstart" className="btn-primary inline-flex items-center space-x-2">
                  <span>Quickstart Guide</span><ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/developers/docs" className="btn-secondary inline-flex items-center space-x-2">
                  <span>API Docs</span>
                </Link>
              </div>
            </div>
            {/* Code Preview */}
            <div className="card bg-dark-900 border-white/5">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 text-xs ml-2">framespell-example.js</span>
              </div>
              <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                <code>{`const res = await fetch(
  'https://api.framespell.dev/check',
  {
    method: 'POST',
    headers: {
      'X-API-Key': 'fs_your_key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Helo Welt!',
      language: 'de'
    })
  }
);

// { corrected: "Hallo Welt!" }
const { corrected } = await res.json();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Rocket className="w-14 h-14 text-primary-400 mx-auto mb-5" />
            <h2 className="text-3xl font-bold text-white mb-4">Bereit loszulegen?</h2>
            <p className="text-xl text-gray-400 mb-3 max-w-xl mx-auto">
              Registriere dich kostenlos und nutze alle FrameSphere-Produkte über ein zentrales Dashboard.
            </p>
            <p className="text-gray-500 mb-8 text-sm">
              Kein Kreditkarte, kein Abo-Zwang. Kostenlos starten, bei Bedarf upgraden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Jetzt kostenlos registrieren</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/webapps" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <Gamepad2 className="w-5 h-5" />
                <span>Web Apps direkt nutzen</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
