import { useState } from 'react'
import { motion } from 'framer-motion'

const browsers = ['Chrome', 'Edge', 'Brave', 'Firefox']

const steps = {
  Chrome: [
    {
      step: 1,
      title: 'Download the Extension',
      desc: 'Click the Download button on the homepage. Make sure you are logged in first.',
      icon: '⬇️'
    },
    {
      step: 2,
      title: 'Extract the ZIP file',
      desc: 'Right click the downloaded contextsnap.zip and extract it to a folder on your computer.',
      icon: '📂'
    },
    {
      step: 3,
      title: 'Open Chrome Extensions',
      desc: 'Open Chrome and go to chrome://extensions in the address bar.',
      icon: '🌐'
    },
    {
      step: 4,
      title: 'Enable Developer Mode',
      desc: 'Toggle on "Developer mode" in the top right corner of the extensions page.',
      icon: '🔧'
    },
    {
      step: 5,
      title: 'Load Unpacked',
      desc: 'Click "Load unpacked" and select the extracted dist folder from step 2.',
      icon: '📦'
    },
    {
      step: 6,
      title: 'Pin the Extension',
      desc: 'Click the puzzle icon in Chrome toolbar and pin ContextSnap for easy access.',
      icon: '📌'
    },
    {
      step: 7,
      title: 'Start Using',
      desc: 'Go to Claude, ChatGPT, Gemini or Perplexity. You will see the 🧠 Snap button in the input bar!',
      icon: '🚀'
    }
  ],
  Edge: [
    {
      step: 1,
      title: 'Download the Extension',
      desc: 'Click the Download button on the homepage after logging in.',
      icon: '⬇️'
    },
    {
      step: 2,
      title: 'Extract the ZIP file',
      desc: 'Extract contextsnap.zip to a folder on your computer.',
      icon: '📂'
    },
    {
      step: 3,
      title: 'Open Edge Extensions',
      desc: 'Open Edge and go to edge://extensions in the address bar.',
      icon: '🌐'
    },
    {
      step: 4,
      title: 'Enable Developer Mode',
      desc: 'Toggle on "Developer mode" on the left sidebar.',
      icon: '🔧'
    },
    {
      step: 5,
      title: 'Load Unpacked',
      desc: 'Click "Load unpacked" and select the dist folder.',
      icon: '📦'
    },
    {
      step: 6,
      title: 'Pin the Extension',
      desc: 'Click the extensions icon in Edge toolbar and pin ContextSnap.',
      icon: '📌'
    },
    {
      step: 7,
      title: 'Start Using',
      desc: 'Visit any supported AI tool and use the 🧠 Snap button!',
      icon: '🚀'
    }
  ],
  Brave: [
    {
      step: 1,
      title: 'Download the Extension',
      desc: 'Click the Download button on the homepage after logging in.',
      icon: '⬇️'
    },
    {
      step: 2,
      title: 'Extract the ZIP file',
      desc: 'Extract contextsnap.zip to a folder on your computer.',
      icon: '📂'
    },
    {
      step: 3,
      title: 'Open Brave Extensions',
      desc: 'Open Brave and go to brave://extensions in the address bar.',
      icon: '🌐'
    },
    {
      step: 4,
      title: 'Enable Developer Mode',
      desc: 'Toggle on "Developer mode" in the top right corner.',
      icon: '🔧'
    },
    {
      step: 5,
      title: 'Load Unpacked',
      desc: 'Click "Load unpacked" and select the dist folder.',
      icon: '📦'
    },
    {
      step: 6,
      title: 'Pin the Extension',
      desc: 'Click the puzzle icon in Brave toolbar and pin ContextSnap.',
      icon: '📌'
    },
    {
      step: 7,
      title: 'Start Using',
      desc: 'Visit any supported AI tool and use the 🧠 Snap button!',
      icon: '🚀'
    }
  ],
  Firefox: [
    {
      step: 1,
      title: 'Coming Soon',
      desc: 'Firefox support is currently in development. We are building a Manifest V2 version specifically for Firefox.',
      icon: '🔜'
    },
    {
      step: 2,
      title: 'Stay Updated',
      desc: 'Follow our updates on the homepage. Firefox version will be available for download soon.',
      icon: '🔔'
    },
    {
      step: 3,
      title: 'Use Chrome/Edge Meanwhile',
      desc: 'In the meantime you can use ContextSnap on Chrome, Edge or Brave without any issues.',
      icon: '✅'
    }
  ]
}

export default function Guide() {
  const [selectedBrowser, setSelectedBrowser] = useState('Chrome')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Setup Guide
          </h1>
          <p className="text-indigo-200 text-lg">
            Get ContextSnap running in under 2 minutes
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Browser Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {browsers.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBrowser(b)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedBrowser === b
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              {b === 'Chrome' ? '🟡' :
               b === 'Edge' ? '🔵' :
               b === 'Brave' ? '🟠' : '🦊'} {b}
              {b === 'Firefox' && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 
                                 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps[selectedBrowser].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 
                         border border-gray-100 dark:border-gray-700 
                         hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 
                              dark:bg-indigo-900/40 rounded-xl flex items-center 
                              justify-center text-2xl">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-indigo-600 
                                   dark:text-indigo-400 bg-indigo-50 
                                   dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                    Step {s.step}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supported AI Tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white 
                         text-center mb-8">
            Supported AI Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Claude', icon: '🤖', url: 'claude.ai' },
              { name: 'ChatGPT', icon: '💬', url: 'chatgpt.com' },
              { name: 'Gemini', icon: '✨', url: 'gemini.google.com' },
              { name: 'Perplexity', icon: '🔍', url: 'perplexity.ai' },
            ].map(tool => (
              <div key={tool.name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center 
                           border border-gray-100 dark:border-gray-700 
                           hover:border-indigo-300 transition-all">
                <div className="text-4xl mb-2">{tool.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white">{tool.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {tool.url}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}