
import React, { useState, useRef } from 'react';
import { Share2, Zap, Shield, Download, Terminal as TerminalIcon, Bookmark, Fingerprint, ShieldAlert, ShieldCheck, Type, Settings2, Info, Globe } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

type CommsMode = 'ALERT' | 'AUDIT';

const PRESETS = [
  {
    id: 'TWEET_03_BLINDSPOT',
    label: 'Tweet 03: Blind Spot',
    title: 'THE 8-CHAR BLIND SPOT',
    leftLabel: 'HUMAN FOCUS',
    leftValue: 'First 4 + Last 4',
    rightLabel: 'EXPLOIT ZONE',
    rightValue: '36 Middle Chars',
    summary: 'Defining Layer 0.5\nSecurity stops at the protocol.\nVIGIL starts at the retina.'
  },
  {
    id: 'ENTROPY_COLLISION',
    label: 'Entropy Collision',
    title: 'INTENT MISMATCH',
    leftLabel: 'USER EXPECTATION',
    leftValue: '8821...X921 (Trusted)',
    rightLabel: 'DOM DETECTED',
    rightValue: '8821...X921 (Poison)',
    summary: 'HEURISTIC RESULT: SIMILARITY HIGH (89%).\nPATTERN MATCHES ADDRESS POISONING CAMPAIGN VG-25.'
  },
  {
    id: 'CLIPBOARD_HIJACK',
    label: 'Clipboard Hijack',
    title: 'INTERCEPTION LOG',
    leftLabel: 'ORIGINAL BUFFER',
    leftValue: 'Sol1...420x (Verified)',
    rightLabel: 'MUTATED PAYLOAD',
    rightValue: 'Sol1...420x (Mimic)',
    summary: 'SYSTEM EVENT: CLIPBOARD SWAP ATTEMPT NEUTRALIZED.\nMALICIOUS SCRIPT ATTEMPTED TO OVERWRITE INTENT AT T+14MS.'
  },
  {
    id: 'UI_SPOOF',
    label: 'UI Spoofing',
    title: 'STRUCTURAL AUDIT',
    leftLabel: 'PROTOCOL STATE',
    leftValue: 'v0.5_MAINNET_SYNC',
    rightLabel: 'UI ANOMALY',
    rightValue: 'v0.1_LEGACY_SPOOF',
    summary: 'DIAGNOSTIC: UNTRUSTED DOM ELEMENT DETECTED OVERLAYING TRANSACTION INTERFACE.\nSOURCE: UNVERIFIED NODE.'
  }
];

const VIGIL_WORDMARK = (
  <div className="italic font-black text-4xl tracking-widest text-white">VIGIL</div>
);

