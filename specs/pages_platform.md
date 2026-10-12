Source: https://www.airtable.com/platform (+ /platform/* sub-pages and https://airtable.com/pricing)

# Per-page section lists — /platform/*, /pricing

Type codes refer to `specs/SECTION_TYPES_platform.md`. Measured 2026-10-12 at 1440 and 390.

**Notation**
- `h` = section height in px at 1440 / 390.
- Word counts and line counts are for the placeholder copy; line counts are at 1440 unless noted.
- Labels of 4 words or fewer are the original's.
- "img W×H (r)" = rendered size at 1440 and aspect ratio. Use neutral placeholder blocks: `#F8F6F6` on light sections, `#2A2F38` on dark ones.

**Every page**
- Starts with the existing **Header** (121.3 / 144) and ends with the existing **Footer**.
- All family-A pages put the **Breadcrumb bar** (42px, `#F8FAFC`) between them and the first section, reading "Home › Platform › {Page}".
- /platform and /pricing have no breadcrumb.

---

## /platform — family B
Doc height 6657 / 7541. Title topic: the digital operations platform.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | **B1 PlatformHero** | 889 / 749 | Eyebrow "The Airtable Platform". h1: 2 block lines, 3 + 4 words, about humans and agents working together. Subhead 11 words. CTAs "Try it now" (primary) + "Book demo" (secondary). Media: product screenshot 1024×451 (2277:1003), radius 8/8/0/0. Pattern: Lottie bars at 5% opacity. |
| 2 | **B2 LogoGrid** | 180 / 137 | Heading ~7 words (trusted-by line). 6 logo cells of 73px, logos ≈52–100×18–28 (black). Mobile shows 2 cells. |
| 3 | **B3 TabPanels** | 877 / 950 | Intro h2: 9 words, 1 line, about org-wide workflows. 4 tabs: "Shared data", "Durable workflows", "Open surfaces", "Governance". Each panel: title 6–11 words + body 31–42 words. Media bgs in order: `#7A015C`, `#47008F`, `#004157`, `#7F1414` (916×700). Tab 3 includes an inset video block (729×410, r8). |
| 4 | **B4 IntegrationsSplit** | 567 / 530 | h2: 3 short block lines (3–4 words each) naming three tools/actions. Description 17 words. CTA "Explore integrations" + arrow. 4 strips × 6 logo tiles (100×100, logo 56). |
| 5 | **B5 CapabilitiesBento** | 1260 / 1827 | h2: 7 words, about the AI foundation. 4 link cards in 2×2 (671×542): titles 1–2 words, bodies 7–11 words, "Learn more" + arrow. Visual 670×360 per card (`#F8F6F6` placeholder). |
| 6 | **B6 CustomerStoriesSlider** | 828 / 490 | 6 slides. Each: logo (156×48 box), quote ~31 words (4 lines), name 2 words, role ~6 words, portrait visual 427×570. Autoplay 10s per slide. |
| 7 | **B7 ReadNextDark** | 695 / 1267 | h2: 6 words, about ways to start with agents. 3 cards; eyebrows "QUICK READ" (`#F797EF`), "AIRTABLE TEMPLATES" (`#FFCD05`), "WEBINAR" (`#35CBFD`). Titles 6–10 words. Art 447×271. |
| 8 | **B8 CtaBanner** | 596 / 485 | Headline 5 words (join-N-builders line), 2 lines at 64px. CTAs "Try it now" + "Book demo". Background `#012978` with `#AC59FF` bars. |

---

