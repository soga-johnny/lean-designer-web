import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/microcms';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    const { contents, totalCount } = await getArticles(limit, offset);

    return NextResponse.json({
      success: true,
      articles: contents,
      pagination: {
        limit: limit || totalCount,
        offset: offset || 0,
        total: totalCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('記事取得エラー:', error);
    return NextResponse.json({
      success: false,
      error: '記事の取得に失敗しました'
    }, { status: 500 });
  }
}

