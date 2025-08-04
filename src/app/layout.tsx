import type { Metadata } from 'next';
import { notoSansJP, ebGaramond } from '@/lib/fonts';
import { FormProvider } from '@/contexts/FormContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClarityScript from '@/components/ClarityScript';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
  description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
  openGraph: {
    title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
    description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'Lean Designer',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
    description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
    images: ['/ogp.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${ebGaramond.variable}`}>
      <head>
        <GoogleAnalytics />
        <ClarityScript />
      </head>
      <body className="bg-background dark:bg-background-dark text-text dark:text-text-dark">
        <ThemeProvider>
          <FormProvider>
            {children}
          </FormProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
