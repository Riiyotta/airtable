# Local clone of https://www.airtable.com/ (homepage "All your teams, all their workflows" A/B variant) at /Users/riyaghosh/V3/airtable

Source: Local clone of https://www.airtable.com/ (homepage "All your teams, all their workflows" A/B variant) at /Users/riyaghosh/V3/airtable
Status: **measured-from-codebase** · production approved: **false**
84 routes · 23 templates · 64 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Stub (linked, not built), Filter listing (integrations / AI plays), Feature stack: hero + side-by-side rows only) account for 63 of 84 routes (75%). The remaining 21 routes span 20 templates.

| template | routes | share |
|---|---:|---:|
| Stub (linked, not built) | 59 | 70% |
| Filter listing (integrations / AI plays) | 2 | 2% |
| Feature stack: hero + side-by-side rows only | 2 | 2% |
| Team solution page (with templates carousel) | 2 | 2% |
| Homepage | 1 | 1% |
| Solutions hub | 1 | 1% |
| Customer stories listing | 1 | 1% |
| Guides hub | 1 | 1% |
| Contact sales | 1 | 1% |
| Platform landing (B family) | 1 | 1% |
| Platform AI page | 1 | 1% |
| Platform AI agents (scroll-tabber) | 1 | 1% |
| Platform app building (scroll-tabber + integrations) | 1 | 1% |
| Feature stack + tabber + cards | 1 | 1% |
| Feature stack + stats + integrations + carousel | 1 | 1% |
| Feature stack + logos + tabber + FAQ | 1 | 1% |
| Feature stack + templates carousel + cards + FAQ | 1 | 1% |
| Feature stack + logos + tabber + integrations + read next | 1 | 1% |
| Team solution page (no templates carousel) | 1 | 1% |
| Enterprise solution (PLATFORM-E) | 1 | 1% |
| About | 1 | 1% |
| Pricing | 1 | 1% |
| Templates gallery | 1 | 1% |

## Page chrome

**67 routes carry chrome = `default`** — Homepage, Solutions hub, Filter listing (integrations / AI plays), Customer stories listing, Guides hub, Contact sales, Templates gallery, Stub (linked, not built).

**16 routes carry chrome = `season`** — Platform landing (B family), Platform AI page, Platform AI agents (scroll-tabber), Platform app building (scroll-tabber + integrations), Feature stack: hero + side-by-side rows only, Feature stack + tabber + cards, Feature stack + stats + integrations + carousel, Feature stack + logos + tabber + FAQ, Feature stack + templates carousel + cards + FAQ, Feature stack + logos + tabber + integrations + read next, Team solution page (with templates carousel), Team solution page (no templates carousel), Enterprise solution (PLATFORM-E), About.

