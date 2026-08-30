import React from 'react';
import { Languages, Upload, Download, FileText, Image as ImageIcon, Sparkles, BookOpen } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  onImageUpload,
  onSelectSample,
  samplePages,
  onExportImage,
  onExportScript
}) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-wide">MangaTranslate</span>
                <span className="bg-indigo-500/20 text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  EN ➔ FR
                </span>
              </div>
              <p className="text-xs text-slate-400">Traducteur de Manga & Comics Intelligents</p>
            </div>
          </div>

          {/* View Modes Navigation */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Studio Image & Bulles
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'script'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              Traducteur de Texte / Script
            </button>
          </div>

          {/* Quick Actions / Upload & Export */}
          <div className="flex items-center gap-3">
            {/* Sample Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                Exemples Manga
              </button>
              <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto p-1 z-50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Pages de démonstration
                </p>
                {samplePages.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-indigo-600 hover:text-white transition flex flex-col"
                  >
                    <span className="font-medium">{sample.title}</span>
                    <span className="text-[10px] text-slate-400 hover:text-indigo-100">
                      {sample.bubbles.length} bulle(s) détectée(s)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Image Button */}
            <label className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-300 text-xs font-medium cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Importer Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
            </label>

            {/* Export Menu */}
            <div className="flex gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={onExportImage}
                title="Télécharger l'image traduite"
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Page</span>
              </button>
              <button
                onClick={onExportScript}
                title="Exporter le script de traduction (JSON/TXT)"
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Script</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
