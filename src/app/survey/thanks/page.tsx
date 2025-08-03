'use client';

import Link from 'next/link';
import { SurveyHeader } from '@/components/survey/SurveyHeader';
import { AnnouncementBanner } from '@/components/survey/AnnouncementBanner';
import { SurveyFooter } from '@/components/survey/SurveyFooter';

export default function SurveyThanksPage() {
  return (
    <div className="min-h-screen bg-[#F4F3F2]">
      {/* Header */}
      <div className="bg-white">
        <SurveyHeader />
      </div>
      
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Main Content */}
      <div className="bg-[#F4F3F2] py-12 px-4">
        <div className="max-w-[400px] mx-auto text-center min-h-[800px]">
          
          {/* Thank You Title */}
          <h1 className="text-2xl font-bold text-gray-700 mb-8">
            アンケートへのご協力<br />
            ありがとうございました
          </h1>
          
          {/* Description */}
          <div className="mb-8 text-gray-700 leading-relaxed">
            <p className="mb-6">
              お答えいただいた内容は現在開発中のプロダクトアイデ
              アを可視化する「Lean Designer Beta」において、サー
              ビスの品質を向上させるために活用させていただきま
              す。
            </p>
            
            <p>
              担当より改めてご挨拶とお礼のメールを差し上げますの
              で、お待ちください。
            </p>
          </div>

          {/* TOP Button */}
          <Link
            href="/survey"
            className="inline-block bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-6 py-4 rounded-md font-bold transition-colors"
          >
            TOPへ
          </Link>

        </div>
      </div>

      {/* Footer */}
      <SurveyFooter />
    </div>
  );
} 