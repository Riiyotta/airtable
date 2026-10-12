Source: https://www.airtable.com/platform (+ /platform/* sub-pages and https://airtable.com/pricing)

# Section-type catalog — /platform/*, /pricing

Measured live on 2026-10-12 with a headless Chromium (Playwright 1.48) at 1440×900 and 390×900.
- Values come from `getComputedStyle`, `getBoundingClientRect`, the shipped CSS modules (read through `document.styleSheets`), and the shipped JS bundle (for motion timing).
- Per-page section lists and parameters live in `specs/pages_platform.md`.
- **Content rule:** use placeholder copy and placeholder imagery. Word counts are given only to size the placeholders.

---

## 0. Read this first

### 0.1 Three families of pages, none built from homepage sections

| Family | Pages | Notes |
|---|---|---|
| **A. CMS block template ("bkv3")** | /platform/ai, /ai-agents, /app-building, /automations, /connected-data, /governance, /hyperdb, /interface-designer, /portals, /reporting (10 pages) | Every section is one of ~14 block types, each with a `data-type`. Build these blocks once as components and feed them per-page data. |
| **B. /platform landing** | /platform only | Its own 8 bespoke modules (`Hero`, `LogoBar`, `TabPanels`, `Integrations`, `Capabilities`, `CustomerStories`, `ReadNext`, `CtaBanner`). Same visual language as A (keyline frame, 4px-radius buttons). Several of them collapse into A types plus parameters (see §C). |
| **C. Pricing** | https://airtable.com/pricing (different app/domain) | Utility-class (basscss-style) markup, Inter Display font. Plan cards, comparison table, FAQ. |

**Header and footer:** reuse the existing `Header.jsx` / `Footer.jsx` as-is on all 12 pages.
- They have the same DOM, geometry, drawers and behaviour as the homepage.
- On family A/B pages the original swaps the header/footer font to ATSeasonSans (class `shellSeasonSans`). Pricing uses the plain Haas header.
- Per the user's Haas decision, keep the Haas versions.
- Header height is 121.3px desktop / 144px mobile, as on the homepage.

**Homepage section components:** none of `Hero`, `LogoBar`, `Workflows`, `AIPlays`, `Resources`, `CustomerStory`, `CtaBox` match these pages visually. These pages use a different design system:
- full-height 1px keyline columns at 1344px
- 4px-radius 48px buttons, versus the homepage's 12px-radius 56px buttons
- warm-gray surfaces

`buttonStyles.js` (radius 12, 56 tall) does **not** match either; add the new `btn3*` variants in §0.5. The only reusable *logic* is the scroll-spy idea in `Workflows.jsx`. Note that the scroll tabber here uses an IntersectionObserver with different thresholds (§A7).

### 0.2 Font decision (Haas)

There is no Haas variant of these sub-pages.
- I loaded /platform and /platform/ai 3× each, including with the homepage "Haas" A/B cookie (`marketing-homepage-e4-segment=control`). Families A/B always render **ATSeasonSans** (variable font).
- Pricing always renders **Inter Display**, with one `GT Eesti Display` eyebrow.
- The design-system token underneath is `--type-family-haas: "Haas Grot Text R"`, with fallback `Haas, sans-serif`. A stylesheet overrides it in `:root` to `ATSeasonSans`.

So "spec the Haas variant" = drop the override, and every role falls back to **Haas** at the same size, line-height and letter-spacing. Build mapping:

| Original weight | Where | Use in clone (Haas faces 400/500/700 exist) |
|---|---|---|
| 500 (`--type-weight-regular`) / Season 550 | A headings, body, subheads; B headings/body | **500** (Haas Medium) |
| 600 (`--type-weight-strong`) / Season 650 | A card titles, buttons, questions; B buttons, eyebrows, panel titles | **600**. Haas has no 600 face, so the browser picks the 700 Bold face. This is identical to how the original renders without the Season override. |
| 400 | rare (A FAQ `h3` wrapper, hero subhead on B) | 400 |
| Pricing Inter Display 400 / 475 / 575 | pricing | Haas 400 / 500 / 600 (Bold face) |
| Pricing GT Eesti Display 400 (logo-strip eyebrow) | pricing | Haas 400 |

Line counts in the per-page file were measured with Season. Haas is slightly narrower, so wraps may differ. Size placeholders by word count.

### 0.3 Design tokens (from `:root`, exact)

Add these to the Tailwind theme. Names follow the original.

**Colors**

| Group | Token | Value |
|---|---|---|
| Surface | primary | `#FFFFFF` |
| Surface | secondary | `#F8F6F6` (warm-gray-100) |
| Surface | tertiary | `#F2F4F7EB` |
| Surface | quaternary | `#E1E4EADB` |
| Surface | inverse-primary / dark-1 | `#181D26` |
| Surface | inverse-secondary / dark-2 | `#040E20B0` |
| Surface | inverse-tertiary / dark-3 | `#020D206E` |
| Surface | inverse-quaternary / dark-4 | `#000E263B` |
| Surface | brand-subtle-1 / 2 / 3 | `#F1F5FF` / `#CADCFF` / `#94BFFF` |
| Text | primary | `#181D26` |
| Text | secondary | `#040E20B0` (= rgba(4,14,32,.69)) |
| Text | tertiary | `#000E263B` |
| Text | inverse-primary | `#FFFFFF` |
| Text | inverse-secondary | `#E1E4EADB` |
| Text | link-primary | `#0768F8` |
| Text | link-secondary (hover) | `#1B61C9` |
| Text | link-inverse | `#5AA2FF` |
| Border | primary | `#181D26` |
| Border | secondary | `#F5F1F0` (warm-gray-200) |
| Border | **keyline** | **`#E0DCDB`** (warm-gray-300). This is the 1px frame colour everywhere in families A/B. |
| Border | secondary-inverse | `#90959D38` (= rgba(144,149,157,.22)) |
| Border | focus | `#0768F8` |
| Icon | gray-brand (FAQ chevron) | `#9297A0` |
| Badge palettes (bg / text) | pink | `#FDD5FF` / `#AB0A83` |
| Badge palettes (bg / text) | yellow | `#FFF0B6` / `#B27D00` |
| Badge palettes (bg / text) | cyan | `#B8F3FF` / `#007399` |
| Badge palettes (bg / text) | orange | `#FFDDB6` / `#AF6102` |
| Brand / B extras | pink-300 | `#FFB0FA` |
| Brand / B extras | pink-400 | `#F884EE` |
| Brand / B extras | purple-500 | `#AC59FF` |
| Brand / B extras | blue-800 | `#012978` |
| Brand / B extras | near-black used by B | `#161616` |
| Brand / B extras | B keyline-on-dark | `rgba(255,255,255,.23)` |

**Other tokens**
- **Radius:** none 0, sm 4, md 12, lg 16, xl 32, full 9999. Media corners use 8px (and 2px in the tabber).
- **Border widths:** thin 1, medium 2, thick 4.
- **Spacing scale:** xs 4, sm 8, sm-md 12, md 16, lg 24, xl 32, 2xl 40, 3xl 48, 4xl 64, 5xl 96, 6xl 128. `--bk-spacing` = 4px.
- **Type sizes:** 4xs 12, 3xs 14, 2xs 16, xs 18, sm 20, sm-md 24, md 32, ml 40, lg 48, xl 64, 2xl 80, 3xl 96, 4xl 120.
- **Shadows:**
  - low: `0 0 1px #181d2652, 0 0 2px #181d2614, 0 1px 4px #181d2614`
  - medium: `0 0 1px #181d263d, 0 2px 4px #181d2614, 0 2px 16px #181d260f`
  - high: `0 0 1px #181d263d, 0 4px 8px #181d2614, 0 18px 32px #0000001a`
  - None of these are used by the measured sections.
