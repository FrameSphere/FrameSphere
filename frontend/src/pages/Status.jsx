import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, Clock, RefreshCw, Wifi, WifiOff } from 'lucide-react';

/* ─── Services to monitor ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    name: 'FrameSpell Website',
    url: 'https://framespell.pages.dev/',
    displayUrl: 'framespell.pages.dev',
    category: 'API',
  },
  {
    name: 'FrameSpell API Worker',
    url: 'https://rechtschreibe-api.karol-paschek.workers.dev/',
    displayUrl: 'rechtschreibe-api.karol-paschek.workers.dev',
    category: 'API',
  },
  {
    name: 'RateLimit API',
    url: 'https://ratelimit-api.pages.dev/',
    displayUrl: 'ratelimit-api.pages.dev',
    category: 'API',
  },
  {
    name: 'FrameTrain Website',
    url: 'https://frame-train.vercel.app/',
    displayUrl: 'frame-train.vercel.app',
    category: 'Apps',
  },
  {
    name: 'FrameSphere Frontend',
    url: 'https://frame-sphere.vercel.app/',
    displayUrl: 'frame-sphere.vercel.app',
    category: 'Core',
  },
];

/* ─── Fetch one service with timeout + latency measurement ────────────────── */
async function checkService(service) {
  const TIMEOUT_MS = 8000;
  const start = performance.now();

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const resp = await fetch(service.url, {
      method: 'GET',
      mode: 'no-cors',   // avoids CORS errors; gives opaque response
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timer);

    const latency = Math.round(performance.now() - start);
    // no-cors → opaque response; type === 'opaque' means it responded (not dead)
    const ok = resp.type === 'opaque' || resp.ok;

    return {
      ...service,
      status: ok ? 'operational' : 'degraded',
      latency,
      checkedAt: new Date(),
    };
  } catch (err) {
    const latency = Math.round(performance.now() - start);
    const timedOut = err.name === 'AbortError';
    return {
      ...service,
      status: timedOut ? 'degraded' : 'outage',
      latency: timedOut ? TIMEOUT_MS : latency,
      checkedAt: new Date(),
      error: err.message,
    };
  }
}

/* ─── Status config ───────────────────────────────────────────────────────── */
const STATUS_CFG = {
  operational: {
    label: 'Online',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-400',
    pulse: true,
  },
  degraded: {
    label: 'Eingeschränkt',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    dot: 'bg-yellow-400',
    pulse: false,
  },
  outage: {
    label: 'Nicht erreichbar',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-400',
    pulse: false,
  },
  checking: {
    label: 'Prüfe…',
    color: 'text-gray-400',
    bg: 'bg-gray-500/10 border-gray-500/20',
    dot: 'bg-gray-400',
    pulse: true,
  },
};

