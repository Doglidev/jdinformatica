'use client';

import { AlertTriangle, HardDrive, Wifi } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Problem {
  index: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const problems: Problem[] = [
  {
    index: '01',
    Icon: AlertTriangle,
    title: 'La PC va lenta',
    desc: 'Justo cuando más la necesitás, todo colapsa y perdés tiempo de trabajo real.',
  },
  {
    index: '02',
    Icon: HardDrive,
    title: 'Sin backup real',
    desc: 'Perdiste un archivo importante y no había copia guardada en ningún lado.',
  },
  {
    index: '03',
    Icon: Wifi,
    title: 'La red cayó',
    desc: 'Internet, impresoras o el servidor del estudio dejaron de funcionar de golpe.',
  },
];

export default function Problemas() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      aria-labelledby="problemas-title"
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="section-label anim-fade-up d-0">DOLOR DEL CLIENTE</div>

        <div className="flex items-end justify-between mb-3 anim-fade-up d-1">
          <h2
            id="problemas-title"
            className="font-sans font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)' }}
          >
            ¿Te suena familiar?
          </h2>
        </div>

        <div className="accent-rule" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
          {problems.map(({ index, Icon, title, desc }, i) => (
            <div
              key={title}
              className={`hover-card p-7 cursor-default anim-fade-up d-${i + 2}`}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderLeft: '3px solid var(--color-border)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost index number */}
              <span
                className="font-mono font-bold absolute top-3 right-4 select-none pointer-events-none"
                style={{
                  fontSize: '5rem',
                  lineHeight: 1,
                  color: 'var(--color-border)',
                  opacity: 0.6,
                }}
                aria-hidden="true"
              >
                {index}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center mb-5 clip-corner-sm"
                style={{ backgroundColor: 'rgba(245,197,24,0.10)' }}
              >
                <Icon size={20} style={{ color: 'var(--color-accent)' }} aria-hidden={true} />
              </div>

              <h3
                className="font-sans font-semibold text-lg mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
