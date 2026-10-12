import { useState } from 'react'
import MockMedia from '../../media/MockMedia.jsx'
import './templates.css'
import { HERO, NAV_GROUPS, ASIDE_FOOTER, PALETTES, TILES, FEATURED, CATEGORY_SECTIONS } from './templatesData.js'

const grad = (pair, dir = 'to right bottom') => `linear-gradient(${dir}, ${pair[0]}, ${pair[1]})`

const SearchIcon = () => (
  <svg className="tpl-search__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const Chevron = ({ open }) => (
  <svg className={`tpl-chev ${open ? 'is-open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Sparkle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5l1.6 4.9L14.5 8l-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6L8 1.5z" fill="#fff" />
  </svg>
)

// Template "screenshot": an original product-UI scene inside the existing .tpl-mock window box
// (kind picked from the template title; varied by seed when the title has no keyword).
const Mock = ({ title, seed }) => (
  <div className="tpl-mock" aria-hidden="true">
    <MockMedia hint={title} seed={seed} bare />
  </div>
)

function Search({ className = '' }) {
  return (
    <form role="search" className={`tpl-search ${className}`} onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <input type="search" placeholder="Search templates" aria-label="Search templates" />
    </form>
  )
}

function NavGroup({ group }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="tpl-navgroup">
      <button type="button" className="tpl-navgroup__head" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <h3>{group.title}</h3>
        <Chevron open={open} />
      </button>
      {open && (
        <ul>
          {group.links.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      )}
    </div>
  )
}

function NavGroups() {
  return (
    <nav className="tpl-nav" aria-label="Template categories">
      {NAV_GROUPS.map((g) => (
        <NavGroup group={g} key={g.title} />
      ))}
    </nav>
  )
}

function Aside() {
  return (
    <aside className="tpl-aside">
      <Search />
      <NavGroups />
      <div className="tpl-aside__foot">
        <a href="#" className="tpl-aside__pill">{ASIDE_FOOTER.label} →</a>
        <p>{ASIDE_FOOTER.caption}</p>
      </div>
    </aside>
  )
}

// <1024: the aside collapses to a search + categories control row (control not measured in spec).
function MobileAside() {
  const [open, setOpen] = useState(false)
  return (
    <div className="tpl-maside">
      <div className="tpl-maside__row">
        <Search className="tpl-search--m" />
        <button type="button" className="tpl-maside__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          Categories <Chevron open={open} />
        </button>
      </div>
      {open && <NavGroups />}
    </div>
  )
}

function TemplateCard({ card }) {
  return (
    <a href="#" className="tpl-card">
      <div className="tpl-card__media" style={{ background: grad(card.palette.pastel) }}>
        <div className="tpl-card__frame" style={{ background: grad(card.palette.deep) }}>
          <Mock title={card.title} seed={card.title} />
          {card.ai && (
            <span className="tpl-ai">
              <Sparkle />
              AI
            </span>
          )}
        </div>
      </div>
      <div className="tpl-card__text">
        <h3 className="tpl-card__title">{card.title}</h3>
        <p className="tpl-card__desc">{card.description}</p>
      </div>
      <div className="tpl-card__foot" />
    </a>
  )
}

export default function Templates() {
  return (
    <div className="tpl">
      <header className="tpl-head">
        <h1>{HERO.title}</h1>
        <p>{HERO.subtitle}</p>
      </header>

      <div className="tpl-body">
        <Aside />
        <MobileAside />

        <div className="tpl-main">
          <div className="tpl-tiles">
            {TILES.map((t, i) => (
              <a href="#" className="tpl-tile" key={t}>
                <span className="tpl-tile__icon" style={{ background: grad(PALETTES[i % 4].deep) }} aria-hidden="true" />
                <span className="tpl-tile__label">{t}</span>
              </a>
            ))}
          </div>

          <section className="tpl-featured">
            <h2 className="tpl-h2">Featured templates</h2>
            <div className="tpl-featured__grid">
              {FEATURED.map((t, i) => (
                <a href="#" className="tpl-fcard" key={t} style={{ background: grad(PALETTES[i].pastel) }}>
                  <div className="tpl-fcard__copy"><h3>{t}</h3></div>
                  <div className="tpl-fcard__media">
                    <div className="tpl-fcard__img" style={{ background: grad(PALETTES[i].deep) }}>
                      <Mock title={t} seed={t} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {CATEGORY_SECTIONS.map((s) => (
            <section className="tpl-section" key={s.heading}>
              <div className="tpl-section__head">
                <h2 className="tpl-h2">{s.heading}</h2>
                <a href="#" className="tpl-viewall">View all</a>
              </div>
              <div className="tpl-grid">
                {s.cards.map((c) => (
                  <TemplateCard card={c} key={c.title} />
                ))}
              </div>
            </section>
          ))}

          <div className="tpl-cta">
            <p>
              Not seeing the right template?
              <br />
              Start from a blank base.
            </p>
            <a href="/signup">Try it for free</a>
          </div>
        </div>
      </div>
    </div>
  )
}
