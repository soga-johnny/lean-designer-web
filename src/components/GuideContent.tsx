'use client';

export function GuideContent() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">スタートガイド</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Guide steps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p className="text-gray-600">Guide step description</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p className="text-gray-600">Guide step description</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p className="text-gray-600">Guide step description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
