# PARAMJEET.DEV — cinematic redesign

The existing React / React Three Fiber portfolio and Flask backend, incrementally redesigned from the supplied local video. See [DESIGN_REFERENCE.md](DESIGN_REFERENCE.md) for timestamped analysis and [PROGRESS.md](PROGRESS.md) for milestone status. No new runtime dependencies or deployment.

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

## Current experience

The light, full-height portrait-led opening contrasts with the dark office/project showcase. Large editorial headings, light About/skills sections, date-led education, a certification grid and a dramatic contact close carry the visual direction from the reference. **Explore Projects**, **Enter 3D Office**, scroll progress, scoped GSAP/ScrollTrigger reveals and small desktop portrait parallax respect reduced motion. No scroll hijacking or looping role labels. The real portrait remains the hero visual while personalized character artwork is pending.

The project showcase contains all seven supplied names, six verified source links, a real electricity-dashboard preview and a verified-available demo. Project notes and seven skills categories use native keyboard-operable disclosures. Missing project evidence, issuing organizations and images are not fabricated; see [PROJECT_SOURCES.md](PROJECT_SOURCES.md).

Select **Enter 3D Office** or **Load interactive 3D workspace** to load the optional room. **Low graphics**, **Reset view**, and **Switch to 2D** remain available, along with monitor/laptop, portrait, server and book destinations and equivalent keyboard controls. Project filters, skills, education, contact links and Flask API behavior are preserved.

The historical generic businesswoman, rig and Walk/Idle entrance remain only in the explicit development preview at `http://127.0.0.1:5173/?scene=character#workspace`, with skip/replay controls. Production ignores this query and displays no substitute character. A personalized likeness is **not delivered**. See [CHARACTER.md](CHARACTER.md) and [asset provenance](frontend/public/models/LICENSE.md).

## Rendering and fallback

- 3D remains optional and lazy-loaded. No remote model/CDN, texture, font or decoder is requested at runtime.
- Retained preview GLB: 3,561,764 bytes; 46,997 triangles; 14 joints; named `Walk` and `Idle` clips. It is not fetched by the default office. The 15,594,944-byte source stays outside the public/build directory.
- Demand rendering; offscreen and hidden scenes stop rendering. The dev character preview targets 30 animation updates per second, or 24 with compact graphics; this is not a universal GPU performance guarantee.
- DPR capped at 1.5; compact screens, low CPU-core hints and the Low graphics control select DPR 1 and disable shadows. No postprocessing, physics, extra lights with shadows, or new runtime dependencies.
- Reduced-motion users start at the workstation, without camera travel or animated idle. Replay is disabled while that preference is active.
- Error boundary, WebGL fallback, 25-second model timeout, and graphics-context loss handling retain all 2D content and workspace navigation. Unload/reload the workspace to retry after a graphics failure.
- Shared model resources stay in the loader cache; per-instance skeleton resources are disposed on unmount.

## Architecture

- `App.jsx`: existing landing page, sections and lazy workspace toggle.
- `components/Hero.jsx` / `Hero.css`: responsive hero and scoped GSAP entrance.
- `scene/Office.jsx`: existing room/hotspots, new laptop/cloud diagram, loading/error UI and entrance orchestration.
- `scene/Character.jsx`: local GLB loading, cloned skeleton, animation crossfade and camera/route updates.
- `scene/entrance.js`: doorway-to-workstation route and camera constants.
- `scene/useScenePreferences.js`: motion preference, compact-device hints and scene visibility.
- `scripts/build-character.mjs`: reproducible texture optimization, approximate rigging and clip authoring from the preserved CC0 source; uses existing Sharp and Three.js.
- `scripts/verify-character.mjs`: real Three.js loader, skeleton, deformation, crossfade and asset-budget verification without a GPU.
- `backend/app.py`: unchanged read-only health API and origin allowlist. No contact submissions are collected.

## Verify

For fallback root cause, development-only context/error logs and the cube ->
office -> character isolation URLs, see [DEBUGGING_3D.md](DEBUGGING_3D.md).
Native Canvas fallback content is passive; mounting it never disables WebGL.

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

Remaining: seventh-project source/stack evidence, contact endpoint/delivery integration if required, personalized model and artist-reviewed rig/foot contacts, and rendered desktop/mobile verification. Generic substitution is prohibited by the current brief. See [AUDIT.md](AUDIT.md) for verification history and limitations.
