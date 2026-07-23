import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import AboutHempSection from '@/components/AboutHempSection';
import ProcessSection from '@/components/ProcessSection';
import ProductsSection from '@/components/ProductsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AboutHempSection />
        <ProcessSection />
        <ProductsSection />
        <ContactSection />
      </main>
    </>
  );
}
