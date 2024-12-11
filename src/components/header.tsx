'use client';

import React from 'react';
import { Logo } from './logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <Link
          href="/form/guide"
          className="bg-primary text-background rounded-full transition-opacity hover:opacity-90 md:px-6 md:py-2 p-2"
        >
          <span className="hidden md:inline text-sm">デザイン計画書を作成する</span>
          <PencilSquareIcon className="h-5 w-5 md:hidden" />
        </Link>
      </div>
    </motion.header>
  );
}; 