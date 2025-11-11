import { ColumnCard } from '../ColumnCard';

interface ColumnsGridProps {
  itemsCount: number;
}

export function ColumnsGrid({ itemsCount }: ColumnsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(itemsCount)].map((_, index) => (
        <ColumnCard key={index} columnId={`column-${index + 1}`} />
      ))}
    </div>
  );
}
