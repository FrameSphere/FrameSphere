import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { TutorialPage } from '../../components/TutorialPage';

function CodeBlock({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.08] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08]">
        <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[11px] text-gray-500 hover:text-white transition-colors px-2 py-0.5 rounded border border-white/[0.08] hover:border-white/20"
        >
          {copied ? '✓ Kopiert' : 'Kopieren'}
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
        style={{ background: 'linear-gradient(135deg,#10B981,#3B82F6)' }}>
        {n}
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function InfoBox({ icon = '💡', color = 'blue', children }) {
  const colors = {
    blue: 'bg-blue-500/5 border-blue-500/15',
    green: 'bg-green-500/5 border-green-500/15',
    yellow: 'bg-amber-500/5 border-amber-500/15',
  };
  return <div className={`card text-sm text-gray-400 my-4 ${colors[color]}`}>{icon} {children}</div>;
}

export default function RateLimitAnalytics() {
  return (
    <TutorialPage category="RateLimit API" categoryColor="text-blue-400">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#10B981,#3B82F6)' }}>
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">RateLimit API</div>
            <h1 className="text-3xl font-bold text-white">Analytics-Dashboard auslesen</h1>
          </div>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Das eingebaute Analytics-Dashboard zeigt Request-Logs, Blockierungsraten, Top-IPs und
          Endpoint-Traffic live an — ohne externes Tool. Du lernst, wie du die Daten über das
          Dashboard nutzt und was die einzelnen Metriken bedeuten.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">Dashboard</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">Cloudflare D1</span>
          <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">~15 Min</span>
        </div>
      </div>

      {/* Metriken-Übersicht */}
      <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/[0.08]">
        Was das Dashboard zeigt
      </h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {[
          { label: 'Gesamt Requests', icon: '📊', desc: 'Alle eingehenden Checks im gewählten Zeitraum (24h / 7d / 30d).' },
          { label: 'Blockierte Requests', icon: '🚫', desc: 'Davon abgelehnter Traffic — durch Rate Limit oder Filter.' },
          { label: 'Unique IPs', icon: '🌐', desc: 'Anzahl eindeutiger IP-Adressen im Zeitraum.' },
          { label: 'Blockierungsrate %', icon: '📈', desc: 'Anteil blockierter Requests am Gesamttraffic.' },
          { label: 'Zeitverlauf-Chart', icon: '🕐', desc: 'Requests über Zeit — Spitzen und Muster erkennen.' },
          { label: 'Top Endpoints', icon: '🔥', desc: 'Meist aufgerufene Endpunkte deiner API.' },
          { label: 'Top IPs', icon: '🏆', desc: 'IPs mit den meisten Requests — potenzielle Missbraucher.' },
          { label: 'Request Logs', icon: '📋', desc: 'Detaillierte Einzellogs: Endpoint, Methode, IP, Status, Timestamp.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 card">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="font-semibold text-white text-sm">{item.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard-Navigation */}
      <Step n={1} title="Analytics-Seite öffnen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Melde dich auf{' '}
          <a href="https://ratelimit-api.pages.dev" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:underline">ratelimit-api.pages.dev</a>{' '}
          an und navigiere zu <strong className="text-white">Analytics</strong> in der Sidebar.
          Wähle deinen API Key und den gewünschten Zeitraum:
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {['24 Stunden', '7 Tage', '30 Tage'].map((t) => (
            <span key={t} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-full">{t}</span>
          ))}
        </div>
        <InfoBox icon="💡" color="blue">
          Alle Daten werden in der Cloudflare D1-Datenbank gespeichert.
          Das Dashboard liest sie direkt über den Cloudflare Worker aus — keine externe Datenbank nötig.
        </InfoBox>
      </Step>

      <Step n={2} title="Zeitverlauf-Chart lesen">
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          Der Chart zeigt Requests pro Zeiteinheit als Balkendiagramm. Typische Muster die du
          erkennen solltest:
        </p>
        <div className="space-y-3 mb-3">
          {[
            {
              pattern: '📈 Gleichmäßige Basis mit Spitzen',
              meaning: 'Normaler Traffic-Verlauf mit legitimen Lastspitzen (z.B. morgens, nach Kampagnen).',
              action: 'Kein Handlungsbedarf.',
            },
            {
              pattern: '⚡ Extrem steile Spitze (Spike)',
              meaning: 'Plötzlicher Massenangriff oder Burst-Traffic von einem Client.',
              action: 'Top-IPs prüfen → ggf. Blacklist anlegen.',
            },
            {
              pattern: '📊 Konstant hohes Niveau nachts',
              meaning: 'Automatisierter Bot-Traffic (Crawler, Scraper).',
              action: 'User-Agent-Filter aktivieren, auffällige IPs blockieren.',
            },
            {
              pattern: '📉 Plötzlicher Rückgang auf null',
              meaning: 'Möglicher Worker-Ausfall oder Deployment-Unterbrechung.',
              action: 'Worker-Status in Cloudflare Dashboard prüfen.',
            },
          ].map((item, i) => (
            <div key={i} className="card bg-white/[0.02]">
              <div className="font-mono text-sm text-white mb-1">{item.pattern}</div>
              <div className="text-gray-400 text-xs mb-1">{item.meaning}</div>
              <div className="text-blue-400 text-xs">→ {item.action}</div>
            </div>
          ))}
        </div>
      </Step>

      <Step n={3} title="Top-IPs analysieren">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Die Top-IPs-Tabelle zeigt die Adressen mit den meisten Requests. Wende folgende
          Heuristiken an:
        </p>
        <div className="bg-black/20 rounded-xl border border-white/[0.08] overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Signal</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Bedeutung</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Maßnahme</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Eine IP > 50 % aller Requests', 'Verdächtiger Einzelclient', 'Blacklist anlegen'],
                ['Viele IPs aus gleichem /24-Subnetz', 'Koordinierter Angriff / Botnet', 'Subnetz blockieren'],
                ['Bekannte Cloud-IPs (AWS, DO, Hetzner)', 'Automatisierter Server-Traffic', 'Whitelisten oder blockieren je nach Use Case'],
                ['Eigene Server-IP oben', 'Interne Tests/Monitoring zählen mit', 'Whitelist anlegen'],
              ].map(([s, m, a]) => (
                <tr key={s} className="border-b border-white/[0.04]">
                  <td className="py-2 px-4 text-gray-300 text-xs">{s}</td>
                  <td className="py-2 px-4 text-gray-400 text-xs">{m}</td>
                  <td className="py-2 px-4 text-blue-300 text-xs">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Step>

      <Step n={4} title="Request-Logs filtern">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Die Logs-Tabelle zeigt jeden einzelnen Check mit:
        </p>
        <div className="grid sm:grid-cols-2 gap-2 mb-3">
          {[
            ['Timestamp', 'Zeitpunkt des Requests'],
            ['IP', 'Client-IP-Adresse'],
            ['Endpoint', 'Aufgerufener Pfad'],
            ['Methode', 'GET / POST / PUT / DELETE'],
            ['Status', 'allowed / blocked'],
            ['Reason', 'Grund bei blocked'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2 text-xs">
              <code className="text-blue-300 font-mono">{k}</code>
              <span className="text-gray-500">{v}</span>
            </div>
          ))}
        </div>
        <InfoBox icon="🔍" color="blue">
          Nutze die Suche oder Filter im Dashboard um z.B. nur blockierte Requests oder einen
          bestimmten Endpoint anzuzeigen.
        </InfoBox>
      </Step>

      <Step n={5} title="Blockierungsrate überwachen">
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          Die Blockierungsrate zeigt den Anteil abgelehnter Requests. Richtwerte:
        </p>
        <div className="space-y-2 mb-3">
          {[
            { range: '0 – 5 %', color: 'text-green-400', label: 'Normal', desc: 'Wenige legitime Überschreitungen oder Bots.' },
            { range: '5 – 20 %', color: 'text-yellow-400', label: 'Aufmerksamkeit', desc: 'Prüfe Top-IPs und Endpoints auf ungewöhnliches Verhalten.' },
            { range: '> 20 %', color: 'text-red-400', label: 'Kritisch', desc: 'Möglicher Angriff oder falsch konfiguriertes Rate Limit.' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 card">
              <span className={`font-mono font-bold text-sm w-16 flex-shrink-0 ${item.color}`}>{item.range}</span>
              <span className={`font-semibold text-sm w-20 flex-shrink-0 ${item.color}`}>{item.label}</span>
              <span className="text-gray-400 text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </Step>

      {/* Monitoring-Script */}
      <h2 className="text-xl font-semibold text-white mb-4 mt-10 pb-2 border-b border-white/[0.08]">
        Lokales Monitoring-Script
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        Du kannst die im Code integrierten Metriken periodisch in deine eigene Monitoring-Infrastruktur
        (Grafana, Datadog, Slack) exportieren:
      </p>
      <CodeBlock lang="javascript" code={`// monitoring.js — periodisch Metrics loggen
class RateLimitMonitor {
  constructor() {
    this.metrics = { total: 0, allowed: 0, blocked: 0, errors: 0 };
  }

  async check(endpoint, method, ip) {
    this.metrics.total++;
    try {
      const res = await fetch(
        \`https://ratelimit-api.pages.dev/check?endpoint=\${endpoint}&method=\${method}\`,
        { headers: { 'X-API-Key': process.env.RATELIMIT_API_KEY, 'CF-Connecting-IP': ip } }
      );
      const data = await res.json();
      data.allowed ? this.metrics.allowed++ : this.metrics.blocked++;
      return data;
    } catch {
      this.metrics.errors++;
      return { allowed: true }; // Fail-open
    }
  }

  getReport() {
    const { total, allowed, blocked, errors } = this.metrics;
    return {
      total,
      allowed,
      blocked,
      errors,
      blockRate: total > 0 ? ((blocked / total) * 100).toFixed(1) + '%' : '0%',
      errorRate: total > 0 ? ((errors / total) * 100).toFixed(1) + '%' : '0%',
    };
  }

  reset() { this.metrics = { total: 0, allowed: 0, blocked: 0, errors: 0 }; }
}

const monitor = new RateLimitMonitor();

// Jede Minute Report in Konsole (→ ersetzen durch Slack/Grafana)
setInterval(() => {
  const report = monitor.getReport();
  console.log('[RateLimit Report]', report);
  if (parseFloat(report.blockRate) > 20) {
    console.warn('⚠️  Blockierungsrate über 20% — prüfe das Dashboard!');
  }
  monitor.reset();
}, 60_000);

module.exports = { monitor };`} />

      {/* Nächste Schritte */}
      <div className="card bg-violet-500/5 border-violet-500/15 mt-8">
        <h3 className="font-semibold text-white mb-3">Nächste Schritte</h3>
        <div className="space-y-2 text-sm">
          <Link to="/developers/tutorials/ratelimit-api" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-purple-400">→</span> Vollständige API-Referenz
          </Link>
          <Link to="/developers/tutorials/ratelimit-blacklist" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span className="text-red-400">→</span> IP-Blacklisting & Filter-Regeln
          </Link>
        </div>
      </div>
    </TutorialPage>
  );
}
