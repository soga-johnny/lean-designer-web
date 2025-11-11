import Link from 'next/link';

type ButtonSize = 'small' | 'medium';

interface PrimaryButtonProps {
  size?: ButtonSize;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({
  size = 'medium',
  href,
  target,
  disabled = false,
  children,
  className = '',
}: PrimaryButtonProps) {
  const baseStyles = 'font-medium rounded-full transition-colors px-6 py-3 inline-block';
  
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-lg',
  };
  
  const stateStyles = disabled
    ? 'bg-ld-accent-200 text-ld-grey-50 cursor-not-allowed pointer-events-none'
    : 'bg-ld-accent-400 text-ld-grey-50 hover:bg-ld-accent-700';
  
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

