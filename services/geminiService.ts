
import { GoogleGenAI, Type } from "@google/genai";

export type IntentCategory = 'INFO' | 'CAUTION' | 'TRUSTED' | 'POISON' | 'NEW' | 'SPOOF';

export interface ThreatAnalysisResponse {
  riskScore: number;
  threatCategory: string;
  intentState: IntentCategory; 
  similarityIndex: number;
  reasoning: string;
  advisory: string;
  isPoisoningAttempt: boolean;
  onChainAge: string;
  globalReputation: 'CLEAN' | 'FLAGGED' | 'UNKNOWN';
  mismatchDetails: {
    prefixMatch: boolean;
    suffixMatch: boolean;
    entropyCheck: string;
  };
  evidenceFlags: string[];
}

export interface CognitiveAutopsyResponse {
  autopsy: string;
  visualAnchor: string;
  deceptionRating: number;
  biologicalVulnerability: string;
}

export interface ReputationSynthesisResponse {
  reputationScore: number; // 0-100, where 100 is perfectly safe
  synthesis: string;
  sentinelSignals: {
    label: string;
    value: string;
    state: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
  verdict: string;
}

export const analyzeSecurityIntent = async (
  currentAddress: string, 
  historicalAddress: string,
  sourceContext: string = 'UNKNOWN'
): Promise<ThreatAnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      VIGIL LAYER INTEL UNIT. ANALYZE AND CATEGORIZE. 
      CONTEXT: "${sourceContext}"
      HIST_ADDR: "${historicalAddress}"
      CURR_ADDR: "${currentAddress}"
    `,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: { type: Type.NUMBER },
          threatCategory: { type: Type.STRING },
          intentState: { type: Type.STRING, enum: ['INFO', 'CAUTION', 'TRUSTED', 'POISON', 'NEW', 'SPOOF'] },
          similarityIndex: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          advisory: { type: Type.STRING },
          isPoisoningAttempt: { type: Type.BOOLEAN },
          onChainAge: { type: Type.STRING },
          globalReputation: { type: Type.STRING, enum: ['CLEAN', 'FLAGGED', 'UNKNOWN'] },
          mismatchDetails: {
            type: Type.OBJECT,
            properties: {
              prefixMatch: { type: Type.BOOLEAN },
              suffixMatch: { type: Type.BOOLEAN },
              entropyCheck: { type: Type.STRING }
            },
            required: ["prefixMatch", "suffixMatch", "entropyCheck"]
          },
          evidenceFlags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["riskScore", "threatCategory", "intentState", "similarityIndex", "reasoning", "advisory", "isPoisoningAttempt", "onChainAge", "globalReputation", "mismatchDetails", "evidenceFlags"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini Parse Error:", e);
    throw new Error("Failed to parse security analysis");
  }
};

export const generateCognitiveAutopsy = async (
  realAddress: string,
  chosenAddress: string
): Promise<CognitiveAutopsyResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      VIGIL FORENSICS UNIT. PERFORM COGNITIVE AUTOPSY ON A FAILED HUMAN VERIFICATION.
      
      The user was challenged to find the REAL address among POISON mimics. They chose the WRONG one.
      REAL_ADDR: "${realAddress}"
      CHOSEN_POI: "${chosenAddress}"

      TASK:
      1. Identify the exact character indices where the visual collision is most "High Fidelity" (e.g., matching prefix/suffix).
      2. Explain the "Biological Bypass" - why a human eye under stress (1.5s clock) would ignore the differences.
      3. Use institutional, slightly cold, clinical tone.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          autopsy: { type: Type.STRING, description: "A detailed breakdown of the psychological failure." },
          visualAnchor: { type: Type.STRING, description: "The specific character group that acted as a deceptive anchor." },
          deceptionRating: { type: Type.NUMBER, description: "Scale 0-100 of how perfect this mimicry is." },
          biologicalVulnerability: { type: Type.STRING, description: "The specific cognitive bias exploited (e.g. Saccadic Masking, Pavlovian Response)." }
        },
        required: ["autopsy", "visualAnchor", "deceptionRating", "biologicalVulnerability"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    console.error("Autopsy Parse Error:", e);
    throw new Error("Failed to generate autopsy");
  }
};

export const synthesizeAddressReputation = async (address: string): Promise<ReputationSynthesisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      VIGIL INTELLIGENCE FORGE. SYNTHESIZE REPUTATION PROFILE FOR SUBJECT ADDRESS.
      
      SUBJECT_ADDR: "${address}"

      TASK:
      1. Generate a "Reputation Score" based on hypothetical Sentinel Mesh data (0-100).
      2. Provide a "Synthesis" narrative explaining the address's standing in the ecosystem.
      3. Create 3 "Sentinel Signals" - specific data points (e.g. Activity Depth, Cluster Association, Protocol Interaction).
      4. Use a highly technical, cold, institutional tone.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reputationScore: { type: Type.NUMBER },
          synthesis: { type: Type.STRING },
          verdict: { type: Type.STRING },
          sentinelSignals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING },
                state: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] }
              },
              required: ["label", "value", "state"]
            }
          }
        },
        required: ["reputationScore", "synthesis", "verdict", "sentinelSignals"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    console.error("Reputation Synthesis Error:", e);
    throw new Error("Failed to synthesize reputation");
  }
};
