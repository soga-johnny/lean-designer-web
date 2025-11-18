import { NextResponse } from 'next/server';
import { getTagById } from '@/lib/microcms';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await getTagById(params.id);
    return NextResponse.json({ tag });
  } catch (error) {
    console.error('タグ取得エラー:', error);
    return NextResponse.json({ error: 'タグの取得に失敗しました' }, { status: 500 });
  }
}

