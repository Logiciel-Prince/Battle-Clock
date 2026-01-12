
import React from 'react';

interface AdSpaceProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

/**
 * AdSpace Component
 * Provides a tactical HUD container for Google AdSense.
 * The CSS in index.html ensures the container disappears if AdSense fails to load content.
 */
const AdSpace: React.FC<AdSpaceProps> = ({ slot, format = 'auto', className = "" }) => {
  return (
    <div className={`ad-container hud-card rounded-lg overflow-hidden my-8 w-full transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <span className="text-[8px] font-mono-tech font-bold text-slate-600 tracking-widest uppercase">Sponsored Data Stream</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-rose-500/30 rounded-full" />
          <div className="w-1 h-1 bg-rose-500/30 rounded-full" />
        </div>
      </div>
      <div className="p-4 flex justify-center bg-black/20">
        <ins className="adsbygoogle"
             style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
             data-ad-client="ca-pub-YOUR_CLIENT_ID" // Replace with actual client ID
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive="true">
        </ins>
      </div>
      <div className="flex items-center justify-between px-4 py-1 border-t border-white/5 bg-white/[0.01]">
        <span className="text-[7px] font-mono-tech text-slate-700 uppercase tracking-tighter">End of transmission</span>
      </div>
    </div>
  );
};

export default AdSpace;
