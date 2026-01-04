import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ConnectAccounts from './pages/dashboard/ConnectAccounts';
import ManageAccounts from './pages/dashboard/ManageAccounts';
import Products from './pages/Products';
import FrameSpell from './pages/FrameSpell';
import CoreChainAI from './pages/CoreChainAI';
import CoreChainAPI from './pages/CoreChainAPI';
import SphereHub from './pages/SphereHub';
import SphereNet from './pages/SphereNet';
import Pricing from './pages/Pricing';
import About from './pages/About';
import DeveloperHub from './pages/DeveloperHub';
import APIDocs from './pages/APIDocs';
import Quickstart from './pages/Quickstart';
import SDKs from './pages/SDKs';
import Tutorials from './pages/Tutorials';
import Status from './pages/Status';
import Contact from './pages/Contact';
import Billing from './pages/Billing';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-900">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/connect-accounts"
              element={
                <ProtectedRoute>
                  <ConnectAccounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/manage-accounts"
              element={
                <ProtectedRoute>
                  <ManageAccounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              }
            />

            {/* Product Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/framespell" element={<FrameSpell />} />
            <Route path="/products/corechain-ai" element={<CoreChainAI />} />
            <Route path="/products/corechain-api" element={<CoreChainAPI />} />
            <Route path="/products/spherehub" element={<SphereHub />} />
            <Route path="/products/spherenet" element={<SphereNet />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/developers" element={<DeveloperHub />} />
            <Route path="/developers/docs" element={<APIDocs />} />
            <Route path="/developers/quickstart" element={<Quickstart />} />
            <Route path="/developers/sdks" element={<SDKs />} />
            <Route path="/developers/status" element={<Status />} />
            <Route path="/developers/tutorials" element={<Tutorials />} />
            <Route path="/about" element={<PlaceholderPage title="Über uns" />} />
            <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/imprint" element={<PlaceholderPage title="Impressum" />} />
            <Route path="/legal/privacy" element={<PlaceholderPage title="Datenschutz" />} />
            <Route path="/legal/terms" element={<PlaceholderPage title="AGB" />} />
            <Route path="/legal/cookies" element={<PlaceholderPage title="Cookies" />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

// Placeholder component for unimplemented pages
const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="card">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-400 mb-6">
            Diese Seite ist in Entwicklung und wird bald verfügbar sein.
          </p>
          <a href="/" className="btn-primary inline-block">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="card">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <p className="text-2xl text-white mb-2">Seite nicht gefunden</p>
          <p className="text-gray-400 mb-8">
            Die von dir gesuchte Seite existiert nicht.
          </p>
          <a href="/" className="btn-primary inline-block">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
