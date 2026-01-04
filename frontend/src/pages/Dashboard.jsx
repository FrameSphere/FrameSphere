import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Key,
  CreditCard,
  BarChart3,
  TrendingUp,
  Zap,
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Link2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import CreateApiKeyModal from '../components/CreateApiKeyModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    apiCalls: 0,
    tokensUsed: 0,
    activeKeys: 0,
    balance: 0
  });
  const [apiKeys, setApiKeys] = useState([]);
  const [services, setServices] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, keysRes, servicesRes, accountsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/api-keys'),
        api.get('/services'),
        api.get('/connected-accounts')
      ]);
      setStats(statsRes.data);
      setApiKeys(keysRes.data);
      setServices(servicesRes.data);
      setConnectedAccounts(accountsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyCreated = (response) => {
    // Refresh the API keys list
    fetchDashboardData();
    // Show success message
    alert(`API Key erfolgreich erstellt! \n\nFrameSphere Key: ${response.apiKey.key}\nExternal Key: ${response.apiKey.external_key}`);
  };

  const statCards = [
    {
      title: 'API Calls',
      value: stats.apiCalls.toLocaleString(),
      change: '+12.5%',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Tokens Verbraucht',
      value: stats.tokensUsed.toLocaleString(),
      change: '+8.2%',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Aktive API Keys',
      value: stats.activeKeys,
      change: '0',
      icon: <Key className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Guthaben',
      value: `€${stats.balance.toFixed(2)}`,
      change: '-5.3%',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Willkommen zurück, {user?.name}!
          </h1>
          <p className="text-gray-400">
            Hier ist eine Übersicht über deine FrameSphere Aktivitäten
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
                {stat.change !== '0' && (
                  <span className={`text-xs font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link to="/dashboard/connect-accounts" className="card hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Link2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Account verbinden</h3>
                <p className="text-sm text-gray-400">Produkt-Accounts hinzufügen</p>
              </div>
            </div>
          </Link>

          <Link to="/products" className="card hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Produkte erkunden</h3>
                <p className="text-sm text-gray-400">Neue APIs entdecken</p>
              </div>
            </div>
          </Link>

          <Link to="/developers/docs" className="card hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Dokumentation</h3>
                <p className="text-sm text-gray-400">API Guides & Tutorials</p>
              </div>
            </div>
          </Link>

          <Link to="/billing" className="card hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Guthaben aufladen</h3>
                <p className="text-sm text-gray-400">Zahlungsmethoden</p>
              </div>
            </div>
          </Link>
        </div>

        {/* API Keys Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">API Keys</h2>
              <p className="text-gray-400">Verwalte deine API-Zugriffsschlüssel</p>
            </div>
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Neuer Key</span>
            </button>
          </div>

          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Noch keine API Keys erstellt</p>
              <button
                onClick={() => setShowNewKeyModal(true)}
                className="btn-primary"
              >
                Ersten Key erstellen
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <APIKeyCard key={key.id} apiKey={key} onDelete={fetchDashboardData} />
              ))}
            </div>
          )}
        </div>

        {/* Usage Chart Section */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">API Nutzung (Letzte 7 Tage)</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart3 className="w-12 h-12 mb-2" />
            <p className="ml-4">Chart wird geladen...</p>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      <CreateApiKeyModal
        isOpen={showNewKeyModal}
        onClose={() => setShowNewKeyModal(false)}
        onSuccess={handleApiKeyCreated}
        services={services}
        connectedAccounts={connectedAccounts}
      />
    </div>
  );
};

const APIKeyCard = ({ apiKey, onDelete }) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm('Möchtest du diesen API Key wirklich löschen?')) {
      try {
        await api.delete(`/api-keys/${apiKey.id}`);
        onDelete();
      } catch (error) {
        console.error('Error deleting API key:', error);
      }
    }
  };

  return (
    <div className="glass-effect rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-white font-semibold">{apiKey.name}</h3>
            <span className={`px-2 py-1 rounded text-xs ${
              apiKey.status === 'active' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {apiKey.status === 'active' ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="text-sm text-gray-400 font-mono">
              {showKey ? apiKey.key : '••••••••••••••••••••••••••••••••'}
            </code>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-green-400">Kopiert!</span>}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Erstellt: {new Date(apiKey.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
