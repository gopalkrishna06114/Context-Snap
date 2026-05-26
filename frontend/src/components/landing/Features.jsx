import { motion } from 'framer-motion'

const features = [
  {
    icon: '📸',
    title: 'One-Click Capture',
    desc: 'Click the 🧠 Snap button in any AI tool\'s input bar to instantly capture your entire conversation history.'
  },
  {
    icon: '✨',
    title: 'AI-Powered Summary',
    desc: 'Uses Gemini AI to compress long conversations into smart, concise summaries — saving tokens when resuming.'
  },
  {
    icon: '📋',
    title: 'Instant Resume',
    desc: 'Copy the generated context prompt and paste it into any new AI chat to pick up exactly where you left off.'
  },
  {
    icon: '💾',
    title: 'Session Storage',
    desc: 'Save up to 10 conversation snapshots locally. Load any previous session anytime with one click.'
  },
  {
    icon: '🌐',
    title: 'Multi-Platform',
    desc: 'Works seamlessly across Claude, ChatGPT, Gemini, and Perplexity — one extension for all your AI tools.'
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'All data stays in your browser. No conversation content is sent to our servers — ever.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 
                           bg-clip-text text-transparent"> Never Lose Context</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features built for power users who work with AI daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 
                         bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg 
                         hover:border-indigo-200 dark:hover:border-indigo-700 
                         transition-all group"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 
                             group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
                             transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}