**1 routes carry chrome = `pricing-footer`** — Pricing.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.promo-bar` | SHELL | 23 | 84 | `src/components/Header.jsx` | Every route (part of the shared header). |
| `shell.header` | SHELL | 23 | 84 | `src/components/Header.jsx` | Every route; restyled to ATSeasonSans via [data-font=season] on the Season-system routes. |
| `shell.footer` | SHELL | 23 | 84 | `src/components/Footer.jsx` | Every route; ATSeasonSans weights on Season routes, system-font "pricing" variant on /pricing. |
| `commerce.cta-box` | COMMERCE | 2 | 60 | `src/components/CtaBox.jsx` | Homepage and every stub route. |
| `shell.stub-notice` | SHELL | 1 | 59 | `src/pages/StubPage.jsx` | Every linked route that has no built page. |
| `hero.season` | HERO | 12 | 14 | `src/season/components/heroes.jsx > Hero` | Season platform sub-pages, team solution pages and /about. |
| `shell.breadcrumb-season` | SHELL | 11 | 13 | `src/season/components/heroes.jsx > Breadcrumb` | Season routes that open with a breadcrumb (platform sub-pages and team solution pages). |
| `commerce.cta-banner` | COMMERCE | 11 | 12 | `src/season/components/blocks.jsx > CtaBanner` | Season sub-pages with a closing CTA. |
| `features.card-grid` | FEATURES | 9 | 10 | `src/season/components/CardGrid.jsx` | Season pages with a feature card grid. |
| `features.side-by-side` | FEATURES | 9 | 10 | `src/season/components/SideBySide.jsx` | The 10 Season routes built from feature rows: the 7 feature-stack platform pages plus /platform/ai, /platform/app-building and /about. |
| `content.faq` | CONTENT | 9 | 10 | `src/season/components/blocks.jsx > Faq` | Season pages with an FAQ. |
| `proof.logo-cells` | PROOF | 6 | 7 | `src/season/components/LogoCells.jsx` | Season sub-pages that show a customer-logo row. |
| `features.tabber` | FEATURES | 6 | 7 | `src/season/components/Tabber.jsx` | Season pages with a tabbed feature explainer. |
| `features.integrations-marquee` | FEATURES | 6 | 7 | `src/season/components/Integrations.jsx` | Season pages with an integrations block. |
| `content.read-next` | CONTENT | 5 | 6 | `src/season/components/blocks.jsx > ReadNext` | Season sub-pages with related reading. |
| `shell.breadcrumb-bk` | SHELL | 4 | 5 | `src/bk/BreadcrumbBar.jsx` | The 5 BK listing/marketing sub-pages that open with a breadcrumb. |
| `commerce.cta-row` | COMMERCE | 4 | 5 | `src/bk/BkCtaRow.jsx` | The 5 BK sub-pages /solutions, /integrations, /ai-plays, /customer-stories and /guides. |
| `features.feature-carousel` | FEATURES | 4 | 4 | `src/season/components/FeatureCarousel.jsx` | Season AI/product and governance pages. |
| `proof.logo-tabber` | PROOF | 2 | 3 | `src/season/components/Tabber.jsx (tabs=logos)` | Team solution pages (marketing, product, operations). |
| `content.templates-carousel` | CONTENT | 2 | 3 | `src/season/components/blocks.jsx > TemplatesCarousel` | Season pages that promote templates. |
| `hero.platform` | HERO | 2 | 2 | `src/season/components/heroes.jsx > PlatformHero` | /platform and /solutions/enterprise. |
| `proof.logo-row-b` | PROOF | 2 | 2 | `src/season/components/LogoCells.jsx (skin b)` | /platform and /solutions/enterprise. |
| `features.scroll-tabber` | FEATURES | 2 | 2 | `src/season/components/ScrollTabber.jsx` | /platform/ai-agents and /platform/app-building. |
| `features.integrations-grid-b` | FEATURES | 2 | 2 | `src/season/components/Integrations.jsx (variant b)` | /platform and /solutions/enterprise. |
| `commerce.cta-banner-b` | COMMERCE | 2 | 2 | `src/season/components/blocks.jsx > CtaBanner (variant b)` | /platform and /solutions/enterprise. |
| `proof.stories-slider` | PROOF | 2 | 2 | `src/season/components/platformB.jsx > Stories` | /platform and /solutions/enterprise. |
| `hero.page-split` | HERO | 1 | 2 | `src/bk/PageHeroSplit.jsx` | /integrations (light) and /ai-plays (dark). |
| `content.filter-listing` | CONTENT | 1 | 2 | `src/bk/FilterListing.jsx` | /integrations and /ai-plays. |
| `hero.home-video` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only. |
| `proof.logo-marquee` | PROOF | 1 | 1 | `src/components/LogoBar.jsx` | Homepage only. |
| `features.workflow-tabs` | FEATURES | 1 | 1 | `src/components/Workflows.jsx` | Homepage only. |
| `features.ai-plays-bento` | FEATURES | 1 | 1 | `src/components/AIPlays.jsx` | Homepage only. |
| `content.resource-cards` | CONTENT | 1 | 1 | `src/components/Resources.jsx` | Homepage only. |
| `proof.customer-story-video` | PROOF | 1 | 1 | `src/components/CustomerStory.jsx` | Homepage only. |
| `hero.solutions-centered` | HERO | 1 | 1 | `src/components/Hero.jsx (video={false})` | /solutions only. |
| `features.team-icon-cards` | FEATURES | 1 | 1 | `src/bk/IconCardGrid.jsx` | /solutions only. |
| `features.media-text-rows` | FEATURES | 1 | 1 | `src/bk/MediaTextRow.jsx` | /solutions only. |
| `hero.story-carousel` | HERO | 1 | 1 | `src/bk/HeroCarouselCentered.jsx` | /customer-stories only. |
| `proof.logo-strip` | PROOF | 1 | 1 | `src/bk/BkLogoStrip.jsx` | /customer-stories only. |
| `content.card-grid-load-more` | CONTENT | 1 | 1 | `src/bk/CardGridLoadMore.jsx` | /customer-stories only. |
| `hero.guides-banner` | HERO | 1 | 1 | `src/bk/GuidesBanner.jsx` | /guides only. |
| `content.sidebar-nav-grid` | CONTENT | 1 | 1 | `src/bk/SidebarNavGrid.jsx` | /guides only. |
| `commerce.contact-sales-split` | COMMERCE | 1 | 1 | `src/bk/ContactSalesSplit.jsx` | /contact-sales only. |
| `features.ai-bento` | FEATURES | 1 | 1 | `src/season/components/CardGrid.jsx (variant bento)` | /platform only. |
| `proof.stats` | PROOF | 1 | 1 | `src/season/components/blocks.jsx > Stats` | /platform/governance only. |
| `content.read-next-b` | CONTENT | 1 | 1 | `src/season/components/blocks.jsx > ReadNext (variant b)` | /platform only. |
| `features.tab-panels` | FEATURES | 1 | 1 | `src/season/components/platformB.jsx > TabPanels` | /platform only. |
| `features.use-case-cards` | FEATURES | 1 | 1 | `src/season/components/platformB.jsx > UseCaseCards` | /solutions/enterprise only. |
| `features.ai-foundation` | FEATURES | 1 | 1 | `src/season/components/platformB.jsx > AiFoundation` | /solutions/enterprise only. |
| `features.org-accordion` | FEATURES | 1 | 1 | `src/season/components/platformB.jsx > OrgAccordion` | /solutions/enterprise only. |
| `features.hac-split` | FEATURES | 1 | 1 | `src/season/components/platformB.jsx > HacSplit` | /solutions/enterprise only. |
| `hero.pricing-title` | HERO | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C1)` | /pricing only. |
| `commerce.plan-cards` | COMMERCE | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C2)` | /pricing only. |
| `commerce.see-all-features` | COMMERCE | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C3)` | /pricing only. |
| `proof.pricing-logo-strip` | PROOF | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C4)` | /pricing only. |
| `commerce.comparison-table` | COMMERCE | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C5)` | /pricing only. |
| `content.help-links` | CONTENT | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C6)` | /pricing only. |
| `content.pricing-faq` | CONTENT | 1 | 1 | `src/standalone/pricing/Pricing.jsx (C7)` | /pricing only. |
| `hero.templates-head` | HERO | 1 | 1 | `src/standalone/templates/Templates.jsx` | /templates only. |
| `content.templates-sidebar` | CONTENT | 1 | 1 | `src/standalone/templates/Templates.jsx > Aside / MobileAside` | /templates only. |
| `content.category-tiles` | CONTENT | 1 | 1 | `src/standalone/templates/Templates.jsx` | /templates only. |
| `content.featured-templates` | CONTENT | 1 | 1 | `src/standalone/templates/Templates.jsx` | /templates only. |
| `content.template-category-grids` | CONTENT | 1 | 1 | `src/standalone/templates/Templates.jsx > TemplateCard` | /templates only. |
| `commerce.blank-base-cta` | COMMERCE | 1 | 1 | `src/standalone/templates/Templates.jsx` | /templates only. |

**25 shared sections** appear in more than one template and belong in a component library.

**39 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.home-video` | page-local |
| 4 | PROOF | `proof.logo-marquee` | page-local |
| 5 | FEATURES | `features.workflow-tabs` | page-local |
| 6 | FEATURES | `features.ai-plays-bento` | page-local |
| 7 | CONTENT | `content.resource-cards` | page-local |
| 8 | PROOF | `proof.customer-story-video` | page-local |
| 9 | COMMERCE | `commerce.cta-box` | shared ×2 |
| 10 | SHELL | `shell.footer` | shared ×23 |

