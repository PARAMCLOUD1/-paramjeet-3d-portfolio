import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import App from './App'
afterEach(cleanup)
vi.mock('./components/Health',()=>({default:()=>null}))
vi.mock('./scene/Office',()=>({default:()=> <p>Office loaded on request</p>}))

test('hero project link preserves lazy office loading and office action loads it', async () => {
  render(<App/> )
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('PARAMJEET KAUR')
  expect(screen.getByText("BUILDING. AUTOMATING. DEPLOYING.")).toBeVisible()
  expect(screen.getByRole('link', { name: 'Explore Projects' })).toHaveAttribute('href', '#projects')
  expect(screen.queryByText('Office loaded on request')).not.toBeInTheDocument()
  const office = screen.getByRole('link', { name: 'Enter My World' })
  expect(office).toHaveAttribute('href', '#workspace')
  fireEvent.click(office)
  expect(await screen.findByText('Office loaded on request')).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Switch to 2D' }))
  expect(screen.queryByText('Office loaded on request')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Scroll to explore' })).toHaveAttribute('href', '#workspace')
})
test('real contact links and portrait are accessible without loading WebGL',()=>{render(<App/>);expect(screen.getByRole('link',{name:/param1539064/})).toHaveAttribute('href','mailto:param1539064@gmail.com');expect(screen.getByAltText(/pink sweater/)).toHaveAttribute('src','/images/profile.webp');expect(screen.getByRole('button',{name:/Load interactive/})).toBeVisible()})
test('navigation toggles and closes after a destination is chosen',()=>{render(<App/>);const menu=screen.getByRole('button',{name:/Menu/});fireEvent.click(menu);expect(menu).toHaveAttribute('aria-expanded','true');fireEvent.click(screen.getByRole('link',{name:'About'}));expect(menu).toHaveAttribute('aria-expanded','false')})
