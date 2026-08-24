/**
 * Zentrale SEO-Konfiguration pro Route.
 * Wird von <Seo /> (src/components/Seo.jsx) genutzt, um Title, Description,
 * Canonical, Open-Graph/Twitter und optionales JSON-LD pro Seite zu setzen.
 *
 * Neue öffentliche Seite? Einfach hier einen Eintrag ergänzen.
 */

export const SITE = {
  name: 'FrameSphere',
  baseUrl: 'https://frame-sphere.vercel.app',
  defaultImage: 'https://frame-sphere.vercel.app/og-image.png',
  locale: 'de_DE',
  twitter: 'summary_large_image',
};

const softwareApp = (name, url, description) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  url,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
});

/* ─── Statische Route → Meta-Map ─────────────────────────────────────────── */
export const ROUTES = {
  '/': {
    title: 'FrameSphere – AI Tools & APIs für Entwickler',
    description:
      'FrameSphere bündelt leistungsstarke AI-Tools und APIs: FrameSpell Rechtschreibprüfung, RateLimit API, FrameTrain KI-Training und mehr. Kostenlos starten.',
  },

  /* Produkte-Übersicht */
  '/products': {
    title: 'Produkte – AI-APIs & Tools | FrameSphere',
    description:
      'Alle FrameSphere-Produkte im Überblick: FrameSpell, RateLimit API, FrameTrain, KeyScope, SiteControl und mehr. AI-APIs und Developer-Tools an einem Ort.',
  },

  /* Produkt-Detailseiten */
  '/products/framespell': {
    title: 'FrameSpell – Rechtschreibprüfung API | FrameSphere',
    description:
      'FrameSpell ist eine schnelle Rechtschreib- und Grammatikprüfung-API für Deutsch. Einfache REST-Integration, DSGVO-konform, kostenlos starten.',
    jsonLd: softwareApp('FrameSpell', 'https://framespell.pages.dev/', 'Rechtschreib- und Grammatikprüfung-API für Deutsch.'),
  },
  '/products/ratelimit-api': {
    title: 'RateLimit API – API-Anfragen limitieren | FrameSphere',
    description:
      'RateLimit API schützt deine Endpunkte vor Missbrauch: flexibles Rate-Limiting, Analytics, Blacklisting. In Minuten integriert, edge-schnell.',
    jsonLd: softwareApp('RateLimit API', 'https://ratelimit-api.pages.dev/', 'Rate-Limiting-API mit Analytics und Blacklisting.'),
  },
  '/products/frametrain': {
    title: 'FrameTrain – KI-Modelle lokal trainieren | FrameSphere',
    description:
      'FrameTrain ist eine Desktop-App für lokales KI-Training & Fine-Tuning: HuggingFace, LoRA & QLoRA, GPU-Support (CUDA/Metal), 100 % privat. Einmalig 1,99€.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'FrameTrain',
      url: 'https://frame-train.com/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      description:
        'Desktop-App für lokales Machine-Learning-Training und Fine-Tuning mit HuggingFace-Integration, LoRA/QLoRA und GPU-Support.',
      offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'EUR' },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.baseUrl },
    },
  },
  '/products/corechain-api': {
    title: 'CoreChain API – AI-Orchestrierung | FrameSphere',
    description:
      'CoreChain API verkettet AI-Modelle und Tools zu robusten Workflows. Orchestriere LLM-Pipelines mit einer einzigen, konsistenten API.',
  },
  '/products/spherehub': {
    title: 'SphereHub – Zentrale AI-Verwaltung | FrameSphere',
    description:
      'SphereHub ist die zentrale Steuerzentrale für deine FrameSphere-Produkte: API-Keys, Verbindungen und Nutzung an einem Ort verwalten.',
  },
  '/products/spherenet': {
    title: 'SphereNet – Vernetzte AI-Dienste | FrameSphere',
    description:
      'SphereNet verbindet FrameSphere-Dienste zu einem Netzwerk: nahtloser Datenaustausch und gemeinsame Authentifizierung zwischen Tools.',
  },
  '/products/keyword-engine': {
    title: 'KeyScope – SEO Keyword-Analyse | FrameSphere',
    description:
      'KeyScope liefert datengetriebene SEO-Keyword-Analysen: Suchvolumen, Wettbewerb und Content-Ideen. Direkt per API oder Web-App nutzbar.',
    jsonLd: softwareApp('KeyScope', 'https://keyscope.pages.dev/', 'SEO-Keyword-Analyse mit API.'),
  },
  '/products/website-manager': {
    title: 'SiteControl – Website-Management | FrameSphere',
    description:
      'SiteControl verwaltet Websites zentral: Tracking, Blog und Content-APIs. Behalte alle Projekte an einem Ort im Blick.',
  },

  /* WebApps */
  '/webapps': {
    title: 'Web Apps – Kostenlose Tools & Spiele | FrameSphere',
    description:
      'Entdecke die kostenlosen FrameSphere Web-Apps: Wordify, FlagGuess, BrawlMystery, SpinSelector, Traitora und FileFlyr. Direkt im Browser nutzbar.',
  },
  '/webapps/wordify': {
    title: 'Wordify – Wörter-Tool | FrameSphere Web Apps',
    description: 'Wordify ist ein kostenloses, mehrsprachiges Wörter-Tool von FrameSphere. Direkt im Browser, ohne Anmeldung.',
  },
  '/webapps/flagguess': {
    title: 'FlagGuess – Flaggen-Quiz | FrameSphere Web Apps',
    description: 'FlagGuess ist das kostenlose Flaggen-Quiz von FrameSphere. Teste dein Geografie-Wissen direkt im Browser.',
  },
  '/webapps/brawlmystery': {
    title: 'BrawlMystery – Rate-Spiel | FrameSphere Web Apps',
    description: 'BrawlMystery ist ein kostenloses Browser-Ratespiel von FrameSphere. Mehrsprachig und ohne Anmeldung spielbar.',
  },
  '/webapps/spinselector': {
    title: 'SpinSelector – Zufalls-Rad | FrameSphere Web Apps',
    description: 'SpinSelector ist ein kostenloses Zufalls-Auswahlrad von FrameSphere. Ideal für Entscheidungen, Gewinnspiele und mehr.',
  },
  '/webapps/traitora': {
    title: 'Traitora – Persönlichkeitstest | FrameSphere Web Apps',
    description: 'Traitora ist ein kostenloser, wissenschaftlich fundierter Persönlichkeitstest (IRT) von FrameSphere. Direkt im Browser.',
  },
  '/webapps/fileflyr': {
    title: 'FileFlyr – Dateien konvertieren | FrameSphere Web Apps',
    description: 'FileFlyr konvertiert Dateien kostenlos im Browser: PNG↔JPG, HEIC→JPG, Bilder→PDF und mehr. Ohne Upload-Zwang, schnell und privat.',
  },

  /* Unternehmen */
  '/pricing': {
    title: 'Preise – Kostenlos starten | FrameSphere',
    description:
      'FrameSphere-Preise transparent im Überblick. Kostenlos starten und bei Bedarf skalieren – faire Konditionen für Entwickler und Teams.',
  },
  '/about': {
    title: 'Über uns – Das Team hinter FrameSphere',
    description:
      'Erfahre mehr über FrameSphere: unsere Mission, AI-Tools und APIs für Entwickler zugänglich zu machen. Mit Sitz in Mainz, Deutschland.',
  },
  '/contact': {
    title: 'Kontakt – FrameSphere',
    description: 'Kontaktiere das FrameSphere-Team. Fragen zu Produkten, APIs oder Kooperationen? Wir helfen gerne weiter.',
  },

  /* Developer Hub */
  '/developers': {
    title: 'Developer Hub – Docs, SDKs & Tutorials | FrameSphere',
    description:
      'Der FrameSphere Developer Hub: API-Dokumentation, Quickstarts, SDKs, Tutorials und Statusseite. Alles für die schnelle Integration.',
  },
  '/developers/docs': {
    title: 'API-Dokumentation | FrameSphere Developer Hub',
    description: 'Vollständige API-Dokumentation für alle FrameSphere-Produkte: Endpunkte, Authentifizierung, Beispiele und Best Practices.',
  },
  '/developers/quickstart': {
    title: 'Quickstart – In Minuten starten | FrameSphere',
    description: 'Der FrameSphere-Quickstart: In wenigen Minuten deinen ersten API-Call absetzen. Schritt-für-Schritt-Anleitung für Entwickler.',
  },
  '/developers/sdks': {
    title: 'SDKs & Libraries | FrameSphere Developer Hub',
    description: 'Offizielle FrameSphere SDKs und Libraries für deine Programmiersprache. Schnellere Integration mit weniger Boilerplate.',
  },
  '/developers/tutorials': {
    title: 'Tutorials – FrameSpell, RateLimit, FrameTrain & mehr | FrameSphere',
    description: 'Praxisnahe FrameSphere-Tutorials: FrameSpell in React, RateLimit mit Express, FrameTrain LoRA-Fine-Tuning, KeyScope, SiteControl und mehr.',
  },
  '/developers/status': {
    title: 'Status – Verfügbarkeit aller Dienste | FrameSphere',
    description: 'Aktueller Betriebsstatus aller FrameSphere-APIs, Web-Apps und Dienste. Echtzeit-Überblick über Verfügbarkeit und Störungen.',
  },

  /* Legal */
  '/legal/privacy': {
    title: 'Datenschutzerklärung | FrameSphere',
    description: 'Die Datenschutzerklärung von FrameSphere: Welche Daten wir verarbeiten, warum und welche Rechte du hast. DSGVO-konform.',
  },
  '/legal/terms': {
    title: 'AGB & Nutzungsbedingungen | FrameSphere',
    description: 'Die Allgemeinen Geschäftsbedingungen und Nutzungsbedingungen von FrameSphere für die Nutzung unserer Produkte und APIs.',
  },
};

