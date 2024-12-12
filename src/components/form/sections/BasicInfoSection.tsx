'use client';

import { useForm } from '@/contexts/FormContext';

const serviceGoalOptions = [
  '新規顧客の獲得',
  '業務効率の向上',
  'マーケットシェアの拡大',
  'ユーザー体験の改善',
  'コスト削減',
  'ブランド価値の向上',
  '売上・収益の向上',
  '競合との差別化',
  'その他'
];

const constraintOptions = [
  'スケジュールの制約',
  'リソースの制約',
  'セキュリティ要件',
  'レガシーシステムとの互換性',
  'その他'
];

const otherRequirementOptions = [
  'モバイル対応',
  '多言語対応',
  'パフォーマンス最適化',
  'アナリティクス導入',
  'アクセシビリティ対応',
  'オフライン対応',
  'セキュリティ強化',
  'A/Bテスト対応',
  'その他'
];

export function BasicInfoSection() {
  const { formData, setFormData } = useForm();
  const basicInfo = formData.basicInfo || {
    serviceName: '',
    serviceGoals: [],
    targetUser: '',
    expectedEffect: '',
    budget: '',
    developmentPeriod: '',
    constraints: [],
    qualityRequirements: '',
    seoImportance: '',
    otherRequirements: [],
  };

  const updateBasicInfo = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#61585A] bg-white dark:bg-[#231F1F] focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20 text-text dark:text-text-dark placeholder-gray-400 dark:placeholder-text-gray";
  const checkboxClasses = "rounded border-gray-300 dark:border-[#61585A] text-primary dark:text-primary-dark focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20";
  const labelClasses = "text-sm text-text dark:text-text-dark";

  return (
    <div className="space-y-8">
      {/* サービス名 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          サービス（プロダクト）名
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={basicInfo.serviceName}
          onChange={(e) => updateBasicInfo('serviceName', e.target.value)}
          className={inputClasses}
          placeholder="例：AI駆動型デザイン支援サービス"
        />
      </div>

      {/* サービスの目的 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          サービス（プロダクト）の目的
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {serviceGoalOptions.map((goal) => (
            <label key={goal} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={basicInfo.serviceGoals.includes(goal)}
                onChange={(e) => {
                  const newGoals = e.target.checked
                    ? [...basicInfo.serviceGoals, goal]
                    : basicInfo.serviceGoals.filter(g => g !== goal);
                  updateBasicInfo('serviceGoals', newGoals);
                }}
                className={checkboxClasses}
              />
              <span className={labelClasses}>{goal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 対象ユーザー */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">
          対象ユーザー（ターゲット）
        </label>
        <input
          type="text"
          value={basicInfo.targetUser}
          onChange={(e) => updateBasicInfo('targetUser', e.target.value)}
          className={inputClasses}
          placeholder="例：20〜40代のフロントエンドエンジニア"
        />
      </div>

      {/* 予算 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">予算</label>
        <select
          value={basicInfo.budget}
          onChange={(e) => updateBasicInfo('budget', e.target.value)}
          className={inputClasses}
        >
          <option value="">選択してください</option>
          <option value="100万円未満">100万円未満</option>
          <option value="100-300万円">100-300万円</option>
          <option value="300-500万円">300-500万円</option>
          <option value="500-1000万円">500-1000万円</option>
          <option value="1000万円以上">1000万円以上</option>
        </select>
      </div>

      {/* 開発期間 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">開発期間</label>
        <select
          value={basicInfo.developmentPeriod}
          onChange={(e) => updateBasicInfo('developmentPeriod', e.target.value)}
          className={inputClasses}
        >
          <option value="">選択してください</option>
          <option value="1ヶ月未満">1ヶ月未満</option>
          <option value="1-3ヶ月">1-3ヶ月</option>
          <option value="3-6ヶ月">3-6ヶ月</option>
          <option value="6-12ヶ月">6-12ヶ月</option>
          <option value="1年以上">1年以上</option>
        </select>
      </div>

      {/* 制約条件 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">制約条件</label>
        <div className="grid grid-cols-2 gap-2">
          {constraintOptions.map((constraint) => (
            <label key={constraint} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={basicInfo.constraints.includes(constraint)}
                onChange={(e) => {
                  const newConstraints = e.target.checked
                    ? [...basicInfo.constraints, constraint]
                    : basicInfo.constraints.filter(c => c !== constraint);
                  updateBasicInfo('constraints', newConstraints);
                }}
                className={checkboxClasses}
              />
              <span className={labelClasses}>{constraint}</span>
            </label>
          ))}
        </div>
      </div>

      {/* その他要件 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text dark:text-text-dark">その他要件</label>
        <div className="grid grid-cols-2 gap-2">
          {otherRequirementOptions.map((requirement) => (
            <label key={requirement} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={basicInfo.otherRequirements.includes(requirement)}
                onChange={(e) => {
                  const newRequirements = e.target.checked
                    ? [...basicInfo.otherRequirements, requirement]
                    : basicInfo.otherRequirements.filter(r => r !== requirement);
                  updateBasicInfo('otherRequirements', newRequirements);
                }}
                className={checkboxClasses}
              />
              <span className={labelClasses}>{requirement}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 