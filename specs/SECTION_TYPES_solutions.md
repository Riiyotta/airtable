Source: https://www.airtable.com/

# Section-type catalog — Solutions / Resources / Company pages

This catalog covers 12 routes:
- `/solutions`
- `/solutions/enterprise`, `/solutions/marketing`, `/solutions/product`, `/solutions/operations`
- `/templates`, `/integrations`, `/customer-stories`, `/ai-plays`, `/contact-sales`, `/about`, `/guides`

Per-page section order and data are in `specs/pages_solutions.md`.

**How this was measured**
- Measured 2026-10-12 with headless Chromium (Playwright) at 1440×900 and 390×900, using computed styles and DOM rects.
- Motion comes from `document.getAnimations()`, from timed transform sampling, and from the shipped CSS rules.
- Hover states were measured by real mouse hover and before/after computed-style diffs.
- Values are exact computed values unless marked *approx*, *sampled* or *not measured*.

**Content rule.** The clone uses its own placeholder copy and imagery.
- This file gives text roles, sizes and lengths, never source copy.
- Images are neutral placeholder blocks of the given size, ratio and radius.

**Homepage reuse.** Header, Footer, button styles and tokens come from `CLONE_SPEC.md`. They are referenced, not re-specced.
- The existing components are all hardcoded (no props). "Reuse" below means: add the listed props to the existing component and keep its markup and CSS.

---

## 0. Four visual systems — the key finding

These pages do **not** all share the homepage design language. There are four systems, and each section type belongs to exactly one.

| System | Pages | Font | Look |
|---|---|---|---|
| **BK** (same as homepage) | `/solutions`, `/integrations`, `/ai-plays`, `/customer-stories`, `/guides`, `/contact-sales` | Haas (section headers use "Haas Groot Disp") | Homepage tokens: 12px-radius buttons, 16px-radius cards with `#E0E2E6` border on `#F8FAFC` |
| **SEASON** | `/solutions/marketing`, `/solutions/product`, `/solutions/operations`, `/about` | **ATSeasonSans** (variable) | "Blueprint" look: a 1344px bordered shell column, 1px `#E0DCDB` keylines, 4px-radius buttons, square cards |
| **PLATFORM-E** | `/solutions/enterprise` (same modules as `/platform` — see §5) | ATSeasonSans, weights 550/650 | Like SEASON but ink `#161616` and shell side borders `#333333` |
| **TPL** | `/templates` | "Haas Groot Disp" | Separate Tailwind-v4 app: 32px-radius cards, pastel gradients, gray-500/900 palette |

**ATSeasonSans is page-intrinsic, not A/B.**
- Three fresh contexts per page always gave the same font: marketing, product, operations, about and enterprise always get ATSeasonSans.
- `/solutions`, `/integrations` and the other BK pages always get Haas.

### 0.1 Font to add
- File downloaded to `public/fonts/ATSeasonSansVF.woff2` (134,728 bytes, woff2 variable).
- `@font-face{font-family:ATSeasonSans;font-display:swap;src:url(/fonts/ATSeasonSansVF.woff2) format("woff2-variations");font-weight:100 900;font-style:normal}`
- Stack: `ATSeasonSans, Haas, sans-serif`.
- Weights actually used: 400, 500, 550, 600, 650.

### 0.2 Header and footer per system
Geometry is identical to `CLONE_SPEC.md §1/§9` on every page (header 121px tall at 1440, 143.7px at 390). Only the font changes.

| | BK and TPL pages | SEASON and PLATFORM-E pages |
|---|---|---|
| Nav toggles and links | Haas 16/20.8, weight 500 | **ATSeasonSans 16/20.8, weight 650**, letter-spacing 0.16px on links |
| Promo-bar text | Haas 14/17.5, weight 400 | ATSeasonSans 14/17.5, weight 400 |
| Book Demo / Sign up buttons | Haas 500 | ATSeasonSans 650. Same 55px height, 12px radius, 16/24 padding. Widths shrink slightly (Book Demo 198 vs 209, Sign up 133 vs 139). |
| Footer links | Haas 20/30, weight 400 | ATSeasonSans 20/30, **weight 550** |

- **Implementation:** add `font="haas" | "season"` to `Header` and `Footer`. It sets `font-family` on the root and bumps the weights (500→650 for nav, 400→550 for footer).
- `main` keeps `padding-bottom:64px` on every page.

### 0.3 SEASON tokens (CSS custom properties read from the page)

```
--color-surface-primary      #FFFFFF
--color-surface-secondary    #F8F6F6   (card cells, hover bg)
--color-surface-tertiary     #F2F4F7EB (secondary-button hover)
--color-surface-quaternary   #E1E4EADB (active tab bg)
--color-surface-inverse-primary   #181D26
--color-surface-inverse-secondary #040E20B0 (primary-button hover)
--color-border-primary       #181D26
--color-border-secondary     #F5F1F0  (badge border, primary-button hover border)
--color-border-primary-inverse #FFFFFF
--color-text-primary   #181D26
--color-text-secondary #040E20B0
--color-text-inverse-secondary #E1E4EADB
--color-text-link-inverse-secondary #0768F8
--color-primitive-pink-300 #FFB0FA  (active carousel bar)
--radius-sm 4px  --radius-md 12px  --radius-lg 16px
--spacing-md 16px --spacing-lg 24px
keyline (computed) #E0DCDB   dark keyline #90959D38
```

PLATFORM-E extras:
- Ink `#161616`; secondary text `#161616B3`.
- Shell side borders `#333333`; inner keylines `#E0DCDB`.
- Button hover `#404040` (hero, use-cases) or `#2A2A2A` (CTA banner, stories).

---

## 1. Existing homepage components — reuse map (props only)

| Existing component | Reused on | Props / variations needed |
|---|---|---|
| `Header` | all 12 | `font: "haas" \| "season"` (see §0.2). Nothing else differs. |
| `Footer` | all 12 | `font: "haas" \| "season"` |
| `Hero` (coreHeroImageCentered) | `/solutions` | `video={false}`; `h1`: 1 line, 5 words; `sub`: 1 line, 16 words; `primary` and `secondary` CTA labels (both BkButton, same as homepage). Section height 261.2 (padding 40 0; h1 margin-bottom 32; sub margin-bottom 24; CTAs 55.6 tall). Mobile: h1 32/40, 2 lines, height 353. |
| `CtaBox` | `/solutions`, `/customer-stories` | `variant="row"`. **No box** (no border or radius). Details below the table. |
| `Resources` card markup | basis of **ResourceCard** (§2.4) | Extract the card into `ResourceCard`; the listing pages use it with variants. The homepage card is exactly ResourceCard `imageTop`, without eyebrow. |
| `LogoBar` heading style | `/customer-stories` logo row | `variant="static"`. Details below the table. |
| `Workflows`, `AIPlays`, `CustomerStory` | — | Not used on these pages. |

**`CtaBox variant="row"` (`/solutions`, `/customer-stories`)**
- Section padding `48px 0`, then an inner grid with padding `48px 0` and gap 24 (12 columns of 92.66px). Height 247.6.
- `bg`: `#FFFFFF` (`/solutions`) or `#F0F6FF` (`/customer-stories`).
- h2: Haas 32/40, weight 400, `#333840`, left-aligned. It spans columns 1–8 (909px), 1 line of 5–7 words.
- One primary BkButton, `max-width:200px`, right-aligned (`justify-content:flex-end`) in the same row; its top is 1px above the h2's.
- Mobile (390): height 286; h2 24/31.2, letter-spacing 0.12px, 2 lines; button below.

**`LogoBar variant="static"` (`/customer-stories`)**
- Heading: h2 14/18.9, weight 400, letter-spacing 0.16px, `#333840`, opacity 0.7, centered, padding `40px 0`.
- Then a centered `ul` (flex, wrap, gap 32, padding-bottom 40) of **4** logo cells, 168×52, `object-fit:contain`. **No marquee, no motion.**
- Section height 190.9; margin-top 48.
- Mobile: heading padding 24; logos wrap.

---

## 2. Shared primitives (small, reused by many types)

### 2.1 BreadcrumbBar (BK + SEASON solution pages)

**Used on:** `/solutions`, `/solutions/marketing|product|operations`, `/integrations`, `/ai-plays`, `/customer-stories`, `/guides`.
**Not used on:** `/solutions/enterprise`, `/about`, `/templates`, `/contact-sales`.

**Bar**
- `position:sticky; top:120.3px` (directly under the header). Height 42.2, full width.
- bg `#F8FAFC`, `box-shadow: inset 0 7px 20px -7px rgba(15,48,106,.05)`.
- `ol` is a flex row, `padding:12px 32px`, items vertically centered.
- On SEASON pages the bar still uses **Haas**.

**Items**
- Haas 14/18.2, weight 400, letter-spacing 0.14px, `#181D26`.
- Separator: 12×12 chevron rotated −90°, margin `0 8px`, color `#333333`.
- Last item is a non-link `span role=link`.
- Hover (≥1024): color `#254FAD`, transparent bg. Hover (<1024): bg `rgba(15,48,106,.05)`. `transition: all .15s ease-in`.

**Scroll behavior**
- While scrolling, the class `isScrolling` is added → `opacity 0; visibility hidden; transform translateY(-12px)`.
- `transition: opacity, visibility, transform .25s ease-in` (links: visibility .15s ease-in).
- It comes back after scrolling stops: visible again 600ms after a programmatic scroll. The exact idle debounce was *not measured*.
- Mobile: top 143.7 (under the 143.7px mobile header). Same behavior.

### 2.2 SEASON primitives

