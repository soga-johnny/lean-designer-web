'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SurveyProvider, useSurvey } from '@/contexts/SurveyContext';
import { QuestionCard } from '@/components/survey/QuestionCard';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { getQuestionByNumber } from '@/data/surveyQuestions';
import { saveFormDataToFirestore, sendThankYouEmail, prepareSurveyPayload } from '@/lib/utils';

function SurveyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const { responses, setResponses, isSubmitting, setIsSubmitting } = useSurvey();
  const [emailInput, setEmailInput] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  useEffect(() => {
    // クエリパラメータがない場合は最初の質問にリダイレクト
    if (!q) {
      router.push('/survey/form?q=1');
      return;
    }

    // 質問番号の妥当性チェック
    const questionNumber = parseInt(q);
    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > 10) {
      router.push('/survey/form?q=1');
      return;
    }
  }, [q, router]);

  const questionNumber = q ? parseInt(q) : 1;
  const currentQuestion = getQuestionByNumber(questionNumber);

  // メール入力表示の制御
  useEffect(() => {
    if (questionNumber === 10 && responses.email_and_nda === 'agree') {
      setShowEmailInput(true);
    } else {
      setShowEmailInput(false);
    }
  }, [questionNumber, responses.email_and_nda]);

  const handleAnswerChange = (questionId: string, value: string, otherText?: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
      ...(otherText && { [`${questionId}_other`]: otherText })
    }));
  };

  const handleEmailChange = (email: string) => {
    setEmailInput(email);
    setResponses(prev => ({ ...prev, email }));
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    
    const answer = responses[currentQuestion.id];
    if (!answer) return false;
    
    // 「その他」を選択した場合は、テキスト入力も必要
    if (answer === 'other' && currentQuestion.showOther) {
      const otherText = responses[`${currentQuestion.id}_other`];
      return otherText && otherText.trim().length > 0;
    }
    
    // 最後の質問でメール入力が必要な場合
    if (questionNumber === 10 && answer === 'agree') {
      return emailInput.trim().length > 0 && emailInput.includes('@');
    }
    
    return true;
  };

  const handleNext = () => {
    if (questionNumber < 10) {
      router.push(`/survey/form?q=${questionNumber + 1}`);
    }
  };

  const handlePrevious = () => {
    if (questionNumber > 1) {
      router.push(`/survey/form?q=${questionNumber - 1}`);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // データの準備
      const payload = prepareSurveyPayload({
        ...responses,
        email: emailInput,
        allowInterview: responses.allowInterview === 'yes',
        agreeNDA: responses.email_and_nda === 'agree',
        excitement: parseInt(responses.excitement || '50')
      });
      
      // Firestoreに保存
      await saveFormDataToFirestore(payload, 'survey_responses');
      
      // メール送信
      if (emailInput) {
        await sendThankYouEmail(emailInput);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar current={questionNumber} total={10} />
        </div>

        {/* Question Number */}
        <div className="text-center mb-8">
          <span className="text-lg text-gray-600 dark:text-gray-400">
            【{questionNumber}/10】
          </span>
        </div>

        {/* Question Card */}
        <div className="mb-8">
          <QuestionCard
            title={currentQuestion.title}
            options={currentQuestion.options}
            showOther={currentQuestion.showOther}
            value={responses[currentQuestion.id] || ''}
            otherText={responses[`${currentQuestion.id}_other`] || ''}
            onChange={(value, otherText) => handleAnswerChange(currentQuestion.id, value, otherText)}
          />
        </div>

        {/* Email Input */}
        {showEmailInput && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={questionNumber === 1}
            className={`
              px-6 py-3 rounded-full transition-all
              ${questionNumber === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
              }
            `}
          >
            戻る
          </button>

          {/* Next/Submit Button */}
          {questionNumber < 10 ? (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className={`
                px-6 py-3 rounded-full transition-all
                ${isCurrentQuestionAnswered()
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
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
                px-6 py-3 rounded-full transition-all
                ${isCurrentQuestionAnswered() && !isSubmitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default function SurveyFormPage() {
  return (
    <SurveyProvider>
      <SurveyFormContent />
    </SurveyProvider>
  );
} 