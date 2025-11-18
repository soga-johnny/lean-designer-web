import { GalleryTag } from '@/components/GalleryTag';
import type { GalleryGenreKey, GalleryGenreLabel } from '@/constants/galleryGenres';

interface GalleryTagFilterProps {
  genres: Array<{ key: GalleryGenreKey; label: GalleryGenreLabel }>;
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

export function GalleryTagFilter({ genres, selectedGenres, onGenresChange }: GalleryTagFilterProps) {
  const handleGenreClick = (genreKey: string) => {
    let newSelectedGenres: string[];

    if (genreKey === 'all') {
      // 'all'をクリック → 空配列（全て選択）
      newSelectedGenres = [];
    } else {
      // 他のジャンルをクリック
      if (selectedGenres.includes(genreKey)) {
        // 既に選択済み → 除外
        newSelectedGenres = selectedGenres.filter(g => g !== genreKey);
      } else {
        // 未選択 → 追加
        newSelectedGenres = [...selectedGenres, genreKey];
      }
    }

    onGenresChange(newSelectedGenres);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {genres.map((genre) => {
        // 'all'の場合は空配列で選択状態、それ以外は配列に含まれるかチェック
        const isSelected = genre.key === 'all'
          ? selectedGenres.length === 0
          : selectedGenres.includes(genre.key);

        return (
          <GalleryTag
            key={genre.key}
            tag={genre.label}
            backgroundColor={isSelected ? '#8b8985' : '#f6f6f5'}
            textColor={isSelected ? '#ffffff' : '#51514d'}
            iconSrc={isSelected ? '/icons/selected-tag-arrow.svg' : '/icons/tag-arrow.svg'}
            onClick={() => handleGenreClick(genre.key)}
            isClickable={true}
          />
        );
      })}
    </div>
  );
}
