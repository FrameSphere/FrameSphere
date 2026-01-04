import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Activity,
  TrendingUp,
  Zap,
  Server,
  Globe,
  Database,
  Shield,
  RefreshCw
} from 'lucide-react';

const Status = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'degraded':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'partial':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'down':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5" />;
      case 'degraded':
      case 'partial':
        return <AlertCircle className="w-5 h-5" />;
      case 'down':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'partial':
        return 'Partial Outage';
      case 'down':
        return 'Major Outage';
      default:
        return 'Unknown';
    }
  };

  // Overall System Status
  const overallStatus = {
    status: 'operational',
    message: 'All systems operational'
  };

  // API Services Status
  const services = [
    {
      name: 'FrameSpell API',
      icon: <Zap className="w-5 h-5" />,
      status: 'operational',
      uptime: '99.98%',
      responseTime: '43ms',
      lastIncident: null
    },
    {
      name: 'CoreChain API',
      icon: <Activity className="w-5 h-5" />,
      status: 'operational',
      uptime: '99.95%',
      responseTime: '127ms',
      lastIncident: null
    },
    {
      name: 'SphereNet',
      icon: <Globe className="w-5 h-5" />,
      status: 'operational',
      uptime: '99.99%',
      responseTime: '89ms',
      lastIncident: null
    },
    {
      name: 'Authentication Service',
      icon: <Shield className="w-5 h-5" />,
      status: 'operational',
      uptime: '99.99%',
      responseTime: '21ms',
      lastIncident: null
    },
    {
      name: 'Dashboard & Portal',
      icon: <Server className="w-5 h-5" />,
      status: 'operational',
      uptime: '99.97%',
      responseTime: '156ms',
      lastIncident: null
    },
    {
      name: 'Database',
      icon: <Database className="w-5 h-5" />,
      status: 'operational',
      uptime: '100%',
      responseTime: '12ms',
      lastIncident: null
    }
  ];

  // Uptime Data (Last 90 days)
  const generateUptimeData = () => {
    const data = [];
    for (let i = 89; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      // Simulate uptime (mostly operational)
      const status = Math.random() > 0.98 ? (Math.random() > 0.5 ? 'degraded' : 'down') : 'operational';
      data.push({
        date: date.toISOString().split('T')[0],
        status: status,
        uptime: status === 'operational' ? 100 : (status === 'degraded' ? 95 : 85)
      });
    }
    return data;
  };

  const uptimeData = generateUptimeData();

  // Recent Incidents
  const incidents = [
    {
      id: 1,
      title: 'Erhöhte API Latenz in EU-West Region',
      status: 'resolved',
      severity: 'minor',
      date: '2024-12-15',
      duration: '23 Minuten',
      affected: ['FrameSpell API'],
      description: 'Kurzfristig erhöhte Latenz aufgrund von Netzwerk-Routing-Problemen. Alle Services sind wieder normal.'
    },
    {
      id: 2,
      title: 'Geplante Wartung: Database Migration',
      status: 'completed',
      severity: 'maintenance',
      date: '2024-12-10',
      duration: '2 Stunden',
      affected: ['Alle Services'],
      description: 'Erfolgreiche Migration zu neuer Database-Infrastruktur. Performance-Verbesserungen von 30%.'
    },
    {
      id: 3,
      title: 'CoreChain API Partial Outage',
      status: 'resolved',
      severity: 'major',
      date: '2024-11-28',
      duration: '1 Stunde 15 Minuten',
      affected: ['CoreChain API'],
      description: 'Temporärer Ausfall durch überlasteten Load Balancer. Automatische Skalierung wurde angepasst.'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'major':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical':
        return 'bg-red-600/20 text-red-300 border-red-600/30';
      case 'maintenance':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Performance Metrics
  const metrics = [
    { label: 'Avg. Response Time', value: '68ms', trend: '+5%', icon: <Zap className="w-5 h-5" /> },
    { label: '30-Day Uptime', value: '99.97%', trend: '+0.02%', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Total API Calls', value: '127M', trend: '+12%', icon: <Activity className="w-5 h-5" /> },
    { label: 'Active Endpoints', value: '18', trend: '0%', icon: <Server className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/developers" className="hover:text-white transition-colors">Developer Hub</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">System Status</span>
          </div>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                <span className="gradient-text">System Status</span>
              </h1>
              <p className="text-xl text-gray-400">
                Echtzeit-Übersicht der FrameSphere Infrastruktur
              </p>
            </div>
            
            <button
              onClick={() => setLastUpdate(new Date())}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Aktualisieren</span>
            </button>
          </div>

          {/* Last Update Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Letzte Aktualisierung: {lastUpdate.toLocaleTimeString('de-DE')}</span>
            <label className="flex items-center ml-4 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              <span>Auto-Refresh</span>
            </label>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className={`card border-2 ${getStatusColor(overallStatus.status)}`}>
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(overallStatus.status)}`}>
                {getStatusIcon(overallStatus.status)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {getStatusLabel(overallStatus.status)}
                </h2>
                <p className="text-gray-400">{overallStatus.message}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400">
                    {metric.icon}
                  </div>
                  <div className={`text-sm font-semibold ${
                    metric.trend.startsWith('+') ? 'text-green-400' : 
                    metric.trend.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">API Services</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{service.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(service.status)}`}>
                          {getStatusLabel(service.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <span>Uptime: <span className="text-green-400 font-semibold">{service.uptime}</span></span>
                        <span>Response: <span className="text-blue-400 font-semibold">{service.responseTime}</span></span>
                        {service.lastIncident && (
                          <span>Last Incident: <span className="text-yellow-400">{service.lastIncident}</span></span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-500' :
                    service.status === 'degraded' ? 'bg-yellow-500' :
                    service.status === 'partial' ? 'bg-orange-500' : 'bg-red-500'
                  } animate-pulse`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime History */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">90-Day Uptime History</h2>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">Letzte 90 Tage</div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-400">Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-400">Degraded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">Down</span>
                </div>
              </div>
            </div>
            
            {/* Uptime Bar Chart */}
            <div className="flex items-end space-x-1 h-24">
              {uptimeData.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 group relative cursor-pointer"
                  style={{ height: `${day.uptime}%` }}
                >
                  <div className={`h-full rounded-sm transition-all ${
                    day.status === 'operational' ? 'bg-green-500 hover:bg-green-400' :
                    day.status === 'degraded' ? 'bg-yellow-500 hover:bg-yellow-400' :
                    'bg-red-500 hover:bg-red-400'
                  }`}></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="glass-effect rounded-lg p-3 text-xs whitespace-nowrap">
                      <div className="text-white font-semibold mb-1">{new Date(day.date).toLocaleDateString('de-DE')}</div>
                      <div className="text-gray-400">Uptime: {day.uptime}%</div>
                      <div className="text-gray-400">Status: {getStatusLabel(day.status)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{uptimeData[0]?.date}</span>
              <span>Heute</span>
            </div>
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Incident History</h2>
          
          {incidents.length === 0 ? (
            <div className="card text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-xl text-gray-400">Keine Incidents in den letzten 90 Tagen</p>
            </div>
          ) : (
            <div className="space-y-6">
              {incidents.map((incident) => (
                <div key={incident.id} className="card">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${getSeverityColor(incident.severity)}`}>
                      {incident.status === 'resolved' || incident.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <AlertCircle className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{incident.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span>{incident.date}</span>
                            <span>•</span>
                            <span>Duration: {incident.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            incident.status === 'resolved' || incident.status === 'completed'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {incident.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-3">{incident.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500">Betroffene Services:</span>
                        {incident.affected.map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="px-4 py-12 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-5xl mx-auto">
          <div className="card text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <Activity className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bleib auf dem Laufenden
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Abonniere Status-Updates und erhalte Benachrichtigungen bei Incidents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="deine@email.de"
                className="flex-1 px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              <button className="btn-primary">
                Abonnieren
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Status;
