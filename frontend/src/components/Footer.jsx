import { Link, useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="text-xl font-bold text-white">ContextSnap</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Never lose your AI conversation context again. Capture, summarize,
              and resume any AI chat instantly across Claude, ChatGPT, Gemini and Perplexity.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/guide" className="hover:text-white transition-colors">
                  Guide
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('download')}
                  className="hover:text-white transition-colors text-left">
                  Download
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors text-left">
                  Features
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row 
                        items-center justify-between gap-4">
          <p className="text-sm">© 2025 ContextSnap. All rights reserved.</p>
          <p className="text-sm">Built with ❤️ by Gopal Krishna</p>
        </div>
      </div>
    </footer>
  )
}