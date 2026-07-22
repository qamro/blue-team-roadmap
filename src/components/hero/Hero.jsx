import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
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
      if (!del && text.length < word.length) setText(word.slice(0, text.length + 1))
      else if (!del && text.length === word.length) setTimeout(() => setDel(true), 2000)
      else if (del && text.length > 0) setText(text.slice(0, -1))
      else if (del && text.length === 0) { setDel(false); setIdx((i) => (i + 1) % ROLES.length) }
    }, del ? 35 : 80)
    return () => clearTimeout(timeout)
  }, [text, del, idx])

  return (
    <span>
      <span className="text-cyan-400">{text}</span>
      <span className="inline-block w-[2px] h-7 bg-cyan-400 align-middle ml-0.5 animate-[blink_1s_ease-in-out_infinite]" />
    </span>
  )
}

// ── Live threat feed ──────────────────────────────────────────
const THREATS = [
  { level: 'CRIT', color: '#FF4444', msg: 'APT29 Spearphishing Campaign Detected' },
  { level: 'HIGH', color: '#FF8800', msg: 'Lateral Movement — Domain Controller' },
  { level: 'MED',  color: '#FFD700', msg: 'Sigma Rule T1055 Matched — Injection' },
  { level: 'CRIT', color: '#FF4444', msg: 'Ransomware IOC Blocked — Endpoint-07' },
  { level: 'INFO', color: '#00F5FF', msg: 'Threat Hunt Complete — Environment Clean' },
  { level: 'HIGH', color: '#FF8800', msg: 'Suspicious PowerShell — WS-214' },
  { level: 'CRIT', color: '#FF4444', msg: 'C2 Beacon Detected — Cobalt Strike' },
  { level: 'MED',  color: '#FFD700', msg: 'LSASS Access Attempt — T1003.001' },
  { level: 'INFO', color: '#00F5FF', msg: 'Incident Contained — IR Team Responded' },
  { level: 'HIGH', color: '#FF8800', msg: 'New CVE-2025-1337 — Patch Deployed' },
]

function ThreatFeed() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % THREATS.length), 2200)
    return () => clearInterval(id)
  }, [])
  const t = THREATS[active]
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5 bg-black/30 backdrop-blur-sm overflow-hidden" style={{ minWidth: 320 }}>
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
        <span className="text-[9px] font-mono font-bold" style={{ color: t.color }}>{t.level}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          className="text-[11px] font-mono text-white/50 truncate"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {t.msg}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// ── Terminal window ───────────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0.5,  color: '#00F5FF', text: '$ soc-monitor --status' },
  { delay: 1.2,  color: '#7EC88A', text: '✓ SIEM Connected — Splunk Enterprise' },
  { delay: 1.9,  color: '#7EC88A', text: '✓ EDR Active — 2,847 endpoints' },
  { delay: 2.6,  color: '#7EC88A', text: '✓ Threat Intel Feed — MISP Online' },
  { delay: 3.3,  color: '#FFD700', text: '⚡ 247 alerts triaged today' },
  { delay: 4.0,  color: '#00F5FF', text: '$ mitre-navigator --coverage' },
  { delay: 4.7,  color: '#7EC88A', text: '✓ ATT&CK Coverage: 94.2%' },
  { delay: 5.4,  color: '#00F5FF', text: '$ threat-hunt --hypothesis active' },
  { delay: 6.1,  color: '#A78BFA', text: '→ Hunting: T1055 Process Injection...' },
]

