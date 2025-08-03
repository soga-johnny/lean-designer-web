'use client';

import Link from 'next/link';
import { NextStepsCard } from '@/components/survey/NextStepsCard';

export default function SurveyThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ありがとうございました！
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            アンケートへのご協力、誠にありがとうございました。<br />
            いただいたご回答をもとに、戦略シートを作成してお送りいたします。
          </p>
        </div>

        {/* Next Steps Card */}
        <div className="mb-12">
          <NextStepsCard />
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            ホームに戻る
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>メールが届かない場合は、迷惑メールフォルダもご確認ください。</p>
          </div>
        </div>

      </div>
    </div>
  );
} 