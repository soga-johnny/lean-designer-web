import type { Metadata } from 'next';
import { notoSansJP, ebGaramond } from '@/lib/fonts';
import { FormProvider } from '@/contexts/FormContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lean Designer - デザインでかなえるスマートな開発体験',
  description: 'UI/UXの要件定義をまとめたデザイン計画書をAIを活用して生成',
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
