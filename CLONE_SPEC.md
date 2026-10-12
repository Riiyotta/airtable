Source: https://www.airtable.com/

# Airtable homepage — clone spec (route `/`)

Measured live on 2026-10-12 with Playwright (Chromium) at viewport widths 1440, 1280, and 390 (height 900), using computed styles and DOM rects. Motion parameters were read from the shipped JS/CSS bundles. Assets are listed in `ASSET_MANIFEST.md`.

> **A/B variant.** airtable.com serves two homepage variants at random.
> - **This spec covers the variant that matches the user's saved HTML**: h1 "All your teams, all their workflows—connected in one workspace", Haas fonts, tabbed "Sophisticated workflows" section.
> - The other variant (h1 "Teams, workflows, and agents. All in one space.", `ATSeasonSans` font, `shellSeasonSans` header class) is **not** specified here.
>
> To reproduce my measurements, I pinned the variant by reusing the cookies from a session that received it.

Coordinates below are document-y at 1440 unless noted. `#181D26` is the near-black used everywhere.

---

## 0. Global

### Page frame
- `body`: bg `#FFFFFF`, `display:flex; flex-direction:column; min-height:100vh`, **`max-width:1440px`, margin 0** (not centered above 1440).
- Default text color `#333840` (`--theme_text`).
- Total page height: 7785px @1440, 7826px @1280, 8512px @390.
- `main` has `padding-bottom:64px`.

### Layout grid ("Wrapper → Grid")
- Every section wraps content in `.gridWrap`: `margin: 0 32px` (≥768) / `0 24px` (<768), `max-width:1536px`.
- Inside is a **12-column CSS grid** with a **32px column gap** (≥768; 24px on mobile, which uses 6 columns).
  - Column width = 85.33px @1440 (content 1376px).
  - Column width = 72px @1280 (content 1216px).
- Width of an N-column span: `N*col + (N-1)*32`. For example, 8 columns = 907px @1440 and 800px @1280.
- Breakpoints used by the CSS: **768, 900, 1024, 1664** (min-width).
  - Nothing changes typographically between 1280 and 1440 (verified: 0 font-size or line-height differences). Only column widths scale.

### Fonts — `@font-face` (files in `/public/fonts/`)
```css
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-55Roman-Web.woff2) format("woff2");font-weight:400;font-style:normal}
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-56Italic-Web.woff2) format("woff2");font-weight:400;font-style:italic}
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-65Medium-Web.woff2) format("woff2");font-weight:500;font-style:normal}
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-66MediumItalic-Web.woff2) format("woff2");font-weight:500;font-style:italic}
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-75Bold-Web.woff2) format("woff2");font-weight:700;font-style:normal}
@font-face{font-family:Haas;font-display:swap;src:url(/fonts/NeueHaasGrotTextRound-76BoldItalic-Web.woff2) format("woff2");font-weight:700;font-style:italic}
@font-face{font-family:"Haas Groot Disp";font-display:swap;src:url(/fonts/Haas-Grot-Disp-R-55-Roman.woff2) format("woff2");font-weight:500;font-style:normal}
@font-face{font-family:"Haas Groot Disp";font-display:swap;src:url(/fonts/Haas-Grot-Text-R-65-Medium.woff2) format("woff2");font-weight:600;font-style:normal}
@font-face{font-family:"Haas Groot Disp";font-display:swap;src:url(/fonts/Haas-Grot-Text-R-75-Bold.woff2) format("woff2");font-weight:700;font-style:normal}
@font-face{font-family:"Haas Groot Disp";font-display:swap;src:url(/fonts/Haas-Grot-Disp-R-95-Black.woff2) format("woff2");font-weight:900;font-style:normal}
```
- Preloaded on the original: Haas 400, Haas 500, Haas 700, and Haas Groot Disp 500.
- Body stack: `"Haas Groot Disp", Haas, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`.
  - Almost every text element resolves to **`Haas, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …, sans-serif`**.
  - Only the section-heading `h2.HeadingGroup` elements use **`"Haas Groot Disp"`**.

### Typography roles (desktop 1440 = 1280; mobile 390 in brackets)

