// /solutions/enterprise — PLATFORM-E (shares B modules with /platform; E-3..E-6 are enterprise-only)
import { t, h, q, brands } from '../copy.js'

const K = 'ent'
const DEMO = { label: 'Get a demo', href: '/contact-sales' }
const CONTACT = { label: 'Contact sales', href: '/contact-sales' }
export default {
  skin: 'e',
  font: 'season',
  sections: [
    {
      type: 'platformHero',
      variant: 'copyAboveVideo',
      eyebrow: 'Airtable for Enterprise',
      lines: ['One system of record for', 'every team and agent'],
      sub: t(20, `${K}-sub`),
      actions: [DEMO, CONTACT],
    },
    { type: 'logos', skin: 'b', motion: 'cycle', cells: 5, heading: h(7, `${K}-logos`), logos: brands(10, 3) },
    {
      type: 'useCases',
      headline: 'Built for how enterprises operate',
      action: { label: 'View all', href: '#' },
      cards: [
        { lines: ['Marketing', 'operations'], body: t('89c', `${K}-uc0`), brand: 'Lumen', metric: t('34c', `${K}-m0`) },
        { lines: ['Product', 'delivery'], body: t('124c', `${K}-uc1`), brand: 'Vantage', metric: t('35c', `${K}-m1`) },
        { lines: ['Finance', 'and planning'], body: t('104c', `${K}-uc2`), brand: 'Juniper', metric: t('31c', `${K}-m2`) },
        { lines: ['Field', 'operations'], body: t('78c', `${K}-uc3`), brand: 'Halcyon', metric: t('32c', `${K}-m3`) },
      ],
    },
    {
      type: 'aiFoundation',
      lines: ['A trusted foundation for', 'AI at scale'],
      cells: [
        { title: 'Grounded in data', body: t('108c', `${K}-af0`) },
        { title: 'Built for review', body: t('109c', `${K}-af1`) },
        { title: 'Ready for agents', body: t('95c', `${K}-af2`), stack: true },
      ],
    },
    {
      type: 'orgAccordion',
      lines: ['Designed for all', 'teams, from day', 'one onward'],
      items: [
        { title: 'Business teams', checks: [t(8, `${K}-o00`), t(10, `${K}-o01`), t(12, `${K}-o02`)] },
        { title: 'IT and admins', checks: [t(9, `${K}-o10`), t(11, `${K}-o11`), t(8, `${K}-o12`)] },
        { title: 'Executives', checks: [t(10, `${K}-o20`), t(12, `${K}-o21`), t(9, `${K}-o22`)] },
      ],
    },
    {
      type: 'hac',
      headline: 'Humans and agents collaborate on the same work with clear oversight',
      checks: [t('72c', `${K}-hc0`), t('92c', `${K}-hc1`)],
      action: { label: 'See how it works', href: '#' },
    },
    {
      type: 'integrations',
      variant: 'b',
      lines: ['Connect the systems you', 'already depend on'],
      sub: t('162c', `${K}-int`),
      action: { label: 'Explore all integrations', href: '/integrations' },
      tiles: 6,
    },
    {
      type: 'stories',
      fill: '#E8F36F',
      borderColor: '#333333',
      cta: { label: 'Read the story', href: '/customer-stories' },
      stories: brands(4, 11).map((brand, i) => ({ brand, quote: t('156c', `${K}-q${i}`), name: ['Dana Brooks', 'Leo Martins', 'Ana Silva', 'Ken Ito'][i], role: t(5, `${K}-role${i}`).replace(/\.$/, '') })),
    },
    { type: 'cta', variant: 'b', bg: 'green', lines: ['Bring every team onto', 'one trusted platform'], actions: [DEMO, CONTACT] },
    {
      type: 'faq',
      skin: 'e',
      headline: 'Frequently asked questions',
      items: [
        { q: q(10, `${K}-f0`), a: [t(43, `${K}-fa0`)] },
        { q: q(12, `${K}-f1`), a: [t(36, `${K}-fa1`)] },
        { q: q(11, `${K}-f2`), a: [t(30, `${K}-fa2`)] },
      ],
    },
  ],
}
