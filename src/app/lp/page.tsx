import { Header } from './_components/Header';
import { Footer } from './_components/Footer';
import { MobileFixedCTA } from './_components/MobileFixedCTA';
import { Content } from './_components/Content';

export default function LPPage() {
  return (
    <div className="min-h-screen bg-[#F4F3F2] pb-16 sm:pb-20 md:pb-0 overflow-x-hidden">
      {/* PC Header - Fixed Position */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <Content />
      <Footer />
      <MobileFixedCTA />
    </div>
  );
}
