import { useEffect, useRef, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic'

// Lazy import 3D scene
import { lazy } from 'react'
const HeroScene = lazy(() => import('../3d/HeroScene'))

const TYPED_WORDS = ['SOC Analyst', 'Threat Hunter', 'IR Specialist', 'Forensics Expert', 'Blue Teamer']

function TypedText() {
  const [idx,  setIdx]  = useState(0)
  const [text, setText] = useState('')
  const [del,  setDel]  = useState(false)

  useEffect(() => {
    const word = TYPED_WORDS[idx]
    let timeout

    if (!del && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 80)
    } else if (!del && text.length === word.length) {
      timeout = setTimeout(() => setDel(true), 1800)
    } else if (del && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
    } else if (del && text.length === 0) {
      setDel(false)
      setIdx((i) => (i + 1) % TYPED_WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [text, del, idx])

  return (
    <span className="gradient-text">
      {text}
      <span className="cursor text-cyan-400">|</span>
    </span>
  )
}

// Floating particle element
function Particle({ delay, x, y, size = 2 }) {
  return (
    <motion.div
      className="absolute rounded-full bg-cyan-400"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y:       [-20, -80],
        opacity: [0, 0.8, 0],
        scale:   [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

export default function Hero() {
  const primaryMag   = useMagnetic(0.25)
  const secondaryMag = useMagnetic(0.2)
  const canvasRef    = useRef(null)

  // Animated background canvas (cyber grid)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    let offset = 0
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gridSize = 60
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.04)'
      ctx.lineWidth   = 1

      // Horizontal lines
      for (let y = (offset % gridSize) - gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
      // Vertical lines
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }

      offset += 0.3
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  function scrollToRoadmap() {
    document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToWhat() {
    document.querySelector('#what')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id:    i,
    delay: i * 0.4,
    x:     `${Math.random() * 100}%`,
    y:     `${40 + Math.random() * 50}%`,
    size:  1 + Math.random() * 3,
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Animated grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-950/40 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* 3D Scene */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none z-0 opacity-80">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            The Complete Blue Team Cybersecurity Roadmap 2025
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-black leading-[1.08] tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gradient-text-white">Become a</span>
            <br />
            <span className="gradient-text-white">Blue Team</span>
            <br />
            <span className="gradient-text">Expert.</span>
          </motion.h1>

          {/* Typed subtitle */}
          <motion.div
            className="text-2xl md:text-3xl font-semibold text-blue-200/80 mb-6 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Master Defensive Cybersecurity as a{' '}
            <TypedText />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-blue-300/60 leading-relaxed mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            From zero to SOC professional. A structured, visual roadmap covering every skill, tool, certification and lab you need to protect the digital world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div {...primaryMag}>
              <motion.button
                className="px-8 py-4 rounded-2xl font-bold text-base btn-primary text-white"
                whileTap={{ scale: 0.97 }}
                onClick={scrollToRoadmap}
              >
                Explore the Roadmap →
              </motion.button>
            </div>

            <div {...secondaryMag}>
              <motion.button
                className="px-8 py-4 rounded-2xl font-semibold text-base btn-secondary text-cyan-400"
                whileTap={{ scale: 0.97 }}
                onClick={scrollToWhat}
              >
                What is Blue Team?
              </motion.button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-cyan-500/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {[
              { val: '7 Phases',    label: 'Structured Learning' },
              { val: '50+ Topics',  label: 'Comprehensive Coverage' },
              { val: '16+ Certs',  label: 'Career Certifications' },
              { val: '$120K+',     label: 'Average Salary' },
            ].map((s) => (
              <div key={s.val}>
                <div className="text-2xl font-black gradient-text">{s.val}</div>
                <div className="text-xs text-blue-400/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToWhat}
      >
        <span className="text-xs text-blue-400/40 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-cyan-500/20 flex justify-center pt-2">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
