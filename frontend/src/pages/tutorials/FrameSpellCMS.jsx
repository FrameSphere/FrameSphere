import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Clock, Zap, CheckCircle } from 'lucide-react';

function CodeBlock({ code, lang = '' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700 rounded-t-lg border-b border-white/5">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
        </button>
      </div>
      <pre className="bg-dark-900 rounded-b-lg p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed border border-white/5 border-t-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Callout({ type = 'info', children }) {
  const styles = { info: 'bg-primary-500/10 border-primary-500/40 text-primary-200', warn: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-200', success: 'bg-green-500/10 border-green-500/40 text-green-200' };
  const icons = { info: '💡', warn: '⚠️', success: '✅' };
  return <div className={`flex gap-3 p-4 rounded-lg border mb-6 text-sm leading-relaxed ${styles[type]}`}><span className="flex-shrink-0">{icons[type]}</span><div>{children}</div></div>;
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center text-sm font-bold">{n}</div>
      <div className="flex-1"><h3 className="font-bold text-white mb-3">{title}</h3>{children}</div>
    </div>
  );
}

const TutorialCMS = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-3xl mx-auto">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/developers/tutorials" className="hover:text-primary-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Tutorials
        </Link>
        <span>/</span>
        <span className="text-white">CMS-Integration (WordPress / Strapi)</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full font-semibold">FrameSpell API</span>
          <span className="text-xs px-2.5 py-1 bg-red-500/20 text-red-400 rounded-full">Experte</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> 25 Min.</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">CMS-Integration (WordPress / Strapi)</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          FrameSpell API direkt in WordPress (via Custom Plugin) und Strapi (via Lifecycle-Hook) integrieren — automatische Korrektur beim Veröffentlichen, REST-Webhook-Pattern und Admin-UI-Erweiterung.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>März 2026</span><span>·</span><span>WordPress PHP + Strapi Node.js</span>
        </div>
      </div>

      <div className="card mb-10 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/20">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-primary-400" /> Was du lernst</h2>
        <ul className="space-y-2">
          {['WordPress Plugin: Eigener pre_post_publish Hook in PHP', 'WP Admin-UI: Korrektur-Button im Post-Editor', 'Strapi Lifecycle Hook: beforeCreate / beforeUpdate', 'Strapi Custom Controller: Manueller Korrektur-Endpunkt', 'Webhook-Pattern: Beliebiges CMS via HTTP Webhook anbinden'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {item}</li>
          ))}
        </ul>
      </div>

      {/* ── WORDPRESS ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
          <h2 className="text-2xl font-bold text-white">Teil 1 — WordPress</h2>
        </div>

        <Step n="1" title="Plugin-Datei erstellen">
          <p className="text-gray-400 text-sm mb-4">Erstelle einen neuen Ordner in <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">wp-content/plugins/framespell-integration/</code> mit einer Plugin-Hauptdatei:</p>
          <CodeBlock lang="framespell-integration.php" code={`<?php
/**
 * Plugin Name: FrameSpell Integration
 * Description: Automatische Rechtschreibkorrektur via FrameSpell API beim Veröffentlichen.
 * Version: 1.0.0
 * Author: FrameSphere
 */

defined('ABSPATH') || exit;

// API-Key aus wp-config.php holen (dort als Konstante definieren)
// define('FRAMESPELL_API_KEY', 'fs_live_xxxxxxxx');

define('FRAMESPELL_ENDPOINT',
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck'
);

/**
 * Sendet Text an FrameSpell und gibt die Korrektur zurück.
 */
function framespell_correct(string $text, string $language = 'de'): string {
  if (empty(trim($text))) return $text;

  $response = wp_remote_post(FRAMESPELL_ENDPOINT, [
    'headers' => [
      'Content-Type' => 'application/json',
      'X-API-Key'    => defined('FRAMESPELL_API_KEY') ? FRAMESPELL_API_KEY : '',
    ],
    'body'    => wp_json_encode(['text' => $text, 'language' => $language]),
    'timeout' => 15,
  ]);

  if (is_wp_error($response)) {
    error_log('[FrameSpell] API-Fehler: ' . $response->get_error_message());
    return $text;   // Bei Fehler Original zurückgeben
  }

  $body = json_decode(wp_remote_retrieve_body($response), true);

  if (!empty($body['success']) && !empty($body['data']['corrected'])) {
    return $body['data']['corrected'];
  }

  return $text;
}`} />
        </Step>

        <Step n="2" title="Automatische Korrektur beim Veröffentlichen (Hook)">
          <p className="text-gray-400 text-sm mb-4">WordPress feuert beim Statuswechsel zu „publish" den <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">transition_post_status</code> Hook. Dort klinken wir uns ein:</p>
          <CodeBlock lang="framespell-integration.php (Fortsetzung)" code={`/**
 * Hook: Korrigiere Titel und Inhalt beim ersten Veröffentlichen.
 * Läuft als Hintergrundprozess – blockiert den Admin nicht.
 */
add_action('transition_post_status', 'framespell_on_publish', 10, 3);

function framespell_on_publish(string $new_status, string $old_status, WP_Post $post): void {
  // Nur bei Übergang zu 'publish' und nur für normale Beiträge/Seiten
  if ($new_status !== 'publish' || $old_status === 'publish') return;
  if (!in_array($post->post_type, ['post', 'page'], true))    return;

  // Plain-Text aus dem Inhalt extrahieren (HTML-Tags entfernen)
  $plain_content = wp_strip_all_tags($post->post_content);

  // Titel und Inhalt korrigieren
  $corrected_title   = framespell_correct($post->post_title);
  $corrected_content = framespell_correct($plain_content);

  // Wenn Korrekturen vorgenommen wurden: Beitrag aktualisieren
  $changed = ($corrected_title !== $post->post_title)
          || ($corrected_content !== $plain_content);

  if ($changed) {
    // Hook temporär entfernen, damit kein rekursiver Loop entsteht
    remove_action('transition_post_status', 'framespell_on_publish', 10);

    wp_update_post([
      'ID'           => $post->ID,
      'post_title'   => $corrected_title,
      // Originalformatierung beibehalten, nur korrigierten Text einsetzen
      'post_content' => str_replace(
        $plain_content,
        $corrected_content,
        $post->post_content
      ),
    ]);

    // Meta-Eintrag: Wann wurde zuletzt korrigiert?
    update_post_meta($post->ID, '_framespell_corrected_at', current_time('mysql'));

    add_action('transition_post_status', 'framespell_on_publish', 10, 3);
  }
}`} />
          <Callout type="warn">
            <strong>Wichtig:</strong> wp_update_post() löst erneut Hooks aus. Deshalb entfernen wir den Hook vor dem Update und fügen ihn danach wieder hinzu — sonst entsteht eine Endlosschleife.
          </Callout>
        </Step>

        <Step n="3" title="Admin-UI: Manueller Korrektur-Button im Post-Editor">
          <p className="text-gray-400 text-sm mb-4">Ein Button in der Sidebar des Block-Editors ermöglicht Redakteuren, die Korrektur manuell auszulösen:</p>
          <CodeBlock lang="framespell-integration.php (Fortsetzung)" code={`/**
 * AJAX-Endpunkt für manuellen Korrektur-Button im Editor.
 */
add_action('wp_ajax_framespell_manual_check', 'framespell_ajax_check');

function framespell_ajax_check(): void {
  check_ajax_referer('framespell_nonce', 'nonce');

  if (!current_user_can('edit_posts')) {
    wp_send_json_error('Keine Berechtigung', 403);
  }

  $text    = sanitize_textarea_field($_POST['text'] ?? '');
  $lang    = sanitize_key($_POST['language'] ?? 'de');

  $corrected = framespell_correct($text, $lang);

  wp_send_json_success([
    'corrected' => $corrected,
    'changed'   => $corrected !== $text,
  ]);
}

/**
 * JavaScript für den Gutenberg-Block-Editor einbinden.
 */
add_action('enqueue_block_editor_assets', 'framespell_enqueue_editor_script');

function framespell_enqueue_editor_script(): void {
  wp_enqueue_script(
    'framespell-editor',
    plugin_dir_url(__FILE__) . 'editor.js',
    ['wp-edit-post', 'wp-element', 'wp-components', 'wp-data'],
    '1.0.0',
    true
  );

  wp_localize_script('framespell-editor', 'framespellData', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
    'nonce'   => wp_create_nonce('framespell_nonce'),
  ]);
}`} />
          <CodeBlock lang="editor.js" code={`// editor.js – Gutenberg-Sidebar-Button (Vanilla JS, kein Build nötig)
