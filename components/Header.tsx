import React, { useState, useEffect } from 'react';
import { Wifi, Shield, Activity, Cpu } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative flex items-center justify-between px-6 py-4 border-b border-emerald-900/50 bg-black/60 backdrop-blur-md z-30">
      {/* Tricolor Accent Top */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="w-1/3 h-full bg-[#FF9933]"></div>
        <div className="w-1/3 h-full bg-white"></div>
        <div className="w-1/3 h-full bg-[#138808]"></div>
      </div>

      <div className="flex items-center space-x-4 mt-2">
        <div className="relative">
          <Cpu className="w-10 h-10 text-orange-500 animate-pulse" />
          <div className="absolute inset-0 border border-emerald-500 rounded animate-[spin_3s_linear_infinite] opacity-50"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-widest text-white font-rajdhani uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            INDIAN ARMY <span className="text-orange-500">CYBER</span> COMMAND
          </h1>
          <p className="text-xs text-emerald-500 tracking-[0.3em] uppercase">Integrated Defence Staff // Intelligence Grid</p>
        </div>
      </div>

      <div className="flex items-center space-x-12 mt-2">
        <div className="flex space-x-6 text-xs font-bold tracking-wider">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Wifi className="w-4 h-4" />
            <span>SAT: LINKED</span>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <Shield className="w-4 h-4" />
            <span>DEFENSE: TIER-1</span>
          </div>
          <div className="flex items-center space-x-2 text-orange-500">
             <Activity className="w-4 h-4" />
            <span>STATUS: ALERT</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-white font-rajdhani">{time.toLocaleTimeString()}</div>
          <div className="text-xs text-emerald-600 font-bold">{time.toLocaleDateString().toUpperCase()}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;