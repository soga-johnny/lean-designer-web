export function PopularKeywords() {
  const keywords = [
    'デザイン思考',
    'リーンスタートアップ',
    'UXデザイン',
    'プロトタイピング',
    'ユーザーリサーチ',
    'MVP開発',
    'アジャイル開発',
    'グロースハック'
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">注目のキーワード</h3>
      <div className="flex gap-3 flex-wrap">
        {keywords.map((keyword) => (
          <span key={keyword} className="text-sm text-gray-600">
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
