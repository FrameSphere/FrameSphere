import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';
import {
  FrameSpellIcon,
  RateLimitIcon,
  FrameTrainIcon,
  KeyScopeIcon,
  SiteControlIcon,
} from '../components/ProductIcons';

const levelColors = {
  'Einsteiger':      'bg-green-500/20 text-green-400 border-green-500/30',
  'Fortgeschritten': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Experte':         'bg-red-500/20 text-red-400 border-red-500/30',
  'Referenz':        'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const tutorials = [
  {
    category: 'FrameSpell API',
    IconComponent: FrameSpellIcon,
    iconSize: 36,
    items: [
      {
        title: 'Rechtschreibprüfung in React einbauen',
        desc: 'API-Key sicher kapseln, Backend-Route, Custom Hook und Textarea mit Korrektur-UI.',
        duration: '10 Min', level: 'Einsteiger',
        path: '/developers/tutorials/framespell-in-react',
        tags: ['React', 'Next.js', 'fetch'],
      },
      {
        title: 'Live-Korrektur in einem Texteditor',
        desc: 'Debounced Real-Time-Check, Word-Level Diff, Inline-Highlighting und Click-to-Accept.',
        duration: '20 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials/framespell-live-korrektur',
        tags: ['Debounce', 'Diff', 'contentEditable'],
      },
      {
        title: 'Batch-Verarbeitung großer Texte',
        desc: 'Hunderte Dokumente parallel korrigieren — mit Concurrency-Limit und Retry-Logik.',
        duration: '15 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials/framespell-batch',
        tags: ['Node.js', 'Python', 'Concurrency'],
      },
      {
        title: 'CMS-Integration (WordPress / Strapi)',
        desc: 'WordPress Plugin mit pre_publish Hook, Strapi Lifecycle Hook und Webhook-Pattern.',
        duration: '25 Min', level: 'Experte',
        path: '/developers/tutorials/framespell-cms',
        tags: ['WordPress', 'Strapi', 'Webhook', 'PHP'],
      },
    ],
  },
  {
    category: 'KeyScope',
    IconComponent: KeyScopeIcon,
    iconSize: 36,
    items: [
      {
        title: 'Quickstart: Erste Keyword-Analyse',
        desc: 'Account erstellen, API Key generieren und erste Keywords extrahieren — in 5 Minuten.',
        duration: '5 Min', level: 'Einsteiger',
        path: '/developers/tutorials/keyscope-quickstart',
        tags: ['REST API', 'curl', 'JavaScript'],
      },
      {
        title: 'Profile trainieren',
        desc: 'TF-IDF auf eigenen Texten trainieren. Domänenspezifische Keywords mit bis zu 4x besserer Präzision.',
        duration: '15 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials/keyscope-profiles',
        tags: ['TF-IDF', 'Training', 'Profile'],
      },
      {
        title: 'Vollständige API-Referenz',
        desc: 'Alle Endpunkte: Analyze, Profiles, Weights, Ignore-Listen, History, API Key.',
        duration: 'Referenz', level: 'Referenz',
        path: '/developers/tutorials/keyscope-api',
        tags: ['API', 'REST', 'Referenz'],
      },
    ],
  },
  {
    category: 'SiteControl',
    IconComponent: SiteControlIcon,
    iconSize: 36,
    items: [
      {
        title: 'Setup: Website in 10 Minuten einrichten',
        desc: 'Account anlegen, erste Website hinzufügen, Todos erstellen und Pro-Features kennenlernen.',
        duration: '10 Min', level: 'Einsteiger',
        path: '/developers/tutorials/sitecontrol-quickstart',
        tags: ['Supabase', 'Next.js', 'Setup'],
      },
      {
        title: 'Analytics-Snippet einbinden',
        desc: 'Pageviews, Referrer und Fehler tracken — HTML, Next.js, React SPA und WordPress.',
        duration: '10 Min', level: 'Einsteiger',
        path: '/developers/tutorials/sitecontrol-tracking',
        tags: ['Analytics', 'Tracking', 'DSGVO'],
      },
      {
        title: 'Vollständige API-Referenz',
        desc: 'Sites, Todos, Blog, Changelog, Support-Tickets und Public Tracking dokumentiert.',
        duration: 'Referenz', level: 'Referenz',
        path: '/developers/tutorials/sitecontrol-api',
        tags: ['API', 'Supabase', 'Next.js'],
      },
    ],
  },
  {
    category: 'RateLimit API',
    IconComponent: RateLimitIcon,
    iconSize: 36,
    items: [
      {
        title: 'Rate-Limiting in Express.js einrichten',
        desc: 'RateLimit API als Express Middleware — wenige Zeilen Code, sofort produktionsreif.',
        duration: '10 Min', level: 'Einsteiger',
        path: '/developers/tutorials',
        tags: ['Express', 'Node.js', 'Middleware'],
        comingSoon: true,
      },
      {
        title: 'IP-Blacklisting für Abuse-Prevention',
        desc: 'Automatisch schädliche IPs erkennen, Blacklists aufbauen und verwalten.',
        duration: '15 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials',
        tags: ['Security', 'IP-Filter', 'Dashboard'],
        comingSoon: true,
      },
      {
        title: 'Analytics-Dashboard auslesen',
        desc: 'Request-Logs, Top-IPs und Blockierungsraten per API abrufen und visualisieren.',
        duration: '20 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials',
        tags: ['Analytics', 'Chart.js', 'API'],
        comingSoon: true,
      },
    ],
  },
  {
    category: 'FrameTrain',
    IconComponent: FrameTrainIcon,
    iconSize: 36,
    items: [
      {
        title: 'Erstes eigenes Modell trainieren',
        desc: 'Von der Installation bis zum ersten Training — mit HuggingFace-Modell und LoRA.',
        duration: '30 Min', level: 'Einsteiger',
        path: '/developers/tutorials',
        tags: ['FrameTrain', 'HuggingFace', 'LoRA'],
        comingSoon: true,
      },
      {
        title: 'Modell exportieren und einbinden',
        desc: 'Als SafeTensors oder GGUF exportieren und in eigene App integrieren.',
        duration: '15 Min', level: 'Fortgeschritten',
        path: '/developers/tutorials',
        tags: ['Export', 'GGUF', 'Integration'],
        comingSoon: true,
      },
    ],
  },
];

