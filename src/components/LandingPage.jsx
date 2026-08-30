import React from 'react';
import { Sparkles, ArrowRight, LayoutGrid, Zap, Share2, Shield, Code, Palette, Globe, Wand2 } from 'lucide-react';
import { PORTFOLIO_TEMPLATES } from '../data/templates';

export default function LandingPage({ onSelectTemplate, onStartCustom, onExploreGallery, onOpenCvWizard }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 lg:px-12 overflow-hidden border-b border-slate-900">
        {/* Glow Effects Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Générateur de Portfolio Professionnel N°1</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Créez un <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Portfolio d'Exception</span> en quelques minutes.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Concevez un site vitrine professionnel captivant sans écrire une ligne de code. Choisissez un modèle, importez votre CV ou vos photos et publiez avec un lien unique.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenCvWizard}
              className="px-7 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 font-bold text-sm text-white rounded-2xl shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-amber-300" />
              <span>Générer automatiquement depuis mon CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onStartCustom}
              className="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 font-bold text-sm text-slate-200 rounded-2xl transition flex items-center gap-2"
            >
              <span>Créer à partir d'un modèle</span>
            </button>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {[
              { label: 'Importation CV IA', val: 'Automatique' },
              { label: 'Upload Photos', val: 'Images locales' },
              { label: 'Partage public', val: 'Lien & QR Code' },
              { label: 'SEO Google', val: 'Optimisé 100%' }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-sm">
                <p className="text-lg font-black text-indigo-400">{stat.val}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Showcase Demo Section */}
      <section className="py-16 px-6 lg:px-12 bg-slate-900/30 border-b border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Découvrez les Modèles de la Galerie
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Sélectionnez un univers adapté à votre spécialité et éditez instantanément les textes, images, projets et compétences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_TEMPLATES.slice(0, 3).map((template) => (
              <div
                key={template.id}
                className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Header preview thumbnail */}
                <div className="relative h-44 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden border-b border-slate-800">
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
                      <h4 className="text-sm font-bold text-white truncate max-w-[180px]">
                        {template.profile.fullName}
                      </h4>
                      <p className="text-xs text-indigo-400 truncate max-w-[180px]">
                        {template.profile.jobTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Sections incluses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Projets', 'Compétences', 'Services', 'Expérience', 'Contact'].map((sec, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-medium">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-600/20"
                  >
                    <span>Utiliser ce Modèle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FolioCraft (Features Grid) */}
      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tout ce qu'il faut pour briller en ligne
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Une suite d'outils puissants pensée pour valoriser votre parcours et décrocher de nouvelles opportunités.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Palette className="w-6 h-6 text-indigo-400" />,
              title: 'Éditeur Interactif en Direct',
              desc: 'Visualisez vos modifications instantanément à droite de votre écran tout en ajustant les informations à gauche.'
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: 'Générateur de Contenu IA',
              desc: 'En panne d’inspiration ? Générez des présentations et des descriptions percutantes en un clic.'
            },
            {
              icon: <Share2 className="w-6 h-6 text-cyan-400" />,
              title: 'Publication & Partage par Lien',
              desc: 'Obtenez un lien public sécurisé avec code QR prêt à être ajouté à votre CV ou profil LinkedIn.'
            },
            {
              icon: <Code className="w-6 h-6 text-emerald-400" />,
              title: 'Exportation Standalone HTML',
              desc: 'Téléchargez l’intégralité de votre site web sous forme de fichier HTML unique prêt pour l’hébergement.'
            },
            {
              icon: <Shield className="w-6 h-6 text-rose-400" />,
              title: 'Stockage Local & RGPD',
              desc: 'Vos portfolios restent enregistrés en toute sécurité sur votre navigateur sans inscription obligatoire.'
            },
            {
              icon: <Globe className="w-6 h-6 text-purple-400" />,
              title: 'Design Mobile & Ultra Réactif',
              desc: 'Chaque modèle est automatiquement optimisé pour s’afficher parfaitement sur smartphone, tablette et bureau.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-slate-700 transition space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black text-white">Prêt à créer votre portfolio professionnel ?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Rejoignez des centaines de freelances, développeurs, designers et consultants qui font confiance à FolioCraft.
          </p>
          <div>
            <button
              onClick={onStartCustom}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white rounded-2xl shadow-xl shadow-indigo-600/40 transition flex items-center gap-2 mx-auto"
            >
              <span>Lancer le Studio de Création</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
