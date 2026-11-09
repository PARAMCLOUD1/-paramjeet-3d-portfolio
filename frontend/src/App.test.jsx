import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import App from './App'
afterEach(() => { cleanup(); vi.unstubAllGlobals() })
vi.mock('./components/Health',()=>({default:()=>null}))
vi.mock('./scene/ExecutiveOffice',()=>({default:()=> <p>Office loaded on request</p>}))

test('hero project link preserves lazy office loading and office action loads it', async () => {
  render(<App/> )
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Paramjeet Kaur')
  expect(screen.getByText("Developing practical skills in Linux, backend development, cloud infrastructure, and automation.")).toBeVisible()
  expect(screen.getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '#projects')
  expect(screen.queryByText('Office loaded on request')).not.toBeInTheDocument()
  const office = screen.getByRole('link', { name: 'Explore Portfolio' })
  expect(office).toHaveAttribute('href', '#workspace')
  fireEvent.click(office)
  expect(await screen.findByText('Office loaded on request')).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Switch to 2D' }))
  expect(screen.queryByText('Office loaded on request')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Explore the Office' })).toHaveAttribute('href', '#workspace')
})
test('real contact links and portrait are accessible without loading WebGL',()=>{render(<App/>);expect(screen.getByRole('link',{name:/param1539064/})).toHaveAttribute('href','mailto:param1539064@gmail.com');expect(screen.getByAltText(/pink sweater/)).toHaveAttribute('src','/images/profile.webp');expect(screen.getByRole('link',{name:'Explore Portfolio'})).toBeVisible()})
test('navigation toggles and closes after a destination is chosen',()=>{render(<App/>);const menu=screen.getByRole('button',{name:/Menu/});fireEvent.click(menu);expect(menu).toHaveAttribute('aria-expanded','true');fireEvent.click(screen.getByRole('link',{name:'About'}));expect(menu).toHaveAttribute('aria-expanded','false')})

test('all conventional navigation destinations open shared panels without WebGL', () => {
  render(<App/> )
  const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }))
  for (const label of ['About', 'Projects', 'Skills', 'Education', 'Certifications', 'Contact']) {
    const trigger = nav.getByRole('link', { name: label, exact: true })
    fireEvent.click(trigger)
    expect(screen.getByRole('dialog', { name: label === 'About' ? 'About Me' : label === 'Skills' ? 'Technical Skills' : label === 'Contact' ? 'Get in Touch' : label })).toBeVisible()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(trigger).toHaveFocus()
  }
  expect(screen.queryByText('Office loaded on request')).not.toBeInTheDocument()
})

test('a mobile navigation panel returns focus to the collapsed menu control', () => {
  vi.stubGlobal('matchMedia', vi.fn(query => ({ matches: query.includes('max-width: 800px'), addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  render(<App/> )
  const menu = screen.getByRole('button', { name: /Menu/ })
  fireEvent.click(menu)
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Education' }))
  expect(menu).toHaveAttribute('aria-expanded', 'false')
  fireEvent.click(screen.getByRole('button', { name: 'Close information panel' }))
  expect(menu).toHaveFocus()
})
