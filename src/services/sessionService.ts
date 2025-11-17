import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/logger';

// セッション一覧用の最小限のインターフェース
export interface Session {
  session_id: string;
  created_at: string;
  updated_at: string;
  session_name: string;
  generated_content: Record<string, unknown> | null; // 最初のページのみ
  genres: string[] | null;
}

// セッション詳細用の完全なインターフェース
export interface SessionDetail extends Session {
  user_inputs: Record<string, unknown> | null;
  processing_status: Record<string, unknown> | null;
  current_section: number;
  status: string;
  expires_at: string;
  design_preferences: Record<string, unknown> | null;
  processing_config: Record<string, unknown> | null;
  user_id: string | null;
  is_template: boolean;
  created_by_user: boolean;
  part1_generated: boolean;
  part2_generated: boolean;
  description: string | null;
}

/**
 * セッション管理サービス（読み取り専用）
 */
export class SessionService {
  /**
   * セッション一覧を取得（デフォルトで有効期限切れを含む）
   */
  async getSessions(limit: number = 10, offset: number = 0, genres?: string[]): Promise<{ sessions: Session[]; total: number }> {
    const traceId = logger.generateTraceId();

    try {
      logger.info('セッション一覧取得開始', { limit, offset, genres }, traceId);

      const supabase = createServerSupabaseClient();

      // 必要な項目のみをSELECT
      // user_inputsとgenerated_contentは全て取得
      const selectFields = 'session_id, created_at, updated_at, session_name, generated_content, user_inputs, genres';

      // クエリを構築
      let query = supabase
        .from('sessions')
        .select(selectFields, { count: 'exact' })
        // FIXME: 検証のため期限切れのデータも取得する
        .gte('expires_at', new Date().toISOString());

      // genresフィルター: 指定されたジャンルのいずれかを含むセッションを取得
      if (genres && genres.length > 0) {
        // JSONB配列に対するOR条件フィルタ
        // 各ジャンルに対して contains 演算子でチェックし、OR条件で結合
        const orConditions = genres
          .map(genre => `genres.cs.["${genre}"]`)
          .join(',');
        query = query.or(orConditions);
      }

      // セッション一覧を取得
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        logger.error('セッション一覧取得エラー（Supabase）', {
          error: error.message,
          code: error.code
        }, traceId);
        throw new Error(`セッション一覧取得に失敗しました: ${error.message}`);
      }

      // generated_contentから最初のページのみを抽出
      const sessions: Session[] = (data || []).map((row: Session) => {
        const content = row.generated_content;
        const firstPage = content?.['page_1_cover'] ?? content?.['1'] ?? content?.[1];

        return {
          ...row,
          generated_content: (firstPage && typeof firstPage === 'object')
            ? firstPage as Record<string, unknown>
            : null
        };
      });

      logger.info('セッション一覧取得成功', { count: sessions.length, total: count }, traceId);

      return {
        sessions,
        total: count || 0
      };

    } catch (error: unknown) {
      logger.error('セッション一覧取得エラー', {
        error: error instanceof Error ? error.message : String(error)
      }, traceId);
      throw error;
    }
  }

  /**
   * セッションを取得（全項目）
   */
  async getSession(sessionId: string): Promise<SessionDetail> {
    const traceId = logger.generateTraceId();

    try {
      logger.info('セッション取得開始', { sessionId }, traceId);

      const supabase = createServerSupabaseClient();

      // セッションを取得
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (error) {
        logger.error('セッション取得エラー（Supabase）', {
          sessionId,
          error: error.message,
          code: error.code
        }, traceId);

        if (error.code === 'PGRST116') {
          throw new Error('セッションが見つかりません');
        }
        throw new Error(`セッション取得に失敗しました: ${error.message}`);
      }

      if (!data) {
        throw new Error('セッションが見つかりません');
      }

      logger.info('セッション取得成功', { sessionId }, traceId);

      return data;

    } catch (error: unknown) {
      logger.error('セッション取得エラー', {
        sessionId,
        error: error instanceof Error ? error.message : String(error)
      }, traceId);
      throw error;
    }
  }
}
