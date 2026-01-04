import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Link2, Loader } from 'lucide-react';
import api from '../utils/api';

const CreateApiKeyModal = ({ isOpen, onClose, onSuccess, services, connectedAccounts }) => {
  const [formData, setFormData] = useState({
    name: '',
    serviceId: '',
    rateLimit: 1000,
    expiresInDays: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [debug, setDebug] = useState(false);

  // Debug: Log props
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened with:', {
        services: services,
        servicesIsArray: Array.isArray(services),
        connectedAccounts: connectedAccounts,
        accountsIsArray: Array.isArray(connectedAccounts)
      });
    }
  }, [isOpen, services, connectedAccounts]);

  // Ensure services and connectedAccounts are arrays
  const safeServices = Array.isArray(services) ? services : [];
  const safeConnectedAccounts = Array.isArray(connectedAccounts) ? connectedAccounts : [];

  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setFormData({ ...formData, serviceId });
    setSelectedService(service);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.serviceId) {
      setError('Bitte wähle einen Service aus');
      return;
    }

    if (!formData.name || formData.name.trim() === '') {
      setError('Bitte gib einen Namen für den API Key ein');
      return;
    }

    // Check if account is connected
    const isConnected = safeConnectedAccounts.some(
      acc => acc.service_id === formData.serviceId && acc.status === 'active'
    );

    if (!isConnected) {
      setError(`Du musst zuerst deinen ${selectedService?.display_name || 'Account'} verbinden`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api-keys', formData);
      onSuccess(response.data);
      handleClose();
    } catch (err) {
      console.error('Error creating API key:', err);
      const errorMessage = err.response?.data?.message || 'Fehler beim Erstellen des API Keys';
      setError(errorMessage);

      // Check if reconnection is required
      if (err.response?.data?.requiresReconnection) {
        // Could show a reconnection prompt here
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      serviceId: '',
      rateLimit: 1000,
      expiresInDays: ''
    });
    setSelectedService(null);
    setError('');
    onClose();
  };

  const getServiceIcon = (serviceName) => {
    const icons = {
      'framespell': '✨',
      'corechain-api': '🔗',
      'corechain-ai': '🧠',
      'spherenet': '🌐',
      'spherehub': '🏠'
    };
    return icons[serviceName] || '🔑';
  };

  if (!isOpen) return null;

  // Handle loading state or invalid data
  if (!services || !connectedAccounts || !Array.isArray(services) || !Array.isArray(connectedAccounts)) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center p-8">
          <Loader className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-white">Lädt Services...</p>
          <p className="text-sm text-gray-400 mt-2">Falls dies zu lange dauert, lade die Seite neu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={handleClose}>
      <div className="card max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Neuen API Key erstellen</h3>
            <p className="text-sm text-gray-400 mt-1">Erstelle einen API Key für deine verbundenen Services</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            title="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Debug Toggle (nur in Development) */}
        {process.env.NODE_ENV === 'development' && (
          <button 
            onClick={() => setDebug(!debug)} 
            className="text-xs text-gray-600 hover:text-gray-400 mb-4"
          >
            {debug ? 'Hide' : 'Show'} Debug Info
          </button>
        )}

        {/* Debug Info */}
        {debug && (
          <div className="mb-4 p-4 bg-gray-900/50 rounded text-xs text-gray-400 font-mono">
            <div>Services: {safeServices.length}</div>
            <div>Connected: {safeConnectedAccounts.length}</div>
            <div>Services: {JSON.stringify(safeServices.map(s => ({id: s.id, name: s.name})))}</div>
            <div>Accounts: {JSON.stringify(safeConnectedAccounts.map(a => ({service_id: a.service_id, status: a.status})))}</div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 text-sm">{error}</p>
              {error.includes('verbinden') && (
                <a 
                  href="/dashboard/connect-accounts" 
                  className="text-red-300 hover:text-red-200 text-sm underline mt-2 inline-block"
                >
                  Jetzt Account verbinden →
                </a>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Service Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-3">
              Service auswählen *
            </label>
            
            {safeServices.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-lg">
                <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Keine Services verfügbar</p>
                <p className="text-sm text-gray-500">Services werden geladen...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {safeServices.map((service) => {
                  const isConnected = safeConnectedAccounts.some(
                    acc => acc.service_id === service.id && acc.status === 'active'
                  );
                  const isSelected = formData.serviceId === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => isConnected && handleServiceSelect(service.id)}
                      disabled={!isConnected}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary-500 bg-primary-500/20 scale-105'
                          : isConnected
                          ? 'border-white/10 hover:border-primary-500/50 bg-white/5 hover:scale-102'
                          : 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{getServiceIcon(service.name)}</span>
                        {isConnected ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Link2 className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <h4 className="text-white font-semibold mb-1 text-sm">{service.display_name}</h4>
                      <p className="text-xs text-gray-400">
                        {isConnected ? '✓ Verbunden' : '✗ Nicht verbunden'}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {safeConnectedAccounts.length === 0 && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-400 mb-2">
                  ⚠️ Du hast noch keine Services verbunden.
                </p>
                <a 
                  href="/dashboard/connect-accounts" 
                  className="text-sm text-yellow-300 hover:text-yellow-200 underline"
                >
                  Jetzt Services verbinden →
                </a>
              </div>
            )}
          </div>

          {/* API Key Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Key Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="z.B. Production API, Development Key"
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Wähle einen beschreibenden Namen für diesen API Key
            </p>
          </div>

          {/* Rate Limit */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Rate Limit (Anfragen/Minute)
            </label>
            <input
              type="number"
              value={formData.rateLimit}
              onChange={(e) => setFormData({ ...formData, rateLimit: parseInt(e.target.value) || 1000 })}
              min="1"
              max="10000"
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximale Anzahl an API-Anfragen pro Minute
            </p>
          </div>

          {/* Expiration */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Ablaufdatum (Optional)
            </label>
            <select
              value={formData.expiresInDays}
              onChange={(e) => setFormData({ ...formData, expiresInDays: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
              disabled={loading}
            >
              <option value="">Kein Ablaufdatum</option>
              <option value="30">30 Tage</option>
              <option value="90">90 Tage</option>
              <option value="180">180 Tage</option>
              <option value="365">365 Tage</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Der Key wird automatisch nach dieser Zeit deaktiviert
            </p>
          </div>

          {/* Info Box */}
          {selectedService && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                Wichtige Information
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Der Key wird sowohl in FrameSphere als auch in {selectedService.display_name} erstellt</li>
                <li>• Du erhältst zwei Keys: einen FrameSphere Key und einen {selectedService.display_name} Key</li>
                <li>• Beide Keys sind miteinander verknüpft und synchronisiert</li>
                <li>• Das Löschen hier löscht auch den Key bei {selectedService.display_name}</li>
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 glass-effect hover:bg-white/10 text-white font-semibold rounded-lg transition-all"
              disabled={loading}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary inline-flex items-center justify-center space-x-2"
              disabled={loading || !formData.serviceId || !formData.name}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Erstelle...</span>
                </>
              ) : (
                <span>API Key erstellen</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApiKeyModal;
