import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import App from './App'
afterEach(cleanup)
vi.mock('./components/Health',()=>({default:()=>null}))
test('real contact links and portrait are accessible without loading WebGL',()=>{render(<App/>);expect(screen.getByRole('link',{name:/param1539064/})).toHaveAttribute('href','mailto:param1539064@gmail.com');expect(screen.getByAltText(/pink sweater/)).toHaveAttribute('src','/images/profile.webp');expect(screen.getByRole('button',{name:/Load interactive/})).toBeVisible()})
test('navigation toggles and closes after a destination is chosen',()=>{render(<App/>);const menu=screen.getByRole('button',{name:/Menu/});fireEvent.click(menu);expect(menu).toHaveAttribute('aria-expanded','true');fireEvent.click(screen.getByRole('link',{name:'About'}));expect(menu).toHaveAttribute('aria-expanded','false')})
