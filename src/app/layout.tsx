import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lean-designer.tech'),
  title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
  description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
  openGraph: {
    title: 'Lean Designer Beta | プロダクトアイデアを３分で可視化',
    description: 'プロダクト構想フェーズ専門コンセプトシートAI生成サービス',
    images: ['/ogp.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}