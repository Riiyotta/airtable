# airtable-clone design-repo

AI-ready design repository extracted from the local React clone of airtable.com in the parent folder
(`..`, read-only build-time evidence). It is a closed, machine-validated **PageSpec** system: an LLM
picks a template, fills each section's content contract with ORIGINAL placeholder copy inside measured
word budgets, and the bundled validators reject anything off-contract.

Status: **design-review-pending**, `productionApproved: false`. Snapshot of the source as of 2026-10-12.

## Read this first: compliance and scope

- **Real, live, commercial source.** airtable.com belongs to Airtable. The clone's homepage (`/`) shows
  the user's own saved copy of Airtable's real copy, customer logos, product screenshots and videos for
  **local reference only**. The other 24 built routes use the clone's own placeholder copy
  (`src/season/copy.js`, invented wordmarks such as Northwind/Lumen/Kestrel) and, in every placeholder
  media box, an ORIGINAL generated UI illustration (`src/media/` `<MockMedia>`, primitive `mock-media`).
- **Generation rules** (enforced, see `assets/asset-roles.json` and `compatibility/graph.json`):
  - never generate or reproduce real Airtable logos/wordmarks, real customer/partner logos, photos or
    likenesses of real people, real product screenshots, or real Airtable marketing copy;
  - every PageSpec declares `contentPolicy.copy = "original-placeholder"`; copy must fit the per-field
    `maxWords` budgets; `VERBATIM_REAL_COPY` rejects any sentence of the real homepage copy (checked by
    SHA-256 of normalised text, the copy itself is not stored here);
  - `home.*` asset roles (real media) are allowed only on `template.home` at `/`, and are pinned to
    `reference-existing-only` / `must-not-generate`.
  - every other media slot is `generated.ui-illustration`: original work only, static, drawn from the 15
    closed `mock-media` kinds; it must not depict real Airtable logos, real customer/partner logos, real
    product screenshots, real people, or real company/product names (`mustNotDepict`, pinned in
    verify_all). The scene kind is derived from the slot's own copy -- a PageSpec has no `kind`/`src`
    field (the retired 1.0.0 role `placeholder.media` is rejected).
- **Never publish** this repository, its fixtures, or the clone's media and fonts. Neue Haas Grotesk,
  Haas Groot Disp and ATSeasonSans are commercial/proprietary typefaces copied for local reference;
  Inter (pricing) is SIL OFL 1.1 (`tokens/00-foundation/font-files.json`).
- **No outbound links.** Every `href` is a local route or `#` / `#fragment`; former external links
  (support, community, academy, status, social, app stores) are `#`. Rule `NO_OUTBOUND_LINKS` + schema
  `definitions.href`.
- **Homepage A/B variant.** The live homepage serves two variants; this clone (and `template.home`)
  is the h1 "All your teams, all their workflows..." Haas variant only.
- **HEVC-only video.** Homepage hero, workflow card 2 and customer-story videos are HEVC `.mp4` with no
  H.264/WebM fallback or poster: browsers without HEVC decode show an empty box. Known limitation.
- **Contact form is visual-only** (`preventDefault`, no network). Schema pins `form.submission` to
  `"visual-only"`.
- **Only 25 routes are built.** Every other path (including `/signup`, `/login`) renders the shared
  `StubPage`; no template exists for stub paths and none should be invented. The sibling IA
  (`../ia/ia.json`) lists 84 routes = these 25 built routes + 59 linked stub routes, in 23 IA templates:
  the IA splits Season pages by exact section composition, this repo groups them by recipe (14
  templates; mapping in `extraction/measured-values.json` `ia-cross-reference`). Stubs are out of scope.
  `verify_all` `IA_ROUTES` checks the 25 routes == the IA's built routes (WARN if ia.json is absent).
  Note: the pre-investigation said 26 routes and 117 asset files; the real numbers are **25** routes and
  **104** files under `public/assets` (see `extraction/measured-values.json`).

## Counts (recomputed from disk by `extraction/verify_all.py`)

<!-- counts:start -->
| key | count |
|---|---|
| `foundationTokens` | 166 |
| `semanticTokens` | 47 |
| `componentTokens` | 21 |
| `layoutTokens` | 12 |
| `primitives` | 14 |
| `components` | 12 |
| `sections` | 50 |
| `templates` | 14 |
| `routes` | 25 |
| `fixtures` | 25 |
| `assetRoles` | 8 |
| `graphRules` | 22 |
| `motionPatterns` | 37 |
<!-- counts:end -->

## Four visual systems -> 14 templates -> 25 routes

| Template | System | Routes |
|---|---|---|
| `template.home` | BK (Haas) | `/` |
| `template.bk-solutions-hub` | BK | `/solutions` |
| `template.bk-filter-listing` | BK | `/integrations`, `/ai-plays` |
| `template.bk-story-index` | BK | `/customer-stories` |
| `template.bk-guides-hub` | BK | `/guides` |
| `template.bk-contact-sales` | BK | `/contact-sales` |
| `template.season-feature-stack` | Season skin a | `/platform/{automations,connected-data,governance,hyperdb,interface-designer,portals,reporting}` |
| `template.season-ai-product` | Season skin a | `/platform/{ai,ai-agents,app-building}` |
| `template.season-solution` | Season skin season | `/solutions/{marketing,product,operations}` |
| `template.season-platform-landing` | Season skin a, heavy 550/650 | `/platform` |
| `template.season-enterprise` | PLATFORM-E skin e | `/solutions/enterprise` |
| `template.season-about` | Season skin season | `/about` |
| `template.pricing` | Inter Display | `/pricing` |
| `template.templates-gallery` | TPL (Haas Groot Disp) | `/templates` |

