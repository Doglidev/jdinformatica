import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Problemas from '@/sections/Problemas';
import Servicios from '@/sections/Servicios';
import Rubros from '@/sections/Rubros';
import Proceso from '@/sections/Proceso';
import Confianza from '@/sections/Confianza';
import Contacto from '@/sections/Contacto';

export default function HomePage() {
  return (
    <>
      {/* Fixed statusbar takes 36px at top */}
      <StatusBar />

      {/* Push content below fixed statusbar */}
      <div style={{ paddingTop: 'var(--statusbar-height)' }}>
        {/* Sticky nav sits right below statusbar */}
        <Nav />
        <main>
          <Hero />
          <Problemas />
          <Servicios />
          <Rubros />
          <Proceso />
          <Confianza />
          <Contacto />
        </main>
        <Footer />
      </div>
    </>
  );
}
