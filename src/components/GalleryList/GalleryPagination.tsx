interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function GalleryPagination({ currentPage, totalPages, onPageChange }: GalleryPaginationProps) {
  // ページ番号配列を生成（省略記法対応）
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 7; // 最大表示ページ数

    if (totalPages <= showMax) {
      // 全ページ表示
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 常に最初のページ
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // 現在のページ周辺
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // 常に最後のページ
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xl text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <span className="underline">Prev</span>
        </button>

        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-20 h-20 rounded-full text-xl font-bold transition-colors flex items-center justify-center ${
                currentPage === page
                  ? 'bg-[#BF8058] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-xl text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <span className="underline">Next</span>
        </button>
      </div>
    </div>
  );
}
