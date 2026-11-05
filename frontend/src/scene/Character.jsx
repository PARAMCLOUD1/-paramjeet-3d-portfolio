import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { MathUtils, Vector3 } from 'three'
import { CAMERA_END, CAMERA_START, CAMERA_TARGET, ROUTE, sampleRoute, smoothstep, WALK_DURATION } from './entrance'
import { CHARACTER_URL, reportScene } from './diagnostics'

export default function Character({ mode, run, active, reducedMotion, compact, controls, onReady, onArrive }) {
  // Local, uncompressed GLB: no remote decoder, texture or animation dependency.
  const { scene, animations } = useGLTF(CHARACTER_URL, false, false)
  const model = useMemo(() => {
    const copy = clone(scene)
    copy.traverse(object => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
        // Skinned vertices travel beyond the rest-pose bounding box.
        object.frustumCulled = false
      }
    })
    return copy
  }, [scene])
  const group = useRef()
  const elapsed = useRef(0)
  const arrived = useRef(false)
  const { actions, mixer } = useAnimations(animations, model)
  const { camera, invalidate } = useThree()
  const vectors = useMemo(() => ({ from: new Vector3(...CAMERA_START), to: new Vector3(...CAMERA_END), target: new Vector3(...CAMERA_TARGET), look: new Vector3() }), [])

  useEffect(() => {
    reportScene('character-loaded', { url: CHARACTER_URL, clips: animations.map(clip => clip.name) })
    onReady()
  }, [onReady, animations])
  useEffect(() => {
    elapsed.current = 0
    arrived.current = false
    invalidate()
  }, [run, invalidate])
  useEffect(() => {
    const walking = mode === 'walking' && !reducedMotion
    const next = walking ? actions.Walk : actions.Idle
    next?.reset().fadeIn(.45).play()
    const previous = walking ? actions.Idle : actions.Walk
    previous?.fadeOut(.45)
    invalidate()
  }, [mode, reducedMotion, actions, invalidate])
  useEffect(() => {
    // useAnimations owns mixer advancement; timeScale also freezes it offscreen.
    actions.Walk?.setEffectiveTimeScale(active && !reducedMotion ? 1 : 0)
    actions.Idle?.setEffectiveTimeScale(active && !reducedMotion ? 1 : 0)
  }, [actions, active, reducedMotion])
  useEffect(() => () => {
    mixer.stopAllAction()
    // Geometry/materials belong to useGLTF's bounded cache; skeletons are per clone.
    model.traverse(object => { if (object.isSkinnedMesh) object.skeleton.dispose() })
  }, [mixer, model])
  useEffect(() => {
    invalidate()
    if (!active || reducedMotion) return
    const timer = window.setInterval(invalidate, 1000 / (compact ? 24 : 30))
    return () => window.clearInterval(timer)
  }, [active, reducedMotion, compact, invalidate])
  useEffect(() => {
    if (mode !== 'idle') return
    camera.position.copy(vectors.to)
    if (controls.current) controls.current.target.copy(vectors.target)
    camera.lookAt(vectors.target)
    invalidate()
  }, [mode, camera, controls, vectors, invalidate])

  useFrame((_, delta) => {
    if (!group.current) return
    const walking = mode === 'walking' && !reducedMotion
    const dt = active ? Math.min(delta, .05) : 0
    const target = controls.current
    if (walking) {
      elapsed.current += dt
      const progress = Math.min(1, elapsed.current / WALK_DURATION)
      const sample = sampleRoute(progress)
      group.current.position.set(...sample.position)
      const finalTurn = smoothstep((progress - .94) / .06)
      const heading = sample.heading + MathUtils.euclideanModulo(Math.PI - sample.heading + Math.PI, Math.PI * 2) - Math.PI
      const desired = sample.heading + (heading - sample.heading) * finalTurn
      // Shortest-angle interpolation avoids spinning at route corners.
      const difference = MathUtils.euclideanModulo(desired - group.current.rotation.y + Math.PI, Math.PI * 2) - Math.PI
      group.current.rotation.y += difference * (1 - Math.exp(-dt * 9))
      const t = smoothstep(progress)
      camera.position.lerpVectors(vectors.from, vectors.to, t)
      vectors.look.set(sample.position[0] * (1 - t) * .4, 1.05, sample.position[2] * (1 - t) * .4)
      if (target) target.target.copy(vectors.look)
      camera.lookAt(vectors.look)
      if (progress >= 1 && !arrived.current) {
        arrived.current = true
        onArrive()
      }
    } else {
      group.current.position.set(...ROUTE.at(-1))
      group.current.rotation.y = Math.PI
    }
  })

  return <group ref={group} position={mode === 'walking' ? ROUTE[0] : ROUTE.at(-1)} rotation={[0, Math.PI, 0]} dispose={null}><primitive object={model}/></group>
}
