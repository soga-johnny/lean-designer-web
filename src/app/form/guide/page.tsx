'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { isMobile } from '@/lib/utils';

export default function FormGuidePage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
    window.addEventListener('resize', () => setIsMobileDevice(isMobile()));
    return () => window.removeEventListener('resize', () => setIsMobileDevice(isMobile()));
  }, []);

  if (isMobileDevice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark px-4">
        <div className="text-center">
          <h1 className="text-xl mb-4 dark:text-text-dark">スマートフォン未対応</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            PCより再度アクセスください
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background dark:bg-background-dark flex flex-col items-center justify-center px-4"
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl text-center mb-12 relative inline-block dark:text-text-dark">
          デザイン計画書作成
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20 dark:bg-primary-dark/20"></span>
        </h1>

        <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-12 shadow-sm mb-8">
          <p className="text-lg mb-8 dark:text-text-dark">
            現在携わっている開発プロジェクトの詳細を教えてください。
          </p>

          <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary/20 dark:bg-[#6B4A4F] rounded-full"></span>
              所要時間：最短3分
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary/20 dark:bg-[#6B4A4F] rounded-full"></span>
              不明箇所は空欄のままで問題ございません
            </li>
          </ul>

          <div className="flex items-center gap-2 mb-8">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-[#61585A] text-primary dark:text-primary-dark focus:ring-primary/20 dark:focus:ring-primary-dark/20"
            />
            <label htmlFor="agreement" className="text-sm dark:text-text-dark">
              <Link href="/terms" className="underline" target="_blank">利用規約</Link>
              と
              <Link href="/privacy" className="underline" target="_blank">プライバシーポリシー</Link>
              に同意する
            </label>
          </div>

          <div className="text-center">
            <Link
              href={isAgreed ? "/form/input" : "#"}
              className={`inline-block px-8 py-3 rounded-full text-sm transition-all
                ${isAgreed 
                  ? 'bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 border dark:border-[#61585A]' 
                  : 'bg-gray-200 dark:bg-[#2B2325] text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              onClick={(e) => !isAgreed && e.preventDefault()}
            >
              入力を開始する
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 