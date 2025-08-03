import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

// SendGridクライアントの初期化を条件付きで行う
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    // APIキーのチェック
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: 'SendGrid API key is not configured' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // ユーザー向けサンキューメール
    await sgMail.send({
      from: 'lean-designer@plasmism.com',
      to: email,
      subject: 'アンケートご協力ありがとうございます',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2B2325; margin-bottom: 20px;">アンケートご協力ありがとうございます</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            この度は、Lean Designer Beta のモニター募集アンケートにご協力いただき、誠にありがとうございました。
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            いただいたご回答は、より良いサービス開発のために活用させていただきます。
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            モニター募集の詳細については、改めてご連絡いたします。
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; color: #999; font-size: 14px;">
            <p style="margin: 0;">Lean Designer Team</p>
            <p style="margin: 5px 0 0 0;">lean-designer@plasmism.com</p>
          </div>
        </div>
      `,
    });

    // 運営側への通知メール
    await sgMail.send({
      from: 'info@plasmism.com',
      to: 'lean-designer@plasmism.com',
      subject: '新規アンケート回答が投稿されました',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2B2325; margin-bottom: 20px;">新規アンケート回答</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            新しいアンケート回答が投稿されました。
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            <strong>回答者メールアドレス:</strong> ${email}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
            Firestore の survey_responses コレクションをご確認ください。
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending survey thank you email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 