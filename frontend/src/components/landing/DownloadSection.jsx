import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../../api/axios'

function detectBrowser() {
  const ua = navigator.userAgent
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Brave') || navigator.brave) return 'Brave'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  return 'Chrome'
}

export default function DownloadSection() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [detectedBrowser, setDetectedBrowser] = useState('')
  const [selectedBrowser, setSelectedBrowser] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [doneMap, setDoneMap] = useState({})

  useEffect(() => {
    const browser = detectBrowser()
    setDetectedBrowser(browser)
    setSelectedBrowser(browser)
  }, [])

  const handleDownload = async () => {
    if (!user) {
      navigate('/register')
      return
    }

    setDownloading(true)
    try {
      // track in DB first
      await api.post('/user/download', {
        browser: selectedBrowser,
        version: '1.0.0'
      })

      const fileName = selectedBrowser === 'Firefox'
        ? 'contextsnap-firefox.zip'
        : 'contextsnap-chrome.zip'

      // fetch the file as blob then trigger download
      const response = await fetch(
        `http://localhost:8080/api/files/download/${fileName}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      setDoneMap(prev => ({ ...prev, [selectedBrowser]: true }))
    } catch (e) {
      console.error('Download error:', e)
      alert('Download failed. Please try again.')
    }
    setDownloading(false)
  }

  return (
    <section id="download" className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-white mb-4">
          Ready to Never Lose Context Again?
        </h2>
        <p className="text-indigo-200 text-lg mb-10">
          Free forever. No subscription. Works on {selectedBrowser}.
        </p>

        {/* Browser selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['Chrome', 'Edge', 'Brave', 'Firefox'].map(b => (
            <button
              key={b}
              onClick={() => setSelectedBrowser(b)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedBrowser === b
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {b === detectedBrowser ? `${b} (detected)` : b}
              {doneMap[b] && (
                <span className="ml-1 text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={downloading || selectedBrowser === 'Firefox'}
          className="inline-flex items-center gap-3 bg-white text-indigo-600 
                     px-10 py-4 rounded-full text-lg font-bold hover:scale-105 
                     transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {downloading ? '⏳ Processing...' :
           doneMap[selectedBrowser] ? '✅ Downloaded!' :
           selectedBrowser === 'Firefox' ? '🔜 Coming Soon' :
           `⬇️ Download for ${selectedBrowser}`}
        </button>

        {!user && (
          <p className="text-indigo-200 text-sm mt-4">
            * Create a free account to download
          </p>
        )}
      </div>
    </section>
  )
}