import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ExternalLink, ArrowRight } from 'lucide-react';

const SC_APP = 'https://app.sitecontrol.app';
const SC_API = 'https://site-control-nine.vercel.app/api';

function CodeBlock({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08]">
        <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[11px] text-gray-500 hover:text-white px-2 py-0.5 rounded border border-white/[0.08]"
        >
          {copied ? '✓' : 'Kopieren'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed bg-black/20">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#5b6af6,#a78bfa)' }}>
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function SiteControlQuickstart() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#5b6af6,#a78bfa)' }}>
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest">SiteControl</div>
            <h1 className="text-3xl font-bold text-white">Setup in 10 Minuten</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          SiteControl zentralisiert alle deine Websites: Blog-Posts, Changelogs, Support-Tickets,
          Todos und Analytics — in einem Dashboard. Dieser Guide führt dich von der Registrierung
          bis zur ersten integrierten Website.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <a href={SC_APP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            <ExternalLink className="w-3 h-3" /> app.sitecontrol.app
          </a>
          <span className="text-gray-700">·</span>
          <Link to="/developers/tutorials/sitecontrol-api" className="text-xs text-gray-400 hover:text-white transition-colors">
            API-Referenz →
          </Link>
          <span className="text-gray-700">·</span>
          <Link to="/developers/tutorials/sitecontrol-tracking" className="text-xs text-gray-400 hover:text-white transition-colors">
            Analytics-Snippet einbinden →
          </Link>
        </div>
      </div>

      {/* Übersicht: Was ist SiteControl? */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '🌐', title: 'Sites & Todos', desc: 'Bis zu 3 Sites im Free Plan, unbegrenzt mit Pro. Todos mit Priorität und Fälligkeiten.' },
          { icon: '📝', title: 'Blog & Changelog (Pro)', desc: 'Schreibe und veröffentliche Posts für alle Websites. Mehrsprachig, versioniert.' },
          { icon: '🎫', title: 'Support-Tickets (Pro)', desc: 'Empfange Kundennachrichten direkt im Dashboard, antworte und verwalte den Status.' },
        ].map((f, i) => (
          <div key={i} className="card border-indigo-500/15">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="text-white font-semibold text-sm mb-1">{f.title}</div>
            <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-white/[0.08]">
        Einrichtung
      </h2>

      <Step n={1} title="Account erstellen">
        <p className="text-gray-400 text-sm leading-relaxed">
          Gehe zu{' '}
          <a href={`${SC_APP}/signup`} target="_blank" rel="noopener noreferrer"
            className="text-indigo-400 hover:underline">app.sitecontrol.app/signup</a>.
          Keine Kreditkarte nötig — Free Plan ist dauerhaft kostenlos für bis zu{' '}
          <strong className="text-white">3 Websites</strong>.
        </p>
      </Step>

      <Step n={2} title="Erste Website hinzufügen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Im Dashboard auf <strong className="text-white">Websites → Neue Website</strong> klicken.
          Trage Name, URL und optional eine Farbe/Beschreibung ein.
        </p>
        <CodeBlock lang="json" code={`// Pflichtfelder
{
  "name": "Mein Blog",
  "url":  "https://meinblog.de"
}

// Optional
{
  "color":       "#5b6af6",
  "description": "Persönlicher Tech-Blog",
  "status":      "active"   // "active" | "paused" | "error"
}`} />
        <p className="text-gray-500 text-xs">
          SiteControl generiert automatisch einen URL-Slug für die interne Identifikation.
        </p>
      </Step>

      <Step n={3} title="Analytics-Snippet einbinden (optional)">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Um Pageviews, Referrer und Gerätedaten zu erfassen, binde das leichtgewichtige
          Tracking-Snippet in deiner Website ein:
        </p>
        <CodeBlock lang="html" code={`<!-- In <head> oder vor </body> einfügen -->
<script>
  (function(w, d) {
    var s = d.createElement('script');
    s.src = 'https://site-control-nine.vercel.app/api/public/tracker.js';
    s.async = true;
    s.dataset.siteId = 'DEINE_SITE_ID';   // aus dem Dashboard kopieren
    d.head.appendChild(s);
  })(window, document);
</script>`} />
        <p className="text-gray-500 text-xs">
          Die Site-ID findest du im Dashboard unter <strong className="text-white">Website → Einstellungen</strong>.
          Kein Cookie, kein Fingerprinting — DSGVO-konform.
        </p>
      </Step>

      <Step n={4} title="Ersten Todo erstellen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Todos sind website-spezifische Aufgaben mit Priorität (1–5), Fälligkeitsdatum und
          "Wichtig"-Flag. Im Free Plan unbegrenzt nutzbar.
        </p>
        <CodeBlock lang="javascript" code={`// Beispiel: Todo per API erstellen
const res = await fetch('${SC_API}/todos', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${SUPABASE_TOKEN}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    site_id: 'SITE_UUID',
    title: 'SEO-Audit durchführen',
    priority: 2,              // 1 = höchste, 5 = niedrigste
    important: true,
    due_date: '2026-05-01',
  }),
});`} />
      </Step>

      <Step n={5} title="Pro-Features freischalten (optional)">
        <p className="text-gray-400 text-sm leading-relaxed">
          Für Blog, Changelog, Support-Tickets und vollständige Analytics benötigst du den{' '}
          <strong className="text-white">Pro-Plan für €19/Monat</strong>.
          14 Tage kostenlos testen unter{' '}
          <a href={`${SC_APP}/signup?plan=pro`} target="_blank" rel="noopener noreferrer"
            className="text-indigo-400 hover:underline">app.sitecontrol.app/signup?plan=pro</a>.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {[
            ['Blog-Verwaltung', 'Mehrsprachige Posts schreiben, planen, veröffentlichen'],
            ['Changelog-System', 'Versionierte Einträge mit Feature/Fix/Breaking-Change Tags'],
            ['Support-Tickets', 'Kundennachrichten empfangen, beantworten, verwalten'],
            ['AdSense + GSC', 'Einnahmen und Search-Console direkt im Dashboard'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-2 text-sm">
              <span className="text-indigo-400 flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="text-white">{title}</span>
                <span className="text-gray-500 text-xs block">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Step>

      {/* Plan comparison */}
      <div className="card mb-8">
        <h3 className="font-semibold text-white mb-4">Plan-Übersicht</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 pr-6 text-gray-400 font-medium text-xs uppercase">Feature</th>
                <th className="text-center py-2 px-4 text-gray-400 font-medium text-xs uppercase">Free</th>
                <th className="text-center py-2 px-4 text-indigo-300 font-medium text-xs uppercase">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Websites', '3', 'Unbegrenzt'],
                ['Dashboard & KPIs', '✓', '✓'],
                ['Todo-Management', '✓', '✓'],
                ['Benachrichtigungen', '✓', '✓'],
                ['Basic Analytics', '✓', '✓'],
                ['Blog-Verwaltung', '—', '✓ Mehrsprachig'],
                ['Changelog-System', '—', '✓'],
                ['Support-Tickets', '—', '✓'],
                ['AdSense & GSC', '—', '✓'],
                ['Teammitglieder', '1', 'bis 5'],
              ].map(([feat, free, pro]) => (
                <tr key={feat} className="border-b border-white/[0.04] last:border-0">
                  <td className="py-2 pr-6 text-gray-400 text-xs">{feat}</td>
                  <td className="py-2 px-4 text-center text-gray-500 text-xs">{free}</td>
                  <td className="py-2 px-4 text-center text-indigo-400 text-xs font-medium">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next */}
      <div className="card bg-indigo-500/5 border-indigo-500/15">
        <h3 className="font-semibold text-white mb-3">Weiter</h3>
        <div className="space-y-2 text-sm">
          {[
            ['/developers/tutorials/sitecontrol-tracking', '📊', 'Analytics-Snippet einbinden — Pageviews, Referrer, Geräte'],
            ['/developers/tutorials/sitecontrol-api', '⚙️', 'Vollständige API-Referenz — alle Endpunkte & Datenmodelle'],
          ].map(([path, icon, label]) => (
            <Link key={path} to={path} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
