
import React, { useState, useEffect, useRef } from 'react';
import { Target, Search, Trophy, Terminal as TerminalIcon, Lock, Unlock, ChevronRight, AlertCircle, CheckCircle2, User, Globe, Loader2, ShieldCheck, Wifi, WifiOff, LogOut, RefreshCcw, Wallet, Coins, ArrowUpRight, FileText, Database, ShieldAlert, Zap, Skull, Timer, Fingerprint, Brain, Activity, ShieldX, Info, History, List, Eye, AlertTriangle, Map as MapIcon, BarChart3, TrendingUp, Medal, Star, Shield, ZapOff, HeartPulse } from 'lucide-react';

const REGISTRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwY5wE282Rqmec5bMYsQLTm1nsbbxzzfD8B7Q_AsuA1VC2PNucGCfFDYo4l7f2J5h6CQQ/exec"; 
const CHALLENGE_DURATION = 5.0;

interface Puzzle {
  id: number;
  question: string;
  hint: string;
  answer: string;
  referenceAddr: string;
}

interface ClaimRecord {
  id: number;
  receipt: string;
  timestamp: string;
}

const isValidSolanaAddress = (addr: string) => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
};

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

// SIMULATED LEADERBOARD DATA - SORTED BY RESILIENCE
const INITIAL_LEADERBOARD = [
  { handle: "@sol_guard", bri: 98, rank: "APEX", intercepted: 142 },
  { handle: "@vigil_01", bri: 94, rank: "SENTINEL", intercepted: 89 },
  { handle: "@nexus_sent", bri: 88, rank: "GUARDIAN", intercepted: 64 },
  { handle: "@phantom_eye", bri: 82, rank: "OPERATOR", intercepted: 41 },
  { handle: "@0x_shadow", bri: 76, rank: "ANALYST", intercepted: 22 }
];

