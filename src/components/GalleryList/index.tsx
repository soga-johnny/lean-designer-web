'use client';

import Link from 'next/link';
// import { GalleryTagFilter } from './GalleryTagFilter';
import { GalleryGrid } from './GalleryGrid';
import { GallerySkeleton } from './GallerySkeleton';
import { Pagination } from '@/components/Pagination';
import { SectionTag } from '@/components/SectionTag';
import { Session } from '@/services/sessionService';
// import { getAllGalleryGenres } from '@/constants/galleryGenres';
// import { GALLERY_TAGS } from '@/constants/galleryTags';

interface GalleryListProps {
  showPagination?: boolean;
  sessions?: Session[];
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onGenresChange?: (genres: string[]) => void;
}

export function GalleryList({
  showPagination = false,
  sessions = [],
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  // onGenresChange
}: GalleryListProps) {
  // const handleGenresChange = (newGenres: string[]) => {
  //   setSelectedGenres(newGenres);

  //   // 外部にジャンル変更を通知
  //   if (onGenresChange) {
  //     onGenresChange(newGenres);
  //   }
  // };

  // トップページ: 1段目2枚+2-3段目8枚=10個、ギャラリー一覧: 3列×4段=12個
  const itemsCount = 12;

  return (
    <div className="mx-auto">
      {/* タグ */}
      <div className="flex justify-between items-center md:mb-8 max-md:mb-6">
        {/* タグ */}
        <SectionTag label="ギャラリー" />

        <span className="text-sm font-medium">
        （ GARALLEY ）
        </span>
      </div>

      {/* 文言 */}
      <h2 className="text-3xl md:text-5xl font-bold md:mb-8 max-md:mb-6">
        アイデアの具現化、戦略が生まれる瞬間
      </h2>

      {/* ギャラリーのジャンル一覧 */}
      {/* <div className="mb-8">
        <GalleryTagFilter genres={genres} selectedGenres={selectedGenres} onGenresChange={handleGenresChange} />
      </div> */}

      {/* ギャラリー一覧 */}
      {loading ? (
        <GallerySkeleton
          layout={showPagination ? 'list' : 'top'}
          count={itemsCount}
        />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">該当するギャラリーが見つかりませんでした</p>
        </div>
      ) : showPagination && onPageChange ? (
        <>
          <GalleryGrid
            itemsCount={itemsCount}
            layout={showPagination ? 'list' : 'top'}
            sessions={sessions}
          />
          <div className="mt-6 md:mt-20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <>
          <GalleryGrid
            itemsCount={itemsCount}
            layout={showPagination ? 'list' : 'top'}
            sessions={sessions}
          />
          <div className="text-center mt-6 md:mt-20">
            <Link
              href="/gallery"
              className="block w-full px-8 py-4 bg-white rounded-full text-[1.2rem] font-normal transition-opacity border border-[#e7e7e6] text-[#51514d] hover:opacity-70"
            >
              ギャラリーの続きを見る
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