- **Default transition** (buttons, tabs, links): `background-color, border-color, color, box-shadow .15s cubic-bezier(.4,0,.2,1)`.
- **Breakpoints:** 768 / **900** / 1024 (min-width). 900 is the main layout switch for A/B. They match the existing Tailwind screens `md` / `md2` / `lg`.

### 0.4 The keyline frame (shared by every A/B section)

```
<section root>   width:100%; bg:#FFF; (A) border-bottom:1px #E0DCDB on the shell
  <div shell>    max-width:1344px; margin-inline:auto; box-sizing:border-box;
                 border-left/right:1px #E0DCDB (≥900 only in A; always in B);
                 border-bottom:1px #E0DCDB (A); display:flex; flex-direction:column
```
- At 1440 the shell spans x 48–1392. The inner content box is 1342 wide (x 49–1391).
- Sections stack with no gaps. The shell borders form continuous vertical rules down the page.
- Internal "bands" separate with 1px keyline `border-bottom`.
- Below 900, family A has no side borders: content is full-bleed with its own padding.
- B keeps side borders down to 390 (shell = 390 wide incl. borders), except `CustomerStories`.
- `Capabilities` (B) adds `padding-inline:16px` on the root below 768.

### 0.5 Shared atoms

**Button (A, `button-module`, "btn3")**
- Base: `inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px 24px; border:1px solid; border-radius:4px; font:600 16px/1.35 Haas; letter-spacing:0; white-space:nowrap`. Transition is the default transition.
- Size: height **47.6px**. Widths at 1440 with Season: "Try it now" 117, "Book demo" 131, "Learn more" 130.
- Below 900, inside titles: the actions column stacks and every button is `width:100%`.

| Variant | Rest | Hover (`@media (hover:hover)`) |
|---|---|---|
| `primary` | bg `#181D26`, border `#181D26`, text `#FFF` | bg `#040E20B0`, border `#F5F1F0`, text `#FFF` |
| `secondary` | transparent bg, border `#181D26`, text `#181D26` | bg `#F2F4F7EB` |
| `primaryInverse` (on dark) | bg `#FFF`, border `#FFF`, text `#181D26` | bg `#F2F4F7EB`, border `#90959D38` |
| `secondaryInverse` | bg `#000E263B`, border `#FFF`, text `#FFF` | bg `#020D206E` |

- Focus ring: `0 0 0 2px #0768F8`-style ring (tw ring). Disabled styles are not used.
- Optional trailing icon is 1em (lucide `arrow-right` 16px), as on "View all integrations".

**Button (B, `/platform` modules)**
- Same box: 12px/24px padding, radius 4, 1px border, 600 16/21.6, height 47.6. Transition is `background-color .15s, color .15s, border-color .15s` (ease).
- Primary: `#161616` bg + border, `#FFF` text.
  - Hover: `#404040` (Hero) / `#2A2A2A` (CtaBanner).
- Secondary: `#FFF` bg, `#161616` border and text. Hover bg `#F5F5F5`.
- Integrations CTA: outline with a 16px arrow (12×10 svg). Hover: bg `#161616`, text white, arrow `filter:brightness(0) invert()`.
- Below 768: CTAs stack (`flex-direction:column; gap:8px; width:100%`).

**Badge (`badge-module`)**
- `inline-flex; gap:8px; padding:4px 12px; border:1px solid; radius:4px; font:500 14px/1.35; letter-spacing:.02em (.28px); white-space:nowrap`. Height 28.9.
- `primary`: transparent bg, border `#F5F1F0`, text `#040E20B0`.
- `colored`: transparent border, with these palettes:
  - marketingCreative pink `#FDD5FF`/`#AB0A83`
  - physicalProduct yellow `#FFF0B6`/`#B27D00`
  - digitalProduct cyan `#B8F3FF`/`#007399`
  - operations orange `#FFDDB6`/`#AF6102`

**TextLink (`textLink-module`, `primary`)**
- `inline-flex; gap:8px; font:600 16px/21.6; letter-spacing:.01em (.16px); color:#0768F8`.
- Hover/active color `#1B61C9`. Transition: color .15s cubic-bezier(.4,0,.2,1).
- Trailing arrow box 24×24 holding a 15×15 arrow svg. Rendered height 24.

**Play/Pause icon button (`icon-button.dark`)**
- 40×40, radius 9999, bg `#181D26`, white lucide pause/play 16px, border 1px transparent.
- Hover bg `#040E20B0`; active `#020D206E`.
- Absolutely positioned `right:16px; bottom:16px; z-index:10` inside the animated element.
- Clicking toggles `data-paused` on the wrapper. The wrapper CSS then sets `animation-play-state:paused` on all descendants; JS marquees check `data.paused`.
- Present on: hero video, features carousel, integrations marquee, CTA lottie.

**darkSecondary arrow button:** 40×40 round, transparent bg, 1px `#90959D38` border, white 15px arrow. Hover border `#FFF`.

**Title block (`title-module`, used inside most A sections)**
- `.root`: `flex column; gap:32px; padding:40px`.
  - alignCenter → `text-align:center; align-items:center`.
  - alignLeft → start alignment.
- `.textStack`: `flex column; gap:16px`.
- Headline / subhead `max-width:884px; text-wrap:balance`.
- Headline: Haas 500, color `#181D26`.
- Subhead: Haas 500, line-height 1.35, letter-spacing .01em, color `#040E20B0`, `white-space:pre-line`.
- Actions: `flex wrap; gap:16px`. Below 900: column, stretch, full-width buttons.

| Size class | ≥1024 | 900–1023 | <900 |
|---|---|---|---|
| headlineHeroLarge (h1, CTA h2) | 48 / 1.15 (55.2) | 40 / 1.15 | 32 / 1.15 (36.8) |
| headlineSectionLarge (section h2) | 32 / 1.25 (40) | 24 / 1.25 | 20 / 1.25 (25) |
| subheadHero/SectionLarge | 16 / 1.35, ls .01em | 14, ls .02em | 12 / 16.2, ls .02em |
| themeDark | headline `#FFF`, subhead `#E1E4EADB` | | |

**Breadcrumb bar (family A only, between header and first section)**
- Wrapper: full width, **42px** tall, bg `#F8FAFC`, `transition: opacity/visibility/transform .25s ease-in`. No scroll-hide was observed.
- `ol`: `inline-flex`, padding `12px 32px` (≥768) / `12px 24px` (<768).
- Items: `li` flex. Links: Haas 400 14px/18.2px, ls .14px, color `#181D26`.
  - Hover/focus (≥1024): color `#254FAD`, `transition .15s ease-in`.
- Separator: 12×12 chevron-right svg, `margin:0 8px`, before items 2+.
- Last item is a non-link `span`.
- Content pattern: "Home › Platform › {Page}". Labels may be kept (≤4 words).

---

## A. CMS block template — section types

### A1. HeroVertical — `hero` `[data-type="vertical-padded"]`

**Layout**
- Root: bg `#FFF`, `border-bottom:1px #E0DCDB`, `overflow:clip`, position relative.
- Shell: 1344 keyline frame (side borders ≥900), `flex column; align-items:center`.
- Copy band: Title block alignCenter. Padding 40.
  - h1 headlineHeroLarge, max-width 884.
  - Optional subhead (11–27 words, 1–2 lines).
  - Actions: 1–2 buttons (primary + secondary).
  - Desktop copy band height is 274–308 (1 vs 2 h1 lines).
