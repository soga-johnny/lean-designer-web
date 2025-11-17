'use client';

import { useState, useEffect } from 'react';
import { useSessions } from '@/hooks/useSessions';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ConceptSlide } from './_components/ConceptSlide';
import { GalleryList } from '@/components/GalleryList';
import { ColumnsList } from '@/components/ColumnsList';
import { StartGuide } from '@/components/StartGuide';
import { BottomConceptArea } from '@/components/BottomConceptArea';

export default function Top() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // カスタムフックを使用してセッション一覧を取得
  const { sessions, loading, error, fetchSessions } = useSessions({
    limit: 10,
    offset: 0,
    genres: selectedGenres,
  });

  // ジャンルが変わったら新しいデータを取得
  useEffect(() => {
    fetchSessions(0, selectedGenres);
  }, [selectedGenres, fetchSessions]);

  // ジャンル変更時の処理
  const handleGenresChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  return (
    <div className="min-h-screen pb-[70px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] max-md:px-[2rem] mx-auto">
        <section className="py-10 md:py-[88px] md:pt-40 md:pb-18">
          <ConceptSlide />
        </section>

        <section className="py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-px before:bg-gray-200">
          <GalleryList sessions={sessions} loading={loading} error={error} onGenresChange={handleGenresChange} />
        </section>

        <section className="py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-px before:bg-gray-200">
          <ColumnsList />
        </section>

        <section className="py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>

        <BottomConceptArea />
      </main>
      <Footer />
    </div>
  );
}
