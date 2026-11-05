import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import Office from './Office'

const simulation = vi.hoisted(() => ({ webgl: false }))
// Exercise orchestration without a GPU; real GLB deformation is verified separately.
vi.mock('@react-three/fiber', () => ({ Canvas: ({ fallback, children, shadows, dpr, frameloop }) => simulation.webgl ? <div data-testid="scene" data-mode={children.props.mode} data-shadows={String(shadows)} data-dpr={String(dpr)} data-loop={frameloop}><button onClick={children.props.character.onReady}>Model ready</button><button onClick={children.props.character.onArrive}>Character arrived</button></div> : fallback }))
vi.mock('@react-three/drei', () => ({ Image: () => null, OrbitControls: () => null }))
afterEach(() => { cleanup(); simulation.webgl = false; vi.useRealTimers(); vi.unstubAllGlobals() })

test('every office destination remains available when WebGL is unsupported', () => {
  render(<Office/> )
  expect(screen.getByText(/WebGL unavailable/)).toBeVisible()
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
  expect(screen.getByRole('link', { name: /View my education/ })).toHaveAttribute('href', '#education')
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
