
import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Eye, Scan, Binary, Shield } from 'lucide-react';

interface SystemBootProps {
  onComplete: () => void;
}

export const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'KERNEL' | 'MESH' | 'IDENTITY' | 'EXIT'>('KERNEL');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Phase 1: KERNEL
    setLogs(["BOOT_SEQUENCE_INITIATED", "ENCRYPTED_HANDSHAKE_ESTABLISHED"]);

    // Phase 2: MESH (1.5s)
    const t1 = setTimeout(() => {
      setPhase('MESH');
      setLogs(prev => ["CALIBRATING_SACCADIC_MESH", "SYNCING_SENTINEL_NODES", ...prev]);
    }, 1500);

    // Phase 3: IDENTITY (3.5s)
    const t2 = setTimeout(() => {
      setPhase('IDENTITY');
      setLogs(prev => ["VIGIL_WORDMARK_DECRYPTION", "CORE_SYNC_SUCCESSFUL", ...prev]);
    }, 3500);

    // Progress Bar Simulation
    const pInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        const inc = p < 20 ? 1.5 : p < 85 ? 0.4 : 2;
        return Math.min(100, p + inc);
      });
    }, 45);

    // Phase 4: EXIT (6.5s)
    const t3 = setTimeout(() => {
      setPhase('EXIT');
      setTimeout(onComplete, 1200); 
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(pInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[300] bg-[#020202] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${phase === 'EXIT' ? 'scale-110 opacity-0 blur-3xl' : 'opacity-100'}`}>
      
      {/* Background Data Flow */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Forensic Scanning Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
         <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-pulse" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full" />
      </div>

      {/* Central Identity Monolith */}
      <div className="relative z-20 flex flex-col items-center gap-16">
        
        {/* The Forensic Reticle */}
        <div className="relative w-80 h-80 flex items-center justify-center">
           {/* Rotating Elements */}
           <div className={`absolute inset-0 border-[3px] border-white/5 rounded-full border-t-cyan-500/40 animate-spin-slow`} />
           <div className={`absolute inset-8 border border-white/5 rounded-full border-b-cyan-500/20 animate-spin-slow-reverse`} />
           
           {/* ITALIACIZED TEXT WORDMARK */}
           <div className={`transition-all duration-1000 ${phase === 'IDENTITY' ? 'opacity-100 scale-100 blur-0' : 'opacity-10 scale-90 blur-xl'}`}>
              <div className="text-center relative">
                {/* Refractive Shadow Layers */}
                <div className="absolute inset-0 text-cyan-500/30 blur-sm translate-x-1 -translate-y-1 animate-pulse italic font-black text-5xl md:text-6xl tracking-[0.1em] select-none whitespace-nowrap">
                  VIGIL
                </div>
                <div className="relative text-white italic font-black text-5xl md:text-6xl tracking-[0.15em] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-pulse-flicker whitespace-nowrap">
                  VIGIL
                </div>
              </div>
           </div>

           {/* Scanning Crosshair */}
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-full h-[1px] bg-cyan-500/20 shadow-[0_0_15px_cyan]" />
              <div className="absolute h-full w-[1px] bg-cyan-500/20 shadow-[0_0_15px_cyan]" />
           </div>
        </div>

        {/* Tactical Readouts */}
        <div className="flex flex-col items-center gap-5 w-72">
           <div className="flex justify-between w-full text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                SYNCING_PROTOCOLS
              </span>
              <span className="tabular-nums">{Math.floor(progress)}%</span>
           </div>
           <div className="w-full h-[1px] bg-zinc-900 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out shadow-[0_0_20px_white]"
                style={{ width: `${progress}%` }}
              />
           </div>
           <div className="h-6 overflow-hidden text-center">
              <p className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.8em] animate-in slide-in-from-bottom duration-500 italic">
                {phase === 'KERNEL' ? 'KERNEL_INITIALIZING' : phase === 'MESH' ? 'MAPPING_HUMAN_PROTOCOL' : 'NODE_IDENTITY_STABLE'}
              </p>
           </div>
        </div>
      </div>

      {/* Registry Logs: Left Anchor */}
      <div className="absolute bottom-16 left-16 hidden lg:flex flex-col gap-3 max-w-xs opacity-40">
         <div className="flex items-center gap-3 mb-2">
            <Terminal size={12} className="text-zinc-600" />
            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest italic">Registry Init Log</span>
         </div>
         <div className="space-y-2">
           {logs.map((log, i) => (
             <div key={i} className="text-[10px] font-mono text-zinc-600 animate-in slide-in-from-left-4 duration-500">
               <span className="text-zinc-800 mr-2">{'>>'}</span> {log}
             </div>
           ))}
         </div>
      </div>

      {/* Neural Status: Right Anchor */}
      <div className="absolute bottom-16 right-16 hidden lg:flex flex-col items-end gap-5 opacity-40">
         <div className="flex items-center gap-5">
            <div className="text-right">
               <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Resilience Threshold</div>
               <div className="text-sm font-black text-white italic tracking-tighter uppercase">Optimal_Sync</div>
            </div>
            <Activity size={28} className="text-emerald-500 animate-pulse" />
         </div>
         <div className="h-[1px] w-32 bg-zinc-900" />
         <div className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.6em] italic">VIG-OS-MASTER-SYNC</div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 18s linear infinite; }
        
        @keyframes pulse-flicker {
          0%, 100% { opacity: 1; filter: blur(0px); }
          92% { opacity: 1; filter: blur(0px); }
          94% { opacity: 0.8; filter: blur(1px); }
          96% { opacity: 0.3; filter: blur(2px); }
          98% { opacity: 0.9; filter: blur(0.5px); }
        }
        .animate-pulse-flicker { animation: pulse-flicker 4s infinite linear; }
      `}</style>
    </div>
  );
};
