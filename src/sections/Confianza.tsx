const items = [
  { num: '8+',   label: 'Años en el mercado',         note: 'desde 2016' },
  { num: '150+', label: 'Clientes en Córdoba',         note: 'PyMEs activas' },
  { num: 'L–V',  label: '8hs a 20hs + guardias',       note: 'atención directa' },
  { num: '$0',   label: 'Contratos mínimos',           note: 'sin letra chica' },
];

export default function Confianza() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="section-label anim-fade-up d-0">POR QUÉ ELEGIRNOS</div>

        <div className="flex items-end justify-between mb-3 anim-fade-up d-1">
          <h2
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--color-border)' }}>
          {items.map(({ num, label, note }, i) => (
            <div
              key={num}
              className={`p-7 relative overflow-hidden anim-fade-up d-${i + 2}`}
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: '2px', background: i === 0 ? 'var(--color-accent)' : 'transparent' }}
              />

              <p
                className="font-mono font-bold leading-none mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-accent)' }}
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
