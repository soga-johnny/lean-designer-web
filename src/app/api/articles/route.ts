import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/microcms';

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('記事取得エラー:', error);
    return NextResponse.json({ error: '記事の取得に失敗しました' }, { status: 500 });
  }
}

