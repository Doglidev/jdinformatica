import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JD Informática | Soporte IT para PyMEs en Córdoba',
  description:
    'Soporte IT Córdoba, mantenimiento de equipos, redes WiFi para estudios contables, colegios y clínicas. Respuesta en menos de 2hs.',
  keywords:
    'soporte IT Córdoba, mantenimiento equipos, redes WiFi estudios contables, soporte técnico Córdoba Capital',
  openGraph: {
    title: 'JD Informática | Soporte IT para PyMEs en Córdoba',
    description: 'Tu departamento IT, sin tener que contratar uno.',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
