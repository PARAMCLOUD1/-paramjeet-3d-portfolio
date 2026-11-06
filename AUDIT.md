# Cinematic redesign baseline — 2026-11-06

Source-level baseline and local video inspection completed; rendered app review pending.
Unslop is installed at the local skills/unslop/SKILL.md path. Its supported skill
workflow, signs and tokens were read directly; no Unslop CLI is claimed.
Credit: Unslop by Damir Sokolovsky (@heydamir), CC BY 4.0,
https://heydamir.design/unslop.

Findings to resolve after reference inspection:

- Hero: current constrained split layout and 20px name heading do not deliver the
  requested full-screen introduction or requested copy/action hierarchy.
- Typography: existing restrained system sans/mono has a useful foundation;
  editorial display scale and consistent content hierarchy need implementation.
- Surfaces: existing navy palette has no decorative hue gradients/glows to remove.
  Keep that restraint; video shows cream-to-charcoal change, adapted as deliberate section contrast.
- Content: three generic project areas, one education item and no certification
  section omit content supplied in the new brief. Do not fabricate missing visuals.
- Character: existing rigged businesswoman is a generic short-haired placeholder.
  It cannot satisfy the personalized long-haired character requirement. Preserve
  prior work, but do not promote it as the new hero's personalized visual.
- Contact: email/phone/GitHub anchors exist; Flask contains only a health endpoint.
  A working contact form cannot be claimed from the current backend.
- Accessibility: existing skip link, focus rings, mobile menu state, filter pressed
  states and reduced-motion rules should survive the redesign. New GSAP effects
  need JavaScript reduced-motion handling and cleanup, with readable default DOM.
- Performance: office already loads on demand and supports compact graphics;
  the optional bundle advisory and actual mobile/GPU rendering need further review.
- CSS: historical phase blocks and repeated header/media overrides complicate
  changes; consolidate affected rules during implementation without unrelated churn.

Reference video inspected before application changes; timestamped observations and
limitations are in DESIGN_REFERENCE.md. Direction: assured, precise and human;
workstation world, real portrait and office as visual moments, terminal captions as
signature. The user already authorized hero redesign, so no additional design
approval is required. Requested greeting/bold display copy takes precedence over
Unslop's default advice against greeting headlines.

Browser Use timed out. Native Computer Use stopped because it could not determine
the current browser URL confidently enough to enforce policy. No further UI actions
were taken; rendered app verification is not claimed. Source/tests/build checks
remain available. Milestone A changes are documentation only.
Baseline validation is recorded in PROGRESS.md. Historical entries below describe
earlier work and do not establish completion of the new cinematic redesign.

---

# Fallback correction - 2026-11-05

Confirmed root cause: `Unsupported` called `onFailure()` when native Canvas
fallback children mounted, even on a working WebGL renderer. The installed R3F
Canvas always includes those DOM children. A regression using those semantics
failed before the fix. The fallback is now inert markup; only genuine errors,
context events or a readiness timeout can activate the application fallback.

Added development-only reason/error/stack logs, actual application renderer/context
inspection, asset boundaries, and isolated cube/office/character diagnostic URLs.
Context-loss listeners attach before character readiness and detach before teardown.
The first error is retained. There is no localStorage/sessionStorage preference
persistence. Verified model filename and URL: businesswoman.glb at
/models/businesswoman.glb. Fixed favicon separately with SVG, ICO and explicit links.

Validation: 19 frontend tests passed, including a real R3F reconciler cube draw with
a substituted renderer backend, fallback mounting regression, error paths, context
loss and production logging guards. Lint and the real GLTFLoader asset check passed.
Production build passed; the optional 3D chunk still exceeds the 500 KB advisory.
Browser host unavailable, so no actual Chrome GPU/rendered verification is claimed.
See DEBUGGING_3D.md for every fallback condition and Chrome verification steps.

---

# Phase 3 verification - 2026-11-05

Incremental character/entrance milestone; previous audit entries below are historical.
User explicitly authorized a generic placeholder, and minor/major commits on GitHub.

## Direction and review

- Product: a recruiter's introduction to Paramjeet's developing Cloud & DevOps work.
- Character: precise, calm, approachable.
- World: the existing navy developer workstation with warm desk material.
- Moments: a suited human entering the workstation, with a laptop and cloud architecture diagram.
- Signature: existing terminal-style technical captions.

Unslop's nine passes were applied to the additions: shared spacing and touch targets;
existing navy surfaces and blue accent; no new icon family; factual placeholder and
biography copy; existing sans/mono type; wrapping mobile toolbar and introduction;
keyboard skip/replay/reset and persistent object links; real licensed human geometry;
and a single purposeful entrance with reduced-motion support. Existing sections and
photograph are preserved. This was a source-level design review; rendered checks were
blocked by the tools described below. Credit: Unslop by Damir Sokolovsky (@heydamir),
CC BY 4.0, https://heydamir.design/unslop.

