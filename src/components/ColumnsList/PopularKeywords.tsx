'use client';

import { useEffect, useState } from 'react';
import { Tag } from '@/types/microcms';

interface PopularKeywordsProps {
  onTagClick?: (tagId: string) => void;
  selectedTagId?: string | null;
}

export function PopularKeywords({ onTagClick, selectedTagId }: PopularKeywordsProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // microCMSからタグを取得
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        if (data.tags) {
          setTags(data.tags);
          setError(null);
        } else if (data.error) {
          setError('タグの取得に失敗しました');
        }
      } catch (error) {
        console.error('タグの取得に失敗しました:', error);
        setError('タグの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">注目のキーワード</h3>
        <div className="flex gap-3 flex-wrap">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || tags.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 heading-border">注目のキーワード</h3>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagClick?.(tag.id)}
            className={`text-lg text-ld-grey-400 transition-colors hover:opacity-70 ${
              selectedTagId === tag.id ? 'font-bold' : ''
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </>
  );
}
