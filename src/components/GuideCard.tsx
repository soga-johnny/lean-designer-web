interface GuideCardProps {
  step: string;
  title: string;
  description: string;
  buttonText?: string;
}

export function GuideCard({ step, title, description, buttonText = '詳細を見る' }: GuideCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      {/* 小文言 */}
      <div className="text-sm text-gray-500 mb-4">{step}</div>

      {/* タイトルと詳細 */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* ボタン */}
      <div className="mt-4">
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
