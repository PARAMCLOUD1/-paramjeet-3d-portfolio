import { Component, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
function Box({position,size,color,...props}){return <mesh position={position} {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.65}/></mesh>}
function Room({onMonitor}){return <>
 <ambientLight intensity={1.1}/><directionalLight position={[3,7,5]} intensity={3}/><pointLight position={[-2,3,-1]} color="#38bdf8" intensity={12}/>
 <Box position={[0,-0.15,0]} size={[7,0.3,5]} color="#303b48"/>
 <Box position={[0,1.7,-2.4]} size={[7,3.4,0.15]} color="#172535"/>
 {[-2.5,-1.25,0,1.25,2.5].map(x=><Box key={x} position={[x,1.7,-2.28]} size={[0.035,3.4,0.04]} color="#3a4c5c"/>)}
 <Box position={[0,1.3,0]} size={[3.7,0.16,1.5]} color="#b29370"/>
 {[-1.5,1.5].map(x=><Box key={x} position={[x,0.6,0]} size={[0.13,1.2,1.2]} color="#131d28"/>)}
 <group onClick={onMonitor}>
 <Box position={[0,2,-0.3]} size={[1.85,1.05,0.12]} color="#080d14"/>
 <Box position={[0,2,-0.23]} size={[1.65,0.85,0.02]} color="#173e53"/>
 {[0,1,2,3].map(i=><Box key={i} position={[-0.2,2.25-i*0.16,-0.21]} size={[0.9-i*0.12,0.035,0.01]} color={i===0?'#38bdf8':'#7196a5'}/>)}
 <Box position={[0,1.5,-0.3]} size={[0.1,0.35,0.1]} color="#263343"/>
 </group>
 <Box position={[0,1.41,0.4]} size={[1.2,0.06,0.4]} color="#263343"/>
 <Box position={[1,1.41,0.4]} size={[0.18,0.08,0.28]} color="#263343"/>
 <Box position={[0,0.8,1.4]} size={[1.15,0.18,1]} color="#222c38"/>
 <Box position={[0,1.45,1.85]} size={[1.15,1.3,0.16]} color="#222c38"/>
 <Box position={[0,0.4,1.4]} size={[0.12,0.8,0.12]} color="#657080"/>
 <Box position={[-2.7,0.7,-1]} size={[0.8,1.4,0.9]} color="#111827"/>
 {[0,1,2,3].map(i=><Box key={i} position={[-2.7,0.3+i*0.27,-0.53]} size={[0.6,0.1,0.025]} color="#3b647a"/>)}
 <OrbitControls makeDefault enablePan={false} minDistance={5} maxDistance={12} minPolarAngle={0.4} maxPolarAngle={1.5} target={[0,1,0]}/>
 </>}
class Boundary extends Component{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<p className="scene-fallback">3D is unavailable on this device. All portfolio information is available below.</p>:this.props.children}}
export default function Office(){const [selected,setSelected]=useState(false);return <Boundary><div className="canvas-wrap"><Canvas frameloop="demand" dpr={[1,1.5]} camera={{position:[6,4.5,7],fov:40}} fallback={<p>WebGL unavailable. Explore the text sections below.</p>}><Suspense fallback={null}><Room onMonitor={()=>setSelected(true)}/></Suspense></Canvas></div>{selected&&<div className="scene-note" role="status">Workstation selected · Meet Paramjeet in <a href="#about">About me</a><button aria-label="Dismiss workstation message" onClick={()=>setSelected(false)}>×</button></div>}</Boundary>}
