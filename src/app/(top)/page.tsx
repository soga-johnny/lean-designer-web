import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ConceptSlide } from './_components/ConceptSlide';
import { GallerySection } from './_components/GallerySection';
import { ColumnsSection } from './_components/ColumnsSection';
import { StartGuide } from './_components/StartGuide';

export default function Top() {
  return (
    <div className="min-h-screen pb-[70px] md:pb-0">
      <Header />
      <main>
        <ConceptSlide />
        <GallerySection />
        <ColumnsSection />
        <StartGuide />
      </main>
      <Footer />
    </div>
  );
}
