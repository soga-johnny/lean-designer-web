'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SurveyHeader } from '@/components/survey/SurveyHeader';
import { AnnouncementBanner } from '@/components/survey/AnnouncementBanner';
import { SurveyFooter } from '@/components/survey/SurveyFooter';
import { 
  PageWrapper, 
  StaggerContainer, 
  fadeInUp, 
  buttonVariants 
} from '@/components/survey/SurveyAnimations';

export default function SurveyThanksPage() {
  return (
    <PageWrapper className="min-h-screen bg-[#F4F3F2]">
      {/* Header */}
      <motion.div 
        className="bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SurveyHeader />
      </motion.div>
      
      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnnouncementBanner />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="bg-[#F4F3F2] py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-[400px] mx-auto text-center min-h-[800px]">
          
          {/* Thank You Title with Success Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* <motion.div
              className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#00A63E"/>
                <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div> */}

            <h1 className="text-2xl font-bold text-gray-700 mb-8">
              アンケートへのご協力<br />
              ありがとうございました
            </h1>
          </motion.div>
          
          {/* Description */}
          <StaggerContainer className="mb-8">
            <motion.div 
              className="text-gray-700 leading-relaxed"
              variants={fadeInUp}
            >
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
            </motion.div>
          </StaggerContainer>

          {/* TOP Button */}
                               <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
             <motion.div
               variants={buttonVariants}
               initial="idle"
               whileHover="hover"
               whileTap="tap"
             >
               <Link
                 href="/survey"
                 className="inline-block bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-6 py-4 rounded-md font-bold transition-colors"
               >
                 TOPへ
               </Link>
             </motion.div>
           </motion.div>

        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <SurveyFooter />
      </motion.div>
    </PageWrapper>
  );
} 