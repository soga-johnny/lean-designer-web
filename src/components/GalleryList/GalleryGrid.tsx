import { GalleryCard } from '../GalleryCard';
import { Session } from '@/services/sessionService';

interface GalleryGridProps {
  itemsCount: number;
  layout?: 'list' | 'top';
  sessions?: Session[];
}

export function GalleryGrid({ itemsCount, layout = 'list', sessions = [] }: GalleryGridProps) {
  // セッションデータをitemsCountまで制限
  const displaySessions = sessions.slice(0, itemsCount);

  if (layout === 'list') {
    // ギャラリー一覧ページ: 3列×4段
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displaySessions.map((session) => (
          <GalleryCard
            key={session.session_id}
            galleryId={session.session_id}
            title={session.session_name}
            createdAt={new Date(session.created_at)}
          />
        ))}
      </div>
    );
  }

  // トップページ: 1段目は横長2枚、2-3段目は4列
  const largeSessions = displaySessions.slice(0, 2);
  const smallSessions = displaySessions.slice(2, 10);

  return (
    <>
      {/* 1段目: 横長カード2枚 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {largeSessions.map((session) => (
          <GalleryCard
            key={session.session_id}
            galleryId={session.session_id}
            title={session.session_name}
            size="large"
            createdAt={new Date(session.created_at)}
          />
        ))}
      </div>

      {/* 2-3段目: 4列×2段 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {smallSessions.map((session) => (
          <GalleryCard
            key={session.session_id}
            galleryId={session.session_id}
            title={session.session_name}
            size="small"
            createdAt={new Date(session.created_at)}
          />
        ))}
      </div>
    </>
  );
}