## /platform/ai — family A
Doc 6038 / 8773. Topic: AI built for how the business works.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 693 / 568 | h1 10 words / 2 lines. Subhead 15 words / 1 line. "Try it now" + "Book demo". Media: **video** 892×383 + play/pause. |
| 2 | A2 LogosFlip | 192 / 154 | Heading 10 words. 4 logos → 4 static cells at 1440 (no flip); 2 cells with flip at 390. Logo boxes 124–198 × 40. |
| 3 | A3 FeatureCards (3-up) | 409 / 841 | h2 8 words; subhead 11 words. 3 cards with 48px icon, title 5–6 words, body 11–20 words. No links. |
| 4 | A4 SideBySide **swapped** (img left) | 572 / 1068 | Badge "Omni". h2 6 words / 2 lines (48px). Body 28 words + 3 bullets (6–11 words). CTA "Explore app building". Img 591×443 (4:3). |
| 5 | A4 SideBySide (img right) | 572 / 932 | Badge "Field Agents". h2 6 words. Body 24 words + 3 bullets (5–9 words). CTA "Explore AI agents". Img 591×443. |
| 6 | A3 FeatureCards (**4-up**) | 585 / 1463 | h2 10 words; subhead 19 words. CTA "Explore AI Plays". 4 cards: icon, title 4–8 words (2 lines), body 16–21 words, TextLink "Try the play". |
| 7 | A3 FeatureCards (3-up) | 371 / 787 | h2 5 words, about trustworthy AI. No subhead. 3 cards: icon, title 4–5 words, body 17–30 words. |
| 8 | A5 FeatureCarousel | 756 / 738 | h2 5 words (resources and insights); subhead 12 words. CTA "Explore AI Plays". **7 unique cards** (looped to 14): badge (BLOG / SALES / MARKETING / OPERATIONS / PRODUCT, mixed colours), title 4–11 words, body 14–30 words, img 335×224. |
| 9 | A14 FaqAccordion | 556 / 612 | h2 6 words / 2 lines. 6 Q&As: questions 3–10 words, answers 20–30 words. First open. |
| 10 | A13 CtaBlocked | 527 / 463 | h2 7 words / 2 lines. "Try it now" + "Book demo". |

---

## /platform/ai-agents — family A
Doc 7767 / 7822. Topic: putting agents to work.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 659 / 531 | h1 8 words / 1 line. Subhead 25 words / 2 lines. "Try it now" + "Book demo". **Video** 892×383. |
| 2 | **A7 ScrollTabber** | 3490 / 2337 | Sticky title h2: 6 words, about agents that scale. **4 tabs/panels** with labels "01 Document analysis agents", "02 Web search agents", "03 Image generation agents", "04 …" (format "NN" + 2–3 words). Panels: title 6–9 words, body 16–29 words, one primary button each ("Try it now" / "Learn more" / "Explore AI Plays"), img 1063×595 (1000:560). |
| 3 | A5 FeatureCarousel | 699 / 696 | h2 9 words; no subhead. CTA "Explore AI Plays". **4 unique cards** (×2): badge "Marketing & creative" or "Operations", title 4–7 words, body 14–20 words, img 335×224. |
| 4 | A3 FeatureCards (3-up) | 371 / 812 | h2 9 words. 3 icon cards (title 4–5 words, body 17–30 words). Same trust trio as /ai §7. |
| 5 | A12 ReadNextDark | 523 / 1023 | h2 5 words. **3 cards**, no eyebrow, title 4–8 words / 1 line. Art 447×270. |
| 6 | A13 CtaBlocked | 582 / 573 | h2 12 words / 3 lines. "Sign up for free" + "Try it out". |
| 7 | A14 FaqAccordion | 637 / 701 | h2 6 words. **7** Q&As: questions 4–12 words, answers 17–35 words. |

---

## /platform/app-building — family A
Doc 7967 / 8313. Topic: Omni, the AI app builder.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 655 / 503 | h1 8 words / 2 lines. **No subhead.** "Try it now" + "Book demo". Video 892×383. |
| 2 | A7 ScrollTabber | 2665 / 1783 | Sticky h2 title. **3 panels** (labels "01 AI app building", …): title 3–6 words, body 19–28 words, button "Try it now" / "Learn more", img 1063×595. |
| 3 | A5 FeatureCarousel | 737 / 744 | h2 7 words; subhead 12 words. CTA "Explore AI Plays". **4 cards** (×2): badges "Marketing & Creative" / "Product", title 4–7 words, body 17–20 words. |
| 4 | A4 SideBySide (img right) | 477 / 705 | Badge "Ask Omni". h2 7 words / 2 lines. Body 28 words. No CTA. Img 591×348 (1280:753). |
| 5 | A9 IntegrationsMarquee | 564 / 362 | h2 6 words (integrate with your stack); subhead 18 words. Secondary button "View all integrations" →. 3 strips × 10 logo tiles. |
| 6 | A3 FeatureCards (3-up) | 371 / 787 | h2 4 words. Trust trio (icon, 4–5 / 17–30 words). |
| 7 | A12 ReadNextDark | 555 / 1096 | h2 5 words. 3 cards with eyebrow (1 word, e.g. "EBOOK"), title 3–6 words. Art 447×270. |
| 8 | A13 CtaBlocked | 582 / 573 | h2 12 words / 3 lines. "Sign up for free" + "Try it out". |
| 9 | A14 FaqAccordion | 556 / 612 | h2 6 words. 6 Q&As (questions 3–10 words, answers 20–30 words). |

---

