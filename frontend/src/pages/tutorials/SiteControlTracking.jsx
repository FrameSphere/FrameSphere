import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorialPage } from '../../components/TutorialPage';

const SC_API = 'https://site-control-nine.vercel.app/api';

function CodeBlock({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08]">
        <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[11px] text-gray-500 hover:text-white px-2 py-0.5 rounded border border-white/[0.08]">
          {copied ? '✓' : 'Kopieren'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed bg-black/20"><code>{code}</code></pre>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-white/[0.08]">{title}</h2>
      {children}
    </div>
  );
}

export default function SiteControlTracking() {
  return (
    <TutorialPage category="SiteControl" categoryColor="text-indigo-400">
      <div className="mb-8">
        <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">SiteControl</div>
        <h1 className="text-3xl font-bold text-white mb-3">Analytics-Tracking einbinden</h1>
        <p className="text-gray-400 leading-relaxed">
          SiteControl erfasst Pageviews, Referrer, Gerätedaten und Fehler über ein minimales
          Tracking-Script — DSGVO-konform, kein Cookie, kein Fingerprinting.
        </p>
      </div>

      <Section title="Das Tracking-Script">
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Das Script ist unter 2 KB, asynchron geladen und sendet keine personenbezogenen Daten.
          Es erfasst: <strong className="text-white">URL-Pfad, Referrer, User-Agent-Kategorie, Land</strong> (via CF-Header).
        </p>

        <h3 className="text-white font-semibold text-sm mb-2">Option 1 — HTML Snippet (empfohlen)</h3>
        <CodeBlock lang="html" code={`<!-- In <head> einfügen -->
<script>
  (function(w, d) {
    var s = d.createElement('script');
    s.src = '${SC_API.replace('/api', '')}/api/public/tracker.js';
    s.async = true;
    s.dataset.siteId = 'DEINE_SITE_ID';
    d.head.appendChild(s);
  })(window, document);
</script>`} />
        <p className="text-gray-500 text-xs mb-6">Site-ID: Dashboard → Website → Einstellungen → Site-ID.</p>

        <h3 className="text-white font-semibold text-sm mb-2">Option 2 — Next.js (App Router)</h3>
        <CodeBlock lang="jsx" code={`// app/layout.tsx
import Script from 'next/script';
export default function RootLayout({ children }) {
  return (
    <html><head>
      <Script
        src="${SC_API.replace('/api', '')}/api/public/tracker.js"
        data-site-id={process.env.NEXT_PUBLIC_SITECONTROL_SITE_ID}
        strategy="afterInteractive"
      />
    </head><body>{children}</body></html>
  );
}`} />

        <h3 className="text-white font-semibold text-sm mb-2">Option 3 — React SPA</h3>
        <CodeBlock lang="jsx" code={`function SiteControlTracker({ siteId }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '${SC_API.replace('/api', '')}/api/public/tracker.js';
    script.async = true;
    script.dataset.siteId = siteId;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [siteId]);
  return null;
}
// In App: <SiteControlTracker siteId={import.meta.env.VITE_SITECONTROL_SITE_ID} />`} />

        <h3 className="text-white font-semibold text-sm mb-2">Option 4 — WordPress</h3>
        <CodeBlock lang="php" code={`// functions.php
function sitecontrol_tracking() {
  $site_id = 'DEINE_SITE_ID';
  echo "<script>(function(w,d){var s=d.createElement('script');s.src='${SC_API.replace('/api', '')}/api/public/tracker.js';s.async=true;s.dataset.siteId='{$site_id}';d.head.appendChild(s);})(window,document);</script>";
}
add_action('wp_head', 'sitecontrol_tracking');`} />
      </Section>

      <Section title="Manuelle Events tracken">
        <CodeBlock lang="javascript" code={`window.SiteControl?.track('button_click', { label: 'CTA Hero', path: window.location.pathname });

// Oder direkt per fetch:
await fetch('${SC_API}/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ site_id: 'DEINE_SITE_ID', event_type: 'form_submit', path: '/kontakt', value: 1 }),
});`} />
      </Section>

      <Section title="Fehler melden">
        <CodeBlock lang="javascript" code={`window.addEventListener('error', (event) => {
  fetch('${SC_API}/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site_id: 'DEINE_SITE_ID', event_type: 'error', path: window.location.pathname }),
  }).catch(() => {});
});`} />
      </Section>

      <Section title="Was wird erfasst?">
        <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="text-left px-4 py-2.5 text-gray-500 text-xs uppercase">Datenfeld</th>
                <th className="text-left px-4 py-2.5 text-gray-500 text-xs uppercase">Inhalt</th>
                <th className="text-left px-4 py-2.5 text-gray-500 text-xs uppercase">Personenbezogen?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['event_type','"pageview", "error", oder eigene Events','Nein'],
                ['path','URL-Pfad ohne Domain (/blog/artikel)','Nein'],
                ['referrer','Herkunfts-Domain (z.B. google.com)','Nein'],
                ['device','"mobile" oder "desktop" aus User-Agent','Nein'],
                ['country','2-stelliger ISO-Code via Cloudflare-Header','Nein'],
                ['value','Numerischer Zähler (Standard: 1)','Nein'],
              ].map(([f,d,p])=>(
                <tr key={f} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-blue-300 text-xs">{f}</td>
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{d}</td>
                  <td className="px-4 py-2.5 text-green-400 text-xs">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">IP-Adressen werden <strong className="text-white">nicht gespeichert</strong>. Kein Cookie. DSGVO-konform.</p>
      </Section>

      <div className="card bg-indigo-500/5 border-indigo-500/15">
        <h3 className="font-semibold text-white mb-2">Weiter</h3>
        <Link to="/developers/tutorials/sitecontrol-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <span className="text-indigo-400">→</span> Vollständige API-Referenz für SiteControl
        </Link>
      </div>
    </TutorialPage>
  );
}
