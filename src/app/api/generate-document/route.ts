import { OpenAI } from 'openai';
import { Resend } from 'resend';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// OpenAIクライアントの初期化を条件付きで行う
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 60000 })
  : null;

// Resendクライアントの初期化を条件付きで行う
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const maxDuration = 60; // Vercelのタイムアウトを60秒に設定

export async function POST(request: Request) {
  try {
    // APIキーのチェック
    if (!openai || !resend) {
      return NextResponse.json(
        { error: 'API configuration is missing' },
        { status: 500 }
      );
    }

    const formData = await request.json();
    
    // BASE_URLのチェック
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      return NextResponse.json(
        { error: 'Base URL is not configured' },
        { status: 500 }
      );
    }

    // ドキュメントのパスとパスワードを生成
    const documentPath = nanoid();
    const documentPassword = nanoid(8);
    const documentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/plan/${documentPath}`;

    // OpenAIの呼び出しを並列化
    const [conceptResponse, componentResponse] = await Promise.all([
      openai.chat.completions.create({
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
      }),
      openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              提供された情報を基に、必要なデザインコンポーネントを選択してください。
              以下の条件を満たす必要があります：
              - 各セクション（戦略、戦術、スタイリング）から最低1つ選択
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
      })
    ]);

    let components;
    try {
      const componentContent = componentResponse.choices[0].message.content;
      if (!componentContent) {
        throw new Error('Component response is empty');
      }
      components = JSON.parse(componentContent);
    } catch (error) {
      console.error('Error parsing component response:', error);
      console.error('Raw component response:', componentResponse.choices[0].message.content);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    const generatedData = {
      designConcept: conceptResponse.choices[0].message.content ?? '',
      components,
      // 他の生成データ
    };

    // Firestoreにデータを保存
    await setDoc(doc(db, 'documents', documentPath), {
      ...generatedData,
      password: documentPassword,
      createdAt: new Date().toISOString(),
      formData: formData
    });

    // メール送信を復活
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