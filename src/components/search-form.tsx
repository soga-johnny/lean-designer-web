'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push('/form/guide');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="プロジェクト名を入力してください"
          className="w-full px-6 py-3 rounded-full border border-gray-200 dark:border-input-border-dark bg-white dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-dark/20 text-sm text-text dark:text-text-dark placeholder-gray-400 dark:placeholder-text-gray"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-text-dark">
          →
        </span>
      </div>
    </form>
  );
}; 