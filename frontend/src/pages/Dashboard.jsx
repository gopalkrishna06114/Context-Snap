import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [downloads, setDownloads] = useState([])
  const [queries, setQueries] = useState([])
  const [form, setForm] = useState({ name: '', location: '', password: '' })
  const [queryForm, setQueryForm] = useState({ subject: '', message: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const [p, d, q] = await Promise.all([
        api.get('/user/profile'),
        api.get('/user/downloads'),
        api.get('/user/queries')
      ])
      setProfile(p.data)
      setDownloads(d.data)
      setQueries(q.data)
      setForm({ name: p.data.name, location: p.data.location || '', password: '' })
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      await api.put('/user/profile', form)
      setMsg('✅ Profile updated successfully!')
      fetchData()
    } catch (e) {
      setMsg('❌ Update failed')
    }
    setLoading(false)
  }

  const handleSubmitQuery = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      await api.post('/user/query', queryForm)
      setMsg('✅ Query submitted! We will get back to you soon.')
      setQueryForm({ subject: '', message: '' })
      fetchData()
    } catch (e) {
      setMsg('❌ Failed to submit query')
    }
    setLoading(false)
  }

  const tabs = ['profile', 'downloads', 'queries', 'contact']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                        rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-2xl font-black">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-indigo-200 text-sm mt-1">{user?.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setMsg('') }}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize 
                         transition-all ${
                           tab === t
                             ? 'bg-indigo-600 text-white'
                             : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                         }`}
            >
              {t === 'profile' ? '👤 Profile' :
               t === 'downloads' ? '⬇️ Downloads' :
               t === 'queries' ? '📩 My Queries' : '📬 Contact'}
            </button>
          ))}
        </div>

        {msg && (
          <div className={`px-4 py-3 rounded-xl mb-4 text-sm font-medium ${
            msg.startsWith('✅')
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {msg}
          </div>
        )}

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Update Profile
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 
                                   dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                             text-gray-900 dark:text-white focus:outline-none 
                             focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 
                                   dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                             text-gray-900 dark:text-white focus:outline-none 
                             focus:ring-2 focus:ring-indigo-500"
                  placeholder="Kanpur, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 
                                   dark:text-gray-300 mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                             text-gray-900 dark:text-white focus:outline-none 
                             focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 
                           text-white px-8 py-3 rounded-xl font-semibold 
                           hover:opacity-90 transition-all disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Downloads Tab */}
        {tab === 'downloads' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Download History
            </h2>
            {downloads.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl">⬇️</span>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  No downloads yet.
                </p>
                <button
                  onClick={() => navigate('/#download')}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 
                             rounded-full text-sm font-semibold hover:opacity-90"
                >
                  Download Extension
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {downloads.map(d => (
                  <div key={d.id}
                    className="flex items-center justify-between p-4 
                               bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {d.browser}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Version {d.version}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(d.downloadedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Queries Tab */}
        {tab === 'queries' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              My Queries
            </h2>
            {queries.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No queries submitted yet.
              </p>
            ) : (
              <div className="space-y-4">
                {queries.map(q => (
                  <div key={q.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {q.subject}
                      </p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        q.status === 'REPLIED'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {q.message}
                    </p>
                    {q.adminReply && (
                      <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 
                                      rounded-lg border-l-4 border-indigo-500">
                        <p className="text-xs font-semibold text-indigo-600 
                                      dark:text-indigo-400 mb-1">Admin Reply:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {q.adminReply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {tab === 'contact' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Contact / Suggestions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Have a question or suggestion? We'd love to hear from you.
            </p>
            <form onSubmit={handleSubmitQuery} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 
                                   dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={queryForm.subject}
                  onChange={e => setQueryForm({ ...queryForm, subject: e.target.value })}
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
                  rows={5}
                  value={queryForm.message}
                  onChange={e => setQueryForm({ ...queryForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                             text-gray-900 dark:text-white focus:outline-none 
                             focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Describe your issue or suggestion..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 
                           text-white px-8 py-3 rounded-xl font-semibold 
                           hover:opacity-90 transition-all disabled:opacity-60"
              >
                {loading ? 'Sending...' : '📬 Send Message'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}