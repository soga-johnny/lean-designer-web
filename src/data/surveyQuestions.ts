import { SurveyQuestion } from '@/types/form';

// 仮の質問データ（後で実際の質問に差し替え予定）
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'role',
    title: 'あなたの現在の役職は？',
    options: [
      { value: 'individual', label: '個人事業主 / 個人' },
      { value: 'dev', label: '個人開発者' },
      { value: 'pdm', label: 'PdM / プロダクトオーナー' },
      { value: 'ceo', label: 'CEO / 創業者' },
      { value: 'other', label: 'その他' }
    ],
    showOther: true,
    required: true
  },
  {
    id: 'phase',
    title: 'プロダクトの現在のフェーズは？',
    options: [
      { value: 'idea', label: 'アイデア段階' },
      { value: 'mvp', label: 'MVP開発中' },
      { value: 'prelaunch', label: 'リリース前' },
      { value: 'postlaunch', label: 'リリース後' }
    ],
    required: true
  },
  {
    id: 'category',
    title: 'プロダクトのカテゴリは？',
    options: [
      { value: 'saas', label: 'SaaS / Webアプリ' },
      { value: 'mobile', label: 'モバイルアプリ' },
      { value: 'iot', label: 'IoT / ハードウェア' },
      { value: 'other', label: 'その他' }
    ],
    showOther: true,
    required: true
  },
  {
    id: 'excitement',
    title: 'このサービスへの期待度は？',
    options: [
      { value: '50', label: '少し興味がある（50%）' },
      { value: '80', label: '結構興味がある（80%）' },
      { value: '120', label: 'とても興味がある（120%）' },
      { value: '200', label: '絶対に使いたい（200%）' }
    ],
    required: true
  },
  {
    id: 'budget',
    title: 'デザイン関連の予算は？',
    options: [
      { value: 'low', label: '10万円未満' },
      { value: 'medium', label: '10-50万円' },
      { value: 'high', label: '50万円以上' },
      { value: 'unknown', label: 'まだ決まっていない' }
    ],
    required: true
  },
  {
    id: 'timeline',
    title: '希望する納期は？',
    options: [
      { value: 'urgent', label: '1週間以内' },
      { value: 'short', label: '1-2週間' },
      { value: 'medium', label: '1ヶ月' },
      { value: 'long', label: '2ヶ月以上' }
    ],
    required: true
  },
  {
    id: 'pain_point',
    title: '現在の最大の課題は？',
    options: [
      { value: 'design', label: 'デザインの品質' },
      { value: 'speed', label: '開発スピード' },
      { value: 'user_feedback', label: 'ユーザーフィードバック' },
      { value: 'market_fit', label: 'プロダクトマーケットフィット' }
    ],
    required: true
  },
  {
    id: 'team_size',
    title: 'チームの規模は？',
    options: [
      { value: 'solo', label: '1人（個人）' },
      { value: 'small', label: '2-5人' },
      { value: 'medium', label: '6-20人' },
      { value: 'large', label: '21人以上' }
    ],
    required: true
  },
  {
    id: 'allowInterview',
    title: 'インタビューにご協力いただけますか？',
    options: [
      { value: 'yes', label: 'はい、協力できます' },
      { value: 'no', label: 'いいえ、難しいです' }
    ],
    required: true
  },
  {
    id: 'email_and_nda',
    title: '最後に、メールアドレスとNDA同意をお願いします',
    options: [
      { value: 'agree', label: 'NDAに同意し、メールアドレスを入力する' },
      { value: 'disagree', label: 'NDAに同意できない' }
    ],
    required: true
  }
];

// 質問IDから質問データを取得
export function getQuestionById(id: string): SurveyQuestion | undefined {
  return surveyQuestions.find(q => q.id === id);
}

// 質問番号から質問データを取得
export function getQuestionByNumber(questionNumber: number): SurveyQuestion | undefined {
  if (questionNumber < 1 || questionNumber > surveyQuestions.length) {
    return undefined;
  }
  return surveyQuestions[questionNumber - 1];
} 