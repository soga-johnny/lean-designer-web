'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { FormProvider } from '@/contexts/FormContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FormProvider>
        {children}
      </FormProvider>
    </ThemeProvider>
  );
}
