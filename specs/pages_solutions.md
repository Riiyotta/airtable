Source: https://www.airtable.com/

# Per-page build specs — Solutions / Resources / Company pages

This file gives section order and per-section data for each route. Type IDs (BK-n, S-n, E-n, T-1) and primitives are defined in `specs/SECTION_TYPES_solutions.md`. Header/Footer and homepage tokens are in `CLONE_SPEC.md`.

**Measurement**
- Measured 2026-10-12 at 1440×900 and 390×900.
- `y` is the document offset at 1440; `h` is the section height at 1440 [390 in brackets].
- Text is described by role, length and a neutral topic only. The clone writes its own copy.
- "Words / lines" are measured at the given width.

**Placeholder media**
- Every image or video slot is a neutral block of the stated size, ratio and radius.
- Fill: `#E0E2E6` on light sections; `#2A2F38` on dark sections.

Each page shows its system (BK / SEASON / PLATFORM-E / TPL) and its Header/Footer `font` prop.

---

## 1. `/solutions` — BK, font `haas`
Page height 7840 [8829].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | 2 crumbs: "Home" › current page label |
| 1 | 163 / 261.2 [353] | **`Hero`** (homepage) with `video={false}` | h1 (5 words, 1 line) about empowering every team; sub (16 words, 1 line) about customizing workflows. CTAs: primary (2–3 words) → webinar placeholder link; outline "Contact sales"-style (2 words). |
| 2 | 424 / 1005 [2211.5] | BK-2 IconCardGrid | eyebrow pill (1 word, the section name); h2 (10 words, 1 line) about building any workflow; p (17 words, 1 line). **8 cards** in 3+3+2 order: icon + team name (2 words) + description (9–10 words, 2 lines) + link "Explore <Team>" (2 words). Card subjects are team names (first two: Marketing, Product; the rest were collapsed in extraction) — use 8 placeholder team names. |
| 3 | 1429 / 920 [805] | BK-3 MediaTextRow, text **left** | h2 "Solutions for <Team> teams" pattern (4 words); p (15 words, 2 lines); link (3 words); media 680×680 |
| 4 | 2349 / 920 [773] | BK-3, media **left** | same pattern (16 words) |
| 5 | 3269 / 920 [836] | BK-3, text left | h2 wraps to 2 lines (4 words, 100 tall); p 16 words |
| 6 | 4189 / 920 [805] | BK-3, media left | p 16 words |
| 7 | 5109 / 920 [805] | BK-3, text left | p 18 words, **3 lines** |
| 8 | 6029 / 920 [805] | BK-3, media left | p about 16 words |
| 9 | 6949 / 247.6 [286] | **`CtaBox variant="row"`**, bg `#FFFFFF` | h2 (5 words) "start building"-style; 1 primary button (2 words) |

**Motion:** none besides the hover states in the types.

---

