'use client';

import { useEffect, useState } from 'react';

export function DisplayContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたらアニメーションを開始
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#F4F3F2' }}>
      {/* 背景のアニメーションする線の模様 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 複数の曲線をSVGで描画してアニメーションさせる */}
        <svg 
          className="absolute inset-0 w-full h-full animate-lines-flow" 
          viewBox="-800 0 3000 900" 
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="lineGradient1" cx="37%" cy="50%">
              <stop offset="0%" stopColor="rgba(174, 99, 51, 0.15)" />
              <stop offset="59%" stopColor="rgba(225, 206, 194, 0.1)" />
              <stop offset="100%" stopColor="rgba(141, 110, 141, 0.15)" />
            </radialGradient>
            <radialGradient id="lineGradient2" cx="63%" cy="30%">
              <stop offset="0%" stopColor="rgba(141, 110, 141, 0.12)" />
              <stop offset="40%" stopColor="rgba(225, 206, 194, 0.08)" />
              <stop offset="100%" stopColor="rgba(174, 99, 51, 0.12)" />
            </radialGradient>
          </defs>
          
          {/* 単一の連続する太い曲線 */}
          <path
            d="M-1000,400 Q-500,350 0,500 Q500,650 1000,400 Q1500,150 2000,500 Q2500,650 3000,400 Q3500,150 4000,500"
            stroke="url(#lineGradient1)"
            strokeWidth="180"
            fill="none"
            className="animate-single-continuous-path"
          />
        </svg>
      </div>

      {/* メインコンテンツ */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        
        {/* メインキャッチコピー */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-relaxed animate-fade-in-up" 
              style={{ 
                color: '#364153', 
                fontFamily: 'Noto Sans JP',
                fontSize: '64px',
                lineHeight: '1.5em',
                letterSpacing: '-0.02em'
              }}>
            そのアイデア、<br />
            もう少し詳しく聞かせてください
          </h1>
        </div>

        {/* サブテキスト */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <p className="text-2xl font-bold text-center animate-fade-in-up-delay"
             style={{ 
               color: '#364153', 
               fontFamily: 'Noto Sans JP',
               fontSize: '24px',
               lineHeight: '1.5em',
               letterSpacing: '-0.02em'
             }}>
            アンケートを実施中
          </p>
        </div>
      </div>
    </div>
  );
}
