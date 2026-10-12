// /platform/connected-data — family A, "feature stack" recipe
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, iconCards, cta, DEMO, TRY } from './recipes.js'

const K = 'data'
const tab = (label, i) => ({
  label,
  subhead: h('36c', `${K}-tsh${i}`),
  groups: [{ strong: t('127c', `${K}-ts${i}`) }],
  action: { label: 'Watch the webinar', href: '#' },
})
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Connected Data'),
  sections: [
    hero(K, { h1: 'Connected data at the core', sub: 11, actions: [DEMO, TRY], media: { ratio: '4/3', video: true } }),
    row(`${K}-r1`, 'right', 6, 27, null, '4/3', { badge: 'NEW' }),
    row(`${K}-r2`, 'left', 5, 21, null, '4/3'),
    row(`${K}-r3`, 'right', '34c', 24, null, '4/3'),
    row(`${K}-r4`, 'left', 6, 22, null, '4/3', { actions: [{ label: 'Explore integrations', href: '/integrations', variant: 'primary' }] }),
    {
      type: 'tabber',
      bar: true,
      headline: h(7, `${K}-tabs`),
      sub: t(8, `${K}-tabs-sub`),
      tabs: [
        'Create one shared roadmap for teams',
        'Track team goals and OKRs',
        'Collect and sort all feedback',
        'Manage creative assets in one shared media library',
        'Share assets with every team',
        'Keep launch dates and owners aligned',
      ].map(tab),
    },
    {
      type: 'cards',
      badge: 'Go beyond',
      headline: h(4, `${K}-more`),
      sub: t(9, `${K}-more-sub`),
      cards: iconCards(`${K}-more`, [
        ['31c', 9, 'Explore Platform'],
        [6, 8, 'Explore Build'],
        [6, 9, 'Explore AI'],
        [6, 8, 'Explore Governance'],
      ]),
    },
    cta('Bring every team onto one connected data foundation that grows with you over the years'),
  ],
}
