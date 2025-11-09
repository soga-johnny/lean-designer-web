'use client';

export function ColumnsList() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">コラム</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column items will go here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Column Article 1</h3>
          <p className="text-gray-600">Sample description</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Column Article 2</h3>
          <p className="text-gray-600">Sample description</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Column Article 3</h3>
          <p className="text-gray-600">Sample description</p>
        </div>
      </div>
    </div>
  );
}