- Media band:
  - `border-top:1px #E0DCDB`; padding-inline **224px** (≥1024) / 128 (900–1023) / 0 (<900).
  - Inside, `mediaFrame` has `border-inline:1px #E0DCDB` (≥1024), `overflow:hidden`, z 1.
  - The media is full width of the frame (**892px** wide at 1440; 390 at mobile), height auto.
  - The media wrapper has `margin-block:24px` in its default component, but the hero frame resets it to 0.

**Variants seen**
- video 892×383 (16:7 crop, `object-fit:cover`) with Play/Pause button
- video 892×669 (4:3)
- image 892×298 / 382 / 595 / 852 (natural ratio)
- portals adds a full-bleed decorative `.pattern` image (1440×466) behind the media at opacity .05

**Motion (on load, CSS keyframes; disabled under `prefers-reduced-motion: reduce`)**
- `.copy`: `heroFade 0.5s ease-out 0.27s both` — opacity 0→1.
- `.mediaFrame > *`: `heroRise 1.15s ease-out 1.22s both` — `opacity 0, translateY(200px)` → `opacity 1, translateY(0)`.
- `.pattern` (if present): `heroPattern 2.6s ease-out 0s both` — opacity 0 until 10%, ramps to 1 at 30%, holds.

**Mobile 390:** h1 32/36.8 center (2–4 lines); subhead 12/16.2; buttons stacked full width (310 wide inside 40px padding); media full width with no frame borders.

### A2. LogosFlip — `logos` `[data-type="flip"]`

**Layout**
- Shell with border-bottom.
- Optional heading frame: `border-bottom:1px keyline`, padding 40 (≥1024) / 32 (≥768) / 24.
  - Heading `p` centered, max-width 884, Haas 500, letter-spacing .01em, color `#040E20B0`.
  - Size: 16/21.6 (≥1024), 14 (≥768), 12/16.2 (<768). Copy is ~10 words, 1 line.
- Logos row: `ul` flex; each cell `flex:1 1 0; height:88px; border-left:1px keyline` (first cell none).
  - Logos are distributed round-robin into **6 cells (≥1024) / 3 (≥768) / 2 (<768)**; cells = min(that, logo count).
- Each cell is `position:relative; overflow:hidden`, containing absolutely-filled slots (`inset:0; padding:24px; flex center`).
- Logo `img`: `height:100%` (40px), `max-width:70%`, `object-fit:contain`, `filter:grayscale() brightness(.55) contrast(10)` (renders near-black).
- Section height: 192 with heading (1440) / 89 without. Mobile: 154 / 89.

**Motion (JS):** each cell with ≥2 logos flips.
- First flip after `initialDelay` seconds per cell index: `[1, 3, 1.5, 5, 3, 5.5]`. Then every **8000ms**.
- On flip:
  - The top slot gets `transform: translateY(-100%)` and the bottom slot (next logo, starting at `translateY(100%)`) gets `translateY(0)`.
  - Both use `transition: transform .8s cubic-bezier(.76,0,.24,1)`.
  - After 850ms both snap back (`transition:none`) with the indices advanced.
- On pages where each cell holds one logo (/platform/ai at 1440: 4 logos → 4 cells) nothing moves. Verified: no change over 30s.
- Reduced motion: no flipping.

### A3. FeatureCards — `features` `[data-type="cards"]`

**Layout**
- Title band: `flex justify-center`; Title alignCenter.
  - Padding `64px 40px 40px` (≥900) / `40px 16px 32px` (<900).
  - h2 headlineSectionLarge.
  - Optional subhead, optional badge above the headline, optional primary button.
- Body band: `ul.cardGrid`.
  - `display:grid; grid-template-columns: repeat(3,1fr)` (≥900), or **repeat(4,1fr) when exactly 4 cards**. 1 column below 900.
  - `border-top:1px keyline` (≥900).
  - <900: body band has `padding-inline:16px`, and the grid has `border-inline:1px keyline`.
- Card cell:
  - bg **`#F8F6F6`**, `border-right:1px keyline` (none on the last of each row), `border-bottom:1px keyline` (none on the last row and on the last cell).
  - `flex column`.
  - Desktop widths: 447.3 (3-up), 335.5 (4-up). Mobile: 356.
- Card copy:
  - `padding:32px; flex column; gap:24px`.
  - Icon box 48×48 (`object-fit:contain`; placeholder square).
  - Text: `flex column; gap:8px`.
    - h3 cardTitle: 600 18/24.3, ls .01em (.18px), `#181D26`. <900: 16/21.6.
    - cardBody: 500 14/18.9, ls .02em (.28px), `#040E20B0`.
  - Optional TextLink (`primary`) at the bottom.
- Cell height: 225 (3-up, no link) / 322 (4-up with link) at 1440. Mobile cells 223–318.
- There's no hover state on non-link cards. The cards are not links; only the TextLink is.

### A4. FeatureSideBySide — `features` `[data-type="media/side-by-side" | "media/side-by-side-swapped"]` + `data-image-position="right|left|bottom"`

**Layout**
- `mediaBody`: `flex column` (<900); ≥900 `flex row; align-items:stretch`.
  - A 1px keyline vertical rule sits at `left:50%` (`::after`, full height).
  - `swapped` → `row-reverse` (image left).
  - `image-position=bottom` → column, no centre rule, title and media full width.
- Title half:
  - Width 50% (671 at 1440). Title alignLeft, padding 40, `justify-content:center` (copy vertically centred).
  - Optional badge `primary` above the h2.
  - **h2 is overridden by the page CSS:** Haas 500 **48px**, line-height 1.25 (60px), letter-spacing 0, `#181D26`, `margin-bottom:16px` (≥1024) / 8px. It stays 48px at 390 too (3–5 lines).
  - Body: a `p` 16/21.6, ls .01em, `#040E20B0` (12/16.2 at <900). Optional `ul` (disc bullets, `padding-left:32px`, `margin-bottom:16px`, `li` 16/21.6) with 3 items.
  - Optional 1–2 buttons.
- Media half:
  - 50% width, `padding:40px`, `flex center`.
  - Media `border-radius:8px`, `object-fit:contain`, width 100%.
  - Typical: 591×443 (4:3) at 1440; 310 wide at 390.
- Section height: **572** (4:3 media) at 1440.
- Bottom variant:
  - Title on top (padding 40), media below at 1262×~541 (or video 1262×429).
  - Section height 832–945.

### A5. FeatureCarousel — `features` `[data-type="carousel"]` (marquee of article cards)

**Title band**
- `border-bottom:1px keyline`.
- Title alignLeft (≥900), centered (<900). Padding `64px 40px 40px`; <900 `48px 16px`.
- h2, optional subhead, primary button.

**Carousel band**
- `width:100%; overflow:hidden; cursor:grab; user-select:none; touch-action:none`.
- The track is `display:flex; width:max-content`, translated by `translate3d(calc(var(--pos)*-1),0,0)`.
- Cards are rendered **twice** for a seamless loop. If fewer than 4 cards, they are repeated to reach 4.
- Cell:
  - **336px** wide (84×4), bg `#F8F6F6`, `border-right:1px keyline`, `overflow:hidden`, `flex column`. Height 473–492.
  - The whole cell is a link (`cursor:pointer`).
- Card copy:
  - Padding 32, gap 24.
  - Badge row: one `colored` badge (uppercase or Title-case label).
  - Text block: h3 cardTitle 600 18/24.3 + cardBody 500 14/18.9.
- Media: `margin-top:auto; aspect-ratio:448/300` (335×224), `object-fit:cover`, no radius.
- Play/Pause button at the band's bottom-right (16px inset).

