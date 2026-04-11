import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, LogIn, X, Check, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const FRAMESPHERE_API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FrameSphereIcon = () => (
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
    <span className="text-white font-black text-sm">FS</span>
  </div>
);

const ProductIcon = ({ name }) => (
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
    <span className="text-white font-black text-xs">{name?.[0] ?? '?'}</span>
  </div>
);

const SSOAuthorize = () => {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const state = searchParams.get('state') || '';

  const [clientName, setClientName] = useState('');
  const [clientError, setClientError] = useState('');
  const [approving, setApproving] = useState(false);

  // Fetch client info from backend
  useEffect(() => {
    if (!clientId || !redirectUri) {
      setClientError('Ungültige Anfrage – fehlende Parameter.');
      return;
    }
    api.get(`/sso/client-info?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`)
      .then((res) => setClientName(res.data.clientName))
      .catch(() => setClientError('Unbekannte Anwendung oder ungültige Redirect-URL.'));
  }, [clientId, redirectUri]);

  // If not logged in, redirect to login then come back
  useEffect(() => {
    if (!loading && !user) {
      const returnUrl = encodeURIComponent(window.location.href);
      navigate(`/login?return=${returnUrl}`);
    }
  }, [user, loading]);

  const handleApprove = async () => {
    setApproving(true);
    try {
      const res = await api.post('/sso/approve', { client_id: clientId, redirect_uri: redirectUri, state });
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      setClientError('Fehler beim Bestätigen. Bitte versuche es erneut.');
      setApproving(false);
    }
  };

  const handleDeny = async () => {
    try {
      const res = await api.post('/sso/deny', { redirect_uri: redirectUri, state });
      window.location.href = res.data.redirectUrl;
    } catch {
      window.location.href = redirectUri + '?error=access_denied';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (clientError) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Ungültige Anfrage</h2>
          <p className="text-gray-400 text-sm mb-6">{clientError}</p>
          <Link to="/dashboard" className="btn-primary text-sm">Zum Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">

          {/* Header mit Icon-Flow */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-5">
              <ProductIcon name={clientName} />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary-300" />
              </div>
              <FrameSphereIcon />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {clientName || '...'} möchte Zugriff
            </h2>
            <p className="text-gray-400 text-sm">
              auf dein <span className="text-white font-semibold">FrameSphere</span>-Konto
            </p>
          </div>

          {/* Logged-in as */}
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-700 border border-white/5 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name || user.email}</p>
                <p className="text-gray-500 text-xs truncate">{user.email}</p>
              </div>
              <span className="text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">Aktiv</span>
            </div>
          )}

          {/* Was wird geteilt */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
              {clientName} erhält Zugriff auf:
            </p>
            <div className="space-y-2">
              {[
                { icon: '✉️', label: 'Deine E-Mail-Adresse' },
                { icon: '👤', label: 'Dein Name und Profilbild' },
                { icon: '🔑', label: 'Deine FrameSphere-Nutzer-ID' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-gray-300">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">
              {clientName} erhält keinen Zugriff auf dein Passwort oder deine API Keys.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDeny}
              disabled={approving}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-white/10 bg-dark-700 hover:bg-dark-600 text-gray-300 font-medium transition-colors text-sm disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Ablehnen
            </button>
            <button
              onClick={handleApprove}
              disabled={approving}
              className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {approving ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {approving ? 'Wird verbunden...' : 'Zulassen'}
            </button>
          </div>

          <p className="text-xs text-gray-600 text-center mt-4">
            Durch "Zulassen" autorisierst du{' '}
            <span className="text-gray-500">{clientName}</span>{' '}
            gemäß unserer{' '}
            <Link to="/legal/privacy" className="text-primary-500 hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SSOAuthorize;
