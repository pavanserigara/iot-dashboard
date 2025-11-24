import React from 'react';

const IntelTicker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-black/90 border-t border-emerald-800 flex items-center overflow-hidden z-40">
      <div className="flex items-center px-4 bg-emerald-900/50 h-full border-r border-emerald-700 z-10 shrink-0">
         <span className="text-orange-500 font-bold text-xs uppercase tracking-widest whitespace-nowrap">LIVE INTEL</span>
      </div>
      <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex items-center">
         <span className="mx-4 text-emerald-400 text-xs tracking-wider">/// NETWORK SECURE ///</span>
         <span className="mx-4 text-slate-300 text-xs tracking-wider">SAT-RECON: ORBIT 451 COMPLETE</span>
         <span className="mx-4 text-orange-400 text-xs tracking-wider">/// ALERT: UNKNOWN SIGNAL SECTOR 9 ///</span>
         <span className="mx-4 text-slate-300 text-xs tracking-wider">AI DIAGNOSTICS: OPTIMAL</span>
         <span className="mx-4 text-emerald-400 text-xs tracking-wider">/// CYBER GRID: NO BREACHES DETECTED ///</span>
         <span className="mx-4 text-slate-300 text-xs tracking-wider">DRONE SQUADRON: IN FLIGHT</span>
         <span className="mx-4 text-orange-400 text-xs tracking-wider">/// THREAT LEVEL: MONITORING ///</span>
         <span className="mx-4 text-white text-xs tracking-wider">JAI HIND</span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default IntelTicker;