'use client';

import { GuideCard } from './GuideCard';
import { SectionTag } from './SectionTag';

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
    <div className="mx-auto px-4">
      {/* タグ */}
      <SectionTag label="スタートガイド" />

      {/* メッセージ */}
      <h2 className="text-5xl font-bold mt-10 mb-10  text-gray-800">
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
