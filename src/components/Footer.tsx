import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background dark:bg-background-dark py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Logo />
          <div className="flex flex-col md:flex-row gap-8 text-sm">
            <div className="space-x-6">
              <Link href="/terms" className="hover:underline text-text dark:text-text-dark">利用規約</Link>
              <Link href="/privacy" className="hover:underline text-text dark:text-text-dark">プライバシーポリシー</Link>
            </div>
            <a 
              href="https://plasmism.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline text-text dark:text-text-dark"
            >
              運営会社
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 