**Motion (JS rAF, exact)**
- `pos += (halfTrackLength / 28000) * frameDeltaMs`. So one copy of the card list scrolls past in **28s**, linear, leftward, wrapping modulo the half length.
- Measured speeds: 84 px/s (14 cells), 48 px/s (8 cells), 60 px/s (10 cells).
- Paused when `data-paused="true"`.
- Pointer drag (after a 5px threshold): sets `data-dragging` (cursor `grabbing`), moves 1:1. On release, momentum velocity decays by ×0.95 per frame until below 0.3.

### A6. — (reserved; see A9 for integrations)

### A7. ScrollTabber — `features` `[data-type="tabbers/2-column-scroll"]`

**Desktop (≥900)**
- The shell becomes a grid: `grid-template-columns: auto minmax(0,2fr)`, areas `"title title" "nav track"`. At 1440: nav column 277, track 1065.
- Title band:
  - **sticky** `top: var(--mainNavHeight)` (121.3), z 1, bg `#FFF`, `border-bottom:1px keyline`.
  - Title alignLeft, padding 40. h2 32/40, ~6–9 words, 1 line. Height 121.
- Nav wrap:
  - **sticky** `top: mainNavHeight + titleBand height` (242.3), padding-inline 40.
  - Nav: `flex column`, width **197px** (12.3125rem).
- Tab button:
  - `flex; gap:8px; align-items:flex-start; padding:16px 0; border-bottom:1px #90959D38; width:100%`.
  - Label: Haas 500 16/21.6, ls .01em, `#181D26`, wraps. Format "01 Label words" (2–4 words).
  - Marker 8×8 before the label: radius 2px, bg `#FFF` (invisible) when inactive. Active: radius 0, bg **`#CADCFF`**.
  - Hover: color `#181D26`.
- Track: panels stacked with no gap.
  - Panel: bg `#F8F6F6`, `border-inline:1px #F5F1F0`, `border-bottom:1px keyline` (none on last), `overflow:hidden`, `scroll-margin-top: mainNavHeight + head`. Height 848 at 1440.
  - Panel copy: padding 40, gap 32.
    - Text: `padding-right:40px; gap:16px`.
    - h3 24/1.3 (31.2), Haas 500, `#181D26`. 20px <1024; 18px <900.
    - Body 16/1.4 (22.4), ls .02em, `#040E20B0`.
    - Primary button.
  - Media: `aspect-ratio:1000/560` (1063×595), `object-fit:cover`, no radius.

**Active logic (JS)**
- IntersectionObserver on panels, `rootMargin:"-35% 0px -45% 0px"`, `threshold:[0,.25,.5]`. The top-most intersecting panel becomes active.
- Measured: a panel activates once its top is ≤ ~300px from the viewport top.
- Clicking a tab: `scrollIntoView({behavior:"smooth", block:"start"})` for that panel; the observer is suppressed for 600ms.

**Mobile (<900)**
- The nav becomes a horizontal, scrollable tab row (`gap:16px`, scrollbar hidden, `padding-inline:16px`), sticky at `top: mainNavHeight`, bg white.
- Edge fade buttons are 48px wide with gradient `to right, transparent → #FFF 50%` and a 24px chevron in `#040E20B0`. Clicking one scrolls by 80% of the width.
- The track gets `margin-top:32px`. Panels get `border-top:1px keyline`.

### A8. TabberSmallMedia — `features` `[data-type="tabbers/small-media"]`

**Desktop (≥900)**
- Title band: centered, padding `64px 40px 40px`, h2 + subhead.
- Tab list: `flex nowrap; border-block:1px keyline`.
- Tab trigger (`tabberButton`):
  - `flex:1 1 0`, `padding:40px 48px`, `border-right:1px keyline` (none on last).
  - Haas 600 20/1.3, ls .005em, color `#040E20B0`, centered, label wraps.
  - Hover (`hover:hover`): bg `#F8F6F6`, color `#181D26`.
  - Active: bg **`#E1E4EADB`**, color `#181D26`, plus a 2px `#181D26` bar at the bottom (`::after`, left 0, right −1px).
  - Heights: 106 (3 tabs, 1-line labels), 132 (4 tabs), 210 (5 narrow tabs, 4-line labels).
- Logo-tab variant (when tabs have icons) is `horizontalTabLogo`:
  - padding `24px 12px`; img max 124×34.
  - Active bg `#E1E4EADB` + 2px bar.
  - Not seen on these pages, but supported by the component.
- Panel: `flex row; align-items:stretch`.
  - Copy column: width **448px** (28rem), padding 40, `flex column; gap:32px`.
    - Body block: subhead `p` 600 16/21.6 `#181D26` (2–5 words), then copy paragraphs.
    - In the measured pages the copy is a `strong` 600 14/18.9 ls .02em `#181D26` (15 words) plus optional paragraphs 14/18.9 `#040E20B0`, `gap:8px` within groups and 24 between.
    - Primary button.
  - Media column: `flex:1; padding:40px; overflow:hidden`.
    - Inner: `aspect-ratio:16/9` (814×458), radius 2px, `overflow:hidden`.
    - Image `object-fit:cover; object-position:right center`.
  - Panel height 538 at 1440.
- Tab switch: instant panel swap (Base UI Tabs). Button colours transition .15s. No auto-advance (verified over 15s).

**Mobile (<900): becomes an accordion**
- Each item: `border-bottom:1px keyline`.
- Trigger: full width, padding `32px 40px`, centered, Haas 600 18/1.3, `#040E20B0`.
  - Hover: `#181D26`.
  - Active: bg `#E1E4EADB`, `#181D26`, 4px `#181D26` bottom bar.
- Panel: `height:0 → auto` (`interpolate-size: allow-keywords`), `transition: height .4s cubic-bezier(.76,0,.24,1)`.
  - Copy padding `32px 40px`, gap 32; body `p` 18/1.25; CTA full width.
  - Media below at 16:9 width 100%, `object-fit:contain`.
- Only one item is open at a time.
- Opening an item scrolls it so its top sits 8px under the header (rAF loop for 450ms).

### A9. IntegrationsMarquee — `integrations` (`data-logo-variant="spotlight"`)

**Desktop (≥900)**
- Shell: `flex row; overflow:hidden`.
- Copy column: `flex:1`, `padding-block:64px`, vertically centred.
  - Title alignLeft (padding 40): h2 32/40 (`white-space:pre-line`), subhead (18–28 words, max-width 636 / 159×4, weight 500), and a **secondary** button with a trailing arrow ("View all integrations", 214×48).
- Marquee box: **563×563** (35.1875rem square), `border-left:1px keyline`, `cursor:grab`, `overflow:hidden`.
  - It holds **3 vertical strips** (`flex:1`, 187.7 wide, `border-right:1px keyline`, none on last).
  - Each strip's track is a column of square cells:
    - `aspect-ratio:1/1` (186.7), bg `#FFF`, `border-top:1px keyline`, centred.
    - Logo: 80×80 `object-fit:contain`, max-width 70% (placeholder squares).
  - Cells are duplicated ×2 per strip (10 cells per strip → 20 rendered).
- Play/Pause button at the bottom-right of the box.

**Mobile (<900)**
- Copy on top (padding 40; h2 20/25; subhead 12; full-width button).
- The marquee becomes one horizontal strip, **128px** tall, `border-top:1px keyline`. Cells are 128×128 with `border-right:1px keyline`.

**Motion:** same rAF marquee as A5 (28s per half-track, linear, drag + momentum).
- Strips alternate direction: strip 1 and 3 move up (`translate3d(0, -pos)`); strip 2 moves down (`data-marquee-dir="end"` → `translate3d(0, pos − 50%)`).
- Measured 33.3 px/s at 1440. Mobile track moves left.

