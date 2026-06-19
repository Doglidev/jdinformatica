import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'JD Informática',
  description:
    'Soporte IT para PyMEs en Córdoba Capital. Mantenimiento de equipos, redes WiFi, backup y seguridad informática.',
  url: 'https://jdinformatica.com.ar',
  telephone: '+5403573431223',
  email: 'contacto@jdinformatica.com.ar',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Córdoba',
    addressRegion: 'Córdoba',
    addressCountry: 'AR',
  },
  openingHours: 'Mo-Fr 08:00-20:00',
  areaServed: 'Córdoba Capital y Gran Córdoba',
  serviceType: [
    'Soporte IT',
    'Mantenimiento de equipos',
    'Redes WiFi',
    'Backup',
    'Seguridad informática',
    'CCTV',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://jdinformatica.com.ar'),
  title: 'JD Informática | Soporte IT para PyMEs en Córdoba',
  description:
    'Soporte IT Córdoba, mantenimiento de equipos, redes WiFi para estudios contables, colegios y clínicas. Respuesta en menos de 2hs.',
  keywords:
    'soporte IT Córdoba, mantenimiento equipos, redes WiFi estudios contables, soporte técnico Córdoba Capital',
  alternates: {
    canonical: 'https://jdinformatica.com.ar',
  },
  openGraph: {
    siteName: 'JD Informática',
    title: 'JD Informática | Soporte IT para PyMEs en Córdoba',
    description: 'Tu departamento IT, sin tener que contratar uno.',
    locale: 'es_AR',
    type: 'website',
    url: 'https://jdinformatica.com.ar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JD Informática | Soporte IT para PyMEs en Córdoba',
    description: 'Tu departamento IT, sin tener que contratar uno.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:font-sans focus:font-semibold focus:text-sm"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
        >
          Ir al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
