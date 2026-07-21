import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TOOLS } from '../../data/content'

const CATEGORIES = ['All', ...new Set(TOOLS.map((t) => t.category))]

function ToolChip({ tool, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-default"
      style={{
        background:  hovered ? 'rgba(0,102,255,0.12)' : 'rgba(10,20,45,0.6)',
        borderColor: hovered ? 'rgba(0,245,255,0.3)'  : 'rgba(0,245,255,0.08)',
        boxShadow:   hovered ? '0 0 20px rgba(0,245,255,0.1)' : 'none',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3 }}
    >
      <span className="text-xl">{tool.icon}</span>
      <div>
        <div className="text-sm font-semibold text-white leading-none">{tool.name}</div>
        <div className="text-[10px] text-blue-400/40 mt-0.5">{tool.category}</div>
      </div>

      {/* Glow dot */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{   scale: 0, opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ToolsSection() {
  const [filter, setFilter] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = filter === 'All' ? TOOLS : TOOLS.filter((t) => t.category === filter)

  return (
    <section id="tools" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-600/5 blur-[80px]" />

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
            The Arsenal
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">Blue Team</span>
            <br />
            <span className="gradient-text">Toolbox</span>
          </h2>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto">
            Master the industry-standard tools used in real SOC environments worldwide.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 whitespace-nowrap"
              style={{
                borderColor: filter === cat ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.1)',
                background:  filter === cat ? 'rgba(0,245,255,0.1)' : 'transparent',
                color:       filter === cat ? '#00F5FF' : 'rgba(147,197,253,0.5)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Tools grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((tool, i) => (
              <ToolChip key={tool.name} tool={tool} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee scroll row */}
        <div className="mt-16 overflow-hidden">
          <div className="text-xs text-blue-400/30 text-center mb-4 uppercase tracking-widest">
            Technologies you'll master
          </div>
          <div className="relative">
            <div className="flex gap-4 animate-[scroll_20s_linear_infinite]">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/08 bg-[#0A1628]/40 shrink-0 text-sm text-blue-300/40 whitespace-nowrap"
                >
                  <span>{tool.icon}</span>
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
