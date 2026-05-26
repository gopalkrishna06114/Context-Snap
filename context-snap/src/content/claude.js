function extractClaudeMessages() {
  const results = []

  const allElements = Array.from(document.querySelectorAll(
    '[data-testid="user-message"], .font-claude-response-body'
  )).sort((a, b) => {
    const pos = a.compareDocumentPosition(b)
    return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  })

  allElements.forEach(el => {
    const isUser = el.hasAttribute('data-testid') &&
                   el.getAttribute('data-testid') === 'user-message'
    const content = isUser
      ? el.textContent.trim()
      : el.innerText.trim()
    if (content) {
      results.push({ role: isUser ? 'user' : 'assistant', content })
    }
  })

  return results
}

function generateResumePrompt(messages) {
  return messages
    .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
    .join('\n\n')
}

async function summarizeWithGemini(apiKey, prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a conversation summarizer. Given this AI chat history, create a concise but complete context summary to resume the conversation. Include: main topics, key decisions, and the last task being worked on. Keep it under 300 words.\n\n${prompt}`
          }]
        }]
      })
    }
  )
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null
}

function showToast(message, isError = false) {
  const existing = document.getElementById('contextsnap-toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'contextsnap-toast'
  toast.style.cssText = `
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: ${isError ? '#ef4444' : '#1e1e2e'}; color: white;
    padding: 10px 18px; border-radius: 999px; font-size: 13px;
    font-family: sans-serif; z-index: 99999; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    display: flex; align-items: center; gap: 8px;
  `
  toast.innerHTML = message
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 4000)
}

function showSummaryModal(text) {
  const existing = document.getElementById('contextsnap-modal')
  if (existing) existing.remove()

  const overlay = document.createElement('div')
  overlay.id = 'contextsnap-modal'
  overlay.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    z-index: 99999; display: flex; align-items: center; justify-content: center;
  `

  const modal = document.createElement('div')
  modal.style.cssText = `
    background: #1e1e2e; color: white; border-radius: 16px;
    padding: 20px; width: 480px; max-width: 90vw; max-height: 70vh;
    display: flex; flex-direction: column; gap: 12px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5); font-family: sans-serif;
  `

  const header = document.createElement('div')
  header.style.cssText = 'display: flex; justify-content: space-between; align-items: center;'
  header.innerHTML = `
    <span style="font-weight: 700; font-size: 15px;">🧠 ContextSnap Summary</span>
    <button id="contextsnap-close" style="background:none;border:none;color:white;font-size:18px;cursor:pointer;">✕</button>
  `

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.readOnly = true
  textarea.style.cssText = `
    background: #2a2a3e; color: #e2e8f0; border: 1px solid #4a4a6a;
    border-radius: 8px; padding: 10px; font-size: 12px; line-height: 1.6;
    resize: none; flex: 1; min-height: 200px; font-family: sans-serif;
    outline: none;
  `

  const copyBtn = document.createElement('button')
  copyBtn.innerHTML = '📋 Copy to Clipboard'
  copyBtn.style.cssText = `
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white; border: none; border-radius: 999px;
    padding: 10px 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; width: 100%;
  `

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
    copyBtn.innerHTML = '✅ Copied!'
    setTimeout(() => copyBtn.innerHTML = '📋 Copy to Clipboard', 2000)
  })

  modal.appendChild(header)
  modal.appendChild(textarea)
  modal.appendChild(copyBtn)
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  document.getElementById('contextsnap-close').addEventListener('click', () => overlay.remove())
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove() })
}

function injectCapsuleButton() {
  if (document.getElementById('contextsnap-btn')) return

  // Find the + button in Claude's toolbar
  const plusBtn = document.querySelector('button[aria-label="Add files, connectors, and more"]')
  if (!plusBtn) return

  const btn = document.createElement('button')
  btn.id = 'contextsnap-btn'
  btn.title = 'ContextSnap — Capture & Summarize'
  btn.style.cssText = `
    display: inline-flex; align-items: center; gap: 5px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white; border: none; border-radius: 999px;
    padding: 5px 12px; font-size: 12px; font-weight: 600;
    cursor: pointer; z-index: 9999; margin: 0 4px;
    font-family: sans-serif; white-space: nowrap;
    box-shadow: 0 2px 8px rgba(99,102,241,0.4);
    transition: opacity 0.2s;
  `
  btn.innerHTML = '🧠 Snap'

  btn.addEventListener('mouseenter', () => btn.style.opacity = '0.85')
  btn.addEventListener('mouseleave', () => btn.style.opacity = '1')

  btn.addEventListener('click', async () => {
    btn.innerHTML = '⏳ Capturing...'
    btn.disabled = true

    const messages = extractClaudeMessages()
    if (messages.length === 0) {
      showToast('❌ No messages found', true)
      btn.innerHTML = '🧠 Snap'
      btn.disabled = false
      return
    }

    const rawPrompt = generateResumePrompt(messages)

    chrome.storage.local.get(['geminiApiKey'], async (result) => {
      const apiKey = result.geminiApiKey

      if (!apiKey) {
        const finalPrompt = `[CONTEXT RESUME]\n\nContinue from our previous conversation:\n\n${rawPrompt}\n\nPlease acknowledge and continue.`
        showSummaryModal(finalPrompt)
        btn.innerHTML = '🧠 Snap'
        btn.disabled = false
        return
      }

      btn.innerHTML = '✨ Summarizing...'

      try {
        const summary = await summarizeWithGemini(apiKey, rawPrompt)
        if (summary) {
          const finalPrompt = `[CONTEXT RESUME — AI Summary]\n\nContinue from our previous conversation. Here's what we discussed:\n\n${summary}\n\nPlease acknowledge and continue.`
          showSummaryModal(finalPrompt)
        } else {
          showToast('❌ Summarization failed', true)
        }
      } catch (e) {
        showToast('❌ Error: ' + e.message, true)
      }

      btn.innerHTML = '🧠 Snap'
      btn.disabled = false
    })
  })

  // inject right after the + button's parent div
  plusBtn.parentElement.insertAdjacentElement('afterend', btn)
}

const observer = new MutationObserver(() => injectCapsuleButton())
observer.observe(document.body, { childList: true, subtree: true })
injectCapsuleButton()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CAPTURE_CONTEXT') {
    const messages = extractClaudeMessages()
    if (messages.length === 0) {
      sendResponse({ success: false })
    } else {
      sendResponse({ success: true, messages, source: 'claude' })
    }
  }
  return true
})