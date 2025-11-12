import { NextRequest, NextResponse } from 'next/server';
import { SessionService } from '@/services/sessionService';
import { logger } from '@/lib/logger';

const sessionService = new SessionService();

/**
 * セッション取得API
 * GET /api/v1/sessions/[sessionId]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const traceId = logger.generateTraceId();

  try {
    const { sessionId } = params;

    logger.info('セッション取得API開始', { sessionId }, traceId);

    // バリデーション
    if (!sessionId) {
      logger.warn('sessionIdが指定されていません', {}, traceId);
      return NextResponse.json(
        {
          success: false,
          error: 'sessionIdが必要です',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // セッション取得
    const session = await sessionService.getSession(sessionId);

    logger.info('セッション取得API成功', { sessionId }, traceId);

    return NextResponse.json({
      success: true,
      session,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('セッション取得APIエラー', {
      sessionId: params.sessionId,
      error: error.message
    }, traceId);

    // エラーの種類に応じてステータスコードを設定
    const statusCode =
      error.message.includes('見つかりません') ||
      error.message.includes('有効期限が切れています') ? 404 : 500;

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}