## /platform/automations — family A
Doc 3847 / 4350. Topic: no-code automations.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 552 / 494 | h1 3 words / 1 line. Subhead 16 words. "Watch demo" (primary) + "Try it now" (secondary). **Image** 892×298 (1280:427). |
| 2 | A4 SideBySide **image-position bottom** | 833 / 551 | h2 7 words / 2 lines. Body 16 words. **Video** 1262×429, r8. |
| 3 | A4 SideBySide (right) | 572 / 678 | h2 4 words. Body 13 words. Img 591×443. |
| 4 | A4 SideBySide swapped (left) | 572 / 678 | h2 5 words. Body 14 words. Img 591×443. |
| 5 | A4 SideBySide (right) | 511 / 801 | h2 7 words / 2 lines. No body. "Sign up for free" + "Book demo". Img 591×382 (1280:827). (Acts as the page's closing CTA.) |

There's no FAQ or CTA block on this page.

---

## /platform/connected-data — family A
Doc 6047 / 7755. Topic: relational database at the core.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 923 / 640 | h1 5 words / 1 line. Subhead 11 words. "Book demo" (primary) + "Try it now" (secondary). Video **892×669 (4:3)**. |
| 2 | A4 SideBySide (right) | 572 / 739 | Badge "NEW". h2 6 words. Body 27 words. Img 591×443. |
| 3 | A4 swapped (left) | 572 / 694 | h2 5 words. Body 21 words. Img 591×443. |
| 4 | A4 (right) | 572 / 694 | h2 5 words. Body 24 words. Img 591×443. |
| 5 | A4 swapped (left) | 572 / 834 | h2 6 words. Body 22 words. CTA "Explore integrations". Img 591×443. |
| 6 | **A8 TabberSmallMedia** | 933 / 1224 | h2 7 words; subhead 8 words. **5 tabs**, each 224×210 with labels of 4–6 words wrapping to 2–4 lines (product roadmap / OKRs / feedback / assets / dates themes). Panel: subhead 5 words + copy. CTA "Watch the webinar". Media 814×458 (16:9). |
| 7 | A3 FeatureCards (**4-up**) | 513 / 1209 | Badge "Go beyond". h2 4 words; subhead 9 words. 4 cards: 48px icon, title 6 words, body 8–9 words, TextLinks "Explore Platform", "Explore Build", "Explore AI", "Explore Governance". |
| 8 | A13 CtaBlocked | 582 / 573 | h2 12 words / 3 lines. "Try it now" + "Book demo". |

---

## /platform/governance — family A
Doc 6927 / 8566. Topic: deploy, govern and scale.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 923 / 640 | h1 6 words / 1 line. Subhead 12 words. "Book demo" + "Try it now". Video 892×669. |
| 2 | **A10 Stats** (3/horizontal) | 532 / 675 | h2 5 words (results you can count on). 3 stats: values like "5+", "95%", "$2.6M" (use placeholder figures); labels 4–8 words each, ending in a parenthetical company name. |
| 3 | A4 swapped (left) | 572 / 742 | h2 7 words. **3 bullets only** (6–11 words). Img 591×443. |
| 4 | A4 (right) | 572 / 759 | h2 4 words / 2 lines. 3 bullets (10–11 words). Img 591×443. |
| 5 | A4 swapped (left) | 572 / 882 | h2 7 words. 3 bullets (8–10 words). CTA "Learn about security". Img 591×443. |
| 6 | A9 IntegrationsMarquee | 564 / 403 | h2 5 words; subhead 22 words. "View all integrations" →. |
| 7 | A4 (right) | 573 / 838 | h2 8 words. 3 bullets (8–11 words). CTA "Learn about our services". Img 591×444. |
| 8 | A5 FeatureCarousel | 761 / 766 | h2 7 words; subhead 16 words. CTA "Explore resources". **5 unique cards** (×2): badges "Whitepaper", "Customer Story", "Report", "Webinar", "Platform"; titles 3–9 words; bodies 14–21 words. |
| 9 | A3 FeatureCards (4-up) | 468 / 1140 | h2 4 words; subhead 9 words. 4 cards (icon, title 6 words, body 8–9 words — one card has no body). TextLinks "Explore Platform / Build / AI / Data". |
| 10 | A13 CtaBlocked | 582 / 573 | h2 12 words / 3 lines. "Try it now" + "Book demo". |

---

## /platform/hyperdb — family A
Doc 6044 / 6619. Topic: enterprise-scale data.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 1128 / 673 | h1 6 words / 1 line. Subhead 27 words / 2 lines. Single CTA "Book now" (primary). Image **892×852** (1280:1223, near-square). |
| 2 | A2 LogosFlip (no heading) | 89 / 89 | 5 logos → 5 cells at 1440 (static); 2 flipping cells at 390. Logo boxes 95–154×40. |
| 3 | A4 swapped (left) | 573 / 555 | **No h2** — body only, 46 words / 6 lines. Img 591×444. |
| 4 | A4 (right) | 572 / 678 | h2 5 words. Body 17 words. Img 591×443. |
| 5 | A4 swapped (left) | 555 / 857 | h2 8 words. Body 35 words. CTA "Learn more". Img 591×426. |
| 6 | A4 (right) | 572 / 774 | h2 5 words. Body 23 words. CTA "Learn more". Img 591×443. |
| 7 | A8 TabberSmallMedia | 829 / 936 | h2 7 words; subhead 11 words. **3 tabs** (448×106, labels of 3 words). Panel: subhead 3 words + strong copy of 15 words. CTA "Learn more". Media 814×458. |
| 8 | A14 FaqAccordion | 448 / 546 | h2 6 words. **4** Q&As (answers 12–34 words, some multi-paragraph). |
| 9 | A13 CtaBlocked | 472 / 362 | h2 7 words / **1 line**. Single CTA "Book demo". |

---

## /platform/interface-designer — family A
Doc 7081 / 7409. Topic: interface designer.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 692 / 551 | h1 6 words / 2 lines. Subhead 11 words. "Watch demo" + "Try it now". Image 892×382 (1280:548). |
| 2 | A4 image-position **bottom** | 945 / 578 | h2 8 words. Body 17 words. Img 1262×541 (1280:548), r8. |
| 3 | A4 swapped (left) | 572 / 678 | h2 6 words. Body 12 words. Img 591×443. |
| 4 | A4 (right) | 572 / 618 | h2 3 words / 1 line. Body 19 words. Img 591×443. |
| 5 | A4 swapped (left) | 572 / 738 | h2 8 words. Body 16 words. Img 591×443. |
| 6 | A4 (right) | 572 / 618 | h2 4 words. Body 16 words. Img 591×443. |
| 7 | **A11 TemplatesCarousel** (dark) | 925 / 471 | h2 5 words; subhead 6 words. **5 slides**: media 1342×637 each, overlay title ~11 words / 2 lines. Progress bars + arrows. No autoplay. |
| 8 | A3 FeatureCards (4-up) | 422 / 1018 | h2 5 words; subhead 14 words. 4 cards: icon, title 3–8 words, **no body**, TextLinks "Watch videos", "Read more", "Contact Support", … |
| 9 | A14 FaqAccordion | 475 / 555 | h2 4 words / 2 lines. **5** Q&As (answers 31–53 words). |
| 10 | A13 CtaBlocked | 527 / 436 | h2 10 words / 2 lines. Single CTA "Book demo". |

---

## /platform/portals — family A
Doc 7696 / 8189. Topic: sharing data with external users.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 904 / 660 | h1 9 words / 2 lines. Subhead 13 words. "Try it now" + "Book demo". Image 892×595 (1280:853). Plus the **decorative pattern image** full-bleed 1440×466 behind the media (opacity .05, `heroPattern` anim). |
| 2 | A2 LogosFlip (no heading) | 89 / 89 | 5 logos (same set size as hyperdb). |
| 3 | A4 swapped (left) | 573 / 678 | h2 5 words. Body 18 words. Img 591×444. |
| 4 | A4 (right) | 573 / 851 | h2 5 words. Body 15 words + 3 bullets (7–14 words). Img 591×444. |
| 5 | A4 swapped (left) | 573 / 791 | h2 5 words. Two paragraphs (7 and 18 words) + 2 bullets. Img 591×444. |
| 6 | A8 TabberSmallMedia | 876 / 1015 | h2 5 words; subhead 17 words / 2 lines. **4 tabs** 336×132: "Client portals", "Vendor management", "Customer support", "Partner relationship management". Panel subhead 2 words. CTA "View template". Media 814×458. |
| 7 | A4 image-position bottom | 944 / 594 | h2 6 words. Body 23 words. Img 1262×540. |
| 8 | A9 IntegrationsMarquee | 564 / 419 | h2 5 words; subhead 28 words / 3 lines. "View all integrations" →. |
| 9 | A14 FaqAccordion | 610 / 709 | h2 6 words. **6** Q&As; answers are long, some with lists (4–73 words per paragraph). |
| 10 | A13 CtaBlocked | 527 / 499 | h2 10 words / 2 lines. "Try it now" + "Book demo". |
| 11 | A12 ReadNextDark (**2-up**) | 658 / 734 | h2 3 words. **2 cards**, art 671×406 each, titles 5–6 words. Note it comes **after** the CTA on this page. |

---

## /platform/reporting — family A
Doc 4417 / 5239. Topic: flexible reporting.

| # | Type | h | Parameters |
|---|---|---|---|
| 1 | A1 HeroVertical | 552 / 493 | h1 7 words / 1 line. Subhead 21 words / 1 line. "Watch demo" + "Try it now". Image 892×297 (1280:426). |
| 2 | A4 image-position bottom | 832 / 567 | h2 5 words. Body 20 words. Video 1260×428, r8. |
| 3 | A4 (right) | 563 / 733 | h2 7 words. Body 18 words. Img 591×434. |
| 4 | A4 swapped (left) | 581 / 819 | h2 6 words / 3 lines. Body 19 words. Img 591×452. |
| 5 | A4 (right) | 572 / 738 | h2 5 words. Body 17 words. Img 591×443. |
| 6 | A4 swapped (left) | 511 / 741 | h2 5 words. No body. "Try it now" + "Book demo". Img 591×382. (Closing CTA, as on automations.) |

---

## /pricing — family C (https://airtable.com/pricing)
Doc 8656 / 6173. Content column 1250 wide at 1440 (x 95–1345); 326 at 390.

| # | Type | y / h @1440 | Parameters |
|---|---|---|---|
| 1 | C1 PricingTitle | 217 / 120 | h1 6 words (a plan for every organization). 3 lines at 390. |
| 2 | C2 PlanCards (desktop) / C2m (mobile, 3365 tall) | 337 / 1007 | 4 plans: "Free", "Team" (Most popular, highlighted blue), "Business", "Enterprise Scale". Descriptions 9–13 words. Prices: Free (text), $20 / $45 USD (per seat/month billed annually; monthly $24 / $54), Enterprise "Custom pricing" + 60×50 icon. CTAs: "Try for free" (outline), "Try for free" (filled blue), "Purchase now" (outline), "Contact Sales" (outline). Secondary links "or purchase now", "or contact sales" on Team and Business. Feature lists: 7 / 8+1 add-on / 12+add-ons / ~12 rows of 2–9 words. Use placeholder plan names and prices if desired; keep the 4-column structure. |
| 3 | C3 SeeAllFeaturesLink | 1344 / 108 | "See all features and compare plans" + down arrow (desktop only). |
| 4 | C4 LogoStrip | 1452 / 371 | Eyebrow 6 words. Wide logo-strip placeholder 1152×58 (mobile 326×61). |
| 5 | C5 ComparisonTable | 1822 / 5497 | Desktop only. Sticky head (plan names + 4 CTAs). **16 groups**, row counts 10, 10, 6, 5, 6, 4, 2, 5, 7, 5, 6, 3, 10, 10, 4, 5 (99 feature rows × 36px). First group "Fundamentals" (1 word); other group titles 1–3 words. Cells: 186 check icons, 7 plus icons, ~199 empty, the rest short text values. 5 footnotes (10–28 words). |
| 6 | C6 HelpLinks | 7383 / 131 | h2 3 words. 3 columns: eyebrow "BILLING / PRICING" + link "Billing FAQ", and two more eyebrow+link pairs. |
| 7 | C7 PricingFaq | 7578 / 450 | h2 "Frequently asked questions". **7** questions of 5–8 words; answers 1–5 paragraphs, 16/24. |

---

## Template sharing summary

| Template | Pages | Recipe |
|---|---|---|
| **"Feature stack"** | automations, reporting, interface-designer, connected-data, hyperdb, portals, governance | A1 hero → A4 side-by-side ×4–5, alternating right/left; often starting with a *bottom* variant → [A8 tabber or A10 stats or A11 templates] → [A3 cards] → [A14 FAQ] → [A13 CTA]. |
| **"AI / product"** | ai, ai-agents, app-building | A1 hero (video) → A7 scroll tabber, or A3 cards + A4 pair → A5 carousel → A3 trust cards → A12 read-next → A13 CTA → A14 FAQ. ai-agents and app-building are structurally identical except that app-building adds A4 + A9 after the carousel and has no hero subhead. |
| **/platform** | /platform | Unique landing. Reuses A2, A3, A9, A12 and A13 with the B overrides; B1, B3 and B6 are new. |
| **/pricing** | /pricing | Standalone family C. |

Distinct components to build: A1–A5, A7–A14 (13), plus B1, B3, B6 (3 new for /platform), plus C1–C7 (pricing). The B2/B4/B5/B7/B8 variants are props on A2/A9/A3/A12/A13.
