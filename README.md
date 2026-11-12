# PARAMJEET Portfolio

Personal portfolio of **Paramjeet Kaur**, MCA Student | Cloud Computing & DevOps.
The Sage Green and Cream interface combines a responsive project showcase with an
interactive architectural office built in Three.js.

[Visit the portfolio](https://paramjeet-studio.vercel.app/) · [GitHub repository](https://github.com/PARAMCLOUD1/-paramjeet-3d-portfolio)

## Features

- A two-column introduction and original portrait, with responsive sizing down to 320px.
- An always-visible Dark/Light Mode toggle, device preference on first visit and saved `localStorage` preference.
- Seven existing projects with technology tags, implementation details, filters and original repository/demo links. The electricity dashboard includes its real project preview.
- About, technical skills, certifications and direct contact details, available independently of WebGL.
- Keyboard-accessible information dialogs with focus trapping, Escape/Close controls and focus restoration.
- Reduced-motion support, on-demand mobile 3D loading, Low Graphics mode and a 2D fallback.

## Interactive 3D experience

The cinematic double doors lead into a sage-and-cream office with a workstation,
server racks, technical display, certificate display and contact terminal. Five
interactive exhibits open the same portfolio content as the page navigation.
The scene supports Skip Intro, Replay Intro, Reset View and equivalent keyboard
controls. Camera travel, door animations and office interactions are preserved.

Lighting and materials follow the selected theme. Rendering pauses when the scene
is hidden or offscreen; compact graphics reduce pixel density and disable shadows.
Reduced motion skips the animated entrance. A retained character preview is
development-only; its [asset provenance](frontend/public/models/LICENSE.md) and
build/verification scripts remain in the repository.

## Certifications

The page and 3D certificate panel share `frontend/src/content.js`. Seven original
certificate PDFs open in a new tab from the cards. The six Infosys documents are
individual, unaltered pages split from the supplied six-page PDF; the Coursera
document is an unchanged copy of the original.

| Certificate | Issuer | Completed | Document / credential |
| --- | --- | --- | --- |
| Introduction to Data Science | Infosys Springboard | September 19, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-introduction-to-data-science.pdf) |
| Introduction to Natural Language Processing | Infosys Springboard | September 19, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-introduction-to-natural-language-processing.pdf) |
| Introduction to Artificial Intelligence | Infosys Springboard | September 19, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-introduction-to-artificial-intelligence.pdf) |
| Computer Vision 101 | Infosys Springboard | September 20, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-computer-vision-101.pdf) |
| Introduction to Deep Learning | Infosys Springboard | September 20, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-introduction-to-deep-learning.pdf) |
| Introduction to Robotic Process Automation | Infosys Springboard | September 20, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/infosys-introduction-to-robotic-process-automation.pdf) |
| Python Programming Fundamental | Chandigarh University, offered through Coursera | October 11, 2026 | [PDF](https://paramjeet-studio.vercel.app/certificates/coursera-python-programming-fundamental.pdf) · [Verify credential](https://coursera.org/verify/M41EOXMPNZ3C) |

Existing Fundamentals of Cloud Computing and Microsoft Office (MS Office) — Basic
& Advanced entries are also retained. Their issuer, date and document links are
omitted because those details have not been supplied. Generic issuer homepages
are not presented as credential verification links.

## Technology

| Area | Stack |
| --- | --- |
| UI | React 19, Vite 7, Tailwind CSS 4 and custom CSS |
| 3D and motion | Three.js, React Three Fiber, Drei, GSAP |
| Quality | ESLint, Vitest, Testing Library, jsdom |
| Asset tooling | Sharp, local GLB build and verification scripts |
| Optional API | Python, Flask, Flask-CORS; pytest for its health endpoint |
| Production hosting | Existing Vercel project `paramjeet-studio` |

Exact dependency versions are recorded in `frontend/package-lock.json`. No remote
model, texture or font download is required by the default office.

## Project structure

```text
frontend/
  public/
    certificates/       # Seven public certificate PDFs
    images/             # Original portrait, optimized portrait and project preview
    models/             # Retained character asset and license
  scripts/              # Character build and asset verification
  src/
    components/         # Header content, projects, certificates, dialogs and UI
    scene/              # Entrance, office, materials, camera and graphics controls
    content.js          # Shared portfolio and credential data
    theme.js            # Theme preference and persistence
    theme.css           # Light/dark design tokens
    index.css           # Base layout and component styles
    sage.css            # Sage presentation and responsive refinements
    *.test.*            # Tests also live beside components and scene modules
  vercel.json           # Existing Vite production configuration
backend/
  app.py                # Optional /api/health utility
  tests/                # API tests
assets/character/       # Source asset retained outside the public build
```

## Local development

Use Node.js 22.12+ and npm. From the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. On Windows PowerShell, use `npm.cmd` if script policy
blocks `npm.ps1`.

```sh
npm run lint
npm test
npm run build
npm run preview
node scripts/verify-character.mjs
```

The build writes `frontend/dist/`, including the public certificate PDFs.
Tests cover portfolio content, navigation, dialogs, themes, certificate metadata
and assets, graphics preferences and entrance behavior.

The portfolio does not require the optional API. To run the retained health utility,
use Python 3.11+, create a virtual environment at the repository root, install
`backend/requirements.txt`, then run `python backend/app.py`. Vite proxies `/api`
to `http://127.0.0.1:5000`; run API tests from `backend/` with `python -m pytest tests -q`.
The existing environment examples document API configuration.

## Vercel deployment

Production uses the existing **paramjeet-studio** Vercel project, with source on
this repository's `main` branch. Deploy from the locally linked `frontend`
directory; the project's root setting is `.` relative to that upload.
`frontend/vercel.json` selects Vite and overrides the dashboard defaults with
`npm ci`, `npm run build` and the `dist` output directory. Certificate files under
`frontend/public/certificates/` are copied directly into the production build.

After checks pass, push `main` and run `vercel --prod --scope paramjeet-kaur` from
the already linked `frontend` directory. Verify the production alias and each PDF
after deployment; a GitHub push alone is not the production verification step.
No separate hosting project or backend deployment is needed for this update.

## Author

**Paramjeet Kaur** · MCA Student | Cloud Computing & DevOps

[GitHub](https://github.com/PARAMCLOUD1) · [LinkedIn](https://www.linkedin.com/in/paramjeet-kaur-cloud/) · [Email](mailto:param1539064@gmail.com) · [Phone](tel:+917814433864)
