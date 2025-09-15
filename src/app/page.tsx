import { LPHeader } from '@/components/lp/LPHeader';
import { LPFooter } from '@/components/lp/LPFooter';
import { MobileFixedCTA } from '@/components/lp/MobileFixedCTA';
import { LPContent } from '@/components/lp/LPContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F3F2] pb-16 sm:pb-20 md:pb-0">
      {/* PC Header - Fixed Position */}
      <div className="hidden lg:block">
        <LPHeader />
      </div>

      <LPContent />
      <LPFooter />
      <MobileFixedCTA />
    </div>
  );
}
