import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic'

const HeroScene = lazy(() => import('../3d/HeroScene'))

// ── Typing animation ──────────────────────────────────────────
const ROLES = ['SOC Analyst', 'Threat Hunter', 'IR Specialist', 'Forensics Expert', 'Detection Engineer']

function TypedRole() {
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)

  useEffect(() => {
    const word = ROLES[idx]
    const timeout = setTimeout(() => {
      if (!del && text.length < word.length) {
        setText(word.slice(0, text.length + 1))
      } else if (!del && text.length === word.length) {
        setTimeout(() => setDel(true), 2000)
      } else if (del && text.length > 0) {
        setText(text.slice(0, -1))
      } else if (del && text.length === 0) {
        setDel(false)
        setIdx((i) => (i + 1) % ROLES.length)
      }
    }, del ? 35 : 80)
    return () => clearTimeout(timeout)
  }, [text, del, idx])

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span className="ml-0.5 inline-block w-0.5 h-8 md:h-10 bg-cyan-400 align-middle animate-[blink_1s_ease-in-out_infinite]" />
    </span>
  )
}

// ── Live threat feed ticker ────────────────────────────────────
const THREAT_ITEMS = [
  '🔴 APT29 — Spearphishing detected',
  '🟡 Lateral movement — DC01',
  '🔵 Sigma rule matched — T1055',
  '🔴 Ransomware IOC — blocked',
  '🟢 Incident contained — IR Team',
  '🟡 Suspicious PowerShell — endpoint',
  '🔵 MITRE T1003 — lsass access',
  '🔴 C2 beacon — Cobalt Strike',
  '🟢 Threat hunt complete — clean',
  '🟡 New CVE — patch deployed',
]

