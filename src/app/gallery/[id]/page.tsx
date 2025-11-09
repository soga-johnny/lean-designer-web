import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideContent } from '@/components/GuideContent';

export default function GalleryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Gallery Detail</h1>
            <p className="text-gray-600">ID: {params.id}</p>
            {/* Gallery detail content will go here */}
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
