
import React, { useState, useEffect, useRef } from 'react';
import { Skull, RefreshCcw, Zap, HeartPulse, FlaskConical, ShieldCheck, ShieldX, Fingerprint, ChevronRight, Target, Activity, Scan, Binary, AlertCircle, Eye, Gauge, AlertTriangle, Terminal } from 'lucide-react';
import { generateCognitiveAutopsy, CognitiveAutopsyResponse } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';

const CHALLENGE_DURATION = 5.0;

const generatePoisonMimic = (real: string): string => {
  const prefix = real.slice(0, 4);
  const suffix = real.slice(-4);
  const charset = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let middle = "";
  for (let i = 0; i < real.length - 8; i++) {
    if (Math.random() > 0.65) {
      middle += real[i + 4];
    } else {
      middle += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return prefix + middle + suffix;
};

export const AdversarialMimicryLab: React.FC = () => {
  const [realAddress, setRealAddress] = useState('');
  const [gameState, setGameState] = useState<'IDLE' | 'PREPARING' | 'CHALLENGE' | 'AUTOPSY'>('IDLE');
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [selected, setSelected] = useState<string | null>(null);
  const [autopsy, setAutopsy] = useState<CognitiveAutopsyResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentBri, setCurrentBri] = useState(100);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedBri = localStorage.getItem('vigil_operator_bri');
    if (savedBri) setCurrentBri(parseInt(savedBri));
  }, []);

  const updateGlobalBri = (delta: number) => {
    const next = Math.max(0, Math.min(100, currentBri + delta));
    setCurrentBri(next);
    localStorage.setItem('vigil_operator_bri', next.toString());
  };

  const initiateAttack = () => {
    if (realAddress.length < 32) return;
    setGameState('PREPARING');
    
    setTimeout(() => {
      const mimics = [
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress)
      ];
      const all = [...mimics, realAddress].sort(() => Math.random() - 0.5);
      setOptions(all);
      setGameState('CHALLENGE');
      setTimeLeft(CHALLENGE_DURATION);
      startTimer();
    }, 2800);
  };

  const startTimer = () => {
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleSelection(null); 
      }
    }, 10);
  };

  const handleSelection = async (addr: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(addr);
    setGameState('AUTOPSY');
    setIsAnalyzing(true);

    if (addr === realAddress) {
      updateGlobalBri(2);
    } else {
      updateGlobalBri(-8);
    }

    try {
      const report = await generateCognitiveAutopsy(realAddress, addr || options[0]);
      setAutopsy(report);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setGameState('IDLE');
    setOptions([]);
    setAutopsy(null);
    setSelected(null);
    setTimeLeft(CHALLENGE_DURATION);
  };

  const renderCollisionAddress = (addr: string, target: string) => {
    return (
      <div className="font-mono text-[9px] md:text-sm break-all leading-tight">
        {addr.split('').map((char, i) => {
          const isCollision = char === target[i];
          return (
            <span 
              key={i} 
              className={`transition-all duration-700 ${
                isCollision 
                  ? 'text-red-500 font-black drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] scale-110 inline-block' 
                  : 'text-white font-bold animate-pulse brightness-125'
              }`}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section id="mimicry-lab" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-stretch relative z-10">
        
        {/* LEFT FLANK: THE BRIEFING */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FlaskConical className="w-5 h-5 text-red-600 animate-pulse" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">Path 02 // Mimicry Lab</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                Trial <br/> by Fire.
              </h2>
            </div>

            {gameState === 'IDLE' && (
              <div className="space-y-8 animate-in fade-in duration-1000">
                <div className="relative pl-8 border-l-4 border-red-600/30">
                  <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed italic">
                    "Testing the threshold of <span className="text-white">biological verification.</span> Can your brain detect a single character mutation in less than 5 seconds?"
                  </p>
                </div>
                
                <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] space-y-6">
                   <div className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-zinc-600" />
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Technical Abstract</h4>
                   </div>
                   <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                     VANITY_COLLISION_V3: Attackers utilize high-density GPU clusters to generate addresses sharing 4+4 character prefix/suffixes with your trusted history. VIGIL's glyph standard neutralizes this by enforcing visual uniqueness.
                   </p>
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-white italic">94.2%</div>
                         <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Cognitive Failure Rate</div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-red-600 italic">CRITICAL</div>
                         <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Adversary Vector</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">SUBMIT REFERENCE PAYLOAD</label>
                    <Target className="w-3 h-3 text-zinc-800" />
                  </div>
                  <div className="flex gap-4">
                    <div className="hidden sm:block">{realAddress && <AddressGlyph address={realAddress} size="md" className="mt-2" />}</div>
                    <input 
                      type="text" 
                      value={realAddress}
                      onChange={(e) => setRealAddress(e.target.value)}
                      placeholder="PASTE TARGET ADDRESS..."
                      className="flex-1 bg-black border-2 border-zinc-900 rounded-2xl py-6 px-8 text-xs md:text-sm font-mono text-white placeholder:text-zinc-900 focus:outline-none focus:border-red-600 transition-all uppercase shadow-inner"
                    />
                  </div>
                </div>
                <button 
                  onClick={initiateAttack}
                  disabled={realAddress.length < 32}
                  className="w-full py-6 bg-red-600 text-white text-[12px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(220,38,38,0.2)] disabled:opacity-30 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <Zap className="w-5 h-5 fill-white" /> COMMENCE COGNITIVE TRIAL
                </button>
              </div>
            )}

            {gameState === 'AUTOPSY' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className={`p-8 md:p-10 border-2 rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 relative overflow-hidden transition-all duration-700 bg-[#050505] ${selected === realAddress ? 'border-emerald-500/20' : 'border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.1)]'}`}>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                          <HeartPulse className={`w-7 h-7 ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`} />
                          <span className={`text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                            Resilience Index: {selected === realAddress ? '+2%' : '-8%'}
                          </span>
                      </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {!isAnalyzing && autopsy && (
                        <div className="space-y-6">
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium italic">"{autopsy.autopsy}"</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 md:p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2">
                                  <div className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest">Cognitive Bias</div>
                                  <div className="text-[9px] md:text-[11px] font-bold text-white uppercase italic">{autopsy.biologicalVulnerability}</div>
                              </div>
                              <div className="p-4 md:p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2">
                                  <div className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest">Deceptive Anchor</div>
                                  <div className="text-[9px] md:text-[11px] font-bold text-white uppercase italic">{autopsy.visualAnchor}</div>
                              </div>
                            </div>
                        </div>
                      )}
                      {isAnalyzing && (
                          <div className="flex flex-col items-center py-10 space-y-4">
                            <Activity className="w-10 h-10 text-red-500 animate-pulse" />
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Performing Cognitive Autopsy...</p>
                          </div>
                      )}
                    </div>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-6 border border-zinc-800 text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 group active:scale-95"
                >
                  <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> RESET EXPERIMENT
                </button>
              </div>
            )}
          </div>

          {/* BOTTOM STATUS BAR FOR LEFT COLUMN */}
          <div className="pt-8 border-t border-zinc-900/50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-zinc-700" />
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Subject Tracking: ACTIVE</span>
             </div>
             <div className="text-[8px] font-mono text-zinc-800 uppercase">Archive_ID: VIG-POI-2026-X1</div>
          </div>
        </div>

        {/* RIGHT FLANK: THE CHAMBER */}
        <div className="lg:col-span-7 h-full">
           <div className={`relative h-full min-h-[650px] bg-[#050505] border-2 rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-700 overflow-hidden shadow-2xl ${
             gameState === 'CHALLENGE' ? 'border-red-600 scale-[1.02] shadow-[0_0_100px_rgba(220,38,38,0.1)]' : 'border-zinc-900'
           }`}>
             
             {/* CHAMBER OVERLAYS */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-white" />
                <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-white" />
                <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-white" />
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-white" />
             </div>

             {gameState === 'IDLE' && (
               <div className="flex flex-col items-center justify-center space-y-10 py-20 animate-in fade-in zoom-in duration-1000 px-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-colors" />
                    <Fingerprint className="w-24 h-24 md:w-40 md:h-40 text-zinc-900 group-hover:text-zinc-800 transition-colors relative z-10" strokeWidth={1} />
                  </div>
                  <div className="text-center space-y-3 relative z-10">
                    <h3 className="text-xl md:text-2xl font-black text-zinc-800 uppercase tracking-[0.5em]">Awaiting Trial Identity</h3>
                    <div className="flex items-center justify-center gap-4">
                       <div className="h-[1px] w-6 bg-zinc-900" />
                       <p className="text-[10px] md:text-[11px] font-mono text-zinc-900 uppercase tracking-widest italic">CHAMBER_IDLE_READY</p>
                       <div className="h-[1px] w-6 bg-zinc-900" />
                    </div>
                  </div>
               </div>
             )}

             {gameState === 'PREPARING' && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-12 relative overflow-hidden px-6">
                   <div className="absolute top-0 left-0 w-full h-1 bg-red-600/60 blur-[2px] animate-[scan-horizontal_2s_linear_infinite]" />
                   
                   <div className="relative">
                      <Binary className="w-20 h-20 text-red-600/20 animate-pulse" strokeWidth={1} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <Activity className="w-12 h-12 text-red-600" />
                      </div>
                   </div>
                   <div className="text-center space-y-4">
                      <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-[0.6em] italic animate-pulse">Forging Adversarial Mimics...</h4>
                      <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em] bg-red-600/10 px-6 py-2 rounded-full border border-red-600/20">Entropy Gap Injection: 88%</p>
                   </div>
                </div>
             )}

             {gameState === 'CHALLENGE' && (
               <div className="w-full h-full p-6 md:p-16 space-y-12 animate-in zoom-in duration-500 flex flex-col">
                  <div className="flex flex-col items-center gap-6">
                     <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900 md:hidden" />
                           <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900 hidden md:block" />
                           
                           {/* Mobile Progress */}
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-red-600 transition-all duration-75 ease-linear md:hidden" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (timeLeft / CHALLENGE_DURATION))} />
                           {/* Desktop Progress */}
                           <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-red-600 transition-all duration-75 ease-linear hidden md:block" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * (timeLeft / CHALLENGE_DURATION))} />
                        </svg>
                        <span className="text-3xl md:text-5xl font-black italic text-white tracking-tighter tabular-nums">{timeLeft.toFixed(2)}</span>
                     </div>
                     <p className="text-[10px] md:text-[12px] font-black text-red-500 uppercase tracking-[0.5em] animate-pulse flex items-center gap-3">
                        <Scan className="w-5 h-5" /> Biological Focus Check: IDENTIFY SOURCE
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full flex-1">
                     {options.map((opt, i) => (
                       <button 
                        key={i} 
                        onClick={() => handleSelection(opt)}
                        className="group relative w-full overflow-hidden p-6 md:p-10 bg-black border border-zinc-900 rounded-[2rem] hover:border-red-600/60 transition-all flex items-center gap-6 md:gap-10 shadow-2xl active:scale-[0.98]"
                       >
                          <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-[30px] z-10 transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-transparent" />
                          
                          <div className="relative z-20 flex items-center gap-6 md:gap-10 w-full">
                             <div className="scale-90 md:scale-125 group-hover:scale-135 transition-transform duration-500 drop-shadow-2xl">
                                <AddressGlyph address={opt} size="lg" />
                             </div>
                             <div className="flex-1 text-left font-mono text-[10px] md:text-[18px] text-zinc-800 group-hover:text-zinc-100 break-all transition-all duration-500 italic blur-[4px] group-hover:blur-0 group-hover:tracking-normal tracking-[0.2em] font-bold">
                                {opt.slice(0, 6)}...{opt.slice(-6)}
                             </div>
                             <div className="w-12 h-12 rounded-full border border-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <ChevronRight className="w-6 h-6 text-red-500" />
                             </div>
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
             )}

             {gameState === 'AUTOPSY' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-16 animate-in fade-in duration-1000">
                   <div className="relative w-full max-w-2xl bg-black border-2 border-zinc-900 rounded-[3rem] md:rounded-[4.5rem] p-8 md:p-16 space-y-12 overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        <AlertTriangle className="w-64 h-64 text-red-600" />
                      </div>

                      <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center border-2 ${selected === realAddress ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'bg-red-600/10 border-red-600/40 shadow-[0_0_50px_rgba(220,38,38,0.2)]'} animate-in zoom-in duration-700`}>
                           {selected === realAddress ? <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-emerald-500" /> : <ShieldX className="w-12 h-12 md:w-16 md:h-16 text-red-600" />}
                        </div>
                        <div className="text-center space-y-2">
                           <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Forensic Result.</h3>
                           <p className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                             {selected === realAddress ? 'BIOLOGICAL_VIGILANCE_CONFIRMED' : 'COGNITIVE_BYPASS_DETECTED'}
                           </p>
                        </div>
                      </div>

                      <div className="space-y-12 relative z-10">
                         <div className="space-y-6">
                           <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" /> TARGET_IDENTITY
                              </div>
                              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">ORIGINAL_PAYLOAD</span>
                           </div>
                           <div className="flex items-center gap-6 md:gap-10 p-6 md:p-8 bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] shadow-inner">
                              <div className="scale-100 md:scale-125"><AddressGlyph address={realAddress} size="lg" /></div>
                              <div className="font-mono text-sm md:text-xl text-zinc-500 break-all leading-relaxed tracking-tight">
                                {realAddress}
                              </div>
                           </div>
                         </div>

                         <div className="space-y-6">
                           <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                              <div className={`text-[10px] font-black uppercase tracking-widest ${selected === realAddress ? 'text-emerald-500' : 'text-red-500'}`}>
                                {selected === realAddress ? 'VERIFIED_SUBJECT' : 'MUTATED_PAYLOAD_CAPTURED'}
                              </div>
                              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">USER_SELECTION</span>
                           </div>
                           <div className={`flex items-center gap-6 md:gap-10 p-6 md:p-8 bg-[#0a0a0a] border rounded-[2rem] shadow-inner transition-colors duration-1000 ${selected === realAddress ? 'border-emerald-500/20' : 'border-red-500/30'}`}>
                              <div className="scale-100 md:scale-125"><AddressGlyph address={selected || options[0]} size="lg" /></div>
                              {renderCollisionAddress(selected || options[0], realAddress)}
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-horizontal {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