const { registerPlugin }  = wp.plugins;
const { PluginSidebar }   = wp.editPost;
const { Button, Spinner } = wp.components;
const { withSelect }      = wp.data;
const { el, useState }    = wp.element;

registerPlugin('framespell-sidebar', {
  render() {
    const [status,   setStatus]   = useState('idle');   // idle | checking | done | error
    const [corrected, setCorrected] = useState('');

    const checkNow = async () => {
      setStatus('checking');

      const content = wp.data.select('core/editor').getEditedPostContent();

      const formData = new FormData();
      formData.append('action',   'framespell_manual_check');
      formData.append('nonce',    framespellData.nonce);
      formData.append('text',     content.replace(/<[^>]+>/g, ''));  // HTML entfernen
      formData.append('language', 'de');

      try {
        const resp = await fetch(framespellData.ajaxUrl, {
          method: 'POST',
          body:   formData,
        });
        const data = await resp.json();

        if (data.success) {
          setCorrected(data.data.corrected);
          setStatus(data.data.changed ? 'done' : 'perfect');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    return el(PluginSidebar, { name: 'framespell', title: '🔤 FrameSpell' },
      el('div', { style: { padding: '16px' } },
        el(Button, { variant: 'primary', onClick: checkNow, disabled: status === 'checking' },
          status === 'checking' ? el(Spinner) : '✓ Text prüfen'
        ),
        status === 'perfect' && el('p', { style: { color: '#00a32a', marginTop: 12 } }, '✅ Keine Fehler'),
        status === 'done'    && el('div', { style: { marginTop: 12, fontSize: 13 } },
          el('p', { style: { color: '#dba617' } }, '⚠ Korrekturen gefunden'),
          el('pre', { style: { whiteSpace: 'pre-wrap', background: '#1e1e1e', color: '#d4d4d4', padding: 12, borderRadius: 6, fontSize: 12 } }, corrected)
        ),
        status === 'error'   && el('p', { style: { color: '#cc1818', marginTop: 12 } }, '❌ Fehler bei der Prüfung')
      )
    );
  }
});`} />
        </Step>
      </div>

      {/* ── STRAPI ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
          <h2 className="text-2xl font-bold text-white">Teil 2 — Strapi</h2>
        </div>

        <Step n="4" title="Lifecycle Hook in Strapi (beforeCreate / beforeUpdate)">
          <p className="text-gray-400 text-sm mb-4">Strapi ermöglicht Lifecycle Hooks in der jeweiligen Content-Type-Datei. Für einen Artikel-Typ (<code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">Article</code>):</p>
          <CodeBlock lang="src/api/article/content-types/article/lifecycles.ts" code={`// src/api/article/content-types/article/lifecycles.ts
import type { Event } from '@strapi/database/dist/lifecycles';

const FRAMESPELL_URL =
  'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck';

async function correctText(text: string | null): Promise<string> {
  if (!text) return '';

  const resp = await fetch(FRAMESPELL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key':    process.env.FRAMESPELL_API_KEY ?? '',
    },
    body: JSON.stringify({ text, language: 'de' }),
  });

  const data = await resp.json();
  return data?.data?.corrected ?? text;
}

export default {
  // Vor dem ersten Erstellen
  async beforeCreate(event: Event) {
    const { data } = event.params;

    if (data.title)   data.title   = await correctText(data.title);
    if (data.content) data.content = await correctText(data.content);
    if (data.summary) data.summary = await correctText(data.summary);

    strapi.log.info('[FrameSpell] Artikel korrigiert (beforeCreate)');
  },

  // Vor dem Aktualisieren (nur wenn Felder sich geändert haben)
  async beforeUpdate(event: Event) {
    const { data } = event.params;

    // Nur prüfen, wenn die Felder tatsächlich im Update-Payload enthalten sind
    if (data.title)   data.title   = await correctText(data.title);
    if (data.content) data.content = await correctText(data.content);
    if (data.summary) data.summary = await correctText(data.summary);

    strapi.log.info('[FrameSpell] Artikel korrigiert (beforeUpdate)');
  },
};`} />
          <Callout type="info">
            <strong>Tipp:</strong> Lifecycle Hooks blockieren den API-Request. Bei langen Texten empfiehlt sich eine asynchrone Verarbeitung via Job Queue (z. B. <code>strapi-plugin-bullmq</code>), damit die API sofort antwortet.
          </Callout>
        </Step>

        <Step n="5" title="Strapi Custom Controller: Manueller Check-Endpunkt">
          <p className="text-gray-400 text-sm mb-4">Für Redakteure, die einen Artikel manuell prüfen wollen, ohne ihn zu speichern — ein eigener API-Endpunkt:</p>
          <CodeBlock lang="src/api/article/controllers/spellcheck.ts" code={`// src/api/article/controllers/spellcheck.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }) => ({

    async spellcheck(ctx: any) {
      const { text, language = 'de' } = ctx.request.body;

      if (!text) {
        return ctx.badRequest('text ist erforderlich');
      }

      const resp = await fetch(
        'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key':    process.env.FRAMESPELL_API_KEY ?? '',
          },
          body: JSON.stringify({ text, language }),
        }
      );

      const data = await resp.json();

      if (!data.success) {
        return ctx.badRequest(data.error ?? 'FrameSpell Fehler');
      }

      ctx.body = {
        original:  text,
        corrected: data.data.corrected,
        changed:   data.data.corrected !== text,
      };
    },

  })
);`} />
          <CodeBlock lang="src/api/article/routes/spellcheck.ts" code={`// src/api/article/routes/spellcheck.ts