## 2. `/solutions/marketing` — SEASON, font `season`
Page height 7557 [9023].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | Home › Solutions › current |
| 1 | 164 / 877.8 [664.4] | S-1 SeasonHero **with media** | badge (3 words); h1 (8 words, 2 lines) about scaling marketing ideas; subhead (20 words, 2 lines); primary "Try it now"-style (3 words) + secondary (2 words); media 892×501.8 video placeholder + pause |
| 2 | 1041 / 191.6 [154.2] | S-2 SeasonLogoCells | heading (2 words, "Trusted by"-style); **6** logo cells |
| 3 | 1233 / 702.6 [1395.3] | S-3 SeasonCardGrid (media cards) | badge (2 words); h2 (4 words, 1 line); subhead (23 words, 2 lines). **3 cards:** title (3–4 words) + body (13–17 words, 2–3 lines) + media 446×299 (448:300) |
| 4 | 1935 / 895 [1277.6] | S-4 SeasonTabber `labels`, **4 tabs** | badge (2 words); h2 (8 words, 1 line); subhead (34 words, 2 lines). Tab labels: 1–2 words, the stages of a campaign lifecycle. Panel: subhead (4 words) + 3 items (strong 3–4 words; p 14–18 words, 2 lines) + primary button (3 words); media 814×457.9 (16:9) |
| 5 | 2830 / 969.5 [532.3] | S-6 SeasonCarousel (dark) | inverse badge (4 words); h2 (7 words, 1 line); subhead (14 words, 1 line). **5 slides**: overlay title (4 words) + "Explore"; slide media 1342×637 |
| 6 | 3800 / 564 [419.3] | S-7 SeasonIntegrations | h2 (6 words, 1 line); subhead (21 words, 2 lines); secondary button with arrow (3 words). Marquee: 3 strips × 8 logo cells |
| 7 | 4364 / 766.9 [1047.9] | S-4 SeasonTabber `logos`, **3 tabs**, headline-only title | h2 (6 words, 1 line). Tabs = 3 customer-logo placeholders (109.8×34). Panel: quote (21 words, 3 lines) + attribution (12 words, 2 lines) + primary (3 words, "read story"-style); media 814×457.9 |
| 8 | 5131 / 546.8 [1071.8] | S-8 SeasonReadNext | h2 (5 words) "resources to explore"-style. **3 dark cards:** titles 8–10 words, 2 lines; art 448:271 |
| 9 | 5678 / 527 [462.6] | S-9 SeasonCtaBanner | h2 at hero size (6 words, **2 lines**); primary (3 words) + secondary (2 words) |
| 10 | 6205 / 709.5 [848.9] | S-10 SeasonFaq | h2 "FAQ" (3 words, 2 lines). **7 questions** (7–14 words each); the first is open with 2 paragraphs (35 + 43 words) |

---

## 3. `/solutions/product` — SEASON, font `season`
Same template as marketing. Page height 7125 [8825].

| # | y / h | Type | Data / differences from marketing |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | |
| 1 | 164 / 877.8* [595] | S-1 with media | badge (3 words); h1 (9 words, 2 lines) about the product operating model; subhead (25 words, 2 lines). *Measured 526 because the headless video failed to decode. Build it with the 892×501.8 media box (877.8 total). |
| 2 | 690 / 191.6 [154.2] | S-2 | as marketing |
| 3 | 881 / 702.6 [1414.2] | S-3 media cards | h2 (5 words); subhead (24 words, 2 lines); 3 cards: title 4 words, body 17–20 words |
| 4 | 1584 / **921** [1366] | S-4 `labels`, **5 tabs** | h2 (10 words, 1 line); subhead (23 words). Labels are 2–4 words and **wrap to 2 lines** → tab list 134 tall, each trigger 268.6 wide. Panel: subhead (6 words) + 3 items (p 13–19 words) |
| 5 | 2505 / 969.5 [532.3] | S-6 carousel | subhead 9 words; overlay title 5 words |
| 6 | 3474 / 564 [394.3] | S-7 integrations | h2 3 words; subhead 28 words |
| 7 | 4038 / 766.9 [892.2] | S-4 `logos`, 3 tabs | h2 8 words; quote 29 words, 4 lines; attribution 8 words |
| 8 | 4805 / 546.8 [1071.8] | S-8 ReadNext | card titles 8–14 words, 2 lines |
| 9 | 5352 / **471.8** [425.8] | S-9 CtaBanner | h2 **4 words, 1 line** (card 214.8 tall) |
| 10 | 5824 / 657.9 [830.3] | S-10 Faq | first answer is 3 paragraphs (46 / 58 / 21 words) |

---

## 4. `/solutions/operations` — SEASON, font `season`
Same template minus the carousel. Page height 6498 [8393].

| # | y / h | Type | Data / differences |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | |
| 1 | 164 / 877.8 [701.2] | S-1 with media | badge (4 words); h1 (9 words, 2 lines); subhead (21 words) |
| 2 | 1041 / 191.6 [154.2] | S-2 | |
| 3 | 1233 / 702.6 [1455.4] | S-3 media cards | h2 (8 words, 1 line); subhead (31 words); card titles 2–4 words; bodies 15–19 words |
| 4 | 1935 / 895 [1173] | S-4 `labels`, **3 tabs** | h2 (8 words); subhead (26 words); labels 2 words; items: strong 2–4 words, p 8–12 words |
| — | — | *(no S-6 carousel)* | |
| 5 | 2830 / 564 [394.3] | S-7 integrations | h2 4 words; subhead 27 words |
| 6 | 3394 / 766.9 [1047.9] | S-4 `logos`, 3 tabs | h2 7 words; quote 24 words, 3 lines; attribution 12 words |
| 7 | 4161 / 546.8 [1071.8] | S-8 ReadNext | titles 6–10 words |
| 8 | 4708 / 471.8 [462.6] | S-9 CtaBanner | h2 6 words, 1 line |
| 9 | 5180 / 674.6 [783.9] | S-10 Faq | first answer 53 words |

