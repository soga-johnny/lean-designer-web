import { useState } from 'react';

type DocumentData = {
  serviceName: string;
  designConcept: string;
  components: {
    strategy: string[];
    tactical: string[];
    styling: string[];
    reasons: Record<string, string>;
  };
  formData: {
    basicInfo: {
      serviceName: string;
      serviceGoals: string[];
      targetUser: string;
      expectedEffect: string;
      budget: string;
      developmentPeriod: string;
      constraints: string[];
      qualityRequirements: string;
      seoImportance: string;
      otherRequirements: string[];
    };
    technicalInfo: {
      techStack: string[];
      teamStructure: string[];
      communicationTools: string[];
      projectManagementTools: string[];
      currentIssues: string;
    };
    designInfo: {
      designKeywords: string[];
      persona: string;
      customerJourney: string;
      marketPositioning: string;
      colorPattern: string;
      interaction: string;
    };
  };
};

type DocumentState = {
  isLoading: boolean;
  error: string | null;
  data: DocumentData | null;
  isAuthenticated: boolean;
};

export function useDocumentData(id: string) {
  const [state, setState] = useState<DocumentState>({
    isLoading: false,
    error: null,
    data: null,
    isAuthenticated: false,
  });

  const verifyPassword = async (password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/verify-password/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'パスワードが正しくありません');
      }

      const { planData } = await response.json();
      console.log('Received planData:', planData);
      
      if (planData?.components) {
        console.log('Components structure:', {
          strategy: planData.components.strategy,
          tactical: planData.components.tactical,
          styling: planData.components.styling,
          reasons: planData.components.reasons
        });
      }

      const normalizedData = {
        ...planData,
        components: planData?.components ? {
          strategy: Array.isArray(planData.components.strategy) ? planData.components.strategy : [],
          tactical: Array.isArray(planData.components.tactical) ? planData.components.tactical : [],
          styling: Array.isArray(planData.components.styling) ? planData.components.styling : [],
          reasons: planData.components.reasons || {}
        } : null
      };
      
      setState({
        isLoading: false,
        error: null,
        data: normalizedData,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Error in verifyPassword:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'エラーが発生しました',
      }));
    }
  };

  return { ...state, verifyPassword };
} 