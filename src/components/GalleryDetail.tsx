'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SessionDetail } from '@/services/sessionService';

interface GalleryDetailProps {
  session: SessionDetail | null;
  loading: boolean;
  error: string | null;
}

export function GalleryDetail({ session, loading, error }: GalleryDetailProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // generated_contentからページキーの配列を取得
  const pageKeys = session?.generated_content
    ? Object.keys(session.generated_content).sort()
    : [];

  const totalSlides = pageKeys.length;

  // 現在のページのHTMLコンテンツを取得
  const getCurrentPageContent = () => {
    if (!session?.generated_content || pageKeys.length === 0) return null;

    const pageKey = pageKeys[currentSlide];
    const pageData = session.generated_content[pageKey] as Record<string, unknown> | undefined;

    // page_1_xxxx.content.content.html_content の構造に対応
    const content = pageData?.content as Record<string, unknown> | undefined;
    const contentContent = content?.content as Record<string, unknown> | undefined;
    const htmlContent = contentContent?.html_content as string | undefined;

    return htmlContent || null;
  };

  const htmlContent = getCurrentPageContent();

  return (
    <div className="max-w-4xl mx-auto px-4 mb-20">
      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {session?.session_name || 'ギャラリー詳細'}
      </h1>

      {/* スライド部分（ローディング・エラー表示） */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      ) : error || !session ? (
        <div className="text-center py-12 mb-12">
          <p className="text-red-600">{error || 'セッションが見つかりません'}</p>
        </div>
      ) : (
        <>
          {/* HTMLコンテンツ表示（iframe使用） */}
          <div className="relative mb-8">
            {htmlContent ? (
              <iframe
                srcDoc={htmlContent}
                className="w-full h-[600px] border-0 rounded-lg shadow-sm bg-white"
                title={`ページ ${currentSlide + 1}`}
                sandbox="allow-same-origin"
              />
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">コンテンツがありません</p>
              </div>
            )}
          </div>

          {/* ページボタン（丸ボタン） */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-3 mb-12">
              {pageKeys.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-gray-800'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`ページ ${index + 1} へ移動`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* 一覧へ戻るボタン（常に表示） */}
      <div className="mb-12">
        <Link
          href="/gallery"
          className="block w-full px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
        >
          一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
