
import React, { useEffect, useState, useRef } from 'react';
import { X, Terminal, Loader2, Download, Copy, Check, ShieldCheck } from 'lucide-react';

import { PrivacyContent } from './docs/PrivacyContent';
import { DisclaimerContent } from './docs/DisclaimerContent';
import { TechnicalSpecContent } from './docs/TechnicalSpecContent';
import { TermsContent } from './docs/TermsContent';
import { PricingContent } from './docs/PricingContent';
import { WhitepaperContent } from './docs/WhitepaperContent';
import { TechnicalDocumentationContent } from './docs/TechnicalDocumentationContent';
import { ThreatModelContent } from './docs/ThreatModelContent';
import { ResearchBriefingContent } from './docs/ResearchBriefingContent';
import { TechLabel } from './docs/DocHelpers';
import { CommunityChallenge } from './CommunityChallenge';
import { SocialIntelligenceLab } from './SocialIntelligenceLab';

// LOGO ASSETS - MANUALLY ENGINEERED PATHS (1-3)
const LOGO_A_GAP = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10H42V65L31 76L20 65V10Z" fill="currentColor"/><path d="M58 10H80V65L69 76L58 65V10Z" fill="currentColor"/></svg>`;
const LOGO_B_MONOLITH = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10H48V80L10 10Z" fill="currentColor"/><path d="M52 10H90L52 80V10Z" fill="currentColor"/></svg>`;
const LOGO_C_PIVOT = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="15" width="70" height="70" stroke="currentColor" stroke-width="10"/><path d="M35 35L48 48M52 52L65 65" stroke="currentColor" stroke-width="10" stroke-linecap="square"/></svg>`;

// LOGO ASSETS (4-6)
const LOGO_D_SHARD = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 15L15 75H45V15Z" fill="currentColor"/><path d="M55 15V75H85L50 15Z" fill="currentColor"/></svg>`;
const LOGO_E_KINETIC = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15H35L65 85H45L15 15Z" fill="currentColor"/><path d="M85 15H65L35 85H55L85 15Z" fill="currentColor"/></svg>`;
const LOGO_F_SENTINEL = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10H90V90H10V10Z" fill="none" stroke="currentColor" stroke-width="12"/><path d="M30 30L50 65L70 30" stroke="currentColor" stroke-width="10" stroke-linecap="square"/></svg>`;

// LOGO ASSETS (7-9)
const LOGO_G_PRISM = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10L10 80H35L50 50L65 80H90L50 10Z" fill="currentColor"/></svg>`;
const LOGO_H_GATE = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="20" width="15" height="60" fill="currentColor"/><rect x="42.5" y="35" width="15" height="45" fill="currentColor"/><rect x="70" y="20" width="15" height="60" fill="currentColor"/></svg>`;
const LOGO_I_BASIN = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10V90H90V10H70V30H30V10H10Z" fill="currentColor"/></svg>`;

// LOGO ASSETS (10-12)
const LOGO_J_ORBITAL = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" stroke="currentColor" stroke-width="8"/><circle cx="50" cy="50" r="14" fill="currentColor"/></svg>`;
const LOGO_K_MESH = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" stroke="currentColor" stroke-width="8"/><path d="M50 10L50 90M15 30L85 70M85 30L15 70" stroke="currentColor" stroke-width="2" opacity="0.3"/></svg>`;
const LOGO_L_VECTOR = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 15L15 85H38L50 58L62 85H85L50 15Z" fill="currentColor"/></svg>`;

// WORDMARK LOGO ASSETS (13-15)
const LOGO_M_BLOCK = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20H90V80H10V20ZM25 35V65H35L42 50L35 35H25ZM50 35H60V65H50V35ZM75 35H85V65H75V35Z" fill="currentColor"/><rect x="42" y="35" width="4" height="30" fill="currentColor" opacity="0.5"/></svg>`;
const LOGO_N_SENTINEL_V = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10H45V75L30 90L10 70V10Z" fill="currentColor"/><path d="M55 10H90V70L70 90L55 75V10Z" fill="currentColor"/><rect x="25" y="30" width="50" height="2" fill="white" opacity="0.2"/><path d="M40 45V55H44V45H40ZM48 45V55H52V45H48ZM56 45V55H60V45H56Z" fill="white"/></svg>`;
const LOGO_O_INTERCEPT = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 40H20V60H10V40ZM25 40H35V60H25V40ZM40 40H50V60H40V40ZM55 40H65V60H55V40ZM70 40H80V60H70V40ZM85 40H95V60H85V40Z" fill="currentColor"/><rect x="0" y="48" width="100" height="4" fill="black"/><path d="M0 49H100" stroke="white" stroke-width="0.5" stroke-dasharray="2 2"/></svg>`;

