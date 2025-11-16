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
  const itemsPerPage = 12;

  // カスタムフックを使用してセッション一覧を取得
  const { sessions, loading, error, pagination, fetchSessions } = useSessions({
    limit: itemsPerPage,
    offset: 0,
    includeExpired: true,
  });

  // ページが変わったら新しいデータを取得
  useEffect(() => {
    const newOffset = (currentPage - 1) * itemsPerPage;
    fetchSessions(newOffset);
  }, [currentPage, fetchSessions, itemsPerPage]);

  // 総ページ数を計算
  const totalPages = Math.ceil(pagination.total / itemsPerPage);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="md:max-w-[100rem] max-md:px-[2rem] mx-auto">
        <section className="md:pt-60 max-md:pt-10">
          <div className="pb-40">
            <GalleryList
              showPagination
              sessions={sessions}
              loading={loading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー' }
            ]}
          />
        </section>

        <section className="py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
