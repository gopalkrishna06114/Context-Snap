export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-indigo-200">Last updated: May 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {[
          {
            title: '1. Information We Collect',
            content: `When you create an account, we collect your name, email address, 
            and optionally your location. When you download the extension, we record 
            which browser you used and the date of download. We do not collect any 
            conversation content from your AI chats.`
          },
          {
            title: '2. How We Use Your Information',
            content: `Your information is used solely to provide and improve the 
            ContextSnap service — including account management, download tracking, 
            and responding to your queries. We never sell your data to third parties.`
          },
          {
            title: '3. Extension Data',
            content: `The ContextSnap browser extension processes your AI conversation 
            data entirely within your browser. No conversation content is ever sent to 
            our servers. Your API keys are stored locally in your browser's extension 
            storage only.`
          },
          {
            title: '4. Data Security',
            content: `We use industry-standard security measures including bcrypt 
            password hashing and JWT authentication. Your password is never stored 
            in plain text.`
          },
          {
            title: '5. Cookies',
            content: `We use localStorage for storing your authentication token 
            and theme preference. We do not use tracking cookies or third-party 
            analytics.`
          },
          {
            title: '6. Your Rights',
            content: `You can update or delete your account at any time through 
            your dashboard. To permanently delete all your data, contact us at 
            support@contextsnap.dev and we will process your request within 7 days.`
          },
          {
            title: '7. Contact',
            content: `For any privacy-related questions, email us at 
            support@contextsnap.dev. We typically respond within 24 hours.`
          }
        ].map(section => (
          <div key={section.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 
                       border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}