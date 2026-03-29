import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, AlertCircle, Trash2, RefreshCw, Link2, ExternalLink } from 'lucide-react';
import api from '../../utils/api';

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => { fetchAccounts(); }, []);

  const fetchAccounts = async () => {
    try {
      const res = await api.get('/connected-accounts');
      setAccounts(res.data || []);
    } catch (e) {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Accounts.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (accountId, name) => {
    if (!window.confirm(`Möchtest du "${name}" wirklich trennen?`)) return;
    try {
      await api.delete(`/connected-accounts/${accountId}`);
      setMessage({ type: 'success', text: `Account "${name}" erfolgreich getrennt.` });
      fetchAccounts();
    } catch (e) {
      setMessage({ type: 'error', text: 'Fehler beim Trennen des Accounts.' });
    }
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white">Accounts verwalten</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Verbundene Accounts</h1>
            <p className="text-gray-400">Verwalte deine verbundenen FrameSphere-Produkt-Accounts.</p>
          </div>
          <Link to="/dashboard/connect-accounts" className="btn-primary inline-flex items-center space-x-2 text-sm">
            <Link2 className="w-4 h-4" />
            <span>Account hinzufügen</span>
          </Link>
        </div>

        {message && (
          <div className={`card mb-5 flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            {message.type === 'success'
              ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              : <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
            <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-10 h-10 text-gray-500 mx-auto mb-3 animate-spin" />
            <p className="text-gray-400">Lade Accounts...</p>
          </div>
        ) : accounts.length === 0 ? (
          <div className="card text-center py-16">
            <Link2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Noch keine Accounts verbunden</h3>
            <p className="text-gray-400 mb-6">Verbinde deine FrameSphere-Produkte für zentrale Verwaltung.</p>
            <Link to="/dashboard/connect-accounts" className="btn-primary inline-flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              <span>Ersten Account verbinden</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <Link2 className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold">{account.account_name || account.service_name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded border ${account.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {account.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{account.service_name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">Verbunden: {new Date(account.created_at).toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDisconnect(account.id, account.account_name || account.service_name)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Account trennen">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccounts;
