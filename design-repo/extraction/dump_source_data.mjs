// Snapshot the data-only modules of the clone (no JSX) so copy budgets, section
// sequences and item counts can be derived from real, resolved values.
//   - src/season/pages/*.js  (16 Season page configs; placeholder copy resolved via src/season/copy.js)
//   - src/standalone/pricing/pricingData.js
//   - src/standalone/templates/templatesData.js
// Build-time evidence only. If the sibling source tree is absent this warns and exits 0,
// leaving the committed extraction/source-data.snapshot.json untouched.
// Usage: node extraction/dump_source_data.mjs [--write | --stdout-json]
import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const REPO = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const PROJECT = path.dirname(REPO)
const SEASON_ROUTES = {
  '/platform': 'platform', '/platform/ai': 'ai', '/platform/ai-agents': 'aiAgents',
  '/platform/app-building': 'appBuilding', '/platform/automations': 'automations',
  '/platform/connected-data': 'connectedData', '/platform/governance': 'governance',
  '/platform/hyperdb': 'hyperdb', '/platform/interface-designer': 'interfaceDesigner',
  '/platform/portals': 'portals', '/platform/reporting': 'reporting',
  '/solutions/marketing': 'marketing', '/solutions/product': 'product',
  '/solutions/operations': 'operations', '/solutions/enterprise': 'enterprise', '/about': 'about',
}
const load = (rel) => import(pathToFileURL(path.join(PROJECT, rel)).href)

if (!existsSync(path.join(PROJECT, 'src', 'season', 'pages'))) {
  console.log('WARN: sibling source tree not found; keeping committed extraction/source-data.snapshot.json')
  process.exit(0)
}
const season = {}
for (const [route, file] of Object.entries(SEASON_ROUTES)) {
  season[route] = { file: `src/season/pages/${file}.js`, config: (await load(`src/season/pages/${file}.js`)).default }
}
const pricing = await load('src/standalone/pricing/pricingData.js')
const tpl = await load('src/standalone/templates/templatesData.js')
const out = {
  generatedBy: 'extraction/dump_source_data.mjs',
  season,
  pricing: { file: 'src/standalone/pricing/pricingData.js', ...Object.fromEntries(Object.entries(pricing)) },
  templates: { file: 'src/standalone/templates/templatesData.js', ...Object.fromEntries(Object.entries(tpl)) },
}
const json = JSON.stringify(out, null, 1)
if (process.argv.includes('--write')) {
  writeFileSync(path.join(REPO, 'extraction', 'source-data.snapshot.json'), json + '\n')
  console.log(`wrote extraction/source-data.snapshot.json (${Object.keys(season).length} season routes)`)
} else if (process.argv.includes('--stdout-json')) {
  process.stdout.write(json + '\n')
} else console.log(json.slice(0, 2000))
