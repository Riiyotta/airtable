// /platform/portals — family A, "feature stack" recipe (read-next comes after the CTA)
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, logos, integrations, faqItems, readCards, cta } from './recipes.js'

const K = 'portals'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Portals'),
  sections: [
    hero(K, { h1: 'Share the right data with people outside your company', sub: 13, media: { ratio: '1280/853' }, pattern: true }),
    logos(5, { offset: 9 }),
    row(`${K}-r1`, 'left', 5, 18, null, '591/444'),
    row(`${K}-r2`, 'right', '40c', 15, ['87c', '55c', '98c'], '591/444'),
    row(`${K}-r3`, 'left', 5, '113c', ['71c', '62c'], '591/444'),
    {
      type: 'tabber',
      bar: true,
      headline: h(5, `${K}-tabs`),
      sub: t('135c', `${K}-tabs-sub`),
      tabs: ['Client portals', 'Vendor management', 'Customer support', 'Partner relationship management'].map((label, i) => ({
        label,
        subhead: h(2, `${K}-tsh${i}`),
        groups: [{ strong: t('158c', `${K}-ts${i}`) }],
        action: { label: 'View template', href: '/templates' },
      })),
    },
    row(`${K}-r4`, 'bottom', 6, '141c', null, '1262/540'),
    integrations(K, 5, 28),
    {
      type: 'faq',
      headline: h(6, `${K}-faq`),
      items: faqItems(`${K}-faq`, [[6, [40, '89c']], [8, [73]], [5, [18, 4]], [10, [55]], [7, [33, 29]], [9, [46]]]),
    },
    cta('Give partners and clients a secure window into your work'),
    { type: 'readNext', headline: 'Keep exploring portals', cards: readCards(`${K}-rn`, [[5], [6]]) },
  ],
}
