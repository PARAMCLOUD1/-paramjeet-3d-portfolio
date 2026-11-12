import { usePalette } from '../theme'
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { BoxHelper, PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import useOfficeMaterials from './officeMaterials'

const SelectedExhibit = createContext(null)

function Box({ at, size, material, ...props }) {
  return <mesh position={at} material={material} castShadow receiveShadow {...props}><boxGeometry args={size}/></mesh>
}

function Environment({ compact }) {
  const { gl, scene, invalidate } = useThree()
  useEffect(() => {
    if (!gl.isWebGLRenderer) return
    const generator = new PMREMGenerator(gl)
    const environment = new RoomEnvironment()
    const target = generator.fromScene(environment, .04, .1, 100, { size: compact ? 64 : 128 })
    const previous = scene.environment
    const previousIntensity = scene.environmentIntensity
    // Three's external scene is mutable renderer state, not React state/props.
    /* eslint-disable react-hooks/immutability */
    scene.environment = target.texture
    scene.environmentIntensity = .5
    /* eslint-enable react-hooks/immutability */
    invalidate()
    environment.dispose(); generator.dispose()
    // Restore the external scene and release the generated environment on teardown.
    return () => { scene.environment = previous; scene.environmentIntensity = previousIntensity; target.dispose() }
  }, [compact, gl, scene, invalidate])
  return null
}

function Exhibit({ id, onSelect, enabled, children, ...props }) {
  const { gl, scene, invalidate } = useThree()
  const palette = usePalette()
  const group = useRef(null)
  const selected = useContext(SelectedExhibit)
  const [hovered, setHovered] = useState(false)
  useLayoutEffect(() => {
    if (selected !== id && !(hovered && enabled)) return
    group.current.updateWorldMatrix(true, true)
    const outline = new BoxHelper(group.current, palette.accent)
    outline.name = `${id}-highlight`
    scene.add(outline)
    invalidate()
    return () => { scene.remove(outline); outline.geometry.dispose(); outline.material.dispose(); invalidate() }
  }, [enabled, hovered, id, invalidate, palette, scene, selected])
  useEffect(() => () => gl.domElement.style.removeProperty('cursor'), [gl])
  return <group ref={group} name={id} userData={{ destination: id }} {...props}
    onClick={event => { if (enabled) { event.stopPropagation(); onSelect(id) } }}
    onPointerOver={event => { if (enabled) { event.stopPropagation(); setHovered(true); gl.domElement.style.setProperty('cursor', 'pointer') } }}
    onPointerOut={() => { setHovered(false); gl.domElement.style.removeProperty('cursor') }}>{children}</group>
}

function Door({ side, doorRef, handleRef, materials: m }) {
  const direction = side === 'left' ? 1 : -1
  return <group name={`${side}-door-hinge`} ref={doorRef} position={[-direction * 1.4, 0, 4]}>
    <Box at={[direction * .7, 1.6, 0]} size={[1.4, 3.2, .11]} material={m.door}/>
    <Box at={[direction * .7, 1.6, .067]} size={[1.16, 2.9, .024]} material={m.doorPanel}/>
    {[.13, 1.27].map(x => <Box key={x} at={[direction * x, 1.6, .084]} size={[.012, 2.86, .012]} material={m.champagne}/>)}
    {[.38, 1.6, 2.82].map(y => <mesh key={y} position={[0, y, 0]} material={m.champagne}><cylinderGeometry args={[.025, .025, .13, 12]}/></mesh>)}
    <group ref={handleRef} name={`${side}-handle`} position={[direction * 1.17, 1.45, .09]}>
      <Box at={[0, 0, 0]} size={[.07, .24, .015]} material={m.metal}/>
      <mesh material={m.champagne} position={[0, 0, .04]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.025, .025, .08, 12]}/></mesh>
      <mesh material={m.champagne} position={[-direction * .11, 0, .08]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.016, .016, .24, 12]}/></mesh>
    </group>
  </group>
}

