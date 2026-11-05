import { WebGLRenderer } from 'three'

export const CHARACTER_URL = '/models/businesswoman.glb'
export const PORTRAIT_URL = '/images/profile.webp'

export function reportScene(stage, detail = {}, error) {
  if (!import.meta.env.DEV) return
  if (error) console.error(`[portfolio:3d] ${stage}`, error, detail)
  else console.info(`[portfolio:3d] ${stage}`, detail)
}

export function diagnosticStage(search, development = import.meta.env.DEV) {
  if (!development) return 'character'
  const requested = new URLSearchParams(search).get('scene')
  return ['cube', 'office'].includes(requested) ? requested : 'character'
}

// R3F calls this with its own canvas. Test the actual renderer/context rather
// than opening an unrelated preflight canvas or assuming browser support.
export function createOfficeRenderer(defaults) {
  reportScene('context-creation-start', { antialias: defaults.antialias, powerPreference: defaults.powerPreference })
  try {
    const renderer = new WebGLRenderer(defaults)
    const context = renderer.getContext()
    if (!context || context.isContextLost()) {
      renderer.dispose()
      throw new Error('The application WebGL2 context is missing or already lost.')
    }
    reportScene('context-created', { version: context.getParameter(context.VERSION), shadingLanguage: context.getParameter(context.SHADING_LANGUAGE_VERSION), attributes: context.getContextAttributes() })
    return renderer
  } catch (error) {
    reportScene('renderer-initialization-failed', { required: 'WebGL2', canvas: defaults.canvas }, error)
    throw error
  }
}
