'use client';

import { useForm } from '@/contexts/FormContext';
import { BasicInfoSection } from '@/components/form/sections/BasicInfoSection';
import { TechnicalInfoSection } from '@/components/form/sections/TechnicalInfoSection';
import { DesignInfoSection } from '@/components/form/sections/DesignInfoSection';
import { CompanyInfoSection } from '@/components/form/sections/CompanyInfoSection';
import { useEffect } from 'react';

export function FormContent() {
  const { currentSection } = useForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  return (
    <main className="pt-24 pb-24 min-h-screen bg-background dark:bg-background-dark">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-[#231F1F] rounded-2xl p-8 shadow-sm">
          {currentSection === 1 && <BasicInfoSection />}
          {currentSection === 2 && <TechnicalInfoSection />}
          {currentSection === 3 && <DesignInfoSection />}
          {currentSection === 4 && <CompanyInfoSection />}
        </div>
      </div>
    </main>
  );
} 