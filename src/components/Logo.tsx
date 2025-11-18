import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/lp" className="hover:opacity-80 transition-opacity">
      <h1 className="font-garamond text-primary dark:text-primary-dark text-2xl">
        Lean Designer
      </h1>
    </Link>
  );
}; 