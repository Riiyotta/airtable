// /platform — family B landing (B1, B2, B3, B4, B5, B6, B7, B8)
import { t, h, brands } from '../copy.js'
import { TRY, DEMO } from './recipes.js'

const K = 'plat'
export default {
  skin: 'a',
  heavy: true,
  sections: [
    {
      type: 'platformHero',
      eyebrow: 'The Airtable Platform',
      lines: ['Humans and agents', 'working side by side'],
      sub: t(11, `${K}-sub`),
      actions: [TRY, DEMO],
    },
    { type: 'logos', skin: 'b', motion: 'none', cells: 6, heading: h(7, `${K}-logos`), logos: brands(6, 2) },
    {
      type: 'tabPanels',
      headline: 'Every team workflow, running from one place',
      tabs: [
        { label: 'Shared data', bg: '#7A015C', title: h('55c', `${K}-tp0`), body: t('158c', `${K}-tpb0`) },
        { label: 'Durable workflows', bg: '#47008F', title: h(9, `${K}-tp1`), body: t(31, `${K}-tpb1`) },
        { label: 'Open surfaces', bg: '#004157', title: h(11, `${K}-tp2`), body: t(42, `${K}-tpb2`), video: true },
        { label: 'Governance', bg: '#7F1414', title: h(8, `${K}-tp3`), body: t(38, `${K}-tpb3`) },
      ],
    },
    {
      type: 'integrations',
      variant: 'b',
      lines: ['Sync your CRM.', 'Message your channels.', 'Update every tracker.'],
      sub: t(17, `${K}-int`),
      action: { label: 'Explore integrations', href: '/integrations' },
      tiles: 6,
    },
    {
      type: 'cards',
      variant: 'bento',
      headline: 'A dependable foundation for AI at work',
      cards: [
        { title: 'Agents', body: t(9, `${K}-bt0`), href: '/platform/ai-agents' },
        { title: 'App building', body: t(7, `${K}-bt1`), href: '/platform/app-building' },
        { title: 'Data', body: t(11, `${K}-bt2`), href: '/platform/connected-data' },
        { title: 'Governance', body: t(10, `${K}-bt3`), href: '/platform/governance' },
      ],
    },
    {
      type: 'stories',
      stories: brands(6, 8).map((brand, i) => ({ brand, quote: t('99c', `${K}-q${i}`), name: ['Alex Rivera', 'Sam Chen', 'Priya Nair', 'Jordan Lee', 'Maya Okafor', 'Chris Novak'][i], role: t('59c', `${K}-role${i}`).replace(/\.$/, '') })),
    },
    {
      type: 'readNext',
      variant: 'b',
      headline: 'Easy ways to start with agents',
      cards: [
        { eyebrow: 'QUICK READ', color: '#F797EF', title: h('58c', `${K}-rn0`) },
        { eyebrow: 'AIRTABLE TEMPLATES', color: '#FFCD05', title: h('45c', `${K}-rn1`) },
        { eyebrow: 'WEBINAR', color: '#35CBFD', title: h('54c', `${K}-rn2`) },
      ],
    },
    { type: 'cta', variant: 'b', lines: ['Join 500,000 teams', 'building today'], actions: [TRY, DEMO] },
  ],
}
