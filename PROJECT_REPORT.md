# PARAMJEET.DEV — V8 refinement

## Scope and design

Incremental refinement of the existing React/R3F/GSAP portfolio and Flask API.
Existing V7 office work was present in the working tree and is carried forward;
no history, verified assets or backend functionality was replaced.

Product: a recruiter-facing introduction to Paramjeet's Cloud & DevOps studies.
Character: assured, precise, approachable. World: walnut, metal and infrastructure.
Moments: the real office entrance, portrait and electricity dashboard.
Signature: champagne architecture and blue technical interactions.

## Confirmed causes and implemented changes

- Source typography reached 104px in the hero, 80px in sections, 112px in contact,
  52px in project rows, 216px for the education year and 164px in the footer.
  Hero now uses 48–64px desktop and 32–40px mobile; sections 30–40px desktop and
  24–30px mobile; project/skill titles 18–22px; body 15–16px and labels 12–13px.
- Content gutters cap the inner width at 1200px. Section padding is 64px desktop,
  40px mobile. Buttons retain 44px touch targets with 8px/16px padding.
  The hero no longer forces viewport height. Featured media sits beside compact
  copy on desktop; project rows, skills, timeline and certificates are denser.
- Click handlers existed, but selected objects showed only a brief inline summary
  beneath the canvas. Navigation used separate section anchors. App now owns the
  selected content and return-focus target; navigation and all six object callbacks
  open the same PortfolioDialog/PortfolioContent system.
- The native modal dialog is portalled to document.body, outside the canvas shell
  and animated ancestors. Its top layer prevents stacking/clipping conflicts.
  Width is capped at 680px; desktop height is 84dvh; mobile uses 12px outer gutters.
  The body scrolls internally, with a visible close control and Escape handling.
  Native modal isolation, keyboard cycling, page-scroll lock, named headings and
  regions, focus restoration and compact GSAP entrance/exit are implemented.
- A panel pauses the scene and disables orbit/picking. Closing preserves the camera
  and target instead of flying to another preset. Hover/selected exhibits have a
  blue geometry outline; equivalent HTML controls preserve accessible access.
- Profile paragraphs, skills and education data are shared. Panels include all
  seven projects, nine supplied course names, full education results, portrait,
  GitHub, LinkedIn and direct email/phone actions. No credential artwork or issuer
  has been invented. The pre-existing project filter/disclosures remain.

## Scene convention

One scene unit represents one metre. The room remains a 9m-wide architectural
office, with 2.8m-wide/3.2m-high executive double doors. Desk is 2.4m × 1.1m with
worktop at approximately 0.75m. Monitor is 0.75m × 0.43m; keyboard 0.44m wide;
contact laptop approximately 0.52m wide; server cabinets approximately 1.76m high.
Furniture has been adjusted independently, without globally shrinking the scene.
Door geometry, hinge pivots, handle sequencing and safe camera route are preserved.
Desktop field of view is 50°, compact view 56°. The approach stops 3.6m from the
doors so their full 3.2m height fits vertically before opening; an automated framing
assertion guards this. Readable information lives in HTML;
small objects have equivalent exhibit buttons rather than inflated geometry.
There is no personalized human character in the default scene. Legacy character
preview remains development-only; see CHARACTER.md.

## Content provenance

V8 education percentages, expanded skills and delivery algorithms are supplied by
Paramjeet. Existing source links and dashboard screenshot are retained. The new
smart-electricity.onrender.com address could not be verified by the web tool and
is labelled as an additional user-supplied demo; the previously verified demo stays.
There is no route-project source link or invented screenshot. Flask currently has
only GET /api/health: contact uses real direct links, with no pretend form success.

## Quality audit and verification

Installed Unslop skill used directly; no invented CLI command. Read SKILL.md and
signs/tokens/reference/visual guidance. Reviewed spacing, hierarchy, palette, type,
layout, content, focus, motion and maintainability. Existing real visuals are kept.
Credit: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0,
https://heydamir.design/unslop.

Verification results and Git receipt are recorded in PROGRESS.md and AUDIT.md.
Automated DOM/Three.js checks are distinct from rendered browser acceptance.
Browser inventory again reports host unavailable; native discovery timed out.
Desktop/mobile screenshots, browser console inspection, measured GPU draw calls,
actual device frame rates and final visual approval remain unverified.

## Git and delivery

This milestone is intended for a normal Conventional Commit and non-force push to
the supplied origin after checks pass. No hosting deployment is part of this work.
See PROGRESS.md for the actual commit/push outcome, rather than treating intent as
a completed operation.
