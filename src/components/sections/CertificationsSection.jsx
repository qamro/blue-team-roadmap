import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CERTS } from '../../data/content'

const LEVEL_ORDER = ['Entry', 'Intermediate', 'Advanced', 'Expert']
const LEVEL_COLORS = {
  Entry:        { bg: 'rgba(0,102,255,0.12)',  border: 'rgba(0,102,255,0.3)',  text: '#4488FF' },
  Intermediate: { bg: 'rgba(0,163,255,0.12)', border: 'rgba(0,163,255,0.3)', text: '#00A3FF' },
  Advanced:     { bg: 'rgba(0,220,255,0.12)', border: 'rgba(0,220,255,0.3)', text: '#00DCff' },
  Expert:       { bg: 'rgba(0,245,255,0.15)', border: 'rgba(0,245,255,0.4)', text: '#00F5FF' },
}

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)
  const lc = LEVEL_COLORS[cert.level] || LEVEL_COLORS.Entry

  return (
    <motion.a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-2xl p-5 border group transition-all duration-300 block"
      style={{
        background:  hovered ? lc.bg : 'rgba(10,20,45,0.5)',
        borderColor: hovered ? lc.border : 'rgba(0,245,255,0.08)',
        boxShadow:   hovered ? `0 0 30px ${lc.border}` : 'none',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Level badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border"
        style={{ background: lc.bg, borderColor: lc.border, color: lc.text }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: lc.text }} />
        {cert.level}
      </div>

      {/* Cert name */}
      <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
        {cert.name}
      </h3>

      {/* Org */}
      <div className="text-xs text-blue-300/50 mb-3">{cert.org}</div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-[10px] text-blue-400/40 font-mono">⏱ {cert.time}</span>
        <motion.span
          className="text-[10px] font-semibold flex items-center gap-1"
          style={{ color: lc.text }}
          animate={{ opacity: hovered ? 1 : 0 }}
        >
          Learn more →
        </motion.span>
      </div>

      {/* Corner glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${lc.border}, transparent 70%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  )
}

export default function CertificationsSection() {
  const [filter, setFilter] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = filter === 'All' ? CERTS : CERTS.filter((c) => c.level === filter)

  return (
    <section id="certs" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Certifications
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">Validate Your</span>
            <br />
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto">
            Industry-recognized certifications that prove your Blue Team skills to employers worldwide. Click any card to visit the official certification page.
          </p>
        </motion.div>

        {/* Level filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {['All', ...LEVEL_ORDER].map((lvl) => {
            const lc = LEVEL_COLORS[lvl] || { text: '#00F5FF', border: 'rgba(0,245,255,0.3)', bg: 'rgba(0,245,255,0.1)' }
            const active = filter === lvl
            return (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200"
                style={{
                  borderColor: active ? lc.border : 'rgba(0,245,255,0.1)',
                  background:  active ? lc.bg    : 'transparent',
                  color:       active ? lc.text  : 'rgba(147,197,253,0.5)',
                }}
              >
                {lvl}
              </button>
            )
          })}
        </motion.div>

        {/* Cert path visualization */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center gap-0 min-w-max mx-auto">
            {LEVEL_ORDER.map((lvl, i) => {
              const lc     = LEVEL_COLORS[lvl]
              const certsL = CERTS.filter((c) => c.level === lvl)
              return (
                <div key={lvl} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center border text-center p-2"
                      style={{ background: lc.bg, borderColor: lc.border }}
                    >
                      <div className="text-xs font-bold" style={{ color: lc.text }}>{lvl}</div>
                      <div className="text-[10px] text-blue-300/40 mt-1">{certsL.length} certs</div>
                    </div>
                  </div>
                  {i < LEVEL_ORDER.length - 1 && (
                    <div className="flex items-center px-2">
                      <div className="w-12 h-px bg-gradient-to-r from-blue-500/30 to-cyan-500/30" />
                      <div className="text-cyan-400/40 text-xs">→</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cert cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((cert, i) => (
              <CertCard key={cert.name} cert={cert} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}