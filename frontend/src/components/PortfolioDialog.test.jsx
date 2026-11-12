import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, expect, test } from 'vitest'
import PortfolioDialog from './PortfolioDialog'

afterEach(cleanup)
function Fixture({ id = 'about' }) {
  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(null)
  return <><button onClick={event => { setTrigger(event.currentTarget); setOpen(true) }}>Open panel</button>{open && <PortfolioDialog selected={id} returnFocus={trigger} onClose={() => setOpen(false)}/>}</>
}

test('dialog locks scrolling, traps focus, closes on Escape and restores focus and overflow', () => {
  document.body.style.overflow = 'auto'
  render(<Fixture/> )
  const opener = screen.getByRole('button', { name: 'Open panel' })
  opener.focus()
  fireEvent.click(opener)
  const dialog = screen.getByRole('dialog', { name: 'About Me' })
  const close = screen.getByRole('button', { name: 'Close information panel' })
  expect(close).toHaveFocus()
  expect(document.body.style.overflow).toBe('hidden')
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true })
  expect(within(dialog).getByRole('link', { name: /LinkedIn/ })).toHaveFocus()
  fireEvent.keyDown(document.activeElement, { key: 'Tab' })
  expect(close).toHaveFocus()
  fireEvent.keyDown(dialog, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(opener).toHaveFocus()
  expect(document.body.style.overflow).toBe('auto')
  document.body.style.overflow = ''
})

test.each([
  ['about', /with the goal of starting my career in Cloud and DevOps engineering/],
  ['projects', /Smart Delivery Route Optimizer/],
  ['skills', /CentOS/],
  ['certifications', /Introduction to RPA/], ['contact', /open to internship opportunities/],
])('%s opens its complete content in the shared panel', (id, content) => {
  render(<Fixture id={id}/> )
  fireEvent.click(screen.getByRole('button', { name: 'Open panel' }))
  const dialog = screen.getByRole('dialog')
  expect(within(dialog).getByText(content)).toBeVisible()
  if (id === 'projects') expect(within(dialog).getAllByRole('article')).toHaveLength(7)
  if (id === 'certifications') expect(within(dialog).getAllByRole('listitem')).toHaveLength(9)
})
