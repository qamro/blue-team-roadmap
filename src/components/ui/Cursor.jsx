import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.opacity  = '1'
    ring.style.opacity = '1'

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    function animate() {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12
      ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      requestAnimationFrame(animate)
    }

    function onEnterLink() {
      ring.style.width   = '40px'
      ring.style.height  = '40px'
      ring.style.borderColor = 'rgba(0,245,255,0.8)'
      ring.style.background  = 'rgba(0,245,255,0.05)'
    }

    function onLeaveLink() {
      ring.style.width   = '32px'
      ring.style.height  = '32px'
      ring.style.borderColor = 'rgba(0,245,255,0.4)'
      ring.style.background  = 'transparent'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] opacity-0 transition-none"
        style={{ willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/40 pointer-events-none z-[9998] opacity-0"
        style={{ willChange: 'transform', transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s' }}
      />
    </>
  )
}