function ThreatTicker() {
  const [pos, setPos] = useState(0)
  const containerRef  = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setPos((p) => p - 1), 30)
    return () => clearInterval(id)
  }, [])

  // Reset when scrolled enough
  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.scrollWidth / 2
      if (Math.abs(pos) >= w) setPos(0)
    }
  }, [pos])

  const items = [...THREAT_ITEMS, ...THREAT_ITEMS]

  return (
    <div className="overflow-hidden border-y border-cyan-500/10 bg-[#020810]/60 backdrop-blur-sm py-2.5">
      <div
        ref={containerRef}
        className="flex gap-8 whitespace-nowrap"
        style={{ transform: `translateX(${pos}px)`, transition: 'none' }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-xs font-mono text-cyan-400/60 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Animated stat card ────────────────────────────────────────
function StatCard({ val, label, delay }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative px-5 py-4 rounded-2xl border border-cyan-500/10 bg-[#060E1E]/80 backdrop-blur-sm overflow-hidden group-hover:border-cyan-400/25 transition-all duration-300">
        {/* Glow bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-none mb-1">
            {val}
          </div>
          <div className="text-[10px] text-blue-400/50 uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

// ── HUD corner decorations ────────────────────────────────────
function HUDCorner({ position = 'tl', className = '' }) {
  const corners = {
    tl: 'top-0 left-0 border-t border-l rounded-tl-lg',
    tr: 'top-0 right-0 border-t border-r rounded-tr-lg',
    bl: 'bottom-0 left-0 border-b border-l rounded-bl-lg',
    br: 'bottom-0 right-0 border-b border-r rounded-br-lg',
  }
  return (
    <div className={`absolute w-5 h-5 border-cyan-400/30 ${corners[position]} ${className}`} />
  )
}

// ── Floating badge ────────────────────────────────────────────
function FloatingBadge({ icon, label, value, x, y, delay }) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-cyan-500/15 bg-[#060E1E]/90 backdrop-blur-md"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <span className="text-lg">{icon}</span>
      </motion.div>
      <div>
        <div className="text-[10px] text-blue-400/50 uppercase tracking-wider">{label}</div>
        <div className="text-xs font-bold text-white">{value}</div>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1" />
    </motion.div>
  )
}

// ── Main hero ─────────────────────────────────────────────────
export default function Hero() {
  const primaryMag   = useMagnetic(0.22)
  const secondaryMag = useMagnetic(0.18)
  const mouseX       = useMotionValue(0)
  const mouseY       = useMotionValue(0)
  const springX      = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY      = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const bgX          = useTransform(springX, [-1, 1], ['-2%', '2%'])
  const bgY          = useTransform(springY, [-1, 1], ['-2%', '2%'])

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* ── Deep space background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* Base dark */}
        <div className="absolute inset-0 bg-[#020810]" />
        {/* Blue nebula */}
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-700/12 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/20 blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#020810]/80" />
      </motion.div>

      {/* ── Threat ticker ── */}
      <div className="relative z-20 pt-20">
        <ThreatTicker />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">

            {/* ── LEFT — Text content ── */}
            <div className="relative z-10">

              {/* System status badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider">SOC SYSTEMS ONLINE</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/15 bg-cyan-500/5">
                  <span className="text-[10px] font-mono text-cyan-400/60">v2025.1</span>
                </div>
              </motion.div>

              {/* Main heading */}
              <div className="overflow-hidden mb-3">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-400/50">
                    ▸ Blue Team Cybersecurity
                  </span>
                </motion.div>
              </div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-white">Defend.</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-2">
                <motion.h1
                  className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-white">Detect.</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Dominate.
                  </span>
                </motion.h1>
              </div>

              {/* Typed role */}
              <motion.div
                className="text-xl md:text-2xl font-semibold text-white/60 mb-6 h-9 md:h-11 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Become a&nbsp;<TypedRole />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base text-blue-300/50 leading-relaxed mb-10 max-w-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                The most complete Blue Team roadmap ever built. 7 phases, 50+ topics, real tools, certifications, and labs — structured from zero to professional.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-3 mb-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div {...primaryMag}>
                  <button
                    className="group relative px-7 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #0055FF, #0099FF)',
                      boxShadow: '0 0 30px rgba(0,100,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                    onClick={() => document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      <span>⚡</span>
                      Start the Roadmap
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </button>
                </div>

                <div {...secondaryMag}>
                  <button
                    className="px-7 py-3.5 rounded-xl font-semibold text-sm text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/40 transition-all duration-200"
                    onClick={() => document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Labs
                  </button>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard val="7"     label="Phases"      delay={1.2} />
                <StatCard val="50+"   label="Topics"      delay={1.3} />
                <StatCard val="10+"   label="Certs"       delay={1.4} />
                <StatCard val="$120K" label="Avg Salary"  delay={1.5} />
              </div>
            </div>

            {/* ── RIGHT — 3D scene with HUD overlay ── */}
            <div className="relative h-[450px] md:h-[560px] lg:h-[700px]">

              {/* HUD frame */}
              <div className="absolute inset-4 rounded-2xl border border-cyan-500/8 pointer-events-none z-20">
                <HUDCorner position="tl" />
                <HUDCorner position="tr" />
                <HUDCorner position="bl" />
                <HUDCorner position="br" />

                {/* HUD labels */}
                <div className="absolute top-3 left-6 text-[9px] font-mono text-cyan-400/30 uppercase tracking-widest">
                  DEFENSE_CORE_v2.0
                </div>
                <div className="absolute top-3 right-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-pulse" />
                  <span className="text-[9px] font-mono text-cyan-400/30 uppercase">SCANNING</span>
                </div>
                <div className="absolute bottom-3 left-6 text-[9px] font-mono text-cyan-400/20">
                  THREAT_LVL: LOW // SHIELDS: ACTIVE
                </div>
                <div className="absolute bottom-3 right-6 text-[9px] font-mono text-cyan-400/20">
                  {'{ 0x00F5FF }'}
                </div>

                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
                  animate={{ top: ['5%', '95%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* 3D Canvas */}
              <div className="absolute inset-0 z-10">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-cyan-400/30 text-sm font-mono animate-pulse">LOADING_CORE...</div>
                  </div>
                }>
                  <HeroScene />
                </Suspense>
              </div>

              {/* Floating info badges */}
              <FloatingBadge icon="🛡️" label="Shield Status" value="ACTIVE"    x="0%"  y="15%"  delay={1.6} />
              <FloatingBadge icon="🔍" label="Threats Today"  value="247 blocked" x="55%" y="5%"  delay={1.8} />
              <FloatingBadge icon="⚡" label="Alerts Triaged" value="12 / 12"  x="60%" y="78%"  delay={2.0} />
              <FloatingBadge icon="🎯" label="MITRE Coverage" value="94%"      x="-5%" y="72%"  delay={2.2} />

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full bg-cyan-500/8 blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="relative z-20 flex flex-col items-center pb-10 gap-2 cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        onClick={() => document.querySelector('#what')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono text-blue-400/30 uppercase tracking-[0.3em]">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-400/30 to-transparent" />
      </motion.div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050D1A] to-transparent z-10 pointer-events-none" />
    </section>
  )
}