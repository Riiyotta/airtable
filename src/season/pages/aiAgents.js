// /platform/ai-agents — family A, "AI / product" recipe with the A7 scroll tabber
import { t, h } from '../copy.js'
import { crumbsPlatform, hero, trustTrio, carouselCards, faqItems, readCards, cta, PLAYS, TRY, SIGNUP, TRYOUT } from './recipes.js'

const K = 'agents'
export default {
  skin: 'a',
  breadcrumb: crumbsPlatform('AI Agents'),
  sections: [
    hero(K, { h1: 'Agents that take routine work off a plate', sub: 25, media: { ratio: '892/383', video: true } }),
    {
      type: 'scrollTabber',
      headline: 'Put agents to work at scale',
      panels: [
        { label: '01 Document review agents', title: h('62c', `${K}-p1`), body: t('132c', `${K}-p1b`), action: TRY },
        { label: '02 Research agents', title: h('36c', `${K}-p2`), body: t('165c', `${K}-p2b`), action: { label: 'Learn more', href: '#' } },
        { label: '03 Content drafting agents', title: h('61c', `${K}-p3`), body: t('190c', `${K}-p3b`), action: PLAYS },
        { label: '04 Triage agents', title: h('45c', `${K}-p4`), body: t('91c', `${K}-p4b`), action: TRY },
      ],
    },
    {
      type: 'carousel',
      headline: h(9, `${K}-car`),
      actions: [{ ...PLAYS, variant: 'primary' }],
      cards: carouselCards(`${K}-car`, [
        ['Marketing & creative', 'pink', '38c', '124c'],
        ['Operations', 'orange', '39c', '104c'],
        ['Marketing & creative', 'pink', '41c', '88c'],
        ['Operations', 'orange', '48c', '100c'],
      ]),
    },
    trustTrio('53c', `${K}-trust`),
    { type: 'readNext', headline: h(5, `${K}-rn`), cards: readCards(`${K}-rn`, [['19c'], ['28c'], ['43c']]) },
    cta('Give every team an agent that handles the repetitive steps for them and keeps work moving', [SIGNUP, TRYOUT]),
    { type: 'faq', headline: h(6, `${K}-faq`), items: faqItems(`${K}-faq`, [[4, [22]], [12, [17]], [7, [35]], [9, [28]], [5, [24]], [10, [30]], [6, [20]]]) },
  ],
}
