import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { useState } from 'react'
import Office from './ExecutiveOffice'
import PortfolioDialog from '../components/PortfolioDialog'

function ExecutiveOffice(props) {
  const [selection, setSelection] = useState(null)
  return <><Office {...props} selected={selection?.id} onSelect={(id, trigger) => setSelection({ id, trigger })}/>{selection && <PortfolioDialog selected={selection.id} returnFocus={selection.trigger} onClose={() => setSelection(null)}/>}</>
}

const simulation = vi.hoisted(() => ({ error: null, onCreated: null }))
vi.mock('@react-three/fiber', () => ({ Canvas: ({ children, onCreated, dpr, shadows, frameloop, fallback }) => {
  simulation.onCreated = onCreated
  if (simulation.error) throw simulation.error
  const [room, rig] = children
  return <><canvas data-testid="canvas">{fallback}</canvas><div data-testid="executive" data-phase={rig.props.phase} data-dpr={String(dpr)} data-shadows={String(shadows)} data-loop={frameloop}><button onClick={room.props.onReady}>Scene ready</button><button onClick={rig.props.onEntered}>Journey complete</button></div></>
} }))
vi.mock('@react-three/drei', () => ({ OrbitControls: () => null }))

afterEach(() => { cleanup(); simulation.error = null; vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

test('loading, closed entrance, enter, skip and replay preserve the portfolio', () => {
  render(<ExecutiveOffice/> )
  expect(screen.getByText('Loading the 3D office')).toBeVisible()
  fireEvent.click(screen.getByText('Scene ready'))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'closed')
  expect(screen.getByRole('heading', { name: /Explore My Portfolio/ })).toBeVisible()
  expect(screen.getByText('Enter Portfolio', { exact: true })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Enter Portfolio' }))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'entering')
  fireEvent.click(screen.getByRole('button', { name: 'Skip Intro' }))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'explore')
  fireEvent.click(screen.getByRole('button', { name: 'Replay Intro' }))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'entering')
})

test('all five object panels contain complete information and restore keyboard focus', () => {
  render(<ExecutiveOffice/> )
  fireEvent.click(screen.getByRole('button', { name: 'Skip Intro' }))
  expect(screen.queryByRole('button', { name: /Education|Wall timeline/ })).not.toBeInTheDocument()
  for (const [object, title, id] of [
    ['Workstation monitor', 'About Me', 'about'], ['Server rack', 'Projects', 'projects'],
    ['Technical display', 'Technical Skills', 'skills'],
    ['Certificate display', 'Certifications', 'certifications'], ['Contact terminal', 'Get in Touch', 'contact'],
  ]) {
    const button = screen.getByRole('button', { name: new RegExp(object) })
    fireEvent.click(button)
    expect(screen.getByRole('dialog', { name: title })).toBeVisible()
    expect(screen.getByRole('region', { name: `${title} content` })).toBeVisible()
    expect(id).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Close information panel' })).toHaveFocus()
    fireEvent.click(screen.getByRole('button', { name: 'Close information panel' }))
    expect(button).toHaveFocus()
  }
})

test('reduced motion opens a static office and low graphics switches DPR and shadows', () => {
  vi.stubGlobal('matchMedia', vi.fn(query => ({ matches: query.includes('prefers-reduced-motion'), addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  render(<ExecutiveOffice/> )
  fireEvent.click(screen.getByText('Scene ready'))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'explore')
  expect(screen.getByRole('button', { name: 'Replay Intro' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: 'Low graphics' }))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-dpr', '1')
  expect(screen.getByTestId('executive')).toHaveAttribute('data-shadows', 'false')
})

test('a hero entrance request is honored when the scene becomes ready', () => {
  render(<ExecutiveOffice entranceRequest={1}/> )
  fireEvent.click(screen.getByText('Scene ready'))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'entering')
  fireEvent.click(screen.getByText('Journey complete'))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'explore')
})

test('skipping a requested intro during loading does not restart it when ready', () => {
  render(<ExecutiveOffice entranceRequest={1}/> )
  fireEvent.click(screen.getByRole('button', { name: 'Skip Intro' }))
  fireEvent.click(screen.getByText('Scene ready'))
  expect(screen.getByTestId('executive')).toHaveAttribute('data-phase', 'explore')
})

test('unsupported WebGL retains all five 2D exhibit destinations', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  simulation.error = new Error('WebGL2 unavailable')
  render(<ExecutiveOffice/> )
  expect(screen.getByText(/3D unavailable\. Use/)).toBeVisible()
  expect(screen.getByRole('group', { name: 'Executive office exhibits' }).querySelectorAll('button')).toHaveLength(6)
  fireEvent.click(screen.getByRole('button', { name: /Contact terminal/ }))
  expect(screen.getByRole('dialog', { name: 'Get in Touch' })).toBeVisible()
  expect(screen.getByRole('link', { name: 'param1539064@gmail.com' })).toHaveAttribute('href', 'mailto:param1539064@gmail.com')
})

test('timeout and context loss release loading and keep conventional navigation', () => {
  vi.useFakeTimers()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const { unmount } = render(<ExecutiveOffice/> )
  act(() => vi.advanceTimersByTime(25000))
  expect(screen.getByText(/3D unavailable\. Use/)).toBeVisible()
  unmount()
  render(<ExecutiveOffice/> )
  const canvas = screen.getByTestId('canvas')
  act(() => simulation.onCreated({ gl: { domElement: canvas } }))
  const event = new Event('webglcontextlost', { cancelable: true })
  act(() => canvas.dispatchEvent(event))
  expect(event.defaultPrevented).toBe(true)
  expect(screen.getByText(/context-lost:/)).toBeVisible()
})
