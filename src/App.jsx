import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import TemplateGallery from './components/TemplateGallery';
import PortfolioDashboard from './components/PortfolioDashboard';
import PortfolioEditor from './components/PortfolioEditor';
import FaqSection from './components/FaqSection';
import PublicPortfolioView from './components/PublicPortfolioView';
import AuthModal from './components/AuthModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import ShareModal from './components/ShareModal';
import Toast from './components/Toast';

import { PORTFOLIO_TEMPLATES } from './data/templates';
import {
  getUserSession,
  saveUserSession,
  clearUserSession,
  decodePortfolioFromUrlHash
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'gallery' | 'dashboard' | 'editor' | 'faq' | 'public-view'
  const [user, setUser] = useState(null);
  const [activePortfolio, setActivePortfolio] = useState(null);
  const [sharePortfolio, setSharePortfolio] = useState(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load user session and check hash URL on initial mount
  useEffect(() => {
    const session = getUserSession();
    if (session) setUser(session);

    const hash = window.location.hash;
    if (hash && (hash.startsWith('#p=') || hash.startsWith('#id='))) {
      const decoded = decodePortfolioFromUrlHash(hash);
      if (decoded) {
        setActivePortfolio(decoded);
        setActiveTab('public-view');
      }
    }
  }, []);

  // Handlers
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    saveUserSession(userData);
    showToast(`Bienvenue, ${userData.name} !`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    clearUserSession();
    showToast('Vous avez été déconnecté.', 'info');
  };

  const handleSelectTemplate = (template) => {
    const newPf = {
      ...JSON.parse(JSON.stringify(template)),
      id: `pf-${Date.now()}`,
      name: `Mon Portfolio (${template.name})`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setActivePortfolio(newPf);
    setActiveTab('editor');
    showToast('Modèle chargé dans le studio d’édition !', 'success');
  };

  const handleStartCustom = () => {
    const defaultTemplate = PORTFOLIO_TEMPLATES[0];
    handleSelectTemplate(defaultTemplate);
  };

  const handleEditPortfolio = (portfolio) => {
    setActivePortfolio(portfolio);
    setActiveTab('editor');
  };

  const handleOpenShare = (portfolio) => {
    setSharePortfolio(portfolio);
    setIsShareOpen(true);
  };

  const handleOpenPublicView = (portfolio) => {
    setActivePortfolio(portfolio);
    setActiveTab('public-view');
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Navbar Header (Hidden in standalone public view if desired, or compact) */}
      {activeTab !== 'public-view' && activeTab !== 'editor' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onCreateNew={handleStartCustom}
        />
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {activeTab === 'landing' && (
          <LandingPage
            onSelectTemplate={handleSelectTemplate}
            onStartCustom={handleStartCustom}
            onExploreGallery={() => setActiveTab('gallery')}
            onOpenDemo={() => {
              setActivePortfolio(PORTFOLIO_TEMPLATES[0]);
              setActiveTab('public-view');
            }}
          />
        )}

        {activeTab === 'gallery' && (
          <TemplateGallery
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(template) => {
              setActivePortfolio(template);
              setActiveTab('public-view');
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <PortfolioDashboard
            onEditPortfolio={handleEditPortfolio}
            onOpenShareModal={handleOpenShare}
            onOpenPublicView={handleOpenPublicView}
            onCreateNew={handleStartCustom}
            showToast={showToast}
          />
        )}

        {activeTab === 'editor' && activePortfolio && (
          <PortfolioEditor
            initialPortfolio={activePortfolio}
            onBack={() => setActiveTab('dashboard')}
            onOpenShareModal={handleOpenShare}
            showToast={showToast}
          />
        )}

        {activeTab === 'faq' && <FaqSection showToast={showToast} />}

        {activeTab === 'public-view' && (
          <PublicPortfolioView
            portfolio={activePortfolio}
            onBack={() => setActiveTab('landing')}
            onStartCustom={handleStartCustom}
            showToast={showToast}
          />
        )}
      </main>

      {/* Global Footer (Visible on marketing pages) */}
      {activeTab !== 'editor' && activeTab !== 'public-view' && (
        <Footer
          setActiveTab={setActiveTab}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      )}

      {/* Modals & Toasts */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ShareModal
        portfolio={sharePortfolio}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        showToast={showToast}
        onOpenPublicView={handleOpenPublicView}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
