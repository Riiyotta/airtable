# Changelog

## 1.1.0 -- 2026-10-12 (refresh against updated clone source)

- Re-anchored citations broken by the source's placeholder-media rewrite (src/bk/*, src/season/components/*,
  src/components/ResourceCard.jsx, src/standalone/templates/Templates.jsx); 812 citations now verify.
- New primitive `mock-media` (src/media/MockMedia.jsx): closed `kind` enum of 15 deterministic SVG scenes,
  `theme` light|dark. Sub-page placeholder media slots now render it.
- New asset role `generated.ui-illustration` (may-generate-new, original work only) with a must-not-depict
  list (real Airtable/customer logos, real product screenshots, real people, real company/product names),
  wired through schema, allowlist, example and fixtures; home.* real-media roles unchanged and still pinned.
  Allowlist version 1.0.0 -> 1.1.0.
- Removed the `.ss-ph--video` shimmer motion pattern (no longer in source); 37 motion patterns.
- Regenerated extraction/histograms.json and source-data snapshot from the current source.
- New verify_all check IA_ROUTES: the 25 design-repo routes must equal the 25 built (non-stub) routes in
  ../ia/ia.json (84 IA routes = 25 built + 59 stub; stubs are deliberately out of scope). WARN-only when
  ia.json is absent so standalone copies still pass; `--ia <path>` overrides the location.
- prove_drift.py: new case "built route demoted to a stub in ia.json" -> IA_ROUTES FAIL.

## 1.0.0 -- 2026-10-12 (initial build, design-review-pending)

- Built from scratch against the clone source in `..` (React 18.3 / react-router-dom 6.28 / Vite 5.4 /
  Tailwind 3.4), CLONE_SPEC.md, ASSET_MANIFEST.md and specs/*.md.
- Tokens: 166 foundation, 47 semantic (bk/season/pricing/tpl), 21 component, 12 layout; one theme (light).
- 13 primitives, 12 components, 50 sections (2 shell, 7 homepage/BK-home, 12 BK, 21 Season, 7 pricing,
  1 templates gallery), 14 templates, 25 routes (1:1), 25 route fixtures, 8 asset roles, 22 graph rules,
  38 motion patterns.
- PageSpec schema (Draft-07) with closed template/section/variant/motion/assetRole enums and
  per-section content contracts inferred from every real instance; semantic validator cross-references
  the declared template's node list (ordered + unordered body regions, (section, variant) keyed).
- Compliance: original-placeholder content policy, real-copy SHA-256 denylist, home-only real media
  roles with pinned policies, no-outbound-links rule, visual-only contact form.
- Corrected pre-investigation claims: 25 routes (not 26); 104 files in public/assets (not 117);
  breadcrumb behaviour split per system; side-by-side "64px inset" not present in current code.
- Verification: verify_all.py (allowlist parity, citation range+anchor validity, counts, README counts,
  route coverage vs live registries, graph/validator agreement, pinned asset policies, token resolution,
  closed motion schema, source-snapshot freshness), adversarial_test.py, prove_drift.py.
