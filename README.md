# PARAMJEET.DEV — Midnight Executive × Obsidian Cloud

V8 refines the existing portfolio with professional proportions and one shared
information panel system. Hero text is 48–64px on desktop and 32–40px on mobile;
sections use 30–40px / 24–30px. Buttons retain 44px touch targets and content is
capped at 1200px. Projects, skills, education and certificates use compact layouts.

About, Projects, Skills, Education, Certifications and Contact navigation opens
the same complete HTML content as the corresponding 3D exhibit. Native modal
dialogs sit above the canvas, with internal scrolling, Close/Escape, keyboard
cycling, focus restoration and reduced-motion-aware GSAP transitions. Opening a
panel pauses the scene and disables orbit controls; closing preserves the view.
Direct page sections remain available independently of WebGL.

The existing door/handle/camera sequence, verified assets, development-only legacy
character preview and Flask backend are preserved. Office proportions use metres;
see PROJECT_REPORT.md for dimensions, architecture and remaining verification.
No new runtime dependency or hosting deployment is introduced.

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

The Midnight Executive hero pairs career copy with an interactive office on desktop.
Mobile and save-data users start with the real portrait; **Enter My World** loads the
office and begins the entrance. **Explore Projects**, editorial sections, education,
certifications and direct contact links remain available with reduced-motion support.

The project showcase contains all seven supplied names, six verified source links,
a real electricity-dashboard preview and the previously verified demo. V8 adds
the supplied stack/algorithm details and a labelled additional demo URL. Project
notes and nine skills categories use native keyboard-operable disclosures. Missing
source evidence, issuers and images are not fabricated; see PROJECT_SOURCES.md.

The room has physical double doors with animated handles, a workstation, server
racks, technical display, wall timeline, certificate display and contact terminal.
Each exhibit has an equivalent keyboard button and complete HTML information
panel. **Skip Intro**, **Replay Intro**, **Low graphics**, **Reset view**, **Close**
and **Switch to 2D** support exploration. Reduced motion opens a static
office. Project filters, content and Flask API behavior are preserved.

The historical generic businesswoman, rig and Walk/Idle entrance remain only in the explicit development preview at `http://127.0.0.1:5173/?scene=character#workspace`, with skip/replay controls. Production ignores this query and displays no substitute character. A personalized likeness is **not delivered**. See [CHARACTER.md](CHARACTER.md) and [asset provenance](frontend/public/models/LICENSE.md).

## Rendering and fallback

- 3D is in a separate module, loaded automatically on desktop and on request on mobile/save-data. Switch to 2D unloads it. No remote model/CDN, texture, font or decoder is requested at runtime.
- Retained preview GLB: 3,561,764 bytes; 46,997 triangles; 14 joints; named `Walk` and `Idle` clips. It is not fetched by the default office. The 15,594,944-byte source stays outside the public/build directory.
- Demand rendering; offscreen and hidden scenes stop rendering. The dev character preview targets 30 animation updates per second, or 24 with compact graphics; this is not a universal GPU performance guarantee.
- DPR capped at 1.5; compact screens, low CPU-core hints and the Low graphics control select DPR 1 and disable shadows. No postprocessing, physics, extra lights with shadows, or new runtime dependencies.
- Reduced-motion users start at the workstation, without camera travel or animated idle. Replay is disabled while that preference is active.
- Error boundary, WebGL fallback, 25-second model timeout, and graphics-context loss handling retain all 2D content and workspace navigation. Unload/reload the workspace to retry after a graphics failure.
- Shared model resources stay in the loader cache; per-instance skeleton resources are disposed on unmount.

## Architecture

- `App.jsx`: shared selected-content state, navigation, responsive office loading and 2D toggle.
- `components/PortfolioDialog.jsx`: top-layer modal lifecycle, keyboard and focus handling.
- `components/PortfolioContent.jsx`: complete content for all six destinations.
- `content.js`: shared profile, education, projects, skills and course names.
- `scene/ExecutiveOffice.jsx`: entrance state, six accessible exhibits and fallbacks.
- `scene/ExecutiveRoom.jsx` / `officeMaterials.js`: physical room and local materials.
- `scene/CinematicRig.jsx` / `doorTimeline.js`: camera and door animation, visibility pause/resume.
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

Build warning: the optional Three.js office chunk exceeds Vite's 500 KB advisory
threshold and stays outside the initial landing bundle. Rendered desktop/mobile
layout, browser console and GPU performance remain unverified: the browser host is
unavailable and native app inventory timed out. See PROJECT_REPORT.md for limits.

## Git and remaining work

Configured origin: https://github.com/PARAMCLOUD1/-paramjeet-3d-portfolio.git (note the leading hyphen). Access to its existing `main` branch was verified. Save meaningful verified milestones as minor/major commits and push without force. No hosting deployment is authorized by a Git push alone.

Remaining: seventh-project source/stack evidence, contact endpoint/delivery integration if required, personalized model and artist-reviewed rig/foot contacts, and rendered desktop/mobile verification. Generic substitution is prohibited by the current brief. See [AUDIT.md](AUDIT.md) for verification history and limitations.
