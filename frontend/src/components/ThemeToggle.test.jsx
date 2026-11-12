import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'
import { initializeTheme, preferredTheme, THEME_KEY } from '../theme'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})

test.each(['light', 'dark'])('first visit follows the device %s preference without storing a choice', theme => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: theme === 'dark' })))
  initializeTheme()
  render(<ThemeToggle/> )
  expect(document.documentElement.dataset.theme).toBe(theme)
  expect(window.localStorage.getItem(THEME_KEY)).toBeNull()
  expect(screen.getByRole('button', { name: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` })).toBeVisible()
})

test('toggle persists an explicit choice and initialization restores it over the device preference', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
  initializeTheme()
  const { unmount } = render(<ThemeToggle/> )
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
  expect(document.documentElement.dataset.theme).toBe('light')
  expect(window.localStorage.getItem(THEME_KEY)).toBe('light')
  unmount()
  delete document.documentElement.dataset.theme
  initializeTheme()
  render(<ThemeToggle/> )
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
  expect(window.localStorage.getItem(THEME_KEY)).toBe('dark')
})

test('invalid stored preferences fall back to the device preference', () => {
  window.localStorage.setItem(THEME_KEY, 'invalid')
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
  expect(preferredTheme()).toBe('dark')
})

test('blocked localStorage does not prevent switching themes', () => {
  vi.spyOn(window.Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
  vi.spyOn(window.Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked') })
  initializeTheme()
  render(<ThemeToggle/> )
  const previous = document.documentElement.dataset.theme
  fireEvent.click(screen.getByRole('button'))
  expect(document.documentElement.dataset.theme).not.toBe(previous)
})
