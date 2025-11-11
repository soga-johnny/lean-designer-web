import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StartGuide } from '@/components/StartGuide';
import { ConceptSlide } from './_components/ConceptSlide';
import { GallerySection } from './_components/GallerySection';
import { ColumnsSection } from './_components/ColumnsSection';


export default function Top() {
  return (
    <div className="min-h-screen pb-[70px] md:pb-0">
      <Header />
      <main className="max-w-[100rem] mx-auto">
        <ConceptSlide />
        <GallerySection />
        <ColumnsSection />
        <StartGuide />
      </main>
      <Footer />
    </div>
  );
}
