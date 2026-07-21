import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RESOURCES } from '../../data/content'

export default function ResourcesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="resources" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Learning Resources
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">Curated</span>{' '}
            <span className="gradient-text">Resources</span>
          </h2>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto">
            Hand-picked books, courses, and free content to accelerate your Blue Team journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((res, i) => (
            <motion.div
              key={res.type}
              className="glass-card rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-400/20 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <h3 className="text-base font-bold text-white mb-5 group-hover:text-cyan-400 transition-colors">
                {res.type}
              </h3>
              <ul className="space-y-3">
                {res.items.map((item, j) => (
                  <motion.li
                    key={j}
                    className="flex items-start gap-2 text-sm text-blue-300/60 hover:text-blue-200 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                  >
                    <span className="text-cyan-500/50 mt-0.5 shrink-0">▸</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
