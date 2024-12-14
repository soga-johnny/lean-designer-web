'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/logo';
import { Menu } from 'lucide-react';
import { useDocumentData } from '@/app/hooks/useDocumentData';
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

type PlanPageProps = {
  params: {
    id: string;
  };
};

type ComponentSection = {
  title: string;
  components: {
    name: string;
    selected: boolean;
  }[];
};

const componentSections: ComponentSection[] = [
  {
    title: "デザイン戦略セクション",
    components: [
      { name: "ユーザーコンセプト策定", selected: false },
      { name: "ユーザー要求定義", selected: false },
    ]
  },
  {
    title: "デザイン戦術セクション",
    components: [
      { name: "デザイン要件定義", selected: false },
      { name: "ペルソナ策定", selected: false },
      { name: "カスタマージャーニー策定", selected: false },
      { name: "UI画面設計", selected: false },
      { name: "デザインガイドライン作成", selected: false },
      { name: "ワイヤーフレーム作成", selected: false },
    ]
  },
  {
    title: "スタイリングセクション",
    components: [
      { name: "サイトビジュアルデザイン", selected: false },
      { name: "サービス・システム画面ビジュアルデザイン", selected: false },
      { name: "資料ビジュアルデザイン", selected: false },
    ]
  }
];

export default function PlanPage({ params }: PlanPageProps) {
  const { isLoading, error, data: planData, isAuthenticated, verifyPassword } = useDocumentData(params.id);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyPassword(password);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const updateComponentSelection = (planData: any) => {
    console.log('Full planData:', planData);
    
    if (!planData?.components) {
      console.log('No components data:', planData);
      return componentSections;
    }
    
    console.log('Components data:', {
      strategy: planData.components.strategy,
      tactical: planData.components.tactical,
      styling: planData.components.styling,
      reasons: planData.components.reasons
    });
    
    return componentSections.map(section => {
      const sectionKey = section.title === "デザイン戦略セクション" ? "strategy" :
                        section.title === "デザイン戦術セクション" ? "tactical" :
                        "styling";
      
      console.log(`Processing section: ${section.title}, sectionKey: ${sectionKey}`);
      console.log(`Available components for ${sectionKey}:`, planData.components[sectionKey]);
      
      const updatedComponents = section.components.map(comp => {
        const isSelected = Array.isArray(planData.components[sectionKey]) && 
                          planData.components[sectionKey].includes(comp.name);
        console.log(`Component ${comp.name} selected: ${isSelected}`);
        return {
          ...comp,
          selected: isSelected
        };
      });

      return {
        ...section,
        components: updatedComponents
      };
    });
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background dark:bg-background-dark"
      >
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Logo />
          </div>
        </header>

        <main className="pt-24 pb-24">
          <div className="max-w-md mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 shadow-sm"
            >
              <h1 className="text-xl font-medium mb-6 text-center dark:text-text-dark">パスワードを入力してください</h1>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#61585A] bg-white dark:bg-[#231F1F] focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#6B4A4F]/20 text-text dark:text-text-dark placeholder-gray-400 dark:placeholder-text-gray"
                    placeholder="パスワード"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 dark:text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-8 py-3 rounded-full text-sm bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 transition-all border dark:border-[#61585A] ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white dark:border-[#61585A] border-t-transparent rounded-full mx-auto"
                    />
                  ) : (
                    '確認'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </main>
      </motion.div>
    );
  }

  const sections = [
    { id: 'outline', label: 'アウトライン' },
    { id: 'plan', label: 'デザインプラン' },
    { id: 'project', label: 'プロジェクト概要' },
    { id: 'requirements', label: '詳細要件' },
    { id: 'design', label: 'デザイン要件' },
    { id: 'timeline', label: 'タイムライン' },
    { id: 'tools', label: '活用ツール' },
    { id: 'designer', label: 'デザイナー' },
    { id: 'about', label: '概要' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background dark:bg-background-dark"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-sm">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`hover:text-primary dark:hover:text-primary-dark transition-colors ${
                      activeSection === id ? 'text-primary dark:text-primary-dark font-medium' : 'dark:text-gray-300'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2B2325] transition-colors dark:text-text-dark"
              aria-label={theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
            >
              {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </button>
            <button
              className="md:hidden p-2 dark:text-text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white/95 dark:bg-[#1A1616]/95 border-t border-gray-100 dark:border-[#2B2325]"
        >
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      activeSection === id 
                        ? 'bg-primary/5 dark:bg-[#2B2325] text-primary dark:text-primary-dark font-medium' 
                        : 'hover:bg-gray-50 dark:hover:bg-[#231F1F] dark:text-gray-300'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </header>

      <main className="pt-24 pb-24">
        {sections.map(({ id }, index) => {
          let content;
          switch (id) {
            case 'outline':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-3xl font-medium mb-6 dark:text-gray-200">デザイン計画書</h1>
                  <div className="bg-primary/5 dark:bg-primary-dark/5 rounded-lg p-4 text-sm dark:text-gray-300">
                    <p>α版のため、生成精度を検証中です。この生成結果を参考に、UXアシスタントとのやり取りを通じて細部の調整を行います。</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">最終更新日: {new Date().toLocaleDateString('ja-JP')}</p>
                  <div className="mt-8">
                    <h2 className="text-2xl font-medium mb-4 dark:text-gray-200">デザインコンセプト</h2>
                    <p className="text-lg text-primary dark:text-primary-dark">{planData?.designConcept}</p>
                  </div>
                </div>
              );
              break;

            case 'project':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">プロジェクト概要</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">サービス名</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.basicInfo?.serviceName}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">開発するサービスのゴール</h3>
                      <ul className="list-disc list-inside space-y-2 dark:text-gray-300">
                        {planData?.formData?.basicInfo?.serviceGoals?.map((goal: string, index: number) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">ターゲットユーザー</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.basicInfo?.targetUser}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">期待される効果</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.basicInfo?.expectedEffect}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">開発スケジュール</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.basicInfo?.developmentPeriod}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">予算感</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.basicInfo?.budget}</p>
                    </div>
                  </div>
                </div>
              );
              break;

            case 'requirements':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">技術要件</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">技術スタック</h3>
                      <div className="flex flex-wrap gap-2">
                        {planData?.formData?.technicalInfo?.techStack?.map((tech: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/5 dark:bg-[#2B2325] rounded-full text-sm dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">デーム構成</h3>
                      <div className="flex flex-wrap gap-2">
                        {planData?.formData?.technicalInfo?.teamStructure?.map((member: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/5 dark:bg-[#2B2325] rounded-full text-sm dark:text-gray-300">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">コミュニケーションツール</h3>
                      <div className="flex flex-wrap gap-2">
                        {planData?.formData?.technicalInfo?.communicationTools?.map((tool: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/5 dark:bg-[#2B2325] rounded-full text-sm dark:text-gray-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">プロジェクト管理ツール</h3>
                      <div className="flex flex-wrap gap-2">
                        {planData?.formData?.technicalInfo?.projectManagementTools?.map((tool: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/5 dark:bg-[#2B2325] rounded-full text-sm dark:text-gray-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">現在の課題</h3>
                      <p className="dark:text-gray-300">{planData?.formData?.technicalInfo?.currentIssues}</p>
                    </div>
                  </div>
                </div>
              );
              break;

            case 'design':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">デザイン要件</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">ペザインキーワード</h3>
                      <div className="flex flex-wrap gap-2">
                        {planData?.formData?.designInfo?.designKeywords?.map((keyword: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-primary/5 dark:bg-[#2B2325] rounded-full text-sm dark:text-gray-300">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">ペルソナ</h3>
                      <div className="bg-white dark:bg-[#231F1F] rounded-lg p-6 border dark:border-[#61585A]">
                        <p className="dark:text-text-dark">{planData?.formData?.designInfo?.persona}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">カスタマージャーニー</h3>
                      <div className="bg-white dark:bg-[#231F1F] rounded-lg p-6 border dark:border-[#61585A]">
                        <p className="dark:text-text-dark">{planData?.formData?.designInfo?.customerJourney}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">市場におけるポジショニング</h3>
                      <div className="bg-white dark:bg-[#231F1F] rounded-lg p-6 border dark:border-[#61585A]">
                        <p className="dark:text-text-dark">{planData?.formData?.designInfo?.marketPositioning}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">カラーパターン</h3>
                      <div className="bg-white dark:bg-[#231F1F] rounded-lg p-6 border dark:border-[#61585A]">
                        <p className="dark:text-text-dark">{planData?.formData?.designInfo?.colorPattern}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4 dark:text-gray-200">インタラクション要件</h3>
                      <div className="bg-white dark:bg-[#231F1F] rounded-lg p-6 border dark:border-[#61585A]">
                        <p className="dark:text-text-dark">{planData?.formData?.designInfo?.interaction}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
              break;

            case 'plan':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">デザインプラン</h2>
                  <div className="space-y-8">
                    <p className="text-lg dark:text-text-dark">今回に最適なUI/UXのデザインをお届けできるコンポーネントを選別しました</p>
                    <div className="bg-white dark:bg-[#231F1F] rounded-xl p-8">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                        コンポーネントとは、開発プロジェクトの本当に必要な要素や工程を"みえる化"したLean Designer独自のシステムです。
                        これによってプロジェクトにおける、デザインのどの要素が必要で、どの工程が組み込まれていないのかをプロジェクトに関わる全ての方が把握、
                        理解することができます。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                        {updateComponentSelection(planData).map((section, sectionIndex) => (
                          <div key={sectionIndex} className="space-y-4">
                            <h3 className="text-base md:text-sm font-medium text-gray-600 dark:text-gray-400">{section.title}</h3>
                            {section.components.map((component, componentIndex) => {
                              const reason = planData?.components?.reasons?.[component.name];
                              return (
                                <div
                                  key={componentIndex}
                                  className={`p-4 rounded-lg border-2 transition-all ${
                                    component.selected
                                      ? 'border-primary dark:border-[#61585A] bg-primary/5 dark:bg-[#2B2325]'
                                      : 'border-gray-200 dark:border-[#61585A] opacity-50'
                                  }`}
                                >
                                  <p className="text-base md:text-sm dark:text-text-dark">{component.name}</p>
                                  {component.selected && reason && (
                                    <p className="text-sm md:text-xs text-gray-600 dark:text-gray-400 mt-2">
                                      {reason}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
              break;

            case 'timeline':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">デザインタイムライン</h2>
                  <div className="bg-gray-50 dark:bg-[#231F1F] rounded-lg p-8 text-center border dark:border-[#61585A]">
                    <p className="text-gray-600 dark:text-gray-400">UXアシスタントとのお打ち合わせ後に精査され、最適なものが反映されます</p>
                  </div>
                </div>
              );
              break;

            case 'tools':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8 dark:text-gray-200">UI/UX活用ツール</h2>
                  <div className="bg-gray-50 dark:bg-[#231F1F] rounded-lg p-8 text-center border dark:border-[#61585A]">
                    <p className="text-gray-600 dark:text-gray-400">UXアシスタントとのお打ち合わせ後に精査され、最適なものが反映されます</p>
                  </div>
                </div>
              );
              break;

            case 'designer':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8">アサインデザイナー</h2>
                  <div className="bg-gray-50 dark:bg-[#231F1F] rounded-lg p-8 text-center border dark:border-[#61585A]">
                    <p className="text-gray-600 dark:text-gray-400">UXアシスタントとのお打ち合わせ後に精され、最適なものが反映されます</p>
                  </div>
                </div>
              );
              break;

            case 'about':
              content = (
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-medium mb-8">Lean Designer概要</h2>
                  <div className="text-center space-y-6">
                    <p className="dark:text-text-dark">
                      Lean Designerは、ピンポイントのプロジェクト課題に必要なだけ
                      スペシャリストのデザイナーに発注できるサービスです
                    </p>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-8 py-3 rounded-full text-sm border border-primary dark:border-[#61585A] hover:bg-primary/5 dark:hover:bg-[#2B2325]/50 transition-colors dark:text-text-dark"
                    >
                      詳しくはこちら
                    </button>
                  </div>
                </div>
              );
              break;

            default:
              content = null;
          }

          return (
            <motion.section
              key={id}
              id={id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`py-12 ${index !== 0 ? 'border-t border-gray-200 dark:border-[#2B2325]' : ''}`}
            >
              {content}
            </motion.section>
          );
        })}
      </main>
    </motion.div>
  );
} 