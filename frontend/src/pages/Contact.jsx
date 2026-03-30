import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, MessageSquare, Phone, MapPin, Send, CheckCircle,
  Clock, AlertCircle, Loader, ArrowLeft, RefreshCw
} from 'lucide-react';

// ── Manager Worker API ─────────────────────────────────────────────
const MANAGER_API = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
const SITE_ID = 'framesphere';
const STORAGE_KEY = 'framesphere_support_ticket';

async function managerApi(path, opts = {}) {
  try {
    const r = await fetch(MANAGER_API + path, {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

const statusLabel = {
  open:        { text: 'Offen',           color: 'text-blue-400',   bg: 'bg-blue-500/15 border-blue-500/30' },
  in_progress: { text: 'In Bearbeitung',  color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/30' },
  resolved:    { text: 'Gelöst',          color: 'text-green-400',  bg: 'bg-green-500/15 border-green-500/30' },
  closed:      { text: 'Geschlossen',     color: 'text-gray-400',   bg: 'bg-gray-500/15 border-gray-500/30' },
};

// ── Ticket Thread View ─────────────────────────────────────────────
const TicketThread = ({ ticketId, token, onClose }) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply]     = useState('');
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState('');
  const bottomRef             = useRef(null);

  const load = async () => {
    setLoading(true);
    const res = await managerApi(`/api/support/${ticketId}/thread?token=${encodeURIComponent(token)}`);
    setData(res);
    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  useEffect(() => { load(); }, [ticketId, token]);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    setSendErr('');
    const res = await managerApi(`/api/support/${ticketId}/reply`, {
      method: 'POST',
      body: { token, message: reply.trim() },
    });
    if (!res) {
      setSendErr('Fehler beim Senden. Bitte versuche es nochmal.');
    } else {
      setReply('');
      await load();
    }
    setSending(false);
  };

  const status = data?.ticket?.status || 'open';
  const sl     = statusLabel[status] || statusLabel.open;

  return (
    <div className="card flex flex-col" style={{ minHeight: '500px' }}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <button onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-sm truncate">
                {data?.ticket?.subject || 'Support-Ticket'}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ${sl.bg} ${sl.color}`}>
                {sl.text}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Ticket #{ticketId}</p>
          </div>
        </div>
        <button onClick={load} title="Aktualisieren"
          className="text-gray-500 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg flex-shrink-0 ml-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1" style={{ maxHeight: '380px' }}>
        {loading && !data && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-6 h-6 animate-spin text-primary-400" />
          </div>
        )}
        {!loading && (!data?.messages || data.messages.length === 0) && (
          <div className="text-center text-gray-500 text-sm py-10">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
            Wir melden uns bald!
          </div>
        )}
        {data?.messages?.map((m, i) => {
          const isAdmin = m.sender === 'admin';
          return (
            <div key={i} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                isAdmin
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'glass-effect text-gray-200 rounded-bl-sm border border-white/10'
              }`}>
                {m.message}
              </div>
              <div className="text-xs text-gray-600 mt-1 px-1">
                {isAdmin ? '🔧 FrameSphere Support' : '👤 Du'} · {fmtDate(m.created_at)}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Resolved hint */}
      {(status === 'resolved' || status === 'closed') && (
        <div className="mb-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400 text-center">
          ✅ Ticket als gelöst markiert. Du kannst trotzdem weiter schreiben.
        </div>
      )}

      {/* Reply */}
      <div className="border-t border-white/10 pt-4 flex-shrink-0">
        {sendErr && (
          <p className="text-red-400 text-xs mb-2 flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /><span>{sendErr}</span>
          </p>
        )}
        <div className="flex gap-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) sendReply(); }}
            placeholder="Antwort schreiben… (Strg+Enter senden)"
            rows={2}
            className="flex-1 resize-none px-3 py-2.5 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500 transition-colors"
          />
          <button onClick={sendReply} disabled={sending || !reply.trim()}
            className="btn-primary px-4 self-end disabled:opacity-40 inline-flex items-center space-x-1.5 flex-shrink-0">
            {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline text-sm">Senden</span>
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-1.5">Strg+Enter zum Senden</p>
      </div>
    </div>
  );
};

// ── Main ───────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm]           = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitting, setSubmit]   = useState(false);
  const [error, setError]         = useState('');
  const [savedTicket, setSaved]   = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  });
  const [showThread, setThread]   = useState(!!savedTicket);

  const subjects = [
    { value: 'general',     label: 'Allgemeine Anfrage' },
    { value: 'technical',   label: 'Technisches Problem' },
    { value: 'billing',     label: 'Abrechnung & Preise' },
    { value: 'api',         label: 'API Integration' },
    { value: 'feature',     label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other',       label: 'Sonstiges' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.message.trim().length < 10) {
      setError('Bitte schreibe mindestens 10 Zeichen.');
      return;
    }
    setSubmit(true);

    const subjectLabel = subjects.find(s => s.value === form.subject)?.label || form.subject;
    const fullSubject  = `[${subjectLabel}] ${form.message.slice(0, 55)}${form.message.length > 55 ? '…' : ''}`;

    const res = await managerApi('/api/support/submit', {
      method: 'POST',
      body: {
        site_id: SITE_ID,
        name:    form.name.trim() || 'Anonym',
        email:   form.email.trim() || null,
        subject: fullSubject,
        message: form.message.trim(),
      },
    });

    setSubmit(false);

    if (!res?.success) {
      setError('Fehler beim Senden. Bitte schreib uns direkt an support@framesphere.dev');
      return;
    }

    const ticket = { ticket_id: res.ticket_id, user_token: res.user_token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ticket));
    setSaved(ticket);
    setThread(true);
    setForm({ name: '', email: '', subject: 'general', message: '' });
  };

  const forgetTicket = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setThread(false);
  };

  const contactMethods = [
    { icon: <Mail className="w-6 h-6" />,          title: 'E-Mail',        value: 'support@framesphere.dev',      desc: 'Antwort innerhalb 24h',           color: 'from-blue-500 to-cyan-500',    href: 'mailto:support@framesphere.dev' },
    { icon: <MessageSquare className="w-6 h-6" />,  title: 'Support-Chat',  value: 'Direkt hier im Formular',      desc: 'Ticket erstellen & verfolgen',    color: 'from-green-500 to-emerald-500',href: '#contact-form' },
    { icon: <Phone className="w-6 h-6" />,          title: 'Telefon',       value: '+49 (0) 6131 123456',          desc: 'Enterprise Support verfügbar',    color: 'from-purple-500 to-pink-500',  href: 'tel:+4961311234567' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* Header */}
      <section className="px-4 py-12 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4"><span className="gradient-text">Kontaktiere uns</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Fragen, Feedback oder technische Probleme — wir helfen dir weiter.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {contactMethods.map((m, i) => (
            <a key={i} href={m.href} className="card group hover:scale-[1.03] transition-all duration-300">
              <div className={`w-14 h-14 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center text-white mb-4`}>{m.icon}</div>
              <h3 className="text-lg font-bold text-white mb-1">{m.title}</h3>
              <div className="text-primary-400 font-semibold text-sm mb-1">{m.value}</div>
              <p className="text-xs text-gray-400">{m.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="px-4" id="contact-form">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2">

            {/* Existing ticket banner */}
            {savedTicket && !showThread && (
              <div className="card mb-5 bg-blue-500/10 border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-semibold text-sm">Offenes Ticket vorhanden</p>
                    <p className="text-gray-400 text-xs">Ticket #{savedTicket.ticket_id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setThread(true)} className="btn-primary text-xs py-1.5 px-3">Öffnen</button>
                  <button onClick={forgetTicket} className="btn-secondary text-xs py-1.5 px-3">Neues Ticket</button>
                </div>
              </div>
            )}

            {/* Thread or Form */}
            {showThread && savedTicket ? (
              <TicketThread ticketId={savedTicket.ticket_id} token={savedTicket.user_token} onClose={() => setThread(false)} />
            ) : (
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-6">Nachricht schreiben</h2>

                {error && (
                  <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input type="text" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Dein Name"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
                      <input type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="deine@email.de"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Thema *</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors text-sm">
                      {subjects.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nachricht *</label>
                    <textarea value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required rows={6} minLength={10}
                      placeholder="Wie können wir dir helfen? (mind. 10 Zeichen)"
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none text-sm" />
                    <p className="text-xs text-gray-600 mt-1">{form.message.length} Zeichen</p>
                  </div>

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50">
                    {submitting
                      ? <><Loader className="w-5 h-5 animate-spin" /><span>Wird gesendet…</span></>
                      : <><Send className="w-5 h-5" /><span>Nachricht senden</span></>
                    }
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Nach dem Absenden kannst du den Status direkt hier verfolgen und antworten.{' '}
                    <Link to="/legal/privacy" className="text-primary-400 hover:text-primary-300">Datenschutz</Link>
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Direktkontakt</h3>
              <div className="space-y-3">
                {[
                  { title: 'Allgemein',  email: 'info@framesphere.dev',       desc: 'Allgemeine Fragen' },
                  { title: 'Support',   email: 'support@framesphere.dev',    desc: 'Technische Probleme & API' },
                  { title: 'Sales',     email: 'sales@framesphere.dev',      desc: 'Enterprise & Partnerships' },
                ].map((d, i) => (
                  <div key={i} className="glass-effect rounded-lg p-3">
                    <div className="font-semibold text-white text-sm">{d.title}</div>
                    <a href={`mailto:${d.email}`} className="text-primary-400 hover:text-primary-300 text-xs block mt-0.5">{d.email}</a>
                    <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Standort</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div><div className="text-white font-medium">FrameSphere</div><div>Mainz, Deutschland</div></div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div><div className="text-white font-medium">Reaktionszeit</div><div>E-Mail & Tickets: 24–48h</div></div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Ticket-System</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Dein Ticket wird nach dem Senden direkt hier angezeigt. Du kannst antworten und den Status verfolgen — alles ohne Anmeldung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
