'use client';

import { useForm } from '@/contexts/FormContext';
import Link from 'next/link';

export function FormFooter() {
  const { currentSection, formData } = useForm();

  const isSection4Valid = currentSection === 4 && 
    formData.companyInfo.personInCharge.trim() !== '' &&
    formData.companyInfo.position !== '' &&
    formData.companyInfo.companyName.trim() !== '' &&
    formData.companyInfo.email.trim() !== '' &&
    formData.companyInfo.referralSource.length > 0;

  const isPreviewEnabled = currentSection !== 4 || isSection4Valid;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <Link
          href={isPreviewEnabled ? "/form/confirm" : "#"}
          className={`
            px-8 py-3 rounded-full text-sm transition-all
            ${isPreviewEnabled 
              ? 'bg-primary text-background hover:opacity-90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          onClick={(e) => !isPreviewEnabled && e.preventDefault()}
        >
          内容を確認
        </Link>
      </div>
    </footer>
  );
} 