// Manga & Anime terminology dictionary for English -> French context refinement
export const MANGA_GLOSSARY = {
  "nakama": "compagnon / ami précieux",
  "sensei": "maître / professeur",
  "senpai": "aîné",
  "kohai": "cadet / junior",
  "otaku": "passionné",
  "shonen": "manga pour jeunes garçons",
  "seinen": "manga pour jeunes adultes",
  "shojo": "manga pour jeunes filles",
  "jutsu": "technique / art secret",
  "ki": "énergie spirituelle / Ki",
  "chakra": "chakra",
  "bankai": "libération suprême",
  "nani": "quoi ?!",
  "masaka": "impossible...",
  "baka": "imbécile / idiot",
  "kage": "chef du village / ombre",
  "san": "M. / Mme",
  "kun": "jeune homme",
  "chan": "petite / cher(e)"
};

// Common Manga English to French phrases & quick dictionary
const MOCK_TRANSLATION_DB = {
  "I will never give up!": "Je n'abandonnerai jamais !",
  "This is my final technique!": "C'est ma technique finale !",
  "Nani?! How is this possible?!": "Quoi ?! Comment est-ce possible ?!",
  "We have to protect our nakama!": "Nous devons protéger nos compagnons !",
  "Don't look down on me!": "Ne me sous-estime pas !",
  "I'm going to be the strongest!": "Je deviendrai le plus fort !",
  "Wait, Sensei! Take me with you!": "Attendez, Maître ! Emmenez-moi avec vous !",
  "Is that all you've got?": "C'est tout ce que tu as ?",
  "I can't lose here... Not now!": "Je ne peux pas perdre ici... Pas maintenant !",
  "Believe it!": "Crois-y !",
  "Curse you!": "Maudit sois-tu !",
  "Silence!": "Silence !",
  "What is this power...?": "Quelle est cette puissance...?",
  "Let's go!": "Allons-y !",
  "Stop right there!": "Arrête-toi là !",
  "Thank you for everything.": "Merci pour tout.",
  "I won't let you hurt them!": "Je ne te laisserai pas leur faire du mal !"
};

/**
 * Translates text from English to French using mock DB fallback, online API (if available), or rule-based translation.
 */
export async function translateText(text, options = {}) {
  const cleanText = text.trim();
  if (!cleanText) return "";

  // 1. Check direct mock dictionary match
  if (MOCK_TRANSLATION_DB[cleanText]) {
    return MOCK_TRANSLATION_DB[cleanText];
  }

  // 2. Fallback free translation API (MyMemory / LibreTranslate)
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=en|fr`
    );
    if (response.ok) {
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let translated = data.responseData.translatedText;
        // Clean up HTML entities if present
        const parser = new DOMParser();
        const dom = parser.parseFromString(`<!doctype html><body>${translated}`, 'text/html');
        return dom.body.textContent || translated;
      }
    }
  } catch (err) {
    console.warn("Translation API fetch error, falling back to rule-based parser:", err);
  }

  // 3. Fallback mock translation heuristic for custom inputs
  let translatedText = cleanText;

  // Replace known manga terms using glossary
  Object.keys(MANGA_GLOSSARY).forEach(term => {
    const reg = new RegExp(`\\b${term}\\b`, 'gi');
    translatedText = translatedText.replace(reg, MANGA_GLOSSARY[term]);
  });

  // Basic sentence replacements
  translatedText = translatedText
    .replace(/\bI am\b/gi, "Je suis")
    .replace(/\bYou are\b/gi, "Tu es")
    .replace(/\bHe is\b/gi, "Il est")
    .replace(/\bShe is\b/gi, "Elle est")
    .replace(/\bWe are\b/gi, "Nous sommes")
    .replace(/\bThey are\b/gi, "Ils sont")
    .replace(/\bWhat\b/gi, "Quoi")
    .replace(/\bWhy\b/gi, "Pourquoi")
    .replace(/\bHow\b/gi, "Comment")
    .replace(/\bWhere\b/gi, "Où")
    .replace(/\bWhen\b/gi, "Quand")
    .replace(/\bNo\b/gi, "Non")
    .replace(/\bYes\b/gi, "Oui")
    .replace(/\bhelp\b/gi, "aide")
    .replace(/\bpower\b/gi, "pouvoir")
    .replace(/\bmonster\b/gi, "monstre")
    .replace(/\bhero\b/gi, "héros")
    .replace(/\bsword\b/gi, "épée")
    .replace(/\bfriend\b/gi, "ami")
    .replace(/\benemy\b/gi, "ennemi");

  return translatedText !== cleanText ? translatedText : `[FR] ${cleanText}`;
}

/**
 * Pre-configured Sample Manga Pages with pre-calculated speech bubble coordinates (in percentage relative to image size).
 */
export const SAMPLE_MANGA_PAGES = [
  {
    id: "sample-1",
    title: "Action Chapter - Hero's Awakening",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
    bubbles: [
      {
        id: "b1",
        x: 18,
        y: 12,
        width: 32,
        height: 14,
        textEn: "I will never give up!",
        textFr: "Je n'abandonnerai jamais !",
        fontSize: 16,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "bold"
      },
      {
        id: "b2",
        x: 58,
        y: 28,
        width: 36,
        height: 16,
        textEn: "Nani?! How is this possible?!",
        textFr: "Quoi ?! Comment est-ce possible ?!",
        fontSize: 15,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "bold"
      },
      {
        id: "b3",
        x: 25,
        y: 68,
        width: 50,
        height: 18,
        textEn: "We have to protect our nakama!",
        textFr: "Nous devons protéger nos compagnons !",
        fontSize: 16,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "italic"
      }
    ]
  },
  {
    id: "sample-2",
    title: "Fantasy Battle - Final Jutsu",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
    bubbles: [
      {
        id: "b4",
        x: 15,
        y: 15,
        width: 40,
        height: 15,
        textEn: "This is my final technique!",
        textFr: "C'est ma technique finale !",
        fontSize: 18,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "bold"
      },
      {
        id: "b5",
        x: 52,
        y: 45,
        width: 38,
        height: 16,
        textEn: "Wait, Sensei! Take me with you!",
        textFr: "Attendez, Maître ! Emmenez-moi avec vous !",
        fontSize: 14,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "normal"
      }
    ]
  },
  {
    id: "sample-3",
    title: "Cyberpunk Alley - The Encounter",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop",
    bubbles: [
      {
        id: "b6",
        x: 20,
        y: 20,
        width: 42,
        height: 14,
        textEn: "Is that all you've got?",
        textFr: "C'est tout ce que tu as ?",
        fontSize: 16,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "bold"
      },
      {
        id: "b7",
        x: 48,
        y: 65,
        width: 44,
        height: 18,
        textEn: "I can't lose here... Not now!",
        textFr: "Je ne peux pas perdre ici... Pas maintenant !",
        fontSize: 15,
        bgColor: "#ffffff",
        textColor: "#000000",
        fontStyle: "italic"
      }
    ]
  }
];
