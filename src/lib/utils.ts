import { db } from "./firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { SurveyResponse } from "@/types/form"

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Survey utility functions
export async function saveFormDataToFirestore(
  data: any, 
  collection: string
): Promise<void> {
  try {
    const docId = Date.now().toString()
    await setDoc(doc(db, collection, docId), {
      ...data,
      createdAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error saving to Firestore:', error)
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

export function prepareSurveyPayload(responses: Record<string, any>): SurveyResponse {
  return {
    role: responses.role || "other",
    phase: responses.phase || "idea",
    category: responses.category || "other",
    excitement: responses.excitement || 50,
    allowInterview: responses.allowInterview || false,
    agreeNDA: responses.agreeNDA || false,
    email: responses.email || "",
    createdAt: null, // Will be set by serverTimestamp in Firestore
    etcOtherText: responses.etcOtherText || undefined,
  }
} 