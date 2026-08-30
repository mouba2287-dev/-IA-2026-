import React, { useState } from 'react';
import { PORTFOLIO_TEMPLATES } from '../data/templates';
import { Sparkles, ArrowRight, Eye, Search, Layers, Check } from 'lucide-react';

export default function TemplateGallery({ onSelectTemplate, onPreviewTemplate }) {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Tous',
    'Tech & Code',
    'Design & Art',
    'Corporate',
    'Photographie & Art',
    'Marketing & Création',
    'Minimaliste'
  ];

  const filteredTemplates = PORTFOLIO_TEMPLATES.filter((tpl) => {
    const matchesCat = activeCategory === 'Tous' || tpl.category === activeCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.profile.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 lg:p-12 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Galerie de Modèles Prêts-à-l’Emploi</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            Choisissez un Modèle de Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Explorez notre collection de designs professionnels créés sur-mesure pour chaque secteur d'activité. Cliquez sur un modèle pour le personnaliser instantanément.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par métier..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Grid of Templates */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400">Aucun modèle ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Visual Banner Header */}
                <div className="relative h-48 bg-slate-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[11px] font-bold rounded-lg border border-indigo-500/30">
                      {template.category}
                    </span>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-lg border border-amber-500/30">
                      {template.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={template.profile.avatarUrl}
                      alt={template.profile.fullName}
                      className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover shrink-0"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                        {template.name}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium">
                        {template.profile.jobTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                      Compétences & Projets inclus
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {template.skills.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onPreviewTemplate(template)}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Aperçu</span>
                    </button>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5"
                    >
                      <span>Utiliser</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
