import { NextResponse } from 'next/server';
import { getTags } from '@/lib/microcms';

export async function GET() {
  try {
    const tags = await getTags();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('タグ取得エラー:', error);
    return NextResponse.json({ error: 'タグの取得に失敗しました' }, { status: 500 });
  }
}

