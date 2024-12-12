'use client';

import { Logo } from '@/components/logo';
import { useForm } from '@/contexts/FormContext';
import clsx from 'clsx';

const sections = [
  { id: 1, title: '01 基本情報' },
  { id: 2, title: '02 技術情報' },
  { id: 3, title: '03 デザイン情報' },
  { id: 4, title: '04 会社情報' },
];

export function FormHeader() {
  const { currentSection, setCurrentSection } = useForm();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav className="flex gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={clsx(
                'px-4 py-2 text-sm rounded-full transition-all',
                currentSection === section.id
                  ? 'bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark border dark:border-[#61585A]'
                  : 'hover:bg-primary/10 dark:hover:bg-[#2B2325]/50 dark:text-text-dark'
              )}
            >
              {section.title}
              {section.id === 4 && (
                <span className="ml-1 text-xs text-red-500">*</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
} 