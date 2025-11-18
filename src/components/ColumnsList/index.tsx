'use client';

import Link from 'next/link';
import { ColumnsGrid } from './ColumnsGrid';
import { ColumnsSkeleton } from './ColumnsSkeleton';
import { Pagination } from '@/components/Pagination';
import { AccessRanking } from './AccessRanking';
import { PopularKeywords } from './PopularKeywords';
import { SectionTag } from '@/components/SectionTag';
import { Article } from '@/types/microcms';

interface ColumnsListProps {
  showPagination?: boolean;
  articles?: Article[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  selectedTagId?: string | null;
  onTagClick?: (tagId: string) => void;
}

export function ColumnsList({
  showPagination = false,
  articles = [],
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  selectedTagId = null,
  onTagClick
}: ColumnsListProps) {
  // トップページ: 3個、コラム一覧: 3列×4段=12個
  const topItemsCount = 3;
  const listItemsCount = 12;

  return (
    <div className="mx-auto">
      {/* タグ */}
      <div className="flex justify-between items-center md:mb-8 max-md:mb-6">
        {/* タグ */}
        <SectionTag label="コラム" />

        <span className="text-sm font-medium">
        （ COLUMN ）
        </span>
      </div>

      {/* 文言 */}
      <h2 className="text-3xl md:text-5xl font-bold md:mb-20 mb-6">
        戦略の立て方、成功に導くデザインの原則
      </h2>

      {/* コラム一覧 */}
      {loading ? (
        <ColumnsSkeleton count={showPagination ? listItemsCount : topItemsCount} />
      ) : error ? (
        <div className="mb-8 p-4 bg-ld-red-100 border border-ld-red-600 rounded-lg md:max-w-[500px] mx-auto">
          <p className="text-ld-red-600 text-center">{error}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">記事が見つかりませんでした</p>
        </div>
      ) : showPagination && onPageChange ? (
        // コラム一覧ページ: 3列×4段
        <>
          <ColumnsGrid itemsCount={listItemsCount} articles={articles} />
          <div className="mt-6 md:mt-20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
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
      {onTagClick && <PopularKeywords onTagClick={onTagClick} selectedTagId={selectedTagId} />}
    </div>
  );
}
