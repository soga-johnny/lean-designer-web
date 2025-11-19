'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ColumnsGrid } from './ColumnsGrid';
import { ColumnsSkeleton } from './ColumnsSkeleton';
import { Pagination } from '@/components/Pagination';
// import { AccessRanking } from './AccessRanking';
import { PopularKeywords } from './PopularKeywords';
import { SectionTag } from '@/components/SectionTag';
import { Article, Tag } from '@/types/microcms';

interface ColumnsListProps {
  showPagination?: boolean;
  articles?: Article[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  selectedTagId?: string | null;
  onPageChange?: (page: number) => void;
  // onTagClick?: (tagId: string) => void;
}

export function ColumnsList({
  showPagination = false,
  articles = [],
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  selectedTagId = null,
  onPageChange,
  // onTagClick
}: ColumnsListProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  // トップページ: 3個、コラム一覧: 3列×4段=12個
  const topItemsCount = 3;
  const listItemsCount = 12;

  // タグ一覧を取得
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        if (data.tags) {
          setTags(data.tags);
        }
      } catch (error) {
        console.error('タグの取得に失敗しました:', error);
      }
    };

    fetchTags();
  }, []);

  // 選択中のタグ名を取得
  const selectedTag = tags.find(tag => tag.id === selectedTagId);
  const selectedTagName = selectedTag?.name || null;

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
      <h1 className="text-3xl md:text-5xl font-bold md:mb-20 mb-6">
        {selectedTagName ? `${selectedTagName}のコラム一覧` : '戦略の立て方、成功に導くプロダクト開発の原則'}
      </h1>

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

      {/* アクセスランキング 
      <div className="mt-20 mb-28">
        <AccessRanking />
      </div>
      */}

      {/* 注目のキーワード */}
      <div className="mt-10 md:mt-32">
        <PopularKeywords tags={tags} selectedTagId={selectedTagId} />
      </div>
    </div>
  );
}
