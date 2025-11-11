'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GalleryTagFilter } from './GalleryTagFilter';
import { GalleryGrid } from './GalleryGrid';
import { GalleryPagination } from './GalleryPagination';
import { SectionTag } from '@/components/SectionTag';

interface GalleryListProps {
  showPagination?: boolean;
}

export function GalleryList({ showPagination = false }: GalleryListProps) {
  const tags = [
    'すべて',
    'デザイン',
    '開発',
    'マーケティング',
    '戦略',
    'UI/UX',
    'ブランディング',
    'プロトタイプ',
    'Webデザイン',
    'アプリ開発',
    'コンサルティング',
    'ビジネス戦略',
    'プロダクト開発',
    'リサーチ',
    'イノベーション'
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(['すべて']);
  const totalPages = 5;

  const handleTagSelect = (tag: string) => {
    if (tag === 'すべて') {
      setSelectedTags(['すべて']);
    } else {
      const newSelectedTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags.filter(t => t !== 'すべて'), tag];

      setSelectedTags(newSelectedTags.length === 0 ? ['すべて'] : newSelectedTags);
    }
  };

  // トップページ: 1段目2枚+2-3段目8枚=10個、ギャラリー一覧: 3列×4段=12個
  const itemsCount = 12;

  return (
    <div className="mx-auto">
      {/* タグ */}
      <div className="flex justify-between items-center mb-4 md:mb-8">
        {/* タグ */}
        <SectionTag label="ギャラリー" />

        <span className="text-sm font-medium">
        （ GARALLEY ）
        </span>
      </div>

      {/* 文言 */}
      <h2 className="text-5xl font-bold mt-10 mb-10 text-gray-800">
        アイデアの具現化、戦略が生まれる瞬間
      </h2>

      {/* ギャラリーのタグ一覧 */}
      <div className="mb-8">
        <GalleryTagFilter tags={tags} selectedTags={selectedTags} onTagSelect={handleTagSelect} />
      </div>

      {/* ギャラリー一覧 */}
      <div className="mb-20">
        <GalleryGrid
          itemsCount={itemsCount}
          layout={showPagination ? 'list' : 'top'}
        />
      </div>

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
            className="block w-full px-8 py-4 bg-white rounded-full text-[1.2rem] font-normal transition-opacity border border-[#e7e7e6] text-[#51514d] hover:opacity-70"
          >
            ギャラリーの続きを見る
          </Link>
        </div>
      )}
    </div>
  );
}
