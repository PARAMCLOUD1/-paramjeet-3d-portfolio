# PARAMJEET Sage Studio

The existing React, Vite, and Three.js portfolio now uses a sage-and-cream presentation. Its original portrait, personal information, introduction, project descriptions, technologies, links, section order, room geometry, object locations, and camera/door animations are preserved.

The source milestone is `a7a4153`. This release also includes the previously requested persistent light/dark toggle, Education-section removal, and architectural material refinements that were already present and verified locally. Education source data remains available; the decorative timeline object remains in the room. All five current interactive exhibit destinations are retained.

## Direction

- Product: a software engineering portfolio with a genuine interactive workspace.
- Character: calm, tactile, precise.
- World: warm ivory, sage clay, natural wood, and brushed brass.
- Visual moments: the original portrait and the existing cinematic office.
- Signature: existing project numbering and restrained forest-green details.

The design uses the supplied sage, cream, ivory, forest, olive, and border colors. Warm surfaces lead, sage supports the composition, forest anchors typography and the contact area, and olive is reserved for details. Dark mode uses midnight forest, dark olive surfaces, muted sage accents, and warm ivory text. The existing `paramjeet-theme` localStorage key and first-visit device preference behavior are unchanged.

## Presentation passes

1. Spacing: consistent section rhythm, balanced hero columns, and repeated project-card padding. Mobile content stacks in reading order.
2. Color: removed the old lavender gradients and applied the supplied light/dark palettes across navigation, sections, panels, controls, and scene materials.
3. Icons: retained the existing line icons, with consistent 18px sizing in theme and contact controls.
4. Copy: retained all existing personal and project content. No achievements, clients, screenshots, or claims were invented.
5. Typography: retained system sans-serif body text and used Georgia selectively for the name, prominent headings, and project numbering. The hero heading is capped at 72px.
6. Layout: the portrait remains visible even when the office is active. The original interactive office remains within the hero, below the portrait/text composition. Section order is unchanged.
7. Details: 22px project-card corners, soft layered shadows, visible focus states, quiet technology tags, and a browser-style frame around the real project screenshot.
8. Visuals: the original photograph is unfiltered and undistorted. Three small CSS clay forms sit behind it; there is no additional WebGL canvas or downloaded decorative asset. The doors use forest-green grain, the desk retains natural wood, and the workspace uses cream/sage surfaces and brushed brass.
9. Motion: gentle 16–22 second decorative movement and a 4px card hover lift. Reduced motion disables the decorative loops. Existing scene animations and Low Graphics behavior remain intact.

The visual redline workflow uses [unslop by Damir Sokolovsky](https://x.com/heydamir), licensed under CC BY 4.0. The user's specific palette, organic forms, content-preservation rules, and motion instructions take precedence over that workflow's defaults. No generated-image prompt or image generation was needed; existing real assets and CSS were used.

## Verification

- ESLint passed.
- All 56 frontend tests across 13 files passed.
- Production build passed. The pre-existing large 3D chunk warning remains: approximately 929 kB before gzip, 253 kB gzipped.
- Browser checks passed in both themes at 320, 375, 390, 430, 768, 1024, 1440, and 1920px.
- Rendered text contrast checks passed; the lowest checked light-mode ratio is 4.59:1.
- Original portrait source, image proportions, absence of filters, and unobstructed face checks passed.
- Shared dialogs, project filters, theme persistence after refresh, and all five office exhibit panels passed.
- The entrance journey, Low Graphics mode, reduced motion, and fresh-mobile office loading passed.
- Source comparisons verified unchanged portfolio data, portrait bytes, scene geometry, object positions, camera configuration, animation code, and backend files.
- Browser checks use Chrome with SwiftShader. The test browser uses wall-clock GSAP timing to avoid software-renderer lag smoothing. Application animation code is unchanged; these checks are not a physical-device frame-rate benchmark.

## Files changed for this visual pass

Paths are relative to the repository root.

| File | Change |
| --- | --- |
| `frontend/src/sage.css` | New presentation layer for spacing, editorial hero, clay forms, project cards, section surfaces, controls, panels, responsive layout, and reduced-motion styles. |
| `frontend/src/theme.css` | Sage light/dark tokens and theme-control presentation. |
| `frontend/src/components/Hero.jsx` | Retain the original portrait while the office is active; add three non-interactive decorative forms. |
| `frontend/src/components/Hero.css` | Remove the old lavender hero background. |
| `frontend/src/index.css` | Remove obsolete lavender appearance overrides. |
| `frontend/src/main.jsx` | Import the new presentation layer. |
| `frontend/src/palette.js` | Sage UI and architectural material colors for both themes. |
| `frontend/src/scene/officeMaterials.js` | Separate door, doorframe, desk, wall, display, and indicator material roles. |
| `frontend/src/scene/ExecutiveRoom.jsx` | Assign the new architectural materials to the existing meshes. |
| `frontend/index.html` | Forest browser theme color. |
| `frontend/public/favicon.svg` | Forest-and-sage favicon colors. |

The major milestone also publishes the earlier verified local feature work in `App.jsx`, `App.test.jsx`, `components/PortfolioContent.jsx`, `components/PortfolioDialog.test.jsx`, `components/ProfileSections.jsx`, `components/ProfileSections.test.jsx`, `components/ThemeToggle.jsx`, `components/ThemeToggle.test.jsx`, `content.js`, `scene/DiagnosticCube.jsx`, `scene/ExecutiveOffice.jsx`, `scene/ExecutiveOffice.test.jsx`, `scene/ExecutiveRoom.test.jsx`, `scene/Office.jsx`, `scene/Office.test.jsx`, `scene/doorTimeline.js`, `test-setup.js`, and `theme.js`, all under `frontend/src/`.

The minor milestone adds this verification record and aligns browser branding. Existing unrelated local notes remain untouched.

## Publishing

The existing production target is [PARAMJEET STUDIO on Vercel](https://paramjeet-studio.vercel.app), linked locally as `paramjeet-kaur/paramjeet-studio`. Vercel publishing uses the existing linked project from `frontend/`; no new hosting project is required. Backend source and settings are unchanged. The user's follow-up explicitly authorized both GitHub pushes and deployment after verification.
