'use client';

const phoneNumber = '03573431223';
const phoneDisplay = '(03573) 431223';

const items = [
  '● JD Informática',
  'Córdoba Capital',
  'Respuesta en menos de 2hs',
  phoneDisplay,
  'L–V 8hs a 20hs',
  'Soporte remoto y presencial',
];

export default function StatusBar() {
  const tickerText = items.join('  ·  ');

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
      style={{
        height: 'var(--statusbar-height)',
        backgroundColor: 'var(--color-accent)',
        borderBottom: '1px solid var(--color-accent2)',
      }}
    >
      {/* Desktop: static centered con teléfono como link */}
      <div className="hidden md:flex items-center justify-center h-full px-6 gap-6">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: '#0A0E16', animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
        <span
          className="font-mono text-xs font-medium tracking-widest uppercase"
          style={{ color: '#0A0E16', letterSpacing: '0.12em' }}
        >
          JD Informática &nbsp;—&nbsp; Córdoba Capital &nbsp;—&nbsp; Respuesta &lt;2hs &nbsp;—&nbsp;{' '}
          <a
            href={`tel:${phoneNumber}`}
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {phoneDisplay}
          </a>
          &nbsp;—&nbsp; L–V 8–20hs
        </span>
      </div>

      {/* Mobile: ticker con teléfono como texto (tap-to-call vía link al final) */}
      <div className="flex md:hidden items-center h-full overflow-hidden">
        <a
          href={`tel:${phoneNumber}`}
          aria-label={`Llamar al ${phoneDisplay}`}
          className="flex whitespace-nowrap"
          style={{ animation: 'ticker 20s linear infinite', color: 'inherit', textDecoration: 'none' }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-mono text-xs font-medium px-8 tracking-widest"
              style={{ color: '#0A0E16' }}
            >
              {tickerText} &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </a>
      </div>
    </div>
  );
}
