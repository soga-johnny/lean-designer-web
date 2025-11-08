import { SurveyQuestion } from '@/types/form';

// 条件分岐のタイプ
export type BranchType = 'A' | 'B' | 'C' | null;

// 条件分岐ロジック
export function getBranchType(q1Answer: string, q2Answer: string): BranchType {
  // Q1で1,2を選択 & Q2で1,2を選択 → 分岐A（経営層・事業責任者向け）
  if (['1', '2'].includes(q1Answer) && ['1', '2'].includes(q2Answer)) {
    return 'A';
  }
  // Q2で3を選択 → 分岐B（ベンチャー社員向け）
  if (q2Answer === '3') {
    return 'B';
  }
  // その他 → 分岐C
  return 'C';
}

// 共通質問（全員回答）
export const commonQuestions: SurveyQuestion[] = [
  {
    id: 'q1_current_situation',
    title: '現在、実現を検討されているプロダクトのアイデアはございますか？',
    options: [
      { value: '1', label: '具体的なアイデアがあり、実現に向けて取り組んでいる' },
      { value: '2', label: '興味深いアイデアがあり、これから具体化を進めたい' },
      { value: '3', label: 'まだアイデア検討段階だが、新しい事業に関心がある' },
      { value: '4', label: 'すでにアイデアを形にして事業として展開している' }
    ],
    required: true
  },
  {
    id: 'q2_position',
    title: '新規事業・プロダクト開発に関わるお立場として、最も近いものはどちらでしょうか？',
    options: [
      { value: '1', label: 'ベンチャー企業のCEO・創業者' },
      { value: '2', label: 'ベンチャー企業のPdM・事業責任者' },
      { value: '3', label: 'ベンチャー企業の社員（エンジニア・企画・営業等）' },
      { value: '4', label: 'その他（大企業、コンサルタント、投資家等）' }
    ],
    required: true
  }
];

// 分岐A質問（経営層・事業責任者向け）
export const branchAQuestions: SurveyQuestion[] = [
  {
    id: 'q3a_progress_stage',
    title: '現在検討されている新規事業は、どちらの段階にございますか？',
    options: [
      { value: '1', label: 'アイデア・コンセプト検討段階（市場調査・企画立案）' },
      { value: '2', label: 'プロトタイプ開発段階（具体的な形にする段階）' },
      { value: '3', label: 'β版・MVP段階（ユーザーからのフィードバックを得る段階）' },
      { value: '4', label: '本格ローンチ準備段階（市場投入に向けた最終準備）' }
    ],
    required: true
  },
  {
    id: 'q4a_business_domain',
    title: 'どちらの領域で新たな価値提供をお考えでしょうか？',
    options: [
      { value: '1', label: 'BtoB SaaS・業務効率化ソリューション' },
      { value: '2', label: 'BtoC アプリケーション・コンシューマー向けサービス' },
      { value: '3', label: 'AI・機械学習を活用したソリューション' },
      { value: '4', label: 'その他の領域（ハードウェア、プラットフォーム等）' }
    ],
    required: true
  },
  {
    id: 'q5a_business_model',
    title: '持続的な成長を見据えた収益モデルとして、どちらをお考えでしょうか？',
    options: [
      { value: '1', label: 'サブスクリプション・継続課金モデル' },
      { value: '2', label: '従量課金・トランザクション手数料モデル' },
      { value: '3', label: '一括購入・ライセンス販売モデル' },
      { value: '4', label: 'プラットフォーム収益（広告・マッチング手数料等）' }
    ],
    required: true
  },
  {
    id: 'q6a_development_structure',
    title: 'プロダクト開発の体制は、現在どのような状況でしょうか？',
    options: [
      { value: '1', label: '社内チームでの開発を進めている' },
      { value: '2', label: '外部パートナーとの連携により開発を進めている' },
      { value: '3', label: '最適な開発体制の構築を検討している' },
      { value: '4', label: '開発体制の方向性を検討中である' }
    ],
    required: true
  },
  {
    id: 'q7a_business_challenges',
    title: '次のステップに進むにあたり、最も重要な課題はどちらでしょうか？',
    options: [
      { value: '1', label: '市場ニーズの検証・顧客獲得' },
      { value: '2', label: '技術開発・エンジニアリングリソースの確保' },
      { value: '3', label: '資金調達・投資戦略' },
      { value: '4', label: '人材獲得・組織体制の強化' }
    ],
    required: true
  }
];

