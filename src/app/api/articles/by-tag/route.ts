import { NextResponse } from 'next/server';
import { getArticlesByTag } from '@/lib/microcms';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('tagId');

    if (!tagId) {
      return NextResponse.json({ error: 'タグIDが指定されていません' }, { status: 400 });
    }

    const articles = await getArticlesByTag(tagId);
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('記事取得エラー:', error);
    return NextResponse.json({ error: '記事の取得に失敗しました' }, { status: 500 });
  }
}

