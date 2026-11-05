import { useEffect, useState } from 'react'

function matches(query) { return typeof window.matchMedia === 'function' && window.matchMedia(query).matches }
export default function useScenePreferences(container) {
  const [reducedMotion, setReducedMotion] = useState(() => matches('(prefers-reduced-motion: reduce)'))
  const [compact, setCompact] = useState(() => matches('(max-width: 800px)') || (navigator.hardwareConcurrency || 8) <= 4)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia?.('(max-width: 800px)')
    const onMotion = () => setReducedMotion(Boolean(motion?.matches))
    const onSize = () => setCompact(Boolean(small?.matches) || (navigator.hardwareConcurrency || 8) <= 4)
    const onVisibility = () => setVisible(!document.hidden)
    motion?.addEventListener('change', onMotion)
    small?.addEventListener('change', onSize)
    document.addEventListener('visibilitychange', onVisibility)
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' }) : null
    if (container.current) observer?.observe(container.current)
    return () => {
      motion?.removeEventListener('change', onMotion)
      small?.removeEventListener('change', onSize)
      document.removeEventListener('visibilitychange', onVisibility)
      observer?.disconnect()
    }
  }, [container])
  return { reducedMotion, compact, active: visible && inView }
}
