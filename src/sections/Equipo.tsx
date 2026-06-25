'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { scrollToElement } from '@/lib/smoothScroll';
import Problemas from './Problemas';
import Servicios from './Servicios';
import Rubros from './Rubros';
import Proceso from './Proceso';
import Confianza from './Confianza';
import Contacto from './Contacto';

const IMAGES = [
  '/hero_fondo_2.png',
  '/hero_fondo_3.png',
  '/hero_fondo_4.png',
  '/hero_fondo_5.jpg',
  '/hero_fondo_6.jpg',
  '/hero_fondo_7.jpg',
  '/team/foto-01.jpg',
];

const SLIDE_IDS = [
  'slide-equipo',
  'slide-problemas',
  'slide-servicios',
  'slide-rubros',
  'slide-proceso',
  'slide-confianza',
  'slide-contacto',
];

// Base glass variables — sections rendered semi-transparent so the bg image shows through
const glass = {
  '--color-bg': 'rgba(10,14,22,0.35)',
  '--color-surface': 'rgba(10,14,22,0.55)',
  '--color-border': 'rgba(31,45,66,0.7)',
} as React.CSSProperties;

// Full-screen slide: 100dvh, centered content, glass background
const slide: React.CSSProperties = {
  ...glass,
  minHeight: '100dvh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export default function Equipo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState(0);
  const activeImgRef = useRef(0);

  // Switch background image as each slide enters the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SLIDE_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeImgRef.current = i;
            setActiveImg(i);
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Snap scroll between all slides (and back to Hero from the first)
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const lock  = { active: false };
    const ANIM  = 1100;
    const GUARD = ANIM + 400; // 1500ms: animation + buffer for IntersectionObserver

    let touchStartY = 0;

    const isInEquipo = () => {
      const el = containerRef.current;
      if (!el) return false;
      const { top, bottom } = el.getBoundingClientRect();
      return top < window.innerHeight && bottom > 0;
    };

    const fire = (fn: () => void) => {
      if (lock.active) return;
      lock.active = true;
      fn();
      setTimeout(() => { lock.active = false; }, GUARD);
    };

    const snapToSlide = (idx: number) => fire(() => scrollToElement(SLIDE_IDS[idx], ANIM));
    const snapToHero  = ()           => fire(() => scrollToElement('hero-section',  ANIM));

    const onWheel = (e: WheelEvent) => {
      if (!isInEquipo()) return;

      const cur = activeImgRef.current;
      const exitToFooter = e.deltaY > 0 && cur === SLIDE_IDS.length - 1;

      // Block ALL wheel events while inside Equipo except "exit to footer"
      if (!exitToFooter) e.preventDefault();

      if (lock.active) return; // scroll blocked — animation in progress

      if      (e.deltaY > 0 && cur < SLIDE_IDS.length - 1) snapToSlide(cur + 1);
      else if (e.deltaY < 0 && cur > 0)                    snapToSlide(cur - 1);
      else if (e.deltaY < 0 && cur === 0)                  snapToHero();
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    // passive: false → bloquea el scroll momentum nativo de iOS Safari mientras estamos en Equipo
    const onTouchMove  = (e: TouchEvent) => { if (isInEquipo()) e.preventDefault(); };
    const onTouchEnd   = (e: TouchEvent) => {
      if (!isInEquipo() || lock.active) return;
      const cur   = activeImgRef.current;
      const delta = touchStartY - e.changedTouches[0].clientY;

      if      (delta >  50 && cur < SLIDE_IDS.length - 1) snapToSlide(cur + 1);
      else if (delta < -50 && cur > 0)                    snapToSlide(cur - 1);
      else if (delta < -50 && cur === 0)                  snapToHero();
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true  });
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  return (
    <div id="equipo" ref={containerRef} role="region" aria-label="Contenido principal" style={{ position: 'relative', isolation: 'isolate' }}>

      {/* Sticky background — stays fixed behind all sections as the user scrolls */}
      <div
        aria-hidden="true"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          marginBottom: '-100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {IMAGES.map((src, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: activeImg === i ? 1 : 0,
              transform: activeImg === i ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'opacity, transform',
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,22,0.85) 0%, rgba(10,14,22,0.60) 50%, rgba(10,14,22,0.40) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,14,22,0.50) 0%, rgba(10,14,22,0.05) 60%, transparent 100%)' }} />
      </div>

      {/* All sections in normal document flow, stacked above the sticky background */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Slide 1 — Equipo intro (fullscreen, hero-style) */}
        <div
          id="slide-equipo"
          className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
          style={{
            position: 'relative',
            minHeight: '100dvh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ maxWidth: '580px' }}>
            <div className="section-label">QUIÉNES SOMOS</div>
            <h2
              className="font-sans font-bold leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: 'var(--color-text)', marginBottom: '1rem' }}
            >
              Más de 8 años resolviendo problemas reales
            </h2>
            <p style={{ color: 'rgba(238,238,240,0.72)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '460px' }}>
              Somos un equipo técnico con base en Córdoba Capital. No somos una franquicia ni un call center — conocemos a cada cliente por su nombre.
            </p>
          </div>

          <div
            className="flex flex-col items-center gap-1"
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}
            aria-hidden="true"
          >
            <span className="font-mono text-xs" style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>scroll</span>
            <ChevronDown size={16} style={{ color: 'var(--color-accent)', animation: 'bounce-y 1.6s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Slides 2–7 — full-screen, vertically centered, glass bg */}
        <div id="slide-problemas" style={slide}><Problemas /></div>
        <div id="slide-servicios" style={slide}><Servicios /></div>
        <div id="slide-rubros"    style={slide}><Rubros /></div>
        <div id="slide-proceso"   style={slide}><Proceso /></div>
        <div id="slide-confianza" style={slide}><Confianza /></div>
        <div id="slide-contacto"  style={slide}><Contacto /></div>
      </div>
    </div>
  );
}
