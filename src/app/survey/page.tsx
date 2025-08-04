import type { Metadata } from 'next';
import { Hero } from '@/components/survey/Hero';
import { SurveyHeader } from '@/components/survey/SurveyHeader';
import { AnnouncementBanner } from '@/components/survey/AnnouncementBanner';
import { SurveyFooter } from '@/components/survey/SurveyFooter';

export const metadata: Metadata = {
  title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
  description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
  openGraph: {
    title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
    description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'Lean Designer',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
    description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
    images: ['/ogp.png'],
  },
};

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
