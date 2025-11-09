import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ColumnsList } from '@/components/ColumnsList';
import { GuideContent } from '@/components/GuideContent';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function ColumnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20">
          <ColumnsList showPagination />
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'コラム' }
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
