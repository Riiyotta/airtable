// Route registry for the "standalone" page group. Each entry: { path: '/x', element: <Page /> }.
// Paths are relative to the site root, without the leading slash stripped (e.g. '/platform/ai').
import Pricing from '../standalone/pricing/Pricing.jsx'
import Templates from '../standalone/templates/Templates.jsx'

const routes = [
  { path: '/pricing', element: <Pricing /> },
  { path: '/templates', element: <Templates /> },
]
export default routes
