import { act, cloneElement, createRef } from 'react'
import { createRoot, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { expect, test, vi } from 'vitest'
import { gsap } from 'gsap'
import ExecutiveRoom from './ExecutiveRoom'
import { initializeTheme, setTheme, THEME_KEY } from '../theme'
import { palettes } from '../palette'
import CinematicRig from './CinematicRig'
import { constrainOfficePosition, createDoorTimeline, DOOR_ANGLE, ENTRY_START, OFFICE_VIEW, officeDestinations } from './doorTimeline'

async function room({ onSelect = () => {}, selected = null } = {}) {
  extend(THREE)
  const canvas = document.createElement('canvas')
  const renderer = { render: vi.fn(), setSize: vi.fn(), setPixelRatio: vi.fn(), domElement: canvas, shadowMap: {}, renderLists: { dispose: vi.fn() } }
  const refs = { left: createRef(), right: createRef(), handleLeft: createRef(), handleRight: createRef() }
  let state
  const root = createRoot(canvas)
  await root.configure({ gl: renderer, size: { width: 900, height: 600, top: 0, left: 0 }, frameloop: 'never', camera: { position: ENTRY_START, fov: 50 }, onCreated: value => { state = value } })
  const ready = vi.fn()
  const element = <ExecutiveRoom refs={refs} compact onReady={ready} onSelect={onSelect} selected={selected} enabled/>
  await act(async () => root.render(element))
  return { root, state, refs, renderer, element, ready, close: async () => { await act(async () => root.unmount()) } }
}

test('theme changes recolor the live scene without replacing geometry, moving the camera or enabling the Education object', async () => {
  window.localStorage.setItem(THEME_KEY, 'light')
  initializeTheme()
  const fixture = await room()
  try {
    const { state, refs } = fixture
    const door = refs.left.current.children.find(node => node.isMesh)
    const geometry = door.geometry
    const color = door.material.map.image.data.slice(0, 4)
    const textures = [door.material.map, door.material.bumpMap, door.material.roughnessMap]
    const disposed = textures.map(texture => vi.spyOn(texture, 'dispose'))
    const camera = state.camera.position.toArray()
    const position = refs.left.current.position.toArray()
    const rotation = refs.left.current.rotation.toArray()
    const decoration = state.scene.getObjectByName('education')
    expect(decoration).toBeDefined()
    expect(decoration.children).toHaveLength(2)
    expect(decoration.userData.destination).toBeUndefined()
    expect(decoration.__r3f.handlers.onClick).toBeUndefined()
    expect(state.scene.background.getHexString()).toBe(palettes.light.sceneBackground.slice(1).toLowerCase())
    await act(async () => setTheme('dark'))
    for (const dispose of disposed) expect(dispose).toHaveBeenCalledOnce()
    expect(state.scene.background.getHexString()).toBe(palettes.dark.sceneBackground.slice(1).toLowerCase())
    expect(door.geometry).toBe(geometry)
    expect(door.material.map.image.data.slice(0, 4)).not.toEqual(color)
    expect(state.camera.position.toArray()).toEqual(camera)
    expect(refs.left.current.position.toArray()).toEqual(position)
    expect(refs.left.current.rotation.toArray()).toEqual(rotation)
    expect(state.scene.getObjectByName('education')).toBe(decoration)
  } finally {
    await fixture.close()
    window.localStorage.removeItem(THEME_KEY)
    delete document.documentElement.dataset.theme
  }
})

test('five exhibit meshes raycast and bubble a single correct destination, with selection highlight', async () => {
  const select = vi.fn()
  const fixture = await room({ onSelect: select, selected: 'about' })
  try {
    fixture.state.scene.updateMatrixWorld(true)
    expect(fixture.state.scene.getObjectByName('about-highlight')).toBeDefined()
    for (const destination of officeDestinations) {
      const group = fixture.state.scene.getObjectByName(destination.id)
      let mesh
      group.traverse(node => { if (!mesh && node.isMesh) mesh = node })
      // Aim at a physical surface, not the empty gap between server cabinets.
      const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3())
      const origin = center.clone().add(new THREE.Vector3(0, 0, 2))
      const ray = new THREE.Raycaster(origin, center.clone().sub(origin).normalize())
      expect(ray.intersectObject(group, true).length).toBeGreaterThan(0)
      const event = { stopPropagation: vi.fn() }
      group.__r3f.handlers.onClick(event)
      expect(event.stopPropagation).toHaveBeenCalledOnce()
      expect(select).toHaveBeenLastCalledWith(destination.id)
    }
    expect(select).toHaveBeenCalledTimes(5)
    await act(async () => fixture.root.render(cloneElement(fixture.element, { enabled: false, selected: 'projects' })))
    expect(fixture.state.scene.getObjectByName('about-highlight')).toBeUndefined()
    expect(fixture.state.scene.getObjectByName('projects-highlight')).toBeDefined()
    fixture.state.scene.getObjectByName('about').__r3f.handlers.onClick({ stopPropagation: vi.fn() })
    expect(select).toHaveBeenCalledTimes(5)
  } finally { await fixture.close() }
})

