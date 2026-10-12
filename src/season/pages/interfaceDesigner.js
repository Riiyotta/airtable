// /platform/interface-designer — family A, "feature stack" recipe with A11 templates carousel
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, row, iconCards, faqItems, cta, WATCH, TRY, DEMO } from './recipes.js'

const K = 'ifd'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('Interface Designer'),
  sections: [
    hero(K, { h1: 'Design interfaces that your whole team uses daily', sub: 11, actions: [WATCH, TRY], media: { ratio: '1280/548' } }),
    row(`${K}-r1`, 'bottom', '37c', '115c', null, '1280/548'),
    row(`${K}-r2`, 'left', 6, '90c', null, '4/3'),
    row(`${K}-r3`, 'right', 'Drag, drop, done', 19, null, '4/3'),
    row(`${K}-r4`, 'left', 8, 16, null, '4/3'),
    row(`${K}-r5`, 'right', '21c', 16, null, '4/3'),
    {
      type: 'templates',
      headline: h(5, `${K}-tpl`),
      sub: t(6, `${K}-tpl-sub`),
      slides: Array.from({ length: 5 }, (_, i) => ({ title: t(11, `${K}-slide${i}`) })),
    },
    {
      type: 'cards',
      headline: h(5, `${K}-more`),
      sub: t(14, `${K}-more-sub`),
      cards: iconCards(`${K}-more`, [
        ['24c', null, 'Watch videos'],
        ['37c', null, 'Read more'],
        ['17c', null, 'Contact Support'],
        ['56c', null, 'Join the community'],
      ]),
    },
    { type: 'faq', headline: h(4, `${K}-faq`), items: faqItems(`${K}-faq`, [[6, [31]], [9, [53]], [5, [40]], [8, [36]], [7, [45]]]) },
    cta('Build a polished interface for any workflow in an afternoon', [DEMO]),
  ],
}
