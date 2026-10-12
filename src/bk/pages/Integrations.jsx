import BreadcrumbBar from '../BreadcrumbBar.jsx'
import PageHeroSplit from '../PageHeroSplit.jsx'
import FilterListing from '../FilterListing.jsx'
import BkCtaRow from '../BkCtaRow.jsx'

// /integrations — specs/pages_solutions.md §7. Invented app names; original placeholder copy.
const PILL = { bg: '#E0E2E6', color: '#444444' }
const CATEGORIES = [
  'Analytics', 'Calendar', 'Communication', 'CRM', 'Design', 'Developer Tools', 'Email',
  'File Management', 'Finance', 'Marketing', 'Productivity', 'Project Management', 'Support',
]
const APPS = [
  'Atlas Sync', 'Beacon', 'Cobalt Mail', 'Driftwood', 'Ember Docs', 'Fieldnote', 'Granite CRM', 'Harbor Chat',
  'Inkwell', 'Juniper', 'Keystone', 'Lumen Analytics', 'Meridian', 'Nimbus Files', 'Orbit Calendar', 'Pinecone',
  'Quarry', 'Relay Desk', 'Sable Pay', 'Tidewater', 'Umbra Design', 'Vantage', 'Willow Forms', 'Xenon Dev',
  'Yardstick', 'Zephyr Mail', 'Bramble',
]
const item = (title, category) => ({ title, category, href: '#', pill: { ...PILL, label: category } })

const FEATURED = [
  item('Sync files from your cloud storage app', 'File Management'),
  item('Send updates to your chat workspace', 'Communication'),
  item('Pull fresh leads in from your CRM tool', 'CRM'),
]
const ITEMS = APPS.map((name, i) => item(name, CATEGORIES[i % CATEGORIES.length]))

export default function Integrations() {
  return (
    <>
      <BreadcrumbBar crumbs={[{ label: 'Home', href: '/' }, { label: 'Integrations' }]} />
      <PageHeroSplit
        theme="light"
        title="Connect your data"
        description="Link the tools your teams already rely on to keep important records in sync and build connected apps without copying data between them."
      />
      <FilterListing
        featuredTitle="Featured Integrations"
        featured={FEATURED}
        gridTitle="All Integrations"
        items={ITEMS}
        groups={[{ key: 'category', title: 'Category', options: CATEGORIES }]}
        card={{ layout: 'imageTop', desc: false, mediaKind: 'hub' }}
      />
      {/* live: CTA band after the listing (248 desktop / 286 mobile) */}
      <BkCtaRow as="h1" title="See how your tools fit together." button={{ label: 'Get started', href: '/signup' }} />
    </>
  )
}
