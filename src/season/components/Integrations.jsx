import { Title, Tile, Btn, PauseButton, usePaused, useMQ } from './atoms.jsx'
import { useMarquee } from './useMarquee.js'

// One component for A9 / S-7 (variant 'a': JS rAF marquee, 3 strips of 186.7 cells, pause + drag)
// and B4 / E-7 (variant 'b': pure CSS 28s keyframes, 4 strips of 100px cells, no pause/drag).
// tiles: number of unique logos per strip (A9: 5, S-7: 4, B4/E-7: 6).
function Strip({ count, offset, dir, axis, paused, reduced }) {
  const { surfaceRef, trackRef } = useMarquee({ axis, dir, paused, reduced })
  const items = Array.from({ length: count * 2 }, (_, i) => (i % count) + offset)
  return (
    <div className="ss-int__strip" ref={surfaceRef}>
      <ul className="ss-int__track" ref={trackRef}>
        {items.map((k, i) => (
          <li key={i} className="ss-int__cell" aria-hidden="true">
            <Tile i={k} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Integrations({ variant = 'a', headline, lines, sub, action, tiles = 5 }) {
  const desk = useMQ('(min-width: 900px)')
  const [paused, toggle, reduced] = usePaused()

  if (variant === 'b') {
    const strips = desk ? 4 : 2
    return (
      <section className="ss-sec">
        <div className="ss-shell ss-shell--b">
          <div className="ss-int ss-int--b">
            <div className="ss-int__copy">
              <div className="ss-int__text">
                <h2 className="ss-bh2">
                  {lines.map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </h2>
                <p className="ss-int__desc">{sub}</p>
              </div>
              {action && <Btn {...action} variant="boutline" icon="barrow" />}
            </div>
            <div className="ss-int__box">
              {Array.from({ length: strips }, (_, s) => (
                <div key={s} className="ss-int__strip">
                  <ul className="ss-int__track">
                    {Array.from({ length: tiles * 2 }, (_, i) => (
                      <li key={i} className="ss-int__cell" aria-hidden="true">
                        <Tile i={(i % tiles) + s} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div className="ss-int">
          <div className="ss-int__copy">
            <Title align="left" headline={headline} sub={sub} actions={action ? [{ ...action, variant: 'secondary', icon: 'arrow' }] : null} />
          </div>
          <div className="ss-int__box" data-paused={paused}>
            {desk ? (
              [0, 1, 2].map((s) => (
                <Strip key={`d${s}`} count={tiles} offset={s * tiles} dir={s === 1 ? 'end' : 'start'} axis="y" paused={paused} reduced={reduced} />
              ))
            ) : (
              <Strip key="m" count={tiles * 3} offset={0} dir="start" axis="x" paused={paused} reduced={reduced} />
            )}
            <PauseButton paused={paused} onToggle={toggle} />
          </div>
        </div>
      </div>
    </section>
  )
}
