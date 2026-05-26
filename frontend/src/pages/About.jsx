import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-white mb-4">About ContextSnap</h1>
          <p className="text-indigo-200 text-lg">
            Built to solve a real problem every AI user faces
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                     border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
            The Problem We Solve
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Every day, millions of people use AI tools like Claude, ChatGPT, and Gemini
            for complex tasks — coding, writing, research, analysis. But there's a
            frustrating problem: token limits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            When you hit a token limit or start a new session, you lose all your
            conversation context. You have to manually copy-paste previous messages,
            re-explain your project, re-establish context — wasting precious time.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            ContextSnap solves this with one click. Capture your entire conversation,
            get an AI-powered summary, and paste it into any new chat to resume
            exactly where you left off.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 
                     rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-black mb-4">Our Mission</h2>
          <p className="leading-relaxed text-indigo-100">
            To make AI conversations seamless, continuous, and productive — regardless
            of token limits, session resets, or platform switches. We believe your
            ideas and context should never be lost just because of a technical limitation.
          </p>
        </motion.div>

        {/* Developer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                     border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            Built By
          </h2>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 
                            rounded-full flex items-center justify-center text-2xl text-white font-black">
              G
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Gopal Krishna
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Full Stack Developer — Java, Spring Boot, React
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                B.Tech Computer Science, PSIT Kanpur
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 
                     border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'React + Vite', icon: '⚛️', desc: 'Frontend' },
              { name: 'Spring Boot', icon: '🍃', desc: 'Backend API' },
              { name: 'Tailwind CSS', icon: '🎨', desc: 'Styling' },
              { name: 'JWT Auth', icon: '🔐', desc: 'Security' },
              { name: 'MySQL/PostgreSQL', icon: '🗄️', desc: 'Database' },
              { name: 'Gemini API', icon: '✨', desc: 'AI Summarization' },
            ].map(t => (
              <div key={t.name}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="text-2xl mb-1">{t.icon}</div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}