import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Blue Team',    href: '#what'      },
  { label: 'Roadmap',     href: '#roadmap'   },
  { label: 'Certs',       href: '#certs'     },
  { label: 'Labs',        href: '#labs'      },
  { label: 'Tools',       href: '#tools'     },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [progress,  setProgress]  = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docH      = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 60)
      setProgress((scrollTop / docH) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(href) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent">
        <motion.div
          className="h-full progress-bar origin-left"
          style={{ scaleX: progress / 100, transformOrigin: '0%' }}
        />
      </div>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050D1A]/90 backdrop-blur-xl border-b border-cyan-500/10'
            : 'bg-transparent'
        }`} />

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-sm font-black">
                BT
              </div>
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-md group-hover:blur-lg transition-all" />
            </div>
            <span className="font-bold text-lg tracking-tight gradient-text">
              BlueTeam
            </span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-blue-200/70 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              className="px-5 py-2 rounded-xl text-sm font-semibold btn-primary text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#roadmap')}
            >
              Start Learning →
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg border border-cyan-500/20 text-cyan-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#050D1A]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 border border-cyan-500/20"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  className="w-full text-left px-4 py-3 text-blue-200 hover:text-cyan-400 border-b border-cyan-500/10 last:border-0 transition-colors"
                  onClick={() => scrollTo(link.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                className="w-full mt-4 px-5 py-3 rounded-xl text-sm font-semibold btn-primary text-white"
                onClick={() => scrollTo('#roadmap')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Start Learning →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
