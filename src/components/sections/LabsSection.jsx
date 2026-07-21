import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LABS } from '../../data/content'

function LabCard({ lab, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.a
      ref={ref}
      href={lab.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group block glass-card rounded-2xl p-6 border border-cyan-500/10 overflow-hidden transition-all duration-300 hover:border-cyan-400/30"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 30% 50%, ${lab.color}10, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative mb-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border transition-all duration-300 group-hover:scale-110"
          style={{
            background:  `${lab.color}18`,
            borderColor: `${lab.color}44`,
          }}
        >
          {lab.icon}
        </div>
        <div
          className="absolute inset-0 w-14 h-14 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ background: lab.color }}
        />
      </div>

      {/* Content */}
      <h3
        className="text-lg font-bold mb-2 transition-colors duration-200 group-hover:text-cyan-300"
        style={{ color: '#E8F4FF' }}
      >
        {lab.name}
      </h3>
      <p className="text-sm text-blue-300/50 leading-relaxed mb-4">{lab.desc}</p>

      {/* CTA */}
      <div
        className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
        style={{ color: lab.color }}
      >
        Visit Platform
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          →
        </motion.span>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${lab.color}, transparent)` }}
      />
    </motion.a>
  )
}

export default function LabsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="labs" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />

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
            Practice Platforms
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">Learn by</span>
            <br />
            <span className="gradient-text">Doing</span>
          </h2>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto">
            Theory is only the beginning. These platforms give you real-world scenarios, live alerts, and hands-on investigations to sharpen your skills.
          </p>
        </motion.div>

        {/* Lab cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LABS.map((lab, i) => (
            <LabCard key={lab.name} lab={lab} index={i} />
          ))}
        </div>

        {/* Bottom tip */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-blue-300/40">
            💡 Pro tip: Start with <span className="text-cyan-400">TryHackMe</span> SOC Path, then move to <span className="text-cyan-400">LetsDefend</span> for real SOC simulation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
