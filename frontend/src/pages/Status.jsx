import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, RefreshCw, WifiOff, Wifi, ExternalLink } from 'lucide-react';

/* ─── Services ────────────────────────────────────────────────────────────── */
const SERVICES = [
  // Core
  { name: 'FrameSphere',        url: 'https://frame-sphere.vercel.app/',                                     displayUrl: 'frame-sphere.vercel.app',                      category: 'Core' },
  // APIs
  { name: 'FrameSpell Website', url: 'https://framespell.pages.dev/',                                        displayUrl: 'framespell.pages.dev',                         category: 'APIs' },
  { name: 'FrameSpell Worker',  url: 'https://rechtschreibe-api.karol-paschek.workers.dev/',                 displayUrl: 'rechtschreibe-api.karol-paschek.workers.dev',  category: 'APIs' },
  { name: 'RateLimit API',      url: 'https://ratelimit-api.pages.dev/',                                     displayUrl: 'ratelimit-api.pages.dev',                      category: 'APIs' },
  { name: 'RateLimit Worker',   url: 'https://ratelimit-api.karol-paschek.workers.dev/',                     displayUrl: 'ratelimit-api.karol-paschek.workers.dev',      category: 'APIs' },
  { name: 'KeyScope',           url: 'https://keyscope.pages.dev/',                                          displayUrl: 'keyscope.pages.dev',                           category: 'APIs' },
  { name: 'KeyScope Worker',    url: 'https://keyscope-worker.karol-paschek.workers.dev/health',             displayUrl: 'keyscope-worker.karol-paschek.workers.dev',    category: 'APIs' },
  // Apps
  { name: 'FrameTrain',         url: 'https://frame-train.vercel.app/',                                      displayUrl: 'frame-train.vercel.app',                       category: 'Apps' },
  { name: 'SiteControl',        url: 'https://app.sitecontrol.app/',                                         displayUrl: 'app.sitecontrol.app',                          category: 'Apps' },
  // Web Apps
  { name: 'Wordify',            url: 'https://wordify.pages.dev/',                                           displayUrl: 'wordify.pages.dev',                            category: 'Web Apps' },
  { name: 'BrawlMystery',       url: 'https://brawlmystery.pages.dev/',                                      displayUrl: 'brawlmystery.pages.dev',                       category: 'Web Apps' },
  { name: 'FileFlyr',           url: 'https://fileflyr.pages.dev/',                                          displayUrl: 'fileflyr.pages.dev',                           category: 'Web Apps' },
  { name: 'SpinSelector',       url: 'https://spinselector.pages.dev/',                                      displayUrl: 'spinselector.pages.dev',                       category: 'Web Apps' },
  { name: 'Traitora',           url: 'https://traitora.pages.dev/',                                          displayUrl: 'traitora.pages.dev',                           category: 'Web Apps' },
];

/* ─── Check one service ───────────────────────────────────────────────────── */
async function checkService(service) {
  const TIMEOUT_MS = 8000;
  const start = performance.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const resp = await fetch(service.url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timer);
    const latency = Math.round(performance.now() - start);
    const ok = resp.type === 'opaque' || resp.ok;
    return { ...service, status: ok ? 'operational' : 'degraded', latency, checkedAt: new Date() };
  } catch (err) {
    const latency = Math.round(performance.now() - start);
    const timedOut = err.name === 'AbortError';
    return {
      ...service,
      status: timedOut ? 'degraded' : 'outage',
      latency: timedOut ? TIMEOUT_MS : latency,
      checkedAt: new Date(),
    };
  }
}

