# Supabase セットアップ

## 1. パッケージのインストール

```bash
npm install @supabase/supabase-js
```

## 2. 環境変数の設定

`.env.local` に以下を追加：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 取得方法

1. [Supabase Dashboard](https://app.supabase.com/) → プロジェクトを選択
2. Settings → API から取得

## 3. 使用方法

### クライアントサイド

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

### サーバーサイド（API Route）

```typescript
import { createServerSupabaseClient } from '@/lib/supabase';

const supabase = createServerSupabaseClient();
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

## ファイル構成

- `src/lib/supabase.ts` - Supabaseクライアントのセットアップ
- `.env.example` - 環境変数のサンプル
