import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  DollarSign,
  Zap,
  Package,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  TrendingUp,
  Shield,
  AlertCircle,
  Wallet,
  History,
  Download,
  ChevronRight,
  Star,
  Crown,
  Users,
  Gift,
  Building2,
  Bitcoin,
  Gem
} from 'lucide-react';

const Billing = () => {
  const [selectedTab, setSelectedTab] = useState('balance'); // balance, subscriptions, history
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Current Balance & Usage
  const currentBalance = 25.50;
  const currentTokens = 1250;
  const monthlySpending = 45.80;

  // Balance Top-up Options
  const balanceOptions = [
    { amount: 10, bonus: 0, popular: false },
    { amount: 25, bonus: 2, popular: false },
    { amount: 50, bonus: 5, popular: true },
    { amount: 100, bonus: 15, popular: false },
    { amount: 250, bonus: 50, popular: false },
    { amount: 500, bonus: 125, popular: false }
  ];

  // Token Packages (CoreChain AI)
  const tokenPackages = [
    { tokens: 500, price: 2.99, bonus: 0 },
    { tokens: 1200, price: 5.99, bonus: 100 },
    { tokens: 2500, price: 9.99, bonus: 300, popular: true },
    { tokens: 5000, price: 19.99, bonus: 750 }
  ];

  // Subscription Plans
  const subscriptions = [
    {
      id: 'premium-features',
      name: 'Premium-Funktionen',
      description: 'Erweiterte KI-Funktionen & unbegrenzte Chats',
      price: 9.99,
      period: 'Monat',
      trial: '7 Tage kostenlos',
      features: ['Erweiterte AI-Features', 'Unbegrenzte Chats', 'Prioritäts-Support', 'Erweiterte Analysen'],
      icon: <Crown className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      active: false
    },
    {
      id: 'extended-analytics',
      name: 'Erweiterte Analysen',
      description: 'Umfassende Statistiken & Export-Funktionen',
      price: 14.99,
      period: 'Monat',
      trial: '14 Tage kostenlos',
      features: ['Nutzungstrends', 'Custom Reports', 'CSV/PDF Export', 'API Analytics'],
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      active: false
    },
    {
      id: 'team-collaboration',
      name: 'Team-Zusammenarbeit',
      description: 'Gemeinsame Workspaces & Rechteverwaltung',
      price: 19.99,
      period: 'Monat',
      trial: '30 Tage kostenlos',
      features: ['Gemeinsame Workspaces', 'Team-Management', 'Rechteverwaltung', 'Audit Logs'],
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      active: true
    }
  ];

  // Payment Methods with proper icons for integration
  const paymentMethods = [
    { 
      id: 'card', 
      name: 'Kreditkarte', 
      icon: <CreditCard className="w-5 h-5" />, 
      available: true,
      providers: ['Stripe', 'Visa', 'Mastercard', 'Amex']
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: <Wallet className="w-5 h-5" />, 
      available: true,
      providers: ['PayPal']
    },
    { 
      id: 'sepa', 
      name: 'SEPA Lastschrift', 
      icon: <Building2 className="w-5 h-5" />, 
      available: true,
      providers: ['SEPA']
    },
    { 
      id: 'crypto', 
      name: 'Kryptowährung', 
      icon: <Bitcoin className="w-5 h-5" />, 
      available: false,
      providers: ['Bitcoin', 'Ethereum']
    }
  ];

  // Transaction History
  const transactions = [
    { id: 1, date: '2024-12-28', type: 'top-up', amount: 50.00, status: 'completed', description: 'Guthaben aufgeladen' },
    { id: 2, date: '2024-12-25', type: 'subscription', amount: 19.99, status: 'completed', description: 'Team-Zusammenarbeit Abo' },
    { id: 3, date: '2024-12-20', type: 'tokens', amount: 9.99, status: 'completed', description: '2500 Tokens gekauft' },
    { id: 4, date: '2024-12-15', type: 'usage', amount: -15.50, status: 'completed', description: 'API Nutzung' },
    { id: 5, date: '2024-12-10', type: 'top-up', amount: 25.00, status: 'completed', description: 'Guthaben aufgeladen' }
  ];

  const handleTopUp = (amount) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    // TODO: Implement actual payment processing
    // This is where you would integrate Stripe, PayPal, etc.
    
    try {
      // Example structure for Stripe integration:
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     amount: selectedAmount * 100, // Amount in cents
      //     currency: 'eur',
      //     payment_method: paymentMethod
      //   })
      // });
      
      // For PayPal:
      // if (paymentMethod === 'paypal') {
      //   window.location.href = `/api/paypal/checkout?amount=${selectedAmount}`;
      // }
      
      // For now, simulate payment
      alert(`Zahlung von €${selectedAmount} wird verarbeitet...`);
      setShowPaymentModal(false);
      
      // After successful payment, you would:
      // 1. Update user balance in database
      // 2. Create transaction record
      // 3. Send confirmation email
      // 4. Show success message
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Zahlung fehlgeschlagen. Bitte versuche es erneut.');
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'top-up':
        return <Plus className="w-5 h-5 text-green-400" />;
      case 'subscription':
        return <Star className="w-5 h-5 text-purple-400" />;
      case 'tokens':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'usage':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white">Abrechnung & Guthaben</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Abrechnung & Guthaben
          </h1>
          <p className="text-gray-400 text-lg">
            Verwalte dein Guthaben, Abonnements und Zahlungen
          </p>
        </div>

        {/* Current Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-400" />
              </div>
              <button className="text-sm text-green-400 hover:text-green-300 font-semibold">
                Aufladen
              </button>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Aktuelles Guthaben</h3>
            <p className="text-3xl font-bold text-white mb-1">€{currentBalance.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Zuletzt aufgeladen: 28.12.2024</p>
          </div>

          <div className="card bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <button className="text-sm text-yellow-400 hover:text-yellow-300 font-semibold">
                Kaufen
              </button>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">CoreChain Tokens</h3>
            <p className="text-3xl font-bold text-white mb-1">{currentTokens.toLocaleString()}</p>
            <p className="text-xs text-gray-500">~50 Anfragen verfügbar</p>
          </div>

          <div className="card bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Ausgaben diesen Monat</h3>
            <p className="text-3xl font-bold text-white mb-1">€{monthlySpending.toFixed(2)}</p>
            <p className="text-xs text-green-400">↓ 12% vs. letzten Monat</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setSelectedTab('balance')}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedTab === 'balance'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Guthaben aufladen
          </button>
          <button
            onClick={() => setSelectedTab('tokens')}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedTab === 'tokens'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Tokens kaufen
          </button>
          <button
            onClick={() => setSelectedTab('subscriptions')}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedTab === 'subscriptions'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Abonnements
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedTab === 'history'
                ? 'text-primary-400 border-b-2 border-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Transaktionen
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* Balance Top-up Tab */}
          {selectedTab === 'balance' && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Guthaben aufladen</h2>
                <p className="text-gray-400">
                  Lade dein Konto auf, um FrameSphere Services ohne Unterbrechung nutzen zu können
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {balanceOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopUp(option.amount + option.bonus)}
                    className={`card text-left hover:scale-105 transition-all ${
                      option.popular ? 'border-2 border-primary-500 bg-primary-500/5' : ''
                    }`}
                  >
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                          BELIEBT
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl font-bold text-white">€{option.amount}</div>
                      {option.bonus > 0 && (
                        <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                          <Gift className="w-3 h-3" />
                          <span>+€{option.bonus}</span>
                        </div>
                      )}
                    </div>
                    {option.bonus > 0 ? (
                      <p className="text-gray-400 text-sm mb-4">
                        Erhalte €{option.amount + option.bonus} Guthaben
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm mb-4">
                        Guthaben aufladen
                      </p>
                    )}
                    <div className="flex items-center text-primary-400 font-semibold">
                      <span>Jetzt aufladen</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Methods Info */}
              <div className="card mt-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Sichere Zahlung</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Alle Zahlungen werden über sichere, verschlüsselte Verbindungen verarbeitet. 
                      Wir speichern keine Kreditkartendaten.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods.filter(m => m.available).map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-lg text-sm text-gray-300">
                          {typeof method.icon === 'string' ? (
                            <span className="text-lg">{method.icon}</span>
                          ) : (
                            method.icon
                          )}
                          <span>{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tokens Tab */}
          {selectedTab === 'tokens' && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">CoreChain AI Tokens kaufen</h2>
                <p className="text-gray-400">
                  Tokens werden für CoreChain AI Anfragen verwendet. 1 Token = ~1 Anfrage
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {tokenPackages.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopUp(pkg.price)}
                    className={`card text-center hover:scale-105 transition-all ${
                      pkg.popular ? 'border-2 border-yellow-500 bg-yellow-500/5' : ''
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                          BEST VALUE
                        </span>
                      </div>
                    )}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                        <Gem className="w-8 h-8" />
                      </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {pkg.tokens.toLocaleString()}
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="inline-flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        <Plus className="w-3 h-3" />
                        <span>{pkg.bonus} Bonus</span>
                      </div>
                    )}
                    <div className="text-2xl font-bold text-primary-400 mb-4">
                      €{pkg.price.toFixed(2)}
                    </div>
                    <button className="w-full btn-primary">
                      Kaufen
                    </button>
                  </button>
                ))}
              </div>

              {/* Token Info */}
              <div className="card mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Wie funktionieren Tokens?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-primary-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Flexibel nutzen</h4>
                    <p className="text-sm text-gray-400">
                      Verwende Tokens für CoreChain AI Anfragen. Keine Zeitlimits.
                    </p>
                  </div>
                  <div>
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Kein Ablauf</h4>
                    <p className="text-sm text-gray-400">
                      Tokens verfallen nie. Kaufe einmal und nutze sie wann du willst.
                    </p>
                  </div>
                  <div>
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-3">
                      <Gift className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Bonus Tokens</h4>
                    <p className="text-sm text-gray-400">
                      Größere Pakete erhalten automatisch Bonus-Tokens geschenkt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {selectedTab === 'subscriptions' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Abonnements verwalten</h2>
                <p className="text-gray-400">
                  Erweitere dein Konto mit Premium-Features und erweiterten Funktionen
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`card ${
                      sub.active ? 'border-2 border-green-500 bg-green-500/5' : ''
                    }`}
                  >
                    {sub.active && (
                      <div className="absolute -top-3 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          AKTIV
                        </span>
                      </div>
                    )}
                    <div className={`w-14 h-14 bg-gradient-to-br ${sub.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                      {sub.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{sub.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{sub.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-white mb-1">
                        €{sub.price}
                        <span className="text-lg text-gray-400">/{sub.period}</span>
                      </div>
                      {sub.trial && (
                        <div className="text-sm text-green-400 font-semibold">{sub.trial}</div>
                      )}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {sub.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {sub.active ? (
                      <button className="w-full glass-effect hover:bg-white/10 text-white py-3 rounded-lg font-semibold transition-all">
                        Abo verwalten
                      </button>
                    ) : (
                      <button className="w-full btn-primary">
                        {sub.trial ? 'Trial starten' : 'Abonnieren'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transaction History Tab */}
          {selectedTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Transaktionshistorie</h2>
                  <p className="text-gray-400">
                    Übersicht über alle Zahlungen und Abbuchungen
                  </p>
                </div>
                <button className="btn-secondary inline-flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Exportieren</span>
                </button>
              </div>

              <div className="card">
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 glass-effect rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{transaction.description}</h4>
                          <p className="text-sm text-gray-400">
                            {new Date(transaction.date).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          transaction.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {transaction.status === 'completed' ? 'Abgeschlossen' : 'Ausstehend'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-6">
                  <button className="text-primary-400 hover:text-primary-300 font-semibold">
                    Mehr laden
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
            <div className="card max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Zahlung</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <div className="glass-effect rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-400 mb-1">Betrag</div>
                  <div className="text-3xl font-bold text-white">€{selectedAmount?.toFixed(2)}</div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Zahlungsmethode
                  </label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        disabled={!method.available}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                          paymentMethod === method.id
                            ? 'bg-primary-500/20 border-2 border-primary-500'
                            : 'glass-effect hover:bg-white/10'
                        } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          {typeof method.icon === 'string' ? (
                            <span className="text-2xl">{method.icon}</span>
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center">
                              {method.icon}
                            </div>
                          )}
                          <span className="text-white font-medium">{method.name}</span>
                        </div>
                        {paymentMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-primary-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Form (Credit Card) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Karteninhaber
                      </label>
                      <input
                        type="text"
                        placeholder="Max Mustermann"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kartennummer
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ablaufdatum
                        </label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 font-mono"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Info */}
                {paymentMethod === 'paypal' && (
                  <div className="glass-effect rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-4">
                      Du wirst zu PayPal weitergeleitet, um die Zahlung abzuschließen.
                    </p>
                    <div className="text-5xl mb-2">💙</div>
                  </div>
                )}

                {/* SEPA Info */}
                {paymentMethod === 'sepa' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        IBAN
                      </label>
                      <input
                        type="text"
                        placeholder="DE89 3704 0044 0532 0130 00"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kontoinhaber
                      </label>
                      <input
                        type="text"
                        placeholder="Max Mustermann"
                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="glass-effect rounded-lg p-3 text-xs text-gray-400">
                      Mit der Eingabe deiner IBAN erteilst du ein SEPA-Lastschriftmandat.
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full btn-primary py-4 text-lg"
              >
                €{selectedAmount?.toFixed(2)} jetzt bezahlen
              </button>

              {/* Security Note */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>256-bit SSL verschlüsselt</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;