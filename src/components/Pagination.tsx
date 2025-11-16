interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  // ページ番号配列を生成（省略記法対応）
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 3; // 最大表示ページ数

    if (totalPages <= showMax) {
      // 全ページ表示
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 現在のページ位置に応じて表示を決定
    if (currentPage <= 2) {
      // 最初の方: 1, 2, 3, ...
      for (let i = 1; i <= showMax; i++) {
        pages.push(i);
      }
      pages.push('...');
    } else if (currentPage >= totalPages - 1) {
      // 最後の方: ..., totalPages-2, totalPages-1, totalPages
      pages.push('...');
      for (let i = totalPages - showMax + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 中間: ..., current-1, current, current+1, ...
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`text-center ${className}`}>
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
              className={`md:w-20 md:h-20 md:min-w-20 md:min-h-20 max-md:w-16 max-md:h-16 max-md:min-w-16 max-md:min-h-16 rounded-full text-xl font-bold transition-colors flex items-center justify-center ${
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
