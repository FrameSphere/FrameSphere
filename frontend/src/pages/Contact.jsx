import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
  HelpCircle,
  Briefcase,
  Code,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'general',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'E-Mail',
      value: 'support@framesphere.dev',
      description: 'Antwort innerhalb von 24 Stunden',
      color: 'from-blue-500 to-cyan-500',
      link: 'mailto:support@framesphere.dev'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      value: 'Verfügbar Mo-Fr 9-18 Uhr',
      description: 'Sofortige Unterstützung',
      color: 'from-green-500 to-emerald-500',
      link: '#chat'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      value: '+49 (0) 6131 123456',
      description: 'Enterprise Support verfügbar',
      color: 'from-purple-500 to-pink-500',
      link: 'tel:+4961311234567'
    }
  ];

  const departments = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Allgemeine Anfragen',
      email: 'info@framesphere.dev',
      description: 'Für allgemeine Fragen und Informationen'
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Technischer Support',
      email: 'support@framesphere.dev',
      description: 'API-Integration und technische Probleme'
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Vertrieb & Partnerships',
      email: 'sales@framesphere.dev',
      description: 'Enterprise-Lösungen und Partnerschaften'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Karriere',
      email: 'jobs@framesphere.dev',
      description: 'Bewerbungen und offene Positionen'
    }
  ];

  const subjects = [
    { value: 'general', label: 'Allgemeine Anfrage' },
    { value: 'technical', label: 'Technisches Problem' },
    { value: 'billing', label: 'Abrechnung & Preise' },
    { value: 'api', label: 'API Integration' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Sonstiges' }
  ];

  const officeInfo = {
    address: 'FrameSphere GmbH',
    street: 'Musterstraße 123',
    city: '55116 Mainz',
    country: 'Deutschland',
    hours: 'Mo-Fr: 9:00 - 18:00 Uhr'
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Kontaktiere uns</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Wir sind hier, um dir zu helfen. Egal ob du Fragen hast, Unterstützung brauchst oder einfach nur Hallo sagen möchtest.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:animate-glow`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <div className="text-primary-400 font-semibold mb-2">{method.value}</div>
                <p className="text-sm text-gray-400">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-3xl font-bold text-white mb-6">Schreib uns eine Nachricht</h2>
                
                {submitted && (
                  <div className="mb-6 glass-effect rounded-lg p-4 border border-green-500/30 bg-green-500/10">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-green-400 font-semibold mb-1">Nachricht gesendet!</div>
                        <div className="text-sm text-gray-400">
                          Vielen Dank für deine Nachricht. Wir werden uns so schnell wie möglich bei dir melden.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Dein Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="deine@email.de"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Firma (optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Dein Unternehmen"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Betreff *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="Wie können wir dir helfen?"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Nachricht senden</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Mit dem Absenden stimmst du unserer{' '}
                    <Link to="/legal/privacy" className="text-primary-400 hover:text-primary-300">
                      Datenschutzerklärung
                    </Link>{' '}
                    zu.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Departments */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Direkte Kontakte</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="glass-effect rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 flex-shrink-0">
                          {dept.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">{dept.title}</div>
                          <a
                            href={`mailto:${dept.email}`}
                            className="text-primary-400 hover:text-primary-300 text-sm font-medium block mb-1"
                          >
                            {dept.email}
                          </a>
                          <p className="text-xs text-gray-400">{dept.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Info */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Büro</h3>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold">{officeInfo.address}</div>
                      <div>{officeInfo.street}</div>
                      <div>{officeInfo.city}</div>
                      <div>{officeInfo.country}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold">Öffnungszeiten</div>
                      <div>{officeInfo.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Schnelle Antwort</h4>
                    <p className="text-sm text-gray-400">
                      Wir versuchen auf alle Anfragen innerhalb von 24 Stunden zu antworten. 
                      Bei dringenden technischen Problemen nutze bitte unseren Live-Chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-gray-400">
              Vielleicht findest du hier bereits die Antwort auf deine Frage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="text-lg font-bold text-white mb-2">
                Wie schnell erhalte ich Support?
              </h4>
              <p className="text-gray-400 text-sm">
                E-Mail-Anfragen werden innerhalb von 24 Stunden beantwortet. 
                Live-Chat bietet sofortige Unterstützung während der Geschäftszeiten.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-white mb-2">
                Bietet ihr Enterprise-Support an?
              </h4>
              <p className="text-gray-400 text-sm">
                Ja, wir bieten dedizierte Enterprise-Support-Pläne mit SLA-Garantien, 
                Telefon-Support und direktem Zugang zu unserem Engineering-Team.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-white mb-2">
                Kann ich einen Demo-Termin buchen?
              </h4>
              <p className="text-gray-400 text-sm">
                Auf jeden Fall! Kontaktiere uns über das Formular mit dem Betreff 
                "Partnership" und wir vereinbaren einen individuellen Demo-Termin.
              </p>
            </div>

            <div className="card">
              <h4 className="text-lg font-bold text-white mb-2">
                Wo finde ich die Dokumentation?
              </h4>
              <p className="text-gray-400 text-sm">
                Unsere vollständige API-Dokumentation findest du im{' '}
                <Link to="/developers/docs" className="text-primary-400 hover:text-primary-300">
                  Developer Hub
                </Link>
                . Für weitere Hilfe steht unser Support-Team bereit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="card overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-white mb-2">Mainz, Deutschland</p>
                <p className="text-gray-400">Musterstraße 123, 55116 Mainz</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
