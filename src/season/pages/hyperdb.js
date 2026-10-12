// /platform/hyperdb — family A, "feature stack" recipe
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, logos, faqItems, cta, DEMO } from './recipes.js'

const K = 'hdb'
const LEARN = { label: 'Learn more', href: '#', variant: 'primary' }
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('HyperDB'),
  sections: [
    hero(K, { h1: 'Enterprise-scale data, ready for every team', sub: 27, actions: [{ label: 'Book now', href: '/contact-sales' }], media: { ratio: '1280/1223' } }),
    logos(5, { offset: 4 }),
    row(`${K}-r1`, 'left', null, 46, null, '591/444'),
    row(`${K}-r2`, 'right', 5, 17, null, '4/3'),
    row(`${K}-r3`, 'left', 8, '255c', null, '591/426', { actions: [LEARN] }),
    row(`${K}-r4`, 'right', 5, 23, null, '4/3', { actions: [LEARN] }),
    {
      type: 'tabber',
      bar: true,
      headline: h(7, `${K}-tabs`),
      sub: t(11, `${K}-tabs-sub`),
      tabs: ['Massive record volumes', 'Fast query performance', 'Secure data sync'].map((label, i) => ({
        label,
        subhead: h(3, `${K}-tsh${i}`),
        groups: [{ strong: t(15, `${K}-ts${i}`) }],
        action: { label: 'Learn more', href: '#' },
      })),
    },
    { type: 'faq', headline: h(6, `${K}-faq`), items: faqItems(`${K}-faq`, [[7, [34, '132c']], [5, [22]], [9, [18, 16]], [6, [28]]]) },
    cta('Scale data without slowing down', [DEMO]),
  ],
}
