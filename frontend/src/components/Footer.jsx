import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produkte: [
      { name: 'FrameSpell API', path: '/products/framespell' },
      { name: 'CoreChain AI', path: '/products/corechain' },
      { name: 'CoreChain API', path: '/products/corechain-api' },
      { name: 'SphereHub', path: '/products/spherehub' },
      { name: 'SphereNet', path: '/products/spherenet' },
    ],
    Entwickler: [
      { name: 'Dokumentation', path: '/developers/docs' },
      { name: 'API Referenz', path: '/developers/api' },
      { name: 'SDKs', path: '/developers/sdks' },
      { name: 'Status', path: '/developers/status' },
    ],
    Unternehmen: [
      { name: 'Über uns', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Karriere', path: '/careers' },
      { name: 'Kontakt', path: '/contact' },
    ],
    Rechtliches: [
      { name: 'Impressum', path: '/legal/imprint' },
      { name: 'Datenschutz', path: '/legal/privacy' },
      { name: 'AGB', path: '/legal/terms' },
      { name: 'Cookies', path: '/legal/cookies' },
    ],
  };

  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                FrameSphere
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Die führende AI Orchestration Platform. Chain, connect, innovate.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Github"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} FrameSphere. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/legal/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              to="/legal/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              AGB
            </Link>
            <Link
              to="/legal/imprint"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
