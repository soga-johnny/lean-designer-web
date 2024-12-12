'use client';

import { useForm } from '@/contexts/FormContext';
import { useState, useCallback } from 'react';

export function DesignInfoSection() {
  const { formData, setFormData } = useForm();
  const { designInfo } = formData;
  const [keyword, setKeyword] = useState('');

  const updateDesignInfo = useCallback((field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      designInfo: {
        ...prev.designInfo,
        [field]: value
      }
    }));
  }, [setFormData]);

  const handleKeywordSubmit = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (keyword.trim() && !designInfo.designKeywords.includes(keyword.trim())) {
        updateDesignInfo('designKeywords', [...designInfo.designKeywords, keyword.trim()]);
        setKeyword('');
      }
    }
  }, [keyword, designInfo.designKeywords, updateDesignInfo]);

  const removeKeyword = (keywordToRemove: string) => {
    updateDesignInfo(
      'designKeywords',
      designInfo.designKeywords.filter(k => k !== keywordToRemove)
    );
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#61585A] bg-white dark:bg-[#231F1F] focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20 text-text dark:text-text-dark placeholder-gray-400 dark:placeholder-text-gray";
  // const checkboxClasses = "rounded border-gray-300 dark:border-[#61585A] text-primary dark:text-primary-dark focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20";
  // const labelClasses = "text-sm text-text dark:text-text-dark";
  const textareaClasses = `${inputClasses} min-h-[120px]`;

  return (
    <div className="space-y-8">
      {/* ペルソナ */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">ペルソナ</label>
        <textarea
          value={designInfo.persona}
          onChange={(e) => updateDesignInfo('persona', e.target.value)}
          className={textareaClasses}
          placeholder="想定されるユーザーペルソナについて詳しく記述してください"
        />
      </div>

      {/* カスタマージャーニー */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">カスタマージャーニー</label>
        <textarea
          value={designInfo.customerJourney}
          onChange={(e) => updateDesignInfo('customerJourney', e.target.value)}
          className={textareaClasses}
          placeholder="ユーザーの行動フローや体験の流れを記述してください"
        />
      </div>

      {/* 市場でのポジショニング */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">市場でのポジショニング</label>
        <textarea
          value={designInfo.marketPositioning}
          onChange={(e) => updateDesignInfo('marketPositioning', e.target.value)}
          className={textareaClasses}
          placeholder="競合との差別化ポイントや市場での位置づけを記述してください"
        />
      </div>

      {/* カラーパターン */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">カラーパターン</label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={designInfo.colorPattern}
            onChange={(e) => updateDesignInfo('colorPattern', e.target.value)}
            className="w-12 h-12 rounded border-0 p-0 cursor-pointer bg-transparent"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            メインカラーを選択してください
          </span>
        </div>
      </div>

      {/* デザインキーワード */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">デザインキーワード</label>
        <div className="space-y-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeywordSubmit}
            className={inputClasses}
            placeholder="キーワードを入力してEnterまたはスペースキーで追加"
          />
          <div className="flex flex-wrap gap-2">
            {designInfo.designKeywords.map((k) => (
              <span
                key={k}
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-primary-dark/10 text-text dark:text-text-dark text-sm"
              >
                {k}
                <button
                  onClick={() => removeKeyword(k)}
                  className="ml-2 text-primary dark:text-primary-dark hover:text-primary/70 dark:hover:text-primary-dark/70"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* インタラクション */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">インタラクション</label>
        <textarea
          value={designInfo.interaction}
          onChange={(e) => updateDesignInfo('interaction', e.target.value)}
          className={textareaClasses}
          placeholder="期待されるユーザーインタラクションやアニメーションについて記述してください"
        />
      </div>
    </div>
  );
} 