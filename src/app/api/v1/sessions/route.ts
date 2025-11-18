import { NextRequest, NextResponse } from 'next/server';
import { SessionService } from '@/services/sessionService';
import { logger } from '@/lib/logger';

const sessionService = new SessionService();

/**
 * セッション一覧取得API
 * GET /api/v1/sessions?limit=10&offset=0
 */
export async function GET(request: NextRequest) {
  const traceId = logger.generateTraceId();

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const genresParam = searchParams.get('genres');
    const genres = genresParam ? genresParam.split(',').map(g => g.trim()).filter(g => g) : undefined;

    logger.info('セッション一覧取得API開始', { limit, offset, genres }, traceId);

    // バリデーション
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'limitは1〜100の範囲で指定してください',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    if (offset < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'offsetは0以上で指定してください',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // セッション一覧取得
    const { sessions, total } = await sessionService.getSessions(limit, offset, genres);

    logger.info('セッション一覧取得API成功', { count: sessions.length, total, genres }, traceId);

    return NextResponse.json({
      success: true,
      sessions,
      pagination: {
        limit,
        offset,
        total
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('セッション一覧取得APIエラー', {
      error: errorMessage
    }, traceId);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
