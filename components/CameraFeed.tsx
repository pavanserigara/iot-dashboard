import React from 'react';
import { Crosshair, Scan } from 'lucide-react';

const CameraFeed: React.FC = () => {
  return (
    <div className="relative h-64 border border-emerald-800 bg-black overflow-hidden group">
      {/* Background Image (Placeholder) */}
      <img 
        src="https://picsum.photos/600/400?grayscale" 
        alt="Surveillance Feed" 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-all duration-700"
      />
      
      {/* Color Overlay */}
      <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay pointer-events-none"></div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
            <div className="bg-black/70 px-2 py-1 text-[10px] text-orange-500 border border-orange-900 font-bold">
                DRONE_IND_04 // LIVE
            </div>
            <div className="flex flex-col items-end">
                <div className="bg-black/70 px-2 py-1 text-[10px] text-emerald-500 border border-emerald-900 mb-1">
                    ENC: AES-256
                </div>
                <div className="bg-red-900/80 px-2 py-1 text-[10px] text-white font-bold animate-pulse">
                    REC ●
                </div>
            </div>
        </div>

        {/* Center Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Crosshair className="w-16 h-16 text-white/40 stroke-1" />
            <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-emerald-500/20 animate-[spin_8s_linear_infinite]" />
        </div>

        {/* Tracking Box */}
        <div className="absolute top-1/3 left-1/3 w-20 h-20 border-2 border-orange-500/60 corner-box">
             <div className="absolute -top-4 left-0 text-[9px] bg-orange-600 text-black px-1 font-bold">UNKNOWN VECTOR</div>
             <div className="absolute -bottom-4 right-0 text-[9px] text-orange-400 font-mono">DIST: 400m</div>
        </div>

        <div className="flex justify-between items-end">
            <div className="text-[9px] text-emerald-600 font-mono font-bold">
                LAT: 34.0837 N <br/>
                LON: 74.7973 E
            </div>
            <div className="text-[9px] text-white font-mono text-right">
                ALT: 12,000 FT <br/>
                SPEED: 320 KTS
            </div>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
    </div>
  );
};

export default CameraFeed;