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
    <div className="relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:h-full before:border-t before:border-ld-grey-100 before:-z-10">
      <nav className="mx-auto py-4">
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
    </div>
    
  );
}
