import React from 'react';
import { AlertTriangle, XOctagon } from 'lucide-react';
import { ThreatScenario } from '../types';

interface ModalWarningProps {
  scenario: ThreatScenario | null;
  onClose: () => void;
}

const ModalWarning: React.FC<ModalWarningProps> = ({ scenario, onClose }) => {
  if (!scenario) return null;

  const colorClass = scenario.threatLevel === 'CRITICAL' ? 'text-red-500 border-red-500' : 'text-orange-500 border-orange-500';
  const bgClass = scenario.threatLevel === 'CRITICAL' ? 'bg-red-950/95' : 'bg-orange-950/95';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative max-w-xl w-full border-4 ${colorClass} ${bgClass} p-8 shadow-[0_0_100px_rgba(0,0,0,0.9)]`}>
        
        {/* Top Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
            <div className="flex-1 bg-orange-500"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-green-600"></div>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-6 mt-4">
          <XOctagon className={`w-20 h-20 ${colorClass} animate-bounce`} />
          
          <h2 className={`text-4xl font-bold uppercase tracking-[0.2em] font-rajdhani ${colorClass}`}>
            {scenario.threatLevel} ALERT
          </h2>
          
          <div className="w-full h-px bg-white/20"></div>
          
          <div className="space-y-2">
            <p className="text-sm text-slate-400 uppercase tracking-widest">Target Classification</p>
            <p className="text-3xl font-mono text-white font-bold glow-text">
              {scenario.codename}
            </p>
          </div>

          <div className="text-lg text-slate-200 font-mono border-l-4 border-white/50 pl-6 text-left w-full bg-black/40 p-4 rounded-r">
            {scenario.description}
          </div>
          
          <div className="w-full pt-4">
             <button 
               onClick={onClose}
               className={`w-full py-4 px-6 font-bold uppercase tracking-widest border-2 hover:bg-white hover:text-black transition-colors ${colorClass} `}
             >
               ACKNOWLEDGE & ENGAGE
             </button>
          </div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
      </div>
    </div>
  );
};

export default ModalWarning;