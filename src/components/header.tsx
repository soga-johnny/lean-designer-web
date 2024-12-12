'use client';

import React from 'react';
import { Logo } from './logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
          <Link
            href="/form/guide"
            className="bg-primary dark:bg-primary-dark text-background dark:text-background-dark rounded-full transition-opacity hover:opacity-90 md:px-6 md:py-2 p-2"
          >
            <span className="hidden md:inline text-sm">デザイン計画書を作成する</span>
            <PencilSquareIcon className="h-5 w-5 md:hidden" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}; 