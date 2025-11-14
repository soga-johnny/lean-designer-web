'use client';

import { useState } from 'react';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SessionDetail } from '@/services/sessionService';

interface GalleryDetailProps {
  session: SessionDetail | null;
  loading: boolean;
  error: string | null;
}

export function GalleryDetail({ session, loading, error }: GalleryDetailProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // generated_contentからページキーの配列を取得（数値順にソート）
  const pageKeys = session?.generated_content
    ? Object.keys(session.generated_content).sort((a, b) => {
        // page_1_xxxx から数値部分を抽出して比較
        const numA = parseInt(a.match(/page_(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/page_(\d+)/)?.[1] || '0');
        return numA - numB;
      })
    : [];

  const totalSlides = pageKeys.length;

  // スライド移動
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // 指定ページのHTMLコンテンツを取得
  const getPageContent = (pageKey: string) => {
    if (!session?.generated_content) return null;

    const pageData = session.generated_content[pageKey] as Record<string, unknown> | undefined;

    // page_1_xxxx.content.content.html_content の構造に対応
    const content = pageData?.content as Record<string, unknown> | undefined;
    const contentContent = content?.content as Record<string, unknown> | undefined;
    const htmlContent = contentContent?.html_content as string | undefined;

    return htmlContent || null;
  };

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
          {/* HTMLコンテンツ表示（カルーセル形式） */}
          <div className="relative mb-8">
            {pageKeys.length > 0 ? (
              <>
                {/* 画面幅いっぱいのabsolute領域（PCのみ） / SP時は通常のflow */}
                <div className="max-md:static max-md:w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:w-screen">
                  {/* スライドコンテナの外側ラッパー */}
                  <div className="max-md:block md:overflow-hidden">
                    <div className="max-md:block md:flex md:items-center md:h-[38rem] md:min-h-[38rem]">
                      <div
                        className="flex max-md:flex-col max-md:gap-8 md:transition-transform md:duration-500 md:ease-in-out"
                        style={{
                          transform: window.innerWidth >= 768
                            ? `translateX(calc(50vw - 27rem - ${currentSlide * 54}rem))`
                            : 'none'
                        }}
                      >
                        {pageKeys.map((pageKey, index) => {
                          const htmlContent = getPageContent(pageKey);
                          return (
                            <div
                              key={pageKey}
                              className="max-md:w-full max-md:h-[600px] md:w-[54rem] md:h-[38rem] md:min-w-[54rem] md:min-h-[38rem] flex-shrink-0 md:transition-all md:duration-300 bg-gray-200 rounded-lg"
                              style={{
                                scale: window.innerWidth >= 768 && currentSlide === index ? '1' : window.innerWidth >= 768 ? '0.9' : '1'
                              }}
                            >
                              {htmlContent ? (
                                <iframe
                                  srcDoc={htmlContent}
                                  className="w-full h-full border-0 rounded-lg shadow-sm bg-white"
                                  title={`ページ ${index + 1}`}
                                  sandbox="allow-same-origin"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                  <p className="text-gray-500">コンテンツがありません</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 左右の矢印ボタン（PCのみ表示） */}
                  {totalSlides > 1 && (
                    <div className="max-md:hidden">
                      <button
                        onClick={goToPrevious}
                        className="absolute left-1/2 -translate-x-1/2 -ml-[27rem] top-1/2 -translate-y-1/2 w-16 h-16 bg-[#F6F6F5] hover:bg-white border border-[#E7E7E6] rounded-md shadow-lg flex items-center justify-center transition-all z-10"
                        aria-label="前のページ"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/icons/slide-arrow.svg" alt="" className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute left-1/2 -translate-x-1/2 ml-[27rem] top-1/2 -translate-y-1/2 w-16 h-16 bg-[#F6F6F5] hover:bg-white border border-[#E7E7E6] rounded-md shadow-lg flex items-center justify-center transition-all z-10"
                        aria-label="次のページ"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/icons/slide-arrow.svg" alt="" className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* スペーサー（高さ確保・PCのみ） */}
                <div className="max-md:hidden md:h-[38rem]"></div>
              </>
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
                  onClick={() => goToSlide(index)}
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

      <SecondaryButton href="/gallery" className="w-full">一覧へ戻る</SecondaryButton>
    </div>
  );
}
