Source: https://www.airtable.com/

# Asset manifest — Airtable homepage clone

All paths are relative to `/Users/riyaghosh/V3/airtable/public/` and are served by Vite at `/<path>`.
Remote origins: images `https://cdn.sanity.io/images/hlcyrtq5/production/<file>`, videos `https://cdn.sanity.io/files/hlcyrtq5/production/<file>`, nav images and fonts `https://static.airtable.com/...`.
Dimensions are intrinsic pixel sizes measured from the files (for SVGs, the viewBox). "Rendered" is the CSS box size at 1440px.

## Fonts (`/fonts/`) — all woff2, from https://static.airtable.com/font/

| Local file | @font-face family | weight | style | Used on page? |
|---|---|---|---|---|
| fonts/NeueHaasGrotTextRound-55Roman-Web.woff2 | `Haas` | 400 | normal | YES (body, h1, most text) |
| fonts/NeueHaasGrotTextRound-56Italic-Web.woff2 | `Haas` | 400 | italic | declared, not loaded |
| fonts/NeueHaasGrotTextRound-65Medium-Web.woff2 | `Haas` | 500 | normal | YES (nav, buttons, titles) |
| fonts/NeueHaasGrotTextRound-66MediumItalic-Web.woff2 | `Haas` | 500 | italic | declared, not loaded |
| fonts/NeueHaasGrotTextRound-75Bold-Web.woff2 | `Haas` | 700 | normal | YES (preloaded; also used for weight 600 `<strong>` through synthesis/nearest match) |
| fonts/NeueHaasGrotTextRound-76BoldItalic-Web.woff2 | `Haas` | 700 | italic | declared, not loaded |
| fonts/Haas-Grot-Disp-R-55-Roman.woff2 | `Haas Groot Disp` | 500 | normal | YES (section h2s via HeadingGroup, rendered at weight 400 → matches this face) |
| fonts/Haas-Grot-Text-R-65-Medium.woff2 | `Haas Groot Disp` | 600 | normal | declared, not loaded |
| fonts/Haas-Grot-Text-R-75-Bold.woff2 | `Haas Groot Disp` | 700 | normal | declared, not loaded |
| fonts/Haas-Grot-Disp-R-95-Black.woff2 | `Haas Groot Disp` | 900 | normal | declared, not loaded |

Not downloaded: `ATSeasonSans` (`https://static.airtable.com/font/ATSeasonSansVF.woff2`, variable 100–900). It's declared on the page but only used by the other A/B variant (see the CLONE_SPEC "Variant" note). Inter and Source Sans 3 come from third-party widgets (Qualified chat and the Transcend consent banner), so they're out of scope.
License note: Neue Haas Grotesk is a commercial typeface (Monotype). These files are Airtable's licensed web fonts.

## Images

