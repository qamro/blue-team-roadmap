import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Blue Team', href: '#what'    },
  { label: 'Roadmap',   href: '#roadmap' },
  { label: 'Certs',     href: '#certs'   },
  { label: 'Labs',      href: '#labs'    },
  { label: 'Tools',     href: '#tools'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
        <div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0066FF, #00F5FF)',
            boxShadow: '0 0 8px rgba(0,245,255,0.6)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? 'bg-[#020810]/90 backdrop-blur-xl border-b border-cyan-500/10'
            : 'bg-transparent'
        }`} />

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo — favicon SVG instead of BT badge ── */}
          <motion.button
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }}
          >
            {/* Favicon SVG */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <rect width="32" height="32" rx="8" fill="#050D1A"/>
                <rect x="8" y="6" width="16" height="20" rx="3" fill="none" stroke="#00F5FF" strokeWidth="1.5"/>
                <rect x="11" y="10" width="10" height="1.5" rx="0.75" fill="#00F5FF" opacity="0.7"/>
                <rect x="11" y="13.5" width="7" height="1.5" rx="0.75" fill="#00F5FF" opacity="0.5"/>
                <circle cx="16" cy="22" r="2" fill="#00F5FF" opacity="0.9"/>
              </svg>
              {/* Glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: '0 0 16px rgba(0,245,255,0.4)' }} />
            </div>
            <span className="font-bold text-lg tracking-tight"
              style={{ background: 'linear-gradient(135deg, #FFFFFF, #A8D4FF, #00F5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              BlueTeam
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-blue-200/60 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #0055FF, #00AAFF)', boxShadow: '0 0 20px rgba(0,100,255,0.3)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,100,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#roadmap')}
            >
              Start Learning →
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-0.5 bg-cyan-400 rounded-full origin-center"
                animate={menuOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y:      i === 0 ? 8  : i === 2 ? -8  : 0,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#020810]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-2xl border border-cyan-500/15 overflow-hidden"
              style={{ background: 'rgba(5,13,26,0.95)' }}
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  className="w-full text-left px-6 py-4 text-blue-200/70 hover:text-cyan-400 border-b border-cyan-500/8 last:border-0 transition-colors text-sm font-medium"
                  onClick={() => scrollTo(link.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="p-4">
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #0055FF, #00AAFF)' }}
                  onClick={() => scrollTo('#roadmap')}
                >
                  Start Learning →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
