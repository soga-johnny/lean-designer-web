import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/logger';

// セッション一覧用の最小限のインターフェース
export interface Session {
  session_id: string;
  created_at: string;
  updated_at: string;
  session_name: string;
  generated_content: any; // 最初のページのみ
}

// セッション詳細用の完全なインターフェース
export interface SessionDetail extends Session {
  user_inputs: any;
  processing_status: any;
  current_section: number;
  status: string;
  expires_at: string;
  design_preferences: any;
  processing_config: any;
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
   * セッション一覧を取得
   */
  async getSessions(limit: number = 10, offset: number = 0, includeExpired: boolean = false): Promise<{ sessions: Session[]; total: number }> {
    const traceId = logger.generateTraceId();

    try {
      logger.info('セッション一覧取得開始', { limit, offset, includeExpired }, traceId);

      const supabase = createServerSupabaseClient();

      // 必要な項目のみをSELECT
      // user_inputsとgenerated_contentは全て取得
      const selectFields = 'session_id, created_at, updated_at, session_name, generated_content, user_inputs';

      // クエリを構築
      let query = supabase
        .from('sessions')
        .select(selectFields, { count: 'exact' });

      // 有効期限切れを除外する場合
      if (!includeExpired) {
        query = query.gte('expires_at', new Date().toISOString());
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

      // generated_contentまたはuser_inputsの最初のページのみを抽出
      const sessions: Session[] = (data || []).map((session: any) => {
        let firstPageContent = null;

        // generated_contentから最初のページを探す
        if (session.generated_content && Object.keys(session.generated_content).length > 0) {
          // page_1_cover または "1" というキーを探す
          firstPageContent = session.generated_content['page_1_cover'] ||
                           session.generated_content['1'] ||
                           session.generated_content[1];
        }

        return {
          session_id: session.session_id,
          created_at: session.created_at,
          updated_at: session.updated_at,
          session_name: session.session_name,
          generated_content: firstPageContent || null
        };
      });

      logger.info('セッション一覧取得成功', { count: sessions.length, total: count }, traceId);

      return {
        sessions,
        total: count || 0
      };

    } catch (error: any) {
      logger.error('セッション一覧取得エラー', {
        error: error.message
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

      // 有効期限チェック
      const expiresAt = new Date(data.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        logger.warn('セッション有効期限切れ', { sessionId, expiresAt }, traceId);
        throw new Error('セッションの有効期限が切れています');
      }

      logger.info('セッション取得成功', { sessionId }, traceId);

      return data;

    } catch (error: any) {
      logger.error('セッション取得エラー', {
        sessionId,
        error: error.message
      }, traceId);
      throw error;
    }
  }
}
