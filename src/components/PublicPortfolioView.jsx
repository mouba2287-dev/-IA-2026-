import React, { useState } from 'react';
import PortfolioRenderer from './PortfolioRenderer';
import { Sparkles, ArrowLeft, Copy, Check, Share2 } from 'lucide-react';

export default function PublicPortfolioView({ portfolio, onBack, onStartCustom, showToast }) {
  const [copied, setCopied] = useState(false);

  if (!portfolio) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950 text-slate-300">
        <p className="text-base font-semibold mb-4">Portfolio introuvable ou lien expiré.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
        >
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (showToast) showToast('Lien public copié !', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden text-slate-100 relative">
      {/* Top Floating Banner for Public Visitors */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg transition flex items-center gap-1.5 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-bold">
              {portfolio.profile?.fullName || 'Portfolio'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition flex items-center gap-1 font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copié' : 'Copier le lien'}</span>
          </button>

          <button
            onClick={onStartCustom}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-white rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Créer mon Portfolio</span>
          </button>
        </div>
      </div>

      {/* Main Portfolio Canvas View */}
      <div className="flex-1 overflow-y-auto">
        <PortfolioRenderer portfolio={portfolio} isPreview={false} onShowToast={showToast} />
      </div>
    </div>
  );
}
