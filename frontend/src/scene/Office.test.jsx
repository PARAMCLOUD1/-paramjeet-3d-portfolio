import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import Office from './Office'

// Simulate unavailable WebGL: semantic office controls must remain usable.
vi.mock('@react-three/fiber', () => ({ Canvas: ({ fallback }) => fallback }))
vi.mock('@react-three/drei', () => ({ Image: () => null, OrbitControls: () => null }))
afterEach(cleanup)

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
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
  expect(screen.getByText(/Select an office object/)).toBeVisible()
})
