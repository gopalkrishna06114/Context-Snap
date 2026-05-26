import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', form)
      login(
        { name: res.data.name, email: res.data.email, role: res.data.role },
        res.data.token
      )
      if (res.data.role === 'ADMIN') navigate('/admin')
      else navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-50 to-purple-50 
                    dark:from-gray-900 dark:to-indigo-950 pt-16 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl 
                      shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <span className="text-4xl">🧠</span>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mt-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Login to download ContextSnap
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 
                          text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 
                               dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
                         dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="gopal@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 
                               dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
                         dark:border-gray-600 bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white py-3 rounded-xl font-semibold hover:opacity-90 
                       transition-all disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 
                                          font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}