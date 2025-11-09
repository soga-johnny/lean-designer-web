interface GalleryCardProps {
  index: number;
  title?: string;
  description?: string;
}

export function GalleryCard({ index, title, description }: GalleryCardProps) {
  const defaultTitle = `Gallery Item ${index + 1}`;
  const defaultDescription = 'Sample description';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
      <h3 className="text-xl font-semibold mb-2">{title || defaultTitle}</h3>
      <p className="text-gray-600">{description || defaultDescription}</p>
    </div>
  );
}
