'use client';

import { useState } from 'react';

export function ConceptSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 概要 */}
        <p className="text-center text-gray-600 mb-4">
          アプリを一文で表した概要文がここに入ります
        </p>

        {/* メインメッセージ */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          メインメッセージがここに入ります
        </h2>

        {/* 画像スライド部分 */}
        <div className="relative mb-8">
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-xl">スライド {currentSlide + 1}</p>
          </div>
        </div>

        {/* ページング（丸ボタン5つ） */}
        <div className="flex justify-center gap-3">
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
      </div>
    </section>
  );
}
