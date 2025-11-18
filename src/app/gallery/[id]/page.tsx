'use client';

import { useParams } from 'next/navigation';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StartGuide } from '@/components/StartGuide';
import { GalleryCard } from '@/components/GalleryCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { GalleryDetail } from '@/components/GalleryDetail';
import { useSession } from '@/hooks/useSession';
import { useSessions } from '@/hooks/useSessions';

export default function GalleryDetailPage() {
  const params = useParams();
  const sessionId = params?.id as string;

  // カスタムフックを使用してセッションを取得
  const { session, loading, error } = useSession(sessionId);

  // 新着ギャラリー4件を取得（現在のセッションを除く）
  const { sessions: latestSessions } = useSessions({
    limit: 5, // 現在のセッションを除外するため5件取得
    offset: 0,
  });

  return (
    <div className="min-h-screen pb-[62.5px] md:pb-0">
      <Header />
      <main className="md:max-w-[100rem] px-6 md:px-10 mx-auto">
        {/* ギャラリー詳細とレコメンド */}
        <section className="md:pt-60 max-md:pt-10 pb-40">
          {/* ギャラリー詳細 */}
          <GalleryDetail session={session} loading={loading} error={error} />

          {/* レコメンド一覧 */}
          <div className="mx-auto">
            <h2 className="text-2xl font-bold mb-8">新着ギャラリー</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {latestSessions
                .filter(s => s.session_id !== sessionId) // 現在のセッションを除外
                .slice(0, 4) // 4件まで
                .map((latestSession) => (
                  <GalleryCard
                    key={latestSession.session_id}
                    galleryId={latestSession.session_id}
                    title={latestSession.session_name}
                    createdAt={new Date(latestSession.created_at)}
                  />
                ))}
            </div>
          </div>
        </section>

        <section>
          <Breadcrumb
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'ギャラリー', href: '/gallery' },
              { label: session?.session_name || 'ギャラリー詳細' }
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
