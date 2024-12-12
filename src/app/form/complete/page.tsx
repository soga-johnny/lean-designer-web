'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/contexts/FormContext';
import { Logo } from '@/components/logo';
import { isMobile } from '@/lib/utils';

export default function CompletePage() {
  const { formData } = useForm();
  const [isGenerating, setIsGenerating] = useState(true);
  const [documentUrl, setDocumentUrl] = useState('');
  const [documentPassword, setDocumentPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMobile()) {
      window.location.href = '/mobile-notice';
      return;
    }

    const generateDocument = async () => {
      try {
        setError(null);
        const response = await fetch('/api/generate-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 504) {
          throw new Error('生成に時間がかかりすぎています。しばらく時間をおいて再度お試しください。');
        }

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error('サーバーからの応答が不正です。しばらく時間をおいて再度お試しください。');
        }
        
        if (!response.ok) {
          throw new Error(data.error || 'デザイン計画書の生成中にエラーが発生しました');
        }

        if (!data.url || !data.password) {
          throw new Error('生成されたデータが不完全です');
        }

        setDocumentUrl(data.url);
        setDocumentPassword(data.password);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating document:', error);
        setError(error instanceof Error ? error.message : 'エラーが発生しました');
        setIsGenerating(false);
      }
    };

    generateDocument();
  }, [formData]);

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
          {isGenerating ? (
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary dark:border-[#413639] border-t-transparent rounded-full mx-auto"
              />
              <h2 className="text-xl font-medium dark:text-text-dark">デザイン計画書を生成中...</h2>
              <p className="text-gray-600 dark:text-gray-400">しばらくお待ちください</p>
              <div className="bg-primary/5 dark:bg-[#231F1F] rounded-lg p-4 text-sm dark:text-gray-400">
                <p>α版のため、生成に時間がかかる場合があります。<br/>終わらない場合は、以下までご連絡をいただくか、後日メールにてご連絡させていただきます。<br/>メール：lean-designer@plasmism.com</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center space-y-4">
              <div className="bg-red-50 dark:bg-[#231F1F] rounded-lg p-6">
                <h2 className="text-xl font-medium text-red-600 dark:text-red-400 mb-2">エラーが発生しました</h2>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  お手数ですが、以下のメールアドレスまでご連絡ください：<br/>
                  lean-designer@plasmism.com
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <h2 className="text-2xl font-medium dark:text-text-dark">デザイン計画書が完成しました！</h2>
              <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">閲覧用URL</h3>
                  <p className="font-mono bg-gray-50 dark:bg-[#231F1F] p-4 rounded dark:text-text-dark border dark:border-[#61585A]">{documentUrl}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">パスワード</h3>
                  <p className="font-mono bg-gray-50 dark:bg-[#231F1F] p-4 rounded dark:text-text-dark border dark:border-[#61585A]">{documentPassword}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ※ URLとパスワードは入力いただいたメールアドレスにも送信されています
                </p>
              </div>
              <button
                onClick={() => window.open(documentUrl, '_blank')}
                className="px-8 py-3 rounded-full text-sm bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 transition-opacity border dark:border-[#61585A]"
              >
                デザイン計画書を開く
              </button>
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
} 