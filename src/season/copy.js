// Placeholder copy generator. Our own neutral product-marketing text, sized to the
// spec's word counts so line wraps and block heights match the measured layouts.
//   t(n, key)  -> n words of body copy (complete sentences)
//   h(n, key)  -> n-word title/heading phrase (no trailing period)
//   q(n, key)  -> n-word question
// `key` seeds the pick so the same call always returns the same text.

const SENTENCES = [
  'Everything stays connected.',
  'Teams move faster together.',
  'Start in minutes.',
  'Work flows naturally.',
  'Data stays trusted.',
  'Nothing falls through the cracks.',
  'Every update stays visible.',
  'Plans turn into progress.',
  'Context travels with the work.',
  'Keep every stakeholder on track.',
  'Build once and reuse it everywhere.',
  'Decisions happen with full context.',
  'Changes sync across every view instantly.',
  'Bring scattered requests into one place.',
  'Give every team a shared foundation to build on.',
  'Spend less time chasing status updates.',
  'Automate the handoffs that slow work down.',
  'Connect the tools your teams already rely on.',
  'Set up structured workflows without writing any code.',
  'Everyone sees the same source of truth at once.',
  'Turn repeatable processes into reliable systems that scale with you.',
  'Capture ideas, assign owners and track progress in a single workspace.',
  'Leaders get a clear picture of what is moving and what is stuck.',
  'Permissions keep sensitive records visible only to the people who need them.',
  'Reports update automatically as the underlying records change across the business.',
  'Small teams can start simple and add structure as their needs grow over time.',
  'Assistants summarize long threads so reviewers can focus on the decisions that matter most.',
  'Flexible views let each person see the work in the format that suits them best.',
  'Templates help new projects launch with proven structure from the very first day.',
  'Integrations pull data in from the apps you use, so nothing needs to be copied by hand.',
  'Admins can review usage, manage access and apply policies from one central console.',
  'Every change is logged.',
  'Approvals move without email chains.',
  'Dashboards refresh on their own.',
  'Agents handle the busywork in the background.',
  'Customize fields, layouts and rules to match how you operate.',
  'Share live progress with partners without exposing internal details.',
  'Forecasts improve when every input lives in the same connected system.',
  'Launch faster with building blocks designed for real business processes.',
  'Your data model grows alongside your organization without painful migrations.',
  'Clear ownership means fewer meetings and faster follow-through.',
  'Workflows stay consistent across regions, teams and time zones.',
  'Feedback lands in the right queue and reaches the right owner automatically.',
  'Built-in guardrails keep experimentation safe while giving teams room to explore new ideas.',
  'From intake to delivery, every step is tracked in one place.',
  'Search across records, files and comments to find answers quickly.',
  'Roll out changes gradually and measure their impact before going wide.',
  'Structured data makes it easy to spot trends and act on them early.',
]

const TITLES = [
  'Overview',
  'Shared data',
  'Plan faster',
  'Launch with confidence',
  'Connected team workflows',
  'One place for everything',
  'Automate the busywork away',
  'Scale processes across every team',
  'Turn requests into tracked work',
  'Keep projects moving without the chaos',
  'Give every team a single source of truth',
  'Build custom apps around the way you already work',
  'Bring planning, execution and reporting together in one workspace',
  'Visibility for leaders',
  'Reliable data at scale',
  'Flexible views for every role',
  'Guardrails that keep everyone aligned',
  'Approvals that move at the speed of work',
  'Smarter reviews with built-in assistants',
  'A clearer picture of progress across the business',
  'Track every initiative from first idea to final delivery',
  'Templates and building blocks for your next project',
  'Reports that refresh automatically',
  'Faster handoffs',
  'Secure sharing',
  'Insights in minutes',
  'Simple tools for complex operations',
  'Connect your existing tools in a few clicks',
  'A shared workspace for planning and delivery',
  'Fewer status meetings and more focused work',
  'Better forecasts from connected data across every team',
  'Launch new workflows in days instead of months with reusable building blocks',
  'Make every team more productive with structured, connected workflows they can shape',
]

const QUESTIONS = [
  'Who owns setup?',
  'Can admins restrict access to specific fields?',
  'How do we migrate several years of project history without losing structure or context?',
  'What is a workspace?',
  'Who can edit records?',
  'How does pricing work?',
  'Can I import existing data?',
  'Is there a free plan available?',
  'How do permissions work across teams?',
  'Can I connect the tools we already use?',
  'How long does it take to get started?',
  'What kind of support is included with each plan?',
  'Can assistants work with the data already in my workspace?',
  'How is our information protected and who can access it?',
  'Can different teams customize their own views without affecting others?',
  'What happens to existing workflows when we add new automations later?',
  'How do admins manage access, policies and usage across a large organization?',
  'Do I need technical experience to build an app or automation?',
  'Can we share progress with external partners without exposing internal records?',
  'How does the platform handle very large data sets and many users?',
  'Is it possible to roll out changes gradually to a few teams first?',
]

const count = (s) => s.trim().split(/\s+/).length
const bucket = (list) => {
  const m = {}
  for (const s of list) (m[count(s)] ||= []).push(s)
  return m
}
const S = bucket(SENTENCES)
const T = bucket(TITLES)
const Q = bucket(QUESTIONS)

