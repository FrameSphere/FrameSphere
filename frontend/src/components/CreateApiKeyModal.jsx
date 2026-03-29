import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Link2, Loader, Key, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const serviceIcons = {
  'framespell': '✨',
  'ratelimit-api': '🛡️',
  'frametrain': '🧠',
  'corechain-api': '🔗',
  'keyword-engine': '🔍',
  'website-manager': '🌐',
  'spherehub': '🏠',
  'spherenet': '🌐',
};

const CreateApiKeyModal = ({ isOpen, onClose, onSuccess, services, connectedAccounts }) => {
  const [formData, setFormData] = useState({ name: '', serviceId: '', rateLimit: 1000, expiresInDays: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const safeServices = Array.isArray(services) ? services : [];
  const safeAccounts = Array.isArray(connectedAccounts) ? connectedAccounts : [];

  const isServiceConnected = (serviceId) =>
    safeAccounts.some(acc => acc.service_id === serviceId && acc.status === 'active');

  const handleServiceSelect = (serviceId) => {
    const service = safeServices.find(s => s.id === serviceId);
    if (!isServiceConnected(serviceId)) return;
    setFormData({ ...formData, serviceId });
    setSelectedService(service);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.serviceId) { setError('Bitte wähle einen Service aus.'); return; }
    if (!formData.name.trim()) { setError('Bitte gib einen Namen ein.'); return; }
    setLoading(true);
    try {
      const response = await api.post('/api-keys', formData);
      onSuccess(response.data);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Fehler beim Erstellen des API Keys.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', serviceId: '', rateLimit: 1000, expiresInDays: '' });
    setSelectedService(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const connectedServices = safeServices.filter(s => isServiceConnected(s.id));
  const notConnectedServices = safeServices.filter(s => !isServiceConnected(s.id));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={handleClose}>
      <div className="card max-w-xl w-full my-8" onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Neuen API Key erstellen</h3>
            <p className="text-sm text-gray-400 mt-0.5">Erstelle einen Key für deine verbundenen Services</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 text-sm">{error}</p>
              {error.includes('verbinden') && (
                <Link to="/dashboard/connect-accounts" className="text-red-300 hover:text-red-200 text-xs underline mt-1 inline-block" onClick={handleClose}>
                  → Account verbinden
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Service Auswahl */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-white mb-3">Service auswählen *</label>

            {safeAccounts.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-white/10 rounded-xl">
                <Link2 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 mb-1">Noch kein Account verbunden</p>
                <Link to="/dashboard/connect-accounts" onClick={handleClose}
                  className="text-sm text-primary-400 hover:text-primary-300 inline-flex items-center space-x-1 transition-colors">
                  <span>Account verbinden</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <>
                {connectedServices.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {connectedServices.map((service) => {
                      const isSelected = formData.serviceId === service.id;
                      return (
                        <button key={service.id} type="button" onClick={() => handleServiceSelect(service.id)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${isSelected ? 'border-primary-500 bg-primary-500/20' : 'border-white/10 bg-white/5 hover:border-primary-500/50'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{serviceIcons[service.name] || '🔑'}</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="text-white text-sm font-medium">{service.display_name}</div>
                          <div className="text-xs text-green-400">Verbunden</div>
                        </button>
                      );
                    })}
                  </div>
                )}
                {notConnectedServices.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 opacity-50">
                    {notConnectedServices.map((service) => (
                      <div key={service.id} className="p-3 rounded-lg border-2 border-white/5 bg-white/5 cursor-not-allowed">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl">{serviceIcons[service.name] || '🔑'}</span>
                          <Link2 className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="text-white text-sm font-medium">{service.display_name}</div>
                        <div className="text-xs text-gray-500">Nicht verbunden</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Key Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2 flex items-center">
              <Key className="w-4 h-4 mr-2 text-primary-400" />Key Name *
            </label>
            <input type="text" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="z.B. Production API, Development Key"
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              required />
          </div>

          {/* Rate Limit */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">Rate Limit (Anfragen/Min)</label>
            <input type="number" value={formData.rateLimit}
              onChange={(e) => setFormData({ ...formData, rateLimit: parseInt(e.target.value) || 1000 })}
              min="1" max="10000"
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" />
          </div>

          {/* Ablauf */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">Ablaufdatum (Optional)</label>
            <select value={formData.expiresInDays}
              onChange={(e) => setFormData({ ...formData, expiresInDays: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
              <option value="">Kein Ablaufdatum</option>
              <option value="30">30 Tage</option>
              <option value="90">90 Tage</option>
              <option value="180">180 Tage</option>
              <option value="365">365 Tage</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button type="button" onClick={handleClose} className="flex-1 btn-secondary" disabled={loading}>Abbrechen</button>
            <button type="submit" className="flex-1 btn-primary inline-flex items-center justify-center space-x-2"
              disabled={loading || !formData.serviceId || !formData.name}>
              {loading ? <><Loader className="w-4 h-4 animate-spin" /><span>Erstelle...</span></> : <span>API Key erstellen</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApiKeyModal;
