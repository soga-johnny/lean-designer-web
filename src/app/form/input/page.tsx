'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormProvider } from '@/contexts/FormContext';
import { FormHeader } from '@/components/form/FormHeader';
import { FormContent } from '@/components/form/FormContent';
import { FormFooter } from '@/components/form/FormFooter';
import { isMobile } from '@/lib/utils';

export default function FormInputPage() {
  useEffect(() => {
    if (isMobile()) {
      window.location.href = '/mobile-notice';
    }
  }, []);

  return (
    <FormProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background"
      >
        <FormHeader />
        <FormContent />
        <FormFooter />
      </motion.div>
    </FormProvider>
  );
} 