export default function ExecutiveRoom({ refs, onReady, compact, onSelect, selected, enabled }) {
  const palette = usePalette()
  const m = useOfficeMaterials()
  useEffect(() => { onReady() }, [onReady])
  return <SelectedExhibit.Provider value={selected}>
    <color attach="background" args={[palette.sceneBackground]}/>
    <fog attach="fog" args={[palette.sceneBackground, 16, 34]}/>
    <Environment compact={compact}/>
    <hemisphereLight args={[palette.sky, palette.walnut, .55]}/>
    <directionalLight position={[-3.5, 6, 8]} color={palette.light} intensity={3} castShadow={!compact} shadow-mapSize={[2048, 2048]} shadow-radius={3} shadow-bias={-.0001} shadow-normalBias={.006} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6}/>
    <pointLight position={[3.8, 2.6, 6]} color={palette.sky} intensity={4} distance={10}/>
    <pointLight position={[-3.8, 3.1, -.8]} color={palette.glow} intensity={8} distance={8}/>
    <pointLight position={[3.7, 3.1, -2.5]} color={palette.glow} intensity={8} distance={7}/>
    <Box at={[0, -.13, 2.4]} size={[9, .26, 15]} material={m.floor}/>
    <Box at={[0, .012, -1.1]} size={[4.8, .018, 4]} material={m.rug} castShadow={false}/>
    <Box at={[0, 1.9, -5]} size={[9, 3.8, .18]} material={m.backWall}/>
    <Box at={[-4.5, 1.9, -.5]} size={[.18, 3.8, 9]} material={m.wall}/>
    <Box at={[0, 3.88, -.5]} size={[9, .16, 9]} material={m.wall} castShadow={false}/>
    {[-3, 3].map(x => <Box key={x} at={[x, 1.9, 4]} size={[3.2, 3.8, .22]} material={m.wall}/>)}
    <Box at={[0, 3.58, 4]} size={[2.8, .76, .22]} material={m.wall}/>
    {[-1.47, 1.47].map(x => <Box key={x} at={[x, 1.64, 4.02]} size={[.12, 3.36, .24]} material={m.doorFrame}/>)}
    <Box at={[0, 3.3, 4.02]} size={[3.06, .1, .24]} material={m.doorFrame}/>
    <Box at={[0, .018, 4]} size={[2.8, .036, .28]} material={m.champagne}/>
    <Box at={[0, 3.57, 4.14]} size={[2.2, .25, .025]} material={m.branding}/>
    <Door side="left" doorRef={refs.left} handleRef={refs.handleLeft} materials={m}/>
    <Door side="right" doorRef={refs.right} handleRef={refs.handleRight} materials={m}/>
    {Array.from({ length: 10 }, (_, i) => <Box key={i} at={[-4.38, 1.9, -4.5 + i * .88]} size={[.04, 3.6, .04]} material={m.wood}/>)}
    <Box at={[4.43, 1.9, -.5]} size={[.035, 3.6, 8.8]} material={m.glass} castShadow={false}/>
    {[-4.9, -2.7, -.5, 1.7, 3.9].map(z => <Box key={z} at={[4.45, 1.9, z]} size={[.07, 3.8, .055]} material={m.metal}/>)}
    {[.1, 3.7].map(y => <Box key={y} at={[4.45, y, -.5]} size={[.07, .055, 8.8]} material={m.metal}/>)}
    {[-4.32, 4.32].map(x => <Box key={x} at={[x, 3.5, -.5]} size={[.025, .025, 8.6]} material={m.warm} castShadow={false}/>)}
    <Box at={[0, 3.72, -2]} size={[3.5, .035, .035]} material={m.warm} castShadow={false}/>

    {/* One world unit is one metre. 2.4 m desk, 0.75 m worktop, 0.72 m monitor. */}
    <RoundedBox args={[2.4, .08, 1.1]} radius={.025} smoothness={2} position={[0, .75, -1.85]} material={m.wood} castShadow receiveShadow/>
    {[-1, 1].map(x => <group key={x}><Box at={[x, .39, -1.85]} size={[.07, .75, 1.05]} material={m.metal}/><Box at={[x, .05, -1.85]} size={[.4, .06, 1.12]} material={m.metal}/></group>)}
    <Exhibit id="about" onSelect={onSelect} enabled={enabled} position={[0, .34, -1.075]} scale={.5}>
      <Box at={[0, 1.31, -2.15]} size={[1.5, .86, .07]} material={m.metal}/>
      <Box at={[0, 1.31, -2.106]} size={[1.4, .77, .012]} material={m.screen}/>
      {[0, 1, 2, 3].map(i => <Box key={i} at={[-.15, 1.51 - i * .13, -2.096]} size={[.75 - i * .1, .018, .006]} material={m.blue} castShadow={false}/>)}
      <Box at={[0, .97, -2.15]} size={[.065, .24, .07]} material={m.metal}/>
      <Box at={[0, .865, -2.1]} size={[.6, .025, .3]} material={m.metal}/>
    </Exhibit>
    <Box at={[-.1, .8, -1.55]} size={[.44, .02, .15]} material={m.metal}/>
    <Box at={[.3, .81, -1.55]} size={[.07, .035, .11]} material={m.metal}/>
    <Exhibit id="contact" onSelect={onSelect} enabled={enabled} position={[.05, .08, -.35]} scale={.8}>
      <Box at={[1.03, .87, -1.75]} size={[.65, .025, .45]} material={m.metal}/>
      <group position={[1.03, .91, -1.94]} rotation={[-.2, 0, 0]}>
        <Box at={[0, .2, 0]} size={[.65, .4, .025]} material={m.metal}/>
        <Box at={[0, .2, .018]} size={[.59, .34, .008]} material={m.contact}/>
      </group>
    </Exhibit>
    <RoundedBox args={[.8, .12, .75]} radius={.06} smoothness={2} position={[0, .48, -.25]} material={m.leather} castShadow/>
    <RoundedBox args={[.8, .82, .13]} radius={.05} smoothness={2} position={[0, .94, .12]} rotation={[.12, 0, 0]} material={m.leather} castShadow/>
    <Box at={[0, 1.43, .15]} size={[.45, .22, .12]} material={m.leather}/>
    <mesh position={[0, .24, -.25]} material={m.metal}><cylinderGeometry args={[.045, .045, .46, 12]}/></mesh>
    {Array.from({ length: 5 }, (_, i) => <group key={i} position={[0, .085, -.25]} rotation={[0, i * Math.PI * .4, 0]}><Box at={[0, 0, .23]} size={[.06, .05, .5]} material={m.metal}/><mesh position={[0, -.02, .45]} rotation={[0, 0, Math.PI / 2]} material={m.leather}><cylinderGeometry args={[.045, .045, .07, 12]}/></mesh></group>)}
    {[-.47, .47].map(x => <group key={x}><Box at={[x, .76, -.2]} size={[.07, .06, .48]} material={m.leather}/><Box at={[x, .61, -.05]} size={[.035, .3, .035]} material={m.metal}/></group>)}

    <Exhibit id="projects" onSelect={onSelect} enabled={enabled}>
      {[2.65, 3.6].map(x => <group key={x} position={[x * .2, 0, -.75]} scale={.8}>
        <Box at={[x, 1.12, -3.75]} size={[.82, 2.2, .85]} material={m.metal}/>
        <Box at={[x, 1.12, -3.31]} size={[.72, 2.08, .018]} material={m.navy}/>
        {Array.from({ length: 8 }, (_, i) => <group key={i}><Box at={[x, .27 + i * .24, -3.28]} size={[.62, .16, .025]} material={m.wall}/><Box at={[x + .23, .27 + i * .24, -3.26]} size={[.024, .024, .01]} material={m.blue} castShadow={false}/><Box at={[x - .08, .27 + i * .24, -3.26]} size={[.3, .012, .01]} material={m.metal}/></group>)}
      </group>)}
    </Exhibit>
    <Exhibit id="skills" onSelect={onSelect} enabled={enabled}>
      <Box at={[.2, 2.65, -4.86]} size={[2.25, .72, .06]} material={m.metal}/>
      <Box at={[.2, 2.65, -4.82]} size={[2.1, .58, .015]} material={m.skills}/>
    </Exhibit>
    <group name="education" position={[-4.36, 1.9, -1.7]} rotation={[0, Math.PI / 2, 0]}>
      <Box at={[0, 0, 0]} size={[2.3, .8, .04]} material={m.wood}/>
      <Box at={[0, 0, .03]} size={[2.16, .65, .012]} material={m.timeline}/>
    </group>
    <Exhibit id="certifications" onSelect={onSelect} enabled={enabled}>
      <Box at={[-2.03, 2.18, -4.86]} size={[1.6, .8, .07]} material={m.champagne}/>
      <Box at={[-2.03, 2.18, -4.81]} size={[1.48, .68, .016]} material={m.certificates}/>
    </Exhibit>
    {[.3, 1.05, 1.8].map((y, row) => <group key={y}>
      <Box at={[-3.2, y, -4.65]} size={[1.65, .06, .5]} material={m.wood}/>
      {Array.from({ length: 5 }, (_, i) => <Box key={i} at={[-3.78 + i * .24, y + .23, -4.64]} size={[.17, .4 + (i % 2) * .06, .28]} material={[m.navy, m.ivory, m.wall][(i + row) % 3]}/>)}
    </group>)}
  </SelectedExhibit.Provider>
}
