
import React, { useState } from 'react';
import { Terminal, ShieldAlert, ShieldCheck, Loader2, Search, Binary, AlertTriangle, CheckCircle2, Info, UserPlus, Globe, MessageSquare, ExternalLink, Activity, Zap, ClipboardPaste, Clock, ShieldQuestion, Wifi, ShieldX, Scan, AlertOctagon, Scale, X, Fingerprint, Database, HelpCircle, History, MousePointerClick } from 'lucide-react';
import { analyzeSecurityIntent, ThreatAnalysisResponse, IntentCategory } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';

const ThreatIndexBreakdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const vectors = [
    { 
      label: "Visual Mimicry Entropy", 
      weight: "40%", 
      desc: "Analysis of 'Entropy Collision' at address edges. Detects high-performance vanity mimics.",
      icon: <Fingerprint className="w-4 h-4 text-red-500" />
    },
    { 
      label: "Contextual Provenance", 
      weight: "25%", 
      desc: "Evaluates the source DOM context (Explorer vs. Social DM) to establish intent validity.",
      icon: <Search className="w-4 h-4 text-blue-500" />
    },
    { 
      label: "On-Chain Provenance", 
      weight: "20%", 
      desc: "Queries RPC layer for address age, balance, and transaction history depth.",
      icon: <History className="w-4 h-4 text-emerald-500" />
    },
    { 
      label: "Global Feed Correlation", 
      weight: "15%", 
      desc: "Cross-referencing against known 'Poisoning Clusters' and vanity generator signatures.",
      icon: <Database className="w-4 h-4 text-purple-500" />
    }
  ];

  const intervals = [
    { range: "0–10%", state: "TRUSTED", color: "text-emerald-500", desc: "Exact historical & on-chain match." },
    { range: "11–40%", state: "NEW/INFO", color: "text-blue-500", desc: "Valid first-time interaction." },
    { range: "41–70%", state: "CAUTION", color: "text-amber-500", desc: "Similarity detected; manual verify." },
    { range: "71–100%", state: "CRITICAL", color: "text-red-500", desc: "High-entropy mimicry likely." }
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#080808] border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-y-auto max-h-[90vh] shadow-2xl no-scrollbar">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-10">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="space-y-8 md:space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Engine Specification // VIG-HEUR-01</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Threat Index.</h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium max-w-md">
              A probabilistic security metric measuring the **likelihood of user deception**, not simple cryptographic similarity.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.3em] border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" /> Calculation Vectors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vectors.map((v, i) => (
                <div key={i} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {v.icon}
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{v.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600">{v.weight}</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase italic leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.3em] border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Binary className="w-3.5 h-3.5" /> Threshold Key
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {intervals.map((int, i) => (
                <div key={i} className="space-y-1">
                  <div className={`text-[12px] font-black italic ${int.color}`}>{int.range}</div>
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{int.state}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900">
            <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em] italic text-center">
              VIGIL monitors the gap between user intent and cryptographic reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const IntentValidatorDemo: React.FC = () => {
  const [historyAddr, setHistoryAddr] = useState('Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90');
  const [currentAddr, setCurrentAddr] = useState('');
  const [source, setSource] = useState<'EXPLORER' | 'SOCIAL' | 'DAPP'>('EXPLORER');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ThreatAnalysisResponse | null>(null);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const testScenarios = [
    { id: 'TRUSTED', label: 'Test Trusted', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90', desc: 'Confirmed match.' },
    { id: 'POISON', label: 'Trigger Poisoning', addr: 'Ab1C00000000000000000000000000Zz90', desc: 'Mimicry attack.' },
    { id: 'SPOOF', label: 'Simulate Spoof', addr: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', desc: 'Phishing Cluster detected.' },
    { id: 'NEW', label: 'Safe New Address', addr: '5U398zH6pA2wM1nL9xT4vR7yB8jK2mQ5v', desc: 'Valid first-time use.' },
    { id: 'INFO', label: 'Info State', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', desc: 'Verified app transfer.' }
  ];

  const injectScenario = (sc: typeof testScenarios[0]) => {
    setCurrentAddr(sc.addr);
    setResult(null);
  };

  const handleValidate = async () => {
    if (!currentAddr) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeSecurityIntent(currentAddr, historyAddr, source);
      setResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusConfig = (state: IntentCategory) => {
    switch (state) {
      case 'POISON':
        return { color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/20', icon: <ShieldAlert className="w-5 h-5" />, label: 'REPORT: ADDRESS POISONING', subLabel: 'POISON_DETECTED' };
      case 'SPOOF':
        return { color: 'text-rose-500', bg: 'bg-rose-500/5', border: 'border-rose-500/30', icon: <AlertOctagon className="w-5 h-5" />, label: 'REPORT: NETWORK SPOOFING', subLabel: 'PHISHING_CLUSTER' };
      case 'TRUSTED':
        return { color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: <CheckCircle2 className="w-5 h-5" />, label: 'REPORT: TRUSTED DESTINATION', subLabel: 'Intent Verified - No Visual Deviation Detected' };
      case 'CAUTION':
        return { color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20', icon: <AlertTriangle className="w-5 h-5" />, label: 'REPORT: SIMILARITY NOTICE', subLabel: 'SIMILARITY_WARNING' };
      case 'NEW':
        return { color: 'text-orange-500', bg: 'bg-orange-500/5', border: 'border-orange-500/20', icon: <UserPlus className="w-5 h-5" />, label: 'REPORT: NEW ADDRESS', subLabel: 'NEW_DESTINATION' };
      default: // INFO
        return { color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: <Info className="w-5 h-5" />, label: 'REPORT: INFO WARNING', subLabel: 'AWARENESS_MODE' };
    }
  };

  return (
    <section id="system-simulation" className="px-6 md:px-20 py-16 md:py-24 bg-[#020202] relative z-10 scroll-mt-20 flex flex-col items-center min-h-screen">
      <ThreatIndexBreakdown isOpen={isBreakdownOpen} onClose={() => setIsBreakdownOpen(false)} />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* CONTROL PANEL */}
          <div className="lg:w-[42%] space-y-10 flex flex-col w-full">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Path 01 // Intent Validator</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                  Intent <br/> Validator.
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">
                "Validating user <span className="text-blue-500">belief against reality.</span> Monitoring the browser DOM to ensure the destination you see is the destination you sign."
              </p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Zap className="w-3.5 h-3.5 text-amber-500" /> Scenario Matrix
                 </label>
                 <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest italic animate-pulse hidden sm:block">Select to test scenario</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {testScenarios.map((sc) => (
                    <button 
                      key={sc.id} 
                      onClick={() => injectScenario(sc)} 
                      className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-left hover:border-blue-500/30 hover:bg-zinc-900/50 transition-all group relative overflow-hidden active:scale-[0.97]"
                    >
                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                          <div className="px-1.5 py-0.5 bg-blue-600 rounded text-[7px] font-black text-white uppercase tracking-widest flex items-center gap-1 shadow-lg">
                             <MousePointerClick className="w-2 h-2" /> INJECT
                          </div>
                       </div>
                       <div className="text-[11px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest transition-colors">{sc.label}</div>
                       <div className="text-[10px] text-zinc-600 font-medium italic truncate mt-0.5 group-hover:text-zinc-500 transition-colors">{sc.desc}</div>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                 <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">Source Context</label>
                 <div className="flex flex-wrap sm:flex-nowrap gap-2">
                    {[
                      { id: 'EXPLORER', icon: <Globe className="w-4 h-4" />, label: 'Explorer' },
                      { id: 'DAPP', icon: <ExternalLink className="w-4 h-4" />, label: 'Verified dApp' },
                      { id: 'SOCIAL', icon: <MessageSquare className="w-4 h-4" />, label: 'Twitter' }
                    ].map((s) => (
                      <button key={s.id} onClick={() => setSource(s.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 rounded-xl border text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all ${source === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[#080808] border-zinc-900 text-zinc-600'}`}>
                        {s.icon} {s.label}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                   <ClipboardPaste className="w-4 h-4" /> Transfer Destination
                </label>
                <div className="flex gap-4">
                   {currentAddr && <div className="hidden sm:block"><AddressGlyph address={currentAddr} size="md" className="mt-2" /></div>}
                   <input type="text" value={currentAddr} onChange={(e) => setCurrentAddr(e.target.value)} placeholder="PASTE ADDRESS..." className="flex-1 bg-[#080808] border-2 border-zinc-900 rounded-2xl py-5 px-6 md:px-8 text-xs md:text-sm font-mono text-white placeholder:text-zinc-800 focus:outline-none focus:border-blue-600 transition-all uppercase shadow-inner" />
                </div>
              </div>

              <button 
                onClick={handleValidate} 
                disabled={isAnalyzing || !currentAddr} 
                className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-2xl ${
                  isAnalyzing ? 'bg-zinc-900 text-zinc-600 cursor-wait' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ANALYZING INTENT...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    VALIDATE TRANSACTION
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:w-[58%] w-full h-full min-h-[500px] flex flex-col">
            <div className={`flex-1 bg-[#080808] border-2 rounded-[3.5rem] p-8 md:p-14 relative overflow-hidden transition-all duration-700 ${result ? getStatusConfig(result.intentState).border : 'border-zinc-900 shadow-2xl'}`}>
              
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              {!result && !isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000 opacity-70">
                  <div className="relative">
                    <ShieldQuestion className="w-24 h-24 text-zinc-700" strokeWidth={1} />
                    <div className="absolute inset-0 border border-zinc-900 rounded-full animate-ping" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-zinc-400 uppercase tracking-[0.4em]">Awaiting Simulation</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">LISTENING_FOR_INTENT</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
                   <div className="relative">
                     <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                     </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-zinc-500 font-black uppercase tracking-[0.6em] text-sm animate-pulse">Running Heuristic Matrix...</p>
                      <div className="flex gap-2 justify-center">
                         {Array(5).fill(0).map((_, i) => (
                           <div key={i} className="w-1.5 h-1.5 bg-blue-900 animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                         ))}
                      </div>
                   </div>
                 </div>
              )}

              {result && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-4">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getStatusConfig(result.intentState).border} ${getStatusConfig(result.intentState).bg}`}>
                           {getStatusConfig(result.intentState).icon}
                         </div>
                         <div className="space-y-1">
                            <div className={`text-[10px] font-black uppercase tracking-widest ${getStatusConfig(result.intentState).color}`}>
                              {getStatusConfig(result.intentState).label}
                            </div>
                            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest italic">{getStatusConfig(result.intentState).subLabel}</h3>
                         </div>
                      </div>
                      <button onClick={() => setIsBreakdownOpen(true)} className="flex items-center gap-2 group/help">
                         <div className="text-right">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Threat Index</div>
                            <div className={`text-4xl font-black italic tracking-tighter ${getStatusConfig(result.intentState).color}`}>{result.riskScore}%</div>
                         </div>
                         <HelpCircle className="w-4 h-4 text-zinc-800 group-hover/help:text-zinc-600 transition-colors" />
                      </button>
                   </div>

                   <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                         <Terminal className="w-32 h-32 text-white" />
                      </div>
                      <p className="text-zinc-400 text-lg leading-relaxed font-medium italic relative z-10">
                        "{result.reasoning}"
                      </p>
                      <div className="mt-6 pt-6 border-t border-zinc-900/50 flex items-center gap-3">
                         <Info className="w-3.5 h-3.5 text-zinc-600" />
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{result.advisory}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors">
                         <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Similarity Heuristics</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${result.similarityIndex > 0.7 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                         </div>
                         <div className="flex items-end justify-between">
                            <div className="text-xl font-black text-white italic">{Math.round(result.similarityIndex * 100)}% Match</div>
                            <div className="text-[8px] font-mono text-zinc-700">LV_DIST: 0.82</div>
                         </div>
                      </div>

                      <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors">
                         <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">On-Chain Age</span>
                            <History className="w-3 h-3 text-zinc-800" />
                         </div>
                         <div className="flex items-end justify-between">
                            <div className="text-xl font-black text-white italic">{result.onChainAge}</div>
                            <div className={`text-[8px] font-black uppercase ${result.globalReputation === 'CLEAN' ? 'text-emerald-500' : 'text-red-500'}`}>
                               {result.globalReputation}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Wifi className="w-4 h-4 text-emerald-500" />
                         <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Verified via VIGIL MESH v0.5</span>
                      </div>
                      <button onClick={() => setResult(null)} className="text-[9px] font-black text-zinc-700 uppercase tracking-widest hover:text-white transition-colors">
                        RESET SIMULATION
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
