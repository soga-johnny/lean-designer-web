import type { Metadata } from 'next';
import { notoSansJP, ebGaramond } from '@/lib/fonts';
import { FormProvider } from '@/contexts/FormContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lean Designer | 開発専門のハイエンドUI/UXソリューション',
  description: 'ピンポイントの開発課題を必要な分だけスペシャリストのデザイナーに発注ができる、UI/UXデザインソリューション',
  openGraph: {
    title: 'Lean Designer | 開発専門のハイエンドUI/UXソリューション',
    description: 'ピンポイントの開発課題を必要な分だけスペシャリストのデザイナーに発注ができる、UI/UXデザインソリューション',
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
    title: 'Lean Designer | 開発専門のハイエンドUI/UXソリューション',
    description: 'ピンポイントの開発課題を必要な分だけスペシャリストのデザイナーに発注ができる、UI/UXデザインソリューション',
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
      <body className="bg-background text-text">
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}
