import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// ---------- 記事 ----------

/**
 * 全記事を取得
 */
export async function getArticles() {
  const data = await client.get({ 
    endpoint: 'articles',
    queries: { limit: 100 }
  });
  return data.contents;
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
export async function getArticlesByTag(tagId: string) {
  const data = await client.get({
    endpoint: 'articles',
    queries: {
      filters: `tags[contains]${tagId}`,
      limit: 100
    }
  });
  return data.contents;
}

/**
 * 複数のタグで記事を絞り込み（OR条件）
 */
export async function getArticlesByTags(tagIds: string[]) {
  const filters = tagIds.map(id => `tags[contains]${id}`).join('[or]');
  const data = await client.get({
    endpoint: 'articles',
    queries: {
      filters,
      limit: 100
    }
  });
  return data.contents;
}

// ---------- タグ ----------

/**
 * 全タグを取得
 */
export async function getTags() {
  const data = await client.get({ 
    endpoint: 'tags',
    queries: { limit: 30 }
  });
  return data.contents;
}

/**
 * IDでタグを取得
 */
export async function getTagById(id: string) {
  const data = await client.get({ endpoint: 'tags', contentId: id });
  return data;
}