## Assets and runtime

- Innerscene's Mara businesswoman / MakeHuman CC0 asset. Source and embedded CC0
  metadata verified; provenance and derivative details in public/models/LICENSE.md.
- Original source preserved outside public. Procedural approximate rig and Walk/Idle
  clips are editable through the build script. No Blender source or personalized
  likeness is claimed. No user photograph was sent to an external service.
- Runtime GLB: 3,561,764 bytes, 46,997 triangles, 31,857 weighted vertices, 14 joints.
  Source: 15,594,944 bytes. Textures capped at 1024px; no external decoders/CDN.
- Demand rendering targets 30 FPS, 24 for compact graphics; hidden/offscreen rendering
  pauses. Reduced motion removes walking, camera travel and animated idle. Compact
  screens/CPU hints or the manual low graphics control use DPR 1 with no shadows.
- Existing Phase 2 controls, API proxy, project filters and all 2D sections retained.
  Context loss, loader errors, unsupported WebGL and a 25-second loading timeout retain
  semantic navigation. New per-clone skeleton resources are released on unmount.

## Verification results

- ESLint passed.
- Vitest: 4 files / 9 tests passed. Includes existing navigation/filter behavior,
  entrance/arrival/skip/replay, low graphics, reduced motion, loading timeout,
  no-WebGL destinations, viewport pause/resume, and furniture-clear route sampling.
- Real Three.js GLTFLoader asset check passed: skeleton, normalized weights,
  finite skinned vertices, animation deformation, Walk-to-Idle crossfade and budgets.
- Flask tests: 3 passed, run from backend as documented.
- Production build passed: initial JS 233.14 KB / 72.77 KB gzip; optional office JS
  990.22 KB / 270.85 KB gzip. Vite still reports its >500 KB advisory chunk warning.
- Live frontend HTTP 200; frontend /api/health reports status ok; local optimized
  model endpoint returns 3,561,764 bytes.
- Browser host unavailable. The native Computer Use fallback stopped because it
  could not confidently verify Chrome's current URL. No screenshots, GPU/mobile
  FPS, natural foot contacts, joint/clothing quality or rendered likeness are certified.
- During verification: Vite tests initially hit sandbox ancestor-directory denial;
  rerunning outside the sandbox worked. An initial pytest command from the project
  root failed import collection; running from backend passed. Regression assertions
  were updated for persistent introduction links and floating-point route endpoints.

## Git

Actual configured origin is https://github.com/PARAMCLOUD1/-paramjeet-3d-portfolio.git.
Existing main access verified. Asset milestone: 7b8be83. Integration milestone and
push outcome are reported in the session response. No force push or deployment.

Remaining: human rendered review; artist-refined skinning/foot contacts; a recognizable
personalized model and appropriate editable artwork when supplied. The Phase 3
placeholder experience is implemented; final personalized character artwork is pending.

---

# Phase 1 audit

## Phase 2 milestone review — 2026-11-05

Phase 1's last completed commit before this work was `b629bc0`. Phase 2 is approved and in progress. The mandatory personalized human character is blocked and is not represented by the framed photograph; see CHARACTER.md for references, missing tooling and acceptance criteria.

Supported Unslop review used the installed skill and its signs, tokens, visual and reference documentation directly. No invented CLI or automated audit service is claimed. Credit remains unslop by Damir Sokolovsky (@heydamir), CC BY 4.0, https://heydamir.design/unslop.

Direction: a recruiter's introduction to Paramjeet's Cloud & DevOps work; precise, calm, approachable; a developer's night-shift office; the real portrait and an explorable workstation carry the visual detail; terminal captions remain the signature. Existing palette and layout retained.

Findings and nine-pass review:

1. Spacing: project rows share 32px padding and 24px on mobile; section rhythm retained; new controls have at least 44px touch height.
2. Color: existing navy neutrals and blue accent retained. Selection uses a quiet surface step. No gradients or glows added.
3. Icons: no emoji or new icon families. Directional text glyphs remain consistent.
4. Copy: project areas derive only from the supplied biography. No invented repository links, credentials, performance figures or project screenshots. Character completion is not claimed.
5. Type: existing system sans/mono retained; headings 400–500; small captions have no negative tracking.
6. Layout: project rows replace repetitive cards; skills use two parallel groups that stack on mobile. Long email wraps. Header gaps adapt to narrower screens.
7. Details: semantic project filters expose pressed state and result count. Office controls expose selection state and matching anchor destinations even without WebGL. A dismiss control and reset view are included.
8. Visuals: office gets walls, window, doorway, shelves/books, plant and a framed original portrait derivative. Simple geometry has depth and receives lighting/shadows. This is a procedural room, not a realistic human model. No new generated bitmap assets are needed for this milestone.
9. Motion: no autoplay, camera travel or looping animation introduced. Demand rendering and capped DPR retained. Reduced-motion CSS remains in place. Future character cinematic must additionally honor reduced motion in JavaScript.

