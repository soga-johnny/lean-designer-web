'use client';

export function MobileFixedCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EFE2D6] p-3 sm:p-4">
      <a
        href="https://app.lean-designer.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white w-full py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-colors flex items-center justify-center gap-2 sm:gap-3"
      >
        <span className="bg-white text-[#BF8058] px-2 py-1 rounded text-xs sm:text-sm font-bold">無料</span>
        まずは試してみる
      </a>
    </div>
  );
}
