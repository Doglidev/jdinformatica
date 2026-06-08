'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const DiagnosticoWidget = dynamic(() => import('@/components/DiagnosticoWidget'), { ssr: false });

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5493573431223';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full p-3 font-sans text-sm border outline-none transition-colors bg-transparent';
  const inputStyle = {
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-bg)',
  };

  return (
    <section
      id="contacto"
      className="section-pad border-t"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p
          className="font-mono text-xs tracking-widest mb-2"
          style={{ color: 'var(--color-accent)' }}
        >
          // CONTACTO
        </p>
        <h2
          className="font-sans font-semibold text-3xl md:text-4xl mb-12"
          style={{ color: 'var(--color-text)' }}
        >
          Contanos tu problema
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: form */}
          <div>
            {status === 'ok' ? (
              <div
                className="p-6 border"
                style={{ borderColor: 'var(--color-success)', backgroundColor: 'var(--color-surface)' }}
              >
                <p
                  className="font-mono text-sm"
                  style={{ color: 'var(--color-success)' }}
                >
                  ✓ Mensaje enviado. Te contactamos en menos de 2hs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  type="text"
                  placeholder="Nombre *"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <input
                  type="text"
                  placeholder="Empresa / Estudio"
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <input
                  required
                  type="tel"
                  placeholder="Teléfono *"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Mensaje *"
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="py-3 font-sans font-semibold text-sm transition-opacity hover:opacity-80 disabled:opacity-40"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
                {status === 'error' && (
                  <p className="font-sans text-xs" style={{ color: '#ef4444' }}>
                    Error al enviar. Por favor intentá por WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Right: WhatsApp + schedule + AI widget */}
          <div className="flex flex-col gap-6">
            {/* WhatsApp big button */}
            <a
              href={`https://wa.me/${waNumber}?text=Hola!%20Quiero%20consultar%20sobre%20soporte%20IT`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 border transition-colors hover:border-accent"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.268a.75.75 0 00.906.92l5.613-1.47A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.944-1.346l-.354-.21-3.67.961.977-3.573-.23-.368A9.721 9.721 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
              <div>
                <p className="font-sans font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                  Escribinos por WhatsApp
                </p>
                <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                  Respuesta inmediata en horario comercial
                </p>
              </div>
            </a>

            {/* Schedule */}
            <div
              className="p-4 border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--color-accent)' }}>
                [HORARIO]
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
                  Lunes a Viernes: 8hs – 20hs
                </p>
                <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
                  Guardias para emergencias
                </p>
                <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
                  Zona: Córdoba Capital y Gran Córdoba
                </p>
              </div>
            </div>

            {/* AI Diagnostic */}
            <DiagnosticoWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
