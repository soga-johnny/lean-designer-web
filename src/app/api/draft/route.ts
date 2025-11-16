import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getArticleById } from '@/lib/microcms';

/**
 * Draft Mode を有効化する API Route
 * 
 * microCMS のプレビュー機能から呼び出される
 * クエリパラメータ: 
 *   - contentId: 記事ID
 *   - draftKey: プレビュー用のキー
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('contentId');
  const draftKey = searchParams.get('draftKey');

  // パラメータチェック
  if (!contentId || !draftKey) {
    return new Response('Missing contentId or draftKey', { status: 400 });
  }

  // ドラフトキーを使って記事が取得できるか確認
  let article;
  try {
    article = await getArticleById(contentId, draftKey);
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return new Response('Failed to fetch article', { status: 500 });
  }
  
  if (!article) {
    return new Response('Article not found', { status: 404 });
  }

  // Draft Mode を有効化
  draftMode().enable();
  
  // 記事詳細ページにリダイレクト（draftKeyをクエリパラメータとして渡す）
  redirect(`/columns/${contentId}?draftKey=${draftKey}`);
}