**`SeasonShell`** (wraps every SEASON section)
- Section: full-bleed, bg white (or dark, per type).
- Inner `.shell`: `max-width:1344px; margin:0 48px` — at 1440 that is x 48–1392 with 1342px of content.
- `border-left/right:1px solid #E0DCDB` and `border-bottom:1px solid #E0DCDB`. The hero puts the bottom border on the root instead.
- Mobile 390: `margin:0`, no side borders, bottom border only. Inner grids are inset 16px and re-gain side borders (see each type).

**`SeasonTitle`** (title block used inside most types)
- Flex column, gap 32. Alignment is `center` (items centered) or `left`.
- Padding:
  - hero and CTA: `40px`
  - section `titleBand`: `64px 40px 40px`
  - mobile section: `40px 16px 32px`
- `textStack`: flex column, gap 16.
  - **Badge** (optional): ATSeasonSans 14/18.9, weight 500, letter-spacing 0.28px, `#040E20B0`, `border:1px solid #F5F1F0`, radius 4, padding `4px 12px`, height 28.9, 2–4 words. Inverse variant (dark bg): border `#90959D38`, color `#E1E4EADB`.
  - **Headline hero** (`h1`, or the h2 in the CTA banner): 48/55.2, weight 500, `#181D26`, `max-width:884px`. Mobile 32/36.8.
  - **Headline section** (`h2`): 32/40, weight 500, `#181D26`, max-width 884. Mobile **20/25**.
  - **Subhead**: 16/21.6, weight 500, letter-spacing 0.16px, `#040E20B0`, max-width 884. Mobile **12/16.2**, letter-spacing 0.24px.
- `actions`: flex, wrap, gap 16 (centered when aligned center).

**`SeasonButton`**
- `display:inline-flex; padding:12px 24px; border:1px solid; border-radius:4px`, height 47.6.
- ATSeasonSans 16/21.6, weight **600**.
- `transition: background-color, border-color, color, box-shadow .15s cubic-bezier(.4,0,.2,1)`.
- Mobile: full width (310 inside a 40px-padded title; 278 inside the CTA card).

| Variant | Rest | Hover (`@media (hover:hover)`) |
|---|---|---|
| primary | bg `#181D26`, border `#181D26`, text `#FFF` | bg `#040E20B0`, border `#F5F1F0` |
| secondary | transparent, border `#181D26`, text `#181D26` | bg `#F2F4F7EB` |
| secondary + icon | as secondary, plus a 16px arrow icon after the label (gap 8) | as secondary |

**`IconButton`** (pause/play, carousel arrows)
- 40×40, radius 9999, flex-centered, 16px icon (arrows 15px).
- Same `.15s cubic-bezier(.4,0,.2,1)` transition.
- `dark`: bg `#181D26`, border `#181D26`, white icon. Hover: bg `#040E20B0`.
- `darkSecondary`: transparent, border `#90959D38`, white icon. Hover: border `#FFFFFF`.
- Pause buttons sit `position:absolute`, 16px from the bottom-right of their media box.

**`TextLink` (inverse)**
- ATSeasonSans 16/21.6, weight 600, letter-spacing 0.16px, `#5AA2FF`.
- Followed by a 24×24 arrow box (15px svg), gap 8.
- Hover: `#0768F8` (`.15s cubic-bezier(.4,0,.2,1)` on color).

### 2.3 BK primitives

**`BkSectionHeader`** (listing pages)
- Wrapper margin `48px 0 4px`.
- `h5`: "Haas Groot Disp" 18/24.3, weight 400, letter-spacing 0.18px (0.36px on mobile), `#181D26`, margin-bottom 16.
- Then a 2px rule, full width: `#F8FAFC` on `/integrations` and `/ai-plays`; `#0114351F` on `/guides`.
- Total height 42.3.

**`BkEyebrowPill`**
- Radius 999, padding `4px 12px`, height 29.
- Label Haas 14/21, weight 400. An optional 20×20 category icon precedes the label (gap 6).
- Colors (bg / text):
  - integrations category: `#E0E2E6` / `#444444`
  - AI Plays "Operations": `#FFE0CC` / `#AF3803`
  - "Marketing & Creative": `#FCCCF0` / `#AB0A83`
  - "Digital Product": `#C7E5F2` / `#0076A8`
  - "Physical Product": *not measured*

**`BkLink` (standalone, with arrow)**
- Followed by a 24×12 arrow icon.
- Arrow hover: `transform: translateX(4px)`, `.15s ease-in`.
- Colors: `#0768F8` on icon cards (14/18.9, weight 500, letter-spacing 0.07px), or `#1B61C9` on media-text rows (20/30, weight 500, letter-spacing 0.1px). The latter hovers to `#1B61C9CC`.

### 2.4 `ResourceCard` (extract from homepage `Resources.jsx`)

**Base** (identical to the homepage resource card)
- `<a>` → card: bg `#F8FAFC`, `border:1px solid #E0E2E6`, radius 16, `overflow:hidden`, flex column, `height:100%`, `min-height:200px`.
- Image box: `aspect-ratio:16/9`, img cover.
- Content: padding 24.
  - optional eyebrow row: flex, gap 8, **margin-bottom 24**
  - title: Haas 18/21.6, weight 500, `#181D26`, margin-bottom 8
  - optional description: Haas 14/18.9, weight 400, letter-spacing 0.14px, `#040E20B0`, margin-top 16
- **Hover:** title color → `#040E20B0` with no transition. No image zoom, no shadow, no lift (verified by sampling the transform for 1.2s while hovering).

**Variants**

| Prop | Value | Where |
|---|---|---|
| `layout` | `imageTop` | integrations, customer stories, guides |
| | `imageBottom` (content first, then the 16:9 image flush at the bottom) | AI Plays |
| `eyebrow` | `pill` (BkEyebrowPill) | integrations, AI Plays |
| | `logo` (120×36 box, contain, `object-position:left center`) | customer stories |
| | `meta` (two 12/18 weight-500 `#040E20B0` labels, each after a small icon, gap 8, row height 20) | guides |
| `description` | on / off | off on integrations and customer stories |

**Measured card sizes**

| Grid column width | Card height | Context |
|---|---|---|
| 442.7 | 380.5 | integrations featured; title 1 line, no description |
| 442.7 | 409.1 | customer stories; title 2 lines |
| 442.7 | 466.7 | AI Plays featured; title 2 lines + description 3 lines |
| 308 | 304.7 | integrations grid |
| 308 | 409.9 | AI Plays grid; description 3–4 lines |
| 320 | 386 | guides; description 3–4 lines |

Mobile: 342 wide (294 inside the AI Plays filter column), single column.

### 2.5 `BkButton` usages beyond the homepage
- **Outline-white on dark** (guides banner): transparent, border 1px `#FFF`, text `#FFF`, radius 12, padding `16px 24px`, 16/21.6 weight 500, letter-spacing 0.16px. Hover: text and border `#F2F4F7EB`. `transition all .2s linear`.
- **Outline "Load more"** (customer stories): homepage secondary BkButton (132.8×55.6, outline with the hero-secondary shadow). Hover: text and border `#040E20B0`, shadow none.

---

## 3. BK section types

### BK-1 `PageHeroSplit` (ArticleHeroTextSide)
**Used on:** `/integrations` (light), `/ai-plays` (dark).

**Layout**
- Full-bleed band, padding `72px 0`.
- Contained with padding `0 24px` + gridWrap margin `0 32px` (content x 56–1384, 1328 wide), 12-column grid with gap 32.
- `h1` spans columns 1–6 (648 wide): Haas 40/48, weight 400, left-aligned.
  - integrations: 3 words, 1 line → band height 192
  - AI Plays: 8 words, 2 lines → band height 240
- Description in columns 7–12 (x 849, 534.7 wide), flex `align-items:center`: Haas 16/21.6, weight 400, letter-spacing 0.16px; 13–18 words, 1–2 lines.

**Themes**

| Theme | Background | h1 color | Description color |
|---|---|---|---|
| `light` | `#F8FAFC` | `#333840` | `#333840` |
| `dark` | `#1F0C3B` | `#FFFFFF` | `#FFFFFF` |

**Mobile:** padding 48; h1 32/40 (1 line integrations, 4 lines AI Plays); description below. Heights 235.6 / 317.8.

**Motion:** none.

### BK-2 `IconCardGrid` (CardsGridSectionV2)
**Used on:** `/solutions`.

**Layout**
- Section padding `64px 0`; gridWrap margin `0 32px` (1376 content).
- **Header** (centered column, max-width 844, padding-bottom 40):
  - eyebrow pill: "Haas Groot Disp" 14/21, weight 400, letter-spacing 0.28px, `#333840`, `border:1px solid #EEEEEE`, radius 999, padding `4px 12px`, margin-bottom 16; 1 word
  - h2: Haas 32/41.6, weight 400, letter-spacing 0.16px, `#333840`, centered; 10 words, 1 line; padding-bottom 16
  - p: Haas 16/21.6, letter-spacing 0.32px, `#333840`, opacity 0.7; 17 words, 1 line
- **Grid:** `repeat(3, 437.33px)`, gap 32. Rows are 207.6 tall (the last row 228.6). **8 cards** (3+3+2).

**Card**
- bg `#FFF`, `border:1px solid #E0E2E6`, radius 16, padding 24.
- Icon 24×24 (placeholder square), margin-bottom 16.
- h3: Haas 16/21.6, weight 500, `#181D26`, margin-bottom 8; 2 words.
- Description: Haas 14/21, letter-spacing 0.28px, `#040E20B0`, margin-bottom 16; 9–10 words, 2 lines.
- BkLink "Explore X": 14/18.9, `#0768F8`, + arrow.

