import { motion } from 'framer-motion'

const browsers = [
  { name: 'Chrome', icon: '🟡', status: 'supported', desc: 'Full support with Snap button injection' },
  { name: 'Microsoft Edge', icon: '🔵', status: 'supported', desc: 'Full support — Chromium based' },
  { name: 'Brave', icon: '🟠', status: 'supported', desc: 'Full support — Chromium based' },
  { name: 'Firefox', icon: '🦊', status: 'coming', desc: 'Coming soon — Manifest V2 build ready' },
  { name: 'Safari', icon: '🧭', status: 'coming', desc: 'Planned for future release' },
  { name: 'Opera', icon: '🔴', status: 'coming', desc: 'Planned for future release' },
]

export default function BrowserSupport() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 
                        dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Works On Your Browser
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Available today on major Chromium browsers. Firefox coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {browsers.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border-2 bg-white dark:bg-gray-800 
                         transition-all ${
                           b.status === 'supported'
                             ? 'border-green-200 dark:border-green-800'
                             : 'border-gray-200 dark:border-gray-700 opacity-70'
                         }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {b.name}
                  </span>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  b.status === 'supported'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                }`}>
                  {b.status === 'supported' ? '✅ Available' : '🔜 Coming Soon'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}