import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GalleryList } from '@/components/GalleryList';
import { GuideContent } from '@/components/GuideContent';

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20">
          <GalleryList />
        </section>
        <section className="py-20 bg-gray-50">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