Verification:

- ESLint passed.
- Vitest: 3 files, 4 tests passed, including project filtering and all office destinations with simulated unavailable WebGL.
- Production build passed: main JS 233.10 KB / 72.75 KB gzip; lazy office 909.28 KB / 246.61 KB gzip. Vite's 500 KB chunk warning remains; this is not a failed build.
- Live frontend returned HTTP 200; frontend `/api/health` returned status ok.
- Browser host unavailable. Native Chrome fallback was stopped by Computer Use because it could not determine the current URL confidently enough to enforce policy. No rendered desktop/mobile or GPU interaction verification is claimed. This remains an acceptance limitation.
- GitHub remote check outside sandbox returned Repository not found for the exact authorized repository. No repository creation or deployment was attempted. Local commit and push outcome are reported to the user.

Remaining: recognizable rigged character, Walk/Idle clips, editable source and optimized GLB, camera-follow entrance and integration into office/About/workstation; rendered verification; real project links and certifications when provided. Phase 2 is not complete.

## Direction

- Product: a recruiter's introduction to Paramjeet Kaur and her developing Cloud & DevOps skills.
- Character: precise, calm, approachable.
- World: a developer's night-shift workstation, navy surfaces and real materials.
- Moments: the supplied portrait and an interactive workstation prototype.
- Signature: terminal-style technical captions.

## Unslop

Installed as a local skill, not a CLI. Read its SKILL.md and signs, tokens, reference and visual documentation; no invented Unslop command was run. Applied its review method to new implementation under the user's instruction to begin development. Credit: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0, https://heydamir.design/unslop.

## Findings and fixes

- Spacing: shared 4px rhythm, consistent buttons, section padding, and responsive gutters.
- Color: supplied navy palette, one blue action accent, no gradients, decorative glows or glass panels.
- Copy/content: real supplied biography and contacts; no invented metrics, experience, screenshots, resume, or LinkedIn URL.
- Type: system sans-serif and monospace captions; restrained weights, responsive headings.
- Layout: portrait-led desktop composition, single-column mobile layout, collapsible navigation.
- Details/accessibility: skip link, visible focus, semantic sections, descriptive alt text, menu expanded state, live connectivity status, real anchors. No automatic motion; reduced-motion CSS included.
- Visuals: preserved portrait; optional procedural workstation. No generated portrait or fake model files.
- Performance: lazy 3D module, demand rendering, DPR capped at 1.5, no external fonts, no model downloads. WebP is 71,868 bytes versus original JPEG 104,180 bytes (31% smaller).
- Security: no persistence, secrets, or contact endpoint; CORS allowlist; request body cap; read-only health endpoint. Public-form rate limiting is deferred with the form to its requested later phase.
- Dependency audit initially found sharp advisories. Updated sharp to patched 0.35.5; subsequent npm audit reported zero vulnerabilities.

## Verification

- ESLint: passed.
- Vitest: 2 passed (real links/photo/2D availability; menu open/close).
- pytest: 3 passed (health payload, allowed/denied CORS, method restriction).
- Production build: passed, Vite 7.3.7.
- Vite start: passed at 127.0.0.1:5173; HTTP 200 verified.
- Flask start: passed at 127.0.0.1:5000; live health JSON verified.
- Frontend proxy to Flask: live `/api/health` on port 5173 returned status ok.
- Initial sandbox esbuild ancestor-directory permission failure: rerun outside sandbox passed.

## Remaining verification and limitations

Browser automation timed out, then reported its host unavailable. No screenshot, mobile visual, GPU/WebGL interaction, Lighthouse or automated browser accessibility pass is claimed. CSS and DOM behavior were reviewed/tested; actual rendered layout and Canvas require browser confirmation. Office chunk is approximately 901 KB / 243 KB gzip and triggers Vite's 500 KB warning; it loads only on demand. It should be revisited with real assets in later optimization phases. No Blender assets or character are included in Phase 1. GSAP is installed but reserved for the later cinematic phase. ESLint 9 is deprecated upstream; migration to the next configuration-compatible major remains maintenance work.

GitHub CLI is not installed. Repository lookup returned Repository not found, which can mean missing repository or inaccessible private repository. GitHub authentication could not be verified; remote creation and verified push remain pending. No deployment performed.
