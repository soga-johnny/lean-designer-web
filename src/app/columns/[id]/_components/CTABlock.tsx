import { PrimaryButton } from '@/components/ui/PrimaryButton';

/**
 * CTAブロック
 */
export function CTABlock() {
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

