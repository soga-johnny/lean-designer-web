import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ColumnsList } from '@/components/ColumnsList';
import { StartGuide } from '@/components/StartGuide';
import { Breadcrumb } from '@/components/Breadcrumb';

interface ColumnsPageProps {
  searchParams: {
    tag?: string;
  };
}

export default function ColumnsPage({ searchParams }: ColumnsPageProps) {
  const initialTagId = searchParams.tag;

  return (
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] px-6 md:px-10 mx-auto">
        <section className="md:pt-60 max-md:pt-10">
          <div className="pb-40">
            <ColumnsList showPagination initialTagId={initialTagId} />
          </div>

          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'コラム' }
            ]}
          />
        </section>

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
