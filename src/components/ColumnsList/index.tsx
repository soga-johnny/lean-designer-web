'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ColumnsGrid } from './ColumnsGrid';
import { ColumnsSkeleton } from './ColumnsSkeleton';
import { Pagination } from '@/components/Pagination';
import { AccessRanking } from './AccessRanking';
import { PopularKeywords } from './PopularKeywords';
import { SectionTag } from '@/components/SectionTag';
import { Article } from '@/types/microcms';

interface ColumnsListProps {
  showPagination?: boolean;
}

export function ColumnsList({ showPagination = false }: ColumnsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const totalPages = 5;

  // トップページ: 3個、コラム一覧: 3列×4段=12個
  const topItemsCount = 3;
  const listItemsCount = 12;

  // microCMSから記事を取得
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedTagId) {
          // タグが選択されている場合、そのタグの記事を取得
          response = await fetch(`/api/articles/by-tag?tagId=${selectedTagId}`);
        } else {
          // タグが選択されていない場合、全記事を取得
          response = await fetch('/api/articles');
        }
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
          setError(null);
        } else if (data.error) {
          setError('記事の一覧が取得できませんでした');
        }
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
        setError('記事の一覧が取得できませんでした');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTagId]);

  // タグクリック時のハンドラー
  const handleTagClick = (tagId: string) => {
    // 同じタグをクリックした場合は選択解除
    setSelectedTagId(prevTagId => prevTagId === tagId ? null : tagId);
  };

  return (
    <div className="mx-auto">
      {/* タグ */}
      <div className="flex justify-between items-center mb-4 md:mb-8">
        {/* タグ */}
        <SectionTag label="コラム" />

        <span className="text-sm font-medium">
        （ COLUMN ）
        </span>
      </div>


      {/* 文言 */}
      <h2 className="text-5xl font-bold mt-10 mb-10 text-gray-800">
        戦略の立て方、成功に導くデザインの原則
      </h2>

      {/* コラム一覧 */}
      {loading ? (
        <ColumnsSkeleton count={showPagination ? listItemsCount : topItemsCount} />
      ) : error ? (
        <div className="mb-8 p-4 bg-ld-red-100 border border-ld-red-600 rounded-lg md:max-w-[500px] mx-auto">
          <p className="text-ld-red-600 text-center">{error}</p>
        </div>
      ) : showPagination ? (
        // コラム一覧ページ: 3列×4段
        <>
          <ColumnsGrid itemsCount={listItemsCount} articles={articles} />
          <div className="mt-6 md:mt-20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        // トップページ: 3個横並び
        <>
          <ColumnsGrid itemsCount={topItemsCount} articles={articles} />
          <div className="text-center mt-6 md:mt-20">
            <Link
              href="/columns"
              className="block w-full px-8 py-4 bg-white rounded-full text-[1.2rem] font-normal transition-opacity border border-[#e7e7e6] text-[#51514d] hover:opacity-70"
            >
              コラムの続きを見る
            </Link>
          </div>
        </>
      )}

      {/* アクセスランキング */}
      <div className="mt-20 mb-28">
        <AccessRanking />
      </div>

      {/* 注目のキーワード */}
      <PopularKeywords onTagClick={handleTagClick} selectedTagId={selectedTagId} />
    </div>
  );
}
