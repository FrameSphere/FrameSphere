import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Sphere from '../components/Sphere';
import { openPalette } from '../components/CommandPalette';
import { products, upcomingProducts, webApps } from '../data/catalog';

const ease = [0.23, 1, 0.32, 1];
const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease },
};

/* ── Code-Beispiele: echte Endpunkte und Antwortformen aus den Projekten ── */
const examples = {
  RateLimit: {
    file: 'check.sh',
    code: `curl "https://ratelimit-api.karol-paschek.workers.dev/check\\
?endpoint=/api/users&method=GET" \\
  -H "X-API-Key: $RATELIMIT_KEY"`,
    response: `{
  "allowed": true,
  "limit": 100,
  "remaining": 99,
  "algorithm": "sliding_window",
  "endpointPattern": "global"
}`,
  },
  FrameSpell: {
    file: 'spellcheck.sh',
    code: `curl -X POST https://framespell.pages.dev/api/spellcheck \\
  -H "X-API-Key: $FRAMESPELL_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Er fuhr nah Berlin"}'`,
    response: `{
  "success": true,
  "data": {
    "corrected": "Er fuhr nach Berlin",
    "tokens_used": 1,
    "rate_limit": { "limit": 20, "remaining": 19 }
  }
}`,
  },
  KeyScope: {
    file: 'analyze.sh',
    code: `curl -X POST https://keyscope-worker.karol-paschek.workers.dev/analyze \\
  -H "Authorization: Bearer ks_…" \\
  -d '{"title": "SEO Strategien", "content": "…",
       "lang": "de", "keyword_count": 10}'`,
    response: `{
  "ok": true,
  "mode": "algorithmic",
  "keywords": [ … ],
  "longtailKeywords": [ … ],
  "metaDescription": "…"
}`,
  },
};

