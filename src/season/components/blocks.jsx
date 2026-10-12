import { useState } from 'react'
import { Title, Ph, TextLink, ArrowButton, Btn, Bars, PauseButton, usePaused, Chevron } from './atoms.jsx'

// A10 Stats (static, no count-up)
export function Stats({ headline, stats }) {
  return (
    <section className="ss-sec">
      <div className="ss-shell">
        <div className="ss-stats">
          <Title align="left" headline={headline} />
          <ul className="ss-stats__list">
            {stats.map((s, i) => (
              <li key={i} className="ss-stats__cell">
                <p className="ss-stats__value">{s.value}</p>
                <p className="ss-stats__label">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// A11 TemplatesCarousel / S-6 SeasonCarousel — dark, click-only crossfade (.4s), no autoplay.
// slide: { title, link?: {label, href} }
export function TemplatesCarousel({ badge, headline, sub, slides }) {
  const [i, setI] = useState(0)
  const n = slides.length
  return (
    <section className="ss-sec ss-tpl ss-dark">
      <div className="ss-shell">
        <Title align="center" badge={badge} badgeInverse headline={headline} sub={sub} />
        <div className="ss-tpl__body">
          <div className="ss-tpl__viewport">
            {slides.map((s, k) => (
              <div key={k} className="ss-tpl__slide" data-active={k === i} aria-hidden={k !== i}>
                <div className="ss-tpl__media">
                  <Ph dark seed={k} hint={s.title} />
                  <div className="ss-tpl__overlay">
                    <p className="ss-tpl__otitle">{s.title}</p>
                    {s.link && <TextLink {...s.link} inverse />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ss-tpl__foot">
            <div className="ss-bars-prog" role="tablist">
              {slides.map((_, k) => (
                <button key={k} type="button" role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} />
              ))}
            </div>
            <div className="ss-arrows">
              <ArrowButton dir="prev" onClick={() => setI((i - 1 + n) % n)} />
              <ArrowButton dir="next" onClick={() => setI((i + 1) % n)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Read-next article art: abstract brand scenes (editorial thumbnails, not product UI).
const READ_NEXT_KINDS = ['story', 'gradient', 'bars']

// A12 ReadNextDark / S-8 SeasonReadNext / B7 (variant 'b')
// card: { eyebrow?, color?, title, href? }
export function ReadNext({ variant = 'a', headline, cards }) {
  const b = variant === 'b'
  return (
    <section className={`ss-sec ss-rn${b ? ' ss-rn--b' : ''}`}>
      <div className={`ss-shell${b ? ' ss-shell--b' : ''}`}>
        {b ? (
          <div className="ss-rn__head">
            <h2 className="ss-bh2">{headline}</h2>
          </div>
        ) : (
          <div className="ss-rn__head">
            <Title align="left" headline={headline} />
          </div>
        )}
        <div className="ss-rn__body">
          <ul className="ss-rn__row">
            {cards.map((c, k) => (
              <li key={k} className="ss-rn__card">
                <a href={c.href || '#'}>
                  <div className="ss-rn__copy">
                    {c.eyebrow && (
                      <p className="ss-rn__eyebrow" style={c.color ? { color: c.color } : undefined}>
                        {c.eyebrow}
                      </p>
                    )}
                    <p className="ss-rn__title">{c.title}</p>
                  </div>
                  <div className="ss-rn__art">
                    <Ph dark seed={k} kind={READ_NEXT_KINDS[k % 3]} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// A13 CtaBlocked / S-9 SeasonCtaBanner (variant 'a': #012978 + #AC59FF bars, pause button)
// B8 CtaBanner (variant 'b': same background, 64px headline, no pause)
// E-9 CtaBannerStatic (variant 'b', bg 'green': #004801 + static pattern placeholder)
export function CtaBanner({ variant = 'a', headline, lines, actions, bg = 'navy' }) {
  const [paused, toggle] = usePaused()
  const green = bg === 'green'
  const layer = (
    <div className="ss-cta__bg" style={green ? { background: '#004801' } : undefined}>
      {green ? <Bars cols={4} rows={10} color="rgba(255,255,255,.07)" h={18} anim={false} /> : <Bars cols={4} rows={12} color="#AC59FF" h={16} />}
    </div>
  )
  if (variant === 'b') {
    return (
      <section className="ss-sec ss-cta ss-cta--b">
        {layer}
        <div className="ss-cta__band">
          <div className="ss-cta__card">
            <h2 className="ss-cta__bh">
              {lines.map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </h2>
            <div className="ss-phero__ctas">
              {actions.map((a, i) => (
                <Btn key={i} {...a} variant={i === 0 ? 'bprimary' : 'bsecondary'} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="ss-sec ss-cta" data-paused={paused}>
      {layer}
      <div className="ss-cta__band">
        <div className="ss-cta__card">
          <Title align="center" size="hero" as="h2" headline={headline} actions={actions} />
        </div>
      </div>
      <PauseButton paused={paused} onToggle={toggle} />
    </section>
  )
}

// A14 FaqAccordion / S-10 SeasonFaq (skin 'a') and E-10 FaqSection (skin 'e').
// First item open; items toggle independently. Answer grid-rows .4s cubic-bezier(.76,0,.24,1).
// item: { q, a: string[] }
export function Faq({ skin = 'a', headline, items }) {
  const [open, setOpen] = useState(() => items.map((_, i) => i === 0))
  const e = skin === 'e'
  return (
    <section className="ss-sec">
      <div className={`ss-shell${e ? ' ss-shell--b' : ''}`}>
        <div className={`ss-faq${e ? ' ss-faq--e' : ''}`}>
          <div className="ss-faq__head">
            <h2 className="ss-faq__h2">{headline}</h2>
          </div>
          <ul className="ss-faq__list">
            {items.map((it, i) => (
              <li key={i} className="ss-faq__item" data-open={open[i]}>
                <h3>
                  <button
                    type="button"
                    className="ss-faq__q"
                    aria-expanded={open[i]}
                    onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
                  >
                    <span>{it.q}</span>
                    {e ? (
                      <img className="ss-faq__chev" src="/assets/solutions/b43a951aae517fecc7ed6a5634a19c1cc5a6a58a-24x25.svg" alt="" />
                    ) : (
                      <Chevron size={32} className="ss-faq__chev" />
                    )}
                  </button>
                </h3>
                <div className="ss-grow" data-open={open[i]}>
                  <div>
                    <div className="ss-faq__a">
                      {it.a.map((p, k) => (
                        <p key={k}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
