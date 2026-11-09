import { palette } from '../palette'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Image, OrbitControls } from '@react-three/drei'
import { destinations, professionalTitle, introduction } from '../content'
import Character from './Character'
import useScenePreferences from './useScenePreferences'
import { CAMERA_END, CAMERA_START, CAMERA_TARGET } from './entrance'
import { CHARACTER_URL, PORTRAIT_URL, createOfficeRenderer, diagnosticStage, reportScene } from './diagnostics'
import CanvasFallback from './CanvasFallback'
import SceneBoundary from './SceneBoundary'
import DiagnosticCube from './DiagnosticCube'

function Box({ position, size, color, ...props }) {
  return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.7}/></mesh>
}
function Hotspot({ id, onSelect, children }) {
  return <group onClick={event => { event.stopPropagation(); onSelect(id) }}>{children}</group>
}
function Room({ onSelect, controls, mode, compact, character, stage, onFailure }) {
  const { onReady } = character
  useEffect(() => {
    reportScene('office-mounted', { stage })
    if (stage !== 'character') onReady()
  }, [stage, onReady])
  return <>
    <color attach="background" args={[palette.background]}/>
    <hemisphereLight args={[palette.text, palette.walnut, 1.6]}/><directionalLight position={[2, 7, 5]} intensity={2.6} castShadow={!compact} shadow-mapSize={[1024, 1024]} shadow-bias={-.0003} shadow-normalBias={.035} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5}/>
    <Box position={[0, -0.15, 0]} size={[8, 0.3, 6]} color={palette.surface}/>
    <Box position={[0, 1.8, -2.7]} size={[8, 3.6, 0.15]} color={palette.background}/>
    <Box position={[-3.9, 1.8, -0.8]} size={[0.15, 3.6, 3.8]} color={palette.background}/>
    <Box position={[-3.8, 2.2, -0.5]} size={[0.05, 1.6, 2.2]} color={palette.muted}/>
    <Box position={[-3.75, 2.2, -0.5]} size={[0.06, 1.65, 0.06]} color={palette.background}/>
    <Box position={[-3.75, 2.2, -0.5]} size={[0.06, 0.06, 2.2]} color={palette.background}/>
    <Box position={[2.8, 1.4, -2.57]} size={[1, 2.8, 0.08]} color={palette.walnut}/>
    <Box position={[3.16, 1.4, -2.49]} size={[0.07, 0.07, 0.08]} color={palette.accent}/>
    <group scale={[1, .72, 1]}>
    <Box position={[0, 1.3, 0]} size={[3.7, 0.16, 1.5]} color={palette.walnut}/>
    {[-1.5, 1.5].map(x => <Box key={x} position={[x, 0.6, 0]} size={[0.13, 1.2, 1.2]} color={palette.border}/>)}
    <Hotspot id="projects" onSelect={onSelect}>
      <Box position={[0, 2, -0.3]} size={[1.85, 1.05, 0.12]} color={palette.background}/>
      <Box position={[0, 2, -0.23]} size={[1.65, 0.85, 0.02]} color={palette.secondary}/>
      {[0, 1, 2, 3].map(i => <Box key={i} position={[-0.2, 2.25 - i * 0.16, -0.21]} size={[0.9 - i * 0.12, 0.035, 0.01]} color={i === 0 ? palette.accent : palette.muted}/>)}
      <Box position={[0, 1.5, -0.3]} size={[0.1, 0.35, 0.1]} color={palette.border}/>
    </Hotspot>
    <Box position={[0, 1.41, 0.4]} size={[1.2, 0.06, 0.4]} color={palette.border}/>
    <Box position={[1, 1.41, 0.4]} size={[0.18, 0.08, 0.28]} color={palette.border}/>
    <Box position={[0, 0.8, 1.4]} size={[1.15, 0.18, 1]} color={palette.secondary}/>
    <Box position={[0, 1.45, 1.85]} size={[1.15, 1.3, 0.16]} color={palette.secondary}/>
    <Box position={[0, 0.4, 1.4]} size={[0.12, 0.8, 0.12]} color={palette.accent}/>
    </group>
    <Hotspot id="projects" onSelect={onSelect}>
      <group position={[1.15, 1.02, -.05]} rotation={[0, -.18, 0]}>
        <Box position={[0, 0, 0]} size={[.72, .035, .48]} color={palette.border}/>
        <group position={[0, .025, -.23]} rotation={[-.22, 0, 0]}>
          <Box position={[0, .22, 0]} size={[.72, .44, .028]} color={palette.border}/>
          <Box position={[0, .22, .018]} size={[.64, .36, .01]} color={palette.secondary}/>
          {[0, 1, 2].map(i => <Box key={i} position={[-.06, .30 - i * .07, .026]} size={[.35 - i * .06, .014, .006]} color={palette.accent}/>)}
        </group>
      </group>
    </Hotspot>
    <CloudDiagram/>
    <Hotspot id="skills" onSelect={onSelect}>
      <Box position={[-2.7, 0.7, -1.5]} size={[0.8, 1.4, 0.9]} color={palette.background}/>
      {[0, 1, 2, 3].map(i => <Box key={i} position={[-2.7, 0.3 + i * 0.27, -1.03]} size={[0.6, 0.1, 0.025]} color={palette.surface}/>)}
    </Hotspot>
    <Hotspot id="about" onSelect={onSelect}>
      <Box position={[-1.7, 2.6, -2.55]} size={[1.04, 1.2, 0.1]} color={palette.walnut}/>
      {['workspace', 'character'].includes(stage) && <SceneBoundary stage="portrait-load" onFailure={onFailure}><Suspense fallback={null}><Image url={PORTRAIT_URL} position={[-1.7, 2.6, -2.485]} scale={[0.9, 1.05]} toneMapped={false}/></Suspense></SceneBoundary>}
    </Hotspot>
    <Box position={[1.6, 2.5, -2.4]} size={[1.5, 0.08, 0.45]} color={palette.walnut}/>
    <Hotspot id="education" onSelect={onSelect}>
      {[palette.surface, palette.accent, palette.text, palette.border].map((color, i) => <Box key={color} position={[1.1 + i * 0.23, 2.85, -2.4]} size={[0.18, 0.62 - i * 0.04, 0.32]} color={color}/>)}
    </Hotspot>
    <mesh position={[2.8, 0.36, -0.8]} castShadow><cylinderGeometry args={[0.28, 0.22, 0.7, 12]}/><meshStandardMaterial color={palette.accent}/></mesh>
    {[0, 1, 2].map(i => <mesh key={i} position={[2.8 + (i - 1) * 0.14, 0.95 + i * 0.12, -0.8]} rotation={[0, i, (i - 1) * 0.3]} castShadow><sphereGeometry args={[0.23, 12, 8]}/><meshStandardMaterial color={palette.secondary}/></mesh>)}
    {stage === 'character' && <SceneBoundary stage="character-load-or-animation" onFailure={onFailure}><Suspense fallback={null}><Character {...character} mode={mode} compact={compact} controls={controls}/></Suspense></SceneBoundary>}
    <OrbitControls ref={controls} makeDefault enabled={mode !== 'walking' && mode !== 'loading'} enableDamping={false} enablePan={false} minDistance={5} maxDistance={13} minPolarAngle={0.4} maxPolarAngle={1.5} target={CAMERA_TARGET}/>
  </>
}
function CloudDiagram() {
  return <group position={[.7, 1.65, -2.55]}>
    <Box position={[0, 0, 0]} size={[1.65, 1.05, .035]} color={palette.secondary}/>
    <group position={[0, .22, .05]}>
      {[[0, .04, .15], [-.17, -.03, .11], [.17, -.03, .11]].map(([x, y, r], i) => <mesh key={i} position={[x, y, 0]} scale={[1, .85, .2]}><sphereGeometry args={[r, 12, 8]}/><meshStandardMaterial color={palette.accent} roughness={.8}/></mesh>)}
      <Box position={[0, -.08, 0]} size={[.34, .09, .025]} color={palette.accent}/>
    </group>
    <Box position={[0, -.04, .05]} size={[.018, .16, .02]} color={palette.muted}/>
    <Box position={[0, -.12, .05]} size={[.96, .018, .02]} color={palette.muted}/>
    {[-.48, 0, .48].map(x => <group key={x} position={[x, -.27, .05]}><Box position={[0, .07, 0]} size={[.018, .16, .02]} color={palette.muted}/><Box position={[0, -.04, 0]} size={[.27, .16, .03]} color={palette.surface}/></group>)}
  </group>
}