function TutorialCard({ tut }) {
  return (
    <Link
      to={tut.comingSoon ? '#' : tut.path}
      className={`card group flex flex-col transition-all duration-200 ${
        tut.comingSoon
          ? 'opacity-55 cursor-default hover:scale-100'
          : 'hover:scale-[1.02] hover:border-primary-500/50'
      }`}
      onClick={e => tut.comingSoon && e.preventDefault()}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`font-semibold text-white leading-snug ${!tut.comingSoon ? 'group-hover:text-primary-400 transition-colors' : ''}`}>
          {tut.title}
        </h3>
        {tut.comingSoon
          ? <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-gray-500/20 text-gray-500 rounded-full border border-gray-500/30">Bald</span>
          : <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors mt-0.5" />
        }
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{tut.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tut.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded font-mono">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" /> {tut.duration}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[tut.level] || levelColors['Einsteiger']}`}>
          {tut.level}
        </span>
      </div>
    </Link>
  );
}

const Tutorials = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Schritt für Schritt</span>
        <h1 className="text-5xl font-bold text-white mb-4">Tutorials</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Praxisnahe Anleitungen für FrameSpell, KeyScope, SiteControl und RateLimit API.
        </p>
      </div>

      <div className="space-y-12 mb-12">
        {tutorials.map((cat, i) => (
          <div key={i}>
            {/* Category header with real product icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 rounded-xl overflow-hidden">
                <cat.IconComponent size={cat.iconSize} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{cat.category}</h2>
                <p className="text-gray-500 text-sm">
                  {cat.items.filter(t => !t.comingSoon).length} verfügbar
                  {cat.items.filter(t => t.comingSoon).length > 0
                    ? ` · ${cat.items.filter(t => t.comingSoon).length} in Kürze`
                    : ''}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {cat.items.map((tut, j) => <TutorialCard key={j} tut={tut} />)}
            </div>
          </div>
        ))}
      </div>

      <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
        <h2 className="text-xl font-bold text-white mb-2">Fehlendes Tutorial?</h2>
        <p className="text-gray-400 mb-5 text-sm">Sag uns, welche Guides du dir wünschst — wir erstellen sie gerne.</p>
        <Link to="/contact" className="btn-primary text-sm inline-flex items-center space-x-2">
          <span>Tutorial anfragen</span><ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default Tutorials;
