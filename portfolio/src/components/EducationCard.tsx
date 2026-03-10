import React from 'react';
import type { EducationCardProps } from './types';

const EducationCard: React.FC<EducationCardProps> = ({
  title,
  school,
  logo,
  period,
  align,
  big,
  current,
}) => {
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
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rotate-45 translate-x-4 -translate-y-4" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none z-0">
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rotate-45 -translate-x-4 translate-y-4" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="shrink-0">
            <div className={`${big ? 'w-20 h-20' : 'w-16 h-16'} rounded-xl bg-indigo-500/30 border border-indigo-500/40 overflow-hidden flex items-center justify-center p-2 backdrop-blur-sm shadow-lg shadow-indigo-500/30`}>
              <img 
                src={logo} 
                alt={`${school} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {current && (
              <span className="inline-block mb-2 px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.8)]">
                CURRENT
              </span>
            )}
            <h3 className={`font-extrabold ${big ? "text-xl md:text-2xl" : "text-lg md:text-xl"} text-white`}>
              {title}
            </h3>
            <p className="text-indigo-300 text-base md:text-lg mt-1 font-medium">
              {title.includes("Master's") ? "Computer Engineering" : 
               title.includes("Bachelor's") ? "Business Informatics" : 
               "Constructive Mechanical Engineering"}
            </p>
            <p className="text-slate-300 text-sm md:text-base mt-1">
              {school}
            </p>
            <p className="text-xs text-slate-400 mt-2 md:mt-3">
              {period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;