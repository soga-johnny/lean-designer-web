'use client';

import { useState, useEffect } from 'react';
import { useSessions } from '@/hooks/useSessions';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GalleryList } from '@/components/GalleryList';
import { StartGuide } from '@/components/StartGuide';
import { Breadcrumb } from '@/components/Breadcrumb';


export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const itemsPerPage = 12;

  // カスタムフックを使用してセッション一覧を取得
  const { sessions, loading, error, pagination, fetchSessions } = useSessions({
    limit: itemsPerPage,
    offset: 0,
    genres: selectedGenres,
  });

  // ページまたはジャンルが変わったら新しいデータを取得
  useEffect(() => {
    const newOffset = (currentPage - 1) * itemsPerPage;
    fetchSessions(newOffset, selectedGenres);
  }, [currentPage, selectedGenres, fetchSessions, itemsPerPage]);

  // ジャンル変更時の処理
  const handleGenresChange = (genres: string[]) => {
    console.log(genres);
    setSelectedGenres(genres);
    setCurrentPage(1); // ジャンル変更時は最初のページに戻る
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(pagination.total / itemsPerPage);

  return (
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] max-md:px-[2rem] mx-auto">
        <section className="md:pt-60 max-md:pt-10 pb-40">
          <GalleryList
            showPagination
            sessions={sessions}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onGenresChange={handleGenresChange}
          />
        </section>

        <section>
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー' }
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
