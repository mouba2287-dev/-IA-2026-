import React, { useState } from 'react';
import { Sparkles, Copy, Check, Download, BookOpen, FileText } from 'lucide-react';
import { translateText, MANGA_GLOSSARY } from '../utils/translator';

export default function ScriptTranslator() {
  const [inputText, setInputText] = useState(
    `Panel 1:
Hero: "I will never give up! We have to protect our nakama!"
Villain: "Nani?! How is this possible?!"

Panel 2:
Hero: "This is my final technique! Believe it!"
Villain: "Curse you, Sensei!"`
  );

  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslateScript = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);

    const lines = inputText.split('\n');
    const translatedLines = [];

    for (const line of lines) {
      if (!line.trim()) {
        translatedLines.push('');
        continue;
      }
      // If line is panel header keep it as is or format
      if (line.toLowerCase().startsWith('panel')) {
        translatedLines.push(`[${line}]`);
      } else if (line.includes(':')) {
        const [speaker, speech] = line.split(/:(.+)/);
        const translatedSpeech = await translateText(speech);
        translatedLines.push(`${speaker}: ${translatedSpeech}`);
      } else {
        const translated = await translateText(line);
        translatedLines.push(translated);
      }
    }

    setTranslatedText(translatedLines.join('\n'));
    setIsTranslating(false);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    if (!translatedText) return;
    const element = document.createElement('a');
    const file = new Blob([translatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'manga_translation_script.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Intro Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Traducteur Batch de Script & Chapitre Manga</h1>
              <p className="text-xs text-slate-400">
                Collez l'ensemble des scripts de dialogues ou sous-titres de votre manga (Anglais ➔ Français)
              </p>
            </div>
          </div>
        </div>

        {/* Translation Split View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: English Input */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Script Original (Anglais)
              </span>
              <button
                onClick={handleTranslateScript}
                disabled={isTranslating || !inputText.trim()}
                className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
                {isTranslating ? 'Traduction du chapitre...' : 'Traduire le script'}
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Collez le texte anglais du manga ici..."
              className="w-full flex-1 min-h-[350px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Right Column: French Output */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Script Traduit (Français)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!translatedText}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs rounded-lg transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
                <button
                  onClick={handleDownloadScript}
                  disabled={!translatedText}
                  className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs rounded-lg shadow transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Télécharger .txt
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={translatedText}
              placeholder="Le script traduit s'affichera ici..."
              className="w-full flex-1 min-h-[350px] bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-indigo-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Manga Glossary Reference Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Glossaire Intégré des Termes Manga</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {Object.entries(MANGA_GLOSSARY).map(([term, fr]) => (
              <div key={term} className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                <span className="text-xs font-semibold text-indigo-300 capitalize">{term}</span>
                <p className="text-[11px] text-slate-400 truncate">{fr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
