// Zentrale Produktliste – eine Quelle für Navbar, Footer, Startseite und ⌘K-Palette.
//
// Alle Zahlen sind aus dem Code bzw. den Konfigurationen der jeweiligen Projekte
// abgeleitet (Recherche Nov 2026). Neue Zahlen bitte nur eintragen, wenn sie
// belegbar sind – keine Genauigkeits-, Latenz- oder Uptime-Werte ohne Messung.

export const products = [
  {
    id: 'frametrain',
    name: 'FrameTrain',
    kind: 'Desktop',
    tagline: 'KI-Modelle lokal trainieren',
    desc: 'Tauri-Desktop-App mit Python-Trainingskern: LoRA, QLoRA und Full Fine-Tuning auf deinem Rechner – plus Dataset-Builder und MCP-Server für Claude & Co.',
    metric: '21 Trainings-Plugins',
    price: '€4,99/Mon. Early Access',
    facts: [
      ['Plattformen', 'macOS · Windows · Linux'],
      ['Beschleunigung', 'CUDA, Apple Silicon'],
      ['MCP', '101 Werkzeuge'],
    ],
    path: '/products/frametrain',
    url: 'https://frame-train.com/',
    status: 'live',
  },
  {
    id: 'framespell',
    name: 'FrameSpell',
    kind: 'API',
    tagline: 'Deutsche Rechtschreibkorrektur per REST',
    desc: 'Ein mT5-Modell schreibt den Satz korrigiert neu – statt nur Fehler zu markieren. Text rein, korrigierter Text raus.',
    metric: 'mT5 · Deutsch',
    price: 'geplant: ab €0 · Pro €29/Mon.',
    facts: [
      ['Modell', 'mT5, Beam Search (4)'],
      ['Free', '20 Anfragen/Min + 100 Credits'],
      ['Abrechnung', '1 Anfrage = 1 Credit'],
    ],
    path: '/products/framespell',
    url: 'https://framespell.pages.dev/',
    status: 'dev',
  },
  {
    id: 'ratelimit',
    name: 'RateLimit',
    kind: 'API',
    tagline: 'Rate-Limiting als Service',
    desc: 'Ein GET auf /check pro Request – Sliding Window oder Token Bucket, Filter nach IP, Land, User-Agent und Auth-Level, Auto-Block inklusive.',
    metric: '2 Algorithmen · 5 Filter',
    price: 'geplant: ab €0 · Pro €4,99/Mon.',
    facts: [
      ['Algorithmen', 'Sliding Window, Token Bucket'],
      ['Free', '10.000 Requests/Monat'],
      ['Pro', '500.000 Requests/Monat'],
    ],
    path: '/products/ratelimit-api',
    url: 'https://ratelimit-api.pages.dev/',
    status: 'dev',
  },
  {
    id: 'keyscope',
    name: 'KeyScope',
    kind: 'SaaS',
    tagline: 'Keyword-Extraktion für SEO',
    desc: 'Transparenter TF-IDF-Algorithmus mit trainierbaren Themenprofilen: Keywords, Longtail-Phrasen und Meta-Description in einem Call.',
    metric: '5 Sprachen · 11 Templates',
    price: 'geplant: ab €0 · Pro €9/Mon.',
    facts: [
      ['Sprachen', 'DE · EN · FR · ES · IT'],
      ['Free', '20 Analysen/Tag'],
      ['Pro', '500 Analysen/Tag'],
    ],
    path: '/products/keyword-engine',
    url: 'https://keyscope.pages.dev/',
    status: 'dev',
  },
  {
    id: 'sitecontrol',
    name: 'SiteControl',
    kind: 'SaaS',
    tagline: 'Alle Websites, ein Dashboard',
    desc: 'Blog, Changelog, Support-Tickets, Todos und Analytics für mehrere Websites – mit einbindbarem Tracker und öffentlichen Endpunkten.',
    metric: 'Gratis bis 3 Sites',
    price: 'geplant: ab €0 · Pro €19/Mon.',
    facts: [
      ['Free', 'bis 3 Websites'],
      ['Pro', 'unbegrenzt, 14 Tage testen'],
      ['API', '24 Routen'],
    ],
    path: '/products/website-manager',
    url: 'https://app.sitecontrol.app/',
    status: 'dev',
  },
  {
    id: 'corechain',
    name: 'CoreChain',
    kind: 'API',
    tagline: 'KI-Workflows orchestrieren',
    desc: 'Prototyp: Anfrage normalisieren, klassifizieren, in Teilaufgaben zerlegen, von mehreren Agenten ausführen lassen.',
    path: '/products/corechain-api',
    status: 'soon',
  },
  {
    id: 'spherehub',
    name: 'SphereHub',
    kind: 'Lokal',
    tagline: 'Lokaler KI-Assistent',
    desc: 'Ein Assistent, der zu Hause läuft – nicht in der Cloud.',
    path: '/products/spherehub',
    status: 'soon',
  },
  {
    id: 'spherenet',
    name: 'SphereNet',
    kind: 'Netzwerk',
    tagline: 'Agenten zu Chains verketten',
    desc: 'Agenten registrieren, per API-Key anbinden und als Kette über einen Endpunkt ausführen.',
    path: '/products/spherenet',
    status: 'soon',
  },
];