function hash(key = '') {
  let x = 2166136261
  for (let i = 0; i < key.length; i++) x = Math.imul(x ^ key.charCodeAt(i), 16777619)
  return Math.abs(x)
}

const lens = Object.keys(S).map(Number).sort((a, b) => a - b)
// reachable[r] -> can r words be filled exactly with whole sentences
const MAXN = 400
const reachable = new Array(MAXN + 1).fill(false)
reachable[0] = true
for (let r = 1; r <= MAXN; r++) reachable[r] = lens.some((l) => l <= r && reachable[r - l])

// Character-length targeting: pass '118c' instead of a word count to get placeholder text of
// ~118 characters, so line wraps match the live layout at the same width/font (lengths only).
const isC = (n) => typeof n === 'string' && /^\d+c$/.test(n)
const STOP = /^(and|the|a|an|for|of|to|with|in|on|at|every|without|from|by|your|their|into|across|that|so|or|is|are|it|as|you|one)$/i
function cutWords(words, c, period) {
  let best = 1
  let bestD = Infinity
  for (let i = 1, len = words[0].length; i <= words.length; len += (words[i] || '').length + 1, i++) {
    const d = Math.abs(len - c)
    if (d < bestD) {
      bestD = d
      best = i
    }
    if (len > c + 20) break
  }
  // prefer a natural boundary (sentence end / title join) within 6 chars of the target
  for (let i = 1, len = words[0].length; i <= words.length; len += (words[i] || '').length + 1, i++) {
    const nb = words[i] === 'and' || /[.]$/.test(words[i - 1])
    if (nb && Math.abs(len - c) <= 6 && Math.abs(len - c) <= bestD + 4) {
      best = i
      break
    }
    if (len > c + 8) break
  }
  let out = words.slice(0, best)
  if (!period) while (out.length > 1 && STOP.test(out[out.length - 1].replace(/[^\w]/g, ''))) out = out.slice(0, -1)
  let str = out.join(' ').replace(/[,;:.]+$/, '')
  return period ? str + '.' : str
}
function stream(list, key, c, joiner) {
  let seed = hash(key + c)
  const words = []
  while (words.join(' ').length < c + 40) {
    if (joiner && words.length) words.push(joiner)
    words.push(...list[seed % list.length].split(' '))
    seed = hash(String(seed))
  }
  return words
}
function tc(n, key) {
  const c = parseInt(n, 10)
  return cutWords(stream(SENTENCES, key, c), c, true)
}
function hcut(n, key) {
  const c = parseInt(n, 10)
  const fits = TITLES.filter((x) => Math.abs(x.length - c) <= 1)
  if (fits.length) return fits[hash(key) % fits.length]
  const w = stream(TITLES, key, c, 'and').map((x, i) => (i ? x.toLowerCase() : x))
  return cutWords(w, c, false)
}

export function t(n, key = '') {
  if (isC(n)) return tc(n, key)
  if (n <= 0) return ''
  if (!reachable[n]) return h(n, key) + '.'
  let seed = hash(key + n)
  let rem = n
  const out = []
  while (rem > 0) {
    // prefer mid-length sentences, then anything that keeps the remainder fillable
    const prefs = lens.filter((l) => l <= rem && reachable[rem - l])
    const mid = prefs.filter((l) => l >= 8 && l <= 14)
    const pool = mid.length ? mid : prefs
    const l = pool[seed % pool.length]
    const opts = S[l]
    out.push(opts[(seed >> 3) % opts.length])
    seed = hash(String(seed))
    rem -= l
  }
  return out.join(' ')
}

function pick(map, n, key, joiner) {
  if (map[n]) return map[n][hash(key) % map[n].length]
  // compose from two shorter phrases if no exact match
  const ks = Object.keys(map).map(Number).filter((k) => k < n)
  for (const a of ks.sort((x, y) => y - x)) {
    if (map[n - 1 - a]) return pick(map, a, key, joiner) + joiner + pick(map, n - 1 - a, key + 'b', joiner).toLowerCase()
  }
  return pick(map, ks[ks.length - 1], key, joiner)
}

export const h = (n, key = '') => (isC(n) ? hcut(n, key) : pick(T, n, key, ' and '))
export const q = (n, key = '') => {
  if (isC(n)) {
    const c = parseInt(n, 10)
    const fits = QUESTIONS.filter((x) => Math.abs(x.length - c) <= 2)
    return fits.length ? fits[hash(key) % fits.length] : hcut(`${c - 1}c`, key) + '?'
  }
  if (Q[n]) return Q[n][hash(key) % Q[n].length]
  return n > 4 ? h(n - 4, key) + ': how does it work?' : 'How does it work?'.split(' ').slice(0, n).join(' ')
}

// FAQ answers: list of paragraph word counts -> paragraphs
export const paras = (counts, key) => counts.map((c, i) => t(c, `${key}-${i}`))

// Neutral fictional wordmarks for logo placeholders
export const BRANDS = [
  'Northwind', 'Lumen', 'Arcadia', 'Brightline', 'Kestrel', 'Halcyon', 'Meridian', 'Ostara',
  'Pinecrest', 'Quartz', 'Solace', 'Tidewater', 'Vantage', 'Juniper', 'Copperleaf', 'Evergrid',
]
export const brands = (n, offset = 0) => Array.from({ length: n }, (_, i) => BRANDS[(i + offset) % BRANDS.length])
