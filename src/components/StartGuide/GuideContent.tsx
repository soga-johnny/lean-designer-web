'use client';

// import { SectionTag } from '@/components/SectionTag'; @todo : クワバラさん対応devマージ後にコメントアウト解除
import { GuideCard } from './GuideCard';

const GUIDE_STEPS = [
  {
    step: 'まずはお試ししたい方',
    title: 'Lean Designerを始める',
    description: 'アイデアをすぐに可視化。\nすべての機能を無料でお試しいただけます。',
    buttonText: '無料で始める',
    href: 'https://app.lean-designer.tech/',
    buttonType: 'primary'
  },
  {
    step: '詳しく知りたい方',
    title: 'サービス紹介',
    description: '機能や事例を詳しくご紹介します。',
    buttonText: '詳細を見る',
    href: '/lp',
    buttonType: 'secondary'
  },
  {
    step: '相談したい方',
    title: 'お問い合わせ',
    description: '導入やプランについてご相談いただけます。',
    buttonText: '相談する',
    href: 'https://www.plasmism.com/contact',
    buttonType: 'secondary'
  }
];

export function GuideContent() {
  const [firstStep, ...restSteps] = GUIDE_STEPS;

  return (
    <div className="max-w-content mx-auto">
      <div className="flex justify-between items-center mb-4 md:mb-8">

        {/* タグ */}
        <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
          スタートガイド
        </span>
        <span className="text-sm font-medium">
        （ START GUIDE ）
        </span>
      </div>

      {/* メッセージ */}
      <h2 className="md:text-5xl text-3xl font-bold mb-6 md:mb-10">
        さあ、今すぐ始めよう！
      </h2>

      {/* パネル */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2">
        {/* 1つ目のパネル: 左半分 */}
        <GuideCard
          step={firstStep.step}
          title={firstStep.title}
          description={firstStep.description}
          buttonText={firstStep.buttonText}
          href={firstStep.href}
          buttonType={firstStep.buttonType as 'primary' | 'secondary'}
        />

        {/* 2つ目と3つ目のパネル: 右半分を横に分割 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          {restSteps.map((guideStep) => (
            <GuideCard
              key={guideStep.step}
              step={guideStep.step}
              title={guideStep.title}
              description={guideStep.description}
              buttonText={guideStep.buttonText}
              href={guideStep.href}
              buttonType={guideStep.buttonType as 'primary' | 'secondary'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
