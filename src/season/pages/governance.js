// /platform/governance — family A, "feature stack" recipe with A10 stats
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, iconCards, integrations, carouselCards, cta, DEMO, TRY } from './recipes.js'

const K = 'gov'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Governance'),
  sections: [
    hero(K, { h1: 'Deploy, govern and scale with confidence', sub: 12, actions: [DEMO, TRY], media: { ratio: '4/3', video: true } }),
    {
      type: 'stats',
      headline: 'Results you can count on',
      stats: [
        { value: '4x', label: 'Faster review cycles across teams (Northwind)' },
        { value: '92%', label: 'Fewer manual handoffs (Lumen)' },
        { value: '$1.8M', label: 'Saved in annual tooling and licensing costs (Meridian)' },
      ],
    },
    row(`${K}-r1`, 'left', 7, null, [6, 9, 11], '4/3'),
    row(`${K}-r2`, 'right', 4, null, [10, '70c', 10], '4/3'),
    row(`${K}-r3`, 'left', 7, null, [8, 10, 9], '4/3', { actions: [{ label: 'Learn about security', href: '#', variant: 'primary' }] }),
    integrations(K, 5, 22),
    row(`${K}-r4`, 'right', 8, null, [8, '64c', 10], '591/444', { actions: [{ label: 'Learn about our services', href: '#', variant: 'primary' }] }),
    {
      type: 'carousel',
      headline: h(7, `${K}-car`),
      sub: t(16, `${K}-cars`),
      actions: [{ label: 'Explore resources', href: '/guides', variant: 'primary' }],
      cards: carouselCards(`${K}-car`, [
        ['Whitepaper', 'cyan', '20c', '104c'],
        ['Customer Story', 'pink', '56c', '110c'],
        ['Report', 'yellow', '40c', '110c'],
        ['Webinar', 'orange', '44c', '113c'],
        ['Platform', 'cyan', '73c', '135c'],
      ]),
    },
    {
      type: 'cards',
      headline: h(4, `${K}-more`),
      sub: t(9, `${K}-more-sub`),
      cards: iconCards(`${K}-more`, [
        ['31c', '52c', 'Explore Platform'],
        ['38c', '57c', 'Explore Build'],
        ['37c', '49c', 'Explore AI'],
        ['42c', null, 'Explore Data'],
      ]),
    },
    cta('Give admins the controls they need while every team across the business keeps moving'),
  ],
}
