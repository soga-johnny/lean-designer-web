// microCMSのレスポンス型定義

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Writer {
  thumbnail: {
    url: string;
  };
  name: string;
  biography: string;
}

export interface Article {
  id: string;
  title: string;
  content?: string;
  eyecatch?: {
    url: string;
    width?: number;
    height?: number;
  };
  tags?: Tag[];
  writer?: Writer;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

