import { useRef, useState } from 'react'
import { Title, Ph, Btn, Logo, PauseButton, usePaused, useMQ } from './atoms.jsx'

// A8 TabberSmallMedia / S-4 SeasonTabber.
// >=900: horizontal tab list + instant panel swap (only trigger colours transition, .15s).
// <900: accordion, one open at a time, height .4s cubic-bezier(.76,0,.24,1); opening scrolls the
//       item to 8px under the header (rAF loop for 450ms).
// variant 'labels' | 'logos'; bar: 2px (desktop) / 4px (mobile) active underline (A8 only).
// tab: { label | logo, subhead?, groups?: [{strong?, text?}], quote?, attribution?, action, video? }
function PanelBody({ t }) {
  return (
    <div className="ss-tabs__body">
      {t.subhead && <p className="ss-tabs__subhead">{t.subhead}</p>}
      {t.quote && <p className="ss-tabs__subhead">{t.quote}</p>}
      {t.attribution && <p className="ss-tabs__p">{t.attribution}</p>}
      {t.groups?.length > 0 && (
        <div className="ss-tabs__groups">
          {t.groups.map((g, i) => (
            <div key={i} className="ss-tabs__group">
              {g.strong && <p className="ss-tabs__strong">{g.strong}</p>}
              {g.text && <p className="ss-tabs__p">{g.text}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Media({ t, i, className }) {
  const [paused, toggle] = usePaused()
  return (
    <div className={className} data-paused={paused}>
      <Ph seed={i} video={t.video} kind={t.quote ? 'story' : undefined} hint={[t.label, t.subhead]} />
      {t.video && <PauseButton paused={paused} onToggle={toggle} />}
    </div>
  )
}

export default function Tabber({ variant = 'labels', bar = false, badge, headline, sub, tabs }) {
  const desk = useMQ('(min-width: 900px)')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(0)
  const itemRefs = useRef([])
  const label = (t, i) => (variant === 'logos' ? <Logo name={t.logo} i={i} /> : t.label)

  const toggleItem = (i) => {
    const next = open === i ? -1 : i
    setOpen(next)
    if (next < 0) return
    const start = performance.now()
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mainNavHeight')) || 0
    const step = (now) => {
      const el = itemRefs.current[i]
      if (!el) return
      const top = el.getBoundingClientRect().top - nav - 8
      window.scrollBy(0, top)
      if (now - start < 450) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <section className={`ss-sec ss-tabs${bar ? ' ss-tabs--bar' : ''}${variant === 'logos' ? ' ss-tabs--logos' : ''}`}>
      <div className="ss-shell">
        <Title align="center" pad="band" badge={badge} headline={headline} sub={sub} />
        {desk ? (
          <>
            <div className="ss-tabs__list" role="tablist">
              {tabs.map((t, i) => (
                <button key={i} type="button" role="tab" aria-selected={active === i} className="ss-tabs__btn" onClick={() => setActive(i)}>
                  {label(t, i)}
                </button>
              ))}
            </div>
            {tabs.map(
              (t, i) =>
                active === i && (
                  <div key={i} className="ss-tabs__panel" role="tabpanel">
                    <div className="ss-tabs__copy">
                      <PanelBody t={t} />
                      {t.action && <Btn {...t.action} variant="primary" />}
                    </div>
                    <div className="ss-tabs__media">
                      <Media t={t} i={i} className="ss-tabs__frame" />
                    </div>
                  </div>
                ),
            )}
          </>
        ) : (
          <div role="tablist" style={{ borderTop: '1px solid var(--key)' }}>
            {tabs.map((t, i) => (
              <div key={i} className="ss-acc__item" ref={(el) => (itemRefs.current[i] = el)}>
                <button type="button" className="ss-acc__trigger" aria-expanded={open === i} onClick={() => toggleItem(i)}>
                  {label(t, i)}
                </button>
                <div className="ss-grow" data-open={open === i}>
                  <div>
                    <div className="ss-acc__copy">
                      <PanelBody t={t} />
                      {t.action && <Btn {...t.action} variant="primary" />}
                    </div>
                    <Media t={t} i={i} className="ss-acc__media" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
