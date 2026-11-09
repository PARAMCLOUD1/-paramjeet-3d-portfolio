import { lazy, Suspense, useRef, useState } from 'react'
import Health from './components/Health'
import Projects from './components/Projects'
import Hero from './components/Hero'
import BrandWordmark from './components/BrandWordmark'
import ProfileSections from './components/ProfileSections'
import useScrollMotion from './useScrollMotion'
import SceneBoundary from './scene/SceneBoundary'
import PortfolioDialog from './components/PortfolioDialog'
import { portfolioViews } from './content'

const Office = lazy(() => import('./scene/ExecutiveOffice'))
const navigation = portfolioViews.map(([id, title]) => [id === 'about' ? 'About' : id === 'skills' ? 'Skills' : id === 'contact' ? 'Contact' : title, id])

export default function App() {
  const main = useRef(null)
  const progress = useRef(null)
  const [menu, setMenu] = useState(false)
  const [workspace, setWorkspace] = useState(() => (import.meta.env.DEV && ['cube', 'office', 'character'].includes(new URLSearchParams(window.location.search).get('scene'))) || (typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 1000px)').matches && !navigator.connection?.saveData))
  const [entranceRequest, setEntranceRequest] = useState(0)
  const [sceneError, setSceneError] = useState(false)
  const [selected, setSelected] = useState(null)
  const [returnFocus, setReturnFocus] = useState(null)
  const menuButton = useRef(null)
  const openContent = (id, trigger) => {
    const mobileMenu = menu && window.matchMedia?.('(max-width: 800px)').matches && trigger?.closest('nav')
    setReturnFocus(mobileMenu ? menuButton.current : trigger || document.activeElement)
    setSelected(id)
    setMenu(false)
  }
  useScrollMotion(main, progress)

  return <>
    <div ref={progress} className="scroll-progress" aria-hidden="true"/>
    <a className="skip-link" href="#main">Skip to content</a>
    <header>
      <a className="brand" href="#main"><BrandWordmark/></a>
      <button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>Menu {menu ? '−' : '+'}</button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">
        {navigation.map(([label, id]) => <a key={id} href={'#' + id} aria-haspopup="dialog" aria-controls={selected ? 'portfolio-dialog' : undefined} onClick={event => { event.preventDefault(); openContent(id, event.currentTarget) }}>{label}</a>)}
        <a href="https://github.com/PARAMCLOUD1" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <main ref={main} id="main">
      <Hero onEnterOffice={() => { setSceneError(false); setWorkspace(true); setEntranceRequest(value => value + 1) }} world={workspace ? <div className="hero-world">
        <SceneBoundary onFailure={() => { setSceneError(true); setWorkspace(false) }}><Suspense fallback={<p className="scene-fallback" role="status">Loading the 3D office…</p>}><Office entranceRequest={entranceRequest} selected={selected} onSelect={openContent}/></Suspense></SceneBoundary>
        <div className="scene-label"><span>Interactive office</span><button onClick={() => { setWorkspace(false); setEntranceRequest(0) }}>Switch to 2D</button></div>
      </div> : null}/>
      {sceneError && <p className="scene-module-error" role="status">The 3D office could not load. You can read all sections below or reload the page to try again.</p>}
      <div className="discipline-strip"><span>MCA Student | Cloud Computing &amp; DevOps</span></div>
      {import.meta.env.DEV && <Health/>}
      <Projects/>
      <ProfileSections/>
    </main>
    <footer>
      <span className="footer-wordmark" aria-hidden="true"><BrandWordmark/></span>
      <div className="footer-bottom"><span>Paramjeet Kaur · MCA Student | Cloud Computing &amp; DevOps</span><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
    </footer>
    {selected && <PortfolioDialog key={selected} selected={selected} returnFocus={returnFocus} onClose={() => setSelected(null)}/>}
  </>
}
