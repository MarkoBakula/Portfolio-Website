import React from 'react';
import type { ExperienceCardProps } from './types';

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  role,
  company,
  logo,
  period,
  description,
}) => {
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
};

export default ExperienceCard;