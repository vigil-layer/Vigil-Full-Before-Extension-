
import React, { useState } from 'react';
import { Search, Loader2, Globe, Shield, ShieldAlert, ShieldCheck, Terminal, Cpu, Radio, Zap, ArrowRight, Fingerprint, Activity, Activity as Pulse } from 'lucide-react';
import { synthesizeAddressReputation, ReputationSynthesisResponse } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';

export const ContextualReputationSearch: React.FC = () => {
  const [address, setAddress] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<ReputationSynthesisResponse | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 4));
  };

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || address.length < 32) return;

    setIsSynthesizing(true);
    setResult(null);
    setLogs([]);
    
    addLog("Querying Sentinel Mesh...");
    setTimeout(() => addLog("Mapping cluster associations..."), 800);
    setTimeout(() => addLog("Calculating entropy variance..."), 1600);
    
    try {
      const res = await synthesizeAddressReputation(address);
      setResult(res);
      addLog("Synthesis complete.");
    } catch (err) {
      addLog("CRITICAL: Synthesis aborted.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* CONTROL SIDE */}
        <div className="lg:col-span-5 space-y-10 flex flex-col">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em]">Protocol: Sentinel Search</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Reputation <br/> Synthesis.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium italic max-w-sm mt-6">
              "Cross-referencing address behavior against 1.2M+ global Sentinel nodes to establish structural trust."
            </p>
          </div>

          <form onSubmit={handleSynthesize} className="space-y-6">
            <div className="space-y-3">
               <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Target Identity</label>
               <div className="relative group">
                  <div className="absolute -inset-[2px] bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center bg-[#080808] border-2 border-zinc-900 rounded-2xl overflow-hidden focus-within:border-cyan-600 transition-all">
                    <div className="pl-6 text-zinc-700">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="SCAN ADDRESS..."
                      className="w-full bg-transparent py-6 px-4 text-sm font-mono text-white placeholder:text-zinc-800 focus:outline-none uppercase tracking-tight"
                    />
                  </div>
               </div>
            </div>

            <button 
              type="submit" 
              disabled={isSynthesizing || address.length < 32}
              className="w-full py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-cyan-600 hover:text-white transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isSynthesizing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Globe className="w-6 h-6" /> SYNTHESIZE INTEL</>}
            </button>
          </form>

          {/* LOGS PANEL */}
          <div className="flex-1 bg-black/40 border border-zinc-900 rounded-[2rem] p-6 font-mono text-[9px] text-zinc-600 space-y-2 overflow-hidden min-h-[120px]">
             {logs.length === 0 && <div className="animate-pulse">Awaiting search parameters...</div>}
             {logs.map((log, i) => (
               <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                 <span className="text-cyan-900">[{new Date().toLocaleTimeString()}]</span>
                 <span className={i === 0 ? 'text-cyan-500' : ''}>{log}</span>
               </div>
             ))}
          </div>
        </div>

        {/* DISPLAY SIDE */}
        <div className="lg:col-span-7">
          <div className={`h-full min-h-[500px] bg-[#080808] border-2 rounded-[3.5rem] p-8 md:p-14 relative overflow-hidden transition-all duration-700 ${result ? 'border-cyan-600/40 shadow-[0_0_80px_rgba(6,182,212,0.1)]' : 'border-zinc-900 shadow-2xl'}`}>
            
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {!result && !isSynthesizing && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000 opacity-40">
                <div className="relative">
                  <Globe className="w-24 h-24 text-zinc-800" strokeWidth={1} />
                  <div className="absolute inset-0 border border-zinc-900 rounded-full animate-ping" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-zinc-700 uppercase tracking-[0.4em]">Global Node Listener</h3>
                  <p className="text-[10px] font-mono text-zinc-800 uppercase tracking-widest italic">LISTENING_FOR_INTENT</p>
                </div>
              </div>
            )}

            {isSynthesizing && (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
                 <div className="relative">
                   <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Pulse className="w-8 h-8 text-cyan-500 animate-pulse" />
                   </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-zinc-500 font-black uppercase tracking-[0.6em] text-sm animate-pulse">Forging Intelligence...</p>
                    <div className="flex gap-2 justify-center">
                       {Array(5).fill(0).map((_, i) => (
                         <div key={i} className="w-1.5 h-1.5 bg-cyan-900 animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                       ))}
                    </div>
                 </div>
               </div>
            )}

            {result && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div className="flex items-center gap-6">
                      <AddressGlyph address={address} size="lg" />
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Subject Reputation</div>
                         <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">{result.reputationScore}%</h3>
                      </div>
                   </div>
                   <div className="px-5 py-2 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-1">
                      <div className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">SENTINEL_VERDICT</div>
                      <div className={`text-sm font-black italic tracking-tight uppercase ${result.reputationScore > 80 ? 'text-emerald-500' : result.reputationScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                        {result.verdict}
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <Terminal className="w-32 h-32 text-white" />
                   </div>
                   <p className="text-zinc-400 text-lg leading-relaxed font-medium italic relative z-10">
                     "{result.synthesis}"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {result.sentinelSignals.map((signal, i) => (
                     <div key={i} className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-3 hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between">
                           <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{signal.label}</span>
                           <div className={`w-1.5 h-1.5 rounded-full ${signal.state === 'POSITIVE' ? 'bg-emerald-500' : signal.state === 'NEGATIVE' ? 'bg-red-500' : 'bg-blue-500'}`} />
                        </div>
                        <div className="text-xs font-black text-white uppercase tracking-tight">{signal.value}</div>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Radio className="w-4 h-4 text-cyan-500" />
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Verified via VIGIL MESH v0.5</span>
                   </div>
                   <button className="text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:underline flex items-center gap-2">
                     REPORT AS MALICIOUS <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
