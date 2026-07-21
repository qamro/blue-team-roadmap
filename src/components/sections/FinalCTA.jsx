import { Suspense, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMagnetic } from '../../hooks/useMagnetic'

export default function FinalCTA() {
  const { ref, inView }  = useInView({ threshold: 0.2, triggerOnce: true })
  const primaryMag       = useMagnetic(0.2)
  const canvasRef        = useRef(null)

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx  = canvas.getContext('2d')
    let animId
    const particles = []

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    for (let i = 0; i < 40; i++) {
      particles.push({
        x:  Math.random() * 1000,
        y:  Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 2 + 0.5,
        a:  Math.random() * 0.5 + 0.1,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 255, ${p.a})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Deep glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-blue-600/8 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-cyan-500/8 blur-[80px]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="relative rounded-3xl overflow-hidden border border-cyan-500/15"
          style={{
            background: 'linear-gradient(135deg, rgba(0,20,60,0.8), rgba(0,5,20,0.9))',
            boxShadow:  '0 0 80px rgba(0,102,255,0.15), 0 0 160px rgba(0,245,255,0.05)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Particle canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />

          {/* Grid overlay */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-cyan-400/20 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-cyan-400/20 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-cyan-400/20 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-cyan-400/20 rounded-br-3xl" />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Content */}
          <div className="relative px-8 py-20 text-center">
            {/* Shield icon */}
            <motion.div
              className="inline-flex w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-cyan-500/20 items-center justify-center text-5xl mb-8"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0,245,255,0.2)',
                  '0 0 40px rgba(0,245,255,0.4)',
                  '0 0 20px rgba(0,245,255,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🛡️
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              The world needs defenders
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="gradient-text-white">Become the Defender</span>
              <br />
              <span className="gradient-text">the Digital World Needs.</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-blue-300/60 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Every breach stopped, every alert triaged, every incident resolved — it starts with one decision.
              <strong className="text-blue-200"> Start your Blue Team journey today.</strong>
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div {...primaryMag}>
                <motion.button
                  className="px-10 py-4 rounded-2xl font-bold text-base btn-primary text-white"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start the Roadmap →
                </motion.button>
              </div>

              <motion.button
                className="px-10 py-4 rounded-2xl font-semibold text-base btn-secondary text-cyan-400"
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Labs
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-14 pt-8 border-t border-cyan-500/10 text-sm text-blue-400/40"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {['✓ Free roadmap', '✓ No registration', '✓ Always updated', '✓ Community driven'].map((t) => (
                <span key={t} className="hover:text-cyan-400/60 transition-colors">{t}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
