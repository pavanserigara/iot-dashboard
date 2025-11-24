import React from 'react';
import { LogEntry } from '../types';
import { AlertTriangle, ShieldAlert, Terminal, Lock } from 'lucide-react';

interface AlertFeedProps {
  logs: LogEntry[];
}

const AlertFeed: React.FC<AlertFeedProps> = ({ logs }) => {
  return (
    <div className="h-full flex flex-col bg-black/60 border border-emerald-900/50 backdrop-blur-sm overflow-hidden">
      <div className="p-3 border-b border-emerald-900/50 bg-emerald-950/30 flex justify-between items-center shrink-0">
        <span className="text-xs font-bold text-white uppercase tracking-widest font-rajdhani">Live Intelligence Feed</span>
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-xs scrollbar-hide">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-2 border-l-2 border-emerald-900 pl-2 pb-1 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mt-0.5 shrink-0">
               {log.type === 'CRITICAL' && <AlertTriangle className="w-3 h-3 text-red-500" />}
               {log.type === 'WARNING' && <ShieldAlert className="w-3 h-3 text-orange-500" />}
               {log.type === 'CYBER' && <Lock className="w-3 h-3 text-blue-400" />}
               {log.type === 'INFO' && <Terminal className="w-3 h-3 text-emerald-500" />}
            </div>
            <div>
              <span className="text-emerald-700 mr-2 text-[10px]">[{log.timestamp}]</span>
              <span className={`${
                log.type === 'CRITICAL' ? 'text-red-400 font-bold' : 
                log.type === 'WARNING' ? 'text-orange-400' :
                log.type === 'CYBER' ? 'text-blue-300' :
                'text-slate-300'
              }`}>
                {log.message}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertFeed;