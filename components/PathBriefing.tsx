
import React from 'react';
import { Info, Target, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';

interface PathBriefingProps {
  pathNumber: string;
  title: string;
  objective: string;
  threatVector: string;
  rationale: string;
  colorClass?: string;
}

export const PathBriefing: React.FC<PathBriefingProps> = ({ 
  pathNumber, 
  title, 
  objective, 
  threatVector, 
  rationale, 
  colorClass = "text-blue-500" 
}) => {
  const accentBorder = colorClass.replace('text-', 'border-');
  const accentBg = colorClass.replace('text-', 'bg-');

  return (
    <div className="px-6 md:px-20 py-6 bg-[#020202] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`p-8 md:p-12 border-l-2 ${accentBorder} bg-zinc-950/30 rounded-r-[2.5rem] relative group`}>
          {/* Background Decorative ID */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] select-none pointer-events-none">
             <span className="text-[12rem] font-black italic leading-none">{pathNumber}</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-0.5 ${accentBg} text-black text-[9px] font-black uppercase tracking-widest rounded`}>
                    PATH_{pathNumber}
                  </div>
                  <div className={`h-[1px] w-8 ${accentBg} opacity-30`} />
                </div>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{title}</h3>
              </div>
              
              <div className="flex items-center gap-4 group/btn cursor-default">
                 <div className={`w-10 h-10 rounded-full border ${accentBorder}/30 flex items-center justify-center shrink-0`}>
                    <Target className={`w-5 h-5 ${colorClass}`} />
                 </div>
                 <div className="space-y-0.5">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Primary Objective</span>
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-tight leading-none group-hover/btn:text-white transition-colors">{objective}</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
               <div className="h-24 w-[1px] bg-zinc-900" />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <AlertTriangle className="w-3.5 h-3.5 text-red-900/60" />
                     <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">The Threat Vector</h4>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium italic leading-relaxed">
                    "{threatVector}"
                  </p>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className={`w-3.5 h-3.5 ${colorClass} opacity-60`} />
                     <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Why This Exists</h4>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium font-medium italic leading-relaxed italic">
                    {rationale}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
