'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Lean Designer
            <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm px-2 py-1 rounded-full ml-3 align-top">
              Beta
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            現在開発中のプロダクトアイデアを可視化する<br />
            「Lean Designer Beta」において、サービスの品質を向上させる<br />
            ためにアンケートを実施しております。
          </p>
        </div>

        {/* Survey Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            アンケート概要
          </h2>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              アンケート最後にプロダクトの戦略を可視化する戦略シートをご提供しておりますので、お役に立てますと幸いです。
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">所要時間5分</h3>
                  <p className="text-sm">10問の簡単な質問にお答えください</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 dark:text-green-300 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">戦略シート配布</h3>
                  <p className="text-sm">プロダクトアイデアについてお聞かせください</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Info */}
        <div className="flex items-center justify-center space-x-4 mb-8 text-gray-500 dark:text-gray-400">
          <span className="text-sm">【1/10】</span>
          <span className="text-sm">あなたの現在の役職は？</span>
        </div>

        {/* CTA Button */}
        <Link
          href="/survey/form?q=1"
          className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
        >
          開始する
        </Link>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-900 dark:bg-white transition-all duration-300"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">0%</p>
        </div>

      </div>
    </div>
  );
} 