**Hover:** the card doesn't change. The link arrow does `translateX(4px)` (`.15s ease-in`).

**Mobile:** 1 column, gap 24, cards 342×207.6. h2 24/32.4, letter-spacing 0.12px, 2 lines. Section height 2211.5.

**Motion:** none.

### BK-3 `MediaTextRow` (MediaTextSection / Bifold)
**Used on:** `/solutions` (6 rows, alternating sides).

**Layout**
- Contained section, padding `0 24px`, max-width 1536.
- 12-column grid (86.66px columns, gap 32), padding `96px 0`. Row height 920.
- **Text** (561.3 wide, vertically centered on the media):
  - h2: Haas 40/50, weight 400, `#333333`, margin-bottom 16; 4 words, 1–2 lines
  - p: Haas 20/32.5, weight 400, `#333333`, margin-bottom 16; 15–18 words, 2–3 lines
  - BkLink: 20/30, weight 500, letter-spacing 0.1px, `#1B61C9`, + 24×12 arrow; 3 words
- **Media** spans 6 columns (680 wide): 680×680 (1:1), margin `24px 0`, no radius, `object-fit:fill` of a 1280×1280 image.
- `reverse` prop alternates the sides. Rows 1, 3, 5 have text left (x 24) and media right (x 736). Rows 2, 4, 6 have media left and text right (x 854.7).

**Hover:** link color `#1B61C9` → `#1B61C9CC`; arrow `translateX(4px)` (`.15s ease-in`).

**Mobile:**
- Single column (6 columns of 37px, gap 24), padding-top 96. **Text always first** (`inlineMobileTextFirst`).
- h2 24/31.2, letter-spacing 0.12px; image 342×342.
- Row heights 772–836.

**Motion:** none.

### BK-4 `FilterListing` (FilterAndCardsGridSectionNewDesign)
**Used on:** `/integrations`, `/ai-plays`. Same component; data differs.

**Structure (1440)**
1. **Featured block**
   - Contained with padding `0 24px` → x 24, 1392 wide.
   - `BkSectionHeader` ("Featured …"), then a grid of `repeat(3, 442.66px)` with gap 32, margin-top 24, **3 ResourceCards**.
   - AI Plays adds row-gap 48 and margin-bottom 48.
   - Card variant: integrations `imageTop` + pill, no description; AI Plays `imageBottom` + pill + description.
2. **Two-column area** (gridWrap margin `0 32px` → x 56, 1328 wide, 12 columns of 81.33, gap 32)
   - **Sidebar:** columns 1–3, 308 wide, x 56.
   - **Main:** columns 4–12, 988 wide, x 396. `BkSectionHeader` + grid of `repeat(3, 308px)`, gap 32 (AI Plays row-gap 48), margin-top 24.
     - integrations: **27 cards**, rows 304.7 tall, grid 2998 tall
     - AI Plays: **9 cards**, rows 409.9 tall
     - No pagination or "load more"; every card renders.

**Sidebar**
- `BkSectionHeader` "Filter".
- **Filter group** (`checkGroupWrapper`, margin `24px 0`):
  - Header row (`role=button`, 37.6 tall, flex space-between):
    - h5 "Haas Groot Disp" 16/21.6, weight 400, letter-spacing 0.32px, `#181D26`, margin-bottom 16
    - chevron 20×10
  - Options container: padding-left 4, margin `4px 0 32px`, `overflow:auto`.
  - Each option is a `label` 304×33.2, radius 4:
    - row 21.2 tall with margin-bottom 12
    - checkbox icon 17×18, unchecked: white rounded square, border `#C4C7CD`. Checked: fill `#0114351F`, stroke `#C4C7CD`, check mark.
    - label text: "Haas Groot Disp" 14/18.9, letter-spacing 0.28px, `#181D26`, margin `0 8px`
  - Groups are separated by `hr` 2px `#F8FAFC`.
- **Group counts**
  - integrations: 1 group ("Category"), 13 options
  - AI Plays: 2 groups ("Category" with 4 options; "AI Feature" with 6)
- **"Clear all" button**
  - 138.7×55.6, radius 12, padding `16px 24px`, 16/21.6 weight 500, letter-spacing 0.32px, with a 16×17 close icon.
  - **Disabled** (nothing checked): bg `#F8FAFC`, border `#C4C7CD`, text `#020D206E`, icon opacity 0.5.
  - **Enabled:** transparent bg, border and text `#181D26`, BkButton-secondary shadow. Hover: bg `rgba(1,20,53,.12)`, border `#C4C7CD`, text `#040E20B0`, shadow none.

**Behavior** (verified by clicking one checkbox; no form submit)
- Filtering is **instant and client-side**: checking "File Management" re-rendered **both** grids (featured and main) to the matching 3 cards.
- No URL change. Clear-all becomes enabled.
- Clicking a group header collapses its option list and flips the chevron (`rotate(180deg)` ↔ none, `transition all .1s linear`).
- No hover style on options.

**Mobile 390**
- Featured grid becomes 1 column, gap 48, cards 342 wide.
- The sidebar becomes **`filterMobileWrapper`**: a row holding an outline "Filters" button (120.1×58, BkButton outline radius 12, 14×11 filter icon, margin-bottom 32). The opened filter panel was *not measured*.
- Main grid: 1 column (342; 294 on AI Plays because of the extra 24px inset), gap 24 (AI Plays) or 48 (integrations).

**Motion:** none besides the transitions above.

### BK-5 `CardGridLoadMore`
**Used on:** `/customer-stories`.

**Layout**
- Section padding-bottom 48; contained with padding `0 24px` (1392 wide).
- Grid `repeat(3, 442.66px)`, gap 32 (rows 409.1). **12 cards initially.**
- Card: ResourceCard `imageTop`, `eyebrow="logo"` (120×36), title 2 lines (9–10 words), no description.
- **"Load more"** button: centered, margin `48px 0 72px`. The append behavior was not exercised; the clone may keep it static.

**Mobile:** 1 column, gap 48, cards 342×354.

**Motion:** none.

### BK-6 `HeroCarouselCentered` (slick centerMode)
**Used on:** `/customer-stories`.

**Layout**
- Section bg `#F8FAFC`, padding `72px 0 48px`, flex column, centered, `overflow:hidden`. Height 851.8.
- **Title block** (766.4 wide, centered):
  - h1 "eyebrow-like": Haas 32/40, weight 400, `#41454D`, margin-bottom 16; 2 words
  - h2: Haas 40/48, weight **500**, `#181D26`, margin-bottom 48; 5 words, 1 line
- **Slider:** 1008 wide, centered (x 216). `.slick-list` has padding `0 50px` and **`overflow:visible`**, so neighbors peek out and the section clips them.
  - Slide = 908 (padding `0 16px`) → media 876×492.75 (16:9), **radius 20**, image cover or video.
  - 3 slides.
- **Dots row** (margin-top 32 → total 48 tall):
  - Prev/next arrow buttons 56×48 at the ends. Inactive arrow: `opacity 0; pointer-events:none`, `transition opacity .15s`.
  - Dots list: flex, gap 12. Each dot is a button 80×48 holding a bar 80×4, radius 6, `#0114351F`.
  - The active bar has an `::after` fill that animates `translateX(-100%) → 0` over **4s linear** (`autoplaySpeed`).

**Motion**
- **Autoplay every 4000ms** (sampled: track jumped −908px → −1816px at the 4s mark).
- Slide-change tween duration/easing: *not measured* (slick inline transition).
- Hovering the slider pauses the dot fill (`animation-play-state: paused`).
- Center card hover: `transform: scale(1.03)`, `.15s ease-in`.

**Mobile:**
- Height 630.9; h1 24/31.2; h2 32/40, 3 lines.
- Slide 290 wide (padding `0 8px`); dots wrapper 360 wide.

### BK-7 `GuidesBanner` (expanding image strip)
**Used on:** `/guides`.

**Layout**
- Section bg `#181D26`, height 763.2. Grid with a full-bleed left start.

**Left text column** (x 48, 521 wide, top 48)
- h1: Haas 40/48, weight 500, `#FFF`; 7 words, 2 lines.
- Subtitle: 16/21.6, weight 500, letter-spacing 0.16px, `#FFF`, padding-top 12; 18 words, 3 lines.
- Button group, margin-top 144:
  - label: 12/18, weight 400, uppercase, letter-spacing 0.6px, `#FFF`; 2 words
  - wrapping flex row (gap 16, padding-top 12) of **8 outline-white BkButtons** (§2.5), 55.6 tall, label widths vary (1–3 words)

**Right strip** (`ul`, flex row, x 617, 822.8 wide, full section height)
- 3 items.
  - Active: `flex:5 1 0` (531.6 wide). Inactive: `flex:1 1 0` (145.6 wide).
  - `transition: flex 1s ease-in-out`; cursor pointer.
- Image: `position:absolute`, cover, **opacity 0.6**, placeholder on dark.
- Caption (`figcaption`): absolute, left 48 (32 at ≥768, 24 below), bottom 48.
  - "Featured" label: 12/18, uppercase, letter-spacing 0.6px, white
  - Title link: 18/24.3, weight 500, letter-spacing 0.18px, white; 4 words
  - Each sits in an `overflow:hidden` wrapper.
- **Active caption:** `opacityFadeIn` keyframes `translateY(100%) → 0`, **1.5s, ease-in**, triggered when an item becomes active. Inactive captions sit at `translateY(18px)` (hidden by the wrapper).
- **Active item hover:**
  - overlay `#181D26` fades from opacity 0 to 0.55 (`transition opacity .5s ease-in`)
  - a centered "Read article" button (white bg, `#181D26` text) fades from opacity 0 to 1, `transition-delay .5s`

