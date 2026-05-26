import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Contact() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setLoading(true)
    setStatus('')
    try {
      await api.post('/user/query', form)
      setStatus('✅ Message sent! We will get back to you within 24 hours.')
      setForm({ subject: '', message: '' })
    } catch (e) {
      setStatus('❌ Failed to send message. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-indigo-200 text-lg">
            Have a question or suggestion? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '📧', label: 'Email', value: 'support@contextsnap.dev' },
            { icon: '⏰', label: 'Response Time', value: 'Within 24 hours' },
            { icon: '🌍', label: 'Based In', value: 'Kanpur, India' },
          ].map(c => (
            <div key={c.label}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center 
                         border border-gray-100 dark:border-gray-700">
              <div className="text-3xl mb-2">{c.icon}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {c.label}
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                        border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Send a Message
          </h2>

          {!user && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 
                            dark:text-indigo-300 text-sm px-4 py-3 rounded-xl mb-6">
              Please{' '}
              <button onClick={() => navigate('/login')}
                className="font-bold underline">
                login
              </button>
              {' '}to send a message.
            </div>
          )}

          {status && (
            <div className={`px-4 py-3 rounded-xl mb-6 text-sm font-medium ${
              status.startsWith('✅')
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 
                                 dark:text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                           dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                           text-gray-900 dark:text-white focus:outline-none 
                           focus:ring-2 focus:ring-indigo-500"
                placeholder="Issue with extension on Chrome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 
                                 dark:text-gray-300 mb-1">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                           dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                           text-gray-900 dark:text-white focus:outline-none 
                           focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Describe your question or suggestion..."
              />
            </div>
            <button
              type="submit"
              disabled={loading || !user}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                         text-white py-3 rounded-xl font-semibold hover:opacity-90 
                         transition-all disabled:opacity-60"
            >
              {loading ? 'Sending...' : '📬 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}