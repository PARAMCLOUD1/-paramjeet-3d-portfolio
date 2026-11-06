# Cinematic redesign reference — 2026-11-06

## Inspected reference

Source: `C:\Users\simmibaby\Downloads\WhatsApp Video 2026-11-06 at 11.46.34 AM.mp4`.
One video found directly in the supplied Downloads directory: 3,702,409 bytes,
576 × 1024, 30 FPS, 606 frames, 20.2 seconds. Decoded locally with OpenCV;
reviewed a 24-frame contact sheet spanning the clip and individual full-size
frames for the hero, doors, projects, timeline and contact. Frames remain in
the system temporary directory, not in public assets or Git.

This is a phone recording of an angled laptop screen, not a clean screen capture.
The surrounding purple room light, social watermark and overlay captions are
video presentation, not portfolio UI. Exact fonts, easing, DOM structure, browser
scroll physics and mobile behavior cannot be established from it.

| Approximate video time | Observed visual design | Adaptation for Paramjeet |
| --- | --- | --- |
| 0–1 seconds | Cream hero, compact horizontal nav, large left-aligned greeting, person on right; role on a physical notebook-style panel; two actions and bottom status line | Full-height portrait/type composition with requested identity, static readable role and two actions; preserve navy brand |
| 1.7–3.5 seconds | Hero changes to charcoal/navy; role panel changes between disciplines; portrait remains the visual anchor | Use the cream opening and dark sections for visible contrast, plus one short staggered entrance; keep career focus honest instead of cycling unrelated professions |
| 4.3–6.1 seconds | Hero scrolls upward; four arched colored doors appear under a large heading; selected door reveals supporting text | Preserve the real office as the interactive destination; adapt doorway transition later, without copying its four-door branding |
| Around 7 seconds | Door fills a large portion of the viewport before project content appears | A future office transition can move a real camera through its doorway; do not add a CSS imitation or scroll hijack |
| 7.8–10.4 seconds | Large development heading, wide rounded project panels, text paired with phone previews; changing vertical alignment | Use large project compositions with genuine screenshots when available; no copied apps, phones, project claims or fake previews |
| 11.3–12.2 seconds | Door motif returns during the transition toward story content | Use a consistent section rhythm and optional short ScrollTrigger reveals; pinning is not necessary for the initial redesign |
| 13–13.9 seconds | Large year on left, fine vertical timeline and narrative entries on right | Education dates and project milestones only; no creator employment history or fabricated experience |
| 14.8–15.7 seconds | Very large “Got a project? / Let's build it together.” closing with two actions; links beneath a hairline | Requested closing headline, real email/phone/GitHub and usable contact behavior |
| 16.5–20.2 seconds | Promotional social overlay and video fade | Do not recreate video overlay, identity, handle or promotional ending |

## Reproducible techniques

CSS grid and fluid typography reproduce the asymmetric hero and editorial panels.
GSAP handles a short entrance and later ScrollTrigger reveals using transform and
opacity, scoped cleanup and reduced-motion branches. CSS surface changes can create
light/dark section contrast without a flashing theme switch. Three.js remains limited
to the existing opt-in office and, later, a verified personalized model. The reference
contains a portrait presentation; it does not prove a rigged 3D character workflow.

## Verified existing project

- Existing React 19 / Vite application with Tailwind 4, GSAP 3, Three.js, R3F and Drei.
- Lazy office, object destinations, project filters, responsive navigation,
  portrait, biography, skills, education and direct contact links.
- Office entrance has a route, camera follow, Walk/Idle crossfade, skip/replay,
  reduced-motion, compact graphics and WebGL/error/loading fallbacks.
- Flask exposes GET `/api/health` only. Vite proxies `/api` to localhost:5000.
  No existing contact submission API or delivery integration exists.
- Project content currently describes three broad areas rather than the seven
  named projects in the new brief. Certifications and BCA are absent from the UI.
- Origin is the requested repository; local and remote main were both verified
  at `3cfb7160880900297a06b3add4a21ace490ff48f` before documentation changes.

## Design direction

- Product: introduce Paramjeet's Cloud & DevOps studies and practical projects to recruiters.
- Character: assured, precise, human.
- World: a developer's workstation and the systems behind deployed applications.
- Moments: the actual portrait and existing interactive office; a personalized character only after verification.
- Signature: restrained terminal-style captions connecting build, automate and deploy.

Use the supplied navy palette, clear blue action accent and strategic light sections.
The opening hero/navigation now use warm off-white; workspace/projects use navy,
About/skills return to off-white, and education/contact close in dark tones. The
earlier all-navy opening preserved too much of the previous composition. Light-surface
blue text uses #0369A1 for accessible contrast; #38BDF8 remains the dark-surface accent.
Typography should carry the hero, with the requested identity and career statements,
Explore Projects and Enter 3D Office actions, and a simple scroll indicator.
Keep the portrait as the truthful supporting visual while personalized artwork is pending.
Do not introduce the generic businesswoman as Paramjeet's personalized character.
The new instruction prohibiting generic substitution takes precedence over historical
placeholder permissions in CHARACTER.md and AUDIT.md. Preserve the asset and office code;
decide how to gate the legacy placeholder during the redesign rather than deleting work.

## Implementation sequence after inspecting the video

1. Reference analysis above is complete within recording limits. Retain Paramjeet's
   identity and content; never claim exact underlying scroll or animation behavior.
2. Milestone B: isolate a hero component; retain app navigation, office lazy loading,
   destinations, filters, portrait and backend. Add one GSAP entrance with cleanup
   and a reduced-motion path. Content stays visible if animation fails.
3. Milestone C: use scoped GSAP ScrollTrigger reveals and restrained image movement;
   preserve natural scrolling, keyboard access and layout stability. Pin only if justified.
4. Milestone D: use the seven supplied titles, real evidence for stacks/descriptions
   and screenshots, verified links, factual education/certifications and requested
   contact copy. Do not infer repositories, issuers or screenshots. A form requires
   a real Flask implementation and delivery/storage decision before claiming it works.
5. Milestone E: inspect supplied portrait and further front/profile/full-body references;
   establish available modeling tools. Verify genuine mesh, likeness, long dark hair,
   skinning, walking/idle clips and optimized GLB before integration/completion claims.
6. Milestone F: verify desktop/mobile rendering, keyboard navigation, contrast,
   reduced motion, WebGL fallback, loading, API behavior and production output.

## Reuse and verification

Reuse `scene/Office.jsx`, character entrance/diagnostics utilities, scene preferences,
`components/Projects.jsx`, content data, Flask factory and existing regressions.
Avoid wholesale replacement or new animation libraries. Keep 3D opt-in and lazy.
Use the existing small portrait derivative; reserve image dimensions. Measure initial
and lazy bundle sizes separately. Current optional office chunk has a known size advisory.
Treat mobile/GPU performance as measured acceptance work, never a universal FPS promise.

Each completed implementation milestone requires tests, lint, build, Unslop review,
diff review, Conventional Commit, normal push and remote SHA verification.
Milestone A reference inspection is complete. Rendered app review remains separate
acceptance work. Browser Use timed out; native Computer Use then stopped because it
could not confidently determine the current browser URL. No further UI actions were
taken, and no rendered app verification is claimed from those tools.
