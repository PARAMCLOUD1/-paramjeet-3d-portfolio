import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { CHARACTER_URL, createOfficeRenderer, diagnosticStage, reportScene } from './diagnostics'

const renderer = vi.hoisted(() => ({ context: null, error: null, dispose: vi.fn(), options: null }))
vi.mock('three', () => ({ WebGLRenderer: class {
  constructor(options) { renderer.options = options; if (renderer.error) throw renderer.error }
  getContext() { return renderer.context }
  dispose() { renderer.dispose() }
} }))
beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  renderer.error = null
  renderer.context = { isContextLost: () => false, VERSION: 1, SHADING_LANGUAGE_VERSION: 2, getParameter: key => key === 1 ? 'WebGL 2.0' : 'GLSL ES 3.00', getContextAttributes: () => ({ antialias: true }) }
})
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs() })

test('renderer checks and logs the actual application context on the supplied canvas', () => {
  const canvas = document.createElement('canvas')
  const result = createOfficeRenderer({ canvas, antialias: true })
  expect(renderer.options.canvas).toBe(canvas)
  expect(result.getContext()).toBe(renderer.context)
  expect(console.info).toHaveBeenCalledWith('[portfolio:3d] context-created', expect.objectContaining({ version: 'WebGL 2.0' }))
})

test('renderer creation errors preserve the original error and log WebGL2 requirement', () => {
  renderer.error = new Error('Driver could not create WebGL2 context')
  expect(() => createOfficeRenderer({ canvas: document.createElement('canvas') })).toThrow(renderer.error)
  expect(console.error).toHaveBeenCalledWith('[portfolio:3d] renderer-initialization-failed', renderer.error, expect.objectContaining({ required: 'WebGL2' }))
})

test('an already lost context disposes the renderer and reports a useful error', () => {
  renderer.context.isContextLost = () => true
  expect(() => createOfficeRenderer({})).toThrow(/missing or already lost/)
  expect(renderer.dispose).toHaveBeenCalled()
})

test('diagnostics are silent and isolation queries are ignored in production', () => {
  vi.stubEnv('DEV', false)
  reportScene('scene-render', {}, new Error('private detail'))
  reportScene('context-created')
  expect(console.info).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(diagnosticStage('?scene=cube')).toBe('character')
})

test('isolation progresses from cube to asset-free office to the actual character URL', () => {
  expect(diagnosticStage('?scene=cube', true)).toBe('cube')
  expect(diagnosticStage('?scene=office', true)).toBe('office')
  expect(diagnosticStage('?scene=character', true)).toBe('character')
  expect(diagnosticStage('?scene=invalid', true)).toBe('character')
  expect(CHARACTER_URL).toBe('/models/businesswoman.glb')
})
