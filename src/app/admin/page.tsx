'use client';

import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Logo } from '@/components/logo';

// 管理者パスワード
const ADMIN_PASSWORD = 'ld-admin';

// 型の定義を改善
type Components = {
  strategy: string[];
  tactical: string[];
  styling: string[];
  reasons: Record<string, string>;
};

type FormData = {
  basicInfo: {
    serviceName: string;
    serviceGoals: string[];
    targetUser: string;
    expectedEffect: string;
  };
  technicalInfo: {
    techStack: string[];
  };
  designInfo: {
    designKeywords: string[];
    persona: {
      attributes: string;
      needs: string[];
    };
    direction: string;
    metrics: string[];
  };
};

// デフォルト値の定義
const defaultFormData: FormData = {
  basicInfo: {
    serviceName: '',
    serviceGoals: [],
    targetUser: '',
    expectedEffect: ''
  },
  technicalInfo: {
    techStack: []
  },
  designInfo: {
    designKeywords: [],
    persona: {
      attributes: '',
      needs: []
    },
    direction: '',
    metrics: []
  }
};

const defaultComponents: Components = {
  strategy: [],
  tactical: [],
  styling: [],
  reasons: {}
};

type Document = {
  id: string;
  serviceName: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  designConcept: string;
  formData: FormData;
  components: {
    strategy: string[];
    tactical: string[];
    styling: string[];
    reasons: Record<string, string>;
  };
};

type EditableData = Partial<Document> & {
  formData?: Partial<FormData>;
};

