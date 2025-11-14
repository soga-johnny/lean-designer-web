import { Writer } from '@/types/microcms';

/**
 * このコラムを書いた人のブロック
 */
export function WriterBlock({ data }: { data: Writer }) {
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

