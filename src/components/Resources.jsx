import './Resources.css'
import ResourceCard from './ResourceCard.jsx'

const CARDS = [
  {
    title: 'Builders & Breakthroughs',
    desc: 'Hear from top product leaders as they share the pivotal insights and decisions behind building great products—hosted by Airtable CEO Howie Liu.',
    href: '/breakthroughs',
    img: '/assets/45d538de0379cda686e8cb0955ff093c4a622396-1280x720.png',
  },
  {
    title: 'The 2026 AI guide for marketers',
    desc: 'Learn how to prep your marketing organization for AI integration and layer Airtable across your most critical marketing workflows.',
    href: '/lp/resources/ebooks/ultimate-ai-guide-for-marketers',
    img: '/assets/dbb582f012767c2d5af97325037acde823f24b09-1600x900.webp',
  },
  {
    title: 'In action: Airtable ProductCentral',
    desc: 'See how Airtable ProductCentral delivers a complete view of product investments at every altitude, infusing AI at each step of the product development process.',
    href: '/lp/resources/demos/airtable-productcentral-demo',
    img: '/assets/09c27aadb37c8c514837812d6c4a3133ad340477-1920x1081.webp',
  },
]

export default function Resources() {
  return (
    <section className="res-outer">
      <div className="res-inner">
        <div className="res-grid">
          <p className="res-title">Resources to inspire</p>
          <div className="res-cards">
            {CARDS.map((c) => (
              <ResourceCard key={c.title} title={c.title} desc={c.desc} href={c.href} img={c.img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
