export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'CRITICAL' | 'CYBER';
}

export interface ThreatScenario {
  codename: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  detectedAt: string;
}

export interface RadarBlip {
  id: string;
  x: number;
  y: number;
  type: 'FRIENDLY' | 'HOSTILE' | 'UNKNOWN';
  distance: number;
}

export interface CyberNode {
  id: string;
  x: number;
  y: number;
  status: 'active' | 'compromised' | 'offline';
}

export interface CyberLink {
  source: string;
  target: string;
  activity: boolean;
}