| Local path | Format | Intrinsic | Rendered @1440 | Where used |
|---|---|---|---|---|
| assets/favicon.ico | PNG data in .ico | — | — | `<link rel="icon">` |
| assets/marketing-nav-platform-graphic.webp | webp | — | 384×264 | Platform drawer promo panel image |
| assets/marketing-nav-solution.webp | webp | — | 384×268 | Solutions drawer promo panel image |
| assets/marketing-nav-resource.webp | webp | — | 384×260 | Resources drawer promo panel image |
| assets/b6863f568a03bcc0815f410996fd34a83289824a-168x52.svg | svg (replaced, see note) | 168×52 | 168×52 | Logo 1 (marquee) |
| assets/d09c309b62a3e7db843f45c293d59b6dacd07632-168x52.svg | svg (replaced) | 168×52 | 168×52 | Logo 2 |
| assets/11b0a6a8133776211d5f57de1a4f1c89adcfda5f-168x52.svg | svg (replaced) | 168×52 | 168×52 | Logo 3 |
| assets/e326f2cef65d1c7304344128153fd50704ae2345-336x104.png | png (downloaded) | 336×104 | 168×52 | Logo 4 (raster). The `.jpg` with the same hash is the old saved copy; either works. |
| assets/8317d0325637b10ab99d9b97a2485e147dd67f9d-168x52.svg | svg (replaced) | 168×52 | 168×52 | Logo 5 |
| assets/8585d359490198c8edfa61d8d27378898a1ca387-168x52.svg | svg (replaced) | 168×52 | 168×52 | Logo 6 |
| assets/7f75375372308d75f38caf57e434d8752ceeb92b-168x52.svg | svg (replaced) | 168×52 | 168×52 | Logo 7 |
| assets/7101e0ea90ebf01317f7271dd8039d135794d4c7-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 8 |
| assets/7ace193946430d8a659301c74cbcd2c362e3b82e-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 9 |
| assets/c1b1dc81f3a6d9d0ed88f45bf382ab601c5fa6aa-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 10 |
| assets/c546058cd0abeb758e80f2dfe47edb0d65ed087d-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 12 (no "Logo 11" in CMS) |
| assets/bc21c117f792b1931ac8b8d74ce3e8c6dfa0e6ee-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 13 |
| assets/735eb740382a2998e3094bd6fa58b69c7b4a97f4-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 14 |
| assets/8a2b6233feeecbe7c76d600fdae77adf61d220c2-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 15 |
| assets/ace8acd44b2a75a1ad96b610ffbc9d63f882c720-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 16 |
| assets/82ff48b25d1d9e4e41dfc2ce8e0eb18d13e48c2e-168x52.svg | svg (downloaded) | 168×52 | 168×52 | Logo 17 |
| assets/6b62c60a069f265eec39054ebe851a9918a3db90-729x1006.png | png | 1536×2120 | 338×466 | Tab card 01 fan image 1 (z-index 1) |
| assets/5da115af45d689e68a19649dc1b330128d395950-729x996.png | png | 1536×2099 | 341×466 | Tab card 01 fan image 2 (z 2) |
| assets/cf1159eaca297c9203adeef8039f9fae6d65c980-729x996.png | png | 1536×2099 | 341×466 | Tab card 01 fan image 3 (z 3) |
| assets/4266d4d5629d465de8f0d819a79d3fa2e5beac83-729x996.png | png | 1536×2099 | 341×466 | Tab card 01 fan image 4 (z 4) |
| assets/3385c0df6528302ab335b5c6344945583712d9df-2000x1600.png | png (downloaded) | 2000×1600 | cover, 1101×675 | Tab card 03 "Say hello to Omni" background-image |
| assets/e1ae4b7878c18828b1817f51d0a7c214061d8a3d-1000x1000.gif | animated gif | 1536×1536 | 226×226 | Tab card 03 Omni animated icon |
| assets/7eba4fea94fc9dac9cb7ef78f90ea47b29c189a1-48x49.svg | svg | 48×49 | 48×48 | Tab card 04 (list card) icon |
| assets/0834b04934b4e12d875dd7b721f8ed6482676149-24x25.svg | svg (downloaded) | 24×25 | 24×24 | List-item bullet, `li::before` background-image in card 04 |
| assets/23b71faac9fefb209abee4d86dace2e43424985b-1770x854.png | png (downloaded) | 1770×854 | 907×427 cover | Bento card 1 (big, peach) |
| assets/4d4aaf0d7a87f96d9b40f562706acf060e1e6971-854x854.png | png (downloaded) | 854×854 | 437×427 cover | Bento card 2 (small, light blue) |
| assets/27e946e26007e0be7e4d8310c1b7ee31f219779f-1312x854.png | png (downloaded) | 1312×854 | 672×427 cover | Bento card 3 (medium, blue) |
| assets/179c070bf7bf64cc8f6eb8352f9dc700049b0223-1312x854.png | png (downloaded) | 1312×854 | 672×427 cover | Bento card 4 (medium, dark green) |
| assets/45d538de0379cda686e8cb0955ff093c4a622396-1280x720.png | png | 1280×720 | 403×227 cover | Resource card 1 "Builders & Breakthroughs" |
| assets/dbb582f012767c2d5af97325037acde823f24b09-1600x900.webp | webp | 1600×900 | 403×227 cover | Resource card 2 "The 2026 AI guide for marketers" |
| assets/09c27aadb37c8c514837812d6c4a3133ad340477-1920x1081.webp | webp | 1920×1081 | 403×227 cover | Resource card 3 "In action: Airtable ProductCentral" |
| assets/c9f681308cbc8902a14f2929030806c81cfce498-90x52.svg | svg (downloaded) | 90×52 | 88×50 | Customer story attribution logo (white) |

