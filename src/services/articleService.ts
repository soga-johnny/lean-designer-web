import { getArticleById, getArticles, getArticlesByTags } from '@/lib/microcms';
import { Article } from '@/types/microcms';

/**
 * 記事詳細とレコメンド記事を取得
 */
export async function getArticleWithRecommendations(articleId: string) {
  const article = await getArticleById(articleId);

  if (!article) {
    return null;
  }

  const recommendedArticles = await getRecommendedArticles(article, articleId);

  return { article, recommendedArticles };
}

/**
 * レコメンド記事を取得
 * タグがある場合はタグベース、ない場合は全記事から取得
 */
async function getRecommendedArticles(article: Article, excludeId: string): Promise<Article[]> {
  // タグベースのレコメンド
  if (article.tags && article.tags.length > 0) {
    const tagIds = article.tags.map(tag => tag.id);
    const taggedArticles = await getArticlesByTags(tagIds);
    return taggedArticles
      .filter((a: Article) => a.id !== excludeId)
      .slice(0, 4);
  }

  // フォールバック: 全記事から取得
  const { contents: allArticles } = await getArticles();
  return allArticles
    .filter((a: Article) => a.id !== excludeId)
    .slice(0, 4);
}
