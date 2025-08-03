'use client';

export function NextStepsCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        今後の流れ
      </h2>

      <div className="space-y-6">
        
        {/* Step 1 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 dark:text-blue-300 font-semibold">1</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              戦略シートの作成
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              いただいたご回答をもとに、プロダクトの戦略を可視化した戦略シートを作成いたします。
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 dark:text-green-300 font-semibold">2</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              メールでのお届け
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              戦略シートが完成次第、ご登録いただいたメールアドレスにお送りいたします。
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 dark:text-purple-300 font-semibold">3</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              モニター募集のご案内
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Lean Designer Beta のモニター募集に関する詳細を、改めてご連絡いたします。
            </p>
          </div>
        </div>

      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>ご注意：</strong> 戦略シートの作成には1-2営業日ほどお時間をいただく場合があります。予めご了承ください。
        </p>
      </div>

    </div>
  );
} 