### Solutions hub — `template.bk-solutions-hub`

1 route · `/solutions` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-bk` | shared ×4 |
| 4 | HERO | `hero.solutions-centered` | page-local |
| 5 | FEATURES | `features.team-icon-cards` | page-local |
| 6 | FEATURES | `features.media-text-rows` | page-local |
| 7 | COMMERCE | `commerce.cta-row` | shared ×4 |
| 8 | SHELL | `shell.footer` | shared ×23 |

### Filter listing (integrations / AI plays) — `template.bk-filter-listing`

2 routes · `/integrations`, `/ai-plays` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-bk` | shared ×4 |
| 4 | HERO | `hero.page-split` | page-local |
| 5 | CONTENT | `content.filter-listing` | page-local |
| 6 | COMMERCE | `commerce.cta-row` | shared ×4 |
| 7 | SHELL | `shell.footer` | shared ×23 |

### Customer stories listing — `template.bk-customer-stories`

1 route · `/customer-stories` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-bk` | shared ×4 |
| 4 | HERO | `hero.story-carousel` | page-local |
| 5 | PROOF | `proof.logo-strip` | page-local |
| 6 | CONTENT | `content.card-grid-load-more` | page-local |
| 7 | COMMERCE | `commerce.cta-row` | shared ×4 |
| 8 | SHELL | `shell.footer` | shared ×23 |

### Guides hub — `template.bk-guides`

1 route · `/guides` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-bk` | shared ×4 |
| 4 | HERO | `hero.guides-banner` | page-local |
| 5 | CONTENT | `content.sidebar-nav-grid` | page-local |
| 6 | COMMERCE | `commerce.cta-row` | shared ×4 |
| 7 | SHELL | `shell.footer` | shared ×23 |

### Contact sales — `template.bk-contact-sales`

1 route · `/contact-sales` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | COMMERCE | `commerce.contact-sales-split` | page-local |
| 4 | SHELL | `shell.footer` | shared ×23 |

### Platform landing (B family) — `template.platform-landing`

