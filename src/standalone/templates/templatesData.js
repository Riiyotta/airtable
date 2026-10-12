// Placeholder content for /templates (TPL system). All copy is invented; counts follow
// specs/pages_solutions.md §12 (5 tiles, 4 featured, 20 sections × 6 cards, aside 9/6/4 links).

export const HERO = { title: 'Templates', subtitle: 'Start faster with a ready-made base for any kind of work.' }

export const NAV_GROUPS = [
  {
    title: 'By Use Case',
    links: ['Project management', 'Campaign planning', 'Content calendar', 'Product roadmap', 'Event planning', 'Hiring pipeline', 'Inventory tracking', 'Bug tracking', 'Asset library'],
  },
  { title: 'By Industry', links: ['Education', 'Nonprofit', 'Real estate', 'Media', 'Retail', 'Healthcare'] },
  { title: 'By Feature', links: ['Interfaces', 'Automations', 'Forms', 'AI fields'] },
]

export const ASIDE_FOOTER = { label: 'Browse gallery', caption: 'Templates from makers' }

// Pastel pairs (card / image-panel backgrounds) are the four measured pairs, in order.
// Deep pairs (inner frame): cyan and purple are the spec's examples; rose and blue are matched-hue placeholders.
export const PALETTES = [
  { pastel: ['#FAF5FF', '#EDE9FE'], deep: ['#C084FC', '#9333EA'] },
  { pastel: ['#FFF1F2', '#FEE2E2'], deep: ['#FB7185', '#E11D48'] },
  { pastel: ['#ECFEFF', '#CCFBF1'], deep: ['#22D3EE', '#0E7490'] },
  { pastel: ['#EFF6FF', '#DBEAFE'], deep: ['#60A5FA', '#2563EB'] },
]

export const TILES = ['Project management', 'Marketing', 'Product', 'Operations', 'AI workflows']

export const FEATURED = ['Launch plan workspace', 'Weekly team check-in', 'Client onboarding hub', 'Editorial calendar starter']

const DESCRIPTIONS = [
  'Keep every request, owner, and deadline in one shared base so the whole group can see what is moving and what is stuck. Linked tables, simple status fields, and a ready-made dashboard help you get started in minutes instead of days.',
  'A lightweight structure for collecting ideas, ranking them by impact, and turning the best ones into scheduled work. Filtered views give each teammate a focused list, while a summary page shows leaders the overall picture at a glance every Monday.',
  'Plan recurring work with a calendar, a kanban board, and a timeline that all read from the same records. Automated reminders nudge owners before due dates, and comments keep decisions attached to the item they relate to for later reference.',
  'Track budgets, vendors, and approvals side by side without juggling separate spreadsheets. Rollup fields total spending by category, color-coded statuses flag anything waiting on review, and a shared form makes it easy for anyone to submit a new request in seconds.',
  'Bring every stakeholder into one place with tidy tables for people, tasks, and milestones. Grouped views make weekly reviews quick, attachments keep reference files close at hand, and a printable report summarizes progress for anyone who prefers a single page.',
  'Organize a growing library of items with rich previews, tags, and owners so nothing gets lost. Search and filters surface the right record quickly, and a simple intake form helps new entries arrive complete, consistent, and ready for review by the right person.',
]

// Card titles by line-count kind (live per-card title wraps, 14.8/22.2 semibold):
//   s = 1 line everywhere · m = 2 lines in the 3-col grid, 1 line on mobile · l = 2 lines everywhere.
const cap = (t) => t[0].toUpperCase() + t.slice(1)
const S = [
  (t) => `${cap(t)} progress tracker`,
  (t) => `${cap(t)} planning board`,
  (t) => `Weekly ${t} review log`,
  (t) => `${cap(t)} request intake form`,
  (t) => `Shared ${t} calendar view`,
  (t) => `${cap(t)} checklist`,
]
const M = [
  (t) => (t.length <= 6 ? `Quarterly ${t} roadmap and priorities` : `Quarterly ${t} roadmap overview`),
  (t) => `Annual ${t} planning and review`,
  (t) => `Shared ${t} goals and milestones`,
  (t) => `Cross-team ${t} status summary`,
]
const L = [
  (t) => `${cap(t)} planning, tracking and reporting workspace for teams`,
  (t) => `${cap(t)} intake, review and approval workflow for every team`,
]

const SHORT_DESCRIPTION = 'A simple space for tracking daily habits and the small routines that add up over time.'

const NEW_TITLES = ['Team retro board', 'Studio booking and equipment schedule', 'Volunteer shift planner', 'Research interview log', 'Office move checklist', 'Partner directory and meeting notes']

// [heading, topic, kinds] — kinds = one char per card (card count = kinds.length). Headings are sized so the
// mobile h2 (beside "View all") wraps to the live line count; per-row 2-line titles follow the live grid.
const SECTIONS = [
  ['New templates', null, 'smsssm'],
  ['Project planning and delivery templates', 'project', 'sssmsm'],
  ['Marketing templates', 'campaign', 'ssllsm'],
  ['Product management templates', 'feature', 'smsmss'],
  ['Operations templates', 'vendor', 'sssssm'],
  ['Sales pipeline templates', 'pipeline', 'mssssm'],
  ['Recruiting templates', 'candidate', 'msmsss'],
  ['Event planning templates', 'event', 'sssssm'],
  ['Content templates', 'content', 'msmsss'],
  ['Finance and accounting templates', 'budget', 'sssssm'],
  ['Design and creative studio templates', 'asset', 'ssmsss'],
  ['Engineering templates', 'release', 'lmsmmm'],
  ['Education and classroom templates', 'course', 'sssmms'],
  ['Nonprofit templates', 'donor', 'sssmss'],
  ['Real estate templates', 'listing', 'sssssm'],
  ['Customer support templates', 'ticket', 'ssssms'],
  ['Research templates', 'study', 'sssssm'],
  ['Home templates', 'habit', 'sssss'],
  ['Inventory templates', 'stock', 'sssmss'],
  ['Client templates', 'client', 'mss'],
]

export const CATEGORY_SECTIONS = SECTIONS.map(([heading, topic, kinds], s) => {
  let mi = 0
  let li = 0
  return {
    heading,
    cards: kinds.split('').map((k, i) => ({
      title: !topic ? NEW_TITLES[i] : k === 'm' ? M[mi++](topic) : k === 'l' ? L[li++](topic) : S[i](topic),
      // live: one card in the 18th section has a 2-line description on mobile
      description: s === 17 && i === 0 ? SHORT_DESCRIPTION : DESCRIPTIONS[(s + i) % DESCRIPTIONS.length],
      palette: PALETTES[(s + i) % PALETTES.length],
      ai: (s * 6 + i) % 5 === 2,
    })),
  }
})
