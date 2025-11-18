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
  const isLarge = size === 'large';

  const thumbnailSrc = getRandomThumbnail();
  const thumbnailWidth = isLarge ? 'md:w-[16rem]' : 'md:w-[7rem]';

  // 2週間以内ならNEWを表示
  const isNew = isWithinTwoWeeks(createdAt);

  const ThumbnailImage = () => (
    <div className={`${thumbnailWidth} max-md:w-[7rem] rounded-lg overflow-hidden bg-[#EFE2D6]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailSrc}
        alt={title}
        className="w-full h-auto object-cover aspect-square"
      />
    </div>
  );

  const Tags = () => (
    tags ? (
      (tags).map((tag) => (
        <GalleryTag key={tag} tag={tag} size="small" />
      ))
    ) : null
  );

  const NewBadge = () => (
    isNew ? (
      <span className="text-sm font-bold text-ld-red-600 text-right">
        NEW
      </span>
    ) : null
  );

  const ArrowIcon = () => (
    <div className="relative px-[0.2rem] w-[1.5rem] h-[1.5rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/arrow.svg" alt="" className="w-full h-full object-contain" />
    </div>
  );

  return (
    <>
      {isLarge && (
        (
          <Link href={`/gallery/${galleryId}`} className="max-md:hidden block">
            <div className="bg-card rounded-lg md:p-16 max-md:p-5 flex relative cursor-pointer transition-opacity hover:opacity-80">
              <ThumbnailImage />
              <div className="flex-1 pl-8">
                <div className="relative w-full h-full flex flex-col justify-between">
                  <NewBadge />
                  <div className="flex-1 flex items-center">
                    <h3 className="text-2xl font-semibold md:line-clamp-3 max-md:line-clamp-4 text-[#51514d]">{title}</h3>
                  </div>
                  <div className="flex justify-between items-center md:before:content-[''] max-md:before:hidden before:absolute before:-bottom-[4rem] before:right-0 before:w-[1.5rem] before:h-[4px] before:bg-[#51514d]">
                    <div className="flex gap-2 flex-wrap">
                      {Tags()}
                    </div>
                    <div className="max-md:hidden">
                      <ArrowIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      )}
      <Link href={`/gallery/${galleryId}`} className={`${isLarge ? "md:hidden" : ""} block h-full`}>
        <div className="bg-card rounded-lg md:p-16 max-md:p-5 cursor-pointer transition-opacity hover:opacity-80 flex flex-col h-full relative">
          <div className="flex justify-between">
            <ThumbnailImage />
            <NewBadge />
          </div>
          <div className="flex-1 flex flex-col min-h-[10rem] relative">
            <h3 className="text-xl my-4 font-semibold md:line-clamp-3 max-md:line-clamp-4 text-[#51514d]">{title}</h3>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center md:before:content-[''] max-md:before:hidden before:absolute before:-bottom-[4rem] before:right-0 before:w-[1.5rem] before:h-[4px] before:bg-[#51514d]">
              <div className="flex gap-2 flex-wrap">
                {Tags()}
              </div>
              <div className="max-md:hidden">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