### A10. Stats — `stats` `[data-type="3/horizontal"]`

**Layout**
- Band: `flex column; align-items:center; gap:64px; padding:96px 48px` (≥1024); 900–1023: `64px` padding / 48 gap; <900: `72px 16px`, gap 40.
- Title band: full width. Title alignLeft, `padding:40px 24px`. h2 32/40, ~5 words.
- Cells `ul`:
  - `flex row; justify-content:space-between; align-items:center; gap:32px` (≥900); column with gap 48 (<900).
  - Each cell: `flex:1`, `border-left:1px #F5F1F0`, `padding-left:24px`, `flex column; gap:16px`. Width 394 at 1440.
  - Value: Haas 500 **96px/1** `#181D26` (80 at <1024, **64** at <900). 2–5 characters, e.g. "5+", "95%", "$2.6M".
  - Label: Haas 500 16/1.35, ls .01em, `#040E20B0` (14 <1024, 12 <900). 4–8 words.
- Height 532 at 1440 / 675 at 390.
- Static: no count-up animation (verified).

### A11. TemplatesCarousel — `carousel` `[data-type="templates"]` (dark)

**Layout**
- Root: bg **`#181D26`**, `border-bottom:1px #90959D38`.
- Shell: `border-inline:1px #90959D38`, `overflow:hidden`. Below 768 the root has `padding-inline:16px`.
- Header: centered Title, `themeDark` (headline `#FFF`, subhead `#E1E4EADB`), padding 40; h2 32/40 + subhead (~6 words). The header arrows are hidden.
- Body: `border-top:1px #90959D38`.
  - Viewport: `display:grid`. All slides share `grid-area:1/1` and crossfade (`opacity/visibility .4s`, ease).
- Slide media box:
  - Height **637** (≥1024) / 489 (768–1023) / 211 (<768), full width (1342), bg `#181D26`, `border-bottom:1px #90959D38`.
  - Image `object-fit:cover` absolutely filling.
  - `::after` overlay: `linear-gradient(to right top, #181D26 0%, transparent 100%)`.
  - Overlay text: `position:absolute; left:24px; bottom:24px; max-width:446px; flex column; gap:16px`.
    - Title `p` Haas 500 18/1.35, ls .01em, `#FFF` (16 at 768–1023, 14 below). ~11 words, 2 lines.
    - Optional TextLink `primaryInverse` (`#5AA2FF`).
- Footer:
  - Height **128** (≥1024) / 96; padding `0 40px`; `flex; justify-content:flex-end; align-items:center; gap:32px`.
  - Progress: `flex:1; gap:16px`, one 2px bar per slide (5 slides). Bar bg `#FFF`; active bg **`#FFB0FA`**. Clicking a bar jumps to that slide; the hit area extends ±16px.
  - Arrows: two `darkSecondary` 40px buttons, gap 8 (left arrow is rotated 180°).
- Height 925 at 1440 / 471 at 390.
- Motion: **no autoplay** (verified 20s). Slides change only on arrow or bar click, with a .4s opacity crossfade.

### A12. ReadNextDark — `readNext` (`data-content-stack-type="withMediaCrosslink"`)

**Layout**
- Shell: keyline frame.
- Heading band: `padding-top:24px`. Title alignLeft, padding 40, max-width 713. h2 32/40, 3–5 words.
- Body:
  - `ul.row`: `flex row; align-items:stretch` (≥900), column below. `border-block:1px #90959D38`.
  - Below 900 the body band has bg `#181D26` and `padding-inline:16px`.
- Cards: 2–3 per row, `flex:1`, bg **`#181D26`**, `border-right:1px #90959D38` (none on last); stacked on mobile with `border-bottom`.
  - Card link: `flex column; height:100%`.
  - Copy: bg `#181D26`, `border-bottom:1px #90959D38`, padding 40 (≥900) / `24px 16px`, `flex column; gap:16px`.
    - Optional eyebrow: Haas 500 12/1.35, uppercase, white (or a per-card colour). 1–2 words.
    - Title `p`: Haas 500 18/24.3, `#FFF`, 3–8 words.
  - Art: `aspect-ratio:448/271`, bg `#181D26`, image cover.
    - 447×270 for 3-up at 1440; 671×406 for 2-up (portals).
  - Hover/focus: card title `text-decoration: underline; text-underline-offset:3px`.
- Height 523–658 at 1440.

### A13. CtaBlocked — `cta` `[data-type="media-bg/blocked"]`

**Layout**
- Root: bg `#F8F6F6`, `border-bottom:1px keyline`, `overflow:hidden`.
- The play/pause wrapper covers the root.
- Media background (absolute fill): a Lottie SVG on a layer with bg **`#012978`**.
  - The animated decorative pattern is horizontal bars in **`#AC59FF`** (viewBox 1440×596 on the B version).
  - The same block shows in a screenshot as stepped purple bars in 4 columns. Build it as a static or simple CSS pattern; the Lottie JSON itself was not extracted.
- Band (z 1): `flex column; justify-content:center; align-items:center`; padding `128px 48px` (≥900) / `64px 16px`.
- Card: bg `#FFF`, max-width **1120px** (280×4), full width below 900, `flex column`.
  - Title alignCenter-but-left (≥900 forced `text-align:left; align-items:flex-start`), padding 40, gap 32.
  - h2 headlineHeroLarge **48/55.2** `#181D26`, 7–12 words, 1–3 lines.
  - Actions: 1–2 buttons, primary + secondary. Note the wrapper still has `justify-content:center`, but the buttons sit left because the card is left-aligned.
- Play/Pause at the bottom-right of the section (16px inset).
- Height 472–582 at 1440 / 362–573 at 390.

### A14. FaqAccordion — `faq`

**Layout**
- Shell (≥1024): `flex row; justify-content:space-between; align-items:flex-start; padding-block:0`.
  - 900–1023: column, gap 32, padding `48px 32px`.
  - <900: column, gap 24, padding `40px 24px`.
- Heading column: `flex:1; min-width:447px; padding:40px`.
  - h2: Haas 500, 32/1.25 (≥1024), 24 (≥768), 20/25 (<768). ~4–6 words, 2 lines at 1440.
- List: width **897px** (224.25×4) at ≥1024, `border-left:1px keyline`, `padding:40px 40px 0`, `flex column; gap:24px` (20 below 1024).
- Item:
  - `border-bottom:1px keyline` (none on last), `padding-bottom:24px` (20 below 1024).
  - Trigger: `button` full width, `flex; justify-content:space-between; align-items:center; gap:24px` (20).
  - Question: Haas 600 16/1.35 (14 at 768–1023, 12 below), ls .01em, `#181D26`. 3–12 words, 1 line.
  - Chevron: 32×32 lucide chevron-down, `#9297A0`. Open state `rotate:180deg`, with `transition: transform/rotate .4s cubic-bezier(0,0,.2,1)`.
  - Answer region:
    - `display:grid; grid-template-rows:0fr → 1fr`, `transition: grid-template-rows .4s cubic-bezier(.76,0,.24,1)`. Inner `min-height:0; overflow:hidden`.
    - Answer: `padding-top:16px; padding-right:48px` (44 below 1024); Haas 500 14/1.35 (12 below 1024), ls .02em, `#040E20B0`. 12–53 words; paragraphs separated by 16px.
- **First item open by default**; each item toggles independently, so several can be open.
- 4–7 items. Height 448–637 at 1440.

---

## B. /platform bespoke modules (family B)

Same keyline frame (1344 shell, `#E0DCDB` side borders, kept at mobile) and Season→Haas mapping. Where a module is "≈ A-type", build it as that A component with the listed overrides rather than a new component.

