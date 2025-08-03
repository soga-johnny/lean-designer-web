'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SurveyProvider, useSurvey } from '@/contexts/SurveyContext';
import { getQuestionByNumber } from '@/data/surveyQuestions';
import { saveFormDataToFirestore, sendThankYouEmail } from '@/lib/utils';

function SurveyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const { responses, setResponses, isSubmitting, setIsSubmitting } = useSurvey();

  useEffect(() => {
    // クエリパラメータがない場合は2問目にリダイレクト（1問目はTOPページ）
    if (!q) {
      router.push('/survey/form?q=2');
      return;
    }

    // 質問番号の妥当性チェック
    const questionNumber = parseInt(q);
    if (isNaN(questionNumber) || questionNumber < 2 || questionNumber > 8) {
      router.push('/survey/form?q=2');
      return;
    }
  }, [q, router]);

  const questionNumber = q ? parseInt(q) : 1;
  const currentQuestion = getQuestionByNumber(questionNumber);

  const handleAnswerChange = (questionId: string, value: string | string[], otherText?: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
      ...(otherText && { [`${questionId}_other`]: otherText })
    }));
  };

  const handleMultipleAnswerChange = (questionId: string, value: string, checked: boolean) => {
    setResponses(prev => {
      const currentValues = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentValues.filter(v => v !== value)
        };
      }
    });
  };



  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    
    const answer = responses[currentQuestion.id];
    
    // 統合フォーム（最終ページ）の場合
    if (currentQuestion.type === 'combined') {
      const name = responses.name as string;
      const email = responses.email as string;
      const surveySource = responses.survey_source as string;
      const monitorInterest = responses.monitor_interest;
      
      return (
        name && name.trim().length > 0 &&
        email && email.trim().length > 0 && email.includes('@') && email.includes('.') &&
        surveySource && surveySource.trim().length > 0 &&
        monitorInterest && (monitorInterest === 'interested' || monitorInterest === 'not_interested')
      );
    }
    
    // 自由記載フィールドの場合
    if (currentQuestion.type) {
      if (!answer || (typeof answer === 'string' && answer.trim().length === 0)) {
        return false;
      }
      // メールアドレスの簡単な検証
      if (currentQuestion.type === 'email' && typeof answer === 'string') {
        return answer.includes('@') && answer.includes('.');
      }
      return true;
    }
    
    // 複数選択の場合
    if (currentQuestion.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    // 単一選択の場合
    if (!answer) return false;
    
    // 「その他」を選択した場合は、テキスト入力も必要
    if (answer === 'other' && currentQuestion.showOther) {
      const otherText = responses[`${currentQuestion.id}_other`];
      return otherText && typeof otherText === 'string' && otherText.trim().length > 0;
    }
    
    return true;
  };

  const handleNext = () => {
    if (questionNumber < 8) {
      router.push(`/survey/form?q=${questionNumber + 1}`);
    }
  };

  const handlePrevious = () => {
    if (questionNumber > 2) {
      router.push(`/survey/form?q=${questionNumber - 1}`);
    } else if (questionNumber === 2) {
      router.push('/survey');
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Firestoreに保存（回答データをそのまま保存）
      await saveFormDataToFirestore(responses, 'survey_responses');
      
      // メール送信
      if (responses.email && typeof responses.email === 'string') {
        await sendThankYouEmail(responses.email);
      }
      
      // LocalStorageをクリア
      localStorage.removeItem('surveyResponses');
      
      // 完了ページへリダイレクト
      router.push('/survey/thanks');
      
    } catch (error) {
      console.error('Survey submission error:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング状態
  if (!q || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F3F2]">
      {/* Header and Banner */}
      <div className="bg-white">
        <div className="md:mx-10 mx-0 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="https://plasmism.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src="/logo-plasmism.svg"
                alt="Plasmism"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-700 hidden md:inline">
              プロダクト開発フェーズのアイデアを、3分で可視化する
            </span>
            <button className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors">
              プレスリリース
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#2B2325] text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-[#2B2325] px-2 py-1 rounded text-sm md:text-lg font-bold">
                所要時間5分
              </div>
            </div>
            <span className="hidden md:inline text-base md:text-xl font-bold">
              プロダクトを可視化する戦略シート配布中
            </span>
            <div className="hidden md:block w-px h-5 bg-white"></div>
            <span className="text-base md:text-xl font-bold">
              プロダクトアイデアについてお聞かせください
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F4F3F2] py-12 px-4">
        <div className="max-w-[400px] mx-auto">

          {/* Question Title */}
          <div className="text-center mt-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              {currentQuestion.title}
            </h2>
          </div>

          {/* Question Content */}
          <div className="w-full mx-auto">
            
                                      {/* Question Content */}
             {currentQuestion.type === 'combined' ? (
               // 統合フォーム（最終ページ）
               <div className="space-y-6 mb-6">
                 {/* お名前 */}
                 <div>
                   <label className="block text-gray-700 font-bold text-lg mb-3">お名前を教えてください</label>
                   <input
                     type="text"
                     placeholder="お名前"
                     value={String(responses.name || '')}
                     onChange={(e) => handleAnswerChange('name', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                   />
                 </div>
                 
                 {/* メールアドレス */}
                 <div>
                   <label className="block text-gray-700 font-bold text-lg mb-3">メールアドレスを教えてください</label>
                   <input
                     type="email"
                     placeholder="your@email.com"
                     value={String(responses.email || '')}
                     onChange={(e) => handleAnswerChange('email', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                   />
                 </div>
                 
                 {/* アンケートの知り方 */}
                 <div>
                   <label className="block text-gray-700 font-bold text-lg mb-3">このアンケートをどのように知られたかを教えてください</label>
                   <textarea
                     placeholder="お答えください"
                     rows={3}
                     value={String(responses.survey_source || '')}
                     onChange={(e) => handleAnswerChange('survey_source', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                   />
                 </div>
                 
                 {/* モニターユーザーの興味 */}
                 <div>
                   <label className="block text-gray-700 font-bold text-lg mb-3">無料でプロダクトの戦略策定をさせていただく モニターユーザーを募集しています。ご興味はありますか？</label>
                   <div className="space-y-3">
                     <div 
                       onClick={() => handleAnswerChange('monitor_interest', 'interested')}
                       className={`
                         bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                         ${responses.monitor_interest === 'interested' ? 'border-[#364153] bg-gray-100' : ''}
                       `}
                     >
                       <span className="text-gray-700 font-bold text-lg">ある</span>
                       {responses.monitor_interest === 'interested' && (
                         <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                             <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                       )}
                     </div>
                     
                     <div 
                       onClick={() => handleAnswerChange('monitor_interest', 'not_interested')}
                       className={`
                         bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                         ${responses.monitor_interest === 'not_interested' ? 'border-[#364153] bg-gray-100' : ''}
                       `}
                     >
                       <span className="text-gray-700 font-bold text-lg">ない</span>
                       {responses.monitor_interest === 'not_interested' && (
                         <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                             <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             ) : currentQuestion.type ? (
               // 自由記載フィールド
               <div className="space-y-6 mb-6">
                 <div>
                   {currentQuestion.type === 'textarea' ? (
                     <textarea
                       placeholder="お答えください"
                       rows={4}
                       value={String(responses[currentQuestion.id] || '')}
                       onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                       className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                     />
                   ) : (
                     <input
                       type={currentQuestion.type}
                       placeholder={currentQuestion.type === 'email' ? 'your@email.com' : 'お答えください'}
                       value={String(responses[currentQuestion.id] || '')}
                       onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                       className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                     />
                   )}
                 </div>
               </div>
             ) : currentQuestion.multiple ? (
               // 複数選択（チェックボックス）
               <div className="space-y-3 mb-6">
                 {currentQuestion.options?.map((option) => {
                   const isChecked = Array.isArray(responses[currentQuestion.id]) && (responses[currentQuestion.id] as string[]).includes(option.value);
                   return (
                     <div 
                       key={option.value}
                       onClick={() => handleMultipleAnswerChange(currentQuestion.id, option.value, !isChecked)}
                       className={`
                         bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                         ${isChecked ? 'border-[#364153] bg-gray-100' : ''}
                       `}
                     >
                       <span className="text-gray-700 font-bold text-lg">{option.label}</span>
                       {isChecked && (
                         <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                             <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                       )}
                     </div>
                   );
                 })}
               </div>
             ) : (
               // 単一選択（ラジオボタン）
               <div className="space-y-3 mb-6">
                 {currentQuestion.options?.map((option) => (
                   <div 
                     key={option.value}
                     onClick={() => handleAnswerChange(currentQuestion.id, option.value)}
                     className={`
                       bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer relative
                       ${responses[currentQuestion.id] === option.value ? 'border-[#364153] bg-gray-100' : ''}
                     `}
                   >
                     <span className="text-gray-700 font-bold text-lg">{option.label}</span>
                     {responses[currentQuestion.id] === option.value && (
                       <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="12" cy="12" r="9.5" fill="#00A63E" stroke="#00A63E"/>
                           <path d="M8.5 12l2 2 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                       </div>
                     )}
                   </div>
                 ))}
                 
                 {/* Other Input */}
                 {currentQuestion.showOther && responses[currentQuestion.id] === 'other' && (
                   <div className="mt-3 space-y-1">
                     <span className="text-gray-700 font-bold text-lg">その他</span>
                     <div className="mb-8">
                       <textarea
                         placeholder="具体的な内容を入力してください"
                         rows={3}
                         value={String(responses[`${currentQuestion.id}_other`] || '')}
                         onChange={(e) => handleAnswerChange(currentQuestion.id, 'other', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                       />
                     </div>
                   </div>
                 )}
               </div>
             )}



                         {/* Progress Bar */}
             <div className="mb-6">
               {/* <div className="flex justify-end mb-2">
                 <span className="text-sm text-gray-500">{Math.round((questionNumber / 8) * 100)}%</span>
               </div> */}
               <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-[#BF8058] transition-all duration-300"
                   style={{ width: `${(questionNumber / 8) * 100}%` }}
                 />
               </div>
             </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse space-y-8 justify-center items-center">
              
              {/* Previous Button */}
              {questionNumber >= 2 && (
                <button
                  onClick={handlePrevious}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← 戻る
                </button>
              )}

              {/* Spacer */}
              <div className="flex-1"></div>

                             {/* Next/Submit Button */}
               {questionNumber < 8 ? (
                 <button
                   onClick={handleNext}
                   disabled={!isCurrentQuestionAnswered()}
                   className={`
                     inline-block px-6 py-4 rounded-md font-bold transition-colors
                     ${isCurrentQuestionAnswered()
                       ? 'bg-[#BF8058] hover:bg-[#5C2D2B] text-white'
                       : 'bg-[#DEC1A9] text-white cursor-not-allowed'
                     }
                   `}
                 >
                   次へ
                 </button>
               ) : (
                 <button
                   onClick={handleSubmit}
                   disabled={!isCurrentQuestionAnswered() || isSubmitting}
                   className={`
                     inline-block px-6 py-4 rounded-md font-bold transition-colors
                     ${isCurrentQuestionAnswered() && !isSubmitting
                       ? 'bg-[#BF8058] hover:bg-[#5C2D2B] text-white'
                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     }
                   `}
                 >
                   {isSubmitting ? '送信中...' : '送信'}
                 </button>
               )}

            </div>

          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 mt-12">
        <div className="mx-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <a 
                href="https://plasmism.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors"
              >
                運営会社
              </a>
              <a href="/terms" className="hover:text-gray-700 transition-colors">
                利用規約
              </a>
              <a href="/privacy" className="hover:text-gray-700 transition-colors">
                プライバシーポリシー
              </a>
            </div>
            <div>
              <span>©2025 Plasmism Inc.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400">読み込み中...</div>
    </div>
  );
}

export default function SurveyFormPage() {
  return (
    <SurveyProvider>
      <Suspense fallback={<LoadingFallback />}>
        <SurveyFormContent />
      </Suspense>
    </SurveyProvider>
  );
} 