import BreadcrumbBar from '../BreadcrumbBar.jsx'
import GuidesBanner from '../GuidesBanner.jsx'
import SidebarNavGrid from '../SidebarNavGrid.jsx'
import BkCtaRow from '../BkCtaRow.jsx'

// /guides — specs/pages_solutions.md §10. Original placeholder copy.
// Titles/descriptions sized to the live per-card line counts (title / description lines at 1440 · 1280 · 390).
const GUIDES = [
  ['Getting started', 6, 'Learn the building blocks of a workspace, from tables and fields to records, and set up your first project.'],
  ['Building bases', 9, 'Structure information so it scales, with tips on linking tables, picking field types and keeping data tidy as your work grows.'],
  ['Views, filters and saved layouts', 7, 'See the same records in different ways using grids, boards, calendars and filters for each audience.'],
  ['Automation basics', 8, 'Set up triggers and actions that handle repetitive steps and keep records updated for you.'],
  ['Interfaces 101', 5, 'Design focused pages that show every teammate only the information and controls needed.'],
  ['Sharing and permissions', 4, 'Decide who can view, comment on or edit your work, and share it safely with collaborators both inside and outside your organization.'],
  ['Reporting with dashboards', 6, 'Turn records into charts and summaries so that leaders can follow progress, recognize emerging trends and decide confidently.'],
  ['AI features', 5, 'Explore ways to draft content, summarize long fields and categorize records with AI, then review every result.'],
]
const TOPICS = GUIDES.map(([label]) => ({ label, href: '#' }))
// Quick Start button labels sized to the live button widths (203 / 131.7 / 259.2 / 248.9 / 240.7 / 205.3 / 274.4 / 174.6)
// so they wrap into the same rows at 1440 / 1280 / 390.
const QUICK = [
  'Getting started fast', 'Base basics', 'Structuring bases that scale', 'Automation fundamentals',
  'Views, filters and groups', 'Sharing and access', 'Reporting and dashboard tips', 'Using AI features',
].map((label) => ({ label, href: '#' }))

export default function Guides() {
  return (
    <>
      <BreadcrumbBar crumbs={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />
      <GuidesBanner
        title="Build new skills at your own pace"
        subtitle="Short, practical guides walk you through core features, common setups and habits that help teams."
        topics={QUICK}
        items={[
          { title: 'Planning your first base', href: '#' },
          { title: 'Designing a clear interface', href: '#' },
          { title: 'Automating routine team updates', href: '#' },
        ]}
      />
      <SidebarNavGrid
        topics={TOPICS}
        cards={GUIDES.map(([title, n, desc]) => ({ title, desc, href: '#', meta: ['Guide', `${n} articles`] }))}
      />
      {/* live: callout CTA band after the grid (#F0F6FF, 247.6 desktop / 254.8 mobile with a 1-line heading) */}
      <BkCtaRow as="h1" color="#333840" bg="#F0F6FF" title="Start building today" button={{ label: 'Get started', href: '/signup' }} />
    </>
  )
}
