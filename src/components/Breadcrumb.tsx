import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mx-auto px-6 md:px-10 py-4 border-t border-ld-grey-100">
      <ol className="flex flex-wrap items-center gap-4 text-sm">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`flex items-center gap-2 ${index > 0 ? 'before:content-["〉"]' : ''}`}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="hover:opacity-70 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
