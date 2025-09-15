# Surveyページの状態管理仕様

## 概要
surveyページでは、アンケートの回答データと進行状況を管理するために、React Context Pattern + LocalStorageを使用した状態管理システムが実装されています。

## 状態管理の構成要素

### 1. SurveyContext (`src/contexts/SurveyContext.tsx`)

**役割**: アンケート全体の状態管理を担当

**管理する状態**:
- `responses`: アンケート回答データ（`Record<string, string | boolean | number | string[]>`型）
- `currentQuestion`: 現在の質問番号（number型）
- `isSubmitting`: 送信中フラグ（boolean型）

**データ永続化**:
- 初期化時にlocalStorageから`surveyResponses`キーで回答データを復元
- 回答データが変更される度にlocalStorageに自動保存
- JSON形式でシリアライズして保存

### 2. アンケート質問データ (`src/data/surveyQuestions.ts`)

**構造**: 
- 8つの質問で構成（質問1はTOPページ、質問2-8がフォーム）
- 各質問は`SurveyQuestion`型で定義

**質問タイプ**:
- 単一選択（ラジオボタン）
- 複数選択（チェックボックス）
- 自由記載（テキスト、テキストエリア、メール）
- 統合フォーム（最終ページ：名前、メール、アンケート入手経路、モニター興味）

### 3. 状態管理フロー

**ページ遷移**:
1. `/survey` → TOPページ（質問1相当）
2. `/survey/form?q=2` → 質問2から開始
3. `/survey/form?q=3-8` → 各質問ページ
4. `/survey/thanks` → 完了ページ

**回答データ管理**:
- 各質問の回答は`responses[questionId]`に保存
- 「その他」選択時は`responses[questionId + '_other']`に追加テキストを保存
- 複数選択の場合は配列形式で保存

**バリデーション**:
- 各質問で回答必須チェック
- メールアドレス形式の簡易検証（@と.の存在確認）
- 統合フォームでは全フィールドの入力完了チェック

## データ送信・永続化

### 開発環境 vs 本番環境
- **開発環境**: LocalStorageに保存（Firestoreエラー回避）
- **本番環境**: Firestoreに保存 + お礼メール送信

### 送信処理
1. 回答完了時に`handleSubmit`実行
2. 環境に応じてFirestore or LocalStorageに保存
3. お礼メール送信（本番のみ）
4. LocalStorageの`surveyResponses`をクリア
5. `/survey/thanks`にリダイレクト

## 技術的特徴

### React Context Pattern
- プロバイダーパターンでアプリ全体に状態を提供
- `useSurvey`カスタムフックで安全にコンテキストにアクセス

### ローカルストレージ活用
- ページリロード時の回答データ保持
- 自動保存による UX 向上
- SSR対応（`typeof window !== 'undefined'`チェック）

### URLベースナビゲーション
- クエリパラメータ`q`で質問番号を管理
- 不正な質問番号は自動的に質問2にリダイレクト
- ブラウザの戻る/進むボタンに対応

### アニメーション
- Framer Motionを使用した滑らかな画面遷移
- 進捗バーのアニメーション
- ボタンのホバー/タップエフェクト

## セキュリティ・エラーハンドリング

### データ検証
- LocalStorage読み込み時のJSON parse エラーハンドリング
- 質問番号の範囲チェック（2-8）
- 必須項目の入力チェック

### エラー対応
- Firestore送信失敗時のエラーメッセージ表示
- 開発環境でのFirestoreエラー回避
- 送信中の重複実行防止

この状態管理システムにより、ユーザーは安心してアンケートに回答でき、開発者は柔軟で保守性の高いコードを維持できています。


