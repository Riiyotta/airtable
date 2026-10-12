// Placeholder content for /pricing (family C). All copy is invented; only the
// structure (4 plans, row counts, group counts) follows specs/pages_platform.md.

export const TITLE = 'Pick the plan that fits your team'

// price.kind: 'text' (48/48 label) | 'amount' (64/64 number + USD) | 'custom' (icon + "Custom pricing")
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals or small teams just getting started.',
    price: { kind: 'text', label: 'Free' },
    monthly: null,
    cta: { label: 'Try for free', href: '#', filled: false },
    secondary: null,
    lead: 'Starter includes:',
    features: [
      'Unlimited bases',
      'Up to 5 editors',
      '1,000 records per base',
      'Grid, board, and list views',
      'Basic automations for everyday tasks',
      '1 GB of attachments per base',
      'Two weeks of revision history',
    ],
    addOns: null,
  },
  {
    id: 'team',
    name: 'Team',
    highlight: true,
    description: 'For growing teams that need shared workflows and views.',
    price: { kind: 'amount', amount: '$18' },
    monthly: '$22',
    cta: { label: 'Try for free', href: '#', filled: true },
    secondary: { label: 'purchase now', href: '#' },
    lead: 'Everything in Starter, plus:',
    features: [
      '50,000 records per base',
      '25,000 automation runs',
      '20 GB of attachments per base',
      'Calendar, gallery, and timeline views',
      'Standard sync between bases',
      'Branded form pages',
      'Six months of revision history',
      { text: 'Assistant credits included', link: 'learn more' },
    ],
    addOns: ['Extra assistant credits in flexible monthly packs'],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For departments coordinating several teams with admin controls and deeper reporting.',
    price: { kind: 'amount', amount: '$42' },
    monthly: '$50',
    cta: { label: 'Purchase now', href: '#', filled: false },
    secondary: { label: 'contact sales', href: '/contact-sales' },
    lead: 'Everything in Team, plus:',
    features: [
      '125,000 records per base',
      '100,000 automation runs',
      '100 GB of attachments per base',
      'Verified data fields',
      'Two-way sync between bases',
      'Admin dashboard with workspace insights',
      'Single sign-on',
      'Interface page permissions',
      'Scheduled report exports',
      'One year of revision history',
      'Custom field validation rules',
      { text: 'Expanded assistant credits', link: 'learn more' },
    ],
    addOns: ['Extra assistant credits and private workspace storage'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations that need scale, governance, and dedicated support across every workspace.',
    price: { kind: 'custom', label: 'Custom pricing' },
    monthly: null,
    cta: { label: 'Contact Sales', href: '/contact-sales', filled: false },
    secondary: null,
    lead: 'Everything in Business, plus:',
    features: [
      '500,000 records per base with room to grow across every workspace',
      '500,000 automation runs',
      '1,000 GB of attachments per base',
      'Organization-wide admin console',
      'Audit trail and usage insights',
      'Data retention policies',
      'Enterprise key management',
      'Sandbox environments',
      'Advanced sharing restrictions',
      'Three years of revision history',
      'Dedicated success contact',
      'Dedicated onboarding and migration support',
      { text: 'Unlimited assistant credits', link: 'learn more' },
    ],
    addOns: ['Sandbox environments'],
  },
]

export const SEE_ALL = 'See every feature and compare plans'
export const LOGO_EYEBROW = 'Chosen by forward-thinking teams in every industry'
export const LOGOS = ['Northwind', 'Lumen & Co', 'BRIGHTLINE', 'Oakridge', 'Parallax', 'Tidewater', 'Kestrel']

