import React, { useState, useEffect } from 'react';
import {
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle,
  Briefcase,
  Code,
  Zap,
  Server,
  Layers,
  Compass,
  Camera,
  Feather,
  Box,
  Image as ImageIcon
} from 'lucide-react';
import { COLOR_PALETTES } from '../data/templates';

// Custom Brand SVGs
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function PortfolioRenderer({ portfolio, isPreview = false, onShowToast }) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactMessage, setContactMessage] = useState({ name: '', email: '', message: '' });

  // Dynamically update document title for SEO
  useEffect(() => {
    if (portfolio?.seo?.metaTitle) {
      document.title = portfolio.seo.metaTitle;
    } else if (portfolio?.profile?.fullName) {
      document.title = `${portfolio.profile.fullName} - ${portfolio.profile.jobTitle || 'Portfolio'}`;
    }
  }, [portfolio]);

  if (!portfolio) {
    return (
      <div className="p-8 text-center text-slate-400">
        Aucun portfolio à afficher.
      </div>
    );
  }

  const {
    profile = {},
    theme = {},
    sections = {},
    skills = [],
    projects = [],
    experiences = [],
    services = [],
    testimonials = [],
    seo = {}
  } = portfolio;

  // Schema.org Structured Data for Google SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.fullName || "Professionnel",
    "jobTitle": profile.jobTitle || "",
    "description": seo.metaDescription || profile.tagline || profile.bio || "",
    "email": profile.email || "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profile.location || ""
    },
    "sameAs": Object.values(profile.socialLinks || {}).filter(Boolean)
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Server': return <Server className="w-6 h-6 text-cyan-400" />;
      case 'Figma': return <Layers className="w-6 h-6 text-pink-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-blue-400" />;
      case 'Camera': return <Camera className="w-6 h-6 text-emerald-400" />;
      case 'Feather': return <Feather className="w-6 h-6 text-orange-400" />;
      case 'Box': return <Box className="w-6 h-6 text-slate-400" />;
      default: return <Briefcase className="w-6 h-6 text-indigo-400" />;
    }
  };

  const palette = COLOR_PALETTES.find((p) => p.id === theme.colorScheme) || COLOR_PALETTES[0];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    if (onShowToast) {
      onShowToast(`Message envoyé avec succès à ${profile.fullName || 'l’auteur'} !`, 'success');
    }
    setTimeout(() => {
      setContactSubmitted(false);
      setContactMessage({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className={`w-full min-h-full ${palette.darkBg} ${palette.textDark} font-sans transition-colors duration-300 relative`}>
      {/* Schema.org Structured Data script for Google Search indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Portfolio Top Bar with Easy Section Navigation */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex items-center justify-between shadow-xl">
        <a href="#hero" className="text-sm font-black tracking-wide text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          {profile.fullName || 'Portfolio'}
        </a>

        {/* Easy Section Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          {sections.about && <a href="#about" className="hover:text-indigo-400 transition">À Propos</a>}
          {sections.skills && skills.length > 0 && <a href="#skills" className="hover:text-indigo-400 transition">Compétences</a>}
          {sections.projects && projects.length > 0 && <a href="#projects" className="hover:text-indigo-400 transition">Projets</a>}
          {sections.experience && experiences.length > 0 && <a href="#experience" className="hover:text-indigo-400 transition">Expérience</a>}
          {sections.services && services.length > 0 && <a href="#services" className="hover:text-indigo-400 transition">Services</a>}
          {sections.contact && <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>}
        </nav>

        {sections.contact && (
          <a
            href="#contact"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/30"
          >
            Me Contacter
          </a>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* HERO SECTION */}
        <section id="hero" className="pt-8 text-center space-y-6">
          {profile.avatarUrl && (
            <div className="relative inline-block">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName || 'Photo de profil'}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-500/80 shadow-2xl object-cover mx-auto transform hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Disponible" />
            </div>
          )}

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {profile.fullName || 'Votre Nom'}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {profile.jobTitle || 'Votre Profession'}
            </p>
            {profile.tagline && (
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                "{profile.tagline}"
              </p>
            )}
          </div>

          {/* Social Icons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" title="GitHub" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {profile.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" title="Twitter / X" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <Globe className="w-4 h-4 text-cyan-400" />
              </a>
            )}
            {profile.socialLinks?.instagram && (
              <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" title="Instagram" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <Camera className="w-4 h-4 text-pink-400" />
              </a>
            )}
            {profile.socialLinks?.dribbble && (
              <a href={profile.socialLinks.dribbble} target="_blank" rel="noreferrer" title="Portfolio / Dribbble" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <ImageIcon className="w-4 h-4 text-purple-400" />
              </a>
            )}
            {profile.socialLinks?.website && (
              <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" title="Site Web" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:text-indigo-400 hover:border-indigo-500 transition">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </section>

        {/* ABOUT SECTION */}
        {sections.about && (
          <section id="about" className="space-y-6 pt-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-indigo-500 rounded-full" />
              À Propos
            </h2>
            <div className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 leading-relaxed text-sm text-slate-300">
              <p className="whitespace-pre-line">{profile.bio || 'Présentation en cours de rédaction...'}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-xs">
                {profile.location && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SKILLS SECTION */}
        {sections.skills && skills.length > 0 && (
          <section id="skills" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-cyan-500 rounded-full" />
              Compétences & Expertises
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                    <span>{skill.name}</span>
                    <span className="text-indigo-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {sections.projects && projects.length > 0 && (
          <section id="projects" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-purple-500 rounded-full" />
              Projets Réalisés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-indigo-500/50 transition flex flex-col justify-between group"
                >
                  {proj.image && (
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {proj.category && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-indigo-300 text-[10px] font-bold rounded-lg border border-slate-700">
                          {proj.category}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {proj.tags && proj.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {proj.tags.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <span>Démo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE SECTION */}
        {sections.experience && experiences.length > 0 && (
          <section id="experience" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-amber-500 rounded-full" />
              Parcours & Expérience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl relative pl-8 border-l-4 border-l-indigo-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mb-2">
                    🏢 {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SERVICES SECTION */}
        {sections.services && services.length > 0 && (
          <section id="services" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-emerald-500 rounded-full" />
              Services Proposés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getServiceIcon(srv.icon)}
                  </div>
                  <h3 className="text-base font-bold text-white">{srv.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TESTIMONIALS SECTION */}
        {sections.testimonials && testimonials.length > 0 && (
          <section id="testimonials" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-rose-500 rounded-full" />
              Témoignages & Recommandations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                    {t.avatar && (
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <p className="text-[11px] text-indigo-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {sections.contact && (
          <section id="contact" className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <span className="w-2 h-6 bg-cyan-500 rounded-full" />
              Me Contacter
            </h2>
            <div className="p-6 sm:p-8 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
              <p className="text-xs sm:text-sm text-slate-300">
                Vous avez un projet, une opportunité ou souhaitez discuter ? Envoyez-moi un message directement via le formulaire ci-dessous.
              </p>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center space-y-2 text-emerald-300 animate-fade-in">
                  <CheckCircle className="w-8 h-8 mx-auto" />
                  <h4 className="font-bold text-sm">Message Envoyé !</h4>
                  <p className="text-xs text-emerald-400">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Votre Nom</label>
                      <input
                        type="text"
                        required
                        value={contactMessage.name}
                        onChange={(e) => setContactMessage({ ...contactMessage, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Votre E-mail</label>
                      <input
                        type="email"
                        required
                        value={contactMessage.email}
                        onChange={(e) => setContactMessage({ ...contactMessage, email: e.target.value })}
                        placeholder="jean@exemple.com"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage.message}
                      onChange={(e) => setContactMessage({ ...contactMessage, message: e.target.value })}
                      placeholder="Bonjour, je souhaite vous contacter pour..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {profile.fullName || 'Portfolio'}. Généré avec FolioCraft.</p>
      </footer>
    </div>
  );
}
