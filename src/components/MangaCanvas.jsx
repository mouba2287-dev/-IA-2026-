import React, { useRef, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Plus, Trash2, Sparkles, Move } from 'lucide-react';

export default function MangaCanvas({
  imageSrc,
  bubbles,
  activeBubbleId,
  setActiveBubbleId,
  onAddBubble,
  onUpdateBubble,
  onDeleteBubble,
  showOriginal,
  setShowOriginal,
  canvasRef
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);

  // Mouse selection for drawing a new speech bubble box over the manga
  const handleMouseDown = (e) => {
    if (!containerRef.current || e.target.tagName === 'TEXTAREA' || e.target.closest('.bubble-box')) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const currentY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    const width = Math.abs(currentX - startPos.x);
    const height = Math.abs(currentY - startPos.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentBox && currentBox.width > 3 && currentBox.height > 3) {
      onAddBubble(currentBox);
    }
    setCurrentBox(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Toolbar Controls */}
      <div className="h-12 border-b border-slate-800 bg-slate-900/80 px-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Éditeur Visual Studio
          </span>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Dézoomer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Zoomer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Réinitialiser zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle: Show translated overlay vs original manga */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition ${
              showOriginal
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
            }`}
          >
            {showOriginal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showOriginal ? 'Affichage : V.O. Anglais' : 'Affichage : V.F. Traduite'}
          </button>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            💡 Astuce: Glissez la souris sur la page pour créer une nouvelle bulle
          </p>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="flex-1 overflow-auto p-6 flex justify-center items-start select-none">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
          className="relative inline-block max-w-full bg-slate-900 shadow-2xl rounded-lg border border-slate-800 transition-transform duration-100 ease-out cursor-crosshair"
        >
          {/* Main Image */}
          <img
            src={imageSrc}
            alt="Manga page"
            className="max-h-[80vh] w-auto block rounded-lg select-none"
            draggable={false}
          />

          {/* Active drawing box preview */}
          {isDrawing && currentBox && (
            <div
              className="absolute border-2 border-dashed border-indigo-400 bg-indigo-500/20 rounded pointer-events-none"
              style={{
                left: `${currentBox.x}%`,
                top: `${currentBox.y}%`,
                width: `${currentBox.width}%`,
                height: `${currentBox.height}%`
              }}
            />
          )}

          {/* Speech Bubbles Overlays */}
          {bubbles.map((bubble) => {
            const isActive = activeBubbleId === bubble.id;
            return (
              <div
                key={bubble.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBubbleId(bubble.id);
                }}
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
                className={`bubble-box absolute p-2 rounded-xl flex items-center justify-center text-center leading-tight transition-all duration-150 ${
                  isActive
                    ? 'ring-2 ring-indigo-500 shadow-lg z-30'
                    : 'border border-slate-400/30 hover:ring-1 hover:ring-indigo-400 z-20'
                } ${showOriginal ? 'border-2 border-amber-400/80 bg-amber-500/20' : ''}`}
              >
                {/* Text Content */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden break-words">
                  {showOriginal ? (
                    <span className="text-amber-200 bg-slate-900/80 px-1 py-0.5 rounded text-xs font-mono">
                      {bubble.textEn || '[Texte EN]'}
                    </span>
                  ) : (
                    <span className="select-text">{bubble.textFr || bubble.textEn || 'Texte...'}</span>
                  )}
                </div>

                {/* Selected bubble actions badge */}
                {isActive && (
                  <div className="absolute -top-3 -right-3 flex gap-1 z-40 bg-slate-900 p-1 rounded-full border border-slate-700 shadow">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBubble(bubble.id);
                      }}
                      className="p-1 rounded-full text-rose-400 hover:bg-rose-500/20 transition"
                      title="Supprimer la bulle"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
