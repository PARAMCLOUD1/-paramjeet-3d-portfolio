import { Component, Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Image, OrbitControls } from '@react-three/drei'
import { destinations } from '../content'

function Box({ position, size, color, ...props }) {
  return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.7}/></mesh>
}
function Hotspot({ id, onSelect, children }) {
  return <group onClick={event => { event.stopPropagation(); onSelect(id) }}>{children}</group>
}
function Room({ onSelect, controls }) {
  return <>
    <color attach="background" args={['#111c2a']}/>
    <ambientLight intensity={0.9}/><directionalLight position={[2, 7, 5]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5}/>
    <Box position={[0, -0.15, 0]} size={[8, 0.3, 6]} color="#35414b"/>
    <Box position={[0, 1.8, -2.7]} size={[8, 3.6, 0.15]} color="#1d2d3b"/>
    <Box position={[-3.9, 1.8, -0.8]} size={[0.15, 3.6, 3.8]} color="#263746"/>
    <Box position={[-3.8, 2.2, -0.5]} size={[0.05, 1.6, 2.2]} color="#8da3ac"/>
    <Box position={[-3.75, 2.2, -0.5]} size={[0.06, 1.65, 0.06]} color="#263746"/>
    <Box position={[-3.75, 2.2, -0.5]} size={[0.06, 0.06, 2.2]} color="#263746"/>
    <Box position={[2.8, 1.4, -2.57]} size={[1, 2.8, 0.08]} color="#101b26"/>
    <Box position={[3.16, 1.4, -2.49]} size={[0.07, 0.07, 0.08]} color="#b29370"/>
    <Box position={[0, 1.3, 0]} size={[3.7, 0.16, 1.5]} color="#b29370"/>
    {[-1.5, 1.5].map(x => <Box key={x} position={[x, 0.6, 0]} size={[0.13, 1.2, 1.2]} color="#131d28"/>)}
    <Hotspot id="projects" onSelect={onSelect}>
      <Box position={[0, 2, -0.3]} size={[1.85, 1.05, 0.12]} color="#080d14"/>
      <Box position={[0, 2, -0.23]} size={[1.65, 0.85, 0.02]} color="#173e53"/>
      {[0, 1, 2, 3].map(i => <Box key={i} position={[-0.2, 2.25 - i * 0.16, -0.21]} size={[0.9 - i * 0.12, 0.035, 0.01]} color={i === 0 ? '#71bed8' : '#7196a5'}/>)}
      <Box position={[0, 1.5, -0.3]} size={[0.1, 0.35, 0.1]} color="#263343"/>
    </Hotspot>
    <Box position={[0, 1.41, 0.4]} size={[1.2, 0.06, 0.4]} color="#263343"/>
    <Box position={[1, 1.41, 0.4]} size={[0.18, 0.08, 0.28]} color="#263343"/>
    <Box position={[0, 0.8, 1.4]} size={[1.15, 0.18, 1]} color="#222c38"/>
    <Box position={[0, 1.45, 1.85]} size={[1.15, 1.3, 0.16]} color="#222c38"/>
    <Box position={[0, 0.4, 1.4]} size={[0.12, 0.8, 0.12]} color="#657080"/>
    <Hotspot id="skills" onSelect={onSelect}>
      <Box position={[-2.7, 0.7, -1.5]} size={[0.8, 1.4, 0.9]} color="#111827"/>
      {[0, 1, 2, 3].map(i => <Box key={i} position={[-2.7, 0.3 + i * 0.27, -1.03]} size={[0.6, 0.1, 0.025]} color="#567688"/>)}
    </Hotspot>
    <Hotspot id="about" onSelect={onSelect}>
      <Box position={[-1.7, 2.6, -2.55]} size={[1.04, 1.2, 0.1]} color="#b29370"/>
      <Suspense fallback={null}><Image url="/images/profile.webp" position={[-1.7, 2.6, -2.485]} scale={[0.9, 1.05]} toneMapped={false}/></Suspense>
    </Hotspot>
    <Box position={[1.6, 2.5, -2.4]} size={[1.5, 0.08, 0.45]} color="#b29370"/>
    <Hotspot id="education" onSelect={onSelect}>
      {['#768c9b', '#9d866c', '#b4b9ae', '#536d78'].map((color, i) => <Box key={color} position={[1.1 + i * 0.23, 2.85, -2.4]} size={[0.18, 0.62 - i * 0.04, 0.32]} color={color}/>)}
    </Hotspot>
    <mesh position={[2.8, 0.36, -0.8]} castShadow><cylinderGeometry args={[0.28, 0.22, 0.7, 12]}/><meshStandardMaterial color="#9d866c"/></mesh>
    {[0, 1, 2].map(i => <mesh key={i} position={[2.8 + (i - 1) * 0.14, 0.95 + i * 0.12, -0.8]} rotation={[0, i, (i - 1) * 0.3]} castShadow><sphereGeometry args={[0.23, 12, 8]}/><meshStandardMaterial color="#526e58"/></mesh>)}
    <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={5} maxDistance={13} minPolarAngle={0.4} maxPolarAngle={1.5} target={[0, 1, 0]}/>
  </>
}
class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <p className="scene-fallback" role="status">3D is unavailable on this device. Use the workspace links below or explore the portfolio sections.</p> : this.props.children }
}
export default function Office() {
  const [selected, setSelected] = useState(null)
  const controls = useRef()
  const destination = destinations.find(item => item.id === selected)
  return <>
    <Boundary><div className="canvas-wrap" role="img" aria-label="Interactive 3D office with a desk, monitor, framed portrait, server and books. Equivalent controls follow the scene."><Canvas shadows frameloop="demand" dpr={[1, 1.5]} camera={{ position: [7, 4.8, 8], fov: 40 }} fallback={<p className="scene-fallback">WebGL unavailable. Use the workspace links below.</p>}><Room onSelect={setSelected} controls={controls}/></Canvas></div></Boundary>
    <div className="workspace-controls" role="group" aria-label="Explore office objects">{destinations.map(item => <button key={item.id} aria-pressed={selected === item.id} aria-controls="workspace-detail" onClick={() => setSelected(item.id)}>{item.object}<span>{item.title}</span></button>)}<button onClick={() => controls.current?.reset()}>Reset view</button></div>
    <div id="workspace-detail" className="workspace-detail" aria-live="polite">{destination ? <><div><h3>{destination.title}</h3><p>{destination.description}</p></div><a className="text-link" href={'#' + destination.id}>{destination.link} ↗</a><button className="dismiss-note" aria-label="Dismiss office detail" onClick={() => setSelected(null)}>×</button></> : <p>Select an office object or use the controls above to explore.</p>}</div>
  </>
}
