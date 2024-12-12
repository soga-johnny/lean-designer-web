'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from '@/contexts/FormContext';
import { Logo } from '@/components/logo';
import { isMobile } from '@/lib/utils';

export default function FormConfirmPage() {
  const router = useRouter();
  const { formData } = useForm();
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    if (isMobile()) {
      window.location.href = '/mobile-notice';
      return;
    }

    // フォームデータが空の場合は入力画面にリダイレクト
    if (!formData.basicInfo.serviceName) {
      router.push('/form/input');
    } else {
      setIsLoading(false); // データが取得できたらローディングを解除
    }
  }, [formData, router]);

  const handleGenerateDocument = async () => {
    // TODO: AIによるデザイン計画書生成処理
    router.push('/form/complete');
  };

  if (isLoading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background dark:bg-background-dark"
    >
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl text-center mb-12 relative inline-block dark:text-gray-200">
            入力内容の確認
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20 dark:bg-primary-dark/20"></span>
          </h1>

          <div className="space-y-12">
            {/* 基本情報 */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium dark:text-text-dark">基本情報</h2>
              <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">サービス（プロダクト）名</h3>
                  <p className="dark:text-text-dark">{formData.basicInfo.serviceName}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">サービス（プロダクト）の目的</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.basicInfo.serviceGoals.map((goal) => (
                      <span key={goal} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">対象ユーザー</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.targetUser}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">期待される効果</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.expectedEffect}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">予算</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.budget}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">開発期間</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.developmentPeriod}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">制約条件</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.basicInfo.constraints.map((constraint) => (
                      <span key={constraint} className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-200">
                        {constraint}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">品質要件</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.qualityRequirements}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">SEOの重要性</h3>
                  <p className="dark:text-gray-200">{formData.basicInfo.seoImportance}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">その他の要件</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.basicInfo.otherRequirements.map((requirement) => (
                      <span key={requirement} className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-200">
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 技術情報 */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium dark:text-text-dark">技術情報</h2>
              <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">技術スタック</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.technicalInfo.techStack.map((tech) => (
                      <span key={tech} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">チーム構成</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.technicalInfo.teamStructure.map((member) => (
                      <span key={member} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">コミュニケーションツール</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.technicalInfo.communicationTools.map((tool) => (
                      <span key={tool} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">プロジェクト管理ツール</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.technicalInfo.projectManagementTools.map((tool) => (
                      <span key={tool} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">現状の課題</h3>
                  <p className="dark:text-gray-200">{formData.technicalInfo.currentIssues}</p>
                </div>
              </div>
            </section>

            {/* デザイン情報 */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium dark:text-text-dark">デザイン情報</h2>
              <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">ペルソナ</h3>
                  <p className="dark:text-text-dark">{formData.designInfo.persona}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">カスタマージャーニー</h3>
                  <p className="dark:text-gray-200">{formData.designInfo.customerJourney}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">市場ポジショニング</h3>
                  <p className="dark:text-gray-200">{formData.designInfo.marketPositioning}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">カラーパターン</h3>
                  <p className="dark:text-gray-200">{formData.designInfo.colorPattern}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">デザインキーワード</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.designInfo.designKeywords.map((keyword) => (
                      <span key={keyword} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">インタラクション</h3>
                  <p>{formData.designInfo.interaction}</p>
                </div>
              </div>
            </section>

            {/* 会社情報 */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium dark:text-text-dark">会社情報</h2>
              <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">担当者名</h3>
                  <p className="dark:text-text-dark">{formData.companyInfo.personInCharge}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">役職</h3>
                  <p>{formData.companyInfo.position}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">会社名</h3>
                  <p>{formData.companyInfo.companyName}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">メールアドレス</h3>
                  <p>{formData.companyInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">サービスを知ったきっかけ</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.companyInfo.referralSource.map((source) => (
                      <span key={source} className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#61585A] rounded-full text-sm dark:text-text-dark">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-full text-sm border border-primary dark:border-[#61585A] hover:bg-primary/5 dark:hover:bg-[#6B4A4F]/20 transition-colors dark:text-text-dark"
          >
            入力内容を修正
          </button>
          <button
            onClick={handleGenerateDocument}
            className="px-8 py-3 rounded-full text-sm bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 transition-opacity border dark:border-[#61585A]"
          >
            デザイン計画書を生成
          </button>
        </div>
      </footer>
    </motion.div>
  );
} 