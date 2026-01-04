import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Code,
  Home,
  Network,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader,
  Link2,
  Shield,
  Key,
  ChevronRight,
  Info,
  ExternalLink
} from 'lucide-react';
import api from '../../utils/api';

const ConnectAccounts = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Product, 2: Connect Account
  const [loading, setLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [connectionForm, setConnectionForm] = useState({
    accountId: '',
    apiKey: '',
    accountName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const products = [
    {
      id: 'framespell',
      name: 'FrameSpell API',
      description: 'KI-gestützte Rechtschreib- und Grammatikprüfung',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      status: 'Live',
      requiresApiKey: true,
      connectionFields: ['apiKey', 'accountName'],
      documentationUrl: '/products/framespell'
    },
    {
      id: 'corechain-ai',
      name: 'CoreChain AI',
      description: 'KI-Orchestrierung für komplexe Workflows',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      status: 'Live',
      requiresApiKey: true,
      connectionFields: ['accountId', 'apiKey', 'accountName'],
      documentationUrl: '/products/corechain-ai'
    },
    {
      id: 'corechain-api',
      name: 'CoreChain API',
      description: 'Entwickler-API für AI-Orchestrierung',
      icon: <Code className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      status: 'Live',
      requiresApiKey: true,
      connectionFields: ['apiKey', 'accountName'],
      documentationUrl: '/products/corechain-api'
    },
    {
      id: 'spherehub',
      name: 'SphereHub',
      description: 'Lokale AI-Modelle & Smart Home Integration',
      icon: <Home className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      status: 'Beta',
      requiresApiKey: true,
      connectionFields: ['accountId', 'apiKey', 'accountName'],
      documentationUrl: '/products/spherehub'
    },
    {
      id: 'spherenet',
      name: 'SphereNet',
      description: 'Öffentliches Netzwerk von KI-Modellen',
      icon: <Network className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      status: 'Coming Soon',
      requiresApiKey: true,
      connectionFields: ['accountId', 'apiKey', 'accountName'],
      documentationUrl: '/products/spherenet'
    }
  ];

  useEffect(() => {
    fetchConnectedAccounts();
  }, []);

  const fetchConnectedAccounts = async () => {
    try {
      const response = await api.get('/connected-accounts');
      setConnectedAccounts(response.data || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
    }
  };

  const handleProductSelect = (product) => {
    if (product.status === 'Coming Soon') {
      setError(`${product.name} ist noch nicht verfügbar. Wir informieren dich, sobald es live geht!`);
      return;
    }
    setSelectedProduct(product);
    setStep(2);
    setError('');
    setSuccess('');
    setConnectionForm({
      accountId: '',
      apiKey: '',
      accountName: `Mein ${product.name} Account`
    });
  };

  const handleInputChange = (e) => {
    setConnectionForm({
      ...connectionForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate fields
      if (!connectionForm.accountName.trim()) {
        setError('Bitte gib einen Account-Namen ein');
        setLoading(false);
        return;
      }

      if (!connectionForm.apiKey.trim()) {
        setError('Bitte gib einen API Key ein');
        setLoading(false);
        return;
      }

      if (selectedProduct.connectionFields.includes('accountId') && !connectionForm.accountId.trim()) {
        setError('Bitte gib eine Account ID ein');
        setLoading(false);
        return;
      }

      // Call API to connect account
      const response = await api.post('/connected-accounts', {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        accountId: connectionForm.accountId,
        apiKey: connectionForm.apiKey,
        accountName: connectionForm.accountName
      });

      setSuccess(`${selectedProduct.name} Account erfolgreich verbunden!`);
      
      // Wait a bit to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error connecting account:', error);
      setError(
        error.response?.data?.message || 
        'Fehler beim Verbinden des Accounts. Bitte überprüfe deine Zugangsdaten.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isAccountConnected = (productId) => {
    return connectedAccounts.some(acc => acc.service_name === productId);
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Live': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Beta': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Coming Soon': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return styles[status] || styles['Coming Soon'];
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white">Account verbinden</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            {step === 1 ? 'Account verbinden' : `${selectedProduct?.name} verbinden`}
          </h1>
          <p className="text-gray-400 text-lg">
            {step === 1 
              ? 'Verbinde deine FrameSphere Produkt-Accounts für einen zentralen Überblick'
              : 'Gib deine Account-Details ein, um die Verbindung herzustellen'
            }
          </p>
        </div>

        {/* Info Banner */}
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Warum Accounts verbinden?
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Verwalte alle deine FrameSphere Produkt-Accounts an einem zentralen Ort. 
                Erhalte einen kompletten Überblick über Nutzung, Statistiken und Kosten.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Zentrale Übersicht</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Echtzeitstatistiken</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Kostenkontrolle</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Sicher verschlüsselt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="card bg-red-500/10 border-red-500/30 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="card bg-green-500/10 border-green-500/30 mb-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-400">{success}</p>
            </div>
          </div>
        )}

        {/* Step 1: Product Selection */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const connected = isAccountConnected(product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => !connected && handleProductSelect(product)}
                  disabled={connected}
                  className={`card text-left transition-all duration-300 ${
                    connected 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:scale-105 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white`}>
                      {product.icon}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {product.description}
                  </p>

                  {connected ? (
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">Verbunden</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-primary-400">
                      <Link2 className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">Verbinden</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Connection Form */}
        {step === 2 && selectedProduct && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              {/* Product Header */}
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
                <div className={`w-16 h-16 bg-gradient-to-br ${selectedProduct.color} rounded-xl flex items-center justify-center text-white`}>
                  {selectedProduct.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {selectedProduct.description}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Zurück
                </button>
              </div>

              {/* Instructions */}
              <div className="glass-effect rounded-lg p-4 mb-6 border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      So findest du deine Zugangsdaten
                    </h4>
                    <ol className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary-400 mr-2">1.</span>
                        <span>Logge dich in deinen {selectedProduct.name} Account ein</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-400 mr-2">2.</span>
                        <span>Gehe zu Account Settings oder API Settings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-400 mr-2">3.</span>
                        <span>Kopiere deinen API Key und Account ID</span>
                      </li>
                    </ol>
                    <Link
                      to={selectedProduct.documentationUrl}
                      className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300 mt-3"
                    >
                      <span>Mehr Infos in der Dokumentation</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Connection Form */}
              <form onSubmit={handleConnect} className="space-y-6">
                {/* Account Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Account-Name
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={connectionForm.accountName}
                    onChange={handleInputChange}
                    placeholder="z.B. Mein FrameSpell Account"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ein beschreibender Name für diesen Account
                  </p>
                </div>

                {/* Account ID (if required) */}
                {selectedProduct.connectionFields.includes('accountId') && (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Account ID
                    </label>
                    <input
                      type="text"
                      name="accountId"
                      value={connectionForm.accountId}
                      onChange={handleInputChange}
                      placeholder="z.B. acc_1234567890abcdef"
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors font-mono"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Deine eindeutige Account ID von {selectedProduct.name}
                    </p>
                  </div>
                )}

                {/* API Key */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-primary-400" />
                    API Key
                  </label>
                  <input
                    type="password"
                    name="apiKey"
                    value={connectionForm.apiKey}
                    onChange={handleInputChange}
                    placeholder="sk_live_••••••••••••••••••••"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors font-mono"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dein API Key wird sicher verschlüsselt gespeichert
                  </p>
                </div>

                {/* Security Note */}
                <div className="glass-effect rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">
                        Deine Daten sind sicher
                      </h4>
                      <p className="text-gray-400 text-xs">
                        Alle Zugangsdaten werden verschlüsselt übertragen und gespeichert. 
                        Wir verwenden deine API Keys ausschließlich, um Statistiken abzurufen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 glass-effect hover:bg-white/10 text-white font-semibold rounded-lg transition-all"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary inline-flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Verbinde...</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5" />
                        <span>Account verbinden</span>
                      </>
                    )}
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
