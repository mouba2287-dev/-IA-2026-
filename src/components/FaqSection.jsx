import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function FaqSection({ showToast }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState({ email: '', message: '' });
  const [supportSent, setSupportSent] = useState(false);

  const faqItems = [
    {
      q: 'Est-ce que FolioCraft est vraiment 100% gratuit ?',
      a: 'Oui ! La création, la personnalisation, l’exportation au format HTML autonome et la génération de liens de partage publics sont totalement gratuites sans aucun frais caché.'
    },
    {
      q: 'Comment publier et partager mon portfolio avec un lien unique ?',
      a: 'Dans le studio de création ou depuis votre tableau de bord, cliquez sur "Partager". Vous obtiendrez un lien court directement consultable par n’importe qui sur internet, ainsi qu’un Flash Code QR à intégrer sur votre CV ou carte de visite.'
    },
    {
      q: 'Puis-je exporter et héberger mon site portfolio moi-même ?',
      a: 'Absolument. En cliquant sur "Exporter site HTML autonome", vous obtenez un fichier unique HTML/CSS complet avec toutes vos informations. Vous pouvez l’héberger gratuitement sur GitHub Pages, Vercel, Netlify ou votre serveur FTP personnel.'
    },
    {
      q: 'Où sont stockées mes données et portfolios ?',
      a: 'Vos portfolios sont enregistrés localement en toute sécurité dans le stockage de votre navigateur (LocalStorage). Rien n’est transmis à des tiers sans votre accord. Vous pouvez aussi sauvegarder vos données au format JSON.'
    },
    {
      q: 'Puis-je personnaliser les couleurs et l’agencement des sections ?',
      a: 'Oui ! Notre studio d’édition intègre un sélecteur de palettes de couleurs (Indigo, Rose Sunset, Émeraude, Ardoise, Ambre, Monochrome), la gestion des compétences avec niveaux et l’activation/désactivation de chaque section.'
    },
    {
      q: 'Comment utiliser le générateur de texte par IA ?',
      a: 'Dans l’éditeur de profil ou de projets, cliquez sur le bouton "Générer avec IA". L’assistant créera instantanément une biographie et une phrase d’accroche adaptée à votre poste.'
    }
  ];

  const filtered = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSent(true);
    if (showToast) showToast('Votre question a été envoyée à notre équipe d’assistance !', 'success');
    setTimeout(() => {
      setSupportSent(false);
      setSupportMessage({ email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 lg:p-12 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Foire Aux Questions</span>
          </div>
          <h1 className="text-3xl font-black text-white">Questions Fréquentes (FAQ)</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Retrouvez rapidement les réponses à vos questions concernant la création, la publication et la gestion de vos portfolios.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-200"
              >
                <span>{item.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Form Box */}
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Une autre question ?</h3>
              <p className="text-xs text-slate-400">Notre équipe réactive vous répond sous 24h.</p>
            </div>
          </div>

          {supportSent ? (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Message bien reçu ! Nous revenons vers vous rapidement.</span>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-3 pt-2">
              <div>
                <input
                  type="email"
                  required
                  value={supportMessage.email}
                  onChange={(e) => setSupportMessage({ ...supportMessage, email: e.target.value })}
                  placeholder="Votre adresse e-mail"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  required
                  value={supportMessage.message}
                  onChange={(e) => setSupportMessage({ ...supportMessage, message: e.target.value })}
                  placeholder="Décrivez votre question..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer ma question</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