### B1. PlatformHero (new; no A equivalent because the h1 is much larger)

**Layout**
- Root: bg `#FFF`, `overflow:clip hidden`.
- Shell: `flex column; align-items:center`.
- Copy:
  - `flex column; align-items:center; gap:24px; padding:64px 40px 0` (`40px 16px 0` <768), max-width 1264, centred text.
  - Eyebrow `p`: 600 14/1.35 `#161616`, nowrap, 3 words.
  - h1: weight 500, **`font-size: clamp(2.5rem, 5.5vw, 5rem)` → 79.2px at 1440**, line-height 1.1 (87.1). Each line is a `display:block` span (2 lines, 3+4 words). <768: 48px / 1.15.
  - Subhead: Haas 400 16/1.35, ls .16px, `#040E20B0`, max-width 616, ~11 words, 1 line.
  - CTAs: `flex wrap; gap:16px` (B buttons). <768: column, gap 8, full width, `margin-top:8px`.
- Media:
  - max-width **1024**, `margin-top:40px`.
  - Image 1024×451 (2277:1003), `border-radius:8px 8px 0 0` (0 below 768).
  - Bottom of the hero, no padding below.
- Pattern: `position:absolute; top:35%; bottom:0; left:50%; width:100vw; transform:translate(-50%)`, z 0.
  - Lottie SVG of black horizontal bars at **opacity .05**, animating their width (scaleX).
- Height 889 at 1440 / 749 at 390.

**Motion (CSS keyframes)**
- `.copy`: `platformHeroFade .5s ease-out .27s both` (opacity 0→1).
- `.media`: `platformHeroRise 1.15s ease-out 1.22s both` (`translateY(12.5rem)`, opacity 0 → 0, opacity 1).
- `.pattern`: `platformHeroPattern 2.6s ease-out 0s both` (0 until 10% → 1 at 30%).

### B2. LogoGrid (≈ A2 LogosFlip, static)

**Layout**
- Root: `border-top` and `border-bottom` 1px keyline.
- Heading frame: `border-bottom:1px keyline; flex justify-center`.
  - Heading cell max-width 654, `border-inline:1px keyline` (none <768), padding 40 (`24px 20px` <768).
  - `p` 500 18/1.35 `rgba(22,22,22,.7)` centred (16 at <768), ~7 words.
- Logos: 6 cells, `flex:1 1 0`, height **73** (64 <768), `border-left:1px keyline`, `margin-right:-1px`.
  - Logos are small (52–100 × 18–28) with `filter:brightness(0)`.
  - <768: only the first 2 cells are shown.
- Static: no flip. Height 180 / 137.
- Build as A2 with: heading 18px in a bordered 654px cell, cell height 73, no flip.

### B3. TabPanels (new; vertical accordion-tabs with large media)

**Layout**
- Intro band: `border-bottom:1px keyline`, centred, `padding:80px 40px 40px`, gap 16.
  - h2 500 48/1.15 `#161616`, `white-space:nowrap` at ≥900. 9 words, 1 line.
  - <768: left-aligned, `padding:40px 16px`, 32px, colour `#181D26`.
- Panel: `border-bottom:1px keyline`, position relative, height **701px** (≥900).
  - Left column: width **426px**, `border-right:1px keyline`, bg white.
  - Tablist (`flex column`) of 4 items. Each item is `[tabPanel (expanding), tab button]`; the active item flexes to fill.
- Tab button:
  - `flex; gap:8px; align-items:center; width:100%; padding:24px 60px; border-bottom:1px keyline`.
  - bg **`#F8F6F6`**, colour `rgba(22,22,22,.7)`.
  - Label: Haas 500 `clamp(1.125rem, 2vw, 1.5rem)` = 24px at 1440, line-height 1.3, nowrap.
  - Active: bg `#FFF`, colour `#181D26`, `border-bottom-color:#181D26`, padding-inline 40, plus a 12×12 `#161616` square marker before the label.
  - Height 80.
  - <900: `order:-1` (tab above its panel), padding `24px 40px 24px 48px`; active has no bottom border.
- Expanding copy (above the active tab):
  - `display:grid; grid-template-rows:0fr→1fr` (`.4s cubic-bezier(.76,0,.24,1)`); inner opacity 0→1 (`.35s` same curve).
  - Copy: padding 40 (`24px 40px 24px 48px` <900), gap 8 (12).
    - Title `p` 600 16/1.35 `#181D26` (6–11 words).
    - Body `p` 500 14/1.35 `#181D26` (31–42 words, 3–5 lines).
- Media (≥900): `position:absolute; inset:0 0 0 426px` (916×700). Crossfade: `opacity .4s cubic-bezier(.76,0,.24,1)`, `visibility` delayed .4s on exit.
  - Solid bg per tab: **`#7A015C`, `#47008F`, `#004157`, `#7F1414`**.
  - A pixel-pattern image (`object-fit:fill; image-rendering:pixelated`) fills it, then the screenshot image (`cover`).
  - Tab 3 also has a video: 79.6% × 58.6% at top 26.1% / left 10.2%, radius 8.
  - <900: media is in flow after the copy, `aspect-ratio:918/701`, full width.
- Interaction: click only. **No auto-advance** (verified 15s). First tab active.
- Height 877 / 950.

### B4. IntegrationsSplit (≈ A9 with overrides)

Same structure as A9 with these values:
- Copy max-width 688, padding `128px 40px` (≥900) / `64px 20px` / `40px 16px` (<768), gap 32.
- h2: three block lines, `clamp(1.75rem,4vw,3rem)` → **48/55.2** (32 <768), 11 words.
- Description 500 18/1.35 `rgba(22,22,22,.7)` (16 <768), 17 words, 2 lines.
- B-outline CTA "Explore integrations" with a 16px arrow; hover inverts to `#161616`.
- Marquee box **400×563**: **4** strips of 100px; cells **100×100**, logo 56×56.
  - <900: horizontal, 2 rows of 100px (200 total) moving opposite ways.
- Motion is **pure CSS** (not JS):
  - Strips 1/3: `integrationsScrollUp 28s linear infinite` (`translateY(0 → -50%)`).
  - Strips 2/4: `integrationsScrollDown 28s linear infinite` (`-50% → 0`).
  - Mobile: `integrationsScrollLeft` / `Right` (`translateX`).
  - Each track holds 12 cells (6 logos ×2), track height 1200.
  - Reduced motion: no animation (down/right strips offset −60px).
- No play/pause button, no drag. Height 567 / 530.

### B5. CapabilitiesBento (≈ A3 FeatureCards with media; implement as an A3 variant `withMedia`)

**Layout**
- Heading band: `border-bottom:1px keyline`, `padding:80px 40px 40px` (`40px 16px 24px` <768).
  - h2 `clamp(1.75rem,4vw,3rem)` = 48/1.15 (32 <768), 7 words, left-aligned.
- Bento: `grid 1fr 1fr` (≥900; 1 column below), no gap. Cells have `border-bottom:1px keyline` + `border-right` on odd cells.
- Cell: the whole card is a link.
  - bg `#FFF` → hover/focus-visible **`#F8F6F6`** (`transition: background-color .15s`).
  - Copy: padding 40 (`40px 16px 24px` <768), `flex column; gap:8px`.
    - Title 500 24/1.3 (1–2 words).
    - Body 500 16/1.35 (7–11 words, 1 line).
    - "Learn more" `span`: 600 12/1.35 (14 <768), `padding-block:8px`, gap 8, 16px arrow.
  - Visual: `margin-top:auto; height:360px` (228 <768), bg `#F8F6F6`, image `cover`, `object-position: center top`.
- 4 cells; each 671×542 at 1440. Height 1260 / 1827.

