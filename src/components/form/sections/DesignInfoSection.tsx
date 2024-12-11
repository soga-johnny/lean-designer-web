'use client';

import { useForm } from '@/contexts/FormContext';
import { useState, useCallback } from 'react';

export function DesignInfoSection() {
  const { formData, setFormData } = useForm();
  const { designInfo } = formData;
  const [keyword, setKeyword] = useState('');

  const updateDesignInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      designInfo: {
        ...prev.designInfo,
        [field]: value
      }
    }));
  };

  const handleKeywordSubmit = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (keyword.trim() && !designInfo.designKeywords.includes(keyword.trim())) {
        updateDesignInfo('designKeywords', [...designInfo.designKeywords, keyword.trim()]);
        setKeyword('');
      }
    }
  }, [keyword, designInfo.designKeywords]);

  const removeKeyword = (keywordToRemove: string) => {
    updateDesignInfo(
      'designKeywords',
      designInfo.designKeywords.filter(k => k !== keywordToRemove)
    );
  };

  return (
    <div className="space-y-8">
      {/* ペルソナ */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">ペルソナ</label>
        <textarea
          value={designInfo.persona}
          onChange={(e) => updateDesignInfo('persona', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
          placeholder="想定されるユーザーペルソナについて詳しく記述してください"
        />
      </div>

      {/* カスタマージャーニー */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">カスタマージャーニー</label>
        <textarea
          value={designInfo.customerJourney}
          onChange={(e) => updateDesignInfo('customerJourney', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
          placeholder="ユーザーの行動フローや体験の流れを記述してください"
        />
      </div>

      {/* 市場でのポジショニング */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">市場でのポジショニング</label>
        <textarea
          value={designInfo.marketPositioning}
          onChange={(e) => updateDesignInfo('marketPositioning', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
          placeholder="競合との差別化ポイントや市場での位置づけを記述してください"
        />
      </div>

      {/* カラーパターン */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">カラーパターン</label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={designInfo.colorPattern}
            onChange={(e) => updateDesignInfo('colorPattern', e.target.value)}
            className="w-12 h-12 rounded border-0 p-0 cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            メインカラーを選択してください
          </span>
        </div>
      </div>

      {/* デザインキーワード */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">デザインキーワード</label>
        <div className="space-y-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeywordSubmit}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="キーワードを入力してEnterまたはスペースキーで追加"
          />
          <div className="flex flex-wrap gap-2">
            {designInfo.designKeywords.map((k) => (
              <span
                key={k}
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm"
              >
                {k}
                <button
                  onClick={() => removeKeyword(k)}
                  className="ml-2 text-primary hover:text-primary/70"
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
        <label className="block text-sm font-medium">インタラクション</label>
        <textarea
          value={designInfo.interaction}
          onChange={(e) => updateDesignInfo('interaction', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
          placeholder="期待されるユーザーインタラクションやアニメーションについて記述してください"
        />
      </div>
    </div>
  );
} 