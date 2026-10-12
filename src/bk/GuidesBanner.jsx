import { useState } from 'react'
import MockMedia from '../media/MockMedia.jsx'
import './GuidesBanner.css'

// Featured-article strip art: abstract scenes so the white captions stay legible.
const BANNER_KINDS = ['gradient', 'story', 'bars']

// BK-7 GuidesBanner — SECTION_TYPES_solutions §3 BK-7.
// Left: h1, subtitle, "Quick Start" label + outline-white buttons. Right: expanding strip of images.
// Activation on click / focus (hover on an inactive item does nothing); no auto-rotate.
//   topics: [{ label, href }] (Quick Start buttons)   items: [{ title, href }]
export default function GuidesBanner({ title, subtitle, quickStartLabel = 'Quick Start', topics, items, captionLabel = 'Featured' }) {
  const [active, setActive] = useState(0)
  // The caption reveal runs when an item *becomes* active, not on first paint.
  const [changed, setChanged] = useState(false)
  const activate = (i) => {
    if (i === active) return
    setActive(i)
    setChanged(true)
  }

  return (
    <section className="gb font-haas">
      <div className="gb-text">
        <h1 className="gb-h1">{title}</h1>
        <p className="gb-sub">{subtitle}</p>
        <div className="gb-group">
          <p className="gb-label">{quickStartLabel}</p>
          <div className="gb-buttons">
            {topics.map((t) => (
              <a key={t.label} href={t.href} className="gb-btn">
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <ul className="gb-strip">
        {items.map((it, i) => {
          const isActive = i === active
          return (
            <li
              key={it.title}
              className={`gb-item${isActive ? ' gb-item--active' : ''}`}
              tabIndex={isActive ? -1 : 0}
              onClick={() => activate(i)}
              onFocus={() => activate(i)}
            >
              <div className="gb-img" aria-hidden="true">
                <MockMedia kind={BANNER_KINDS[i % 3]} seed={it.title} theme="dark" />
              </div>
              <div className="gb-overlay" aria-hidden="true" />
              {isActive && (
                <a href={it.href} className="gb-read" tabIndex={-1}>
                  Read article
                </a>
              )}
              <figure className="m-0">
                <figcaption
                  key={isActive && changed ? `in-${active}` : 'static'}
                  className={`gb-caption${isActive && changed ? ' gb-caption--reveal' : ''}`}
                >
                  <span className="gb-clip">
                    <span className="gb-cap-label">{captionLabel}</span>
                  </span>
                  <span className="gb-clip">
                    <a href={it.href} className="gb-cap-title" tabIndex={isActive ? 0 : -1}>
                      {it.title}
                    </a>
                  </span>
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
