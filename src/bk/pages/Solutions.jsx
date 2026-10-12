import Hero from '../../components/Hero.jsx'
import BreadcrumbBar from '../BreadcrumbBar.jsx'
import IconCardGrid from '../IconCardGrid.jsx'
import MediaTextRow from '../MediaTextRow.jsx'
import BkCtaRow from '../BkCtaRow.jsx'

// /solutions — specs/pages_solutions.md §1. Placeholder copy (original), matched to the spec word counts.
const TEAMS = [
  { name: 'Marketing', slug: 'marketing', card: 'Plan launches and campaigns with every asset in view.' },
  { name: 'Product', slug: 'product', card: 'Connect feedback, roadmaps and releases across every product squad.' },
  { name: 'Operations', slug: 'operations', card: 'Keep requests, vendors and inventory moving without manual follow-ups.' },
  { name: 'Finance', slug: 'finance', card: 'Track budgets and approvals in one reliable shared record.' },
  { name: 'Sales', slug: 'sales', card: 'Organize pipelines and account plans so deals keep progressing.' },
  { name: 'People', slug: 'people', card: 'Run onboarding, reviews and hiring plans from one place.' },
  { name: 'IT', slug: 'it', card: 'Manage assets, access requests and service tickets with clear ownership.' },
  { name: 'Public sector', slug: 'public-sector', card: 'Connect programs, agencies and partners in secure shared workspaces so every request and approval stays visible from intake to delivery.' },
]

const ROWS = [
  { team: 'Marketing', slug: 'marketing', body: 'Plan campaigns, track creative requests and report on every campaign result from one shared source of truth.' },
  { team: 'Product', slug: 'product', body: 'Bring roadmaps, feedback and release plans together so product decisions rest on shared context.' },
  { team: 'Operations', slug: 'operations', body: 'Coordinate vendors, inventory and requests in one place, with automations that keep handoffs moving on time.' },
  { team: 'Finance', slug: 'finance', body: 'Track budgets, approvals and forecasts in records that stay accurate as numbers change throughout the quarter.' },
  { team: 'Sales', slug: 'sales', body: 'Manage pipelines, account plans and every deal review in a workspace that updates itself as conversations move forward.' },
  { team: 'People', slug: 'people', body: 'Support onboarding, reviews and hiring plans with clear workflows that help every new teammate settle in.' },
]

export default function Solutions() {
  return (
    <>
      <BreadcrumbBar crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />
      <Hero
        video={false}
        title="Empower every team to build"
        sub="Shape flexible workflows around the way your people work and refine them as you grow."
        primary={{ label: 'Watch the webinar', href: '#' }}
        secondary={{ label: 'Contact sales', href: '/contact-sales' }}
      />
      <IconCardGrid
        eyebrow="Solutions"
        title="Build the right workflow for any team, at any scale"
        description="Start from a proven foundation, then adapt fields, views and automations to fit your team."
        cards={TEAMS.map((t) => ({
          title: `${t.name} teams`,
          description: t.card,
          link: { label: `Explore ${t.name}`, href: `/solutions/${t.slug}` },
        }))}
      />
      {ROWS.map((r, i) => (
        <MediaTextRow
          key={r.slug}
          reverse={i % 2 === 1}
          title={`Solutions for ${r.team.toLowerCase()} teams`}
          body={r.body}
          link={{ label: `Explore ${r.team.toLowerCase()} solutions`, href: `/solutions/${r.slug}` }}
        />
      ))}
      <BkCtaRow color="#333840" bg="#FFFFFF" title="Start building your next workflow" button={{ label: 'Get started', href: '/signup' }} />
    </>
  )
}
