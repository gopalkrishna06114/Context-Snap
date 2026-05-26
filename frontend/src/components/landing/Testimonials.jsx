import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    text: 'I hit Claude\'s context limit daily. ContextSnap saved me hours — I just snap and resume in seconds!'
  },
  {
    name: 'Priya Mehta',
    role: 'Content Writer',
    avatar: '👩‍💼',
    text: 'The AI summary feature is brilliant. It compresses 50 messages into a perfect resume prompt.'
  },
  {
    name: 'Arjun Verma',
    role: 'Startup Founder',
    avatar: '🧑‍🚀',
    text: 'Works perfectly on Chrome and Edge. The Snap button right in the input bar is super intuitive!'
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Loved by AI Power Users
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands who never lose their AI context
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 
                         border border-gray-100 dark:border-gray-700"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}