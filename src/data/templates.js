export const PORTFOLIO_TEMPLATES = [
  {
    id: 'tech-dev',
    name: 'Développeur Full-Stack & Cloud',
    category: 'Tech & Code',
    description: 'Design moderne sombre ultra-soigné idéal pour développeurs, ingénieurs et experts tech.',
    badge: 'Populaire',
    theme: {
      colorScheme: 'indigo-cyber',
      primaryColor: '#6366f1',
      secondaryColor: '#06b6d4',
      bgStyle: 'dark-mesh',
      fontFamily: 'sans',
      borderRadius: 'rounded-xl'
    },
    profile: {
      fullName: 'Alexandre Dupont',
      jobTitle: 'Développeur Full-Stack Senior & Architecte React',
      tagline: 'Je bâtis des applications web haute performance, scalables et intuitives.',
      bio: 'Développeur passionné avec plus de 6 ans d’expérience dans la création de solutions web et cloud modernes. Spécialisé en React, Node.js et architecture serverless.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      location: 'Paris, France (Disponible en Remote)',
      email: 'alexandre.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        website: 'https://alexdupont.dev'
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
    skills: [
      { name: 'React / Next.js', level: 95, category: 'Frontend' },
      { name: 'TypeScript', level: 90, category: 'Frontend' },
      { name: 'Tailwind CSS / UI', level: 92, category: 'Frontend' },
      { name: 'Node.js / Express', level: 88, category: 'Backend' },
      { name: 'PostgreSQL & MongoDB', level: 85, category: 'Database' },
      { name: 'Docker & AWS', level: 80, category: 'DevOps' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'SaaS Analytics Dashboard',
        category: 'Web App',
        description: 'Plateforme d’analyse de données en temps réel avec graphiques interactifs et export de rapports PDF.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        tags: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
        demoUrl: 'https://example.com/demo1',
        githubUrl: 'https://github.com/example/demo1',
        featured: true
      },
      {
        id: 'p2',
        title: 'E-commerce Headless FastCart',
        category: 'E-Commerce',
        description: 'Boutique en ligne haute vitesse synchronisée avec Shopify API et paiement Stripe.',
        image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?w=600&auto=format&fit=crop&q=80',
        tags: ['Next.js', 'Stripe', 'GraphQL', 'Tailwind'],
        demoUrl: 'https://example.com/demo2',
        githubUrl: 'https://github.com/example/demo2',
        featured: true
      },
      {
        id: 'p3',
        title: 'AI Code Assistant CLI',
        category: 'Open Source',
        description: 'Outil en ligne de commande boosté par l’IA pour la génération automatique de tests unitaires.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
        tags: ['Node.js', 'OpenAI API', 'CLI'],
        demoUrl: 'https://example.com/demo3',
        githubUrl: 'https://github.com/example/demo3',
        featured: false
      }
    ],
    experiences: [
      {
        id: 'e1',
        role: 'Lead Developer Frontend',
        company: 'TechPulse Solutions',
        period: '2022 - Présent',
        location: 'Paris',
        description: 'Direction de l’équipe frontend de 5 ingénieurs. Refonte complète de la suite d’outils SaaS en React & TypeScript.'
      },
      {
        id: 'e2',
        role: 'Développeur Full-Stack',
        company: 'Digital Studio Ninja',
        period: '2019 - 2022',
        location: 'Lyon',
        description: 'Développement d’applications web sur mesure pour des clients PME et grands comptes.'
      }
    ],
    services: [
      {
        id: 's1',
        title: 'Développement Web SaaS',
        description: 'Création d’applications web modernes, réactives et sécurisées prêtes pour la mise en production.',
        icon: 'Code'
      },
      {
        id: 's2',
        title: 'Audit & Optimisation Web Performance',
        description: 'Amélioration du score Core Web Vitals, temps de chargement et référencement SEO.',
        icon: 'Zap'
      },
      {
        id: 's3',
        title: 'Architectures Cloud & API',
        description: 'Conception d’APIs REST/GraphQL et intégration de services cloud automatisés.',
        icon: 'Server'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Sophie Laurent',
        role: 'CTO @ InnovTech',
        content: 'Alexandre a livré notre produit dans des délais record avec une qualité de code irréprochable. Un vrai professionnel !',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 't2',
        name: 'Marc Benichou',
        role: 'Fondateur @ StartupFlow',
        content: 'Une collaboration au top ! La vitesse d’exécution et le sens du détail de son travail nous ont impressionnés.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'ux-designer',
    name: 'Designer UX/UI & Product Designer',
    category: 'Design & Art',
    description: 'Layout esthétique et immersif pour designers visuels, directeurs artistiques et ergonomes.',
    badge: 'Créatif',
    theme: {
      colorScheme: 'rose-sunset',
      primaryColor: '#ec4899',
      secondaryColor: '#f97316',
      bgStyle: 'clean-gradient',
      fontFamily: 'sans',
      borderRadius: 'rounded-2xl'
    },
    profile: {
      fullName: 'Camille Moreau',
      jobTitle: 'Product Designer UX/UI & Lead UI Specialist',
      tagline: 'Conception d’expériences numériques élégantes, centrées sur l’utilisateur et mémorables.',
      bio: 'Designer passionnée avec 5+ années d’expérience à façonner l’identité visuelle et le parcours utilisateur de marques mondiales.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      location: 'Bordeaux, France',
      email: 'camille.design@example.com',
      phone: '+33 6 98 76 54 32',
      socialLinks: {
        dribbble: 'https://dribbble.com',
        behance: 'https://behance.net',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
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
    skills: [
      { name: 'UI / UX Design', level: 98, category: 'Design' },
      { name: 'Figma & Design Systems', level: 95, category: 'Design' },
      { name: 'Prototypage & Wireframing', level: 92, category: 'Design' },
      { name: 'Recherche Utilisateur', level: 85, category: 'Research' },
      { name: 'Micro-animations (Lottie/Framer)', level: 88, category: 'Motion' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'App Mobile Neobank Horizon',
        category: 'UI/UX Mobile',
        description: 'Redesign complet de l’application bancaire mobile pour rendre la gestion de budget fluide et engageante.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
        tags: ['Figma', 'UI Design', 'Design System', 'iOS'],
        demoUrl: 'https://dribbble.com',
        githubUrl: '',
        featured: true
      },
      {
        id: 'p2',
        title: 'Design System Lumina UI',
        category: 'Design System',
        description: 'Système de composants UI complet pour une plateforme de streaming média réutilisable.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        tags: ['Figma', 'Token System', 'Accessibility'],
        demoUrl: 'https://behance.net',
        githubUrl: '',
        featured: true
      }
    ],
    experiences: [
      {
        id: 'e1',
        role: 'Senior Product Designer',
        company: 'Creative Labs',
        period: '2021 - Présent',
        location: 'Bordeaux',
        description: 'Conception de prototypes interactifs et encadrement des ateliers de Design Thinking.'
      }
    ],
    services: [
      {
        id: 's1',
        title: 'Design d’Interface UI/UX',
        description: 'Création d’interfaces web et mobiles sur mesure à fort impact visuel et utilisabilité maximale.',
        icon: 'Figma'
      },
      {
        id: 's2',
        title: 'Design Systems Scalables',
        description: 'Mise en place de bibliothèques UI cohérentes pour accélérer le développement de vos équipes.',
        icon: 'Layers'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Julien Mercier',
        role: 'CEO @ Appify',
        content: 'Camille a su capter exactement la vision de notre marque et l’a transformée en un produit magnifique.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'executive-consultant',
    name: 'Consultant, Executive & Management',
    category: 'Corporate',
    description: 'Style épuré, très professionnel et élégant pour consultants, dirigeants et experts métier.',
    badge: 'Professionnel',
    theme: {
      colorScheme: 'slate-luxury',
      primaryColor: '#0f172a',
      secondaryColor: '#3b82f6',
      bgStyle: 'clean-slate',
      fontFamily: 'serif',
      borderRadius: 'rounded-lg'
    },
    profile: {
      fullName: 'Thomas Vallet',
      jobTitle: 'Consultant Stratégie Digital & Transformation Cloud',
      tagline: 'Accompagner les entreprises vers une croissance durable et l’excellence opérationnelle.',
      bio: 'Plus de 10 ans d’expérience en conseil de direction auprès de grands groupes et ETI dans leurs enjeux de numérisation.',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      location: 'Genève / Paris',
      email: 'thomas.vallet@consulting.com',
      phone: '+41 22 123 45 67',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        website: 'https://thomasvallet.com'
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
    skills: [
      { name: 'Stratégie Digitale', level: 95, category: 'Management' },
      { name: 'Management de Projets Agiles', level: 90, category: 'Agile' },
      { name: 'Conduite du Changement', level: 92, category: 'Organization' },
      { name: 'Audit de Processus SaaS', level: 88, category: 'Strategy' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'Plan de Transformation Digitale Groupe Banque',
        category: 'Conseil',
        description: 'Modernisation des outils de gestion client pour plus de 500 collaborateurs à travers 4 pays.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        tags: ['Stratégie', 'Change Management', 'KPIs'],
        demoUrl: '',
        githubUrl: '',
        featured: true
      }
    ],
    experiences: [
      {
        id: 'e1',
        role: 'Senior Partner',
        company: 'Vallet Consulting Group',
        period: '2018 - Présent',
        location: 'Genève',
        description: 'Accompagnement de plus de 30 comités de direction dans leur transition numérique.'
      }
    ],
    services: [
      {
        id: 's1',
        title: 'Diagnostic & Roadmap Stratégique',
        description: 'Analyse approfondie de votre maturité numérique et plan d’action à fort impact.',
        icon: 'Compass'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Claire Vaneau',
        role: 'Directrice Générale @ LogisticsCorp',
        content: 'Un accompagnement brillant qui nous a permis de réduire nos coûts opérationnels de 25%.',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'photographer-artist',
    name: 'Photographe & Directeur Artistique',
    category: 'Photographie & Art',
    description: 'Portfolio visuel axé sur l’image pleine page, l’exposition et les galeries captivantes.',
    badge: 'Visuel',
    theme: {
      colorScheme: 'emerald-dark',
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      bgStyle: 'dark-gallery',
      fontFamily: 'sans',
      borderRadius: 'rounded-2xl'
    },
    profile: {
      fullName: 'Léa Bernard',
      jobTitle: 'Photographe Mode, Architecture & Portrait',
      tagline: 'Capturer la poésie des instants bruts et la lumière des espaces.',
      bio: 'Photographe basée entre Paris et Tokyo. Publication dans divers magazines de mode et d’architecture contemporaine.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      location: 'Paris / Worldwide',
      email: 'lea.photo@example.com',
      phone: '+33 6 55 44 33 22',
      socialLinks: {
        instagram: 'https://instagram.com',
        behance: 'https://behance.net',
        website: 'https://leabernard.com'
      }
    },
    sections: {
      about: true,
      skills: false,
      projects: true,
      experience: false,
      services: true,
      testimonials: true,
      contact: true
    },
    skills: [],
    projects: [
      {
        id: 'p1',
        title: 'Série Éclats Urbains',
        category: 'Architecture',
        description: 'Une étude photographique sur les reflets de verre et d’acier au cœur de Tokyo.',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80',
        tags: ['Architecture', 'Tokyo', 'Lumières'],
        demoUrl: '',
        githubUrl: '',
        featured: true
      },
      {
        id: 'p2',
        title: 'Portraits Minimalistes',
        category: 'Portrait',
        description: 'Série de portraits studio travaillés en noir et blanc avec éclairage naturel.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
        tags: ['Studio', 'Portrait', 'N&B'],
        demoUrl: '',
        githubUrl: '',
        featured: true
      }
    ],
    experiences: [],
    services: [
      {
        id: 's1',
        title: 'Shooting Studio & Lookbook',
        description: 'Séances photo pour marques de mode, créateurs et campagnes publicitaires.',
        icon: 'Camera'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Élodie Rocher',
        role: 'Rédactrice en Chef @ FashionMag',
        content: 'Les photos de Léa ont donné une dimension exceptionnelle à notre dernier numéro.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'freelance-creator',
    name: 'Freelance & Creator Digital',
    category: 'Marketing & Création',
    description: 'Idéal pour créateurs de contenu, redacteurs web, community managers et indépendants.',
    badge: 'Polyvalent',
    theme: {
      colorScheme: 'sunset-amber',
      primaryColor: '#f59e0b',
      secondaryColor: '#ea580c',
      bgStyle: 'warm-modern',
      fontFamily: 'sans',
      borderRadius: 'rounded-xl'
    },
    profile: {
      fullName: 'Maxime Ronsard',
      jobTitle: 'Copywriter, Strategist & Content Creator',
      tagline: 'Transformer vos messages en histoires captivantes qui génèrent de la conversion.',
      bio: 'Spécialiste de la rédaction web, du storytelling et des stratégies d’inbound marketing pour startups écoresponsables.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      location: 'Nantes, France',
      email: 'maxime@copycraft.io',
      phone: '+33 6 77 88 99 00',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com'
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
    skills: [
      { name: 'Copywriting & Content Strategy', level: 96, category: 'Marketing' },
      { name: 'SEO & Rédaction Web', level: 92, category: 'SEO' },
      { name: 'Newsletter & Emailing', level: 88, category: 'Marketing' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'Campagne Lancement EcoPack',
        category: 'Copywriting',
        description: 'Rédaction de la page de vente et de la séquence email ayant généré 45k€ de CA en 7 jours.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
        tags: ['Copywriting', 'Conversion', 'SaaS'],
        demoUrl: '',
        githubUrl: '',
        featured: true
      }
    ],
    experiences: [
      {
        id: 'e1',
        role: 'Copywriter Freelance',
        company: 'Indépendant',
        period: '2020 - Présent',
        location: 'Remote',
        description: 'Rédaction pour plus de 40 clients dans le secteur tech et e-commerce.'
      }
    ],
    services: [
      {
        id: 's1',
        title: 'Pages de Vente & Landing Pages',
        description: 'Des textes convaincants taillés pour captiver votre audience et booster vos ventes.',
        icon: 'Feather'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'David Marchand',
        role: 'Fondateur @ GreenTech',
        content: 'Maxime possède une plume percutante. Notre taux de conversion a augmenté de 40% !',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'minimalist-clean',
    name: 'Élégance Minimaliste',
    category: 'Minimaliste',
    description: 'Sobriété et typographie raffinée pour un portfolio épuré qui va droit à l’essentiel.',
    badge: 'Épuré',
    theme: {
      colorScheme: 'monochrome',
      primaryColor: '#18181b',
      secondaryColor: '#52525b',
      bgStyle: 'clean-white',
      fontFamily: 'serif',
      borderRadius: 'rounded-none'
    },
    profile: {
      fullName: 'Inès Chevalier',
      jobTitle: 'Architecte & Visual Designer',
      tagline: 'L’art du détail, la pureté des lignes.',
      bio: 'Créatrice d’espaces et d’identités minimalistes pour des marques de luxe et galeries contemporaines.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      location: 'Paris, France',
      email: 'ines@chevalier-studio.com',
      phone: '+33 1 42 68 00 00',
      socialLinks: {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    },
    sections: {
      about: true,
      skills: true,
      projects: true,
      experience: false,
      services: true,
      testimonials: true,
      contact: true
    },
    skills: [
      { name: 'Architecture d’Intérieur', level: 94, category: 'Design' },
      { name: 'Direction Artistique', level: 90, category: 'Art' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'Pavillon Minimaliste A',
        category: 'Architecture',
        description: 'Résidence privée intégrée au paysage naturel avec matériaux bruts.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
        tags: ['Architecture', 'Béton', 'Bois'],
        demoUrl: '',
        githubUrl: '',
        featured: true
      }
    ],
    experiences: [],
    services: [
      {
        id: 's1',
        title: 'Conception d’Espaces & Design',
        description: 'Études architecturales et aménagements épurés sur mesure.',
        icon: 'Box'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Antoine Delorme',
        role: 'Collectionneur d’Art',
        content: 'Un sens inégalé des volumes et de la sobriété.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const COLOR_PALETTES = [
  { id: 'indigo-cyber', name: 'Indigo Cyber', primary: '#6366f1', secondary: '#06b6d4', darkBg: 'bg-slate-950', textDark: 'text-slate-100', cardDark: 'bg-slate-900/90 border-slate-800' },
  { id: 'rose-sunset', name: 'Rose Sunset', primary: '#ec4899', secondary: '#f97316', darkBg: 'bg-zinc-950', textDark: 'text-zinc-100', cardDark: 'bg-zinc-900/90 border-zinc-800' },
  { id: 'emerald-dark', name: 'Émeraude Éléganse', primary: '#10b981', secondary: '#06b6d4', darkBg: 'bg-emerald-950/60', textDark: 'text-emerald-50', cardDark: 'bg-slate-900/90 border-emerald-900/50' },
  { id: 'slate-luxury', name: 'Ardoise & Bleue', primary: '#3b82f6', secondary: '#64748b', darkBg: 'bg-slate-900', textDark: 'text-slate-100', cardDark: 'bg-slate-800/90 border-slate-700' },
  { id: 'sunset-amber', name: 'Ambre Chaud', primary: '#f59e0b', secondary: '#ea580c', darkBg: 'bg-neutral-950', textDark: 'text-neutral-100', cardDark: 'bg-neutral-900/90 border-neutral-800' },
  { id: 'monochrome', name: 'Noir & Blanc Épuré', primary: '#18181b', secondary: '#71717a', darkBg: 'bg-zinc-950', textDark: 'text-zinc-100', cardDark: 'bg-zinc-900 border-zinc-800' }
];
