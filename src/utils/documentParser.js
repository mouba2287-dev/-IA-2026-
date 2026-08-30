import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import JSZip from 'jszip';

// Configure pdfjs worker using Vite asset URL importer
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Reads a PDF file and extracts all pages as HTML Canvas Data URLs.
 */
export async function parsePdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    const dataUrl = canvas.toDataURL('image/png');
    pages.push({
      pageNumber: i,
      image: dataUrl,
      title: `Page ${i}`
    });
  }

  return pages;
}

/**
 * Reads a CBZ / ZIP file containing image files (JPG, PNG, WebP) and extracts them in natural sorted order.
 */
export async function parseCbzFile(file) {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  const imageFiles = [];

  // Filter image entries
  const entries = Object.keys(contents.files).filter((filename) => {
    const isImage = /\.(jpg|jpeg|png|webp|bmp|gif)$/i.test(filename);
    return isImage && !contents.files[filename].dir;
  });

  // Sort files naturally (Page 1, Page 2, Page 10...)
  entries.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  let pageNum = 1;
  for (const filename of entries) {
    const zipEntry = contents.files[filename];
    const blob = await zipEntry.async('blob');
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(blob);
    });

    imageFiles.push({
      pageNumber: pageNum,
      image: dataUrl,
      title: filename.split('/').pop() || `Page ${pageNum}`
    });
    pageNum++;
  }

  return imageFiles;
}

/**
 * Main file router to extract pages from PDF, CBZ/ZIP, or single/multiple images.
 */
export async function parseMangaDocument(fileList) {
  const files = Array.from(fileList || []);
  if (files.length === 0) return [];

  // If multiple images are selected
  if (files.length > 1) {
    // Sort files naturally by name
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    const pages = [];
    let pageNum = 1;

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        pages.push({
          pageNumber: pageNum,
          image: dataUrl,
          title: file.name
        });
        pageNum++;
      }
    }
    return pages;
  }

  // Single file uploaded (PDF, CBZ, ZIP, or single Image)
  const file = files[0];
  const filename = file.name.toLowerCase();

  if (filename.endsWith('.pdf')) {
    return await parsePdfFile(file);
  } else if (filename.endsWith('.cbz') || filename.endsWith('.zip') || filename.endsWith('.cbr')) {
    return await parseCbzFile(file);
  } else if (file.type.startsWith('image/')) {
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    return [
      {
        pageNumber: 1,
        image: dataUrl,
        title: file.name
      }
    ];
  } else {
    throw new Error("Format de fichier non supporté. Veuillez importer des fichiers PDF, CBZ, ZIP ou Images.");
  }
}
