import { useRef, useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic'

const HeroScene = lazy(() => import('../3d/HeroScene'))

// ── Typing animation ──────────────────────────────────────────
const ROLES = ['SOC Analyst', 'Threat Hunter', 'IR Specialist', 'Forensics Expert', 'Detection Engineer', 'Blue Teamer']

function TypedRole() {
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)
  useEffect(() => {
    const word = ROLES[idx]
    const t = setTimeout(() => {
      if (!del && text.length < word.length) setText(word.slice(0, text.length + 1))
      else if (!del) setTimeout(() => setDel(true), 1800)
      else if (del && text.length > 0) setText(text.slice(0, -1))
      else { setDel(false); setIdx(i => (i + 1) % ROLES.length) }
    }, del ? 30 : 75)
    return () => clearTimeout(t)
  }, [text, del, idx])
  return (
    <span>
      <span style={{ color: '#00F5FF' }}>{text}</span>
      <span className="inline-block w-[2px] h-[0.85em] bg-cyan-400 align-middle ml-0.5"
        style={{ animation: 'blink 1s ease-in-out infinite' }} />
    </span>
  )
}

// ── Alert ticker ──────────────────────────────────────────────
const ALERTS = [
  { sev: 'CRIT', col: '#FF3333', msg: 'APT29 Spearphishing — Finance Dept' },
  { sev: 'HIGH', col: '#FF8800', msg: 'Lateral Movement — DC01 Compromised' },
  { sev: 'CRIT', col: '#FF3333', msg: 'Cobalt Strike C2 Beacon — WS-142'  },
  { sev: 'MED',  col: '#FFD700', msg: 'LSASS Dump Attempt — T1003.001'     },
  { sev: 'HIGH', col: '#FF8800', msg: 'Kerberoasting Detected — AD-01'     },
  { sev: 'INFO', col: '#00F5FF', msg: 'Threat Hunt Complete — Clean'        },
  { sev: 'CRIT', col: '#FF3333', msg: 'Ransomware IOC Blocked — Endpoint'  },
]

function AlertTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % ALERTS.length), 2500)
    return () => clearInterval(id)
  }, [])
  const a = ALERTS[idx]
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono font-bold tracking-widest text-white/30 uppercase shrink-0 hidden sm:block">LIVE SOC</span>
      <div className="w-px h-3 bg-white/10 shrink-0 " />
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="flex items-center gap-2"
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}>
          <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: a.col, boxShadow: `0 0 6px ${a.col}` }} />
          <span className="text-[10px] font-mono font-bold shrink-0" style={{ color: a.col }}>{a.sev}</span>
          <span className="text-[10px] font-mono text-white/40 truncate max-w-[260px]">{a.msg}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Stat counter ──────────────────────────────────────────────
function StatPill({ val, label, color = '#00F5FF' }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-xl border border-white/6"
      style={{ background: 'rgba(0,10,30,0.6)', backdropFilter: 'blur(20px)' }}>
      <span className="text-xl font-black" style={{ color }}>{val}</span>
      <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  )
}

// ── HUD corner decoration ─────────────────────────────────────
function Corner({ pos }) {
  const cls = {
    tl: 'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
    tr: 'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
    bl: 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
    br: 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
  }[pos]
  return <div className={`absolute w-6 h-6 ${cls} border-cyan-400/30`} />
}

// ── Floating metric card ──────────────────────────────────────
function MetricCard({ icon, label, value, sub, color, delay, x, y }) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
        style={{
          background: 'rgba(2,5,18,0.88)',
          backdropFilter: 'blur(24px)',
          borderColor: color + '25',
          boxShadow: `0 0 24px ${color}10`,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: color + '18', border: `1px solid ${color}30` }}>
          {icon}
        </div>
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider" style={{ color: color + '80' }}>{label}</div>
          <div className="text-sm font-bold text-white leading-tight">{value}</div>
          {sub && <div className="text-[9px] text-white/30 mt-0.5">{sub}</div>}
        </div>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse ml-1 shrink-0" style={{ background: color }} />
      </motion.div>
    </motion.div>
  )
}

