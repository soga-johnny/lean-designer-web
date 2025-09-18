'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchType, getBranchType, getQuestionsForBranch, getTotalQuestionsForBranch } from '@/data/surveyQuestions';
import { SurveyQuestion } from '@/types/form';

type SurveyResponses = Record<string, string | boolean | number | string[]>;

type SurveyContextType = {
  responses: SurveyResponses;
  setResponses: React.Dispatch<React.SetStateAction<SurveyResponses>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  branchType: BranchType;
  currentQuestions: SurveyQuestion[];
  totalQuestions: number;
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

  // 条件分岐の判定
  const branchType = getBranchType(
    responses.q1_current_situation as string || '',
    responses.q2_position as string || ''
  );

  // 現在の分岐に応じた質問リスト
  const currentQuestions = getQuestionsForBranch(branchType);
  const totalQuestions = getTotalQuestionsForBranch(branchType);

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
        branchType,
        currentQuestions,
        totalQuestions,
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