// FLAGSHIP WORDMARKS (16-17)
const LOGO_P_FLAGSHIP_BRUTALIST = `<svg viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20 L40 85 L70 20 H55 L40 55 L25 20 H10Z" fill="currentColor"/>
  <rect x="80" y="20" width="12" height="65" fill="currentColor"/>
  <path d="M100 20 V85 H145 V65 H115 V40 H145 V20 H100ZM135 65 V85 H145 V65 H135Z" fill="currentColor"/>
  <rect x="155" y="20" width="12" height="65" fill="currentColor"/>
  <path d="M175 20 V85 H220 V70 H190 V20 H175Z" fill="currentColor"/>
</svg>`;

const LOGO_Q_FLAGSHIP_VOID = `<svg viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="currentColor">
    <path d="M15 25 L40 80 L65 25 H50 L40 50 L30 25 H15Z"/>
    <rect x="75" y="25" width="10" height="55"/>
    <path d="M95 25 V80 H140 V60 H110 V45 H140 V25 H95Z"/>
    <rect x="150" y="25" width="10" height="55"/>
    <path d="M170 25 V80 H215 V65 H185 V25 H170Z"/>
  </g>
  <rect x="0" y="50" width="250" height="3" fill="black"/>
</svg>`;

const LOGO_R_REFRACTION = `<svg viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="topSplit"><rect x="0" y="0" width="250" height="50" /></clipPath>
    <clipPath id="bottomSplit"><rect x="0" y="50" width="250" height="50" /></clipPath>
  </defs>
  <g fill="currentColor">
    <g clip-path="url(#topSplit)">
      <path d="M20 25 L45 75 L70 25 H55 L45 50 L35 25 H20Z"/>
      <rect x="85" y="25" width="10" height="50"/>
      <path d="M105 25 V75 H140 V60 H115 V45 H140 V25 H105Z"/>
      <rect x="155" y="25" width="10" height="50"/>
      <path d="M175 25 V75 H210 V65 H185 V25 H175Z"/>
    </g>
    <g clip-path="url(#bottomSplit)" transform="translate(6, 0)">
      <path d="M20 25 L45 75 L70 25 H55 L45 50 L35 25 H20Z"/>
      <rect x="85" y="25" width="10" height="50"/>
      <path d="M105 25 V75 H140 V60 H115 V45 H140 V25 H105Z"/>
      <rect x="155" y="25" width="10" height="50"/>
      <path d="M175 25 V75 H210 V65 H185 V25 H175Z"/>
    </g>
  </g>
</svg>`;

// FINAL FLAGSHIP WORDMARK (19) - THE STRUCTURAL MONOLITH (TYPE S) - HUMAN REFINED
const LOGO_S_MONOLITH = `<svg viewBox="0 0 250 100" xmlns="http://www.w3.org/2000/svg">
  <g fill="currentColor">
    <!-- V -->
    <path d="M15 25 L40 85 L65 25 H50 L40 60 L30 25 H15Z"/>
    <!-- I -->
    <path d="M75 35 V85 H87 V35 H75Z"/>
    <path d="M75 25 H87 V31 H75V25Z"/>
    <!-- G -->
    <path d="M97 25 V85 H135 V73 H109 V37 H135 V25 H97Z"/>
    <rect x="118" y="52" width="17" height="8"/>
    <!-- I -->
    <path d="M145 35 V85 H157 V35 H145Z"/>
    <path d="M145 25 H157 V31 H145V25Z"/>
    <!-- L -->
    <path d="M167 25 V85 H210 V73 H179 V25 H167Z"/>
  </g>
</svg>`;

