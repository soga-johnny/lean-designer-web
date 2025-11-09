'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideContent } from '@/components/GuideContent';
import { GalleryCard } from '@/components/GalleryCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';
import { useState } from 'react';

export default function GalleryDetailPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[100rem] mx-auto">
        {/* ギャラリー詳細とレコメンド */}
        <section className="py-20">
          {/* ギャラリー詳細 */}
          <div className="max-w-4xl mx-auto px-4 mb-20">
            {/* タグ一覧 */}
            <div className="flex gap-2 mb-6">
              <span className="text-sm text-gray-600">#デザイン</span>
              <span className="text-sm text-gray-600">#開発</span>
              <span className="text-sm text-gray-600">#戦略</span>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Gallery Item Title</h1>

            {/* 画像スライド */}
            <div className="relative mb-8">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-xl">スライド {currentSlide + 1}</p>
              </div>
            </div>

            {/* ページボタン（丸ボタン） */}
            <div className="flex justify-center gap-3 mb-12">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-gray-800'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`スライド ${index + 1} へ移動`}
                />
              ))}
            </div>

            {/* 一覧へ戻るボタン */}
            <div className="mb-12">
              <Link
                href="/gallery"
                className="block w-full px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                一覧へ戻る
              </Link>
            </div>
          </div>

          {/* レコメンド一覧 */}
          <div className="mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">レコメンド</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, index) => (
                <GalleryCard key={index} index={index} />
              ))}
            </div>
          </div>

          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー', href: '/gallery' },
              { label: 'ギャラリー詳細' }
            ]}
          />
        </section>

        <section className="py-20">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