---

## 5. `/about` — SEASON, font `season`
No breadcrumb. Page height 4764 [5576].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 341.5 [439.6] | S-1 SeasonHero, **no media** | badge (2 words); h1 (4 words, 1 line) about ideas becoming infrastructure; subhead (**48 words, 3 lines**) about the company origin; primary (3 words) + secondary (2 words, careers-style) |
| 1 | 463 / 867.8 [804.5] | S-5 SeasonMediaSplit (text right, image left) | badge (2 words); h2 (10 words, 2 lines) about the purpose; body (50 words, 4 lines); image 591×738.8 (4:5), radius 4 |
| 2 | 1331 / 191.6 [154.2] | S-2 SeasonLogoCells | as the solution pages |
| 3 | 1522 / 261.2 [438.5] | S-3 **stat cards** (no media), headline-only title | h2 (5 words) about the customer count. 3 cells: figure (1 token, e.g. "NN M+") + label (2–4 words) |
| 4 | 1783 / 352.1 [730] | S-3 **icon cards** (48×48 icon, no media), headline-only title | h2 (6 words). 3 cells: customer name (1–2 words) + body (13–14 words, 2 lines) |
| 5 | 2135 / 895 [1168.4] | S-4 `labels`, **5 tabs** | badge (3 words); h2 (7 words) about people and offices; subhead (32 words). Tabs = 5 office locations (1–3 words). Panel: subhead (location name) + 1 item (strong = street-address-like 5 words; p = city line 4 words) + primary (3–4 words); media 814×457.9 image |
| 6 | 3030 / 564 [298.6] | S-7 SeasonIntegrations, "awards" variant | h2 only (2 words), no subhead, no button; strips show award-badge placeholders |
| 7 | 3594 / 527 [435.8] | S-9 SeasonCtaBanner | h2 (11 words, 2 lines [4 lines mobile]); primary only (3 words) |

There is no FAQ on this page.

---

## 6. `/solutions/enterprise` — PLATFORM-E, font `season`
No breadcrumb. Page height 7210 [8881].

E-1, E-2, E-7, E-8 and E-10 are `/platform` modules. Use `specs/SECTION_TYPES_platform.md` definitions if present, fed with this data.

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 1239.8 [786.9] | E-1 PlatformHero (`copyAboveVideo`) | eyebrow (3 words); h1 2 explicit lines (5 + 4 words) about one system of record; Haas subheading (20 words, 2 lines); primary (button, about 3 words) + secondary (2 words, "contact"-style); video 1342×754.9 |
| 1 | 1361 / 180.3 [204.6] | E-2 LogoBarCycle | heading (7 words); 5 cycling logo cells |
| 2 | 1541 / 525.2 [1670.2] | E-3 UseCaseCards | h2 (5 words); CTA (2 words). **4 cards:** title 1–3 words over 2 lines; body 14–18 words; "Learn more"; proof logo + metric (5–7 words). Accent colors `#6F9FFF`, `#FFA244`, `#ACEA48`, `#FFD755` |
| 3 | 2067 / 714.2 [1412.4] | E-4 AiFoundationBento | h2 2 lines (4 + 3 words). 3 cells: title (3 words) + body (17–20 words) + visual 448:315; the 3rd cell is a 2-layer stack |
| 4 | 2781 / 743 [631.1] | E-5 OrgAccordion | h2 3 lines (4 + 3 + 1 words). **3 items:** titles 2–3 words; active item has 3 check rows (8–12 words) |
| 5 | 3524 / 595 [849.4] | E-6 HacSplit (dark `#161616` + visual `#57003E`) | h2 (13 words, 3 lines); 2 check rows (14 and 19 words); white CTA (3 words + arrow); visual image 400×517.5 |
| 6 | 4119 / 564 [536.6] | E-7 PlatformIntegrations | h2 2 lines (4 + 3 words); description (24 words, 3 lines); outline CTA (3 words + arrow); 4 vertical strips × 12 logo cells |
| 7 | 4683 / 828 [561.4] | E-8 CustomerStoriesCarousel | **4 slides** (4 progress bars). Each: logo; quote (36 words, 4 lines); name (2 words) + role (5 words); CTA (3 words); visual 427×570 |
| 8 | 5511 / 596 [539.9] | E-9 CtaBannerStatic (`#004801` + pattern) | h2 2 lines (4 + 4 words) at 64/70.4; primary + secondary |
| 9 | 6107 / 459.7 [581.9] | E-10 FaqSection | h2 (3 words, 2 lines). **3 questions** (10–12 words); the first is open (43 words, 3 lines) |

