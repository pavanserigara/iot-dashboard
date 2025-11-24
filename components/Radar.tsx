import React, { useEffect, useState, useRef } from 'react';
import { RadarBlip } from '../types';

const Radar: React.FC<{ active: boolean }> = ({ active }) => {
  const [blips, setBlips] = useState<RadarBlip[]>([]);

  // Generate random blips periodically
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      // Add a new blip occasionally
      if (Math.random() > 0.7) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 0.8 + 0.1; 
        const types: RadarBlip['type'][] = ['FRIENDLY', 'HOSTILE', 'UNKNOWN', 'HOSTILE'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const newBlip: RadarBlip = {
          id: Math.random().toString(36),
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          type,
          distance
        };
        
        setBlips(prev => [...prev.slice(-12), newBlip]); 
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto border-2 border-emerald-900 rounded-full bg-black/60 overflow-hidden shadow-[0_0_20px_rgba(22,163,74,0.2)]">
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-600"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-emerald-600"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-emerald-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border border-emerald-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 border border-emerald-600 rounded-full"></div>
      </div>

      {/* Sweep */}
      <div className="absolute inset-0 rounded-full radar-sweep origin-center"></div>

      {/* Blips */}
      {blips.map(blip => {
         let color = 'bg-orange-500'; // Unknown = Saffron
         let shadow = 'shadow-[0_0_8px_rgba(249,115,22,0.8)]';

         if (blip.type === 'FRIENDLY') {
            color = 'bg-emerald-500'; // Friendly = Green
            shadow = 'shadow-[0_0_8px_rgba(16,185,129,0.8)]';
         }
         if (blip.type === 'HOSTILE') {
            color = 'bg-red-600'; // Hostile = Red
            shadow = 'shadow-[0_0_8px_rgba(220,38,38,0.8)]';
         }

         return (
           <div
             key={blip.id}
             className={`absolute w-3 h-3 rounded-full ${color} ${shadow} animate-ping`}
             style={{
               top: `${(blip.y + 1) * 50}%`,
               left: `${(blip.x + 1) * 50}%`,
               transform: 'translate(-50%, -50%)',
               animationDuration: '2.5s'
             }}
           />
         );
      })}
      
      {/* Static Blips */}
      {blips.map(blip => {
         let color = 'bg-orange-500';
         if (blip.type === 'FRIENDLY') color = 'bg-emerald-500';
         if (blip.type === 'HOSTILE') color = 'bg-red-600';

         return (
           <div
             key={`static-${blip.id}`}
             className={`absolute w-1.5 h-1.5 rounded-full ${color}`}
             style={{
               top: `${(blip.y + 1) * 50}%`,
               left: `${(blip.x + 1) * 50}%`,
               transform: 'translate(-50%, -50%)'
             }}
           />
         );
      })}

      <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-emerald-500 font-mono tracking-widest bg-black/50">
        RANGE: 120KM // SECTOR: NORTH
      </div>
    </div>
  );
};

export default Radar;