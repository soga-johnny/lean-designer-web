'use client';

import { useState, useEffect } from 'react';
import { SessionDetail } from '@/services/sessionService';

interface SessionResponse {
  success: boolean;
  session: SessionDetail;
  timestamp: string;
}

interface UseSessionReturn {
  session: SessionDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * セッション詳細を取得するカスタムフック
 *
 * @example
 * ```tsx
 * const { session, loading, error } = useSession(sessionId);
 * ```
 */
export function useSession(sessionId: string | undefined): UseSessionReturn {
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/v1/sessions/${sessionId}`);

      if (!response.ok) {
        throw new Error('セッションの取得に失敗しました');
      }

      const data: SessionResponse = await response.json();

      if (data.success) {
        setSession(data.session);
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
  };

  // 初回マウント時とsessionIdが変更された時に取得
  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return {
    session,
    loading,
    error,
    refetch: fetchSession
  };
}
