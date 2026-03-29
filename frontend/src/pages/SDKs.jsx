import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, CheckCircle, Code, Terminal, Download } from 'lucide-react';

const SDKs = () => {
  const sdks = [
    {
      lang: 'JavaScript / TypeScript',
      emoji: '🟨',
      install: 'npm install @framesphere/sdk',
      snippet: `import { FrameSpell } from '@framesphere/sdk';

const client = new FrameSpell({ apiKey: 'fs_dein_key' });

const result = await client.check({
  text: 'Helo Welt!',
  language: 'de'
});

console.log(result.corrected); // "Hallo Welt!"`,
      status: 'Verfügbar',
      statusColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    },
    {
      lang: 'Python',
      emoji: '🐍',
      install: 'pip install framesphere',
      snippet: `from framesphere import FrameSpell

client = FrameSpell(api_key="fs_dein_key")

result = client.check(
    text="Helo Welt!",
    language="de"
)

print(result.corrected)  # "Hallo Welt!"`,
      status: 'Verfügbar',
      statusColor: 'text-green-400 bg-green-500/10 border-green-500/20',
    },
    {
      lang: 'PHP',
      emoji: '🐘',
      install: 'composer require framesphere/sdk',
      snippet: `<?php
use FrameSphere\\FrameSpell;

$client = new FrameSpell(['apiKey' => 'fs_dein_key']);

$result = $client->check([
    'text' => 'Helo Welt!',
    'language' => 'de'
]);

echo $result->corrected; // "Hallo Welt!"`,
      status: 'Bald',
      statusColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    },
    {
      lang: 'Go',
      emoji: '🐹',
      install: 'go get github.com/framesphere/go-sdk',
      snippet: `package main

import "github.com/framesphere/go-sdk"

func main() {
    client := framesphere.NewFrameSpell("fs_dein_key")

    result, _ := client.Check(framesphere.CheckOptions{
        Text:     "Helo Welt!",
        Language: "de",
    })

    fmt.Println(result.Corrected) // "Hallo Welt!"
}`,
      status: 'Bald',
      statusColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Developer Tools</span>
          <h1 className="text-5xl font-bold text-white mb-4">SDKs & Libraries</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Offizielle SDKs für alle gängigen Programmiersprachen. Schneller integrieren, weniger Boilerplate.
          </p>
        </div>

        {/* Raw HTTP Alternative */}
        <div className="card mb-10 bg-dark-800/50">
          <div className="flex items-start space-x-4">
            <Terminal className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-1">Kein SDK nötig</h3>
              <p className="text-gray-400 text-sm mb-3">
                Alle FrameSphere-APIs sind plain REST mit JSON. Du kannst sie direkt mit{' '}
                <code className="text-primary-400">fetch</code>, <code className="text-primary-400">axios</code>,{' '}
                <code className="text-primary-400">requests</code> oder jedem HTTP-Client nutzen.
                Die SDKs sind eine Komfort-Schicht, keine Voraussetzung.
              </p>
              <Link to="/developers/quickstart" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                → Quickstart ohne SDK ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* SDK Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {sdks.map((sdk, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{sdk.emoji}</span>
                  <h3 className="font-bold text-white">{sdk.lang}</h3>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${sdk.statusColor}`}>{sdk.status}</span>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1.5">Installation</div>
                <code className="block bg-dark-900 rounded-lg px-4 py-2.5 text-sm text-primary-400 font-mono">{sdk.install}</code>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1.5">Beispiel</div>
                <pre className="bg-dark-900 rounded-lg p-3 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed max-h-40 overflow-y-auto">
                  <code>{sdk.snippet}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="card mb-10">
          <h2 className="text-xl font-bold text-white mb-5">Was die SDKs bieten</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['TypeScript-Typen für alle Responses', 'Automatisches Retry bei Rate-Limit-Fehlern', 'Streaming-Support für lange Anfragen', 'Eingebaute Fehlerbehandlung', 'Konfigurierbare Timeouts', 'Proxy-Support für Enterprise-Umgebungen'].map((f, i) => (
              <div key={i} className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <Package className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Bereit zum Integrieren?</h2>
          <p className="text-gray-400 mb-6">API Key erstellen und in Minuten live gehen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center space-x-2">
              <span>API Key erstellen</span><ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/developers/quickstart" className="btn-secondary inline-flex items-center space-x-2">
              <span>Quickstart Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKs;
