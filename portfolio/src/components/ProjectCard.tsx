import React, { useState } from 'react';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  category: 'web' | 'game' | 'motion';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, category }) => {
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
};

export default ProjectCard;