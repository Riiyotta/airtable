// /platform/ai — family A, "AI / product" recipe (pages_platform.md)
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, logos, iconCards, row, trustTrio, carouselCards, faqItems, cta, PLAYS } from './recipes.js'

const K = 'ai'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('AI'),
  sections: [
    hero(K, { h1: 'Assistants that understand your data and the way you work', sub: 15, media: { ratio: '892/383', video: true } }),
    logos(4, { heading: t(10, `${K}-logos`) }),
    { type: 'cards', headline: h(8, `${K}-c1`), sub: t(11, `${K}-c1s`), cards: iconCards(`${K}-c1`, [[5], [6], [5]].map(([n], i) => [n, [11, 16, '125c'][i]])) },
    row(`${K}-r1`, 'left', 6, 28, [6, 9, 11], '4/3', { badge: 'Omni', actions: [{ label: 'Explore app building', href: '/platform/app-building', variant: 'primary' }] }),
    row(`${K}-r2`, 'right', 6, '170c', [5, 7, 9], '4/3', { badge: 'Field Agents', actions: [{ label: 'Explore AI agents', href: '/platform/ai-agents', variant: 'primary' }] }),
    {
      type: 'cards',
      headline: h('48c', `${K}-c2`),
      sub: t(19, `${K}-c2s`),
      actions: [{ ...PLAYS, variant: 'primary' }],
      cards: iconCards(`${K}-c2`, [
        ['38c', '148c', 'Try the play'],
        [8, 21, 'Try the play'],
        [6, 18, 'Try the play'],
        [5, '132c', 'Try the play'],
      ]),
    },
    trustTrio(5, `${K}-trust`),
    {
      type: 'carousel',
      headline: h(5, `${K}-car`),
      sub: t(12, `${K}-cars`),
      actions: [{ ...PLAYS, variant: 'primary' }],
      cards: carouselCards(`${K}-car`, [
        ['BLOG', 'cyan', '19c', '100c'],
        ['SALES', 'orange', '58c', '120c'],
        ['MARKETING', 'pink', '28c', '107c'],
        ['BLOG', 'cyan', '28c', '128c'],
        ['OPERATIONS', 'orange', '63c', '166c'],
        ['MARKETING', 'pink', '56c', '191c'],
        ['PRODUCT', 'cyan', '27c', '223c'],
      ]),
    },
    { type: 'faq', headline: h(6, `${K}-faq`), items: faqItems(`${K}-faq`, [[3, [24]], [7, [20]], [10, [30]], [5, [22]], [8, [26]], [6, [28]]]) },
    cta('Put dependable AI to work across all of your teams'),
  ],
}
