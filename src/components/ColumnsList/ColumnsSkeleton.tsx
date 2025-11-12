interface ColumnsSkeletonProps {
  count: number;
}

export function ColumnsSkeleton({ count }: ColumnsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* サムネイル */}
          <div className="w-full aspect-[2/1] bg-gray-200 mb-2"></div>
          
          {/* 日付とNEWバッジ */}
          <div className="flex items-center gap-2 my-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          
          {/* タイトル */}
          <div className="space-y-2 mb-4">
            <div className="w-full h-5 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
          </div>
          
          {/* タグとアイコン */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

