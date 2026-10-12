// Shared config builders for the Season page group. Pages are data: each page file
// calls these with word counts / labels from specs/pages_platform.md + specs/pages_solutions.md.
import { t, h, q, paras, brands } from '../copy.js'

// ---------------------------------------------------------------- links / labels (≤4-word UI labels)
export const TRY = { label: 'Try it now', href: '/signup' }
export const DEMO = { label: 'Book demo', href: '/contact-sales' }
export const WATCH = { label: 'Watch demo', href: '#' }
export const SIGNUP = { label: 'Sign up for free', href: '/signup' }
export const TRYOUT = { label: 'Try it out', href: '/signup' }
export const PLAYS = { label: 'Explore AI Plays', href: '/ai-plays' }
export const INTEGRATIONS_CTA = { label: 'View all integrations', href: '/integrations' }

export const crumbsPlatform = (label) => ({
  sticky: true,
  items: [{ label: 'Home', href: '/' }, { label: 'Platform', href: '/platform' }, { label }],
})
export const crumbsSolutions = (label) => ({
  sticky: true,
  items: [{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label }],
})

// ---------------------------------------------------------------- section helpers
// A1 hero: { h1, sub (words), actions, media: {ratio, video}, pattern }
export const hero = (key, { h1, sub, actions = [TRY, DEMO], media, pattern, badge }) => ({
  type: 'hero',
  badge,
  headline: h1,
  sub: sub ? t(sub, `${key}-hero`) : undefined,
  actions: actions.map((a, i) => ({ ...a, variant: i === 0 ? 'primary' : 'secondary' })),
  media,
  pattern,
})

// A4 side-by-side row. spec: [position, h2 words|null, body words|[..]|null, bullets [words..]|null, ratio, extras]
export const row = (key, position, h2, body, bullets, ratio, extra = {}) => ({
  type: 'sideBySide',
  position,
  headline: typeof h2 === 'string' && !/^\d+c$/.test(h2) ? h2 : h2 ? h(h2, `${key}-h`) : undefined,
  body: Array.isArray(body) ? body.map((n, i) => t(n, `${key}-b${i}`)) : body ? t(body, `${key}-b`) : undefined,
  bullets: bullets ? bullets.map((n, i) => t(n, `${key}-l${i}`)) : undefined,
  media: { ratio, video: extra.video },
  ...extra,
})

// A3 cards
export const iconCards = (key, specs) =>
  specs.map(([title, body, link], i) => ({
    icon: true,
    title: h(title, `${key}-c${i}`),
    body: body ? t(body, `${key}-cb${i}`) : undefined,
    link: link ? { label: link, href: '#' } : undefined,
  }))

// The "trust trio" shared by /ai, /ai-agents, /app-building (3 icon cards, titles 4–5 / bodies 17–30 words)
export const trustTrio = (headlineWords, key = 'trust') => ({
  type: 'cards',
  headline: h(headlineWords, `${key}-h`),
  cards: [
    { icon: true, title: 'Private by design', body: t('118c', 'trust-1') },
    { icon: true, title: 'Clear controls for admins', body: t('104c', 'trust-2') },
    { icon: true, title: 'Answers grounded in records', body: t('172c', 'trust-3') },
  ],
})

// A5 carousel cards. specs: [badge, tone, titleWords, bodyWords]
export const carouselCards = (key, specs) =>
  specs.map(([badge, tone, tw, bw], i) => ({ badge, tone, title: h(tw, `${key}-t${i}`), body: t(bw, `${key}-b${i}`) }))

// A14/S-10 FAQ items. specs: [qWords, [answer paragraph word counts]]
export const faqItems = (key, specs) => specs.map(([qw, aw], i) => ({ q: q(qw, `${key}-q${i}`), a: paras(aw, `${key}-a${i}`) }))

// A12/S-8 read-next cards. specs: [titleWords, eyebrow?]
export const readCards = (key, specs) =>
  specs.map(([tw, eyebrow, color], i) => ({ title: h(tw, `${key}-r${i}`), eyebrow, color }))

