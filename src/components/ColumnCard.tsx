'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tag } from '@/types/microcms';

interface ColumnCardProps {
  columnId: string;
  title?: string;
  date?: string;
  tags?: Tag[];
  createdAt?: Date;
  thumbnailUrl?: string;
}

const isWithinTwoWeeks = (createdAt?: Date): boolean => {
  if (!createdAt) return false;
  const daysDifference = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysDifference <= 14;
};

export function ColumnCard({ columnId, title, date, tags, createdAt, thumbnailUrl }: ColumnCardProps) {
  const router = useRouter();
  const thumbnailSrc = thumbnailUrl || '/images/common/column_thumbnail.png';
  const isNew = isWithinTwoWeeks(createdAt);

  const ThumbnailImage = () => (
    <div className="w-full overflow-hidden bg-[#EFE2D6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailSrc}
        alt={title || ''}
        className="w-full h-auto object-cover aspect-[2/1]"
      />
    </div>
  );

  const handleTagClick = (e: React.MouseEvent, tagId: string) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/columns?tag=${tagId}`);
  };

  const Tags = () => (
    <div className="flex gap-2 flex-wrap">
      {tags?.map((tag) => (
        <span
          key={tag.id}
          onClick={(e) => handleTagClick(e, tag.id)}
          className="text-sm text-ld-grey-400 hover:opacity-70 transition-opacity cursor-pointer"
        >
          #{tag.name}
        </span>
      ))}
    </div>
  );

  const NewBadge = () => {
    if (!isNew) return null;
    return (
      <div className="text-sm font-bold text-ld-red-600">
        NEW
      </div>
    );
  };

  const ArrowIcon = () => (
    <div className="relative px-[0.2rem] w-[1.5rem] h-[1.5rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/arrow.svg" alt="" className="w-full h-full object-contain" />
    </div>
  );

  return (
    <Link href={`/columns/${columnId}`} className="block h-full group">
      <div className="cursor-pointer transition-opacity hover:opacity-80 flex flex-col relative">
        <ThumbnailImage />
        <div className="flex-1 flex flex-col min-h-[10rem] relative">
          <div className="flex items-center gap-2 my-2">
            <NewBadge />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/calendar.svg" alt="" className="w-4 h-4" />
            <p className="text-sm font-bold">{date}</p>
          </div>
          <h3 className="text-xl font-semibold mb-4 line-clamp-2 group-hover:underline transition-all duration-300">{title}</h3>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center">
            {Tags()}
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}
