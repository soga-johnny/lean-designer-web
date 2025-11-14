import Link from 'next/link';

type ButtonSize = 'small' | 'medium';

interface SecondaryButtonProps {
  size?: ButtonSize;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SecondaryButton({
  size = 'medium',
  href,
  target,
  disabled = false,
  children,
  className = '',
}: SecondaryButtonProps) {
  const baseStyles = 'font-medium rounded-full transition-colors px-6 py-3 inline-block border border-ld-grey-100 text-center';
  
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-lg',
  };
  
  const stateStyles = disabled
    ? 'bg-ld-grey-50 cursor-not-allowed pointer-events-none'
    : 'bg-white hover:bg-ld-grey-100';
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${stateStyles} ${className}`.trim();
  
  return (
    <Link
      href={href}
      target={target}
      className={combinedClassName}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
}