// A13/S-9 CTA
export const cta = (headline, actions = [TRY, DEMO]) => ({
  type: 'cta',
  headline,
  actions: actions.map((a, i) => ({ ...a, variant: i === 0 ? 'primary' : 'secondary' })),
})

export const logos = (n, opts = {}) => ({ type: 'logos', logos: brands(n, opts.offset || 0), ...opts })

// A9 integrations
export const integrations = (key, h2Words, subWords) => ({
  type: 'integrations',
  headline: h(h2Words, `${key}-int`),
  sub: t(subWords, `${key}-int-sub`),
  action: INTEGRATIONS_CTA,
  tiles: 5,
})

// ---------------------------------------------------------------- SEASON solution template
// Breadcrumb -> S-1 -> S-2 -> S-3 -> S-4 labels -> [S-6] -> S-7 -> S-4 logos -> S-8 -> S-9 -> S-10
export function seasonSolution(key, p) {
  const sections = [
    {
      type: 'hero',
      badge: p.badge,
      headline: p.h1,
      sub: t(p.sub, `${key}-sub`),
      actions: [
        { label: p.primary, href: '/signup', variant: 'primary' },
        { label: p.secondary, href: '/contact-sales', variant: 'secondary' },
      ],
      media: { ratio: '16/9', video: true },
    },
    { type: 'logos', heading: 'Trusted by', logos: brands(6, p.logoOffset || 0), motion: 'season' },
    {
      type: 'cards',
      badge: p.cards.badge,
      headline: p.cards.h2,
      sub: t(p.cards.sub, `${key}-cards-sub`),
      cards: p.cards.items.map(([tw, bw], i) => ({ title: h(tw, `${key}-card${i}`), body: t(bw, `${key}-cardb${i}`), media: true })),
    },
    {
      type: 'tabber',
      variant: 'labels',
      badge: p.tabs.badge,
      headline: p.tabs.h2,
      sub: t(p.tabs.sub, `${key}-tabs-sub`),
      tabs: p.tabs.labels.map((label, i) => ({
        label,
        subhead: h(p.tabs.subhead, `${key}-tab-sh${i}`),
        groups: p.tabs.items.map(([sw, pw], g) => ({ strong: h(sw, `${key}-tab${i}-s${g}`), text: t(pw, `${key}-tab${i}-p${g}`) })),
        action: { label: p.tabs.cta, href: '/signup' },
        video: true,
      })),
    },
  ]
  if (p.carousel) {
    sections.push({
      type: 'templates',
      badge: p.carousel.badge,
      headline: p.carousel.h2,
      sub: t(p.carousel.sub, `${key}-car-sub`),
      slides: Array.from({ length: 5 }, (_, i) => ({ title: h(p.carousel.title, `${key}-slide${i}`), link: { label: 'Explore', href: '/templates' } })),
    })
  }
  sections.push(
    {
      type: 'integrations',
      headline: p.integrations.h2,
      sub: t(p.integrations.sub, `${key}-int-sub`),
      action: { label: 'Explore all integrations', href: '/integrations' },
      tiles: 4,
    },
    {
      type: 'tabber',
      variant: 'logos',
      headline: p.stories.h2,
      tabs: brands(3, 6).map((logo, i) => ({
        logo,
        quote: t(p.stories.quote, `${key}-quote${i}`),
        attribution: t(p.stories.attribution, `${key}-attr${i}`),
        action: { label: 'Read the story', href: '/customer-stories' },
        video: true,
      })),
    },
    { type: 'readNext', headline: p.readNext.h2, cards: readCards(`${key}-rn`, p.readNext.titles.map((n) => [n])) },
    cta(p.cta, [{ label: 'Start building free', href: '/signup' }, { label: 'Contact sales', href: '/contact-sales' }]),
    { type: 'faq', headline: 'Frequently asked questions', items: faqItems(`${key}-faq`, p.faq) },
  )
  return { skin: 'season', font: 'season', breadcrumb: crumbsSolutions(p.crumb), sections }
}
