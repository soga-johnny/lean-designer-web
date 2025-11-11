'use client';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export function BottomConceptArea() {
  return (
    <section className="py-10 px-6 md:py-32 md:px-0">
      <p className="text-center text-sm md:text-lg md:font-medium font-normal">
        （ アイデアの総体 、コンセプトシート・ギャラリー ）
      </p>

      <div className={`text-6xl md:text-[9.5rem] tracking-tight font-medium flex flex-col md:flex-row items-center justify-between mt-1 md:mt-2 ${inter.className}`}>
        <span className="flex items-center gap-4 md:block"><span>DE</span>SIGN</span>
        <span className="flex justify-center w-4 md:w-16"><span className="relative w-1 md:w-2 h-[42px] md:h-28 bg-gray-400 rotate-[20deg]"></span></span>
        <span className="flex items-center gap-4 md:block"><span className="text-ld-grey-100">BY</span><span className="md:hidden block"> INTENT</span></span>
        <span className="md:block hidden">INTENT</span>
      </div>
    </section>
  );
}
