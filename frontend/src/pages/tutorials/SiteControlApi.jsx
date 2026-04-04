import React, { useState } from 'react';
import { TutorialPage } from '../../components/TutorialPage';

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

function MethodBadge({ m }) {
  const c = {
    POST:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
    GET:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    DELETE: 'bg-red-500/15 text-red-400 border-red-500/25',
    PATCH:  'bg-amber-500/15 text-amber-400 border-amber-500/25',
  };
  return <span className={`text-[11px] font-bold px-2 py-1 rounded border font-mono flex-shrink-0 ${c[m]}`}>{m}</span>;
}

function Endpoint({ method, path, desc, params, example, response, planBadge }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.03] transition-colors text-left">
        <MethodBadge m={method} />
        <code className="text-white text-sm flex-1 font-mono break-all">{SC_API}{path}</code>
        <span className="text-gray-500 text-xs hidden md:block flex-shrink-0 ml-2">{desc}</span>
        {planBadge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/25 flex-shrink-0">
            {planBadge}
          </span>
        )}
        <span className="text-gray-600 text-xs flex-shrink-0 ml-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="border-t border-white/[0.08] p-4 bg-dark-900/40 space-y-4">
          <p className="text-gray-400 text-sm">{desc}</p>
          {params && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Felder</div>
              <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      {['Feld', 'Typ', '', 'Beschreibung'].map(h => (
                        <th key={h} className="text-left px-3 py-2 text-gray-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {params.map(([name, type, req, d], i) => (
                      <tr key={i} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-3 py-2 font-mono text-blue-300">{name}</td>
                        <td className="px-3 py-2 text-gray-500">{type}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${req ? 'bg-blue-500/15 text-blue-400' : 'bg-white/5 text-gray-500'}`}>
                            {req ? 'Pflicht' : 'opt.'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-400">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {example && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Beispiel</div>
              <CodeBlock lang="typescript" code={example} />
            </div>
          )}
          {response && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Response</div>
              <CodeBlock lang="json" code={response} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SiteControlApi() {
  return (
    <TutorialPage category="SiteControl" categoryColor="text-indigo-400">
      <div className="mb-8">
        <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">SiteControl</div>
        <h1 className="text-3xl font-bold text-white mb-3">API-Referenz</h1>
        <p className="text-gray-400 leading-relaxed">
          SiteControl ist eine Next.js-App auf Vercel mit Supabase-Backend.
          API-Routes nutzen Supabase Auth (JWT) und Row Level Security.
          Alle Endpunkte akzeptieren <code className="font-mono text-blue-300">application/json</code>.
        </p>
        <div className="card bg-amber-500/5 border-amber-500/15 mt-4 text-sm text-gray-400">
          <strong className="text-white">Auth:</strong> Alle Endpunkte (außer{' '}
          <code className="font-mono text-blue-300">/api/public/*</code> und{' '}
          <code className="font-mono text-blue-300">/api/track</code>) erfordern einen Supabase Session Token:
          <CodeBlock lang="http" code={`Authorization: Bearer SUPABASE_SESSION_TOKEN\nContent-Type: application/json`} />
          Token via <code className="font-mono text-blue-300">supabase.auth.getSession()</code> oder Magic Link / OAuth.
        </div>
        <div className="text-xs text-gray-500 mt-3">
          Base URL: <code className="font-mono text-indigo-300">{SC_API}</code>
        </div>
      </div>

      {/* ── Sites ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Sites</h2>
      <Endpoint method="GET" path="/sites" desc="Alle eigenen Websites abrufen, sortiert nach Erstellungsdatum."
        response={`[ { "id": "uuid-site-1", "name": "Mein Blog", "url": "https://meinblog.de", "slug": "mein-blog-3k2abc", "color": "#5b6af6", "status": "active" } ]`}
      />
      <Endpoint method="POST" path="/sites" desc="Neue Website hinzufügen. Free Plan: max. 3 Sites."
        params={[
          ['name', 'string', true, 'Anzeigename'],
          ['url', 'string', true, 'Vollständige URL inkl. https://'],
          ['color', 'string', false, 'Hex-Farbe (Standard: #5b6af6)'],
          ['description', 'string', false, 'Optionale Beschreibung'],
        ]}
        example={`const res = await fetch('${SC_API}/sites', {
  method: 'POST',
  headers: { Authorization: \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Mein Blog', url: 'https://meinblog.de', color: '#22c55e' }),
});`}
        response={`{ "id": "uuid-site-1", "name": "Mein Blog", "slug": "mein-blog-3k2abc", "status": "active" }`}
      />
      <Endpoint method="PATCH" path="/sites" desc="Website-Felder aktualisieren."
        params={[
          ['id', 'string', true, 'Site-UUID'],
          ['name', 'string', false, 'Neuer Name'],
          ['url', 'string', false, 'Neue URL'],
          ['status', 'string', false, '"active" | "paused" | "error"'],
          ['notes', 'string', false, 'Interne Notizen'],
        ]}
      />
      <Endpoint method="DELETE" path="/sites?id=UUID" desc="Website und alle zugehörigen Daten löschen." />

      {/* ── Todos ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">Todos</h2>
      <Endpoint method="GET" path="/todos" desc="Todos abrufen. Optional: ?site_id=UUID"
        response={`[ { "id": "uuid-todo-1", "title": "SEO-Audit", "done": false, "important": true, "priority": 2, "due_date": "2026-05-01" } ]`}
      />
      <Endpoint method="POST" path="/todos" desc="Neues Todo erstellen."
        params={[
          ['title', 'string', true, 'Aufgabentitel'],
          ['site_id', 'string', false, 'Zugehörige Website'],
          ['priority', 'integer', false, '1 (höchste) bis 5 (niedrigste)'],
          ['important', 'boolean', false, 'Wichtig-Flag'],
          ['due_date', 'date', false, 'Fälligkeitsdatum (YYYY-MM-DD)'],
          ['description', 'string', false, 'Ausführliche Beschreibung'],
        ]}
      />
      <Endpoint method="PATCH" path="/todos" desc="Todo aktualisieren."
        params={[
          ['id', 'string', true, 'Todo-UUID'],
          ['done', 'boolean', false, 'Erledigt-Status'],
          ['title', 'string', false, 'Neuer Titel'],
          ['priority', 'integer', false, 'Neue Priorität'],
        ]}
        example={`await fetch('${SC_API}/todos', {
  method: 'PATCH',
  headers: { Authorization: \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 'uuid-todo-1', done: true }),
});`}
      />
      <Endpoint method="DELETE" path="/todos?id=UUID" desc="Todo löschen." />

      {/* ── Blog ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Blog Posts <span className="text-xs font-normal text-violet-400 ml-2">Pro</span>
      </h2>
      <Endpoint method="GET" path="/blog" planBadge="Pro" desc="Blog-Posts abrufen. ?site_id=UUID, ?status=published"
        response={`[ { "id": "uuid-post-1", "title": "10 SEO-Tipps", "slug": "10-seo-tipps", "status": "published", "lang": "de" } ]`}
      />
      <Endpoint method="POST" path="/blog" planBadge="Pro" desc="Neuen Blog-Post erstellen."
        params={[
          ['site_id', 'string', true, 'UUID der Website'],
          ['title', 'string', true, 'Post-Titel'],
          ['content', 'string', false, 'Inhalt (HTML oder Markdown)'],
          ['slug', 'string', false, 'URL-Slug (auto-generiert wenn leer)'],
          ['lang', 'string', false, '"de" | "en" | "fr" | "es" | "it"'],
          ['status', 'string', false, '"draft" | "published" | "scheduled"'],
          ['publish_at', 'timestamp', false, 'Geplanter Veröffentlichungszeitpunkt'],
          ['meta_title', 'string', false, 'SEO-Title'],
          ['meta_description', 'string', false, 'SEO-Beschreibung'],
          ['meta_keywords', 'string[]', false, 'SEO-Keywords'],
        ]}
        example={`await fetch('${SC_API}/blog', {
  method: 'POST',
  headers: { Authorization: \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    site_id: 'uuid-site-1',
    title: '10 SEO-Tipps für 2025',
    content: '<p>...</p>',
    lang: 'de',
    status: 'published',
    meta_keywords: ['seo', 'tipps'],
  }),
});`}
      />
      <Endpoint method="PATCH" path="/blog" planBadge="Pro" desc="Post aktualisieren (title, content, status, slug, meta_*)." />
      <Endpoint method="DELETE" path="/blog?id=UUID" planBadge="Pro" desc="Post löschen." />

      {/* ── Changelog ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Changelog <span className="text-xs font-normal text-violet-400 ml-2">Pro</span>
      </h2>
      <Endpoint method="GET" path="/changelog" planBadge="Pro" desc="Changelog-Einträge abrufen. ?site_id=UUID"
        response={`[ { "id": "uuid-cl-1", "version": "v2.1.0", "title": "Neues Feature", "type": "feature", "published": true } ]`}
      />
      <Endpoint method="POST" path="/changelog" planBadge="Pro" desc="Neuen Changelog-Eintrag erstellen."
        params={[
          ['site_id', 'string', true, 'UUID der Website'],
          ['version', 'string', true, 'Versionsnummer (z.B. "v2.1.0")'],
          ['title', 'string', true, 'Kurzer Titel'],
          ['description', 'string', false, 'Ausführliche Beschreibung'],
          ['type', 'string', false, '"feature" | "fix" | "improvement" | "breaking"'],
          ['published', 'boolean', false, 'Sofort veröffentlichen?'],
        ]}
      />

      {/* ── Support ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Support-Tickets <span className="text-xs font-normal text-violet-400 ml-2">Pro</span>
      </h2>
      <Endpoint method="GET" path="/support" planBadge="Pro" desc="Tickets abrufen. ?site_id, ?status filter."
        response={`[ { "id": "uuid-ticket-1", "subject": "Login Problem", "status": "open", "priority": "high", "email": "max@example.com" } ]`}
      />
      <Endpoint method="POST" path="/support" planBadge="Pro" desc="Neues Ticket erstellen (z.B. vom Kontaktformular)."
        params={[
          ['subject', 'string', true, 'Betreff'],
          ['message', 'string', true, 'Nachrichteninhalt'],
          ['site_id', 'string', false, 'Zugehörige Website'],
          ['name', 'string', false, 'Name des Absenders'],
          ['email', 'string', false, 'E-Mail des Absenders'],
          ['priority', 'string', false, '"low" | "normal" | "high" | "urgent"'],
        ]}
        example={`await fetch('${SC_API}/support', {
  method: 'POST',
  headers: { Authorization: \`Bearer \${token}\`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ subject: 'Frage', message: '...', name: 'Max', priority: 'normal' }),
});`}
      />
      <Endpoint method="PATCH" path="/support" planBadge="Pro" desc="Ticket aktualisieren (status, reply, priority)."
        params={[
          ['id', 'string', true, 'Ticket-UUID'],
          ['status', 'string', false, '"open" | "in_progress" | "resolved" | "closed"'],
          ['reply', 'string', false, 'Antwort-Text'],
        ]}
      />

      {/* ── Public Tracking ── */}
      <h2 className="text-lg font-semibold text-white mb-3 mt-8 pb-2 border-b border-white/[0.08]">
        Public Tracking <span className="text-xs font-normal text-gray-500 ml-2">kein Auth nötig</span>
      </h2>
      <Endpoint method="POST" path="/track" desc="Analytics-Event senden. Kein Auth-Header erforderlich — für Tracking-Snippets."
        params={[
          ['site_id', 'string', true, 'UUID der Website'],
          ['event_type', 'string', true, '"pageview" | "error" | beliebig'],
          ['path', 'string', false, 'URL-Pfad'],
          ['referrer', 'string', false, 'Herkunfts-URL'],
          ['value', 'integer', false, 'Zähler (Standard: 1)'],
        ]}
      />
    </TutorialPage>
  );
}
