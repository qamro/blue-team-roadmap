import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ROADMAP } from '../../data/content'

function TopicCard({ topic, index, color, glow }) {
  return (
    <motion.div
      className="glass-card rounded-xl p-4 border border-white/5 group cursor-default"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -4, borderColor: `${color}44` }}
      style={{ '--glow': glow }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {topic.name}
        </h4>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 border"
          style={{ color, borderColor: `${color}44`, background: `${color}11` }}
        >
          {topic.time}
        </span>
      </div>
      <p className="text-xs text-blue-300/50 leading-relaxed">{topic.desc}</p>

      {/* Hover glow line */}
      <div
        className="h-px mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

function PhaseCard({ phase, isActive, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Phase header button */}
      <motion.button
        className="w-full text-left"
        onClick={onClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.99 }}
      >
        <div
          className={`relative rounded-2xl p-5 border transition-all duration-300 overflow-hidden ${
            isActive
              ? 'border-opacity-50 bg-[#0A1628]/80'
              : 'border-white/5 bg-[#080F1E]/60 hover:border-white/10'
          }`}
          style={{
            borderColor: isActive ? `${phase.color}55` : undefined,
            boxShadow:   isActive ? `0 0 30px ${phase.glow}, inset 0 0 30px ${phase.glow}` : 'none',
          }}
        >
          {/* Animated background when active */}
          {isActive && (
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(circle at 20% 50%, ${phase.color}, transparent 70%)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
            />
          )}

          <div className="relative flex items-center gap-4">
            {/* Phase number */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black border shrink-0"
              style={{
                background:  `${phase.color}18`,
                borderColor: `${phase.color}44`,
                color:        phase.color,
                boxShadow:    isActive ? `0 0 20px ${phase.glow}` : 'none',
              }}
            >
              <span className="text-lg">{phase.icon}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-widest"
                  style={{ color: phase.color }}
                >
                  Phase {phase.phase}
                </span>
                <span className="text-[10px] text-blue-400/40 font-mono">
                  {phase.topics.length} topics
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{phase.title}</h3>
            </div>

            {/* Expand icon */}
            <motion.div
              className="text-blue-400/40 shrink-0"
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 10L3 5h10z"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expandable topics */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-2">
              {/* Connector line */}
              <div className="flex gap-4">
                <div className="w-12 flex justify-center shrink-0">
                  <div
                    className="w-px h-full"
                    style={{ background: `linear-gradient(180deg, ${phase.color}60, transparent)` }}
                  />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pb-4">
                  {phase.topics.map((topic, i) => (
                    <TopicCard
                      key={topic.name}
                      topic={topic}
                      index={i}
                      color={phase.color}
                      glow={phase.glow}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function RoadmapSection() {
  const [activePhase, setActivePhase] = useState(0) // 0 = first phase open by default
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  function togglePhase(idx) {
    setActivePhase(activePhase === idx ? null : idx)
  }

  const totalTopics = ROADMAP.reduce((s, p) => s + p.topics.length, 0)

  return (
    <section id="roadmap" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Complete Roadmap
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">From Zero to</span>
            <br />
            <span className="gradient-text">SOC Professional</span>
          </h2>

          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto mb-8">
            {ROADMAP.length} structured phases · {totalTopics} topics · Estimated 12 months to job-ready
          </p>

          {/* Phase progress pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {ROADMAP.map((phase, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  borderColor: activePhase === i ? phase.color : `${phase.color}33`,
                  background:  activePhase === i ? `${phase.color}22` : 'transparent',
                  color:       activePhase === i ? phase.color : `${phase.color}88`,
                }}
              >
                {phase.icon} {phase.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Roadmap phases */}
        <div className="space-y-3">
          {ROADMAP.map((phase, i) => (
            <PhaseCard
              key={phase.phase}
              phase={phase}
              isActive={activePhase === i}
              onClick={() => togglePhase(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 glass-card rounded-2xl p-8 border border-cyan-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2">Ready to start your journey?</h3>
          <p className="text-blue-300/50 text-sm mb-6 max-w-md mx-auto">
            Pick Phase 1 and start today. Every expert was once a beginner.
          </p>
          <motion.button
            className="px-8 py-3 rounded-xl font-semibold text-sm btn-primary text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActivePhase(0)}
          >
            Start Phase 1 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
