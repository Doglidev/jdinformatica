import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SlideDots from '@/components/SlideDots';
import Hero from '@/sections/Hero';
import Equipo from '@/sections/Equipo';

export default function HomePage() {
  return (
    <>
      <StatusBar />
      <ScrollReveal />
      <SlideDots />
      <div style={{ paddingTop: 'var(--statusbar-height)' }}>
        <Nav />
        <main id="main-content">
          <Hero />
          <Equipo />
        </main>
        <Footer />
      </div>
    </>
  );
}