| Role | Family | Size / line-height | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|
| Promo bar text | Haas | 14 / 17.5 | 400 | normal | #333840 |
| Promo link "Try it now" | Haas | 14 / 18.2 | 500 | 0.14px | #254FAD |
| Nav toggle (Platform/Solutions/Resources) | Haas | 16 / 20.8 [mobile menu 18 / 23.4] | 500 | normal | #181D26 (hover/open #254FAD) |
| Nav link (Enterprise, Pricing, Log in) | Haas | 16 / 20.8 [18 / 23.4] | 500 | 0.16px [0.18px] | #181D26 (hover #254FAD) |
| Nav button label | Haas | 16 / 20.8 | 500 | 0.16px | #181D26 / #FFF |
| **h1** hero | Haas | **40 / 48** [32 / 40] | 400 | normal | #333840 |
| Hero subheading | Haas | 16 / 21.6 [14 / 18.9, ls 0.28px] | 400 | 0.16px | rgba(4,14,32,0.69) = #040E20B0 |
| Logo-bar eyebrow h2 | Haas | 14 / 18.9 [14 / 18.2] | 400 | 0.16px | #333840 at **opacity 0.7** |
| **Section h2 (HeadingGroup)** "Sophisticated…", "The path to 10x…" | **Haas Groot Disp** | **32 / 36.8** (Sophisticated) and **32 / 40** (path to 10x) [24 / 27.6 and 24 / 30] | 400 | normal | #181D26 |
| Section subheading | Haas | 16 / 24 [14 / 21] | 400 | normal | #040E20 at opacity 0.7 |
| Tab menu item | Haas | 18 / 24.3 | 400 | 0.18px | inactive #41454D, active #181D26 |
| Card headline (tab cards) | Haas | 24 / 39 [18 / 29.25] | 400 | 0.12px (card 1), normal (others) [0.18 / 0.09px] | per card |
| Card body (tab cards) | Haas | 16 / 26 [14 / 22.75] | 400 | 0.08px [0.14px] | per card, wrapper opacity 0.7 |
| List-card group title `<strong>` | Haas | 16 / 26 [18 / 29.25] | 600 | 0.1px [0.18px] | #214224 |
| List-card bullet `li` | Haas | 14 / 22.75 | 400 | 0.1px [0.18px] | #41454D |
| Bento prompt text | Haas | 32 / 40 [14 / 18.9] | 500 | 0.16px [0.07px] | per card |
| Bento pill "Explore AI Plays" | Haas | 20 / 30 [12 / 18] | 500 | normal | per card |
| "Resources to inspire" | Haas | 32 / 41.6 [24 / 32.4] | 400 | 0.16px [0.12px] | #181D26 |
| Resource card title | Haas | 18 / 21.6 [18 / 22.5] | 500 | normal | #181D26 |
| Resource card description | Haas | 14 / 18.9 | 400 | 0.14px | #040E20B0 |
| Customer quote | Haas | 40 / 52 [24 / 32.4] | 400 | normal | #FFFFFF |
| Quote attribution (name, title) | Haas | 20 / 27 [18 / 24.3] | 400 | 0.1px [0.18px] | #FFFFFF |
| CTA section h2 | Haas | 32 / 40 [24 / 31.2, ls 0.12px] | 400 | normal | #333840 |
| CTA section p | Haas | 16 / 20 [16 / 20.8] | 400 | normal | #333840 |
| **Button label** (all BkButtons) | Haas | 16 / 21.6 | 500 | 0.16px (0.08px on "Explore all customer stories") | — |
| Footer primary link / column heading | Haas | 16 / 21.6 | 500 | 0.16px | #181D26 / heading #333333 |
| Footer column link | Haas | 16 / 21.6 | 400 | 0.16px | #333840 ("See more" is weight 500) |
| Footer utility link | Haas | 14 / 18.9 | 500 | 0.28px | #41454D |
| Drawer group label | Haas | 14 / 18.9 [12 / 16.2] | 500 | 0.12px | #040E20B0 |
| Drawer link title | Haas | 20 / 26 [18 / 23.4] | 500 | 0.2px [0.18px] | #181D26 (nested toggles #000000) |
| Drawer link subtext | Haas | 16 / 20.8 | 400 | 0.16px | #040E20B0 |
| Drawer promo heading | Haas | 48 / 55.2 | 500 | 0.18px | per drawer |
| Drawer promo eyebrow | Haas | 14 / 18.9 | 500 | 0.28px | per drawer |
| Drawer promo body | Haas | 18 / 24.3 | 400 | 0.18px | #181D26 |
| "NEW" eyebrow pill | Haas | 14 / 18.9 | 500 | 0.28px | #FFFFFF |

### Color tokens (exact, from `:root` and computed styles)
- **Text**
  - strong / primary: `#181D26`
  - default: `#333840`
  - secondary: `#41454D`
  - weak: `#040E20B0` = rgba(4,14,32,0.69)
  - link/info: `#254FAD`
  - footer column headings: `#333333`
- **Backgrounds**
  - page: `#FFFFFF`
  - subtle: `#F8FAFC` (resource cards, footer utility bar, `--theme_background`)
  - strong: `#E0E2E6`
  - promo bar: `#F0F6FF`
- **Borders and keylines**
  - `#E0E2E6` (cards, CTA box)
  - `rgba(1,20,53,0.12)` = `#0114351F` (footer separator, backdrop)
  - `#F8FAFC` (tab menu item rules)
- **Buttons**
  - Primary: bg `#181D26`, text `#FFF`, border 1px `#181D26`. Hover: bg and border become `rgba(4,14,32,0.69)`.
  - Secondary/outline: transparent bg, text and border `#181D26`. Hover: text and border become `rgba(4,14,32,0.69)`.
  - White (on dark cards): bg `#FFF`, text `#181D26`, border 1px `#FFF`. Hover: bg and border become `rgba(242,244,247,0.92)` = `#F2F4F7EB`.
- **Hero / CTA primary shadow** (removed on hover → `none`):
  `0 0 1px 0 rgba(0,0,0,.32), 0 0 2px 0 rgba(0,0,0,.08), 0 1px 3px 0 rgba(45,127,249,.28), inset 0 0 0 .5px rgba(0,0,0,.06)`
- **Hero secondary shadow** (removed on hover):
  `0 0 1px 0 rgba(0,0,0,.32), 0 0 2px 0 rgba(0,0,0,.08), 0 1px 3px 0 rgba(0,0,0,.08), inset 0 0 0 1px rgba(1,20,53,.12)`
- **Header shadow:** `0 0 20px 0 rgba(15,48,106,0.05)`.
- **"NEW" pill gradient** (`--theme_spotlight-background-strong`):
  `linear-gradient(91.6deg,#F5620C -3.95%,#FC4777 14.34%,#E848C0 28.2%,#9B67F0 52.43%,#458FFF 68.27%,#0AB2FA 86.46%,#0DBDB4 101.9%)`
- **Tab-card palette**
  - Card 1: bg `#912E1F`, white text.
  - Card 2: bg `#FFFFFF`.
  - Card 3: background image, text `#254FAD`.
  - Card 4: bg `#FAF5E8`, headings `#214224`.
  - Menu indicators: `#912E1F`, `#B6E995`, `#002D98`, `#214224`.
- **Bento palette** (bg / text; the pill inverts the pair)
  - Card 1: `#FCAB79` / `#AA2D00`
  - Card 2: `#C7E5F2` / `#0A2E0E`
  - Card 3: `#254FAD` / `#FA91E0`
  - Card 4: `#0A2E0E` / `#FCB42A`
- **Drawer promo gradients** (`linear-gradient(180deg, A 0%, B 100%)`)
  - Platform (cyan): `#EBF7FC` → `#C7E5F2`. Heading `#0076A8`.
  - Solutions (gray): `#F8FAFC` → `#E0E2E6`. Heading `#41454D`, eyebrow `#9297A0`.
  - Resources (teal): `#EBF7F7` → `#C7EBE9`. Heading `#097A76`, eyebrow `#0DBDB4`.
- **Radii:** buttons 12px; tab cards 24px; bento 32px; resource and CTA cards 16px; hero video 16px; pills 999px / 32px; indicator 2px.

---

## 1. Header (sticky) — `header#marketingHeaderSharedRoot`

