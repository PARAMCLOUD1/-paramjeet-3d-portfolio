import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import Projects from './Projects'

afterEach(cleanup)
test('filtering the collection keeps the real featured project and restores all seven projects', () => {
  render(<Projects/> )
  expect(screen.getAllByRole('article')).toHaveLength(7)
  const collection = within(screen.getByRole('region', { name: 'Project collection' }))
  fireEvent.click(screen.getByRole('button', { name: 'Systems' }))
  expect(screen.getByRole('button', { name: 'Systems' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('status')).toHaveTextContent('1 project shown')
  expect(collection.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByRole('heading', { name: 'Server Health Monitoring System' })).toBeVisible()
  expect(screen.queryByRole('heading', { name: 'Pathfinding Visualizer' })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Smart Electricity Load Management System' })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'All', exact: true }))
  expect(screen.getAllByRole('article')).toHaveLength(7)
})

test('only verified project sources and demo are linked; real preview reserves dimensions', () => {
  render(<Projects/> )
  expect(screen.getByRole('link', { name: 'View Mini Banking System source on GitHub' })).toHaveAttribute('href', 'https://github.com/PARAMCLOUD1/mini-banking-system')
  expect(screen.getByRole('link', { name: /Open the electricity dashboard/ })).toHaveAttribute('href', 'https://paramsmartelectricitysystem.onrender.com/')
  const preview = screen.getByAltText(/Electricity dashboard/)
  expect(preview).toHaveAttribute('src', '/images/projects/electricity.webp')
  expect(preview).toHaveAttribute('width', '1280')
  expect(preview).toHaveAttribute('height', '720')
  const delivery = screen.getByRole('heading', { name: 'Smart Delivery Route Optimizer' }).closest('article')
  expect(within(delivery).queryByRole('link')).not.toBeInTheDocument()
})

test('project notes can be opened using native details', () => {
  render(<Projects/> )
  const summary = within(screen.getByRole('heading', { name: 'Smart Electricity Load Management System' }).closest('article')).getByText('Implementation details')
  const detail = summary.closest('details')
  expect(detail.open).toBe(false)
  fireEvent.click(summary)
  expect(detail.open).toBe(true)
  expect(within(detail).getByText(/0\/1 Knapsack/)).toBeVisible()
})
