import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ColumnsList } from '@/components/ColumnsList';
import { StartGuide } from '@/components/StartGuide';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function ColumnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[100rem] mx-auto">
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
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
