import { GalleryCard } from '../GalleryCard';

interface GalleryGridProps {
  itemsCount: number;
  layout?: 'list' | 'top';
}

export function GalleryGrid({ itemsCount, layout = 'list' }: GalleryGridProps) {
  if (layout === 'list') {
    // ギャラリー一覧ページ: 3列×4段
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[...Array(itemsCount)].map((_, index) => (
          <GalleryCard key={index} index={index} />
        ))}
      </div>
    );
  }

  // トップページ: 1段目は横長2枚、2-3段目は4列
  return (
    <div className="mb-12">
      {/* 1段目: 横長カード2枚 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[0, 1].map((index) => (
          <GalleryCard key={index} index={index} />
        ))}
      </div>

      {/* 2-3段目: 4列×2段 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <GalleryCard key={index + 2} index={index + 2} />
        ))}
      </div>
    </div>
  );
}