**Activation**
- Hovering an inactive item did nothing (measured). It switches on click/focus.
- **No auto-rotate** (sampled 15s).
- At ≥1664 the items become fixed `flex:0 0 80px` / active `1 1 0`.

**Mobile:**
- Text column full width, padding `32px 24px`; h1 32/40; buttons gap 12.
- The strip goes below the text: items 300px tall; active `flex:4`.
- Section height 1151.4.

### BK-8 `SidebarNavGrid`
**Used on:** `/guides` (Topics + Browse).

**Layout**
- 12-column grid (x 32, 1376 wide, gap 32).
- **Sidebar:** columns 1–3, 320 wide.
  - `BkSectionHeader` "Topics" (inner 256 wide; rule `#0114351F`).
  - `ul` margin `16px 0` with **8 links**, each row 18.9 tall, margin-bottom 16.
  - Each link has a small leading icon (text starts +20px) then an `h6`: Haas 14/18.9, weight 500, letter-spacing 0.28px, `#41454D`; 2–4 words.
  - Hover: color `#040E20`, opacity 0.69.
- **Main:** x 384, 1024 wide.
  - `BkSectionHeader` "Browse", margin-bottom 24.
  - Grid `repeat(3, 320px)`, gap 32, row-gap 48 (rows 386). **8 ResourceCards** (`imageTop`, `eyebrow="meta"`, description 3–4 lines).

**Mobile:** sidebar above, then 1 column of cards (342×380.4), gap 24.

**Motion:** none.

### BK-9 `ContactSalesSplit` — form must stay non-functional
**Used on:** `/contact-sales`. No breadcrumb.

**Page layout**
- Container padding `64px 24px`, max-width 1536.
- 12-column grid (57.33px columns), **gap 64**, `align-items:start`.
- Page height 1724 once the form has loaded (1487 while the skeleton shows).

**Left column** (`col-span-7`, 785.3 wide; flex column, gap 24)
1. h1: Haas **48/60, weight 600**, `#333333`, margin-bottom 8; 5 words, 1 line.
2. Rich text, Haas 20/32.5, `#333333`:
   - paragraph: 29 words, 3 lines, margin-bottom 16
   - `ul` (padding-left 32): 3 bullet items, each 8–9 words, 1 line, margin-bottom 4
3. Trust block (flex column, gap 16):
   - p 16/24, `#333333`, margin-bottom 20; 7 words
   - logo row: flex, wrap, gap 32, padding-left 32. **4 logos, 24px tall**, auto width, CSS `contrast(.3)`.
4. Support line: 16/26, `#333333`, 9 words, with an inline link (`#0768F8`, underline).

**Right column** (`col-span-5`, 542.7 wide)
- `position:sticky; top:24px`, padding 24.
- **Card:** bg `#FFF`, radius 16, `box-shadow: 0 30px 50px rgba(26,29,38,.1)`, padding 32. Size 494.7×783.
- h2 "Contact our sales team" (≤4 words): Haas 20/28.57, weight 600, `#333333`, margin-bottom 16.

**Form rows** (card content width 430.7). Gaps: 8 between fields in a row, ~8 between rows.

| Row | Fields | Field box |
|---|---|---|
| 1 | First Name, Last Name | 2 × 211×56 |
| 2 | Work Email | 431×54 |
| 3 | Phone Number: flag+caret country button 30 wide, then "+1" input | 431×65; label 12/14.4 |
| 4 | Company Name, Job Title | 2 × 211×56 |
| 5 | Country (select, chevron at right) | 431×57; control padding `27px 12px 6px` |
| 6 | "How can our team help?" (select) | 431×57 |
| 7 | "How are you looking to use Airtable?" (textarea) | 431×96; **bg `#F8FAFC`** |

**Field style**
- `border:1px solid rgba(0,14,38,.23)`, radius 8, bg `#FFF`.
- **Label inset** inside the box (top-left, about 13px from the left, about 8px from the top):
  - required asterisk: 12/18, weight 500, `#C2214C`
  - label text: Haas 12/18, weight 400, `#333840`
- Input text: Haas 16/21.6, `#181D26`, sits below the label. The input element itself is borderless.
- Labels don't float or animate (static positioning).

**Below the fields**
- Consent paragraph: Haas 14/18.9, `#757575`, about 32 words, 4 lines, with a link (`#3366FF`, underline).
- Submit: full width 431×56, homepage primary BkButton (`#181D26`, radius 12, 16/21.6 weight 500, letter-spacing 0.08px). Label: "Submit".

**Non-functional**
- Render `<form onSubmit={e => e.preventDefault()}>`.
- No Marketo, no network.

**Loading skeleton** (optional; the original shows it until Marketo loads)
- 6 rows, each a `#E5E7EB` label bar (33% × 12, radius 4) above a field bar (100% × 40, radius 16), gap 20.
- Tailwind `animate-pulse`: opacity 1 → .5 → 1, 2s, `cubic-bezier(.4,0,.6,1)`, infinite.

**Mobile 390**
- Single column: left content first (h1 32/40, 822 tall), then the form card.
- Outer column padding 24 (no sticky); card padding 24, 294 wide content. Two-up rows stay two-up.

---

## 4. SEASON section types (ATSeasonSans pages)

All of these use `SeasonShell` (§2.2) and `SeasonTitle`.

### S-1 `SeasonHero`
**Used on:** marketing, product, operations, about.

**Layout**
- Root: bg white, `border-bottom:1px solid #E0DCDB`, `overflow:hidden`.
- Shell: flex column, items centered.
- **Copy:** `SeasonTitle` centered, padding 40, height 374 with one row of actions.
  - badge (2–4 words)
  - h1 48/55.2 (4–9 words, 1–2 lines)
  - subhead (20–48 words, 2–3 lines)
  - actions: primary + secondary SeasonButton (about: secondary = 2-word label)
- **Media band** (`media` prop; about has none):
  - `border-top:1px solid #E0DCDB`, padding `0 224px` → frame 894 wide with side borders `#E0DCDB`, `overflow:hidden`
  - media 892×501.8 (**16:9**), autoplay muted loop video (`object-fit:cover`) → use a placeholder block
  - IconButton `dark` pause at bottom-right, 16px inset

**Heights:** 877.8 with media; 341.5 without (about, subhead 3 lines).

**Motion (load, CSS keyframes)**
- Copy `heroFade`: opacity 0 → 1, **0.5s ease-out, delay 270ms**, fill both.
- Media `heroRise`: opacity 0 → 1 and `translateY(200px → 0)` (12.5rem), **1.15s ease-out, delay 1220ms**, fill both.

**Mobile:**
- Copy height 443; h1 32/36.8, 3 lines; subhead 12/16.2.
- Buttons full width (310) and stacked.
- Media band full width 390×220.4, no padding.

### S-2 `SeasonLogoCells`
**Used on:** marketing, product, operations, about.

**Layout**
- Shell column.
- Heading frame: padding 40, `border-bottom:1px solid #E0DCDB`. p: 16/21.6, weight 500, letter-spacing 0.16px, `#040E20B0`, centered, max-width 884; 2 words.
- `ul`: flex row of **6 cells**, each 222.8×88, `border-left:1px solid #E0DCDB` from the 2nd cell on.
- Each cell is a clipped box. The logo slot is absolute, flex-centered, padding 24; logo image 122.4×40 (`max-width:70%`, contain) → placeholder logo blocks.

**Height:** 191.6 (102.6 heading + 88 row).

**Motion**
- **Desktop: static.** One slot per cell; no animation over 10s of sampling.
- **Mobile 390:** only **2 cells** (194.5 / 195.5 × 88), and they **cycle** through the 6 logos.
  - Outgoing slot: `translateY(0 → -100%)`. Incoming slot: `translateY(100% → 0)`.
  - **800ms `ease`** (CSS transition on transform).
  - The interval between swaps was *not measured* at 390. The enterprise variant swaps one cell roughly every 0.7–1.5s (sampled at 700ms resolution).
- Mobile height 154.2.

**Merge note:** this is the same idea as **E-2 LogoBarCycle**. Build one `LogoCells` component with props `{cells, cellH, cycleOnDesktop, borderColor, heading}`.

### S-3 `SeasonCardGrid` (features `data-type="cards"`)
**Used on:** marketing, product, operations (3 media cards); about ×2 (stat cards, logo/icon cards).

**Layout**
- Title band: `SeasonTitle` centered, padding `64px 40px 40px`. Badge optional; h2 32/40, 1 line; subhead optional, 2 lines.
- Band height 248.1 with badge + subhead; 144 with only a headline.
- `ul` grid: `repeat(3, 1fr)` (447.33 each), `border-top:1px solid #E0DCDB`. Cells are separated by a 1px right border (`#E0DCDB`).

**Cell**
- bg **`#F8F6F6`**, flex column.
- `cardCopy` (padding 32, gap 24):
  - optional icon: 48×48, contain (about "problems" variant)
  - `cardText` (gap 8):
    - title: 18/24.3, weight **600**, letter-spacing 0.18px, `#181D26`; 2–4 words, 1 line (stat variant: a short figure like "50M+")
    - body: 14/18.9, weight 500, letter-spacing 0.28px, `#040E20B0`; 13–20 words, 2–3 lines (stat variant: 2–4 words, 1 line)
- Optional `cardMedia`: aspect **448/300** (446×299), image cover, flush at the cell bottom.

