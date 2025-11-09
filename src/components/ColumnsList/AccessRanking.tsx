import { ColumnCard } from '../ColumnCard';

export function AccessRanking() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">アクセスランキング</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <ColumnCard
            key={index}
            index={index + 9}
            title={`Ranking Article Title ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
