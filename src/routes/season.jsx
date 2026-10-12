// Route registry for the "season" page group. Each entry: { path: '/x', element: <Page /> }.
// Every page is data rendered by the generic SeasonPage (src/season/SeasonPage.jsx).
// `key` forces a fresh mount per route so section state (tabs, sliders) doesn't carry across pages.
import SeasonPage from '../season/SeasonPage.jsx'
import platform from '../season/pages/platform.js'
import ai from '../season/pages/ai.js'
import aiAgents from '../season/pages/aiAgents.js'
import appBuilding from '../season/pages/appBuilding.js'
import automations from '../season/pages/automations.js'
import connectedData from '../season/pages/connectedData.js'
import governance from '../season/pages/governance.js'
import hyperdb from '../season/pages/hyperdb.js'
import interfaceDesigner from '../season/pages/interfaceDesigner.js'
import portals from '../season/pages/portals.js'
import reporting from '../season/pages/reporting.js'
import marketing from '../season/pages/marketing.js'
import product from '../season/pages/product.js'
import operations from '../season/pages/operations.js'
import enterprise from '../season/pages/enterprise.js'
import about from '../season/pages/about.js'

const pages = {
  '/platform': platform,
  '/platform/ai': ai,
  '/platform/ai-agents': aiAgents,
  '/platform/app-building': appBuilding,
  '/platform/automations': automations,
  '/platform/connected-data': connectedData,
  '/platform/governance': governance,
  '/platform/hyperdb': hyperdb,
  '/platform/interface-designer': interfaceDesigner,
  '/platform/portals': portals,
  '/platform/reporting': reporting,
  '/solutions/marketing': marketing,
  '/solutions/product': product,
  '/solutions/operations': operations,
  '/solutions/enterprise': enterprise,
  '/about': about,
}

const routes = Object.entries(pages).map(([path, config]) => ({
  path,
  element: <SeasonPage key={path} config={config} />,
}))
export default routes
