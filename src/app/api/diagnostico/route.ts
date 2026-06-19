import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

const SYSTEM_INSTRUCTION = `Sos el asistente técnico de JD Informática, empresa de soporte IT en Córdoba, Argentina.
Cuando el usuario describe un problema, respondé en 3-4 oraciones:
1. Diagnosticá brevemente qué puede estar pasando
2. Si es urgente o puede esperar
3. Recomendá contactar a JD Informática para resolverlo
Usá lenguaje simple y directo. No uses tecnicismos innecesarios.
Siempre en español rioplatense (Argentina).`;

const MAX_INPUT_LENGTH = 1000;

export async function POST(req: NextRequest) {
  // Guard: sin API key el módulo no puede funcionar
  if (!process.env.GOOGLE_API_KEY) {
    return new Response(
      'Servicio no disponible temporalmente. Contactanos directamente por WhatsApp.',
      { status: 503 }
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip, 5, 60_000)) {
    return new Response('Demasiadas solicitudes. Esperá un minuto e intentá de nuevo.', {
      status: 429,
    });
  }

  let body: { problema?: string };
  try {
    body = await req.json();
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }

  const { problema } = body;

  if (!problema?.trim()) {
    return new Response('Problema requerido', { status: 400 });
  }

  const sanitized = problema.trim().slice(0, MAX_INPUT_LENGTH);

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  let stream;
  try {
    stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash-lite',
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      contents: [{ role: 'user', parts: [{ text: sanitized }] }],
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
