interface GallerySkeletonProps {
  layout?: 'list' | 'top';
  count: number;
}

export function GallerySkeleton({ layout = 'list', count }: GallerySkeletonProps) {
  if (layout === 'list') {
    // ギャラリー一覧ページ: 3列グリッド
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg p-16">
              {/* サムネイル */}
              <div className="w-[7rem] bg-gray-300 rounded-lg aspect-square mb-4"></div>
              
              {/* タイトル */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-5 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
              </div>
              
              {/* タグとアイコン */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // トップページ: 1段目は横長2枚、2-3段目は4列
  const largeCount = 2;
  const smallCount = count - largeCount;

  return (
    <>
      {/* 1段目: 横長カード2枚 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[...Array(largeCount)].map((_, index) => (
          <div key={`large-${index}`} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg p-16 flex">
              {/* サムネイル */}
              <div className="w-[16rem] bg-gray-300 rounded-lg aspect-square"></div>
              
              <div className="flex-1 pl-8">
                {/* タイトル */}
                <div className="space-y-3 mb-8">
                  <div className="w-full h-6 bg-gray-300 rounded"></div>
                  <div className="w-5/6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-4/6 h-6 bg-gray-300 rounded"></div>
                </div>
                
                {/* タグとアイコン */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex gap-2">
                    <div className="w-16 h-6 bg-gray-300 rounded"></div>
                    <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2-3段目: 4列グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(smallCount)].map((_, index) => (
          <div key={`small-${index}`} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg p-16">
              {/* サムネイル */}
              <div className="w-[7rem] bg-gray-300 rounded-lg aspect-square mb-4"></div>
              
              {/* タイトル */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-5 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
              </div>
              
              {/* タグとアイコン */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

