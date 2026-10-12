// /solutions/operations — SEASON solution template without the S-6 carousel
import { seasonSolution } from './recipes.js'

export default seasonSolution('ops', {
  crumb: 'Operations',
  logoOffset: 7,
  badge: 'Built for operations teams',
  h1: 'Run reliable operations across every team, site and region',
  sub: 21,
  primary: 'Get started free',
  secondary: 'Book demo',
  cards: { badge: 'Operational excellence', h2: 'Standardize the processes that keep the business running', sub: 31, items: [[2, 15], [4, 19], [3, '142c']] },
  tabs: {
    badge: 'Core workflows',
    h2: 'Keep requests, vendors and assets moving without friction',
    sub: 26,
    labels: ['Intake requests', 'Vendor management', 'Asset tracking'],
    subhead: 4,
    items: [['11c', '68c'], ['24c', '71c'], ['25c', '90c']],
    cta: 'See it live',
  },
  integrations: { h2: 'Plug into your systems', sub: 27 },
  stories: { h2: 'How operations teams stay ahead of demand', quote: '138c', attribution: 12 },
  readNext: { h2: 'Guides for operations leaders today', titles: ['64c', '49c', '40c'] },
  cta: 'Run smoother operations from this week',
  faq: [[11, ['433c']], [8, [30]], [12, [26]], [9, [34]], [7, [28]], [10, [22]], [9, [31]]],
})
