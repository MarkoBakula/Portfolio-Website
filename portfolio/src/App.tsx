import { useState, useEffect, useRef } from "react";

type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  gifSrc: string;
  technologies?: string[];
  icon?: string;
  iconBg?: string;
  liveLink?: string;
  githubLink?: string;
  itchLink?: string;
};

type ExpandableCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icons: string[];
  projects: Project[];
  category: 'web' | 'game' | 'motion';
};

type ExperienceCardProps = {
  role: string;
  company: string;
  logo: string;
  period: string;
  description: string;
};

type EducationCardProps = {
  title: string;
  school: string;
  logo: string;
  period: string;
  align: "left" | "right";
  big?: boolean;
  current?: boolean;
};

function ProjectCard({ project, category }: { project: Project; category: 'web' | 'game' | 'motion' }) {
  const [expanded, setExpanded] = useState(false);

  const categoryStyles = {
    web: {
      border: "hover:border-blue-400/50",
      accent: "text-blue-300",
      badge: "from-blue-500/10 to-purple-500/10 text-blue-200 border-blue-500/20",
      button: "border-blue-500/20 text-blue-300 hover:text-blue-200 bg-blue-500/5 hover:bg-blue-500/10",
      glow: "shadow-blue-500/10"
    },
    game: {
      border: "hover:border-emerald-400/50",
      accent: "text-emerald-300",
      badge: "from-emerald-500/10 to-teal-500/10 text-emerald-200 border-emerald-500/20",
      button: "border-emerald-500/20 text-emerald-300 hover:text-emerald-200 bg-emerald-500/5 hover:bg-emerald-500/10",
      glow: "shadow-emerald-500/10"
    },
    motion: {
      border: "hover:border-amber-400/50",
      accent: "text-amber-300",
      badge: "from-amber-500/10 to-orange-500/10 text-amber-200 border-amber-500/20",
      button: "border-amber-500/20 text-amber-300 hover:text-amber-200 bg-amber-500/5 hover:bg-amber-500/10",
      glow: "shadow-amber-500/10"
    }
  };

  const styles = categoryStyles[category];

  const getProjectStyles = () => {
    if (project.title.includes("Koi Rush")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-red-950/20 to-slate-900",
        border: "border-red-500/30 hover:border-red-400",
        accent: "text-red-300",
        iconBg: "bg-white",
        glow: "shadow-red-500/10"
      };
    } else if (project.title.includes("Jotungrowth")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-blue-950/20 to-slate-900",
        border: "border-blue-500/30 hover:border-blue-400",
        accent: "text-blue-300",
        iconBg: "bg-blue-400",
        glow: "shadow-blue-500/10"
      };
    } else if (project.title.includes("Loop & Load")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-purple-950/20 to-slate-900",
        border: "border-purple-500/30 hover:border-purple-400",
        accent: "text-purple-300",
        iconBg: "bg-green-400",
        glow: "shadow-purple-500/10"
      };
    } else if (project.title.includes("Portfolio")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-indigo-950/20 to-slate-900",
        border: "border-indigo-500/30 hover:border-indigo-400",
        accent: "text-indigo-300",
        iconBg: "bg-indigo-500/30",
        glow: "shadow-indigo-500/10"
      };
    } else if (project.title.includes("E-Commerce")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-cyan-950/20 to-slate-900",
        border: "border-cyan-500/30 hover:border-cyan-400",
        accent: "text-cyan-300",
        iconBg: "bg-cyan-500/30",
        glow: "shadow-cyan-500/10"
      };
    } else if (project.title.includes("Saudi")) {
      return {
        bg: "bg-linear-to-br from-slate-800 via-amber-950/20 to-slate-900",
        border: "border-amber-500/30 hover:border-amber-400",
        accent: "text-amber-300",
        iconBg: "bg-[#D2B48C]",
        glow: "shadow-amber-500/10"
      };
    } else {
      return {
        bg: "bg-linear-to-br from-slate-800/90 to-slate-900/90",
        border: styles.border,
        accent: styles.accent,
        iconBg: "bg-indigo-500/30",
        glow: styles.glow
      };
    }
  };

  const projectStyles = getProjectStyles();

  const handleProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveLink) {
      if (project.liveLink === "#top") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (project.liveLink === "#") {
        // Do nothing - disabled button
        return;
      } else {
        window.open(project.liveLink, '_blank');
      }
    }
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubLink) {
      window.open(project.githubLink, '_blank');
    }
  };

  const handleItchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.itchLink) {
      window.open(project.itchLink, '_blank');
    }
  };

  return (
    <div 
      className={`
        rounded-xl border ${projectStyles.border}
        ${projectStyles.bg}
        overflow-hidden transition-all duration-300
        ${projectStyles.glow}
        backdrop-blur-sm
        relative
      `}
    >
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rotate-45 translate-x-4 -translate-y-4" />
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rotate-45 -translate-x-4 translate-y-4" />
      </div>
      
      <div 
        onClick={handleProjectClick}
        className="p-6 cursor-pointer group relative z-10"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            {project.icon && (
              <div className={`w-14 h-14 rounded-xl ${projectStyles.iconBg} flex items-center justify-center p-2 backdrop-blur-sm border border-white/10 shadow-lg`}>
                <img 
                  src={project.icon}
                  alt=""
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
            <h5 className={`font-bold text-xl text-white group-hover:${projectStyles.accent} transition-colors duration-300`}>
              {project.title}
            </h5>
          </div>
          <span className={`
            text-sm font-medium px-3 py-1 rounded-full
            bg-indigo-500/10 border border-indigo-500/20
            group-hover:bg-indigo-500/20 transition-all duration-300
            ${projectStyles.accent}
          `}>
            {expanded ? 'Close ▲' : 'View ▼'}
          </span>
        </div>
        
        <p className="text-slate-300 text-base leading-relaxed font-light">
          {project.shortDescription}
        </p>
        
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className={`
                  text-xs px-3 py-1.5 rounded-lg 
                  bg-linear-to-r ${styles.badge}
                  font-medium tracking-wide
                  shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                `}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div 
        className={`
          grid transition-all duration-500 ease-in-out
          ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-10 mt-4">
              <div className="space-y-5">
                <div className="prose prose-invert">
                  <p className="text-slate-200 text-base leading-relaxed font-light">
                    {project.fullDescription}
                  </p>
                </div>
                
                <div className="flex gap-4 pt-3">
                  {/* Web Development buttons */}
                  {category === 'web' && project.liveLink && (
                    <button 
                      onClick={handleLiveClick}
                      disabled={project.liveLink === "#"}
                      className={`
                        group flex items-center gap-2 text-sm font-medium
                        px-4 py-2 rounded-lg border transition-all
                        ${project.liveLink === "#" 
                          ? 'border-slate-600 text-slate-500 cursor-not-allowed opacity-60' 
                          : styles.button
                        }
                      `}
                    >
                      <span>Live</span>
                      {project.liveLink === "#" && <span className="text-xs ml-1">(WIP)</span>}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  )}
                  
                  {category === 'web' && project.githubLink && (
                    <button 
                      onClick={handleGitHubClick}
                      className="
                        group flex items-center gap-2
                        text-sm font-medium text-slate-300 
                        hover:text-indigo-300 transition-colors
                        px-4 py-2 rounded-lg
                        bg-slate-800/50 hover:bg-slate-800/80
                        border border-white/5
                      "
                    >
                      <span>GitHub</span>
                      <span className="text-lg">⌨️</span>
                    </button>
                  )}

                  {/* Game Development buttons */}
                  {category === 'game' && project.itchLink && (
                    <button 
                      onClick={handleItchClick}
                      className={`
                        group flex items-center gap-2 text-sm font-medium
                        px-4 py-2 rounded-lg border transition-all
                        ${styles.button}
                      `}
                    >
                      <span>Itch</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  )}

                  {/* No buttons for Motion & Video */}
                </div>
              </div>

              <div 
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-900/70 shadow-2xl ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={project.gifSrc}
                  alt={`${project.title} demo`}
                  className="w-full h-full object-cover"
                  style={{
                    imageRendering: 'auto',
                  }}
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 right-3">
                  <span className={`
                    text-xs px-3 py-1.5 rounded-full 
                    bg-black/60 backdrop-blur-sm border border-white/10
                    flex items-center gap-1 ${projectStyles.accent}
                  `}>
                    <span className="text-lg">▶</span>
                    <span>Demo</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandableCard({
  title,
  subtitle,
  description,
  icons,
  projects,
  category
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  const categoryStyles = {
    web: {
      gradient: "from-blue-600/20 via-indigo-600/10 to-purple-600/20",
      border: "border-blue-500/30 hover:border-blue-400",
      shadow: "shadow-blue-500/20",
      accent: "bg-blue-400",
      text: "text-blue-300",
      iconGlow: "bg-blue-500/40",
      line: "border-l-blue-400",
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/30"
    },
    game: {
      gradient: "from-emerald-600/20 via-teal-600/10 to-cyan-600/20",
      border: "border-emerald-500/30 hover:border-emerald-400",
      shadow: "shadow-emerald-500/20",
      accent: "bg-emerald-400",
      text: "text-emerald-300",
      iconGlow: "bg-emerald-500/40",
      line: "border-l-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    },
    motion: {
      gradient: "from-amber-600/20 via-orange-600/10 to-rose-600/20",
      border: "border-amber-500/30 hover:border-amber-400",
      shadow: "shadow-amber-500/20",
      accent: "bg-amber-400",
      text: "text-amber-300",
      iconGlow: "bg-amber-500/40",
      line: "border-l-amber-400",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/30"
    }
  };

  const styles = categoryStyles[category];

  const handleMainCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isProjectCard = target.closest('[data-project-card="true"]');
    
    if (!isProjectCard) {
      setOpen(!open);
    }
  };

  return (
    <div
      onClick={handleMainCardClick}
      className={`
        cursor-pointer rounded-3xl border ${styles.border}
        bg-linear-to-br from-slate-800 via-slate-900 to-slate-950
        p-8 transition-all duration-500
        shadow-[0_0_30px_rgba(0,0,0,0.3)] ${styles.shadow}
        hover:shadow-[0_0_55px_rgba(0,0,0,0.4)]
        ${open ? "scale-[1.02]" : ""}
        relative overflow-hidden
      `}
    >
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rotate-45 translate-x-6 -translate-y-6" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rotate-45 -translate-x-6 translate-y-6" />
      </div>
      
      <div className="absolute inset-0 opacity-20 ${styles.gradient} blur-3xl" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className={`${styles.text}/80 text-sm mt-1 font-light tracking-wide flex items-center gap-2`}>
            <span className={`w-1.5 h-1.5 rounded-full ${styles.accent} animate-pulse`} />
            {subtitle}
          </p>
        </div>

        <div className="flex gap-4">
          {icons.map((iconPath, index) => (
            <div key={index} className={`p-2 rounded-xl ${styles.iconGlow} backdrop-blur-sm border border-white/10`}>
              <img 
                src={iconPath}
                alt=""
                className="w-12 h-12 opacity-100 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`grid transition-all duration-500 relative z-10 ${
          open ? "grid-rows-[1fr] mt-8" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden space-y-8">
          <div className="prose prose-invert max-w-none">
            <p className={`text-slate-300 text-lg leading-relaxed font-light border-l-2 ${styles.line} pl-4`}>
              {description}
            </p>
          </div>

          <div>
            <h4 className={`font-semibold mb-6 text-slate-200 text-lg flex items-center gap-2`}>
              <span className={`w-1.5 h-6 ${styles.accent} rounded-full`} />
              <span>Projects</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge} ml-2`}>
                {projects.length}
              </span>
            </h4>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.title} data-project-card="true">
                  <ProjectCard project={p} category={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  role,
  company,
  logo,
  period,
  description,
}: ExperienceCardProps) {
  return (
    <div
      className="
        rounded-2xl bg-linear-to-br from-slate-800 to-slate-900
        border border-white/10 p-6
        shadow-[0_0_25px_rgba(99,102,241,0.25)]
        hover:shadow-[0_0_45px_rgba(99,102,241,0.45)]
        transition-all duration-300
        flex gap-4
        relative overflow-hidden
      "
    >
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rotate-45 translate-x-4 -translate-y-4" />
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rotate-45 -translate-x-4 translate-y-4" />
      </div>
      
      <div className="shrink-0 relative z-10">
        <div className="w-16 h-16 rounded-xl bg-indigo-500/30 border border-indigo-500/40 overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm">
          <img 
            src={logo} 
            alt={`${company} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h4 className="font-bold text-lg">{role}</h4>
        <p className="text-indigo-300 text-sm mt-1">
          {company} · {period}
        </p>
        <p className="text-slate-300 mt-4 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function EducationCard({
  title,
  school,
  logo,
  period,
  align,
  big,
  current,
}: EducationCardProps) {
  return (
    <div
      className={`relative flex ${
        align === "left" ? "justify-start md:pr-8" : "justify-end md:pl-8"
      }`}
    >
      {!big && (
        <span className="absolute left-1/2 top-12 -translate-x-1/2 z-0 hidden md:block">
          <span className="block w-4 h-4 rounded-full bg-indigo-400" />
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-60" />
        </span>
      )}

      <div
        className={`
          relative w-full ${big ? "md:w-4/5" : "md:w-3/5"} 
          rounded-3xl border border-white/10
          bg-linear-to-br from-slate-800 to-slate-900
          p-6 md:p-8
          transition-all duration-500
          ${
            current
              ? "shadow-[0_0_70px_rgba(99,102,241,0.6)] hover:shadow-[0_0_100px_rgba(99,102,241,0.85)]"
              : "shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_55px_rgba(99,102,241,0.5)]"
          }
          hover:-translate-y-2
          overflow-hidden
        `}
      >
        {/* Corner decorations - now behind content */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rotate-45 translate-x-4 -translate-y-4" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rotate-45 -translate-x-4 translate-y-4" />
        </div>

        {/* Content - now above decorations */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          {/* Logo */}
          <div className="shrink-0">
            <div className={`${big ? 'w-20 h-20' : 'w-16 h-16'} rounded-xl bg-indigo-500/30 border border-indigo-500/40 overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm shadow-lg shadow-indigo-500/30`}>
              <img 
                src={logo} 
                alt={`${school} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content - Study Level, Course Name, School, Period */}
          <div className="flex-1 min-w-0">
            {current && (
              <span className="inline-block mb-2 px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.8)]">
                CURRENT
              </span>
            )}
            {/* Study Level (Master's, Bachelor's, High School) */}
            <h3 className={`font-extrabold ${big ? "text-xl md:text-2xl" : "text-lg md:text-xl"} text-white`}>
              {title}
            </h3>
            {/* Course/Smer Name */}
            <p className="text-indigo-300 text-base md:text-lg mt-1 font-medium">
              {title.includes("Master's") ? "Computer Engineering" : 
               title.includes("Bachelor's") ? "Business Informatics" : 
               "Constructive Mechanical Engineering"}
            </p>
            {/* School Name */}
            <p className="text-slate-300 text-sm md:text-base mt-1">
              {school}
            </p>
            {/* Period */}
            <p className="text-xs text-slate-400 mt-2 md:mt-3">
              {period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separator component defined outside of App component
const SectionSeparator = () => (
  <div className="relative w-full bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="w-full h-px bg-linear-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
    </div>
  </div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for cards
  const webCardRef = useRef<HTMLDivElement>(null);
  const gameCardRef = useRef<HTMLDivElement>(null);
  const motionCardRef = useRef<HTMLDivElement>(null);

  // Predefined particle positions - fixed values to avoid Math.random issues
  const particles = [
    { left: '15%', top: '25%', delay: '0.5s', duration: '4s' },
    { left: '45%', top: '15%', delay: '1.2s', duration: '5s' },
    { left: '75%', top: '35%', delay: '0.8s', duration: '6s' },
    { left: '25%', top: '65%', delay: '1.5s', duration: '3.5s' },
    { left: '55%', top: '80%', delay: '0.3s', duration: '5.5s' },
    { left: '85%', top: '55%', delay: '2.0s', duration: '4.5s' },
    { left: '10%', top: '90%', delay: '1.8s', duration: '5s' },
    { left: '35%', top: '45%', delay: '0.2s', duration: '6.5s' },
    { left: '65%', top: '70%', delay: '1.0s', duration: '4s' },
    { left: '95%', top: '10%', delay: '2.2s', duration: '5s' },
    { left: '20%', top: '40%', delay: '0.7s', duration: '5.5s' },
    { left: '70%', top: '20%', delay: '1.3s', duration: '4.5s' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position for the glow effect
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (category: 'web' | 'game' | 'motion', e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll to skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Small delay to let scroll complete before trying to open the card
      setTimeout(() => {
        let targetCard: HTMLDivElement | null = null;
        
        if (category === 'web' && webCardRef.current) {
          targetCard = webCardRef.current;
        } else if (category === 'game' && gameCardRef.current) {
          targetCard = gameCardRef.current;
        } else if (category === 'motion' && motionCardRef.current) {
          targetCard = motionCardRef.current;
        }
        
        if (targetCard) {
          // Find the clickable element inside the card (the header)
          const clickableHeader = targetCard.querySelector('.cursor-pointer');
          if (clickableHeader) {
            (clickableHeader as HTMLElement).click();
          }
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Header - always has background, just changes opacity */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg' : 'bg-slate-900/80 backdrop-blur-sm'}`}>
        <nav
          className="
            w-full
            px-8 md:px-12 py-5
            flex items-center justify-between
            border-b border-white/5
            transition-all duration-300
          "
        >
          <div className="flex items-center gap-12">
            {[
              ['Skills', 'skills'],
              ['Work', 'experience'],
              ['Education', 'education'],
              ['Contact', 'contact']
            ].map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={handleNavClick}
                className="
                  relative text-base font-semibold tracking-wide
                  text-slate-300 hover:text-white
                  transition-all duration-300
                  group
                  px-1
                  hidden md:block
                "
              >
                {label}
                <span className="
                  absolute -bottom-1 left-0 w-0 h-0.5
                  bg-indigo-400
                  transition-all duration-300 group-hover:w-full
                  rounded-full
                " />
              </a>
            ))}
          </div>

          <div className="group relative">
            <a 
              href="#top" 
              onClick={handleNavClick}
              className="
                relative block font-extrabold text-2xl tracking-tight
                bg-linear-to-r from-white via-indigo-200 to-indigo-400
                bg-clip-text text-transparent
                transition-all duration-300
                hover:scale-105
              "
            >
              Marko Bakula
            </a>
            <span className="
              absolute -bottom-1 left-0 w-0 h-0.5
              bg-linear-to-r from-indigo-400 to-indigo-600
              transition-all duration-300 group-hover:w-full
              rounded-full
            " />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-12 h-12 rounded-xl border border-white/10 bg-slate-800/50 hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </nav>

        <div className={`
          md:hidden
          absolute top-18.25 left-0 w-full
          bg-slate-900/95 backdrop-blur-xl
          border-b border-white/5
          shadow-2xl
          transition-all duration-300
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
        `}>
          <div className="px-8 py-8 space-y-5">
            {[
              ['Skills', 'skills'],
              ['Work', 'experience'],
              ['Education', 'education'],
              ['Contact', 'contact']
            ].map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={handleNavClick}
                className="
                  block text-xl font-semibold
                  text-slate-300 hover:text-white
                  transition-colors duration-300
                  py-2
                "
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="h-18.25" />

      {/* Redesigned Animated Hero Section */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Three colored orbs - one for each skill */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Blue orb for web development - top left */}
          <div 
            className="absolute w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-float"
            style={{
              left: '5%',
              top: '15%',
            }}
          />
          
          {/* Emerald orb for game development - center right, moved up */}
          <div 
            className="absolute w-80 h-80 bg-emerald-600/30 rounded-full blur-3xl animate-float-delayed"
            style={{
              right: '15%',
              top: '30%',
            }}
          />
          
          {/* Amber orb for motion - bottom left, moved right */}
          <div 
            className="absolute w-72 h-72 bg-amber-600/30 rounded-full blur-3xl animate-pulse-slow"
            style={{
              left: '25%',
              bottom: '20%',
            }}
          />
          
          {/* Mouse-following glow - exactly centered on cursor */}
          <div 
            className="absolute w-150 h-150 bg-indigo-500/15 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
            }}
          />
        </div>

        {/* Animated grid lines - more prominent */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-size-[80px_80px] animate-pulse-slow" />

        {/* Floating particles - using fixed positions */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="relative w-full">
          <div className="relative w-full h-screen">
            {/* Split Image with simple movement - Background layer with gradient */}
            <div className="absolute inset-0 flex justify-end items-center">
              {/* Background layer - with gradient fade, moves slightly */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-auto mr-10 transition-transform duration-200 ease-out"
                style={{
                  transform: mousePosition.x 
                    ? `translate(${(mousePosition.x - window.innerWidth/2) * 0.01}px, ${(mousePosition.y - window.innerHeight/2) * 0.01}px)` 
                    : 'translate(0px, 0px)',
                  zIndex: 1,
                }}
              >
                <img
                  src="/MyPhotoBackground.png"
                  alt="Marko Bakula Background"
                  className="w-full h-auto object-contain rounded-2xl"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                  }}
                />
              </div>
              
              {/* Foreground layer - slightly bigger, no gradient, moves more */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-10 transition-transform duration-200 ease-out"
                style={{
                  width: 'calc(60% * 1.03)',
                  transform: mousePosition.x 
                    ? `translate(${(mousePosition.x - window.innerWidth/2) * 0.02}px, ${(mousePosition.y - window.innerHeight/2) * 0.02}px)` 
                    : 'translate(0px, 0px)',
                  zIndex: 2,
                }}
              >
                <img
                  src="/MyPhoto.png"
                  alt="Marko Bakula"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
            
            {/* Text content - now above images with higher z-index */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl animate-fade-in-up">
                  <div className="overflow-hidden">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 animate-slide-up leading-tight">
                      Marko <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Bakula</span>
                    </h1>
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-slate-200 leading-relaxed text-xl max-w-xl animate-slide-up delay-200">
                      I craft interactive experiences across{" "}
                      <button
                        onClick={(e) => handleCategoryClick('web', e)}
                        className="relative font-bold text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group"
                      >
                        <span className="relative z-10">web development</span>
                        <span className="absolute inset-0 bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(12px)' }} />
                        <span className="absolute inset-0 bg-blue-400/10 blur-2xl opacity-30 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(16px)' }} />
                      </button>
                      ,{" "}
                      <button
                        onClick={(e) => handleCategoryClick('game', e)}
                        className="relative font-bold text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group"
                      >
                        <span className="relative z-10">game development</span>
                        <span className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(12px)' }} />
                        <span className="absolute inset-0 bg-emerald-400/10 blur-2xl opacity-30 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(16px)' }} />
                      </button>
                      , and{" "}
                      <button
                        onClick={(e) => handleCategoryClick('motion', e)}
                        className="relative font-bold text-amber-400 hover:text-amber-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group"
                      >
                        <span className="relative z-10">video editing</span>
                        <span className="absolute inset-0 bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(12px)' }} />
                        <span className="absolute inset-0 bg-amber-400/10 blur-2xl opacity-30 transition-opacity duration-300 rounded-lg pointer-events-none" style={{ filter: 'blur(16px)' }} />
                      </button>
                      , always looking to improve and learn along the way.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4 animate-fade-in delay-500">
                    <a
                      href="#contact"
                      onClick={handleNavClick}
                      className="
                        px-8 py-4 rounded-xl font-semibold text-lg
                        bg-indigo-600
                        shadow-[0_0_30px_rgba(99,102,241,0.6)]
                        hover:bg-indigo-500
                        hover:shadow-[0_0_50px_rgba(99,102,241,0.9)]
                        transition-all
                        hover:scale-105
                      "
                    >
                      Contact Me
                    </a>

                    <a
                      href="#skills"
                      onClick={handleNavClick}
                      className="
                        px-8 py-4 rounded-xl font-semibold text-lg
                        border border-white/30
                        text-white
                        hover:border-indigo-400
                        hover:text-indigo-300
                        transition-all
                        hover:scale-105
                      "
                    >
                      See my work
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator after Hero */}
      <SectionSeparator />

      <section
        id="skills"
        className="
          relative pt-24 pb-28
          bg-slate-900
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-300" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
              <span className="text-white mx-3">&</span>
              <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            
            <p className="text-slate-300 text-xl leading-relaxed font-light max-w-2xl mx-auto">
              I like building things that are fun to use and fun to make. Here's a taste of what I've been up to.
            </p>
            
            <div className="w-24 h-1 bg-linear-to-r from-blue-400 via-emerald-400 to-amber-400 rounded-full mx-auto mt-8" />
          </div>

          <div className="space-y-16">
            {/* Web Development Card with ref */}
            <div ref={webCardRef}>
              <ExpandableCard
                category="web"
                title="Web Development ⚡"
                subtitle="React · TypeScript · TailWind · HTML · CSS · Javascript · Blazor"
                icons={["/icons/web-react.png", "/icons/typescript.png", "/icons/tailwind.png"]}
                description="I build web apps that feel smooth and responsive, whether it's a personal site or a full-blown platform. Clean code and good performance are a must."
                projects={[
                  {
                    title: "Portfolio",
                    shortDescription: "The site you're looking at right now!",
                    fullDescription: "Built with React and Tailwind. Smooth animations, nested expandable cards with GIF demos, and a dark theme that's easy on the eyes. The component structure is designed to be reusable and maintainable, while also using a bunch of pretty optimized assets i made.",
                    gifSrc: "/gifs/portfolio-demo.gif",
                    technologies: ["React", "TypeScript", "Tailwind"],
                    icon: "/icons/web-react.png",
                    iconBg: "bg-indigo-500/30",
                    liveLink: "#top",
                    githubLink: "https://github.com/MarkoBakula/Portfolio-Website"
                  },
                  {
                    title: "E-Commerce (WIP)",
                    shortDescription: "Building an online store from the ground up",
                    fullDescription: "A collage project that i was rather happy with but ended up scrapping most of it, when finished it should look like a pretty standard e-commerce shop application",
                    gifSrc: "/gifs/ecommerce-demo.gif",
                    technologies: ["Node.js", "PostgreSQL", "React"],
                    icon: "/icons/nodejs.png",
                    iconBg: "bg-cyan-500/30",
                    liveLink: "#",
                    githubLink: "https://github.com/MarkoBakula"
                  }
                ]}
              />
            </div>

            {/* Game Development Card with ref */}
            <div ref={gameCardRef}>
              <ExpandableCard
                category="game"
                title="Game Development 🎮"
                subtitle="Unity · C# · Object Oriented · Game Jams"
                icons={["/icons/unity.png", "/icons/csharp.png", "/icons/shader.png"]}
                description="My on and off hobby and job for the past few years. Focusing mostly on unity projects that are built during time sensitive game jams but also ones im most proud off"
                projects={[
                  {
                    title: "Koi Rush",
                    shortDescription: "A fish-eating-fish game made in a week",
                    fullDescription: "Control a koi fish in a peaceful pond, eat smaller fish to grow, and avoid the bigger ones. Built in unity for a week long game jam. Features interesting movement, a simple growth mechanic, and a calming pond atmosphere with a bold black-white-red palette with all assets aswell as programming made by myself.",
                    gifSrc: "/gifs/koi-rush.gif",
                    technologies: ["Unity", "C#", "Procedural Animations"],
                    icon: "/icons/koi-icon.png",
                    iconBg: "bg-white",
                    itchLink: "https://bungalov.itch.io/koi-rush"
                  },
                  {
                    title: "Jotungrowth",
                    shortDescription: "Viking puzzle and platfomring game with a shrinking potion main mechanic",
                    fullDescription: "Made in Unreal Engine 5 for a game jam. You're a viking with a shrinking potion shrink to sneak through tiny passages, grow back to solve puzzles and activate pressure plates. Cozy aesthetics and focus on the environment.",
                    gifSrc: "/gifs/jotungrowth.gif",
                    technologies: ["Unreal 5", "Blueprints", "Level Design"],
                    icon: "/icons/jotun-icon.png",
                    iconBg: "bg-blue-400",
                    itchLink: "https://emptystudio.itch.io/jotengrowth"
                  },
                  {
                    title: "Loop & Load",
                    shortDescription: "Turn-based roguelike made in 48 hours",
                    fullDescription: "Inspired by Loop Hero, this was a 2-day game jam experiment. Top-down turn-based combat, procedural loot, and resource management all in a minimalist black-and-neon aesthetic.",
                    gifSrc: "/gifs/loop-load.gif",
                    technologies: ["Unity", "C#", "Turn-based"],
                    icon: "/icons/loop-icon.png",
                    iconBg: "bg-green-400",
                    itchLink: "https://bungalov.itch.io/loop-load"
                  }
                ]}
              />
            </div>

            {/* Motion & Video Card with ref */}
            <div ref={motionCardRef}>
              <ExpandableCard
                category="motion"
                title="Motion & Video 🎬"
                subtitle="After Effects · Motion Design"
                icons={["/icons/aftereffects.png", "/icons/premiere.png", "/icons/illustrator.png"]}
                description="While it started out as a necessety for a job i realized how useful and fulfilling making videos is. Promos, logos, and visual storytelling are all things im capable of doing now."
                projects={[
                  {
                    title: "Saudi Real Estate AI Ad",
                    shortDescription: "AI-assisted luxury property promo",
                    fullDescription: "A promotional video for a Saudi real estate agency, blending AI generated visuals with motion graphics. Dynamic transitions, Arabic typography, and warm desert tones all crafted to feel luxurious and modern.",
                    gifSrc: "/gifs/saudi-realestate.gif",
                    technologies: ["After Effects", "AI Tools", "Premiere"],
                    icon: "/icons/saudi-icon.png",
                    iconBg: "bg-[#D2B48C]"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator after Skills */}
      <SectionSeparator />

      <section
        id="experience"
        className="
          relative min-h-screen
          flex items-center
          bg-slate-900
        "
      >
        {/* Circuit board pattern for work experience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-6 w-full py-32">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            
            <div className="md:sticky md:top-32">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Work
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
                A blend of frontend engineering, game dev and video making. Internships taught me 
  how to work with teams and work on frontend, while my main job gave me the experience to function and work in a real competitive environment.
              </p>

              <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
            </div>

            <div className="space-y-10">

              <ExperienceCard
                role="Operation Engineer / Unity Developer"
                company="Replai"
                logo="/logos/replai.png"
                period="2025-2026"
                description="Developed Unity systems and gameplay features for interactive mobile game ads you've probably seen them before downloading some of the biggest games on the App Store. The job was all about rapid prototyping and iteration, build something fun, test it, check the metrics and make it even better. Also handled video editing in After Effects to polish the result."
              />

              <ExperienceCard
                role="Frontend Developer Intern"
                company="ERP Sirmium"
                logo="/logos/erp-sirmium.png"
                period="2023"
                description="Worked on UI improvements and backend integration. Learned a lot about clean code, team collaboration, and how real-world products come together."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator after Experience */}
      <SectionSeparator />

      <section
        id="education"
        className="
          relative w-full
          py-28
          bg-slate-900
        "
      >
        {/* Full-width background pattern */}
        <div className="absolute inset-0 w-full bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_2px,transparent_2px,transparent_8px)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.6fr_1fr] gap-20 items-start">
            
            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-30 bottom-0 -translate-x-1/2">
                <div className="absolute inset-0 w-0.5 bg-indigo-500/60" />
                <div className="absolute inset-0 w-1.5 bg-indigo-500/30 blur-xl" />
              </div>

              <div className="space-y-16 relative z-10">
                <EducationCard
                  title="Master's"
                  school="VIŠER / ATUSS - Belgrade"
                  logo="/logos/viser.png"
                  period="2025 – Present"
                  big
                  current
                  align="left"
                />

                <EducationCard
                  title="Bachelor's"
                  school="ВШСС Сирмијум - Sremska Mitrovica"
                  logo="/logos/sirmium-college.png"
                  period="2021 – 2024"
                  align="right"
                />

                <EducationCard
                  title="High School"
                  school="Nikola Tesla - Sremska Mitrovica"
                  logo="/logos/tesla.png"
                  period="2015 – 2019"
                  align="left"
                />
              </div>
            </div>

            <div className="md:sticky md:top-32">
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Education
              </h3>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
                Computer engineering with a focus on system design, programming and problem solving.
              </p>

              <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
                My academic foundation began at Nikola Tesla Technical School, followed by a Bachelor's in Business Informatics at VIŠER, where I developed a strong grasp of how technology integrates with business systems. I'm currently pursuing a Master's in Computer Engineering at VIŠER, focusing on system architecture, algorithm design, and software engineering principles. Beyond formal studies, I've consistently invested time in self-directed learning through game development, frontend engineering, and hands-on project work.
              </p>

              <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Separator after Education */}
      <SectionSeparator />

      {/* Clean, Short Contact Section */}
      <section id="contact" className="py-20 overflow-hidden relative bg-slate-900">
        {/* Simple background decoration */}
        <div className="absolute inset-0 w-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6">
          {/* Simple header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Feel free to reach out
            </h2>
            <p className="text-slate-300 text-lg">
              Got an idea, a project, or need something done in my field of expertise?
            </p>
            <p className="text-slate-300 text-lg">
              Here you can find me:
            </p>

          </div>

          {/* Simple two-column layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Contact methods */}
            <div className="space-y-4">
              <a 
                href="mailto:marko.bakula2000@gmail.com" 
                className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-400 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                  📧
                </div>
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div className="font-medium group-hover:text-indigo-300 transition-colors duration-200">marko.bakula2000@gmail.com</div>
                </div>
              </a>

              <a 
                href="tel:+381677639977" 
                className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-400 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                  📞
                </div>
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div className="font-medium group-hover:text-indigo-300 transition-colors duration-200">+381 67 763 9977</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="text-sm text-slate-400">Location</div>
                  <div className="font-medium">Belgrade, Serbia</div>
                </div>
              </div>
            </div>

            {/* Right side - Social links */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ["🔗", "LinkedIn", "https://www.linkedin.com/in/marko-bakula-7335462b7/"],
                ["💻", "GitHub", "https://github.com/MarkoBakula"],
                ["💬", "Discord", "https://discord.com/users/292648246692544522"],
                ["🎮", "Itch.io", "https://bungalov.itch.io"],
              ].map(([icon, label, link]) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex flex-col items-center justify-center gap-2 p-5 rounded-xl
                    bg-slate-800/50 border border-slate-700
                    hover:border-indigo-400 hover:-translate-y-1
                    transition-all duration-200
                    text-center group
                  "
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Simple footer note */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Belgrade · Open to remote work and collaboration
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center relative bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Marko Bakula · Built with React & Tailwind · Thanks for stopping by!
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, 15px) rotate(-5deg); }
          75% { transform: translate(-15px, -5px) rotate(3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 18s ease-in-out infinite reverse;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}