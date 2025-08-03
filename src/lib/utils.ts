import { db } from "./firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { SurveyResponse } from "@/types/form"

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Survey utility functions
export async function saveFormDataToFirestore(
  data: Record<string, unknown> | SurveyResponse, 
  collection: string
): Promise<void> {
  try {
    console.log('Firebase config check:', {
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    const docId = Date.now().toString()
    console.log('Attempting to save document with ID:', docId);
    console.log('Data to save:', data);
    
    await setDoc(doc(db, collection, docId), {
      ...data,
      createdAt: serverTimestamp()
    })
    
    console.log('Document saved successfully');
  } catch (error) {
    console.error('Error saving to Firestore:', error)
    console.error('Firestore error details:', error);
    throw error
  }
}

export async function sendThankYouEmail(email: string): Promise<void> {
  try {
    const response = await fetch('/api/send-survey-thanks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export function prepareSurveyPayload(responses: Record<string, string | boolean | number>): SurveyResponse {
  return {
    role: (responses.role as "ceo" | "pdm" | "dev" | "individual" | "other") || "other",
    phase: (responses.phase as "idea" | "mvp" | "prelaunch" | "postlaunch") || "idea",
    category: (responses.category as "saas" | "mobile" | "iot" | "other") || "other",
    excitement: (responses.excitement as 50 | 80 | 120 | 200) || 50,
    allowInterview: Boolean(responses.allowInterview),
    agreeNDA: Boolean(responses.agreeNDA),
    email: String(responses.email || ""),
    createdAt: null, // Will be set by serverTimestamp in Firestore
    etcOtherText: responses.etcOtherText ? String(responses.etcOtherText) : undefined,
  }
} 