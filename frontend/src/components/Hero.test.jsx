import { StrictMode } from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { gsap } from 'gsap'
import Hero from './Hero'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })

function motionPreference(allowed) {
  const media = { matches: allowed, addEventListener: vi.fn(), removeEventListener: vi.fn() }
  vi.stubGlobal('matchMedia', vi.fn(() => media))
  return media
}

test('reduced motion leaves hero content visible without an entrance tween', () => {
  motionPreference(false)
  render(<StrictMode><Hero onEnterOffice={() => {}}/></StrictMode>)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading.style.opacity).toBe('')
  expect(heading.style.transform).toBe('')
  expect(screen.getByRole('link', { name: 'Explore Projects' })).toBeVisible()
})

test('motion preference changes revert an active entrance and unmount removes listeners', () => {
  const media = motionPreference(true)
  const { unmount } = render(<StrictMode><Hero onEnterOffice={() => {}}/></StrictMode>)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading.style.opacity).toBe('0')
  act(() => { media.matches = false; gsap.matchMediaRefresh() })
  expect(heading.style.opacity).toBe('')
  expect(heading.style.transform).toBe('')
  unmount()
  expect(media.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
})
