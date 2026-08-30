import React from 'react';
import { Sparkles, Heart, Shield, HelpCircle } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenPrivacy }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              FC
            </div>
            <span className="text-lg font-black text-white">FolioCraft</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            La plateforme intuitive tout-en-un pour concevoir, personnaliser et publier des portfolios professionnels à fort impact.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('landing')} className="hover:text-indigo-400 transition">
                Accueil
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gallery')} className="hover:text-indigo-400 transition">
                Galerie de Modèles
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-indigo-400 transition">
                Mes Portfolios
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Ressources & Légal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('faq')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> FAQ & Questions Fréquentes
              </button>
            </li>
            <li>
              <button onClick={onOpenPrivacy} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Politique de Confidentialité (RGPD)
              </button>
            </li>
          </ul>
        </div>

        {/* Features badge */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" /> 100% Gratuit & Sans Pub
          </span>
          <p className="text-xs text-slate-400">
            Exportez votre code HTML autonome ou partagez votre portfolio via un lien unique sécurisé.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} FolioCraft. Tous droits réservés.</p>
        <p className="flex items-center gap-1">
          Fait avec <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> pour les créateurs & professionnels.
        </p>
      </div>
    </footer>
  );
}
