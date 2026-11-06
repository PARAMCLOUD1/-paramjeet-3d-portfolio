import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useScrollMotion(root, progress) {
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const page = root.current
      page.querySelectorAll('[data-scroll-reveal]').forEach(element => {
        // Text remains visible and focusable even before a trigger fires.
        gsap.from(element, {
          y: 24,
          duration: .8,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
      gsap.fromTo(progress.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      })
      let frame
      const refresh = () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => ScrollTrigger.refresh())
      }
      // Office loading, images and project details can change the document height.
      const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(refresh) : null
      observer?.observe(page)
      page.addEventListener('load', refresh, true)
      return () => {
        cancelAnimationFrame(frame)
        observer?.disconnect()
        page.removeEventListener('load', refresh, true)
      }
    }, root)
    media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
      root.current.querySelectorAll('[data-portrait-parallax]').forEach(image => {
        gsap.fromTo(image, { yPercent: -3 }, {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: .5 },
        })
      })
    }, root)
    return () => media.revert()
  }, [root, progress])
}
