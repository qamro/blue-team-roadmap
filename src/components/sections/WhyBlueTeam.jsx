import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { WHY_REASONS } from '../../data/content'

// Animated counter
function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView }   = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    const isFloat  = target.toString().includes('.')
    const num      = parseFloat(target)
    const duration = 2000
    const steps    = 60
    const step     = duration / steps
    let current    = 0

    const timer = setInterval(() => {
      current++
      const val = (num * current) / steps
      setCount(isFloat ? val.toFixed(1) : Math.floor(val))
      if (current >= steps) clearInterval(timer)
    }, step)

    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const CAREER_PATHS = [
  { role: 'SOC Analyst L1',      salary: '$55K–$75K',   icon: '👁️',  desc: 'Alert monitoring and triage' },
  { role: 'SOC Analyst L2',      salary: '$75K–$95K',   icon: '🔍',  desc: 'Incident investigation' },
  { role: 'SOC Analyst L3',      salary: '$95K–$120K',  icon: '⚡',  desc: 'Threat hunting & advanced IR' },
  { role: 'Threat Hunter',       salary: '$110K–$140K', icon: '🎯',  desc: 'Proactive threat detection' },
  { role: 'IR Specialist',       salary: '$100K–$135K', icon: '🚨',  desc: 'Incident response & recovery' },
  { role: 'DFIR Analyst',        salary: '$105K–$140K', icon: '🔬',  desc: 'Digital forensics & IR' },
  { role: 'Detection Engineer',  salary: '$120K–$155K', icon: '⚙️',  desc: 'Building detection logic' },
  { role: 'Blue Team Lead',      salary: '$140K–$180K', icon: '🛡️',  desc: 'Team leadership & strategy' },
]

const TIMELINE = [
  { month: 'Month 1–2',  title: 'Foundations',       desc: 'Linux, networking, OS internals' },
  { month: 'Month 3–4',  title: 'Security Basics',   desc: 'Cryptography, firewalls, IDS/IPS' },
  { month: 'Month 5–6',  title: 'SIEM & Logging',    desc: 'Splunk, Elastic, log analysis' },
  { month: 'Month 7–8',  title: 'SOC Operations',    desc: 'Alert triage, MITRE ATT&CK, IR' },
  { month: 'Month 9–10', title: 'Forensics & Hunt',  desc: 'Memory forensics, threat hunting' },
  { month: 'Month 11–12',title: 'Cloud & Advanced',  desc: 'Azure/AWS security, certifications' },
  { month: 'Month 12+',  title: 'Job Ready 🚀',      desc: 'Portfolio, interviews, first role' },
]

export default function WhyBlueTeam() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="why" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

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
            Why Blue Team
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text-white">The Most In-Demand</span>
            <br />
            <span className="gradient-text">Cybersecurity Career</span>
          </h2>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto">
            The world needs defenders more than ever. Blue Team skills are the most sought-after in the entire cybersecurity industry.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {WHY_REASONS.map((r, i) => (
            <motion.div
              key={r.label}
              className="glass-card rounded-2xl p-6 text-center border border-cyan-500/10 group hover:border-cyan-400/30 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <div className="text-3xl mb-3">{r.icon}</div>
              <div className="text-2xl md:text-3xl font-black gradient-text mb-1">{r.stat}</div>
              <div className="text-xs text-blue-300/50 leading-snug">{r.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Two columns: timeline + career paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              📅 Your 12-Month Journey
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-blue-500/30 to-transparent" />

              <div className="space-y-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6 pl-12 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-navy-DEFAULT shadow-[0_0_8px_rgba(0,245,255,0.6)]" />

                    <div className="glass-card rounded-xl px-4 py-3 flex-1 border border-cyan-500/10 hover:border-cyan-400/20 transition-colors group">
                      <div className="text-xs text-cyan-400/70 font-mono mb-1">{item.month}</div>
                      <div className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">{item.title}</div>
                      <div className="text-xs text-blue-300/50 mt-0.5">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Career paths */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              💼 Career Paths & Salaries
            </h3>
            <div className="space-y-3">
              {CAREER_PATHS.map((path, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-xl px-4 py-3 border border-cyan-500/10 flex items-center gap-4 group hover:border-cyan-400/30 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-xl">{path.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 transition-colors">{path.role}</div>
                    <div className="text-xs text-blue-300/40">{path.desc}</div>
                  </div>
                  <div className="text-xs font-bold text-cyan-400 shrink-0">{path.salary}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
