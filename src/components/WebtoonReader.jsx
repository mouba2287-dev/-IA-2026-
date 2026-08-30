import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Eye, EyeOff, Sparkles, ScrollText, Layers } from 'lucide-react';

export default function WebtoonReader({
  pages,
  pageBubblesMap,
  showOriginal,
  setShowOriginal,
  onUpdateBubble,
  onAddBubble
}) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Webtoon Toolbar Controls */}
      <div className="h-12 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <ScrollText className="w-4 h-4 text-indigo-400" />
            Mode Lecteur Webtoon (Défilement Vertical Continuous)
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-xs text-slate-400 font-mono">
            {pages.length} page(s) chargée(s)
          </span>
        </div>

        {/* Zoom & View Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 space-x-2">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="text-slate-400 hover:text-white transition p-0.5"
              title="Réduire la largeur"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-slate-300 w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(180, z + 10))}
              className="text-slate-400 hover:text-white transition p-0.5"
              title="Agrandir la largeur"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition ${
              showOriginal
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
            }`}
          >
            {showOriginal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showOriginal ? 'V.O. Anglais' : 'V.F. Traduite'}
          </button>
        </div>
      </div>

      {/* Vertical Webtoon Infinite Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center space-y-4 select-none scroll-smooth">
        {pages.map((pageItem, pageIndex) => {
          const pageKey = pageItem.pageNumber || pageIndex + 1;
          const pageBubbles = pageBubblesMap[pageKey] || pageItem.bubbles || [];

          return (
            <div
              key={pageKey}
              style={{ width: `${zoom}%`, maxWidth: '900px' }}
              className="relative bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden group transition-all duration-150"
            >
              {/* Page Number Badge */}
              <div className="absolute top-3 left-3 z-30 bg-slate-950/80 backdrop-blur border border-slate-800 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-indigo-400" />
                Page {pageKey} {pageItem.title ? `(${pageItem.title})` : ''}
              </div>

              {/* Webtoon Page Image */}
              <img
                src={pageItem.image}
                alt={`Webtoon Page ${pageKey}`}
                className="w-full h-auto block"
                draggable={false}
              />

              {/* Translated Speech Bubbles Overlay */}
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
                    fontSize: `${bubble.fontSize || 14}px`,
                    fontWeight: bubble.fontStyle === 'bold' ? 'bold' : 'normal',
                    fontStyle: bubble.fontStyle === 'italic' ? 'italic' : 'normal'
                  }}
                  className={`absolute p-2 rounded-xl flex items-center justify-center text-center leading-tight transition-all duration-150 border z-20 ${
                    showOriginal
                      ? 'border-2 border-amber-400/80 bg-amber-500/20 text-amber-200'
                      : 'border-slate-400/30 hover:border-indigo-400 shadow-md'
                  }`}
                >
                  <span className="select-text">
                    {showOriginal ? bubble.textEn : bubble.textFr || bubble.textEn}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
