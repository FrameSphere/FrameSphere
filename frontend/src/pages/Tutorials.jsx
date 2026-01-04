import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  BookOpen,
  Code,
  Zap,
  Brain,
  Network,
  Home,
  Clock,
  BarChart3,
  FileText,
  Image,
  MessageSquare,
  Database,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'framespell', name: 'FrameSpell', icon: <FileText className="w-4 h-4" /> },
    { id: 'corechain', name: 'CoreChain', icon: <Brain className="w-4 h-4" /> },
    { id: 'spherenet', name: 'SphereNet', icon: <Network className="w-4 h-4" /> },
    { id: 'integration', name: 'Integrationen', icon: <Code className="w-4 h-4" /> }
  ];

  const difficulties = [
    { id: 'all', name: 'Alle Levels' },
    { id: 'beginner', name: 'Anfänger', color: 'text-green-400' },
    { id: 'intermediate', name: 'Fortgeschritten', color: 'text-yellow-400' },
    { id: 'advanced', name: 'Experte', color: 'text-red-400' }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Text-Editor mit Echtzeit-Rechtschreibprüfung',
      description: 'Baue einen modernen Text-Editor mit Live-Korrekturvorschlägen und Highlighting von Fehlern.',
      category: 'framespell',
      difficulty: 'beginner',
      duration: '30 Min',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      topics: ['React', 'WebSockets', 'State Management'],
      slug: 'text-editor-rechtschreibpruefung'
    },
    {
      id: 2,
      title: 'E-Mail Client mit automatischer Korrektur',
      description: 'Implementiere einen E-Mail Client, der Nachrichten automatisch auf Fehler prüft, bevor sie gesendet werden.',
      category: 'framespell',
      difficulty: 'intermediate',
      duration: '45 Min',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      topics: ['Node.js', 'Express', 'Email API'],
      slug: 'email-client-auto-korrektur'
    },
    {
      id: 3,
      title: 'Multi-Agenten System für Datenanalyse',
      description: 'Erstelle ein System, das komplexe Datenanalysen automatisch in Subtasks zerlegt und von verschiedenen AI-Agenten bearbeiten lässt.',
      category: 'corechain',
      difficulty: 'advanced',
      duration: '90 Min',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      topics: ['AI Orchestration', 'Data Processing', 'Async Workflows'],
      slug: 'multi-agenten-datenanalyse'
    },
    {
      id: 4,
      title: 'Content-Generierung Pipeline',
      description: 'Baue eine automatisierte Pipeline, die Themen recherchiert, Content erstellt und formatiert.',
      category: 'corechain',
      difficulty: 'intermediate',
      duration: '60 Min',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      topics: ['Workflows', 'Content Generation', 'APIs'],
      slug: 'content-generation-pipeline'
    },
    {
      id: 5,
      title: 'AI-gestütztes Code Review Tool',
      description: 'Entwickle ein Tool, das Code automatisch auf Bugs, Security Issues und Style-Probleme prüft.',
      category: 'corechain',
      difficulty: 'advanced',
      duration: '75 Min',
      icon: <Code className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      topics: ['Code Analysis', 'Git Integration', 'CI/CD'],
      slug: 'ai-code-review-tool'
    },
    {
      id: 6,
      title: 'Bild-Generierung mit Custom Prompts',
      description: 'Nutze SphereNet Chains, um hochwertige Bilder mit spezifischen Styles zu generieren.',
      category: 'spherenet',
      difficulty: 'beginner',
      duration: '25 Min',
      icon: <Image className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      topics: ['Image Generation', 'Prompting', 'APIs'],
      slug: 'bild-generierung-custom-prompts'
    },
    {
      id: 7,
      title: 'Custom AI Chain erstellen',
      description: 'Lerne, wie du eigene AI-Chains erstellst und sie im SphereNet veröffentlichst.',
      category: 'spherenet',
      difficulty: 'advanced',
      duration: '120 Min',
      icon: <Network className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      topics: ['Chain Building', 'Model Training', 'Publishing'],
      slug: 'custom-ai-chain-erstellen'
    },
    {
      id: 8,
      title: 'WordPress Plugin Integration',
      description: 'Integriere FrameSpell in ein WordPress Plugin für automatische Content-Prüfung.',
      category: 'integration',
      difficulty: 'intermediate',
      duration: '50 Min',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      topics: ['WordPress', 'PHP', 'Plugin Development'],
      slug: 'wordpress-plugin-integration'
    },
    {
      id: 9,
      title: 'React Native Mobile App',
      description: 'Baue eine mobile App mit FrameSphere APIs für iOS und Android.',
      category: 'integration',
      difficulty: 'intermediate',
      duration: '90 Min',
      icon: <Code className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      topics: ['React Native', 'Mobile Development', 'Cross-Platform'],
      slug: 'react-native-mobile-app'
    },
    {
      id: 10,
      title: 'Slack Bot mit AI-Features',
      description: 'Erstelle einen Slack Bot, der Nachrichten korrigiert und AI-gestützte Antworten liefert.',
      category: 'integration',
      difficulty: 'beginner',
      duration: '35 Min',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      topics: ['Slack API', 'Webhooks', 'Bot Development'],
      slug: 'slack-bot-ai-features'
    },
    {
      id: 11,
      title: 'Security Best Practices',
      description: 'Lerne, wie du API Keys sicher verwaltest und deine Integration gegen Angriffe schützt.',
      category: 'integration',
      difficulty: 'intermediate',
      duration: '40 Min',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      topics: ['Security', 'Authentication', 'Best Practices'],
      slug: 'security-best-practices'
    },
    {
      id: 12,
      title: 'Rate Limiting & Caching Strategien',
      description: 'Optimiere deine API-Nutzung mit intelligenten Caching und Rate-Limiting Strategien.',
      category: 'integration',
      difficulty: 'advanced',
      duration: '55 Min',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      topics: ['Performance', 'Caching', 'Optimization'],
      slug: 'rate-limiting-caching'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Anfänger';
      case 'intermediate':
        return 'Fortgeschritten';
      case 'advanced':
        return 'Experte';
      default:
        return difficulty;
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/developers" className="hover:text-white transition-colors">Developer Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Tutorials</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Tutorials & Anleitungen</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Schritt-für-Schritt Guides für die Integration von FrameSphere in deine Projekte
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 py-8 bg-dark-800 sticky top-20 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Kategorie:</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'glass-effect hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Schwierigkeit:</div>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-primary-500 text-white'
                      : 'glass-effect hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {difficulty.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredTutorials.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400">Keine Tutorials in dieser Kategorie gefunden</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Link
                  key={tutorial.id}
                  to={`/developers/tutorials/${tutorial.slug}`}
                  className="card group hover:scale-105 transition-all duration-300"
                >
                  {/* Icon & Difficulty */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${tutorial.color} rounded-xl flex items-center justify-center text-white`}>
                      {tutorial.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(tutorial.difficulty)}`}>
                        {getDifficultyLabel(tutorial.difficulty)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {tutorial.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center text-primary-400 group-hover:text-primary-300">
                    <span className="text-sm font-semibold">Tutorial starten</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Empfohlene Lernpfade</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Für Einsteiger</h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">1.</span>
                  <span>Text-Editor mit Rechtschreibprüfung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">2.</span>
                  <span>Bild-Generierung mit Custom Prompts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">3.</span>
                  <span>Slack Bot mit AI-Features</span>
                </li>
              </ol>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Für Fortgeschrittene</h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">1.</span>
                  <span>Content-Generierung Pipeline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">2.</span>
                  <span>WordPress Plugin Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">3.</span>
                  <span>Security Best Practices</span>
                </li>
              </ol>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Für Experten</h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">1.</span>
                  <span>Multi-Agenten Datenanalyse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">2.</span>
                  <span>Custom AI Chain erstellen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">3.</span>
                  <span>AI-gestütztes Code Review Tool</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <BookOpen className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Hast du Ideen für neue Tutorials?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Lass uns wissen, welche Themen du gerne als Tutorial sehen würdest!
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Tutorial vorschlagen</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutorials;
