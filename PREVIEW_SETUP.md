# microCMS プレビュー機能の設定方法

このドキュメントでは、microCMS のドラフト（プレビュー）機能の設定方法を説明します。

## 実装内容

以下の機能が実装されています：

- Draft Mode を有効化する API Route (`/api/draft`)
- Draft Mode を無効化する API Route (`/api/disable-draft`)
- ドラフト記事の取得機能
- プレビューモード表示バナー

## microCMS 管理画面での設定

### 1. プレビュー設定を開く

1. microCMS の管理画面にログイン
2. 対象のサービスを選択
3. **API設定** → **記事（articles）** を選択
4. **プレビュー** タブをクリック

### 2. プレビューURLを設定

以下のURLを設定してください：

```
https://your-domain.com/api/draft?contentId={CONTENT_ID}&draftKey={DRAFT_KEY}
```

**パラメータの説明：**
- `{CONTENT_ID}`: 記事IDが自動的に埋め込まれます
- `{DRAFT_KEY}`: プレビュー用の認証キーが自動的に埋め込まれます

**開発環境の場合：**
```
http://localhost:3000/api/draft?contentId={CONTENT_ID}&draftKey={DRAFT_KEY}
```

### 3. 保存

設定を保存します。

## 使用方法

### プレビューの表示

1. microCMS 管理画面で記事を編集
2. 下書き状態（公開前）の記事を編集中に「プレビュー」ボタンをクリック
3. 新しいタブで下書き状態の記事が表示されます
4. ページ上部に黄色のバナーが表示され、プレビューモードであることがわかります

### プレビューの終了

プレビューモードを終了するには、以下の方法があります：

1. **バナーから終了**: ページ上部のバナーにある「プレビュー終了」ボタンをクリック
2. **直接アクセス**: `/api/disable-draft` にアクセス

## 技術仕様

### Draft Mode API Route

**エンドポイント**: `/api/draft`

**必須パラメータ**:
- `contentId`: 記事ID
- `draftKey`: microCMS が生成するプレビュー用キー

**処理フロー**:
1. パラメータをバリデーション
2. draftKey を使用して記事を取得（認証）
3. Next.js の Draft Mode を有効化
4. 記事詳細ページにリダイレクト

### Draft Mode 無効化 API Route

**エンドポイント**: `/api/disable-draft`

**オプションパラメータ**:
- `redirectTo`: リダイレクト先（デフォルト: `/columns`）

## トラブルシューティング

### プレビューボタンを押しても何も表示されない

- プレビューURLが正しく設定されているか確認
- `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` が正しく設定されているか確認
- ブラウザのコンソールでエラーが出ていないか確認

### 404 エラーが表示される

- 記事IDが存在するか確認
- draftKey が有効期限内か確認

### 下書きコンテンツが表示されない

- Draft Mode が正しく有効化されているか確認
- `getArticleById` 関数に draftKey が正しく渡されているか確認

## セキュリティ

- draftKey は microCMS が生成する一時的な認証キーです
- draftKey なしではドラフトコンテンツにアクセスできません
- Draft Mode は Cookie ベースで管理されます
- プレビュー終了後は通常の公開コンテンツのみが表示されます

## 参考リンク

- [Next.js Draft Mode ドキュメント](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode)
- [microCMS プレビュー機能](https://document.microcms.io/manual/preview)

