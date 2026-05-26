export default function CaptureButton({ onCapture, loading }) {
  return (
    <button
      onClick={onCapture}
      disabled={loading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 
                 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
    >
      {loading ? 'Capturing...' : '📸 Capture Context'}
    </button>
  )
}