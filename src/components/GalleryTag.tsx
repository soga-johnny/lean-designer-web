import Image from 'next/image';

interface GalleryTagProps {
  tag: string;
  backgroundColor?: string;
  textColor?: string;
  iconSrc?: string;
  onClick?: () => void;
  isClickable?: boolean;
  size?: 'medium' | 'small';
}

export function GalleryTag({
  tag,
  backgroundColor = '#e7e7e6',
  textColor = '#51514d',
  iconSrc = '/icons/tag-arrow.svg',
  onClick,
  isClickable = false,
  size = 'medium'
}: GalleryTagProps) {
  const Component = isClickable ? 'button' : 'span';
  const sizeClasses = size === 'small' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';
  const iconSize = size === 'small' ? { width: 12, height: 9 } : { width: 14, height: 11 };

  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${sizeClasses} rounded-full font-semibold select-none ${isClickable ? 'cursor-pointer transition-colors' : ''}`}
      style={{ backgroundColor, color: textColor }}
    >
      <Image
        src={iconSrc}
        alt=""
        width={iconSize.width}
        height={iconSize.height}
      />
      {tag}
    </Component>
  );
}
