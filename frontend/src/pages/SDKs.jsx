import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Download,
  ExternalLink,
  Copy,
  CheckCircle,
  Star,
  GitBranch,
  Package,
  Book
} from 'lucide-react';

export default function SDKs() {
  const [copiedCommand, setCopiedCommand] = useState('');

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const sdks = [
    {
      language: 'Python',
      icon: '🐍',
      color: 'from-blue-500 to-cyan-500',
      version: '1.2.3',
      downloads: '50K+',
      stars: '2.5K',
      install: 'pip install framesphere',
      docs: 'https://docs.framesphere.dev/python',
      github: 'https://github.com/framesphere/framesphere-python',
      features: ['Type hints', 'Async support', 'Pandas integration', 'Pytest fixtures'],
      example: `from framesphere import FrameSpell\n\nclient = FrameSpell(api_key="your_key")\nresult = client.check_spelling("Helo Welt")`
    },
    {
      language: 'JavaScript / Node.js',
      icon: '📜',
      color: 'from-yellow-500 to-orange-500',
      version: '1.1.8',
      downloads: '45K+',
      stars: '2.1K',
      install: 'npm install @framesphere/sdk',
      docs: 'https://docs.framesphere.dev/javascript',
      github: 'https://github.com/framesphere/framesphere-js',
      features: ['TypeScript support', 'Promise & Async/Await', 'Browser compatible', 'React hooks'],
      example: `const { FrameSpell } = require('@framesphere/sdk');\n\nconst client = new FrameSpell({ apiKey: 'your_key' });\nconst result = await client.checkSpelling('Helo Welt');`
    },
    {
      language: 'Java',
      icon: '☕',
      color: 'from-red-500 to-orange-500',
      version: '1.0.5',
      downloads: '30K+',
      stars: '1.8K',
      install: '<dependency>\n  <groupId>com.framesphere</groupId>\n  <artifactId>framesphere-sdk</artifactId>\n  <version>1.0.5</version>\n</dependency>',
      docs: 'https://docs.framesphere.dev/java',
      github: 'https://github.com/framesphere/framesphere-java',
      features: ['Maven & Gradle', 'Android compatible', 'Thread-safe', 'Reactive streams'],
      example: `import com.framesphere.FrameSpell;\n\nFrameSpell client = new FrameSpell("your_key");\nSpellingResponse result = client.checkSpelling("Helo Welt");`
    },
    {
      language: 'Go',
      icon: '🔷',
      color: 'from-cyan-500 to-blue-500',
      version: '1.0.2',
      downloads: '20K+',
      stars: '1.5K',
      install: 'go get github.com/framesphere/framesphere-go',
      docs: 'https://docs.framesphere.dev/go',
      github: 'https://github.com/framesphere/framesphere-go',
      features: ['Idiomatic Go', 'Context support', 'Zero dependencies', 'Concurrent-safe'],
      example: `import "github.com/framesphere/framesphere-go"\n\nclient := framesphere.NewClient("your_key")\nresult, err := client.CheckSpelling("Helo Welt")`
    },
    {
      language: 'PHP',
      icon: '🐘',
      color: 'from-purple-500 to-pink-500',
      version: '1.1.0',
      downloads: '25K+',
      stars: '1.2K',
      install: 'composer require framesphere/sdk',
      docs: 'https://docs.framesphere.dev/php',
      github: 'https://github.com/framesphere/framesphere-php',
      features: ['PSR-4 autoloading', 'Laravel integration', 'Symfony bundle', 'PHP 7.4+'],
      example: `use FrameSphere\\\\FrameSpell;\n\n$client = new FrameSpell('your_key');\n$result = $client->checkSpelling('Helo Welt');`
    },
    {
      language: 'C#',
      icon: '#️⃣',
      color: 'from-green-500 to-emerald-500',
      version: '1.0.3',
      downloads: '18K+',
      stars: '900',
      install: 'dotnet add package FrameSphere.SDK',
      docs: 'https://docs.framesphere.dev/csharp',
      github: 'https://github.com/framesphere/framesphere-csharp',
      features: ['.NET 6+', 'Async/await', 'Unity compatible', 'NuGet package'],
      example: `using FrameSphere;\n\nvar client = new FrameSpell("your_key");\nvar result = await client.CheckSpellingAsync("Helo Welt");`
    },
    {
      language: 'R',
      icon: '📊',
      color: 'from-indigo-500 to-purple-500',
      version: '0.9.1',
      downloads: '10K+',
      stars: '600',
      install: 'install.packages("framesphere")',
      docs: 'https://docs.framesphere.dev/r',
      github: 'https://github.com/framesphere/framesphere-r',
      features: ['CRAN available', 'Tidyverse compatible', 'Data.frame support', 'RStudio addins'],
      example: `library(framesphere)\n\nclient <- FrameSpell$new(api_key = "your_key")\nresult <- client$check_spelling("Helo Welt")`
    },
    {
      language: 'Ruby',
      icon: '💎',
      color: 'from-red-500 to-pink-500',
      version: '1.0.1',
      downloads: '8K+',
      stars: '450',
      install: 'gem install framesphere',
      docs: 'https://docs.framesphere.dev/ruby',
      github: 'https://github.com/framesphere/framesphere-ruby',
      features: ['RubyGems', 'Rails integration', 'ActiveSupport', 'RSpec matchers'],
      example: `require 'framesphere'\n\nclient = FrameSphere::FrameSpell.new('your_key')\nresult = client.check_spelling('Helo Welt')`
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/developers" className="hover:text-white transition-colors">Developer Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">SDKs & Libraries</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">SDKs & Libraries</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Offizielle Client-Libraries für alle gängigen Programmiersprachen
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">8</div>
              <div className="text-sm text-gray-400">Sprachen</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">200K+</div>
              <div className="text-sm text-gray-400">Downloads</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-sm text-gray-400">GitHub Stars</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">MIT</div>
              <div className="text-sm text-gray-400">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {sdks.map((sdk, index) => (
            <div key={index} className="card hover:scale-[1.01] transition-all">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${sdk.color} rounded-xl flex items-center justify-center text-4xl`}>
                      {sdk.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{sdk.language}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          v{sdk.version}
                        </span>
                        <span className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {sdk.downloads}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          {sdk.stars}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {sdk.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={sdk.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-effect hover:bg-white/10 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href={sdk.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 glass-effect hover:bg-white/10 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Book className="w-4 h-4" />
                      <span className="text-sm">Docs</span>
                    </a>
                  </div>
                </div>

                {/* Middle: Installation */}
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-bold text-white mb-4">Installation</h4>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Terminal</span>
                      <button
                        onClick={() => copyCommand(sdk.install)}
                        className="flex items-center space-x-1 px-2 py-1 glass-effect rounded hover:bg-white/10 transition-colors"
                      >
                        {copiedCommand === sdk.install ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">Kopiert</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-xs">Kopieren</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-primary-400 font-mono whitespace-pre">
                        {sdk.install}
                      </code>
                    </pre>
                  </div>
                  <button className="btn-primary w-full mt-4 inline-flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download SDK</span>
                  </button>
                </div>

                {/* Right: Example */}
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-bold text-white mb-4">Quick Example</h4>
                  <pre className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono whitespace-pre">
                      {sdk.example}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Package className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Fehlt deine Sprache?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Wir arbeiten kontinuierlich an neuen SDKs. Lass uns wissen, welche Sprache du brauchst!
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>SDK anfragen</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
