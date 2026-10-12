import { Title, Badge, Ph, PauseButton, usePaused } from './atoms.jsx'
import { useMarquee } from './useMarquee.js'

// A5 FeatureCarousel — marquee of article cards (rAF, 28s per half-track, drag + momentum, pause).
// card: { badge, tone: 'pink'|'yellow'|'cyan'|'orange', title, body, href? }
export default function FeatureCarousel({ headline, sub, actions, cards }) {
  const [paused, toggle, reduced] = usePaused()
  const { surfaceRef, trackRef } = useMarquee({ axis: 'x', paused, reduced })
  let base = cards
  while (base.length < 4) base = base.concat(cards)
  const all = base.concat(base)
  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div className="ss-car__title">
          <Title align="left" pad="band" headline={headline} sub={sub} actions={actions} />
        </div>
        <div className="ss-car__band" ref={surfaceRef} data-paused={paused}>
          <ul className="ss-car__track" ref={trackRef}>
            {all.map((c, i) => (
              <li key={i} className="ss-car__cell" aria-hidden={i >= base.length || undefined}>
                <a href={c.href || '#'} draggable="false" tabIndex={i >= base.length ? -1 : undefined}>
                  <div className="ss-card__copy" style={{ flex: 'none' }}>
                    <div>
                      <Badge label={c.badge} tone={c.tone} />
                    </div>
                    <div className="ss-card__text">
                      <h3 className="ss-card__title">{c.title}</h3>
                      <p className="ss-card__body">{c.body}</p>
                    </div>
                  </div>
                  <Ph className="ss-car__media" ratio="448/300" seed={i % base.length} hint={c.title} />
                </a>
              </li>
            ))}
          </ul>
          <PauseButton paused={paused} onToggle={toggle} />
        </div>
      </div>
    </section>
  )
}
