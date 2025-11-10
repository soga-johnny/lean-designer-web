import Link from "next/link";

interface GuideCardProps {
  step: string;
  title: string;
  description: string;
  buttonText?: string;
  href: string;
  buttonType?: 'primary' | 'secondary';
}

export function GuideCard({ step, title, description, buttonText, href, buttonType = 'primary' }: GuideCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="bg-ld-grey-100 hover:bg-ld-grey-200 transition-colors rounded-[16px] px-6 md:px-10 py-8 md:py-14 md:h-[512px] flex flex-col justify-between">
      {/* 小文言 */}
      <div className="text-sm text-gray-500 mb-8 md:mb-20">{step}</div>

      {/* タイトルと詳細 */}
      <div>
        <h3 className="md:text-4xl text-2xl font-bold mb-2 md:mb-4">{title}</h3>
        <p className="text-base md:text-lg whitespace-pre-line">{description}</p>
      </div>

      {/* ボタン */}
      <div className="mt-auto pt-4">
        <div className={`
          font-medium rounded-full transition-colors px-6 py-3 inline-block text-sm
          ${buttonType === 'primary' 
            ? 'bg-ld-accent-400 text-ld-grey-50 hover:bg-ld-accent-700' 
            : 'bg-white border border-ld-grey-100 hover:bg-ld-grey-100'
          }
        `}>
          {buttonText}
        </div>
      </div>
    </Link>
  );
}
