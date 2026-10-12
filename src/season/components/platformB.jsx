import { useEffect, useRef, useState } from 'react'
import { Ph, Logo, Btn, ArrowButton, CheckIcon, B_ARROW16, useMQ, useReducedMotion } from './atoms.jsx'

// B3 TabPanels — vertical accordion-tabs with large media. Click only, no auto-advance.
// tab: { label, title, body, bg }
export function TabPanels({ headline, tabs }) {
  const [a, setA] = useState(0)
  const desk = useMQ('(min-width: 900px)')
  const media = (t, i) => (
    <div key={`m${i}`} className="ss-tp__media" data-active={a === i} style={{ background: t.bg }} aria-hidden={a !== i}>
      <div className="ss-tp__pixels" />
      <div className="ss-tp__shot">
        <Ph seed={i} video={t.video} hint={[t.label, t.title]} />
      </div>
    </div>
  )
  return (
    <section className="ss-sec">
      <div className="ss-shell ss-shell--b">
        <div className="ss-tp__intro">
          <h2>{headline}</h2>
        </div>
        <div className="ss-tp__panel" style={{ borderBottom: '1px solid var(--key)' }}>
          <div className="ss-tp__left" role="tablist">
            {tabs.map((t, i) => (
              <div key={i} className="ss-tp__item" data-active={a === i}>
                <div className="ss-tp__expand">
                  <div className="ss-grow ss-tp__grow" data-open={a === i}>
                    <div>
                      <div className="ss-tp__inner">
                        <div className="ss-tp__copy">
                          <p className="ss-tp__ctitle">{t.title}</p>
                          <p className="ss-tp__cbody">{t.body}</p>
                        </div>
                        {!desk && a === i && media(t, i)}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" role="tab" aria-selected={a === i} className="ss-tp__tab" onClick={() => setA(i)}>
                  <span className="ss-tp__mark" />
                  {t.label}
                </button>
              </div>
            ))}
          </div>
          {desk && tabs.map(media)}
        </div>
      </div>
    </section>
  )
}

