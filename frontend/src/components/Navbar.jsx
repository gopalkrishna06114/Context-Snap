import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, setDark } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 
                    backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary 
                           bg-clip-text text-transparent">
              ContextSnap
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 
                                    hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/guide" className="text-gray-600 dark:text-gray-300 
                                         hover:text-primary transition-colors">
              Guide
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 
                                          hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 
                                            hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                         text-gray-600 dark:text-gray-300 hover:scale-110 transition-all"
            >
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300
                             hover:text-primary transition-colors">
                  Dashboard
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin"
                    className="text-sm font-bold text-indigo-600 dark:text-indigo-400
                               hover:text-indigo-800 dark:hover:text-indigo-300 
                               transition-colors">
                    🛡️ Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white 
                             px-4 py-2 rounded-full transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300
                             hover:text-primary transition-colors px-3 py-2">
                  Login
                </Link>
                <Link to="/register"
                  className="text-sm bg-gradient-to-r from-primary to-secondary 
                             text-white px-4 py-2 rounded-full hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary px-2 py-1">
              Home
            </Link>
            <Link to="/guide" onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary px-2 py-1">
              Guide
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary px-2 py-1">
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary px-2 py-1">
              Contact
            </Link>
            {user && (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary px-2 py-1">
                Dashboard
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link to="/admin" onClick={() => setMenuOpen(false)}
                className="text-indigo-600 dark:text-indigo-400 font-bold px-2 py-1">
                🛡️ Admin Panel
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}