---

## 7. `/integrations` — BK, font `haas`
Page height 4901 [12540].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | Home › current |
| 1 | 163 / 192 [235.6] | BK-1 PageHeroSplit `light` | h1 (3 words, 1 line) about connecting data; description (18 words, 2 lines) |
| 2 | 403 / 3607.5 [10837.9] | BK-4 FilterListing | **Featured:** header "Featured Integrations" (2 words); 3 ResourceCards `imageTop` + gray pill (category, 1–2 words) + title (5–6 words, 1 line), no description. **Filter:** 1 group "Category" with **13 options** (1–2 words each) + "Clear all". **Grid:** header (2 words); **27 cards** (pill + title of 1–2 words, e.g. app names → use neutral "App N"); rows 304.7 |

Page bottom: `main` padding 64, then the footer. There is no CTA section.

---

## 8. `/ai-plays` — BK, font `haas`
Page height 3076 [7017].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | |
| 1 | 163 / 240 [317.8] | BK-1 PageHeroSplit **`dark`** (`#1F0C3B`) | h1 (8 words, 2 lines) about high-impact AI workflows; description (13 words, 1 line), white |
| 2 | 427 / 2005.3 [5527.2] | BK-4 FilterListing | **Featured:** no section header; 3 ResourceCards **`imageBottom`** + colored pill with 20px icon + title (6–7 words, 1–2 lines) + description (17 words, 2–3 lines); card 466.7 tall; row-gap 48. **Filter:** group "Category" (4 options: Operations, Marketing & Creative, Digital Product, Physical Product) and group "AI Feature" (6 options, 2 words each). **Grid:** header "AI Plays"; **9 cards** (3×3; title 4 words, 2 lines; description 16–20 words, 3–4 lines); rows 409.9, gap 48/32 |

There is no CTA section.

---

