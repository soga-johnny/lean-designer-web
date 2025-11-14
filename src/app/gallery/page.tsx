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
      <main className="max-w-[100rem] mx-auto">
        <section className="py-20">
          <GalleryList
            showPagination
            sessions={sessions}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー' }
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
