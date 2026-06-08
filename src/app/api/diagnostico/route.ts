import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const SYSTEM_PROMPT = `Sos el asistente técnico de JD Informática, empresa de soporte IT en Córdoba, Argentina.
Cuando el usuario describe un problema, respondé en 3-4 oraciones:
1. Diagnosticá brevemente qué puede estar pasando
2. Si es urgente o puede esperar
3. Recomendá contactar a JD Informática para resolverlo
Usá lenguaje simple y directo. No uses tecnicismos innecesarios.
Siempre en español rioplatense (Argentina).`;

export async function POST(req: NextRequest) {
  const { problema } = await req.json() as { problema: string };

  if (!problema?.trim()) {
    return new Response('Problema requerido', { status: 400 });
  }

  let stream;
  try {
    stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash-lite',
      contents: `${SYSTEM_PROMPT}\n\nProblema del usuario: ${problema}`,
    });
  } catch (err: unknown) {
    console.error('[diagnostico] error:', err);
    const status = (err as { status?: number })?.status ?? 500;
    const msg =
      status === 429
        ? 'El servicio está temporalmente no disponible. Contactanos directamente por WhatsApp.'
        : status === 404
        ? 'Modelo no disponible. Contactanos directamente por WhatsApp.'
        : 'No pudimos procesar tu consulta. Por favor contactanos directamente.';
    return new Response(msg, { status: 200 });
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch {
        controller.enqueue(
          encoder.encode('\n\nContactanos directamente por WhatsApp para resolver tu problema.')
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
