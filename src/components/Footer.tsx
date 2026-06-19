export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '#equipo',    label: 'Equipo' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#rubros',    label: 'Rubros' },
    { href: '#proceso',   label: 'Proceso' },
    { href: '#contacto',  label: 'Contacto' },
  ];

  return (
    <footer
      className="border-t"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-sans font-bold text-2xl" style={{ color: 'var(--color-text)' }}>
                JD
              </span>
              <span
                className="w-2 h-2 rounded-full mt-1"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
            </div>
            <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
              Soporte IT para PyMEs en Córdoba
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              className="font-mono text-xs mb-4 tracking-widest uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Navegación
            </p>
            <div className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="font-sans text-sm hover:text-accent transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-mono text-xs mb-4 tracking-widest uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:03573431223"
                className="font-sans text-sm hover:text-accent transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                (03573) 431223
              </a>
              <a
                href="https://wa.me/5493573431223"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm hover:text-accent transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                WhatsApp
              </a>
              <a
                href="mailto:contacto@jdinformatica.com.ar"
                className="font-sans text-sm hover:text-accent transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                contacto@jdinformatica.com.ar
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
            {'// JD Informática © '}{year}{' · Córdoba, Argentina'}
          </p>
        </div>
      </div>
    </footer>
  );
}
