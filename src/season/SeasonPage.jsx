import { useEffect } from 'react'
import './season.css'
import { Breadcrumb, Hero, PlatformHero } from './components/heroes.jsx'
import LogoCells from './components/LogoCells.jsx'
import CardGrid from './components/CardGrid.jsx'
import SideBySide from './components/SideBySide.jsx'
import FeatureCarousel from './components/FeatureCarousel.jsx'
import ScrollTabber from './components/ScrollTabber.jsx'
import Tabber from './components/Tabber.jsx'
import Integrations from './components/Integrations.jsx'
import { Stats, TemplatesCarousel, ReadNext, CtaBanner, Faq } from './components/blocks.jsx'
import { TabPanels, Stories, UseCaseCards, AiFoundation, OrgAccordion, HacSplit } from './components/platformB.jsx'

const TYPES = {
  hero: Hero,
  platformHero: PlatformHero,
  logos: LogoCells,
  cards: CardGrid,
  sideBySide: SideBySide,
  carousel: FeatureCarousel,
  scrollTabber: ScrollTabber,
  tabber: Tabber,
  integrations: Integrations,
  stats: Stats,
  templates: TemplatesCarousel,
  readNext: ReadNext,
  cta: CtaBanner,
  faq: Faq,
  tabPanels: TabPanels,
  stories: Stories,
  useCases: UseCaseCards,
  aiFoundation: AiFoundation,
  orgAccordion: OrgAccordion,
  hac: HacSplit,
}

// config: { skin: 'a' | 'season' | 'e', font: 'haas' | 'season', breadcrumb?: { items, sticky }, sections: [{ type, ...props }] }
export default function SeasonPage({ config }) {
  const { skin = 'a', font = 'season', heavy = false, breadcrumb, sections } = config
  useEffect(() => {
    if (font !== 'season') return
    document.documentElement.dataset.font = 'season'
    return () => {
      delete document.documentElement.dataset.font
    }
  }, [font])
  return (
    <div className="ss" data-skin={skin} data-heavy={heavy || undefined}>
      {breadcrumb && <Breadcrumb {...breadcrumb} />}
      {sections.map(({ type, ...props }, i) => {
        const C = TYPES[type]
        if (!C) throw new Error(`SeasonPage: unknown section type "${type}"`)
        return <C key={i} {...props} />
      })}
    </div>
  )
}