**Note on replaced files:** before this run, six `*-168x52.svg` files in `public/assets/` (b6863f56, d09c309b, 11b0a6a8, 8317d032, 8585d359, 7f753753) held WebP bytes, because the saved page stored the `?fm=webp` responses. Vite serves `.svg` as `image/svg+xml`, so they wouldn't render. I replaced them with the true SVGs from cdn.sanity.io; the WebP originals are still in the `_files` folder.

## Videos (`/assets/`), all autoplay, muted, loop, playsinline, no poster

| Local path | Codec | Size | Duration | fps | Where used |
|---|---|---|---|---|---|
| assets/16f7e8526058f2d34ce24e5ef3933bc3783cea4b.mp4 | **HEVC (H.265)** | 1920×1080 | 16.4 s | 60 | Hero banner video (16:9 container 1114×627, radius 16) |
| assets/559eda8e343bd1e27dee54f569b062cb60110afe.mp4 | H.264 | 1000×560 | 8.0 s | 30 | Tab card 02 "Don't just ask AI. Deploy it." media |
| assets/642f0aab4cecfadb17e538dfb03ec1e47a09d549.mp4 | **HEVC (H.265)** | 1350×1080 | 12.08 s | 60 | Customer-story video pane background (src has `#t=0.5`) |

HEVC plays in Safari and in Chrome/Edge on macOS and Windows with hardware decode. It does **not** play in headless Chromium or Firefox. The live site serves these same HEVC files with no fallback source.

## Inline SVGs copied from the live DOM (`/assets/inline-svg/`)

Each is the element's `outerHTML` with `xmlns` added. Fills are hard-coded `#181D26` unless noted; inline them in JSX if you need `currentColor`.

| File | Rendered size | Where |
|---|---|---|
| inline-svg/brand-mark.svg | 38×32 (desktop nav), 26×22 in other variant | Nav logo mark, viewBox 0 0 200 170 |
| inline-svg/brand-wordmark.svg | 94×20 | Nav "Airtable" wordmark (collapses when a drawer opens) |
| inline-svg/footer-logo.svg | 32×27 | Footer logo mark |
| inline-svg/promo-arrow.svg | 18×12, `transform: rotate(180deg)` (matrix(-1,0,0,-1)) | Promo bar "Try it now" arrow, color #254FAD |
| inline-svg/promo-close.svg | 12×12, viewBox 0 0 490 490 | Promo bar close (X) |
| inline-svg/nav-chevron.svg | 12×12; rotate(-90deg) closed → rotate(0) open; path fill #949494 → #95BEFC when open | Nav drawer toggles |
| inline-svg/nested-chevron.svg | 12×12, rotate(-90deg), opacity .5 | Nested drawer toggle chevrons |
| inline-svg/back-arrow.svg | 18×12 | Drawer "Back" button (mobile and nested) |
| inline-svg/footer-accordion-chevron.svg | — | Footer column accordion (mobile) |
| inline-svg/video-pause.svg | 16×16 (lucide "pause") | Hero video pause button |
| inline-svg/social-facebook.svg, social-linkedin.svg, social-twitter.svg, social-instagram.svg, social-youtube.svg | 17×17, 16×17, 17×17, 17×17, 21×15 | Footer social icons |
| inline-svg/app-store-badge.svg | 97×33 | Footer utility bar |
| inline-svg/google-play-badge.svg | 109×33 | Footer utility bar |
| inline-svg/drawer-icon-*.svg | 24×(19–27) | Icons next to drawer links. Filenames are slugs of the link text (e.g. `drawer-icon-ai-app-building.svg`, `drawer-icon-slackadd-real-time-...svg`). `drawer-icon-icon.svg` is unlabelled; it comes from the Platform drawer's "Tools" group. `drawer-icon-what-s-.svg` = "What's New". |

## Not cloned / third-party (seen in network, intentionally excluded)
- Qualified chat widget (app.qualified.com, orb-animation.mp4, Inter fonts, messenger PNG).
- Transcend consent manager (airgap.js, Source Sans 3 font, consent CSS).
- GTM / GA / ads pixels, Sentry, Ahrefs.
- og:image `00c20d5108d1335f5a243ddcd70ea4a2d6d9a844-1200x630.webp` (meta only, not rendered).
- No Lottie JSON was requested by this variant.
