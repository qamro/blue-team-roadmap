import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    let lenis
    let rafId

    async function init() {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.8,
        })

        function raf(time) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch (e) {
        // Lenis not available, fallback to native scroll
        console.warn('Lenis not available:', e.message)
      }
    }

    init()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
