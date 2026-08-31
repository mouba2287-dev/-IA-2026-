import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Eye, EyeOff, Sparkles, ScrollText, Layers } from 'lucide-react';

export default function WebtoonReader({
  pages,
  pageBubblesMap,
  showOriginal,
  setShowOriginal,
  onTranslateAllPages,
  isTranslatingAll
}) {
  const [zoom, setZoom] = useState(100); // Zoom level from 30% to 1000%

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Webtoon Toolbar Controls */}
      <div className="h-14 border-b border-slate-800 bg-slate-900/95 px-4 flex items-center justify-between z-20 sticky top-0 backdrop-blur flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <ScrollText className="w-4 h-4 text-emerald-400" />
            <span>Mode Lecteur Webtoon Continuous</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30 font-mono">
              {pages.length} page{pages.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Translate All Webtoon Pages */}
          <button
            onClick={onTranslateAllPages}
            disabled={isTranslatingAll || pages.length === 0}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isTranslatingAll ? 'animate-spin' : ''}`} />
            {isTranslatingAll ? 'Traduction automatique en cours...' : '⚡ Re-traduire tout le chapitre'}
          </button>

          {/* Zoom Control (Up to >800%) */}
          <div className="flex items-center bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 space-x-2">
            <button
              onClick={() => setZoom((z) => Math.max(30, z - (z > 200 ? 50 : 20)))}
              className="text-slate-400 hover:text-white transition p-1"
              title="Réduire le zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-indigo-400 w-14 text-center">
              {zoom}%
            </span>

            <button
              onClick={() => setZoom((z) => Math.min(1000, z + (z >= 200 ? 50 : 20)))}
              className="text-slate-400 hover:text-white transition p-1"
              title="Agrandir le zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Quick Zoom Presets */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-800 pl-2">
              {[100, 200, 400, 800].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setZoom(preset)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded transition ${
                    zoom === preset
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          {/* V.O / V.F. Toggle */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showOriginal
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
          >
            {showOriginal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showOriginal ? 'V.O. Originale' : 'V.F. Traduite'}
          </button>
        </div>
      </div>

      {/* Vertical Webtoon Infinite Scroll Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex flex-col items-center space-y-6 select-none scroll-smooth">
        {pages.map((pageItem, pageIndex) => {
          const pageKey = pageItem.pageNumber || pageIndex + 1;
          const pageBubbles = pageBubblesMap[pageKey] || pageItem.bubbles || [];

          return (
            <div
              key={pageKey}
              style={{
                width: `${zoom}%`,
                maxWidth: zoom <= 100 ? '850px' : 'none',
                minWidth: '280px'
              }}
              className="relative bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden group transition-all duration-150 flex flex-col"
            >
              {/* Page Number Badge */}
              <div className="absolute top-3 left-3 z-30 bg-slate-950/85 backdrop-blur border border-slate-800 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-200 flex items-center gap-1.5 shadow-lg">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Page {pageKey} {pageItem.title ? `• ${pageItem.title}` : ''}
              </div>

              {/* Webtoon Page Image Container */}
              <div className="relative w-full bg-slate-950 min-h-[400px]">
                <img
                  src={pageItem.image}
                  alt={`Webtoon Page ${pageKey}`}
                  className="w-full h-auto block"
                  draggable={false}
                />

                {/* Speech Bubbles Overlay */}
                {pageBubbles.map((bubble) => (
                  <div
                    key={bubble.id}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.width}%`,
                      height: `${bubble.height}%`,
                      backgroundColor: showOriginal ? 'transparent' : bubble.bgColor || '#ffffff',
                      color: bubble.textColor || '#000000',
                      fontSize: `${Math.max(10, Math.round((bubble.fontSize || 14) * (zoom / 100)))}px`,
                      fontWeight: bubble.fontStyle === 'bold' ? 'bold' : 'normal',
                      fontStyle: bubble.fontStyle === 'italic' ? 'italic' : 'normal'
                    }}
                    className={`absolute p-2 rounded-2xl flex items-center justify-center text-center leading-snug transition-all duration-150 border z-20 ${
                      showOriginal
                        ? 'border-2 border-amber-400/90 bg-amber-500/20 text-amber-200 shadow-lg'
                        : 'border-slate-300/40 shadow-md hover:ring-2 hover:ring-indigo-400'
                    }`}
                  >
                    <span className="select-text overflow-hidden text-ellipsis px-1 py-0.5">
                      {showOriginal ? bubble.textEn : bubble.textFr || bubble.textEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
