import type { Metadata } from 'next';
import { getArticleById } from '@/lib/microcms';
import { stripHtml } from './stripHtml';
import { truncateText } from './truncateText';

/**
 * メタデータを動的に生成（SEO対応）
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const article = await getArticleById(params.id);
    
    if (!article) {
      return {
        title: 'Lean Designer',
      };
    }

    // 本文からHTMLタグを除去してプレーンテキスト化
    const plainContent = article.content ? stripHtml(article.content) : '';
    
    // 70文字でトリミングして三点リーダーを追加
    const description = truncateText(plainContent, 80);

    return {
      title: `${article.title} | Lean Designer`,
      description: description,
      openGraph: {
        title: `${article.title} | Lean Designer`,
        description: description,
        images: article.eyecatch?.url ? [article.eyecatch.url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${article.title} | Lean Designer`,
        description: description,
        images: article.eyecatch?.url ? [article.eyecatch.url] : [],
      },
    };
  } catch (error) {
    console.error('メタデータの生成に失敗しました:', error);
    return {
      title: 'コラム | Lean Designer',
    };
  }
}

