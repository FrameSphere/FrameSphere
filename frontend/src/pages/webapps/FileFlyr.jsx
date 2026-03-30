import React from 'react';
import { ExternalLink, CheckCircle, Lock, Zap, FileText, ArrowRight } from 'lucide-react';

/* ─── FileFlyr SVG Icon ───────────────────────────────────────────────────── */
import { FileFlyrIcon } from '../../components/ProductIcons';

const FileFlyr = () => {

  const converterCategories = [
    {
      name: 'Bilder',
      color: 'border-cyan-500/20 bg-cyan-500/5',
      iconColor: 'text-cyan-400',
      converters: [
        'PNG → JPG', 'JPG → PNG', 'HEIC → JPG', 'WebP → PNG',
        'SVG → PNG', 'Bild → PDF', 'Bild skalieren', 'Bild zuschneiden',
      ],
    },
    {
      name: 'PDF',
      color: 'border-indigo-500/20 bg-indigo-500/5',
      iconColor: 'text-indigo-400',
      converters: [
        'Bild → PDF', 'PDF → JPG', 'PDF komprimieren',
        'PDF zusammenführen', 'PDF aufteilen',
      ],
    },
    {
      name: 'Audio',
      color: 'border-purple-500/20 bg-purple-500/5',
      iconColor: 'text-purple-400',
      converters: [
        'MP3 → WAV', 'WAV → MP3', 'OGG → MP3',
        'Audio trimmen', 'Lautstärke anpassen',
      ],
    },
    {
      name: 'Dokumente',
      color: 'border-pink-500/20 bg-pink-500/5',
      iconColor: 'text-pink-400',
      converters: [
        'Text → PDF', 'HTML → PDF', 'Markdown → HTML', 'JSON formatieren',
      ],
    },
  ];

  const highlights = [
    {
      icon: <Lock className="w-6 h-6" />,
      color: 'bg-cyan-500/15 text-cyan-400',
      title: '100% Privat — Kein Upload',
      desc: 'Alle Konvertierungen laufen ausschließlich in deinem Browser. Deine Dateien verlassen niemals dein Gerät — kein Server, kein Tracking.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-indigo-500/15 text-indigo-400',
      title: 'Sofort — Keine Wartezeit',
      desc: 'Keine Upload-Zeiten, keine Warteschlangen. Alles passiert lokal mittels HTML5 Canvas API, Web Audio API und JavaScript-Bibliotheken.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500/15 text-purple-400',
      title: '40+ professionelle Tools',
      desc: 'Bilder, PDFs, Audio, Dokumente — über 40 Konverter in einer Anwendung. Komplett kostenlos, ohne Anmeldung, auf allen Geräten.',
    },
  ];

  const popularTools = [
    { name: 'PNG → JPG',   url: 'https://fileflyr.pages.dev/convert/png-to-jpg/' },
    { name: 'JPG → PNG',   url: 'https://fileflyr.pages.dev/convert/jpg-to-png/' },
    { name: 'HEIC → JPG',  url: 'https://fileflyr.pages.dev/convert/heic-to-jpg/' },
    { name: 'Bild → PDF',  url: 'https://fileflyr.pages.dev/convert/img-to-pdf/' },
  ];

  const techStack = [
    'HTML5 Canvas API — Bildverarbeitung im Browser',
    'jsPDF & pdf-lib — PDF-Erstellung und -Bearbeitung',
    'Web Audio API — Audio-Konvertierung lokal',
    'Cloudflare Pages — globales CDN, schneller Zugriff',
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-effect rounded-full text-sm text-gray-400 mb-8">
            <span className="text-cyan-400 font-medium">FrameSphere</span>
            <span className="text-white/20">·</span>
            <span>Web App · Dateikonverter</span>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/30 rounded-2xl blur-2xl" />
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
              <FileFlyrIcon size={96} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">FileFlyr</h1>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">40+ Konverter</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">100% Privat</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kein Upload</span>
            <span className="px-3 py-1 glass-effect rounded-full text-xs text-gray-400">Kostenlos</span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Professionelle Dateikonverter für Bilder, PDFs, Audio und mehr — direkt im Browser, ohne Server-Upload, komplett kostenlos.
          </p>

          <a href="https://fileflyr.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-base px-8 py-3.5">
            <ExternalLink className="w-5 h-5" />
            <span>Dateien konvertieren</span>
          </a>
        </div>

        {/* ── 3 Core Highlights ────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((h, i) => (
            <div key={i} className="card text-center">
              <div className={`w-12 h-12 ${h.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                {h.icon}
              </div>
              <h3 className="font-bold text-white mb-3">{h.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* ── So funktioniert's ────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">In 3 Schritten fertig</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', emoji: '📂', title: 'Datei auswählen',       desc: 'Datei per Drag & Drop reinziehen oder über den Datei-Dialog auswählen. Alle gängigen Formate unterstützt.' },
              { n: '02', emoji: '⚙️', title: 'Einstellungen wählen',  desc: 'Qualität, Zielgröße oder weitere Parameter anpassen — je nach Konverter individuell konfigurierbar.' },
              { n: '03', emoji: '⬇️', title: 'Sofort herunterladen',  desc: 'Die konvertierte Datei steht sofort zum Download bereit. Alles passiert lokal, kein Warten.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-cyan-500/15 mb-2">{s.n}</div>
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Konverter-Kategorien ─────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Verfügbare Konverter</h2>
          <p className="text-gray-500 text-center mb-10">40+ Tools — alle kostenlos, alle lokal, alle ohne Anmeldung</p>
          <div className="grid md:grid-cols-2 gap-5">
            {converterCategories.map((cat, i) => (
              <div key={i} className={`card border ${cat.color}`}>
                <h3 className={`font-bold mb-4 text-base ${cat.iconColor}`}>{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.converters.map((c, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-lg border border-white/5 font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Beliebte Tools ───────────────────────────────────────────────── */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Beliebteste Konverter</h2>
          <p className="text-gray-500 text-sm mb-6">Direkt öffnen — kein Account nötig</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularTools.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 hover:border-cyan-500/40 transition-all group">
                <div className="text-white text-sm font-semibold group-hover:text-cyan-400 transition-colors font-mono">{t.name}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Technologie ──────────────────────────────────────────────────── */}
        <div className="card mb-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border-indigo-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">Wie ist das möglich?</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            FileFlyr nutzt moderne Browser-APIs, um Dateikonvertierungen vollständig client-seitig durchzuführen — kein Server notwendig.
          </p>
          <div className="space-y-3">
            {techStack.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="card text-center bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 border-cyan-500/25">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-purple-500/30 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
              <FileFlyrIcon size={64} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Konvertieren — sofort & privat</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">Kein Upload, kein Tracking, kein Abo. Einfach Datei rein, fertig.</p>
          <a href="https://fileflyr.pages.dev/" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>FileFlyr öffnen</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default FileFlyr;
