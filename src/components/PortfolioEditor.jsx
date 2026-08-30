import React, { useState } from 'react';
import {
  Save,
  Share2,
  Sparkles,
  User,
  Palette,
  Layers,
  Wrench,
  FolderPlus,
  Briefcase,
  Plus,
  Trash2,
  RefreshCw,
  ArrowLeft,
  Upload,
  Search,
  Globe,
  Tag
} from 'lucide-react';
import PortfolioRenderer from './PortfolioRenderer';
import { COLOR_PALETTES } from '../data/templates';
import { savePortfolio, generateAiContent } from '../utils/storage';
import { readImageAsDataUrl } from '../utils/fileUpload';

export default function PortfolioEditor({ initialPortfolio, onBack, onOpenShareModal, showToast }) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'theme' | 'sections' | 'skills' | 'projects' | 'experience' | 'seo'
  const [previewMode, setPreviewMode] = useState('split'); // 'split' | 'preview-only' | 'edit-only'
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    const saved = savePortfolio(portfolio);
    setPortfolio(saved);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Portfolio sauvegardé dans votre espace !', 'success');
    }, 400);
  };

  // Helper nested state update
  const updateProfile = (field, val) => {
    setPortfolio((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: val
      }
    }));
  };

  const updateSeo = (field, val) => {
    setPortfolio((prev) => ({
      ...prev,
      seo: {
        ...(prev.seo || {}),
        [field]: val
      }
    }));
  };

  const updateSocialLink = (field, val) => {
    setPortfolio((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        socialLinks: {
          ...(prev.profile?.socialLinks || {}),
          [field]: val
        }
      }
    }));
  };

  const toggleSection = (secKey) => {
    setPortfolio((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [secKey]: !prev.sections?.[secKey]
      }
    }));
  };

  const updateTheme = (field, val) => {
    setPortfolio((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: val
      }
    }));
  };

  // Local File Upload Handler for Avatar
  const handleAvatarFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageAsDataUrl(file);
      updateProfile('avatarUrl', dataUrl);
      showToast('Photo de profil importée depuis votre appareil !', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors de l’import de l’image.', 'error');
    }
  };

  // Local File Upload Handler for Project Image
  const handleProjectFileUpload = async (e, projId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readImageAsDataUrl(file);
      handleUpdateProject(projId, 'image', dataUrl);
      showToast('Image du projet importée avec succès !', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors de l’import de l’image.', 'error');
    }
  };

  // AI Fill trigger
  const handleAiFill = (fieldType) => {
    const aiText = generateAiContent(fieldType, portfolio.profile?.jobTitle || 'Professionnel');
    if (fieldType === 'tagline' || fieldType === 'bio') {
      updateProfile(fieldType, aiText);
    }
    showToast('Contenu généré par l’Assistant IA !', 'info');
  };

  // Skill Add / Update / Delete
  const handleAddSkill = () => {
    const newSkill = { name: 'Nouvelle Compétence', level: 80, category: 'Général' };
    setPortfolio((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));
  };

  const handleUpdateSkill = (idx, field, val) => {
    setPortfolio((prev) => {
      const list = [...(prev.skills || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, skills: list };
    });
  };

  const handleDeleteSkill = (idx) => {
    setPortfolio((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== idx)
    }));
  };

  // Project Add / Update / Delete
  const handleAddProject = () => {
    const newProj = {
      id: `p-${Date.now()}`,
      title: 'Nouveau Projet Exemplaire',
      category: 'Projet',
      description: 'Description de votre réalisation avec les fonctionnalités clés.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      tags: ['React', 'Design', 'Web'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    };
    setPortfolio((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const handleUpdateProject = (id, field, val) => {
    setPortfolio((prev) => {
      const list = (prev.projects || []).map((p) => (p.id === id ? { ...p, [field]: val } : p));
      return { ...prev, projects: list };
    });
  };

  const handleDeleteProject = (id) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((p) => p.id !== id)
    }));
  };

  // Experience Add / Delete
  const handleAddExperience = () => {
    const newExp = {
      id: `e-${Date.now()}`,
      role: 'Poste occupé',
      company: 'Nom de l’entreprise',
      period: '2023 - Présent',
      location: 'Paris',
      description: 'Missions réalisées et accomplissements majeurs.'
    };
    setPortfolio((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExp]
    }));
  };

  const handleDeleteExperience = (id) => {
    setPortfolio((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).filter((e) => e.id !== id)
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden text-slate-100">
      {/* Top Editor Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0 gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            title="Retour à la liste"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2 truncate max-w-[200px] sm:max-w-xs">
              {portfolio.name || portfolio.profile?.fullName || 'Éditeur de Portfolio'}
            </h2>
            <span className="text-[10px] text-slate-400 block">Modèle: {portfolio.category || 'Sur mesure'}</span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center bg-slate-950 p-1 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setPreviewMode('edit-only')}
            className={`px-2.5 py-1 rounded-lg transition ${
              previewMode === 'edit-only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Éditeur
          </button>
          <button
            onClick={() => setPreviewMode('split')}
            className={`px-2.5 py-1 rounded-lg transition ${
              previewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Séparé (Split)
          </button>
          <button
            onClick={() => setPreviewMode('preview-only')}
            className={`px-2.5 py-1 rounded-lg transition ${
              previewMode === 'preview-only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Aperçu Direct
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenShareModal(portfolio)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Partager</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: Form Customizer */}
        {previewMode !== 'preview-only' && (
          <div className={`${previewMode === 'split' ? 'w-full md:w-1/2 lg:w-5/12' : 'w-full'} border-r border-slate-800 flex flex-col h-full bg-slate-900/40`}>
            {/* Studio Navigation Tabs */}
            <div className="flex items-center gap-1 p-2 bg-slate-900 border-b border-slate-800 overflow-x-auto text-xs font-medium">
              {[
                { id: 'profile', label: 'Profil', icon: <User className="w-3.5 h-3.5" /> },
                { id: 'theme', label: 'Thème', icon: <Palette className="w-3.5 h-3.5" /> },
                { id: 'sections', label: 'Sections', icon: <Layers className="w-3.5 h-3.5" /> },
                { id: 'skills', label: 'Compétences', icon: <Wrench className="w-3.5 h-3.5" /> },
                { id: 'projects', label: 'Projets', icon: <FolderPlus className="w-3.5 h-3.5" /> },
                { id: 'experience', label: 'Expérience', icon: <Briefcase className="w-3.5 h-3.5" /> },
                { id: 'seo', label: 'SEO Google', icon: <Globe className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Fields Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-400" /> Informations de Profil
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Nom complet</label>
                    <input
                      type="text"
                      value={portfolio.profile?.fullName || ''}
                      onChange={(e) => updateProfile('fullName', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Intitulé du poste / Profession</label>
                    <input
                      type="text"
                      value={portfolio.profile?.jobTitle || ''}
                      onChange={(e) => updateProfile('jobTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Photo / Avatar Upload Section */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Photo de Profil / Avatar</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={portfolio.profile?.avatarUrl || ''}
                        onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                        placeholder="URL de l'image ou importez ci-contre"
                        className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      />
                      <label className="px-3 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Importer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300 uppercase">Phrase d'accroche (Tagline)</label>
                      <button
                        onClick={() => handleAiFill('tagline')}
                        className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" /> Générer avec IA
                      </button>
                    </div>
                    <input
                      type="text"
                      value={portfolio.profile?.tagline || ''}
                      onChange={(e) => updateProfile('tagline', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300 uppercase">Biographie & Présentation</label>
                      <button
                        onClick={() => handleAiFill('bio')}
                        className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" /> Générer avec IA
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={portfolio.profile?.bio || ''}
                      onChange={(e) => updateProfile('bio', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Ville / Localisation</label>
                      <input
                        type="text"
                        value={portfolio.profile?.location || ''}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">E-mail de Contact</label>
                      <input
                        type="email"
                        value={portfolio.profile?.email || ''}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="block text-xs font-semibold text-slate-300 uppercase">Réseaux Sociaux</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="URL GitHub"
                        value={portfolio.profile?.socialLinks?.github || ''}
                        onChange={(e) => updateSocialLink('github', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="URL LinkedIn"
                        value={portfolio.profile?.socialLinks?.linkedin || ''}
                        onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="URL Twitter / X"
                        value={portfolio.profile?.socialLinks?.twitter || ''}
                        onChange={(e) => updateSocialLink('twitter', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: THEME */}
              {activeTab === 'theme' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-indigo-400" /> Choisir une Palette de Couleurs
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {COLOR_PALETTES.map((pal) => (
                      <button
                        key={pal.id}
                        onClick={() => updateTheme('colorScheme', pal.id)}
                        className={`p-3 rounded-xl border text-left transition ${
                          portfolio.theme?.colorScheme === pal.id
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-lg'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.secondary }} />
                        </div>
                        <span className="text-xs font-bold text-slate-200 block">{pal.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SECTIONS */}
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" /> Sections Visibles sur votre Portfolio
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: 'about', label: 'Section À Propos' },
                      { key: 'skills', label: 'Section Compétences' },
                      { key: 'projects', label: 'Section Projets' },
                      { key: 'experience', label: 'Section Parcours & Expérience' },
                      { key: 'services', label: 'Section Services Proposés' },
                      { key: 'testimonials', label: 'Section Témoignages' },
                      { key: 'contact', label: 'Section Formulaire de Contact' }
                    ].map((sec) => (
                      <label
                        key={sec.key}
                        className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition"
                      >
                        <span className="text-xs font-semibold text-slate-200">{sec.label}</span>
                        <input
                          type="checkbox"
                          checked={!!portfolio.sections?.[sec.key]}
                          onChange={() => toggleSection(sec.key)}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-indigo-400" /> Gestion des Compétences
                    </h3>
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(portfolio.skills || []).map((skill, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                            className="flex-1 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleUpdateSkill(idx, 'level', Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-indigo-400 font-bold text-center focus:outline-none"
                          />
                          <button
                            onClick={() => handleDeleteSkill(idx)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderPlus className="w-4 h-4 text-indigo-400" /> Gestion des Projets
                    </h3>
                    <button
                      onClick={handleAddProject}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter un projet
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(portfolio.projects || []).map((proj) => (
                      <div key={proj.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400">{proj.title}</span>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 uppercase">Titre</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 uppercase">Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 uppercase">Image de Projet</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => handleUpdateProject(proj.id, 'image', e.target.value)}
                              className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none"
                            />
                            <label className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded text-xs font-semibold cursor-pointer flex items-center gap-1 shrink-0">
                              <Upload className="w-3 h-3" />
                              <span>Fichier</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProjectFileUpload(e, proj.id)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" /> Parcours Professionnel
                    </h3>
                    <button
                      onClick={handleAddExperience}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ajouter
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(portfolio.experiences || []).map((exp) => (
                      <div key={exp.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) =>
                              setPortfolio((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) => (item.id === exp.id ? { ...item, role: e.target.value } : item))
                              }))
                            }
                            className="font-bold bg-transparent text-white text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SEO GOOGLE */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" /> Référencement Google (SEO) & Métadonnées
                  </h3>
                  <p className="text-xs text-slate-400">
                    Optimisez le titre, la description et les mots-clés de votre portfolio pour les moteurs de recherche et le partage sur les réseaux sociaux.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Méta-Titre Google (Title Tag)
                    </label>
                    <input
                      type="text"
                      value={portfolio.seo?.metaTitle || `${portfolio.profile?.fullName || 'Portfolio'} - ${portfolio.profile?.jobTitle || 'Professionnel'}`}
                      onChange={(e) => updateSeo('metaTitle', e.target.value)}
                      placeholder="Jean Dupont - Développeur Fullstack Senior | Portfolio"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Méta-Description Google
                    </label>
                    <textarea
                      rows={3}
                      value={portfolio.seo?.metaDescription || portfolio.profile?.tagline || portfolio.profile?.bio || ''}
                      onChange={(e) => updateSeo('metaDescription', e.target.value)}
                      placeholder="Découvrez mon parcours, mes compétences en React & Node.js, mes projets récents et contactez-moi..."
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Mots-Clés SEO (Séparez par des virgules)
                    </label>
                    <input
                      type="text"
                      value={portfolio.seo?.keywords || 'portfolio, développeur, freelance, React, JavaScript, projets'}
                      onChange={(e) => updateSeo('keywords', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT PANEL: Live Interactive Preview */}
        {previewMode !== 'edit-only' && (
          <div className="flex-1 h-full overflow-y-auto bg-slate-950">
            <PortfolioRenderer portfolio={portfolio} isPreview={true} onShowToast={showToast} />
          </div>
        )}
      </div>
    </div>
  );
}
