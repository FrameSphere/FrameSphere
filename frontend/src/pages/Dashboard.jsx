import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Key, CreditCard, BarChart3, Zap, AlertCircle, Copy, Eye, EyeOff, Plus, Trash2, Link2, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import CreateApiKeyModal from '../components/CreateApiKeyModal';

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-6 right-6 z-[100] flex items-start space-x-3 px-5 py-4 rounded-xl shadow-xl border max-w-md
    ${type === 'success' ? 'bg-green-900/80 border-green-500/40 text-green-300' : 'bg-red-900/80 border-red-500/40 text-red-300'}
    backdrop-blur-md`}>
    {type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
    <p className="text-sm flex-1">{message}</p>
    <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 transition-opacity ml-2">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ apiCalls: 0, tokensUsed: 0, activeKeys: 0, balance: 0 });
  const [apiKeys, setApiKeys] = useState([]);
  const [services, setServices] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, keysRes, servicesRes, accountsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/api-keys'),
        api.get('/services'),
        api.get('/connected-accounts'),
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
    fetchDashboardData();
    showToast(`API Key erfolgreich erstellt! Key: ${response.apiKey.key.slice(0, 20)}...`);
  };

  const statCards = [
    { title: 'API Calls', value: stats.apiCalls.toLocaleString(), change: '+12.5%', icon: <Activity className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { title: 'Tokens Verbraucht', value: stats.tokensUsed.toLocaleString(), change: '+8.2%', icon: <Zap className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { title: 'Aktive API Keys', value: stats.activeKeys, change: '0', icon: <Key className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { title: 'Guthaben', value: `€${stats.balance.toFixed(2)}`, change: '-5.3%', icon: <CreditCard className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500" />
    </div>
  );

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Willkommen zurück, {user?.name}! 👋</h1>
          <p className="text-gray-400">Hier ist deine Übersicht über alle FrameSphere-Aktivitäten.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>{stat.icon}</div>
                {stat.change !== '0' && (
                  <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                )}
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { to: '/dashboard/connect-accounts', icon: <Link2 className="w-6 h-6 text-blue-400" />, bg: 'bg-blue-500/20', title: 'Account verbinden', desc: 'Produkt-Accounts hinzufügen' },
            { to: '/products', icon: <Zap className="w-6 h-6 text-primary-400" />, bg: 'bg-primary-500/20', title: 'Produkte erkunden', desc: 'Alle FrameSphere Tools' },
            { to: '/developers/docs', icon: <BarChart3 className="w-6 h-6 text-purple-400" />, bg: 'bg-purple-500/20', title: 'Dokumentation', desc: 'API Guides & Quickstart' },
            { to: '/billing', icon: <CreditCard className="w-6 h-6 text-green-400" />, bg: 'bg-green-500/20', title: 'Guthaben aufladen', desc: 'Zahlungsmethoden' },
          ].map((action, i) => (
            <Link key={i} to={action.to} className="card hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${action.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>{action.icon}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-400">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* API Keys */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">API Keys</h2>
              <p className="text-gray-400 text-sm">Verwalte deine API-Zugriffsschlüssel</p>
            </div>
            <button onClick={() => setShowNewKeyModal(true)} className="btn-primary inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Neuer Key</span>
            </button>
          </div>

          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Noch keine API Keys erstellt</p>
              <p className="text-gray-500 text-sm mb-6">Verbinde zuerst einen Account und erstelle dann deinen ersten Key.</p>
              <button onClick={() => setShowNewKeyModal(true)} className="btn-primary">Ersten Key erstellen</button>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <APIKeyCard key={key.id} apiKey={key} onDelete={fetchDashboardData} showToast={showToast} />
              ))}
            </div>
          )}
        </div>

        {/* Verbundene Accounts Info */}
        {connectedAccounts.length === 0 && (
          <div className="card mt-6 bg-yellow-500/5 border-yellow-500/30">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Noch keine Accounts verbunden</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Verbinde deine FrameSphere-Produkt-Accounts, um API Keys erstellen zu können und Statistiken zu sehen.
                </p>
                <Link to="/dashboard/connect-accounts" className="btn-primary text-sm inline-flex items-center space-x-2">
                  <Link2 className="w-4 h-4" />
                  <span>Account verbinden</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

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

const APIKeyCard = ({ apiKey, onDelete, showToast }) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('API Key in die Zwischenablage kopiert!');
  };

  const handleDelete = async () => {
    if (window.confirm('Möchtest du diesen API Key wirklich löschen?')) {
      try {
        await api.delete(`/api-keys/${apiKey.id}`);
        onDelete();
        showToast('API Key erfolgreich gelöscht.');
      } catch (error) {
        showToast('Fehler beim Löschen des API Keys.', 'error');
      }
    }
  };

  return (
    <div className="glass-effect rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-1.5">
            <h3 className="text-white font-semibold truncate">{apiKey.name}</h3>
            <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${apiKey.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {apiKey.status === 'active' ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="text-sm text-gray-400 font-mono truncate">
              {showKey ? apiKey.key : '••••••••••••••••••••••••••••••••'}
            </code>
            <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button onClick={copyToClipboard} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
              {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1">Erstellt: {new Date(apiKey.createdAt).toLocaleDateString('de-DE')}</p>
        </div>
        <button onClick={handleDelete} className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
