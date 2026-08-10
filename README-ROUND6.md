# AfroVibes — Round 6 (hero rotation fix + zoom effect)

Two files changed, no new files. Drop both into your repo at the same
paths, then `npm run build` to confirm.

CHANGES-round6.patch is a git diff if you'd rather `git apply` it.

## What changed
- Fixed the hero background rotation bug — it was reading `.url` off each
  image entry, but Decap actually saves that field as a plain string, so
  every image resolved to nothing and it silently fell back to solid
  black. Now it accepts either format. Your 3 already-uploaded images
  should show up and rotate as-is, no re-upload needed.
- Added a slow ~12% zoom-in to each hero image over an 18s loop.
  Respects prefers-reduced-motion (turns off automatically for anyone
  with that accessibility setting on).
