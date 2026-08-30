import React, { useState } from 'react';
import { UploadCloud, FileText, Sparkles, X, CheckCircle, ArrowRight, RefreshCw, Wand2 } from 'lucide-react';
import { parseCvFile, extractDataFromCvText } from '../utils/cvParser';

export default function CvImportWizard({ isOpen, onClose, onPortfolioGenerated, showToast }) {
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputMode, setInputMode] = useState('file'); // 'file' | 'text'

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let generatedPf;
      if (inputMode === 'file' && file) {
        generatedPf = await parseCvFile(file);
      } else if (rawText.trim().length > 0) {
        generatedPf = extractDataFromCvText(rawText);
      } else {
        // Fallback default sample text
        generatedPf = extractDataFromCvText("Alexandre Martin\nDéveloppeur Web & Mobile Senior\nSpécialiste React, TypeScript, Node.js, Tailwind CSS et Docker.");
      }

      setTimeout(() => {
        setIsGenerating(false);
        if (showToast) showToast('Portfolio généré automatiquement depuis votre CV !', 'success');
        onPortfolioGenerated(generatedPf);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      if (showToast) showToast('Erreur lors de la lecture du CV.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Générateur de Portfolio par CV IA
              </h2>
              <p className="text-xs text-slate-400">
                Importez votre CV et laissez l'IA créer votre portfolio personnalisé
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 border border-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setInputMode('file')}
              className={`flex-1 py-2 rounded-lg transition ${
                inputMode === 'file' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fichier CV (PDF / TXT)
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 py-2 rounded-lg transition ${
                inputMode === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Coller le texte du CV
            </button>
          </div>

          {/* Mode 1: File Dropzone */}
          {inputMode === 'file' ? (
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-8 text-center bg-slate-950/50 transition space-y-3 relative group">
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              {file ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> {file.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{(file.size / 1024).toFixed(1)} Ko</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200">
                    Glissez-déposez votre CV ici ou <span className="text-indigo-400 underline">Parcourir</span>
                  </p>
                  <p className="text-[11px] text-slate-500">Formats acceptés : PDF, TXT (Max 10 Mo)</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Copiez-collez le contenu de votre CV
              </label>
              <textarea
                rows={6}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Exemple : Marc Bernard, Développeur Web Senior avec 5 ans d'expérience en React et Node.js..."
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-xs text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Génération du Portfolio en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Générer mon Portfolio avec l'IA</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
