'use client';

/**
 * Draft Mode バナーコンポーネント
 * プレビューモードが有効な場合に表示される
 */
export function DraftModeBanner() {
  const handleExit = () => {
    // Draft Mode を無効化（draftKey パラメータを除いたパスにリダイレクト）
    const currentPath = window.location.pathname;
    window.location.href = '/api/disable-draft?redirectTo=' + encodeURIComponent(currentPath);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-gray-900 p-1.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
            />
          </svg>
          <span className="font-medium text-sm md:text-base">
            プレビューモード
          </span>
          <span className="text-xs md:text-sm">
            コンテンツの下書き表示中
          </span>
        </div>
        
        <button
          onClick={handleExit}
          className="p-1.5 bg-ld-grey-900 text-white text-xs rounded-md hover:opacity-70 transition-colors"
        >
          プレビュー終了
        </button>
      </div>
    </div>
  );
}

