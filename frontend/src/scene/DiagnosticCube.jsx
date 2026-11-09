import { palette } from '../palette'
import { useEffect } from 'react'
import { reportScene } from './diagnostics'

// No loaders, textures, lights, animation hooks, or office components.
export default function DiagnosticCube({ onReady }) {
  useEffect(() => {
    reportScene('cube-mounted', { assets: 0 })
    onReady()
  }, [onReady])
  return <><color attach="background" args={[palette.background]}/><mesh rotation={[.3, .5, 0]}><boxGeometry args={[1.5, 1.5, 1.5]}/><meshBasicMaterial color={palette.accent}/></mesh></>
}
