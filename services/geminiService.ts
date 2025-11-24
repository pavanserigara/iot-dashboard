import { GoogleGenAI, Type, SchemaParams } from "@google/genai";
import { LogEntry, ThreatScenario } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LOG_ENTRY_SCHEMA: SchemaParams = {
  type: Type.OBJECT,
  properties: {
    logs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING },
          type: { type: Type.STRING, enum: ['INFO', 'WARNING', 'CRITICAL', 'CYBER'] }
        },
        required: ['message', 'type']
      }
    },
    scenario: {
      type: Type.OBJECT,
      properties: {
        codename: { type: Type.STRING },
        threatLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
        description: { type: Type.STRING },
      },
      required: ['codename', 'threatLevel', 'description']
    }
  },
  required: ['logs', 'scenario']
};

export const fetchIntelligenceReport = async (): Promise<{ logs: Omit<LogEntry, 'id' | 'timestamp'>[], scenario: ThreatScenario }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a fictional futuristic Indian Army intelligence report. 
      Context: High-tech cyber command monitoring borders (Himalayas, Indian Ocean).
      Include a list of 5 short, terse system logs (mix of cyber anomalies, satellite recon, and border drone detections). 
      Use code names inspired by Indian mythology or nature (e.g., Garuda, Vajra, Indra, Monsoon, Tiger).
      Also include one main active Threat Scenario with a cool sci-fi codename.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: LOG_ENTRY_SCHEMA,
      },
    });

    const json = JSON.parse(response.text || "{}");
    
    // Fallback if parsing fails or structure is wrong
    if (!json.logs || !json.scenario) {
      throw new Error("Invalid response format");
    }

    return {
      logs: json.logs,
      scenario: {
        ...json.scenario,
        detectedAt: new Date().toLocaleTimeString(),
      }
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data
    return {
      logs: [
        { message: "Satellite Uplink GSAT-7A unstable", type: "WARNING" },
        { message: "Encrypted burst from Sector Ladakh", type: "CYBER" },
      ],
      scenario: {
        codename: "OPERATION MEGHDOOT II",
        threatLevel: "MEDIUM",
        description: "Unidentified aerial phenomenon tracking over Northern Glacier.",
        detectedAt: new Date().toLocaleTimeString()
      }
    };
  }
};