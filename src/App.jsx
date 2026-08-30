import React, { useState, useRef } from 'react';
import Header from './components/Header';
import MangaCanvas from './components/MangaCanvas';
import BubbleEditor from './components/BubbleEditor';
import ScriptTranslator from './components/ScriptTranslator';
import { SAMPLE_MANGA_PAGES, translateText } from './utils/translator';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'script'
  const [samplePages, setSamplePages] = useState(SAMPLE_MANGA_PAGES);
  const [currentSample, setCurrentSample] = useState(SAMPLE_MANGA_PAGES[0]);
  const [customImage, setCustomImage] = useState(null);
  const [bubbles, setBubbles] = useState(SAMPLE_MANGA_PAGES[0].bubbles);
  const [activeBubbleId, setActiveBubbleId] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const canvasRef = useRef(null);

  // Switch demo sample manga page
  const handleSelectSample = (sample) => {
    setCurrentSample(sample);
    setCustomImage(null);
    setBubbles(sample.bubbles);
    setActiveBubbleId(null);
  };

  // Upload user's custom manga page image
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setBubbles([
          {
            id: `bubble-${Date.now()}`,
            x: 25,
            y: 20,
            width: 40,
            height: 15,
            textEn: "Sample manga dialogue",
            textFr: "Exemple de dialogue manga",
            fontSize: 16,
            bgColor: "#ffffff",
            textColor: "#000000",
            fontStyle: "normal"
          }
        ]);
        setActiveBubbleId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add bubble box
  const handleAddBubble = async (box) => {
    const newId = `b-${Date.now()}`;
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

    setBubbles((prev) => [...prev, newBubble]);
    setActiveBubbleId(newId);
  };

  // Update bubble properties
  const handleUpdateBubble = (id, updates) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  // Delete bubble
  const handleDeleteBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    if (activeBubbleId === id) {
      setActiveBubbleId(null);
    }
  };

  // Export manga page canvas as image export / HTML export
  const handleExportImage = () => {
    const jsonScript = JSON.stringify(bubbles, null, 2);
    const blob = new Blob([jsonScript], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manga_page_translated_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export script summary
  const handleExportScript = () => {
    const textLines = bubbles.map(
      (b, idx) => `[Bulle ${idx + 1}] EN: ${b.textEn} -> FR: ${b.textFr}`
    );
    const blob = new Blob([textLines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manga_script_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const imageSrc = customImage || currentSample.image;

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Top Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onImageUpload={handleImageUpload}
        onSelectSample={handleSelectSample}
        samplePages={samplePages}
        onExportImage={handleExportImage}
        onExportScript={handleExportScript}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'studio' ? (
          <>
            <MangaCanvas
              imageSrc={imageSrc}
              bubbles={bubbles}
              activeBubbleId={activeBubbleId}
              setActiveBubbleId={setActiveBubbleId}
              onAddBubble={handleAddBubble}
              onUpdateBubble={handleUpdateBubble}
              onDeleteBubble={handleDeleteBubble}
              showOriginal={showOriginal}
              setShowOriginal={setShowOriginal}
              canvasRef={canvasRef}
            />
            <BubbleEditor
              bubbles={bubbles}
              activeBubbleId={activeBubbleId}
              setActiveBubbleId={setActiveBubbleId}
              onUpdateBubble={handleUpdateBubble}
              onDeleteBubble={handleDeleteBubble}
              onAddBubble={handleAddBubble}
            />
          </>
        ) : (
          <ScriptTranslator />
        )}
      </main>
    </div>
  );
}
