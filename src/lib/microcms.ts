import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// ---------- 記事 ----------

/**
 * 全記事を取得
 */
export async function getArticles(limit?: number, offset?: number) {
  const queries: { limit?: number; offset?: number } = {};
  if (limit !== undefined) queries.limit = limit;
  if (offset !== undefined) queries.offset = offset;

  const data = await client.get({
    endpoint: 'articles',
    queries
  });
  return { contents: data.contents, totalCount: data.totalCount };
}

/**
 * IDで記事を取得
 * @param id 記事ID
 * @param draftKey ドラフトキー（プレビュー時に使用）
 */
export async function getArticleById(id: string, draftKey?: string) {
  const queries = draftKey ? { draftKey } : {};
  const data = await client.get({ 
    endpoint: 'articles', 
    contentId: id,
    queries 
  });
  return data;
}

/**
 * タグで記事を絞り込み
 */
export async function getArticlesByTag(tagId: string, limit?: number, offset?: number) {
  const queries: { filters: string; limit?: number; offset?: number } = {
    filters: `tags[contains]${tagId}`
  };
  if (limit !== undefined) queries.limit = limit;
  if (offset !== undefined) queries.offset = offset;

  const data = await client.get({
    endpoint: 'articles',
    queries
  });
  return { contents: data.contents, totalCount: data.totalCount };
}

/**
 * 複数のタグで記事を絞り込み（OR条件）
 */
export async function getArticlesByTags(tagIds: string[], limit?: number, offset?: number) {
  const filters = tagIds.map(id => `tags[contains]${id}`).join('[or]');
  const queries: { filters: string; limit?: number; offset?: number } = { filters };
  if (limit) queries.limit = limit;
  if (offset) queries.offset = offset;

  const data = await client.get({
    endpoint: 'articles',
    queries
  });
  return { contents: data.contents, totalCount: data.totalCount };
}

// ---------- タグ ----------

/**
 * 全タグを取得
 */
export async function getTags() {
  const data = await client.get({ endpoint: 'tags' });
  return data.contents;
}

/**
 * IDでタグを取得
 */
export async function getTagById(id: string) {
  const data = await client.get({ endpoint: 'tags', contentId: id });
  return data;
}

