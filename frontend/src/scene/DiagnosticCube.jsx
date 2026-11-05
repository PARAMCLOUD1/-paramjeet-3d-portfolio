import { useEffect } from 'react'
import { reportScene } from './diagnostics'

// No loaders, textures, lights, animation hooks, or office components.
export default function DiagnosticCube({ onReady }) {
  useEffect(() => {
    reportScene('cube-mounted', { assets: 0 })
    onReady()
  }, [onReady])
  return <><color attach="background" args={['#111c2a']}/><mesh rotation={[.3, .5, 0]}><boxGeometry args={[1.5, 1.5, 1.5]}/><meshBasicMaterial color="#38bdf8"/></mesh></>
}