export const SocialIntelligenceLab: React.FC = () => {
  const [title, setTitle] = useState(PRESETS[0].title);
  const [leftLabel, setLeftLabel] = useState(PRESETS[0].leftLabel);
  const [leftValue, setLeftValue] = useState(PRESETS[0].leftValue);
  const [rightLabel, setRightLabel] = useState(PRESETS[0].rightLabel);
  const [rightValue, setRightValue] = useState(PRESETS[0].rightValue);
  const [summary, setSummary] = useState(PRESETS[0].summary);
  const [isExporting, setIsExporting] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(captureRef.current, {
        backgroundColor: '#050505',
        scale: 3, 
        logging: false,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `VIGIL_INTEL_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const applyPreset = (p: typeof PRESETS[0]) => {
    setTitle(p.title);
    setLeftLabel(p.leftLabel);
    setLeftValue(p.leftValue);
    setRightLabel(p.rightLabel);
    setRightValue(p.rightValue);
    setSummary(p.summary);
  };

  return (
    <div className="space-y-16 max-w-7xl mx-auto selection:bg-red-500/20">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em]">Visual Intel Forge // Propaganda Unit</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Comms <br/> Terminal.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "Construct evidence-based infographics for your narrative. Visual integrity is the ultimate validator."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* CONTROL INTERFACE */}
        <div className="xl:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
              
              {/* Presets Grid */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Bookmark className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Narrative Presets</span>
                 </div>
                 <div className="grid grid-cols-1 gap-2">
                    {PRESETS.map((p) => (
                      <button 
                        key={p.id}
                        onClick={() => applyPreset(p)}
                        className={`p-3 text-left rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                          leftValue === p.leftValue ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Variable Inputs */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <Settings2 className="w-4 h-4 text-zinc-600" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Canvas Variables</span>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Display Title</label>
                       <input value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300 focus:border-red-600 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Left Pod Label</label>
                          <input value={leftLabel} onChange={(e) => setLeftLabel(e.target.value.toUpperCase())} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-blue-600 outline-none" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Right Pod Label</label>
                          <input value={rightLabel} onChange={(e) => setRightLabel(e.target.value.toUpperCase())} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-red-600 outline-none" />
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Left Pod Value</label>
                       <input value={leftValue} onChange={(e) => setLeftValue(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[11px] font-mono text-zinc-300 focus:border-blue-600 outline-none" />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Right Pod Value</label>
                       <input value={rightValue} onChange={(e) => setRightValue(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[11px] font-mono text-zinc-300 focus:border-red-600 outline-none" />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Footer Forensic Summary</label>
                       <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full h-24 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-blue-600 outline-none resize-none" />
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <button 
                   onClick={handleExport}
                   disabled={isExporting}
                   className="w-full py-5 bg-red-600 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-red-500 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                   {isExporting ? <Zap className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" /> EXPORT TWITTER ASSET</>}
                 </button>
                 <p className="text-center text-[9px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Info className="w-3 h-3" /> Standard: 1200x580 PNG // Tightened Aspect
                 </p>
              </div>
           </div>
        </div>

        {/* THE CANVAS CONTAINER */}
        <div className="xl:col-span-8 flex flex-col items-center">
           <div className="relative group w-full flex justify-center border-2 border-zinc-900 rounded-[3.5rem] bg-black/50 p-4 md:p-12 overflow-hidden shadow-inner min-h-[450px]">
              <div 
                ref={captureRef}
                className="bg-[#050505] rounded-[3.5rem] border border-zinc-900 relative overflow-hidden flex flex-col p-12 justify-between shadow-[0_40px_100px_rgba(0,0,0,1)] shrink-0"
                style={{ width: '1200px', height: '580px', transform: 'scale(var(--canvas-scale))', transformOrigin: 'center' }}
              >
                 <style>{`
                   :root { --canvas-scale: 0.7; }
                   @media (max-width: 1400px) { :root { --canvas-scale: 0.6; } }
                   @media (max-width: 1280px) { :root { --canvas-scale: 0.55; } }
                   @media (max-width: 1024px) { :root { --canvas-scale: 0.45; } }
                   @media (max-width: 768px) { :root { --canvas-scale: 0.35; } }
                   @media (max-width: 500px) { :root { --canvas-scale: 0.25; } }
                   
                   @keyframes forensic-scan {
                     0% { transform: translateY(-100%); }
                     100% { transform: translateY(1000%); }
                   }
                 `}</style>

                 {/* Background Overlays */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                 <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none" />
                 
                 {/* Ghost Shield Watermark */}
                 <div className="absolute top-1/2 right-[8%] -translate-y-1/2 opacity-[0.02] pointer-events-none">
                    <div className="relative">
                       <Shield className="w-[25rem] h-[25rem] text-white" strokeWidth={0.5} />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[14rem] font-black italic select-none">!</span>
                       </div>
                    </div>
                 </div>

                 {/* Live Scanline Effect */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)] pointer-events-none" style={{ animation: 'forensic-scan 8s linear infinite' }} />

                 {/* Header Row */}
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="text-red-500 font-black text-[12px] uppercase tracking-[1em] animate-pulse">RISK DETECTED</div>
                      <h2 className="text-[5rem] font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                        {title.includes('\n') ? title : title.split(' ').join(' \n')}
                      </h2>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-black shadow-2xl">
                              <div className="w-8 h-8 rotate-45 border-4 border-current" />
                           </div>
                           <div className="relative">
                              {VIGIL_WORDMARK}
                           </div>
                        </div>
                        <div className="w-12 h-12 bg-zinc-900 border border-red-900/40 rounded-xl flex items-center justify-center text-red-500 shadow-2xl">
                           <ShieldAlert className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="h-[1px] w-40 bg-zinc-900 mt-2" />
                    </div>
                 </div>

                 <div className="relative z-10 h-[1px] w-full bg-zinc-900/50 my-3" />

                 {/* Comparison Pods */}
                 <div className="relative z-10 grid grid-cols-2 gap-12 py-3">
                    <div className="space-y-4">
                       <div className="text-[12px] font-black text-zinc-600 uppercase tracking-[0.5em] ml-2">{leftLabel}</div>
                       <div className="p-10 bg-[#0a0a0a] border border-zinc-800 rounded-[2.5rem] shadow-inner relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
                             <ShieldCheck className="w-16 h-16 text-emerald-500" />
                          </div>
                          <p className="font-mono text-2xl text-zinc-400 tracking-tighter leading-none">
                             {leftValue}
                          </p>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="text-[12px] font-black text-red-700 uppercase tracking-[0.5em] ml-2">{rightLabel}</div>
                       <div className="p-10 bg-[#0f0a0a] border border-red-900/20 rounded-[2.5rem] shadow-[0_0_80px_rgba(239,68,68,0.05)] relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5">
                             <ShieldAlert className="w-16 h-16 text-red-500" />
                          </div>
                          <p className="font-mono text-2xl text-red-500/80 font-black tracking-tighter leading-none">
                             {rightValue}
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="relative z-10 h-[1px] w-full bg-zinc-900/50 my-3" />

                 {/* Footer Metadata */}
                 <div className="relative z-10 flex items-end justify-between pt-4">
                    <div className="flex items-start gap-8 max-w-4xl">
                       <Fingerprint className="w-12 h-12 text-zinc-800" strokeWidth={1} />
                       <p className="text-[16px] text-zinc-500 font-black tracking-tight leading-snug max-w-2xl italic whitespace-pre-line">
                         {summary}
                       </p>
                    </div>
                    <div className="text-right space-y-1">
                       <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">VIGIL_FORENSICS_UNIT</div>
                       <div className="text-[10px] font-black text-red-900 uppercase tracking-[0.6em]">SYSTEM_VERSION_0.0.1.1</div>
                       <div className="text-[9px] font-mono text-zinc-900">TIMESTAMP: {new Date().toISOString().split('T')[0]}</div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-8 flex items-center gap-4 opacity-40">
             <Share2 className="w-4 h-4 text-zinc-600" />
             <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Asset Ready for Distribution</span>
           </div>
        </div>
      </div>
    </div>
  );
};
