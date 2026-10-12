// Route registry for the "bk" page group. Each entry: { path: '/x', element: <Page /> }.
// Paths are relative to the site root, without the leading slash stripped (e.g. '/platform/ai').
import Solutions from '../bk/pages/Solutions.jsx'
import Integrations from '../bk/pages/Integrations.jsx'
import AiPlays from '../bk/pages/AiPlays.jsx'
import CustomerStories from '../bk/pages/CustomerStories.jsx'
import Guides from '../bk/pages/Guides.jsx'
import ContactSales from '../bk/pages/ContactSales.jsx'

const routes = [
  { path: '/solutions', element: <Solutions /> },
  { path: '/integrations', element: <Integrations /> },
  { path: '/ai-plays', element: <AiPlays /> },
  { path: '/customer-stories', element: <CustomerStories /> },
  { path: '/guides', element: <Guides /> },
  { path: '/contact-sales', element: <ContactSales /> },
]
export default routes
