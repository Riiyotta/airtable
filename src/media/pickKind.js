// Chooses a scene kind from the slot's own copy (title / label / headline). Falls back to a
// seeded rotation through the product-UI kinds so a page stays varied.
import { hashSeed } from './rng.js'

export const UI_KINDS = ['grid', 'kanban', 'dashboard', 'gallery', 'timeline', 'calendar', 'interface', 'form']

const RULES = [
  [/\bautomat(e|es|ed|ion|ions|ing)\b|trigger|workflow|\bflows?\b|routing|approval|busywork|handoff/i, 'automation'],
  [/\bai\b|agent|assistant|prompt|generat|intelligen|summar|copilot|chat/i, 'ai'],
  [/integrat|connect|\bsync|hub\b|ecosystem|extension|\bapi\b|plug/i, 'hub'],
  [/report|dashboard|insight|analytic|metric|chart|visibil|kpi|forecast|budget/i, 'dashboard'],
  [/\bforms?\b|intake|request|portal|external|client|onboard|survey|submission/i, 'form'],
  [/interface|app.?build|builder|\bapps?\b|layout|design/i, 'interface'],
  [/calendar|schedul|\bevents?\b|editorial|social media/i, 'calendar'],
  [/timeline|roadmap|\bplan|launch|gantt|project|milestone|release/i, 'timeline'],
  [/gallery|asset|creative|content|catalog|library|media|brand|inventory/i, 'gallery'],
  [/kanban|pipeline|board|stage|sprint|hiring|\bbugs?\b|triage|backlog/i, 'kanban'],
  [/govern|secur|admin|permission|complian|enterprise|scale|hyperdb|\bdata\b|record|table|\bbase\b/i, 'grid'],
]

export function hintText(hint) {
  if (hint == null || hint === false) return ''
  if (Array.isArray(hint)) return hint.map(hintText).join(' ')
  if (typeof hint === 'string' || typeof hint === 'number') return String(hint)
  return ''
}

export function pickKind(hint, seed = 0, fallback = UI_KINDS) {
  const text = hintText(hint)
  for (const [re, kind] of RULES) if (re.test(text)) return kind
  return fallback[hashSeed(`${text}|${seed}`) % fallback.length]
}
