import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

export default function Hero({ onEnterOffice }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    // The document is readable by default. Only enhance when motion is allowed.
    if (typeof window.matchMedia !== 'function') return
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.current.querySelectorAll('[data-hero-reveal]'), {
        y: 16,
        opacity: 0,
        duration: .8,
        stagger: .07,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, root)
    return () => motion.revert()
  }, [])

  return <section ref={root} className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="hero-introduction" data-hero-reveal>Cloud &amp; DevOps / Portfolio</p>
      <h1 id="hero-title" data-hero-reveal>
        <span>PARAMJEET</span>{' '}
        <span className="hero-title-last">KAUR</span>
      </h1>
      <p className="hero-role" data-hero-reveal>Cloud &amp; DevOps Engineer <span>in Progress</span></p>
      <p className="hero-tagline" data-hero-reveal>BUILDING. AUTOMATING. DEPLOYING.</p>
      <div className="actions" data-hero-reveal>
        <a className="button primary" href="#workspace" onClick={onEnterOffice}>Enter My World <span aria-hidden="true">↗</span></a>
        <a className="button secondary" href="#projects">Explore Projects <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <figure className="portrait" data-hero-reveal>
      <img src="/images/profile.webp" alt="Paramjeet Kaur wearing a pink sweater" width="850" height="990" fetchPriority="high"/>
      <figcaption><span>Paramjeet Kaur</span><span>Code → Cloud</span></figcaption>
    </figure>
    <div className="hero-bottom">
      <p>Punjab, India <span aria-hidden="true">/</span> Open to internships</p>
      <a className="scroll-cue" href="#workspace">Scroll to explore <span aria-hidden="true">↓</span></a>
    </div>
  </section>
}
