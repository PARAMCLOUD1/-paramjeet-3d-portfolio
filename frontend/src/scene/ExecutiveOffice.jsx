import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ExecutiveRoom from './ExecutiveRoom'
import CinematicRig from './CinematicRig'
import useScenePreferences from './useScenePreferences'
import { createOfficeRenderer, diagnosticStage, reportScene } from './diagnostics'
import { constrainOfficePosition, ENTRY_START, OFFICE_TARGET, OFFICE_VIEW, officeDestinations } from './doorTimeline'
import CanvasFallback from './CanvasFallback'
import SceneBoundary from './SceneBoundary'

const LegacyOffice = lazy(() => import('./Office'))
const initialCamera = { position: ENTRY_START, fov: 50, near: .08, far: 80 }

export default function ExecutiveOffice(props) {
  const stage = diagnosticStage(window.location.search)
  if (import.meta.env.DEV && ['cube', 'office', 'character'].includes(stage)) return <Suspense fallback={<p role="status">Loading development preview…</p>}><LegacyOffice/></Suspense>
  return <ExecutiveExperience {...props}/>
}

function ExecutiveExperience({ entranceRequest = 0, selected = null, onSelect = () => {} }) {
  const [phase, setPhase] = useState('loading')
  const [ready, setReady] = useState(false)
  const [failure, setFailure] = useState(null)
  const [moving, setMoving] = useState(false)
  const [lightweight, setLightweight] = useState(false)
  const [run, setRun] = useState(0)
  const container = useRef(null)
  const controls = useRef(null)
  const objectButtons = useRef({})
  const detach = useRef(() => {})
  const handledRequest = useRef(0)
  const left = useRef(null), right = useRef(null), handleLeft = useRef(null), handleRight = useRef(null)
  const refs = useMemo(() => ({ left, right, handleLeft, handleRight }), [])
  const { reducedMotion, compact, active } = useScenePreferences(container)
  const lowQuality = compact || lightweight
  const onEntered = useCallback(() => { setPhase('explore'); setMoving(false) }, [])
  const onMoving = useCallback(value => setMoving(value), [])
  const onReady = useCallback(() => {
    setReady(true)
    setPhase(current => current === 'loading' ? reducedMotion ? 'explore' : 'closed' : current)
  }, [reducedMotion])
  const onFailure = useCallback((error, reason = 'executive-scene-render', detail = {}) => {
    reportScene(reason, { ...detail, scene: 'executive' }, error)
    detach.current()
    setFailure(current => current || { reason, message: error?.message || String(error) })
  }, [])
  const onCreated = useCallback(({ gl }) => {
    detach.current()
    const lost = event => { event.preventDefault(); onFailure(new Error('The office WebGL context was lost.'), 'context-lost') }
    gl.domElement.addEventListener('webglcontextlost', lost)
    detach.current = () => gl.domElement.removeEventListener('webglcontextlost', lost)
  }, [onFailure])
  const renderer = useCallback(defaults => createOfficeRenderer({ ...defaults, antialias: !lowQuality, powerPreference: 'low-power' }), [lowQuality])
  const enter = useCallback(() => { setPhase(reducedMotion ? 'explore' : 'entering') }, [reducedMotion])

  useEffect(() => {
    if (ready && entranceRequest > handledRequest.current) {
      handledRequest.current = entranceRequest
      enter()
    }
  }, [entranceRequest, ready, enter])
  useEffect(() => {
    if (ready || failure) return
    const timer = window.setTimeout(() => onFailure(new Error('Office readiness timed out after 25 seconds.'), 'load-timeout'), 25000)
    return () => window.clearTimeout(timer)
  }, [failure, onFailure, ready])
  useEffect(() => () => detach.current(), [])
  const select = id => onSelect(id, objectButtons.current[id])
  const replay = () => { setRun(value => value + 1); setPhase(reducedMotion ? 'explore' : 'entering') }
  const skip = () => { handledRequest.current = entranceRequest; onEntered() }
  const reset = () => {
    const orbit = controls.current
    if (orbit) { orbit.object.position.set(...OFFICE_VIEW); orbit.target.set(...OFFICE_TARGET); orbit.update() }
  }
  const constrainOrbit = () => {
    if (!controls.current || moving || phase !== 'explore') return
    constrainOfficePosition(controls.current.object.position)
  }
  const exploring = phase === 'explore' || reducedMotion
  return <div ref={container} className="executive-office">
    <div className="entrance-toolbar">
      <p role="status">{failure ? '3D unavailable — the portfolio remains open below' : !ready ? 'Loading the office…' : reducedMotion ? 'Office ready · Reduced motion' : phase === 'closed' ? 'Office ready' : phase === 'entering' ? 'Opening the doors…' : 'Select an object to open a section'}</p>
      <div>
        {!exploring && !failure && <button onClick={skip}>Skip Intro</button>}
        {exploring && <button disabled={!ready || Boolean(failure) || reducedMotion} onClick={replay}>Replay Intro</button>}
        <button aria-pressed={lightweight} onClick={() => setLightweight(value => !value)}>Low graphics</button>
      </div>
    </div>
    <div className="canvas-wrap" role="group" aria-label="Executive office: physical double doors, workstation, server racks, technical display, education timeline, certificate display and contact terminal. Equivalent keyboard controls follow.">
      {failure ? <div className="scene-fallback" role="status"><p>3D unavailable. Use the six exhibit controls or the portfolio sections below.</p>{import.meta.env.DEV && <small>{failure.reason}: {failure.message}</small>}</div> : <SceneBoundary onFailure={onFailure}>
        <Canvas camera={initialCamera} gl={renderer} shadows={!lowQuality} dpr={lowQuality ? 1 : [1, 1.5]} frameloop={active ? 'demand' : 'never'} onCreated={onCreated} fallback={<CanvasFallback/>}>
          <ExecutiveRoom refs={refs} onReady={onReady} compact={lowQuality} onSelect={select} selected={selected} enabled={exploring && !moving && !selected}/>
          <CinematicRig refs={refs} controls={controls} phase={phase} run={run} reducedMotion={reducedMotion} compact={compact} active={active && !selected} onEntered={onEntered} onMoving={onMoving}/>
          <OrbitControls ref={controls} makeDefault enabled={exploring && !moving && !selected} enablePan={false} enableDamping={false} minDistance={2.2} maxDistance={7} minPolarAngle={.35} maxPolarAngle={1.45} minAzimuthAngle={-.85} maxAzimuthAngle={.85} target={OFFICE_TARGET} onChange={constrainOrbit}/>
        </Canvas>
      </SceneBoundary>}
      {!failure && !ready && <div className="office-loading" role="status"><p>Loading the 3D office</p><span>Preparing materials and lighting</span><a href="#projects">Continue to projects ↓</a></div>}
      {!failure && ready && phase === 'closed' && !reducedMotion && <div className="door-welcome"><p>PARAMJEET.DEV</p><h2>Explore My Portfolio</h2><button className="button" onClick={enter}>Enter Portfolio <span aria-hidden="true">↗</span></button></div>}
    </div>
    {(exploring || failure) && <><div className="workspace-controls" role="group" aria-label="Executive office exhibits">
      {officeDestinations.map(item => <button key={item.id} ref={node => { objectButtons.current[item.id] = node }} aria-pressed={selected === item.id} aria-haspopup="dialog" aria-controls={selected ? 'portfolio-dialog' : undefined} onClick={() => select(item.id)}>{item.object}<span>{item.title}</span></button>)}
      <button onClick={reset} disabled={!ready || Boolean(failure) || !exploring || moving}>Reset view</button>
    </div>
    <p className="office-hint">Select an object or an exhibit button to read its information. Close the panel to return to this view.</p></>}
  </div>
}
