import React from 'react';
import { Sparkles, LayoutGrid, FolderHeart, HelpCircle, User, LogOut, PlusCircle, Wand2 } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  onCreateNew,
  onOpenCvWizard
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Brand Logo */}
      <div
        onClick={() => setActiveTab('landing')}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
        <div>
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
            Folio<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Craft</span>
          </span>
          <span className="block text-[10px] font-medium text-slate-400 tracking-widest uppercase -mt-1">
            Portfolio Studio
          </span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800/90 p-1 rounded-2xl shadow-inner">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'landing'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          Accueil
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'gallery'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Galerie & Modèles
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FolderHeart className="w-3.5 h-3.5" />
          Mes Portfolios
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'faq'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ & Aide
        </button>
      </nav>

      {/* Action CTA & User Profile */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenCvWizard}
          className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Générer via CV</span>
        </button>

        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-semibold text-xs text-white rounded-xl shadow-lg shadow-indigo-600/25 transition-transform active:scale-95 flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Créer</span>
        </button>

        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-indigo-500/50 object-cover"
            />
            <span className="hidden lg:inline text-xs font-semibold text-slate-200 max-w-[100px] truncate">
              {user.name}
            </span>
            <button
              onClick={onLogout}
              title="Déconnexion"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 font-semibold text-xs text-slate-200 rounded-xl transition flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span>Connexion</span>
          </button>
        )}
      </div>
    </header>
  );
}
