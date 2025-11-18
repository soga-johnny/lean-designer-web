import Image from 'next/image';

interface SectionTagProps {
  label: string;
}

export function SectionTag({ label }: SectionTagProps) {
  return (
    <span className="inline-flex items-center gap-2 bg-tag text-white px-4 py-2 rounded-lg text-sm font-normal">
      <Image
        src="/icons/section-tag-arrow.svg"
        alt=""
        width={15}
        height={16}
      />
      {label}
    </span>
  );
}
