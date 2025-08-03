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
} from './SurveyAnimations';

export function Hero() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [otherText, setOtherText] = useState('');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    if (role !== 'other') {
      setOtherText('');
    }
  };

  const handleNext = () => {
    if (!selectedRole) return;
    
    // LocalStorageに最初の回答を保存
    const surveyData = {
      role: selectedRole,
      ...(selectedRole === 'other' && otherText && { role_other: otherText })
    };
    
    localStorage.setItem('surveyResponses', JSON.stringify(surveyData));
    
    // 2問目から開始（TOPページが1問目なので）
    router.push('/survey/form?q=2');
  };

  const isAnswered = selectedRole && (selectedRole !== 'other' || otherText.trim().length > 0);

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
            現在開発中のプロダクトアイデアを可視化する
            「Lean Designer Beta」において、サービスの品質を向上させる
            ためにアンケートを実施しております。
          </p>
          
          <p className="text-gray-700">
            アンケート最後にプロダクトの戦略を可視化する戦略
            シートをご提供しておりますので、お役に立てますと幸
            いです。
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
              あなたの現在の役職は？
            </h2>
          </div>

          {/* Question Options */}
          <StaggerContainer className="space-y-3 mb-6">
            <motion.div 
              onClick={() => handleRoleSelect('individual')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedRole === 'individual' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">個人事業主 / 個人</span>
              {selectedRole === 'individual' && (
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
              onClick={() => handleRoleSelect('dev')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedRole === 'dev' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">個人開発者</span>
              {selectedRole === 'dev' && (
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
              onClick={() => handleRoleSelect('pdm')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedRole === 'pdm' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">PdM / プロダクトオーナー</span>
              {selectedRole === 'pdm' && (
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
              onClick={() => handleRoleSelect('ceo')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedRole === 'ceo' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">CEO / 創業者</span>
              {selectedRole === 'ceo' && (
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
              onClick={() => handleRoleSelect('other')}
              className={`
                bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                ${selectedRole === 'other' ? 'border-[#364153] bg-gray-100' : ''}
              `}
              variants={fadeInUp}
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.8 }}
            >
              <span className="text-gray-700 font-bold text-lg">その他</span>
              {selectedRole === 'other' && (
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
            
            {selectedRole === 'other' && (
              <motion.div 
                className="mt-3 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <textarea
                    placeholder="現在の役職を入力してください"
                    rows={3}
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                  />
                </div>
              </motion.div>
            )}
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