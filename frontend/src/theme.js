import { useSyncExternalStore } from 'react'
import { palettes } from './palette'

export const THEME_KEY = 'paramjeet-theme'
const themeEvent = 'paramjeet-theme-change'

export function preferredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* Private browsing may disable storage. */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palettes[theme].background)
  window.dispatchEvent(new Event(themeEvent))
}

export function initializeTheme() {
  applyTheme(preferredTheme())
}

export function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') return
  try { window.localStorage.setItem(THEME_KEY, theme) } catch { /* Keep the toggle working without storage. */ }
  applyTheme(theme)
}

function subscribe(listener) {
  const syncStorage = event => {
    if (event.key === THEME_KEY || event.key === null) initializeTheme()
  }
  window.addEventListener(themeEvent, listener)
  window.addEventListener('storage', syncStorage)
  return () => {
    window.removeEventListener(themeEvent, listener)
    window.removeEventListener('storage', syncStorage)
  }
}

const snapshot = () => document.documentElement.dataset.theme || preferredTheme()

export function useTheme() {
  return [useSyncExternalStore(subscribe, snapshot, () => 'light'), setTheme]
}

export function usePalette() {
  const [theme] = useTheme()
  return palettes[theme]
}
