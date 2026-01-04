import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Code,
  Home,
  Network,
  Plus,
  Trash2,
  RefreshCw,
  TrendingUp,
  Activity,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  ExternalLink,
  Eye,
  Settings
} from 'lucide-react';
import api from '../../utils/api';

const ManageAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const productIcons = {
    'framespell': { icon: <Sparkles className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    'corechain-ai': { icon: <Brain className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    'corechain-api': { icon: <Code className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    'spherehub': { icon: <Home className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    'spherenet': { icon: <Network className="w-6 h-6" />, color: 'from-indigo-500 to-blue-500' }
  };

  useEffect(() => {
    fetchConnectedAccounts();
  }, []);

  const fetchConnectedAccounts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/connected-accounts');
      setConnectedAccounts(response.data || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAccount = async (accountId) => {
    try {
      setRefreshing(accountId);
      await api.post(`/connected-accounts/${accountId}/refresh`);
      await fetchConnectedAccounts();
    } catch (error) {
      console.error('Error refreshing account:', error);
    } finally {
      setRefreshing(null);
    }
  };

  const handleDeleteAccount = async (accountId, accountName) => {
    if (window.confirm(`Möchtest du "${accountName}" wirklich trennen?`)) {
      try {
        await api.delete(`/connected-accounts/${accountId}`);
        await fetchConnectedAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const calculateTotalStats = () => {
    return connectedAccounts.reduce((acc, account) => {
      return {
        totalCalls: acc.totalCalls + (account.stats?.apiCalls || 0),
        totalCost: acc.totalCost + (account.stats?.totalCost || 0),
        totalTokens: acc.totalTokens + (account.stats?.tokensUsed || 0)
      };
    }, { totalCalls: 0, totalCost: 0, totalTokens: 0 });
  };

  const totalStats = calculateTotalStats();

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Verbundene Accounts
            </h1>
            <p className="text-gray-400">
              Verwalte alle deine FrameSphere Produkt-Accounts
            </p>
          </div>
          <Link
            to="/dashboard/connect-accounts"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Account verbinden</span>
          </Link>
        </div>

        {/* Total Stats Overview */}
        {connectedAccounts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Gesamt API Calls</h3>
              <p className="text-2xl font-bold text-white">
                {totalStats.totalCalls.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Gesamt Tokens</h3>
              <p className="text-2xl font-bold text-white">
                {totalStats.totalTokens.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Gesamt Kosten</h3>
              <p className="text-2xl font-bold text-white">
                €{totalStats.totalCost.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Connected Accounts List */}
        {connectedAccounts.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Noch keine Accounts verbunden
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Verbinde deine FrameSphere Produkt-Accounts, um alle Statistiken 
              an einem Ort zu sehen und zu verwalten.
            </p>
            <Link
              to="/dashboard/connect-accounts"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Ersten Account verbinden</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {connectedAccounts.map((account) => {
              const productConfig = productIcons[account.productId] || {
                icon: <Settings className="w-6 h-6" />,
                color: 'from-gray-500 to-gray-600'
              };

              return (
                <AccountCard
                  key={account.id}
                  account={account}
                  productConfig={productConfig}
                  onRefresh={handleRefreshAccount}
                  onDelete={handleDeleteAccount}
                  isRefreshing={refreshing === account.id}
                  onViewDetails={() => setSelectedAccount(account)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <AccountDetailsModal
          account={selectedAccount}
          productConfig={productIcons[selectedAccount.productId]}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
};

// Account Card Component
const AccountCard = ({ account, productConfig, onRefresh, onDelete, isRefreshing, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'syncing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Verbunden';
      case 'error':
        return 'Fehler';
      case 'syncing':
        return 'Synchronisiert';
      default:
        return 'Unbekannt';
    }
  };

  return (
    <div className="card hover:bg-white/5 transition-all">
      <div className="flex items-start justify-between">
        {/* Left: Product Info */}
        <div className="flex items-start space-x-4 flex-1">
          <div className={`w-14 h-14 bg-gradient-to-br ${productConfig.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
            {productConfig.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-white">
                {account.accountName}
              </h3>
              <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(account.status)}`}>
                {getStatusText(account.status)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              {account.productName}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-400">
                <Activity className="w-4 h-4 mr-1 text-blue-400" />
                <span>{(account.stats?.apiCalls || 0).toLocaleString()} Calls</span>
              </div>
              <div className="flex items-center text-gray-400">
                <TrendingUp className="w-4 h-4 mr-1 text-purple-400" />
                <span>{(account.stats?.tokensUsed || 0).toLocaleString()} Tokens</span>
              </div>
              <div className="flex items-center text-gray-400">
                <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                <span>€{(account.stats?.totalCost || 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-1 text-orange-400" />
                <span>Verbunden: {new Date(account.connectedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => onViewDetails()}
            className="p-2 glass-effect hover:bg-white/10 rounded-lg transition-colors"
            title="Details anzeigen"
          >
            <Eye className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => onRefresh(account.id)}
            disabled={isRefreshing}
            className="p-2 glass-effect hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            title="Statistiken aktualisieren"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => onDelete(account.id, account.accountName)}
            className="p-2 glass-effect hover:bg-red-500/20 rounded-lg transition-colors"
            title="Account trennen"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      {/* Error Message if any */}
      {account.status === 'error' && account.lastError && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-400 font-semibold">Verbindungsfehler</p>
              <p className="text-xs text-red-400/80 mt-1">{account.lastError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Last Sync Info */}
      {account.lastSyncAt && (
        <div className="mt-4 text-xs text-gray-500">
          Zuletzt synchronisiert: {new Date(account.lastSyncAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

// Account Details Modal
const AccountDetailsModal = ({ account, productConfig, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${productConfig.color} rounded-xl flex items-center justify-center text-white`}>
              {productConfig.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {account.accountName}
              </h2>
              <p className="text-gray-400">{account.productName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">API Calls (30 Tage)</span>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {(account.stats?.apiCalls || 0).toLocaleString()}
            </p>
            <p className="text-xs text-green-400 mt-2">+12.5% vs. letzten Monat</p>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Tokens Verbraucht</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {(account.stats?.tokensUsed || 0).toLocaleString()}
            </p>
            <p className="text-xs text-green-400 mt-2">+8.2% vs. letzten Monat</p>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Gesamtkosten</span>
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              €{(account.stats?.totalCost || 0).toFixed(2)}
            </p>
            <p className="text-xs text-red-400 mt-2">+15.3% vs. letzten Monat</p>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Durchschn. Latenz</span>
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {account.stats?.avgLatency || 0}ms
            </p>
            <p className="text-xs text-green-400 mt-2">-5ms vs. letzten Monat</p>
          </div>
        </div>

        {/* Usage Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-400" />
            Nutzung letzte 7 Tage
          </h3>
          <div className="glass-effect rounded-lg p-6">
            <div className="h-48 flex items-end justify-between space-x-2">
              {[65, 78, 52, 90, 71, 85, 95].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-primary-500 to-purple-500 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${value}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="glass-effect rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Account Informationen</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Account ID:</span>
              <span className="text-white font-mono text-sm">{account.accountId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Verbunden seit:</span>
              <span className="text-white">{new Date(account.connectedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Letzter Sync:</span>
              <span className="text-white">
                {account.lastSyncAt ? new Date(account.lastSyncAt).toLocaleString() : 'Noch nicht synchronisiert'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-semibold">✓ Aktiv</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Schließen
          </button>
          <Link
            to={`/products/${account.productId}`}
            className="flex-1 btn-primary inline-flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Zum Produkt</span>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ManageAccounts;