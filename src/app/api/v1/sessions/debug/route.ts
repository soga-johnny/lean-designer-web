import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/logger';

/**
 * デバッグ用API - Supabaseのテーブル情報を確認
 * GET /api/v1/sessions/debug
 */
export async function GET() {
  const traceId = logger.generateTraceId();

  try {
    logger.info('デバッグAPI開始', {}, traceId);

    const supabase = createServerSupabaseClient();

    // 1. sessionsテーブルの全データを取得（有効期限チェックなし）
    const { data: allSessions, error: allError, count: allCount } = await supabase
      .from('sessions')
      .select('*', { count: 'exact' });

    // 2. 有効期限が切れていないセッション
    const { data: validSessions, error: validError, count: validCount } = await supabase
      .from('sessions')
      .select('*', { count: 'exact' })
      .gte('expires_at', new Date().toISOString());

    return NextResponse.json({
      success: true,
      debug: {
        currentTime: new Date().toISOString(),
        allSessions: {
          count: allCount,
          data: allSessions,
          error: allError ? { message: allError.message, code: allError.code } : null
        },
        validSessions: {
          count: validCount,
          data: validSessions,
          error: validError ? { message: validError.message, code: validError.code } : null
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('デバッグAPIエラー', { error: error.message }, traceId);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
