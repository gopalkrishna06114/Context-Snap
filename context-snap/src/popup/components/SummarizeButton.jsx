export default function SummarizeButton({ onSummarize, loading, disabled }) {
  return (
    <button
      onClick={onSummarize}
      disabled={loading || disabled}
      className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 
                 disabled:bg-emerald-300 text-white font-semibold 
                 py-2 px-4 rounded-lg transition-colors"
    >
      {loading ? 'Summarizing...' : '✨ Summarize with AI'}
    </button>
  )
}