import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import { liveProducts, devProducts, webApps, devLinks, companyLinks } from '../data/catalog';

const cols = [
  { title: 'Produkte', links: [...liveProducts, ...devProducts].map((p) => ({ name: p.name, path: p.path })) },
  { title: 'Web-Apps', links: webApps.map((a) => ({ name: a.name, path: a.path })) },
  { title: 'Entwickler', links: devLinks },
  {
    title: 'FrameSphere',
    links: [
      ...companyLinks,
      { name: 'Datenschutz', path: '/legal/privacy' },
      { name: 'AGB', path: '/legal/terms' },
      { name: 'Impressum', path: '/legal/imprint' },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <LogoMark size={36} className="text-bone-100" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-bone-400">
              APIs, eine Desktop-App und freie Web-Tools. Gebaut und betrieben in Mainz.
            </p>
            <a
              href="mailto:framesphere@gmx.net"
              className="mt-6 inline-block border-b border-white/20 pb-0.5 text-[15px] text-bone-100 transition-colors hover:border-signal-500 hover:text-signal-500"
            >
              Schreib uns
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="eyebrow mb-4 font-mono !text-bone-500">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-[14px] text-bone-300 transition-colors hover:text-bone-100">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/[0.08] py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-600 md:flex-row">
          <span>© {year} FrameSphere · Mainz, DE</span>
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-ink ring-1 ring-white/20" />Ink</span>
            <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-bone-100" />Bone</span>
            <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-signal-500" />Signal</span>
            <span className="hidden sm:inline">· Bricolage Grotesque / Geist</span>
          </span>
        </div>
      </div>

      {/* Übergroße Wortmarke, angeschnitten – visueller Schlusspunkt der Seite */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display font-extrabold leading-[0.72] tracking-[-0.06em] text-white/[0.04]"
        style={{ fontSize: 'clamp(4rem, 17vw, 16rem)' }}
      >
        FrameSphere
      </div>
    </footer>
  );
};

export default Footer;
