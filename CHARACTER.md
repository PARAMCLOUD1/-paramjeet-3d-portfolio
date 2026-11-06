# Current character status — 2026-11-06

The cinematic redesign requires Paramjeet's recognizable personalized model and
prohibits a generic substitute. That model is not delivered. The existing generic
asset, rig, clips and entrance code are preserved, but run only at the explicit
development URL `/?scene=character#workspace`. Production ignores scene overrides
and opens the interactive office without a character. The real portrait supports
the hero. Historical Phase 3 notes below describe the retained preview, not the
current production experience or completion of the personalized requirement.

Additional front/profile/full-body photo references have been requested. No photo
was uploaded to an external service. Blender was not found on PATH; availability
elsewhere and a suitable modeling workflow still need to be established.

---

# Phase 3 character - licensed placeholder implemented

The current user instruction explicitly permits a placeholder while personalized references are pending. The earlier blocked character requirement is superseded for this implementation scope. A custom recognizable likeness is not claimed or completed.

## Delivered

- Local `frontend/public/models/businesswoman.glb`, derived from Innerscene's Mara / MakeHuman CC0 businesswoman asset. Real volumetric human geometry, skin/hair textures, tailored jacket, trousers and shoes; generic silver pixie hairstyle.
- Preserved original at `assets/character/businesswoman-source.glb`; source URL, license and modifications at `frontend/public/models/LICENSE.md`.
- Reproducible build script using existing Three.js and Sharp. Textures capped at 1024px; 3,561,764-byte runtime model; 46,997 triangles and 31,857 weighted vertices.
- Project-authored 14-joint humanoid skeleton and approximate spatial skin weights. Named, looping `Walk` (1.1 sec) and `Idle` (4 sec) clips. This is an approximate placeholder rig, not a full hand/finger/facial rig or captured performance.
- R3F/Drei local loading, cloned skeleton, crossfade, doorway-to-workstation route, camera follow, introduction reveal, skip/replay, reduced-motion support and context/load-error fallback.
- Existing original photograph is preserved, and was not uploaded or used to infer facial geometry.

## Verification and limits

The real GLTFLoader parses the generated rig and animation clips. Automated checks verify normalized skin weights, finite vertex deformation, skeleton motion, Walk-to-Idle crossfade, human scale and geometry/transfer budgets. UI regression checks cover entrance orchestration, reduced motion, timeout, no-WebGL navigation, low graphics and viewport rendering pauses.

These checks do not establish photographic likeness, natural foot planting, joint quality, clothing intersections, lighting or mobile GPU frame rate. Browser automation is unavailable, and the native fallback stopped because it could not verify Chrome's current URL. Human rendered review remains required. No Blender source is claimed: the editable source for this derivative consists of the preserved original GLB and the procedural build script.

## Future personalization

The supplied portrait is an upper-body, three-quarter reference. Front and profile photos, neutral full-body proportions and intended business clothing would improve artist review. A licensed custom rigged model can replace the placeholder, ideally with `Walk` and `Idle` clips, real geometry, an editable Blender source when authored in Blender, reviewed likeness, feet and hands, and a transfer budget under 10 MB. Do not upload personal photos to a third-party generation service without authorization naming that service.

Source SHA256: `454b8015fa23f0c9ccfb10ea2e6f30f737bd762392471b1f158d55c53aa9ae4b`.
Optimized GLB SHA256: `e1f8705852f943c65d6bdac4c9d0ea244ce6adad8c5813f209247f17ef4a78c1`.
