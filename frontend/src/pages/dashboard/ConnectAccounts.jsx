import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Brain, Shield, Code, Search, Globe, ArrowRight, CheckCircle, AlertCircle, Loader, Link2, Key, ChevronRight, Info, ExternalLink, X, Zap } from 'lucide-react';
import api from '../../utils/api';

const products = [
  { id: 'framespell',    name: 'FrameSpell API',  description: 'KI-Rechtschreibprüfung',      icon: <Sparkles className="w-7 h-7" />, color: 'from-blue-500 to-cyan-500',    status: 'Live',  connectMode: 'apikey', docsUrl: 'https://framespell.pages.dev/' },
  { id: 'ratelimit-api', name: 'RateLimit API',   description: 'API-Anfragen limitieren',      icon: <Shield className="w-7 h-7" />,   color: 'from-green-500 to-emerald-500',status: 'Live',  connectMode: 'apikey', docsUrl: 'https://ratelimit-api.pages.dev/' },
  { id: 'frametrain',   name: 'FrameTrain',       description: 'KI-Modelle lokal trainieren',  icon: <Brain className="w-7 h-7" />,    color: 'from-violet-500 to-pink-500',  status: 'Live',  connectMode: 'sso',    ssoUrl: 'https://frame-train.vercel.app/api/auth/framesphere' },
  { id: 'corechain-api',name: 'CoreChain API',    description: 'KI-Orchestrierung',            icon: <Code className="w-7 h-7" />,     color: 'from-cyan-500 to-blue-500',    status: 'Bald',  connectMode: 'apikey', docsUrl: '/products/corechain-api' },
  { id: 'keyword-engine',name: 'Keyword Engine',  description: 'SEO Keyword-Analyse',          icon: <Search className="w-7 h-7" />,   color: 'from-yellow-500 to-orange-500',status: 'Bald',  connectMode: 'apikey', docsUrl: '/products/keyword-engine' },
  { id: 'website-manager',name: 'Website Manager',description: 'Webseiten verwalten',          icon: <Globe className="w-7 h-7" />,    color: 'from-orange-500 to-red-500',   status: 'Bald',  connectMode: 'apikey', docsUrl: '/products/website-manager' },
];

