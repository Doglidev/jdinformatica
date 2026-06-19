import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Hero from '@/sections/Hero';
import Equipo from '@/sections/Equipo';
import Problemas from '@/sections/Problemas';
import Servicios from '@/sections/Servicios';
import Rubros from '@/sections/Rubros';
import Proceso from '@/sections/Proceso';
import Confianza from '@/sections/Confianza';
import Contacto from '@/sections/Contacto';

export default function HomePage() {
  return (
    <>
      <StatusBar />
      <ScrollReveal />
      <div style={{ paddingTop: 'var(--statusbar-height)' }}>
        <Nav />
        <main id="main-content">
          <Hero />
          <Equipo />
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