### Structure and stickiness
- `position:sticky; top:0; z-index:4`.
- Inner `nav` is a grid: `grid-template-columns: var(--mainNavWidth) 1fr` (725.77px | rest @1440), bg `#FFF`, box-shadow `0 0 20px rgba(15,48,106,.05)`.
- Total height **120.98px** = promo bar 42.19 + main row 78.8. It's exposed as CSS var `--mainNavHeight`, which other sticky elements use.
- **Scroll behavior:**
  - An IntersectionObserver (`threshold:1`, `rootMargin:"10px 0px 0px 0px"`) on a sentinel span adds class `headerIsStuck` once scrolled.
  - No visual change was measured at scrollY 200/1200/3000: same bg, same shadow, height stays 121, promo bar stays visible.
  - The class only changes the wordmark-collapse logic (below).

### 1a. Promo bar (row 1, full width)
- bg `#F0F6FF`, height 42.19.
- Inner padding `12px 64px 12px 32px`, centered flex, gap 4px.
- Text: "Bring your Airtable data into Claude."
- Link "Try it now" → `https://www.airtable.com/lp/claude-airtable`.
  - Followed by an arrow svg 18×12 (`inline-svg/promo-arrow.svg`), margin-left 4, rotated 180°.
- Close button: 12×12 X (`inline-svg/promo-close.svg`), absolute, right 24px, top 15px, `aria-label="Close promo banner"`. Clicking it removes the bar.
- Mobile (390): height 68; text and link stack in a column (gap 8); padding `12px 64px 12px 24px`.

### 1b. Main row (row 2)
- **Left grid cell** (`MainNav`): padding `0 32px`, `display:grid; grid-template-columns: min-content min-content; gap:32px; align-items:center`.
  - Brand link (`/`, `#nav-brand`): 140×32, margin `22px 0`. Contains mark svg 38×32 (`brand-mark.svg`) and wordmark svg 94×20 (`brand-wordmark.svg`, margin-left 4).
  - Nav items, inline-flex, each separated by `margin-left:22px`:
    1. `button` "Platform" + 12×12 chevron (margin-left 4)
    2. `button` "Solutions" + chevron
    3. `button` "Resources" + chevron
    4. `a` "Enterprise" → `https://www.airtable.com/solutions/enterprise`
    5. `a` "Pricing" → `https://airtable.com/pricing`
  - Each toggle wrapper is the full row height (79px), centered.
- **Right cell** (`ActionGroup`): flex, justify-end, gap 16, margin `12px 32px 12px 0`.
  - "Book Demo" outline button → `https://www.airtable.com/contact-sales`: 140×55, padding 16/24, radius 12, border 1px #181D26.
  - "Sign up for free" primary → `https://airtable.com/signup`: 170×55, bg #181D26.
  - "Log in" text link → `https://airtable.com/login`.
- **Hover**
  - Nav toggles and links: color → `#254FAD`, `transition .15s ease-in`.
  - Book Demo: text and border → `rgba(4,14,32,.69)`, `.15s ease-in`.
  - Sign up: bg and border → `rgba(4,14,32,.69)`, `.2s linear`.

### 1c. Mega-menu drawers (desktop ≥1024)
- **Trigger:** the toggles open on **click** (hover only recolors). Opening adds `drawerIsActive`.
- **Open toggle state:**
  - Text `#254FAD`.
  - Chevron rotates −90° → 0°, path fill `#949494` → `#95BEFC`.
  - A 2px bar (`#95BEFC`, radius 6, 100% width) appears via `::after` at the bottom of the 79px nav row.
- **Backdrop:**
  - `position:fixed; inset:0` with bg `rgba(1,20,53,.12)` and `backdrop-filter: blur(8px)`.
  - Opacity 0 → 1 and visibility toggled, `transition: all .15s ease-in`.
  - Clicking it closes the drawer.
- **Drawer panel:**
  - `position:fixed; top:0; left:0; height:100%`, **width 650px** (measured identically at 1280 and 1440).
  - bg `#FFF`, `padding-top: var(--mainNavHeight)`; it sits under the header (z-index −1 relative to the header).
  - A `::after` 20px inner shadow sits on its right edge: `inset 15px 0 15px -15px #0f306a0d`.
- **Promo panel:** fixed, left 650, width 480, height 100%, bg `#F8FAFC`, padding-top `--mainNavHeight`.
  - Inner wrapper uses the per-drawer gradient, padding `72px 48px 48px`, flex column, gap 48, shadow `0 0 20px #0f306a0d`.
  - Intro block is a flex column with gap 32: eyebrow (margin-bottom 8), 48px heading, 18px overview, outline button.
  - Then a 384px-wide image.
- **Drawer list:** `ul` with padding-top 32, flex column, gap 24.
  - Each group is a column with gap 16.
  - Group title row: padding `0 48px`, gap 24. Label is followed by an `hr` 2px `#181D26` at opacity 0.25 filling the remaining width.
  - Link rows: `padding:12px 48px`.
    - Optional icon 24px with margin-right 12.
    - Title, then subtext (margin-top 4).
    - Row hover: bg `rgba(15,48,106,.05)` (`.15s ease-in`).
  - Nested toggles: same row style plus a right chevron (margin-left 48, opacity .5, rotated −90°). They open a nested panel with a "Back" row.

**Drawer contents (exact text; links on www.airtable.com unless noted):**

- **Platform**
  - Group "Platform & Products":
    - Airtable Platform (`/platform`) — "Unlock the power of a next-gen app-building platform"
    - AI App Building [NEW] (`/platform/app-building`) — "Enable teams to build custom business apps—no code needed"
    - AI Agents [NEW] (`/platform/ai-agents`) — "Deploy thousands of agents inside your apps"
    - Portals (`/platform/portals`) — "Collaborate seamlessly with guest users outside your organization"
    - Scale (`/platform/hyperdb`) — "Build apps on top of massive data sets with 100M records"
    - ▸ Platform Features — "Learn about automations, interfaces, and more"
  - Group "Tools":
    - ▸ Integrations
    - Download (`/downloads`)
    - Their subtexts ("Integrate with tools like Slack, Google Drive, and Salesforce", "Get the Airtable app for desktop and mobile") are visually hidden at this width.
  - Promo panel (cyan):
    - Heading "The Airtable Platform"
    - Overview "Propel your business with a next-gen app-building platform. See data move in real-time and securely transform your work with AI."
    - Button "Explore the platform" → `/platform`
    - Image `marketing-nav-platform-graphic.webp` (384×264)
  - Nested "Platform Features" → **Features** (each has an icon):
    - Automations — "Achieve more in less time via automations"
    - Databases — "Use relational databases to connect data from apps, workflows, and tools"
    - Interfaces — "Create custom interfaces from your data"
    - Reporting — "Measure, analyze, and share insights"
    - Governance and Security — "Centrally manage security, permissions and data protection"
    - Airtable AI — "Embed AI throughout end-to-end workflows"
    - What's New — "See Airtable's latest product updates"
  - Nested "Integrations":
    - Slack — "Add real-time messaging to your workflows"
    - Google Drive — "Sync information and build workflows"
    - Salesforce — "Leverage CRM data across teams and tools"
    - Jira — "Generate tickets and sync work from Airtable"
    - Zendesk — "Simplify and streamline workflows"
    - "See all integrations"