1 route · `/platform` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.platform` | shared ×2 |
| 4 | PROOF | `proof.logo-row-b` | shared ×2 |
| 5 | FEATURES | `features.tab-panels` | page-local |
| 6 | FEATURES | `features.integrations-grid-b` | shared ×2 |
| 7 | FEATURES | `features.ai-bento` | page-local |
| 8 | PROOF | `proof.stories-slider` | shared ×2 |
| 9 | CONTENT | `content.read-next-b` | page-local |
| 10 | COMMERCE | `commerce.cta-banner-b` | shared ×2 |
| 11 | SHELL | `shell.footer` | shared ×23 |

### Platform AI page — `template.platform-ai`

1 route · `/platform/ai` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.card-grid` | shared ×9 |
| 7 | FEATURES | `features.side-by-side` | shared ×9 |
| 8 | FEATURES | `features.feature-carousel` | shared ×4 |
| 9 | CONTENT | `content.faq` | shared ×9 |
| 10 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 11 | SHELL | `shell.footer` | shared ×23 |

### Platform AI agents (scroll-tabber) — `template.platform-ai-agents`

1 route · `/platform/ai-agents` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | FEATURES | `features.scroll-tabber` | shared ×2 |
| 6 | FEATURES | `features.feature-carousel` | shared ×4 |
| 7 | FEATURES | `features.card-grid` | shared ×9 |
| 8 | CONTENT | `content.read-next` | shared ×5 |
| 9 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 10 | CONTENT | `content.faq` | shared ×9 |
| 11 | SHELL | `shell.footer` | shared ×23 |

### Platform app building (scroll-tabber + integrations) — `template.platform-app-building`

1 route · `/platform/app-building` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | FEATURES | `features.scroll-tabber` | shared ×2 |
| 6 | FEATURES | `features.feature-carousel` | shared ×4 |
| 7 | FEATURES | `features.side-by-side` | shared ×9 |
| 8 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 9 | FEATURES | `features.card-grid` | shared ×9 |
| 10 | CONTENT | `content.read-next` | shared ×5 |
| 11 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 12 | CONTENT | `content.faq` | shared ×9 |
| 13 | SHELL | `shell.footer` | shared ×23 |

### Feature stack: hero + side-by-side rows only — `template.feature-stack-rows`

2 routes · `/platform/automations`, `/platform/reporting` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | FEATURES | `features.side-by-side` | shared ×9 |
| 6 | SHELL | `shell.footer` | shared ×23 |

### Feature stack + tabber + cards — `template.feature-stack-connected-data`

1 route · `/platform/connected-data` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | FEATURES | `features.side-by-side` | shared ×9 |
| 6 | FEATURES | `features.tabber` | shared ×6 |
| 7 | FEATURES | `features.card-grid` | shared ×9 |
| 8 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 9 | SHELL | `shell.footer` | shared ×23 |

### Feature stack + stats + integrations + carousel — `template.feature-stack-governance`

1 route · `/platform/governance` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.stats` | page-local |
| 6 | FEATURES | `features.side-by-side` | shared ×9 |
| 7 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 8 | FEATURES | `features.feature-carousel` | shared ×4 |
| 9 | FEATURES | `features.card-grid` | shared ×9 |
| 10 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 11 | SHELL | `shell.footer` | shared ×23 |

### Feature stack + logos + tabber + FAQ — `template.feature-stack-hyperdb`

1 route · `/platform/hyperdb` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.side-by-side` | shared ×9 |
| 7 | FEATURES | `features.tabber` | shared ×6 |
| 8 | CONTENT | `content.faq` | shared ×9 |
| 9 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 10 | SHELL | `shell.footer` | shared ×23 |

### Feature stack + templates carousel + cards + FAQ — `template.feature-stack-interface-designer`

1 route · `/platform/interface-designer` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | FEATURES | `features.side-by-side` | shared ×9 |
| 6 | CONTENT | `content.templates-carousel` | shared ×2 |
| 7 | FEATURES | `features.card-grid` | shared ×9 |
| 8 | CONTENT | `content.faq` | shared ×9 |
| 9 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 10 | SHELL | `shell.footer` | shared ×23 |

### Feature stack + logos + tabber + integrations + read next — `template.feature-stack-portals`

1 route · `/platform/portals` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.side-by-side` | shared ×9 |
| 7 | FEATURES | `features.tabber` | shared ×6 |
| 8 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 9 | CONTENT | `content.faq` | shared ×9 |
| 10 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 11 | CONTENT | `content.read-next` | shared ×5 |
| 12 | SHELL | `shell.footer` | shared ×23 |

### Team solution page (with templates carousel) — `template.team-solution`

2 routes · `/solutions/marketing`, `/solutions/product` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.card-grid` | shared ×9 |
| 7 | FEATURES | `features.tabber` | shared ×6 |
| 8 | CONTENT | `content.templates-carousel` | shared ×2 |
| 9 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 10 | PROOF | `proof.logo-tabber` | shared ×2 |
| 11 | CONTENT | `content.read-next` | shared ×5 |
| 12 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 13 | CONTENT | `content.faq` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×23 |

### Team solution page (no templates carousel) — `template.team-solution-no-templates`

