import Image from 'next/image';
import Link from 'next/link';
import { GalleryTag } from './GalleryTag';

interface GalleryCardProps {
  galleryId: string;
  title?: string;
  tags?: string[];
  size?: 'large' | 'small';
  createdAt?: Date;
}

const isWithinTwoWeeks = (createdAt?: Date): boolean => {
  if (!createdAt) return false;
  const daysDifference = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysDifference <= 14;
};

const getRandomThumbnail = (): string => {
  const thumbnailNumber = Math.floor(Math.random() * 5) + 1;
  return `/garalley-thumbnails/thumbnail-${thumbnailNumber}.png`;
};

export function GalleryCard({ galleryId, title, tags, size = 'small', createdAt }: GalleryCardProps) {
  const defaultTitle = `デザイン思考とリーンスタートアップを活用した新規事業開発プロジェクト`;
  const defaultTags = ['デザイン', '開発'];

  const thumbnailSrc = getRandomThumbnail();
  const thumbnailWidth = size === 'large' ? 'w-[16rem]' : 'w-[7rem]';

  // 2週間以内ならNEWを表示
  const isNew = isWithinTwoWeeks(createdAt);

  const ThumbnailImage = () => (
    <div className={`${thumbnailWidth} rounded-lg overflow-hidden bg-[#EFE2D6]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailSrc}
        alt={title || defaultTitle}
        className="w-full h-auto object-cover aspect-square"
      />
    </div>
  );

  const Tags = () => (
    <div className="flex gap-2 flex-wrap">
      {(tags || defaultTags).map((tag) => (
        <GalleryTag key={tag} tag={tag} size="small" />
      ))}
    </div>
  );

  const NewBadge = ({ position }: { position: 'top-0 right-0' | 'top-16 right-16' }) => {
    if (!isNew) return null;
    return (
      <div className={`absolute ${position} px-3 py-1 text-base font-semibold text-[#51514d]`}>
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

  if (size === 'large') {
    return (
      <Link href={`/gallery/${galleryId}`} className="block">
        <div className="bg-card rounded-lg p-16 flex relative cursor-pointer transition-opacity hover:opacity-80">
          <ThumbnailImage />
          <div className="flex-1 pl-8">
            <div className="relative w-full h-full flex flex-col justify-between">
              <NewBadge position="top-0 right-0" />
              <div className="flex-1 flex items-center">
                <h3 className="text-2xl font-semibold line-clamp-3 text-[#51514d]">{title || defaultTitle}</h3>
              </div>
              <div className="flex justify-between items-center before:content-[''] before:absolute before:-bottom-[4rem] before:right-0 before:w-[1.5rem] before:h-[4px] before:bg-[#51514d]">
                {Tags()}
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/gallery/${galleryId}`} className="block h-full">
      <div className="bg-card rounded-lg p-16 cursor-pointer transition-opacity hover:opacity-80 flex flex-col h-full relative">
        <NewBadge position="top-16 right-16" />
        <ThumbnailImage />
        <div className="flex-1 flex flex-col min-h-[10rem] relative">
          <h3 className="text-xl font-semibold my-4 line-clamp-3 text-[#51514d]">{title || defaultTitle}</h3>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center before:content-[''] before:absolute before:-bottom-[4rem] before:right-0 before:w-[1.5rem] before:h-[4px] before:bg-[#51514d]">
            {Tags()}
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}
