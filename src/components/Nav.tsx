'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#rubros', label: 'Rubros' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5493573431223';

  return (
    <nav
      className="sticky z-40 border-b"
      style={{
        top: 'var(--statusbar-height)',
        height: 'var(--nav-height)',
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span
            className="font-sans font-bold text-2xl tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            JD
          </span>
          <span
            className="w-2 h-2 rounded-full mt-1 transition-transform group-hover:scale-125"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <span
            className="font-sans font-medium text-sm ml-1 hidden sm:inline"
            style={{ color: 'var(--color-muted)' }}
          >
            Informática
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm font-medium transition-colors hover:text-accent"
              style={{ color: 'var(--color-muted)' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={`https://wa.me/${waNumber}?text=Hola!%20Quiero%20consultar%20sobre%20soporte%20IT`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 font-sans font-semibold text-sm transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L.057 23.268a.75.75 0 00.906.92l5.613-1.47A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.944-1.346l-.354-.21-3.67.961.977-3.573-.23-.368A9.721 9.721 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
          Escribinos por WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: 'var(--color-text)' }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-b z-40"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex flex-col p-4 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-sm font-medium py-1"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center px-4 py-3 font-sans font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
