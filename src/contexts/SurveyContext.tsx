'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SurveyResponses = Record<string, any>;

type SurveyContextType = {
  responses: SurveyResponses;
  setResponses: React.Dispatch<React.SetStateAction<SurveyResponses>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [responses, setResponses] = useState<SurveyResponses>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('surveyResponses');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('surveyResponses', JSON.stringify(responses));
    }
  }, [responses]);

  return (
    <SurveyContext.Provider
      value={{
        responses,
        setResponses,
        currentQuestion,
        setCurrentQuestion,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
} 