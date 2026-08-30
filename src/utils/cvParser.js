import { PORTFOLIO_TEMPLATES } from '../data/templates';

/**
 * CV Parser Utility
 * Reads plain text or PDF files, extracts relevant sections, and converts them to a portfolio structure
 */

export async function parseCvFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Aucun fichier CV sélectionné.'));
      return;
    }

    const reader = new FileReader();

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // PDF text extraction attempt via FileReader
      reader.onload = (e) => {
        const textContent = e.target.result;
        // Parse extracted string
        const parsed = extractDataFromCvText(typeof textContent === 'string' ? textContent : 'CV Développeur Senior');
        resolve(parsed);
      };
      reader.readAsText(file);
    } else {
      // TXT / Markdown file
      reader.onload = (e) => {
        const text = e.target.result;
        const parsed = extractDataFromCvText(text);
        resolve(parsed);
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du CV.'));
      reader.readAsText(file);
    }
  });
}

export function extractDataFromCvText(rawText) {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Default fallback template
  const baseTemplate = PORTFOLIO_TEMPLATES[0];

  // Regex extractors
  const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  const phoneMatch = rawText.match(/(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}/);

  // First non-empty line as Name candidate or fallback
  const fullName = lines[0] && lines[0].length < 40 ? lines[0] : 'Jean Dupont';
  const jobTitle = lines[1] && lines[1].length < 60 ? lines[1] : 'Développeur Full-Stack & Expert Cloud';

  // Common skills keywords search
  const commonTechs = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Tailwind', 'Docker', 'AWS', 'SQL', 'Figma', 'UI/UX', 'Management', 'SEO', 'Git'];
  const extractedSkills = commonTechs
    .filter((tech) => rawText.toLowerCase().includes(tech.toLowerCase()))
    .map((tech, i) => ({
      name: tech,
      level: 85 - (i * 3 > 30 ? 30 : i * 3),
      category: 'Expertise'
    }));

  const finalSkills = extractedSkills.length > 0 ? extractedSkills : baseTemplate.skills;

  const summary = rawText.length > 100
    ? rawText.substring(0, 300).replace(/\n/g, ' ') + '...'
    : 'Professionnel expérimenté passionné par la création de solutions digitales innovantes et l\'excellence opérationnelle.';

  return {
    id: `pf-cv-${Date.now()}`,
    name: `Portfolio généré depuis CV (${fullName})`,
    category: 'Généré par IA & CV',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    theme: {
      colorScheme: 'indigo-cyber',
      primaryColor: '#6366f1',
      secondaryColor: '#06b6d4',
      bgStyle: 'dark-mesh',
      fontFamily: 'sans',
      borderRadius: 'rounded-xl'
    },
    profile: {
      fullName: fullName,
      jobTitle: jobTitle,
      tagline: `Spécialiste ${jobTitle}, passionné par l'innovation et la livraison de projets à fort impact.`,
      bio: summary,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      location: 'Paris, France',
      email: emailMatch ? emailMatch[0] : 'contact@exemple.com',
      phone: phoneMatch ? phoneMatch[0] : '+33 6 12 34 56 78',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    },
    sections: {
      about: true,
      skills: true,
      projects: true,
      experience: true,
      services: true,
      testimonials: true,
      contact: true
    },
    skills: finalSkills,
    projects: [
      {
        id: `p-cv-1`,
        title: 'Projet Principal - Plateforme Web',
        category: 'Web App',
        description: 'Application sur mesure développée avec les meilleures pratiques de qualité de code et de sécurité.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        tags: finalSkills.slice(0, 3).map((s) => s.name),
        demoUrl: 'https://example.com',
        githubUrl: 'https://github.com'
      }
    ],
    experiences: [
      {
        id: `e-cv-1`,
        role: jobTitle,
        company: 'Entreprise Partenaire',
        period: '2021 - Présent',
        location: 'Paris',
        description: 'Direction technique, développement de fonctionnalités clés et collaboration d’équipe.'
      }
    ],
    services: [
      {
        id: `s-cv-1`,
        title: 'Conseil & Développement',
        description: 'Accompagnement de A à Z dans la réalisation de vos produits digitaux.',
        icon: 'Code'
      }
    ],
    testimonials: [
      {
        id: `t-cv-1`,
        name: 'Marie Curie',
        role: 'Directrice de Projet',
        content: 'Un profil rigoureux, dynamique et orienté résultats !',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      }
    ]
  };
}
