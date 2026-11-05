import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import Projects from './Projects'

afterEach(cleanup)
test('filtering project areas updates results and restores all areas', () => {
  render(<Projects/> )
  expect(screen.getAllByRole('article')).toHaveLength(3)
  fireEvent.click(screen.getByRole('button', { name: 'Systems' }))
  expect(screen.getByRole('button', { name: 'Systems' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('status')).toHaveTextContent('1 project area')
  expect(screen.getByRole('heading', { name: 'Linux monitoring tools' })).toBeVisible()
  expect(screen.queryByRole('heading', { name: 'Algorithm visualizers' })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'All', exact: true }))
  expect(screen.getAllByRole('article')).toHaveLength(3)
})
