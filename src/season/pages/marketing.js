// /solutions/marketing — SEASON solution template
import { seasonSolution } from './recipes.js'

export default seasonSolution('mkt', {
  crumb: 'Marketing',
  badge: 'For marketing teams',
  h1: 'Turn great marketing ideas into campaigns at scale',
  sub: '149c',
  primary: 'Get started free',
  secondary: 'Book demo',
  cards: { badge: 'Campaign planning', h2: 'Plan, launch and learn', sub: 23, items: [[3, '129c'], [4, '103c'], [3, '123c']] },
  tabs: {
    badge: 'Campaign lifecycle',
    h2: 'Every campaign stage, managed in one shared place',
    sub: 34,
    labels: ['Campaign planning', 'Drafting', 'Launching', 'Measurement'],
    subhead: 4,
    items: [['29c', '82c'], ['27c', '108c'], ['29c', '112c']],
    cta: 'Start a campaign',
  },
  carousel: { badge: 'Templates for marketing teams', h2: 'Start faster with ready-made templates for marketers', sub: 14, title: 4 },
  integrations: { h2: 'Works with the tools you use', sub: 21 },
  stories: { h2: 'See how marketing teams move faster', quote: '131c', attribution: '86c' },
  readNext: { h2: 'More resources to explore next', titles: ['59c', '48c', '67c'] },
  cta: 'Launch your next campaign with confidence',
  faq: [[9, [35, 43]], [7, [30]], [12, [28]], [10, [40]], [14, [26]], [8, [33]], [11, [24]]],
})
