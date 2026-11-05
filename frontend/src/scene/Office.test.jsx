import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Office from './Office'

const simulation = vi.hoisted(() => ({ webgl: false, error: null, onCreated: null }))
// Exercise orchestration without a GPU; real GLB deformation is verified separately.
vi.mock('@react-three/fiber', () => ({ Canvas: ({ fallback, children, shadows, dpr, frameloop, onCreated }) => {
  simulation.onCreated = onCreated
  if (simulation.error) throw simulation.error
  return <><canvas data-testid="native-canvas">{fallback}</canvas>{simulation.webgl && <div data-testid="scene" data-stage={children.props.stage || 'cube'} data-mode={children.props.mode} data-shadows={String(shadows)} data-dpr={String(dpr)} data-loop={frameloop}><button onClick={children.props.character?.onReady || children.props.onReady}>Model ready</button><button onClick={children.props.character?.onArrive}>Character arrived</button></div>}</>
} }))
vi.mock('@react-three/drei', () => ({ Image: () => null, OrbitControls: () => null }))
beforeEach(() => { vi.spyOn(console, 'info').mockImplementation(() => {}); vi.spyOn(console, 'error').mockImplementation(() => {}) })
afterEach(() => { cleanup(); simulation.webgl = false; simulation.error = null; simulation.onCreated = null; window.history.replaceState({}, '', '/'); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

test('native canvas fallback content mounting must not mark a working renderer as failed', () => {
  simulation.webgl = true
  render(<Office/> )
  expect(screen.getByTestId('native-canvas')).toBeInTheDocument()
  expect(screen.getByTestId('scene')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Model ready' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-mode', 'walking')
})

test('every office destination remains available when WebGL is unsupported', () => {
  simulation.error = new Error('WebGL2 context creation failed')
  render(<Office/> )
  expect(screen.getByText(/^3D unavailable\. Use/)).toBeVisible()
  expect(console.error).toHaveBeenCalledWith('[portfolio:3d] scene-render', simulation.error, expect.objectContaining({ componentStack: expect.any(String) }))
  for (const [object, link, href] of [
    ['Monitor', 'View project areas', '#projects'],
    ['Portrait', 'Read about me', '#about'],
    ['Server', 'Explore my skills', '#skills'],
    ['Books', 'View my education', '#education'],
  ]) {
    const button = screen.getByRole('button', { name: new RegExp(object) })
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: new RegExp(link) })).toHaveAttribute('href', href)
  }
  fireEvent.click(screen.getByRole('button', { name: 'Dismiss office detail' }))
  expect(screen.queryByRole('link', { name: /View my education/ })).not.toBeInTheDocument()
  expect(screen.getByText(/Select an office object/)).toBeVisible()
})

test('loading, entrance, arrival, replay and skip preserve office navigation', () => {
  simulation.webgl = true
  render(<Office/> )
  expect(screen.getByText('Loading the 3D workspace')).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Model ready' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-mode', 'walking')
  expect(screen.getByRole('button', { name: 'Reset view' })).toBeDisabled()
  expect(screen.queryByRole('heading', { name: /Building a future/ })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Character arrived' }))
  expect(screen.getByRole('heading', { name: /Building a future/ })).toBeVisible()
  expect(screen.getByRole('link', { name: /Meet Paramjeet/ })).toHaveAttribute('href', '#about')
  fireEvent.click(screen.getByRole('button', { name: 'Replay entrance' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-mode', 'walking')
  fireEvent.click(screen.getByRole('button', { name: 'Skip entrance' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-mode', 'idle')
  fireEvent.click(screen.getByRole('button', { name: /Monitor/ }))
  expect(screen.getByRole('link', { name: /View project areas/ })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Low graphics' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-shadows', 'false')
  expect(screen.getByTestId('scene')).toHaveAttribute('data-dpr', '1')
})

test('reduced motion starts at the workstation and disables replay', () => {
  simulation.webgl = true
  vi.stubGlobal('matchMedia', vi.fn(query => ({ matches: query.includes('prefers-reduced-motion'), addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  render(<Office/> )
  fireEvent.click(screen.getByRole('button', { name: 'Model ready' }))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-mode', 'idle')
  expect(screen.getByRole('heading', { name: /Building a future/ })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Replay entrance' })).toBeDisabled()
})

test('a stalled model load releases the loading screen and retains destinations', () => {
  vi.useFakeTimers()
  simulation.webgl = true
  render(<Office/> )
  act(() => vi.advanceTimersByTime(25000))
  fireEvent.click(screen.getByRole('button', { name: /Books/ }))
  expect(screen.queryByText('Loading the 3D workspace')).not.toBeInTheDocument()
  expect(screen.getByText(/load-timeout:/)).toBeVisible()
  expect(console.error).toHaveBeenCalledWith('[portfolio:3d] load-timeout', expect.any(Error), expect.objectContaining({ canvasCreated: false }))
  expect(screen.getByRole('link', { name: /View my education/ })).toHaveAttribute('href', '#education')
})

test('context loss is caught before the character loads and reports its reason', () => {
  simulation.webgl = true
  render(<Office/> )
  const canvas = screen.getByTestId('native-canvas')
  act(() => simulation.onCreated({ gl: { domElement: canvas, getContext: () => ({ isContextLost: () => false }) }, size: { width: 800, height: 460 } }))
  const event = new Event('webglcontextlost', { cancelable: true })
  act(() => canvas.dispatchEvent(event))
  expect(event.defaultPrevented).toBe(true)
  expect(screen.getByText(/context-lost:/)).toBeVisible()
  expect(console.error).toHaveBeenCalledWith('[portfolio:3d] context-lost', expect.any(Error), expect.objectContaining({ modelUrl: '/models/businesswoman.glb' }))
  // A subsequent teardown event must not produce a second misleading failure.
  act(() => canvas.dispatchEvent(new Event('webglcontextlost')))
  expect(console.error.mock.calls.filter(([label]) => label === '[portfolio:3d] context-lost')).toHaveLength(1)
})

test.each(['cube', 'office'])('development isolation stage %s selects only the requested scene', stage => {
  simulation.webgl = true
  window.history.replaceState({}, '', `/?scene=${stage}`)
  render(<Office/> )
  expect(screen.getByTestId('scene')).toHaveAttribute('data-stage', stage)
  fireEvent.click(screen.getByRole('button', { name: 'Model ready' }))
  expect(screen.getByRole('heading', { name: /Building a future/ })).toBeVisible()
})

test('rendering pauses outside the viewport and resumes when visible', () => {
  simulation.webgl = true
  let notify
  const disconnect = vi.fn()
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { notify = callback }
    observe() {}
    disconnect() { disconnect() }
  })
  const { unmount } = render(<Office/> )
  act(() => notify([{ isIntersecting: false }]))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-loop', 'never')
  act(() => notify([{ isIntersecting: true }]))
  expect(screen.getByTestId('scene')).toHaveAttribute('data-loop', 'demand')
  unmount()
  expect(disconnect).toHaveBeenCalledOnce()
})