### B6. CustomerStoriesSlider (new)

**Layout**
- Root: bg **`#161616`**, `overflow:hidden`.
- Shell: `border-inline:1px rgba(255,255,255,.23)` (none <900).
- Top spacer 128px (≥900) / 64 / 40 (<900).
- Viewport: `display:grid`, `border-block:1px rgba(255,255,255,.23)` (none <900). **6 slides** stacked in `grid-area:1/1`, crossfade `opacity .9s, visibility .9s`.
- Slide (≥900): `flex row; height:570px`, bg `#FFF`.
  - Copy: `flex:1; padding:40px 64px 40px 40px; flex column; justify-content:space-between; gap:32px`.
    - Logo: max 168×48, left aligned, `object-fit:contain` (placeholder).
    - Text block: `gap:32px`.
      - Quote: 500 `clamp(1.25rem,2.5vw,2rem)` = 32/1.25 (40), `#161616`, hanging quote (`text-indent:-.45em; padding-left:.45em`). 31 words, 4 lines.
      - Byline: gap 4. Name 600 14/1.35; role 500 14/1.35. Both `#161616`.
  - Visual: width **427px**, `border-right:1px rgba(255,255,255,.23)`, bg `#0A0A0A`, portrait image `cover`.
- Slide (<900): transparent bg.
  - Copy padding `0 16px`. Logo 80×32 rendered white (`filter:brightness(0) invert()`).
  - Quote 24/30 `#FFF`; name and role `rgba(255,255,255,.86)`. The visual is hidden.
- Footer: `min-height:128px; padding:0 40px; flex space-between; gap:32px` (≥900); <900 padding `48px 16px 40px`, gap 12.
  - Progress: `flex:1; gap:16px` (4 <900); 6 bars 2px tall, bg `rgba(255,255,255,.35)`.
    - The fill is an absolutely-positioned span, bg `#F884EE`, `transform-origin:left`, `scaleX(0→1)`.
  - Arrows: 40×40 round, 1px `rgba(255,255,255,.23)` border, white 16px icon (right arrow mirrored).
    - Hover: bg `rgba(255,255,255,.08)`, border `rgba(255,255,255,.5)`, `.15s`.
    - <900: arrows are placed before the progress bars.
- **Autoplay:** each slide runs **10s**. The active bar fill grows linearly 0→1 (measured +0.05 per 0.5s). Then the next slide crossfades (0.9s) and the previous fill resets to 0. It loops. Clicking a bar or arrow jumps.
- Height 828 / 490.

### B7. ReadNextDark (≈ A12)

Build as A12 with these overrides:
- Heading band `padding:80px 40px 40px` (`40px 16px`), h2 48/1.15 (32 <768), max-width 713. There's no 24px top pad.
- Shell `padding-bottom:80px` (0 <768).
- Cards bg `#161616`. Eyebrows coloured per card: **`#F797EF`, `#FFCD05`, `#35CBFD`**. Title 600 20/27 white, 6–10 words, 2 lines.
- Art `aspect-ratio:448/271.27`.
- Hover: title underline, offset 3.
- Height 695 / 1267.

### B8. CtaBanner (≈ A13)

Build as A13 with these overrides:
- `min-height:596px` (482 <768); content `padding:40px 20px` (`64px 16px` <768), centred.
- Card width `min(100%, 874px)`, padding 40 (24 <768), `flex column; align-items:flex-start; gap:40px`.
- Headline: 500 `clamp(2rem,4.5vw,4rem)` = **64/1.1** (70.4) at 1440 (48/1.15 <768), colour `#000`, max-width 794. 5 words, 2 lines.
- B buttons; primary hover `#2A2A2A`. Min height 46.
- Lottie bars background as in A13 (`#012978` + `#AC59FF` bars). There's no play/pause.

---

## C. Pricing (https://airtable.com/pricing) — family C

**Page frame**
- Header: the same Haas header as the homepage. There's no breadcrumb.
- Page wrapper: bg `#FFF`, padding 32.
- Content column: `margin-top:32px; padding-top:32px`, centred. **1250px** wide at 1440 (x 95); 326 at 390.
- Text colour `#1D1F25`; letter-spacing −0.16px on all Inter roles. The −0.16px can be dropped with Haas.
- Mobile (<1024, the `lg-hide` / `md-hide` classes): plan cards stack, and the comparison table and "See all features" link are hidden.

### C1. PricingTitle
- Centred h1: Inter Display 475 **44.8/56** (Haas 500), 6 words, 1 line (3 lines at 390).
- Block `padding-bottom:64px`. h1 at y 217 (1440).

### C2. PlanCards (desktop ≥1024; new)

The four cards are built as **9 aligned rows × 4 columns** so that every row lines up across cards.
- Columns are `col-3` (312.5) with `padding:0 8px` → card width **297px**, 16px gutter.
- Each card cell has `border-left/right:1px #C4C7CD`.

**Highlighted card** ("Most popular", column 2):
- Border colour **`#0D52AC`**; every row cell has bg **`rgba(240,246,255,.5)`**.
- Above it (row 0, 36px) is a tab: bg `#0D52AC`, `radius:12px 12px 0 0`, centred text "Most popular" 475 15/22.5 white.
- The other cards have an empty 36px row 0.

| Row | Height | Content |
|---|---|---|
| 1 | 68 | Plan name h2 475 28/35. Padding `24px 24px 8px`; `border-top:1px`; `radius:12px 12px 0 0` (highlighted card: radius 0, since the tab sits above). |
| 2 | 76 | Description 400 13/20, 9–13 words. Padding `0 24px 16px`. |
| 3 | 8 | Spacer (`padding-bottom:8px`). |
| 4 | 128 | Price: big number 475 **64/64** with a "USD" suffix (475 16/16, `margin-left:8px`, baseline-aligned). Below (`margin-top:16px`): "per seat/month billed annually" 400 16/20 (2 lines). Free shows "Free" at 48/48. Enterprise shows a 60×50 icon and "Custom pricing" 575 16/20. |
| 5 | 36 | Monthly note "$X billed monthly" 400 16/20, with the amount bold 575. |
| 6 | 88 | CTA pill, centred, 247×56: `border-radius:9999px; padding:16px; margin:8px 0`, 575 16/20. See variants below. |
| 7 | 48 | Secondary link line (13/16.25, centred): "or" at opacity .75 + an underlined link (`border-bottom:2px solid rgba(0,0,0,.1)`, `padding-bottom:2.24px`). Present on 2 cards. |
| 8 | 455 | Features. Padding `0 24px 16px`; `border-bottom:1px`; `radius:0 0 12px 12px`. Contents below. |

Row 6 CTA pill variants:
- Outline: white bg, 2px `#1D1F25` border. Hover bg `#F2F4F8`; no transition.
- Filled (highlighted card): bg **`#166EE1`**, white, no border, 247×52. Hover bg **`#0D52AC`**, `transition: background-color .15s cubic-bezier(.2,.1,.2,1)`.

Row 8 features contents:
- Lead line: "X includes:" / "Everything in X, plus:" 475 16/20, `padding-bottom:12px`.
- Feature list: rows `flex; padding-bottom:4px`. Each row is a 20×20 check icon (`padding-right:8px`) + text 400 13/16.25 (2–9 words; some include an inline link in `#166EE1`).
- Count: 7–12 rows.
- Optional "Available add-ons:" lead and 1–2 more rows.

**Section totals:** cards end at y 1280; section `padding-bottom:64px`; height 1007.