**Heights**

| Variant | Section height |
|---|---|
| media cards with badge + subhead | 702.6 |
| stat cards, headline only | 261.2 |
| icon cards, headline only | 352.1 |

**Mobile:**
- Grid becomes 1 column, inset 16 (358 wide with side borders `#E0DCDB`); cells stack with bottom borders.
- Title 16/21.6; copy padding 32.
- Section heights 1395 / 438 / 730.

**Motion:** none.

### S-4 `SeasonTabber` (features `data-type="tabbers"`)
**Used on:** marketing (×2), product (×2), operations (×2), about (×1).

**Title band:** as S-3. Height 248.1 with badge + subhead; 144 with headline only.

**Tab list** (`role=tablist`)
- Flex row, `border-top/bottom:1px solid #E0DCDB`. Triggers are `flex:1 1 0`, flex-centered, gap 8.

| Variant | Trigger padding | Content | List height |
|---|---|---|---|
| `labels` | `40px 48px` | label 20/26, weight 600, letter-spacing 0.1px, centered | 108 when labels fit 1 line; 134 when they wrap to 2 (product, 5 tabs) |
| `logos` | `24px 12px` | a logo image 109.8×34 (max-width 124) | 84 |

- Tab counts: marketing 4; product 5; operations 3; about 5; `logos` variant 3.
- **Tab states**
  - Rest: bg transparent, color `#040E20B0`.
  - **Hover:** bg `#F8F6F6`, color `#181D26`.
  - **Active** (`aria-selected=true`): bg **`#E1E4EADB`**, color `#181D26`.
  - `transition: background-color, border-color, color, box-shadow, opacity .15s cubic-bezier(.4,0,.2,1)`.

**Panel** (flex row, height 537.9)
- **Copy column** (448 wide, padding 40, gap 32):
  - `labels` variant body:
    - subhead p: 16/21.6, weight 600, letter-spacing 0.16px, `#181D26`; 3–6 words
    - then 3 items (gap 24), each a column with gap 8:
      - `strong`: 14/18.9, weight 600, letter-spacing 0.28px, `#181D26`; 2–5 words
      - p: 14/18.9, weight 500, `#040E20B0`; 8–19 words, 2–3 lines
    - about variant: a single item (address-like, 4–5 words)
  - `logos` variant body:
    - quote p: 16/21.6, weight 600; 21–29 words, 3–4 lines
    - attribution: 14/18.9, weight 500, `#040E20B0`; 8–12 words, 1–2 lines
  - CTA: primary SeasonButton (2–3 word label)
- **Media column** (894 wide, padding 40, `overflow:hidden`):
  - frame 814×457.9, **16:9, radius 2**, `overflow:hidden`
  - autoplay muted loop video (`object-fit:contain`) or image → placeholder
  - IconButton `dark` pause, 16px inset

**Panel switching**
- Click a tab → only the trigger colors transition. **The panel swaps instantly, with no animation.**
- The first tab is active by default.

**Section heights:** 895 (labels, 1-line list); 921 (product, 2-line list); 766.9 (`logos` with headline-only title).

**Mobile 390 — becomes an accordion** (`role=tablist` column)
- Each item: trigger full width, padding `32px 40px`, 18/23.4, weight 600, letter-spacing 0.09px, centered. Active bg `#E1E4EADB`. Item `border-bottom:1px solid #E0DCDB`.
- Pane: `height` transition **.4s cubic-bezier(.76,0,.24,1)**, `overflow:hidden`.
- Pane copy: padding `32px 40px`, gap 32.
  - body subhead 18/22.5
  - `strong` and p at **12/16.2**, letter-spacing 0.24px (p margin-bottom 20)
  - CTA full width
- Then media full width (390×295.6).
- One item open at a time (first open).

### S-5 `SeasonMediaSplit` (features `data-type` mediaBody)
**Used on:** about ("Our purpose").

**Layout**
- Shell → `mediaBody`: flex `row-reverse`, two halves of 671.
- **Text half:** `SeasonTitle` aligned left, `justify-content:center`, padding 40.
  - badge (2 words)
  - h2 32/40 (10 words, 2 lines)
  - subhead rendered as a `div > p`: 16/21.6, 50 words, 4 lines
- **Media half:** padding 40, flex-centered. Image 591×738.8 (**4:5**, natural 1280×1600), `object-fit:contain`, **radius 4**.

**Height:** 867.8.

**Mobile:** column with text first (padding 40, h2 20/25); media below, frame 390×515.5 with padding 40.

**Motion:** none.

### S-6 `SeasonCarousel` (dark templates carousel)
**Used on:** marketing, product. Not on operations.

**Layout**
- Root bg **`#181D26`**, `border-bottom:1px solid #90959D38`, `overflow:hidden`.
- Shell side borders `#90959D38`.
- **Header:** `SeasonTitle` centered (padding 40, height 202.5).
  - inverse badge (4 words)
  - h2 white (7 words, 1 line)
  - subhead `#E1E4EADB` (9–14 words, 1 line)
- **Viewport:** 1342×637, `border-top:1px solid #90959D38`. Grid with every slide in `grid-area:1/1`.
- **Slide:** media fill (image cover, natural 1280×760; `border-bottom` keyline) → placeholder.
- **Overlay** (absolute, left/bottom 24, max-width 446, flex column, gap 16):
  - title: 18/24.3, weight 500, letter-spacing 0.18px, white; 4–5 words
  - TextLink inverse "Explore" (1 word)
- **Footer:** 128 tall, flex `justify-content:flex-end`, align center, gap 32, padding `0 40px`.
  - **Progress:** `role=tablist`, flex, gap 16, 1142 wide. **5 bars**, each `flex:1`, 2px tall.
    - Inactive `#FFFFFF`; active **`#FFB0FA`**.
    - Each has an invisible `::after` hit area extending 16px up and down.
  - **Arrows:** 2 IconButtons `darkSecondary` (gap 8).

**Height:** 969.5.

**Motion**
- Slides crossfade: `opacity` and `visibility` **.4s** (default ease). Inactive slides: opacity 0, visibility hidden.
- Changes on arrow or progress-bar click.
- **No autoplay** (active index unchanged over 12s while in view).

**Mobile:**
- Shell inset 16 (358 wide).
- Viewport 356×211; footer 96 tall; progress bars 18.4 wide each.

### S-7 `SeasonIntegrations` (logo marquee split)
**Used on:** marketing, product, operations; about ("awards" badges instead of app logos).

**Layout**
- Shell flex row, `overflow:hidden`. Height 564.
- **Copy** (779 wide, padding `64px 0`, `justify-content:center`): `SeasonTitle` aligned left, padding 40.
  - h2: 2–6 words, 1 line
  - subhead: 21–28 words, 2 lines
  - action: SeasonButton secondary with arrow icon (3 words)
  - about variant: headline only, no button
- **Marquee** (563 wide, `border-left:1px solid #E0DCDB`): **3 vertical strips**, each 187.7 wide, `overflow:hidden`.
  - Each strip has a track (flex column) of **8 square cells**, 186.7×186.7, bg white, `border-top:1px solid #E0DCDB`.
  - Each cell holds a centered logo 80×80 (contain, max-width 70%) → placeholder.
  - IconButton `dark` pause at bottom-right, 16px inset.

**Motion: JS-driven** (no CSS animation; the transform is written every frame)
- Strips 1 and 3 move **up**; strip 2 moves **down**. Seamless loop.
- Measured speed **≈ 28 px/s** (*sampled*: −113.7px over about 4.0s at 1s intervals). Linear.
- The pause button stops all strips.

**Mobile 390:**
- Copy on top (padding 40, h2 20/25).
- Marquee becomes **one horizontal strip**, 128 tall, `border-top` keyline: track 3072 wide (24 cells of 128×128), moving horizontally.
- Section height 419.3 (about: 298.6).

**Merge note:** same concept as **E-7**. Build one `IntegrationsMarquee` with props `{strips, cellSize, logoSize, copyWidth, speedPxPerSec, mode:"js"|"css"}`.

### S-8 `SeasonReadNext` (dark article cards in a white section)
**Used on:** marketing, product, operations.

**Layout**
- Shell column.
- Heading band: padding-top 24; `SeasonTitle` aligned left, padding 40, **max-width 713**; h2 only (5 words). Band height 144.
- `ul` row: flex, `border-top/bottom:1px solid #90959D38`, `overflow:hidden`. **3 cards**, about 447.7 wide each.

**Card** (`li`, bg **`#181D26`**) → full `<a>`, flex column
- `copy`: padding 40, gap 16, bg `#181D26`, `border-bottom:1px solid #90959D38`.
  - title p: 18/24.3, weight 500, `#FFFFFF`; 6–14 words, 1–2 lines
- `art`: aspect **448/271** (446.7×270.2), bg `#181D26`, image cover → placeholder.
- **Hover:** title `text-decoration:underline; text-underline-offset:3px`.
- Card height 399.8.

**Height:** 546.8.

**Mobile:** cards stack, inset 16 with side borders; copy padding `24px 16px`; cards 356×313.9; section height 1071.8.

**Motion:** none.

### S-9 `SeasonCtaBanner`
**Used on:** marketing, product, operations, about.

**Layout**
- Root bg `#F8F6F6`, `border-bottom:1px solid #E0DCDB`, `overflow:hidden`.
- **Background layer:** absolute fill, bg **`#012978`**, holding a full-size **Lottie SVG animation**.
  - viewBox 1440×596, about 347 nodes; colors black, white, `#012978`, `#AC59FF`.
  - Its frames weren't decoded. **Build a static `#012978` field with a subtle placeholder pattern.**