/* ─── Status config ───────────────────────────────────────────────────────── */
const STATUS_CFG = {
  operational: { label: 'Online',          color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',   dot: 'bg-green-400',  pulse: true  },
  degraded:    { label: 'Eingeschränkt',   color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', dot: 'bg-yellow-400', pulse: false },
  outage:      { label: 'Nicht erreichbar',color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',       dot: 'bg-red-400',    pulse: false },
  checking:    { label: 'Prüfe…',          color: 'text-gray-400',   bg: 'bg-gray-500/10 border-gray-500/20',     dot: 'bg-gray-400',   pulse: true  },
};

/* ─── Latency bar ─────────────────────────────────────────────────────────── */
function LatencyBar({ latency }) {
  if (latency === null) return null;
  const pct   = Math.min(100, (latency / 2000) * 100);
  const color = latency < 300 ? 'bg-green-400' : latency < 800 ? 'bg-yellow-400' : 'bg-red-400';
  const text  = latency < 300 ? 'text-green-400' : latency < 800 ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-mono ${text}`}>
        {latency < 1000 ? `${latency}ms` : `${(latency / 1000).toFixed(1)}s`}
      </span>
    </div>
  );
}

/* ─── Category section ────────────────────────────────────────────────────── */
function CategorySection({ category, results }) {
  const services = results.filter(r => r.category === category);
  if (!services.length) return null;

  const allOk    = services.every(s => s.status === 'operational');
  const hasIssue = services.some(s => s.status === 'outage');

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{category}</h2>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
          allOk    ? 'bg-green-500/10 border-green-500/20 text-green-400' :
          hasIssue ? 'bg-red-500/10 border-red-500/20 text-red-400'     :
                     'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
        }`}>
          {allOk ? 'Alle online' : hasIssue ? 'Störung' : 'Eingeschränkt'}
        </span>
      </div>
      <div className="space-y-4">
        {services.map((service, i) => {
          const cfg = STATUS_CFG[service.status] ?? STATUS_CFG.checking;
          return (
            <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  {cfg.pulse && (
                    <div className={`absolute inset-0 rounded-full ${cfg.dot} animate-ping opacity-60`} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-medium text-sm">{service.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs truncate">{service.displayUrl}</span>
                    <a href={service.url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-400 transition-colors flex-shrink-0">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {service.latency !== null && service.latency !== undefined && (
                    <div className="mt-1 w-28">
                      <LatencyBar latency={service.latency} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {service.checkedAt && (
                  <span className="text-gray-600 text-xs hidden md:block">
                    {service.checkedAt.toLocaleTimeString('de-DE')}
                  </span>
                )}
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                  {cfg.label}
                  {service.status === 'checking' && (
                    <RefreshCw className="inline w-3 h-3 ml-1 animate-spin" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Status = () => {
  const [results, setResults] = useState(
    SERVICES.map(s => ({ ...s, status: 'checking', latency: null, checkedAt: null }))
  );
  const [lastRefresh, setLastRefresh] = useState(null);
  const [loading, setLoading] = useState(true);

  const runChecks = useCallback(async () => {
    setLoading(true);
    setResults(SERVICES.map(s => ({ ...s, status: 'checking', latency: null, checkedAt: null })));

    const promises = SERVICES.map((service, idx) =>
      checkService(service).then(result => {
        setResults(prev => {
          const updated = [...prev];
          updated[idx] = result;
          return updated;
        });
        return result;
      })
    );

    await Promise.all(promises);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    runChecks();
    const interval = setInterval(runChecks, 60_000);
    return () => clearInterval(interval);
  }, [runChecks]);

  const operationalCount = results.filter(r => r.status === 'operational').length;
  const outageCount      = results.filter(r => r.status === 'outage').length;
  const degradedCount    = results.filter(r => r.status === 'degraded').length;
  const checkingCount    = results.filter(r => r.status === 'checking').length;

  const overallStatus =
    checkingCount === SERVICES.length ? 'checking' :
    outageCount   > 0                 ? 'outage'   :
    degradedCount > 0                 ? 'degraded' :
    'operational';

  const avgLatency = (() => {
    const valid = results.filter(r => r.latency !== null && r.status !== 'outage');
    if (!valid.length) return null;
    return Math.round(valid.reduce((s, r) => s + r.latency, 0) / valid.length);
  })();

  const categories = ['Core', 'APIs', 'Apps', 'Web Apps'];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Live Status</span>
          <h1 className="text-5xl font-bold text-white mb-4">System Status</h1>
          <p className="text-xl text-gray-400">Echtzeit-Monitoring aller FrameSphere-Dienste.</p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            {lastRefresh && (
              <span className="text-xs text-gray-500">
                Zuletzt geprüft: {lastRefresh.toLocaleTimeString('de-DE')} · Auto-Refresh alle 60s
              </span>
            )}
            <button
              onClick={runChecks}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Jetzt prüfen
            </button>
          </div>
        </div>

        {/* ── Overall Banner ── */}
        <div className={`card mb-6 ${
          overallStatus === 'operational' ? 'bg-green-500/5 border-green-500/20'   :
          overallStatus === 'degraded'    ? 'bg-yellow-500/5 border-yellow-500/20' :
          overallStatus === 'outage'      ? 'bg-red-500/5 border-red-500/20'       :
                                            'bg-gray-500/5 border-gray-500/20'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              {overallStatus === 'operational' && <CheckCircle className="w-8 h-8 text-green-400" />}
              {overallStatus === 'degraded'    && <AlertCircle className="w-8 h-8 text-yellow-400" />}
              {overallStatus === 'outage'      && <WifiOff className="w-8 h-8 text-red-400" />}
              {overallStatus === 'checking'    && <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />}
              <div>
                <div className="text-lg font-bold text-white">
                  {overallStatus === 'operational' && 'Alle Systeme betriebsbereit'}
                  {overallStatus === 'degraded'    && 'Teilweise Beeinträchtigung'}
                  {overallStatus === 'outage'      && `${outageCount} Dienst${outageCount > 1 ? 'e' : ''} nicht erreichbar`}
                  {overallStatus === 'checking'    && 'Prüfe alle Dienste…'}
                </div>
                <div className="text-sm text-gray-400">
                  {operationalCount}/{SERVICES.length} Dienste online
                  {avgLatency !== null && ` · Ø ${avgLatency} ms Latenz`}
                </div>
              </div>
            </div>
            {/* Quick stats */}
            <div className="flex gap-5">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{operationalCount}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
              {degradedCount > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{degradedCount}</div>
                  <div className="text-xs text-gray-500">Eingeschränkt</div>
                </div>
              )}
              {outageCount > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{outageCount}</div>
                  <div className="text-xs text-gray-500">Ausfall</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Per-category service lists ── */}
        {categories.map(cat => (
          <CategorySection key={cat} category={cat} results={results} />
        ))}

        {/* ── Legend ── */}
        <div className="card mb-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Legende</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { dot: 'bg-green-400',  label: 'Online',            desc: 'Dienst erreichbar, normale Latenz' },
              { dot: 'bg-yellow-400', label: 'Eingeschränkt',     desc: 'Erhöhte Latenz oder Timeout (>8s)' },
              { dot: 'bg-red-400',    label: 'Nicht erreichbar',  desc: 'Verbindungsfehler oder offline' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${item.dot}`} />
                <div>
                  <div className="font-medium text-white">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Latency scale ── */}
        <div className="card mb-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Latenz-Skala</h2>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-2 rounded-full overflow-hidden flex">
              <div className="bg-green-400 flex-1" />
              <div className="bg-yellow-400" style={{ width: '33%' }} />
              <div className="bg-red-400" style={{ width: '20%' }} />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0ms</span>
            <span className="text-green-400">300ms — schnell</span>
            <span className="text-yellow-400">800ms — erhöht</span>
            <span className="text-red-400">2000ms+</span>
          </div>
        </div>

        {/* ── Methodik ── */}
        <div className="card text-center">
          <Wifi className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm font-medium mb-1">Methodik</p>
          <p className="text-gray-500 text-xs max-w-md mx-auto">
            Checks werden direkt vom Browser aus durchgeführt (no-cors fetch) und messen die
            Erreichbarkeit von deinem Netzwerk aus. Latenzwerte beinhalten Netzwerk-Roundtrip
            zu den jeweiligen Servern. Auto-Refresh alle 60 Sekunden.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Status;
