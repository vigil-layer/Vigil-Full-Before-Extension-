
import React, { useState, useEffect, useRef } from 'react';
import { Header, SecurityAnnouncementBar, SecurityModal } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { ScamStats } from './components/ScamStats';
import { About } from './components/About';
import { SafetyVideo } from './components/SafetyVideo';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { OperationalRegistry, RegistryDoc } from './components/OperationalRegistry';
import { ThreatResearch } from './components/ThreatResearch';
import { Pricing } from './components/Pricing';
import { FinalNotice } from './components/FinalNotice';
import { IntentValidatorDemo } from './components/IntentValidatorDemo';
import { AdversarialMimicryLab } from './components/AdversarialMimicryLab';
import { IntelligenceForge } from './components/IntelligenceForge';
import { NeuralFirewall } from './components/NeuralFirewall';
import { EntropyCollider } from './components/EntropyCollider';
import { NeuralAttentionalAudit } from './components/NeuralAttentionalAudit';
import { ScrollProgress } from './components/ScrollProgress';
import { ContextualReputationSearch } from './components/ContextualReputationSearch';
import { PathBriefing } from './components/PathBriefing';
import { SystemBoot } from './components/SystemBoot';

/**
 * RELEASE CONTROL SYSTEM
 * Set CURRENT_PHASE to 1, 2, 3, 4, or 5 to unlock sections progressively.
 */
export const CURRENT_PHASE = 5; 

const HubHeader = ({ title, subtitle, number }: { title: string; subtitle: string; number: string }) => (
  <div className="px-6 md:px-20 pt-12 pb-8 bg-transparent border-t border-zinc-900/50 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-6 mb-4">
        <div className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-sm shadow-xl">SECURITY HUB {number}</div>
        <div className="h-[1px] flex-1 bg-zinc-900" />
      </div>
      <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">{title}</h2>
      <p className="text-zinc-600 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mt-6">{subtitle}</p>
    </div>
  </div>
);

