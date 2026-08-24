import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, getMeta } from '../seo/seoConfig';

/**
 * Setzt pro Route Title, Description, Canonical, Open-Graph/Twitter und
 * optionales JSON-LD. Bewusst abhängigkeitsfrei und imperativ (useEffect),
 * damit die Tags in der Client-gerenderten SPA deterministisch aktualisiert
 * werden – inkl. React 18 StrictMode.
 *
 * Die Route-spezifischen Texte liegen zentral in ../seo/seoConfig.js.
 */

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMeta(pathname);
    const canonical = `${SITE.baseUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const image = meta.image || SITE.defaultImage;

    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'keywords', meta.keywords);
    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:locale', SITE.locale);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);

    // Twitter
    upsertMeta('name', 'twitter:card', SITE.twitter);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:url', canonical);
    upsertMeta('name', 'twitter:image', image);

    // Seiten-spezifisches JSON-LD (getrennt vom statischen Organization-Schema)
    const LD_ID = 'seo-jsonld';
    let ld = document.getElementById(LD_ID);
    if (meta.jsonLd) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = LD_ID;
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(meta.jsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [pathname]);

  return null;
};

export default Seo;
