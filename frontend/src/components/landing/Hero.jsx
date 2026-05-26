import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiDownload, FiPlay } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

export default function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleGetExtension = () => {
    if (user) {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/register')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-indigo-50 via-white to-purple-50
                        dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 
                          text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full 
                          text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Now supporting Claude, ChatGPT, Gemini & Perplexity
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 
                         dark:text-white mb-6 leading-normal">
            Never Lose Your
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 
                           bg-clip-text text-transparent pb-2">
              AI Context Again
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            ContextSnap captures your entire AI conversation, generates an AI-powered summary,
            and lets you resume instantly — even after hitting token limits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetExtension}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                         text-white px-8 py-4 rounded-full text-lg font-semibold 
                         hover:opacity-90 hover:scale-105 transition-all shadow-lg 
                         shadow-indigo-200 dark:shadow-indigo-900">
              <FiDownload size={20} />
              Get Extension Free
            </button>
            <Link to="/guide"
              className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 
                         dark:text-gray-300 px-8 py-4 rounded-full text-lg font-semibold 
                         border border-gray-200 dark:border-gray-700 
                         hover:scale-105 transition-all">
              <FiPlay size={20} />
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-14">
            {[
              { label: 'AI Tools Supported', value: '4+' },
              { label: 'Browsers Supported', value: '3+' },
              { label: 'Token Limit Problem', value: 'Solved' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}