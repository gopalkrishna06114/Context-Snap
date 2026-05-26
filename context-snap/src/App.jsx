import { useState, useEffect } from 'react'
import Header from './popup/components/Header'
import CaptureButton from './popup/components/CaptureButton'
import ResumePrompt from './popup/components/ResumePrompt'
import SessionList from './popup/components/SessionList'
import SummarizeButton from './popup/components/SummarizeButton'
import ApiKeyInput from './popup/components/ApiKeyInput'

function generateResumePrompt(messages, source) {
  const history = messages
    .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
    .join('\n\n')

  return `[CONTEXT RESUME — Captured from ${source}]

This is a continuation of a previous conversation. Please read the full history below and continue helping me from where we left off.

--- Chat History ---
${history}
--- End of History ---

Please acknowledge you have read the above context and continue the conversation.`
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resumePrompt, setResumePrompt] = useState('')
  const [sessions, setSessions] = useState([])
  const [apiKey, setApiKey] = useState('')
  const [summarizing, setSummarizing] = useState(false)

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['sessions', 'geminiApiKey'], (result) => {
        setSessions(result.sessions || [])
        setApiKey(result.geminiApiKey || '')
      })
    }
  }, [])

  const handleCapture = async () => {
    setLoading(true)
    setError('')
    setResumePrompt('')

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

      chrome.tabs.sendMessage(tab.id, { action: 'CAPTURE_CONTEXT' }, (response) => {
        setLoading(false)

        if (chrome.runtime.lastError) {
          setError('Could not capture. Make sure you are on Claude or ChatGPT.')
          return
        }

        if (!response || !response.success) {
          setError('No messages found on this page.')
          return
        }

        const prompt = generateResumePrompt(response.messages, response.source)
        setResumePrompt(prompt)

        const newSession = {
          id: Date.now(),
          name: `${response.source} — ${new Date().toLocaleTimeString()}`,
          source: response.source,
          messageCount: response.messages.length,
          prompt
        }

        const updated = [newSession, ...sessions].slice(0, 10)
        setSessions(updated)
        if (typeof chrome !== 'undefined' && chrome.storage) {
          chrome.storage.local.set({ sessions: updated })
        }
      })
    } catch (err) {
      setLoading(false)
      setError('Something went wrong. Try again.')
    }
  }

  const handleLoad = (session) => {
    setResumePrompt(session.prompt)
  }

  const handleDelete = (id) => {
    const updated = sessions.filter(s => s.id !== id)
    setSessions(updated)
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ sessions: updated })
    }
  }

  const handleApiKeyChange = (key) => {
    setApiKey(key)
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ geminiApiKey: key })
    }
  }

  const handleSummarize = async () => {
    if (!apiKey || !resumePrompt) return
    setSummarizing(true)
    setError('')

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a conversation summarizer. Given this AI chat history, create a concise but complete context summary that can be used to resume the conversation. Include: main topics discussed, key decisions or conclusions, and the last question or task being worked on. Keep it under 300 words.\n\n${resumePrompt}`
              }]
            }]
          })
        }
      )

      const data = await response.json()
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (summary) {
        const summarizedPrompt = `[CONTEXT RESUME — AI Summary]\n\nThis is a continuation of a previous conversation. Here's a summary of what was discussed:\n\n${summary}\n\nPlease acknowledge and continue helping me.`
        setResumePrompt(summarizedPrompt)
      } else {
        setError('Summarization failed. Check your API key.')
      }
    } catch (err) {
      setError('Summarization failed. Check your API key.')
    }

    setSummarizing(false)
  }

  return (
    <div className="w-80 min-h-40 bg-white">
      <Header />
      <div className="p-3">
        <CaptureButton onCapture={handleCapture} loading={loading} />
        {error && (
          <p className="mt-2 text-xs text-red-500 text-center">{error}</p>
        )}
        <ResumePrompt prompt={resumePrompt} />
        <SummarizeButton
          onSummarize={handleSummarize}
          loading={summarizing}
          disabled={!resumePrompt || !apiKey}
        />
        <ApiKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        <SessionList
          sessions={sessions}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}