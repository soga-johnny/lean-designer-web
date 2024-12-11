import { OpenAI } from 'openai';
import { Resend } from 'resend';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// 生成するデータの型定義
type GeneratedDocument = {
  serviceName: string;
  designConcept: string;
  projectOutline: {
    goals: string[];
    target: string;
    effects: string[];
    competitors: string[];
    timeline: string;
    features: string[];
  };
  selectedComponents: {
    strategy: string[];
    tactical: string[];
    styling: string[];
  };
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // ドキュメントのパスとパスワードを生成
    const documentPath = nanoid();
    const documentPassword = nanoid(8);
    const documentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/plan/${documentPath}`;

    // デザインコンセプトの生成
    const conceptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
            あなたはUI/UXデザインの専門家です。
            提供された情報を基に、プロジェクトのデザインコンセプトを生成してください。
            コンセプトは、以下の要件を満たす必要があります：
            - 簡潔で印象的な1文であること
            - プロジェクトの本質を捉えていること
            - ユーザー価値を明確に示していること
          `
        },
        {
          role: "user",
          content: `
            サービス名: ${formData.basicInfo.serviceName}
            目的: ${formData.basicInfo.serviceGoals.join(', ')}
            ターゲット: ${formData.basicInfo.targetUser}
            期待される効果: ${formData.basicInfo.expectedEffect}
            技術スタック: ${formData.technicalInfo.techStack.join(', ')}
            デザインキーワード: ${formData.designInfo.designKeywords.join(', ')}
          `
        }
      ]
    });

    const designConcept = conceptResponse.choices[0].message.content || '';

    // コンポーネントの選択と理由の生成
    const componentResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
            提供された情報を基に、必要なデザインコンポーネントを選択してください。
            以下の条件を満たす必要があります：
            - 各セクション（戦略、��術、スタイリング）から最低1つ選択
            - 選択したコンポーネントがプロジェクトに必要な理由を説明
            - 最大で合計6つまで選択可能
            
            回答は以下のJSON形式で返してください：
            {
              "strategy": ["コンポーネント名"],
              "tactical": ["コンポーネント名"],
              "styling": ["コンポーネント名"],
              "reasons": {
                "コンポーネント名": "選択理由"
              }
            }
          `
        },
        {
          role: "user",
          content: JSON.stringify({
            basicInfo: formData.basicInfo,
            technicalInfo: formData.technicalInfo,
            designInfo: formData.designInfo
          })
        }
      ]
    });

    const generatedData = {
      designConcept: conceptResponse.choices[0].message.content ?? '',
      components: JSON.parse(componentResponse.choices[0].message.content ?? '{}'),
      // 他の生成データ
    };

    // Firestoreにデータを保存
    await setDoc(doc(db, 'documents', documentPath), {
      ...generatedData,
      password: documentPassword,
      createdAt: new Date().toISOString(),
      formData: formData
    });

    // メール送���を復活
    await resend.emails.send({
      from: 'Lean Designer <info@plasmism.com>',
      to: formData.companyInfo.email,
      subject: 'デザイン計画書が完成しました',
      html: `
        <p>デザイン計画書の作成が完了しました。</p>
        <p>以下のURLとパスワードからご確認ください。</p>
        <p>URL: ${documentUrl}</p>
        <p>パスワード: ${documentPassword}</p>
      `,
    });

    // 運営側へのメール送信
    await resend.emails.send({
      from: 'Lean Designer <info@plasmism.com>',
      to: 'lean-designer@plasmism.com',
      subject: '新規デザイン計画書が作成されました',
      html: `
        <p>新規デザイン計画書が作成されました。</p>
        <p>URL: ${documentUrl}</p>
        <p>パスワード: ${documentPassword}</p>
        <p>会社名: ${formData.companyInfo.companyName}</p>
        <p>担当者: ${formData.companyInfo.personInCharge}</p>
      `,
    });

    return NextResponse.json({
      url: documentUrl,
      password: documentPassword,
      ...generatedData
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 