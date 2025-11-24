import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Radar from './components/Radar';
import AlertFeed from './components/AlertFeed';
import CyberMap from './components/CyberMap';
import ServoTracking from './components/ServoTracking';
import CameraFeed from './components/CameraFeed';
import ModalWarning from './components/ModalWarning';
import MatrixRain from './components/MatrixRain';
import IntelTicker from './components/IntelTicker';
import { fetchIntelligenceReport } from './services/geminiService';
import { LogEntry, ThreatScenario } from './types';
import { BrainCircuit, Play, Zap } from 'lucide-react';

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', timestamp: '08:42:12', message: 'Command Center Online.', type: 'INFO' },
  { id: '2', timestamp: '08:42:15', message: 'Himalayan Sensor Grid: Active', type: 'INFO' },
  { id: '3', timestamp: '08:42:30', message: 'Establishing secure link to GSAT-7A.', type: 'CYBER' },
];

export default function App() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [activeScenario, setActiveScenario] = useState<ThreatScenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Background ambiance log generation
  useEffect(() => {
    const interval = setInterval(() => {
      const routineMessages = [
         "Monitoring Sector 4 (Ladakh)...",
         "Decryption routine running...",
         "Servo motor cooling active.",
         "Packet rerouting via Node Delhi-01...",
         "Background radiation normal."
      ];
      const msg = routineMessages[Math.floor(Math.random() * routineMessages.length)];
      addLog({ message: msg, type: 'INFO' });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setLogs(prev => {
      const newLog = {
        ...entry,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
      };
      // Keep only the last 15 logs to create a rolling list effect where the top item disappears
      return [...prev, newLog].slice(-15); 
    });
  };

  const handleRunSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    addLog({ message: "INITIATING TACTICAL AI SCENARIO...", type: 'INFO' });

    try {
      const report = await fetchIntelligenceReport();
      
      report.logs.forEach((log, index) => {
        setTimeout(() => {
          addLog(log);
        }, index * 800);
      });

      setTimeout(() => {
        setActiveScenario(report.scenario);
        addLog({ message: `THREAT DETECTED: ${report.scenario.codename}`, type: 'CRITICAL' });
      }, report.logs.length * 800 + 1000);

    } catch (e) {
      addLog({ message: "SIMULATION ERROR. RETRY UPLINK.", type: 'WARNING' });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col font-mono selection:bg-orange-500/30 overflow-hidden">
      {/* Background Layer */}
      <MatrixRain />
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen pb-10">
        <Header />

        <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* LEFT COLUMN: VISUAL SENSORS */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            
            {/* Radar Module */}
            <div className="bg-black/40 p-4 border border-emerald-800/50 relative group backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-1">
                 <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
              </div>
              <h3 className="text-emerald-500 text-sm font-bold mb-4 tracking-widest flex items-center">
                <span className="w-2 h-2 bg-emerald-500 mr-2 rounded-full animate-pulse"></span>
                ACTIVE RADAR (AESA)
              </h3>
              <Radar active={true} />
              
              {/* Chakra Decoration */}
              <div className="absolute bottom-2 right-2 opacity-20">
                 <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                 </div>
              </div>
            </div>

            {/* Servo Module */}
            <ServoTracking />
            
          </div>

          {/* MIDDLE COLUMN: MAIN INTEL */}
          <div className="md:col-span-6 flex flex-col space-y-4">
            
            {/* Camera Feed */}
            <div className="relative shadow-[0_0_15px_rgba(255,153,51,0.1)]">
               <div className="absolute -top-2 left-4 px-2 bg-black text-[10px] text-white border border-emerald-800 z-20 flex items-center">
                 <Zap className="w-3 h-3 text-orange-500 mr-1" /> OPTICAL FEED
               </div>
               <CameraFeed />
            </div>

            {/* Cyber Map */}
            <div className="flex-1 min-h-[250px] relative">
              <div className="absolute -top-2 left-4 px-2 bg-black text-[10px] text-white border border-emerald-800 z-20">NET_WARFARE_GRID</div>
              <CyberMap />
            </div>

            {/* Simulation Controls */}
            <div className="bg-emerald-950/20 p-4 border-t border-b border-emerald-500/30 flex items-center justify-between backdrop-blur-sm">
               <div>
                  <h4 className="text-sm font-bold text-white font-rajdhani">WARGAME SCENARIO GENERATOR</h4>
                  <p className="text-[10px] text-emerald-400">Generate fictional tactical scenarios via Gemini 2.5</p>
               </div>
               <button
                 onClick={handleRunSimulation}
                 disabled={isSimulating}
                 className={`flex items-center space-x-2 px-6 py-2 font-bold uppercase tracking-wider transition-all duration-300 clip-path-button
                   ${isSimulating 
                     ? 'bg-emerald-900/50 text-emerald-700 cursor-not-allowed border border-emerald-800' 
                     : 'bg-orange-600/20 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                   }
                 `}
               >
                 {isSimulating ? (
                   <BrainCircuit className="w-5 h-5 animate-spin" />
                 ) : (
                   <Play className="w-5 h-5" />
                 )}
                 <span>{isSimulating ? 'SIMULATING...' : 'INITIATE'}</span>
               </button>
            </div>

          </div>

          {/* RIGHT COLUMN: LOGS & STATUS - Fixed height to prevent page growth */}
          <div className="md:col-span-3 h-[650px] flex flex-col space-y-4">
            <AlertFeed logs={logs} />
            
            <div className="p-4 border border-emerald-800 bg-black/40 shrink-0">
                <div className="text-xs text-slate-400 mb-2">SYSTEM STATUS</div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-emerald-900/30 p-2 text-center">
                        <div className="text-[10px] text-emerald-500">DEFCON</div>
                        <div className="text-white font-bold text-lg">4</div>
                    </div>
                    <div className="bg-orange-900/30 p-2 text-center">
                        <div className="text-[10px] text-orange-500">THREAT</div>
                        <div className="text-white font-bold text-lg">ELEV</div>
                    </div>
                </div>
            </div>
          </div>

        </main>
      </div>

      <IntelTicker />

      {/* Modal Overlay for Threats */}
      <ModalWarning 
        scenario={activeScenario} 
        onClose={() => setActiveScenario(null)} 
      />
    </div>
  );
}