import { GalleryTag } from '@/components/GalleryTag';

interface GalleryTagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function GalleryTagFilter({ tags, selectedTags, onTagSelect }: GalleryTagFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <GalleryTag
            key={tag}
            tag={tag}
            backgroundColor={isSelected ? '#8b8985' : '#f6f6f5'}
            textColor={isSelected ? '#ffffff' : '#51514d'}
            iconSrc={isSelected ? '/icons/selected-tag-arrow.svg' : '/icons/tag-arrow.svg'}
            onClick={() => onTagSelect(tag)}
            isClickable={true}
          />
        );
      })}
    </div>
  );
}
