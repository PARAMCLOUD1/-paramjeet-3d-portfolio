import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'
import { introduction, professionalTitle } from '../content'

export default function Hero({ onEnterOffice, world }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    // The document is readable by default. Only enhance when motion is allowed.
    if (typeof window.matchMedia !== 'function') return
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.current.querySelectorAll('[data-hero-reveal]'), {
        y: 8,
        opacity: 0,
        duration: .45,
        stagger: .04,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, root)
    return () => motion.revert()
  }, [])

  return <section ref={root} className={world ? 'hero hero--world' : 'hero'} aria-labelledby="hero-title">
    <div className="hero-copy">
      <h1 id="hero-title" data-hero-reveal>
        <span>Paramjeet</span>{' '}
        <span className="hero-title-last">Kaur</span>
      </h1>
      <p className="hero-role" data-hero-reveal>{professionalTitle}</p>
      <p className="hero-tagline" data-hero-reveal>{introduction}</p>
      <div className="actions" data-hero-reveal>
        <a className="button primary" href="#projects">View Projects <span aria-hidden="true">↗</span></a>
        <a className="button secondary" href="#workspace" onClick={onEnterOffice}>Explore Portfolio <span aria-hidden="true">↗</span></a>
      </div>
      <div className="hero-social"><a href="https://github.com/PARAMCLOUD1" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/paramjeet-kaur-cloud/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </div>
    <div id="workspace" className="hero-media">
    {world || <figure className="portrait" data-hero-reveal>
      <img src="/images/profile.webp" alt="Paramjeet Kaur wearing a pink sweater" width="850" height="990" fetchPriority="high"/>
      <figcaption><span>Paramjeet Kaur</span><span>MCA Student</span></figcaption>
    </figure>}
    </div>
    <div className="hero-bottom">
      <p>Punjab, India <span aria-hidden="true">/</span> Open to internships</p>
      <a className="scroll-cue" href="#workspace">Explore the Office <span aria-hidden="true">↓</span></a>
    </div>
  </section>
}
