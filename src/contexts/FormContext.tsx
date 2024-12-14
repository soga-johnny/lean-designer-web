'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FormData } from '@/types/form';

type GeneratedDocument = {
  url: string;
  password: string;
} | null;

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  generatedDocument: GeneratedDocument;
  setGeneratedDocument: React.Dispatch<React.SetStateAction<GeneratedDocument>>;
};

const initialFormData: FormData = {
  basicInfo: {
    serviceName: '',
    serviceGoals: [],
    targetUser: '',
    expectedEffect: '',
    budget: '',
    developmentPeriod: '',
    constraints: [],
    qualityRequirements: '',
    seoImportance: '',
    otherRequirements: [],
  },
  technicalInfo: {
    techStack: [],
    teamStructure: [],
    communicationTools: [],
    projectManagementTools: [],
    currentIssues: '',
  },
  designInfo: {
    persona: '',
    customerJourney: '',
    marketPositioning: '',
    colorPattern: '',
    designKeywords: [],
    interaction: '',
  },
  companyInfo: {
    personInCharge: '',
    position: '',
    companyName: '',
    email: '',
    referralSource: [],
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('formData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...initialFormData,
            ...parsed
          };
        } catch {
          return initialFormData;
        }
      }
    }
    return initialFormData;
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentSection,
        setCurrentSection,
        generatedDocument,
        setGeneratedDocument,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
} 