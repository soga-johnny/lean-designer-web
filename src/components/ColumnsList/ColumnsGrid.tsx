import { ColumnCard } from '../ColumnCard';
import { Article } from '@/types/microcms';

interface ColumnsGridProps {
  itemsCount: number;
  articles: Article[];
}

export function ColumnsGrid({ itemsCount, articles }: ColumnsGridProps) {
  // 指定された数だけ記事を表示
  const displayArticles = articles.slice(0, itemsCount);

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayArticles.map((article) => (
        <ColumnCard
          key={article.id}
          columnId={article.id}
          title={article.title}
          date={formatDate(article.publishedAt || article.createdAt)}
          tags={article.tags?.map(tag => tag.name)}
          createdAt={new Date(article.createdAt)}
          thumbnailUrl={article.eyecatch?.url}
        />
      ))}
    </div>
  );
}
