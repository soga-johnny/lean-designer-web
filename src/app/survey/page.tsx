import { Hero } from '@/components/survey/Hero';
import { SurveyHeader } from '@/components/survey/SurveyHeader';
import { AnnouncementBanner } from '@/components/survey/AnnouncementBanner';
import { SurveyFooter } from '@/components/survey/SurveyFooter';

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-[#F4F3F2]">
      <SurveyHeader />
      <AnnouncementBanner />
      <Hero />
      <SurveyFooter />
    </div>
  );
}
