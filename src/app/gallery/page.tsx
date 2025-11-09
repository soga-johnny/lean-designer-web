import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GalleryList } from '@/components/GalleryList';
import { GuideContent } from '@/components/GuideContent';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20">
          <GalleryList showPagination />
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー' }
            ]}
          />
        </section>
        <section className="py-20 bg-gray-50">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
