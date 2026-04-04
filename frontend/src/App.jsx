import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Core Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ConnectAccounts from './pages/dashboard/ConnectAccounts';
import ManageAccounts from './pages/dashboard/ManageAccounts';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Billing from './pages/Billing';

// API Produkte
import FrameSpell from './pages/FrameSpell';
import RateLimitAPI from './pages/RateLimitAPI';
import FrameTrain from './pages/FrameTrain';
import CoreChainAPI from './pages/CoreChainAPI';
import SphereHub from './pages/SphereHub';
import SphereNet from './pages/SphereNet';
import KeywordEngine from './pages/KeywordEngine';
import WebsiteManager from './pages/WebsiteManager';

// Web Apps
import WebApps from './pages/WebApps';
import Wordify from './pages/webapps/Wordify';
import FlagGuess from './pages/webapps/FlagGuess';
import BrawlMystery from './pages/webapps/BrawlMystery';
import SpinSelector from './pages/webapps/SpinSelector';
import Traitora from './pages/webapps/Traitora';
import FileFlyr from './pages/webapps/FileFlyr';

// Developer Hub
import DeveloperHub from './pages/DeveloperHub';
import APIDocs from './pages/APIDocs';
import Quickstart from './pages/Quickstart';
import SDKs from './pages/SDKs';
import Tutorials from './pages/Tutorials';
import Status from './pages/Status';

// FrameSpell Tutorials
import TutorialFrameSpellReact from './pages/tutorials/FrameSpellReact';
import TutorialLiveKorrektur from './pages/tutorials/FrameSpellLiveKorrektur';
import TutorialBatch from './pages/tutorials/FrameSpellBatch';
import TutorialCMS from './pages/tutorials/FrameSpellCMS';

// KeyScope Tutorials
import KeyScopeQuickstart from './pages/tutorials/KeyScopeQuickstart';
import KeyScopeApi from './pages/tutorials/KeyScopeApi';
import KeyScopeProfiles from './pages/tutorials/KeyScopeProfiles';

// SiteControl Tutorials
import SiteControlQuickstart from './pages/tutorials/SiteControlQuickstart';
import SiteControlTracking from './pages/tutorials/SiteControlTracking';
import SiteControlApi from './pages/tutorials/SiteControlApi';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500" />
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen pt-32 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <div className="card">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-gray-400 mb-6">Diese Seite ist in Entwicklung und wird bald verfügbar sein.</p>
        <a href="/" className="btn-primary inline-block">Zurück zur Startseite</a>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen pt-32 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <div className="card">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-2xl text-white mb-2">Seite nicht gefunden</p>
        <p className="text-gray-400 mb-8">Die von dir gesuchte Seite existiert nicht.</p>
        <a href="/" className="btn-primary inline-block">Zurück zur Startseite</a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-900">
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/connect-accounts" element={<ProtectedRoute><ConnectAccounts /></ProtectedRoute>} />
            <Route path="/dashboard/manage-accounts" element={<ProtectedRoute><ManageAccounts /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />

            {/* API Produkte */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/framespell" element={<FrameSpell />} />
            <Route path="/products/ratelimit-api" element={<RateLimitAPI />} />
            <Route path="/products/frametrain" element={<FrameTrain />} />
            <Route path="/products/corechain-api" element={<CoreChainAPI />} />
            <Route path="/products/spherehub" element={<SphereHub />} />
            <Route path="/products/spherenet" element={<SphereNet />} />
            <Route path="/products/keyword-engine" element={<KeywordEngine />} />
            <Route path="/products/website-manager" element={<WebsiteManager />} />

            {/* Web Apps */}
            <Route path="/webapps" element={<WebApps />} />
            <Route path="/webapps/wordify" element={<Wordify />} />
            <Route path="/webapps/flagguess" element={<FlagGuess />} />
            <Route path="/webapps/brawlmystery" element={<BrawlMystery />} />
            <Route path="/webapps/spinselector" element={<SpinSelector />} />
            <Route path="/webapps/traitora" element={<Traitora />} />
            <Route path="/webapps/fileflyr" element={<FileFlyr />} />

            {/* Info */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Developer Hub */}
            <Route path="/developers" element={<DeveloperHub />} />
            <Route path="/developers/docs" element={<APIDocs />} />
            <Route path="/developers/quickstart" element={<Quickstart />} />
            <Route path="/developers/sdks" element={<SDKs />} />
            <Route path="/developers/tutorials" element={<Tutorials />} />
            <Route path="/developers/status" element={<Status />} />

            {/* FrameSpell Tutorials */}
            <Route path="/developers/tutorials/framespell-in-react" element={<TutorialFrameSpellReact />} />
            <Route path="/developers/tutorials/framespell-live-korrektur" element={<TutorialLiveKorrektur />} />
            <Route path="/developers/tutorials/framespell-batch" element={<TutorialBatch />} />
            <Route path="/developers/tutorials/framespell-cms" element={<TutorialCMS />} />

            {/* KeyScope Tutorials */}
            <Route path="/developers/tutorials/keyscope-quickstart" element={<KeyScopeQuickstart />} />
            <Route path="/developers/tutorials/keyscope-api" element={<KeyScopeApi />} />
            <Route path="/developers/tutorials/keyscope-profiles" element={<KeyScopeProfiles />} />

            {/* SiteControl Tutorials */}
            <Route path="/developers/tutorials/sitecontrol-quickstart" element={<SiteControlQuickstart />} />
            <Route path="/developers/tutorials/sitecontrol-tracking" element={<SiteControlTracking />} />
            <Route path="/developers/tutorials/sitecontrol-api" element={<SiteControlApi />} />

            {/* Legal */}
            <Route path="/legal/imprint" element={<PlaceholderPage title="Impressum" />} />
            <Route path="/legal/privacy" element={<PlaceholderPage title="Datenschutz" />} />
            <Route path="/legal/terms" element={<PlaceholderPage title="AGB" />} />
            <Route path="/legal/cookies" element={<PlaceholderPage title="Cookies" />} />
            <Route path="/blog" element={<PlaceholderPage title="Blog" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
