'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ColumnsList } from '@/components/ColumnsList';
import { StartGuide } from '@/components/StartGuide';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useArticles } from '@/hooks/useArticles';

export default function ColumnsPage() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const { articles, loading, error, pagination, fetchArticles } = useArticles({
    limit: itemsPerPage,
    offset: 0,
    tagId: selectedTagId,
  });

  // ページまたはタグが変わったら新しいデータを取得
  useEffect(() => {
    const newOffset = (currentPage - 1) * itemsPerPage;
    fetchArticles(newOffset, selectedTagId);
  }, [currentPage, selectedTagId, fetchArticles, itemsPerPage]);

  // タグクリック時の処理
  const handleTagClick = (tagId: string) => {
    // 同じタグをクリックした場合は選択解除
    setSelectedTagId(prevTagId => prevTagId === tagId ? null : tagId);
    setCurrentPage(1); // タグ変更時は1ページ目に戻る
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(pagination.total / itemsPerPage);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="md:max-w-[100rem] max-md:px-[2rem] mx-auto">
        <section className="md:pt-60 max-md:pt-10">
          <div className="pb-40">
            <ColumnsList
              showPagination
              articles={articles}
              loading={loading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              selectedTagId={selectedTagId}
              onTagClick={handleTagClick}
            />
          </div>

          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'コラム' }
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
