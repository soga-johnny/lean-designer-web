import { redirect } from 'next/navigation';

export default function Home() {
  // rootアクセス時は/surveyにリダイレクト
  redirect('/survey');
}