## 9. `/customer-stories` — BK, font `haas`
Page height 4124 [7310].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | |
| 1 | 163 / 851.8 [630.9] | BK-6 HeroCarouselCentered | h1 (2 words, gray, 32/40); h2 (5 words, 40/48 weight 500) about inspiring customer stories; **3 slides** of 876×492.75 media (radius 20); 3 progress dots; autoplay 4s |
| 2 | 1063 / 190.9 [150.2] | **`LogoBar variant="static"`** | heading (5 words, opacity .7); **4 logos**, 168×52 |
| 3 | 1278 / 1955.8 [5046.1] | BK-5 CardGridLoadMore | **12 cards** (4 rows × 3): logo eyebrow (120×36) + title (9–10 words, 2 lines); then a "Load more" outline button |
| 4 | 3234 / 247.6 [286] | **`CtaBox variant="row"`**, bg **`#F0F6FF`** | h2 (7 words, 1 line; it's an `h1` tag on the original); 1 primary button (about 3 words) |

---

## 10. `/guides` — BK, font `haas`
Page height 3234 [6003].

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 121 / 42.2 | BreadcrumbBar | |
| 1 | 163 / 763.2 [1151.4] | BK-7 GuidesBanner (`#181D26`) | h1 (7 words, 2 lines) about leveling up skills; subtitle (18 words, 3 lines); label "Quick Start" (2 words, uppercase); **8 outline-white buttons** (1–3 words: the guide topics); strip of **3 images**, each with caption "Featured" + title (4 words) |
| 2 | 926 / 1416.4 [3448.6] | BK-8 SidebarNavGrid | Sidebar "Topics" with **8 links** (the same 8 topics, 2–4 words). Main "Browse": **8 ResourceCards** `imageTop` + meta eyebrow ("Guide" · "N articles") + title (2–4 words) + description (17–22 words, 3–4 lines); cards 320×386 |

There is no CTA section.

---

## 11. `/contact-sales` — BK, font `haas` (form non-functional)
Page height 1724 with the form loaded (1487 with the skeleton) [2627]. No breadcrumb.

| # | y / h | Type | Data |
|---|---|---|---|
| 0 | 185 / 533 (left) + 595–783 (right card) | BK-9 ContactSalesSplit | **Left:** h1 (5 words, 1 line, 48/60 weight 600) "get in touch"-style; paragraph (29 words, 3 lines); 3 bullets (8–9 words, each 1 line) of customer proof points; trust line (7 words) + 4 logos 24px tall; support line (9 words) with a 2-word underlined link. **Right:** sticky card, h2 (4 words) + the form rows from BK-9, consent text (about 32 words) and Submit |

**Form field labels** (≤4 words, may be used as-is; all required, each with a red asterisk):
- First Name
- Last Name
- Work Email
- Phone Number
- Company Name
- Job Title
- Country
- How can our team help?
- How are you looking to use Airtable?

---

## 12. `/templates` — TPL, font `haas`
No breadcrumb. Page height 18709 [55820].

| # | Block | Data |
|---|---|---|
| 0 | Page header (pt 40, pb 32) | h1 (1 word, 64/80 weight 700); p (6 words, 1 line) |
| 1 | Aside (sticky, 224) | search pill input (placeholder "Search templates"). Groups: "By Use Case" (9 links), "By Industry" (6 links), "By Feature" (4 links); link labels 1–3 words. Footer pill "Browse Universe →" + caption (3 words) |
| 2 | Category tiles | **5 tiles** (icon 40 + label of 1–2 words) |
| 3 | "Featured templates" | **4 gradient cards** (420×215); title 3–4 words; image right half |
| 4–23 | **20 category sections** | Each: h2 (2–5 words, "<Category> templates"-style) + "View all", then **6 template cards** (title 3–5 words; description 40–46 words, clamped to 3 lines; some show the "AI" badge). The first section is "New templates". |

**Card total:** 116 template cards. For the clone, consider rendering the first few sections at full fidelity and repeating the section component with placeholder data.

---

## 13. Pages sharing a template (build once, feed data)

| Template | Pages | Notes |
|---|---|---|
| **SEASON solution template**: Breadcrumb → S-1 (media) → S-2 → S-3 → S-4 labels → [S-6] → S-7 → S-4 logos → S-8 → S-9 → S-10 | `/solutions/marketing`, `/solutions/product`, `/solutions/operations` | Identical order. Operations omits S-6. Tab counts 4 / 5 / 3. |
| SEASON blocks, different order | `/about` | Uses S-1 (no media), S-5, S-2, S-3 ×2 (stat/icon variants), S-4, S-7 (awards), S-9. No breadcrumb, no FAQ. |
| **BK FilterListing template**: Breadcrumb → BK-1 → BK-4 | `/integrations`, `/ai-plays` | Differences: hero theme (light/dark), card layout (imageTop/imageBottom), description on/off, filter groups. |
| BK resource hubs | `/customer-stories`, `/guides` | Both use ResourceCard grids. Customer stories adds BK-6 + static LogoBar + CtaBox row; guides adds BK-7 + BK-8. |
| PLATFORM-E | `/solutions/enterprise` | Shares modules with `/platform` (E-1, E-2, E-7, E-8, E-10, probably E-9). |
| BK homepage-component pages | `/solutions` | Hero (no video) + BK-2 + 6×BK-3 + CtaBox row. |
| Standalone | `/contact-sales`, `/templates` | |
