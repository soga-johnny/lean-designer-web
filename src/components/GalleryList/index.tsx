'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GalleryTagFilter } from './GalleryTagFilter';
import { GalleryGrid } from './GalleryGrid';
import { GalleryPagination } from './GalleryPagination';

interface GalleryListProps {
  showPagination?: boolean;
}

export function GalleryList({ showPagination = false }: GalleryListProps) {
  const tags = ['すべて', 'デザイン', '開発', 'マーケティング', '戦略'];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // トップページ: 1段目2枚+2-3段目8枚=10個、ギャラリー一覧: 3列×4段=12個
  const itemsCount = 12;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* タグ */}
      <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
        ギャラリー
      </span>

      {/* 文言 */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        アイデアの具現化、戦略が生まれる瞬間
      </h2>

      {/* ギャラリーのタグ一覧 */}
      <GalleryTagFilter tags={tags} />

      {/* ギャラリー一覧 */}
      <GalleryGrid
        itemsCount={itemsCount}
        layout={showPagination ? 'list' : 'top'}
      />

      {/* ページネーション or もっと見るボタン */}
      {showPagination ? (
        <GalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        <div className="text-center">
          <Link
            href="/gallery"
            className="block w-full px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ギャラリーの続きを見る
          </Link>
        </div>
      )}
    </div>
  );
}