- **Band:** flex column, centered, padding `128px 48px`.
- **Card:** bg white, max-width 1120 (1120 wide).
  - `SeasonTitle` with padding 40; the text block is aligned flex-start (left).
  - h2 at **hero size 48/55.2**: 4–11 words, 1–2 lines
  - actions: primary (3 words) + secondary (2 words), gap 16
- IconButton `dark` pause at the section's bottom-right (16px inset) — it pauses the Lottie.

**Heights:** 527 (2-line headline) or 471.8 (1 line). The card is 270 / 214.8 tall.

**Mobile:**
- Band padding `64px 16px`; card 358 wide.
- h2 32/36.8, **centered**; buttons full width (278).
- Height 462.6 (about: 435.8).

**Merge note:** pairs with **E-9 CtaBannerStatic**. Build one `CtaBanner` with `{bg: color|pattern, headlineSize, cardMaxWidth, pauseButton}`.

### S-10 `SeasonFaq`
**Used on:** marketing (7 items), product, operations.

**Layout**
- Shell flex row, `justify-content:space-between`.
- **Heading column:** 447 wide, padding 40. h2: 32/40, weight 500, 3 words, 2 lines.
- **List:** 895 wide, `border-left:1px solid #E0DCDB`, padding `40px 40px 0`, flex column, gap 24.

**Item** (`border-bottom:1px solid #E0DCDB`, padding-bottom 24)
- `h3 > button` trigger: flex, space-between, align center, gap 24, full width, 32 tall.
  - question: 16/21.6, weight 600, letter-spacing 0.16px, `#181D26`; 7–14 words, 1 line
  - chevron svg 32×32, color `#9297A0`, `rotate:180deg` when open, **.4s cubic-bezier(0,0,.2,1)**
- **Answer region:** `display:grid; grid-template-rows:0fr → 1fr`, **.4s cubic-bezier(.76,0,.24,1)**, `overflow:hidden`.
  - inner padding `16px 48px 0 0`
  - paragraphs: 14/18.9, weight 500, letter-spacing 0.28px, `#040E20B0`, `p+p` margin-top 16; each answer is 1–3 paragraphs of 20–58 words
- **First item open by default.** Items toggle independently: opening item 2 left item 1 open (2 open).

**Height:** 709.5 (marketing, with item 1 open).

**Mobile:**
- Shell column, padding `40px 24px`, gap 24.
- h2 20/25; list gap 20; questions wrap.
- Height 848.9.

**Merge note:** E-10 is the PLATFORM-E skin of the same accordion. Build one `Faq` with `skin:"season"|"platform"`.

---

## 5. PLATFORM-E section types (`/solutions/enterprise`)

**Shared with `/platform`.** E-1, E-2, E-7, E-8 and E-10 (and probably E-9) render the same CSS modules on `/platform`:
- `Hero-module…gOrYkG`, `LogoBar…-w7kMW`, `Integrations…ZKDCjG`, `CustomerStories…xoaFjW`, `FaqSection…mZd-eW`
- I verified this from the other recon agent's raw `/platform` extraction.
- `specs/SECTION_TYPES_platform.md` did **not exist** when this file was written. If it exists now, **use its definitions for those types** and treat the measurements below as the enterprise data instance.
- E-3, E-4, E-5 and E-6 were found only on enterprise.

**Colors:** ink `#161616`; shell side borders **`#333333`**; inner keylines `#E0DCDB`. All headlines use weight **550**; buttons and labels use **650**.

**PLATFORM-E button**
- Radius 4, padding `12px 24px`, 16/21.6, weight 650, height 47.6.
- Primary: bg and border `#161616`, white text. Hover: bg and border `#404040`.
- Secondary: bg `#FFF`, border `#161616`, text `#161616`. Hover: bg `#F5F5F5`.
- `transition: background-color, color, border-color .15s ease`.
- Focus: `outline 2px solid #161616`, offset 2.

### E-1 `PlatformHero` (variant `copyAboveVideo`) — shared
**Layout**
- Shell: max-width 1344, side borders `#333333`.
- **Copy:** padding `64px 40px` (bottom 64), flex column, centered, gap 24, max-width 1264.
  - eyebrow p: 14/18.9, weight 650, `#161616`; 3 words
  - h1: **79.2/87.12, weight 550**, `#161616`. CSS: `font-size:clamp(2.5rem,5.5vw,5rem)`, line-height 1.1. Two explicit block lines (5 + 4 words).
  - subheading: **Haas** 16/21.6, weight 400, letter-spacing 0.16px, `#040E20B0`, max-width 616; 20 words, 2 lines
  - CTAs (gap 16): primary 184.3 wide + secondary 136.6 wide
- **Media band:** `border-top:1px solid #E0DCDB`; band shell 1344 with side borders; video box 1342×754.9 (16:9) → placeholder.

**Height:** 1239.8.

**Motion:** this variant has **no load animation** (`.copyAboveVideo { animation:none; opacity:1 }`).
- The module's other variants use `platformHeroFade` .5s ease-out .27s and `platformHeroRise` translateY(12.5rem) 1.15s ease-out 1.22s.
- A background pattern fades in over 2.6s (opacity 0 until 10%, then 0→1 by 30%) at opacity .05. It is not present on enterprise.

**Mobile:**
- Copy padding `40px 16px` (bottom 40).
- h1 **48/55.2**, 4 lines.
- Height 786.9.

### E-2 `LogoBarCycle` — shared
**Layout**
- Root `border-top/bottom:1px solid #E0DCDB`; shell side borders `#333333`.
- Heading frame: `border-bottom:1px solid #333333`. Centered cell, max-width 654, padding 40, side borders `#333333`.
  - p: 18/24.3, weight 550, `#161616B3`; 7 words, 1 line
- Logos row: **5 cells** of 268.4×73, `border-left:1px solid #333333`. Logos at natural size (16–34px tall, 52–142px wide), centered.

**Height:** 180.3.

**Motion**
- Each cell holds 2 stacked slots and swaps logos: outgoing `translateY(0 → -100%)`, incoming `translateY(100% → 0)`, **800ms `ease`**.
- Swaps hit one or two cells at a time, roughly every 0.7–1.5s (*sampled* at 700ms resolution over 8.4s).
- Logos cycle through a larger pool (≥9 distinct logos seen).

### E-3 `UseCaseCards` — enterprise only
**Layout**
- Shell: flex column, gap 40, padding-top 80, side borders `#333333`.
- **Heading band:** flex, wrap, space-between, align center, padding `0 40px`.
  - h2: 48/55.2, weight 550, `#181D26`, max-width 884; 5 words
  - CTA: PLATFORM-E primary, 131.8 wide, 2 words
- **Grid:** `repeat(4, 335.5px)`, no gap. Each `li` has `border-top/bottom:1px solid #E0DCDB` and a left border from the 2nd card on.

**Card** (`<a>`, bg white, padding-top 24, flex column, space-between; height 351)
- Body (padding `0 24px`, gap 16):
  - **accent square** 12×12, colors in order `#6F9FFF`, `#FFA244`, `#ACEA48`, `#FFD755`
  - copy (gap 8):
    - title: 24/31.2, weight 550, `#181D26`; 1–3 words over 2 lines (explicit line split)
    - body: 16/21.6, weight 550, `#040E20B0`; 14–18 words, 2–4 lines
  - "Learn more" (2 words): 12/16.2, weight 650, `#161616`, padding `8px 0`, gap 8 to an arrow, `margin-top:auto`
- **Proof row:** 64 tall, `border-top:1px solid #E0DCDB`, padding `0 24px`, gap 16.
  - logo slot about 42–66 × 20–32 (placeholder)
  - metric: 14/18.9, weight 550, `#040E20B0`; 5–7 words
- **Hover:** card bg `#F8F6F6`, `.15s ease`.

**Height:** 525.2.

**Mobile:**
- Grid 1 column, padding `0 16px` (cards 358×363).
- Heading 32/36.8; "Learn more" 14px; card link `justify-content:flex-start` with gap 40.
- Height 1670.

### E-4 `AiFoundationBento` — enterprise only
**Layout**
- Heading band: padding `80px 40px 40px`. h2: 48/55.2, weight 550, `#161616`, max-width 713, 2 explicit lines.
- **Grid:** `repeat(3, 447.33px)`, `border-top:1px solid #E0DCDB`.

**Cell**
- bg `#F8F6F6`, `border-right` and `border-bottom` 1px `#333333`.
- Copy (padding `40px 40px 24px`, gap 8):
  - title: 24/31.2, weight 550, `#161616`; 3 words
  - body: 16/21.6, weight 550, `#161616`; 17–20 words, 2–3 lines
- Visual: aspect **448/315**, bg `#F8F6F6`, image cover → placeholder.
- **Cell 3 variant `visualStack`:** two overlapping layer images.
  - layer A: 244.6×220.7, at left 0, top +30
  - layer B: 244.6×214.7, at right 0, bottom 0
  - each `object-fit:contain`

**Height:** 714.2.

**Motion:** images play `aiFoundationRise`:
- opacity 0 → 1 and `translateY(32px → 0)`
- **0.7s ease-out**, delays **120 / 470 / 820 / 1170ms** (350ms stagger)
- It was already running at page load, before any scroll (present in `document.getAnimations()`), so it's load-triggered, not viewport-triggered.

**Mobile:**
- 1 column inset 16 (358×419); copy padding `40px 16px 24px`.
- h2 32/36.8.
- Height 1412.

