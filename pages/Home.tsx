
import React, { useMemo, useEffect, useState } from 'react';
import { EsportsEvent, GameType } from '../types';
import EventCard from '../components/EventCard';
import AdSpace from '../components/AdSpace';
import { fetchRealEvents } from '../services/eventService';
import { Loader2, Zap, AlertTriangle } from 'lucide-react';

interface HomeProps {
  gameFilter?: GameType;
}

const Home: React.FC<HomeProps> = ({ gameFilter }) => {
  const [events, setEvents] = useState<EsportsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const realData = await fetchRealEvents();
        if (realData.length === 0) {
           setError("Unable to establish satellite uplink. Satellite array returned zero signals.");
        } else {
           setEvents(realData);
        }
      } catch (err) {
        setError("Uplink failed. Critical interference detected in the communication channel.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      return !gameFilter || event.game === gameFilter;
    }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  }, [events, gameFilter]);

  if (loading) {
    return (
        <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-12">
                <div className="w-24 h-24 border-t-4 border-rose-600 border-solid rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-rose-500 animate-pulse" />
                </div>
            </div>
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-black font-rajdhani text-slate-900 dark:text-white uppercase tracking-[0.3em] animate-pulse">
                    Scanning Frequencies
                </h2>
                <div className="flex flex-col gap-2 font-mono-tech text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>{">"} ESTABLISHING SECURE CONNECTION...</span>
                    <span>{">"} DECRYPTING SATELLITE INTEL...</span>
                    <span>{">"} SYNCING BATTLE CLOCKS...</span>
                </div>
            </div>
        </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
        <div className="inline-flex p-6 bg-rose-500/10 border border-rose-500/20 rounded-full mb-8">
          <AlertTriangle className="w-12 h-12 text-rose-500" />
        </div>
        <h2 className="text-3xl font-black font-rajdhani text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-4">Signal Lost</h2>
        <p className="max-w-md mx-auto text-slate-500 font-mono-tech text-xs leading-relaxed uppercase tracking-widest mb-12">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-tactical px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm"
        >
          Retry Scan
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24">
      {/* Dynamic Hero Section */}
      <section className="mb-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 bg-rose-500/5 border border-rose-500/10 rounded-full shadow-2xl backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-rose-500 text-[9px] font-black uppercase tracking-[0.5em] font-mono-tech">Live Sync: Active</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white font-rajdhani tracking-tighter mb-8 leading-[0.9] uppercase">
          Tactical <br/> <span className="text-rose-600">Deployments</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base font-medium leading-relaxed tracking-widest uppercase font-mono-tech">
          Real-time official mission synchronization for BGMI & PUBG sectors.
        </p>
      </section>

      {/* Top Ad Slot */}
      <div className="max-w-4xl mx-auto mb-16">
        <AdSpace slot="top_banner_id" format="auto" />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredEvents.map((event, index) => (
            <React.Fragment key={event.id}>
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                <EventCard event={event} />
              </div>
              {/* Mid-feed Ad Slot - Appear after the first 2 cards on mobile or 2nd card on desktop */}
              {index === 1 && filteredEvents.length > 2 && (
                <div className="lg:col-span-2 animate-in fade-in duration-1000">
                  <AdSpace slot="mid_feed_id" format="fluid" className="max-w-4xl mx-auto" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-40 border border-dashed border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-sm">
          <div className="text-6xl mb-8 opacity-20">📡</div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 font-rajdhani uppercase tracking-[0.3em]">Sector Zero</h3>
          <p className="text-slate-500 text-sm mb-12 font-medium tracking-widest font-mono-tech uppercase">No active match signals detected in this range.</p>
        </div>
      )}

      {/* Footer Ad Slot */}
      {filteredEvents.length > 0 && (
        <div className="max-w-4xl mx-auto mt-20">
          <AdSpace slot="bottom_banner_id" format="auto" />
        </div>
      )}
      
      {/* Tactical Footer Overlay */}
      <div className="mt-32 pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 dark:text-slate-700 font-mono-tech">
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Auth_Status: Cleared</span>
        <div className="flex gap-8">
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Lat: 35.6895</span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Long: 139.6917</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Core_Ver: 4.2.0-TAC</span>
      </div>
    </main>
  );
};

export default Home;
