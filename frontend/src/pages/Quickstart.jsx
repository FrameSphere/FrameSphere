import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle,
  Copy,
  Terminal,
  Zap,
  Code,
  Key,
  Play,
  BookOpen,
  AlertCircle
} from 'lucide-react';

const Quickstart = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const steps = [
    {
      number: '1',
      title: 'Account erstellen',
      description: 'Registriere dich kostenlos und erhalte sofort Zugriff',
      time: '30 Sekunden',
      code: null,
      actions: [
        'Gehe zu Registrierung',
        'Fülle das Formular aus',
        'Bestätige deine E-Mail'
      ]
    },
    {
      number: '2',
      title: 'API Key erstellen',
      description: 'Erstelle deinen ersten API Key im Dashboard',
      time: '1 Minute',
      code: null,
      actions: [
        'Gehe zum Dashboard',
        'Klicke auf "Neuer API Key"',
        'Gib einen Namen ein',
        'Kopiere den Key sicher'
      ]
    },
    {
      number: '3',
      title: 'SDK installieren',
      description: 'Installiere das FrameSphere SDK für deine Sprache',
      time: '1 Minute',
      code: {
        python: 'pip install framesphere',
        javascript: 'npm install @framesphere/sdk',
        java: 'maven: <dependency>\n  <groupId>com.framesphere</groupId>\n  <artifactId>framesphere-sdk</artifactId>\n  <version>1.0.0</version>\n</dependency>',
        go: 'go get github.com/framesphere/framesphere-go'
      }
    },
    {
      number: '4',
      title: 'Erste API Anfrage',
      description: 'Teste deine Integration mit einem einfachen Beispiel',
      time: '2 Minuten',
      code: {
        python: `from framesphere import FrameSpell

# Setze deinen API Key
client = FrameSpell(api_key="dein_api_key")

# Erste Anfrage
response = client.check_spelling(
    text="Helo Welt!",
    language="de"
)

print(response.corrected_text)
# Output: "Hallo Welt!"`,
        javascript: `const { FrameSpell } = require('@framesphere/sdk');

// Setze deinen API Key
const client = new FrameSpell({
  apiKey: 'dein_api_key'
});

// Erste Anfrage
const response = await client.checkSpelling({
  text: 'Helo Welt!',
  language: 'de'
});

console.log(response.correctedText);
// Output: "Hallo Welt!"`,
        curl: `curl -X POST https://api.framesphere.dev/v1/framespell/check \\
  -H "Authorization: Bearer dein_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Helo Welt!",
    "language": "de"
  }'

# Response:
{
  "corrected_text": "Hallo Welt!",
  "length": 11,
  "processing_time": "0.043s"
}`
      }
    },
    {
      number: '5',
      title: 'Fehlerbehandlung hinzufügen',
      description: 'Implementiere robuste Fehlerbehandlung',
      time: '3 Minuten',
      code: {
        python: `from framesphere import FrameSpell, APIError

client = FrameSpell(api_key="dein_api_key")

try:
    response = client.check_spelling(
        text="Helo Welt!",
        language="de"
    )
    print(response.corrected_text)
    
except APIError as e:
    if e.status_code == 401:
        print("Ungültiger API Key!")
    elif e.status_code == 429:
        print("Rate Limit erreicht!")
    else:
        print(f"Fehler: {e.message}")`,
        javascript: `const { FrameSpell, APIError } = require('@framesphere/sdk');

const client = new FrameSpell({ apiKey: 'dein_api_key' });

try {
  const response = await client.checkSpelling({
    text: 'Helo Welt!',
    language: 'de'
  });
  console.log(response.correctedText);
  
} catch (error) {
  if (error instanceof APIError) {
    if (error.statusCode === 401) {
      console.error('Ungültiger API Key!');
    } else if (error.statusCode === 429) {
      console.error('Rate Limit erreicht!');
    } else {
      console.error('Fehler:', error.message);
    }
  }
}`
      }
    }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('python');

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/developers" className="hover:text-white transition-colors">Developer Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Quickstart Guide</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Quickstart Guide</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Von der Registrierung bis zur ersten API-Anfrage in unter 5 Minuten
          </p>

          {/* Time Indicator */}
          <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full mt-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Geschätzte Zeit: ~5 Minuten</span>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="card bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Voraussetzungen</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Ein FrameSphere Account (kostenlos registrieren)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Python 3.7+, Node.js 14+, oder eine andere unterstützte Sprache</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Ein Terminal/Command Line Interface</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                    <span className="text-sm text-primary-400 font-semibold whitespace-nowrap ml-4">
                      ⏱️ {step.time}
                    </span>
                  </div>

                  {/* Actions */}
                  {step.actions && (
                    <div className="space-y-2 mb-6">
                      {step.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center text-gray-300">
                          <ChevronRight className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code Examples */}
                  {step.code && (
                    <div>
                      {/* Language Selector */}
                      <div className="flex gap-2 mb-4">
                        {Object.keys(step.code).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              selectedLanguage === lang
                                ? 'bg-primary-500 text-white'
                                : 'glass-effect hover:bg-white/10 text-gray-300'
                            }`}
                          >
                            {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : lang === 'curl' ? 'cURL' : lang}
                          </button>
                        ))}
                      </div>

                      {/* Code Block */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <button
                            onClick={() => copyCode(step.code[selectedLanguage])}
                            className="flex items-center space-x-2 px-3 py-1 glass-effect rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {copiedCode === step.code[selectedLanguage] ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 text-xs">Kopiert!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span className="text-xs">Kopieren</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-gray-300 font-mono whitespace-pre">
                            {step.code[selectedLanguage]}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Special buttons for step 1 and 2 */}
                  {step.number === '1' && (
                    <Link to="/register" className="btn-primary inline-flex items-center space-x-2 mt-4">
                      <span>Jetzt registrieren</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                  {step.number === '2' && (
                    <Link to="/dashboard" className="btn-primary inline-flex items-center space-x-2 mt-4">
                      <Key className="w-4 h-4" />
                      <span>Zum Dashboard</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Message */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              🎉 Glückwunsch!
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Du hast erfolgreich deine erste API-Anfrage gemacht! Du bist jetzt bereit, mit FrameSphere zu bauen.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Was kommt als Nächstes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/developers/docs" className="card group hover:scale-105 transition-all">
              <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                API Dokumentation
              </h3>
              <p className="text-gray-400 text-sm">
                Vollständige Referenz aller Endpoints und Parameter
              </p>
            </Link>

            <Link to="/developers/tutorials" className="card group hover:scale-105 transition-all">
              <Code className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                Tutorials
              </h3>
              <p className="text-gray-400 text-sm">
                Schritt-für-Schritt Anleitungen für fortgeschrittene Use Cases
              </p>
            </Link>

            <Link to="/developers/sdks" className="card group hover:scale-105 transition-all">
              <Terminal className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                SDKs Download
              </h3>
              <p className="text-gray-400 text-sm">
                Offizielle Libraries für alle Programmiersprachen
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="card">
            <h3 className="text-2xl font-bold text-white mb-4">Brauchst du Hilfe?</h3>
            <p className="text-gray-400 mb-6">
              Falls du auf Probleme stößt oder Fragen hast, stehen wir dir gerne zur Verfügung:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="mailto:support@framesphere.dev" className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="text-primary-400 font-semibold mb-1">📧 E-Mail Support</div>
                <div className="text-sm text-gray-400">support@framesphere.dev</div>
              </a>
              <Link to="/contact" className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="text-primary-400 font-semibold mb-1">💬 Kontaktformular</div>
                <div className="text-sm text-gray-400">Schreibe uns eine Nachricht</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quickstart;
