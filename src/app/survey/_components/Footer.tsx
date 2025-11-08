'use client';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-4 mt-12">
      <div className="mx-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
          
          {/* Left side links */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://plasmism.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              運営会社
            </a>
            <a href="/terms" className="hover:text-gray-700 transition-colors">
              利用規約
            </a>
            <a href="/privacy" className="hover:text-gray-700 transition-colors">
              プライバシーポリシー
            </a>
          </div>

          {/* Right side copyright */}
          <div>
            <span>©2025 Plasmism Inc.</span>
          </div>

        </div>
      </div>
    </footer>
  );
} 