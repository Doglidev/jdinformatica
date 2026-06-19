import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'JD Informática | Soporte IT para PyMEs en Córdoba';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0E16',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ color: '#F5C518', fontSize: 16, letterSpacing: 5, marginBottom: 24 }}>
          SOPORTE IT · CÓRDOBA CAPITAL
        </div>
        <div style={{ color: '#EEEEF0', fontSize: 80, fontWeight: 700, lineHeight: 1.05, marginBottom: 32 }}>
          JD Informática
        </div>
        <div style={{ color: '#8B8FA0', fontSize: 30, maxWidth: 680, lineHeight: 1.4 }}>
          Tu departamento IT, sin tener que contratar uno.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 64, color: '#8B8FA0', fontSize: 20 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
          Respuesta en menos de 2hs · (03573) 431223 · Córdoba, Argentina
        </div>
      </div>
    ),
    { ...size }
  );
}
