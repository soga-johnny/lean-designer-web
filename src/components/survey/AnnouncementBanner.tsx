'use client';

export function AnnouncementBanner() {
  return (
    <div className="bg-[#2B2325] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          
          <div className="flex items-center space-x-2">
            <div className="bg-white text-[#2B2325] px-2 py-1 rounded text-sm md:text-lg font-bold">
              所要時間5分
            </div>
          </div>

          <span className="hidden md:inline text-base md:text-xl font-bold">
            プロダクトを可視化する戦略シート配布中
          </span>

          <div className="hidden md:block w-px h-5 bg-white"></div>

          <span className="text-base md:text-xl font-bold">
            プロダクトアイデアについてお聞かせください
          </span>

        </div>
      </div>
    </div>
  );
} 