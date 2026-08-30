import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2, QrCode, ExternalLink } from 'lucide-react';
import { encodePortfolioToUrl, exportStandaloneHtml } from '../utils/storage';

export default function ShareModal({ portfolio, isOpen, onClose, showToast, onOpenPublicView }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !portfolio) return null;

  const publicUrl = encodePortfolioToUrl(portfolio);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    if (showToast) showToast('Lien du portfolio copié dans le presse-papier !', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadHtml = () => {
    const htmlContent = exportStandaloneHtml(portfolio);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${(portfolio.profile?.fullName || 'export').toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Fichier HTML autonome téléchargé !', 'success');
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(portfolio, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${portfolio.id || 'backup'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Fichier de sauvegarde JSON téléchargé !', 'success');
  };

  // QR Code mock SVG representation using SVG blocks
  const qrCodeSvg = (
    <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
      <div className="grid grid-cols-5 gap-1 w-full h-full">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`${
              (i * 7 + 3) % 2 === 0 ? 'bg-slate-900' : 'bg-indigo-600'
            } rounded-xs`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Publier & Partager</h2>
              <p className="text-xs text-slate-400">Partagez votre portfolio au monde entier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Public Link Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Lien Public Généré
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-indigo-300 font-mono focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenPublicView) onOpenPublicView(portfolio);
              }}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              Ouvrir la page publique
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Exporter site HTML autonome
            </button>
          </div>

          {/* QR Code & Direct Socials */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-4">
            {qrCodeSvg}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-indigo-400" /> Flash Code QR
              </h4>
              <p className="text-[11px] text-slate-400">
                Scannez avec un smartphone pour consulter votre portfolio directement sur mobile.
              </p>
              <button
                onClick={handleDownloadJson}
                className="text-[11px] text-indigo-400 hover:underline inline-block font-medium pt-1"
              >
                Télécharger la sauvegarde JSON (.json)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
