import { useState } from "react";

/* ---------- TYPES ---------- */

type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  gifSrc: string;
  technologies?: string[];
};

type ExpandableCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icons: string[]; // Now contains paths to PNGs
  projects: Project[];
};

/* ---------- PROJECT CARD COMPONENT (Nested Expandable) ---------- */

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  // Handle click with event propagation stopped
  const handleProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // This prevents the click from reaching the parent card
    setExpanded(!expanded);
  };

  return (
    <div 
      className="
        rounded-xl border border-white/10 
        bg-gradient-to-br from-slate-800/90 to-slate-900/90
        overflow-hidden
        transition-all duration-300
        hover:border-indigo-400/50
        backdrop-blur-sm
      "
    >
      {/* Project Header - Click to expand */}
      <div 
        onClick={handleProjectClick}
        className="p-6 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors duration-300">
            {project.title}
          </h5>
          <span className="
            text-indigo-400 text-sm font-medium
            px-3 py-1 rounded-full
            bg-indigo-500/10 border border-indigo-500/20
            group-hover:bg-indigo-500/20 transition-all duration-300
          ">
            {expanded ? 'Close ▲' : 'View Project ▼'}
          </span>
        </div>
        
        {/* Short description with better typography */}
        <p className="text-slate-300 text-base leading-relaxed font-light">
          {project.shortDescription}
        </p>
        
        {/* Tech tags - stylized */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="
                  text-xs px-3 py-1.5 rounded-lg 
                  bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                  text-indigo-200
                  border border-indigo-500/20
                  font-medium tracking-wide
                  shadow-[0_2px_8px_rgba(99,102,241,0.1)]
                "
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Content - Description Left, GIF Right */}
      <div 
        className={`
          grid transition-all duration-500 ease-in-out
          ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-10 mt-4">
              {/* Left side - Full Description with better styling */}
              <div className="space-y-5">
                <div className="prose prose-invert">
                  <p className="text-slate-200 text-base leading-relaxed font-light">
                    {project.fullDescription}
                  </p>
                </div>
                
                {/* Stylized action buttons */}
                <div className="flex gap-4 pt-3">
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="
                      group flex items-center gap-2
                      text-sm font-medium text-indigo-300 
                      hover:text-indigo-200 transition-colors
                      px-4 py-2 rounded-lg
                      bg-indigo-500/5 hover:bg-indigo-500/10
                      border border-indigo-500/20
                    "
                  >
                    <span>View Live</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
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
                </div>
              </div>

              {/* Right side - GIF with improved styling */}
              <div 
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-900/70 shadow-2xl ring-1 ring-white/10 group"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={project.gifSrc}
                  alt={`${project.title} demo`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                
                {/* Play indicator */}
                <div className="absolute bottom-3 right-3">
                  <span className="
                    text-xs px-3 py-1.5 rounded-full 
                    bg-black/60 text-indigo-300 
                    backdrop-blur-sm border border-white/10
                    flex items-center gap-1
                  ">
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

/* ---------- EXPANDABLE CARD COMPONENT ---------- */

function ExpandableCard({
  title,
  subtitle,
  description,
  icons,
  projects,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  // Handle main card click - only toggles if clicking the header area
  const handleMainCardClick = (e: React.MouseEvent) => {
    // Check if the click target is the header area or the main content
    // We don't want to toggle if clicking on project cards or their content
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
        cursor-pointer rounded-3xl border border-white/10
        bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950
        p-8 transition-all duration-500
        shadow-[0_0_30px_rgba(99,102,241,0.25)]
        hover:shadow-[0_0_55px_rgba(99,102,241,0.45)]
        ${open ? "scale-[1.02]" : ""}
      `}
    >
      {/* Header - clicking here toggles the main card */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-indigo-300/80 text-sm mt-1 font-light tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* PNG Icons instead of emojis */}
        <div className="flex gap-3">
          {icons.map((iconPath, index) => (
            <img 
              key={index}
              src={iconPath}
              alt=""
              className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>

      {/* Main Expandable Content */}
      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] mt-8" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden space-y-8">
          {/* Main description with better typography */}
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed font-light border-l-2 border-indigo-500/30 pl-4">
              {description}
            </p>
          </div>

          {/* Projects Section - Stacked vertically */}
          <div>
            <h4 className="font-semibold mb-6 text-slate-200 text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-400 rounded-full" />
              Featured Projects
            </h4>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.title} data-project-card="true">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- EXPERIENCE CARD ---------- */

function ExperienceCard({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900
        border border-white/10 p-6
        shadow-[0_0_25px_rgba(99,102,241,0.25)]
        hover:shadow-[0_0_45px_rgba(99,102,241,0.45)]
        transition-all duration-300
      "
    >
      <h4 className="font-bold text-lg">{role}</h4>
      <p className="text-indigo-300 text-sm mt-1">
        {company} · {period}
      </p>
      <p className="text-slate-300 mt-4 leading-relaxed">{description}</p>
    </div>
  );
}

/* ---------- EDUCATION CARD ---------- */

function EducationCard({
  title,
  school,
  period,
  align,
  big,
  current,
}: {
  title: string;
  school: string;
  period: string;
  align: "left" | "right";
  big?: boolean;
  current?: boolean;
}) {
  return (
    <div
      className={`relative flex ${
        align === "left" ? "justify-start pr-8" : "justify-end pl-8"
      }`}
    >
      {!big && (
        <span className="absolute left-1/2 top-12 -translate-x-1/2 z-10">
          <span className="block w-4 h-4 rounded-full bg-indigo-400" />
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-60" />
        </span>
      )}

      <div
        className={`
          relative rounded-3xl border border-white/10
          transition-all duration-500
          ${
            big
              ? "w-full md:w-[75%] p-10 scale-[1.06] bg-gradient-to-br from-indigo-900/25 via-slate-800 to-slate-900"
              : "w-full md:w-[52%] p-8 bg-gradient-to-br from-slate-800 to-slate-900"
          }
          ${
            current
              ? "shadow-[0_0_70px_rgba(99,102,241,0.6)] hover:shadow-[0_0_100px_rgba(99,102,241,0.85)]"
              : "shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_55px_rgba(99,102,241,0.5)]"
          }
          hover:-translate-y-2
        `}
      >
        {current && (
          <span
            className="
              absolute -top-5 right-10 px-5 py-1 text-xs font-bold tracking-widest
              rounded-full bg-indigo-600
              shadow-[0_0_20px_rgba(99,102,241,0.8)]
            "
          >
            CURRENT
          </span>
        )}

        <h3 className={`font-extrabold ${big ? "text-3xl" : "text-xl"}`}>
          {title}
        </h3>

        <p className="text-indigo-300 mt-2">{school}</p>
        <p className="text-sm text-slate-400 mt-4">{period}</p>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav
          className="
            w-full
            px-8 md:px-12 py-5
            flex items-center justify-between
            bg-slate-900/80
            backdrop-blur-xl
            border-b border-white/5
            shadow-[0_4px_30px_rgba(0,0,0,0.3)]
            transition-all duration-300
          "
        >
          {/* Logo/Name with gradient */}
          <div className="group relative">
            <a 
              href="#top" 
              className="
                relative block font-extrabold text-2xl tracking-tight
                bg-gradient-to-r from-white via-indigo-200 to-indigo-400
                bg-clip-text text-transparent
                transition-all duration-300
                hover:scale-105
              "
              onClick={handleNavClick}
            >
              Marko Bakula
            </a>
            {/* Animated underline */}
            <span className="
              absolute -bottom-1 left-0 w-0 h-0.5
              bg-gradient-to-r from-indigo-400 to-indigo-600
              transition-all duration-300 group-hover:w-full
              rounded-full
            " />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[
              ['Skills', 'skills'],
              ['Experience', 'experience'],
              ['Education', 'education'],
              ['Contact', 'contact']
            ].map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                className="
                  relative text-base font-semibold tracking-wide
                  text-slate-300 hover:text-white
                  transition-all duration-300
                  group
                  px-1
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

          {/* Right side - availability indicator */}
          <div className="hidden md:block">
            <div className="
              flex items-center gap-2
              text-sm font-medium text-indigo-300/80
              border border-indigo-500/20
              rounded-full px-5 py-2
              bg-indigo-500/5
              hover:border-indigo-500/40 hover:text-indigo-300
              transition-all duration-300
            ">
              <span className="relative flex h-2 w-2">
                <span className="
                  animate-ping absolute inline-flex h-full w-full
                  rounded-full bg-indigo-400 opacity-75
                " />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Available for work
            </div>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu Dropdown */}
        <div className={`
          md:hidden
          absolute top-[73px] left-0 w-full
          bg-slate-900/95 backdrop-blur-xl
          border-b border-white/5
          shadow-2xl
          transition-all duration-300
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
        `}>
          <div className="px-8 py-8 space-y-5">
            {[
              ['Skills', 'skills'],
              ['Experience', 'experience'],
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
            
            {/* Mobile availability indicator */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="
                inline-flex items-center gap-3
                text-base font-medium text-indigo-300/80
                px-4 py-2.5
              ">
                <span className="relative flex h-3 w-3">
                  <span className="
                    animate-ping absolute inline-flex h-full w-full
                    rounded-full bg-indigo-400 opacity-75
                  " />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
                </span>
                Available for work
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[73px]" />

      {/* HERO SECTION */}
      <section id="top" className="relative min-h-[90vh] flex items-start">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full pt-[22vh]">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* TEXT */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                Marko Bakula
              </h1>

              <p className="mt-6 text-xl md:text-2xl font-medium text-indigo-300">
                Frontend · Game · Motion Developer
              </p>

              <p className="mt-8 max-w-xl text-slate-300 leading-relaxed text-lg">
                I design and build interactive digital experiences across web,
                games and motion. My work focuses on strong visual feedback,
                intuitive user experience and clean, maintainable systems —
                bridging engineering precision with creative expression.
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="
                    px-7 py-3 rounded-xl font-semibold
                    bg-indigo-600
                    shadow-[0_0_30px_rgba(99,102,241,0.6)]
                    hover:bg-indigo-500
                    hover:shadow-[0_0_50px_rgba(99,102,241,0.9)]
                    transition-all
                  "
                >
                  Contact Me
                </a>

                <a
                  href="#skills"
                  onClick={handleNavClick}
                  className="
                    px-7 py-3 rounded-xl font-semibold
                    border border-white/15
                    text-slate-200
                    hover:border-indigo-400
                    hover:text-indigo-300
                    transition-all
                  "
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative hidden md:block pointer-events-none">
              <div
                className="
                  absolute right-0 top-1/2 -translate-y-1/2
                  w-[55vw] h-[70vh]
                  max-w-[900px]
                "
              >
                <img
                  src="/MyPhoto.png"
                  alt="Marko Bakula"
                  className="
                    w-full h-full object-cover
                    opacity-90
                    [mask-image:linear-gradient(to_left,black_45%,transparent_100%)]
                    [-webkit-mask-image:linear-gradient(to_left,black_45%,transparent_100%)]
                    blur-[0.3px]
                  "
                />

                {/* ambient blend layer */}
                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-left
                    from-slate-900/60
                    via-slate-900/20
                    to-transparent
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS & PROJECTS */}
      <section
        id="skills"
        className="
          relative pt-16 pb-28
          bg-gradient-to-b from-slate-900 via-slate-800/60 to-slate-900
        "
      >
        {/* background accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-600/15 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* section header */}
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Skills & Projects
            </h2>
            <p className="mt-6 text-slate-300 text-lg md:text-xl leading-relaxed">
              My work spans multiple disciplines, with detailed project showcases below.
              Click on any project to see a demo and full description.
            </p>
          </div>

          {/* cards */}
          <div className="space-y-16">
            {/* Web Development */}
            <ExpandableCard
              title="Web Development"
              subtitle="Frontend Architecture & UI Engineering"
              icons={["/icons/web-react.png", "/icons/typescript.png", "/icons/tailwind.png"]}
              description="I specialize in building modern, responsive and animated web interfaces using React, TypeScript and Tailwind. My focus is on clean component architecture, performance, accessibility and creating interfaces that feel responsive and polished."
              projects={[
                {
                  title: "Portfolio Website",
                  shortDescription: "Personal portfolio with smooth interactions and expandable project cards",
                  fullDescription: "A fully responsive portfolio built with React and Tailwind. Features smooth scroll animations, nested expandable cards with GIF demonstrations, and a modern dark theme with indigo accents. The component architecture is designed for reusability and maintainability, with careful attention to event propagation to ensure smooth nested interactions.",
                  gifSrc: "/gifs/portfolio-demo.gif",
                  technologies: ["React", "TypeScript", "Tailwind", "Framer Motion"]
                },
                {
                  title: "Admin Dashboard",
                  shortDescription: "Data-driven dashboard with real-time updates and interactive charts",
                  fullDescription: "Comprehensive admin panel with interactive charts, data tables, and user management. Implements real-time updates via WebSockets, advanced filtering capabilities, and role-based access control. Features include dark mode, customizable widgets, and export functionality.",
                  gifSrc: "/gifs/dashboard-demo.gif",
                  technologies: ["React", "Redux", "D3.js", "Node.js", "Socket.io"]
                },
                {
                  title: "E-Commerce Platform",
                  shortDescription: "Full-featured online store with payment integration",
                  fullDescription: "Modern e-commerce solution with product catalog, shopping cart, user authentication, and Stripe payment integration. Features include product filtering by category/price, search with autocomplete, wishlist functionality, and a responsive design optimized for mobile shopping.",
                  gifSrc: "/gifs/ecommerce-demo.gif",
                  technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind", "Redux"]
                }
              ]}
            />

            {/* Game Development */}
            <ExpandableCard
              title="Game Development"
              subtitle="Unity, Gameplay Systems & Tools"
              icons={["/icons/unity.png", "/icons/csharp.png", "/icons/shader.png"]}
              description="I develop gameplay systems, tools and visual effects in Unity. My experience includes player controllers, game logic, editor tooling, shaders and performance-conscious implementations for various game genres."
              projects={[
                {
                  title: "Puzzle Game Prototype",
                  shortDescription: "Grid-based puzzle mechanics with level editor",
                  fullDescription: "A puzzle game featuring grid-based mechanics, progression systems, and level logic. Includes a custom level editor tool for designers that allows drag-and-drop placement of puzzle elements, save/load functionality, and real-time playtesting within the editor.",
                  gifSrc: "/gifs/puzzle-game.gif",
                  technologies: ["Unity", "C#", "Shader Graph", "Unity UI", "Editor Scripting"]
                },
                {
                  title: "Action Gameplay Prototype",
                  shortDescription: "Character combat system with responsive controls",
                  fullDescription: "Third-person action prototype with responsive combat mechanics, enemy AI using behavior trees, and visual feedback effects. Features include combo systems with animation cancelling, dodge mechanics with i-frames, hitstop effects, and a variety of particle VFX for abilities.",
                  gifSrc: "/gifs/action-game.gif",
                  technologies: ["Unity", "C#", "Animation Rigging", "VFX Graph", "Behavior Trees"]
                },
                {
                  title: "Procedural Generation Tool",
                  shortDescription: "Level generation toolkit for rapid prototyping",
                  fullDescription: "Editor tool for procedurally generating dungeon layouts using wave function collapse algorithms. Includes customization options for room sizes, enemy placement density, item spawns, and seed-based generation. Built for rapid level prototyping in roguelike games.",
                  gifSrc: "/gifs/proc-gen.gif",
                  technologies: ["Unity", "C#", "Editor Scripting", "Custom GUI", "Procedural Generation"]
                }
              ]}
            />

            {/* Motion & Video */}
            <ExpandableCard
              title="Motion & Video"
              subtitle="After Effects & Motion Design"
              icons={["/icons/aftereffects.png", "/icons/premiere.png", "/icons/illustrator.png"]}
              description="I create motion graphics and animated content using After Effects, focusing on clarity, rhythm and visual storytelling. My work spans promotional videos, logo animations, and UI motion packs."
              projects={[
                {
                  title: "Promotional Motion Video",
                  shortDescription: "60-second product launch animation",
                  fullDescription: "A 60-second promotional video combining typography, motion graphics, and visual pacing. Created for a tech product launch, featuring smooth transitions, kinetic typography, and brand-aligned aesthetics. Includes sound design and color grading in post-production.",
                  gifSrc: "/gifs/promo-video.gif",
                  technologies: ["After Effects", "Illustrator", "Premiere Pro", "Audition"]
                },
                {
                  title: "Logo Animation",
                  shortDescription: "Brand identity animation with multiple variants",
                  fullDescription: "Animated logo reveal with multiple variations for different platforms. Includes a full intro sequence for video content, social media variants (square/vertical formats), and looped background animations for website headers. All assets exported with alpha channels.",
                  gifSrc: "/gifs/logo-animation.gif",
                  technologies: ["After Effects", "Photoshop", "Cinema 4D Lite", "Media Encoder"]
                },
                {
                  title: "UI Animation Pack",
                  shortDescription: "Interface micro-interactions for web/mobile",
                  fullDescription: "Collection of UI animations including loading states, hover effects, menu transitions, and notification animations. Each animation is designed with performance in mind and exported as Lottie files for easy web implementation with minimal file size.",
                  gifSrc: "/gifs/ui-animations.gif",
                  technologies: ["After Effects", "Bodymovin", "Lottie", "Illustrator"]
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="
          relative min-h-screen
          flex items-center
        "
      >
        {/* background accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 translate-x-1/3 w-[700px] h-[700px] bg-indigo-600/15 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full py-32">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            
            {/* LEFT – INTRO */}
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Work Experience
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
                Hands-on experience across frontend development and real-time
                interactive systems, working in both structured product teams
                and fast-moving technical environments.
              </p>

              <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
            </div>

            {/* RIGHT – CARDS */}
            <div className="space-y-10">
              <ExperienceCard
                role="Frontend Developer Intern"
                company="ERP Sirmium"
                period="2023"
                description="Worked on frontend development tasks, UI improvements and integration with backend services. Focused on improving usability, maintaining clean code and collaborating within an existing product codebase."
              />

              <ExperienceCard
                role="Operation Engineer / Unity Developer"
                company="Replai"
                period="2024"
                description="Worked on Unity-based systems, tools and gameplay features. Contributed to prototyping, iteration workflows and implementation of interactive systems used in production."
              />
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="
          relative
          max-w-6xl mx-auto px-6
          py-28
        "
      >
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-20 items-start">
          
          {/* LEFT — TIMELINE */}
          <div className="relative">
            {/* vertical line */}
            <div className="pointer-events-none absolute left-1/2 top-[120px] bottom-0 -translate-x-1/2">
              <div className="absolute inset-0 w-[2px] bg-indigo-500/60" />
              <div className="absolute inset-0 w-[6px] bg-indigo-500/30 blur-xl" />
            </div>

            <div className="space-y-32 relative z-10">
              <EducationCard
                title="Master Studies – Computer Engineering"
                school="VIŠER – School of Electrical and Computer Engineering"
                period="2024 – Present"
                big
                current
                align="left"
              />

              <EducationCard
                title="Bachelor Studies – Business Informatics"
                school="VIŠER – School of Electrical and Computer Engineering"
                period="2021 – 2024"
                align="right"
              />

              <EducationCard
                title="Technical High School"
                school="Nikola Tesla Technical School"
                period="2017 – 2021"
                align="left"
              />
            </div>
          </div>

          {/* RIGHT — STICKY TEXT */}
          <div className="sticky top-32">
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Education
            </h3>

            <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
              My academic path is centered around computer engineering with a
              strong focus on applied knowledge, system design and real-world
              problem solving.
            </p>

            <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
              I treat education as an evolving process — combining formal
              studies with independent exploration of game development,
              frontend architecture and interactive systems.
            </p>

            <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold mb-12 text-center">Contact</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-slate-300">
            <p className="text-lg leading-relaxed">
              If you're interested in collaboration, freelance work or
              full-time opportunities, feel free to reach out. I'm always
              open to discussing new ideas and interesting projects.
            </p>

            <div className="space-y-2">
              <p className="text-indigo-300 font-medium">
                📧 email@example.com
              </p>
              <p className="text-indigo-300 font-medium">
                📞 +381 60 123 4567
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["🔗", "LinkedIn", "https://www.linkedin.com/"],
              ["💻", "GitHub", "https://github.com/"],
              ["💬", "Discord", "https://discord.com/"],
              ["✉️", "Send Email", "mailto:email@example.com"],
            ].map(([icon, label, link]) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-3 rounded-2xl border border-white/10
                  bg-slate-800/80 p-5
                  transition-all duration-300
                  shadow-[0_0_22px_rgba(99,102,241,0.25)]
                  hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]
                  hover:-translate-y-1
                "
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Marko Bakula · Built with React & Tailwind
      </footer>
    </div>
  );
}