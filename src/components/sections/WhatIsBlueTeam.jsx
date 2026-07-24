import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BLUE_TEAM_CARDS } from '../../data/content'

function Card({ card, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-2xl p-6 roadmap-node border border-cyan-500/10 group"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Icon */}
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900/80 to-cyan-900/40 flex items-center justify-center text-2xl border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
          {card.icon}
        </div>
        <div className="absolute inset-0 w-14 h-14 rounded-xl bg-cyan-400/5 blur-lg group-hover:bg-cyan-400/10 transition-all" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-blue-300/60 leading-relaxed">
        {card.desc}
      </p>

      {/* Bottom accent */}
      <div className={`h-0.5 mt-5 rounded-full bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  )
}

export default function WhatIsBlueTeam() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="what" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Foundation
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">What is</span>{' '}
            <span className="gradient-text">Blue Team?</span>
          </h2>

          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto leading-relaxed">
            Blue Teams are the guardians of the digital world, the cybersecurity professionals who stand between your data and the adversaries who want it.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLUE_TEAM_CARDS.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <blockquote className="text-xl md:text-2xl font-medium text-blue-200/40 italic max-w-3xl mx-auto">
            "While attackers only need to succeed once, defenders must succeed every single time."
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
