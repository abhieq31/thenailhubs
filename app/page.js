import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TryOnTeaser from '@/components/TryOnTeaser';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TryOnTeaser />
        <Services />
        <Gallery />
        <Reviews />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
