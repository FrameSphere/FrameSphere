import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * TutorialPage – shared page wrapper for all tutorial pages.
 * Provides: navbar clearance (pt-20), max-width centering, breadcrumb nav.
 */
export function TutorialPage({ category, categoryColor = 'text-primary-400', children }) {
  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link
            to="/developers/tutorials"
            className="hover:text-primary-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Tutorials
          </Link>
          {category && (
            <>
              <span className="text-gray-700">/</span>
              <span className={categoryColor}>{category}</span>
            </>
          )}
        </div>

        {children}

        {/* Footer nav back to tutorials */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <Link
            to="/developers/tutorials"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu allen Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
