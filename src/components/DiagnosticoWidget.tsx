'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const MAX_CHARS = 1000;
const STREAM_TIMEOUT_MS = 30_000;

export default function DiagnosticoWidget() {
  const [problema, setProblema] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const respuestaRef = useRef<HTMLDivElement>(null);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5493573431223';

  async function handleDiagnostico() {
    if (!problema.trim() || loading) return;
    setLoading(true);
    setRespuesta('');
    setDone(false);

    try {
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problema }),
      });

      if (!res.ok || !res.body) throw new Error('Error en la respuesta');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      // Timeout de 30s por si el stream cuelga (iOS Safari < 16)
      const timeoutId = setTimeout(() => {
        reader.cancel();
        setRespuesta((prev) =>
          prev
            ? prev + '\n\n(Tiempo de espera agotado. Por favor contactanos directamente.)'
            : 'No pudimos procesar tu consulta ahora. Por favor contactanos directamente.'
        );
        setDone(true);
        setLoading(false);
      }, STREAM_TIMEOUT_MS);

      try {
        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          full += decoder.decode(value, { stream: true });
          setRespuesta(full);
        }
        clearTimeout(timeoutId);
        setDone(true);
      } catch {
        clearTimeout(timeoutId);
        setRespuesta(full || 'No pudimos procesar tu consulta ahora. Por favor contactanos directamente.');
        setDone(true);
      }
    } catch {
      setRespuesta('No pudimos procesar tu consulta ahora. Por favor contactanos directamente.');
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (respuesta && respuestaRef.current) {
      respuestaRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [respuesta]);

  const charsLeft = MAX_CHARS - problema.length;

  return (
    <div
      className="border p-6"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="tag-chip">[AI DIAGNÓSTICO]</span>
        <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
          powered by Gemini
        </span>
      </div>

      <p className="font-sans text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
        Describí tu problema de IT y te damos un diagnóstico rápido.
      </p>

      <label htmlFor="diagnostico-problema" className="sr-only">
        Describí tu problema de IT
      </label>
      <textarea
        id="diagnostico-problema"
        value={problema}
        onChange={(e) => setProblema(e.target.value.slice(0, MAX_CHARS))}
        placeholder="Ej: Mi PC tarda 10 minutos en arrancar y se congela cuando abro el sistema contable..."
        rows={4}
        maxLength={MAX_CHARS}
        className="w-full p-3 font-sans text-sm resize-none border outline-none focus:border-accent transition-colors"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        aria-describedby="diagnostico-counter"
      />
      <p
        id="diagnostico-counter"
        className="font-mono text-xs text-right mt-1"
        style={{ color: charsLeft < 100 ? '#ef4444' : 'var(--color-muted)' }}
        aria-live="polite"
      >
        {charsLeft} caracteres restantes
      </p>

      <button
        onClick={handleDiagnostico}
        disabled={loading || !problema.trim()}
        className="mt-3 w-full py-3 font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-40"
        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Analizando...
          </>
        ) : (
          'Obtener diagnóstico rápido →'
        )}
      </button>

      {respuesta && (
        <div
          ref={respuestaRef}
          className="mt-5 p-4 border-l-2"
          style={{ borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-surface)' }}
        >
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}
            aria-live="polite"
            aria-busy={!done}
          >
            {respuesta}
            {!done && <span className="cursor-blink-indicator" aria-hidden="true" />}
          </p>

          {done && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="font-sans text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                ¿Querés que te llamemos?
              </p>
              <a
                href={`https://wa.me/${waNumber}?text=Hola!%20Tuve%20un%20problema%20de%20IT%20y%20quisiera%20que%20me%20contacten.%20El%20problema%20es:%20${encodeURIComponent(problema)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-sans font-semibold text-xs transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
                aria-label="Contactar por WhatsApp para resolver el problema"
              >
                Sí, escribinos por WhatsApp →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