export default {
  routes: [
    {
      method:  'POST',
      path:    '/articles/spellcheck',
      handler: 'api::article.article.spellcheck',
      config: {
        auth: { scope: ['plugin::users-permissions.user'] },  // Auth required
      },
    },
  ],
};`} />
        </Step>

        <Step n="6" title="Universelles Webhook-Pattern (beliebiges CMS)">
          <p className="text-gray-400 text-sm mb-4">Für CMS-Systeme ohne Plugin-Support (Contentful, Sanity, DatoCMS …): Ein Node.js Webhook-Empfänger korrigiert Inhalte nach dem Publizieren via Webhook:</p>
          <CodeBlock lang="webhook-server.ts" code={`// webhook-server.ts – Generischer CMS Webhook Empfänger
import express from 'express';
import crypto  from 'crypto';

const app    = express();
const PORT   = process.env.PORT || 3001;

// Webhook-Secret verifizieren (CMS konfiguriert dasselbe Secret)
function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret   = process.env.CMS_WEBHOOK_SECRET ?? '';
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

app.use(express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));

// Webhook-Empfänger
app.post('/webhook/cms', async (req: any, res) => {
  const signature = req.headers['x-webhook-signature'] as string;

  if (!verifyWebhookSignature(req.rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event, data } = req.body;

  // Nur bei Veröffentlichungs-Events
  if (!['entry.publish', 'entry.create'].includes(event)) {
    return res.json({ status: 'ignored' });
  }

  const textFields = ['title', 'content', 'summary', 'description'];
  let corrections  = 0;

  for (const field of textFields) {
    if (!data[field]) continue;

    const resp = await fetch(
      'https://rechtschreibe-api.karol-paschek.workers.dev/spellcheck',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.FRAMESPELL_API_KEY ?? '' },
        body:    JSON.stringify({ text: data[field], language: 'de' }),
      }
    );
    const result = await resp.json();

    if (result.success && result.data.corrected !== data[field]) {
      corrections++;
      console.log(\`[FrameSpell] Feld "\${field}" korrigiert:\`, result.data.corrected.slice(0, 60) + '…');

      // Hier: Zurück ans CMS schreiben via CMS-API (z.B. Contentful Management API)
      // await updateContentfulEntry(data.sys.id, field, result.data.corrected);
    }
  }

  res.json({ status: 'processed', corrections });
});

app.listen(PORT, () => console.log(\`[Webhook] Server läuft auf Port \${PORT}\`));`} />
          <Callout type="success">
            <strong>Ergebnis:</strong> Dieser Webhook-Server lässt sich mit jedem CMS verbinden, das HTTP-Webhooks unterstützt — Contentful, Sanity, DatoCMS, Directus, Ghost und viele mehr.
          </Callout>
        </Step>
      </div>

      {/* Zusammenfassung */}
      <div className="card mb-10">
        <h2 className="font-bold text-white mb-4">Zusammenfassung</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { cms: 'WordPress', approach: 'PHP Plugin + transition_post_status Hook', complexity: 'Mittel' },
            { cms: 'Strapi', approach: 'Lifecycle Hooks + Custom Controller Route', complexity: 'Niedrig' },
            { cms: 'Beliebiges CMS', approach: 'Webhook-Pattern + Node.js Empfänger', complexity: 'Niedrig' },
          ].map((row, i) => (
            <div key={i} className="glass-effect rounded-xl p-4">
              <div className="font-bold text-white text-sm mb-1">{row.cms}</div>
              <div className="text-gray-400 text-xs mb-2">{row.approach}</div>
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-300 rounded">Komplexität: {row.complexity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/developers/tutorials/framespell-batch" className="btn-secondary text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Tutorial 3: Batch-Verarbeitung
        </Link>
        <Link to="/developers/tutorials" className="btn-primary text-sm flex items-center gap-2">
          Alle Tutorials
        </Link>
      </div>
    </div>
  </div>
);

export default TutorialCMS;