/* ─── Tutorial-Detailseiten (Titel/Beschreibung generisch aufgebaut) ─────── */
const T = (title, description) => ({ title: `${title} | FrameSphere Tutorials`, description });

export const TUTORIAL_ROUTES = {
  '/developers/tutorials/framespell-in-react': T('FrameSpell in React einbinden', 'Schritt-für-Schritt: FrameSpell Rechtschreibprüfung in einer React-App integrieren – mit Code-Beispielen und Best Practices.'),
  '/developers/tutorials/framespell-live-korrektur': T('FrameSpell Live-Korrektur', 'Live-Rechtschreibkorrektur mit FrameSpell umsetzen: Eingaben in Echtzeit prüfen und korrigieren.'),
  '/developers/tutorials/framespell-batch': T('FrameSpell Batch-Verarbeitung', 'Große Textmengen effizient mit der FrameSpell Batch-API prüfen – ideal für Content-Pipelines.'),
  '/developers/tutorials/framespell-cms': T('FrameSpell im CMS integrieren', 'FrameSpell in dein CMS einbinden und Redaktionsinhalte automatisch auf Rechtschreibung prüfen.'),

  '/developers/tutorials/keyscope-quickstart': T('KeyScope Quickstart', 'KeyScope in Minuten einrichten und die erste SEO-Keyword-Analyse durchführen.'),
  '/developers/tutorials/keyscope-api': T('KeyScope API nutzen', 'Die KeyScope API für automatisierte SEO-Keyword-Analysen ansteuern – mit Beispielen.'),
  '/developers/tutorials/keyscope-profiles': T('KeyScope Profile', 'Mit KeyScope-Profilen Keyword-Analysen strukturieren und wiederverwenden.'),

  '/developers/tutorials/sitecontrol-quickstart': T('SiteControl Quickstart', 'SiteControl einrichten und deine erste Website zentral verwalten.'),
  '/developers/tutorials/sitecontrol-tracking': T('SiteControl Tracking', 'Website-Tracking mit SiteControl aufsetzen und Besucherdaten datenschutzfreundlich erfassen.'),
  '/developers/tutorials/sitecontrol-api': T('SiteControl API', 'Die SiteControl API für Sites, Blog und Content programmatisch nutzen.'),

  '/developers/tutorials/ratelimit-quickstart': T('RateLimit Quickstart', 'RateLimit API in Minuten integrieren und Endpunkte vor Missbrauch schützen.'),
  '/developers/tutorials/ratelimit-express': T('RateLimit mit Express', 'Rate-Limiting in einer Node.js/Express-App mit der RateLimit API umsetzen.'),
  '/developers/tutorials/ratelimit-blacklist': T('RateLimit Blacklisting', 'IPs und Clients mit der RateLimit API gezielt blockieren und verwalten.'),
  '/developers/tutorials/ratelimit-analytics': T('RateLimit Analytics', 'Nutzungsdaten und Traffic mit den RateLimit-Analytics auswerten.'),
  '/developers/tutorials/ratelimit-api': T('RateLimit API Referenz', 'Die RateLimit API im Detail: Endpunkte, Parameter und Antworten.'),

  '/developers/tutorials/frametrain-quickstart': T('FrameTrain Quickstart', 'FrameTrain installieren und das erste KI-Modell lokal trainieren – in wenigen Schritten.'),
  '/developers/tutorials/frametrain-lora': T('FrameTrain LoRA Fine-Tuning', 'Große Modelle mit LoRA/QLoRA und wenig VRAM effizient fine-tunen – mit FrameTrain.'),
  '/developers/tutorials/frametrain-dataset': T('FrameTrain Datasets', 'Datensätze für FrameTrain aufbereiten: Formate (CSV, JSON, JSONL) und Best Practices.'),
  '/developers/tutorials/frametrain-export': T('FrameTrain Modell-Export', 'Trainierte Modelle aus FrameTrain als SafeTensors, GGUF oder PyTorch exportieren.'),
};

/**
 * Meta für einen Pfad ermitteln. Fällt auf sinnvolle Defaults zurück,
 * damit auch neue/unbekannte Routen nie leere Tags erzeugen.
 */
export function getMeta(pathname) {
  const clean = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const meta = ROUTES[clean] || TUTORIAL_ROUTES[clean];
  if (meta) return meta;
  return {
    title: 'FrameSphere – AI Tools & APIs für Entwickler',
    description:
      'FrameSphere bündelt leistungsstarke AI-Tools und APIs für Entwickler: FrameSpell, RateLimit, FrameTrain, KeyScope und mehr.',
  };
}
