import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StartGuide } from '@/components/StartGuide';
import { ColumnCard } from '@/components/ColumnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ShareButtons } from '@/components/ShareButtons';
import { getArticleById, getArticles, getArticlesByTags } from '@/lib/microcms';
import { Article, Writer } from '@/types/microcms';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import './content.css';

// ISR: 6時間ごとに再検証
export const revalidate = 21600;

interface ColumnDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * ビルド時に全記事IDを取得してページを事前生成（SSG）
 */
export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    
    return articles.map((article: Article) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error('記事IDの取得に失敗しました:', error);
    return [];
  }
}

/**
 * HTMLタグを除去してプレーンテキストにする
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * テキストを指定文字数でトリミングして三点リーダーを追加
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * メタデータを動的に生成（SEO対応）
 */
export async function generateMetadata({ params }: ColumnDetailPageProps): Promise<Metadata> {
  try {
    const article = await getArticleById(params.id);
    
    if (!article) {
      return {
        title: 'Lean Designer',
      };
    }

    // 本文からHTMLタグを除去してプレーンテキスト化
    const plainContent = article.content ? stripHtml(article.content) : '';
    
    // 70文字でトリミングして三点リーダーを追加
    const description = truncateText(plainContent, 80);

    return {
      title: `${article.title} | Lean Designer`,
      description: description,
      openGraph: {
        title: `${article.title} | Lean Designer`,
        description: description,
        images: article.eyecatch?.url ? [article.eyecatch.url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${article.title} | Lean Designer`,
        description: description,
        images: article.eyecatch?.url ? [article.eyecatch.url] : [],
      },
    };
  } catch (error) {
    console.error('メタデータの生成に失敗しました:', error);
    return {
      title: 'コラム | Lean Designer',
    };
  }
}

/**
 * 日付をYYYY.MM.DD形式にフォーマット
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * このコラムを書いた人のブロック
 */
function WriterBlock({ data }: { data: Writer }) {
  return (
    <div className="px-10 py-6 bg-white rounded-2xl border border-ld-grey-100 mb-10">
      <p className="text-sm mb-4">このコラムを書いた人</p>
      <div className="flex md:items-center gap-6 border-t border-ld-grey-100 pt-4">
        <div className="md:w-28 md:h-28 w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.thumbnail.url} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-lg mb-2">{data.name}</p>
          <p className="text-ld-grey-400 text-sm">{data.biography}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * CTAブロック
 */
function CTABlock() {
  return (
    <div className="py-8 md:py-10 px-8 md:px-14 bg-ld-grey-50 rounded-2xl border border-ld-grey-100 mb-10">
      <p className="text-sm mb-4 md:mb-6">お問い合わせ・資料ダウンロード</p>
      <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 relative before:content-[''] before:absolute before:left-[-2rem] md:before:left-[-3.5rem] before:top-0 before:bottom-0 before:w-1 before:bg-ld-grey-700">コンピューターと情報表現の力で、貴社の課題解決に伴走します</p>
      <div className="flex gap-2 md:flex-row flex-col">
        <PrimaryButton href="https://www.plasmism.com/contact" className="w-[fit-content]" target="_blank">まずは相談する</PrimaryButton>
        <PrimaryButton href="https://www.plasmism.com/download" className="w-[fit-content]" target="_blank">資料をダウンロードする</PrimaryButton>
      </div>
    </div>
  );
}

export default async function ColumnDetailPage({ params }: ColumnDetailPageProps) {
  let article: Article;
  let recommendedArticles: Article[] = [];

  try {
    // 記事詳細を取得
    article = await getArticleById(params.id);
    
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
      const allArticles = await getArticles();
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
    <div className="min-h-screen">
      <Header />
      <main className="md:mt-[4.875rem] px-6 md:px-10">

        <section className="md:pt-16 md:pb-32 pb-10">
          {/* コラムコンテンツ */}
          <div className="max-w-[752px] mx-auto mb-10 md:mb-32">

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
            {CTABlock()}

            {/* このコラムを書いた人 */}
            {article.writer && <WriterBlock data={article.writer} />}

            {/* SNSシェア */}
            <ShareButtons articleUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://leandesigner.app'}/columns/${article.id}`} articleTitle={article.title} />

            {/* 一覧へ戻るボタン */}
            <SecondaryButton href="/columns" className="w-full">一覧へ戻る</SecondaryButton>
          </div>

          {/* レコメンドコラム一覧 */}
          <div className="mx-auto px-4">
            <h2 className="text-2xl font-bold">レコメンド</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {recommendedArticles.map((recommendedArticle) => (
                <ColumnCard
                  key={recommendedArticle.id}
                  columnId={recommendedArticle.id}
                  title={recommendedArticle.title}
                  date={formatDate(recommendedArticle.publishedAt || recommendedArticle.createdAt)}
                  tags={recommendedArticle.tags?.map(tag => tag.name)}
                  createdAt={new Date(recommendedArticle.createdAt)}
                  thumbnailUrl={recommendedArticle.eyecatch?.url}
                />
              ))}
            </div>
          </div>

          
        </section>

        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'コラム', href: '/columns' },
            { label: article.title }
          ]}
        />

        <section className="py-20 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
