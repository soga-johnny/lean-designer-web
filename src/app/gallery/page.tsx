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
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] px-6 md:px-10 mx-auto">
        <section className="pt-10 md:pt-[12.875rem]">
          <div className="pb-10 md:pb-32">
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

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
