import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Politique de Confidentialité & RGPD</h2>
              <p className="text-xs text-slate-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-emerald-300">
            <Lock className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Chez <strong>FolioCraft</strong>, le respect de votre vie privée est notre priorité absolue. Vos portfolios restent sous votre contrôle exclusif et sont enregistrés directement dans le navigateur.
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              1. Collecte et Utilisation des Données
            </h3>
            <p>
              FolioCraft ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers. Les informations saisies lors de la création de votre portfolio (nom, projets, compétences, coordonnées) sont stockées dans la mémoire locale de votre navigateur (LocalStorage).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              2. Cookies et Traceurs
            </h3>
            <p>
              Notre plateforme n’utilise aucun cookie publicitaire ni traceur de comportement. Seules les préférences d’affichage et vos sessions actives sont conservées localement pour garantir la continuité de votre expérience.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              3. Liens de Partage Publics
            </h3>
            <p>
              Lorsque vous générez un lien public de partage, les données de votre portfolio sont encodées sous forme d’URL sécurisée (Base64). Aucune donnée n’est conservée sur des serveurs externes non autorisés.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              4. Vos Droits (Conformité RGPD)
            </h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez à tout moment d’un droit d’accès, de modification, de suppression et d’exportation de l’intégralité de vos portfolios via les boutons "Exporter JSON" et "Supprimer" dans votre tableau de bord.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
}
