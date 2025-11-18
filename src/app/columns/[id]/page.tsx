import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StartGuide } from '@/components/StartGuide';
import { ColumnCard } from '@/components/ColumnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ShareButtons } from '@/components/ShareButtons';
import { getArticleById, getArticles, getArticlesByTags } from '@/lib/microcms';
import { Article } from '@/types/microcms';
import { notFound } from 'next/navigation';
import { formatDate } from './_utils/formatDate';
import { WriterBlock } from './_components/WriterBlock';
import { CTABlock } from './_components/CTABlock';
import { DraftModeBanner } from './_components/DraftModeBanner';
import { draftMode } from 'next/headers';
import './content.css';

// メタデータ生成関数をインポート
export { generateMetadata } from './_utils/generateMetadata';

// ISR: 6時間ごとに再検証
export const revalidate = 21600;

interface ColumnDetailPageProps {
  params: {
    id: string;
  };
  searchParams: {
    draftKey?: string;
  };
}

/**
 * ビルド時に全記事IDを取得してページを事前生成（SSG）
 */
export async function generateStaticParams() {
  try {
    const { contents: articles } = await getArticles();

    return articles.map((article: Article) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error('記事IDの取得に失敗しました:', error);
    return [];
  }
}

export default async function ColumnDetailPage({ params, searchParams }: ColumnDetailPageProps) {
  const { isEnabled: isDraftMode } = draftMode();
  const draftKey = searchParams.draftKey;
  
  // Draft Mode が有効 かつ draftKey がある場合のみプレビューモード
  const isDraftPreview = isDraftMode && !!draftKey;
  
  // デバッグログ
  console.log('🔍 Draft Mode Status:', { isDraftMode, hasDraftKey: !!draftKey, isDraftPreview, articleId: params.id });
  
  let article: Article;
  let recommendedArticles: Article[] = [];

  try {
    // プレビューモードの場合はdraftKeyを使用して記事を取得
    article = await getArticleById(params.id, isDraftPreview ? draftKey : undefined);
    
    if (!article) {
      notFound();
    }

    // レコメンド記事を取得（現在の記事のタグに紐づく記事）
    if (article.tags && article.tags.length > 0) {
      // タグIDの配列を作成
      const tagIds = article.tags.map(tag => tag.id);

      // タグに紐づく記事を取得
      const taggedArticles = await getArticlesByTags(tagIds);

      // 現在の記事を除外して最新4件
      recommendedArticles = taggedArticles
        .filter((a: Article) => a.id !== params.id)
        .slice(0, 4);
    } else {
      // タグがない場合は全記事から取得
      const { contents: allArticles } = await getArticles();

      recommendedArticles = allArticles
        .filter((a: Article) => a.id !== params.id)
        .slice(0, 4);
    }
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    notFound();
  }

  // 日付のフォーマット
  const formattedDate = formatDate(article.publishedAt || article.createdAt);

  // タグ名の配列を作成
  const tagNames = article.tags?.map(tag => tag.name) || [];

  return (
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      {isDraftPreview && <DraftModeBanner />}
      <main className="md:max-w-[100rem] mx-auto px-6 md:px-10">
        <section className="md:pt-[8.875rem] pt-10 md:pb-32 pb-10">
          {/* コラムコンテンツ */}
          <div className="max-w-[47rem] mx-auto mb-10 md:mb-32">

            {/* アイキャッチ */}
            {article.eyecatch?.url ? (
              <div className="aspect-video rounded-lg mb-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.eyecatch.url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video mb-10"></div>
            )}

            {/* 日付 */}
            <div className="flex items-center gap-1 text-sm font-bold mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/calendar.svg" alt="" className="w-5 h-5" />
              <p className="leading-5">{formattedDate}</p>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{article.title}</h1>

            {/* タグ */}
            <div className="flex gap-2 mb-10">
              {tagNames.map((tagName) => (
                <span key={tagName} className="text-sm text-ld-grey-400">#{tagName}</span>
              ))}
            </div>
            

            {/* コラム本文 */}
            <div 
              className="prose max-w-none mb-12 column-content"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* CTAブロック */}
            <CTABlock />

            {/* このコラムを書いた人 */}
            {article.writer && <WriterBlock data={article.writer} />}

            {/* SNSシェア */}
            <ShareButtons articleUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://leandesigner.app'}/columns/${article.id}`} articleTitle={article.title} />

            {/* 一覧へ戻るボタン */}
            <SecondaryButton href="/columns" className="w-full">一覧へ戻る</SecondaryButton>
          </div>

          {/* レコメンドコラム一覧 */}
          <div className="mx-auto max-w-[75rem]">
            <h2 className="text-2xl font-bold">レコメンド</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedArticles.map((recommendedArticle) => (
                <ColumnCard
                  key={recommendedArticle.id}
                  columnId={recommendedArticle.id}
                  title={recommendedArticle.title}
                  date={formatDate(recommendedArticle.publishedAt || recommendedArticle.createdAt)}
                  tags={recommendedArticle.tags}
                  createdAt={new Date(recommendedArticle.createdAt)}
                  thumbnailUrl={recommendedArticle.eyecatch?.url}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'コラム', href: '/columns' },
            { label: article.title }
          ]}
          />
        </section>

        <section className="py-10 md:py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
