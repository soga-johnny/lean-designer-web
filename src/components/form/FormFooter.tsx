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
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={handleConfirm}
          className={`
            px-8 py-3 rounded-full text-sm transition-all
            ${isPreviewEnabled 
              ? 'bg-primary text-background hover:opacity-90' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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