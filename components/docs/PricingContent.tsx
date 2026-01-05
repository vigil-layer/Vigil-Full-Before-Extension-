import React from 'react';
import { Check, X, Chrome, ShieldCheck, Zap, Lock, Info, Terminal, ShieldAlert, MoveHorizontal } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote } from './DocHelpers';

export const PricingContent = () => (
  <div className="space-y-0 pb-20 md:pb-40 max-w-6xl mx-auto selection:bg-emerald-500/20 relative">
    <DocumentWatermark text="VIGIL COMMERCIAL REGISTRY" />
    
    <SectionHeader 
      id="DOC: VIG-PRC-2026.01"
      category="Strategic Commercial Unit"
      title="Plans & Licensing."
      subtitle="Security is not an expense. It is insurance."
      colorClass="text-emerald-500"
      bgGlow="bg-emerald-600/10"
    />

    <div className="mt-12 md:mt-0 space-y-12 md:space-y-16 px-2 md:px-12 relative z-10">
      
      <div className="text-center space-y-6 md:space-y-8 max-w-3xl mx-auto px-4 md:px-0">
        <h3 className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
          Protection costs less than <br/> a single mistake.
        </h3>
        <div className="space-y-3 md:space-y-4 text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
          <p>
            Most Web3 losses don’t happen because of broken protocols — they happen because of <span className="text-white">human-level deception.</span>
          </p>
          <p className="text-[10px] md:text-sm text-zinc-500 font-bold uppercase tracking-widest leading-relaxed italic">
            VIGIL protects users at the exact moment where most scams succeed: <br className="hidden md:block"/> before a transaction is signed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 px-2 md:px-0">
        
        <div className="group relative">
          <div className="absolute -inset-[1px] bg-gradient-to-b from-zinc-700 to-transparent rounded-[1.5rem] md:rounded-[28px] opacity-50 transition-opacity group-hover:opacity-100" />
          <div className="relative bg-[#080808]/90 backdrop-blur-3xl rounded-[1.5rem] md:rounded-[28px] p-6 md:p-14 h-full flex flex-col space-y-8 md:space-y-10 border border-white/[0.03] transition-all duration-300 md:group-hover:-translate-y-1 md:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="space-y-4">
              <TechLabel text="TIER: 01" color="zinc" />
              <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tight">Freemium</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-white">Free</span>
                <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">· Forever</span>
              </div>
              <p className="text-zinc-500 text-xs md:text-sm font-medium italic">
                For users who want essential protection and want to experience how Vigil works.
              </p>
            </div>

            <ul className="space-y-3 md:space-y-4 flex-1">
              {[
                "Known address-poisoning detection",
                "Visual warnings for suspicious wallet addresses",
                "Basic copy-pate interception",
                "Manual verification prompts",
                "Lightweight, privacy-first operation"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-tight">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500 shrink-0" /> {feat}
                </li>
              ))}
              <li className="pt-4 border-t border-zinc-900/50 space-y-3">
                 <p className="text-[9px] md:text-[10px] text-zinc-600 font-black uppercase tracking-widest italic">Limitations:</p>
                 <p className="text-[9px] md:text-[10px] text-zinc-700 font-bold uppercase tracking-widest leading-relaxed">
                   Limited threat intelligence depth · No persistent protection
                 </p>
              </li>
            </ul>

            <div className="space-y-4 pt-4 md:pt-6">
              <button className="w-full py-4 md:py-5 bg-white text-black text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-xl md:rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl group/btn">
                ACTIVATE FREE PROTECTION
              </button>
              <p className="text-center text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-tight">
                No wallet required · No payments · Instant setup
              </p>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-[1px] bg-gradient-to-b from-blue-500/50 to-cyan-500/50 rounded-[1.5rem] md:rounded-[28px] opacity-30 transition-opacity group-hover:opacity-100" />
          <div className="relative bg-[#020b18]/90 backdrop-blur-3xl rounded-[1.5rem] md:rounded-[28px] p-6 md:p-14 h-full flex flex-col space-y-8 md:space-y-10 border border-blue-500/20 transition-all duration-500 md:group-hover:-translate-y-1 md:group-hover:scale-[1.01] md:group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <TechLabel text="TIER: 02" color="blue" />
                <span className="px-2 md:px-3 py-1 bg-blue-500 text-white text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] rounded animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">RECOMMENDED</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tight">Pro Access</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-white">0.5 SOL</span>
                <span className="text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-widest">/ browser / yr</span>
              </div>
              <p className="text-blue-200/50 text-xs md:text-sm font-medium italic">
                Always-on, intelligent protection for serious users.
              </p>
            </div>

            <ul className="space-y-3 md:space-y-4 flex-1 relative z-10">
              {[
                "Everything in Freemium",
                "Persistent protection across sessions",
                "Advanced address-poisoning detection",
                "Real-time copy & paste monitoring",
                "Behavioral heuristics for emerging scams",
                "Enhanced visual verification layer",
                "Priority threat intelligence updates"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-[10px] md:text-xs font-bold text-zinc-100 uppercase tracking-widest leading-tight">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500 shrink-0" /> {feat}
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-4 md:pt-6 relative z-10">
              <button className="w-full py-4 md:py-5 bg-blue-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-xl md:rounded-2xl hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 shadow-2xl">
                UPGRADE TO PRO SECURITY
              </button>
              <div className="space-y-2">
                <p className="text-center text-[8px] md:text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">
                  0.5 SOL / year · Per browser · Cancel anytime
                </p>
                <p className="text-center text-[7px] md:text-[9px] font-black text-blue-500/60 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" /> Prevention over recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 border-y border-zinc-900 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left px-4">
         <p className="text-lg md:text-2xl text-zinc-500 font-bold uppercase tracking-tight italic max-w-lg">
           "The real cost is <span className="text-white">recovering from a mistake.</span>"
         </p>
         <div className="h-12 md:h-16 w-[1px] bg-zinc-900 hidden md:block" />
         <div className="space-y-1">
            <p className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Price Framing</p>
            <p className="text-[10px] md:text-sm text-zinc-400 font-bold uppercase tracking-widest">Less than the cost of a failed txn.</p>
         </div>
      </div>

      <div className="space-y-8 md:space-y-10 px-2 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 md:px-0">
           <div className="flex items-center gap-4">
              <Terminal className="w-5 h-5 text-zinc-600" />
              <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight">Compare Plans</h3>
           </div>
           <div className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg self-start">
              <MoveHorizontal className="w-3 h-3 text-blue-500 animate-pulse" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Swipe horizontally to compare</span>
           </div>
        </div>
        
        <div className="bg-[#080808] border border-zinc-900 rounded-[1.5rem] md:rounded-[28px] overflow-x-auto custom-scrollbar shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-zinc-950/50 border-b border-zinc-900">
                <th className="p-5 md:p-8 text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Feature</th>
                <th className="p-5 md:p-8 text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Freemium</th>
                <th className="p-5 md:p-8 text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest text-center">Pro</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400 text-[9px] md:text-[11px] font-bold uppercase tracking-widest">
              {[
                { f: "Address poisoning detection", free: "Basic", pro: "Advanced" },
                { f: "Visual address verification", free: "Standard", pro: "Enhanced" },
                { f: "Copy & paste monitoring", free: "Limited", pro: "Real-time" },
                { f: "Persistent protection", free: false, pro: true },
                { f: "Behavioral scam heuristics", free: false, pro: true },
                { f: "Threat pattern updates", free: "Standard", pro: "Priority" },
                { f: "Privacy-first logic", free: true, pro: true },
                { f: "Cost", free: "Free", pro: "0.5 SOL/yr" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-900/50 hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 md:p-8 border-r border-zinc-900/50">{row.f}</td>
                  <td className="p-5 md:p-8 text-center border-r border-zinc-900/50">
                    {typeof row.free === 'boolean' ? (row.free ? <Check className="w-3.5 h-3.5 text-zinc-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-zinc-800 mx-auto" />) : row.free}
                  </td>
                  <td className="p-5 md:p-8 text-center font-black text-white">
                    {typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-3.5 h-3.5 text-blue-500 mx-auto" /> : <X className="w-3.5 h-3.5 text-red-500 mx-auto" />) : row.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 md:p-8 bg-zinc-950/30">
             <p className="text-[8px] md:text-[9px] text-zinc-600 font-bold uppercase tracking-widest italic text-center">
               Vigil never accesses private keys or executes actions on your behalf.
             </p>
          </div>
        </div>
      </div>

      <div className="px-2 md:px-0">
        <DocCard border="zinc">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 md:w-5 h-4 md:h-5 text-zinc-600" />
                <h4 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest">Registry Compliance</h4>
              </div>
              <p className="text-[8px] md:text-[10px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">
                Vigil is a browser-based security assistant. It does not access private keys, sign transactions, or execute blockchain actions. All alerts are informational.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[9px] md:text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Safety Standard VG-2026</h4>
              <p className="text-[8px] md:text-[10px] text-zinc-600 leading-relaxed font-bold uppercase tracking-widest italic">
                Vigil does not guarantee prevention of all scams. Web3 risks evolve continuously.
              </p>
            </div>
          </div>
        </DocCard>
      </div>

      <div className="pt-16 md:pt-24 text-center space-y-6 md:space-y-8">
         <div className="h-[1px] md:h-[2px] w-20 md:w-24 bg-emerald-900/30 mx-auto" />
         <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-[0.2em] md:tracking-[0.3em]">Built for the moment that matters.</h3>
         <p className="text-[8px] md:text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] md:tracking-[0.5em]">Commercial Registry: VIG-PRC-FINAL-2026</p>
      </div>
    </div>
  </div>
);