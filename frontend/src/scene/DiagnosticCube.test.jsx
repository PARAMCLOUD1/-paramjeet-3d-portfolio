import { act } from 'react'
import { createRoot, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { expect, test, vi } from 'vitest'
import DiagnosticCube from './DiagnosticCube'

test('minimal cube mounts and draws through the real R3F reconciler before any office assets', async () => {
  extend(THREE)
  const canvas = document.createElement('canvas')
  // jsdom has no GPU. Keep the actual R3F root/scene/camera and substitute only
  // the renderer backend; the development cube URL exercises real WebGL in Chrome.
  const renderer = { render: vi.fn(), setSize: vi.fn(), setPixelRatio: vi.fn(), domElement: canvas, shadowMap: {}, renderLists: { dispose: vi.fn() } }
  const ready = vi.fn()
  const log = vi.spyOn(console, 'info').mockImplementation(() => {})
  let state
  const root = createRoot(canvas)
  try {
    await root.configure({ gl: renderer, size: { width: 400, height: 300, top: 0, left: 0 }, frameloop: 'never', camera: { position: [3, 2, 4] }, onCreated: value => { state = value } })
    await act(async () => { root.render(<DiagnosticCube onReady={ready}/>) })
    expect(ready).toHaveBeenCalledOnce()
    const cube = state.scene.children.find(object => object.isMesh)
    expect(cube.geometry.type).toBe('BoxGeometry')
    expect(cube.material.type).toBe('MeshBasicMaterial')
    state.advance(1)
    expect(renderer.render).toHaveBeenCalledWith(state.scene, state.camera)
  } finally {
    await act(async () => root.unmount())
    log.mockRestore()
  }
})
