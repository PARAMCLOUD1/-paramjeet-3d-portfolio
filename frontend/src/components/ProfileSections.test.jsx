import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import ProfileSections from './ProfileSections'

afterEach(cleanup)

test('cloud and DevOps skills expand with honest learning labels', () => {
  render(<ProfileSections/> )
  const cloud = screen.getByRole('heading', { name: 'Cloud Computing' }).closest('details')
  expect(cloud.open).toBe(false)
  fireEvent.click(cloud.querySelector('summary'))
  expect(within(cloud).getByText('AWS')).toBeVisible()
  expect(within(cloud).getByText('Currently learning')).toBeVisible()
  const devops = screen.getByRole('heading', { name: 'DevOps' }).closest('details')
  fireEvent.click(devops.querySelector('summary'))
  expect(within(devops).getByText('Docker')).toBeVisible()
  expect(within(devops).getByText('Kubernetes')).toBeVisible()
  expect(within(devops).getByText('CI/CD')).toBeVisible()
})

test('education and all supplied course names are retained without invented issuers', () => {
  render(<ProfileSections/> )
  expect(screen.getByRole('heading', { name: 'Bachelor of Computer Applications' })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'MCA — Cloud Computing & DevOps' })).toBeVisible()
  const section = screen.getByRole('heading', { name: /Learning beyond/ }).closest('section')
  expect(within(section).getAllByRole('listitem')).toHaveLength(9)
  expect(within(section).getByText('Word, Excel & PowerPoint')).toBeVisible()
  expect(screen.getByRole('link', { name: /param1539064/ })).toHaveAttribute('href', 'mailto:param1539064@gmail.com')
  expect(screen.getByRole('link', { name: /7814433864/ })).toHaveAttribute('href', 'tel:+917814433864')
  expect(screen.queryByRole('link', { name: /LinkedIn/i })).not.toBeInTheDocument()
})
