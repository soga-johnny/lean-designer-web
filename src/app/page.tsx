import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

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

export default function Home() {
  // rootアクセス時は/surveyにリダイレクト
  redirect('/survey');
}