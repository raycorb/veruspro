
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Eres CTE Pro-AI, un asistente de élite para el Código Técnico de la Edificación (España).
Tu objetivo es redactar memorias y justificaciones técnicas de alto nivel profesional.
REGLAS:
1. Usa lenguaje arquitectónico formal.
2. Cita SIEMPRE el artículo exacto (ej: DB-SI 3, Tabla 1.1).
3. Adapta tus respuestas al contexto del proyecto (Altura de evacuación, Uso, etc.).
4. Sé conciso pero exhaustivo en la justificación legal.
5. Formato: Usa Markdown con negritas para resaltar términos clave.
`;

export const getGeminiResponse = async (
  userPrompt: string, 
  history: Message[],
  projectContext?: string
): Promise<{ text: string; sources: string[] }> => {
  // Fixed: Create new GoogleGenAI instance right before making the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  const fullPrompt = projectContext 
    ? `CONTEXTO TÉCNICO:\n${projectContext}\n\nCONSULTA TÉCNICA:\n${userPrompt}`
    : userPrompt;

  contents.push({
    role: 'user',
    parts: [{ text: fullPrompt }]
  });

  try {
    // Fixed: Upgraded to gemini-3-pro-preview for complex architectural reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
      }
    });

    const text = response.text || "No se pudo procesar la consulta técnica.";
    const sources: string[] = [];
    const dbMatches = text.match(/DB-[A-Z]{2,3}/g);
    if (dbMatches) {
      dbMatches.forEach(m => {
        if (!sources.includes(m)) sources.push(m);
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Error Gemini:", error);
    return { text: "Error de conexión con el núcleo normativo de la IA.", sources: [] };
  }
};

export const generateJustificationDraft = async (
  projectName: string,
  sectionTitle: string,
  sectionCode: string,
  context: string
): Promise<string> => {
  // Fixed: Create new GoogleGenAI instance right before making the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    REDACCIÓN TÉCNICA PROFESIONAL:
    Proyecto: "${projectName}"
    Sección: "${sectionCode} - ${sectionTitle}"
    Datos Técnicos: ${context}
    
    Genera un borrador de memoria justificativa listo para incluir en proyecto ejecutivo.
    Considera la aplicabilidad según el Real Decreto 314/2006.
  `;

  try {
    // Fixed: Upgraded to gemini-3-pro-preview for complex architectural reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      }
    });

    return response.text || "Error en redacción automática.";
  } catch (error) {
    console.error("Error al generar borrador:", error);
    throw new Error("No ha sido posible conectar con el redactor técnico.");
  }
};
