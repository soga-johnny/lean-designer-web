import { NextResponse } from 'next/server';
import { getArticlesByTag } from '@/lib/microcms';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('tagId');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    if (!tagId) {
      return NextResponse.json({ error: 'タグIDが指定されていません' }, { status: 400 });
    }

    const { contents, totalCount } = await getArticlesByTag(tagId, limit, offset);
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
    return NextResponse.json({ success: false, error: '記事の取得に失敗しました' }, { status: 500 });
  }
}

