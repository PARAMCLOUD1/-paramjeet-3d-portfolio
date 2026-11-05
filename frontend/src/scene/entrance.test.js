import { expect, test } from 'vitest'
import { ROUTE, sampleRoute } from './entrance'

test('entrance route starts at the door, ends beside the desk, and stays outside furniture', () => {
  expect(sampleRoute(0).position).toEqual(ROUTE[0])
  sampleRoute(1).position.forEach((value, i) => expect(value).toBeCloseTo(ROUTE.at(-1)[i], 10))
  let previous = sampleRoute(0).position
  for (let i = 1; i <= 100; i++) {
    const { position: p, heading } = sampleRoute(i / 100)
    expect(p.every(Number.isFinite) && Number.isFinite(heading)).toBe(true)
    expect(p[1]).toBe(0)
    // Radius ~.2m: either beyond the right desk edge or in front of its edge.
    expect(p[0] >= 2.05 || p[2] >= 1.1).toBe(true)
    expect(Math.hypot(p[0] - previous[0], p[2] - previous[2])).toBeLessThan(.06)
    previous = p
  }
  expect(sampleRoute(-1).position).toEqual(ROUTE[0])
  sampleRoute(2).position.forEach((value, i) => expect(value).toBeCloseTo(ROUTE.at(-1)[i], 10))
})