1 route · `/solutions/operations` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.breadcrumb-season` | shared ×11 |
| 4 | HERO | `hero.season` | shared ×12 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.card-grid` | shared ×9 |
| 7 | FEATURES | `features.tabber` | shared ×6 |
| 8 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 9 | PROOF | `proof.logo-tabber` | shared ×2 |
| 10 | CONTENT | `content.read-next` | shared ×5 |
| 11 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 12 | CONTENT | `content.faq` | shared ×9 |
| 13 | SHELL | `shell.footer` | shared ×23 |

### Enterprise solution (PLATFORM-E) — `template.enterprise`

1 route · `/solutions/enterprise` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.platform` | shared ×2 |
| 4 | PROOF | `proof.logo-row-b` | shared ×2 |
| 5 | FEATURES | `features.use-case-cards` | page-local |
| 6 | FEATURES | `features.ai-foundation` | page-local |
| 7 | FEATURES | `features.org-accordion` | page-local |
| 8 | FEATURES | `features.hac-split` | page-local |
| 9 | FEATURES | `features.integrations-grid-b` | shared ×2 |
| 10 | PROOF | `proof.stories-slider` | shared ×2 |
| 11 | COMMERCE | `commerce.cta-banner-b` | shared ×2 |
| 12 | CONTENT | `content.faq` | shared ×9 |
| 13 | SHELL | `shell.footer` | shared ×23 |

### About — `template.about`

1 route · `/about` · chrome: **season**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.season` | shared ×12 |
| 4 | FEATURES | `features.side-by-side` | shared ×9 |
| 5 | PROOF | `proof.logo-cells` | shared ×6 |
| 6 | FEATURES | `features.card-grid` | shared ×9 |
| 7 | FEATURES | `features.tabber` | shared ×6 |
| 8 | FEATURES | `features.integrations-marquee` | shared ×6 |
| 9 | COMMERCE | `commerce.cta-banner` | shared ×11 |
| 10 | SHELL | `shell.footer` | shared ×23 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **pricing-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.pricing-title` | page-local |
| 4 | COMMERCE | `commerce.plan-cards` | page-local |
| 5 | COMMERCE | `commerce.see-all-features` | page-local |
| 6 | PROOF | `proof.pricing-logo-strip` | page-local |
| 7 | COMMERCE | `commerce.comparison-table` | page-local |
| 8 | CONTENT | `content.help-links` | page-local |
| 9 | CONTENT | `content.pricing-faq` | page-local |
| 10 | SHELL | `shell.footer` | shared ×23 |

### Templates gallery — `template.templates-gallery`

1 route · `/templates` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | HERO | `hero.templates-head` | page-local |
| 4 | CONTENT | `content.templates-sidebar` | page-local |
| 5 | CONTENT | `content.category-tiles` | page-local |
| 6 | CONTENT | `content.featured-templates` | page-local |
| 7 | CONTENT | `content.template-category-grids` | page-local |
| 8 | COMMERCE | `commerce.blank-base-cta` | page-local |
| 9 | SHELL | `shell.footer` | shared ×23 |

### Stub (linked, not built) — `template.stub`

59 routes · `/articles`, `/breakthroughs`, `/careers`, `/company/accessibility`, `/company/privacy`, `/company/privacy-choices`, `/company/terms-and-policies`, `/company/trust-and-security`, `/customer-stories/code-and-theory`, `/developers`, `/developers/apps`, `/developers/scripting`, `/developers/web/api/introduction`, `/downloads`, `/events-webinars`, `/integrations/google-drive`, `/integrations/jira`, `/integrations/salesforce`, `/integrations/slack`, `/integrations/zendesk`, `/login`, `/lp/claude-airtable`, `/lp/resources`, `/lp/resources/demos/airtable-productcentral-demo`, `/lp/resources/ebooks/ultimate-ai-guide-for-marketers`, `/marketplace`, `/newsroom`, `/partners`, `/services`, `/signup`, `/solutions/agency`, `/solutions/design-creative-project-management`, `/solutions/education`, `/solutions/finance`, `/solutions/hr`, `/solutions/it`, `/solutions/manufacturing`, `/solutions/media-entertainment`, `/solutions/people`, `/solutions/project-management`, `/solutions/public-sector`, `/solutions/retail`, `/solutions/saas-project-management`, `/solutions/sales`, `/templates/content-calendar/exp3FNmOkdHZvprXB`, `/templates/content-strategy/exp1nfqhaFgeAyk2f`, `/templates/corporate-organizational-chart/expgMvC4WkxpKviHn`, `/templates/event-planning/expKIiL87pUceFRjc`, `/templates/inventory-tracker/expDrHGuyjSQlrKTq`, `/templates/marketing-campaign-tracking/expNoL0sYUbOogSCm`, `/templates/product-catalog-and-orders/expZvMLT9L6c4yeBX`, `/templates/product-launch/expbtFa3nsLpIQfgk`, `/templates/product-roadmap/exphVKuL99S35ZsMi`, `/templates/product-strategy/expbov1cc8Qb05egC`, `/templates/project-management/expnPwND0WA2x7nhJ`, `/templates/resource-allocation/expMLg1OTd4pKVxCU`, `/templates/social-media-calendar/expgEkxMmWRqpa43k`, `/videos`, `/whatsnew` · chrome: **default**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.promo-bar` | shared ×23 |
| 2 | SHELL | `shell.header` | shared ×23 |
| 3 | SHELL | `shell.stub-notice` | page-local |
| 4 | COMMERCE | `commerce.cta-box` | shared ×2 |
| 5 | SHELL | `shell.footer` | shared ×23 |

