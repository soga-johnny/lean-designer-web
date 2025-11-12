'use client';

import Link from 'next/link';

export const Footer = () => {

  return (
    <footer className="md:bg-ld-grey-100 bg-white border-t border-ld-grey-100 md:border-none">
      <div className="py-3 px-10 md:py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 text-xs">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-x-4">
              <Link href="/terms" className="text-center text-ld-grey-400 over:opacity-80 transition-opacity">利用規約</Link>
              <Link href="/privacy" className="text-center text-ld-grey-400 hover:opacity-80 transition-opacity">プライバシーポリシー</Link>
              <Link href="https://plasmism.com/" target="_blank" rel="noopener noreferrer" className="text-center text-ld-grey-400 hover:opacity-80 transition-opacity">運営会社</Link>
            </div>
          </div>
          <div className="text-center text-ld-grey-400">&copy;2025 Plasmism Inc.</div>
        </div>
        
      </div>
    </footer>
  );
}; 