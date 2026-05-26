export default function ApiKeyInput({ apiKey, onChange }) {
  return (
    <div className="mt-3">
      <label className="text-xs font-semibold text-gray-600 block mb-1">
        Gemini API Key
      </label>
      <input
        type="password"
        value={apiKey}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste your Gemini API key..."
        className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 
                   focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <p className="text-xs text-gray-400 mt-0.5">
        Get one free at aistudio.google.com
      </p>
    </div>
  )
}