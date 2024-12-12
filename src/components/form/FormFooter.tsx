'use client';

import { useForm } from '@/contexts/FormContext';
import { useRouter } from 'next/navigation';

export function FormFooter() {
  const router = useRouter();
  const { currentSection, formData } = useForm();

  const isSection4Valid = currentSection === 4 && 
    formData.companyInfo.personInCharge.trim() !== '' &&
    formData.companyInfo.position !== '' &&
    formData.companyInfo.companyName.trim() !== '' &&
    formData.companyInfo.email.trim() !== '' &&
    formData.companyInfo.referralSource.length > 0;

  const isPreviewEnabled = currentSection !== 4 || isSection4Valid;

  const handleConfirm = () => {
    if (isPreviewEnabled) {
      router.push('/form/confirm');
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={handleConfirm}
          className={`
            px-8 py-3 rounded-full text-sm transition-all
            ${isPreviewEnabled 
              ? 'bg-primary dark:bg-[#2B2325] text-background dark:text-text-dark hover:opacity-90 border dark:border-[#61585A]' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!isPreviewEnabled}
        >
          内容を確認
        </button>
      </div>
    </footer>
  );
} 