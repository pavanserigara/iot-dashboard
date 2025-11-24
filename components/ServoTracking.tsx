import React, { useEffect, useState } from 'react';
import { Target } from 'lucide-react';

const ServoTracking: React.FC = () => {
  const [azimuth, setAzimuth] = useState(0);
  const [elevation, setElevation] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random servo movement
      setAzimuth(prev => (prev + (Math.random() * 20 - 10)) % 360);
      setElevation(prev => {
         const next = prev + (Math.random() * 10 - 5);
         return Math.max(0, Math.min(90, next));
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/50 border border-emerald-900 p-4 font-mono text-xs backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-bold tracking-widest">SERVO TRACKING</span>
        <Target className="w-4 h-4 text-orange-500 animate-pulse" />
      </div>
      
      <div className="space-y-4">
        {/* Azimuth Bar */}
        <div>
          <div className="flex justify-between text-emerald-500/80 mb-1">
            <span>AZIMUTH</span>
            <span>{Math.abs(azimuth).toFixed(1)}°</span>
          </div>
          <div className="w-full h-2 bg-emerald-950/50 relative overflow-hidden border border-emerald-900/50">
            <div 
              className="absolute h-full w-2 bg-orange-500 transition-all duration-500 ease-out"
              style={{ left: `${((azimuth + 180) / 360) * 100}%` }}
            />
            {/* Ticks */}
            <div className="absolute inset-0 flex justify-between px-1">
               {[...Array(5)].map((_, i) => <div key={i} className="w-px h-full bg-emerald-800"></div>)}
            </div>
          </div>
        </div>

        {/* Elevation Bar */}
        <div>
          <div className="flex justify-between text-emerald-500/80 mb-1">
            <span>ELEVATION</span>
            <span>{elevation.toFixed(1)}°</span>
          </div>
          <div className="w-full h-2 bg-emerald-950/50 relative border border-emerald-900/50">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${(elevation / 90) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-emerald-950/30 p-2 text-center border border-emerald-900">
                <span className="block text-[9px] text-emerald-500">LOCK STATUS</span>
                <span className="text-white font-bold">ACQUIRED</span>
            </div>
            <div className="bg-emerald-950/30 p-2 text-center border border-emerald-900">
                <span className="block text-[9px] text-emerald-500">SIGNAL</span>
                <span className="text-orange-500 font-bold">-42dBm</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServoTracking;