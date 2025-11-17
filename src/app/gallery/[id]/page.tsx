'use client';

import { useParams } from 'next/navigation';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StartGuide } from '@/components/StartGuide';
import { GalleryCard } from '@/components/GalleryCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { GalleryDetail } from '@/components/GalleryDetail';
import { useSession } from '@/hooks/useSession';

export default function GalleryDetailPage() {
  const params = useParams();
  const sessionId = params?.id as string;

  // カスタムフックを使用してセッションを取得
  const { session, loading, error } = useSession(sessionId);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="md:max-w-[100rem] max-md:px-[2rem] mx-auto">
        {/* ギャラリー詳細とレコメンド */}
        <section className="md:pt-60 max-md:pt-10 pb-40">
          {/* ギャラリー詳細 */}
          <GalleryDetail session={session} loading={loading} error={error} />

          {/* レコメンド一覧 */}
          <div className="mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">レコメンド</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <GalleryCard key={index} galleryId={`gallery-${index + 1}`} />
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

        <section className="py-32 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:bg-[#F4F3F2] before:-z-[5]">
          <StartGuide />
        </section>
      </main>
      <Footer />
    </div>
  );
}