export const webApps = [
  {
    id: 'wordify',
    name: 'Wordify',
    tagline: 'Tägliches Worträtsel, 5 Buchstaben, 6 Versuche',
    metric: '5 Sprachen',
    big: '5',
    bigLabel: 'Sprachen',
    path: '/webapps/wordify',
    url: 'https://wordify.pages.dev/',
    category: 'Spiel',
  },
  {
    id: 'flagguess',
    name: 'FlagGuess',
    tagline: 'Die Flagge färbt sich Versuch für Versuch ein',
    metric: '199 Flaggen',
    big: '199',
    bigLabel: 'Flaggen',
    path: '/webapps/flagguess',
    url: 'https://flaggues.pages.dev/',
    category: 'Spiel',
  },
  {
    id: 'brawlmystery',
    name: 'BrawlMystery',
    tagline: 'Brawler erraten – verschwommen, verpixelt, als Emoji',
    metric: '98 Brawler · 4 Modi',
    big: '98',
    bigLabel: 'Brawler',
    path: '/webapps/brawlmystery',
    url: 'https://brawlmystery.pages.dev/',
    category: 'Spiel',
  },
  {
    id: 'spinselector',
    name: 'SpinSelector',
    tagline: 'Glücksrad für Entscheidungen, Teams und Partyspiele',
    metric: '4 Sprachen',
    big: '∞',
    bigLabel: 'Optionen',
    path: '/webapps/spinselector',
    url: 'https://spinselector.pages.dev/',
    category: 'Tool',
  },
  {
    id: 'traitora',
    name: 'Traitora',
    tagline: 'Persönlichkeitstest, der sich deinen Antworten anpasst',
    metric: 'IRT-2PL · 99 Items',
    big: '10–40',
    bigLabel: 'Fragen, adaptiv',
    path: '/webapps/traitora',
    url: 'https://traitora.pages.dev/',
    category: 'Test',
  },
  {
    id: 'fileflyr',
    name: 'FileFlyr',
    tagline: 'Dateien im Browser konvertieren – nichts wird hochgeladen',
    metric: '38 Konverter',
    big: '38',
    bigLabel: 'Konverter',
    path: '/webapps/fileflyr',
    url: 'https://fileflyr.pages.dev/',
    category: 'Tool',
  },
];

// Status: 'live' = öffentlich nutzbar · 'dev' = in Entwicklung, fast fertig · 'soon' = früher Stand
export const statusLabel = { live: 'live', dev: 'in Entwicklung', soon: 'früher Stand' };

export const liveProducts = products.filter((p) => p.status === 'live');
export const devProducts = products.filter((p) => p.status === 'dev');
export const soonProducts = products.filter((p) => p.status === 'soon');
export const upcomingProducts = products.filter((p) => p.status !== 'live');

export const devLinks = [
  { name: 'Quickstart', path: '/developers/quickstart' },
  { name: 'API-Docs', path: '/developers/docs' },
  { name: 'SDKs', path: '/developers/sdks' },
  { name: 'Tutorials', path: '/developers/tutorials' },
  { name: 'Status', path: '/developers/status' },
];

export const companyLinks = [
  { name: 'Über uns', path: '/about' },
  { name: 'Preise', path: '/pricing' },
  { name: 'Kontakt', path: '/contact' },
];
