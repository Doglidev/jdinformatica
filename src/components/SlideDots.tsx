'use client';

import { useEffect, useState } from 'react';
import { scrollToElement } from '@/lib/smoothScroll';

const SLIDES = [
  { id: 'slide-equipo',    label: 'Quiénes somos' },
  { id: 'slide-problemas', label: '¿Te suena familiar?' },
  { id: 'slide-servicios', label: 'Servicios' },
  { id: 'slide-rubros',    label: 'Rubros' },
  { id: 'slide-proceso',   label: 'Cómo trabajamos' },
  { id: 'slide-confianza', label: 'Sin letra chica' },
  { id: 'slide-contacto',  label: 'Contacto' },
];

export default function SlideDots() {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Track which slide is in view
    SLIDES.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Show the bar only while the Equipo section is in the viewport
    const equipoEl = document.getElementById('equipo');
    if (equipoEl) {
      const visObs = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { threshold: 0.05 }
      );
      visObs.observe(equipoEl);
      observers.push(visObs);
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Navegación de secciones"
      className="hidden md:block"
      style={{
        position: 'fixed',
        left: '0.35rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: hovered ? '0.5rem 0.65rem 0.5rem 0.35rem' : '0.15rem 0',
          borderRadius: '6px',
          backgroundColor: hovered ? 'rgba(34,197,94,0.13)' : 'transparent',
          border: hovered ? '1px solid rgba(34,197,94,0.28)' : '1px solid transparent',
          backdropFilter: hovered ? 'blur(6px)' : 'none',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Thin vertical green line connecting all dots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: hovered ? 'calc(0.35rem + 7px)' : '7px',
            top: '10px',
            bottom: '10px',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(34,197,94,0.4) 15%, rgba(34,197,94,0.4) 85%, transparent)',
            transition: 'left 0.3s ease',
          }}
        />

        {SLIDES.map(({ id, label }, i) => {
          const isActive = i === active;
          return (
            <button
              key={id}
              onClick={() => scrollToElement(id, 1100)}
              aria-label={`Ir a: ${label}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '7px 0',
              }}
            >
              {/* Fixed-width container keeps the line centered regardless of dot size */}
              <div style={{ width: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <div
                  style={{
                    width:  isActive ? (hovered ? '14px' : '10px') : (hovered ? '8px' : '5px'),
                    height: isActive ? (hovered ? '14px' : '10px') : (hovered ? '8px' : '5px'),
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#22c55e' : 'rgba(34,197,94,0.28)',
                    boxShadow: isActive
                      ? '0 0 10px rgba(34,197,94,0.75), 0 0 3px rgba(34,197,94,1)'
                      : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>

              {/* Label — slides in and shows with white text on the green bg */}
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: 'nowrap',
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
                  transition: `opacity 0.2s ease ${i * 0.03}s, transform 0.2s ease ${i * 0.03}s`,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