- **Solutions**
  - Group "Teams" (margin-bottom 32):
    - Product — "See what's happening across your portfolio, and ship better products." (`/solutions/product`)
    - Marketing — "Plan smarter campaigns and scale impact with unifed marketing workflows." (`/solutions/marketing`; the typo "unifed" is in the original)
    - Project Management — "Strategic project management built for outcomes, not just to-do lists." (`/solutions/project-management`)
    - Operations — "Run operations in one platform that connects workflows, data, and tools." (`/solutions/operations`)
    - Sales — "Surface sales opportunities, spot churn risk early, and close more deals faster." (`/solutions/sales`)
    - Design & Creative — "Unify design workflows, stay on-brand, and innovate creative quickly." (`/solutions/design-creative-project-management`)
    - Human Resources — "Manage and streamline processes from hire to retire" (`/solutions/hr`)
    - Finance — "Streamline requests, manage budgets, and automate reporting" (`/solutions/finance`)
  - Group "Industries":
    - Media & Entertainment — "Run content production, digital assets, and crew operations in one place" (`/solutions/media-entertainment`)
    - Retail — "Power critical retail workflows from product planning to final purchase" (`/solutions/retail`)
    - CPG Manufacturing — "Keep track of your products, supply chain, and quality assurance" (`/solutions/manufacturing`)
    - Education — "Manage student services, planning, and grants more efficiently" (`/solutions/education`)
    - Technology — "Unite your entire SaaS org to drive faster GTM execution and greater impact." (`/solutions/saas-project-management`)
    - Agency & Professional Services — "Streamline coordination, protect margins, and deliver better client outcomes." (`/solutions/agency`)
  - The list overflows the 900px viewport; the inner list scrolls (`overflow-y:auto`).
  - Promo panel (gray):
    - Eyebrow "Customer Story"
    - Heading "More money, fewer problems"
    - Overview "How Code and Theory consolidated tooling and saved more than 10,000 hours with Airtable."
    - Button "Learn more" → `/customer-stories/code-and-theory`
    - Image `marketing-nav-solution.webp` (384×268)
- **Resources**
  - Group "Explore":
    - ▸ Resources Hub
    - ▸ Templates
    - AI Plays (`/ai-plays`)
    - Blog (`/articles`)
    - Customer Stories (`/customer-stories`)
    - Videos (`/videos`)
    - Events (`/events-webinars`)
  - Group "Learn & Support":
    - Airtable Academy (`https://academy.airtable.com/`)
    - Airtable Community (`https://community.airtable.com/`)
    - ▸ Developers Docs
    - How-to guides (`/guides`)
    - ▸ Support
  - Group "Ecosystem":
    - Marketplace (`https://airtable.com/marketplace`)
    - Partners (`/partners`)
    - Services (`/services`)
  - These are title-only rows, 50px tall.
  - Nested panels:
    - Resources Hub: Reports, eBooks, Webinars, Quick Reads, Demos, "See all resources"
    - Templates: Project Management [New], Content Calendar, Event Planning, Product Roadmap, Organizational Chart, Resource Allocation [New], Social Media Calendar, Marketing Campaign Tracker, Product Launch, Content Strategy, Product Strategy, Inventory Tracker, Product Catalog, "See all templates"
    - Developers:
      - Dev Community — "Share ideas and find solutions from peers"
      - API Docs — "Build with the Airtable API"
      - Custom Extensions — "Create real-time, interactive extensions"
      - Scripting — "Build something custom with scripts"
    - Support: Help center, Contact Support
  - Promo panel (teal):
    - Eyebrow "Resource Center"
    - Heading "Stay one step ahead of the trends"
    - Overview "This content is packed with demos, best practices, industry trends, and more. See how to win in a fast-moving market."
    - Button "Explore all resources" → `/lp/resources`
    - Image `marketing-nav-resource.webp` (384×260)
- The "NEW" pill: gradient bg, radius 999, padding `4px 12px`, margin-left 8, height 29, white 14px/500.

Nested-panel styles were not measured directly; they reuse the same DrawerLink row styles.

### 1d. Mobile header (<1024; measured at 390)
- Height 144 = promo 68 + row 76.
- Row: padding `0 24px`, brand margin `22px 0`. Closed: mark 38×32 + wordmark (brand 140px wide). Menu open: mark only (42px; the wordmark collapses).
- Right side (margin `9px 24px 9px 0`, gap 16):
  - "Sign up" primary button 108×55 (padding 16/24, radius 12).
  - Hamburger button 32×32 (radius 6). It holds two 24×2 bars (`#181D26`, radius 6) at y+0 and y+10.
    - Open state: wrapper becomes 20×20 and the bars rotate +45° / −45° into an X (`transition .15s ease-in`).
- **Open menu:**
  - `position:fixed; inset:0`, padding-top 143.69, inner bg #FFF, padding `8px 0`, flex column.
  - Rows are full width, 55px tall, padding `16px 24px`, 18/23.4 weight 500. Order: Platform ▸, Solutions ▸, Resources ▸, Enterprise, Pricing.
  - Then (margin-top 32): "Book demo", "Sign in".
  - Hover/focus row bg: `rgba(15,48,106,.05)`.