## Section reference

### SHELL

_Chrome rendered by the shared Layout or a page-group wrapper: promo bar, header, breadcrumb, footer, stub notice._

**`shell.promo-bar`** — Dismissible one-line announcement bar above the nav row, with an inline arrow link.

· Every route (part of the shared header). · appears on 84 routes · implemented by `src/components/Header.jsx`

**`shell.header`** — Sticky main nav row: brand mark + wordmark, Platform/Solutions/Resources drawer toggles with mega-menu drawers and right-column nested panels, Enterprise/Pricing links, Book demo / Sign up / Log in actions, mobile hamburger menu.

· Every route; restyled to ATSeasonSans via [data-font=season] on the Season-system routes. · appears on 84 routes · implemented by `src/components/Header.jsx`

**`shell.breadcrumb-bk`** — Homepage-system breadcrumb bar (Home / page), sticky under the header at --mainNavHeight.

· The 5 BK listing/marketing sub-pages that open with a breadcrumb. · appears on 5 routes · implemented by `src/bk/BreadcrumbBar.jsx`

**`shell.breadcrumb-season`** — Season-system 42px breadcrumb bar inside the 1344px keyline frame; sticky, hides on scroll-down and returns on scroll-up.

· Season routes that open with a breadcrumb (platform sub-pages and team solution pages). · appears on 13 routes · implemented by `src/season/components/heroes.jsx > Breadcrumb`

**`shell.footer`** — Site footer: logo + primary links + socials row, five link columns with See more (mobile accordions), utility bar with legal links and app-store badges.

· Every route; ATSeasonSans weights on Season routes, system-font "pricing" variant on /pricing. · appears on 84 routes · implemented by `src/components/Footer.jsx`

**`shell.stub-notice`** — Placeholder block for linked-but-unbuilt routes: title derived from the URL, a short not-built-yet note and a Back to home link.

· Every linked route that has no built page. · appears on 59 routes · implemented by `src/pages/StubPage.jsx`

### HERO

_Page-opening block: headline, subhead, primary actions and (optionally) lead media._

**`hero.home-video`** — Homepage hero: centred 40/48 h1, subheading, Get started / Book demo buttons and a 16:9 autoplay product video with pause control.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.solutions-centered`** — Homepage-style centred hero without video (Hero video={false}).

· /solutions only. · appears on 1 routes · implemented by `src/components/Hero.jsx (video={false})`

**`hero.page-split`** — Two-column listing-page hero: copy and actions left, media right; light or dark theme.

· /integrations (light) and /ai-plays (dark). · appears on 2 routes · implemented by `src/bk/PageHeroSplit.jsx`

**`hero.story-carousel`** — Centred customer-story hero carousel: 4s autoplay, dots and circle arrows, overlay copy on desktop.

· /customer-stories only. · appears on 1 routes · implemented by `src/bk/HeroCarouselCentered.jsx`

**`hero.guides-banner`** — Guides banner: copy column beside an expanding image strip whose active item widens on click.

· /guides only. · appears on 1 routes · implemented by `src/bk/GuidesBanner.jsx`

**`hero.season`** — Season hero (A1/S-1): centred title block with optional badge and a framed 16:9 video or image with pause button.

· Season platform sub-pages, team solution pages and /about. · appears on 14 routes · implemented by `src/season/components/heroes.jsx > Hero`

**`hero.platform`** — Platform-landing hero (B1/E-1): oversized headline with animated bar-pattern media; enterprise variant puts copy above the video.

· /platform and /solutions/enterprise. · appears on 2 routes · implemented by `src/season/components/heroes.jsx > PlatformHero`

**`hero.pricing-title`** — Centred pricing page title.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C1)`

