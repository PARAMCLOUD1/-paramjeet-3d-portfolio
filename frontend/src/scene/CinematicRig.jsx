import { useEffect, useLayoutEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { createDoorTimeline, DOOR_ANGLE, ENTRY_START, OFFICE_TARGET, OFFICE_VIEW } from './doorTimeline'

export default function CinematicRig({ refs, controls, phase, run, reducedMotion, compact, active, onEntered, onMoving }) {
  const { camera, invalidate } = useThree()
  const animation = useRef(null)
  const previousPhase = useRef(null)

  useLayoutEffect(() => {
    camera.setFocalLength(.5 * camera.getFilmHeight() / Math.tan((compact ? 56 : 50) * Math.PI / 360))
    invalidate()
  }, [camera, compact, invalidate])

  useLayoutEffect(() => {
    const { left, right, handleLeft, handleRight } = refs
    if (!left.current || !right.current || !handleLeft.current || !handleRight.current) return
    const look = controls.current?.target.clone() || new Vector3(0, 1.65, 0)
    const update = () => {
      camera.lookAt(look)
      if (controls.current) controls.current.target.copy(look)
      invalidate()
    }
    let timeline
    if (phase === 'loading' || (phase === 'closed' && !reducedMotion)) {
      left.current.rotation.set(0, 0, 0); right.current.rotation.set(0, 0, 0)
      handleLeft.current.rotation.set(0, 0, 0); handleRight.current.rotation.set(0, 0, 0)
      camera.position.set(...ENTRY_START)
      look.set(0, 1.65, 0)
      onMoving(false)
      update()
    } else if (phase === 'entering' && !reducedMotion) {
      onMoving(true)
      timeline = createDoorTimeline({ left: left.current, right: right.current, handleLeft: handleLeft.current, handleRight: handleRight.current, camera, look, update, complete: onEntered })
    } else {
      left.current.rotation.set(0, DOOR_ANGLE, 0)
      right.current.rotation.set(0, -DOOR_ANGLE, 0)
      handleLeft.current.rotation.set(0, 0, 0); handleRight.current.rotation.set(0, 0, 0)
      if (reducedMotion || previousPhase.current !== 'explore') {
        camera.position.set(...OFFICE_VIEW); look.set(...OFFICE_TARGET); update(); onMoving(false)
        if (reducedMotion && phase !== 'explore') onEntered()
      }
    }
    previousPhase.current = phase
    animation.current = timeline || null
    // Visibility is handled separately so pausing never rebuilds/restarts a sequence.
    timeline?.play()
    return () => { timeline?.kill(); if (animation.current === timeline) animation.current = null }
  }, [camera, controls, invalidate, onEntered, onMoving, phase, reducedMotion, refs, run])

  useEffect(() => {
    if (active) animation.current?.resume()
    else animation.current?.pause()
  }, [active, phase, run, reducedMotion])
  return null
}
