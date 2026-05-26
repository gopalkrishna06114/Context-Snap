import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [queries, setQueries] = useState([])
  const [downloads, setDownloads] = useState([])
  const [notifications, setNotifications] = useState([])
  const [replyText, setReplyText] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [mailModal, setMailModal] = useState(null)
  const [mailForm, setMailForm] = useState({ subject: '', message: '' })

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/')
      return
    }
    fetchAll()
  }, [user])

  const fetchAll = async () => {
    try {
      const [s, u, q, d, n] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/queries'),
        api.get('/admin/downloads'),
        api.get('/admin/notifications'),
      ])
      setStats(s.data)
      setUsers(u.data)
      setQueries(q.data)
      setDownloads(d.data)
      setNotifications(n.data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      setMsg('✅ User deleted')
      fetchAll()
    } catch (e) {
      setMsg('❌ Failed to delete user')
    }
  }

  const handleReply = async (queryId) => {
    if (!replyText[queryId]?.trim()) return
    setLoading(true)
    try {
      await api.post(`/admin/queries/${queryId}/reply`, {
        reply: replyText[queryId]
      })
      setMsg('✅ Reply sent successfully! User will receive an email.')
      setReplyText({ ...replyText, [queryId]: '' })
      fetchAll()
    } catch (e) {
      setMsg('❌ Failed to send reply')
    }
    setLoading(false)
  }

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/admin/notifications/${id}/read`)
      fetchAll()
    } catch (e) {
      console.error(e)
    }
  }

  const handleSendMail = async () => {
    if (!mailModal || !mailForm.subject.trim() || !mailForm.message.trim()) return
    setLoading(true)
    try {
      await api.post(`/admin/users/${mailModal.id}/mail`, mailForm)
      setMsg('✅ Mail sent to ' + mailModal.name)
      setMailModal(null)
      setMailForm({ subject: '', message: '' })
      fetchAll()
    } catch (e) {
      setMsg('❌ Failed to send mail')
    }
    setLoading(false)
  }

  const tabs = ['overview', 'users', 'queries', 'downloads', 'notifications']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 
                        rounded-2xl p-6 mb-6 text-white flex items-center 
                        justify-between">
          <div>
            <h1 className="text-2xl font-black">Admin Dashboard 🛡️</h1>
            <p className="text-indigo-200 text-sm mt-1">
              ContextSnap Control Panel
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-200 text-sm">Logged in as</p>
            <p className="font-bold">{user?.name}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setMsg('') }}
              className={`px-5 py-2 rounded-full text-sm font-semibold 
                         capitalize transition-all ${
                           tab === t
                             ? 'bg-indigo-600 text-white'
                             : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                         }`}
            >
              {t === 'overview' ? '📊 Overview' :
               t === 'users' ? '👥 Users' :
               t === 'queries' ? '📩 Queries' :
               t === 'downloads' ? '⬇️ Downloads' : (
                <span className="flex items-center gap-1">
                  🔔 Notifications
                  {notifications.length > 0 && (
                    <span className="bg-red-500 text-white text-xs 
                                     w-5 h-5 rounded-full flex items-center 
                                     justify-center">
                      {notifications.length}
                    </span>
                  )}
                </span>
               )}
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

        {/* Overview Tab */}
        {tab === 'overview' && stats && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
                { label: 'Total Downloads', value: stats.totalDownloads, icon: '⬇️' },
                { label: 'Active Users', value: stats.usersDownloaded, icon: '✅' },
                { label: 'Pending Queries', value: stats.pendingQueries, icon: '📩' },
              ].map(stat => (
                <div key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                             border border-gray-100 dark:border-gray-700 
                             hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                            border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Registrations
              </h3>
              <div className="space-y-3">
                {users.slice(0, 5).map(u => (
                  <div key={u.id}
                    className="flex items-center justify-between p-3 
                               bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      u.hasDownloaded
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {u.hasDownloaded ? '✅ Downloaded' : 'Not downloaded'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              All Users ({users.filter(u => u.role !== 'ADMIN').length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    {['Name', 'Email', 'Location', 'Browser', 'Downloaded', 'Joined', 'Actions']
                      .map(h => (
                        <th key={h} className="text-left py-3 px-3 text-gray-500 
                                               dark:text-gray-400 font-semibold">
                          {h}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role !== 'ADMIN').map(u => (
                    <tr key={u.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 
                                 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">
                        {u.name}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {u.email}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {u.location || '—'}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {u.browserUsed || '—'}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.hasDownloaded
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {u.hasDownloaded ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setMailModal(u)
                              setMailForm({ subject: '', message: '' })
                            }}
                            className="text-indigo-500 hover:text-indigo-700 text-xs 
                                       font-semibold hover:underline"
                          >
                            📧 Mail
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-red-500 hover:text-red-700 text-xs 
                                       font-semibold hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Queries Tab */}
        {tab === 'queries' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              All Queries ({queries.length})
            </h2>
            {queries.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 
                              text-center border border-gray-100 dark:border-gray-700">
                <span className="text-5xl">📭</span>
                <p className="text-gray-500 dark:text-gray-400 mt-4">No queries yet</p>
              </div>
            ) : (
              queries.map(q => (
                <div key={q.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                             border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{q.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        From: {q.user?.name} ({q.user?.email})
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(q.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      q.status === 'REPLIED'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                    }`}>
                      {q.status}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm 
                                bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl mb-4">
                    {q.message}
                  </p>

                  {q.adminReply && (
                    <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 
                                    rounded-xl border-l-4 border-indigo-500">
                      <p className="text-xs font-semibold text-indigo-600 
                                    dark:text-indigo-400 mb-1">Your Reply:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{q.adminReply}</p>
                    </div>
                  )}

                  {q.status === 'PENDING' && (
                    <div className="flex gap-3">
                      <textarea
                        rows={2}
                        value={replyText[q.id] || ''}
                        onChange={e => setReplyText({ ...replyText, [q.id]: e.target.value })}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 
                                   dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                                   text-gray-900 dark:text-white text-sm 
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                   resize-none"
                        placeholder="Type your reply... (user will receive an email)"
                      />
                      <button
                        onClick={() => handleReply(q.id)}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white 
                                   px-5 py-2 rounded-xl text-sm font-semibold 
                                   transition-colors disabled:opacity-60"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Downloads Tab */}
        {tab === 'downloads' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                          border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              All Downloads ({downloads.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    {['User', 'Email', 'Browser', 'Version', 'Date'].map(h => (
                      <th key={h} className="text-left py-3 px-3 text-gray-500 
                                             dark:text-gray-400 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {downloads.map(d => (
                    <tr key={d.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 
                                 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">
                        {d.user?.name}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {d.user?.email}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {d.browser}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {d.version}
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                        {new Date(d.downloadedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {tab === 'notifications' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Notifications ({notifications.length} unread)
            </h2>
            {notifications.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 
                              text-center border border-gray-100 dark:border-gray-700">
                <span className="text-5xl">🔔</span>
                <p className="text-gray-500 dark:text-gray-400 mt-4">No new notifications</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 
                             border border-gray-100 dark:border-gray-700 
                             flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {n.type === 'NEW_QUERY' ? '📩' :
                       n.type === 'MAIL_SENT' ? '📧' : '↩️'}
                    </span>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">
                        {n.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 
                               font-semibold hover:underline ml-4 shrink-0"
                  >
                    Mark read
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Mail Modal */}
        {mailModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center 
                          justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md
                            border border-gray-100 dark:border-gray-700 shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                📧 Send Mail to {mailModal.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                {mailModal.email}
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={mailForm.subject}
                  onChange={e => setMailForm({ ...mailForm, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                             text-gray-900 dark:text-white focus:outline-none
                             focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={mailForm.message}
                  onChange={e => setMailForm({ ...mailForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200
                             dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                             text-gray-900 dark:text-white focus:outline-none
                             focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSendMail}
                    disabled={loading || !mailForm.subject.trim() || !mailForm.message.trim()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white
                               py-3 rounded-xl font-semibold transition-colors
                               disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : '📧 Send Mail'}
                  </button>
                  <button
                    onClick={() => setMailModal(null)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700
                               dark:text-gray-300 py-3 rounded-xl font-semibold
                               hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}