const BrandAssetsContent = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (svg: string, index: number) => {
    navigator.clipboard.writeText(svg);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (svg: string, filename: string) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const logos = [
    { id: 'TYPE_S', name: 'Master Structural Wordmark', svg: LOGO_S_MONOLITH, desc: 'The definitive institutional identity. Human-refined geometric paths engineered for structural finality and resolution independence.', isWide: true },
    { id: 'TYPE_R', name: 'Master Refraction Wordmark', svg: LOGO_R_REFRACTION, desc: 'Visual experiment asset. The brand name VIGIL staggered through an optical refraction vector.', isWide: true },
    { id: 'TYPE_P', name: 'Master Brutalist Wordmark', svg: LOGO_P_FLAGSHIP_BRUTALIST, desc: 'Flagship project mark. The name VIGIL engineered as a monolithic geometric structure.', isWide: true },
    { id: 'TYPE_Q', name: 'Master Void Wordmark', svg: LOGO_Q_FLAGSHIP_VOID, desc: 'Flagship interception mark. The brand name sliced by the Layer 0.5 validation vector.', isWide: true },
    { id: 'TYPE_A', name: 'The Interception Gap', svg: LOGO_A_GAP, desc: 'Layer 0.5 bridge mark. Perfectly balanced technical precision.' },
    { id: 'TYPE_B', name: 'The Monolith V', svg: LOGO_B_MONOLITH, desc: 'Singular heavy structure with a central vertical refraction gap.' },
    { id: 'TYPE_C', name: 'The Optical Pivot', svg: LOGO_C_PIVOT, desc: 'Square framework with a refracted interior slash.' },
    { id: 'TYPE_D', name: 'The Shard Barrier', svg: LOGO_D_SHARD, desc: 'High-tension geometry representing data separation.' },
    { id: 'TYPE_E', name: 'The Kinetic Overlap', svg: LOGO_E_KINETIC, desc: 'Dynamic interlocking bars. Flow of secure verification.' },
    { id: 'TYPE_F', name: 'The Sentinel Frame', svg: LOGO_F_SENTINEL, desc: 'Institutional containment mark with internal V-check.' },
    { id: 'TYPE_G', name: 'The Refractive Prism', svg: LOGO_G_PRISM, desc: 'Symmetrical split-path logic. Inspired by Layer 0 structure.' },
    { id: 'TYPE_H', name: 'The Parallel Gate', svg: LOGO_H_GATE, desc: 'Offset checkpoint architecture for high-speed protocols.' },
    { id: 'TYPE_I', name: 'The V-Basin', svg: LOGO_I_BASIN, desc: 'Heavy containment primitive. Designed to catch failures.' },
    { id: 'TYPE_J', name: 'The Orbital Core', svg: LOGO_J_ORBITAL, desc: 'Symmetry of protection. Central core within a safe perimeter.' },
    { id: 'TYPE_K', name: 'The Institutional Link', svg: LOGO_K_MESH, desc: 'Hexagonal lattice representing verified threat intelligence.' },
    { id: 'TYPE_L', name: 'The Apex Vector', svg: LOGO_L_VECTOR, desc: 'High-velocity convergence point. Mark of absolute finality.' },
    { id: 'TYPE_M', name: 'Brutalist Monolith', svg: LOGO_M_BLOCK, desc: 'Structural wordmark. Letters carved from a solid geometric mass.' },
    { id: 'TYPE_N', name: 'Sentinel Flagship', svg: LOGO_N_SENTINEL_V, desc: 'The V-frame sentinel. High-tension institutional flagship mark.' },
    { id: 'TYPE_O', name: 'Interception Word', svg: LOGO_O_INTERCEPT, desc: 'The 0.5 Bridge wordmark. Sliced by the vector of interception.' }
  ];

  return (
    <div className="space-y-20 pb-40 max-w-6xl mx-auto px-4 md:px-0 selection:bg-blue-500/20">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <TechLabel text="OWNER_PROTOCOL" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
          Brand Assets.
        </h2>
        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
          Nineteen institutional assets for VIGIL LAYER. Our flagship wordmarks define the standard for <b>Human-Layer Security</b> across the Solana ecosystem.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {logos.map((logo, i) => (
          <div key={logo.id} className={`group space-y-8 p-1 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30 shadow-2xl ${logo.isWide ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            <div className={`${logo.isWide ? 'aspect-[21/9]' : 'aspect-square'} bg-[#050505] rounded-[2.3rem] flex items-center justify-center p-12 md:p-20 text-white group-hover:text-blue-500 transition-colors duration-700`}>
               <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: logo.svg }} />
            </div>
            
            <div className="px-8 pb-10 space-y-6">
              <div className="space-y-2">
                <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">{logo.id}</div>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{logo.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium min-h-[40px]">{logo.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button 
                  onClick={() => handleCopy(logo.svg, i)}
                  className="flex items-center justify-center gap-2 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-all"
                >
                  {copiedIndex === i ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIndex === i ? 'COPIED' : 'COPY SVG'}
                </button>
                <button 
                  onClick={() => handleDownload(logo.svg, `vigil-logo-${logo.id.toLowerCase()}`)}
                  className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" /> DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-12 bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] space-y-6 text-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-xs relative z-10">Institutional Design Note</h4>
         <p className="text-lg md:text-xl text-white font-medium italic max-w-2xl mx-auto relative z-10 leading-relaxed">
           "Our flagship wordmarks (Types P, Q, R, and S) are hand-engineered to remain sharp across all resolutions. They are the definitive marks of institutional safety."
         </p>
         <div className="flex items-center justify-center gap-4 pt-4 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-500 uppercase">SVG_XML_SOURCE</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-500 uppercase">MASTER_IDENTITY</div>
         </div>
      </div>
    </div>
  );
};

const PressKitContent = ({ isUnlocked }: { isUnlocked?: boolean }) => {
  if (!isUnlocked) {
    return (
      <div className="p-20 text-center flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800 animate-pulse">
          <ShieldCheck className="w-10 h-10 text-zinc-700" />
        </div>
        <h2 className="text-zinc-500 font-black italic uppercase text-2xl tracking-widest">Unauthorized Access</h2>
        <p className="text-zinc-700 text-sm font-bold uppercase tracking-widest">Registry Assets Provisioning Restricted</p>
      </div>
    );
  }
  return <BrandAssetsContent />;
};

export type RegistryDoc = 'privacy' | 'terms' | 'docs' | 'audit' | 'disclaimer' | 'pricing' | 'research_01' | 'technical_spec' | 'technical_doc' | 'press_kit' | 'whitepaper' | 'threat_model' | 'challenge' | 'comms_terminal' | null;

interface OperationalRegistryProps {
  activeDoc: RegistryDoc;
  onClose: () => void;
  isUnlocked?: boolean;
}

const DocContent = ({ type, isUnlocked }: { type: RegistryDoc, isUnlocked?: boolean }) => {
  switch (type) {
    case 'privacy': return <PrivacyContent />;
    case 'terms': return <TermsContent />;
    case 'disclaimer': return <DisclaimerContent />;
    case 'whitepaper': return <WhitepaperContent />;
    case 'technical_spec': return <TechnicalSpecContent />;
    case 'technical_doc': return <TechnicalDocumentationContent />;
    case 'pricing': return <PricingContent />;
    case 'threat_model': return <ThreatModelContent />;
    case 'press_kit': return <PressKitContent isUnlocked={isUnlocked} />;
    case 'research_01': return <ResearchBriefingContent />;
    case 'challenge': return <div className="py-12"><CommunityChallenge /></div>;
    case 'comms_terminal': return <div className="py-12"><SocialIntelligenceLab /></div>;
    default: return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
           <Loader2 className="w-8 h-8 text-zinc-700 animate-spin" />
        </div>
        <p className="text-xs font-black text-zinc-600 uppercase tracking-widest italic">Provisioning Registry Segment...</p>
      </div>
    );
  }
};

export const OperationalRegistry: React.FC<OperationalRegistryProps> = ({ activeDoc, onClose, isUnlocked }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDoc) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [activeDoc]);

  if (!activeDoc && !isVisible) return null;

  const isChallenge = activeDoc === 'challenge';
  const isComms = activeDoc === 'comms_terminal';

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center px-2 md:px-20 py-4 md:py-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl" onClick={onClose} />
      
      {/* Ambient background for Challenge */}
      {isChallenge && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(245,158,11,0.05),transparent_40%)]" />
        </div>
      )}

      <div ref={containerRef} className={`relative w-full max-w-[1400px] h-full bg-[#050505] border border-zinc-900/50 rounded-[1.5rem] md:rounded-[28px] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 flex flex-col ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-20 scale-95'}`}>
        
        <div className="h-16 md:h-20 border-b border-zinc-900/50 px-6 md:px-14 flex items-center justify-between glass z-[1001] shrink-0">
          <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rotate-45" />
              </div>
              <span className="text-base md:text-lg font-black tracking-tighter uppercase italic text-white">Vigil</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-900 shrink-0" />
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
              <Terminal className="w-3 md:w-3.5 h-3 md:h-3.5 hidden sm:block" /> 
              <span className="hidden sm:inline">Registry</span>
              <span className="text-zinc-800">/</span> 
              <span className={`italic uppercase truncate ${isChallenge ? 'text-amber-500' : isComms ? 'text-red-500' : 'text-blue-500'}`}>{activeDoc?.replace('_', ' ')}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shrink-0">
            <X className="w-4 md:w-5 h-4 md:h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-[1000] px-2 md:px-20 pt-8 md:pt-24 no-scrollbar">
           <DocContent type={activeDoc} isUnlocked={isUnlocked} />
        </div>

        <div className="h-8 md:h-10 border-t border-zinc-900/50 px-6 md:px-14 flex items-center justify-between bg-black/50 z-[1001] shrink-0">
           <div className="flex items-center gap-2 md:gap-4 text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest italic">
              <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${isChallenge ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`} /> Encrypted Connection
           </div>
           <div className="text-[7px] md:text-[8px] font-black text-zinc-800 uppercase tracking-widest italic whitespace-nowrap">VIG-Registry-03</div>
        </div>
      </div>
    </div>
  );
};
