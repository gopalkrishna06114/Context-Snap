import { useState } from 'react'

export default function ResumePrompt({ prompt }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!prompt) return null

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-600">Resume Prompt</span>
        <button
          onClick={handleCopy}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 
                     px-2 py-1 rounded transition-colors"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>
      <textarea
        readOnly
        value={prompt}
        rows={6}
        className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-200 
                   rounded-lg p-2 resize-none focus:outline-none"
      />
    </div>
  )
}