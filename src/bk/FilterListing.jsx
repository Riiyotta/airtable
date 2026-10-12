import { useMemo, useState } from 'react'
import ResourceCard from '../components/ResourceCard.jsx'
import BkSectionHeader from './BkSectionHeader.jsx'
import './FilterListing.css'

// BK-4 FilterListing — SECTION_TYPES_solutions §3 BK-4. Shared by /integrations and /ai-plays.
//   featuredTitle: optional BkSectionHeader over the featured grid (integrations only)
//   featured / items: [{ title, desc?, href, pill: {label,bg,color,icon?}, ...filterKeys }]
//   groups: [{ key, title, options: [label] }] — item[key] is a string or array of strings
//   card: { layout: 'imageTop'|'imageBottom', desc: bool, mediaKind?: MockMedia kind for the card art }
//   spacious: AI Plays spacing (featured row-gap 48 + mb 48; main row-gap 48; mobile main inset 24)
// Filtering is client-side and instant: OR within a group, AND across groups; applies to both grids. No URL change.
export default function FilterListing({ featuredTitle, featured, gridTitle, items, groups, card, spacious = false }) {
  const [checked, setChecked] = useState({}) // { [groupKey]: Set }
  const [collapsed, setCollapsed] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const active = Object.values(checked).some((s) => s.size > 0)
  const match = useMemo(
    () => (item) =>
      groups.every((g) => {
        const sel = checked[g.key]
        if (!sel || sel.size === 0) return true
        const v = item[g.key]
        return Array.isArray(v) ? v.some((x) => sel.has(x)) : sel.has(v)
      }),
    [checked, groups]
  )
  const shownFeatured = featured.filter(match)
  const shownItems = items.filter(match)

  const toggle = (key, opt) =>
    setChecked((prev) => {
      const next = new Set(prev[key] || [])
      next.has(opt) ? next.delete(opt) : next.add(opt)
      return { ...prev, [key]: next }
    })

  const renderCard = (it) => (
    <ResourceCard
      key={it.title}
      flat
      layout={card.layout}
      title={it.title}
      desc={card.desc ? it.desc : undefined}
      href={it.href}
      eyebrow={{ type: 'pill', ...it.pill }}
      mediaKind={card.mediaKind}
    />
  )

  const filterGroups = (
    <>
      {groups.map((g, gi) => (
        <div key={g.key}>
          {gi > 0 && <hr className="fl-hr" />}
          <div className="fl-group">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={!collapsed[g.key]}
              className="fl-group-head"
              onClick={() => setCollapsed((c) => ({ ...c, [g.key]: !c[g.key] }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setCollapsed((c) => ({ ...c, [g.key]: !c[g.key] }))
                }
              }}
            >
              <h5 className="fl-group-title">{g.title}</h5>
              <svg
                className={`fl-chevron${collapsed[g.key] ? '' : ' fl-chevron--open'}`}
                width="20"
                height="10"
                viewBox="0 0 20 10"
                aria-hidden="true"
              >
                <path d="M1 1l9 8 9-8" fill="none" stroke="#181D26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!collapsed[g.key] && (
              <div className="fl-options">
                {g.options.map((opt) => {
                  const on = !!checked[g.key]?.has(opt)
                  return (
                    <label key={opt} className="fl-option">
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(g.key, opt)} />
                      <svg width="17" height="18" viewBox="0 0 17 18" aria-hidden="true" className="shrink-0">
                        <rect
                          x="0.5"
                          y="1"
                          width="16"
                          height="16"
                          rx="3.5"
                          fill={on ? 'rgba(1,20,53,0.12)' : '#FFFFFF'}
                          stroke="#C4C7CD"
                        />
                        {on && (
                          <path d="M4.5 9.2l2.6 2.6 5.4-5.6" fill="none" stroke="#181D26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                      <span className="fl-option-label">{opt}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      <button type="button" className="fl-clear" disabled={!active} onClick={() => setChecked({})}>
        Clear all
        <svg className="fl-clear-icon" width="16" height="17" viewBox="0 0 16 17" aria-hidden="true">
          <path d="M4 4.5l8 8M12 4.5l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </>
  )
  const filterPanel = (
    <>
      <BkSectionHeader title="Filter" />
      {filterGroups}
    </>
  )

  return (
    <div className="font-haas">
      {/* Featured block */}
      <section className="mx-auto max-w-grid px-[24px]">
        {featuredTitle && <BkSectionHeader title={featuredTitle} />}
        <div className={`fl-featured${spacious ? ' fl-featured--spacious' : ''}`}>{shownFeatured.map(renderCard)}</div>
      </section>

      {/* Two-column area */}
      <section className="mx-auto max-w-grid px-[24px]">
        <div className="fl-area">
          <aside className="fl-sidebar">{filterPanel}</aside>
          <div className="fl-mobile">
            <BkSectionHeader title="Filter" />
            <button
              type="button"
              className="fl-mobile-btn"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg width="14" height="11" viewBox="0 0 14 11" aria-hidden="true">
                <path d="M0 1h14M3 5.5h8M5.5 10h3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Filters
            </button>
            {mobileOpen && <div className="fl-mobile-panel">{filterGroups}</div>}
          </div>
          <div className={`fl-main${spacious ? ' fl-main--spacious' : ''}`}>
            <BkSectionHeader title={gridTitle} />
            <div className="fl-grid">{shownItems.map(renderCard)}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
