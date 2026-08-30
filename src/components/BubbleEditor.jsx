import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, RefreshCw, Palette, Type, Check, ArrowRight } from 'lucide-react';
import { translateText } from '../utils/translator';

export default function BubbleEditor({
  bubbles,
  activeBubbleId,
  setActiveBubbleId,
  onUpdateBubble,
  onDeleteBubble,
  onAddBubble
}) {
  const [isTranslatingAll, setIsTranslatingAll] = useState(false);
  const activeBubble = bubbles.find((b) => b.id === activeBubbleId);

  const handleTranslateSingle = async (bubble) => {
    if (!bubble.textEn) return;
    const translated = await translateText(bubble.textEn);
    onUpdateBubble(bubble.id, { textFr: translated });
  };

  const handleTranslateAll = async () => {
    setIsTranslatingAll(true);
    for (const b of bubbles) {
      if (b.textEn && !b.textFr) {
        const translated = await translateText(b.textEn);
        onUpdateBubble(b.id, { textFr: translated });
      }
    }
    setIsTranslatingAll(false);
  };

  return (
    <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full z-20">
      {/* Editor Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>Bulles & Traductions</span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-mono">
              {bubbles.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">Éditez les dialogues et styles</p>
        </div>

        <button
          onClick={handleTranslateAll}
          disabled={isTranslatingAll || bubbles.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isTranslatingAll ? 'animate-spin' : ''}`} />
          {isTranslatingAll ? 'Traduction...' : 'Tout traduire'}
        </button>
      </div>

      {/* Bubble List / Selected Inspector */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeBubble ? (
          /* Active Bubble Detailed Inspector */
          <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Bulle Sélectionnée (#{bubbles.findIndex((b) => b.id === activeBubble.id) + 1})
              </span>
              <button
                onClick={() => onDeleteBubble(activeBubble.id)}
                className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Supprimer
              </button>
            </div>

            {/* Original English Text */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>Texte Original (Anglais)</span>
                <button
                  onClick={() => handleTranslateSingle(activeBubble)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Auto-Traduire
                </button>
              </label>
              <textarea
                value={activeBubble.textEn || ''}
                onChange={(e) => onUpdateBubble(activeBubble.id, { textEn: e.target.value })}
                placeholder="Entrez le texte en anglais..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* French Translation */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-indigo-300">Traduction (Français)</label>
              <textarea
                value={activeBubble.textFr || ''}
                onChange={(e) => onUpdateBubble(activeBubble.id, { textFr: e.target.value })}
                placeholder="Entrez ou ajustez la traduction en français..."
                rows={3}
                className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg px-3 py-2 text-xs text-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Typography & Style Controls */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Taille du texte</label>
                <input
                  type="number"
                  min="8"
                  max="40"
                  value={activeBubble.fontSize || 14}
                  onChange={(e) =>
                    onUpdateBubble(activeBubble.id, { fontSize: parseInt(e.target.value) || 14 })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Style de Police</label>
                <select
                  value={activeBubble.fontStyle || 'normal'}
                  onChange={(e) => onUpdateBubble(activeBubble.id, { fontStyle: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Gras</option>
                  <option value="italic">Italique</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Fond de bulle</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={activeBubble.bgColor || '#ffffff'}
                    onChange={(e) => onUpdateBubble(activeBubble.id, { bgColor: e.target.value })}
                    className="w-7 h-7 bg-transparent cursor-pointer rounded border border-slate-700"
                  />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeBubble.bgColor || '#ffffff'}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Couleur du texte</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={activeBubble.textColor || '#000000'}
                    onChange={(e) => onUpdateBubble(activeBubble.id, { textColor: e.target.value })}
                    className="w-7 h-7 bg-transparent cursor-pointer rounded border border-slate-700"
                  />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeBubble.textColor || '#000000'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
            <p className="text-xs text-slate-400">
              Cliquez sur une bulle de dialogue sur l'image pour la modifier ou tracer une nouvelle bulle.
            </p>
          </div>
        )}

        {/* List of all Bubbles on Page */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Liste des dialogues ({bubbles.length})
            </span>
            <button
              onClick={() => onAddBubble({ x: 30, y: 30, width: 40, height: 15 })}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter
            </button>
          </div>

          {bubbles.length === 0 ? (
            <p className="text-xs text-slate-500 italic text-center py-4">Aucune bulle détectée</p>
          ) : (
            bubbles.map((bubble, idx) => (
              <div
                key={bubble.id}
                onClick={() => setActiveBubbleId(bubble.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                  activeBubbleId === bubble.id
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-slate-400">#Bulle {idx + 1}</span>
                  {bubble.textFr && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      Traduite
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 font-medium truncate">
                  EN: {bubble.textEn || <span className="italic text-slate-500">Vide</span>}
                </div>
                <div className="text-xs text-indigo-300 font-medium truncate flex items-center gap-1 mt-0.5">
                  <ArrowRight className="w-3 h-3 text-indigo-400 shrink-0" />
                  FR: {bubble.textFr || <span className="italic text-slate-500">Non traduite</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
