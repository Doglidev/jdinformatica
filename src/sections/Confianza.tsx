const items = [
  { num: '8+',  label: 'Años en el mercado',    note: 'desde 2016',       ariaLabel: undefined },
  { num: 'L–V', label: '8hs a 20hs + guardias', note: 'atención directa', ariaLabel: 'Lunes a Viernes' },
  { num: '$0',  label: 'Contratos mínimos',     note: 'sin letra chica',  ariaLabel: undefined },
];

export default function Confianza() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      aria-labelledby="confianza-title"
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="section-label anim-fade-up d-0">POR QUÉ ELEGIRNOS</div>

        <div className="flex items-end justify-between mb-3 anim-fade-up d-1">
          <h2
            id="confianza-title"
            className="font-sans font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)' }}
          >
            Sin letra chica
          </h2>
          <p
            className="font-sans text-sm hidden md:block max-w-xs text-right"
            style={{ color: 'var(--color-muted)' }}
          >
            Cobertura: Córdoba Capital y Gran Córdoba
          </p>
        </div>

        <div className="accent-rule" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
          {items.map(({ num, label, note, ariaLabel }, i) => (
            <div
              key={num}
              className={`p-7 relative overflow-hidden anim-fade-up d-${i + 2}`}
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: '2px', background: 'var(--color-accent)' }}
              />

              <p
                className="font-mono font-bold leading-none mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-accent)' }}
                aria-label={ariaLabel}
              >
                {num}
              </p>
              <p
                className="font-sans font-semibold text-sm mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                {label}
              </p>
              <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                {note}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
