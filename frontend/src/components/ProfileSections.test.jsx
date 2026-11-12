import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import ProfileSections from './ProfileSections'
import { education, portfolioViews, certifications } from '../content'

afterEach(cleanup)

test('cloud and DevOps skills expand with honest learning labels', () => {
  render(<ProfileSections/> )
  const cloud = screen.getByRole('heading', { name: 'Cloud & DevOps — Currently Learning' }).closest('details')
  expect(cloud.open).toBe(false)
  fireEvent.click(cloud.querySelector('summary'))
  expect(within(cloud).getByText('AWS')).toBeVisible()
  expect(within(cloud).getAllByText('Currently learning')[0]).toBeVisible()
  const devops = cloud
  expect(within(devops).getByText('Docker')).toBeVisible()
  expect(within(devops).getByText('Kubernetes')).toBeVisible()
  expect(within(devops).getByText('CI/CD')).toBeVisible()
})

test('Education is removed while its source data and Certifications are preserved', () => {
  render(<ProfileSections/> )
  expect(document.getElementById('education')).toBeNull()
  expect(screen.queryByRole('link', { name: /education/i })).not.toBeInTheDocument()
  expect(portfolioViews.some(([id]) => id === 'education')).toBe(false)
  expect(education).toHaveLength(4)
  const section = screen.getByRole('heading', { name: 'Certifications' }).closest('section')
  expect(within(section).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(certifications.map(certificate => certificate.title))
  expect(within(section).getAllByRole('listitem')).toHaveLength(9)
  expect(screen.getByRole('link', { name: /param1539064/ })).toHaveAttribute('href', 'mailto:param1539064@gmail.com')
  expect(screen.getByRole('link', { name: /7814433864/ })).toHaveAttribute('href', 'tel:+917814433864')
  expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/paramjeet-kaur-cloud/')
})
