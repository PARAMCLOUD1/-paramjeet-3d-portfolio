# 3D fallback investigation

Current cinematic redesign (2026-11-06): the default scene is `workspace`, an
interactive office with the real framed portrait and no generic character.
Explicit dev diagnostics below are retained; `?scene=character` is the historical
placeholder/entrance preview only. Production ignores all scene overrides.

## Confirmed root cause

The `Unsupported` component passed to `Canvas.fallback` called `onFailure()` in
`useEffect` when it mounted. The installed R3F `CanvasImpl` renders `fallback` as
children of the native `<canvas>`, even when WebGL is working. The browser hides
that fallback content visually; React still mounts the component and runs its
effects. The application therefore set `failed=true` and unmounted a healthy
Canvas without an exception. This explains why the console had no 3D error.

The original UI tests incorrectly treated Canvas fallback content as conditional.
A regression test using its real mounting behavior reproduced the problem before
the fix. `CanvasFallback.jsx` now contains passive markup and cannot change state.

## Failure paths after the fix

| Trigger | Development diagnostic | Behavior |
| --- | --- | --- |
| Actual WebGLRenderer construction failure, including unavailable WebGL2 | `renderer-initialization-failed`, then boundary report | Original error object and actual canvas logged; 2D links retained |
| Scene or Canvas initialization/render exception | `scene-render` | Error and React component stack logged |
| Character GLTF fetch, parse, texture decode, rig or animation component exception | `character-load-or-animation` | Original exception/stack and `/models/businesswoman.glb` logged |
| Framed photograph texture exception | `portrait-load` | Original exception/stack and `/images/profile.webp` logged |
| Scene not ready after 25 seconds, including stalled loader or zero-sized Canvas | `load-timeout` | Logs scene stage and whether Canvas reached `onCreated` |
| Real `webglcontextlost` event | `context-lost` | Captures status message, retains navigation; listener attaches in `onCreated` before model readiness |
| Context creation error event after Canvas creation | `context-creation-error` | Event status message logged; constructor-time errors use the renderer factory catch above |
| Native canvas fallback markup mounting | None | Passive text only; never marks the scene as failed |

Suspense pending promises show the loading overlay, not a failure. A loader
rejection reaches an asset boundary; a stalled load reaches the timed fallback.
The first failure is preserved, and listeners detach before teardown so intentional
context release cannot overwrite the original cause.

All `[portfolio:3d]` logging and error detail text are development-only. Production
keeps the ordinary fallback and accessible links without debug output. Development
scene query parameters are ignored by the production build.

## Application context and assets

`createOfficeRenderer` constructs Three.js WebGLRenderer using R3F's actual canvas,
not a second test canvas. It checks `getContext()` and `isContextLost()`, and logs
the GL version, shading language and context attributes. Three.js r180 requires
WebGL2; generic browser WebGL capability alone is not the application context test.

The actual runtime file is `frontend/public/models/businesswoman.glb` and its public
URL is `/models/businesswoman.glb` (3,561,764 bytes, `glTF` header). The source model
is intentionally outside public. `useGLTF` uses that exact URL without Draco or
Meshopt decoders. The real GLTFLoader asset check validates geometry, skinning and
Walk/Idle clips; it omits browser image decoding and does not certify GPU output.

There is no localStorage/sessionStorage persistence. Workspace/2D and manual Low
graphics are React state and reset on reload. Compact viewport/CPU hints may lower
graphics; system reduced motion skips the entrance. Neither means WebGL failed.

## Chrome verification

Run the normal Vite development server and open DevTools before loading a stage.
Enable Info and Error messages, filter on `portfolio:3d`, and use Network to check
asset requests. Each diagnostic URL auto-opens the existing workspace:

1. http://127.0.0.1:5173/?scene=cube#workspace - a static blue R3F cube with a
   basic material, no lights, office, textures, GLB requests or animation hooks.
   Expect `context-created` (WebGL 2), `canvas-created`, and `cube-mounted`.
2. http://127.0.0.1:5173/?scene=office#workspace - procedural room and existing
   keyboard/object controls, with portrait and character loaders omitted. Expect
   `office-mounted`; no model request should occur.
3. http://127.0.0.1:5173/?scene=character#workspace - complete office, portrait and
   character. Expect `character-loaded` with Walk and Idle clips; verify the GLB
   request returns 200, then watch the entrance and test skip/replay and 2D.

If hot reload retained a previous failure, hard reload (Ctrl+Shift+R) or unload and
reload the workspace. Any new failure prints its exact stage, Error and stack.
The DevTools suggestion and favicon request are unrelated to the original failure.
`favicon.svg`, an explicit icon link, and a valid `favicon.ico` now exist separately.

Automated checks include a real R3F reconciler/cube draw test with only its renderer
backend substituted, plus the native-fallback regression, real-context factory
diagnostics, context-loss handling, timeout and existing portfolio regressions.
The browser automation host was unavailable, so an actual Chrome GPU draw and
rendered desktop/mobile appearance still require the above manual verification.
