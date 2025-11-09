import Image from 'next/image';
import Link from 'next/link';
import { GalleryTag } from './GalleryTag';

interface GalleryCardProps {
  index: number;
  gallery_id: string;
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

export function GalleryCard({ index, gallery_id, title, tags, size = 'small', createdAt }: GalleryCardProps) {
  const defaultTitle = `デザイン思考とリーンスタートアップを活用した新規事業開発プロジェクト ${index + 1}`;
  const defaultTags = ['デザイン', '開発'];

  // 1-5のランダムな番号を生成
  const thumbnailNumber = Math.floor(Math.random() * 5) + 1;
  const thumbnailSrc = `/garalley-thumbnails/thumbnail-${thumbnailNumber}.png`;

  const thumbnailWidth = size === 'large' ? 'w-[16rem]' : 'w-[7rem]';

  // 2週間以内ならNEWを表示
  const isNew = isWithinTwoWeeks(createdAt);

  const ThumbnailImage = () => (
    <div className={`${thumbnailWidth} rounded-lg overflow-hidden`} style={{ backgroundColor: '#EFE2D6' }}>
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

  if (size === 'large') {
    return (
      <Link href={`/gallery/${gallery_id}`} className="block">
        <div className="bg-card rounded-lg p-16 flex relative cursor-pointer transition-opacity hover:opacity-80">
          <ThumbnailImage />
          <div className="flex-1 pl-8 flex flex-col justify-center relative">
            {isNew && (
              <div className="absolute top-0 right-0 px-3 py-1 text-base font-semibold" style={{ color: '#51514d' }}>
                NEW
              </div>
            )}
            <h3 className="text-2xl font-semibold line-clamp-3" style={{ color: '#51514d' }}>{title || defaultTitle}</h3>
            <div className="absolute bottom-0 left-8">
              {Tags()}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/gallery/${gallery_id}`} className="block">
      <div className="bg-card rounded-lg p-16 relative cursor-pointer transition-opacity hover:opacity-80">
        {isNew && (
          <div className="absolute top-16 right-16 px-3 py-1 rounded text-base font-semibold" style={{ color: '#51514d' }}>
            NEW
          </div>
        )}
        <ThumbnailImage />
        <h3 className={`text-xl font-semibold my-4 line-clamp-3`} style={{ color: '#51514d' }}>{title || defaultTitle}</h3>
        {Tags()}
      </div>
    </Link>
  );
}
