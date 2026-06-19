'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setRespuesta(full);
      }

      setDone(true);
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

      <textarea
        value={problema}
        onChange={(e) => setProblema(e.target.value)}
        placeholder="Ej: Mi PC tarda 10 minutos en arrancar y se congela cuando abro el sistema contable..."
        rows={4}
        className="w-full p-3 font-sans text-sm resize-none border outline-none focus:border-accent transition-colors"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
      />

      <button
        onClick={handleDiagnostico}
        disabled={loading || !problema.trim()}
        className="mt-3 w-full py-3 font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-40"
        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Analizando...
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
            className={`font-sans text-sm leading-relaxed ${!done ? 'cursor-blink' : ''}`}
            style={{ color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}
          >
            {respuesta}
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
