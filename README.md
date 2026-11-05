# Paramjeet 3D Portfolio — Phase 2 in progress

PARAMJEET.DEV, the portfolio of Paramjeet Kaur. Phase 1 is implemented and Phase 2 development is approved. No deployment has been performed. The mandatory personalized animated character is blocked, not complete; see [CHARACTER.md](CHARACTER.md).

## Run on Windows PowerShell

Open two VS Code terminals. No Docker or activation script is required.

Backend (from the original workspace):

```powershell
cd C:\Users\simmibaby\Desktop\portfolio\paramjeet-3d-portfolio
# First setup only, if .venv does not exist:
& "$env:LOCALAPPDATA\Programs\Python\Python314\python.exe" -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
cd backend
..\.venv\Scripts\python.exe app.py
```

Frontend (second terminal):

```powershell
cd C:\Users\simmibaby\Desktop\portfolio\paramjeet-3d-portfolio\frontend
npm.cmd ci
npm.cmd run dev
```

Open http://127.0.0.1:5173. Use npm.cmd because this computer blocks PowerShell's npm.ps1 script. The detected Python is 3.14.5, Node is 26.13.0, npm is 11.20.0, Git is 2.56.0.

You should see your photograph, professional headline, working contact links, responsive navigation, and the optional workspace. Choose Enter Workspace or Load interactive 3D workspace, drag to orbit, scroll to zoom, and select the monitor for an About link. Switch to 2D unloads the scene. The development-only status under the scene reports Flask connectivity.

## How it works

- `frontend/src/App.jsx` composes the landing, About, and contact sections. React state opens the mobile menu and loads/unloads 3D.
- `frontend/src/scene/Office.jsx` creates a prototype using Three.js meshes through React Three Fiber. Drei OrbitControls updates the camera. Demand rendering and capped pixel density reduce rendering cost. This is procedural geometry, not a Blender asset or personalized character.
- `frontend/src/components/Health.jsx` fetches `/api/health`, validates the response, and handles timeout/offline states. Vite proxies local API requests to Flask on port 5000. Production uses configurable `VITE_API_BASE_URL` (requires rebuilding after changes).
- `backend/app.py` exposes a read-only Flask health endpoint. Flask-CORS only allows configured frontend origins. No database or contact submissions are collected. `FRONTEND_ORIGINS` is an environment variable; `.env.example` documents it, but files are not automatically loaded.
- `frontend/public/images/` preserves the original JPEG and a natural WebP derivative (no face edits). The supplied workspace original remains untouched too.
- Tailwind uses its Vite plugin and CSS import. Custom CSS defines the small design system. GSAP is installed as requested but cinematic animation is deferred.

## Verification commands

```powershell
cd C:\Users\simmibaby\Desktop\portfolio\paramjeet-3d-portfolio\frontend
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd audit
cd ..\backend
..\.venv\Scripts\python.exe -m pytest -q
Invoke-RestMethod http://127.0.0.1:5000/api/health
Invoke-RestMethod http://127.0.0.1:5173/api/health
```

Test on a narrow viewport: Menu must toggle and close on navigation, links must be keyboard accessible, and the page must remain usable with 3D unloaded or WebGL unavailable. Browser visual verification remains pending because the automation host was unavailable during implementation.

## Structure

```text
paramjeet-3d-portfolio/
  frontend/
    public/images/ (original JPEG, optimized WebP)
    src/
      components/Health.jsx
      scene/Office.jsx
      App.jsx, App.test.jsx, main.jsx, index.css, test-setup.js
    package.json, package-lock.json
    vite.config.js, eslint.config.js, index.html, .env.example
  backend/
    app.py, requirements.txt, .env.example
    tests/test_health.py
  README.md, AUDIT.md, .gitignore
```

## Git workflow and remaining work

The new project has its own repository; the inherited home-folder repository is untouched. Only this project is staged. A commit saves a reviewed snapshot locally; a push publishes it to the configured origin. The only configured destination is https://github.com/PARAMCLOUD1/paramjeet-3d-portfolio.git. Never force push. GitHub CLI was unavailable and remote lookup returned Repository not found; creation requires your approval and authenticated access.

Phase 2 is approved and underway. The office now includes four selectable destinations (monitor/projects, portrait/about, server/skills, books/education), equivalent keyboard controls, reset view, room details, and bounded orbit/zoom. The framed photograph is office decoration and does not satisfy the mandatory human character requirement.

Project-area filters summarize only the existing biography; individual repository URLs, results, and screenshots are not invented. Skills distinguish practical experience from ongoing learning. Education contains only the supplied MCA entry. Certifications, earlier education, LinkedIn and resume await real details/assets.

The character remains a required Phase 2 deliverable: real volumetric, recognizable, rigged human geometry, optimized GLB, editable source when made in Blender, Walk/Idle clips, and a camera-follow entrance. Tools and references needed to unblock it are recorded in CHARACTER.md. Phase 2 cannot be marked complete while this is missing.

Contact delivery, GSAP polish, Docker, CI and deployment remain later work. The user authorizes verified milestone commits and pushes to the configured origin; deployment is separate. Run lint, frontend tests and production build, conduct the supported Unslop review, then commit and push. Record failed remote access honestly; never force push.
