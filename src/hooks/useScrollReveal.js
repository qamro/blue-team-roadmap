import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-visible')
          el.classList.remove('section-hidden')
          if (!options.repeat) observer.unobserve(el)
        } else if (options.repeat) {
          el.classList.remove('section-visible')
          el.classList.add('section-hidden')
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px' }
    )

    el.classList.add('section-hidden')
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