/* ─── Latency bar ─────────────────────────────────────────────────────────── */
function LatencyBar({ latency }) {
  if (!latency && latency !== 0) return null;
  const pct = Math.min(100, (latency / 2000) * 100);
  const color =
    latency < 300 ? 'bg-green-400' :
    latency < 800 ? 'bg-yellow-400' :
    'bg-red-400';

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-mono ${latency < 300 ? 'text-green-400' : latency < 800 ? 'text-yellow-400' : 'text-red-400'}`}>
        {latency < 1000 ? `${latency}ms` : `${(latency / 1000).toFixed(1)}s`}
      </span>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
const Status = () => {
  const [results, setResults] = useState(
    SERVICES.map(s => ({ ...s, status: 'checking', latency: null, checkedAt: null }))
  );
  const [lastRefresh, setLastRefresh] = useState(null);
  const [loading, setLoading] = useState(true);

  const runChecks = useCallback(async () => {
    setLoading(true);
    // Reset to checking state
    setResults(SERVICES.map(s => ({ ...s, status: 'checking', latency: null, checkedAt: null })));

    // Check all in parallel, update each result as it resolves
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

  // Run on mount + every 60 seconds
  useEffect(() => {
    runChecks();
    const interval = setInterval(runChecks, 60_000);
    return () => clearInterval(interval);
  }, [runChecks]);

  const operationalCount = results.filter(r => r.status === 'operational').length;
  const outageCount = results.filter(r => r.status === 'outage').length;
  const degradedCount = results.filter(r => r.status === 'degraded').length;
  const checkingCount = results.filter(r => r.status === 'checking').length;

  const overallStatus =
    checkingCount === SERVICES.length ? 'checking' :
    outageCount > 0 ? 'outage' :
    degradedCount > 0 ? 'degraded' :
    'operational';

  const avgLatency = (() => {
    const valid = results.filter(r => r.latency !== null && r.status !== 'outage');
    if (!valid.length) return null;
    return Math.round(valid.reduce((s, r) => s + r.latency, 0) / valid.length);
  })();

  const categories = [...new Set(SERVICES.map(s => s.category))];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Live Status</span>
          <h1 className="text-5xl font-bold text-white mb-4">System Status</h1>
          <p className="text-xl text-gray-400">Echtzeit-Monitoring aller FrameSphere-Dienste.</p>

          {/* Last refresh + manual refresh */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {lastRefresh && (
              <span className="text-xs text-gray-500">
                Zuletzt geprüft: {lastRefresh.toLocaleTimeString('de-DE')} – Auto-Refresh alle 60s
              </span>
            )}
            <button
              onClick={runChecks}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Jetzt prüfen</span>
            </button>
          </div>
        </div>

        {/* ── Overall Banner ────────────────────────────────────────────────── */}
        <div className={`card mb-6 ${
          overallStatus === 'operational' ? 'bg-green-500/5 border-green-500/20' :
          overallStatus === 'degraded' ? 'bg-yellow-500/5 border-yellow-500/20' :
          overallStatus === 'outage' ? 'bg-red-500/5 border-red-500/20' :
          'bg-gray-500/5 border-gray-500/20'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              {overallStatus === 'operational' && <CheckCircle className="w-8 h-8 text-green-400" />}
              {overallStatus === 'degraded' && <AlertCircle className="w-8 h-8 text-yellow-400" />}
              {overallStatus === 'outage' && <WifiOff className="w-8 h-8 text-red-400" />}
              {overallStatus === 'checking' && <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />}
              <div>
                <div className="text-lg font-bold text-white">
                  {overallStatus === 'operational' && 'Alle Systeme betriebsbereit'}
                  {overallStatus === 'degraded' && 'Teilweise Beeinträchtigung'}
                  {overallStatus === 'outage' && `${outageCount} Dienst${outageCount > 1 ? 'e' : ''} nicht erreichbar`}
                  {overallStatus === 'checking' && 'Prüfe alle Dienste…'}
                </div>
                <div className="text-sm text-gray-400">
                  {operationalCount}/{SERVICES.length} Dienste online
                  {avgLatency !== null && ` · Ø ${avgLatency} ms Latenz`}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-4">
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

        {/* ── Service List ──────────────────────────────────────────────────── */}
        {categories.map(cat => (
          <div key={cat} className="card mb-6">
            <h2 className="text-base font-bold text-gray-300 mb-4 uppercase tracking-widest text-xs">{cat}</h2>
            <div className="space-y-4">
              {results.filter(r => r.category === cat).map((service, i) => {
                const cfg = STATUS_CFG[service.status] || STATUS_CFG.checking;
                return (
                  <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Status dot */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                        {cfg.pulse && (
                          <div className={`absolute inset-0 rounded-full ${cfg.dot} animate-ping opacity-60`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium text-sm">{service.name}</div>
                        <div className="text-gray-500 text-xs truncate">{service.displayUrl}</div>
                        {/* Latency bar inline */}
                        {service.latency !== null && (
                          <div className="mt-1 w-32">
                            <LatencyBar latency={service.latency} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      {/* Checked at */}
                      {service.checkedAt && (
                        <span className="text-gray-600 text-xs hidden md:block">
                          {service.checkedAt.toLocaleTimeString('de-DE')}
                        </span>
                      )}
                      {/* Status badge */}
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
        ))}

        {/* ── Legend ────────────────────────────────────────────────────────── */}
        <div className="card mb-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">Legende</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { dot: 'bg-green-400', label: 'Online', desc: 'Dienst erreichbar, normale Latenz' },
              { dot: 'bg-yellow-400', label: 'Eingeschränkt', desc: 'Erhöhte Latenz oder Timeout' },
              { dot: 'bg-red-400', label: 'Nicht erreichbar', desc: 'Verbindungsfehler' },
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

        {/* ── Methodology ───────────────────────────────────────────────────── */}
        <div className="card text-center">
          <Wifi className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm font-medium mb-1">Methodik</p>
          <p className="text-gray-500 text-xs max-w-md mx-auto">
            Checks werden direkt vom Browser aus durchgeführt und messen die Erreichbarkeit der Dienste von deinem Netzwerk aus.
            Latenzwerte beinhalten Netzwerklatenz zwischen deinem Standort und dem jeweiligen Server.
            Auto-Refresh alle 60 Sekunden.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
