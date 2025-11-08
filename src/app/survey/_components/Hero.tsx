'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  PageWrapper,
  StaggerContainer,
  fadeInUp,
  gentleFadeIn,
  ButtonMotion,
  buttonVariants
} from './Animations';

export function Hero() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    
    // LocalStorageに最初の回答を保存
    const surveyData = {
      q1_current_situation: selectedAnswer
    };
    
    localStorage.setItem('surveyResponses', JSON.stringify(surveyData));
    
    // フォームページの2問目から開始（Q1は既に回答済みなので）
    router.push('/survey/form?q=2');
  };

  const isAnswered = selectedAnswer !== '';

  return (
    <PageWrapper className="bg-[#F4F3F2] py-12 px-4">
      <div className="max-w-[400px] mx-auto">
        
        {/* Main Logo */}
        <motion.div 
          className="text-center mb-8"
          variants={gentleFadeIn}
          initial="initial"
          animate="in"
        >
          <Image
            src="/logo-lean-designer-beta.svg"
            alt="Lean Designer Beta"
            width={400}
            height={180}
            className="h-auto md:w-full w-[80%] mx-auto mb-6"
          />
        </motion.div>

        {/* Description Text */}
        <motion.div 
          className="mb-12 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="in"
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            現在開発中のプロダクトアイデアを可視化する「Lean Designer Beta」において、サービスの品質を向上させるためにアンケートを実施しております。
          </p>
          
          <p className="text-gray-700">
            アンケート最後にプロダクトの戦略を可視化する戦略シートをご提供しておりますので、お役に立てますと幸いです。
          </p>
        </motion.div>

        {/* Question Preview Section */}
        <motion.div 
          className="w-full mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="in"
          transition={{ delay: 0.2 }}
        >
          
          {/* Question Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              現在、実現を検討されているプロダクトのアイデアはございますか？
            </h2>
          </div>

          {/* Question Options */}
          <StaggerContainer className="space-y-3 mb-6">
            <motion.div 
              onClick={() => handleAnswerSelect('1')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedAnswer === '1' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">具体的なアイデアがあり、実現に向けて取り組んでいる</span>
              {selectedAnswer === '1' && (
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                    <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              onClick={() => handleAnswerSelect('2')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedAnswer === '2' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">興味深いアイデアがあり、これから具体化を進めたい</span>
              {selectedAnswer === '2' && (
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                    <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              onClick={() => handleAnswerSelect('3')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedAnswer === '3' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">まだアイデア検討段階だが、新しい事業に関心がある</span>
              {selectedAnswer === '3' && (
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                    <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              onClick={() => handleAnswerSelect('4')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedAnswer === '4' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">すでにアイデアを形にして事業として展開している</span>
              {selectedAnswer === '4' && (
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                    <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          </StaggerContainer>

          {/* Progress Bar */}
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="in"
            transition={{ delay: 0.4 }}
          >
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gray-300"
                initial={{ width: '0%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="in"
            transition={{ delay: 0.5 }}
          >
            <ButtonMotion
              onClick={handleNext}
              disabled={!isAnswered}
              className={`
                inline-block px-6 py-4 rounded-md font-bold transition-colors
                ${isAnswered 
                  ? 'bg-[#BF8058] hover:bg-[#5C2D2B] text-white' 
                  : 'bg-[#DEC1A9] text-white cursor-not-allowed'
                }
              `}
              variants={buttonVariants}
              initial="idle"
              whileHover={isAnswered ? "hover" : "idle"}
              whileTap={isAnswered ? "tap" : "idle"}
            >
              次へ
            </ButtonMotion>
          </motion.div>

        </motion.div>

      </div>
    </PageWrapper>
  );
} 