**`hero.templates-head`** — Left-aligned gallery title and subtitle.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx`

### PROOF

_Social proof: customer logos, customer stories, quantified stats._

**`proof.logo-marquee`** — "Trusted by" heading over an infinite customer-logo marquee (25px/s, edge fade masks).

· Homepage only. · appears on 1 routes · implemented by `src/components/LogoBar.jsx`

**`proof.customer-story-video`** — Full-width customer-story pane: background video, quote, attribution and an Explore customer stories button.

· Homepage only. · appears on 1 routes · implemented by `src/components/CustomerStory.jsx`

**`proof.logo-strip`** — Static logo row on desktop that becomes a scrolling marquee on mobile.

· /customer-stories only. · appears on 1 routes · implemented by `src/bk/BkLogoStrip.jsx`

**`proof.logo-cells`** — Row of keyline-framed logo cells whose logos flip in place on a staggered timer (A2/S-2).

· Season sub-pages that show a customer-logo row. · appears on 7 routes · implemented by `src/season/components/LogoCells.jsx`

**`proof.logo-row-b`** — B-family logo row: static on /platform, random cell cycling on enterprise (B2/E-2).

· /platform and /solutions/enterprise. · appears on 2 routes · implemented by `src/season/components/LogoCells.jsx (skin b)`

**`proof.logo-tabber`** — Customer-logo tabs swapping a story panel; accordion on mobile (S-4 logo variant).

· Team solution pages (marketing, product, operations). · appears on 3 routes · implemented by `src/season/components/Tabber.jsx (tabs=logos)`

**`proof.stats`** — Row of large stat figures with captions (A10).

· /platform/governance only. · appears on 1 routes · implemented by `src/season/components/blocks.jsx > Stats`

**`proof.stories-slider`** — Customer-story slider with 10s autoplay progress bars (B6/E-8).

· /platform and /solutions/enterprise. · appears on 2 routes · implemented by `src/season/components/platformB.jsx > Stories`

**`proof.pricing-logo-strip`** — Eyebrow over a static customer-logo strip.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C4)`

### FEATURES

_Product capability explanation: feature rows, tabbed explainers, feature card grids, integration displays._

**`features.workflow-tabs`** — Sticky numbered 01–04 menu beside four feature cards (scroll-linked screenshot fan, video card, background-image card, enterprise list card); active item tracks scroll.

· Homepage only. · appears on 1 routes · implemented by `src/components/Workflows.jsx`

**`features.ai-plays-bento`** — "See AI plays" heading row over a 4-card 8+4 / 6+6 bento whose cards swap image for prompt text on hover.

· Homepage only. · appears on 1 routes · implemented by `src/components/AIPlays.jsx`

**`features.team-icon-cards`** — Grid of eight team cards, each an icon, team name and arrow link.

· /solutions only. · appears on 1 routes · implemented by `src/bk/IconCardGrid.jsx`

**`features.media-text-rows`** — Stack of alternating media/text rows, one per team.

· /solutions only. · appears on 1 routes · implemented by `src/bk/MediaTextRow.jsx`

**`features.card-grid`** — Season 3-up (or 4-up) card grid with icon, media, stat or link card variants (A3/S-3).

· Season pages with a feature card grid. · appears on 10 routes · implemented by `src/season/components/CardGrid.jsx`

**`features.ai-bento`** — Platform-landing AI bento card grid (B5).

· /platform only. · appears on 1 routes · implemented by `src/season/components/CardGrid.jsx (variant bento)`

**`features.side-by-side`** — Text beside (or above) framed media: image right, left or bottom; repeats down feature pages (A4/S-5).

· The 10 Season routes built from feature rows: the 7 feature-stack platform pages plus /platform/ai, /platform/app-building and /about. · appears on 10 routes · implemented by `src/season/components/SideBySide.jsx`

**`features.feature-carousel`** — Auto-scrolling, draggable feature card carousel (A5).

· Season AI/product and governance pages. · appears on 4 routes · implemented by `src/season/components/FeatureCarousel.jsx`

**`features.scroll-tabber`** — Sticky left tab list that tracks which panel is in view, with click-to-scroll (A7).

· /platform/ai-agents and /platform/app-building. · appears on 2 routes · implemented by `src/season/components/ScrollTabber.jsx`

**`features.tabber`** — Horizontal label tabs swapping a media panel; becomes a single-open accordion on mobile (A8/S-4).

· Season pages with a tabbed feature explainer. · appears on 7 routes · implemented by `src/season/components/Tabber.jsx`

**`features.integrations-marquee`** — Integrations block with multi-strip logo-tile marquee, drag and momentum (A9/S-7).

· Season pages with an integrations block. · appears on 7 routes · implemented by `src/season/components/Integrations.jsx`

**`features.integrations-grid-b`** — B-family integrations block: four CSS-animated tile strips beside copy (B4/E-7).

· /platform and /solutions/enterprise. · appears on 2 routes · implemented by `src/season/components/Integrations.jsx (variant b)`

**`features.tab-panels`** — Platform-landing tab panels with large coloured media (B3).

· /platform only. · appears on 1 routes · implemented by `src/season/components/platformB.jsx > TabPanels`

**`features.use-case-cards`** — Enterprise use-case card row (E-3).

· /solutions/enterprise only. · appears on 1 routes · implemented by `src/season/components/platformB.jsx > UseCaseCards`

**`features.ai-foundation`** — Enterprise AI-foundation block with staggered load animation (E-4).

· /solutions/enterprise only. · appears on 1 routes · implemented by `src/season/components/platformB.jsx > AiFoundation`

