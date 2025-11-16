import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Draft Mode を無効化する API Route
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirectTo') || '/columns';

  // Draft Mode を無効化
  draftMode().disable();
  
  // 指定されたページにリダイレクト
  redirect(redirectTo);
}

