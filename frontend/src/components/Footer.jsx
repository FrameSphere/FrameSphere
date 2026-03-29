import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const cols = {
    'API-Produkte': [
      { name: 'FrameSpell API', path: '/products/framespell' },
      { name: 'RateLimit API', path: '/products/ratelimit-api' },
      { name: 'FrameTrain', path: '/products/frametrain' },
      { name: 'CoreChain API', path: '/products/corechain-api' },
      { name: 'Keyword Engine', path: '/products/keyword-engine' },
      { name: 'Website Manager', path: '/products/website-manager' },
    ],
    'Web Apps': [
      { name: 'Wordify', path: '/webapps/wordify' },
      { name: 'FlagGuess', path: '/webapps/flagguess' },
      { name: 'BrawlMystery', path: '/webapps/brawlmystery' },
      { name: 'SpinSelector', path: '/webapps/spinselector' },
      { name: 'Traitora', path: '/webapps/traitora' },
      { name: 'FileFlyr', path: '/webapps/fileflyr' },
    ],
    'Entwickler': [
      { name: 'Quickstart', path: '/developers/quickstart' },
      { name: 'API Docs', path: '/developers/docs' },
      { name: 'SDKs', path: '/developers/sdks' },
      { name: 'Tutorials', path: '/developers/tutorials' },
      { name: 'Status', path: '/developers/status' },
    ],
    'Unternehmen': [
      { name: 'Über uns', path: '/about' },
      { name: 'Preise', path: '/pricing' },
      { name: 'Blog', path: '/blog' },
      { name: 'Kontakt', path: '/contact' },
      { name: 'Impressum', path: '/legal/imprint' },
      { name: 'Datenschutz', path: '/legal/privacy' },
    ],
  };

  return (
    <footer className="bg-dark-800/60 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">FrameSphere</span>
            </Link>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              AI-APIs, Desktop-Apps und kostenlose Web-Tools für Entwickler und Nutzer.
              Alle Produkte: fair, privatsphärefreundlich, sofort einsatzbereit.
            </p>
            <div className="flex space-x-2">
              {[
                { icon: <Github className="w-4 h-4" />, label: 'Github' },
                { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' },
                { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                { icon: <Mail className="w-4 h-4" />, label: 'Email' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {year} FrameSphere · Alle Rechte vorbehalten · Mainz, Deutschland
          </p>
          <div className="flex space-x-5">
            <Link to="/legal/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Datenschutz</Link>
            <Link to="/legal/terms" className="text-gray-500 hover:text-white text-sm transition-colors">AGB</Link>
            <Link to="/legal/imprint" className="text-gray-500 hover:text-white text-sm transition-colors">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