function CodeTabs() {
  const tabs = Object.keys(examples);
  const [tab, setTab] = useState(tabs[0]);
  const ex = examples[tab];
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-dark-950">
      <div className="flex items-center justify-between border-b border-white/[0.08] pr-4">
        <div role="tablist" className="flex">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative h-11 px-4 font-mono text-[12px] transition-colors ${
                tab === t ? 'text-bone-100' : 'text-bone-500 hover:text-bone-300'
              }`}
            >
              {t}
              {tab === t && (
                <motion.span layoutId="tab-underline" className="absolute inset-x-3 -bottom-px h-px bg-signal-500" />
              )}
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-[11px] text-bone-600 sm:inline">{ex.file}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-[13px] leading-relaxed text-bone-200">
        <code>{ex.code}</code>
      </pre>
      <div className="border-t border-dashed border-white/[0.08] px-5 pb-5 pt-4">
        <div className="mb-2 font-mono text-[11px] text-bone-600">
          <span className="text-signal-500">200</span> OK
        </div>
        <pre className="overflow-x-auto text-[13px] leading-relaxed text-bone-400">
          <code>{ex.response}</code>
        </pre>
      </div>
    </div>
  );
}

const principles = [
  {
    n: '01',
    title: 'Zahlen nur, wenn sie stimmen.',
    text: 'Auf dieser Seite steht keine Genauigkeit und keine Uptime, die wir nicht gemessen haben. Was du liest, steht so im Code: 199 Flaggen, 38 Konverter, 21 Trainings-Plugins.',
  },
  {
    n: '02',
    title: 'Lokal, wo es geht.',
    text: 'FrameTrain trainiert auf deinem Rechner. FileFlyr konvertiert im Browser, ohne Upload. Traitora rechnet den Test komplett client-seitig. Daten, die nicht reisen, können nicht verloren gehen.',
  },
  {
    n: '03',
    title: 'Ein Konto für alles.',
    text: 'Alle Produkte hängen am selben FrameSphere-Login. Wer heute ein Konto anlegt, nutzt es auch für FrameSpell, RateLimit, KeyScope und SiteControl, sobald sie starten.',
  },
];

const Home = () => {
  const [focus, setFocus] = useState(0);
  const sphereProducts = products;
  const current = sphereProducts[focus] ?? sphereProducts[0];

  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative px-5 pb-10 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow mb-8 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />
            Software-Studio aus Mainz · FrameTrain + {webApps.length} Web-Apps live · {upcomingProducts.length} in Entwicklung
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="max-w-5xl font-extrabold"
            style={{ fontSize: 'clamp(2.9rem, 8.2vw, 7.4rem)' }}
          >
            Kleine Werkzeuge.
            <br />
            <span className="text-bone-500">Echte </span>
            <span className="text-signal-500">Arbeit.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="measure text-lg leading-relaxed text-bone-400 md:text-xl">
              Eine Desktop-App, die KI-Modelle lokal trainiert. Sechs Browser-Apps, die ohne Konto
              funktionieren. Und APIs für Rechtschreibung, Rate-Limiting und Keywords, die gerade entstehen.
            </p>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
              <a href="#index" className="btn-primary">
                Zum Index <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={openPalette} className="btn-secondary">
                Suchen <span className="kbd">⌘K</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INDEX + SPHERE ───────────────────────────────────── */}
      <section id="index" className="scroll-mt-20 px-5 pb-28 pt-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl [&>*]:min-w-0 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Index */}
          <div>
            <div className="flex items-baseline justify-between border-b border-white/[0.1] pb-3">
              <span className="eyebrow">Index</span>
              <span className="eyebrow tabular">
                {String(products.length).padStart(2, '0')} Einträge
              </span>
            </div>
            <ul>
              {products.map((p, i) => {
                const active = focus === i;
                const live = p.status === 'live';
                const soon = p.status === 'soon';
                return (
                  <li key={p.id}>
                    <Link
                      to={p.path}
                      onMouseEnter={() => setFocus(i)}
                      onFocus={() => setFocus(i)}
                      className="group grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-4 border-b border-white/[0.07] py-5 sm:grid-cols-[2.5rem_9.5rem_1fr_auto]"
                    >
                      <span
                        className={`tabular font-mono text-[12px] transition-colors ${
                          active ? 'text-signal-500' : 'text-bone-600'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-2xl font-bold tracking-[-0.03em] transition-colors duration-200 sm:text-[28px] ${
                          active ? 'text-bone-50' : live ? 'text-bone-100' : soon ? 'text-bone-600' : 'text-bone-400'
                        }`}
                      >
                        {p.name}
                      </span>
                      <span
                        className={`col-start-2 mt-1 text-[14px] transition-colors sm:col-start-3 sm:mt-0 ${
                          active ? 'text-bone-300' : 'text-bone-500'
                        }`}
                      >
                        {p.tagline}
                      </span>
                      <span className="col-start-3 row-start-1 flex items-center gap-3 sm:col-start-4">
                        <span
                          className={`hidden font-mono text-[10px] uppercase tracking-wider sm:inline ${
                            live ? 'text-signal-500' : 'text-bone-600'
                          }`}
                        >
                          {live ? '● live' : soon ? 'früher Stand' : 'in Entwicklung'}
                        </span>
                        <ArrowUpRight
                          className={`h-4 w-4 transition-all duration-200 ${
                            active ? 'translate-x-0 text-signal-500 opacity-100' : '-translate-x-1 opacity-0'
                          }`}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sphere + Spec */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square w-full">
              <div className="dot-grid absolute inset-0 rounded-2xl opacity-40 [mask-image:radial-gradient(circle,black_30%,transparent_72%)]" />
              <Sphere
                labels={sphereProducts.map((p) => p.name)}
                live={sphereProducts.map((p) => p.status === 'live')}
                focus={focus}
              />
            </div>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mt-2 rounded-xl border border-white/[0.08] bg-dark-800/60 p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-bold">{current.name}</h3>
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider ${
                    current.status === 'live' ? 'text-signal-500' : 'text-bone-500'
                  }`}
                >
                  {current.status === 'live' ? '● live' : current.status === 'dev' ? '◐ in Entwicklung' : '○ früher Stand'}
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-400">{current.desc}</p>
              {current.facts && (
                <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-4">
                  {current.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt className="eyebrow !text-[10px]">{k}</dt>
                      <dd className="mt-1 text-[13px] leading-snug text-bone-200">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {current.price && (
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="tabular font-mono text-[12px] text-bone-400">{current.price}</span>
                  <Link to={current.path} className="text-[13px] text-bone-100 hover:text-signal-500">
                    Details →
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WEB-APPS: invertierte Fläche (Bone) ─────────────────── */}
      <section className="bg-bone-100 px-5 py-24 text-ink lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-600">
                Web-Apps · gratis · ohne Konto
              </div>
              <h2 className="max-w-2xl font-extrabold !text-ink" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1 }}>
                Sechs Apps, die im Browser bleiben.
              </h2>
            </div>
            <Link to="/webapps" className="btn-ink self-start md:self-auto">
              Alle Web-Apps <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-16 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {webApps.map((a, i) => (
              <motion.div
                key={a.id}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.05 }}
                className="border-b border-r border-ink/15"
              >
                <Link to={a.path} className="group flex h-full flex-col p-7 transition-colors duration-200 hover:bg-ink hover:text-bone-100">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-600 group-hover:text-bone-500">
                      {a.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-30 transition-all group-hover:text-signal-500 group-hover:opacity-100" />
                  </div>
                  <div className="mt-10 flex items-baseline gap-3">
                    <span
                      className="tabular font-display font-extrabold leading-none tracking-[-0.05em] group-hover:text-signal-500"
                      style={{ fontSize: 'clamp(3.2rem, 6vw, 4.8rem)' }}
                    >
                      {a.big}
                    </span>
                    <span className="text-[14px] text-bone-600 group-hover:text-bone-400">{a.bigLabel}</span>
                  </div>
                  <div className="mt-8 font-display text-xl font-bold tracking-[-0.02em]">{a.name}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-bone-600 group-hover:text-bone-400">{a.tagline}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINZIPIEN ──────────────────────────────────────────── */}
      <section className="px-5 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="eyebrow mb-14">Wie wir bauen</motion.div>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {principles.map((p) => (
              <motion.div
                key={p.n}
                {...reveal}
                className="grid gap-4 py-10 md:grid-cols-[6rem_1fr_1.1fr] md:gap-10"
              >
                <span className="tabular font-mono text-[13px] text-signal-500">{p.n}</span>
                <h3 className="text-3xl font-bold leading-tight md:text-4xl">{p.title}</h3>
                <p className="measure text-[16px] leading-relaxed text-bone-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTWICKLER ──────────────────────────────────────────── */}
      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl [&>*]:min-w-0 items-start gap-12 lg:grid-cols-[1fr_1.25fr]">
          <motion.div {...reveal} className="lg:pt-6">
            <div className="eyebrow mb-5">Für Entwickler · APIs in Entwicklung</div>
            <h2 className="text-4xl font-bold leading-[1.05] md:text-5xl">
              Ein Request.
              <br />
              <span className="text-bone-500">Eine klare Antwort.</span>
            </h2>
            <p className="measure mt-6 text-[16px] leading-relaxed text-bone-400">
              So sehen die APIs aus, an denen wir gerade bauen: REST, JSON, ein API-Key im Header. Jede Antwort
              sagt dir, wie viel Kontingent noch übrig ist.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/developers/quickstart" className="btn-primary">
                Quickstart <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/developers/docs" className="btn-secondary">
                API-Docs
              </Link>
            </div>
          </motion.div>
          <motion.div {...reveal}>
            <CodeTabs />
          </motion.div>
        </div>
      </section>

      {/* ── IN ARBEIT + CTA ─────────────────────────────────────── */}
      <section className="px-5 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-white/[0.08] pt-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] [&>*]:min-w-0">
            <motion.div {...reveal}>
              <h2 className="font-extrabold" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)', lineHeight: 0.98 }}>
                Ein Konto.
                <br />
                <span className="text-signal-500">Alle Werkzeuge.</span>
              </h2>
              <p className="measure mt-6 text-[16px] leading-relaxed text-bone-400">
                Ein FrameSphere-Konto für FrameTrain heute und für jedes weitere Produkt, sobald es startet.
                Die Web-Apps brauchen gar keins.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary">
                  Konto erstellen <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="btn-secondary">
                  Preise vergleichen
                </Link>
              </div>
            </motion.div>

            <motion.div {...reveal}>
              <div className="eyebrow mb-4">Auf der Werkbank</div>
              <ul className="border-t border-white/[0.08]">
                {upcomingProducts.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={p.path}
                      className="group flex items-baseline justify-between gap-6 border-b border-white/[0.08] py-5"
                    >
                      <span>
                        <span className="block font-display text-xl font-bold text-bone-200 group-hover:text-bone-50">
                          {p.name}
                        </span>
                        <span className="mt-1 block text-[14px] text-bone-500">{p.desc}</span>
                      </span>
                      <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-bone-600">
                        {p.status === 'dev' ? 'in Entwicklung' : 'früher Stand'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
