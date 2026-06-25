'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { scrollToElement } from '@/lib/smoothScroll';

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5493573431223';

/* SVG dot-grid background — pure static, no JS */
function TechGrid() {
  const cols = 14;
  const rows = 8;
  const gap = 48;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c * gap + 16, y: r * gap + 16 });
    }
  }
  // A few connecting lines to suggest circuitry
  const lines = [
    { x1: 64, y1: 64, x2: 160, y2: 64 },
    { x1: 160, y1: 64, x2: 160, y2: 160 },
    { x1: 160, y1: 160, x2: 256, y2: 160 },
    { x1: 256, y1: 160, x2: 256, y2: 112 },
    { x1: 256, y1: 112, x2: 352, y2: 112 },
    { x1: 352, y1: 64, x2: 352, y2: 160 },
    { x1: 352, y1: 160, x2: 448, y2: 160 },
    { x1: 448, y1: 64, x2: 448, y2: 208 },
    { x1: 448, y1: 208, x2: 544, y2: 208 },
    { x1: 64, y1: 208, x2: 160, y2: 208 },
    { x1: 160, y1: 208, x2: 160, y2: 256 },
    { x1: 160, y1: 256, x2: 352, y2: 256 },
  ];

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.12 }}
      viewBox="0 0 672 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#F5C518" strokeWidth="1"
        />
      ))}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x} cy={d.y} r={1.5}
          fill="#F5C518"
        />
      ))}
      {/* Highlighted nodes */}
      {[{ x: 160, y: 64 }, { x: 256, y: 160 }, { x: 352, y: 256 }, { x: 448, y: 208 }].map((n, i) => (
        <circle key={`h${i}`} cx={n.x} cy={n.y} r={4} fill="none" stroke="#F5C518" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

const services = [
  { tag: 'SOPORTE',   desc: 'Remoto y presencial' },
  { tag: 'REDES',     desc: 'WiFi y cableado' },
  { tag: 'BACKUP',    desc: 'Respaldo seguro' },
  { tag: 'EQUIPOS',   desc: 'Mantenimiento' },
  { tag: 'SEGURIDAD', desc: 'Protección digital' },
  { tag: 'CÁMARAS',   desc: 'CCTV y vigilancia' },
];

export default function Hero() {
  useEffect(() => {
    const lock  = { active: false };
    const ANIM  = 1100;
    const GUARD = ANIM + 400; // 1500ms: animation + buffer for IntersectionObserver

    let touchStartY = 0;

    const heroInView = () => {
      const el = document.getElementById('hero-section');
      return el ? el.getBoundingClientRect().bottom > window.innerHeight * 0.25 : false;
    };

    const snapToEquipo = () => {
      if (lock.active) return;
      lock.active = true;
      scrollToElement('equipo', ANIM);
      setTimeout(() => { lock.active = false; }, GUARD);
    };

    const onWheel = (e: WheelEvent) => {
      if (!heroInView()) return;
      // Always block native scroll while Hero is active (is 100dvh, no inner scroll)
      e.preventDefault();
      if (e.deltaY > 0) snapToEquipo();
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (touchStartY - e.changedTouches[0].clientY > 50 && heroInView()) snapToEquipo();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="section-pad relative overflow-hidden flex items-center"
      style={{ backgroundColor: 'var(--color-bg)', minHeight: '100dvh', width: '100%' }}
      aria-labelledby="hero-title"
    >
      {/* Background image with blur and dark overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/hero_fondo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(4px)', transform: 'scale(1.06)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,14,22,0.78)' }} />
      </div>

      {/* Dot-grid decorative background — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
        <TechGrid />
      </div>


      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">

          {/* ─── Left col ───────────────────────────────────── */}
          <div>
            {/* Badge */}
            <div className="section-label anim-fade-up d-0">
              SOPORTE IT · CÓRDOBA CAPITAL
            </div>

            {/* H1 */}
            <h1
              id="hero-title"
              className="font-sans font-bold leading-[0.95] tracking-tight mb-5 lg:mb-7 anim-fade-up d-1"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)', color: 'var(--color-text)' }}
            >
              Tu depar&shy;ta&shy;mento{' '}
              <span className="text-outline">IT</span>
              ,<br />
              <span style={{ color: 'var(--color-text)' }}>sin contratar</span>
              <br />
              <span style={{ color: 'var(--color-accent)' }}>uno.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="font-sans text-base mb-7 lg:mb-10 max-w-lg anim-fade-up d-2"
              style={{ color: 'var(--color-muted)', lineHeight: 1.75, fontSize: '1rem' }}
            >
              Soporte, mantenimiento y redes para estudios contables,
              colegios y clínicas en Córdoba Capital.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 anim-fade-up d-3">
              <a
                href={`https://wa.me/${waNumber}?text=Hola!%20Quiero%20consultar%20sobre%20soporte%20IT`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-sans font-semibold text-sm clip-corner-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.268a.75.75 0 00.906.92l5.613-1.47A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.944-1.346l-.354-.21-3.67.961.977-3.573-.23-.368A9.721 9.721 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                Consultanos gratis
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-sans font-medium text-sm border transition-colors hover:border-accent"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              >
                Ver servicios →
              </a>
            </div>

            {/* Trustline */}
            <p
              className="mt-8 font-mono text-xs anim-fade-up d-4"
              style={{ color: 'var(--color-muted)', opacity: 0.6 }}
            >
              // Sin contratos mínimos · Sin letra chica · Respuesta garantizada
            </p>
          </div>

          {/* ─── Right col — terminal services (solo desktop) ── */}
          <div
            className="hidden lg:block anim-fade-up d-2 lg:sticky"
            style={{ top: 'calc(var(--statusbar-height) + var(--nav-height) + 0.75rem)' }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{
                backgroundColor: 'var(--color-border)',
                borderColor: 'var(--color-border)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
              <span className="font-mono text-xs ml-2" style={{ color: 'var(--color-muted)' }}>
                jd_servicios.sh
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="p-6 border border-t-0"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <p className="font-mono text-xs mb-5" style={{ color: 'var(--color-muted)' }}>
                <span style={{ color: 'var(--color-success)' }}>✓</span> servicios disponibles:
              </p>

              <div className="flex flex-col gap-3">
                {services.map(({ tag, desc }) => (
                  <div key={tag} className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-medium shrink-0"
                      style={{
                        color: 'var(--color-accent)',
                        minWidth: '84px',
                      }}
                    >
                      [{tag}]
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-4 border-t flex items-center gap-2"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: 'var(--color-success)',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                  Córdoba Capital · remoto o presencial
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
