import { lazy, Suspense, useRef, useState } from 'react'
import Health from './components/Health'
import Projects from './components/Projects'
import Hero from './components/Hero'
import ProfileSections from './components/ProfileSections'
import useScrollMotion from './useScrollMotion'

const Office = lazy(() => import('./scene/Office'))
const navigation = [['Workspace', 'workspace'], ['Projects', 'projects'], ['About', 'about'], ['Skills', 'skills'], ['Contact', 'contact']]

export default function App() {
  const main = useRef(null)
  const progress = useRef(null)
  const [menu, setMenu] = useState(false)
  const [workspace, setWorkspace] = useState(() => import.meta.env.DEV && ['cube', 'office', 'character'].includes(new URLSearchParams(window.location.search).get('scene')))
  useScrollMotion(main, progress)

  return <>
    <div ref={progress} className="scroll-progress" aria-hidden="true"/>
    <a className="skip-link" href="#main">Skip to content</a>
    <header>
      <a className="brand" href="#main">PARAMJEET<span>.DEV</span></a>
      <button className="menu-button" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>Menu {menu ? '−' : '+'}</button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">
        {navigation.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => setMenu(false)}>{label}</a>)}
        <a href="https://github.com/PARAMCLOUD1" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <main ref={main} id="main">
      <Hero onEnterOffice={() => setWorkspace(true)}/>
      <div className="discipline-strip"><span>Code with purpose</span><span>Python / Linux / Flask / Git</span><span>Cloud &amp; DevOps, in progress</span></div>
      <section id="workspace" className="workspace section" aria-labelledby="workspace-title">
        <div className="section-heading" data-scroll-reveal>
          <div><p className="eyebrow">01 / An interactive introduction</p><h2 id="workspace-title">A different way<br/>to get to know me.</h2></div>
          <p>Step into my workspace. Drag to orbit, scroll to zoom, and select the monitor, server, portrait or books to explore.</p>
        </div>
        <div className="scene-shell">
          {workspace ? <Suspense fallback={<p className="scene-fallback" role="status">Loading workspace…</p>}><Office/></Suspense> : <div className="scene-start">
            <div className="terminal"><span>paramjeet@workspace:~</span><p>$ build my-next-chapter</p><p>Python · Linux · Cloud</p></div>
            <button className="button primary" onClick={() => setWorkspace(true)}>Load interactive 3D workspace <span aria-hidden="true">↗</span></button>
            <p>Optional 3D · All information remains available below</p>
          </div>}
          <div className="scene-label"><span>Interactive office</span>{workspace && <button onClick={() => setWorkspace(false)}>Switch to 2D</button>}</div>
        </div>
        {import.meta.env.DEV && <Health/>}
      </section>
      <Projects/>
      <ProfileSections/>
    </main>
    <footer>
      <span className="footer-wordmark" aria-hidden="true">PARAMJEET.DEV</span>
      <div className="footer-bottom"><span>Paramjeet Kaur · Cloud &amp; DevOps, in progress</span><span>React / Three.js / Flask</span><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
    </footer>
  </>
}
