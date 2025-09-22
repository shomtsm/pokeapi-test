export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-blue-300 rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          ポケモンデータを読み込み中...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          初代151匹のポケモン情報を取得しています
        </p>
        
        <div className="w-64 mx-auto mt-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
