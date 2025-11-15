'use client';

import { useSessions } from '@/hooks/useSessions';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ConceptSlide } from './_components/ConceptSlide';
import { GalleryList } from '@/components/GalleryList';
import { ColumnsList } from '@/components/ColumnsList';
import { StartGuide } from '@/components/StartGuide';
import { BottomConceptArea } from '@/components/BottomConceptArea';

export default function Top() {
  // カスタムフックを使用してセッション一覧を取得
  const { sessions, loading, error } = useSessions({
    limit: 10,
    offset: 0,
    includeExpired: true,
  });

  return (
    <div className="min-h-screen pb-[70px] md:pb-0">
      <Header />
      <main className="px-6 md:px-10">
        <section className="py-10 md:py-[5.5rem]">
          <ConceptSlide />
        </section>

        <section className="py-10 md:py-32">
          <GalleryList sessions={sessions} loading={loading} error={error} />
        </section>

        <section className="py-10 md:py-32">
          <ColumnsList />
        </section>
      </main>
      <section className="bg-ld-grey-50 px-6 md:px-10 py-10 md:py-32">
        <StartGuide />
      </section>

      <section>
        <BottomConceptArea />
      </section>
      <Footer />
    </div>
  );
}
