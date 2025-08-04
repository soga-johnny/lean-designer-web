'use client';

import Image from 'next/image';

export function SurveyHeader() {
  return (
    <header>
      <div className="md:mx-10 mx-0 px-4 py-4 flex items-center justify-between">
        
        {/* Plasmism Logo */}
        <div className="flex items-center">
          <a 
            href="https://plasmism.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/logo-plasmism.svg"
              alt="Plasmism"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
          </a>
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-700 hidden md:inline">
            プロダクト開発フェーズのアイデアを、3分で可視化する
          </span>
          
          <a 
            href="https://prtimes.jp/main/html/rd/p/000000004.000154085.html"
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors inline-block"
          >
            プレスリリース
          </a>
        </div>

      </div>
    </header>
  );
} 