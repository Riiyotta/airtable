import BreadcrumbBar from '../BreadcrumbBar.jsx'
import PageHeroSplit from '../PageHeroSplit.jsx'
import FilterListing from '../FilterListing.jsx'

// /ai-plays — specs/pages_solutions.md §8. Original placeholder copy.
const PILLS = {
  Operations: { bg: '#FFE0CC', color: '#AF3803' },
  'Marketing & Creative': { bg: '#FCCCF0', color: '#AB0A83' },
  'Digital Product': { bg: '#C7E5F2', color: '#0076A8' },
  // "Physical Product" colors were not measured (SECTION_TYPES_solutions §9); neutral pill used instead.
  'Physical Product': { bg: '#E0E2E6', color: '#444444' },
}
const FEATURES = [
  'Content Drafting', 'Field Summaries', 'Record Categorization', 'Data Extraction', 'Sentiment Analysis', 'Image Tagging',
]
const play = (category, feature, title, desc) => ({
  title,
  desc,
  category,
  feature,
  href: '#',
  pill: { ...PILLS[category], label: category, icon: true },
})

const FEATURED = [
  play('Operations', 'Field Summaries', 'Summarize vendor updates into weekly status notes',
    'Collect incoming vendor messages, condense the key points with AI, and route a short weekly digest to every owner.'),
  play('Marketing & Creative', 'Content Drafting', 'Draft campaign briefs from a few inputs',
    'Turn goals, audience notes and timelines into a structured first draft that your team can refine together.'),
  play('Digital Product', 'Record Categorization', 'Sort incoming feedback into clear product themes',
    'Tag each piece of user feedback by theme and urgency so planning sessions start from organized, searchable evidence rather than notes.'),
]
const ITEMS = [
  play('Operations', 'Record Categorization', 'Classify incoming service requests by team',
    'Read each new request, assign a category and priority, and send it to the right queue automatically for follow-up.'),
  play('Operations', 'Data Extraction', 'Extract key details from supplier invoices',
    'Pull totals, dates and supplier names out of uploaded documents and fill every matching field without manual typing.'),
  play('Marketing & Creative', 'Content Drafting', 'Write social post variations for launches',
    'Generate several short post options from one approved message so each is ready for review before scheduling.'),
  play('Marketing & Creative', 'Image Tagging', 'Tag creative assets by theme and mood',
    'Label images in your asset library by subject and mood so designers can find the right visual for each brief faster.'),
  play('Digital Product', 'Field Summaries', 'Summarize user research notes quickly',
    'Condense long interview notes into a few key findings that link back to source records.'),
  play('Digital Product', 'Sentiment Analysis', 'Gauge customer sentiment across product reviews',
    'Score each review as positive, neutral or negative and surface recurring complaints for the whole team to discuss each week.'),
  play('Physical Product', 'Field Summaries', 'Draft summaries of supplier requests',
    'Prepare a concise summary of each supplier request, including quantities and deadlines, before it reaches procurement for approval.'),
  play('Physical Product', 'Record Categorization', 'Categorize quality inspection notes by defect type and severity level',
    'Group inspection findings by defect type so recurring issues are easy to spot across runs.'),
  play('Operations', 'Content Drafting', 'Generate onboarding checklists for every new hire',
    'Create a tailored checklist for each new hire based on role, location, team and start date, then assign each task to the right owner in seconds.'),
]

export default function AiPlays() {
  return (
    <>
      <BreadcrumbBar crumbs={[{ label: 'Home', href: '/' }, { label: 'AI Plays' }]} />
      <PageHeroSplit
        theme="dark"
        title="Put AI plays to work: High-impact workflows to try now"
        description="Browse ready-made plays that pair AI with the processes you already run."
      />
      <FilterListing
        featured={FEATURED}
        gridTitle="AI Plays"
        items={ITEMS}
        groups={[
          { key: 'category', title: 'Category', options: Object.keys(PILLS) },
          { key: 'feature', title: 'AI Feature', options: FEATURES },
        ]}
        card={{ layout: 'imageBottom', desc: true, mediaKind: 'ai' }}
        spacious
      />
    </>
  )
}
