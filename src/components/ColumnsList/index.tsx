'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ColumnsGrid } from './ColumnsGrid';
import { ColumnsPagination } from './ColumnsPagination';
import { AccessRanking } from './AccessRanking';
import { PopularKeywords } from './PopularKeywords';

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
    <div className="max-w-7xl mx-auto px-4">
      {/* タグ */}
      <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
        コラム
      </span>

      {/* 文言 */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
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
              className="block w-full px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
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
