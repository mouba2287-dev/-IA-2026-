import React, { useState, useRef } from 'react';
import Header from './components/Header';
import MangaCanvas from './components/MangaCanvas';
import BubbleEditor from './components/BubbleEditor';
import ScriptTranslator from './components/ScriptTranslator';
import WebtoonReader from './components/WebtoonReader';
import { SAMPLE_MANGA_PAGES, translateText } from './utils/translator';
import { parseMangaDocument } from './utils/documentParser';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'webtoon' | 'script'
  const [samplePages, setSamplePages] = useState(SAMPLE_MANGA_PAGES);
  const [currentSample, setCurrentSample] = useState(SAMPLE_MANGA_PAGES[0]);

  // Document Pages State (multi-page PDF, CBZ, ZIP or multiple images)
  const [pages, setPages] = useState([
    {
      pageNumber: 1,
      image: SAMPLE_MANGA_PAGES[0].image,
      title: SAMPLE_MANGA_PAGES[0].title,
      bubbles: SAMPLE_MANGA_PAGES[0].bubbles
    }
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Map of bubbles per page key: { 1: [bubble1, bubble2], 2: [...] }
  const [pageBubblesMap, setPageBubblesMap] = useState({
    1: SAMPLE_MANGA_PAGES[0].bubbles
  });

  const [activeBubbleId, setActiveBubbleId] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isTranslatingAllPages, setIsTranslatingAllPages] = useState(false);
  const [fileError, setFileError] = useState(null);
  const canvasRef = useRef(null);

  const currentPageNumber = currentPageIndex + 1;
  const currentBubbles = pageBubblesMap[currentPageNumber] || [];

  // Switch demo sample manga page
  const handleSelectSample = (sample) => {
    setCurrentSample(sample);
    setPages([
      {
        pageNumber: 1,
        image: sample.image,
        title: sample.title,
        bubbles: sample.bubbles
      }
    ]);
    setCurrentPageIndex(0);
    setPageBubblesMap({ 1: sample.bubbles });
    setActiveBubbleId(null);
  };

  // Upload user's PDF, CBZ, ZIP, or Multiple Images
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoadingFile(true);
    setFileError(null);

    try {
      const extractedPages = await parseMangaDocument(files);
      if (extractedPages && extractedPages.length > 0) {
        setPages(extractedPages);
        setCurrentPageIndex(0);

        // Initialize default bubbles for each page if empty
        const initialMap = {};
        extractedPages.forEach((p, idx) => {
          const pNum = idx + 1;
          initialMap[pNum] = p.bubbles || [
            {
              id: `b-${pNum}-1`,
              x: 20,
              y: 15,
              width: 40,
              height: 15,
              textEn: `Page ${pNum} dialogue text`,
              textFr: `Texte de dialogue Page ${pNum}`,
              fontSize: 16,
              bgColor: "#ffffff",
              textColor: "#000000",
              fontStyle: "normal"
            }
          ];
        });

        setPageBubblesMap(initialMap);
        setActiveBubbleId(null);

        // Automatically switch to Webtoon reader mode
        setActiveTab('webtoon');

        // Automatically translate all pages immediately without waiting
        setIsTranslatingAllPages(true);
        const translatedMap = { ...initialMap };

        for (const pageKey of Object.keys(translatedMap)) {
          const pageBubbles = translatedMap[pageKey] || [];
          const translatedBubbles = [];
          for (const b of pageBubbles) {
            const textFr = await translateText(b.textEn || `Page ${pageKey} content`);
            translatedBubbles.push({ ...b, textFr });
          }
          translatedMap[pageKey] = translatedBubbles;
        }

        setPageBubblesMap(translatedMap);
        setIsTranslatingAllPages(false);
      }
    } catch (err) {
      console.error("File processing error:", err);
      setFileError(err.message || "Erreur lors de la lecture des fichiers.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  // Add bubble box to current page
  const handleAddBubble = async (box) => {
    const newId = `b-${currentPageNumber}-${Date.now()}`;
    const defaultEn = "New dialogue text";
    const defaultFr = await translateText(defaultEn);

    const newBubble = {
      id: newId,
      x: box.x,
      y: box.y,
      width: box.width || 30,
      height: box.height || 15,
      textEn: defaultEn,
      textFr: defaultFr,
      fontSize: 15,
      bgColor: "#ffffff",
      textColor: "#000000",
      fontStyle: "normal"
    };

    setPageBubblesMap((prev) => ({
      ...prev,
      [currentPageNumber]: [...(prev[currentPageNumber] || []), newBubble]
    }));
    setActiveBubbleId(newId);
  };

  // Update bubble properties on current page
  const handleUpdateBubble = (id, updates) => {
    setPageBubblesMap((prev) => ({
      ...prev,
      [currentPageNumber]: (prev[currentPageNumber] || []).map((b) =>
        b.id === id ? { ...b, ...updates } : b
      )
    }));
  };

  // Delete bubble from current page
  const handleDeleteBubble = (id) => {
    setPageBubblesMap((prev) => ({
      ...prev,
      [currentPageNumber]: (prev[currentPageNumber] || []).filter((b) => b.id !== id)
    }));
    if (activeBubbleId === id) {
      setActiveBubbleId(null);
    }
  };

  // Translate all speech bubbles across all Webtoon pages
  const handleTranslateAllPages = async () => {
    setIsTranslatingAllPages(true);
    const updatedMap = { ...pageBubblesMap };

    for (const pageKey of Object.keys(updatedMap)) {
      const pageBubbles = updatedMap[pageKey] || [];
      const translatedBubbles = [];

      for (const b of pageBubbles) {
        if (b.textEn && !b.textFr) {
          const textFr = await translateText(b.textEn);
          translatedBubbles.push({ ...b, textFr });
        } else {
          translatedBubbles.push(b);
        }
      }
      updatedMap[pageKey] = translatedBubbles;
    }

    setPageBubblesMap(updatedMap);
    setIsTranslatingAllPages(false);
  };

  // Export JSON configuration of all pages & bubbles
  const handleExportImage = () => {
    const jsonScript = JSON.stringify(
      { pages: pages.map((p) => p.title), pageBubblesMap },
      null,
      2
    );
    const blob = new Blob([jsonScript], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manga_translation_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export full script summary as TXT
  const handleExportScript = () => {
    const textLines = [];
    Object.keys(pageBubblesMap).forEach((pNum) => {
      textLines.push(`=== PAGE ${pNum} ===`);
      (pageBubblesMap[pNum] || []).forEach((b, idx) => {
        textLines.push(`[Bulle ${idx + 1}] EN: ${b.textEn} -> FR: ${b.textFr}`);
      });
      textLines.push('');
    });

    const blob = new Blob([textLines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manga_full_script_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentImageSrc = pages[currentPageIndex]?.image || SAMPLE_MANGA_PAGES[0].image;

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Top Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFileUpload={handleFileUpload}
        onSelectSample={handleSelectSample}
        samplePages={samplePages}
        onExportImage={handleExportImage}
        onExportScript={handleExportScript}
        isLoadingFile={isLoadingFile}
      />

      {/* Error Banner */}
      {fileError && (
        <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-2 text-xs text-rose-200 flex items-center justify-between">
          <span>⚠️ {fileError}</span>
          <button onClick={() => setFileError(null)} className="font-bold hover:underline">
            Fermer
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'studio' ? (
          <>
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Multi-page Navigation Bar */}
              {pages.length > 1 && (
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">
                    Page {currentPageIndex + 1} sur {pages.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPageIndex === 0}
                      onClick={() => setCurrentPageIndex((i) => Math.max(0, i - 1))}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded text-slate-200 transition"
                    >
                      ◀ Page Précédente
                    </button>
                    <button
                      disabled={currentPageIndex === pages.length - 1}
                      onClick={() => setCurrentPageIndex((i) => Math.min(pages.length - 1, i + 1))}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded text-white transition"
                    >
                      Page Suivante ▶
                    </button>
                  </div>
                </div>
              )}

              <MangaCanvas
                imageSrc={currentImageSrc}
                bubbles={currentBubbles}
                activeBubbleId={activeBubbleId}
                setActiveBubbleId={setActiveBubbleId}
                onAddBubble={handleAddBubble}
                onUpdateBubble={handleUpdateBubble}
                onDeleteBubble={handleDeleteBubble}
                showOriginal={showOriginal}
                setShowOriginal={setShowOriginal}
                canvasRef={canvasRef}
              />
            </div>

            <BubbleEditor
              bubbles={currentBubbles}
              activeBubbleId={activeBubbleId}
              setActiveBubbleId={setActiveBubbleId}
              onUpdateBubble={handleUpdateBubble}
              onDeleteBubble={handleDeleteBubble}
              onAddBubble={handleAddBubble}
            />
          </>
        ) : activeTab === 'webtoon' ? (
          <WebtoonReader
            pages={pages}
            pageBubblesMap={pageBubblesMap}
            showOriginal={showOriginal}
            setShowOriginal={setShowOriginal}
            onUpdateBubble={handleUpdateBubble}
            onAddBubble={handleAddBubble}
            onTranslateAllPages={handleTranslateAllPages}
            isTranslatingAll={isTranslatingAllPages}
          />
        ) : (
          <ScriptTranslator />
        )}
      </main>
    </div>
  );
}
