
import React from 'react';
import { EventType } from '../types';
import { Search, Filter, X, Crosshair } from 'lucide-react';

interface FiltersProps {
  search: string;
  setSearch: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  clearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  search, 
  setSearch, 
  selectedType, 
  setSelectedType,
  clearFilters
}) => {
  const eventTypes = Object.values(EventType);

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 shadow-2xl backdrop-blur-md mb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-rose-500 transition-colors" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SCAN FOR UPDATES OR SEASONS..."
            className="w-full pl-12 pr-6 py-4 bg-slate-950/60 border border-white/5 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 outline-none transition-all text-sm font-bold tracking-widest uppercase placeholder:text-slate-600 text-white"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="hidden xl:flex items-center gap-2 text-slate-500 mr-2">
            <Crosshair className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Target Sector:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                selectedType === 'all'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-600/10'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
              }`}
            >
              ALL
            </button>
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  selectedType === type
                    ? 'bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-600/10'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {(search || selectedType !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              <X className="w-4 h-4" />
              WIPE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