// ── Terminal lines ────────────────────────────────────────────
const TERM = [
  { d: 0.8,  c: '#00F5FF', t: '$ siem-connect --host splunk-prod' },
  { d: 1.5,  c: '#00FF88', t: '✓ Connected — 2,847 endpoints online' },
  { d: 2.2,  c: '#00F5FF', t: '$ threat-intel --feed MISP,OTX' },
  { d: 2.9,  c: '#00FF88', t: '✓ 14,203 IOCs loaded — TLP:GREEN' },
  { d: 3.6,  c: '#FFD700', t: '⚡ alert-triage --queue 247' },
  { d: 4.3,  c: '#00F5FF', t: '$ hunt --hypothesis "T1055 Injection"' },
  { d: 5.0,  c: '#A78BFA', t: '→ Scanning 2,847 endpoints...' },
  { d: 5.7,  c: '#00FF88', t: '✓ MITRE coverage: 94.2% — shields UP' },
]

function MiniTerminal() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown >= TERM.length) return
    const t = setTimeout(() => setShown(s => s + 1), TERM[shown].d * 1000)
    return () => clearTimeout(t)
  }, [shown])
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8"
      style={{ background: 'rgba(1,4,14,0.95)', backdropFilter: 'blur(24px)' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <div className="flex gap-1.5">
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
        <span className="text-[9px] font-mono text-white/20 ml-2 flex-1">soc@blueteam:~</span>
        <span className="text-[9px] font-mono text-green-400/50">● LIVE</span>
      </div>
      <div className="p-4 space-y-1.5" style={{ minHeight: 190 }}>
        {TERM.slice(0, shown).map((line, i) => (
          <motion.div key={i} className="text-[10px] font-mono leading-relaxed" style={{ color: line.c }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
            {line.t}{i === shown - 1 && (
              <span className="inline-block w-1.5 h-3 ml-0.5 align-middle animate-[blink_0.8s_ease-in-out_infinite]"
                style={{ background: line.c }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────
export default function Hero() {
  const mouseRef   = useRef({ x: 0, y: 0 })
  const primaryMag = useMagnetic(0.2)
  const secMag     = useMagnetic(0.15)

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 700, background: '#010409' }}>

      {/* ── FULL-SCREEN 3D canvas (fills entire section) ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <motion.div className="text-[11px] font-mono text-cyan-400/30 uppercase tracking-[0.3em]"
              animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
              INITIALIZING DEFENSE CORE...
            </motion.div>
          </div>
        }>
          <HeroScene mouseRef={mouseRef} />
        </Suspense>
      </div>

      {/* ── Dark vignette overlay for readability ── */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, rgba(1,4,9,0.55) 100%),
          linear-gradient(to right, rgba(1,4,9,0.75) 0%, rgba(1,4,9,0.1) 45%, rgba(1,4,9,0.1) 55%, rgba(1,4,9,0.6) 100%),
          linear-gradient(to bottom, rgba(1,4,9,0.7) 0%, transparent 15%, transparent 80%, rgba(1,4,9,0.9) 100%)
        `,
      }} />

      {/* ── HUD frame overlay ── */}
      <div className="absolute inset-4 z-10 pointer-events-none rounded-2xl">
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />
        {/* Top labels */}
        <div className="absolute top-4 left-6 text-[9px] font-mono text-cyan-400/25 uppercase tracking-[0.25em]">
          BLUETEAM_OS // DEFENSE_CORE_v3.1
        </div>
        <div className="absolute top-4 right-6 flex items-center gap-2">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span className="text-[9px] font-mono text-green-400/50 uppercase tracking-widest">SYSTEMS NOMINAL</span>
        </div>
        {/* Bottom labels */}
        <div className="absolute bottom-4 left-6 text-[9px] font-mono text-cyan-400/20">
          SHIELDS: ACTIVE // THREAT_LVL: ELEVATED // IR_TEAM: STANDBY
        </div>
        <div className="absolute bottom-4 right-6 text-[9px] font-mono text-cyan-400/20">
          LAT: 36.7°N // LON: 3.0°E // NODE: DZ-SOC-01
        </div>
        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.12), transparent)' }}
          animate={{ top: ['4%', '94%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
      </div>

      {/* ── Top alert bar ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-3 border-b border-cyan-500/8"
        style={{ background: 'rgba(1,4,9,0.7)', backdropFilter: 'blur(20px)', paddingTop: 76 }}
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
        <AlertTicker />
        <div className="hidden md:flex items-center gap-4">
          <div className="text-[9px] font-mono text-white/20">247 alerts today</div>
          <div className="w-px h-4 bg-white/10" />
          <div className="text-[9px] font-mono text-green-400/50">94% MITRE coverage</div>
        </div>
      </motion.div>

      {/* ── Floating metric cards ── */}
      <MetricCard icon="🚨" label="Active Alerts"   value="3 Critical"  sub="Needs triage"   color="#FF4444" delay={2.0} x="2%"  y="24%" />
      <MetricCard icon="🛡️" label="Shield Status"   value="ACTIVE"      sub="All systems UP"  color="#00F5FF" delay={2.2} x="2%"  y="49%" />
      <MetricCard icon="⚡" label="Alerts Triaged"  value="244 / 247"   sub="Today's queue"   color="#FFD700" delay={2.4} x="2%" y="74%" />
      <MetricCard icon="🎯" label="MITRE Coverage"  value="94.2%"       sub="ATT&CK mapped"   color="#A78BFA" delay={2.6} x="77%" y="22%" />
      <MetricCard icon="🔍" label="Threat Hunts"    value="12 Active"   sub="Hypotheses open" color="#00FF88" delay={2.8} x="77%" y="48%" />

      {/* ── LEFT — Main text content ── */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none"
        style={{ paddingTop: 120 }}>
        <div className="max-w-7xl mx-auto px-8 w-full pointer-events-auto" style={{ paddingLeft: '5%' }}>
          <div className="max-w-[560px]">

            {/* Badge */}
            <motion.div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-lg border border-cyan-500/20"
              style={{ background: 'rgba(0,245,255,0.05)', backdropFilter: 'blur(12px)' }}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-[0.2em]">
                Blue Team Cybersecurity Roadmap 2025
              </span>
            </motion.div>

            {/* Headline — 3 lines staggered */}
            {['Defend.', 'Detect.', 'Dominate.'].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.div
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.6 + i * 0.14, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="font-black leading-[0.87] tracking-[-0.04em]"
                    style={{
                      fontSize: 'clamp(60px, 8.5vw, 118px)',
                      color: i < 2 ? '#FFFFFF' : 'transparent',
                      background: i === 2
                        ? 'linear-gradient(135deg, #00F5FF 0%, #0066FF 40%, #00AAFF 70%, #00F5FF 100%)'
                        : undefined,
                      WebkitBackgroundClip: i === 2 ? 'text' : undefined,
                      WebkitTextFillColor: i === 2 ? 'transparent' : undefined,
                      backgroundClip: i === 2 ? 'text' : undefined,
                      textShadow: i < 2 ? '0 0 80px rgba(255,255,255,0.08)' : undefined,
                    }}>
                    {word}
                  </h1>
                </motion.div>
              </div>
            ))}

            {/* Typed role */}
            <motion.div className="text-xl md:text-2xl font-semibold mt-6 mb-5 h-9 flex items-center"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              Become a&nbsp;<TypedRole />
            </motion.div>

            {/* Description */}
            <motion.p className="text-sm leading-relaxed mb-10 max-w-[440px]"
              style={{ color: 'rgba(148,185,255,0.45)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
              The most complete Blue Team roadmap ever built: 7 phases, 50+ topics, real-world tools, certifications and labs. Zero to SOC Professional.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
              <div {...primaryMag}>
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0044EE 0%, #0099FF 100%)',
                    boxShadow: '0 0 40px rgba(0,120,255,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                  onClick={() => document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2.5">
                    <span>⚡</span>
                    Start the Roadmap
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </button>
              </div>
              <div {...secMag}>
                <button
                  className="px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(0,245,255,0.05)',
                    border: '1px solid rgba(0,245,255,0.18)',
                    color: '#00F5FF',
                    backdropFilter: 'blur(12px)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.18)' }}
                  onClick={() => document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Labs
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div className="flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
              {[
                { val: '7',     label: 'Phases',    color: '#00F5FF' },
                { val: '50+',   label: 'Topics',    color: '#0099FF' },
                { val: '10+',   label: 'Certs',     color: '#A78BFA' },
                { val: '$120K', label: 'Avg Salary', color: '#00FF88' },
              ].map(s => <StatPill key={s.val} {...s} />)}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM RIGHT — Mini terminal ── */}
      <motion.div
        className="absolute bottom-16 right-6 z-20 w-72 hidden xl:block"
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <MiniTerminal />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        onClick={() => document.querySelector('#what')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.4em]">explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-400/25 to-transparent" />
        <div className="w-4 h-4 rounded-full border border-cyan-400/20 flex items-center justify-center">
          <motion.div className="w-1 h-1 rounded-full bg-cyan-400/60"
            animate={{ y: [0, 3, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }} />
        </div>
      </motion.div>
    </section>
  )
}