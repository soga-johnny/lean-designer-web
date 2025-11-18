/**
 * ギャラリージャンルの定義
 * key: DB用の英語キー
 * value: 表示用の日本語ラベル
 */
export const GALLERY_GENRES = {
  all: 'すべて',
  design: 'デザイン',
  development: '開発',
  marketing: 'マーケティング',
  strategy: '戦略',
  ui_ux: 'UI/UX',
  branding: 'ブランディング',
  prototype: 'プロトタイプ',
  web_design: 'Webデザイン',
  app_development: 'アプリ開発',
  consulting: 'コンサルティング',
  business_strategy: 'ビジネス戦略',
  product_development: 'プロダクト開発',
  research: 'リサーチ',
  innovation: 'イノベーション',
} as const;

export type GalleryGenreKey = keyof typeof GALLERY_GENRES;
export type GalleryGenreLabel = typeof GALLERY_GENRES[GalleryGenreKey];

/**
 * 全ジャンルをkey-valueペアの配列で取得
 */
export const getAllGalleryGenres = (): Array<{ key: GalleryGenreKey; label: GalleryGenreLabel }> => {
  return Object.entries(GALLERY_GENRES).map(([key, label]) => ({
    key: key as GalleryGenreKey,
    label,
  }));
};

/**
 * キーからラベルを取得
 */
export const getGalleryGenreLabel = (key: GalleryGenreKey): GalleryGenreLabel => {
  return GALLERY_GENRES[key];
};

/**
 * ラベルからキーを取得
 */
export const getGalleryGenreKey = (label: string): GalleryGenreKey | undefined => {
  const entry = Object.entries(GALLERY_GENRES).find(([, val]) => val === label);
  return entry ? (entry[0] as GalleryGenreKey) : undefined;
};
