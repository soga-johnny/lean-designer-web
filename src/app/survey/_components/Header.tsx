'use client';

import Image from 'next/image';

export function Header() {
  return (
    <header>
      <div className="md:mx-10 mx-0 px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="/survey"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/logo-lp.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
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