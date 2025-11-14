'use client';

interface ShareButtonsProps {
  articleUrl: string;
  articleTitle: string;
}


const createShareLinks = (url: string, title: string) => ({
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  threads: `https://threads.net/intent/post?text=${encodeURIComponent(`${title} ${url}`)}`,
});

/**
 * SNSシェアボタン
 */
export function ShareButtons({ articleUrl, articleTitle }: ShareButtonsProps) {
  const shareLinks = createShareLinks(articleUrl, articleTitle);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      alert('リンクをコピーしました');
    } catch (err) {
      console.error('リンクのコピーに失敗しました:', err);
    }
  };

  return (
    <div className="mb-10">
      <p className="text-sm mb-4">このコラムをシェアする</p>
      <div className="flex w-full rounded-lg overflow-hidden">
        {/* X (Twitter) */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 px-2 bg-ld-grey-400 hover:opacity-70 flex items-center justify-center"
          aria-label="Xでシェア"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-sns-x.svg" alt="" className="w-6 h-6" />
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 px-2 bg-ld-grey-700 hover:opacity-70 flex items-center justify-center"
          aria-label="Facebookでシェア"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-sns-facebook.svg" alt="" className="w-6 h-6" />
        </a>

        {/* Threads */}
        <a
          href={shareLinks.threads}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 px-2 bg-ld-grey-400 hover:opacity-70 flex items-center justify-center"
          aria-label="Threadsでシェア"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-sns-thread.svg" alt="" className="w-6 h-6" />
        </a>

        {/* リンクコピー */}
        <button
          onClick={handleCopyLink}
          className="flex-1 py-4 px-2 bg-ld-grey-700 hover:opacity-70 flex items-center justify-center"
          aria-label="リンクをコピー"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-sns-link.svg" alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