Season pages are data: one renderer (`src/season/SeasonPage.jsx`) maps a closed set of 20 section
`type`s; the Season fixtures in `schema/fixtures/` are a mechanical conversion of the real page configs
(`extraction/source-data.snapshot.json`). Multi-route templates (`feature-stack`, `ai-product`,
`solution`, `bk-filter-listing`) accept new routes matching their `newRoutePattern`; single-route
templates are pinned to their route.

## Layout

```
design-repo/
  README.md  CHANGELOG.md  registry.manifest.json
  tokens/00-foundation/   color, typography, radius, spacing, breakpoint, elevation, motion, font-files
  tokens/10-semantic/     bk, season, pricing, tpl
  tokens/20-component/    button.bk, button.season, card.resource, breadcrumb
  tokens/30-layout/       layout
  tokens/themes/light.json            (only theme; the clone has no dark mode)
  tokens/llm/             component-allowlist.json, token-catalog.json, token-policy.json
  primitives/ (14)  components/ (12)  sections/ (50)
  templates/templates.json  templates/routes.json
  compatibility/graph.json  compatibility/real-copy-denylist.json
  assets/asset-roles.json
  schema/pagespec.schema.json (Draft-07)  schema/example.pagespec.json  schema/semantic_validate.py
  schema/fixtures/ (one PageSpec per real route)  schema/tests/adversarial_test.py
  extraction/measured-values.json  verify_all.py  prove_drift.py
  extraction/histograms.json + compute_histograms.py      (colour/size/weight/radius/duration usage)
  extraction/source-data.snapshot.json + dump_source_data.mjs  (resolved Season/pricing/templates data)
```

## How the contracts were derived (evidence, never "likely" values)

- **Tokens**: values present in the clone source, with `literalUsageCount` from
  `extraction/histograms.json`, cited `path:line` + anchor text (CLONE_SPEC.md, specs/*, tailwind.config.js,
  season.css, pricing.css, templates.css). The Season low/medium/high shadows exist on the live `:root` but
  no section uses them, so they are excluded.
- **Section content contracts** are inferred from every real instance (the 25 fixtures): a field is
  `required` only if present in 100% of instances; enums, item counts and media ratios are the observed
  ranges; `copyBudgets[path].maxWords` = observed maximum. Homepage-only sections take their budgets from
  the measured real homepage copy (word counts only) and the `/` fixture uses original copy inside them.
- **Motion** is a closed per-section enum of evidence-grounded patterns with a const-locked
  `reducedMotionFallback` (8-value vocabulary). Four known clone gaps carry `not-implemented` and the
  validator warns (`MOTION_FALLBACK_GAP`).
- **Where specs and current code disagree, current code wins** (it was audited against live later).
  Every resolution is in `extraction/measured-values.json` (`status: conflict-resolved | corrected |
  not-reproduced | unmeasured`).

## Verify

```bash
python3 extraction/verify_all.py          # all checks; source-dependent ones WARN when ../src (or ../ia/ia.json) is absent
python3 schema/tests/adversarial_test.py  # controls (example + 25 fixtures) pass, every mutation rejected
python3 extraction/prove_drift.py         # proves verify_all FAILS on injected drift (scratch copies)
python3 schema/semantic_validate.py schema/example.pagespec.json   # validate any PageSpec (exit 0/1)
```

Requires Python 3 with `jsonschema` (Draft-07). `node` is only needed to refresh the evidence snapshot.

## Version fields

`allowlistVersion` is machine-checked (verify_all `ALLOWLIST_VERSION`). `pageSpecVersion` is enforced
only as the schema `const` on PageSpec instances. `repositoryVersion` is documentation-only.

## Known gaps / not grounded

- Season `video` media slots still render a pause button, but since the md- illustrations they are static
  (the `.ss-ph--video` sweep CSS remains in season.css as dead code); `season-placeholder-video-sweep` was
  retired in 1.1.0.
- Reduced motion not implemented in the clone for: homepage logo marquee, workflows fan spring,
  customer-story background video, BK "Load more" button transition; BK-6 autoplay keeps advancing.
- Unmeasured: 900-1023px (BK) and 390-1440 intermediate widths (Season/PLATFORM-E/TPL); E-8 autoplay
  timing; BK-6 slide tween (slick default); AI Plays "Physical Product" pill colours; Lottie backgrounds
  (CSS bar stand-in); S-2 logo timer scope (spec: mobile only, code: all widths).
- 30 of 50 sections carry structured `responsive` entries cited against real CSS/JSX; the other 20 have
  an empty list because no structural breakpoint change is evidenced in the code/specs (not invented).
- Contracts with a single observed instance (enterprise-only E-3..E-6, /about, /pricing, /templates) are
  as tight as their one example; widening them needs new evidence, not guesses.