test('opening and closing information leaves an explored camera position untouched', async () => {
  const fixture = await room()
  const controls = { current: { target: new THREE.Vector3() } }
  const entered = vi.fn(), moving = vi.fn()
  const render = async active => act(async () => fixture.root.render(<>{fixture.element}<CinematicRig refs={fixture.refs} controls={controls} phase="explore" run={0} reducedMotion={false} compact active={active} onEntered={entered} onMoving={moving}/></>))
  try {
    await render(true)
    fixture.state.camera.position.set(2.8, 2.1, 1.8)
    controls.current.target.set(-.5, 1.2, -2.2)
    await render(false)
    await render(true)
    expect(fixture.state.camera.position.toArray()).toEqual([2.8, 2.1, 1.8])
    expect(controls.current.target.toArray()).toEqual([-.5, 1.2, -2.2])
  } finally { await fixture.close() }
})

test('the real R3F scene contains volumetric hinged doors, five exhibits and bounded geometry', async () => {
  const fixture = await room()
  try {
    const { state, refs, ready, renderer } = fixture
    expect(ready).toHaveBeenCalled()
    const doorMesh = refs.left.current.children.find(item => item.isMesh)
    expect(doorMesh.geometry.type).toBe('BoxGeometry')
    expect(doorMesh.geometry.parameters.depth).toBeGreaterThan(.1)
    expect(refs.left.current.position.toArray()).toEqual([-1.4, 0, 4])
    expect(refs.right.current.position.toArray()).toEqual([1.4, 0, 4])
    for (const destination of officeDestinations) expect(state.scene.getObjectByName(destination.id)?.userData.destination).toBe(destination.id)
    let meshes = 0, triangles = 0
    state.scene.traverse(object => { if (object.isMesh) { meshes++; triangles += (object.geometry.index?.count || object.geometry.attributes.position.count) / 3 } })
    expect(meshes).toBeLessThan(240)
    expect(triangles).toBeLessThan(150000)
    console.info(`Executive scene geometry: ${meshes} meshes, ${triangles} triangles (compact, no GPU).`)
    state.advance(1)
    expect(renderer.render).toHaveBeenCalledWith(state.scene, state.camera)
  } finally { await fixture.close() }
})

