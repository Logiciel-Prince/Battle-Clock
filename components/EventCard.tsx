
import React, { useState, useEffect, memo, useRef } from 'react';
import { EsportsEvent, EventStatus } from '../types';
import { getCountdown, getEventStatus, formatDateTime } from '../utils/timeHelpers';
import { ExternalLink, Clock, Zap, Trophy, Shield, Target, MapPin, ChevronRight, FileText } from 'lucide-react';

const padStart = (number: number): string => {
  return number.toString().padStart(2, '0');
};

const FlipUnit = memo(({ value, label }: { value: number, label: string }) => {
  const [currentDisplay, setCurrentDisplay] = useState(value);
  const [nextDisplay, setNextDisplay] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setNextDisplay(value);
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setCurrentDisplay(value);
      }, 600);

      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const digitClass = "digit-container text-4xl sm:text-6xl lg:text-7xl tracking-tighter";

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="flip-card-unit perspective preserve-3d">
        <div className="flip-section top">
          <div className={digitClass}>
            {padStart(nextDisplay)}
          </div>
        </div>
        <div className="flip-section bottom">
          <div className={digitClass}>
            {padStart(currentDisplay)}
          </div>
        </div>
        <div className={`flip-leaf preserve-3d ${isFlipping ? 'animate' : ''}`}>
          <div className="leaf-side leaf-front">
            <div className={digitClass}>
              {padStart(currentDisplay)}
            </div>
          </div>
          <div className="leaf-side leaf-back">
            <div className={digitClass}>
              {padStart(nextDisplay)}
            </div>
          </div>
        </div>
        <div className="hinge-line" />
      </div>
      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.4em] mt-4 text-slate-500 dark:text-slate-500 font-mono-tech">
        {label}
      </span>
    </div>
  );
});

const EventCard: React.FC<{ event: EsportsEvent }> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState(getCountdown(event.startDateTime));
  const status = getEventStatus(event.startDateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(event.startDateTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [event.startDateTime]);

  const isBgmi = event.game === 'BGMI';

  return (
    <div className="group hud-card rounded-xl transition-all duration-500 flex flex-col h-full shadow-2xl">
      {/* HUD Header Strip */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status === EventStatus.LIVE ? 'bg-rose-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-700'}`} />
          <span className="text-[10px] font-mono-tech font-bold text-slate-500 dark:text-slate-400 tracking-wider">REF_ID: {event.id.toUpperCase().slice(0, 8)}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] font-mono-tech text-slate-500 uppercase tracking-widest">Signal: Stable</span>
        </div>
      </div>

      <div className="p-8 sm:p-10 flex flex-col flex-grow card-content">
        {/* Main Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] ${
              isBgmi ? 'bg-orange-600/10 text-orange-600 dark:text-orange-500 border border-orange-500/20' : 'bg-yellow-600/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20'
            }`}>
              <Shield className="w-3 h-3" />
              {event.game} UNIT
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-rajdhani tracking-tighter leading-none group-hover:text-rose-500 transition-colors duration-300 uppercase">
              {event.eventName}
            </h3>
            {event.version && (
                <div className="text-[10px] text-slate-500 font-mono-tech uppercase tracking-widest">VERSION BLOCK: {event.version}</div>
            )}
          </div>
          
          <div className={`self-start px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border ${
            status === EventStatus.LIVE 
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/40 animate-pulse' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5'
          }`}>
            {status}
          </div>
        </div>

        {/* Description & Intelligence */}
        <p className="text-slate-600 dark:text-slate-400 text-xs font-mono-tech leading-relaxed uppercase tracking-wider mb-8 border-l-2 border-rose-500/30 pl-4">
          {event.description}
        </p>

        {/* HERO COUNTDOWN UNIT */}
        <div className="mb-12 w-full p-6 bg-slate-900 border border-slate-200 dark:border-white/5 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--accent) 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
          
          {status === EventStatus.COMPLETED ? (
            <div className="py-14 flex flex-col items-center justify-center gap-4 text-center">
              <Trophy className="w-12 h-12 text-slate-700 dark:text-slate-800" />
              <div className="space-y-1">
                <span className="text-slate-400 font-black font-mono-tech uppercase tracking-[0.4em] text-sm block">PHASE_TERMINATED</span>
                <p className="text-slate-600 text-[10px] font-medium tracking-widest">ALL OBJECTIVES ACHIEVED</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full relative z-10">
              <FlipUnit label="DAYS" value={timeLeft.days} />
              <FlipUnit label="HOURS" value={timeLeft.hours} />
              <FlipUnit label="MINS" value={timeLeft.minutes} />
              <FlipUnit label="SECS" value={timeLeft.seconds} />
            </div>
          )}
        </div>

        {/* Sources / Intelligence grounding */}
        {event.sources && event.sources.length > 0 && (
          <div className="mb-10 space-y-3">
             <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <FileText className="w-3 h-3" />
                INTELLIGENCE SOURCES
             </div>
             <div className="flex flex-wrap gap-2">
                {event.sources.slice(0, 3).map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[9px] font-mono-tech text-rose-600 dark:text-rose-400 hover:text-rose-500 dark:hover:text-rose-300 underline decoration-rose-500/30 underline-offset-4"
                  >
                    [{source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}]
                  </a>
                ))}
             </div>
          </div>
        )}

        {/* Intelligence Data Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-lg flex items-center gap-4">
                <Target className="w-5 h-5 text-rose-500 opacity-70" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">DEPLOYMENT</span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono-tech">{formatDateTime(event.startDateTime).split(',')[1]}</span>
                </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-lg flex items-center gap-4">
                <Clock className="w-5 h-5 text-rose-500 opacity-70" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">SECTOR DATE</span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono-tech">{formatDateTime(event.startDateTime).split(',')[0]}</span>
                </div>
            </div>
        </div>

        {/* Action Bar */}
        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Global Sync</span>
            </div>
            
            <button className="btn-tactical px-8 py-3.5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 active:scale-95">
              INITIATE SYNC
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
