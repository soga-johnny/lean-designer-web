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

  const NewBadge = () => {
    if (!isNew) return null;
    return (
      <span className="text-sm font-bold text-ld-red-600 text-right">
        NEW
      </span>
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
        <div className="bg-card rounded-2xl p-6 md:p-[3.5rem] flex flex-col md:flex-row md:gap-6 gap-0 relative cursor-pointer transition-opacity hover:opacity-80">
          <ThumbnailImage />
          <div className="flex-1">
            <div className="relative w-full h-full flex flex-col justify-between gap-2 md:gap-0">
              <NewBadge />
              <div className="flex-1 flex items-center">
                <h3 className="md:text-2xl text-base font-bold line-clamp-3 text-[#51514d]">{title || defaultTitle}</h3>
              </div>
              <div className="flex justify-between items-center before:content-[''] before:absolute md:before:-bottom-[3.4rem] before:-bottom-[1.4rem] before:right-0 before:w-[1.5rem] before:h-[4px] before:bg-[#51514d]">
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
      <div className="bg-card rounded-2xl p-4 md:p-[3.5rem] cursor-pointer transition-opacity hover:opacity-80 flex flex-col h-full relative">
        <div className="flex md:flex-row flex-col justify-between">
          <ThumbnailImage />
          <NewBadge />
          
        </div>
        <div className="flex-1 flex flex-col md:min-h-[10rem] relative">
          <h3 className="text-sm md:text-lg font-semibold my-4 line-clamp-3 text-[#51514d]">{title || defaultTitle}</h3>
          <div className="md:absolute md:bottom-0 md:left-0 md:right-0 flex justify-between items-center md:before:content-[''] md:before:absolute md:before:-bottom-[3.4rem] md:before:right-0 md:before:w-[1.5rem] md:before:h-[4px] md:before:bg-[#51514d]">
            {Tags()}
            <div className="hidden md:block">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
