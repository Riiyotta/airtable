// /platform/app-building — family A, "AI / product" recipe (adds A4 + A9 after the carousel, no hero subhead)
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, integrations, trustTrio, carouselCards, faqItems, readCards, cta, PLAYS, TRY, SIGNUP, TRYOUT } from './recipes.js'

const K = 'apps'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('App Building'),
  sections: [
    hero(K, { h1: 'Describe the app you need, then use it right away', media: { ratio: '892/383', video: true } }),
    {
      type: 'scrollTabber',
      headline: 'Go from an idea to a working app',
      panels: [
        { label: '01 AI app building', title: h('18c', `${K}-p1`), body: t('170c', `${K}-p1b`), action: TRY },
        { label: '02 Visual editing', title: h('30c', `${K}-p2`), body: t('149c', `${K}-p2b`), action: { label: 'Learn more', href: '#' } },
        { label: '03 Shared components', title: h('29c', `${K}-p3`), body: t('144c', `${K}-p3b`), action: TRY },
      ],
    },
    {
      type: 'carousel',
      headline: h(7, `${K}-car`),
      sub: t(12, `${K}-cars`),
      actions: [{ ...PLAYS, variant: 'primary' }],
      cards: carouselCards(`${K}-car`, [
        ['Marketing & Creative', 'pink', '54c', '136c'],
        ['Product', 'cyan', '48c', '108c'],
        ['Marketing & Creative', 'pink', '38c', '131c'],
        ['Product', 'cyan', '40c', '139c'],
      ]),
    },
    row(`${K}-r1`, 'right', 7, 28, null, '1280/753', { badge: 'Ask Omni' }),
    integrations(K, 6, 18),
    trustTrio(4, `${K}-trust`),
    { type: 'readNext', headline: h(5, `${K}-rn`), cards: readCards(`${K}-rn`, [[3, 'EBOOK'], [6, 'GUIDE'], [5, 'WEBINAR']]) },
    cta('Build the tools your team keeps asking for without waiting on engineering or extra budget approvals', [SIGNUP, TRYOUT]),
    { type: 'faq', headline: h(6, `${K}-faq`), items: faqItems(`${K}-faq`, [[3, [26]], [9, [20]], [6, [30]], [10, [24]], [5, [22]], [8, [28]]]) },
  ],
}
