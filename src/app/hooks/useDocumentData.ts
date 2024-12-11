import { useState, useEffect } from 'react';

type DocumentState = {
  isLoading: boolean;
  error: string | null;
  data: any | null;
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
      setState({
        isLoading: false,
        error: null,
        data: planData,
        isAuthenticated: true,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'エラーが発生しました',
      }));
    }
  };

  return { ...state, verifyPassword };
} 