export default function Office() {
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState('loading')
  const [ready, setReady] = useState(false)
  const [run, setRun] = useState(0)
  const [failure, setFailure] = useState(null)
  const [stage] = useState(() => diagnosticStage(window.location.search))
  const characterPreview = stage === 'character'
  const [lightweight, setLightweight] = useState(false)
  const container = useRef()
  const controls = useRef()
  const canvas = useRef()
  const detachContextEvents = useRef(() => {})
  const { reducedMotion, compact, active } = useScenePreferences(container)
  const lowQuality = compact || lightweight
  const walking = mode === 'walking' && !reducedMotion
  const failed = Boolean(failure)
  const showIntroduction = mode === 'idle' || reducedMotion || failed
  const onReady = useCallback(() => { setReady(true); setMode(current => current === 'loading' ? reducedMotion || stage !== 'character' ? 'idle' : 'walking' : current) }, [reducedMotion, stage])
  const onArrive = useCallback(() => setMode('idle'), [])
  const onFailure = useCallback((error, reason = 'scene-render', detail = {}) => {
    reportScene(reason, { stage, modelUrl: CHARACTER_URL, portraitUrl: PORTRAIT_URL, ...detail }, error)
    // Renderer teardown may intentionally lose its context. Preserve the original
    // failure and detach before unmount so teardown cannot masquerade as its cause.
    detachContextEvents.current()
    setFailure(current => current || { reason, message: error?.message || String(error) })
  }, [stage])
  const onCreated = useCallback(({ gl, size }) => {
    canvas.current = gl.domElement
    detachContextEvents.current()
    const lost = event => {
      event.preventDefault()
      onFailure(new Error(event.statusMessage || 'The application WebGL context was lost.'), 'context-lost')
    }
    const creationError = event => onFailure(new Error(event.statusMessage || 'WebGL context creation failed.'), 'context-creation-error')
    gl.domElement.addEventListener('webglcontextlost', lost)
    gl.domElement.addEventListener('webglcontextcreationerror', creationError)
    detachContextEvents.current = () => {
      gl.domElement.removeEventListener('webglcontextlost', lost)
      gl.domElement.removeEventListener('webglcontextcreationerror', creationError)
    }
    reportScene('canvas-created', { stage, width: size.width, height: size.height, contextLost: gl.getContext().isContextLost() })
  }, [onFailure, stage])
  const createRenderer = useCallback(defaults => createOfficeRenderer({ ...defaults, antialias: !lowQuality, powerPreference: 'low-power' }), [lowQuality])
  const resetView = () => {
    if (!controls.current) return
    controls.current.object.position.set(...CAMERA_END)
    controls.current.target.set(...CAMERA_TARGET)
    controls.current.update()
  }
  useEffect(() => {
    if (ready || failed) return
    const timeout = window.setTimeout(() => onFailure(new Error(`The ${stage} scene did not become ready within 25 seconds.`), 'load-timeout', { canvasCreated: Boolean(canvas.current) }), 25000)
    return () => window.clearTimeout(timeout)
  }, [ready, failed, onFailure, stage])
  useEffect(() => {
    reportScene('scene-start', { stage, modelUrl: CHARACTER_URL, reducedMotion, compact, storedPreferences: 'none; no localStorage or sessionStorage is read' })
  }, [stage, reducedMotion, compact])
  useEffect(() => () => detachContextEvents.current(), [])
  const destination = destinations.find(item => item.id === selected)
  return <>
    <div ref={container} className="office-experience">
      <div className="entrance-toolbar"><p role="status">{failed ? '3D unavailable — explore the portfolio below' : !ready ? 'Preparing the office…' : walking ? 'Entering the office' : 'Select an object to open a section'}</p><div>{characterPreview && (walking || mode === 'loading' ? <button onClick={onArrive}>Skip entrance</button> : <button disabled={!ready || failed || reducedMotion} onClick={() => { setRun(value => value + 1); setMode('walking') }}>Replay entrance</button>)}<button aria-pressed={lightweight} onClick={() => setLightweight(value => !value)}>Low graphics</button></div></div>
      {characterPreview && <p className="character-caption">Development preview: CC0 placeholder character · Personalized likeness pending{reducedMotion ? ' · Reduced motion enabled' : ''}</p>}
      <div className="canvas-wrap" role="group" aria-label={`Interactive 3D office with ${characterPreview ? 'a development placeholder, ' : ''}laptop, cloud diagram, monitor, portrait, server and books. Equivalent controls follow.`}>
        {failed ? <p className="scene-fallback" role="status">3D unavailable. Use the workspace links below. Switch to 2D and reload the workspace to retry.{import.meta.env.DEV && <><br/><small>{failure.reason}: {failure.message}</small></>}</p> : <SceneBoundary onFailure={onFailure}>
          {!ready && <div className="office-loading" role="status"><p>Loading the 3D workspace</p><span>Preparing lighting and materials</span><a href="#about">Continue to the introduction ↓</a></div>}
          <Canvas shadows={stage !== 'cube' && !lowQuality} frameloop={active ? 'demand' : 'never'} dpr={lowQuality ? 1 : [1, 1.5]} gl={createRenderer} camera={{ position: stage === 'cube' ? [3, 2, 4] : !characterPreview || reducedMotion || mode === 'idle' ? CAMERA_END : CAMERA_START, fov: 40 }} onCreated={onCreated} fallback={<CanvasFallback/>}>
            {stage === 'cube' ? <DiagnosticCube onReady={onReady}/> : <Room onSelect={setSelected} controls={controls} mode={reducedMotion ? 'idle' : mode} compact={lowQuality} character={{ run, active, reducedMotion, onReady, onArrive }} stage={stage} onFailure={onFailure}/>}
          </Canvas>
        </SceneBoundary>}
      </div>
      {showIntroduction && <div className="workspace-introduction"><div><p className="eyebrow">Paramjeet Kaur</p><h3>{professionalTitle}</h3><p>{introduction}</p></div><a className="text-link" href="#about">About Me ↗</a><a className="text-link" href="#projects">View Projects ↗</a></div>}
    </div>
    <div className="workspace-controls" role="group" aria-label="Explore office objects">{destinations.map(item => <button key={item.id} aria-pressed={selected === item.id} aria-controls="workspace-detail" onClick={() => setSelected(item.id)}>{item.object}<span>{item.title}</span></button>)}<button disabled={walking} onClick={resetView}>Reset view</button></div>
    <div id="workspace-detail" className="workspace-detail" aria-live="polite">{destination ? <><div><h3>{destination.title}</h3><p>{destination.description}</p></div><a className="text-link" href={'#' + destination.id}>{destination.link} ↗</a><button className="dismiss-note" aria-label="Dismiss office detail" onClick={() => setSelected(null)}>×</button></> : <p>Select an office object or use the controls above to explore.</p>}</div>
  </>
}
