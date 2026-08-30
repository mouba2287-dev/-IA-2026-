import { PORTFOLIO_TEMPLATES } from '../data/templates';

const STORAGE_KEY = 'foliocraft_saved_portfolios_v1';
const USER_KEY = 'foliocraft_user_session_v1';

// Load saved portfolios from LocalStorage with defaults fallback
export function loadSavedPortfolios() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial template defaults if empty
      const initialSeed = PORTFOLIO_TEMPLATES.map((tpl, idx) => ({
        ...tpl,
        id: `pf-seed-${idx + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: `portfolio-${tpl.id}-${Date.now()}`
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read portfolios from LocalStorage:', err);
    return [];
  }
}

// Save or update portfolio
export function savePortfolio(portfolio) {
  try {
    const portfolios = loadSavedPortfolios();
    const existingIndex = portfolios.findIndex((p) => p.id === portfolio.id);

    const updatedPortfolio = {
      ...portfolio,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      portfolios[existingIndex] = updatedPortfolio;
    } else {
      updatedPortfolio.createdAt = new Date().toISOString();
      if (!updatedPortfolio.id) updatedPortfolio.id = `pf-${Date.now()}`;
      if (!updatedPortfolio.slug) updatedPortfolio.slug = `pf-${Date.now()}`;
      portfolios.unshift(updatedPortfolio);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return updatedPortfolio;
  } catch (err) {
    console.error('Failed to save portfolio:', err);
    return portfolio;
  }
}

// Delete portfolio by ID
export function deletePortfolio(id) {
  try {
    const portfolios = loadSavedPortfolios().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return portfolios;
  } catch (err) {
    console.error('Failed to delete portfolio:', err);
    return [];
  }
}

// Duplicate portfolio by ID
export function duplicatePortfolio(id) {
  try {
    const portfolios = loadSavedPortfolios();
    const target = portfolios.find((p) => p.id === id);
    if (!target) return portfolios;

    const newPortfolio = {
      ...JSON.parse(JSON.stringify(target)),
      id: `pf-${Date.now()}`,
      name: `${target.name || target.profile?.fullName || 'Portfolio'} (Copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: `pf-${Date.now()}`
    };

    portfolios.unshift(newPortfolio);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return newPortfolio;
  } catch (err) {
    console.error('Failed to duplicate portfolio:', err);
    return null;
  }
}

// Get single portfolio by ID or Slug
export function getPortfolioById(idOrSlug) {
  const portfolios = loadSavedPortfolios();
  return portfolios.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

// Shareable URL generator (encodes portfolio as compressed base64 URI component)
export function encodePortfolioToUrl(portfolio) {
  try {
    const jsonStr = JSON.stringify(portfolio);
    const b64 = btoa(encodeURIComponent(jsonStr));
    return `${window.location.origin}${window.location.pathname}#p=${b64}`;
  } catch (err) {
    console.error('Encoding portfolio failed:', err);
    return `${window.location.origin}${window.location.pathname}#id=${portfolio.id}`;
  }
}

// Decode portfolio from encoded URL hash
export function decodePortfolioFromUrlHash(hashStr) {
  if (!hashStr) return null;
  try {
    if (hashStr.startsWith('#p=')) {
      const b64 = hashStr.replace('#p=', '');
      const jsonStr = decodeURIComponent(atob(b64));
      return JSON.parse(jsonStr);
    } else if (hashStr.startsWith('#id=')) {
      const id = hashStr.replace('#id=', '');
      return getPortfolioById(id);
    }
    return null;
  } catch (err) {
    console.error('Failed to decode portfolio hash:', err);
    return null;
  }
}

// User session management helpers
export function getUserSession() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUserSession(userData) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (err) {
    console.error('Failed to save user session:', err);
  }
}

export function clearUserSession() {
  localStorage.removeItem(USER_KEY);
}

// AI Text Generator Simulation for interactive editor
export function generateAiContent(fieldType, jobTitle = 'Développeur Web') {
  const aiPresets = {
    tagline: [
      `Spécialiste en ${jobTitle}, passionné par la création de solutions digitales performantes et innovantes.`,
      `Je transforme vos idées complexes en expériences utilisateur d'exception et scalables.`,
      `Expert ${jobTitle} dédié à la livraison de produits de haute qualité centrés sur les besoins métier.`
    ],
    bio: [
      `Professionnel rigoureux et créatif avec plusieurs années d'expérience en ${jobTitle}. Passionné par la recherche continue de la performance, le propre code et la collaboration d'équipe.`,
      `En tant que ${jobTitle}, mon objectif est de concevoir des architectures robustes et d'offrir une expérience utilisateur irréprochable. Toujours à l'affût des dernières innovations technologiques.`,
      `Fort d'un parcours riche en projets d'envergure, j'aide les entreprises et startups à concrétiser leur vision numérique grâce à mon expertise en ${jobTitle}.`
    ],
    projectDesc: [
      `Application complète avec interface fluide, gestion d'état optimisée et intégration d'APIs tierces.`,
      `Plateforme sur mesure conçue pour répondre aux standards modernes de sécurité et d'accessibilité.`,
      `Solution innovante combinant un design élégant et des performances de premier ordre.`
    ]
  };

  const list = aiPresets[fieldType] || aiPresets.tagline;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Standalone HTML Exporter
export function exportStandaloneHtml(portfolio) {
  const p = portfolio.profile || {};
  const skillsHtml = (portfolio.skills || [])
    .map(
      (s) => `
      <div class="skill-card">
        <div class="skill-header">
          <span>${s.name}</span>
          <span>${s.level}%</span>
        </div>
        <div class="bar-bg"><div class="bar-fill" style="width: ${s.level}%;"></div></div>
      </div>`
    )
    .join('');

  const projectsHtml = (portfolio.projects || [])
    .map(
      (proj) => `
      <div class="project-card">
        <img src="${proj.image}" alt="${proj.title}" class="project-img" />
        <div class="project-body">
          <span class="category">${proj.category || 'Projet'}</span>
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          <div class="tags">${(proj.tags || []).map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" class="btn-link">Voir Démo →</a>` : ''}
        </div>
      </div>`
    )
    .join('');

  const servicesHtml = (portfolio.services || [])
    .map(
      (s) => `
      <div class="service-card">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.fullName || 'Portfolio'} - ${p.jobTitle || 'Professionnel'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; line-height: 1.6; padding: 2rem 1rem; }
    .container { max-width: 1000px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 3rem; padding: 2rem; background: #1e293b; border-radius: 16px; border: 1px solid #334155; }
    header img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; border: 3px solid #6366f1; }
    h1 { font-size: 2.2rem; color: #ffffff; }
    h2 { font-size: 1.3rem; color: #818cf8; margin-bottom: 0.5rem; }
    p.tagline { font-size: 1.1rem; color: #94a3b8; max-width: 600px; margin: 0.5rem auto 1rem; }
    .section { margin-bottom: 3rem; }
    .section-title { font-size: 1.6rem; border-bottom: 2px solid #334155; padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: #6366f1; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .skill-card, .project-card, .service-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 1.25rem; }
    .project-img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; }
    .skill-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-weight: 600; }
    .bar-bg { background: #334155; height: 8px; border-radius: 4px; overflow: hidden; }
    .bar-fill { background: linear-gradient(90deg, #6366f1, #06b6d4); height: 100%; }
    .category { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #818cf8; font-weight: bold; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.8rem; }
    .tag { background: #334155; color: #cbd5e1; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 4px; }
    .btn-link { display: inline-block; margin-top: 1rem; color: #818cf8; text-decoration: none; font-weight: 600; }
    .btn-link:hover { text-decoration: underline; }
    footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #334155; color: #64748b; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="${p.fullName}">` : ''}
      <h1>${p.fullName || 'Portfolio'}</h1>
      <h2>${p.jobTitle || ''}</h2>
      <p class="tagline">${p.tagline || ''}</p>
      <p>📍 ${p.location || ''} | ✉️ ${p.email || ''}</p>
    </header>

    ${portfolio.sections?.about ? `
    <section class="section">
      <h2 class="section-title">À propos</h2>
      <p>${p.bio || ''}</p>
    </section>` : ''}

    ${portfolio.sections?.skills && portfolio.skills?.length ? `
    <section class="section">
      <h2 class="section-title">Compétences</h2>
      <div class="grid">${skillsHtml}</div>
    </section>` : ''}

    ${portfolio.sections?.projects && portfolio.projects?.length ? `
    <section class="section">
      <h2 class="section-title">Projets</h2>
      <div class="grid">${projectsHtml}</div>
    </section>` : ''}

    ${portfolio.sections?.services && portfolio.services?.length ? `
    <section class="section">
      <h2 class="section-title">Services</h2>
      <div class="grid">${servicesHtml}</div>
    </section>` : ''}

    <footer>
      <p>Portfolio généré avec FolioCraft - ${new Date().getFullYear()}</p>
    </footer>
  </div>
</body>
</html>`;

  return html;
}
