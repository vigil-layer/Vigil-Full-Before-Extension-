
import React, { useState, useEffect, useMemo } from 'react';
import { Activity, Shield, Zap, Radio, Globe, Cpu, Brain, TrendingUp, AlertCircle, Terminal, Dna, Fingerprint, BookOpen } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

interface ThreatReport {
  id: string;
  location: string;
  cluster: string;
  status: 'INTERCEPTED' | 'ACTIVE';
  timestamp: string;
}

const generateMockThreat = (): ThreatReport => {
  const clusters = ['Vanity-X', 'Alpha-Mimic', 'Dust-Siphon', 'Entropy-Gap'];
  const locations = ['Singapore', 'New York', 'Frankfurt', 'London', 'Tokyo'];
  return {
    id: `VIG-${Math.floor(Math.random() * 9000) + 1000}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    cluster: clusters[Math.floor(Math.random() * clusters.length)],
    status: Math.random() > 0.3 ? 'INTERCEPTED' : 'ACTIVE',
    timestamp: new Date().toLocaleTimeString(),
  };
};

export const IntelligenceForge: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void; powerSave?: boolean }> = ({ onOpenDoc, powerSave }) => {
  const [threats, setThreats] = useState<ThreatReport[]>([]);
  const [bri, setBri] = useState(100);
  const [xp, setXp] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const savedBri = localStorage.getItem('vigil_operator_bri');
    const savedXp = localStorage.getItem('vigil_operator_xp');
    if (savedBri) setBri(parseInt(savedBri));
    if (savedXp) setXp(parseInt(savedXp));

    const interval = setInterval(() => {
      setThreats(prev => [generateMockThreat(), ...prev].slice(0, 5));
    }, 4000);

    let animationFrame: number;
    const animateTick = () => {
      setTick(t => t + 1);
      animationFrame = requestAnimationFrame(animateTick);
    };

    if (!powerSave) {
      animationFrame = requestAnimationFrame(animateTick);
    }

    return () => {
      clearInterval(interval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [powerSave]);

  const level = Math.floor(xp / 500) + 1;
  const progressToNextLevel = (xp % 500) / 5;

  return (
    <section id="intel-forge" className="px-6 md:px-20 py-12 bg-[#050505] relative z-10 overflow-hidden border-t border-zinc-900/50">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em]">Path 03 // Intelligence Forge</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                Cognitive <br/> Evolution.
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">
              "Synchronizing local node telemetry with the <span className="text-cyan-500">global Sentinel mesh</span> to identify malicious clusters before they reach your local execution environment."
            </p>
          </div>
          
          <div className="w-full lg:w-96 p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-6 shrink-0 mt-2">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Operator Level {level}</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{xp} XP</span>
             </div>
             <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${progressToNextLevel}%` }} />
             </div>
             <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest text-center">Syncing with Global Sentinel Mesh...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[3.5rem] p-10 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-8 right-10 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Neural Latency: STABLE</span>
             </div>

             <div className="space-y-8 h-full flex flex-col">
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Saccadic Profile</h3>
                   <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">Mapping visual verification patterns across temporal nodes.</p>
                   <button 
                    onClick={() => onOpenDoc?.('research_01')}
                    className="mt-4 flex items-center gap-2 text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-400 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> [ACCESS_RESEARCH: VG-RP-25-01]
                  </button>
                </div>

                <div className="flex-1 min-h-[300px] flex items-end gap-1 relative pt-20">
                   {Array.from({ length: 40 }).map((_, i) => (
                     <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-cyan-950 to-cyan-500/40 rounded-t-sm transition-all duration-[2000ms] ease-in-out will-change-transform"
                        style={{ 
                          height: powerSave ? `${30 + (i % 5) * 10}%` : `${20 + Math.sin(i * 0.5 + tick * 0.05) * 30 + Math.random() * 40}%`,
                          opacity: 0.1 + (i / 40) * 0.4
                        }}
                     />
                   ))}
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/10" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="grid grid-cols-3 gap-8 border-t border-zinc-900 pt-8">
                   {[
                     { label: 'Pattern precision', val: `${bri}%` },
                     { label: 'Latency floor', val: '420ms' },
                     { label: 'Mimic rejection', val: '99.1%' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-1">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</div>
                        <div className="text-2xl font-black text-white italic">{item.val}</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 bg-[#080808] border-2 border-zinc-900 rounded-[3.5rem] p-10 flex flex-col h-[600px] shadow-2xl">
             <div className="space-y-6 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
                   <div className="flex items-center gap-3">
                      <Globe className={`w-5 h-5 text-blue-500 ${!powerSave ? 'animate-spin-slow' : ''}`} />
                      <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Live Intelligence</h4>
                   </div>
                   <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[8px] font-black text-blue-500 uppercase tracking-widest">
                      ACTIVE_FEED
                   </div>
                </div>

                <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 pr-2">
                   {threats.map((threat, idx) => (
                     <div key={threat.id} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-3 animate-in slide-in-from-right-4 duration-500 group hover:border-red-600/30 transition-all">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest">{threat.id}</span>
                              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{threat.location}</span>
                           </div>
                           <span className="text-[8px] font-mono text-zinc-700">{threat.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{threat.cluster}</div>
                              <div className={`text-[8px] font-black uppercase ${threat.status === 'INTERCEPTED' ? 'text-emerald-500' : 'text-red-500 animate-pulse'}`}>
                                 {threat.status}
                              </div>
                           </div>
                           <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                              {threat.status === 'INTERCEPTED' ? <Shield className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-red-500" />}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-6 border-t border-zinc-900 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">1,282 Operators Online</p>
                   </div>
                   <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                      CONNECT TO MESH
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { t: 'Biological Bypass', d: 'Your brain successfully rejected 400+ deceptive address edges.', icon: <Brain className="w-6 h-6" /> },
             { t: 'Entropy Recognition', d: 'High-fidelity detection of non-random character clusters.', icon: <Fingerprint className="w-6 h-6" /> },
             { t: 'Sentinel Legacy', d: 'Verified member of the initial security standard release.', icon: <Dna className="w-6 h-6" /> }
           ].map((card, i) => (
             <div key={i} className="p-10 bg-zinc-950/40 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-zinc-700 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-cyan-500 transition-colors">
                   {card.icon}
                </div>
                <div className="space-y-2">
                   <h5 className="text-xl font-black text-white italic uppercase tracking-tight">{card.t}</h5>
                   <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">{card.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};