// Comparison table: 16 groups, 98 feature rows — per-group counts measured on the live table
// (10,10,6,5,6,4,2,5,7,5,6,3,10,10,4,5). Rows are 36 tall; the live table has two multi-line rows in
// group 3 and group 10 (a 2-line "packs" row → 72, a 3-line "starts at" row → 76), reproduced via SPECIAL.
const GROUPS = [
  ['Fundamentals', ['Records per base', 'Workspaces and bases', 'Grid and list views', 'Rich field types', 'Comments and mentions', 'Revision history', 'Shared view links', 'Form submissions', 'Mobile and desktop apps', 'Basic filtering and sorting']],
  ['Views', ['Calendar view', 'Board view', 'Gallery view', 'Timeline view', 'Gantt view', 'Hierarchy view', 'Personal views', 'Locked views', 'View sections', 'Custom row height']],
  ['Field types', ['Linked records', 'Lookups and rollups', 'Formula fields', 'Button fields', 'Attachment previews', 'Field dependencies']],
  ['Collaboration', ['Real-time co-editing', 'Guest commenters', 'Shared workspaces', 'Activity feed', 'Notification rules']],
  ['Automations', ['Scheduled triggers', 'Conditional actions', 'Run history', 'Script actions', 'Outgoing webhooks', 'Multi-step workflows']],
  ['Interfaces', ['Dashboard layouts', 'Record review pages', 'Custom page elements', 'Interface permissions']],
  ['Forms', ['Conditional form fields', 'Branded form pages']],
  ['Reporting', ['Summary charts', 'Pivot tables', 'Scheduled reports', 'Report exports', 'Goal tracking']],
  ['Integrations', ['Calendar connectors', 'Chat app alerts', 'Email inbox sync', 'Cloud file storage', 'Developer API access', 'Embedded widgets', 'Connector library']],
  ['Data sync', ['One-way table sync', 'Two-way table sync', 'Sync from spreadsheets', 'Faster sync refresh', 'Cross-workspace sync']],
  ['Assistant', ['Text summaries', 'Field suggestions', 'Auto-categorize records', 'Draft generation', 'Translation helper', 'Prompt library']],
  ['Storage', ['Attachment space per base', 'Snapshot retention', 'Trash recovery window']],
  ['Admin controls', ['Admin dashboard', 'User provisioning', 'Seat management', 'Workspace creation rules', 'Base ownership transfer', 'Audit trail', 'Usage insights', 'Bulk user actions', 'Custom roles', 'Org-wide settings']],
  ['Security', ['Two-factor sign-in', 'Single sign-on', 'Session controls', 'Password policies', 'IP allow lists', 'Data encryption keys', 'Sharing restrictions', 'Domain verification', 'Device approvals', 'Export controls']],
  ['Compliance', ['Data residency options', 'Retention policies', 'Legal hold', 'Compliance reports']],
  ['Support', ['Help center', 'Email support', 'Priority support', 'Dedicated success contact', 'Onboarding sessions']],
]

// Cell codes for the 98 non-text rows, in order. t = lowest plan index that has it (check from there up);
// 'p' = add-on (plus on Business, check on Enterprise). Counts: 10×t0, 15×t1, 28×t2, 38×t3, 7×p
// → 186 checks, 7 plus, 199 empty (matches the spec tallies).
const CODES = [
  ...Array(10).fill(0),
  ...Array(15).fill(1),
  ...Array(20).fill(2),
  'p', 'p', 'p',
  ...Array(8).fill(2),
  'p', 'p', 'p', 'p',
  ...Array(38).fill(3),
]

const TEXT_ROW = ['1,000', '50,000', '125,000', '500,000']

function cellsFor(code) {
  if (code === 'p') return ['', '', 'plus', 'check']
  return [0, 1, 2, 3].map((i) => (i >= code ? 'check' : ''))
}

