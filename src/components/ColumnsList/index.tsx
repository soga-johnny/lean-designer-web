'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ColumnsGrid } from './ColumnsGrid';
import { ColumnsPagination } from './ColumnsPagination';
import { AccessRanking } from './AccessRanking';
import { PopularKeywords } from './PopularKeywords';
import { SectionTag } from '@/components/SectionTag';

interface ColumnsListProps {
  showPagination?: boolean;
}

export function ColumnsList({ showPagination = false }: ColumnsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // トップページ: 3個、コラム一覧: 3列×4段=12個
  const topItemsCount = 3;
  const listItemsCount = 12;

  return (
    <div className="mx-auto">
      {/* タグ */}
      <SectionTag label="コラム" />

      {/* 文言 */}
      <h2 className="text-5xl font-bold mt-10 mb-10 text-gray-800">
        戦略の立て方、成功に導くデザインの原則
      </h2>

      {/* コラム一覧 */}
      {showPagination ? (
        // コラム一覧ページ: 3列×4段
        <>
          <div className="mb-8">
            <ColumnsGrid itemsCount={listItemsCount} />
          </div>

          <ColumnsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        // トップページ: 3個横並び
        <>
          <div className="mb-8">
            <ColumnsGrid itemsCount={topItemsCount} />
          </div>

          {/* コラムの続きを見るボタン */}
          <div className="text-center mb-12">
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
      <AccessRanking />

      {/* 注目のキーワード */}
      <PopularKeywords />
    </div>
  );
}
