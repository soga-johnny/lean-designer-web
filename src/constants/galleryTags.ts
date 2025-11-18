/**
 * ギャラリーのタグ一覧
 */
export const GALLERY_TAGS = [
  'すべて',
  'デザイン',
  '開発',
  'マーケティング',
  '戦略',
  'UI/UX',
  'ブランディング',
  'プロトタイプ',
  'Webデザイン',
  'アプリ開発',
  'コンサルティング',
  'ビジネス戦略',
  'プロダクト開発',
  'リサーチ',
  'イノベーション'
] as const;

export type GalleryTag = typeof GALLERY_TAGS[number];
