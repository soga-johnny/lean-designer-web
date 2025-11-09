interface ColumnCardProps {
  index: number;
  title?: string;
  date?: string;
  tags?: string[];
}

export function ColumnCard({ index, title, date, tags }: ColumnCardProps) {
  const defaultTitle = `Column Article Title ${index + 1}`;
  const defaultDate = `2024.01.${String(index + 1).padStart(2, '0')}`;
  const defaultTags = ['デザイン', '戦略'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* サムネイル画像 */}
      <div className="aspect-video bg-gray-200"></div>

      <div className="p-6">
        {/* 日付 */}
        <p className="text-sm text-gray-500 mb-2">{date || defaultDate}</p>

        {/* タイトル */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title || defaultTitle}</h3>

        {/* タグ */}
        <div className="flex gap-2 flex-wrap">
          {(tags || defaultTags).map((tag) => (
            <span key={tag} className="text-sm text-gray-600">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