// B6 CustomerStoriesSlider / E-8 CustomerStoriesCarousel.
// Autoplay: 10s per slide, active bar fill scaleX 0->1 linear, then .9s crossfade; loops.
// (E-8 autoplay timing was not measured; it uses the B6 timing.)
// story: { brand, quote, name, role }   cta (E-8): {label, href}   fill: bar colour
export function Stories({ stories, fill = '#F884EE', cta, borderColor }) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  const fills = useRef([])
  const start = useRef(performance.now())
  const n = stories.length
  useEffect(() => {
    start.current = performance.now()
    fills.current.forEach((f, k) => f && (f.style.transform = `scaleX(${k === i && reduced ? 1 : 0})`))
    if (reduced) return
    let raf
    const tick = (now) => {
      const p = Math.min((now - start.current) / 10000, 1)
      const f = fills.current[i]
      if (f) f.style.transform = `scaleX(${p})`
      if (p >= 1) setI((v) => (v + 1) % n)
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [i, n, reduced])

  return (
    <section className="ss-sec ss-stories">
      <div className="ss-shell" style={borderColor ? { '--bside': borderColor } : undefined}>
        <div className="ss-stories__spacer" />
        <div className="ss-stories__vp">
          {stories.map((s, k) => (
            <div key={k} className="ss-story" data-active={k === i} aria-hidden={k !== i}>
              <div className="ss-story__copy">
                <div className="ss-story__logo">
                  <Logo name={s.brand} i={k} />
                </div>
                <div className="ss-story__text">
                  <p className="ss-story__quote">“{s.quote}”</p>
                  <div className="ss-story__by">
                    <p className="ss-story__name">{s.name}</p>
                    <p className="ss-story__role">{s.role}</p>
                  </div>
                  {cta && <Btn {...cta} variant="bprimary" style={{ '--bhover': '#2A2A2A' }} />}
                </div>
              </div>
              <div className="ss-story__visual">
                <Ph dark seed={k} kind="story" />
              </div>
            </div>
          ))}
        </div>
        <div className="ss-stories__foot">
          <div className="ss-stories__prog" role="tablist">
            {stories.map((_, k) => (
              <button key={k} type="button" role="tab" aria-selected={k === i} aria-label={`Story ${k + 1}`} onClick={() => setI(k)}>
                <span className="ss-stories__fill" style={{ '--fill': fill }} ref={(el) => (fills.current[k] = el)} />
              </button>
            ))}
          </div>
          <div className="ss-arrows">
            <ArrowButton variant="b" dir="prev" onClick={() => setI((i - 1 + n) % n)} />
            <ArrowButton variant="b" dir="next" onClick={() => setI((i + 1) % n)} />
          </div>
        </div>
      </div>
    </section>
  )
}

// E-3 UseCaseCards (enterprise only)
const ACCENTS = ['#6F9FFF', '#FFA244', '#ACEA48', '#FFD755']
export function UseCaseCards({ headline, action, cards }) {
  return (
    <section className="ss-sec">
      <div className="ss-shell ss-shell--b ss-uc">
        <div className="ss-uc__head">
          <h2>{headline}</h2>
          {action && <Btn {...action} variant="bprimary" />}
        </div>
        <ul className="ss-uc__grid">
          {cards.map((c, k) => (
            <li key={k}>
              <a className="ss-uc__card" href={c.href || '#'}>
                <div className="ss-uc__body">
                  <span className="ss-uc__accent" style={{ background: ACCENTS[k % 4] }} />
                  <div className="ss-uc__copy">
                    <h3 className="ss-uc__title">
                      {c.lines.map((l, i) => (
                        <span key={i}>{l}</span>
                      ))}
                    </h3>
                    <p className="ss-uc__text">{c.body}</p>
                  </div>
                  <span className="ss-uc__more">
                    Learn more
                    <img src={B_ARROW16} alt="" />
                  </span>
                </div>
                <div className="ss-uc__proof">
                  <Logo name={c.brand} i={k} />
                  <p className="ss-uc__metric">{c.metric}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// E-4 AiFoundationBento — load-triggered aiFoundationRise .7s ease-out, delays 120/470/820/1170ms.
export function AiFoundation({ lines, cells }) {
  let d = 0
  const delay = () => ({ '--delay': `${120 + 350 * d++}ms` })
  return (
    <section className="ss-sec">
      <div className="ss-shell ss-shell--b" style={{ borderBottomColor: '#333' }}>
        <div className="ss-af__head">
          <h2>
            {lines.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
        </div>
        <ul className="ss-af__grid">
          {cells.map((c, k) => (
            <li key={k} className="ss-af__cell">
              <div className="ss-af__copy">
                <h3 className="ss-af__title">{c.title}</h3>
                <p className="ss-af__body">{c.body}</p>
              </div>
              <div className="ss-af__visual">
                {c.stack ? (
                  <>
                    <div className="ss-af__layer ss-af__layer--a ss-af__rise" style={delay()}>
                      <Ph seed={k} hint={c.title} />
                    </div>
                    <div className="ss-af__layer ss-af__layer--b ss-af__rise" style={delay()}>
                      <Ph seed={k + 1} kind="grid" />
                    </div>
                  </>
                ) : (
                  <div className="ss-af__rise" style={{ ...delay(), height: '100%' }}>
                    <Ph seed={k} style={{ height: '100%' }} hint={c.title} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// E-5 OrgAccordion — exactly one open, click only.
export function OrgAccordion({ lines, items }) {
  const [a, setA] = useState(0)
  return (
    <section className="ss-sec ss-org">
      <div className="ss-shell ss-shell--b">
        <div className="ss-org__head">
          <h2>
            {lines.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
        </div>
        <ul className="ss-org__list" role="tablist">
          {items.map((it, k) => (
            <li key={k} className="ss-org__item" data-active={a === k}>
              <button type="button" role="tab" aria-selected={a === k} className="ss-org__tab" onClick={() => setA(k)}>
                <span className="ss-org__mark" />
                <span className="ss-org__title">{it.title}</span>
              </button>
              <div className="ss-grow ss-org__grow" data-open={a === k}>
                <div>
                  <div className="ss-org__inner">
                    <ul className="ss-org__checks">
                      {it.checks.map((c, i) => (
                        <li key={i} className="ss-check">
                          <span className="ss-check__icon">
                            <CheckIcon />
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// E-6 HacSplit — dark copy + #57003E visual
export function HacSplit({ headline, checks, action }) {
  return (
    <section className="ss-sec ss-hac">
      <div className="ss-shell">
        <div className="ss-hac__copy">
          <div className="ss-hac__stack">
            <h2>{headline}</h2>
            <ul className="ss-hac__checks">
              {checks.map((c, i) => (
                <li key={i} className="ss-check">
                  <span className="ss-check__icon">
                    <CheckIcon dark />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <Btn {...action} variant="bwhite" icon="barrow16" />
        </div>
        <div className="ss-hac__visual">
          <div className="ss-hac__img">
            <Ph hint={headline} />
          </div>
        </div>
      </div>
    </section>
  )
}
