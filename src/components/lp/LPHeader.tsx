'use client';

import Image from 'next/image';
import { useState } from 'react';

export function LPHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-[#F4F3F2] fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 md:mx-10 px-4 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-10 h-10 md:w-14 md:h-14 border border-[#E1DEDB] rounded-lg flex items-center justify-center">
            <a 
              href="https://plasmism.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/lp/デザイン全般（UI/名刺/チラシ/デザイン全般（UI/名刺/チラシ/logo-lp.png"
                alt="Lean Designer"
                width={32}
                height={24}
                className="w-6 h-6 md:w-14 md:h-14"
              />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`bg-[#364153] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-[#364153] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-[#364153] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <a href="#features" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">特徴</a>
          <a href="#problems" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">お悩み</a>
          <a href="#reasons" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">選ばれる理由</a>
          <a href="#usage" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">利用の流れ</a>
          <a href="#functions" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">機能一覧</a>
          <a href="#faq" className="text-sm font-bold text-[#364153] hover:text-[#BF8058] transition-colors">よくあるご質問</a>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="https://app.lean-designer.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2"
          >
            <span className="bg-white text-[#BF8058] px-2 py-1 rounded text-xs font-bold">無料</span>
            <span className="hidden lg:inline">まずは試してみる</span>
            <span className="lg:hidden">試す</span>
          </a>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 py-4 bg-[#F4F3F2] border-t border-gray-200">
          <div className="space-y-4">
            <a 
              href="#features" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              特徴
            </a>
            <a 
              href="#problems" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              お悩み
            </a>
            <a 
              href="#reasons" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              選ばれる理由
            </a>
            <a 
              href="#usage" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              利用の流れ
            </a>
            <a 
              href="#functions" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              機能一覧
            </a>
            <a 
              href="#faq" 
              className="block text-base font-bold text-[#364153] hover:text-[#BF8058] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              よくあるご質問
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
