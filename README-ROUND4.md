# AfroVibes — Round 4 (text weight/color/size controls)

Drop these files into your repo at the same paths, then run `npm run build`
to confirm. Three files are brand new:

- src/components/TypographySettings.jsx  (new — applies the CMS controls)
- src/components/ScrollReveal.jsx        (from Round 3, included for completeness)
- src/hooks/useParallax.js               (from Round 3, included for completeness)

CHANGES-round4.patch is a git diff of the Round-4-only edits, in case you'd
rather `git apply CHANGES-round4.patch` from your repo root.

## Where to find the new controls in Decap
Site Settings → Text Weights & Styles (collapsed section):
1. Footer Text Weight — affects all footer text at once
2. "Who We Are" Body Text Weight — affects About page paragraphs only
3. Connection/Adventure/Community/Memories Weight
4. Connection/Adventure/Community/Memories Color
5. Connection/Adventure/Community/Memories Size

All default to "blank = current look" — nothing changes until you pick a value.
