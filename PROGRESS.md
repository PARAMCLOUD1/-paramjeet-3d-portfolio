# Cinematic portfolio progress

Updated: 2026-11-06

## Current milestone

Milestone A — project inspection and reference analysis complete.
Milestone B — next: cinematic hero implementation. No application code changed yet.

## Completed inspection

- Confirmed existing project and correct origin on main; initially clean working tree.
- Local HEAD and GitHub main match `3cfb7160880900297a06b3add4a21ace490ff48f`.
- Reviewed React composition, CSS, content, project filters, character runtime,
  Flask API, Vite proxy, regressions and historical audits.
- Installed Unslop skill verified and read; this is a skill, not an invented CLI.
- Added DESIGN_REFERENCE.md with timestamped video observations, direction and reuse plan.
- Found the supplied Downloads video; decoded its 20.2 seconds and inspected a
  24-frame contact sheet plus full-size hero/doors/project/timeline/contact frames.

## Verification this session

- Flask: 3 tests passed.
- Actual GLTFLoader check passed: 46,997 triangles; 31,857 weighted vertices;
  3,561,764 bytes; skeleton deformation and Walk-to-Idle verified for the placeholder.
- Frontend: all 19 tests across 6 files passed; ESLint passed; production build passed.
- Initial JS: 233.14 KB / 72.77 KB gzip; lazy office: 991.93 KB / 271.54 KB gzip.
  Vite reports its existing >500 KB optional-chunk advisory.
- Vite test/build initially failed on sandbox ancestor-directory access. Both passed
  when rerun with elevated access; no dependency or configuration change needed.
- PowerShell blocks npm.ps1; use npm.cmd without changing execution policy.
- Browser Use timed out. Native Computer Use stopped because it could not determine
  Chrome's current URL confidently enough to enforce policy. No further UI actions
  taken. No rendered app, GPU performance or personalized likeness verified.
- OpenCV installed in the ignored existing .venv solely for local video inspection;
  no production dependency or uploaded photo/video introduced.

## Character status

Only the existing generic licensed placeholder is implemented. It has short silver
hair and does not satisfy the requested likeness or long dark hair. The portrait
exists at frontend/public/images/profile-original.jpeg and profile.webp. Video found
in Downloads; no personalized model found. Blender, ffmpeg and ffprobe were not found on PATH;
this does not establish whether installations exist elsewhere.
Current instruction prohibits generic substitution; historical placeholder approval
does not authorize representing that asset as the requested character.

## Remaining work

- Complete milestones B–F, with milestone-specific audit/test/build/commit/push verification.
- Verify project screenshots/links/stacks and obtain additional character references/tools.
- Add factual BCA/certification content from the brief; no issuing organizations inferred.
- Existing backend has no contact endpoint; form integration is still required work.

## Git and next action

Baseline commit: `3cfb716`; remote equality verified with git ls-remote.
Milestone A documentation is ready for commit; push verification will be recorded
after comparing its local SHA with GitHub main.
Exact next action: commit/push the inspected reference plan, then implement the
approved hero using the real portrait and gate the legacy generic character.