export const CommunityChallenge: React.FC = () => {
  const puzzles: Puzzle[] = [
    { id: 1, question: "IDENTIFY_FRAGMENT_01: Locate the 4-character prefix of the 'FAKE' address used to demonstrate 'Vanishing Entropy' in the primary vulnerability analysis.", hint: "Search the registry focused on Adversarial Analysis and Entropy Collisions.", answer: "Ab1C", referenceAddr: "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90" },
    { id: 2, question: "IDENTIFY_FRAGMENT_02: Identify the 'Archive ID' assigned to the Shadow dApp dataset utilized in the peer-reviewed methodology.", hint: "Inspect the Methodology section of the document documenting 'Project Mirror'.", answer: "BSEC-2024-POISON-V2", referenceAddr: "BSECv27821xPoisoN7729110028x992211" },
    { id: 3, question: "IDENTIFY_FRAGMENT_03: Provide the terminal 'Registry ID' that concludes the primary compliance framework for operational standards.", hint: "Find the document governing 'Operational Terms' and scroll to the absolute end-of-file string.", answer: "VIG-TOS-INST-A1", referenceAddr: "VIG1nsT7281x992811772008x99120817" },
    { id: 4, question: "IDENTIFY_FRAGMENT_04: Find the 'LOG_ID' of the specific validation snapshot window that indicates 'COMPLETE' for poisoning patterns.", hint: "Inspect the visual UI mockups embedded within the architectural documentation.", answer: "8821-X", referenceAddr: "8821xVIGIL0091128x772199291120038" },
    { id: 5, question: "IDENTIFY_FRAGMENT_05: State the total count of 'Registered Assets' (Wordmarks and Marks) currently held in the restricted media gateway.", hint: "You must first unlock the v0.0.1.1 gateway to count the definitive wordmarks.", answer: "19", referenceAddr: "REG19xASSET992811x772199291120038" },
    { id: 6, question: "IDENTIFY_FRAGMENT_06: Identify the target latency threshold (in milliseconds) required for 0.5 Layer DOM interception.", hint: "Refer to the Operational Latency section in the Technical Specification.", answer: "12ms", referenceAddr: "LAT12msX992811x772199291120038" },
    { id: 7, question: "IDENTIFY_FRAGMENT_07: Provide the operation ID assigned to the Adversarial Mimicry Lab experimental environment.", hint: "Check the top label of the Adversarial Mimicry Lab / Trial by Fire section.", answer: "VIG-POI-X1", referenceAddr: "VIGP01X1x992811x772199291120038" },
    { id: 8, question: "IDENTIFY_FRAGMENT_08: Locate the specific Registry ID found at the conclusion of the 'Privacy Protocol'.", hint: "Navigate to the end of the Data Governance Privacy Protocol document.", answer: "VIG-PRV-INST-03", referenceAddr: "V1GPRV1NST03x772199291120038" },
    { id: 9, question: "IDENTIFY_FRAGMENT_09: Identify the Reference ID (REF) used for the classified Strategic Intelligence Threat Model.", hint: "Inspect the header of the Threat Model document in the registry.", answer: "VIG-TM-2026.09", referenceAddr: "VIGTM202609x772199291120038" },
    { id: 10, question: "IDENTIFY_FRAGMENT_10: State the ID assigned to the 'Heuristic Signal' specification within the Intent Validator engine.", hint: "Check the Engine Specification label inside the Intent Validator breakdown.", answer: "VIG-HEUR-01", referenceAddr: "VIGHEUR01x772199291120038" },
    { id: 11, question: "IDENTIFY_FRAGMENT_11: List the four flagship wordmark types (letters only) mentioned in the Institutional Design Note.", hint: "Look for the types (e.g. Type A, B...) listed in the Brand Assets section.", answer: "PQRS", referenceAddr: "TYPEPQRSx772199291120038" },
    { id: 12, question: "IDENTIFY_FRAGMENT_12: Identify the Tier designation assigned to the 'Baseline Awareness' baseline protection plan.", hint: "Refer to the baseline plan label in the Plans & Licensing section.", answer: "TIER: 01", referenceAddr: "TIER01xREGRx772199291120038" },
    { id: 13, question: "IDENTIFY_FRAGMENT_13: Provide the Registry ID that concludes the official Research Briefing (Annotated Edition).", hint: "Scroll to the final data log entry of the Research Briefing document.", answer: "VIG-INTEL-RP-01-FULL-H2", referenceAddr: "VIGINTELRP01FULLH2x77219929" },
    { id: 14, question: "IDENTIFY_FRAGMENT_14: State the specific operational version tag displayed on the VIGIL system dashboard.", hint: "Check the version label found in the sidebar or header (e.g. v 0.x.x.x).", answer: "v 0.0.1.1", referenceAddr: "V0011xSYSx772199291120038" },
    { id: 15, question: "IDENTIFY_FRAGMENT_15: Provide the terminal Registry Reference ID mentioned at the absolute end of the Institutional Disclaimer.", hint: "Inspect the end of the legal registry's disclaimer fragment.", answer: "VIG-LEGAL-CORE-A1", referenceAddr: "VIGLEGALCOREA1x772199291120038" }
  ];

  const [userHandle, setUserHandle] = useState('');
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  // Gamification States (Phase 2)
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [bri, setBri] = useState(100); // Biological Resilience Index
  const [view, setView] = useState<'INTEL' | 'GLOBAL'>('INTEL');

  // Challenge Flow
  const [flowState, setFlowState] = useState<'QUESTION' | 'TRIAL' | 'SYNCING' | 'SUCCESS' | 'ERROR' | 'BREACH'>('QUESTION');
  const [errorMsg, setErrorMsg] = useState('');
  const [claimHistory, setClaimHistory] = useState<ClaimRecord[]>([]);

  // Mimicry Trial States
  const [trialOptions, setTrialOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vigil_challenge_pro_v2');
    const savedHandle = localStorage.getItem('vigil_user_handle');
    const savedAddress = localStorage.getItem('vigil_user_address');
    const savedClaims = localStorage.getItem('vigil_claims_v3');
    const savedXp = localStorage.getItem('vigil_operator_xp');
    const savedBri = localStorage.getItem('vigil_operator_bri');
    
    if (saved) setCurrentStep(Math.min(parseInt(saved), puzzles.length));
    if (savedHandle) setUserHandle(savedHandle);
    if (savedAddress) setSolanaAddress(savedAddress);
    if (savedClaims) setClaimHistory(JSON.parse(savedClaims));
    if (savedXp) {
      const parsedXp = parseInt(savedXp);
      setXp(parsedXp);
      setLevel(Math.floor(parsedXp / 100) + 1);
    }
    if (savedBri) setBri(parseInt(savedBri));
    
    if (savedHandle && savedAddress) {
      setIsSessionActive(true);
    }
  }, []);

  const updateBri = (delta: number) => {
    const nextBri = Math.max(0, Math.min(100, bri + delta));
    setBri(nextBri);
    localStorage.setItem('vigil_operator_bri', nextBri.toString());
  };

  const initiateSession = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError(null);
    const error = validateIdentity();
    if (error) {
      setRegistrationError(error);
      return;
    }
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    setUserHandle(cleanHandle);
    setSolanaAddress(cleanAddr);
    setIsSessionActive(true);
    localStorage.setItem('vigil_user_handle', cleanHandle);
    localStorage.setItem('vigil_user_address', cleanAddr);
  };

  const validateIdentity = () => {
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    const isHandleInvalid = !cleanHandle.startsWith('@') || cleanHandle.length < 2;
    const isAddrInvalid = cleanAddr === '' || !isValidSolanaAddress(cleanAddr);
    if (isHandleInvalid && isAddrInvalid) return "CRITICAL_AUTH_FAILURE: DUAL_FRAGMENT_MISMATCH";
    if (isHandleInvalid) return "IDENTITY_FAILURE: INVALID X_ID";
    if (isAddrInvalid) return "MALFORMED_PAYLOAD: INVALID ADDRESS";
    return null;
  };

  const handlePuzzleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = puzzles[currentStep];
    if (inputValue.trim().toUpperCase() === current.answer.toUpperCase()) {
      const mimics = [
        generatePoisonMimic(current.referenceAddr),
        generatePoisonMimic(current.referenceAddr),
        generatePoisonMimic(current.referenceAddr),
        generatePoisonMimic(current.referenceAddr)
      ];
      setTrialOptions([...mimics, current.referenceAddr].sort(() => Math.random() - 0.5));
      setFlowState('TRIAL');
      startTrialTimer();
    } else {
      setFlowState('ERROR');
      setErrorMsg('Intel Fragment mismatch. Data refused.');
      updateBri(-2);
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const startTrialTimer = () => {
    setTimeLeft(CHALLENGE_DURATION);
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        failTrial('Cognitive Timeout. Biological response delayed.');
      }
    }, 10);
  };

  const failTrial = (msg: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFlowState('BREACH');
    setErrorMsg(msg);
    updateBri(-10);
    setTimeout(() => {
      setFlowState('QUESTION');
      setInputValue('');
    }, 3000);
  };

  const handleTrialSelection = async (selection: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const current = puzzles[currentStep];
    
    if (selection === current.referenceAddr) {
      setFlowState('SYNCING');
      const speedBonus = timeLeft > 3.5 ? 2 : 0;
      updateBri(2 + speedBonus);
      await submitClaim(currentStep + 1);
    } else {
      failTrial('Biological Failure. Intent mismatched.');
    }
  };

  const submitClaim = async (id: number) => {
    const proof = btoa(`${solanaAddress}_${id}_${Date.now()}`).slice(0, 10).toUpperCase();
    try {
      await fetch(REGISTRY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          handle: userHandle,
          address: solanaAddress,
          fragment: id,
          bri: bri,
          proof: proof
        })
      });

      const newClaim: ClaimRecord = { id, receipt: `VIG-REC-${proof}`, timestamp: new Date().toLocaleTimeString() };
      const updated = [...claimHistory, newClaim];
      setClaimHistory(updated);
      localStorage.setItem('vigil_claims_v3', JSON.stringify(updated));

      const newXp = xp + 50;
      setXp(newXp);
      setLevel(Math.floor(newXp / 100) + 1);
      localStorage.setItem('vigil_operator_xp', newXp.toString());
      
      setFlowState('SUCCESS');
      setTimeout(() => {
        const next = currentStep + 1;
        setCurrentStep(next);
        localStorage.setItem('vigil_challenge_pro_v2', next.toString());
        setInputValue('');
        setFlowState('QUESTION');
      }, 1500);
    } catch (err) {
      setFlowState('ERROR');
      setErrorMsg('Registry Sync Failure.');
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const terminateSession = () => {
    if (confirm("Revoke identity session? Registry records will be preserved.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const currentEarnings = claimHistory.length * 0.1;
  const operatorRank = bri >= 90 ? "APEX" : bri >= 75 ? "SENTINEL" : bri >= 50 ? "GUARDIAN" : "RECRUIT";

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-16 pb-32 px-4 relative z-10">
      {!isSessionActive ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
           {/* AUTH FORM (Omitted for brevity, matches previous functional version) */}
           <div className="w-full max-w-2xl text-center space-y-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-amber-600/10 border border-amber-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                  <User className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Operator <br/> Assessment.</h2>
              </div>
              <form onSubmit={initiateSession} className="space-y-8">
                <div className="space-y-4">
                  <input autoFocus type="text" value={userHandle} onChange={(e) => setUserHandle(e.target.value)} placeholder="@X_ID" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-xl font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                  <input type="text" value={solanaAddress} onChange={(e) => setSolanaAddress(e.target.value)} placeholder="SOL_ADDRESS" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-sm font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                </div>
                {registrationError && <div className="p-5 bg-red-600 border border-red-500 rounded-2xl flex items-center gap-4 animate-pulse"><AlertTriangle className="w-5 h-5 text-white" /><span className="text-[10px] font-black text-white uppercase tracking-widest">{registrationError}</span></div>}
                <button type="submit" className="w-full py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl hover:bg-amber-600 hover:text-white transition-all">INITIATE ASSESSMENT</button>
              </form>
           </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-1000">
          
          {/* PHASE 2 HEADER */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4">
            <div className="space-y-1 text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-3">
                 <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
                 <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em]">Biological Integrity: MONITORING</span>
               </div>
               <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Sentinel Ops.</h2>
            </div>
            
            <div className="flex items-center gap-4">
               {/* VIEW TOGGLE */}
               <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
                  <button onClick={() => setView('INTEL')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'INTEL' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <TerminalIcon className="w-3.5 h-3.5 inline mr-2" /> Decryption
                  </button>
                  <button onClick={() => setView('GLOBAL')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'GLOBAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <Globe className="w-3.5 h-3.5 inline mr-2" /> Global Shield
                  </button>
               </div>

               {/* BIOMETRIC GAUGE */}
               <div className="p-4 h-24 bg-[#0a0a0a] border border-zinc-900 rounded-[1.5rem] shadow-2xl flex items-center gap-6 relative overflow-hidden group">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                     <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900" />
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className={`transition-all duration-1000 ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`} strokeDasharray="175.8" strokeDashoffset={175.8 - (175.8 * (bri / 100))} />
                     </svg>
                     <div className="text-center">
                        <div className="text-[12px] font-black text-white italic leading-none">{bri}%</div>
                     </div>
                  </div>
                  <div className="space-y-1 pr-4">
                     <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Resilience Index</div>
                     <div className={`text-[12px] font-black italic tracking-tighter ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`}>{operatorRank} Rank</div>
                  </div>
               </div>

               <button onClick={terminateSession} className="group flex items-center gap-4 px-6 h-24 bg-zinc-900 border border-zinc-800 rounded-[1.5rem] text-zinc-600 hover:text-red-500 transition-all">
                  <LogOut className="w-6 h-6" />
               </button>
            </div>
          </div>

          {view === 'GLOBAL' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 animate-in zoom-in duration-500">
               {/* GLOBAL MAP HEATMAP */}
               <div className="lg:col-span-8 bg-[#0a0a0a] border border-zinc-900 rounded-[3rem] p-12 relative overflow-hidden h-[650px] flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
                     <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>
                  
                  <div className="relative z-10 text-center space-y-10">
                     <div className="relative w-32 h-32 mx-auto">
                        <Globe className="w-full h-full text-blue-500/20 animate-pulse" />
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Sentinel Network Map</h3>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.4em]">Live Cluster Interception: ACTIVE</p>
                     </div>
                  </div>

                  {/* PULSING ATTACK POINTS */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-600 rounded-full animate-ping delay-700" />
                  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />

                  <div className="absolute bottom-10 right-10 p-8 bg-black/50 backdrop-blur-md border border-zinc-800 rounded-3xl space-y-4 max-w-sm">
                     <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Network Throughput</span>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <div className="text-3xl font-black text-white italic">14.2k</div>
                           <div className="text-[8px] text-zinc-600 font-black uppercase">Intercepts/hr</div>
                        </div>
                        <div>
                           <div className="text-3xl font-black text-emerald-500 italic">99.2%</div>
                           <div className="text-[8px] text-zinc-600 font-black uppercase">Network Integrity</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* REFINED LEADERBOARD */}
               <div className="lg:col-span-4 bg-[#0a0a0a] border border-zinc-900 rounded-[3rem] p-10 space-y-8 h-[650px] flex flex-col">
                  <div className="space-y-2 border-b border-zinc-900 pb-6">
                     <div className="flex items-center gap-3">
                        <Medal className="w-5 h-5 text-amber-500" />
                        <h3 className="text-xl font-black text-white italic uppercase">Operator Rankings</h3>
                     </div>
                     <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Ranked by Biological Resilience Index</p>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                     {INITIAL_LEADERBOARD.map((op, i) => (
                        <div key={i} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                           <div className="flex items-center gap-4">
                              <div className="text-xs font-black text-zinc-800">{i + 1}</div>
                              <div className="space-y-0.5">
                                 <div className="text-[11px] font-black text-white uppercase tracking-widest">{op.handle}</div>
                                 <div className="text-[8px] font-bold text-blue-500 uppercase tracking-widest italic">{op.rank} Sentinel</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className={`text-sm font-black italic leading-none ${op.bri > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{op.bri}% BRI</div>
                              <div className="text-[7px] text-zinc-700 font-black uppercase tracking-widest mt-1">{op.intercepted} SECURED</div>
                           </div>
                        </div>
                     ))}
                     {/* CURRENT USER ENTRY */}
                     <div className="p-5 bg-amber-500/10 border border-amber-500/40 rounded-2xl flex items-center justify-between animate-pulse">
                        <div className="flex items-center gap-4">
                           <div className="text-xs font-black text-amber-500">88</div>
                           <div className="space-y-0.5">
                              <div className="text-[11px] font-black text-white uppercase tracking-widest">{userHandle || "@YOU"}</div>
                              <div className="text-[8px] font-bold text-amber-500 uppercase tracking-widest italic">{operatorRank} Candidate</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-sm font-black text-amber-500 italic leading-none">{bri}% BRI</div>
                           <div className="text-[7px] text-zinc-500 font-black uppercase tracking-widest mt-1">{claimHistory.length} SECURED</div>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-900 flex items-center gap-4">
                     <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                     </div>
                     <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.2em] leading-relaxed">
                        BRI is calculated using saccade mutation tracking and decryption latency. Precision is mandatory.
                     </p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
              
              <div className="lg:col-span-3 space-y-6">
                <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] shadow-2xl space-y-8 flex flex-col h-[700px]">
                  <div className="space-y-6 flex-1 flex flex-col min-h-0">
                     <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] border-b border-zinc-900 pb-4 flex items-center gap-2">
                        <List className="w-3 h-3" /> Intel index
                     </div>
                     <div className="space-y-4 overflow-y-auto no-scrollbar pr-1 flex-1">
                        {puzzles.map((p, idx) => {
                          const isUnlocked = idx < currentStep;
                          const isActive = idx === currentStep;
                          return (
                            <div key={p.id} className={`p-5 rounded-2xl border transition-all duration-500 flex items-center justify-between group ${isActive ? 'bg-amber-600/5 border-amber-600/30' : isUnlocked ? 'bg-emerald-600/5 border-emerald-600/20' : 'bg-zinc-950 border-zinc-900 opacity-80'}`}>
                               <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isActive ? 'bg-amber-600 text-white' : isUnlocked ? 'bg-emerald-600/10 text-emerald-500' : 'bg-zinc-900 text-zinc-400'}`}>
                                     {isActive ? <Target className="w-4 h-4" /> : isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                  </div>
                                  <div className="space-y-0.5">
                                     <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : isUnlocked ? 'text-emerald-500' : 'text-zinc-500'}`}>Fragment {p.id < 10 ? `0${p.id}` : p.id}</p>
                                     <p className="text-[7px] font-bold text-zinc-700 uppercase tracking-widest">{isUnlocked ? '+50 XP / BRI++' : isActive ? 'IN_PROGRESS' : 'ENCRYPTED'}</p>
                                  </div>
                               </div>
                               <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-500 animate-pulse' : isUnlocked ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                            </div>
                          );
                        })}
                     </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className={`h-full bg-[#080808] border-2 rounded-[3.5rem] overflow-hidden transition-all duration-700 ${flowState === 'ERROR' || flowState === 'BREACH' ? 'border-red-900/50' : flowState === 'TRIAL' ? 'border-amber-600/40' : flowState === 'SUCCESS' ? 'border-emerald-600/30' : 'border-zinc-900 shadow-2xl'}`}>
                  <div className="h-16 bg-zinc-950 border-b border-zinc-900 flex items-center px-10 justify-between">
                     <div className="flex items-center gap-3">
                        <HeartPulse className={`w-4 h-4 ${bri > 50 ? 'text-emerald-500' : 'text-red-500'} animate-pulse`} />
                        <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest italic">FRAGMENT_{puzzles[currentStep]?.id || 'DONE'} // BRI: {bri}%</span>
                     </div>
                  </div>

                  <div className="p-8 md:p-14 relative overflow-hidden flex flex-col justify-center min-h-[550px]">
                     {currentStep < puzzles.length ? (
                       <>
                        {flowState === 'QUESTION' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
                              <div className="space-y-6">
                                  <div className="text-[11px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                    <Search className="w-4 h-4" /> Intellectual Acquisition
                                  </div>
                                  <h3 className="text-2xl md:text-3xl font-black text-zinc-100 italic uppercase tracking-tight leading-tight">{puzzles[currentStep].question}</h3>
                              </div>
                              <form onSubmit={handlePuzzleSubmit} className="space-y-8">
                                  <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-1">Input Fragment Key</label>
                                    <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ENTER_FRAGMENT_SECRET..." className="w-full bg-black border-2 border-zinc-900 rounded-2xl py-6 px-8 text-lg font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                                  </div>
                                  <button type="submit" className="px-12 py-5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-amber-500 transition-all shadow-xl active:scale-95">AUTHENTICATE FRAGMENT</button>
                              </form>
                            </div>
                        )}
                        
                        {flowState === 'TRIAL' && (
                          <div className="space-y-8 animate-in zoom-in duration-500 flex flex-col items-center">
                              <div className="text-center space-y-4">
                                <div className="flex items-center justify-center gap-3">
                                    <Skull className="w-6 h-6 text-red-500" />
                                    <span className="text-[13px] font-black text-red-500 uppercase tracking-[0.4em]">Mimicry Trial Active</span>
                                </div>
                                <p className="text-zinc-500 text-sm italic font-medium max-w-md mx-auto">Pick the REAL destination below. Fast selection grants BRI bonuses.</p>
                              </div>
                              <div className="w-full max-w-xl p-6 bg-zinc-900/50 border-2 border-emerald-500/20 rounded-3xl space-y-3">
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Target Reference Address</span>
                                <p className="font-mono text-xs text-white break-all tracking-tight leading-relaxed">{puzzles[currentStep].referenceAddr}</p>
                              </div>
                              <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-red-600 transition-all duration-75" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (timeLeft / CHALLENGE_DURATION))} />
                                </svg>
                                <span className="text-2xl font-black italic text-white">{timeLeft.toFixed(1)}s</span>
                              </div>
                              <div className="grid grid-cols-1 gap-3 w-full max-w-xl">
                                {trialOptions.map((opt, i) => (
                                  <button key={i} onClick={() => handleTrialSelection(opt)} className="group relative w-full p-4 bg-black border border-zinc-900 rounded-[1.5rem] hover:border-blue-500 transition-all">
                                      <div className="font-mono text-[11px] text-zinc-600 group-hover:text-zinc-200 flex justify-between items-center">{opt.slice(0, 12)}...{opt.slice(-12)}<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" /></div>
                                  </button>
                                ))}
                              </div>
                          </div>
                        )}

                        {flowState === 'BREACH' && (
                           <div className="flex flex-col items-center justify-center py-20 space-y-10 animate-in zoom-in duration-500">
                              <div className="relative">
                                 <ZapOff className="w-20 h-20 text-red-600 animate-pulse" />
                                 <div className="absolute inset-0 bg-red-600/10 blur-3xl animate-pulse" />
                              </div>
                              <div className="text-center space-y-4">
                                 <h4 className="text-3xl font-black text-red-600 uppercase italic tracking-tighter">Biological Breach.</h4>
                                 <div className="px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-lg inline-block">
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Resilience Impact: -10% BRI</span>
                                 </div>
                                 <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-widest leading-relaxed max-w-xs mx-auto">{errorMsg}</p>
                              </div>
                           </div>
                        )}

                        {flowState === 'SYNCING' && <div className="flex flex-col items-center justify-center py-20 animate-pulse"><Loader2 className="w-16 h-16 text-amber-500 animate-spin" /><p className="text-[16px] font-black text-white uppercase tracking-[0.4em] mt-8">Committing Proof...</p></div>}
                        {flowState === 'SUCCESS' && <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500"><div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]"><CheckCircle2 className="w-12 h-12 text-emerald-500" /></div><p className="text-[16px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-8">Integrity Maintained</p></div>}
                        {flowState === 'ERROR' && <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500"><ShieldX className="w-16 h-16 text-red-600" /><p className="text-[16px] font-black text-red-600 uppercase tracking-[0.4em] mt-8">Scan Failure</p><p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-2">{errorMsg}</p></div>}
                       </>
                     ) : (
                        <div className="text-center space-y-12 animate-in zoom-in duration-1000">
                          <Trophy className="w-32 h-32 text-emerald-500 mx-auto" />
                          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">Assessment <br/> Complete.</h2>
                          <div className="px-8 py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] inline-block">FINAL BRI: {bri}% // RANK: {operatorRank}</div>
                        </div>
                     )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                 <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] shadow-2xl space-y-10 h-[700px] flex flex-col">
                    <div className="space-y-6 flex-1 flex flex-col min-h-0">
                       <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] border-b border-zinc-900 pb-4 flex items-center gap-2">
                          <History className="w-3 h-3" /> Intercept Log
                       </div>
                       <div className="space-y-4 overflow-y-auto no-scrollbar pr-1 flex-1">
                          {claimHistory.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                               <Database className="w-10 h-10" />
                               <p className="text-[8px] font-black uppercase tracking-widest">No verified claims</p>
                            </div>
                          ) : (
                            claimHistory.slice().reverse().map((claim, idx) => (
                                <div key={idx} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2 group hover:border-emerald-500/30 transition-colors">
                                   <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Intercept #{claim.id}</span>
                                      <span className="text-[8px] font-mono text-zinc-700 uppercase">{claim.timestamp}</span>
                                   </div>
                                   <p className="text-[9px] font-mono text-zinc-600 truncate">{claim.receipt}</p>
                                </div>
                            ))
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* BOTTOM STATUS BAR */}
          <div className="pt-20 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left px-4">
              <div className="flex items-center justify-center md:justify-start gap-4">
                 <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sentinel Roster: VIG-2026-X</div>
                 <div className="h-4 w-[1px] bg-zinc-900" />
                 <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Global Intercepts: 1.2M+ SECURED</div>
              </div>
              <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest italic">Live Global Intelligence synchronization established via Operator Mesh.</p>
            </div>
            
            <div className="flex items-center gap-3 px-6 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-full mr-4">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">OPERATOR_BIOLOGY_LOCKED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
