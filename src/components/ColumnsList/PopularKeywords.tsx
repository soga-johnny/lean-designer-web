'use client';

import Link from 'next/link';
import { Tag } from '@/types/microcms';

interface PopularKeywordsProps {
  tags: Tag[];
  selectedTagId?: string | null;
}

export function PopularKeywords({ tags, selectedTagId }: PopularKeywordsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 heading-border">注目のキーワード</h3>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/columns?tag=${tag.id}`}
            className={`text-lg text-ld-grey-400 transition-colors hover:opacity-70 ${
              selectedTagId === tag.id ? 'font-bold' : ''
            }`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </>
  );
}
