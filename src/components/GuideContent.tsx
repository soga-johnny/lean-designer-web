'use client';

import { GuideCard } from './GuideCard';

const GUIDE_STEPS = [
  {
    step: 'Step 01',
    title: 'Step 1 Title',
    description: 'Step 1 の詳細な説明がここに入ります。ユーザーが最初に行うべきアクションについて説明します。'
  },
  {
    step: 'Step 02',
    title: 'Step 2 Title',
    description: 'Step 2 の詳細な説明がここに入ります。'
  },
  {
    step: 'Step 03',
    title: 'Step 3 Title',
    description: 'Step 3 の詳細な説明がここに入ります。'
  }
];

export function GuideContent() {
  const [firstStep, ...restSteps] = GUIDE_STEPS;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* タグ */}
      <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
        スタートガイド
      </span>

      {/* メッセージ */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        さあ、今すぐ始めよう！
      </h2>

      {/* パネル */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1つ目のパネル: 左半分 */}
        <GuideCard
          step={firstStep.step}
          title={firstStep.title}
          description={firstStep.description}
        />

        {/* 2つ目と3つ目のパネル: 右半分を横に分割 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restSteps.map((guideStep) => (
            <GuideCard
              key={guideStep.step}
              step={guideStep.step}
              title={guideStep.title}
              description={guideStep.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
