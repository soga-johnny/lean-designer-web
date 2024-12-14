import { OpenAI } from 'openai';
import sgMail from '@sendgrid/mail';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// OpenAIクライアントの初期化を条件付きで行う
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 60000 })
  : null;

// SendGridクライアントの初期化を条件付きで行う
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const maxDuration = 60; // Vercelのタイムアウトを60秒に設定

export async function POST(request: Request) {
  try {
    // APIキーのチェック
    if (!openai || !process.env.SENDGRID_API_KEY) {
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
        model: "gpt-3.5-turbo",
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
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
              あなたはUI/UXデザインの専門家です。
              以下の定義された選択肢から、プロジェクトに必要なコンポーネントを選択してください。

              デザイン戦略セクション（strategy）の選択肢：
              - ユーザーコンセプト策定
              - ユーザー要求定義

              デザイン戦術セクション（tactical）の選択肢：
              - デザイン要件定義
              - ペルソナ策定
              - カスタマージャーニー策定
              - UI画面設計
              - デザインガイドライン作成
              - ワイヤーフレーム作成

              スタイリングセクション（styling）の選択肢：
              - サイトビジュアルデザイン
              - サービス・システム画面ビジュアルデザイン
              - 資料ビジュアルデザイン

              各セクションから適切なコンポーネントを選択し、その選択理由も説明してください。
              レスポンスは以下の形式のJSONで返してください：
              {
                "strategy": ["選択したコンポーネント名"],
                "tactical": ["選択したコンポーネント名"],
                "styling": ["選択したコンポーネント名"],
                "reasons": {
                  "コンポーネント名": "選択理由"
                }
              }
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
      })
    ]);

    let components;
    try {
      const componentContent = componentResponse.choices[0].message.content;
      if (!componentContent) {
        throw new Error('Component response is empty');
      }
      components = JSON.parse(componentContent);
      console.log('Generated components:', components);
    } catch (error) {
      console.error('Error parsing component response:', error);
      console.error('Raw component response:', componentResponse.choices[0].message.content);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    const generatedData = {
      serviceName: formData.basicInfo.serviceName,
      designConcept: conceptResponse.choices[0].message.content?.trim() ?? '',
      components: {
        strategy: components.strategy || [],
        tactical: components.tactical || [],
        styling: components.styling || [],
        reasons: components.reasons || {}
      },
      formData: formData,
      createdAt: new Date().toISOString(),
      password: documentPassword
    };

    console.log('Saving data to Firestore:', generatedData);

    // Firestoreにデータを保存
    await setDoc(doc(db, 'documents', documentPath), generatedData);

    // メール送信を実行
    await sgMail.send({
      from: 'lean-designer@plasmism.com',
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
    await sgMail.send({
      from: 'info@plasmism.com',
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
      ...generatedData,
      url: documentUrl
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 