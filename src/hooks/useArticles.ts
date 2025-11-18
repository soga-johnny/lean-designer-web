'use client';

import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types/microcms';

interface UseArticlesOptions {
  limit?: number;
  offset?: number;
  tagId?: string | null;
}

interface ArticlesResponse {
  success: boolean;
  articles: Article[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  timestamp: string;
}

interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  fetchArticles: (newOffset?: number, newTagId?: string | null) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * 記事一覧を取得するカスタムフック
 *
 * @example
 * ```tsx
 * const { articles, loading, error, fetchArticles } = useArticles({
 *   limit: 12,
 * });
 * ```
 */
export function useArticles(options: UseArticlesOptions = {}): UseArticlesReturn {
  const {
    limit = 12,
    offset = 0,
    tagId,
  } = options;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    limit,
    offset,
    total: 0
  });

  /**
   * 記事一覧を取得
   */
  const fetchArticles = useCallback(async (newOffset: number = offset, newTagId?: string | null) => {
    try {
      setLoading(true);
      setError(null);

      // クエリパラメータを構築
      const params = new URLSearchParams();
      params.set('limit', limit.toString());
      params.set('offset', newOffset.toString());

      const tagIdToUse = newTagId !== undefined ? newTagId : tagId;

      let url: string;
      if (tagIdToUse) {
        // タグフィルター
        url = `/api/articles/by-tag?${params.toString()}&tagId=${tagIdToUse}`;
      } else {
        // 全件取得
        url = `/api/articles?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('記事の取得に失敗しました');
      }

      const data: ArticlesResponse = await response.json();

      if (data.success) {
        setArticles(data.articles);
        setPagination(data.pagination);
      } else {
        throw new Error('記事の取得に失敗しました');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラー';
      setError(errorMessage);
      console.error('記事取得エラー:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, tagId]);

  /**
   * 現在のoffsetで再取得
   */
  const refetch = useCallback(() => {
    return fetchArticles(pagination.offset);
  }, [fetchArticles, pagination.offset]);

  // 初回マウント時に自動取得
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    articles,
    loading,
    error,
    pagination,
    fetchArticles,
    refetch
  };
}