test('actual GSAP door/camera motion clears every scene mesh and keeps hinge pivots fixed', async () => {
  const fixture = await room()
  let timeline
  try {
    const { state, refs } = fixture
    const look = new THREE.Vector3(0, 1.65, 0)
    state.scene.updateMatrixWorld(true)
    const hinges = [refs.left.current.getWorldPosition(new THREE.Vector3()), refs.right.current.getWorldPosition(new THREE.Vector3())]
    const colliders = []
    state.scene.traverse(object => {
      if (!object.isMesh) return
      object.geometry.computeBoundingBox()
      let node = object, dynamic = false
      while (node) { if (node === refs.left.current || node === refs.right.current) dynamic = true; node = node.parent }
      colliders.push({ object, bounds: object.geometry.boundingBox.clone().expandByScalar(.16), inverse: object.matrixWorld.clone().invert(), dynamic })
    })
    const complete = vi.fn()
    timeline = createDoorTimeline({ left: refs.left.current, right: refs.right.current, handleLeft: refs.handleLeft.current, handleRight: refs.handleRight.current, camera: state.camera, look, update: () => state.scene.updateMatrixWorld(true), complete })
    timeline.time(1.45)
    const entranceFrameHeight = 2 * (state.camera.position.z - 4) * Math.tan(state.camera.fov * Math.PI / 360)
    expect(entranceFrameHeight).toBeGreaterThan(3.2)
    expect(refs.handleLeft.current.rotation.z).toBeGreaterThan(0)
    expect(refs.left.current.rotation.y).toBe(0)
    const local = new THREE.Vector3()
    let firstCollision = null, maximumHingeDrift = 0, maximumThresholdError = 0
    for (let i = 0; i <= 600; i++) {
      timeline.time(timeline.duration() * i / 600)
      state.scene.updateMatrixWorld(true)
      for (const collider of colliders) {
        if (collider.dynamic) collider.inverse.copy(collider.object.matrixWorld).invert()
        local.copy(state.camera.position).applyMatrix4(collider.inverse)
        if (collider.bounds.containsPoint(local) && !firstCollision) firstCollision = `${collider.object.name || collider.object.geometry.type} at sample ${i}`
      }
      maximumHingeDrift = Math.max(maximumHingeDrift, refs.left.current.getWorldPosition(local).distanceTo(hinges[0]), refs.right.current.getWorldPosition(local).distanceTo(hinges[1]))
      if (state.camera.position.z <= 4) maximumThresholdError = Math.max(maximumThresholdError, Math.abs(refs.left.current.rotation.y - DOOR_ANGLE))
    }
    expect(firstCollision).toBeNull()
    expect(maximumHingeDrift).toBeLessThan(1e-8)
    // GSAP rounds scalar properties to six decimal places.
    expect(maximumThresholdError).toBeLessThan(1e-6)
    expect(state.camera.position.toArray()).toEqual(OFFICE_VIEW)
    expect(refs.handleLeft.current.rotation.z).toBe(0)
    expect(complete).toHaveBeenCalled()
    let orbitCollision = null
    for (const x of [-8, -1.4, 0, 1.4, 8]) for (const y of [0, 2.4, 8]) for (const z of [-8, 2.35, 8]) {
      const position = new THREE.Vector3(x, y, z)
      constrainOfficePosition(position)
      for (const collider of colliders) {
        if (collider.dynamic) collider.inverse.copy(collider.object.matrixWorld).invert()
        local.copy(position).applyMatrix4(collider.inverse)
        if (collider.bounds.containsPoint(local)) orbitCollision = collider.object.geometry.type
      }
    }
    expect(orbitCollision).toBeNull()
    timeline.kill()
    timeline = createDoorTimeline({ left: refs.left.current, right: refs.right.current, handleLeft: refs.handleLeft.current, handleRight: refs.handleRight.current, camera: state.camera, look, update: () => state.scene.updateMatrixWorld(true), complete })
    expect(state.camera.position.toArray()).toEqual(ENTRY_START)
    expect(refs.left.current.rotation.y).toBe(0)
  } finally { timeline?.kill(); await fixture.close() }
})

test('skip/replay and reduced motion reset real door transforms and kill the running timeline', async () => {
  const fixture = await room()
  const controls = { current: { target: new THREE.Vector3() } }
  const entered = vi.fn(), moving = vi.fn()
  const render = async (phase, reducedMotion = false) => act(async () => fixture.root.render(<>{fixture.element}<CinematicRig refs={fixture.refs} controls={controls} phase={phase} run={0} selected={null} reducedMotion={reducedMotion} compact active onEntered={entered} onMoving={moving}/></>))
  try {
    await render('closed')
    await render('entering')
    const timeline = gsap.globalTimeline.getChildren().find(child => child.labels?.threshold !== undefined)
    expect(timeline).toBeDefined()
    timeline.pause().time(2.6)
    await render('explore')
    expect(fixture.refs.left.current.rotation.y).toBe(DOOR_ANGLE)
    expect(fixture.state.camera.position.toArray()).toEqual(OFFICE_VIEW)
    expect(gsap.globalTimeline.getChildren()).not.toContain(timeline)
    await render('closed')
    expect(fixture.refs.left.current.rotation.y).toBe(0)
    expect(fixture.state.camera.position.toArray()).toEqual(ENTRY_START)
    await render('closed', true)
    expect(fixture.refs.left.current.rotation.y).toBe(DOOR_ANGLE)
    expect(entered).toHaveBeenCalled()
  } finally { await fixture.close() }
})

test('hidden scenes pause without restarting and motion preference changes stay paused', async () => {
  const fixture = await room()
  const controls = { current: { target: new THREE.Vector3() } }
  const entered = vi.fn(), moving = vi.fn()
  const render = async (active, reducedMotion = false) => act(async () => fixture.root.render(<>{fixture.element}<CinematicRig refs={fixture.refs} controls={controls} phase="entering" run={0} selected={null} reducedMotion={reducedMotion} compact active={active} onEntered={entered} onMoving={moving}/></>))
  const entrance = () => gsap.globalTimeline.getChildren().find(child => child.labels?.threshold !== undefined)
  try {
    await render(true)
    const timeline = entrance()
    await render(false)
    expect(timeline.paused()).toBe(true)
    const time = timeline.time()
    await render(true)
    expect(entrance()).toBe(timeline)
    expect(timeline.paused()).toBe(false)
    expect(timeline.time()).toBeCloseTo(time, 1)
    await render(false, true)
    expect(entrance()).toBeUndefined()
    await render(false, false)
    expect(entrance().paused()).toBe(true)
  } finally { await fixture.close() }
})