### E-5 `OrgAccordion` — enterprise only
**Layout**
- Root `border-bottom:1px solid #333333`. Shell flex row with side borders `#333333`.
- **Heading pane:** 448 wide, padding `128px 40px`. h2: 48/55.2, weight 550, `#161616`, max-width 368; 3 explicit lines (8 words).
- **Tablist:** 894 wide, padding `128px 0`, flex column.
  - Each item: `border-top/bottom:1px solid #E0DCDB`, margin-bottom −1.

**Items**
- **Active item** (bg white, 245 tall)
  - tab: padding `40px 40px 0 48px`, gap 8
  - **marker** 12×12 `#161616`
  - title: 32/40, weight 550, `#161616`; 2–3 words
  - panel: `expandGrid` (`grid-template-rows` **.4s ease-in-out**) → inner (`opacity` **.35s ease-in-out**) → checklist `ul`
    - checklist: padding `24px 40px 40px 48px`, gap 12
    - each row: a 24×24 icon box (17×12 check svg, `assets/solutions/e61b94…-17x12.svg`), gap 8, text 16/21.6, weight 550, `#161616`; 8–12 words, 1 line
- **Inactive item** (bg `#F8F6F6`, 122 tall)
  - tab padding 40, no marker
  - title `#161616B3`
  - **hover/focus:** title `#161616` (`color .2s ease`)

**Behavior**
- Click switches; exactly one item is open (3 items).
- **No autoplay** (10s sampled).

**Height:** 743.

**Mobile:**
- Column layout.
- Heading pane padding `40px 16px`, `border-bottom:1px solid #333333`; h2 32/36.8.
- Height 631.

### E-6 `HacSplit` (dark copy + visual) — enterprise only
**Layout**
- Root bg **`#161616`**. Shell flex row.
- **Copy:** 688 wide, `border-left:1px solid #333333`, padding `128px 40px`, flex column, `justify-content:center`, gap 32.
  - stack (gap 16):
    - h2: 48/55.2, weight 550, `#FFF`; 13 words, 3 lines
    - checks (gap 12): 2 rows of a 24×24 check icon (`assets/solutions/e62ca0…-24x24.svg`), gap 8, text 16/21.6, weight 550, `#FFF`; 14–19 words, 1–2 lines
  - CTA: white button (bg `#FFF`, radius 4, padding `12px 24px`, 16/21.6 weight 650, `#161616`) + 16px arrow (`assets/solutions/3b291a…-16x16.svg`), 190.8×45.6. Hover: bg `#F0F0F0` (`.15s ease`).
- **Visual:** 656×595, bg **`#57003E`**, `overflow:hidden`.
  - image `width:min(400px,70%)`, aspect 400/518
  - absolute: `top:80px; left:50%; transform:translateX(-50%)`
  - `box-shadow:0 8px 32px rgba(0,0,0,.25)`
  - static, not scroll-linked (verified at 5 scroll offsets)

**Height:** 595.

**Mobile:**
- Column layout.
- Copy padding `40px 16px`; h2 32/36.8.
- Visual 390×475; image `width:82.28%; top:59px; left:8.86%`, no transform.
- Height 849.

### E-7 `PlatformIntegrations` — shared
**Layout**
- Shell row, space-between, side + bottom borders `#333333`. Height 564.
- **Copy** (max-width 688, padding `128px 40px`, gap 32):
  - h2: 48/55.2, weight 550, 2 explicit lines (7 words)
  - description: 18/24.3, weight 550, `#161616B3`; 24 words, 3 lines
  - CTA outline: border `#161616`, radius 4, padding `12px 24px`, 650 weight, + 16px arrow (`assets/solutions/87cfab…-12x10.svg`)
    - hover: bg `#161616`, text white, arrow `filter:brightness(0) invert()`
- **Marquee:** 400 wide, `border-left:1px solid #333333`. **4 strips** of 100 wide.
  - Each track holds 12 cells of 100×100 (bg white, `border-top:1px solid #E0DCDB`, logo 56×56 contain) — the list is doubled, so the track is 1200 tall.

**Motion (CSS)**
- Strips 1 and 3: `integrationsScrollUp` (`translateY(0 → -50%)`).
- Strips 2 and 4: `integrationsScrollDown` (`-50% → 0`).
- Both **28s linear infinite** (600px per 28s ≈ 21.4 px/s).

### E-8 `CustomerStoriesCarousel` — shared
**Layout**
- Root bg `#161616`, `overflow:hidden`. Shell side borders `#333333`; top padding 128.
- **Viewport:** 1342×570, `border-top/bottom:1px solid rgba(255,255,255,.23)`. Slides stacked in one grid cell.
- **Slide** (flex row, bg white)
  - **copy** (915 wide, padding `40px 64px 40px 40px`, column, space-between, gap 32):
    - logo box: max-width 168, 48 tall
    - text (gap 32):
      - quote: 32/40, weight 550, `#161616`, padding-left 14.4 (hanging quote mark); 36 words, 4 lines
      - byline (gap 4): name 14/18.9 weight 650; role 14/18.9 weight 550, 5 words
      - CTA: dark (bg `#161616`, radius 4, padding `12px 24px`, white, weight 650, 220 wide). Hover (≥900): bg `#2A2A2A`.
  - **visual:** 427×570, bg `#0A0A0A`, image cover → placeholder.
- **Footer:** 128 tall, padding `0 40px`, space-between, gap 32.
  - Progress: 4 bars, `flex:1`, 2px, `rgba(255,255,255,.35)`. The active bar holds a fill span `#E8F36F` scaled with `scaleX`.
  - Arrows: 2 × 40×40 circles, `border:1px solid rgba(255,255,255,.23)`. Hover: bg `rgba(255,255,255,.08)`, border `rgba(255,255,255,.5)` (`.15s ease`).

**Height:** 828.

**Motion**
- Slides crossfade `opacity, visibility` **.9s ease**.
- The fill measured scaleX .596 at one moment but **didn't advance over 8s in view**, so autoplay timing is *not measured*.

### E-9 `CtaBannerStatic` — likely shared
**Layout**
- Root 596 tall, `overflow:hidden`.
- **Background:** bg **`#004801`**, plus a full-cover pattern PNG (natural 5760×2384) → placeholder pattern.
- **Content:** flex-centered, padding `40px 20px`.
- **Card:** white, 874 wide, padding 40, flex column, gap 40.
  - h2: **64/70.4, weight 550**, `#000`, max-width 794; 2 explicit lines of 4 words
  - CTAs (gap 16): primary 184.3 + secondary 136.6. Hover: primary bg `#2A2A2A`; secondary bg `#F5F5F5`.

### E-10 `FaqSection` (platform skin) — shared
**Layout**
- Shell: flex row, space-between, padding `96px 0`, no side borders.
- h2: 32/40, weight 550, `#181D26`, max-width 311, 2 lines.
- List: max-width 885, gap 24.

**Item** (`border-bottom:1px solid #333333`, padding-bottom 24, gap 16)
- Trigger: flex, space-between, `align-items:flex-start`, gap 24.
  - question: 16/21.6, weight 650, `#181D26`; 10–12 words, 1 line
  - chevron: 24×24 image (`assets/solutions/b43a95…-24x25.svg`, fill `#9297A0`). Open = `transform: scale(-1,-1)` (rotated 180°), **.2s ease**.
- Answer: padding-right 48. p: 14/18.9, weight 550, `#161616B3`; 43 words, 3 lines.

**Behavior:** 3 items; the first is open.

**Height:** 459.7.

---

## 6. TPL — `/templates` (one page-level type)

### T-1 `TemplatesGallery`
A separate Tailwind-v4 app, but it uses the same Header and Footer (Haas). All text is "Haas Groot Disp".

**Tailwind-v4 colors** (computed in `lab()`; nearest hex)
- gray-900 `lab(8.12 0.81 -12.25)` ≈ `#101828` (titles)
- gray-500 `lab(47.78 -0.39 -10.03)` ≈ `#6A7282` (body, "View all")
- gray-400 `#9CA3AF` (group headings)
- gray-100 `lab(96.16 -0.08 -1.14)` ≈ `#F3F4F6` (tile hover)

**Page container**
- `max-width:1152px` (6xl), centered (x 144 at 1440), padding `0 16px 40px` → content x 160, 1120 wide.

**Header** (padding `40px 0 32px`, gap 4)
- h1: **64/80, weight 700**, gray-900, margin-bottom 8; 1 word.
- p: 20/30, gray-500, max-width 576, margin-bottom 20; 6 words, 1 line.

**Body:** flex row, gap 40, margin-top 40.

**Aside** (224 wide, `position:sticky; top:136.98px`)
- **Search:** `form role=search`, max-width 448.
  - input 224×36, radius 9999, padding `6px 12px 6px 32px`, 14px text
  - `box-shadow: 0 0 0 1px rgba(0,0,0,.13), 0 1px 2px rgba(0,0,0,.13)`; focus: `0 0 0 2px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.13)`
  - magnifier icon 14×14 at left 10
  - placeholder "Search templates"
  - Typing/Enter produced no visible client-side change → build it **non-functional**.
- **Nav groups** (gap 32). Each group is a column, gap 12:
  - header button (`aria-expanded`, full width, space-between, chevron; collapsible): h3 14.8/19.24, weight 700, gray-400
  - `ul` (gap 6) of links: 14.8/22.2, weight 600, gray-900; hover underline; 1–3 words each
  - Group sizes: 9, 6, 4 links.
- **Footer block:** margin-top 32, `border-top:1px solid` gray-200, padding-top 24, gap 4.
  - pill link (border 1px `#111827`, radius 9999, padding `8px 16px`, 13.2/19.8 weight 500, bg white; 2 words + "→")
  - caption: 13.2/19.8, gray-400; 3 words

