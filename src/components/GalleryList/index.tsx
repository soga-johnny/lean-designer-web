'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GalleryTagFilter } from './GalleryTagFilter';
import { GalleryGrid } from './GalleryGrid';
import { Pagination } from '@/components/Pagination';
import { SectionTag } from '@/components/SectionTag';
import { Session } from '@/services/sessionService';

interface GalleryListProps {
  showPagination?: boolean;
  sessions?: Session[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function GalleryList({
  showPagination = false,
  sessions = [],
  loading = false,
  error = null,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  onPageChange: externalOnPageChange
}: GalleryListProps) {
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
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(['すべて']);

  // 外部からpropsが渡されている場合はそれを使用、なければ内部stateを使用
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = externalTotalPages ?? 5;
  const onPageChange = externalOnPageChange ?? setInternalCurrentPage;

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
      <div className="flex justify-between items-center mb-6 md:mb-8">
        {/* タグ */}
        <SectionTag label="ギャラリー" />

        <span className="text-sm font-medium">
        （ GARALLEY ）
        </span>
      </div>

      {/* 文言 */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
        アイデアの具現化、戦略が生まれる瞬間
      </h2>

      {/* ギャラリーのタグ一覧 */}
      <div className="mb-8">
        <GalleryTagFilter tags={tags} selectedTags={selectedTags} onTagSelect={handleTagSelect} />
      </div>

      {/* ギャラリー一覧 */}
      <div className="mb-20">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <GalleryGrid
            itemsCount={itemsCount}
            layout={showPagination ? 'list' : 'top'}
            sessions={sessions}
          />
        )}
      </div>

      {/* ページネーション or もっと見るボタン */}
      {showPagination ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
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
