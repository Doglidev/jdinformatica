'use client';

const rubros = [
  { num: '01', name: 'Estudios Contables',          desc: 'Software contable lento, red caída en cierre de mes.' },
  { num: '02', name: 'Colegios Privados',             desc: 'WiFi para aulas, soporte a docentes y sistema de gestión.' },
  { num: '03', name: 'Clínicas y Centros Médicos',   desc: 'Sistemas de turnos, equipos de diagnóstico conectados.' },
  { num: '04', name: 'Concesionarias',               desc: 'Red de piso de ventas, equipos de gestión y cámaras.' },
];

export default function Rubros() {
  return (
    <section
      id="rubros"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      aria-labelledby="rubros-title"
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="section-label anim-fade-up d-0">RUBROS</div>

        <div className="flex items-end justify-between mb-3 anim-fade-up d-1">
          <h2
            id="rubros-title"
            className="font-sans font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)' }}
          >
            Trabajamos con
          </h2>
          <span className="font-mono text-xs hidden md:block" style={{ color: 'var(--color-muted)' }}>
            04 — sectores
          </span>
        </div>

        <div className="accent-rule" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rubros.map(({ num, name, desc }, i) => (
            <div
              key={num}
              className={`hover-card clip-corner p-6 border cursor-default relative overflow-hidden anim-fade-up d-${i + 2}`}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Ghost large number */}
              <span
                aria-hidden="true"
                className="font-mono font-bold absolute bottom-2 right-3 select-none pointer-events-none leading-none"
                style={{
                  fontSize: '6rem',
                  color: 'var(--color-border)',
                  opacity: 0.5,
                }}
              >
                {num}
              </span>

              {/* Content */}
              <div className="relative">
                <h3
                  className="font-sans font-semibold text-base mb-3 leading-snug"
                  style={{ color: 'var(--color-text)' }}
                >
                  {name}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
