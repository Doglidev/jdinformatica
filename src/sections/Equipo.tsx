'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const slides = [
  {
    tag: 'QUIÉNES SOMOS',
    title: 'Más de 8 años resolviendo problemas reales',
    desc: 'Somos un equipo técnico con base en Córdoba Capital. No somos una franquicia ni un call center — conocemos a cada cliente por su nombre.',
    img: '/team/foto-01.jpg',
  },
  {
    tag: 'EN EL CAMPO',
    title: 'Presentes cuando más nos necesitás',
    desc: 'No solo respondemos por teléfono. Llegamos a tu empresa, evaluamos el problema en persona y lo resolvemos el mismo día.',
    img: '/team/foto-01.jpg',
  },
  {
    tag: 'NUESTRO EQUIPO',
    title: 'Técnicos certificados, trato humano',
    desc: '150+ empresas cordobesas confían en nosotros. Sin letra chica, sin contratos mínimos, sin excusas.',
    img: '/team/foto-01.jpg',
  },
];

export default function Equipo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      const idx = Math.min(slides.length - 1, Math.floor(p * slides.length));
      setActiveIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="equipo" ref={containerRef} style={{ height: `${slides.length * 100}vh` }}>
      <div
        className="sticky overflow-hidden"
        style={{ top: 0, height: '100vh', backgroundColor: 'var(--color-bg)' }}
      >
        {/* Image layers */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: activeIdx === i ? 1 : 0,
              transform: activeIdx === i ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'opacity, transform',
            }}
          >
            <Image
              src={slide.img}
              alt={slide.tag}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Dark overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,14,22,0.96) 0%, rgba(10,14,22,0.55) 45%, rgba(10,14,22,0.15) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(10,14,22,0.65) 0%, rgba(10,14,22,0.1) 55%, transparent 100%)' }}
        />

        {/* Slide counter */}
        <div
          className="absolute font-mono text-xs"
          style={{
            top: 'calc(var(--statusbar-height) + var(--nav-height) + 1.25rem)',
            right: '2rem',
            color: 'var(--color-muted)',
            letterSpacing: '0.12em',
            zIndex: 2,
          }}
        >
          {String(activeIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>

        {/* Text content */}
        <div className="absolute inset-0 flex items-end" style={{ zIndex: 2 }}>
          <div className="max-w-6xl mx-auto w-full px-8 relative" style={{ paddingBottom: '5rem' }}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  bottom: '5rem',
                  left: '2rem',
                  maxWidth: '580px',
                  opacity: activeIdx === i ? 1 : 0,
                  transform: `translateY(${activeIdx === i ? 0 : 22}px)`,
                  transition: `opacity 0.6s ease ${activeIdx === i ? '0.25s' : '0s'}, transform 0.6s ease ${activeIdx === i ? '0.25s' : '0s'}`,
                }}
              >
                <div className="section-label">{slide.tag}</div>
                <h2
                  className="font-sans font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: 'var(--color-text)', marginBottom: '1rem' }}
                >
                  {slide.title}
                </h2>
                <p style={{ color: 'rgba(238,238,240,0.72)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '460px' }}>
                  {slide.desc}
                </p>
              </div>
            ))}

            {/* Progress lines */}
            <div className="absolute flex flex-col gap-2 items-center" style={{ bottom: '5rem', right: '2rem' }}>
              {slides.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '2px',
                    height: activeIdx === i ? '40px' : '12px',
                    backgroundColor: activeIdx === i ? 'var(--color-accent)' : 'rgba(31,45,66,0.9)',
                    transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint — solo en el primer slide */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{
            bottom: '2rem',
            zIndex: 3,
            opacity: activeIdx === 0 ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
            scroll
          </span>
          <ChevronDown size={16} style={{ color: 'var(--color-accent)', animation: 'bounce-y 1.6s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  );
}
