
import { GoogleGenAI, Type } from "@google/genai";
import { BrandProfile } from "../types";

// Always initialize with the named parameter 'apiKey' and use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeBrandingFromImage = async (base64Image: string): Promise<BrandProfile> => {
  // Define image and text parts separately as per standard multi-modal usage.
  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image.split(',')[1] || base64Image,
    },
  };
  const textPart = {
    text: "Analise este retrato para um branding de alta performance da 'Assessoria Omega'. Vibe: Liderança técnica avançada, futurista, design de alto QI, preciso. A cor da marca é um Teal vibrante (#00cfc1). Crie uma 'Identidade Alvo' para esta pessoa como um fundador visionário ou diretor criativo. Responda em PORTUGUÊS. Retorne JSON: name (persona visionária), tagline (focada em escala/velocidade), personality (3 traços de personalidade técnicos), primaryColor (sempre #00cfc1), brandAttributes (4 palavras-chave premium), e bio (bio autoritária e técnica destacando sua capacidade única de escala nível Omega).",
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          tagline: { type: Type.STRING },
          personality: { type: Type.STRING },
          primaryColor: { type: Type.STRING },
          brandAttributes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          bio: { type: Type.STRING },
        },
        required: ["name", "tagline", "personality", "primaryColor", "brandAttributes", "bio"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Sem resposta do motor de telemetria da IA.");
  return JSON.parse(text.trim());
};
