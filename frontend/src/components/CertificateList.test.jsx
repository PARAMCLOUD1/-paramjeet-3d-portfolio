import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import CertificateList from './CertificateList'
import { certifications } from '../content'

afterEach(cleanup)

const documented = [
  ['Introduction to Data Science', 'Infosys Springboard', '2026-09-19', 'September 19, 2026'],
  ['Introduction to Natural Language Processing', 'Infosys Springboard', '2026-09-19', 'September 19, 2026'],
  ['Introduction to Artificial Intelligence', 'Infosys Springboard', '2026-09-19', 'September 19, 2026'],
  ['Computer Vision 101', 'Infosys Springboard', '2026-09-20', 'September 20, 2026'],
  ['Introduction to Deep Learning', 'Infosys Springboard', '2026-09-20', 'September 20, 2026'],
  ['Introduction to Robotic Process Automation', 'Infosys Springboard', '2026-09-20', 'September 20, 2026'],
  ['Python Programming Fundamental', 'Chandigarh University, offered through Coursera', '2026-10-11', 'October 11, 2026'],
]

test.each([false, true])('page and office panel show the original credential metadata and secure links (panel: %s)', panel => {
  render(<CertificateList panel={panel}/> )
  expect(screen.getAllByRole('listitem')).toHaveLength(9)
  for (const [title, issuer, iso, date] of documented) {
    const card = screen.getByRole('heading', { name: title, exact: true }).closest('li')
    expect(within(card).getByText(issuer)).toBeVisible()
    expect(within(card).getByText(date)).toHaveAttribute('datetime', iso)
    const link = within(card).getByRole('link', { name: /^View Certificate:/ })
    expect(link).toHaveAttribute('href', certifications.find(certificate => certificate.title === title).pdf)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
  expect(screen.getAllByRole('link', { name: /^View Certificate:/ })).toHaveLength(7)
  const verification = screen.getByRole('link', { name: /^Verify Credential:/ })
  expect(verification).toHaveAttribute('href', 'https://coursera.org/verify/M41EOXMPNZ3C')
  expect(verification).toHaveAttribute('target', '_blank')
  expect(verification).toHaveAttribute('rel', 'noopener noreferrer')
  for (const title of ['Fundamentals of Cloud Computing', 'Microsoft Office (MS Office) — Basic & Advanced']) {
    const card = screen.getByRole('heading', { name: title }).closest('li')
    expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    expect(card.querySelector('time')).toBeNull()
  }
})

test('all seven unique certificate routes correspond to public PDF files', () => {
  const urls = certifications.filter(certificate => certificate.pdf).map(certificate => certificate.pdf)
  expect(new Set(certifications.map(certificate => certificate.id)).size).toBe(9)
  expect(new Set(certifications.map(certificate => certificate.title)).size).toBe(9)
  expect(new Set(urls).size).toBe(7)
  expect(readdirSync(resolve('public/certificates')).sort()).toEqual(urls.map(url => url.split('/').at(-1)).sort())
  for (const url of urls) {
    expect(url).toMatch(/^\/certificates\/[a-z0-9-]+\.pdf$/)
    const file = readFileSync(resolve('public', url.slice(1)))
    expect(file.subarray(0, 5).toString()).toBe('%PDF-')
    expect(file.length).toBeGreaterThan(100_000)
  }
})
