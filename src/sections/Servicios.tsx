const services = [
  { tag: 'SOPORTE',    name: 'Asistencia remota y presencial', desc: 'Resolvemos el mismo día, remoto o en tu local.' },
  { tag: 'REDES',      name: 'Instalación y mantenimiento',    desc: 'WiFi, servidores, switches y cableado estructurado.' },
  { tag: 'BACKUP',     name: 'Respaldo y recuperación',        desc: 'Información segura con copias automáticas y probadas.' },
  { tag: 'EQUIPOS',    name: 'Mantenimiento preventivo',       desc: 'Limpieza, actualización y diagnóstico de hardware.' },
  { tag: 'SEGURIDAD',  name: 'Protección digital',             desc: 'Antivirus, actualizaciones y políticas de acceso.' },
  { tag: 'CÁMARAS',    name: 'CCTV y vigilancia',              desc: 'Instalación y configuración de sistemas de cámaras IP.' },
];

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

          {/* Left: sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="section-label anim-fade-up d-0">LO QUE HACEMOS</div>
            <h2
              className="font-sans font-bold mb-4 anim-fade-up d-1"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-text)' }}
            >
              Servicio integral
            </h2>
            <p
              className="font-sans text-sm anim-fade-up d-2"
              style={{ color: 'var(--color-muted)', lineHeight: 1.8 }}
            >
              Para que vos te enfoques en tu negocio y no en los problemas de IT.
            </p>

            <div className="mt-8 anim-fade-up d-3">
              <span className="tag-chip">[06 servicios]</span>
            </div>
          </div>

          {/* Right: service list */}
          <div className="flex flex-col">
            {services.map(({ tag, name, desc }, i) => (
              <div
                key={tag}
                className={`group flex items-start gap-6 py-5 border-b anim-fade-up d-${Math.min(i + 1, 6)}`}
                style={{ borderColor: 'var(--color-border)' }}
              >
                {/* Index */}
                <span
                  className="font-mono text-xs shrink-0 w-7 pt-0.5"
                  style={{ color: 'var(--color-border)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Tag */}
                <div className="shrink-0 pt-0.5">
                  <span
                    className="font-mono text-xs font-medium tracking-widest"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    [{tag}]
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-sans font-semibold text-base mb-1 transition-colors group-hover:text-accent"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {name}
                  </p>
                  <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
                    {desc}
                  </p>
                </div>

                {/* Arrow — appears on hover */}
                <span
                  className="font-mono text-sm shrink-0 self-center transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