const SecurityZoneBackground = ({ activeAnchor, powerSave }: { activeAnchor: string; powerSave: boolean }) => {
  const [color, setColor] = useState('rgba(59, 130, 246, 0)');

  useEffect(() => {
    if (powerSave) {
      setColor('rgba(0,0,0,0)');
      return;
    }
    if (['hub-execution', 'system-simulation', 'mimicry-lab'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(6, 182, 212, 0.04)');
    } 
    else if (['hub-forge', 'intel-forge', 'reputation-search'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(245, 158, 11, 0.04)');
    }
    else if (['hub-biological', 'neural-firewall', 'neural-audit'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(168, 85, 247, 0.04)');
    }
    else if (['hub-apex', 'entropy-collider'].some(id => activeAnchor.startsWith(id))) {
      setColor('rgba(251, 191, 36, 0.05)');
    }
    else {
      setColor('rgba(59, 130, 246, 0)');
    }
  }, [activeAnchor, powerSave]);

  if (powerSave) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-in-out overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out" 
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }} 
      />
      <div className="absolute inset-0 bg-[#020202] opacity-40 mix-blend-multiply" />
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [activeDoc, setActiveDoc] = useState<RegistryDoc>(null);
  const [activeAnchor, setActiveAnchor] = useState<string>('hero');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isPowerSave, setIsPowerSave] = useState(() => localStorage.getItem('vigil_pwr_save') === 'true');
  
  const [clickCount, setClickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetScrollTopRef = useRef<number>(0);
  const currentScrollTopRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number>(null);

  const togglePowerSave = () => {
    const next = !isPowerSave;
    setIsPowerSave(next);
    localStorage.setItem('vigil_pwr_save', next.toString());
  };

  useEffect(() => {
    const smoothScrollLoop = () => {
      if (!scrollContainerRef.current) return;
      const diff = targetScrollTopRef.current - currentScrollTopRef.current;
      
      if (Math.abs(diff) < 1) {
        currentScrollTopRef.current = targetScrollTopRef.current;
        isProgrammaticScrollRef.current = false;
      } else {
        currentScrollTopRef.current += diff * 0.1;
      }
      
      scrollContainerRef.current.scrollTop = currentScrollTopRef.current;
      animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    };
    animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      
      // Only sync current/target to actual scroll if the user is scrolling manually.
      // If programmatic, we let the loop drive the values.
      if (!isProgrammaticScrollRef.current) {
        currentScrollTopRef.current = scrollTop;
        targetScrollTopRef.current = scrollTop;
      }
      
      const totalScrollable = scrollHeight - clientHeight;
      setScrollPercentage((scrollTop / totalScrollable) * 100);
    }
  };

  // If user interacts via wheel or touch, cancel programmatic scroll to allow manual takeover
  const handleUserInterruption = () => {
    isProgrammaticScrollRef.current = false;
  };

  const scrollToPercentage = (percent: number) => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const handleUnlockClick = () => {
    const now = Date.now();
    if (clickCount === 0 || now - startTime > 5000) {
      setClickCount(1);
      setStartTime(now);
    } else {
      const nextCount = clickCount + 1;
      if (nextCount >= 5) {
        setIsUnlocked(true);
        setActiveDoc('press_kit');
        setClickCount(0);
        setStartTime(0);
      } else {
        setClickCount(nextCount);
      }
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'community-challenge') {
      setActiveDoc('challenge');
      setIsMenuOpen(false);
      return;
    }
    if (id === 'comms-terminal') {
      setActiveDoc('comms_terminal');
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate absolute scroll position within the scrollable context
      const absoluteTarget = container.scrollTop + (rect.top - containerRect.top);
      
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = absoluteTarget - 40;
      
      setActiveAnchor(id);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveAnchor(id === 'ecosystem-impact' ? 'the-threat' : id);
          }
        });
      },
      { root: null, rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    const sections = ['hero', 'hub-execution', 'system-simulation', 'mimicry-lab', 'hub-forge', 'intel-forge', 'reputation-search', 'hub-biological', 'neural-firewall', 'neural-audit', 'hub-apex', 'entropy-collider', 'features', 'research-intro', 'about-us', 'flow', 'the-threat', 'ecosystem-impact', 'deep-dive', 'cta', 'roadmap', 'faq', 'footer'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${isPowerSave ? 'pwr-save' : ''}`}>
      
      <SecurityZoneBackground activeAnchor={activeAnchor} powerSave={isPowerSave} />
      <SecurityAnnouncementBar />
      
      <SecurityModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setIsBooting(true);
      }} />

      {isBooting && (
        <SystemBoot onComplete={() => {
          setIsBooting(false);
          setHasAcknowledged(true);
        }} />
      )}

      <OperationalRegistry activeDoc={activeDoc} onClose={() => setActiveDoc(null)} isUnlocked={isUnlocked} />

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative transition-opacity duration-[1500ms] ${hasAcknowledged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header activeAnchor={activeAnchor} scrollToSection={scrollToSection} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onVersionClick={handleUnlockClick} isUnlocked={isUnlocked} powerSave={isPowerSave} onTogglePowerSave={togglePowerSave} releasePhase={CURRENT_PHASE} />
        <ScrollProgress progress={scrollPercentage} onScrollTo={scrollToPercentage} />

        <main 
          ref={scrollContainerRef} 
          onScroll={handleScroll} 
          onWheel={handleUserInterruption}
          onTouchStart={handleUserInterruption}
          className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none"
        >
          <div className="md:hidden h-14 border-b border-zinc-900/50 px-6 flex items-center justify-between glass sticky top-0 z-[60]">
            <div className="flex items-center space-x-3">
               <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
               </button>
               <span className="text-sm font-black tracking-tighter uppercase italic text-white">Vigil</span>
            </div>
            <button onClick={handleUnlockClick} className={`px-2 py-0.5 rounded border transition-all active:scale-90 ${isUnlocked ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' : 'border-blue-500/20 bg-blue-500/10 text-blue-500'} text-[8px] font-bold uppercase tracking-widest`}>v 0.0.1.1</button>
          </div>

          <Hero 
            scrollToSection={() => scrollToSection(CURRENT_PHASE >= 2 ? 'hub-execution' : 'the-threat')} 
            onOpenDoc={(doc) => setActiveDoc(doc)} 
            powerSave={isPowerSave} 
            isReady={hasAcknowledged}
          />

          {/* HUB 01 */}
          {CURRENT_PHASE >= 2 && (
            <div id="hub-execution" className="relative">
              <HubHeader number="01" title="Execution Sandbox." subtitle="Interception Proof-of-Work" />
              <PathBriefing pathNumber="01" title="Intent Validator" objective="Context-aware verification." threatVector="DOM address swaps." rationale="Validating belief vs execution." colorClass="text-blue-500" />
              <div id="system-simulation"><IntentValidatorDemo /></div>
              <PathBriefing pathNumber="02" title="Adversarial Mimicry" objective="Test visual thresholds." threatVector="Vanity collisions." rationale="Experience visual failure." colorClass="text-red-500" />
              <div id="mimicry-lab"><AdversarialMimicryLab /></div>
            </div>
          )}

          {/* HUB 02 */}
          {CURRENT_PHASE >= 3 && (
            <div id="hub-forge" className="relative">
              <HubHeader number="02" title="Synthesis Node." subtitle="Synchronized Intelligence Mapping" />
              <PathBriefing pathNumber="03" title="Intelligence Forge" objective="Global Sentinel mesh sync." threatVector="Threat isolation." rationale="Synthesized networks are stronger." colorClass="text-cyan-500" />
              <div id="intel-forge"><IntelligenceForge onOpenDoc={(doc) => setActiveDoc(doc)} powerSave={isPowerSave} /></div>
              <div id="reputation-search"><ContextualReputationSearch /></div>
            </div>
          )}

          <Problem onOpenDoc={(doc) => setActiveDoc(doc)} />
          <ScamStats />

          {/* HUB 03 */}
          {CURRENT_PHASE >= 4 && (
            <div id="hub-biological" className="relative">
              <HubHeader number="03" title="Biological Calibration." subtitle="Calibrating for high-entropy" />
              <PathBriefing pathNumber="04" title="Neural Firewall" objective="Train Saccadic movement." threatVector="Saccadic masking." rationale="Rebuild mental perimeters." colorClass="text-purple-500" />
              <div id="neural-firewall"><NeuralFirewall /></div>
              <PathBriefing pathNumber="05" title="Saccadic Audit" objective="Map blind spots." threatVector="Cognitive fatigue." rationale="Audit the human auditor." colorClass="text-cyan-400" />
              <div id="neural-audit"><NeuralAttentionalAudit /></div>
            </div>
          )}

          <SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} />

          {/* HUB 04 */}
          {CURRENT_PHASE >= 5 && (
            <div id="hub-apex" className="relative">
              <HubHeader number="04" title="The Apex Terminal." subtitle="High-velocity simulation" />
              <PathBriefing pathNumber="99" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Resilience under pressure." colorClass="text-amber-500" />
              <div id="entropy-collider"><EntropyCollider powerSave={isPowerSave} /></div>
            </div>
          )}

          <HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} />
          <Features onOpenDoc={(doc) => setActiveDoc(doc)} />
          <ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} />
          
          {CURRENT_PHASE >= 5 && <About />}
          {CURRENT_PHASE >= 5 && <Pricing onOpenDoc={(doc) => setActiveDoc(doc)} />}
          {CURRENT_PHASE >= 5 && <Roadmap />}
          
          <FAQ onOpenDoc={(doc) => setActiveDoc(doc)} />
          <FinalNotice />
          <Footer onOpenDoc={(doc) => setActiveDoc(doc)} onVersionClick={handleUnlockClick} />
          <ScrollToTop />
        </main>
      </div>
      <style>{`
        @keyframes data-flow-pulse {
          0% { left: 0%; opacity: 0; transform: translateY(-50%) scale(0.6); }
          15% { opacity: 1; transform: translateY(-50%) scale(1.3); }
          50% { transform: translateY(-50%) scale(1); box-shadow: 0 0 25px #22d3ee; }
          85% { opacity: 1; transform: translateY(-50%) scale(1.3); }
          100% { left: 100%; opacity: 0; transform: translateY(-50%) scale(0.6); }
        }
        @keyframes data-trail-flow { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-data-flow-pulse { animation: data-flow-pulse 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-data-trail-flow { animation: data-trail-flow 2.8s linear infinite; }
        @keyframes sync-color-cycle {
          0%, 100% { border-color: rgba(239, 68, 68, 0.25); color: #ef4444; }
          33% { border-color: rgba(249, 115, 22, 0.25); color: #f97316; }
          66% { border-color: rgba(16, 185, 129, 0.25); color: #10b981; }
        }
        @keyframes sync-bg-cycle { 0%, 100% { background-color: #ef4444; } 33% { background-color: #f97316; } 66% { background-color: #10b981; } }
        @keyframes sync-pulse-glow { 0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px currentColor; } 50% { opacity: 0.7; transform: scale(1.1); box-shadow: 0 0 20px currentColor; } }
        .animate-status-sync-border { animation: sync-color-cycle 6s infinite ease-in-out; border-width: 0.1px; }
        .animate-sync-color-border { animation: sync-color-cycle 6s infinite ease-in-out; }
        .animate-sync-color-text { animation: sync-color-cycle 6s infinite ease-in-out; }
        .animate-sync-color-bg { animation: sync-bg-cycle 6s infinite ease-in-out, sync-pulse-glow 2s infinite ease-in-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { overflow: hidden; }
        .scroll-smooth-none { scroll-behavior: auto !important; }
      `}</style>
    </div>
  );
};
export default App;
