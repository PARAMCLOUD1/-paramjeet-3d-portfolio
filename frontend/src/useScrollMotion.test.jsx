import { useRef } from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollMotion from './useScrollMotion'

function Page() {
  const root = useRef(null)
  const progress = useRef(null)
  useScrollMotion(root, progress)
  return <><div ref={progress} data-testid="progress"/><main ref={root}><h2 data-scroll-reveal>Readable section</h2><figure><img data-portrait-parallax alt="Test portrait"/></figure></main></>
}

function preference(allowed) {
  const queries = new Map()
  vi.stubGlobal('matchMedia', vi.fn(query => {
    if (!queries.has(query)) queries.set(query, { matches: query.includes('no-preference') && allowed, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn() })
    return queries.get(query)
  }))
  vi.stubGlobal('scrollTo', vi.fn())
  return queries
}

afterEach(() => { cleanup(); ScrollTrigger.killAll(); vi.unstubAllGlobals() })

test('reduced-motion section text remains readable without scroll transforms', () => {
  preference(false)
  render(<Page/> )
  expect(screen.getByRole('heading').style.transform).toBe('')
  expect(screen.getByRole('heading').style.opacity).toBe('')
  expect(screen.getByTestId('progress').style.transform).toBe('')
})

test('changing motion preference kills actual scroll triggers and layout observers', () => {
  const queries = preference(true)
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() { disconnect() } })
  const { unmount } = render(<Page/> )
  expect(ScrollTrigger.getAll().length).toBeGreaterThan(0)
  expect(screen.getByRole('heading').style.opacity).toBe('')
  act(() => {
    for (const [query, media] of queries) if (query.includes('no-preference')) media.matches = false
    gsap.matchMediaRefresh()
  })
  expect(ScrollTrigger.getAll()).toHaveLength(0)
  expect(screen.getByRole('heading').style.transform).toBe('')
  expect(screen.getByAltText('Test portrait').style.transform).toBe('')
  expect(disconnect).toHaveBeenCalled()
  unmount()
})