// 分岐B質問（ベンチャー社員向け）
export const branchBQuestions: SurveyQuestion[] = [
  {
    id: 'q3b_technology_interest',
    title: 'どちらの分野で新しい価値創造にご関心をお持ちでしょうか？',
    options: [
      { value: '1', label: 'AI・機械学習・データ活用によるソリューション' },
      { value: '2', label: 'Web3・ブロックチェーンによる分散型サービス' },
      { value: '3', label: 'IoT・ハードウェアによる新たな体験創造' },
      { value: '4', label: 'モバイルアプリ・Webサービスによるユーザー体験向上' }
    ],
    required: true
  },
  {
    id: 'q4b_idea_status',
    title: 'ビジネスアイデアの検討状況として、最も近いものはどちらでしょうか？',
    options: [
      { value: '1', label: '解決したい課題とソリューションが明確になっている' },
      { value: '2', label: '興味深い技術から応用可能性を探求している' },
      { value: '3', label: '市場の課題は認識しているが、解決策を検討中である' },
      { value: '4', label: 'まだ漠然としているが、新しいサービスに関心がある' }
    ],
    required: true
  },
  {
    id: 'q5b_business_model_interest',
    title: 'どちらの事業モデルに最も関心をお持ちでしょうか？',
    options: [
      { value: '1', label: '多くのユーザーが利用するプラットフォーム型サービス' },
      { value: '2', label: '企業課題の解決に特化したBtoBソリューション' },
      { value: '3', label: '継続的に価値提供するサブスクリプションサービス' },
      { value: '4', label: '大きなインパクトを与える一括型・イベント型サービス' }
    ],
    required: true
  },
  {
    id: 'q6b_current_efforts',
    title: 'アイデア実現に向けて、現在取り組まれていることはございますか？',
    options: [
      { value: '1', label: 'プロトタイプや試作品の作成に取り組んでいる' },
      { value: '2', label: '市場調査や競合分析を進めている' },
      { value: '3', label: '必要なスキルや知識の習得に取り組んでいる' },
      { value: '4', label: 'まだ具体的な行動には移していない' }
    ],
    required: true
  },
  {
    id: 'q7b_needed_support',
    title: 'アイデア実現のために最も必要とお感じになるサポートはどちらでしょうか？',
    options: [
      { value: '1', label: '技術力向上・開発スキルの習得機会' },
      { value: '2', label: 'ビジネスモデル構築・収益化に関する知見' },
      { value: '3', label: '同じ志を持つチームメンバーとの出会い' },
      { value: '4', label: '資金調達・投資家とのネットワーク構築' }
    ],
    required: true
  }
];

// 分岐C質問（その他の方向け）
export const branchCQuestions: SurveyQuestion[] = [
  {
    id: 'q3c_business_status',
    title: '現在の事業・プロダクトの状況として、最も近いものはどちらでしょうか？',
    options: [
      { value: '1', label: '順調に成長しており、さらなる展開を検討している' },
      { value: '2', label: '安定した状況にあり、新たな成長要素を模索している' },
      { value: '3', label: '改善・方向転換を通じて、より良い展開を検討している' },
      { value: '4', label: '新しい領域での新たな取り組みを検討している' }
    ],
    required: true
  },
  {
    id: 'q4c_future_interest',
    title: '今後最も関心をお持ちの分野はどちらでしょうか？',
    options: [
      { value: '1', label: '既存事業のグローバル展開・規模拡大' },
      { value: '2', label: '新技術導入による事業の高度化・発展' },
      { value: '3', label: '全く新しい領域での新規事業立ち上げ' },
      { value: '4', label: 'M&Aや戦略的提携による事業拡大' }
    ],
    required: true
  }
];

// 最終質問（全員回答）
export const finalQuestion: SurveyQuestion = {
  id: 'final_info',
  title: '最後に、いくつかの情報をお聞かせください',
  type: 'combined',
  required: true
};

// 旧データ（後方互換性のため残す）
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

// 分岐に応じた質問リストを取得
export function getQuestionsForBranch(branchType: BranchType): SurveyQuestion[] {
  const questions = [...commonQuestions];
  
  switch (branchType) {
    case 'A':
      questions.push(...branchAQuestions);
      break;
    case 'B':
      questions.push(...branchBQuestions);
      break;
    case 'C':
      questions.push(...branchCQuestions);
      break;
  }
  
  questions.push(finalQuestion);
  return questions;
}

// 総質問数を取得
export function getTotalQuestionsForBranch(branchType: BranchType): number {
  return getQuestionsForBranch(branchType).length;
}

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
