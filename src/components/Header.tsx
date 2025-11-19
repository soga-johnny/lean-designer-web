'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header 
      className="md:fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 md:px-10">
        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sm  ">
              アイデア可視化サービス | Lean Designer
            </span>
          </div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/images/common/logo.png" 
              alt="Lean Designer Logo" 
              width={30} 
              height={22}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 items-center gap-4">
          {/* Left: Text */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sm   whitespace-nowrap">
              アイデア可視化サービス | Lean Designer
            </span>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/images/common/logo.png" 
                alt="Lean Designer Logo" 
                width={30} 
                height={22}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right: Links and CTA */}
          <div className="flex items-center justify-end gap-2">
            <PrimaryButton
              size="small"
              href="/survey"
            >
              アンケートサイト
            </PrimaryButton>
          </div>
        </div>
      </div>
    </motion.header>
  );
}; 