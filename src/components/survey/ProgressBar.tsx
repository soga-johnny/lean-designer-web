'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          進捗
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current}/{total}
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gray-900 dark:bg-white transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="text-center mt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
} 