**`features.org-accordion`** — Enterprise organisation accordion (E-5).

· /solutions/enterprise only. · appears on 1 routes · implemented by `src/season/components/platformB.jsx > OrgAccordion`

**`features.hac-split`** — Enterprise dark split section (E-6).

· /solutions/enterprise only. · appears on 1 routes · implemented by `src/season/components/platformB.jsx > HacSplit`

### CONTENT

_Browsable or editorial content: listings, resource cards, template galleries, FAQs, read-next links._

**`content.resource-cards`** — Three-up row of resource cards (16:9 image, eyebrow, title) with hover lift.

· Homepage only. · appears on 1 routes · implemented by `src/components/Resources.jsx`

**`content.filter-listing`** — Featured cards over a checkbox-filter sidebar and card grid with client-side filtering and Clear all; mobile Filters toggle.

· /integrations and /ai-plays. · appears on 2 routes · implemented by `src/bk/FilterListing.jsx`

**`content.card-grid-load-more`** — Three-up resource-card grid that reveals 12 more cards per Load more click.

· /customer-stories only. · appears on 1 routes · implemented by `src/bk/CardGridLoadMore.jsx`

**`content.sidebar-nav-grid`** — Topics sidebar (mobile dropdown) beside a grid of guide resource cards.

· /guides only. · appears on 1 routes · implemented by `src/bk/SidebarNavGrid.jsx`

**`content.templates-carousel`** — Dark templates carousel with arrow controls (A11/S-6).

· Season pages that promote templates. · appears on 3 routes · implemented by `src/season/components/blocks.jsx > TemplatesCarousel`

**`content.read-next`** — Dark "read next" card row linking to related resources (A12/S-8).

· Season sub-pages with related reading. · appears on 6 routes · implemented by `src/season/components/blocks.jsx > ReadNext`

**`content.read-next-b`** — Platform-landing read-next cards (B7).

· /platform only. · appears on 1 routes · implemented by `src/season/components/blocks.jsx > ReadNext (variant b)`

**`content.faq`** — Season FAQ accordion with keyline rows (A14/S-10/E-10).

· Season pages with an FAQ. · appears on 10 routes · implemented by `src/season/components/blocks.jsx > Faq`

**`content.help-links`** — Help heading over columns of eyebrow + link.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C6)`

**`content.pricing-faq`** — Pricing FAQ accordion with chevron rows (Inter Display styling).

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C7)`

**`content.templates-sidebar`** — Sticky category sidebar with search and collapsible groups; "Categories" toggle below 1024px.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx > Aside / MobileAside`

**`content.category-tiles`** — Row of category tiles with gradient icons.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx`

**`content.featured-templates`** — Featured template cards on pastel gradients with mock previews.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx`

**`content.template-category-grids`** — Repeated category sections: heading + View all link over a grid of template cards.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx > TemplateCard`

### COMMERCE

_Conversion and pricing: CTA bands, plan cards, comparison table, contact-sales form._

**`commerce.cta-box`** — Boxed "Start building" CTA: heading, one line of copy and a primary button.

· Homepage and every stub route. · appears on 60 routes · implemented by `src/components/CtaBox.jsx`

**`commerce.cta-row`** — Unboxed CTA band: heading left, primary button right, tinted background.

· The 5 BK sub-pages /solutions, /integrations, /ai-plays, /customer-stories and /guides. · appears on 5 routes · implemented by `src/bk/BkCtaRow.jsx`

**`commerce.contact-sales-split`** — Contact-sales split: value copy and logos left, sticky 9-field form card right (visual only, no submission).

· /contact-sales only. · appears on 1 routes · implemented by `src/bk/ContactSalesSplit.jsx`

**`commerce.cta-banner`** — White CTA card on an animated navy/purple bar-pattern background (A13/S-9).

· Season sub-pages with a closing CTA. · appears on 12 routes · implemented by `src/season/components/blocks.jsx > CtaBanner`

**`commerce.cta-banner-b`** — B-family CTA banner; green static-pattern background on enterprise (B8/E-9).

· /platform and /solutions/enterprise. · appears on 2 routes · implemented by `src/season/components/blocks.jsx > CtaBanner (variant b)`

**`commerce.plan-cards`** — Four plan cards in 9 aligned rows with a "Most popular" highlight; mobile stacked cards with All features expanders.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C2)`

**`commerce.see-all-features`** — Centred "see all features" link with down arrow that jumps to the comparison table.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C3)`

**`commerce.comparison-table`** — Desktop plan comparison table: sticky plan header, 16 feature groups, 99 rows of checks/values.

· /pricing only. · appears on 1 routes · implemented by `src/standalone/pricing/Pricing.jsx (C5)`

**`commerce.blank-base-cta`** — End-of-gallery card prompting to start from a blank base.

· /templates only. · appears on 1 routes · implemented by `src/standalone/templates/Templates.jsx`
