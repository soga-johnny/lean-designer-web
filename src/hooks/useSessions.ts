'use client';

import { useState, useEffect, useCallback } from 'react';
import { Session } from '@/services/sessionService';

interface UseSessionsOptions {
  limit?: number;
  offset?: number;
  genres?: string[];
}

interface SessionsResponse {
  success: boolean;
  sessions: Session[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  timestamp: string;
}

interface UseSessionsReturn {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  fetchSessions: (newOffset?: number, genres?: string[]) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * セッション一覧を取得するカスタムフック
 *
 * @example
 * ```tsx
 * const { sessions, loading, error, fetchSessions } = useSessions({
 *   limit: 10,
 * });
 * ```
 */
export function useSessions(options: UseSessionsOptions = {}): UseSessionsReturn {
  const {
    limit = 10,
    offset = 0,
    genres,
  } = options;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    limit,
    offset,
    total: 0
  });

  /**
   * セッション一覧を取得
   */
  const fetchSessions = useCallback(async (newOffset: number = offset, newGenres?: string[]) => {
    try {
      setLoading(true);
      setError(null);

      // クエリパラメータを構築
      const params = new URLSearchParams();
      params.set('limit', limit.toString());
      params.set('offset', newOffset.toString());

      // genresパラメータを追加（空配列の場合はフィルターなし）
      const genresToUse = newGenres ?? genres;
      if (genresToUse && genresToUse.length > 0) {
        params.set('genres', genresToUse.join(','));
      }

      const response = await fetch(
        `/api/v1/sessions?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('セッションの取得に失敗しました');
      }

      const data: SessionsResponse = await response.json();

      if (data.success) {
        setSessions(data.sessions);
        setPagination(data.pagination);
        console.log('セッション取得成功:', {
          count: data.sessions.length,
          total: data.pagination.total,
          genres: genresToUse
        });
      } else {
        throw new Error('セッションの取得に失敗しました');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラー';
      setError(errorMessage);
      console.error('セッション取得エラー:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, genres]);

  /**
   * 現在のoffsetで再取得
   */
  const refetch = useCallback(() => {
    return fetchSessions(pagination.offset);
  }, [fetchSessions, pagination.offset]);

  // 初回マウント時に自動取得
  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    sessions,
    loading,
    error,
    pagination,
    fetchSessions,
    refetch
  };
}
