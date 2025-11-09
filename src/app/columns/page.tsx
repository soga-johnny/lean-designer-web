import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ColumnsList } from '@/components/ColumnsList';
import { GuideContent } from '@/components/GuideContent';

export default function ColumnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gray-50">
          <ColumnsList />
        </section>
        <section className="py-20">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
