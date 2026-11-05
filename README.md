# Paramjeet 3D Portfolio - Phase 3

PARAMJEET.DEV, the portfolio of Paramjeet Kaur. Phase 3 incrementally extends the existing React / React Three Fiber office and Flask backend. No new runtime dependencies or deployment.

## Run locally (Windows PowerShell)

Backend, from `paramjeet-3d-portfolio/backend`:

```powershell
..\.venv\Scripts\python.exe app.py
```

Frontend, from `paramjeet-3d-portfolio/frontend`:

```powershell
npm.cmd ci # first setup or lockfile changes only
npm.cmd run dev
```

Open http://127.0.0.1:5173. Use `npm.cmd` because this machine blocks `npm.ps1`. The Flask development API runs on port 5000; Vite proxies `/api` to it. Existing environment examples and backend behavior are unchanged.

## Phase 3 experience

Select **Enter Workspace** or **Load interactive 3D workspace**. A loading screen covers preparation of the local character model. The female businesswoman placeholder walks from the doorway around the desk to the laptop; the camera tracks the entrance. Walk crossfades to Idle and a short portfolio introduction fades in beside links to About and Projects. The page stays scrollable and its existing introduction remains available throughout.

**Skip entrance**, **Replay entrance**, **Low graphics**, **Reset view**, and **Switch to 2D** are available. Reset and orbit are disabled during the entrance to avoid camera conflicts. The monitor/laptop, portrait, server and books retain their Phase 2 destination links and equivalent keyboard controls. Project filters, skills, education, contact links and API connectivity are preserved.

This is a generic licensed placeholder, **not Paramjeet's likeness**. It has realistic human geometry, a tailored suit and silver pixie hair. Its project-authored rig and keyframes approximate walking and breathing; they are not motion capture. See [CHARACTER.md](CHARACTER.md) for the remaining personalized-artwork work and [asset provenance](frontend/public/models/LICENSE.md) for the verified CC0 source.

## Rendering and fallback

- 3D remains optional and lazy-loaded. No remote model/CDN, texture, font or decoder is requested at runtime.
- Optimized GLB: 3,561,764 bytes; 46,997 triangles; 14 joints; named `Walk` and `Idle` clips. The preserved 15,594,944-byte source stays outside the public/build directory.
- Demand rendering; animation invalidation targets 30 FPS, or 24 FPS on compact/low graphics devices. Offscreen and hidden scenes stop rendering; the entrance clock pauses.
- DPR capped at 1.5; compact screens, low CPU-core hints and the Low graphics control select DPR 1 and disable shadows. No postprocessing, physics, extra lights with shadows, or new runtime dependencies.
- Reduced-motion users start at the workstation, without camera travel or animated idle. Replay is disabled while that preference is active.
- Error boundary, WebGL fallback, 25-second model timeout, and graphics-context loss handling retain all 2D content and workspace navigation. Unload/reload the workspace to retry after a graphics failure.
- Shared model resources stay in the loader cache; per-instance skeleton resources are disposed on unmount.

## Architecture

- `App.jsx`: existing landing page, sections and lazy workspace toggle.
- `scene/Office.jsx`: existing room/hotspots, new laptop/cloud diagram, loading/error UI and entrance orchestration.
- `scene/Character.jsx`: local GLB loading, cloned skeleton, animation crossfade and camera/route updates.
- `scene/entrance.js`: doorway-to-workstation route and camera constants.
- `scene/useScenePreferences.js`: motion preference, compact-device hints and scene visibility.
- `scripts/build-character.mjs`: reproducible texture optimization, approximate rigging and clip authoring from the preserved CC0 source; uses existing Sharp and Three.js.
- `scripts/verify-character.mjs`: real Three.js loader, skeleton, deformation, crossfade and asset-budget verification without a GPU.
- `backend/app.py`: unchanged read-only health API and origin allowlist. No contact submissions are collected.

## Verify

From `frontend`:

```powershell
npm.cmd run lint
npm.cmd test
node scripts/verify-character.mjs
npm.cmd run build
```

From `backend`:

```powershell
..\.venv\Scripts\python.exe -m pytest -q
Invoke-RestMethod http://127.0.0.1:5000/api/health
Invoke-RestMethod http://127.0.0.1:5173/api/health
```

To rebuild the optimized character, run `node scripts/build-character.mjs` from `frontend`.

Build warning: the optional Three.js office chunk exceeds Vite's 500 KB advisory threshold. It stays outside the initial landing bundle. Actual GPU/mobile FPS and the character's visual joint quality still require human browser review; this session's browser host was unavailable and native Computer Use could not verify the current Chrome URL.

## Git and remaining work

Configured origin: https://github.com/PARAMCLOUD1/-paramjeet-3d-portfolio.git (note the leading hyphen). Access to its existing `main` branch was verified. Save meaningful verified milestones as minor/major commits and push without force. No hosting deployment is authorized by a Git push alone.

Remaining: personalized likeness and artist-reviewed rig/foot contacts, rendered desktop/mobile verification, real project URLs, certifications and resume when supplied. Earlier requirements for a recognizable custom character and Blender-editable artwork remain future personalization work; this phase explicitly permits a placeholder. See [AUDIT.md](AUDIT.md) for verification history and limitations.
