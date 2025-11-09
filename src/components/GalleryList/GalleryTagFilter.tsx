interface GalleryTagFilterProps {
  tags: string[];
}

export function GalleryTagFilter({ tags }: GalleryTagFilterProps) {
  return (
    <div className="flex gap-3 mb-8 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
