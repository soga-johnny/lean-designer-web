'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/contexts/FormContext';
import { Logo } from '@/components/logo';
import { isMobile } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CompletePage() {
  const { formData, generatedDocument } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (isMobile()) {
      window.location.href = '/mobile-notice';
      return;
    }

    // フォームデータまたは生成結果が空の場合は入力画面にリダイレクト
    if (!formData.basicInfo.serviceName || !generatedDocument) {
      router.push('/form/input');
    }
  }, [formData, generatedDocument, router]);

  if (!generatedDocument) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background dark:bg-background-dark"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-8 text-center">
            <h2 className="text-2xl font-medium dark:text-text-dark">デザイン計画書が完成しました！</h2>
            <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">閲覧用URL</h3>
                <p className="font-mono bg-gray-50 dark:bg-[#231F1F] p-4 rounded dark:text-text-dark border dark:border-[#61585A]">{generatedDocument.url}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">パスワード</h3>
                <p className="font-mono bg-gray-50 dark:bg-[#231F1F] p-4 rounded dark:text-text-dark border dark:border-[#61585A]">{generatedDocument.password}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ※ URLとパスワードは入力いただいたメールアドレスにも送信されています
              </p>
            </div>
            <button
              onClick={() => window.open(generatedDocument.url, '_blank')}
              className="px-8 py-3 rounded-full text-sm bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 transition-opacity border dark:border-[#61585A]"
            >
              デザイン計画書を開く
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
} 