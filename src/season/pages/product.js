// /solutions/product — SEASON solution template (5 wrapping tabs, 1-line CTA)
import { seasonSolution } from './recipes.js'

export default seasonSolution('prd', {
  crumb: 'Product',
  logoOffset: 3,
  badge: 'For product teams',
  h1: 'A shared operating model for building and shipping products',
  sub: 25,
  primary: 'Get started free',
  secondary: 'Book demo',
  cards: { badge: 'Product operations', h2: 'Connect strategy to everyday delivery', sub: 24, items: [[4, '128c'], [4, '119c'], [4, '140c']] },
  tabs: {
    badge: 'Product lifecycle',
    h2: 'Bring every part of product work into one connected workspace',
    sub: 23,
    labels: ['Strategy and goals', 'Roadmap planning', 'Feedback and research', 'Release management', 'Launch coordination'],
    subhead: 6,
    items: [['24c', '92c'], ['30c', '126c'], ['14c', '104c']],
    cta: 'Start planning now',
  },
  carousel: { badge: 'Templates for product teams', h2: 'Ship faster with templates built for product', sub: 9, title: 5 },
  integrations: { h2: 'Connect your stack', sub: 28 },
  stories: { h2: 'Product teams building better products with shared context', quote: 29, attribution: 8 },
  readNext: { h2: 'More resources for product teams', titles: ['58c', '48c', '73c'] },
  cta: 'Build what customers need',
  faq: [[10, ['400c', 58, 21]], [8, [32]], [12, [27]], [9, [38]], [13, [24]]],
})