- **Tapping a category:**
  - Opens a full-screen drawer (390 wide), list padding-top 32, gap 16.
  - First row is a "Back" button (44px, bg `rgba(15,48,106,.05)`, padding `12px 24px`, gap 8, back-arrow 18×12, label 16/20 #333).
  - Group titles: 12/16.2, padding `0 24px`, gap 16.
  - Link rows: padding `12px 24px`, title 18/23.4.
  - No promo panel below 768.

---

## 2. Hero — `section.coreHeroImageCentered` (y 121–1110)

- bg `#FFF`; padding `40px 0` (≥768), `32px 0` (<768).
- **Text area:** grid columns 3–10 (907px @1440, 800px @1280, x=267/240), centered flex column.
  - **h1** (y 161, 2 lines, 907×96): "All your teams, all their workflows—connected in one workspace". Centered, margin-bottom 32.
  - Subheading `p` (y 289, 43px, 2 lines): "Build AI-powered workflows that unify data, maximize collaboration, and set your teams up for long-term success. No code required." Centered, margin-bottom 24.
  - CTAs (y 356): flex, centered, gap 16.
    - "Get started for free" — primary, 201×56, → `https://airtable.com/signup`.
    - "Book demo" — outline, 138×56, → `https://www.airtable.com/contact-sales`.
    - Both: padding `16px 24px`, radius 12, transition `.2s linear`.
- **Video:** below the text, margin-top 32 (24 mobile), at y 444.
  - Container `max-width:1114px; margin:0 auto; aspect-ratio:16/9; border-radius:16px; overflow:hidden` → 1114×627 at both 1280 and 1440.
  - `<video autoplay muted loop playsinline>` with src `/assets/16f7e8526058f2d34ce24e5ef3933bc3783cea4b.mp4`, width 100%, object-fit cover, no poster.
  - Pause/play button: 40×40 circle, bg `#181D26`, white lucide pause icon 16px, absolute `right:16px; bottom:16px`, z 10.
    - Hover bg → `rgba(4,14,32,.69)`.
    - Transition: `background-color, border-color, color, box-shadow .15s cubic-bezier(.4,0,.2,1)`.
    - Toggles pause/play (`data-paused`).
- **Mobile 390:**
  - h1 32/40 (3 lines, 342 wide).
  - CTAs stack full-width (342×56 each, gap 12).
  - Video box 342 wide (16:9 = 192px).

## 3. Logo bar — "Trusted by 500,000 leading teams" (y 1110–1301)

- **Heading row:** grid with padding `40px 0` (measured; CSS also has 32px ≥768 and 24px mobile). Centered h2 (14px, opacity .7) at y 1150.
- **Marquee section** (`#sanity-logo-marquee`): padding-bottom 40 (32 mobile).
  - Wrapper `overflow:hidden` with `mask-image: linear-gradient(90deg, #0000 0%, #fff 5% 95%, #0000 100%)`.
  - `ul`: flex, nowrap, `padding:32px 0; margin:-32px 0; overflow:hidden`.
  - Each `li`: `padding:0 16px` (24px ≥1664), `flex:1 0 auto`, holding a 168×52 `object-fit:contain` logo.
  - Item pitch is **200px**.
  - **16 logos** (Logo 1–10 and 12–17; there is no Logo 11 in the CMS), rendered **twice → 32 `li`**. The duplication comes from `minNumOfCards = logos+1`, which repeats the list.
  - Logo order and files: see ASSET_MANIFEST (Logo 1 = b6863f56…, … Logo 17 = 82ff48b2…).
- **Motion:** see §11 (GSAP seamless loop, 25 px/s, leftward, not draggable, no hover pause).

## 4. Tabbed scroll section — "Sophisticated workflows in minutes, not months" (y 1301–4442)

- **h2** (HeadingGroup, Haas Groot Disp 32/36.8): padding-top 48, margin-bottom 8. Spans the full 12 columns, left-aligned.
- **Body grid:** padding `48px 0 64px` (`40px 0` mobile).
  - Content container: `display:flex; gap:32px` (row ≥1024, column below).
- **Left sticky menu**
  - 243px wide (max-width 312), `position:sticky; top:136.98px` (= `--mainNavHeight` 120.98 + 16), bg `#FFF`, z 2.
  - `nav`: flex column, gap 0.
  - Each item is `a` with `display:flex; align-items:center; gap:16px; padding:16px 0; border-bottom:1px solid #F8FAFC` (the first item also has `border-top`). Transition `transform .3s`. Text is truncated with ellipsis.
  - Indicator before the text: 8×8 square, radius 2, bg = the card color. Opacity 0, or 1 when active (`transition: opacity .2s`).
  - Labels: "01 AI app building", "02 Agents at Scale", "03 Meet Omni", "04 Enterprise capabilities".
  - **Mobile:** the menu becomes a horizontal, scrollable row (gap 24, padding `0 16px`, scrollbar hidden), still sticky under the header.
- **Right column:** flex column, gap 48 (32 mobile), 1101px @1440 / 941px @1280.
- **Common card style:** `border:1px solid #E0E2E6; border-radius:24px; overflow:hidden`. At ≥1024, `height:75vh; max-height:800px` (675px at a 900px-tall viewport). The list card has `height:unset`.

### Card 1 — animated media, bg `#912E1F` (y 1442, 1101×675)
- Flex column, space-between.
- **Heading row:** margin-top 48, padding `0 48px`, flex row space-between.
  - Text block `flex:1 0 50%` (683px).
    - **h3** "Production apps at prototype speed" (white, margin-bottom 16).
    - Body (white, wrapper opacity 0.7): "Streamline your team's critical data through conversational building. Generate apps with Airtable's best-in-class no-code components—no technical expertise required."
  - Right: **white button** "Learn more" 139×56 → `/platform/app-building`.
- **Media area:** flex-grow (1099×518), `display:flex; justify-content:center; align-items:flex-end; position:relative`.
  - 4 absolutely positioned items, each `height:90%` (466px), width auto (338–341px), bottom-aligned and horizontally centered.
  - z-index 1–4, using the four 729×996 screenshots.
  - They start stacked (opacity 0.1, translateX 0) and **fan out on scroll** to translateX −90%, −28%, +28%, +87% at opacity 1. See §11.
- **Mobile:** padding `0 32px`, margin-top 32, column layout. Media height 200px; img max-width 150px (rendered 116×160).

### Card 2 — text+media, bg `#FFF` (y 2165)
- Flex column, gap 24.
- **Media on top:** flex `1 1 0` (1099×462), overflow hidden.
  - `<video autoplay muted loop playsinline>` with src `/assets/559eda8e343bd1e27dee54f569b062cb60110afe.mp4`, `object-fit:cover; min-width:100%; min-height:100%`.
  - On mobile the media is 16:9.
- **Heading row:** margin `40px 0`, padding `0 48px`.
  - h2 "Don't just ask AI. Deploy it." (#181D26).
  - Body (`rgba(4,14,32,.7)`, wrapper opacity .7): "Embed intelligence into every workflow—Airtable agents think dynamically across thousands of records and orchestrate actions across your entire operation."
  - Primary button "Learn more" → `/platform/ai-agents`, bottom-right (aligned to the end).

### Card 3 — background-image card (y 2888)
- Background: `url(/assets/3385c0df…-2000x1600.png) center / cover no-repeat`.
- Padding 40 (mobile `32px 32px 128px`), 12-column grid inside (gap 32). Content spans 5 columns (406px).
- Content:
  - Animated GIF icon 226×226 (`e1ae4b78….gif`), padding-bottom 40.
  - Content block (flex column, gap 4):
    - h2 "Say hello to Omni" (#254FAD).
    - Body (#254FAD, wrapper opacity .7, margin-bottom 16): "Use it to build any enterprise-grade applications with your data. The possibilities are endless."
    - Primary button "Learn more" → `/platform/app-building`.

### Card 4 — list card, bg `#FAF5E8` (y 3611, 1101×767)
- Padding 40, 12-column grid (gap 32).
- **Left:** columns 1–6 (406px).
  - Icon 48×48 (`7eba4fea….svg`).
  - h2 "The power of AI with the industrial-grade platform your business demands" (#214224, padding-top 40, 3 lines).
- **Right:** columns 7–12 (494px, x=873). Three groups:
  - **Scalable infrastructure**
    - HyperDB with record limits in the hundreds of millions
    - Scale workflows to tens of thousands of users
    - Use AI models from leading providers (OpenAI, Gemini, Llama, Anthropic, and more)
  - **Flexible administration**
    - Admin roles, robust permissions, fine-grained RBAC
    - Fine-grained controls to enable AI
    - Programmatic provisioning and de-provisioning
    - IDP synced groups
  - **Security and compliance**
    - ISO, HIPAA, SOC 2
    - No customer data retained or used to train AI models
    - Models run fully in Airtable's AWS environment
    - EKM, data loss prevention, audit logs, e-discovery
    - European and Australian data residency support
- **Group/list styles:**
  - Group title is a `<p>` holding a `<strong>`, margin-bottom 16. The 2nd and 3rd group titles add padding-top 12.
  - `li`: padding-left 32, margin-bottom 16, `position:relative`.
  - Bullet is `li::before`: 24×24 `background-image:url(/assets/0834b049…-24x25.svg)`, absolute top 0, left 0. List-style is visually replaced by the icon.

## 5. AI Plays bento — "The path to 10x every person in your organization" (y 4442–5736)

- **Heading row:** padding-top 64, flex row (`data-has-cta`), space-between, align center, gap 24.
  - Left (gap 24):
    - h2 (Haas Groot Disp 32/40) "The path to 10x every person in your organization".
    - Subheading "Use cases and templates to activate AI in your workflows".
  - Right: primary button "See AI plays" 145×56 → `/ai-plays`.
  - Mobile: stacks; button below.
- **Wrapper:** padding `64px 0` (`40px 0` mobile), then an inner grid with padding `64px 0` (`48px 0` mobile). Cards start 128px below the heading.
- **Card layout:** `display:grid; grid-template-columns:repeat(12,1fr); gap:32px` (16px and a single column on mobile).
  - Row 1: card 1 spans 8 columns (907×427), card 2 spans 4 (437×427).
  - Row 2: cards 3 and 4 span 6 each (672×427).
  - At 1280: 800 / 384 / 592.
- **Card style:**
  - `<a href="https://www.airtable.com/ai-plays">`, radius 32, height 427 (≥768), padding-top 24, `overflow:hidden; cursor:pointer`.
  - Background color per the palette.
  - Image layer: absolute fill, `object-fit:cover`.
    - Card 1: `23b71faa…-1770x854.png`
    - Card 2: `4d4aaf0d…-854x854.png`
    - Card 3: `27e946e2…-1312x854.png`
    - Card 4: `179c070b…-1312x854.png`
  - Content layer: z 1, padding 48, flex column, space-between, align center (gap 0 at ≥1024).
    - Prompt text (`p`, centered, flex 1).
    - Pill "Explore AI Plays": padding `12px 24px` (mobile 14.5/24), radius 32.
- **Prompts:**
  1. "Read this brief and generate 10 campaign ideas for our summer launch."
  2. "Gather intel on all event invitees to help me personalize outreach."
  3. "What are customers saying about our competitors and where are our biggest opportunities?"
  4. "Run language translation on 500 assets and check for local regulation requirements."
- **Desktop hover (≥1024; also `:focus-within`):**
  - Image opacity 1 → 0.
  - Prompt and pill opacity 0 → 1.
  - All `transition: all .6s cubic-bezier(.4,0,.2,1)`.
  - At rest only the image shows.
- **Mobile (<1024):**
  - Images are `opacity:0` (hidden); prompt and pill are always visible on the solid color.
  - Card height is auto (342×207 at 390).

## 6. Resources — "Resources to inspire" (y 5736–6317)

- Nested wrappers: outer gridWrap (margin 0 32), then inner gridWrap (margin 0 32), so content is x=64, width 1312.
- Grid: padding `64px 0` (32 mobile), `row-gap:40px`, `max-width:1344px`.
- Title `p` "Resources to inspire" (left-aligned text).
- **Cards row:** `grid-template-columns: repeat(3, 1fr); gap:48px` (405.33px @1440, 352px @1280; 1 column on mobile, gap 48).
- **Card:**
  - `<a>` → card div with bg `#F8FAFC`, border 1px `#E0E2E6`, radius 16, flex column, overflow hidden, 371px tall @1440.
  - Image box `aspect-ratio:16/9` (403×227), `img{object-fit:cover; width:100%; height:100%}`.
  - Content padding 24: title (margin-bottom 8), description (margin-top 16).
  - **Hover:** title color `#181D26` → `#040E20B0` (no transition declared). No image zoom.
- **Cards:**
  1. "Builders & Breakthroughs" — "Hear from top product leaders as they share the pivotal insights and decisions behind building great products—hosted by Airtable CEO Howie Liu." → `/breakthroughs` — img `45d538de…-1280x720.png`
  2. "The 2026 AI guide for marketers" — "Learn how to prep your marketing organization for AI integration and layer Airtable across your most critical marketing workflows." → `/lp/resources/ebooks/ultimate-ai-guide-for-marketers` — img `dbb582f0…-1600x900.webp`
  3. "In action: Airtable ProductCentral" — "See how Airtable ProductCentral delivers a complete view of product investments at every altitude, infusing AI at each step of the product development process." → `/lp/resources/demos/airtable-productcentral-demo` — img `09c27aad…-1920x1081.webp`

## 7. Customer story (y 6317–6808)

- Outer container: `max-width:1536px; padding:0 24px` (x=24, width 1392 @1440).
- Inner `section`: padding-top 48, margin 2px.
- It's a slick-slider with a **single slide**: no dots, no arrows, no autoplay. Build it as a static block.
- **Video pane:** 1388×439 @1440 (1228×491 @1280, 338×435 @390), bg `#CCC`, radius 24, z 1, color #FFF.
  - Background `<video autoplay muted loop playsinline>`: src `/assets/642f0aab4cecfadb17e538dfb03ec1e47a09d549.mp4#t=0.5`, `position:absolute; inset:0; width/height 100%; object-fit:cover; mix-blend-mode:multiply; background-color:rgba(1,20,53,.12); border-radius:20px; z-index:2`.
  - Content layer z 4: `display:flex; justify-content:flex-end; align-items:flex-end; padding:64px` (measured; 32px mobile).
    - Left block (932px):
      - Quote: "“Airtable makes it easy to deliver AI insights to every team quickly and without complex builds.”"
      - Attribution (margin-top 96 measured; 48 mobile): white logo 88×50 (`c9f68130…-90x52.svg`), then "Angela Yanes", then "Director of Product Operations".
    - Right (margin-left 64; on mobile it stacks with margin-top 32): white button "Explore all customer stories" 264×56 → `/customer-stories`.

## 8. CTA box — "Start building with Airtable" (y 6808–7142)

- Section padding `48px 0`; wrapper margin 0 32.
- Box: border 1px `#E0E2E6`, radius 16, padding 40, 12-column grid, gap 24, `align-items:baseline`.
- h2 "Start building with Airtable".
- p (margin-top 16): "Teams at over 500,000 forward-thinking organizations use Airtable every day. Join them."
- Primary button "Get started for free" (max-width 200) → `https://airtable.com/signup`, left-aligned below the text.

## 9. Footer (y 7206–7785)

- bg `#FFF`. Wrapper `max-width:1344px; margin:0 auto; padding:0 48px` (24 mobile). Content is x 96–1344 @1440 and x 48–1232 @1280.
- **Top row:** `nav` grid `68px 1fr 204px`.
  1. Logo mark 32×27 (`footer-logo.svg`), padding `24px 0`.
  2. Primary links, flex gap 20: Platform, Solutions, Resources, Enterprise, Pricing, Book Demo. Each `a` has a 2px transparent border.
  3. Social icons, flex gap 24: Facebook, Linkedin, Twitter, Instagram, Youtube (svgs ~17px, color #181D26).
- **Separator:** 2px, `rgba(1,20,53,.12)`, full width.
- **Link columns:** margin-top 48; `grid-template-columns: repeat(5,1fr); gap:48px`.
  - Each column: heading (margin-bottom 8), then a list (flex column, gap 12, rows 30px tall).
  - Each of the first lists shows 6 items plus a "See more" toggle. Clicking it expands the hidden items and changes the label to "Show less" (`transition .15s ease-in`).
  - **Platform:** AI App Building, AI Agents, Airtable Platform, Portals, Scale, Automations | more: Databases, Interfaces, Reporting, Governance & Security, Airtable AI, What's New
  - **Solutions:** Product, Marketing, Project Management, Operations, Sales, Design & Creative | more: Human Resources, Finance, Media & Entertainment, Retail, CPG Manufacturing, Education, Technology, Agency & Professional Services
  - **Resources:** Resources Hub, Templates, AI Plays, Blog, Customer Stories, Videos | more: Events, Marketplace, Partners, Services
  - **Learn:** How-to guides, Developer docs, Airtable Academy, Airtable Community, Help center (no toggle)
  - **Company:** Try Airtable for free, Pricing, Contact sales, Contact support, About, Careers | more: Status, Newsroom
- **Utility bar:** margin-top 72, full-bleed bg `#F8FAFC`, 73px tall.
  - Inner row padding `16px 0`, flex space-between, align center.
  - Links (gap 16): Security, API, Privacy, Terms, Do Not Sell/Share My Info, Cookie Preferences, Accessibility.
  - Right: App Store badge 97×33 and Google Play badge 109×33 (inline svgs).
- **Hover:**
  - Footer text links get `text-decoration: underline` (no color change).
  - Social icons: opacity 1 → 0.75.
- **Mobile 390:**
  - Logo and socials share the top row.
  - Primary links stack vertically (each 26px, gap 24).
  - Link columns become accordions: full-width buttons 342×54, padding `16px 0`, chevron icon.
  - Utility links wrap and center; badges sit centered below.

## 10. Components summary
- **BkButton (all section CTAs):**
  - `display:flex; align-items:center; justify-content:center; padding:16px 24px; border-radius:12px; border:1px solid; font:500 16px/21.6px Haas; letter-spacing:.16px`.
  - Height 56; `transition: all .2s linear`.
  - Variants: primary, outline, white (colors in §0).
  - Mobile: same size; hero buttons go full width.
- **Nav ActionButton:** same padding and radius, height 55 (line-height 20.8).
- **Cards:** tab cards (radius 24, border #E0E2E6), bento (radius 32, no border), resource (radius 16, border #E0E2E6, bg #F8FAFC), CTA box (radius 16, border #E0E2E6).

## 11. Motion (exact)

| Element | Trigger | What animates | Timing |
|---|---|---|---|
| Logo marquee | Load, continuous | Each `li` `translateX` (GSAP "horizontalLoop": every item gets its own wrapping tween) | **25 px/s** (`speed:.25` → `pixelsPerSecond = 100*speed`), `ease:"none"`, `repeat:-1`, leftward. `draggable:false`, **no pause on hover** for the logo bar. Measured −50.45px per 2.003s. Loop length = 32 items × 200px = 6400px → 256s per cycle. Recalculates on resize (debounced 150ms). |
| Tab card 1 image fan | Scroll-linked | Each image item: `opacity` and `x` | motion `useScroll({target: card, offset:["60% end","120% end"]})`, piped through `useSpring({stiffness:400, damping:150, mass:1})`. Opacity = `transform(p,[0,0.9],[0.1,1],{ease:easeInOut})`. x = `transform(p,[0.1,0.9],["0%", X],{ease:easeInOut})` with X = −90%, −28%, +28%, +87% for z-index 1–4. Progress 0 is when the card's 60% line reaches the viewport bottom; progress 1 is when its 120% line does. Fully reversible on scroll-up. |
| Tab menu active state | Scroll listener (`window.scroll`) | Active item: text #41454D → #181D26, indicator opacity 0 → 1 (`.2s`) | Active = the card with the largest visible ratio `(min(bottom,innerHeight) − max(top,0)) / offsetHeight`, if that ratio is ≥ 0.6. Otherwise, the last card whose top < innerHeight/2. Measured at 1440×900: item 2 activates at scrollY ≈ 1751, item 3 at ≈ 2501, item 4 at ≈ 3251. |
| Tab menu click | Click | `window.scrollTo({top: cardTop − mainNavHeight − (innerWidth<1024 ? menuHeight : 0) − 16, behavior:"smooth"})` | The scroll listener is suppressed for 1000ms after the click. |
| Bento cards | Hover / focus-within (≥1024) | Image opacity 1 → 0; prompt and pill opacity 0 → 1 | `.6s cubic-bezier(.4,0,.2,1)` |
| Buttons (BkButton) | Hover | bg / color / border / box-shadow (see §0) | `.2s linear` |
| Nav links, toggles, Book Demo | Hover | color → #254FAD or rgba(4,14,32,.69) | `.15s ease-in` |
| Header elements | Any state change | — | `transition: all .15s ease-in` (prefers-reduced-motion: no-preference) |
| Mega-menu open | Click toggle | Drawer `opacity [0,1]`, `translateX ["-15%","0%"]`, 250ms. Then drawer `> li` items: `left ["-15px",0]`, `opacity [0,1]`, 250ms, **stagger 75ms**. Backdrop opacity .15s ease-in. Wordmark collapses (`opacity 0, width 0`, 250ms) when not stuck. | anime.js timeline, `easing:"easeOutSine"` = `cubic-bezier(0.61, 1, 0.88, 1)`. When switching drawers, the old one runs `opacity [1,0]`, `translateX ["0%","-15%"]`, 150ms, and the new one starts at offset "-=200". |
| Nested drawer panel | Click nested toggle | Panel `opacity [0,1]`, `translateX ["-25%","0%"]`, 250ms. Items `translateX ["-50%","0%"]`, `opacity [0,1]`, 250ms, stagger 75ms, offset "-=150". Old panel `opacity [1,0]`, `translateX ["0%","-25%"]`, 250ms; new panel at "-=100". | `easeOutSine` |
| Nav chevron | Drawer open | `rotate(-90deg)` → `rotate(0)`, fill #949494 → #95BEFC | `.15s ease-in` |
| Mobile hamburger | Click | Bars rotate into an X (±45°) | `.15s ease-in` |
| Footer "See more" | Click | Expands the list panel | `.15s ease-in` |
| Hero video pause button | Hover | bg #181D26 → rgba(4,14,32,.69) | `.15s cubic-bezier(.4,0,.2,1)` |
| Videos (hero, card 2, story) | Load | autoplay, muted, loop, playsinline | — |
| Hero text and other sections | Load / scroll | **None.** No load or scroll-reveal animations: `document.getAnimations()` was empty at load, and every below-the-fold element was at opacity 1 / transform none before scrolling. | — |

Notes:
- Section-level IntersectionObservers (`rootMargin:"0px 100px -30% 0px"`, threshold 0) exist on each `SectionGrid`. They only fire tracking; no visual change was observed.
- There's an IO with `rootMargin:"200px"` for image lazy-loading and link prefetch, and one with `rootMargin:"-100px"` on the customer-story carousel.
- With `prefers-reduced-motion: reduce`, the original drops the transitions.

## 12. Responsive summary
- **≥1664:** marquee `li` padding 24, drawer width `max(var(--mainNavWidth), 696px)`. Otherwise like desktop.
- **1024–1663 (measured 1280 and 1440):** layout as described; only the 12-column widths change. The drawer stays 650px.
- **900–1023:** not measured. The CSS switches the nav to the hamburger layout below 1024 (desktop toggles have `@media (min-width:1024px)` styles).
- **768–1023:** tab content stacks; the menu is a horizontal row. Bento uses the 12-column grid with gap 24, but images stay hidden below 1024.
- **<768 (measured 390):**
  - Side margins 24, grid gaps 24.
  - Hero h1 32/40, hero CTAs full width.
  - Logo heading padding 24, marquee padding-bottom 32.
  - Section h2s 24px.
  - Tab cards stack with a horizontal tab row; card 1 is 520px tall (max-height 520).
  - Bento is a single column, 16px gap, text always visible.
  - Resources: 1 column.
  - Story: padding 32, quote 24px.
  - CTA box: padding 40.
  - Footer: accordions.
  - Header: 144px (68px promo + 76px row).

## 13. Couldn't measure / caveats
- **Video frame rendering:** headless Chromium can't decode the HEVC hero and story videos, so the `<video>` element measured 1114×150 instead of filling its 16:9 box. Build it as `width:100%`, `object-fit:cover`, inside the 1114×627 container (the story video is absolutely positioned at 100%×100%).
- **Nested drawer panels** (Features, Integrations, Resources Hub, Templates, Developers, Support): text was captured from the DOM/saved HTML, but their opened geometry wasn't measured. The Playwright click on the nested toggle timed out because the element sat under the fixed drawer stack. They use the same row styles as the parent drawer.
- **900–1023 widths** weren't measured.
- **Cookie banner:** Transcend consent UI is in a closed shadow root. Opt-out was applied via `airgap.optOut()`. The banner itself is third-party and not part of the clone.
- **Third-party Qualified chat widget** (bottom-right orb) is excluded.