export default function AdminPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editedData, setEditedData] = useState<EditableData>({});

  // ドキュメント一覧の取得
  const fetchDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, 'documents'));
    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Document));
    setDocuments(docs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  // パスワード認証の実装
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('パスワードが正しくありません');
    }
  };

  // 更新時の検証
  const validateData = (data: EditableData): string[] => {
    const errors: string[] = [];

    // 必須フィールドの検証
    if (!data.serviceName?.trim()) {
      errors.push('サービス名は必須です');
    }
    if (!data.designConcept?.trim()) {
      errors.push('デザインコンセプトは必須です');
    }

    // コンポーネントの検証
    const components = data.components || defaultComponents;
    if (!components.strategy?.length) {
      errors.push('戦略セクションから最低1つのコンポーネントを選択してください');
    }
    if (!components.tactical?.length) {
      errors.push('戦術セクションから最低1つのコンポーネントを選択してください');
    }
    if (!components.styling?.length) {
      errors.push('スタイリングセクションから最低1つのコンポーネントを選択してください');
    }

    return errors;
  };

  // ドキュメントの更新処理を改善
  const handleUpdate = async () => {
    if (!selectedDoc) return;

    // データの検証
    const errors = validateData(editedData);
    if (errors.length > 0) {
      alert(`以下のエラーを修正してください：\n\n${errors.join('\n')}`);
      return;
    }

    try {
      const docRef = doc(db, 'documents', selectedDoc.id);
      await updateDoc(docRef, {
        ...editedData,
        updatedAt: new Date().toISOString()
      });

      await fetchDocuments();
      setIsAuthenticated(false);
      setEditedData({});
      alert('更新が完了しました');
    } catch (error) {
      console.error('Error updating document:', error);
      alert('更新中にエラーが発生しました');
    }
  };

  // 編集フォームの実装
  const EditForm = ({ doc }: { doc: Document }) => {
    const handleChange = (path: string[], value: unknown) => {
      const newData = { ...editedData };
      let current: Record<string, unknown> = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]] as Record<string, unknown>;
      }
      current[path[path.length - 1]] = value;
      setEditedData(newData);
    };

    const handleArrayChange = (path: string[], index: number, value: string) => {
      const getValue = (obj: Record<string, unknown>, path: string[]): unknown[] => {
        const getNestedValue = (obj: Record<string, unknown> | null, path: string[]): unknown[] => {
          const result = path.reduce<Record<string, unknown> | null>((acc, key) => 
            (acc as Record<string, unknown>)?.[key] as Record<string, unknown> | null, obj);
          return (result as unknown as unknown[]) ?? [];
        };
        
        return getNestedValue(obj, path) ?? getNestedValue(doc as Record<string, unknown>, path) ?? [];
      };

      const array = [...(getValue(editedData, path) as string[])];
      array[index] = value;
      handleChange(path, array);
    };

    // 安全なアクセスのためのヘルパー関数
    const getNeeds = () => {
      return editedData.formData?.designInfo?.persona?.needs || 
             doc.formData?.designInfo?.persona?.needs || 
             defaultFormData.designInfo.persona.needs;
    };

    const getTechStack = () => {
      return editedData.formData?.technicalInfo?.techStack || 
             doc.formData?.technicalInfo?.techStack || 
             defaultFormData.technicalInfo.techStack;
    };

    const getDesignKeywords = () => {
      return editedData.formData?.designInfo?.designKeywords || 
             doc.formData?.designInfo?.designKeywords || 
             defaultFormData.designInfo.designKeywords;
    };

    const getMetrics = () => {
      return editedData.formData?.designInfo?.metrics || 
             doc.formData?.designInfo?.metrics || 
             defaultFormData.designInfo.metrics;
    };

    const getStrategyComponents = () => {
      return editedData.components?.strategy || 
             doc.components?.strategy || 
             defaultComponents.strategy;
    };

    const getTacticalComponents = () => {
      return editedData.components?.tactical || 
             doc.components?.tactical || 
             defaultComponents.tactical;
    };

    const getStylingComponents = () => {
      return editedData.components?.styling || 
             doc.components?.styling || 
             defaultComponents.styling;
    };

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">編集フォーム</h2>
          <div className="space-x-4">
            <button
              onClick={() => {
                if (Object.keys(editedData).length > 0) {
                  if (confirm('変更内容が失われますが、よろしいですか？')) {
                    setIsAuthenticated(false);
                    setEditedData({});
                  }
                } else {
                  setIsAuthenticated(false);
                }
              }}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              onClick={() => {
                if (confirm('この内容で更新してよしいですか？')) {
                  handleUpdate();
                }
              }}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
            >
              更新
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* 基本情報 */}
          <section>
            <h3 className="text-lg font-medium mb-4">基本情報</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">サービス名</label>
                <input
                  type="text"
                  value={editedData.serviceName || doc.serviceName}
                  onChange={(e) => handleChange(['serviceName'], e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">デザインコンセプト</label>
                <textarea
                  value={editedData.designConcept || doc.designConcept}
                  onChange={(e) => handleChange(['designConcept'], e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border h-24"
                />
              </div>

              {/* ターゲットユーザー */}
              <div>
                <label className="block text-sm font-medium mb-1">ターゲットユーザー</label>
                <textarea
                  value={editedData.formData?.basicInfo?.targetUser || doc.formData.basicInfo.targetUser}
                  onChange={(e) => handleChange(['formData', 'basicInfo', 'targetUser'], e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              {/* 期待される効果 */}
              <div>
                <label className="block text-sm font-medium mb-1">期待される効果</label>
                <textarea
                  value={editedData.formData?.basicInfo?.expectedEffect || doc.formData.basicInfo.expectedEffect}
                  onChange={(e) => handleChange(['formData', 'basicInfo', 'expectedEffect'], e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
            </div>
          </section>

          {/* 技術情報 */}
          <section>
            <h3 className="text-lg font-medium mb-4">技術情報</h3>
            <div>
              <label className="block text-sm font-medium mb-1">技術スタック</label>
              <div className="space-y-2">
                {getTechStack().map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleArrayChange(['formData', 'technicalInfo', 'techStack'], index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border"
                    />
                    <button
                      onClick={() => {
                        const newStack = [...(editedData.formData?.technicalInfo?.techStack || doc.formData.technicalInfo.techStack)];
                        newStack.splice(index, 1);
                        handleChange(['formData', 'technicalInfo', 'techStack'], newStack);
                      }}
                      className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                    >
                      削除
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newStack = [...(editedData.formData?.technicalInfo?.techStack || doc.formData.technicalInfo.techStack), ''];
                    handleChange(['formData', 'technicalInfo', 'techStack'], newStack);
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  + 技術を追加
                </button>
              </div>
            </div>
          </section>

          {/* デザイン情報 */}
          <section>
            <h3 className="text-lg font-medium mb-4">デザイン情報</h3>
            <div className="space-y-6">
              {/* デザインキーワード */}
              <div>
                <label className="block text-sm font-medium mb-1">デザインキーワード</label>
                <div className="space-y-2">
                  {getDesignKeywords().map((keyword, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => handleArrayChange(['formData', 'designInfo', 'designKeywords'], index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border"
                      />
                      <button
                        onClick={() => {
                          const newKeywords = [...(editedData.formData?.designInfo?.designKeywords || doc.formData.designInfo.designKeywords)];
                          newKeywords.splice(index, 1);
                          handleChange(['formData', 'designInfo', 'designKeywords'], newKeywords);
                        }}
                        className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newKeywords = [...(editedData.formData?.designInfo?.designKeywords || doc.formData.designInfo.designKeywords), ''];
                      handleChange(['formData', 'designInfo', 'designKeywords'], newKeywords);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    + キーワードを追加
                  </button>
                </div>
              </div>

              {/* ペルソナ */}
              <div>
                <h4 className="text-sm font-medium mb-4">ペルソナ</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">属性</label>
                    <textarea
                      value={editedData.formData?.designInfo?.persona?.attributes || doc.formData.designInfo.persona.attributes}
                      onChange={(e) => handleChange(['formData', 'designInfo', 'persona', 'attributes'], e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">課題・ニーズ</label>
                    <div className="space-y-2">
                      {getNeeds().map((need, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={need}
                            onChange={(e) => handleArrayChange(['formData', 'designInfo', 'persona', 'needs'], index, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border"
                          />
                          <button
                            onClick={() => {
                              const newNeeds = [...(editedData.formData?.designInfo?.persona?.needs || doc.formData.designInfo.persona.needs)];
                              newNeeds.splice(index, 1);
                              handleChange(['formData', 'designInfo', 'persona', 'needs'], newNeeds);
                            }}
                            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                          >
                            削除
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newNeeds = [...(editedData.formData?.designInfo?.persona?.needs || doc.formData.designInfo.persona.needs), ''];
                          handleChange(['formData', 'designInfo', 'persona', 'needs'], newNeeds);
                        }}
                        className="text-sm text-primary hover:underline"
                      >
                        + ニーズを追加
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI/UXの方向性 */}
              <div>
                <label className="block text-sm font-medium mb-1">UI/UXの方向性</label>
                <textarea
                  value={editedData.formData?.designInfo?.direction || doc.formData.designInfo.direction}
                  onChange={(e) => handleChange(['formData', 'designInfo', 'direction'], e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border h-32"
                />
              </div>

              {/* 重視する指標 */}
              <div>
                <label className="block text-sm font-medium mb-1">重視する指標</label>
                <div className="space-y-2">
                  {getMetrics().map((metric, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={metric}
                        onChange={(e) => handleArrayChange(['formData', 'designInfo', 'metrics'], index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border"
                      />
                      <button
                        onClick={() => {
                          const newMetrics = [...(editedData.formData?.designInfo?.metrics || doc.formData.designInfo.metrics)];
                          newMetrics.splice(index, 1);
                          handleChange(['formData', 'designInfo', 'metrics'], newMetrics);
                        }}
                        className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newMetrics = [...(editedData.formData?.designInfo?.metrics || doc.formData.designInfo.metrics), ''];
                      handleChange(['formData', 'designInfo', 'metrics'], newMetrics);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    + 指標を追加
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* コンポーネント */}
          <section>
            <h3 className="text-lg font-medium mb-4">選択コンポーネント</h3>
            <div className="space-y-6">
              {/* 戦略セクション */}
              <div>
                <h4 className="text-sm font-medium mb-4">デザイン戦略セクション</h4>
                <div className="space-y-2">
                  {getStrategyComponents().map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={component}
                          onChange={(e) => handleArrayChange(['components', 'strategy'], index, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border"
                        />
                        <button
                          onClick={() => {
                            const newComponents = [...(editedData.components?.strategy || doc.components.strategy)];
                            newComponents.splice(index, 1);
                            handleChange(['components', 'strategy'], newComponents);
                          }}
                          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                        >
                          削除
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">選択理由</label>
                        <input
                          type="text"
                          value={editedData.components?.reasons?.[component] || doc.components.reasons[component] || ''}
                          onChange={(e) => {
                            const newReasons = {
                              ...(editedData.components?.reasons || doc.components.reasons),
                              [component]: e.target.value
                            };
                            handleChange(['components', 'reasons'], newReasons);
                          }}
                          className="w-full px-4 py-2 rounded-lg border text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newComponents = [...(editedData.components?.strategy || doc.components.strategy), ''];
                      handleChange(['components', 'strategy'], newComponents);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    + コンポーネントを追加
                  </button>
                </div>
              </div>

              {/* 戦術セクション */}
              <div>
                <h4 className="text-sm font-medium mb-4">デザイン戦術セクション</h4>
                <div className="space-y-2">
                  {getTacticalComponents().map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={component}
                          onChange={(e) => handleArrayChange(['components', 'tactical'], index, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border"
                        />
                        <button
                          onClick={() => {
                            const newComponents = [...(editedData.components?.tactical || doc.components.tactical)];
                            newComponents.splice(index, 1);
                            handleChange(['components', 'tactical'], newComponents);
                          }}
                          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                        >
                          削除
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">選択理由</label>
                        <input
                          type="text"
                          value={editedData.components?.reasons?.[component] || doc.components.reasons[component] || ''}
                          onChange={(e) => {
                            const newReasons = {
                              ...(editedData.components?.reasons || doc.components.reasons),
                              [component]: e.target.value
                            };
                            handleChange(['components', 'reasons'], newReasons);
                          }}
                          className="w-full px-4 py-2 rounded-lg border text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newComponents = [...(editedData.components?.tactical || doc.components.tactical), ''];
                      handleChange(['components', 'tactical'], newComponents);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    + コンポーネントを追加
                  </button>
                </div>
              </div>

              {/* スタイリングセクション */}
              <div>
                <h4 className="text-sm font-medium mb-4">スタイリングセクション</h4>
                <div className="space-y-2">
                  {getStylingComponents().map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={component}
                          onChange={(e) => handleArrayChange(['components', 'styling'], index, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border"
                        />
                        <button
                          onClick={() => {
                            const newComponents = [...(editedData.components?.styling || doc.components.styling)];
                            newComponents.splice(index, 1);
                            handleChange(['components', 'styling'], newComponents);
                          }}
                          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                        >
                          削除
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">選択理由</label>
                        <input
                          type="text"
                          value={editedData.components?.reasons?.[component] || doc.components.reasons[component] || ''}
                          onChange={(e) => {
                            const newReasons = {
                              ...(editedData.components?.reasons || doc.components.reasons),
                              [component]: e.target.value
                            };
                            handleChange(['components', 'reasons'], newReasons);
                          }}
                          className="w-full px-4 py-2 rounded-lg border text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newComponents = [...(editedData.components?.styling || doc.components.styling), ''];
                      handleChange(['components', 'styling'], newComponents);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    + コンポーネントを追加
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Logo />
          </div>
        </header>

        <main className="pt-24 pb-24">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-xl font-medium mb-6 text-center">管理者認証</h1>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border"
                  placeholder="パスワード"
                />
                <button
                  type="submit"
                  className="w-full px-8 py-3 rounded-full bg-primary text-white"
                >
                  認証
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <h1 className="text-xl font-medium">管理画面</h1>
        </div>
      </header>

      <main className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            {/* ドキュメント一覧 */}
            <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">デザイン計画書一覧</h2>
              <div className="space-y-2">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-4 rounded-lg ${
                      selectedDoc?.id === doc.id ? 'bg-primary/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-medium">{doc.serviceName}</p>
                    <p className="text-sm text-gray-500">
                      作成日: {new Date(doc.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 編集フォーム */}
            <div className="col-span-8">
              {selectedDoc && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <EditForm doc={selectedDoc} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 