import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideContent } from '@/components/StartGuide/GuideContent';
import { ColumnCard } from '@/components/ColumnCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export default function ColumnDetailPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[100rem] mx-auto">
        {/* コラム内容とレコメンド */}
        <section className="py-20">
          {/* コラム内容 */}
          <div className="max-w-4xl mx-auto px-4 mb-20">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Column Article Title</h1>

            {/* 日付とタグ */}
            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm text-gray-500">2024.01.01</p>
              <div className="flex gap-2">
                <span className="text-sm text-gray-600">#デザイン</span>
                <span className="text-sm text-gray-600">#戦略</span>
              </div>
            </div>

            {/* サムネイル画像 */}
            <div className="aspect-video bg-gray-200 rounded-lg mb-8"></div>

            {/* コラム本文（空） */}
            <div className="prose max-w-none mb-12">
              {/* コラムの内容がここに入ります */}
            </div>

            {/* 一覧へ戻るボタン */}
            <div className="mb-12">
              <Link
                href="/columns"
                className="block w-full px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                一覧へ戻る
              </Link>
            </div>
          </div>

          {/* レコメンドコラム一覧 */}
          <div className="mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">レコメンド</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, index) => (
                <ColumnCard
                  key={index}
                  columnId={`column-${index + 9}`}
                  title={`Recommended Article ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'コラム', href: '/columns' },
              { label: 'コラム詳細' }
            ]}
          />
        </section>

        <section className="py-20">
          <GuideContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
