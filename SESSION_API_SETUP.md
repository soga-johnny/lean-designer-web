# セッションAPI セットアップガイド

## 1. Supabaseでテーブルを作成

Supabase Dashboard → SQL Editorで以下のSQLを実行してください。

```sql
-- sessionsテーブルの作成
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- 有効期限切れセッションの自動削除（オプション）
CREATE OR REPLACE FUNCTION delete_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) の設定（必要に応じて調整）
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- サービスロールからのアクセスを許可
CREATE POLICY "Service role can manage all sessions" ON sessions
  FOR ALL USING (true);
```

## 2. 実装されたAPI

### セッション一覧取得
```bash
GET /api/v1/sessions?limit=10&offset=0
```

パラメータ:
- `limit` (optional): 取得件数（1〜100、デフォルト: 10）
- `offset` (optional): オフセット（0以上、デフォルト: 0）

### セッション個別取得
```bash
GET /api/v1/sessions/{sessionId}
```

## 3. レスポンス例

### セッション一覧取得 - 成功時
```json
{
  "success": true,
  "sessions": [
    {
      "id": "uuid",
      "sessionId": "session_12345",
      "data": {...},
      "expiresAt": "2024-01-01T12:00:00Z",
      "createdAt": "2024-01-01T11:00:00Z",
      "updatedAt": "2024-01-01T11:00:00Z"
    }
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 25
  },
  "timestamp": "2024-01-01T11:00:00Z"
}
```

### セッション個別取得 - 成功時
```json
{
  "success": true,
  "session": {
    "id": "uuid",
    "sessionId": "session_12345",
    "data": {...},
    "expiresAt": "2024-01-01T12:00:00Z",
    "createdAt": "2024-01-01T11:00:00Z",
    "updatedAt": "2024-01-01T11:00:00Z"
  },
  "timestamp": "2024-01-01T11:00:00Z"
}
```

### エラー時
```json
{
  "success": false,
  "error": "セッションが見つかりません",
  "timestamp": "2024-01-01T11:00:00Z"
}
```

## 4. ファイル構成

```
src/
├── lib/
│   ├── supabase.ts          # Supabaseクライアント
│   └── logger.ts            # ロガーユーティリティ
├── services/
│   └── sessionService.ts    # セッション管理サービス（読み取り専用）
└── app/api/v1/sessions/
    ├── route.ts             # GET /api/v1/sessions （一覧取得）
    └── [sessionId]/
        └── route.ts         # GET /api/v1/sessions/[sessionId] （個別取得）
```

## 5. 使用例（TypeScript）

```typescript
// セッション一覧取得
const response = await fetch('/api/v1/sessions?limit=10&offset=0');
const { sessions, pagination } = await response.json();

console.log(`全${pagination.total}件中 ${sessions.length}件を取得`);
sessions.forEach(session => {
  console.log(session.sessionId, session.data);
});

// セッション個別取得
const response = await fetch('/api/v1/sessions/session_12345');
const { session } = await response.json();

console.log(session.sessionId, session.data);
```

## 6. ログ機能

- トレースID付きでリクエストを追跡
- 開発環境: 読みやすい形式でコンソール出力
- 本番環境: JSON形式で構造化ログ出力

```typescript
// ログ例
[2024-01-01T11:00:00Z] [INFO] [trace_xxx] セッション取得API開始 { sessionId: 'session_12345' }
```

## 7. エラーハンドリング

| エラーメッセージ | HTTPステータス | 説明 |
|----------------|--------------|------|
| sessionIdが必要です | 400 | パラメータ不足 |
| セッションが見つかりません | 404 | セッションが存在しない |
| セッションの有効期限が切れています | 404 | 有効期限切れ |
| その他のエラー | 500 | サーバーエラー |
