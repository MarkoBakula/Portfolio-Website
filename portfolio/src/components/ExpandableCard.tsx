import React, { useState } from 'react';
import type { ExpandableCardProps } from './types';
import ProjectCard from './ProjectCard';

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  subtitle,
  description,
  icons,
  projects,
  category
}) => {
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
      
      <div className={`absolute inset-0 opacity-20 ${styles.gradient} blur-3xl`} />
      
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
};

export default ExpandableCard;