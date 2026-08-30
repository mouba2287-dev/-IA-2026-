import React, { useState, useEffect } from 'react';
import { loadSavedPortfolios, deletePortfolio, duplicatePortfolio } from '../utils/storage';
import { FolderHeart, PlusCircle, Edit3, Copy, Trash2, Eye, Share2, Download, Sparkles, ExternalLink, Calendar } from 'lucide-react';

export default function PortfolioDashboard({
  onEditPortfolio,
  onOpenShareModal,
  onOpenPublicView,
  onCreateNew,
  showToast
}) {
  const [portfolios, setPortfolios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPortfolios(loadSavedPortfolios());
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le portfolio "${name}" ?`)) {
      const updated = deletePortfolio(id);
      setPortfolios(updated);
      showToast('Portfolio supprimé avec succès.', 'info');
    }
  };

  const handleDuplicate = (id) => {
    const duplicated = duplicatePortfolio(id);
    if (duplicated) {
      setPortfolios(loadSavedPortfolios());
      showToast('Portfolio dupliqué avec succès !', 'success');
    }
  };

  const filtered = portfolios.filter((p) => {
    const title = p.name || p.profile?.fullName || 'Portfolio';
    const role = p.profile?.jobTitle || '';
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 lg:p-12 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Votre Espace de Stockage</span>
            </div>
            <h1 className="text-3xl font-black text-white">Mes Portfolios Sauvegardés</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Gérez, modifiez, dupliquez et partagez l'ensemble de vos créations de portfolio en un seul endroit.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-xs text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nouveau Portfolio</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <FolderHeart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Aucun portfolio trouvé</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Vous n'avez pas encore de portfolio ou aucun ne correspond à votre recherche.
            </p>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-indigo-600 text-xs font-semibold text-white rounded-xl shadow-md hover:bg-indigo-500 transition"
            >
              Créer mon Premier Portfolio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((portfolio) => {
              const p = portfolio.profile || {};
              const title = portfolio.name || p.fullName || 'Portfolio Sans Nom';
              return (
                <div
                  key={portfolio.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl transition flex flex-col justify-between"
                >
                  {/* Top Header Card */}
                  <div className="p-5 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold rounded uppercase">
                        {portfolio.category || 'Portfolio'}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(portfolio.updatedAt || Date.now()).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {p.avatarUrl ? (
                        <img
                          src={p.avatarUrl}
                          alt={title}
                          className="w-12 h-12 rounded-full border border-indigo-500/40 object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
                          {title.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <h3 className="text-sm font-bold text-white truncate" title={title}>
                          {title}
                        </h3>
                        <p className="text-xs text-indigo-400 truncate" title={p.jobTitle}>
                          {p.jobTitle || 'Professionnel'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3 flex-1">
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {p.tagline || p.bio || 'Aucune description saisie pour ce portfolio.'}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>⚡ {portfolio.projects?.length || 0} Projets</span>
                      <span>🎯 {portfolio.skills?.length || 0} Compétences</span>
                    </div>
                  </div>

                  {/* Action Buttons Toolbar */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onEditPortfolio(portfolio)}
                      className="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Éditer
                    </button>

                    <button
                      onClick={() => onOpenShareModal(portfolio)}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5 text-cyan-400" /> Partager
                    </button>

                    <button
                      onClick={() => handleDuplicate(portfolio.id)}
                      className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-medium transition flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400" /> Dupliquer
                    </button>

                    <button
                      onClick={() => handleDelete(portfolio.id, title)}
                      className="py-2 px-3 bg-slate-900 hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900/50 rounded-xl text-xs font-medium transition flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
