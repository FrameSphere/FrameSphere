import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Network,
  Code,
  Copy,
  CheckCircle,
  ChevronRight,
  Play,
  AlertCircle,
  Book,
  Terminal,
  Zap
} from 'lucide-react';

const APIDocs = () => {
  const [selectedAPI, setSelectedAPI] = useState('framespell');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copiedCode, setCopiedCode] = useState('');

  const apis = [
    { id: 'framespell', name: 'FrameSpell API', icon: <Sparkles className="w-5 h-5\" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'corechain', name: 'CoreChain API', icon: <Brain className="w-5 h-5\" />, color: 'from-purple-500 to-pink-500' },
    { id: 'spherenet', name: 'SphereNet', icon: <Network className="w-5 h-5\" />, color: 'from-indigo-500 to-blue-500' }
  ];

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '📜' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'go', name: 'Go', icon: '🔷' },
    { id: 'php', name: 'PHP', icon: '🐘' },
    { id: 'csharp', name: 'C#', icon: '#️⃣' },
    { id: 'r', name: 'R', icon: '📊' },
    { id: 'curl', name: 'cURL', icon: '🌐' }
  ];

  // Code-Beispiele für jede API und Sprache
  const codeExamples = {
    framespell: {
      python: `from framesphere import FrameSpell

# Initialisiere Client
client = FrameSpell(api_key=\"dein_api_key\")

# Text korrigieren
response = client.check_spelling(
    text=\"Helo Welt, wie geths dir?\",
    language=\"de\"
)

# Ausgabe
print(response.corrected_text)  # \"Hallo Welt, wie geht es dir?\"
print(response.length)           # 28
print(response.processing_time)  # 0.123s`,
      
      javascript: `const { FrameSpell } = require('@framesphere/framespell');

// Initialisiere Client
const client = new FrameSpell({
  apiKey: 'dein_api_key'
});

// Text korrigieren
const response = await client.checkSpelling({
  text: 'Helo Welt, wie geths dir?',
  language: 'de'
});

// Ausgabe
console.log(response.correctedText);  // \"Hallo Welt, wie geht es dir?\"
console.log(response.length);          // 28
console.log(response.processingTime);  // \"0.123s\"`,

      java: `import com.framesphere.FrameSpell;

// Initialisiere Client
FrameSpell client = new FrameSpell(\"dein_api_key\");

// Text korrigieren
SpellingResponse response = client.checkSpelling(
    \"Helo Welt, wie geths dir?\",
    \"de\"
);

// Ausgabe
System.out.println(response.getCorrectedText());
System.out.println(response.getLength());
System.out.println(response.getProcessingTime());`,

      go: `package main

import (
    \"fmt\"
    \"github.com/framesphere/framespell-go\"
)

func main() {
    // Initialisiere Client
    client := framespell.NewClient(\"dein_api_key\")
    
    // Text korrigieren
    response, err := client.CheckSpelling(
        \"Helo Welt, wie geths dir?\",
        \"de\",
    )
    
    // Ausgabe
    fmt.Println(response.CorrectedText)
    fmt.Println(response.Length)
    fmt.Println(response.ProcessingTime)
}`,

      php: `<?php
require 'vendor/autoload.php';

use FrameSphere\\\\FrameSpell;

// Initialisiere Client
$client = new FrameSpell('dein_api_key');

// Text korrigieren
$response = $client->checkSpelling([
    'text' => 'Helo Welt, wie geths dir?',
    'language' => 'de'
]);

// Ausgabe
echo $response->corrected_text;
echo $response->length;
echo $response->processing_time;`,

      csharp: `using FrameSphere;

// Initialisiere Client
var client = new FrameSpell(\"dein_api_key\");

// Text korrigieren
var response = await client.CheckSpellingAsync(
    text: \"Helo Welt, wie geths dir?\",
    language: \"de\"
);

// Ausgabe
Console.WriteLine(response.CorrectedText);
Console.WriteLine(response.Length);
Console.WriteLine(response.ProcessingTime);`,

      r: `library(framesphere)

# Initialisiere Client
client <- FrameSpell$new(api_key = \"dein_api_key\")

# Text korrigieren
response <- client$check_spelling(
  text = \"Helo Welt, wie geths dir?\",
  language = \"de\"
)

# Ausgabe
print(response$corrected_text)
print(response$length)
print(response$processing_time)`,

      curl: `curl -X POST https://api.framesphere.dev/v1/framespell/check \\\\
  -H \"Authorization: Bearer dein_api_key\" \\\\
  -H \"Content-Type: application/json\" \\\\
  -d '{
    \"text\": \"Helo Welt, wie geths dir?\",
    \"language\": \"de\"
  }'

# Response:
{
  \"corrected_text\": \"Hallo Welt, wie geht es dir?\",
  \"length\": 28,
  \"processing_time\": \"0.123s\"
}`
    },

    corechain: {
      python: `from framesphere import CoreChain

# Initialisiere Client
client = CoreChain(api_key=\"dein_api_key\")

# Komplexe Anfrage orchestrieren
response = client.process(
    text=\"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
    options={
        \"output_format\": [\"text\", \"code\"],
        \"max_agents\": 5
    }
)

# Ausgabe
print(response.result)           # Finales Ergebnis
print(response.output_type)      # \"text\" oder \"code\" oder \"image\"
print(response.length)           # Länge der Antwort
print(response.processing_time)  # 2.456s
print(response.models_used)      # [\"gpt-4\", \"claude-3\", \"analysis-agent\"]`,

      javascript: `const { CoreChain } = require('@framesphere/corechain');

// Initialisiere Client
const client = new CoreChain({
  apiKey: 'dein_api_key'
});

// Komplexe Anfrage orchestrieren
const response = await client.process({
  text: 'Analysiere die Q4 Verkaufsdaten und erstelle einen Report',
  options: {
    outputFormat: ['text', 'code'],
    maxAgents: 5
  }
});

// Ausgabe
console.log(response.result);          // Finales Ergebnis
console.log(response.outputType);      // \"text\", \"code\" oder \"image\"
console.log(response.length);          // Länge der Antwort
console.log(response.processingTime);  // \"2.456s\"
console.log(response.modelsUsed);      // [\"gpt-4\", \"claude-3\", ...]`,

      java: `import com.framesphere.CoreChain;

// Initialisiere Client
CoreChain client = new CoreChain(\"dein_api_key\");

// Komplexe Anfrage orchestrieren
ProcessResponse response = client.process(
    \"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
    new ProcessOptions()
        .setOutputFormat(Arrays.asList(\"text\", \"code\"))
        .setMaxAgents(5)
);

// Ausgabe
System.out.println(response.getResult());
System.out.println(response.getOutputType());
System.out.println(response.getProcessingTime());`,

      go: `package main

import (
    \"fmt\"
    \"github.com/framesphere/corechain-go\"
)

func main() {
    client := corechain.NewClient(\"dein_api_key\")
    
    response, err := client.Process(
        \"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
        corechain.Options{
            OutputFormat: []string{\"text\", \"code\"},
            MaxAgents: 5,
        },
    )
    
    fmt.Println(response.Result)
    fmt.Println(response.OutputType)
    fmt.Println(response.ProcessingTime)
}`,

      php: `<?php
use FrameSphere\\\\CoreChain;

$client = new CoreChain('dein_api_key');

$response = $client->process([
    'text' => 'Analysiere die Q4 Verkaufsdaten und erstelle einen Report',
    'options' => [
        'output_format' => ['text', 'code'],
        'max_agents' => 5
    ]
]);

echo $response->result;
echo $response->output_type;
echo $response->processing_time;`,

      csharp: `using FrameSphere;

var client = new CoreChain(\"dein_api_key\");

var response = await client.ProcessAsync(
    text: \"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
    options: new ProcessOptions {
        OutputFormat = new[] { \"text\", \"code\" },
        MaxAgents = 5
    }
);

Console.WriteLine(response.Result);
Console.WriteLine(response.OutputType);
Console.WriteLine(response.ProcessingTime);`,

      r: `library(framesphere)

client <- CoreChain$new(api_key = \"dein_api_key\")

response <- client$process(
  text = \"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
  options = list(
    output_format = c(\"text\", \"code\"),
    max_agents = 5
  )
)

print(response$result)
print(response$output_type)
print(response$processing_time)`,

      curl: `curl -X POST https://api.framesphere.dev/v1/corechain/process \\\\
  -H \"Authorization: Bearer dein_api_key\" \\\\
  -H \"Content-Type: application/json\" \\\\
  -d '{
    \"text\": \"Analysiere die Q4 Verkaufsdaten und erstelle einen Report\",
    \"options\": {
      \"output_format\": [\"text\", \"code\"],
      \"max_agents\": 5
    }
  }'

# Response:
{
  \"result\": \"Detaillierter Report...\",
  \"output_type\": \"text\",
  \"length\": 1523,
  \"processing_time\": \"2.456s\",
  \"models_used\": [\"gpt-4\", \"claude-3\", \"analysis-agent\"]
}`
    },

    spherenet: {
      python: `from framesphere import SphereNet

# Initialisiere Client
client = SphereNet(api_key=\"dein_api_key\")

# Anfrage an spezifische AI Chain
response = client.execute(
    chain_id=\"image-generation-v2\",
    input_data={
        \"type\": \"text\",  # text, image oder document
        \"content\": \"Ein Sonnenuntergang am Strand\",
        \"style\": \"realistic\"
    }
)

# Ausgabe
print(response.result)           # Generiertes Bild (Base64 oder URL)
print(response.output_type)      # \"image\", \"text\" oder \"code\"
print(response.length)           # Größe der Ausgabe
print(response.processing_time)  # 3.789s
print(response.models_used)      # [\"stable-diffusion-xl\", \"upscaler\"]`,

      javascript: `const { SphereNet } = require('@framesphere/spherenet');

// Initialisiere Client
const client = new SphereNet({
  apiKey: 'dein_api_key'
});

// Anfrage an spezifische AI Chain
const response = await client.execute({
  chainId: 'image-generation-v2',
  inputData: {
    type: 'text',  // text, image oder document
    content: 'Ein Sonnenuntergang am Strand',
    style: 'realistic'
  }
});

// Ausgabe
console.log(response.result);         // Generiertes Bild
console.log(response.outputType);     // \"image\", \"text\" oder \"code\"
console.log(response.length);         // Größe
console.log(response.processingTime); // \"3.789s\"
console.log(response.modelsUsed);     // [\"stable-diffusion-xl\", ...]`,

      java: `import com.framesphere.SphereNet;

SphereNet client = new SphereNet(\"dein_api_key\");

ExecuteResponse response = client.execute(
    \"image-generation-v2\",
    new InputData()
        .setType(\"text\")
        .setContent(\"Ein Sonnenuntergang am Strand\")
        .setStyle(\"realistic\")
);

System.out.println(response.getResult());
System.out.println(response.getOutputType());
System.out.println(response.getProcessingTime());`,

      go: `package main

import (
    \"fmt\"
    \"github.com/framesphere/spherenet-go\"
)

func main() {
    client := spherenet.NewClient(\"dein_api_key\")
    
    response, err := client.Execute(
        \"image-generation-v2\",
        spherenet.InputData{
            Type: \"text\",
            Content: \"Ein Sonnenuntergang am Strand\",
            Style: \"realistic\",
        },
    )
    
    fmt.Println(response.Result)
    fmt.Println(response.OutputType)
    fmt.Println(response.ProcessingTime)
}`,

      php: `<?php
use FrameSphere\\\\SphereNet;

$client = new SphereNet('dein_api_key');

$response = $client->execute([
    'chain_id' => 'image-generation-v2',
    'input_data' => [
        'type' => 'text',
        'content' => 'Ein Sonnenuntergang am Strand',
        'style' => 'realistic'
    ]
]);

echo $response->result;
echo $response->output_type;
echo $response->processing_time;`,

      csharp: `using FrameSphere;

var client = new SphereNet(\"dein_api_key\");

var response = await client.ExecuteAsync(
    chainId: \"image-generation-v2\",
    inputData: new InputData {
        Type = \"text\",
        Content = \"Ein Sonnenuntergang am Strand\",
        Style = \"realistic\"
    }
);

Console.WriteLine(response.Result);
Console.WriteLine(response.OutputType);
Console.WriteLine(response.ProcessingTime);`,

      r: `library(framesphere)

client <- SphereNet$new(api_key = \"dein_api_key\")

response <- client$execute(
  chain_id = \"image-generation-v2\",
  input_data = list(
    type = \"text\",
    content = \"Ein Sonnenuntergang am Strand\",
    style = \"realistic\"
  )
)

print(response$result)
print(response$output_type)
print(response$processing_time)`,

      curl: `curl -X POST https://api.framesphere.dev/v1/spherenet/execute \\\\
  -H \"Authorization: Bearer dein_api_key\" \\\\
  -H \"Content-Type: application/json\" \\\\
  -d '{
    \"chain_id\": \"image-generation-v2\",
    \"input_data\": {
      \"type\": \"text\",
      \"content\": \"Ein Sonnenuntergang am Strand\",
      \"style\": \"realistic\"
    }
  }'

# Response:
{
  \"result\": \"data:image/png;base64,iVBORw0KGgoAAAA...\",
  \"output_type\": \"image\",
  \"length\": 245678,
  \"processing_time\": \"3.789s\",
  \"models_used\": [\"stable-diffusion-xl\", \"upscaler\"]
}`
    }
  };

  const apiSpecs = {
    framespell: {
      name: 'FrameSpell API',
      description: 'KI-gestützte Rechtschreibprüfung mit Kontextanalyse',
      endpoint: 'https://api.framesphere.dev/v1/framespell/check',
      method: 'POST',
      input: [
        { name: 'text', type: 'string', required: true, description: 'Der zu korrigierende Text' },
        { name: 'language', type: 'string', required: false, description: 'Sprache (de, en, fr, es, it)' },
        { name: 'style', type: 'string', required: false, description: 'Stil: formal, casual, technical' }
      ],
      output: [
        { name: 'corrected_text', type: 'string', description: 'Korrigierter Text' },
        { name: 'length', type: 'integer', description: 'Länge des korrigierten Textes in Zeichen' },
        { name: 'processing_time', type: 'string', description: 'Verarbeitungszeit in Sekunden' },
        { name: 'corrections', type: 'array', description: 'Liste aller Korrekturen mit Position und Art' }
      ]
    },

    corechain: {
      name: 'CoreChain API',
      description: 'AI-Orchestrierung für komplexe Multi-Step Workflows',
      endpoint: 'https://api.framesphere.dev/v1/corechain/process',
      method: 'POST',
      input: [
        { name: 'text', type: 'string', required: true, description: 'Die zu bearbeitende Anfrage' },
        { name: 'options.output_format', type: 'array', required: false, description: 'Gewünschte Ausgabeformate: [\"text\", \"code\", \"image\"]' },
        { name: 'options.max_agents', type: 'integer', required: false, description: 'Maximale Anzahl an AI-Agenten (1-10)' },
        { name: 'options.priority', type: 'string', required: false, description: 'Priorität: low, medium, high' }
      ],
      output: [
        { name: 'result', type: 'string/object', description: 'Finales Ergebnis der Orchestrierung' },
        { name: 'output_type', type: 'string', description: 'Typ der Ausgabe: text, code oder image' },
        { name: 'length', type: 'integer', description: 'Länge/Größe der Ausgabe' },
        { name: 'processing_time', type: 'string', description: 'Gesamte Verarbeitungszeit' },
        { name: 'models_used', type: 'array', description: 'Liste der verwendeten AI-Modelle' }
      ]
    },

    spherenet: {
      name: 'SphereNet',
      description: 'Zugriff auf öffentliche AI-Chains und Modelle',
      endpoint: 'https://api.framesphere.dev/v1/spherenet/execute',
      method: 'POST',
      input: [
        { name: 'chain_id', type: 'string', required: true, description: 'ID der gewünschten AI-Chain' },
        { name: 'input_data.type', type: 'string', required: true, description: 'Input-Typ: text, image oder document' },
        { name: 'input_data.content', type: 'string', required: true, description: 'Der Input-Content (Text, Base64, URL)' },
        { name: 'input_data.options', type: 'object', required: false, description: 'Chain-spezifische Optionen' }
      ],
      output: [
        { name: 'result', type: 'string/object', description: 'Ergebnis der AI-Chain' },
        { name: 'output_type', type: 'string', description: 'Typ der Ausgabe: text, image oder code' },
        { name: 'length', type: 'integer', description: 'Größe der Ausgabe in Bytes' },
        { name: 'processing_time', type: 'string', description: 'Verarbeitungszeit' },
        { name: 'models_used', type: 'array', description: 'Verwendete Modelle in der Chain' }
      ]
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const currentAPI = apiSpecs[selectedAPI];
  const currentCode = codeExamples[selectedAPI][selectedLanguage];


  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/developers" className="hover:text-white transition-colors">Developer Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">API Dokumentation</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">API Dokumentation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Vollständige Referenz mit Code-Beispielen für alle Programmiersprachen
          </p>
        </div>
      </section>

      {/* API Selector */}
      <section className="px-4 py-8 bg-dark-800 sticky top-20 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {apis.map((api) => (
              <button
                key={api.id}
                onClick={() => setSelectedAPI(api.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedAPI === api.id
                    ? `bg-gradient-to-r ${api.color} text-white`
                    : 'glass-effect hover:bg-white/10 text-gray-300'
                }`}
              >
                {api.icon}
                <span>{api.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <div className="card sticky top-40">
                <h3 className="text-lg font-bold text-white mb-4">Auf dieser Seite</h3>
                <nav className="space-y-2">
                  <a href="#overview" className="block text-gray-400 hover:text-primary-400 transition-colors">Übersicht</a>
                  <a href="#authentication" className="block text-gray-400 hover:text-primary-400 transition-colors">Authentifizierung</a>
                  <a href="#endpoint" className="block text-gray-400 hover:text-primary-400 transition-colors">Endpoint</a>
                  <a href="#request" className="block text-gray-400 hover:text-primary-400 transition-colors">Request Format</a>
                  <a href="#response" className="block text-gray-400 hover:text-primary-400 transition-colors">Response Format</a>
                  <a href="#examples" className="block text-gray-400 hover:text-primary-400 transition-colors">Code-Beispiele</a>
                  <a href="#errors" className="block text-gray-400 hover:text-primary-400 transition-colors">Fehlerbehandlung</a>
                </nav>
              </div>
            </div>

            {/* Main Documentation */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div id="overview" className="card">
                <h2 className="text-3xl font-bold text-white mb-4">{currentAPI.name}</h2>
                <p className="text-gray-400 mb-6">{currentAPI.description}</p>
                
                <div className="glass-effect rounded-lg p-4 border border-primary-500/30">
                  <div className="flex items-start space-x-3">
                    <Book className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Base URL</div>
                      <code className="text-primary-400 font-mono text-sm">{currentAPI.endpoint}</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div id="authentication" className="card">
                <h3 className="text-2xl font-bold text-white mb-4">Authentifizierung</h3>
                <p className="text-gray-400 mb-4">
                  Alle API-Anfragen erfordern einen gültigen API Key im Authorization Header:
                </p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <code className="text-sm text-gray-300 font-mono">
                    Authorization: Bearer your_api_key_here
                  </code>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  💡 Du kannst deinen API Key im <Link to="/dashboard" className="text-primary-400 hover:text-primary-300">Dashboard</Link> erstellen
                </div>
              </div>

              {/* Request Format */}
              <div id="request" className="card">
                <h3 className="text-2xl font-bold text-white mb-4">Request Parameter</h3>
                <div className="space-y-4">
                  {currentAPI.input.map((param, index) => (
                    <div key={index} className="glass-effect rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <code className="text-primary-400 font-mono">{param.name}</code>
                          {param.required && (
                            <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                              required
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{param.type}</span>
                      </div>
                      <p className="text-sm text-gray-400">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Format */}
              <div id="response" className="card">
                <h3 className="text-2xl font-bold text-white mb-4">Response Felder</h3>
                <div className="space-y-4">
                  {currentAPI.output.map((field, index) => (
                    <div key={index} className="glass-effect rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <code className="text-green-400 font-mono">{field.name}</code>
                        <span className="text-sm text-gray-500">{field.type}</span>
                      </div>
                      <p className="text-sm text-gray-400">{field.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Examples */}
              <div id="examples" className="card">
                <h3 className="text-2xl font-bold text-white mb-6">Code-Beispiele</h3>
                
                {/* Language Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedLanguage === lang.id
                          ? 'bg-primary-500 text-white'
                          : 'glass-effect hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-gray-400 text-sm">
                        {selectedLanguage === 'curl' ? 'shell' : selectedLanguage}.example
                      </span>
                    </div>
                    <button
                      onClick={() => copyCode(currentCode)}
                      className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {copiedCode === currentCode ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Kopieren</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-dark-900 rounded-lg p-6 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono whitespace-pre">
                      {currentCode}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Error Handling */}
              <div id="errors" className="card">
                <h3 className="text-2xl font-bold text-white mb-4">Fehlerbehandlung</h3>
                <p className="text-gray-400 mb-6">
                  Die API gibt im Fehlerfall einen entsprechenden HTTP-Status-Code und eine Fehlermeldung zurück.
                </p>
                
                <div className="space-y-4">
                  <div className="glass-effect rounded-lg p-4 border border-red-500/30">
                    <div className="flex items-start space-x-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-1">Error Response Format</div>
                        <p className="text-sm text-gray-400">Alle Fehler folgen diesem Format:</p>
                      </div>
                    </div>
                    <pre className="bg-dark-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">{
`{
  "error": {
    "code": 400,
    "message": "Invalid parameter: text",
    "details": "Text parameter is required"
  }
}`
                      }</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Häufige Fehler-Codes</h4>
                    <div className="space-y-2">
                      <div className="glass-effect rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <code className="text-red-400 font-mono font-bold">400</code>
                          <span className="text-sm text-gray-500">Bad Request</span>
                        </div>
                        <p className="text-sm text-gray-400">Ungültige Request-Parameter oder fehlendes Pflichtfeld</p>
                      </div>
                      
                      <div className="glass-effect rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <code className="text-red-400 font-mono font-bold">401</code>
                          <span className="text-sm text-gray-500">Unauthorized</span>
                        </div>
                        <p className="text-sm text-gray-400">Fehlender oder ungültiger API Key</p>
                      </div>
                      
                      <div className="glass-effect rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <code className="text-red-400 font-mono font-bold">429</code>
                          <span className="text-sm text-gray-500">Too Many Requests</span>
                        </div>
                        <p className="text-sm text-gray-400">Rate Limit überschritten - versuche es später erneut</p>
                      </div>
                      
                      <div className="glass-effect rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <code className="text-red-400 font-mono font-bold">500</code>
                          <span className="text-sm text-gray-500">Internal Server Error</span>
                        </div>
                        <p className="text-sm text-gray-400">Interner Serverfehler - kontaktiere den Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default APIDocs;
