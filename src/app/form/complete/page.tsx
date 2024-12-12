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

  useEffect(() => {
    if (isMobile()) {
      window.location.href = '/mobile-notice';
      return;
    }

    const generateDocument = async () => {
      try {
        // TODO: OpenAI APIを使用してデザイン計画書を生成
        // TODO: URLとパスワードを生成
        // TODO: Resend APIを使用してメール送信
        const response = await fetch('/api/generate-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        setDocumentUrl(data.url);
        setDocumentPassword(data.password);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating document:', error);
        // エラー処理
      }
    };

    generateDocument();
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
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
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
              />
              <h2 className="text-xl font-medium">デザイン計画書を生成中...</h2>
              <p className="text-gray-600">しばらくお待ちください</p>
              <div className="bg-primary/5 rounded-lg p-4 text-sm">
                    <p>α版のため、生成に時間がかかる場合があります。<br/>終わらない場合は、以下までご連絡をいただくか、後日メールにてご連絡させていただきます。<br/>メール：lean-designer@plasmism.com</p>
                  </div>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <h2 className="text-2xl font-medium">デザイン計画書が完成しました！</h2>
              <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">閲覧用URL</h3>
                  <p className="font-mono bg-gray-50 p-4 rounded">{documentUrl}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">パスワード</h3>
                  <p className="font-mono bg-gray-50 p-4 rounded">{documentPassword}</p>
                </div>
                <p className="text-sm text-gray-600">
                  ※ URLとパスワードは入力いただいたメールアドレスにも送信されています
                </p>
              </div>
              <button
                onClick={() => window.open(documentUrl, '_blank')}
                className="px-8 py-3 rounded-full text-sm bg-primary text-background hover:opacity-90 transition-opacity"
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