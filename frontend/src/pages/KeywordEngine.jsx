import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const KeywordEngine = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-white" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-5xl font-bold text-white">Keyword Engine</h1>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-semibold">In Entwicklung</span>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          SEO Keyword-Analyse und Tracking. Finde die richtigen Keywords, analysiere Wettbewerber und verfolge Rankings.
        </p>
      </div>

      <div className="card bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 text-center mb-10">
        <Clock className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">Gerade im Aufbau</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Keyword Engine wird SEO einfacher machen. Trage dich in die Warteliste ein und erhalte Early Access.
        </p>
        <Link to="/contact" className="btn-primary inline-flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Early Access sichern</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {['Keyword-Recherche & Clustering', 'Suchvolumen & Trends', 'Wettbewerbsanalyse', 'SEO-Score Tracking', 'Content-Gap Analyse', 'Automatische Berichte'].map((f, i) => (
          <div key={i} className="flex items-center space-x-3 glass-effect rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span className="text-gray-300">{f} <span className="text-gray-600">— geplant</span></span>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/products" className="text-primary-400 hover:text-primary-300 inline-flex items-center space-x-2 transition-colors">
          <ArrowRight className="w-4 h-4" />
          <span>Alle Produkte ansehen</span>
        </Link>
      </div>
    </div>
  </div>
);

export default KeywordEngine;
