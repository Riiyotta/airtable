import { useCallback, useEffect, useRef, useState } from 'react'
import { PlaceholderBlock } from './Placeholder.jsx'
import { bkButton, bkOutline } from '../components/buttonStyles.js'
import './HeroCarouselCentered.css'

// BK-6 HeroCarouselCentered — SECTION_TYPES_solutions §3 BK-6 (slick centerMode, infinite).
// Autoplay every 4000ms; hover pauses autoplay and the active dot fill; center card hover scale 1.03.
// The track renders 3 copies of the slides so neighbours always peek out; after a move lands in an
// outer copy it snaps (no transition) back to the same slide in the middle copy.
// slides: [{ label, href, kind, title, cta }] — kind = meta label ("Customer story"), title = 2-line h3,
// cta = button label. ≥1024 the meta/h3/button overlay the media (gradient scrim, padding 0 48 48);
// below 1024 they sit under the media (live HeroAssetSlide).
const AUTOPLAY_MS = 4000
// Slide-change tween is not measured (slick inline transition); 500ms ease = slick's default `speed`.
const SLIDE_MS = 500

export default function HeroCarouselCentered({ eyebrow, title, slides }) {
  const n = slides.length
  const [pos, setPos] = useState(n) // index into the tripled track; middle copy = n..2n-1
  const [step, setStep] = useState(0) // increments on every real move (not on the silent snap)
  const [animate, setAnimate] = useState(true)
  const [hover, setHover] = useState(false)
  const elapsed = useRef(0)
  const lastStep = useRef(0)
  const active = ((pos % n) + n) % n

  const move = useCallback((fn) => {
    setAnimate(true)
    // Guard against rapid clicks running past the tripled track before the snap lands.
    setPos((p) => {
      const q = fn(p)
      return q < 0 || q >= 3 * n ? p : q
    })
    setStep((s) => s + 1)
  }, [n])
  const go = (next) => move(() => next)

  // Autoplay with pause-on-hover; resumes with the remaining time so it stays in sync with the dot fill.
  useEffect(() => {
    if (lastStep.current !== step) {
      lastStep.current = step
      elapsed.current = 0
    }
    if (hover) return undefined
    const start = Date.now()
    const t = setTimeout(() => move((p) => p + 1), Math.max(0, AUTOPLAY_MS - elapsed.current))
    return () => {
      clearTimeout(t)
      elapsed.current += Date.now() - start
    }
  }, [step, hover, move])

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return
    if (pos < n || pos >= 2 * n) {
      setAnimate(false)
      setPos(n + active)
    }
  }
  // Snap (reduced-motion has no transitionend to wait for).
  useEffect(() => {
    if ((pos < n || pos >= 2 * n) && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimate(false)
      setPos(n + active)
    }
  }, [pos, n, active])

  const tripled = [...slides, ...slides, ...slides]

  return (
    <section className="hcc font-haas">
      <div className="hcc-title">
        <h1 className="hcc-eyebrow">{eyebrow}</h1>
        <h2 className="hcc-h2">{title}</h2>
      </div>

      <div className="hcc-slider" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="hcc-list">
          <div
            className="hcc-track"
            style={{
              transform: `translateX(${-pos * 100}%)`,
              transition: animate ? `transform ${SLIDE_MS}ms ease` : 'none',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {tripled.map((s, i) => {
              const isCenter = i === pos
              return (
                <div key={i} className="hcc-slide" aria-hidden={isCenter ? undefined : 'true'}>
                  <div className={`hcc-item${isCenter ? ' hcc-item--center' : ''}`}>
                    <div className="hcc-media">
                      <a href={s.href} tabIndex={isCenter ? 0 : -1} aria-label={s.label} className="hcc-card">
                        <PlaceholderBlock dark className="h-full w-full" kind="story" seed={i % n} />
                        <span className="hcc-scrim" aria-hidden="true" />
                      </a>
                      {s.title && (
                        <div className="hcc-overlay">
                          <div className="hcc-overlay-text">
                            <SlideMeta kind={s.kind} light />
                            <h3 className="hcc-overlay-h3">{s.title}</h3>
                          </div>
                          <a href={s.href} tabIndex={isCenter ? 0 : -1} className="hcc-overlay-btn">
                            {s.cta}
                          </a>
                        </div>
                      )}
                    </div>
                    {s.title && (
                      <div className="hcc-below">
                        <SlideMeta kind={s.kind} />
                        <h3 className="hcc-below-h3">{s.title}</h3>
                        <a
                          href={s.href}
                          tabIndex={isCenter ? 0 : -1}
                          className={`${bkButton} ${bkOutline} shadow-btn-secondary hover:shadow-none`}
                        >
                          {s.cta}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hcc-dots-row">
          <button type="button" className="hcc-arrow" aria-label="Previous slide" onClick={() => go(pos - 1)}>
            <ArrowIcon left />
          </button>
          <ul className="hcc-dots">
            {slides.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="hcc-dot"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => go(n + i)}
                >
                  <span
                    // key forces the fill animation to restart on every slide change
                    key={i === active ? `on-${step}` : 'off'}
                    className={`hcc-bar${i === active ? ' hcc-bar--active' : ''}${hover ? ' hcc-bar--paused' : ''}`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="hcc-arrow" aria-label="Next slide" onClick={() => go(pos + 1)}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  )
}

// Live BkArrowIcon: 48×48 (viewBox 65), transparent circle, filled arrow path #0114351F.
function ArrowIcon({ left = false }) {
  return (
    <svg viewBox="0 0 65 65" width="48" height="48" fill="none" aria-hidden="true" className="hcc-arrow-icon">
      <circle cx="32.612" cy="32.002" r="32" fill="transparent" />
      <path
        className="hcc-arrow-path"
        transform={left ? 'rotate(180 32.612 32.002)' : undefined}
        d="M20.613 30.502a1.5 1.5 0 1 0 0 3v-3Zm25.06 2.56a1.5 1.5 0 0 0 0-2.12l-9.546-9.547a1.5 1.5 0 0 0-2.121 2.122l8.485 8.485-8.485 8.485a1.5 1.5 0 0 0 2.121 2.122l9.546-9.546Zm-25.06.44h24v-3h-24v3Z"
      />
    </svg>
  )
}

// Meta row: 20px play-indicator icon + label (14/18.9 500 white .8 on media; 12/18 500 #040E20B0 below).
function SlideMeta({ kind, light = false }) {
  return (
    <div className={light ? 'hcc-meta hcc-meta--light' : 'hcc-meta'}>
      <svg width="20" height="20" viewBox="0 0 24 25" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12.5" r="11" strokeWidth="2" stroke="currentColor" />
        <path
          fill="currentColor"
          d="M16.9268 11.2864C17.9268 11.8638 17.9268 13.3072 16.9268 13.8845L10.3767 17.6662C9.37668 18.2435 8.12668 17.5219 8.12668 16.3672L8.12668 8.80378C8.12668 7.64908 9.37668 6.92739 10.3767 7.50474L16.9268 11.2864Z"
        />
      </svg>
      <p className="hcc-meta-label">{kind}</p>
    </div>
  )
}