let k = 0
// Multi-line cells: { t, m } — m 'y' = margin 16/0 (2-line packs text), m 'b' = margin 0/0/16 (3-line price text).
const SPECIAL = {
  '2:3': {
    name: 'Credit packs',
    cells: ['', { t: '5k, 10k, 25k, 50k, 100k credits', m: 'y' }, { t: '5k, 10k, 25k, 50k, 100k credits', m: 'y' }, 'Contact Sales'],
  },
  '2:4': {
    name: 'Pack pricing',
    cells: ['', { t: 'Starts at $15/month for 5k AI credits', m: 'b' }, { t: 'Starts at $15/month for 5k AI credits', m: 'b' }, { t: 'Contact Sales', m: 'b' }],
  },
  '9:1': {
    name: 'Connection packs',
    cells: ['', { t: '5, 10, 25, 50, 100 connections', m: 'y' }, { t: '5, 10, 25, 50, 100 connections', m: 'y' }, 'Contact Sales'],
  },
  '9:2': {
    name: 'Connection pricing',
    cells: ['', { t: 'Starts at $90/month for 5 sync connections', m: 'b' }, { t: 'Starts at $110/month for 5 sync connections', m: 'b' }, { t: 'Contact Sales', m: 'b' }],
  },
}

export const TABLE = GROUPS.map(([title, names], gi) => ({
  title,
  rows: names.map((name, ri) => {
    if (gi === 0 && ri === 0) return { name, cells: TEXT_ROW }
    const sp = SPECIAL[`${gi}:${ri}`]
    if (sp) return sp
    return { name, cells: cellsFor(CODES[k++]) }
  }),
}))

export const FOOTNOTES = [
  'Seat prices shown are per editor and exclude any taxes that may apply in your region.',
  'Record and attachment limits apply per base; usage beyond a limit pauses new additions until space is freed.',
  'Automation runs reset at the start of each billing cycle and do not carry over between cycles or between workspaces in the same organization.',
  'Assistant credits are shared across a workspace and are consumed at different rates depending on the size of each request.',
  'Add-ons are billed separately and can be changed at any time.',
]

export const HELP_TITLE = 'Do you have more questions?'
export const HELP_LINKS = [
  { eyebrow: 'Billing / pricing', label: 'Billing FAQ', href: '#' },
  { eyebrow: 'Plan changes', label: 'Switching plans', href: '#' },
  { eyebrow: 'Talk to us', label: 'Contact sales', href: '/contact-sales' },
]

export const FAQ_TITLE = 'Frequently asked questions'
export const FAQ = [
  {
    q: 'Can I change plans at any time?',
    a: [
      'Yes. You can move to a larger plan whenever you like, and the difference is prorated for the rest of your current billing cycle.',
      'Moving to a smaller plan takes effect at the start of your next cycle so nobody loses access mid-project.',
    ],
  },
  {
    q: 'How is a seat counted on the Team and Business plans?',
    a: ['Each person with edit or creator access to a workspace counts as one seat. Read-only viewers and form respondents are always free.'],
  },
  {
    q: 'What happens when I reach a limit?',
    a: [
      'You will see a notice inside the workspace when you approach a limit.',
      'Existing data stays fully available; only new records or attachments are paused until you free up space or upgrade.',
      'Admins also receive an email summary so they can plan ahead.',
    ],
  },
  {
    q: 'Do you offer discounts for nonprofits?',
    a: ['Registered nonprofits and accredited schools can apply for a reduced rate on the Team and Business plans. Approval usually takes a few business days.'],
  },
  {
    q: 'Which payment methods work?',
    a: ['Paid plans can be purchased with all major credit cards. Annual Business and Enterprise plans can also be paid by invoice.'],
  },
  {
    q: 'Can I switch between monthly and annual billing?',
    a: [
      'New workspaces start with a two-week trial of the Team plan.',
      'At the end of the trial you can pick a paid plan or continue on Starter with no action required.',
    ],
  },
  {
    q: 'I signed up under an older plan before these changes. How do the new plans apply to my account?',
    a: [
      'Workspace owners can cancel from the billing settings page at any time.',
      'Your plan stays active until the end of the period you already paid for.',
      'After that the workspace returns to Starter, and any data above the Starter limits becomes read-only.',
      'You can export everything before or after cancelling.',
      'If you change your mind, upgrading again restores full access immediately.',
    ],
  },
]
