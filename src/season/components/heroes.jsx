import { useEffect, useRef, useState } from 'react'
import { Title, Ph, PauseButton, Bars, Btn, usePaused } from './atoms.jsx'

// Breadcrumb — platform §0.5 (static, variant 'a') / solutions §2.1 (sticky + scroll-hide, variant 'sticky')
export function Breadcrumb({ items, sticky }) {
  // live: sticky under the header; `isScrollingDown` is added while the page scrolls down past the
  // top area (hidden: opacity 0 / translateY(-12px), .25s ease-in) and removed on any upward scroll.
  const [scrolling, setScrolling] = useState(false)
  const last = useRef(0)
  useEffect(() => {
    if (!sticky) return
    last.current = window.scrollY
    const on = () => {
      const y = window.scrollY
      const d = y - last.current
      last.current = y
      if (d > 0 && y > 120) setScrolling(true)
      else if (d < 0) setScrolling(false)
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [sticky])
  return (
    <nav className={`ss-crumbs${sticky ? ' ss-crumbs--sticky' : ''}${scrolling ? ' is-scrolling' : ''}`} aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {i > 0 &&
              (sticky ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transform: 'rotate(-90deg)' }}>
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4.5 2.5 8 6 4.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ))}
            {i < items.length - 1 ? <a href={it.href}>{it.label}</a> : <span role="link" aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// A1 HeroVertical / S-1 SeasonHero
// media: { ratio: '892/383', video?: bool }   pattern: bool (portals decorative layer)
export function Hero({ badge, headline, sub, actions, media, pattern }) {
  const [paused, toggle] = usePaused()
  return (
    <section className="ss-sec ss-hero">
      <div className="ss-shell">
        <div className="ss-hero__copy ss-anim-fade">
          <Title align="center" size="hero" badge={badge} headline={headline} sub={sub} actions={actions} />
        </div>
        {media && (
          <div className="ss-hero__band">
            {pattern && (
              <div className="ss-hero__pattern ss-anim-pattern">
                <Bars cols={6} rows={14} color="#000" h={12} />
              </div>
            )}
            <div className="ss-hero__frame ss-anim-rise">
              <div data-paused={paused} style={{ position: 'relative' }}>
                <Ph ratio={media.ratio} video={media.video} hint={[badge, headline]} />
                {media.video && <PauseButton paused={paused} onToggle={toggle} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// B1 PlatformHero (/platform) and E-1 variant copyAboveVideo (/solutions/enterprise)
export function PlatformHero({ eyebrow, lines, sub, actions, variant = 'default', media }) {
  const above = variant === 'copyAboveVideo'
  const ctas = (
    <div className="ss-phero__ctas">
      {actions.map((a, i) => (
        <Btn key={i} {...a} variant={i === 0 ? 'bprimary' : 'bsecondary'} />
      ))}
    </div>
  )
  return (
    <section className={`ss-sec ss-phero${above ? ' ss-phero--above' : ''}`}>
      <div className="ss-shell ss-shell--b">
        {!above && (
          <div className="ss-phero__pattern ss-anim-pattern">
            <Bars cols={4} rows={16} color="#000" h={14} />
          </div>
        )}
        <div className={`ss-phero__copy${above ? '' : ' ss-anim-fade'}`}>
          <p className="ss-phero__eyebrow">{eyebrow}</p>
          <h1 className="ss-phero__h1">
            {lines.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h1>
          <p className="ss-phero__sub">{sub}</p>
          {ctas}
        </div>
        {above ? (
          <div className="ss-phero__band">
            <Ph ratio="16/9" video hint={[eyebrow, lines]} />
          </div>
        ) : (
          <div className="ss-phero__media ss-anim-rise">
            <div>
              <Ph ratio={media?.ratio || '2277/1003'} hint={[eyebrow, lines]} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
