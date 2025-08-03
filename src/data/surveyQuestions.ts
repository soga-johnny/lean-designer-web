import { SurveyQuestion } from '@/types/form';

// 実際の設問データ
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
    id: 'exciting_challenge',
    title: '今、最もワクワクする課題は？',
    options: [
      { value: 'customer_challenge', label: '顧客課題 をもっと掘りたい' },
      { value: 'ux_dev_quality', label: 'UX/UI や開発品質を上げたい' },
      { value: 'business_model', label: 'ビジネスモデルを固めたい' },
      { value: 'team_investor', label: '仲間・投資家に共感を拡げたい' }
    ],
    required: true
  },
  {
    id: 'stumbling_point',
    title: '逆に 一番つまずいている所は？',
    options: [
      { value: 'persona_hypothesis', label: 'ペルソナ／課題仮説が曖昧' },
      { value: 'feature_priority', label: '機能優先度が決まらない' },
      { value: 'monetization_scenario', label: '収益化のシナリオ' },
      { value: 'internal_explanation', label: '社内・投資家への説明資料' }
    ],
    required: true
  },
  {
    id: 'idea_source',
    title: 'アイデアはどうしている時に浮かんできた？',
    options: [
      { value: 'customer_talk', label: '顧客と実際に話しているとき' },
      { value: 'work_practice', label: '仕事の実務中' },
      { value: 'personal_inconvenience', label: '実際に自分が不便・課題に感じて' },
      { value: 'alone_time', label: '散歩や入浴中等の一人の時間' }
    ],
    required: true
  },
  {
    id: 'concept_organization',
    title: 'コンセプト整理は今はどうやってる？（複数）',
    options: [
      { value: 'notion_memo', label: 'Notion等のメモツール' },
      { value: 'handwritten_memo', label: '手書きメモ' },
      { value: 'slides', label: 'スライド(ppt, keynote)' },
      { value: 'other_or_none', label: 'その他、または取らない' }
    ],
    multiple: true,
    required: true
  },
  {
    id: 'product_position',
    title: 'このプロダクトはどのような立ち位置になる？',
    options: [
      { value: 'main_business', label: '事業の主軸になるプロダクト' },
      { value: 'connected_business', label: '別事業と密接に繋がりながら成長するプロダクト' },
      { value: 'side_business', label: 'メイン事業が別にあり、その傍で運用するプロダクト' },
      { value: 'non_profit', label: '非営利で運用するプロダクト' }
    ],
    required: true
  },
  {
    id: 'revenue_target',
    title: '立ち上げ１年後の希望年間売上規模は？',
    options: [
      { value: 'under_5m', label: '-500万円' },
      { value: 'under_10m', label: '-1000万円' },
      { value: 'under_50m', label: '-5000万円' },
      { value: 'over_50m', label: '5000万円-' }
    ],
    required: true
  },
  {
    id: 'final_info',
    title: '最後に、いくつかの情報をお聞かせください',
    type: 'combined',
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