function TerminalWidget() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown >= TERMINAL_LINES.length) return
    const t = setTimeout(() => setShown(s => s + 1), TERMINAL_LINES[shown]?.delay * 1000 || 500)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/8"
      style={{ background: 'rgba(2,8,20,0.95)', backdropFilter: 'blur(20px)' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] font-mono text-white/25 ml-2">SOC Terminal — root@blueteam</span>
      </div>
      {/* Lines */}
      <div className="p-4 space-y-1.5 min-h-[180px]">
        {TERMINAL_LINES.slice(0, shown).map((line, i) => (
          <motion.div
            key={i}
            className="text-[11px] font-mono"
            style={{ color: line.color }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {line.text}
            {i === shown - 1 && (
              <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 animate-[blink_0.8s_ease-in-out_infinite] align-middle" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── MITRE heatmap mini ────────────────────────────────────────
const TACTICS = ['Recon','Initial Access','Execution','Persistence','Priv Esc','Defense Evasion','Cred Access','Discovery','Lateral Move','Collection','Exfiltration','Impact']
function MitreWidget() {
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: 'rgba(2,8,20,0.9)', backdropFilter: 'blur(20px)' }}>
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider">MITRE ATT&CK Coverage</span>
        <span className="text-[10px] font-bold text-cyan-400">94%</span>
      </div>
      <div className="p-3 grid grid-cols-4 gap-1">
        {TACTICS.map((tac, i) => {
          const coverage = [95,88,72,90,85,78,92,88,75,80,70,95][i]
          return (
            <div key={tac} className="group relative">
              <div
                className="h-6 rounded-sm transition-all duration-300 group-hover:opacity-100"
                style={{
                  background: `rgba(0,245,255,${coverage / 200})`,
                  border: `1px solid rgba(0,245,255,${coverage / 400})`,
                  opacity: 0.7,
                }}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded text-[9px] font-mono text-white bg-black/80 border border-cyan-500/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                {tac}: {coverage}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Glowing orb background ────────────────────────────────────
function BackgroundOrbs() {
  return (
    <>
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,80,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,60,180,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
    </>
  )
}

// ── Cyber grid ────────────────────────────────────────────────
function CyberGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `
        linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }} />
  )
}

// ── Main hero ─────────────────────────────────────────────────
export default function Hero() {
  const primaryMag   = useMagnetic(0.22)
  const secondaryMag = useMagnetic(0.18)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020810]">
      <BackgroundOrbs />
      <CyberGrid />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(2,8,16,0.4) 100%)' }} />

      {/* ── Navbar spacer + top bar ── */}
      <div className="relative z-20 pt-[72px]">
        {/* Threat ticker bar */}
        <div className="border-y border-cyan-500/8 bg-black/20 backdrop-blur-sm py-2 px-6 flex items-center gap-6 overflow-hidden">
          <span className="text-[9px] font-mono text-cyan-400/50 uppercase tracking-widest shrink-0">LIVE FEED</span>
          <div className="flex gap-6 overflow-hidden">
            {THREATS.slice(0, 6).map((t, i) => (
              <motion.span
                key={i}
                className="text-[10px] font-mono shrink-0 flex items-center gap-1.5"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: t.color }} />
                <span style={{ color: t.color + '99' }}>{t.level}</span>
                <span className="text-white/30">{t.msg}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-0 min-h-[calc(100vh-120px)] items-center py-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-center">

            {/* Status row */}
            <motion.div className="flex items-center gap-3 mb-10 flex-wrap"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-400/20 bg-green-400/5">
                <motion.span className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider">SOC ONLINE</span>
              </div>
              <ThreatFeed />
            </motion.div>

            {/* Main headline */}
            <div className="space-y-0 mb-6">
              {['Defend.', 'Detect.', 'Dominate.'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    className="font-black leading-[0.88] tracking-[-0.03em]"
                    style={{
                      fontSize: 'clamp(64px, 8vw, 110px)',
                      color: i === 2 ? 'transparent' : '#FFFFFF',
                      background: i === 2 ? 'linear-gradient(135deg, #00F5FF 0%, #0088FF 50%, #00F5FF 100%)' : undefined,
                      WebkitBackgroundClip: i === 2 ? 'text' : undefined,
                      backgroundClip: i === 2 ? 'text' : undefined,
                      WebkitTextFillColor: i === 2 ? 'transparent' : undefined,
                      backgroundSize: i === 2 ? '200% auto' : undefined,
                    }}
                    initial={{ y: '110%' }}
                    animate={i === 2
                      ? { y: 0, backgroundPosition: ['0% center', '200% center', '0% center'] }
                      : { y: 0 }
                    }
                    transition={{
                      y: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
                      backgroundPosition: i === 2 ? { duration: 4, repeat: Infinity, ease: 'linear', delay: 1.5 } : {},
                    }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Typed subtitle */}
            <motion.div
              className="text-xl md:text-2xl font-medium text-white/50 mb-6 h-10 flex items-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              Become a&nbsp;<TypedRole />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base text-blue-300/40 leading-relaxed mb-10 max-w-[500px]"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            >
              From zero to SOC Professional. 7 structured phases, 50+ topics, real-world tools, certifications, and hands-on labs — the most complete Blue Team roadmap ever built.
            </motion.p>

            {/* CTA buttons */}
            <motion.div className="flex flex-wrap gap-3 mb-14"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <div {...primaryMag}>
                <button
                  className="group relative px-8 py-4 rounded-2xl font-bold text-sm text-white overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0055FF, #00AAFF)', boxShadow: '0 0 40px rgba(0,120,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)' }}
                  onClick={() => document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">⚡ Start the Roadmap <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </button>
              </div>
              <div {...secondaryMag}>
                <button
                  className="px-8 py-4 rounded-2xl font-semibold text-sm text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/40 transition-all"
                  onClick={() => document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Labs
                </button>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div className="grid grid-cols-4 gap-3"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
              {[
                { val: '7',     sub: 'Phases'     },
                { val: '50+',   sub: 'Topics'     },
                { val: '10+',   sub: 'Certs'      },
                { val: '$120K', sub: 'Avg Salary' },
              ].map((s, i) => (
                <motion.div key={s.val}
                  className="relative px-4 py-3 rounded-2xl border border-white/6 bg-white/[0.02] group hover:border-cyan-400/20 transition-all overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{s.val}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — 3D + widgets ── */}
          <div className="relative h-[600px] xl:h-[800px] flex items-center justify-center">

            {/* 3D scene fills background */}
            <div className="absolute inset-0 z-0">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div className="text-cyan-400/30 text-xs font-mono"
                    animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    INITIALIZING CORE...
                  </motion.div>
                </div>
              }>
                <HeroScene />
              </Suspense>
            </div>

            {/* ── Terminal widget — bottom left ── */}
            <motion.div
              className="absolute bottom-4 left-0 w-72 z-20"
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <TerminalWidget />
            </motion.div>

            {/* ── MITRE widget — top right ── */}
            <motion.div
              className="absolute top-8 right-0 w-64 z-20"
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <MitreWidget />
            </motion.div>

            {/* ── Alert count badge — top left ── */}
            <motion.div
              className="absolute top-8 left-4 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8"
              style={{ background: 'rgba(2,8,20,0.9)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-lg">🚨</div>
                <motion.span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border border-[#020810] text-[8px] text-white flex items-center justify-center font-bold"
                  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                >3</motion.span>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Active Alerts</div>
                <div className="text-[10px] text-white/40">Needs triage</div>
              </div>
            </motion.div>

            {/* ── Shield status badge — bottom right ── */}
            <motion.div
              className="absolute bottom-4 right-0 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl border border-cyan-500/15"
              style={{ background: 'rgba(2,8,20,0.9)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">🛡️</div>
              <div>
                <div className="text-[10px] text-cyan-400/60 uppercase tracking-wider">Defense Status</div>
                <div className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  SHIELDS ACTIVE
                </div>
              </div>
            </motion.div>

            {/* Center glow under 3D */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(0,200,255,0.1) 0%, transparent 70%)' }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-20 flex flex-col items-center pb-10 gap-2 cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        onClick={() => document.querySelector('#what')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono text-cyan-400/25 uppercase tracking-[0.3em]">scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-400/30 to-transparent" />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050D1A, transparent)' }} />
    </section>
  )
}