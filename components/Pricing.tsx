
import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Chrome, ShieldAlert, Lock, Zap, Cpu, Terminal, ShieldCheck, Activity, Loader2, Target, FlaskConical, Wallet, Check, AlertCircle, FileSignature, AlertTriangle, Smartphone, ExternalLink } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';
import { TechLabel } from './docs/DocHelpers';
import * as solanaWeb3 from '@solana/web3.js';

// VIGIL TREASURY ADDRESS
const TREASURY_ADDRESS = "Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i"; 
const PRO_FEE_SOL = 0.5;

const REGISTRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwY5wE282Rqmec5bMYsQLTm1nsbbxzzfD8B7Q_AsuA1VC2PNucGCfFDYo4l7f2J5h6CQQ/exec";

const ProvisioningTerminal = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const sequences = [
    "INITIALIZING BRIDGE LAYER 0.5...",
    "MAPPING BROWSER DOM SCOPE...",
    "ESTABLISHING LOCAL SANDBOX...",
    "SYNCING THREAT INTELLIGENCE FEED...",
    "VALIDATING INSTITUTIONAL SIGNATURE...",
    "AUTHORIZING NODE DEPLOYMENT..."
  ];

  useEffect(() => {
    if (step < sequences.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${sequences[step]}`]);
        setStep(s => s + 1);
      }, 400 + (Math.random() * 600));
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [step]);

  return (
    <div className="font-mono text-[9px] md:text-[10px] text-emerald-500/80 space-y-1.5 text-left max-h-[150px] overflow-hidden">
      {logs.map((log, i) => (
        <div key={i} className="animate-in slide-in-from-left-2 duration-300">
          <span className="text-emerald-900 mr-2">{'>>'}</span> {log}
        </div>
      ))}
      {step < sequences.length && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span>EXECUTING...</span>
        </div>
      )}
    </div>
  );
};

export const Pricing: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const [provisionState, setProvisionState] = useState<'IDLE' | 'SCANNING' | 'CONNECTING' | 'PAYING' | 'SIGNING' | 'AUTHORIZED' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    const saved = localStorage.getItem('vigil_node_verified');
    const savedExpiry = localStorage.getItem('vigil_node_expiry');
    if (saved && savedExpiry) {
      if (Date.now() < parseInt(savedExpiry)) {
        setProvisionState('AUTHORIZED');
        setExpiryDate(new Date(parseInt(savedExpiry)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      }
    }
  }, []);

  const openInPhantomMobile = () => {
    const url = window.location.href;
    const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(url)}`;
    window.location.href = phantomUrl;
  };

  const startProvisioning = () => {
    setProvisionState('SCANNING');
  };

  const connectWallet = async () => {
    setProvisionState('CONNECTING');
    try {
      // @ts-ignore
      const provider = window.solana || window.phantom?.solana;
      if (!provider) {
        if (isMobile) {
          throw new Error("MOBILE_BROWSER_DETECTION");
        } else {
          throw new Error("No Solana wallet found. Please install Phantom.");
        }
      }
      await provider.connect();
      setProvisionState('PAYING');
    } catch (err: any) {
      setProvisionState('ERROR');
      if (err.message === "MOBILE_BROWSER_DETECTION") {
        setErrorMessage("MOBILE_USE_PHANTOM_BROWSER");
      } else {
        setErrorMessage(err.message || "Failed to connect wallet.");
      }
    }
  };

  const handleActualPayment = async () => {
    setProvisionState('SIGNING');
    try {
      // @ts-ignore
      const provider = window.solana || window.phantom?.solana;
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: new solanaWeb3.PublicKey(TREASURY_ADDRESS),
          lamports: PRO_FEE_SOL * solanaWeb3.LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = provider.publicKey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      
      await fetch(REGISTRY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          wallet: provider.publicKey.toString(),
          signature: signature,
          type: 'NODE_PROVISIONING',
          fee: PRO_FEE_SOL,
          utc: new Date().toISOString()
        })
      });

      const expiry = Date.now() + (365 * 24 * 60 * 60 * 1000);
      localStorage.setItem('vigil_node_verified', 'true');
      localStorage.setItem('vigil_node_expiry', expiry.toString());
      
      setExpiryDate(new Date(expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      setProvisionState('AUTHORIZED');
    } catch (err: any) {
      setProvisionState('ERROR');
      setErrorMessage(err.message || "Transaction rejected or failed.");
    }
  };

  return (
    <section id="cta" className="bg-[#020202] py-12 px-6 md:px-20 relative z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-zinc-900" />
             <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.6em]">Service Provisioning // Node 0.5-S</span>
             <div className="h-[1px] w-12 bg-zinc-900" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Finalize <br/> Deployment.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 group relative h-full">
             <div className="absolute -inset-[2px] bg-gradient-to-b from-blue-600/30 via-transparent to-emerald-600/30 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             
             <div className="relative h-full bg-[#050505] border-2 border-zinc-900 rounded-[3.5rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-zinc-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                   <Target className="w-96 h-96 text-white" />
                </div>

                <div className="flex-1 space-y-10 relative z-10">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="px-3 py-1 bg-blue-600 rounded text-[9px] font-black text-white uppercase tracking-widest shadow-lg">OFFICIAL_STANDARD</div>
                         <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-black text-zinc-500 uppercase tracking-widest italic font-mono">ID: VIG-TYPE-S</div>
                      </div>
                      <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Pro Security <br/> Deployment.</h3>
                      <p className="text-zinc-500 text-lg md:text-xl font-medium italic leading-relaxed max-w-lg mt-6">
                        "Full-spectrum cognitive awareness for institutional and high-volume retail participants."
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { t: "Persistent Intent Protection", d: "Continuous DOM monitoring for address mimicry." },
                        { t: "Heuristic Similarity Engine", d: "Detects non-random vanity address collisions." },
                        { t: "Real-time Threat Updates", d: "Instant sync with global poisoning clusters." },
                        { t: "Enhanced Visual Layer", d: "Refractive character highlighting for verification." }
                      ].map((f, i) => (
                        <div key={i} className="space-y-1.5 group/item">
                           <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/item:shadow-[0_0_8px_#3b82f6] transition-all" />
                              <span className="text-[11px] font-black text-white uppercase tracking-widest">{f.t}</span>
                           </div>
                           <p className="text-[10px] text-zinc-600 font-bold uppercase italic leading-relaxed pl-3.5">{f.d}</p>
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-zinc-900 flex items-center gap-8">
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Protocol Fee</div>
                         <div className="text-4xl font-black text-white italic tracking-tighter">0.5 SOL <span className="text-sm text-zinc-700 not-italic uppercase tracking-widest">/ yr</span></div>
                      </div>
                      <div className="h-10 w-[1px] bg-zinc-900" />
                      <div className="space-y-1">
                         <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Identity Auth</div>
                         <div className="text-sm font-black text-blue-500 uppercase tracking-widest italic">Wallet-Based Registry</div>
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 relative z-10">
                   <div className={`flex-1 p-8 bg-[#080808] border border-zinc-900 rounded-[2.5rem] flex flex-col justify-between shadow-inner transition-all duration-700 ${provisionState !== 'IDLE' && provisionState !== 'AUTHORIZED' ? 'border-blue-500/30' : provisionState === 'AUTHORIZED' ? 'border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : ''}`}>
                      
                      {provisionState === 'IDLE' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                           <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                              <ShieldCheck className="w-8 h-8 text-zinc-700" />
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Awaiting Authorization</p>
                              <p className="text-[8px] font-mono text-zinc-800 uppercase italic">Ready for Layer 0.5 Bridge</p>
                           </div>
                        </div>
                      )}

                      {provisionState === 'SCANNING' && (
                        <ProvisioningTerminal onComplete={connectWallet} />
                      )}

                      {provisionState === 'CONNECTING' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                           <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Establishing Handshake</p>
                              <p className="text-[8px] font-mono text-zinc-700 uppercase italic">Awaiting Provider Response...</p>
                           </div>
                        </div>
                      )}

                      {provisionState === 'PAYING' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                           <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                              <Wallet className="w-8 h-8 text-blue-500 animate-pulse" />
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">Authorize 0.5 SOL</p>
                              <p className="text-[8px] font-mono text-zinc-600 uppercase italic">Treasury: {TREASURY_ADDRESS.slice(0,4)}...{TREASURY_ADDRESS.slice(-4)}</p>
                           </div>
                           <button 
                             onClick={handleActualPayment}
                             className="px-6 py-2 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                           >
                             CONFIRM TRANSFER
                           </button>
                        </div>
                      )}

                      {provisionState === 'SIGNING' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                           <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                              <FileSignature className="w-8 h-8 text-amber-500 animate-bounce" />
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">On-Chain Commitment</p>
                              <p className="text-[8px] font-mono text-amber-600 uppercase italic leading-relaxed px-4">Signing payload for <br/> institutional registry entry...</p>
                           </div>
                        </div>
                      )}

                      {provisionState === 'ERROR' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                           <div className={`w-16 h-16 rounded-full flex items-center justify-center ${errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                              {errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? <Smartphone className="w-8 h-8 text-blue-500" /> : <AlertTriangle className="w-8 h-8 text-red-500" />}
                           </div>
                           <div className="space-y-2">
                              <p className={`text-[10px] font-black uppercase tracking-widest ${errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? 'text-blue-500' : 'text-red-500'}`}>
                                {errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? 'Mobile Detection' : 'Provisioning Failed'}
                              </p>
                              <p className="text-[8px] font-mono text-zinc-500 uppercase italic px-4 leading-relaxed">
                                {errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? 'Standard mobile browsers do not support wallets. Switch to Phantom.' : errorMessage}
                              </p>
                           </div>
                           {errorMessage === 'MOBILE_USE_PHANTOM_BROWSER' ? (
                             <button 
                               onClick={openInPhantomMobile}
                               className="px-6 py-3 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg hover:bg-blue-500 transition-all shadow-lg flex items-center gap-2"
                             >
                               <Smartphone className="w-3 h-3" /> OPEN IN PHANTOM APP
                             </button>
                           ) : (
                             <button 
                               onClick={() => setProvisionState('IDLE')}
                               className="text-[8px] font-black text-blue-500 uppercase tracking-widest hover:underline"
                             >
                               RETRY SEQUENCE
                             </button>
                           )}
                        </div>
                      )}

                      {provisionState === 'AUTHORIZED' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-700">
                           <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                              <Check className="w-10 h-10 text-emerald-500" />
                           </div>
                           <div className="space-y-3">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Protocol Activated</p>
                                 <p className="text-[14px] font-black text-white italic tracking-tighter uppercase">Node Verified</p>
                              </div>
                              <div className="py-2 px-4 bg-zinc-950 border border-zinc-900 rounded-xl inline-block">
                                 <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">License Expiry</p>
                                 <p className="text-[10px] font-mono text-zinc-400 font-bold">{expiryDate}</p>
                              </div>
                           </div>
                        </div>
                      )}

                      {(provisionState === 'IDLE' || provisionState === 'SCANNING') && (
                        <button 
                          onClick={startProvisioning}
                          disabled={provisionState === 'SCANNING'}
                          className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center gap-3 ${
                            provisionState === 'IDLE' ? 'bg-white text-black hover:bg-blue-600 hover:text-white' :
                            'bg-zinc-900 text-zinc-600 cursor-wait'
                          }`}
                        >
                           {provisionState === 'IDLE' ? <><Zap className="w-4 h-4 fill-current" /> PROVISION NODE</> : <Loader2 className="w-4 h-4 animate-spin" />}
                        </button>
                      )}

                      {provisionState === 'AUTHORIZED' && (
                        <button 
                          onClick={() => window.location.reload()}
                          className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:bg-emerald-500 shadow-lg active:scale-95"
                        >
                           SYNC EXTENSION
                        </button>
                      )}
                   </div>
                   <div className="p-4 bg-zinc-950/50 border border-zinc-900 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                         <AlertCircle className="w-3 h-3" /> Note:
                      </div>
                      <p className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest leading-relaxed">
                        Subscription is tied to your wallet via on-chain signature. No login required. Exact 1-year expiry enforced via Solana block timestamp.
                      </p>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8 h-full">
             <div className="h-full bg-[#080808] border border-zinc-900 rounded-[3.5rem] p-10 flex flex-col justify-between hover:border-zinc-800 transition-all group/free shadow-2xl">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <TechLabel text="TIER: 01" color="zinc" />
                      <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Baseline <br/> Awareness.</h4>
                      <p className="text-zinc-600 text-sm font-medium italic mt-6">Essential protection for the Solana ecosystem.</p>
                   </div>
                   
                   <ul className="space-y-4">
                      {[
                        "Basic Poisoning Detection",
                        "Manual Verification Prompts",
                        "Privacy-First Sandboxing"
                      ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                           <div className="w-1 h-1 bg-zinc-800 rounded-full" /> {feat}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="space-y-6 pt-10 border-t border-zinc-900">
                   <div className="text-center">
                      <span className="text-2xl font-black text-zinc-400 italic">FREE</span>
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-2">Open Protocol</span>
                   </div>
                   <button className="w-full py-4 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-3">
                      <Chrome className="w-4 h-4" /> ACTIVATE FREE
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900/50 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-500">
                 <Lock className="w-5 h-5" />
                 <h5 className="text-[11px] font-black uppercase tracking-widest">Non-Custodial</h5>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed uppercase italic">
                VIGIL operates in a local sandbox. We never access, store, or transmit your private keys.
              </p>
           </div>
           <div className="space-y-3">
              <div className="flex items-center gap-3 text-cyan-500">
                 <Activity className="w-5 h-5" />
                 <h5 className="text-[11px] font-black uppercase tracking-widest">Heuristic Signals</h5>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed uppercase italic">
                Our similarity matrix analyzes over 40 distinct visual collision patterns in real-time.
              </p>
           </div>
           <div className="space-y-3">
              <div className="flex items-center gap-3 text-emerald-500">
                 <Target className="w-5 h-5" />
                 <h5 className="text-[11px] font-black uppercase tracking-widest">Intent Integrity</h5>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed uppercase italic">
                VIGIL ensures that the address you see is the address you sign—nothing more.
              </p>
           </div>
        </div>

        <div className="text-center">
           <button 
             onClick={() => onOpenDoc?.('threat_model')}
             className="inline-flex items-center gap-4 text-zinc-700 hover:text-zinc-400 transition-colors group"
           >
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Review Institutional Threat Model</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
};
