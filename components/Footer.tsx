
import React from 'react';
import { 
  X, 
  Mail, 
  FileText, 
  Gavel, 
  Lock, 
  AlertTriangle,
  ShieldCheck,
  Tag,
  Share2,
  Binary,
  Cpu,
  Send,
  Shield,
  ExternalLink,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

interface FooterProps {
  onOpenDoc: (doc: RegistryDoc) => void;
  onVersionClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDoc, onVersionClick }) => (
  <footer id="footer" className="relative z-50 bg-[#0a0a0a] pt-32 pb-16 px-6 md:px-20 border-t border-zinc-900/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-zinc-900/40 mb-24">
        
        {/* Column 1: Identity & Definition */}
        <div className="lg:pr-12 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Vigil</span>
          </div>
          
          <p className="text-zinc-500 text-[13px] md:text-[14px] leading-relaxed font-medium">
            VIGIL is a browser-level Layer 0.5 security system that restores human-layer awareness before cryptographic execution.
            <br/><br/>
            Protecting Solana users from address poisoning and visual impersonation attacks.
          </p>
        </div>

        {/* Column 2: Verified Channels */}
        <div className="lg:px-12 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] flex items-center gap-2">
              <span className="text-zinc-800">//</span> VERIFIED CHANNELS
            </h4>
            <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
              Official communication points for VIGIL. We do not initiate DMs or token sales.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 group cursor-default">
              <X className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Twitter (Verified)</span>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <Send className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-500 transition-all" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Telegram (Updates)</span>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <Mail className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 transition-all" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">security@vigil.layer</span>
            </div>
          </div>

          <div className="p-4 bg-red-950/10 border border-red-900/20 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-red-700" />
              <span className="text-[9px] font-black text-red-900 uppercase tracking-widest">Security Notice</span>
            </div>
            <p className="text-[10px] text-red-900/80 font-black uppercase tracking-[0.1em] leading-relaxed italic">
              VIGIL has no official token. Any contract claiming otherwise is malicious.
            </p>
          </div>
        </div>

        {/* Column 3: Product & Resources */}
        <div className="lg:px-12 space-y-12">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] flex items-center gap-2">
              <span className="text-zinc-800">//</span> PRODUCT
            </h4>
            <ul className="space-y-5">
              <li><button onClick={() => onOpenDoc('pricing')} className="text-xs font-black text-zinc-400 hover:text-white transition-all text-left flex items-center gap-4 uppercase tracking-[0.2em] group/link">
                <Tag className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" /> Plans & Access
              </button></li>
              <li><button onClick={() => onOpenDoc('press_kit')} className="text-xs font-black text-zinc-400 hover:text-white transition-all text-left flex items-center gap-4 uppercase tracking-[0.2em] group/link">
                <Share2 className="w-4 h-4 text-zinc-600 group-hover:text-cyan-500 transition-colors" /> Media Kit
              </button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] flex items-center gap-2">
              <span className="text-zinc-800">//</span> RESOURCES
            </h4>
            <ul className="space-y-5">
              <li><button onClick={() => onOpenDoc('whitepaper')} className="flex items-center gap-4 text-xs font-black text-zinc-400 hover:text-white transition-all text-left uppercase tracking-[0.2em] group/link">
                <FileText className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 transition-colors" /> Whitepaper
              </button></li>
              <li><button onClick={() => onOpenDoc('technical_doc')} className="flex items-center gap-4 text-xs font-black text-zinc-400 hover:text-white transition-all text-left uppercase tracking-[0.2em] group/link">
                <BookOpen className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" /> Technical Doc
              </button></li>
            </ul>
          </div>
        </div>

        {/* Column 4: Operational Governance */}
        <div className="lg:pl-12 space-y-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] flex items-center gap-2">
              <span className="text-zinc-800">//</span> GOVERNANCE
            </h4>
            <ul className="space-y-5">
              <li>
                <button onClick={() => onOpenDoc('terms')} className="flex items-center gap-4 text-[11px] font-black text-zinc-400 hover:text-white transition-all text-left uppercase tracking-[0.2em] group/gov">
                  <Gavel className="w-4 h-4 text-zinc-600 transition-all group-hover/gov:text-zinc-100 group-hover/gov:scale-110" /> 
                  Operational Terms
                </button>
              </li>
              <li>
                <button onClick={() => onOpenDoc('privacy')} className="flex items-center gap-4 text-[11px] font-black text-zinc-400 hover:text-white transition-all text-left uppercase tracking-[0.2em] group/gov">
                  <Lock className="w-4 h-4 text-zinc-600 transition-all group-hover/gov:text-blue-500 group-hover/gov:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover/gov:scale-110" /> 
                  Privacy Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onOpenDoc('disclaimer')} className="flex items-center gap-4 text-[11px] font-black text-zinc-400 hover:text-white transition-all text-left uppercase tracking-[0.2em] group/gov">
                  <AlertTriangle className="w-4 h-4 text-red-500/60 drop-shadow-[0_0_8px_rgba(239,68,68,0.1)] transition-all group-hover/gov:text-red-500 group-hover/gov:drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] group-hover/gov:scale-110" /> 
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-[#0c0c0c] border border-zinc-900/50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-zinc-700" />
              <h5 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Technical Integrity Note</h5>
            </div>
            <p className="text-[11px] text-zinc-700 font-bold uppercase tracking-tight leading-relaxed">
              Non-custodial. Operates in local sandbox. Protection is probabilistic, not absolute.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-zinc-900/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            © 2026 Vigil Safety Systems. Built for the Solana community.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="text-[8px] font-black text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
              <ExternalLink className="w-2.5 h-2.5" /> Registry: 0x8821...FF
            </div>
            <div className="h-3 w-[1px] bg-zinc-900" />
            <button 
              onClick={onVersionClick}
              className="text-[8px] font-black text-zinc-800 uppercase tracking-widest italic hover:text-blue-500 transition-colors cursor-pointer"
            >
              v 0.0.1.1 Institutional Release
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-5 py-2.5 bg-[#121212] border border-zinc-800/50 rounded-full shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">All Systems Operational</span>
        </div>
      </div>
    </div>
  </footer>
);
