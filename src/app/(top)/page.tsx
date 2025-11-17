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
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] px-6 md:px-10 mx-auto">
        <section className="py-10 md:py-[10.375rem] md:pt-40 md:pb-18">
          <ConceptSlide />
        </section>

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-px before:bg-gray-200">
          <GalleryList sessions={sessions} loading={loading} error={error} />
        </section>

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-px before:bg-gray-200">
          <ColumnsList />
        </section>

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>

        <BottomConceptArea />
      </main>
      <Footer />
    </div>
  );
}
