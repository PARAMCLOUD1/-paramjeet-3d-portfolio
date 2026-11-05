// A route around the desk and plant; constant-distance sampling keeps footsteps steady.
export const ROUTE = [[2.8, 0, -2.3], [2.1, 0, -1.7], [2.1, 0, 1.15], [1.05, 0, 1.15]]
export const WALK_DURATION = 8.8
export const CAMERA_START = [6.8, 3.4, 6.7]
export const CAMERA_END = [5.4, 3.2, 6.2]
export const CAMERA_TARGET = [0, 1.05, 0]
const lengths = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[2] - ROUTE[i][2]))
const total = lengths.reduce((a, b) => a + b, 0)
export const smoothstep = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t) }
export function sampleRoute(progress) {
  let distance = Math.max(0, Math.min(1, progress)) * total
  for (let i = 0; i < lengths.length; i++) {
    if (distance <= lengths[i] || i === lengths.length - 1) {
      const t = Math.min(1, distance / lengths[i])
      const a = ROUTE[i], b = ROUTE[i + 1]
      return { position: a.map((v, k) => v + (b[k] - v) * t), heading: Math.atan2(b[0] - a[0], b[2] - a[2]) }
    }
    distance -= lengths[i]
  }
}
