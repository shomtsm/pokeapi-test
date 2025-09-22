export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          初代151匹のポケモン情報を取得しています
        </h2>
        <div className="w-64 mx-auto mt-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full w-0 progress-animation"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            一生懸命読み込み中...
          </p>
        </div>
      </div>
    </div>
  );
}
