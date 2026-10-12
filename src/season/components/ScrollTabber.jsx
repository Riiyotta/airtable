import { useEffect, useRef, useState } from 'react'
import { Title, Ph, Btn, Chevron, useMQ } from './atoms.jsx'

// A7 ScrollTabber — sticky title + sticky nav (>=900) / sticky horizontal tab row (<900).
// Active panel: IntersectionObserver rootMargin "-35% 0px -45% 0px", thresholds [0,.25,.5];
// top-most intersecting panel wins. Tab click -> smooth scrollIntoView, observer muted 600ms.
// panel: { label, title, body, action: {label, href} }
export default function ScrollTabber({ headline, panels }) {
  const desk = useMQ('(min-width: 900px)')
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const headRef = useRef(null)
  const mnavRef = useRef(null)
  const navRef = useRef(null)
  const panelRefs = useRef([])
  const muted = useRef(0)
  const [edges, setEdges] = useState([false, false])
  const onRowScroll = () => {
    const n = navRef.current
    if (n) setEdges([n.scrollLeft > 2, n.scrollLeft + n.clientWidth < n.scrollWidth - 2])
  }
  useEffect(() => {
    if (desk) return
    onRowScroll()
    window.addEventListener('resize', onRowScroll)
    return () => window.removeEventListener('resize', onRowScroll)
  }, [desk])

  // expose the sticky title-band / mobile tab-row heights for the sticky offsets + scroll-margin
  useEffect(() => {
    const root = rootRef.current
    const ro = new ResizeObserver(() => {
      if (headRef.current) root.style.setProperty('--st-head', `${headRef.current.offsetHeight}px`)
      if (mnavRef.current) root.style.setProperty('--st-mnav', `${mnavRef.current.offsetHeight}px`)
    })
    if (headRef.current) ro.observe(headRef.current)
    if (mnavRef.current) ro.observe(mnavRef.current)
    return () => ro.disconnect()
  }, [desk])

  useEffect(() => {
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(Number(e.target.dataset.i), e.isIntersecting))
        if (Date.now() < muted.current) return
        const hits = [...seen].filter(([, v]) => v).map(([k]) => k)
        if (hits.length) setActive(Math.min(...hits))
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )
    panelRefs.current.forEach((p) => p && io.observe(p))
    return () => io.disconnect()
  }, [panels.length])

  // keep the active tab visible in the mobile row
  useEffect(() => {
    if (desk || !navRef.current) return
    const tab = navRef.current.children[active]
    if (tab) navRef.current.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' })
  }, [active, desk])

  const go = (i) => {
    muted.current = Date.now() + 600
    setActive(i)
    panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollRow = (dir) => {
    const n = navRef.current
    n.scrollBy({ left: dir * n.clientWidth * 0.8, behavior: 'smooth' })
  }

  const nav = (
    <div className="ss-st__nav" role="tablist" ref={navRef} onScroll={desk ? undefined : onRowScroll}>
      {panels.map((p, i) => (
        <button key={i} type="button" role="tab" aria-selected={active === i} className="ss-st__tab" onClick={() => go(i)}>
          <span className="ss-st__marker" />
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div className="ss-st" ref={rootRef}>
          <div className="ss-st__title" ref={headRef}>
            <Title align="left" headline={headline} />
          </div>
          {desk ? (
            <div className="ss-st__navwrap">{nav}</div>
          ) : (
            <div className="ss-st__mnav" ref={mnavRef} style={{ position: 'sticky' }}>
              <div style={{ position: 'relative' }}>
                {edges[0] && (
                  <button type="button" className="ss-st__fade ss-st__fade--l" aria-label="Scroll tabs left" onClick={() => scrollRow(-1)}>
                    <Chevron className="rotate-90" />
                  </button>
                )}
                {nav}
                {edges[1] && (
                  <button type="button" className="ss-st__fade ss-st__fade--r" aria-label="Scroll tabs right" onClick={() => scrollRow(1)}>
                    <Chevron className="-rotate-90" />
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="ss-st__track">
            {panels.map((p, i) => (
              <article key={i} className="ss-st__panel" data-i={i} ref={(el) => (panelRefs.current[i] = el)}>
                <div className="ss-st__copy">
                  <div className="ss-st__text">
                    <h3 className="ss-st__h3">{p.title}</h3>
                    <p className="ss-st__body">{p.body}</p>
                  </div>
                  {p.action && <Btn {...p.action} variant="primary" />}
                </div>
                <Ph className="ss-st__media" ratio="1000/560" seed={i} hint={p.title} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
