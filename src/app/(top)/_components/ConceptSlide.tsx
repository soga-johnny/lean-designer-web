'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function ConceptSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;
  const slides = [
    '/images/top/concept_slide_01.png',
    '/images/top/concept_slide_02.png',
    '/images/top/concept_slide_03.png',
    '/images/top/concept_slide_04.png',
    '/images/top/concept_slide_05.png',
  ];

  // 自動スライド切り替え（3秒ごと）
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <section className="py-10 px-6 md:py-[88px] md-px-10">
      <div className="max-w-content mx-auto">

        {/* 概要 */}
        <p className="text-center text-sm md:text-lg font-medium">
        （ アイデアの総体 、コンセプトシート・ギャラリー ）
        </p>

        {/* メインメッセージ */}
        <h1 className={`text-6xl md:text-[152px] tracking-tight font-medium flex flex-col md:flex-row items-center justify-center text-center mt-4 md:mt-2 ${inter.className}`}>
          <div>DESIGN</div>
          <div className="flex justify-center w-4 md:w-16"><div className="relative w-1 md:w-2 h-[42px] md:h-28 bg-gray-400 rotate-[20deg]"></div></div>
          <div><span className="text-ld-grey-100">BY</span> INTENT</div>
        </h1>

        {/* 画像スライド部分 */}
        <div className="md:mt-10 mt-4"> 
          <div className="relative mb-8 overflow-hidden">
            <div className="aspect-video relative md:max-w-[1200px] mx-auto">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide}
                    alt={`コンセプトスライド ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ページング（丸ボタン5つ） */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index
                    ? 'bg-ld-grey-700'
                    : 'bg-ld-grey-200 hover:bg-ld-grey-400'
                }`}
                aria-label={`スライド ${index + 1} へ移動`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
