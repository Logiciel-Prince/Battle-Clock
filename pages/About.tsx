
import React, { useState, useEffect } from 'react';
import { Github, Mail, ShieldCheck, Zap, Server, Activity, Radio, Cpu, RefreshCcw } from 'lucide-react';
import { fetchTacticalBriefing, fetchRealEvents } from '../services/eventService';

const DiagnosticLine = ({ label, value, colorClass = "text-rose-500" }: { label: string, value: string, colorClass?: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5 font-mono-tech text-[10px]">
    <span className="text-slate-500 uppercase tracking-widest">{label}</span>
    <span className={`${colorClass} font-black uppercase tracking-tighter`}>{value}</span>
  </div>
);

const About: React.FC = () => {
  const [briefing, setBriefing] = useState<string>("Initializing satellite link...");
  const [loading, setLoading] = useState(true);
  const [activeMissions, setActiveMissions] = useState(0);

  const loadIntel = async (force = false) => {
    setLoading(true);
    if (force) {
      setBriefing("Establishing priority uplink... Decrypting telemetry...");
    }
    
    try {
      const [intelText, events] = await Promise.all([
        fetchTacticalBriefing(force),
        fetchRealEvents(force)
      ]);
      setBriefing(intelText);
      setActiveMissions(events.length);
    } catch (error) {
      setBriefing("Error: Command link unstable. Check peripheral connectivity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntel(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      {/* Page Header */}
      <div className="mb-16 text-center lg:text-left border-l-4 border-rose-600 pl-8">
        <h1 className="text-4xl lg:text-6xl font-black font-rajdhani text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">
          Operational <span className="text-rose-600">Overview</span>
        </h1>
        <p className="text-slate-500 font-mono-tech text-xs uppercase tracking-[0.3em]">
          Tactical Readiness Terminal v4.2.0-TAC
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column: Diagnostics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="hud-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-rose-500" />
              <h3 className="font-rajdhani font-black text-slate-900 dark:text-white uppercase tracking-widest">System Health</h3>
            </div>
            <div className="space-y-1">
              <DiagnosticLine label="Satellite Uplink" value="Nominal" />
              <DiagnosticLine label="Active Signals" value={loading ? "Scanning..." : `${activeMissions} Sectors`} />
              <DiagnosticLine label="Neural Engine" value="Gemini-3.0" colorClass="text-blue-500" />
              <DiagnosticLine label="Encryption" value="AES-256-GCM" colorClass="text-emerald-500" />
              <DiagnosticLine label="Signal Latency" value="12ms" />
            </div>
            
            <button 
              onClick={() => loadIntel(true)}
              disabled={loading}
              className="mt-8 w-full btn-tactical py-3 rounded-sm flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
            >
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Re-Scan Sector
            </button>
          </div>

          <div className="hud-card p-6 rounded-xl bg-rose-600/5 border-rose-500/10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              <h3 className="font-rajdhani font-black text-slate-900 dark:text-white uppercase tracking-widest">Protocol</h3>
            </div>
            <p className="text-[10px] text-slate-500 font-mono-tech leading-relaxed uppercase">
              BattleClock serves as a unified command terminal for mobile esports deployments. Information is verified via neural search grounding and Krafton-official telemetry.
            </p>
          </div>
        </div>

        {/* Right Column: AI Briefing */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hud-card p-8 rounded-xl min-h-[300px] flex flex-col relative overflow-hidden bg-slate-950">
            {/* Animated CRT Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
                <h2 className="text-xl font-black font-rajdhani text-white uppercase tracking-[0.2em]">Situational Report</h2>
              </div>
              <div className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded text-[8px] font-black text-rose-500 uppercase tracking-widest">
                LIVE INTEL
              </div>
            </div>

            <div className="flex-grow font-mono-tech text-xs md:text-sm text-rose-100/80 leading-relaxed uppercase tracking-widest relative z-10">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-white/5 w-full animate-pulse"></div>
                  <div className="h-4 bg-white/5 w-1/2 animate-pulse"></div>
                  <span className="text-rose-500 animate-pulse text-[10px]">SYNCING WITH SATELLITE ARRAY...</span>
                </div>
              ) : (
                <p className="animate-in fade-in duration-1000">
                  <span className="text-rose-500 mr-2">{'>'}</span>
                  {briefing}
                </p>
              )}
            </div>

            <div className="mt-12 flex justify-between items-end relative z-10">
               <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-1 ${i < 4 ? 'bg-rose-600' : 'bg-rose-600/20'}`} />
                    ))}
                  </div>
                  <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Neural Load Factor</span>
               </div>
               <Cpu className="w-8 h-8 text-rose-500/20" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="hud-card p-6 rounded-xl flex items-start gap-4 hover:border-rose-500/40 transition-colors cursor-pointer group">
              <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-rose-500/10 transition-colors">
                <Server className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h4 className="font-rajdhani font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1 text-sm">Data Integrity</h4>
                <p className="text-[10px] text-slate-500 uppercase font-mono-tech leading-tight">Syncing with 48 globally distributed satellite sectors.</p>
              </div>
            </div>
            <div className="hud-card p-6 rounded-xl flex items-start gap-4 hover:border-rose-500/40 transition-colors cursor-pointer group">
              <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-rose-500/10 transition-colors">
                <Zap className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h4 className="font-rajdhani font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1 text-sm">Core Speed</h4>
                <p className="text-[10px] text-slate-500 uppercase font-mono-tech leading-tight">Ultra-low latency split-flap hardware rendering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="bg-rose-600 p-8 md:p-12 rounded-[2rem] text-white overflow-hidden relative shadow-2xl shadow-rose-600/20">
        <div className="relative z-10">
          <h2 className="text-3xl font-black font-rajdhani mb-6 uppercase tracking-tighter">Command Unit Reach</h2>
          <p className="mb-8 text-white/90 max-w-lg font-mono-tech text-xs uppercase tracking-widest leading-relaxed">
            BattleClock is an open-source tactical project. Direct telemetry and mission feedback can be transmitted via the following encrypted channels.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
            >
              <Github className="w-4 h-4" /> UPLOAD_INTEL
            </a>
            <a 
              href="mailto:princekumar.prog@gmail.com?subject=Mission Briefing Request" 
              className="flex items-center gap-2 px-8 py-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform border border-white/10"
            >
              <Mail className="w-4 h-4" /> MSG_COMMAND
            </a>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 blur-3xl"></div>
      </div>
      
      <footer className="mt-16 text-center text-slate-500 font-mono-tech text-[8px] uppercase tracking-[0.5em]">
        © 2026 BattleClock // Mission Sync System // Sector 7G
      </footer>
    </div>
  );
};

export default About;
