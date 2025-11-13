import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GalleryList } from '@/components/GalleryList';
import { StartGuide } from '@/components/StartGuide';
import { Breadcrumb } from '@/components/Breadcrumb';


export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[100rem] mx-auto">
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
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
