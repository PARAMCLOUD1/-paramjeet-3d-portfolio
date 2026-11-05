# Mandatory personalized character — blocked, not complete

Primary reference: `frontend/public/images/profile-original.jpeg`, inspected on 2026-11-05. Preserve this original. It shows a single three-quarter upper-body portrait with long straight dark hair. It does not establish side-profile facial geometry, body proportions, clothing below the upper torso, or hidden surfaces.

## Tool and asset inspection

- No Blender executable on PATH or installation under the standard `C:/Program Files/Blender Foundation` location.
- No `.blend`, `.glb`, `.gltf` or `.fbx` assets in the project.
- No connected character reconstruction, human modeling, rigging or 3D asset generation tool discovered.
- Git LFS 3.8.0 is available. Enable scoped LFS tracking when actual large source assets exist; no binary placeholders are supplied.

## Needed to unblock

1. Clear front-facing and left/right profile photos in even lighting, with no face filters. A full-body front and side reference in neutral standing pose establishes proportions; business-casual clothing reference establishes the intended outfit. The existing portrait remains the primary identity reference.
2. A usable Blender/human modeling workflow or a licensed, personalized rigged model supplied by the user. Do not upload identity photos to an external generation service without authorization naming that service.
3. Human review of the sculpted likeness before acceptance. Single-image reconstruction cannot guarantee likeness, even after a tool becomes available.

## Required asset contract and acceptance

- Blender-editable source when authored in Blender, source textures and license/provenance record.
- Real volumetric head/body/hair/clothing with realistic proportions and skin/hair materials; no flat portrait or generic substitute presented as the user.
- Web-optimized `paramjeet.glb` with skeleton, skin weights and named `Walk` and `Idle` clips. Confirm animations deform the rig correctly, including feet, hands and hair intersections.
- Prefer a starting budget below 60k triangles, 1–2K textures and 10 MB transferred; measure actual quality and performance before finalizing. Use supported compression after confirming the loader/decoder path.
- Lazy-load through R3F/Drei `useGLTF`; drive clips with `useAnimations`, crossfade walk to idle, and clean up actions on unmount.
- Entrance → walking route to workstation → idle → interactive office. Camera follows without clipping; offer skip/replay. Reduced-motion users start at the final stationary pose without camera travel. Keep accessible 2D content available on load/error/unsupported devices.
- Reuse the actual character in office, About and workstation experiences. Review depth, lighting, shadows, texture fidelity, mobile performance and recognizable likeness.
- Run relevant tests, production build and the supported Unslop review before committing and pushing each verified milestone.

## Current status

No character source, rig, model, textures or animations have been created. No character cinematic is claimed or substituted. The framed photo in the office is decoration/navigation only and does not satisfy this requirement. Phase 2 remains in progress until this mandatory deliverable and rendered browser verification are accepted.
