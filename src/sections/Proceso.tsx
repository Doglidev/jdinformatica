const steps = [
  { num: '01', tag: 'CONTACTO',    desc: 'Nos escribís o llamás. Sin formularios complicados.' },
  { num: '02', tag: 'DIAGNÓSTICO', desc: 'Evaluamos el problema, remoto o presencial.' },
  { num: '03', tag: 'SOLUCIÓN',    desc: 'Lo resolvemos. Si necesitamos piezas, te avisamos antes.' },
  { num: '04', tag: 'SEGUIMIENTO', desc: 'Chequeamos que todo funcione. No desaparecemos.' },
];

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="section-label anim-fade-up d-0">PROCESO</div>

        <div className="flex items-end justify-between mb-3 anim-fade-up d-1">
          <h2
            className="font-sans font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)' }}
          >
            Cómo trabajamos
          </h2>
        </div>

        <div className="accent-rule" />

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative anim-fade-up d-2">
          {/* Connector rail */}
          <div
            className="absolute"
            style={{
              top: '2.2rem',
              left: '2rem',
              right: '2rem',
              height: '1px',
              background: `repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 8px, transparent 8px, transparent 16px)`,
            }}
          />

          <div className="grid grid-cols-4 gap-4 relative">
            {steps.map(({ num, tag, desc }, i) => (
              <div key={num} className="flex flex-col items-center text-center px-2">

                {/* Circle node */}
                <div
                  className="relative z-10 w-[44px] h-[44px] flex items-center justify-center mb-5 clip-corner-sm"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '2px solid var(--color-accent)',
                    boxShadow: '0 0 0 4px var(--color-bg)',
                  }}
                >
                  <span
                    className="font-mono font-semibold text-sm"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {num}
                  </span>
                </div>

                {/* Ghost large step number */}
                <span
                  aria-hidden="true"
                  className="font-mono font-bold leading-none mb-2 select-none"
                  style={{
                    fontSize: '5rem',
                    color: 'var(--color-surface)',
                    position: 'absolute',
                    top: '1.2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  {num}
                </span>

                <span className="tag-chip mb-3">[{tag}]</span>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col">
          {steps.map(({ num, tag, desc }, i) => (
            <div key={num} className="flex gap-5 relative">
              {/* Track */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-10 h-10 flex items-center justify-center clip-corner-sm shrink-0"
                  style={{ border: '2px solid var(--color-accent)', backgroundColor: 'var(--color-bg)' }}
                >
                  <span className="font-mono font-bold text-sm" style={{ color: 'var(--color-accent)' }}>
                    {num}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 my-2"
                    style={{
                      width: '1px',
                      background: `repeating-linear-gradient(180deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 8px)`,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-8 pt-1">
                <span className="tag-chip mb-2 inline-block">[{tag}]</span>
                <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
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