### C2m. PlanCards mobile (<1024)
- The 4 cards stack, each full width (326), `margin-bottom:16px`.
- Card: `border:1px #C4C7CD; border-radius:12px; padding:32px 32px 16px; flex column`.
  - Name 475 20/25 (`margin-bottom:4px`).
  - Description 400 16/20 (`margin-bottom:16px`).
  - Price 400 44.8/56.
  - Pill 150×56 (left).
  - Includes list: rows with `padding-bottom:12px`; text 16/20.
  - "ALL FEATURES" toggle: pill caps 475 11/13.75, ls 1.1px, opacity .75, + 16px chevron.
- Card height ~615.

### C3. SeeAllFeaturesLink (desktop only)
- Full-width link block, `padding:64px 0`.
- Centred 475 32/40 text (6 words) + a 64×64 down-arrow icon below.
- Hover: colour → `rgba(0,0,0,.5)`.
- Height 108.

### C4. LogoStrip
- `padding:128px 0`.
- Eyebrow: GT Eesti 400 20/25, ls .2px, opacity .5, centred, `margin-bottom:32px` (6 words).
- A single wide logo-strip image:
  - Desktop: max-width 1152, 1152×57.6 (2001:100).
  - Mobile: a vertical 1201×226 variant, 326 wide.
  - Use a placeholder bar.
- Height 371 / 399.

### C5. ComparisonTable (desktop ≥1024 only; new)

**Grid**
- Rows are flex with `margin:0 -8px`. Columns: feature-name `col-4` (422) + 4 × `col-2` (211), each with `padding:0 8px`.

**Sticky head** (`position:sticky; top:121px`, i.e. under the header; z 1; bg `#FFF`; height 161)
- Row A (73): "Compare our plans" h2 475 32/40 in the first column. Plan names 475 20/25 centred, padding `16px 16px 8px`, radius `12px 12px 0 0`.
- Row B (88): CTA pills 163×56 (same variants as C2; column 2 filled blue 163×52). Padding `0 16px 16px`.

**16 feature groups**, back to back with no gaps:
- Group title row (33): 475 20/25 + `padding-bottom:8px`.
- Feature rows, **36px** each: 2/2/3/4/5/5/5/5/6/6/6/7/10/10/10/10 rows per group (99 total).
  - Feature-name cell: 400 16/20 text with a **dotted underline** (`border-bottom:2px dotted #DDDDDD`) — it's a tooltip trigger — plus an 8×12 info glyph (`padding:6px 0 6px 8px`).
  - Plan cells: centred, padding `0 32px`, 400 16/20. Content is text (e.g. "Unlimited", numbers), a **24×24 check icon** (`#1D1F25`), a 16×16 plus icon (add-on), or empty.
  - Row hover: an absolutely-positioned overlay spanning `left:-12px … right:+12px` (1290 wide), radius 6px, bg `transparent → rgba(0,0,0,.05)` on hover.
- Footnotes after the table (`padding-top:8px`): 5 lines of 400 12.8/16 (10–28 words), `padding-bottom` 8/8/16/16/0.
- Height 5497.

### C6. HelpLinks
- `margin:64px auto`, max-width 768.
- Title: h2 475 28/35 centred, `margin-bottom:32px` (3 words).
- 3 columns (`sm-col-4`; stacked at 390), each centred with `margin-bottom:16px`:
  - Eyebrow 475 12.8/16, uppercase, ls 1.28px, opacity .5, `margin-bottom:8px` (2–3 words).
  - Link 400 19.2/24 `#166EE1` (2 words).
- Height 131 / 294.

### C7. PricingFaq (new; differs from A14)
- Title: h2 475 28/35 centred, `margin-bottom:32px`.
- List: max-width 768, centred, `flex column`. 7 items.
- Item: `border-bottom:3px solid rgba(0,0,0,.1)`, `padding-bottom:2.24px`, `margin-bottom:16px`, `flex column`.
  - Question row (`cursor:pointer`, `margin-bottom:8px`): `p` 575 17/25.5 (5–8 words) + 16×16 chevron.
  - Open state: chevron rotates 180° (`transition: transform .2s`).
  - Answer appears **instantly** (`display:none → block`, no height animation): 400 16/24, `margin-top:16px`, 1–5 paragraphs.
- All items start closed.
- Height 450 / 587.

---

## D. Motion summary (all exact; from computed styles, the shipped CSS and the shipped JS)

| Where | Trigger | What | Timing / easing |
|---|---|---|---|
| A1 hero copy | load | opacity 0→1 | `.5s ease-out`, delay `.27s`, fill both |
| A1 hero media / B1 media | load | opacity 0→1, translateY 200px→0 | `1.15s ease-out`, delay `1.22s` |
| A1/B1 pattern | load | opacity 0 (0–10%) → 1 (30–100%) | `2.6s ease-out` |
| B1 pattern / A13 / B8 backgrounds | continuous | Lottie bar animation (bars change width) | Lottie; content not extracted |
| A2 logos | timer | slot slide-up swap | first at [1,3,1.5,5,3,5.5]s per cell, then every 8s; `transform .8s cubic-bezier(.76,0,.24,1)`; reset at 850ms |
| A5 carousel / A9 integrations | rAF | translate by `--pos` | half-track per **28s** linear; drag with momentum ×0.95/frame; pause via button |
| B4 integrations | CSS | translateY / translateX ±50% | `28s linear infinite`, alternating directions |
| A7 scroll tabber | IntersectionObserver | active tab marker → `#CADCFF` | rootMargin `-35% 0 -45% 0`, thresholds 0/.25/.5; click → smooth scrollIntoView, observer muted 600ms |
| A8 tabs | click | bg/colour | `.15s cubic-bezier(.4,0,.2,1)` |
| A8 mobile accordion / A14 FAQ answer | click | height / grid-rows | `.4s cubic-bezier(.76,0,.24,1)` |
| A14 chevron | click | rotate 180° | `.4s cubic-bezier(0,0,.2,1)` |
| A11 templates | click | slide crossfade | opacity/visibility `.4s` (ease) |
| B3 TabPanels | click | expand copy (grid-rows `.4s`), copy opacity `.35s`, media crossfade `.4s` | all `cubic-bezier(.76,0,.24,1)` |
| B6 stories | autoplay | progress fill scaleX 0→1, then slide crossfade | **10s per slide**, linear fill; crossfade `.9s` |
| B5 cards | hover | bg `#FFF` → `#F8F6F6` | `.15s` |
| Buttons A | hover | colours | `.15s cubic-bezier(.4,0,.2,1)` |
| Buttons B | hover | colours | `.15s` ease |
| Pricing pill (filled) | hover | bg `#166EE1` → `#0D52AC` | `.15s cubic-bezier(.2,.1,.2,1)` |
| Pricing FAQ chevron | click | rotate 180° | `.2s` |
| All other sections | scroll | **none.** No scroll-reveal: element opacity/transform were unchanged before vs after a full scroll pass (only Lottie SVG groups changed). | — |

Every CSS animation is wrapped in `prefers-reduced-motion: no-preference`. Under `reduce`, the original shows final states and stops the marquees.

## E. Not measured / caveats

- **Lottie JSON** (CTA background, hero pattern) was not extracted; only its colours, bar geometry and the fact that it animates. Rebuild it as a static or CSS approximation.
- **900–1023px** was not loaded. Values for that range come from the shipped media queries only.
- **Hover states for pricing utility classes** were measured by real hover, not CSS: the pricing stylesheet is cross-origin and unreadable. Card and table hovers beyond those listed were not probed.
- Pricing **tooltips** (dotted feature names) and the mobile "ALL FEATURES" expander were not opened.
- **Season → Haas wrapping** differs slightly. Heights in the per-page file are Season-rendered at 1440/390.
- The cookie banner (Transcend) and Qualified chat are third-party and excluded.
