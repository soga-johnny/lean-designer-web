# Lean Designer Web

AI を活用したUI/UXデザイン計画書生成サービス。開発プロジェクトの要件を入力すると、AI がデザイン計画書を自動生成し、UXアシスタントとの面談を通じて最適化されたソリューションを提供するプラットフォームです。

## プロジェクト概要

**Lean Designer** は、開発プロジェクトでのピンポイントなデザイン課題を、必要な分だけスペシャリストデザイナーに発注できるUI/UXデザインソリューションです。

### 主要機能
- 多段階フォームによる要件収集
- OpenAI APIを活用したデザイン計画書の自動生成
- パスワード保護されたドキュメント閲覧機能
- 自動メール通知システム
- 管理画面での進捗管理

## 技術スタック

### フレームワーク・言語
- **Next.js 14.2.14** (App Router)
- **TypeScript 5**
- **React 18**

### スタイリング・UI
- **Tailwind CSS 3.4.1** (カスタムデザインシステム)
- **Framer Motion 11.13.5** (アニメーション)
- **Lucide React 0.468.0** (アイコン)
- **Heroicons 2.2.0** (アイコン)
- **Radix UI Icons 1.3.2** (UI プリミティブ)
- **Shadcn/ui 0.0.4** (UIコンポーネント)

### バックエンド・API
- **Firebase 11.0.2** (Firestore Database)
- **OpenAI 4.76.1** (AI計画書生成)
- **SendGrid 8.1.4** (メール送信)
- **Resend 4.0.1** (メール配信)

### 開発ツール
- **ESLint** (コード品質)
- **PostCSS** (CSS処理)

## アーキテクチャ

### 状態管理
- **React Context API**を使用
  - `FormContext`: フォームデータと進行状況
  - `ThemeContext`: ダークモード切り替え
- **localStorage**による永続化

### データ構造
フォームデータは4つのセクションで構成：

1. **基本情報** (`basicInfo`)
   - サービス名、目的、ターゲットユーザー
   - 予算、開発期間、制約条件

2. **技術要件** (`technicalInfo`)
   - 技術スタック、チーム構成
   - コミュニケーション・プロジェクト管理ツール

3. **デザイン要件** (`designInfo`)
   - ペルソナ、カスタマージャーニー
   - デザインキーワード、カラーパターン

4. **会社情報** (`companyInfo`)
   - 担当者情報、連絡先
   - 参照元情報

### AI処理フロー
1. フォーム入力完了
2. OpenAI APIでデザインコンセプト生成
3. コンポーネント選択（戦略・戦術・スタイリング）
4. Firebase Firestoreにドキュメント保存
5. パスワード保護URL生成
6. メール通知送信（ユーザー・運営）

## セットアップ

### 必要な環境変数

```bash
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# API設定
OPENAI_API_KEY=
SENDGRID_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

### インストール・起動

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Lint実行
npm run lint
```

## ディレクトリ構造

```
src/
├── app/                      # Next.js App Router
│   ├── admin/               # 管理画面
│   ├── api/                 # API Routes
│   │   ├── generate-document/  # AI計画書生成
│   │   └── verify-password/    # パスワード認証
│   ├── components/          # アプリ固有コンポーネント
│   ├── form/               # フォーム関連ページ
│   │   ├── guide/          # 入力ガイド
│   │   ├── input/          # 入力画面
│   │   ├── confirm/        # 確認画面
│   │   └── complete/       # 完了画面
│   ├── plan/[id]/          # 計画書表示（動的ルート）
│   ├── hooks/              # カスタムフック
│   └── lib/                # ユーティリティ
├── components/              # 共通コンポーネント
│   ├── form/               # フォーム関連
│   │   └── sections/       # フォームセクション
│   └── ui/                 # UI基底コンポーネント
├── contexts/               # React Context
├── lib/                    # 共通ライブラリ
└── types/                  # TypeScript型定義
```

## 主要ページ

- `/` - ランディングページ
- `/form/guide` - 入力ガイド
- `/form/input` - フォーム入力
- `/form/confirm` - 入力確認
- `/form/complete` - 完了画面
- `/plan/[id]` - 計画書表示（パスワード保護）
- `/admin` - 管理画面
- `/privacy` - プライバシーポリシー
- `/terms` - 利用規約

## API エンドポイント

### `POST /api/generate-document`
フォームデータからAI計画書を生成

**処理内容:**
- OpenAI APIでデザインコンセプト生成
- コンポーネント選択ロジック実行
- Firebase Firestoreに保存
- メール通知送信
- パスワード保護URL発行

### `POST /api/verify-password/[id]`
計画書閲覧のためのパスワード認証

## デザインシステム

### カラーパレット
```css
/* ライトモード */
background: #F8F8F8
text: #2B2325
primary: #2B2325

/* ダークモード */
background: #1A1A1A
text: #F8F8F8
primary: #F8F8F8
```

### フォント
- **Noto Sans JP**: メインフォント（日本語対応）
- **EB Garamond**: 装飾フォント

## 開発ガイド

### コンポーネント設計
- 関心の分離を重視したアーキテクチャ
- Context APIによる状態管理
- TypeScriptによる型安全性

### スタイリング
- Tailwind CSSのユーティリティクラス
- カスタムデザインシステム
- ダークモード対応

### パフォーマンス
- Next.js Image最適化
- フォント最適化（next/font）
- 並列API処理

## セキュリティ

- Firebase Security Rules適用
- nanoidによるセキュアなパスワード生成
- 環境変数による機密情報管理
- パスワード保護ドキュメント

## デプロイ

### Vercel推奨設定
```javascript
// next.config.mjs
export default {
  // 必要に応じて設定を追加
};
```

### 環境設定
- Vercelでの環境変数設定必須
- Firebase プロジェクト設定
- SendGrid API設定

## トラブルシューティング

### よくある問題

1. **Firebase接続エラー**
   - 環境変数の設定確認
   - Firebase console での設定確認

2. **OpenAI API エラー**
   - API キーの有効性確認
   - レート制限の確認

3. **メール送信エラー**
   - SendGrid設定確認
   - 送信元メールアドレス認証

## 貢献・開発参加

### 開発フロー
1. 機能ブランチ作成
2. 実装・テスト
3. プルリクエスト作成
4. コードレビュー
5. マージ・デプロイ

### コミット規約
- feat: 新機能
- fix: バグ修正  
- docs: ドキュメント更新
- style: スタイル変更
- refactor: リファクタリング

## ライセンス

このプロジェクトは非公開プロジェクトです。

## 連絡先

- 開発チーム: lean-designer@plasmism.com
- 運営: info@plasmism.com