const ConnectAccounts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [step, setStep] = useState(1); // 1 = Produktwahl, 2 = API-Key-Formular
  const [loading, setLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [ssoConnections, setSsoConnections] = useState([]);
  const [connectionForm, setConnectionForm] = useState({ apiKey: '', accountName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchConnectedAccounts();
    fetchSsoConnections();
    const ssoErr = searchParams.get('sso_error');
    if (ssoErr) setError(`Verbindung fehlgeschlagen: ${decodeURIComponent(ssoErr)}`);
  }, []);

  const fetchConnectedAccounts = async () => {
    try { const r = await api.get('/connected-accounts'); setConnectedAccounts(r.data || []); } catch {}
  };
  const fetchSsoConnections = async () => {
    try { const r = await api.get('/sso/connections'); setSsoConnections(r.data?.connections || []); } catch {}
  };

  const isConnected = (productId) => {
    const viaApiKey = connectedAccounts.some(a => a.service_name === productId && a.status === 'active');
    const viaSSO    = ssoConnections.some(c => c.product === productId);
    return viaApiKey || viaSSO;
  };

  const handleProductSelect = (product) => {
    setError('');
    if (product.status === 'Bald') { setError(`${product.name} ist noch nicht verfügbar.`); return; }
    if (isConnected(product.id))   { setError(`${product.name} ist bereits verbunden.`); return; }

    if (product.connectMode === 'sso') {
      // Direkt zum SSO-Endpoint des Produkts weiterleiten — kein Modal, kein Tab
      window.location.href = product.ssoUrl;
      return;
    }

    setSelectedProduct(product);
    setStep(2);
    setConnectionForm({ apiKey: '', accountName: `Mein ${product.name} Account` });
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!connectionForm.accountName.trim()) { setError('Bitte gib einen Account-Namen ein'); setLoading(false); return; }
      if (!connectionForm.apiKey.trim())      { setError('Bitte gib einen API Key ein'); setLoading(false); return; }
      await api.post('/connected-accounts', {
        productId:   selectedProduct.id,
        productName: selectedProduct.name,
        apiKey:      connectionForm.apiKey,
        accountName: connectionForm.accountName,
      });
      setSuccess(`${selectedProduct.name} erfolgreich verbunden!`);
      await fetchConnectedAccounts();
      setTimeout(() => { setSuccess(''); setStep(1); setSelectedProduct(null); }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Fehler beim Verbinden. Bitte überprüfe deine Zugangsdaten.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => status === 'Live'
    ? 'bg-green-500/20 text-green-400 border-green-500/30'
    : 'bg-gray-500/20 text-gray-400 border-gray-500/30';

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white">{step === 1 ? 'Account verbinden' : `${selectedProduct?.name} verbinden`}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {step === 1 ? 'Account verbinden' : `${selectedProduct?.name} verbinden`}
          </h1>
          <p className="text-gray-400">
            {step === 1
              ? 'Wähle ein Produkt aus und verbinde deinen Account für zentrale Verwaltung.'
              : 'Gib deinen API Key ein, um die Verbindung herzustellen.'}
          </p>
        </div>

        {/* Info Banner */}
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Warum verbinden?</h3>
              <p className="text-gray-400 text-sm">Verbinde deine Produkt-Accounts einmalig und verwalte alles zentral über FrameSphere.</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {['Zentrale Verwaltung', 'Einmaliges Login (SSO)', 'Nutzungsstatistiken', 'Verschlüsselt gespeichert'].map(item => (
                  <span key={item} className="flex items-center text-xs text-green-400">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />{item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="card bg-red-500/10 border-red-500/30 mb-5 flex items-start justify-between space-x-3">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
            <button onClick={() => setError('')}><X className="w-4 h-4 text-red-400" /></button>
          </div>
        )}
        {success && (
          <div className="card bg-green-500/10 border-green-500/30 mb-5 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        {/* ── Step 1: Produktkacheln ── */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => {
              const connected = isConnected(product.id);
              const disabled  = product.status === 'Bald';
              const isSSO     = product.connectMode === 'sso';
              return (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`card text-left transition-all duration-300 ${
                    connected || disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03] cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white`}>
                      {product.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded text-xs border ${getStatusStyle(product.status)}`}>{product.status}</span>
                      {isSSO && !connected && !disabled && (
                        <span className="px-2 py-0.5 rounded text-xs border border-violet-500/30 bg-violet-500/10 text-violet-400">SSO</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                  {connected ? (
                    <div className="flex items-center text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" /><span>Verbunden</span>
                    </div>
                  ) : disabled ? (
                    <span className="text-gray-500 text-sm">Noch nicht verfügbar</span>
                  ) : isSSO ? (
                    <div className="flex items-center text-violet-400 text-sm">
                      <Zap className="w-4 h-4 mr-2" />
                      <span>Mit FrameSphere SSO verbinden</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </div>
                  ) : (
                    <div className="flex items-center text-primary-400 text-sm">
                      <Link2 className="w-4 h-4 mr-2" /><span>Verbinden</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Step 2: API-Key Formular (nur für nicht-SSO Produkte) ── */}
        {step === 2 && selectedProduct && (
          <div className="max-w-xl mx-auto">
            <div className="card">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-white/10">
                <div className={`w-14 h-14 bg-gradient-to-br ${selectedProduct.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  {selectedProduct.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{selectedProduct.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedProduct.description}</p>
                </div>
                <button onClick={() => { setStep(1); setError(''); }} className="text-gray-400 hover:text-white text-sm transition-colors">← Zurück</button>
              </div>

              <div className="glass-effect rounded-lg p-4 mb-5 border border-blue-500/20">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-2">API Key finden</h4>
                    <ol className="text-sm text-gray-400 space-y-1">
                      <li>1. Öffne die {selectedProduct.name} Website</li>
                      <li>2. Gehe zu Account / API Settings</li>
                      <li>3. Kopiere deinen API Key</li>
                    </ol>
                    <a href={selectedProduct.docsUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-primary-400 hover:text-primary-300 mt-2 transition-colors">
                      <ExternalLink className="w-3 h-3 mr-1" />{selectedProduct.name} öffnen
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConnect} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Account-Name</label>
                  <input type="text" value={connectionForm.accountName}
                    onChange={e => setConnectionForm({ ...connectionForm, accountName: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder={`z.B. Mein ${selectedProduct.name} Account`} required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-primary-400" />API Key
                  </label>
                  <input type="password" value={connectionForm.apiKey}
                    onChange={e => setConnectionForm({ ...connectionForm, apiKey: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors font-mono"
                    placeholder="sk_••••••••••••••••" required />
                  <p className="text-xs text-gray-500 mt-1">Dein API Key wird verschlüsselt gespeichert.</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => { setStep(1); setError(''); }}
                    className="flex-1 px-4 py-3 glass-effect hover:bg-white/10 text-white font-semibold rounded-lg transition-all text-sm">
                    Abbrechen
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 btn-primary inline-flex items-center justify-center space-x-2 text-sm disabled:opacity-50">
                    {loading
                      ? <><Loader className="w-4 h-4 animate-spin" /><span>Verbinde...</span></>
                      : <><Link2 className="w-4 h-4" /><span>Verbinden</span></>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ConnectAccounts;