**Main** (856 wide), in order:
1. **Category tiles** (padding-bottom 32)
   - Grid `repeat(5, 161.6px)`, gap 12. **5 tiles.**
   - Tile: flex column, centered, gap 12, bg **`#F5F5F5`**, **radius 32**, padding `24px 16px`, height 137.
   - Icon 40×40 (decorative gradient svg; use a placeholder).
   - Label: 14.8/18.5, weight 700, gray-900, centered; 1–2 lines.
   - Hover: bg gray-100, `transition: color, background-color, border-color .15s cubic-bezier(.4,0,.2,1)`.
2. **"Featured templates"** (padding-bottom 24)
   - h2: 32/40, weight 600, gray-900, margin-bottom 16.
   - Grid `repeat(2, 420px)`, gap 16. **4 cards** of 420×215.
   - Card: **radius 32**, `overflow:hidden`, flex row, bg `linear-gradient(to right bottom, A, B)`.
     - Gradient pairs in order: `#FAF5FF→#EDE9FE`, `#FFF1F2→#FEE2E2`, `#ECFEFF→#CCFBF1`, `#EFF6FF→#DBEAFE`.
     - Left half (210): padding `0 12px 0 24px`, centered vertically. Title 20/27.5, weight 600, gray-900, `line-clamp:3`; 3–4 words.
     - Right half (210): margin-top 16, `border-top-left-radius:32px`, `overflow:hidden` → image 210×199 cover (placeholder).
     - Hover: card shadow-md; image `scale(1.05)` over `.3s cubic-bezier(.4,0,.2,1)`.
3. **20 category sections** (`section` padding `24px 0`)
   - Header row: flex, space-between, align center, gap 16, margin-bottom 16.
     - h2: 32/40, weight 600; 2–5 words
     - "View all" link (2 words): 20/28.57, weight 600, gray-500. Hover: gray-900 + underline.
   - Grid `repeat(3, 274.66px)`, gap 16. **6 cards** per section.

**Template card** (bg white, radius 32, `overflow:hidden`, flex column; 371.4 tall, or 349.2 when the title fits 1 line)
- Image panel (padding `20px 20px 0`, radius 16, pastel gradient bg, as on the featured cards)
  - inner frame: **4:3** (234.7×176), radius `6px 6px 0 0`, deeper gradient bg (e.g. `#22D3EE→#0E7490`, `#C084FC→#9333EA`)
  - image cover, `object-position:left top`, radius `4px 4px 0 0`
  - **optional "AI" badge:** absolute bottom 8 / right 8, 62×36, radius 9999, bg `linear-gradient(81deg,#FF00A8 0%,#7C37EF 100%)`, padding `6px 12px`, gap 4, 16px white sparkle icon + "AI" 18/24 weight 600 white
- Text (padding `12px 16px 16px`, gap 6):
  - title: 14.8/22.2, weight 600, gray-900, clamped to 2 lines; 3–5 words
  - description: 14.8/20.35, gray-500, `line-clamp:3`, margin-bottom 20; 40–46 words
- Footer row: padding `0 16px 16px`, empty.
- **Hover:** title underline. No image zoom on these cards.

**Totals:** page height 18,709 at 1440; 116 template cards.

**Mobile 390**
- Container padding 16.
- Header 244 tall (h1 stays 64/80).
- The aside becomes a `lg:hidden` row: search 183 wide + a sibling control (*not measured*).
- Tiles: `repeat(2, 173px)`, gap 12, 115 tall.
- Featured: 1 column 358×215.
- Card sections: 1 column, cards 358×411.7.
- Page height 55,820.

**Motion:** only the hover transitions above. No load or scroll animation.

---

## 7. Motion summary (all types)

| Type | Trigger | Animation | Timing |
|---|---|---|---|
| BreadcrumbBar | scroll | opacity 1→0, visibility, translateY(0→-12px) while scrolling | .25s ease-in |
| S-1 SeasonHero | load | copy opacity 0→1 | .5s ease-out, delay 270ms |
| S-1 SeasonHero | load | media opacity 0→1 + translateY(200px→0) | 1.15s ease-out, delay 1220ms |
| S-2 / E-2 logo cells | timer (S-2 mobile only; E-2 always) | slot translateY 0→-100% out / 100%→0 in | 800ms ease; interval about 0.7–1.5s *sampled* |
| S-4 SeasonTabber | click | trigger bg/color | .15s cubic-bezier(.4,0,.2,1); panel swap instant |
| S-4 mobile accordion | click | pane height | .4s cubic-bezier(.76,0,.24,1) |
| S-6 SeasonCarousel | click | slide opacity/visibility crossfade | .4s ease; no autoplay |
| S-7 SeasonIntegrations | continuous (JS) | strips translateY, alternating directions | ≈28 px/s linear *sampled* |
| E-7 PlatformIntegrations | continuous (CSS) | translateY 0↔-50% | 28s linear infinite |
| S-9 SeasonCtaBanner | continuous | Lottie background | not reproducible → static placeholder |
| S-10 SeasonFaq | click | grid-template-rows 0fr↔1fr | .4s cubic-bezier(.76,0,.24,1) |
| S-10 SeasonFaq | click | chevron rotate 180° | .4s cubic-bezier(0,0,.2,1) |
| E-10 FaqSection | click | chevron scale(-1,-1) | .2s ease |
| E-4 AiFoundation | load | images opacity 0→1 + translateY(32px→0) | .7s ease-out; delays 120/470/820/1170ms |
| E-5 OrgAccordion | click | grid-template-rows | .4s ease-in-out |
| E-5 OrgAccordion | click | inner opacity | .35s ease-in-out |
| E-5 OrgAccordion | click / hover | title color | .2s ease |
| E-8 CustomerStories | click (autoplay unmeasured) | slide opacity/visibility | .9s ease |
| BK-6 HeroCarouselCentered | autoplay | advance every 4000ms; active dot fill translateX(-100%→0) | 4s linear; hover pauses the fill; card hover scale 1.03 .15s ease-in |
| BK-7 GuidesBanner | click | strip `flex` 1↔5 | 1s ease-in-out |
| BK-7 GuidesBanner | item becomes active | caption translateY(100%→0) | 1.5s ease-in |
| BK-7 GuidesBanner | active-item hover | overlay opacity 0→.55 | .5s ease-in |
| BK-7 GuidesBanner | active-item hover | "Read article" button fades in | .5s delay |
| BK-2 / BK-3 links | hover | arrow translateX(4px) | .15s ease-in |
| BK-4 filter group | click | chevron rotate 180° | .1s linear |
| BK-9 form skeleton | load | pulse (opacity 1→.5→1) | 2s cubic-bezier(.4,0,.6,1) infinite |
| T-1 featured card | hover | image scale(1.05) | .3s cubic-bezier(.4,0,.2,1) |

**No scroll-reveal** (IntersectionObserver fade-ins) exists on any of these pages. Every below-the-fold element sat at opacity 1 / transform none before scrolling. The exceptions are the carousel slides that are inactive by design.

`prefers-reduced-motion: reduce` disables these transitions in the original CSS; mirror that.

---

## 8. Downloaded assets (generic, layout-only)
- `public/fonts/ATSeasonSansVF.woff2` — required by the SEASON and PLATFORM-E types.
- `public/assets/solutions/b43a951aae517fecc7ed6a5634a19c1cc5a6a58a-24x25.svg` — FAQ chevron (E-10; S-10 uses an equivalent inline 32px chevron in `#9297A0`).
- `public/assets/solutions/e61b94adbe5f62b0663e373f5b9e155238536489-17x12.svg` — check mark (E-5).
- `public/assets/solutions/e62ca0dfe3ba9f5a6c12f0a205deeda8825cbfad-24x24.svg` — check icon on dark (E-6).
- `public/assets/solutions/3b291a321a93230b20bfeb411d263078b571eb78-16x16.svg` — CTA arrow (E-6).
- `public/assets/solutions/87cfab17c28caa44942388b1ee1bd138cc1f88c4-12x10.svg` — outline CTA arrow (E-7).

Not downloaded, by rule:
- photos, screenshots, videos, customer and partner logos, Lottie JSON
- the category and filter icons (use simple placeholder glyphs)

---

## 9. Not measured / caveats
- **Responsive widths between 390 and 1440** (768, 1024 and others) were not measured for the SEASON, PLATFORM-E or TPL systems. BK breakpoints follow `CLONE_SPEC.md` (768 / 1024 / 1664).
- **Videos:** headless Chromium can't decode the HEVC/Wistia media.
  - The product hero video box collapsed to 892×150 (hero 526 tall). Use the 892×501.8 (16:9) box measured on marketing and operations (hero 877.8).
  - Wistia players (enterprise hero, customer-stories slides) were measured from their 16:9 wrappers.
- **Lottie backgrounds** (S-9): animation frames were not captured; placeholder only.
- **Swap interval for the S-2 mobile logo cycle**; **E-8 autoplay timing**; **slick slide-transition speed** on BK-6.
- **The BreadcrumbBar idle debounce** before it reappears.
- **Mobile filter panel** (BK-4 "Filters" button) and the **mobile templates aside control**: not opened.
- **"Load more"** on customer stories was hovered, not clicked.
- **The contact-sales form** was measured only after the Marketo form rendered (it needs about 3–15s). It was never filled or submitted.
  - The Transcend cookie banner overlapped the lower part of the form card in the screenshot.
  - Geometry for the consent text and Submit comes from computed rects.
- **"Physical Product" pill color** on AI Plays was not read.
