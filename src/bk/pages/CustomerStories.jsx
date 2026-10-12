import BreadcrumbBar from '../BreadcrumbBar.jsx'
import HeroCarouselCentered from '../HeroCarouselCentered.jsx'
import CardGridLoadMore from '../CardGridLoadMore.jsx'
import BkCtaRow from '../BkCtaRow.jsx'
import BkLogoStrip from '../BkLogoStrip.jsx'

// /customer-stories — specs/pages_solutions.md §9. Invented organizations and original placeholder copy.
const STORIES = [
  // Order/lengths matched to the live grid: 3-line titles at positions 4, 6, 10 on mobile (4 also at 1280).
  ['Northpeak', 'How a regional retailer cut weekly reporting time in half'],
  ['Lumora', 'A design studio keeps every client project on one timeline'],
  ['Kestrel', 'How one media team publishes faster with fewer handoffs'],
  ['Saltmarsh', 'A hospitality group standardizes every new opening across thirty busy locations'],
  ['Harborline', 'A logistics company gives every site the same live data'],
  ['Brightfold', "Inside a nonprofit's move from spreadsheets to shared workflows"],
  ['Quillstone', 'Why a growing startup built its launch process from scratch'],
  ['Ridgeway', 'How a university team tracks hundreds of research grants'],
  ['Corewright', 'How a hardware maker shortened its product review cycle'],
  ['Arcwell', 'A software company aligns roadmaps across five product groups'],
  ['Fernhall', 'An agency connects creative requests to billing in one place'],
  ['Ledgerly', 'How a finance team closes the month with fewer surprises'],
  ['Galleria', 'How a museum catalogs its collection with a small team'],
  ['Orchard & Co', 'A food brand plans seasonal launches without missed deadlines'],
  ['Fieldhouse', 'How a sports league coordinates schedules across many venues'],
  ['Mendwell', 'A health network tracks equipment requests from every clinic'],
  ['Pagewright', 'How a publisher manages hundreds of titles each season'],
  ['Steelbeam', 'A construction firm keeps project documents organized on site'],
  ['Convene', 'How an events team runs registration for global conferences'],
  ['Threadline', 'A fashion label connects design, sourcing and production calendars'],
  ['Civica', 'How a city office answers resident requests more quickly'],
  ['Helixa', 'A biotech lab organizes experiments with consistent shared records'],
  ['Wayfarer', 'How a travel company updates itineraries for thousands of guests'],
  ['Talentry', 'A recruiting team shortens time to hire with clearer stages'],
].map(([logo, title]) => ({ logo, title, href: '#' }))

export default function CustomerStories() {
  return (
    <>
      <BreadcrumbBar crumbs={[{ label: 'Home', href: '/' }, { label: 'Customer Stories' }]} />
      <HeroCarouselCentered
        eyebrow="Customer stories"
        title="Inspiring teams doing their best work"
        slides={[
          { label: 'Featured story 1', href: '#', kind: 'Customer story', title: 'How a regional retailer halved its reporting', cta: 'Read now' },
          { label: 'Featured story 2', href: '#', kind: 'Video', title: 'A studio brings every client project into view', cta: 'Watch now' },
          { label: 'Featured story 3', href: '#', kind: 'Customer story', title: 'A nonprofit moves off its old spreadsheets', cta: 'Read now' },
        ]}
      />
      <BkLogoStrip heading="Relied on by growing organizations" logos={['Northpeak', 'Lumora', 'Brightfold', 'Kestrel']} />
      <CardGridLoadMore items={STORIES} pageSize={12} />
      <BkCtaRow as="h1" color="#333840" bg="#F0F6FF" title="See what your team could build next" button={{ label: 'Start for free', href: '/signup' }} />
    </>
  )
}
